(function() {
  'use strict';

  var OT_BOOKS = [
    ['Genesis',50],['Exodus',40],['Leviticus',27],['Numbers',36],['Deuteronomy',34],
    ['Joshua',24],['Judges',21],['Ruth',4],['1 Samuel',31],['2 Samuel',24],
    ['1 Kings',22],['2 Kings',25],['1 Chronicles',29],['2 Chronicles',36],
    ['Ezra',10],['Nehemiah',13],['Esther',10],['Job',42],['Psalms',150],
    ['Proverbs',31],['Ecclesiastes',12],['Song of Solomon',8],
    ['Isaiah',66],['Jeremiah',52],['Lamentations',5],['Ezekiel',48],['Daniel',12],
    ['Hosea',14],['Joel',3],['Amos',9],['Obadiah',1],['Jonah',4],['Micah',7],
    ['Nahum',3],['Habakkuk',3],['Zephaniah',3],['Haggai',2],['Zechariah',14],['Malachi',4]
  ];

  var PSALM_CHAPTERS = 150;

  var NT_EPISTLE_BOOKS = [
    ['Acts',28],['Romans',16],['1 Corinthians',16],['2 Corinthians',13],
    ['Galatians',6],['Ephesians',6],['Philippians',4],['Colossians',4],
    ['1 Thessalonians',5],['2 Thessalonians',3],['1 Timothy',6],['2 Timothy',4],
    ['Titus',3],['Philemon',1],['Hebrews',13],['James',5],
    ['1 Peter',5],['2 Peter',3],['1 John',5],['2 John',1],['3 John',1],
    ['Jude',1],['Revelation',22]
  ];

  var GOSPEL_BOOKS = [
    ['Matthew',28],['Mark',16],['Luke',24],['John',21]
  ];

  var FEASTS = {
    '12-25':{label:'Christmas — The Nativity',readings:[
      {type:'OT',book:'Isaiah',chapter:9,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:98,testament:'ot'},
      {type:'NT',book:'Titus',chapter:2,testament:'nt'},
      {type:'GOSPEL',book:'Luke',chapter:2,testament:'nt'}
    ]},
    '01-06':{label:'Epiphany — The Magi',readings:[
      {type:'OT',book:'Isaiah',chapter:60,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:72,testament:'ot'},
      {type:'NT',book:'Ephesians',chapter:3,testament:'nt'},
      {type:'GOSPEL',book:'Matthew',chapter:2,testament:'nt'}
    ]},
    '01-01':{label:'New Year — Circumcision of Christ',readings:[
      {type:'OT',book:'Numbers',chapter:6,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:90,testament:'ot'},
      {type:'NT',book:'Romans',chapter:2,testament:'nt'},
      {type:'GOSPEL',book:'Luke',chapter:2,testament:'nt'}
    ]},
    '03-25':{label:'Annunciation',readings:[
      {type:'OT',book:'Isaiah',chapter:7,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:40,testament:'ot'},
      {type:'NT',book:'Hebrews',chapter:10,testament:'nt'},
      {type:'GOSPEL',book:'Luke',chapter:1,testament:'nt'}
    ]},
    '08-06':{label:'Transfiguration',readings:[
      {type:'OT',book:'Exodus',chapter:24,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:99,testament:'ot'},
      {type:'NT',book:'2 Peter',chapter:1,testament:'nt'},
      {type:'GOSPEL',book:'Matthew',chapter:17,testament:'nt'}
    ]},
    '09-14':{label:'Exaltation of the Cross',readings:[
      {type:'OT',book:'Numbers',chapter:21,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:22,testament:'ot'},
      {type:'NT',book:'Philippians',chapter:2,testament:'nt'},
      {type:'GOSPEL',book:'John',chapter:3,testament:'nt'}
    ]},
    '11-01':{label:'All Saints',readings:[
      {type:'OT',book:'Isaiah',chapter:25,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:149,testament:'ot'},
      {type:'NT',book:'Revelation',chapter:7,testament:'nt'},
      {type:'GOSPEL',book:'Matthew',chapter:5,testament:'nt'}
    ]},
    '02-02':{label:'Presentation of Christ',readings:[
      {type:'OT',book:'Malachi',chapter:3,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:24,testament:'ot'},
      {type:'NT',book:'Hebrews',chapter:2,testament:'nt'},
      {type:'GOSPEL',book:'Luke',chapter:2,testament:'nt'}
    ]},
    '06-24':{label:'Nativity of John the Baptist',readings:[
      {type:'OT',book:'Isaiah',chapter:40,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:139,testament:'ot'},
      {type:'NT',book:'Acts',chapter:13,testament:'nt'},
      {type:'GOSPEL',book:'Luke',chapter:1,testament:'nt'}
    ]},
    '12-26':{label:'St. Stephen\'s Day',readings:[
      {type:'OT',book:'Genesis',chapter:4,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:31,testament:'ot'},
      {type:'NT',book:'Acts',chapter:7,testament:'nt'},
      {type:'GOSPEL',book:'Matthew',chapter:10,testament:'nt'}
    ]},
    '12-28':{label:'Holy Innocents',readings:[
      {type:'OT',book:'Jeremiah',chapter:31,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:124,testament:'ot'},
      {type:'NT',book:'Revelation',chapter:14,testament:'nt'},
      {type:'GOSPEL',book:'Matthew',chapter:2,testament:'nt'}
    ]},
    '10-31':{label:'Reformation Day',readings:[
      {type:'OT',book:'Habakkuk',chapter:2,testament:'ot'},
      {type:'PSALM',book:'Psalms',chapter:46,testament:'ot'},
      {type:'NT',book:'Romans',chapter:1,testament:'nt'},
      {type:'GOSPEL',book:'John',chapter:8,testament:'nt'}
    ]}
  };

  function buildTrack(books) {
    var total = 0;
    var cum = books.map(function(b) {
      total += b[1];
      return { name: b[0], ch: b[1], cumTotal: total };
    });
    return { books: cum, total: total };
  }

  var otTrack = buildTrack(OT_BOOKS);
  var ntTrack = buildTrack(NT_EPISTLE_BOOKS);
  var gospelTrack = buildTrack(GOSPEL_BOOKS);

  function dayOfYear(date) {
    var start = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date - start) / 86400000);
  }

  function getSequentialReading(doy, track) {
    var idx = (doy - 1) % track.total;
    var acc = 0;
    for (var i = 0; i < track.books.length; i++) {
      var book = track.books[i];
      acc += book.ch;
      if (idx < acc) {
        var chapter = book.ch - (acc - idx) + 1;
        return { book: book.name, chapter: chapter };
      }
    }
    var last = track.books[track.books.length - 1];
    return { book: last.name, chapter: last.ch };
  }

  // ── Tradition-specific feasts ──
  var TRADITION_FEASTS = {
    catholic: {
      '05-13':{label:'Our Lady of Fatima',readings:[
        {type:'OT',book:'Isaiah',chapter:66,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:45,testament:'ot'},
        {type:'NT',book:'Revelation',chapter:12,testament:'nt'},
        {type:'GOSPEL',book:'Luke',chapter:1,testament:'nt'}
      ]},
      '12-08':{label:'Immaculate Conception',readings:[
        {type:'OT',book:'Genesis',chapter:3,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:98,testament:'ot'},
        {type:'NT',book:'Ephesians',chapter:1,testament:'nt'},
        {type:'GOSPEL',book:'Luke',chapter:1,testament:'nt'}
      ]},
      '08-15':{label:'Assumption of Mary',readings:[
        {type:'OT',book:'Judith',chapter:13,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:45,testament:'ot'},
        {type:'NT',book:'Revelation',chapter:11,testament:'nt'},
        {type:'GOSPEL',book:'Luke',chapter:1,testament:'nt'}
      ]}
    },
    orthodox: {
      '01-07':{label:'Christmas (Julian)',readings:[
        {type:'OT',book:'Micah',chapter:5,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:33,testament:'ot'},
        {type:'NT',book:'Galatians',chapter:4,testament:'nt'},
        {type:'GOSPEL',book:'Matthew',chapter:2,testament:'nt'}
      ]},
      '01-19':{label:'Theophany (Julian)',readings:[
        {type:'OT',book:'Isaiah',chapter:55,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:29,testament:'ot'},
        {type:'NT',book:'Titus',chapter:2,testament:'nt'},
        {type:'GOSPEL',book:'Matthew',chapter:3,testament:'nt'}
      ]}
    },
    reformed: {
      '10-31':{label:'Reformation Day',readings:[
        {type:'OT',book:'Habakkuk',chapter:2,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:46,testament:'ot'},
        {type:'NT',book:'Romans',chapter:3,testament:'nt'},
        {type:'GOSPEL',book:'John',chapter:8,testament:'nt'}
      ]},
      '07-01':{label:'Covenant Day',readings:[
        {type:'OT',book:'Genesis',chapter:17,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:105,testament:'ot'},
        {type:'NT',book:'Galatians',chapter:3,testament:'nt'},
        {type:'GOSPEL',book:'Luke',chapter:22,testament:'nt'}
      ]}
    },
    anglican: {
      '10-31':{label:'Reformation Day',readings:[
        {type:'OT',book:'Habakkuk',chapter:2,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:46,testament:'ot'},
        {type:'NT',book:'Romans',chapter:3,testament:'nt'},
        {type:'GOSPEL',book:'John',chapter:8,testament:'nt'}
      ]},
      '05-25':{label:'Book of Common Prayer Day',readings:[
        {type:'OT',book:'Isaiah',chapter:55,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:19,testament:'ot'},
        {type:'NT',book:'2 Timothy',chapter:1,testament:'nt'},
        {type:'GOSPEL',book:'Luke',chapter:24,testament:'nt'}
      ]}
    },
    lutheran: {
      '10-31':{label:'Reformation Day',readings:[
        {type:'OT',book:'Habakkuk',chapter:2,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:46,testament:'ot'},
        {type:'NT',book:'Romans',chapter:3,testament:'nt'},
        {type:'GOSPEL',book:'John',chapter:8,testament:'nt'}
      ]},
      '06-25':{label:'Augsburg Confession',readings:[
        {type:'OT',book:'Isaiah',chapter:43,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:68,testament:'ot'},
        {type:'NT',book:'Romans',chapter:10,testament:'nt'},
        {type:'GOSPEL',book:'John',chapter:17,testament:'nt'}
      ]}
    },
    evangelical: {
      '01-01':{label:'New Year — Covenant of Grace',readings:[
        {type:'OT',book:'Deuteronomy',chapter:30,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:103,testament:'ot'},
        {type:'NT',book:'2 Corinthians',chapter:5,testament:'nt'},
        {type:'GOSPEL',book:'John',chapter:3,testament:'nt'}
      ]},
      '05-21':{label:'Global Day of Prayer',readings:[
        {type:'OT',book:'2 Chronicles',chapter:7,testament:'ot'},
        {type:'PSALM',book:'Psalms',chapter:67,testament:'ot'},
        {type:'NT',book:'1 Timothy',chapter:2,testament:'nt'},
        {type:'GOSPEL',book:'Matthew',chapter:6,testament:'nt'}
      ]}
    }
  };

  function getTraditionFeast(mmdd, tradition) {
    var trad = tradition || 'general';
    // Check tradition-specific feasts
    if (TRADITION_FEASTS[trad] && TRADITION_FEASTS[trad][mmdd]) return TRADITION_FEASTS[trad][mmdd];
    // Fall back to general feasts
    return FEASTS[mmdd] || null;
  }

  function getTraditionLabel(tradition) {
    var labels = {
      general: 'Holy Scripture',
      reformed: 'Reformed Lectionary',
      evangelical: 'Evangelical Lectionary',
      anglican: 'Anglican Lectionary',
      catholic: 'Roman Catholic Lectionary',
      orthodox: 'Eastern Orthodox Lectionary',
      lutheran: 'Lutheran Lectionary'
    };
    return labels[tradition] || 'Holy Scripture';
  }

  function getTodayReadings(date, tradition) {
    if (!date) date = new Date();
    var mmdd = String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    var feast = getTraditionFeast(mmdd, tradition);
    if (feast) return feast;

    var doy = dayOfYear(date);
    var ot = getSequentialReading(doy, otTrack);
    var psalm = { book: 'Psalms', chapter: ((doy - 1) % PSALM_CHAPTERS) + 1 };
    var nt = getSequentialReading(doy, ntTrack);
    var gospel = getSequentialReading(doy, gospelTrack);

    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return {
      label: monthNames[date.getMonth()] + ' ' + date.getDate() + ' — ' + getTraditionLabel(tradition),
      readings: [
        { type:'OT', book:ot.book, chapter:ot.chapter, testament:'ot' },
        { type:'PSALM', book:psalm.book, chapter:psalm.chapter, testament:'ot' },
        { type:'NT', book:nt.book, chapter:nt.chapter, testament:'nt' },
        { type:'GOSPEL', book:gospel.book, chapter:gospel.chapter, testament:'nt' }
      ]
    };
  }

  window.ScriptoriumLectionary = { getTodayReadings: getTodayReadings, FEASTS: FEASTS, TRADITION_FEASTS: TRADITION_FEASTS };
})();
