const TRADITIONS = [
  { id:'general', label:'General / All Traditions', icon:'\u271D' },
  { id:'reformed', label:'Reformed / Presbyterian', icon:'\uD83D\uDD4E' },
  { id:'evangelical', label:'Evangelical / Charismatic', icon:'\uD83D\uDD25' },
  { id:'anglican', label:'Anglican / Episcopal', icon:'\u2694' },
  { id:'catholic', label:'Roman Catholic', icon:'\u2622' },
  { id:'orthodox', label:'Eastern Orthodox', icon:'\uD83D\uDE4F' },
  { id:'lutheran', label:'Lutheran', icon:'\u271C' }
];

const PLANS = [
  {
    id: 'genesis-30',
    name: 'Genesis in 30 Days',
    description: 'Read the book of beginnings — from creation to the patriarchs. One chapter or fewer per day.',
    category: 'book',
    tradition: 'general',
    estimatedMinutes: 10,
    totalDays: 30,
    color: '#8B4513',
    days: [
      'Genesis 1','Genesis 2','Genesis 3','Genesis 4','Genesis 5',
      'Genesis 6','Genesis 7','Genesis 8','Genesis 9','Genesis 10-11',
      'Genesis 12','Genesis 13','Genesis 14','Genesis 15','Genesis 16',
      'Genesis 17','Genesis 18','Genesis 19','Genesis 20','Genesis 21',
      'Genesis 22','Genesis 23','Genesis 24','Genesis 25','Genesis 26-27',
      'Genesis 28','Genesis 29','Genesis 30-31','Genesis 32-33','Genesis 34-36'
    ]
  },
  {
    id: 'psalms-30',
    name: 'Psalms in 30 Days',
    description: 'Five psalms per day — experience the full Psalter in one month.',
    category: 'book',
    tradition: 'general',
    estimatedMinutes: 15,
    totalDays: 30,
    color: '#2E8B57',
    days: [
      'Psalms 1-5','Psalms 6-10','Psalms 11-15','Psalms 16-20','Psalms 21-25',
      'Psalms 26-30','Psalms 31-35','Psalms 36-40','Psalms 41-45','Psalms 46-50',
      'Psalms 51-55','Psalms 56-60','Psalms 61-65','Psalms 66-70','Psalms 71-75',
      'Psalms 76-80','Psalms 81-85','Psalms 86-90','Psalms 91-95','Psalms 96-100',
      'Psalms 101-105','Psalms 106-110','Psalms 111-115','Psalms 116-120','Psalms 121-125',
      'Psalms 126-130','Psalms 131-135','Psalms 136-140','Psalms 141-145','Psalms 146-150'
    ]
  },
  {
    id: 'proverbs-31',
    name: 'Proverbs in 31 Days',
    description: 'A chapter of Proverbs each day — wisdom for every day of the month.',
    category: 'book',
    tradition: 'general',
    estimatedMinutes: 8,
    totalDays: 31,
    color: '#DAA520',
    days: [
      'Proverbs 1','Proverbs 2','Proverbs 3','Proverbs 4','Proverbs 5',
      'Proverbs 6','Proverbs 7','Proverbs 8','Proverbs 9','Proverbs 10',
      'Proverbs 11','Proverbs 12','Proverbs 13','Proverbs 14','Proverbs 15',
      'Proverbs 16','Proverbs 17','Proverbs 18','Proverbs 19','Proverbs 20',
      'Proverbs 21','Proverbs 22','Proverbs 23','Proverbs 24','Proverbs 25',
      'Proverbs 26','Proverbs 27','Proverbs 28','Proverbs 29','Proverbs 30',
      'Proverbs 31'
    ]
  },
  {
    id: 'gospels-28',
    name: 'The Gospels in 28 Days',
    description: 'One gospel per week. Walk through the life of Christ in four weeks.',
    category: 'testament',
    tradition: 'general',
    estimatedMinutes: 20,
    totalDays: 28,
    color: '#D4AF37',
    days: [
      'Matthew 1-4','Matthew 5-7','Matthew 8-10','Matthew 11-13','Matthew 14-16','Matthew 17-20','Matthew 21-24',
      'Matthew 25-28','Mark 1-3','Mark 4-6','Mark 7-9','Mark 10-12','Mark 13-16','Review Matthew-Mark',
      'Luke 1-3','Luke 4-6','Luke 7-9','Luke 10-12','Luke 13-16','Luke 17-20','Luke 21-24',
      'John 1-3','John 4-6','John 7-10','John 11-13','John 14-17','John 18-21','Review the Gospels'
    ]
  },
  {
    id: 'nt-90',
    name: 'New Testament in 90 Days',
    description: 'Read the entire New Testament in three months. A chapter or two per day.',
    category: 'testament',
    tradition: 'general',
    estimatedMinutes: 15,
    totalDays: 90,
    color: '#B8860B',
    days: [
      'Matthew 1','Matthew 2','Matthew 3','Matthew 4','Matthew 5','Matthew 6','Matthew 7','Matthew 8','Matthew 9','Matthew 10',
      'Matthew 11','Matthew 12','Matthew 13','Matthew 14','Matthew 15','Matthew 16','Matthew 17','Matthew 18','Matthew 19','Matthew 20',
      'Matthew 21','Matthew 22','Matthew 23','Matthew 24','Matthew 25','Matthew 26','Matthew 27','Matthew 28','Mark 1','Mark 2',
      'Mark 3','Mark 4','Mark 5','Mark 6','Mark 7','Mark 8','Mark 9','Mark 10','Mark 11','Mark 12',
      'Mark 13','Mark 14','Mark 15','Mark 16','Luke 1','Luke 2','Luke 3','Luke 4','Luke 5','Luke 6',
      'Luke 7','Luke 8','Luke 9','Luke 10','Luke 11','Luke 12','Luke 13','Luke 14','Luke 15','Luke 16',
      'Luke 17','Luke 18','Luke 19','Luke 20','Luke 21','Luke 22','Luke 23','Luke 24','John 1','John 2',
      'John 3','John 4','John 5','John 6','John 7','John 8','John 9','John 10','John 11','John 12',
      'John 13','John 14','John 15','John 16','John 17','John 18','John 19','John 20','John 21','Acts 1-2'
    ]
  },
  {
    id: 'moses-40',
    name: 'The Torah in 40 Days',
    description: 'Walk through the five books of Moses — Genesis through Deuteronomy.',
    category: 'section',
    tradition: 'general',
    estimatedMinutes: 18,
    totalDays: 40,
    color: '#CD853F',
    days: [
      'Genesis 1-3','Genesis 4-7','Genesis 8-11','Genesis 12-15','Genesis 16-19',
      'Genesis 20-23','Genesis 24-26','Genesis 27-30','Genesis 31-33','Genesis 34-36',
      'Genesis 37-40','Genesis 41-42','Genesis 43-45','Genesis 46-48','Genesis 49-50',
      'Exodus 1-3','Exodus 4-6','Exodus 7-10','Exodus 11-13','Exodus 14-16',
      'Exodus 17-20','Exodus 21-24','Exodus 25-28','Exodus 29-31','Exodus 32-34',
      'Exodus 35-40','Leviticus 1-5','Leviticus 6-10','Leviticus 11-15','Leviticus 16-20',
      'Leviticus 21-25','Leviticus 26-27','Numbers 1-4','Numbers 5-8','Numbers 9-12',
      'Numbers 13-16','Numbers 17-21','Numbers 22-26','Numbers 27-30','Numbers 31-36'
    ]
  },
  {
    id: 'prophets-60',
    name: 'The Prophets in 60 Days',
    description: 'Read all the major and minor prophets — from Isaiah to Malachi.',
    category: 'section',
    tradition: 'general',
    estimatedMinutes: 15,
    totalDays: 60,
    color: '#8B0000',
    days: [
      'Isaiah 1-3','Isaiah 4-7','Isaiah 8-11','Isaiah 12-15','Isaiah 16-19',
      'Isaiah 20-23','Isaiah 24-27','Isaiah 28-30','Isaiah 31-34','Isaiah 35-37',
      'Isaiah 38-40','Isaiah 41-43','Isaiah 44-47','Isaiah 48-50','Isaiah 51-53',
      'Isaiah 54-57','Isaiah 58-60','Isaiah 61-63','Isaiah 64-66','Jeremiah 1-3',
      'Jeremiah 4-6','Jeremiah 7-9','Jeremiah 10-12','Jeremiah 13-15','Jeremiah 16-18',
      'Jeremiah 19-21','Jeremiah 22-24','Jeremiah 25-27','Jeremiah 28-30','Jeremiah 31-33',
      'Jeremiah 34-36','Jeremiah 37-39','Jeremiah 40-42','Jeremiah 43-45','Jeremiah 46-48',
      'Jeremiah 49-50','Jeremiah 51-52','Ezekiel 1-4','Ezekiel 5-8','Ezekiel 9-12',
      'Ezekiel 13-16','Ezekiel 17-20','Ezekiel 21-24','Ezekiel 25-28','Ezekiel 29-32',
      'Ezekiel 33-36','Ezekiel 37-40','Ezekiel 41-44','Ezekiel 45-48','Daniel 1-3',
      'Daniel 4-6','Daniel 7-9','Daniel 10-12','Hosea-Joel','Amos-Obadiah',
      'Jonah-Micah','Nahum-Habakkuk','Zephaniah-Haggai','Zechariah','Malachi'
    ]
  },
  {
    id: 'paul-30',
    name: 'Paul\'s Letters in 30 Days',
    description: 'Read all of the Apostle Paul\'s epistles in chronological order.',
    category: 'section',
    tradition: 'general',
    estimatedMinutes: 12,
    totalDays: 30,
    color: '#4B0082',
    days: [
      'Galatians 1-2','Galatians 3-4','Galatians 5-6','1 Thessalonians 1-3','1 Thessalonians 4-5',
      '2 Thessalonians 1-3','1 Corinthians 1-2','1 Corinthians 3-4','1 Corinthians 5-7','1 Corinthians 8-10',
      '1 Corinthians 11-12','1 Corinthians 13-14','1 Corinthians 15-16','2 Corinthians 1-2','2 Corinthians 3-5',
      '2 Corinthians 6-7','2 Corinthians 8-9','2 Corinthians 10-11','2 Corinthians 12-13','Romans 1-3',
      'Romans 4-6','Romans 7-9','Romans 10-12','Romans 13-15','Romans 16',
      'Ephesians 1-3','Ephesians 4-6','Philippians 1-4','Colossians 1-4','Philemon+Pastorals'
    ]
  },
  // Westminster Confession / Reformed covenants
  {
    id: 'westminster-30',
    name: 'Westminster in 30 Days',
    description: 'Read the Westminster Shorter Catechism and Confession with daily Scripture proofs. A cornerstone of Reformed catechesis.',
    category: 'section',
    tradition: 'reformed',
    estimatedMinutes: 12,
    totalDays: 30,
    color: '#2C3E50',
    days: [
      'WSC 1-5 — Man\'s Chief End','WSC 6-10 — The Triune God','WSC 11-15 — Creation & Providence','WSC 16-21 — The Fall','WSC 22-28 — Christ the Mediator',
      'WCF 1 — Holy Scripture','WCF 2 — God & the Trinity','WCF 3 — God\'s Decree','WCF 4 — Creation','WCF 5 — Providence',
      'WCF 6 — The Fall & Sin','WCF 7 — God\'s Covenant','WCF 8 — Christ the Mediator','WCF 9 — Free Will','WCF 10 — Effectual Calling',
      'WCF 11 — Justification','WCF 12 — Adoption','WCF 13 — Sanctification','WCF 14 — Saving Faith','WCF 15 — Repentance',
      'WCF 16 — Good Works','WCF 17 — Perseverance','WCF 18 — Assurance','WCF 19 — The Law of God','WCF 20 — Christian Liberty',
      'WCF 21 — Worship & Sabbath','WCF 22 — Oaths & Vows','WCF 23 — Civil Magistrates','WCF 24 — Marriage','WCF 25-33 — Church, Sacraments, Last Things'
    ]
  },
  // Charismatic / Spirit-filled
  {
    id: 'holy-spirit-21',
    name: 'The Spirit in 21 Days',
    description: 'A Spirit-filled walk through the Holy Spirit in Scripture — from Genesis to Pentecost and beyond.',
    category: 'section',
    tradition: 'evangelical',
    estimatedMinutes: 15,
    totalDays: 21,
    color: '#DC143C',
    days: [
      'Genesis 1 — The Spirit over the waters','Exodus 31 — Bezalel filled with the Spirit','Numbers 11 — The Spirit on the 70 elders','1 Samuel 10 — Saul prophesies','2 Kings 2 — Elisha receives a double portion',
      'Isaiah 61 — The Spirit of the Lord is upon me','Ezekiel 37 — Valley of dry bones','Joel 2 — I will pour out my Spirit','Zechariah 4 — Not by might, not by power','Matthew 3 — The Spirit descends like a dove',
      'John 3 — Born of the Spirit','John 14 — The Spirit of truth','John 16 — He will guide you','Acts 1 — You will receive power','Acts 2 — Pentecost',
      'Acts 8 — The Spirit in Samaria','Acts 10 — The Spirit falls on Gentiles','Acts 19 — The Spirit at Ephesus','Romans 8 — Walking by the Spirit','1 Corinthians 12 — Gifts of the Spirit',
      'Galatians 5 — The fruit of the Spirit'
    ]
  },
  // Creeds & Councils (broad-tradition)
  {
    id: 'creeds-14',
    name: 'Creeds of the Church in 14 Days',
    description: 'The great creeds and councils that shaped the global Church — from Nicaea to Chalcedon.',
    category: 'section',
    tradition: 'general',
    estimatedMinutes: 10,
    totalDays: 14,
    color: '#8B4513',
    days: [
      'The Apostles\' Creed — Foundations','The Nicene Creed (325) — Against Arianism','The Nicene Creed (381) — The Spirit proceeds','The Athanasian Creed — The Trinity & Incarnation','The Definition of Chalcedon — Two natures',
      'The Council of Ephesus — Theotokos','The Second Council of Constantinople','The Third Council of Constantinople','The Second Council of Nicaea — Icons','The Augsburg Confession — Lutheran',
      'The Thirty-Nine Articles — Anglican','The Westminster Confession — Reformed','The Council of Trent (excerpts) — Catholic','Barmen Declaration — Confessing Church'
    ]
  }
];

function getPlan(id) {
  return PLANS.find(function(p) { return p.id === id; }) || null;
}

function listPlans(category, tradition) {
  var results = PLANS;
  if (category) results = results.filter(function(p) { return p.category === category; });
  if (tradition) results = results.filter(function(p) { return p.tradition === tradition || p.tradition === 'general'; });
  return results;
}

module.exports = { PLANS, TRADITIONS, getPlan, listPlans };
