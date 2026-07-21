var CHALLENGE_CYCLE = [
  { book: 'Matthew',   chapters: 28, color: '#D4AF37', description: 'Read the Gospel of Matthew cover to cover — one chapter per day.' },
  { book: 'Mark',      chapters: 16, color: '#8B4513', description: 'The shortest gospel — two chapters per day through Mark\'s urgent account.' },
  { book: 'Luke',      chapters: 24, color: '#2E8B57', description: 'Luke\'s detailed narrative — one chapter per day.' },
  { book: 'John',      chapters: 21, color: '#4B0082', description: 'The Beloved Disciple\'s testimony — one chapter daily.' },
  { book: 'Acts',      chapters: 28, color: '#B8860B', description: 'The birth of the Church — one chapter per day through Acts.' },
  { book: 'Genesis',   chapters: 50, color: '#CD853F', description: 'From creation to covenant — two chapters per day.' },
  { book: 'Exodus',    chapters: 40, color: '#8B0000', description: 'Deliverance from Egypt — two chapters per day.' },
  { book: 'Psalms',    chapters: 150, color: '#DAA520', description: 'Five psalms per day — the Psalter in one month.' },
  { book: 'Proverbs',  chapters: 31, color: '#87CEEB', description: 'A chapter of wisdom each day.' },
  { book: 'Isaiah',    chapters: 66, color: '#A0522D', description: 'The vision of Isaiah — two chapters per day.' },
  { book: 'Romans',    chapters: 16, color: '#DC143C', description: 'Paul\'s magnum opus — half a chapter per day.' },
  { book: 'Revelation', chapters: 22, color: '#FF4500', description: 'The final vision — one chapter daily.' }
];

var CHALLENGE_CACHE = null;
var CHALLENGE_CACHE_MONTH = null;
var CHALLENGE_CACHE_YEAR = null;

function getMonthName(m) {
  var names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return names[m - 1] || '';
}

function generateChallenges() {
  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth() + 1;
  var challenges = [];
  for (var offset = 0; offset < 12; offset++) {
    var m = ((currentMonth - 1 + offset) % 12) + 1;
    var y = currentYear + Math.floor((currentMonth - 1 + offset) / 12);
    var idx = ((m - 1) + (y - currentYear) * 12) % CHALLENGE_CYCLE.length;
    var template = CHALLENGE_CYCLE[idx];
    var daysInMonth = new Date(y, m, 0).getDate();
    var chaptersPerDay = Math.ceil(template.chapters / daysInMonth);
    challenges.push({
      id: 'challenge-' + y + '-' + String(m).padStart(2, '0'),
      book: template.book,
      month: m,
      year: y,
      monthName: getMonthName(m) + ' ' + y,
      totalChapters: template.chapters,
      totalDays: daysInMonth,
      chaptersPerDay: chaptersPerDay,
      description: template.description,
      color: template.color,
      current: offset === 0,
      active: offset < 3
    });
  }
  return challenges;
}

function listChallenges() {
  var now = new Date();
  var curMonth = now.getMonth() + 1;
  var curYear = now.getFullYear();
  if (!CHALLENGE_CACHE || CHALLENGE_CACHE_MONTH !== curMonth || CHALLENGE_CACHE_YEAR !== curYear) {
    CHALLENGE_CACHE = generateChallenges();
    CHALLENGE_CACHE_MONTH = curMonth;
    CHALLENGE_CACHE_YEAR = curYear;
  }
  return CHALLENGE_CACHE;
}

function getChallenge(id) {
  var all = listChallenges();
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) return all[i];
  }
  return null;
}

function getCurrentChallenge() {
  var all = listChallenges();
  for (var i = 0; i < all.length; i++) {
    if (all[i].current) return all[i];
  }
  return all[0] || null;
}

module.exports = { listChallenges, getChallenge, getCurrentChallenge, CHALLENGE_CYCLE };
