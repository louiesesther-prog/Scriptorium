const fs = require('fs');
const path = require('path');

const BIBLE_TEXT_DIR = path.join(__dirname, '..', 'assets', 'data', 'bible-text');

// Known chapter counts for each placeholder book
const CHAPTER_COUNTS = {
  ACTS_ANDREW: 65,
  ACTS_JOHN: 115,
  ACTS_PAUL_THECLA: 12,
  ACTS_PETER: 41,
  ACTS_THOMAS: 170,
  CAVE_TREASURES: 55,
  CLEMENT: 65,
  COVENANT_BOOK: 12,
  DIDACHE: 16,
  DIDASCALIA: 26,
  DIOGNETUS: 12,
  EBIONITES_GOSPEL: 7,
  EZRA_SUTUEL: 16,
  HEBREWS_GOSPEL: 7,
  IGNATIUS_EPISTLES: 15,
  INFANCY_ARABIC: 55,
  INFANCY_THOMAS: 19,
  JOHN_APOCRYPHON: 29,
  JUDAS_GOSPEL: 13,
  KITAB_MAJALL: 20,
  LETTER_JEREMIAH: 1,
  MACCABEES3: 7,
  MACCABEES4: 18,
  MARY_GOSPEL: 10,
  MEQABYAN1: 15,
  MEQABYAN2: 15,
  MEQABYAN3: 14,
  PETER_GOSPEL: 14,
  PHILIP_GOSPEL: 127,
  PISTIS_SOPHIA: 142,
  POLYCARP_EPISTLE: 14,
  PROTOEVANGELIUM_JAMES: 25,
  PSEUDO_JOSEPHUS: 15,
  SIBYLLINE: 14,
  SINODOS: 20,
  SOPHIA_JESUS: 126,
  TESTAMENT_PATRIARCHS: 12,
  THOMAS_GOSPEL: 114,
  TRUTH_GOSPEL: 43,
};

const SOURCES = {
  ACTS_ANDREW: 'Acts of Andrew — Ante-Nicene Fathers Vol. VIII (ANF08)',
  ACTS_JOHN: 'Acts of John — Ante-Nicene Fathers Vol. VIII (ANF08)',
  ACTS_PAUL_THECLA: 'Acts of Paul and Thecla — Ante-Nicene Fathers Vol. VIII (ANF08)',
  ACTS_PETER: 'Acts of Peter — Ante-Nicene Fathers Vol. VIII (ANF08)',
  ACTS_THOMAS: 'Acts of Thomas — Ante-Nicene Fathers Vol. VIII (ANF08)',
  CAVE_TREASURES: 'Cave of Treasures — Wallis Budge (1927), public domain',
  CLEMENT: '1 Clement — Ante-Nicene Fathers Vol. I (ANF01)',
  COVENANT_BOOK: 'Covenant of Damascus / Book of the Covenant — early Jewish-Christian text',
  DIDACHE: 'Didache — Ante-Nicene Fathers Vol. VII (ANF07)',
  DIDASCALIA: 'Didascalia Apostolorum — Syriac text (Connolly, 1929)',
  DIOGNETUS: 'Epistle to Diognetus — Ante-Nicene Fathers Vol. I (ANF01)',
  EBIONITES_GOSPEL: 'Gospel of the Ebionites — Schneemelcher, New Testament Apocrypha',
  EZRA_SUTUEL: '4 Ezra (Ezra Sutuel) — Charles, APOT Vol. I',
  HEBREWS_GOSPEL: 'Gospel of the Hebrews — Schneemelcher, New Testament Apocrypha',
  IGNATIUS_EPISTLES: 'Ignatius Epistles — Ante-Nicene Fathers Vol. I (ANF01)',
  INFANCY_ARABIC: 'Arabic Infancy Gospel — Ante-Nicene Fathers Vol. VIII (ANF08)',
  INFANCY_THOMAS: 'Infancy Gospel of Thomas — Ante-Nicene Fathers Vol. VIII (ANF08)',
  JOHN_APOCRYPHON: 'Apocryphon of John — Nag Hammadi Codex II,1',
  JUDAS_GOSPEL: 'Gospel of Judas — Codex Tchacos, National Geographic 2006',
  KITAB_MAJALL: 'Kitab al-Majall (Book of Rolls) — Ethiopic text',
  LETTER_JEREMIAH: 'Letter of Jeremiah (Epistle of Jeremiah) — included in Baruch in some LXX mss',
  MACCABEES3: '3 Maccabees — Septuagint (Rahlfs)',
  MACCABEES4: '4 Maccabees — Septuagint (Rahlfs)',
  MARY_GOSPEL: 'Gospel of Mary — BG 8502,1 + P.Oxy 3525 + P.Ryl 463',
  MEQABYAN1: '1 Meqabyan — Ethiopic Bible (Mäqabǝyan)',
  MEQABYAN2: '2 Meqabyan — Ethiopic Bible',
  MEQABYAN3: '3 Meqabyan — Ethiopic Bible',
  PETER_GOSPEL: 'Gospel of Peter — Akhmim Codex + P.Oxy 2949 + P.Oxy 4009',
  PHILIP_GOSPEL: 'Gospel of Philip — Nag Hammadi Codex II,3',
  PISTIS_SOPHIA: 'Pistis Sophia — Askew Codex (Carl Schmidt translation)',
  POLYCARP_EPISTLE: 'Polycarp\'s Epistle to the Philippians — Ante-Nicene Fathers Vol. I (ANF01)',
  PROTOEVANGELIUM_JAMES: 'Protoevangelium of James — Ante-Nicene Fathers Vol. VIII (ANF08)',
  PSEUDO_JOSEPHUS: 'Pseudo-Josephus (Joseph ben Gurion) — medieval compilation',
  SIBYLLINE: 'Sibylline Oracles — Charles, APOT Vol. II',
  SINODOS: 'Sinodos — Ethiopic canon law / liturgical text',
  SOPHIA_JESUS: 'Eugnostos / Wisdom of Jesus Christ — Nag Hammadi Codex III,4 + V,1',
  TESTAMENT_PATRIARCHS: 'Testaments of the Twelve Patriarchs — Charles, APOT Vol. II',
  THOMAS_GOSPEL: 'Gospel of Thomas — Nag Hammadi Codex II,2 — 114 logia',
  TRUTH_GOSPEL: 'Gospel of Truth — Nag Hammadi Codex I,3 + XII,2',
};

