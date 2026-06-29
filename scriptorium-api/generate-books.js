const https = require('https');
const fs = require('fs');
const path = require('path');

// Use raw GitHub URL — jsDelivr may not handle filenames with spaces correctly
const CDN = 'https://raw.githubusercontent.com/aruljohn/Bible-niv/main';

const WRITERS = {
  'Genesis': 'Moses', 'Exodus': 'Moses', 'Leviticus': 'Moses',
  'Numbers': 'Moses', 'Deuteronomy': 'Moses',
  'Joshua': 'Joshua', 'Judges': 'Samuel', 'Ruth': 'Samuel',
  '1 Samuel': 'Samuel', '2 Samuel': 'Samuel',
  '1 Kings': 'Jeremiah', '2 Kings': 'Jeremiah',
  '1 Chronicles': 'Ezra', '2 Chronicles': 'Ezra',
  'Ezra': 'Ezra', 'Nehemiah': 'Nehemiah', 'Esther': 'Mordecai',
  'Job': 'Moses', 'Psalms': 'David', 'Proverbs': 'Solomon',
  'Ecclesiastes': 'Solomon', 'Song of Solomon': 'Solomon',
  'Isaiah': 'Isaiah', 'Jeremiah': 'Jeremiah',
  'Lamentations': 'Jeremiah', 'Ezekiel': 'Ezekiel', 'Daniel': 'Daniel',
  'Hosea': 'Hosea', 'Joel': 'Joel', 'Amos': 'Amos',
  'Obadiah': 'Obadiah', 'Jonah': 'Jonah', 'Micah': 'Micah',
  'Nahum': 'Nahum', 'Habakkuk': 'Habakkuk', 'Zephaniah': 'Zephaniah',
  'Haggai': 'Haggai', 'Zechariah': 'Zechariah', 'Malachi': 'Malachi',
  'Matthew': 'Matthew', 'Mark': 'Mark', 'Luke': 'Luke', 'John': 'John',
  'Acts': 'Luke',
  'Romans': 'Paul', '1 Corinthians': 'Paul', '2 Corinthians': 'Paul',
  'Galatians': 'Paul', 'Ephesians': 'Paul', 'Philippians': 'Paul',
  'Colossians': 'Paul', '1 Thessalonians': 'Paul', '2 Thessalonians': 'Paul',
  '1 Timothy': 'Paul', '2 Timothy': 'Paul', 'Titus': 'Paul',
  'Philemon': 'Paul',
  'Hebrews': 'Paul',
  'James': 'James', '1 Peter': 'Peter', '2 Peter': 'Peter',
  '1 John': 'John', '2 John': 'John', '3 John': 'John',
  'Jude': 'Jude',
  'Revelation': 'John'
};

const OUT_DIR = path.join(__dirname, '..', 'assets', 'data', 'bible-text');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function normalizeName(name) {
  return name.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
}

function getEra(index) {
  return index < 39 ? 'ot' : 'nt';
}

async function main() {
  console.log('Fetching NIV book list...');
  const books = await fetch(`${CDN}/Books.json`);
  console.log(`Found ${books.length} books (${books.slice(0, 39).length} OT, ${books.slice(39).length} NT)\n`);

  let success = 0;

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (let i = 0; i < books.length; i++) {
    const name = books[i];
    const era = getEra(i);
    const bookId = normalizeName(name);
    const filePath = path.join(OUT_DIR, `${bookId}.json`);

    process.stdout.write(`[${i + 1}/${books.length}] ${name} → ${bookId}.json ... `);

    try {
      // Use book name directly from Books.json — files are named with spaces (e.g. "1 Samuel.json")
      const raw = await fetch(`${CDN}/${encodeURIComponent(name)}.json`);

      const chapters = raw.chapters.map(ch => ({
        number: ch.chapter,
        verses: ch.verses.map(v => v.text)
      }));

      const output = {
        version: 'NIV',
        bookId,
        title: name,
        writer: WRITERS[name] || 'Unknown',
        era,
        totalChapters: chapters.length,
        chapters
      };

      fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
      process.stdout.write('OK\n');
      success++;
    } catch (err) {
      process.stdout.write(`FAILED — ${err.message}\n`);
    }
  }

  console.log(`\nDone. ${success}/${books.length} OK.`);
}

main().catch(console.error);
