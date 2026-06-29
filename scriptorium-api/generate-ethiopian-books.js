const https = require('https');
const fs = require('fs');
const path = require('path');

const SCROLLMAPPER_CDN = 'https://raw.githubusercontent.com/scrollmapper/bible_databases_deuterocanonical/master/sources/en';
const OUT_DIR = path.join(__dirname, '..', 'assets', 'data', 'bible-text');
const BIBLE_DIR = OUT_DIR;

// ── Mappings ──────────────────────────────────────────

// Ethiopian canon book IDs → scrollmapper source folder
const SCROLLMAPPER_SOURCES = {
  wisdom_solomon: 'wisdom-of-solomon/wisdom-of-solomon',
  sirach: 'book-of-sirach/book-of-sirach',
  baruch: '1-baruch/1-baruch',
  enoch: '1-enoch/1-enoch',
  jubilees: 'book-of-jubilees/book-of-jubilees',
  prayer_manasseh: 'prayer-of-manasseh/prayer-of-manasseh',
  psalm151: 'psalms-of-solomon/psalms-of-solomon',
  baruch2: '2-baruch/2-baruch',
  baruch3: '3-baruch/3-baruch',
  psalms_solomon: 'psalms-of-solomon/psalms-of-solomon',
  odes_solomon: 'odes-of-solomon/odes-of-solomon',
  moses_assumption: 'assumption-of-moses/assumption-of-moses',
  isaiah_martyrdom: 'ascension-of-isaiah/ascension-of-isaiah',
  adam_eve: '1-adam-and-eve/1-adam-and-eve',
  abraham_apocalypse: 'apocalypse-of-abraham/apocalypse-of-abraham',
  elijah_apocalypse: 'apocalypse-of-elijah/apocalypse-of-elijah',
  esdras1: '1-esdras/1-esdras',
  hermas: '1-hermas/1-hermas',
  barnabas_epistle: 'epistle-of-barnabas/epistle-of-barnabas',
  peter_apocalypse: 'apocalypse-of-peter/apocalypse-of-peter',
  nicodemus_gospel: 'gospel-of-nicodemus/gospel-of-nicodemus',
};

// Ethiopian canon book ID → existing standard canon fileId (for overlapping books)
const BOOK_MAP = {
  genesis: 'GENESIS', exodus: 'EXODUS', leviticus: 'LEVITICUS',
  numbers: 'NUMBERS', deuteronomy: 'DEUTERONOMY',
  joshua: 'JOSHUA', judges: 'JUDGES', ruth: 'RUTH',
  samuel1: '1_SAMUEL', samuel2: '2_SAMUEL',
  kings1: '1_KINGS', kings2: '2_KINGS',
  chronicles1: '1_CHRONICLES', chronicles2: '2_CHRONICLES',
  ezra: 'EZRA', nehemiah: 'NEHEMIAH', esther: 'ESTHER',
  job: 'JOB', psalms: 'PSALMS', proverbs: 'PROVERBS',
  ecclesiastes: 'ECCLESIASTES', song: 'SONG_OF_SOLOMON',
  isaiah: 'ISAIAH', jeremiah: 'JEREMIAH',
  lamentations: 'LAMENTATIONS', ezekiel: 'EZEKIEL', daniel: 'DANIEL',
  hosea: 'HOSEA', joel: 'JOEL', amos: 'AMOS',
  obadiah: 'OBADIAH', jonah: 'JONAH', micah: 'MICAH',
  nahum: 'NAHUM', habakkuk: 'HABAKKUK', zephaniah: 'ZEPHANIAH',
  haggai: 'HAGGAI', zechariah: 'ZECHARIAH', malachi: 'MALACHI',
  matthew: 'MATTHEW', mark: 'MARK', luke: 'LUKE', john: 'JOHN',
  acts: 'ACTS',
  romans: 'ROMANS', corinthians1: '1_CORINTHIANS', corinthians2: '2_CORINTHIANS',
  galatians: 'GALATIANS', ephesians: 'EPHESIANS', philippians: 'PHILIPPIANS',
  colossians: 'COLOSSIANS', thessalonians1: '1_THESSALONIANS', thessalonians2: '2_THESSALONIANS',
  timothy1: '1_TIMOTHY', timothy2: '2_TIMOTHY', titus: 'TITUS', philemon: 'PHILEMON',
  hebrews: 'HEBREWS', james: 'JAMES', peter1: '1_PETER', peter2: '2_PETER',
  john1: '1_JOHN', john2: '2_JOHN', john3: '3_JOHN', jude: 'JUDE',
  revelation: 'REVELATION',
};