const BOOK_TITLES = {
  ACTS_ANDREW: 'Acts of Andrew',
  ACTS_JOHN: 'Acts of John',
  ACTS_PAUL_THECLA: 'Acts of Paul and Thecla',
  ACTS_PETER: 'Acts of Peter',
  ACTS_THOMAS: 'Acts of Thomas',
  CAVE_TREASURES: 'Cave of Treasures',
  CLEMENT: '1 Clement',
  COVENANT_BOOK: 'Book of the Covenant',
  DIDACHE: 'Didache',
  DIDASCALIA: 'Didascalia Apostolorum',
  DIOGNETUS: 'Epistle to Diognetus',
  EBIONITES_GOSPEL: 'Gospel of the Ebionites',
  EZRA_SUTUEL: '4 Ezra (Ezra Sutuel)',
  HEBREWS_GOSPEL: 'Gospel of the Hebrews',
  IGNATIUS_EPISTLES: 'Ignatius Epistles',
  INFANCY_ARABIC: 'Arabic Infancy Gospel',
  INFANCY_THOMAS: 'Infancy Gospel of Thomas',
  JOHN_APOCRYPHON: 'Apocryphon of John',
  JUDAS_GOSPEL: 'Gospel of Judas',
  KITAB_MAJALL: 'Kitab al-Majall (Book of Rolls)',
  LETTER_JEREMIAH: 'Letter of Jeremiah',
  MACCABEES3: '3 Maccabees',
  MACCABEES4: '4 Maccabees',
  MARY_GOSPEL: 'Gospel of Mary',
  MEQABYAN1: '1 Meqabyan',
  MEQABYAN2: '2 Meqabyan',
  MEQABYAN3: '3 Meqabyan',
  PETER_GOSPEL: 'Gospel of Peter',
  PHILIP_GOSPEL: 'Gospel of Philip',
  PISTIS_SOPHIA: 'Pistis Sophia',
  POLYCARP_EPISTLE: "Polycarp's Epistle to the Philippians",
  PROTOEVANGELIUM_JAMES: 'Protoevangelium of James',
  PSEUDO_JOSEPHUS: 'Pseudo-Josephus',
  SIBYLLINE: 'Sibylline Oracles',
  SINODOS: 'Sinodos',
  SOPHIA_JESUS: 'Wisdom of Jesus Christ',
  TESTAMENT_PATRIARCHS: 'Testaments of the Twelve Patriarchs',
  THOMAS_GOSPEL: 'Gospel of Thomas',
  TRUTH_GOSPEL: 'Gospel of Truth',
};

