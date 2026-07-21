var AV_API = 'https://www.audioverse.org/api/v1/english';
var audioCache = {};
var CACHE_TTL = 7200000; // 2 hours
var FETCH_TIMEOUT = 3000; // 3 seconds max

var bookSlugs = {
  'Genesis':'genesis','Exodus':'exodus','Leviticus':'leviticus','Numbers':'numbers',
  'Deuteronomy':'deuteronomy','Joshua':'joshua','Judges':'judges','Ruth':'ruth',
  '1 Samuel':'1-samuel','2 Samuel':'2-samuel','1 Kings':'1-kings','2 Kings':'2-kings',
  '1 Chronicles':'1-chronicles','2 Chronicles':'2-chronicles','Ezra':'ezra',
  'Nehemiah':'nehemiah','Esther':'esther','Job':'job','Psalms':'psalms',
  'Proverbs':'proverbs','Ecclesiastes':'ecclesiastes','Song of Solomon':'song-of-solomon',
  'Isaiah':'isaiah','Jeremiah':'jeremiah','Lamentations':'lamentations',
  'Ezekiel':'ezekiel','Daniel':'daniel',
  'Hosea':'hosea','Joel':'joel','Amos':'amos','Obadiah':'obadiah',
  'Jonah':'jonah','Micah':'micah','Nahum':'nahum','Habakkuk':'habakkuk',
  'Zephaniah':'zephaniah','Haggai':'haggai','Zechariah':'zechariah','Malachi':'malachi',
  'Matthew':'matthew','Mark':'mark','Luke':'luke','John':'john','Acts':'acts',
  'Romans':'romans','1 Corinthians':'1-corinthians','2 Corinthians':'2-corinthians',
  'Galatians':'galatians','Ephesians':'ephesians','Philippians':'philippians',
  'Colossians':'colossians','1 Thessalonians':'1-thessalonians',
  '2 Thessalonians':'2-thessalonians','1 Timothy':'1-timothy','2 Timothy':'2-timothy',
  'Titus':'titus','Philemon':'philemon','Hebrews':'hebrews',
  'James':'james','1 Peter':'1-peter','2 Peter':'2-peter',
  '1 John':'1-john','2 John':'2-john','3 John':'3-john','Jude':'jude',
  'Revelation':'revelation'
};

var logger = require('./logger');

function cached(key, ttl) {
  var entry = audioCache[key];
  if (entry && Date.now() - entry.ts < ttl) return entry.data;
  return null;
}

function setCache(key, data) {
  audioCache[key] = { ts: Date.now(), data: data };
}

async function fetchJSON(url) {
  try {
    var resp = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT) });
    if (!resp.ok) return null;
    return await resp.json();
  } catch (e) {
    return null;
  }
}

// Prewarm cache for the most commonly read books (NT + Pentateuch + Psalms)
var WARM_BOOKS = ['Matthew','Mark','Luke','John','Acts','Romans','Genesis','Psalms','Isaiah','Revelation'];
function prewarmCache() {
  WARM_BOOKS.forEach(function(book) {
    var slug = bookSlugs[book];
    if (!slug) return;
    fetchJSON(AV_API + '/audiobooks/' + slug + '/chapters').then(function(data) {
      if (data) setCache('chapters_' + slug, data);
    });
  });
  logger.info('Audio Bible: prewarming cache for ' + WARM_BOOKS.length + ' books');
}
// Fire-and-forget prewarm (does not block startup)
if (typeof setImmediate !== 'undefined') setImmediate(prewarmCache);
else setTimeout(prewarmCache, 100);

async function getAudioForChapter(bookName, chapter) {
  var slug = bookSlugs[bookName];
  if (!slug) return { available: false };

  var cacheKey = 'chapters_' + slug;
  var chaptersData = cached(cacheKey, CACHE_TTL);

  if (!chaptersData) {
    chaptersData = await fetchJSON(AV_API + '/audiobooks/' + slug + '/chapters');
    if (chaptersData) setCache(cacheKey, chaptersData);
    else return { available: false };
  }

  if (!chaptersData || !chaptersData.chapters) {
    return { available: false };
  }

  var ch = chaptersData.chapters.find(function(c) {
    return c.number === chapter || c.chapter === chapter;
  });

  if (!ch) return { available: false };

  var audioUrl = ch.audioUrl || ch.url || ch.audio || ch.file || ch.mp3;

  if (!audioUrl && (ch.id || ch.number)) {
    var audioData = await fetchJSON(AV_API + '/audiobooks/' + slug + '/chapters/' + (ch.id || ch.number) + '/audio');
    if (audioData) audioUrl = audioData.url || audioData.audioUrl;
  }

  if (!audioUrl) return { available: false };

  return { available: true, url: audioUrl, book: bookName, chapter: chapter, title: ch.title || ch.name || '' };
}

function clearCache() {
  audioCache = {};
}

module.exports = { getAudioForChapter: getAudioForChapter, clearCache: clearCache };