// Ethiopian ID → display name (for writers/placeholders)
const ETHIOPIAN_META = {
  wisdom_solomon: { title: 'Wisdom of Solomon', writer: 'Solomon', era: 'ot', chapters: 19 },
  sirach: { title: 'Sirach', writer: 'Yeshua ben Sira', era: 'ot', chapters: 51 },
  baruch: { title: 'Baruch', writer: 'Baruch ben Neriah', era: 'ot', chapters: 6 },
  enoch: { title: '1 Enoch', writer: 'Enoch', era: 'ot', chapters: 108 },
  jubilees: { title: 'Jubilees', writer: 'Moses', era: 'ot', chapters: 50 },
  meqabyan1: { title: '1 Meqabyan', writer: 'Unknown', era: 'ot', chapters: 0 },
  meqabyan2: { title: '2 Meqabyan', writer: 'Unknown', era: 'ot', chapters: 0 },
  meqabyan3: { title: '3 Meqabyan', writer: 'Unknown', era: 'ot', chapters: 0 },
  pseudo_josephus: { title: 'Pseudo-Josephus', writer: 'Pseudo-Josephus', era: 'ot', chapters: 0 },
  ezra_sutuel: { title: '4 Ezra (Ezra Sutuel)', writer: 'Unknown', era: 'ot', chapters: 16 },
  prayer_manasseh: { title: 'Prayer of Manasseh', writer: 'Manasseh', era: 'ot', chapters: 1 },
  psalm151: { title: 'Psalm 151', writer: 'David', era: 'ot', chapters: 1 },
  sinodos: { title: 'Sinodos', writer: 'Apostolic', era: 'nt', chapters: 0 },
  clement: { title: '1-2 Clement', writer: 'Clement', era: 'nt', chapters: 0 },
  didascalia: { title: 'Didascalia', writer: 'Apostolic', era: 'nt', chapters: 0 },
  covenant_book: { title: 'Book of the Covenant', writer: 'Apostolic', era: 'nt', chapters: 0 },
  baruch2: { title: '2 Baruch', writer: 'Baruch', era: 'ot', chapters: 87 },
  baruch3: { title: '3 Baruch', writer: 'Baruch', era: 'ot', chapters: 17 },
  psalms_solomon: { title: 'Psalms of Solomon', writer: 'Solomon', era: 'ot', chapters: 18 },
  odes_solomon: { title: 'Odes of Solomon', writer: 'Solomon', era: 'ot', chapters: 42 },
  testament_patriarchs: { title: 'Testament of the Twelve Patriarchs', writer: 'Patriarchs', era: 'ot', chapters: 0 },
  moses_assumption: { title: 'Assumption of Moses', writer: 'Moses', era: 'ot', chapters: 12 },
  isaiah_martyrdom: { title: 'Martyrdom & Ascension of Isaiah', writer: 'Isaiah', era: 'ot', chapters: 11 },
  adam_eve: { title: 'Life of Adam and Eve', writer: 'Unknown', era: 'ot', chapters: 0 },
  abraham_apocalypse: { title: 'Apocalypse of Abraham', writer: 'Abraham', era: 'ot', chapters: 32 },
  elijah_apocalypse: { title: 'Apocalypse of Elijah', writer: 'Elijah', era: 'ot', chapters: 0 },
  maccabees3: { title: '3 Maccabees', writer: 'Unknown', era: 'ot', chapters: 0 },
  maccabees4: { title: '4 Maccabees', writer: 'Unknown', era: 'ot', chapters: 0 },
  esdras1: { title: '1 Esdras', writer: 'Ezra', era: 'ot', chapters: 9 },
  letter_jeremiah: { title: 'Epistle of Jeremiah', writer: 'Jeremiah', era: 'ot', chapters: 1 },
  sibylline: { title: 'Sibylline Oracles', writer: 'Sibyls', era: 'ot', chapters: 0 },
  thomas_gospel: { title: 'Gospel of Thomas', writer: 'Didymos Judas Thomas', era: 'nt', chapters: 0 },
  philip_gospel: { title: 'Gospel of Philip', writer: 'Philip', era: 'nt', chapters: 0 },
  mary_gospel: { title: 'Gospel of Mary', writer: 'Mary Magdalene', era: 'nt', chapters: 0 },
  judas_gospel: { title: 'Gospel of Judas', writer: 'Judas', era: 'nt', chapters: 0 },
  truth_gospel: { title: 'Gospel of Truth', writer: 'Valentinus', era: 'nt', chapters: 0 },
  john_apocryphon: { title: 'Apocryphon of John', writer: 'John', era: 'nt', chapters: 0 },
  pistis_sophia: { title: 'Pistis Sophia', writer: 'Unknown', era: 'nt', chapters: 0 },
  sophia_jesus: { title: 'Sophia of Jesus Christ', writer: 'Unknown', era: 'nt', chapters: 0 },
  acts_thomas: { title: 'Acts of Thomas', writer: 'Thomas', era: 'nt', chapters: 0 },
  acts_paul_thecla: { title: 'Acts of Paul & Thecla', writer: 'Paul', era: 'nt', chapters: 0 },
  acts_john: { title: 'Acts of John', writer: 'John', era: 'nt', chapters: 0 },
  acts_peter: { title: 'Acts of Peter', writer: 'Peter', era: 'nt', chapters: 0 },
  acts_andrew: { title: 'Acts of Andrew', writer: 'Andrew', era: 'nt', chapters: 0 },
  protoevangelium_james: { title: 'Protoevangelium of James', writer: 'James', era: 'nt', chapters: 0 },
  infancy_thomas: { title: 'Infancy Gospel of Thomas', writer: 'Thomas', era: 'nt', chapters: 0 },
  infancy_arabic: { title: 'Arabic Infancy Gospel', writer: 'Unknown', era: 'nt', chapters: 0 },
  nicodemus_gospel: { title: 'Gospel of Nicodemus', writer: 'Nicodemus', era: 'nt', chapters: 0 },
  peter_gospel: { title: 'Gospel of Peter', writer: 'Peter', era: 'nt', chapters: 0 },
  didache: { title: 'Didache', writer: 'Twelve Apostles', era: 'nt', chapters: 0 },
  hermas: { title: 'Shepherd of Hermas', writer: 'Hermas', era: 'nt', chapters: 0 },
  barnabas_epistle: { title: 'Epistle of Barnabas', writer: 'Barnabas', era: 'nt', chapters: 0 },
  ignatius_epistles: { title: 'Epistles of Ignatius', writer: 'Ignatius', era: 'nt', chapters: 0 },
  polycarp_epistle: { title: 'Epistle of Polycarp', writer: 'Polycarp', era: 'nt', chapters: 0 },
  diognetus: { title: 'Letter to Diognetus', writer: 'Unknown', era: 'nt', chapters: 0 },
  peter_apocalypse: { title: 'Apocalypse of Peter', writer: 'Peter', era: 'nt', chapters: 0 },
  hebrews_gospel: { title: 'Gospel of the Hebrews', writer: 'Unknown', era: 'nt', chapters: 0 },
  ebionites_gospel: { title: 'Gospel of the Ebionites', writer: 'Unknown', era: 'nt', chapters: 0 },
  cave_treasures: { title: 'Cave of Treasures', writer: 'Ephrem the Syrian', era: 'ot', chapters: 0 },
  kitab_majall: { title: 'Book of the Rolls', writer: 'Clement', era: 'ot', chapters: 0 },
};