const WRITERS = {
  ACTS_ANDREW: 'Unknown',
  ACTS_JOHN: 'Unknown',
  ACTS_PAUL_THECLA: 'Unknown',
  ACTS_PETER: 'Unknown',
  ACTS_THOMAS: 'Unknown',
  CAVE_TREASURES: 'Unknown (attributed to Ephrem Syrus)',
  CLEMENT: 'Clement of Rome',
  COVENANT_BOOK: 'Unknown (damascus tradition)',
  DIDACHE: 'Unknown (early church manual)',
  DIDASCALIA: 'Unknown (3rd-century church order)',
  DIOGNETUS: 'Unknown',
  EBIONITES_GOSPEL: 'Unknown (Ebionite tradition)',
  EZRA_SUTUEL: 'Unknown (Jewish apocalypse, late 1st cent.)',
  HEBREWS_GOSPEL: 'Unknown (Jewish Christian tradition)',
  IGNATIUS_EPISTLES: 'Ignatius of Antioch',
  INFANCY_ARABIC: 'Unknown',
  INFANCY_THOMAS: 'Unknown',
  JOHN_APOCRYPHON: 'Unknown (gnostic tradition)',
  JUDAS_GOSPEL: 'Unknown (gnostic tradition)',
  KITAB_MAJALL: 'Unknown (Ethiopic tradition)',
  LETTER_JEREMIAH: 'Jeremiah (pseudepigraphal)',
  MACCABEES3: 'Unknown (Hellenistic Jewish)',
  MACCABEES4: 'Unknown (Hellenistic Jewish)',
  MARY_GOSPEL: 'Unknown (gnostic tradition)',
  MEQABYAN1: 'Unknown (Ethiopic tradition)',
  MEQABYAN2: 'Unknown (Ethiopic tradition)',
  MEQABYAN3: 'Unknown (Ethiopic tradition)',
  PETER_GOSPEL: 'Unknown (docetic tradition)',
  PHILIP_GOSPEL: 'Unknown (gnostic tradition)',
  PISTIS_SOPHIA: 'Unknown (Valentinian gnostic)',
  POLYCARP_EPISTLE: 'Polycarp of Smyrna',
  PROTOEVANGELIUM_JAMES: 'Unknown (attributed to James)',
  PSEUDO_JOSEPHUS: 'Joseph ben Gurion (pseudepigraphal)',
  SIBYLLINE: 'Unknown (Hellenistic Jewish / Christian)',
  SINODOS: 'Unknown (Ethiopic church tradition)',
  SOPHIA_JESUS: 'Unknown (gnostic tradition)',
  TESTAMENT_PATRIARCHS: 'Unknown (Hellenistic Jewish)',
  THOMAS_GOSPEL: 'Unknown (attributed to Didymus Judas Thomas)',
  TRUTH_GOSPEL: 'Unknown (Valentinian gnostic)',
};

const ERAS = {
  ACTS_ANDREW: 'nt',
  ACTS_JOHN: 'nt',
  ACTS_PAUL_THECLA: 'nt',
  ACTS_PETER: 'nt',
  ACTS_THOMAS: 'nt',
  CAVE_TREASURES: 'ot',
  CLEMENT: 'nt',
  COVENANT_BOOK: 'ot',
  DIDACHE: 'nt',
  DIDASCALIA: 'nt',
  DIOGNETUS: 'nt',
  EBIONITES_GOSPEL: 'nt',
  EZRA_SUTUEL: 'ot',
  HEBREWS_GOSPEL: 'nt',
  IGNATIUS_EPISTLES: 'nt',
  INFANCY_ARABIC: 'nt',
  INFANCY_THOMAS: 'nt',
  JOHN_APOCRYPHON: 'nt',
  JUDAS_GOSPEL: 'nt',
  KITAB_MAJALL: 'ot',
  LETTER_JEREMIAH: 'ot',
  MACCABEES3: 'ot',
  MACCABEES4: 'ot',
  MARY_GOSPEL: 'nt',
  MEQABYAN1: 'ot',
  MEQABYAN2: 'ot',
  MEQABYAN3: 'ot',
  PETER_GOSPEL: 'nt',
  PHILIP_GOSPEL: 'nt',
  PISTIS_SOPHIA: 'nt',
  POLYCARP_EPISTLE: 'nt',
  PROTOEVANGELIUM_JAMES: 'nt',
  PSEUDO_JOSEPHUS: 'ot',
  SIBYLLINE: 'ot',
  SINODOS: 'nt',
  SOPHIA_JESUS: 'nt',
  TESTAMENT_PATRIARCHS: 'ot',
  THOMAS_GOSPEL: 'nt',
  TRUTH_GOSPEL: 'nt',
};

function generateChapter(chapterNum) {
  return { number: chapterNum, verses: [] };
}

function generateChapters(total) {
  const chapters = [];
  for (let i = 1; i <= total; i++) {
    chapters.push(generateChapter(i));
  }
  return chapters;
}

let count = 0;
for (const [bookId, totalChapters] of Object.entries(CHAPTER_COUNTS)) {
  const filePath = path.join(BIBLE_TEXT_DIR, `${bookId}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`  SKIP: ${filePath} not found`);
    continue;
  }
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (existing.version !== 'Placeholder') {
    console.log(`  SKIP: ${bookId} already has content`);
    continue;
  }

  const data = {
    version: 'Generated from public domain sources — chapter structure only',
    bookId,
    title: BOOK_TITLES[bookId] || existing.title,
    writer: WRITERS[bookId] || existing.writer,
    era: ERAS[bookId] || existing.era,
    totalChapters,
    chapters: generateChapters(totalChapters),
    note: `Text pending. Source: ${SOURCES[bookId] || 'public domain early Christian/apocryphal text.'}`,
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  WRITTEN: ${bookId}.json (${totalChapters} chapters, ${SOURCES[bookId] || '?'})`);
  count++;
}

console.log(`\nDone. ${count} placeholder files updated.`);
