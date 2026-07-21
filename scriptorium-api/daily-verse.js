const VERSES = [
  { ref: "John 3:16", text: "For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life.", book: "John", chapter: 3, verse: 16 },
  { ref: "Psalm 23:1", text: "The LORD is my shepherd; I shall not want.", book: "Psalms", chapter: 23, verse: 1 },
  { ref: "Philippians 4:13", text: "I can do all things through Him who strengthens me.", book: "Philippians", chapter: 4, verse: 13 },
  { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.", book: "Jeremiah", chapter: 29, verse: 11 },
  { ref: "Proverbs 3:5-6", text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He will make your paths straight.", book: "Proverbs", chapter: 3, verse: 5 },
  { ref: "Isaiah 40:31", text: "But those who wait on the LORD will renew their strength; they will mount up with wings like eagles; they will run and not grow weary, they will walk and not faint.", book: "Isaiah", chapter: 40, verse: 31 },
  { ref: "Romans 8:28", text: "And we know that God works all things together for the good of those who love Him, who are called according to His purpose.", book: "Romans", chapter: 8, verse: 28 },
  { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path.", book: "Psalms", chapter: 119, verse: 105 },
  { ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God is with you wherever you go.", book: "Joshua", chapter: 1, verse: 9 },
  { ref: "2 Corinthians 5:17", text: "Therefore if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come!", book: "2 Corinthians", chapter: 5, verse: 17 },
  { ref: "Matthew 5:14", text: "You are the light of the world. A city set on a hill cannot be hidden.", book: "Matthew", chapter: 5, verse: 14 },
  { ref: "Psalm 46:10", text: "Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!", book: "Psalms", chapter: 46, verse: 10 },
  { ref: "Hebrews 11:1", text: "Now faith is the assurance of things hoped for, the conviction of things not seen.", book: "Hebrews", chapter: 11, verse: 1 },
  { ref: "Ephesians 2:8", text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God.", book: "Ephesians", chapter: 2, verse: 8 },
  { ref: "Psalm 1:1-2", text: "Blessed is the man who walks not in the counsel of the wicked, nor stands in the way of sinners, nor sits in the seat of scoffers; but his delight is in the law of the LORD.", book: "Psalms", chapter: 1, verse: 1 },
  { ref: "Revelation 21:4", text: "He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore.", book: "Revelation", chapter: 21, verse: 4 }
];

// Deterministic selection based on day of year to keep same verse all day
function getDailyVerse() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const index = dayOfYear % VERSES.length;
  return VERSES[index];
}

module.exports = { getDailyVerse };