// ── Helpers ───────────────────────────────────────────

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error for ${url}`)); }
      });
    }).on('error', reject);
  });
}

function fileIdFromName(name) {
  return name.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
}

// ── Main ──────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  ETHIOPIAN CANON BOOK GENERATOR');
  console.log('═══════════════════════════════════════════\n');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Discover existing standard canon files
  const existingFiles = {};
  if (fs.existsSync(BIBLE_DIR)) {
    fs.readdirSync(BIBLE_DIR).filter(f => f.endsWith('.json')).forEach(f => {
      existingFiles[path.basename(f, '.json')] = true;
    });
  }
  console.log(`Found ${Object.keys(existingFiles).length} existing JSON files.\n`);

  // Collect all Ethiopian canon book IDs that need files
  const allIds = Object.keys(ETHIOPIAN_META);
  console.log(`Processing ${allIds.length} Ethiopian canon books...\n`);

  let copied = 0, fetched = 0, placeholder = 0, skipped = 0;

  for (const id of allIds) {
    const meta = ETHIOPIAN_META[id];
    const outName = fileIdFromName(id);
    const outPath = path.join(OUT_DIR, `${outName}.json`);

    // Skip if already exists (e.g., from previous run or standard canon)
    if (existingFiles[outName]) {
      console.log(`  [SKIP] ${id} → ${outName}.json (already exists)`);
      skipped++;
      continue;
    }

    // Case 1: Book maps to existing standard canon file → copy it
    if (BOOK_MAP[id]) {
      const srcName = BOOK_MAP[id];
      const srcPath = path.join(BIBLE_DIR, `${srcName}.json`);
      if (fs.existsSync(srcPath)) {
        const srcData = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
        srcData.bookId = outName;
        srcData.title = meta.title;
        const year = meta.era === 'ot' ? meta.title : meta.title;
        fs.writeFileSync(outPath, JSON.stringify(srcData, null, 2));
        console.log(`  [COPY] ${id} → ${outName}.json (from ${srcName})`);
        copied++;
        continue;
      }
    }

    // Case 2: Fetch from scrollmapper
    if (SCROLLMAPPER_SOURCES[id]) {
      const url = `${SCROLLMAPPER_CDN}/${SCROLLMAPPER_SOURCES[id]}.json`;
      process.stdout.write(`  [FETCH] ${id} ... `);
      try {
        const raw = await fetch(url);
        const book = raw.books && raw.books[0];
        if (book && book.chapters) {
          const chapters = book.chapters.map(ch => ({
            number: ch.chapter,
            verses: ch.verses.map(v => v.text)
          }));
          const output = {
            version: 'Deuterocanonical',
            bookId: outName,
            title: meta.title,
            writer: meta.writer,
            era: meta.era,
            totalChapters: chapters.length,
            chapters
          };
          fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
          process.stdout.write('OK\n');
          fetched++;
          continue;
        }
        process.stdout.write('no chapters found, falling back\n');
      } catch (err) {
        process.stdout.write(`FAILED (${err.message})\n`);
      }
    }

    // Case 3: Create placeholder with metadata
    process.stdout.write(`  [PLACEHOLDER] ${id} ... `);
    const output = {
      version: 'Placeholder',
      bookId: outName,
      title: meta.title,
      writer: meta.writer,
      era: meta.era,
      totalChapters: meta.chapters || 0,
      chapters: [],
      note: 'Digital text not yet available for this book.'
    };
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
    process.stdout.write('OK\n');
    placeholder++;
  }

  console.log(`\n═══════════════════════════════════════════`);
  console.log(`  Results: ${copied} copied, ${fetched} fetched, ${placeholder} placeholders, ${skipped} skipped`);
  console.log(`  Total:   ${copied + fetched + placeholder + skipped} books`);
  console.log(`  Output:  ${OUT_DIR}`);
  console.log(`═══════════════════════════════════════════\n`);
}

main().catch(console.error);
