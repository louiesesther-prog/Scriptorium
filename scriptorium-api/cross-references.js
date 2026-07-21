// Curated cross-references for key verses
// Format: { "book chapter": [{ ref, text, type }] }
// Types: prophecy-fulfillment, parallel, quote, thematic, typology

var CROSS_REFS = {
  // ── Messianic Prophecies & Fulfillments ──
  "Isaiah 7":    [{ ref:"Matthew 1:22-23", text:"The virgin will conceive and give birth to a son, and they will call him Immanuel", type:"prophecy-fulfillment" }],
  "Matthew 1":   [{ ref:"Isaiah 7:14", text:"Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son", type:"prophecy-fulfillment" }],
  "Isaiah 9":    [{ ref:"Matthew 4:15-16", text:"Galilee of the Gentiles — the people living in darkness have seen a great light", type:"prophecy-fulfillment" }],
  "Matthew 4":   [{ ref:"Isaiah 9:1-2", text:"Nevertheless, there will be no more gloom for those who were in distress", type:"prophecy-fulfillment" }],
  "Micah 5":     [{ ref:"Matthew 2:5-6", text:"But you, Bethlehem, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel", type:"prophecy-fulfillment" }],
  "Matthew 2":   [{ ref:"Micah 5:2", text:"But you, Bethlehem Ephrathah, though you are small among the clans of Judah", type:"prophecy-fulfillment" }],
  "Isaiah 53":   [{ ref:"Matthew 8:17", text:"He took up our infirmities and bore our diseases", type:"prophecy-fulfillment" },{ ref:"1 Peter 2:24", text:"He himself bore our sins in his body on the cross", type:"prophecy-fulfillment" },{ ref:"Acts 8:32-33", text:"He was led like a sheep to the slaughter", type:"prophecy-fulfillment" }],
  "Matthew 8":   [{ ref:"Isaiah 53:4", text:"Surely he took up our pain and bore our suffering", type:"prophecy-fulfillment" }],
  "Psalm 22":    [{ ref:"Matthew 27:35", text:"They divide my clothes among them and cast lots for my garment", type:"prophecy-fulfillment" },{ ref:"Matthew 27:46", text:"My God, my God, why have you forsaken me?", type:"prophecy-fulfillment" }],
  "Matthew 27":  [{ ref:"Psalm 22:18", text:"They divide my garments among them and cast lots for my clothing", type:"prophecy-fulfillment" },{ ref:"Psalm 22:1", text:"My God, my God, why have you forsaken me?", type:"prophecy-fulfillment" }],
  "Psalm 16":    [{ ref:"Acts 2:25-28", text:"You will not abandon me to the realm of the dead", type:"prophecy-fulfillment" }],
  "Acts 2":      [{ ref:"Psalm 16:8-11", text:"I have set the Lord always before me. Because he is at my right hand, I will not be shaken", type:"prophecy-fulfillment" }],
  "Psalm 110":   [{ ref:"Matthew 22:43-45", text:"The Lord said to my Lord: Sit at my right hand", type:"prophecy-fulfillment" },{ ref:"Hebrews 5:6", text:"You are a priest forever, in the order of Melchizedek", type:"prophecy-fulfillment" }],
  "Matthew 22":  [{ ref:"Psalm 110:1", text:"The Lord says to my Lord: Sit at my right hand", type:"quote" }],
  "Zechariah 9": [{ ref:"Matthew 21:4-5", text:"See, your king comes to you, righteous and victorious, lowly and riding on a donkey", type:"prophecy-fulfillment" }],
  "Matthew 21":  [{ ref:"Zechariah 9:9", text:"Rejoice greatly, Daughter Zion! Shout, Daughter Jerusalem! See, your king comes to you", type:"prophecy-fulfillment" }],
  "Zechariah 12":[{ ref:"John 19:34-37", text:"They will look on me, the one they have pierced", type:"prophecy-fulfillment" }],
  "John 19":     [{ ref:"Zechariah 12:10", text:"They will look on me whom they have pierced", type:"prophecy-fulfillment" },{ ref:"Psalm 34:20", text:"He protects all his bones, not one of them will be broken", type:"prophecy-fulfillment" },{ ref:"Exodus 12:46", text:"Do not break any of the bones", type:"typology" }],
  "Exodus 12":   [{ ref:"John 19:36", text:"Not one of his bones will be broken", type:"typology" }],

  // ── Synoptic Parallels ──
  "Matthew 13":  [{ ref:"Mark 4:1-34", text:"Parable of the sower and other kingdom parables", type:"parallel" },{ ref:"Luke 8:4-18", text:"Parable of the sower", type:"parallel" }],
  "Mark 4":      [{ ref:"Matthew 13:1-23", text:"Parable of the sower", type:"parallel" }],
  "Matthew 17":  [{ ref:"Mark 9:2-13", text:"Transfiguration", type:"parallel" },{ ref:"Luke 9:28-36", text:"Transfiguration", type:"parallel" }],
  "Mark 9":      [{ ref:"Matthew 17:1-13", text:"Transfiguration", type:"parallel" }],
  "Matthew 24":  [{ ref:"Mark 13:1-37", text:"Olivet Discourse", type:"parallel" },{ ref:"Luke 21:5-36", text:"Olivet Discourse", type:"parallel" }],
  "Mark 13":     [{ ref:"Matthew 24:1-51", text:"Olivet Discourse", type:"parallel" }],
  "Matthew 26":  [{ ref:"Mark 14:1-72", text:"Last Supper, arrest, trial", type:"parallel" },{ ref:"Luke 22:1-71", text:"Last Supper, arrest, trial", type:"parallel" }],
  "Mark 14":     [{ ref:"Matthew 26:1-75", text:"Last Supper, arrest, trial", type:"parallel" }],
  "Mark 15":     [{ ref:"Matthew 27:1-66", text:"Crucifixion", type:"parallel" },{ ref:"Luke 23:1-56", text:"Crucifixion", type:"parallel" }],
  "Luke 22":     [{ ref:"Matthew 26:1-75", text:"Last Supper, arrest, trial", type:"parallel" },{ ref:"Mark 14:1-72", text:"Last Supper, arrest, trial", type:"parallel" }],
  "Luke 23":     [{ ref:"Matthew 27:1-66", text:"Crucifixion", type:"parallel" },{ ref:"Mark 15:1-47", text:"Crucifixion", type:"parallel" }],
  "Luke 3":      [{ ref:"Matthew 3:1-17", text:"John the Baptist and baptism of Jesus", type:"parallel" },{ ref:"Mark 1:1-11", text:"John the Baptist and baptism of Jesus", type:"parallel" }],
  "Matthew 3":   [{ ref:"Mark 1:1-11", text:"John the Baptist", type:"parallel" },{ ref:"Luke 3:1-22", text:"John the Baptist", type:"parallel" }],
  "John 3":      [{ ref:"John 1:1-18", text:"Prologue — Word became flesh", type:"thematic" }],

  // ── OT Quoted in NT ──
  "Romans 3":    [{ ref:"Psalm 14:1-3", text:"There is no one righteous, not even one", type:"quote" },{ ref:"Psalm 53:1-3", text:"The fool says in his heart, There is no God", type:"quote" }],
  "Romans 4":    [{ ref:"Genesis 15:6", text:"Abraham believed God, and it was credited to him as righteousness", type:"quote" },{ ref:"Psalm 32:1-2", text:"Blessed is the one whose sin the Lord does not count against them", type:"quote" }],
  "Romans 9":    [{ ref:"Malachi 1:2-3", text:"Jacob I loved, but Esau I hated", type:"quote" },{ ref:"Exodus 33:19", text:"I will have mercy on whom I have mercy", type:"quote" }],
  "Romans 11":   [{ ref:"1 Kings 19:10", text:"I have reserved for myself seven thousand who have not bowed the knee to Baal", type:"quote" },{ ref:"Psalm 69:22-23", text:"May their table become a snare", type:"quote" }],
  "Galatians 3": [{ ref:"Genesis 15:6", text:"Abraham believed God, and it was credited to him as righteousness", type:"quote" },{ ref:"Deuteronomy 27:26", text:"Cursed is everyone who does not continue to do everything written in the Book of the Law", type:"quote" }],
  "Hebrews 1":   [{ ref:"Psalm 2:7", text:"You are my Son; today I have become your Father", type:"quote" },{ ref:"2 Samuel 7:14", text:"I will be his Father, and he will be my Son", type:"quote" },{ ref:"Psalm 110:1", text:"Sit at my right hand", type:"quote" }],
  "Hebrews 3":   [{ ref:"Psalm 95:7-11", text:"Today, if you hear his voice, do not harden your hearts", type:"quote" }],
  "Hebrews 4":   [{ ref:"Genesis 2:2", text:"God rested from all his work", type:"quote" }],
  "Hebrews 11":  [{ ref:"Genesis 15:6", text:"By faith Abraham...", type:"thematic" },{ ref:"Genesis 22:1-19", text:"Abraham and Isaac", type:"thematic" }],
  "1 Peter 2":   [{ ref:"Isaiah 53:4-12", text:"By his wounds we are healed", type:"quote" },{ ref:"Exodus 19:6", text:"You will be for me a kingdom of priests and a holy nation", type:"quote" }],
  "Revelation 2":[{ ref:"Numbers 25:1-13", text:"The teaching of Balaam", type:"thematic" },{ ref:"1 Kings 16:31", text:"Jezebel", type:"thematic" }],

  // ── Thematic Connections ──
  "Genesis 1":   [{ ref:"John 1:1-5", text:"In the beginning was the Word", type:"thematic" },{ ref:"Psalm 104:1-35", text:"Praise of creation", type:"thematic" }],
  "Genesis 3":   [{ ref:"Romans 5:12-21", text:"Death through Adam, life through Christ", type:"thematic" },{ ref:"Revelation 12:1-17", text:"The serpent", type:"thematic" }],
  "Exodus 14":   [{ ref:"Exodus 15:1-21", text:"Song of Moses", type:"parallel" },{ ref:"Revelation 15:3", text:"Song of Moses and the Lamb", type:"thematic" }],
  "Exodus 20":   [{ ref:"Deuteronomy 5:6-21", text:"The Ten Commandments repeated", type:"parallel" },{ ref:"Matthew 5:17-48", text:"The Beatitudes — new covenant law", type:"thematic" }],
  "Deuteronomy 18": [{ ref:"Acts 3:22-23", text:"A prophet like me — Jesus", type:"prophecy-fulfillment" },{ ref:"John 6:14", text:"Surely this is the Prophet", type:"prophecy-fulfillment" }],
  "Numbers 21":  [{ ref:"John 3:14-15", text:"Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up", type:"typology" }],
  "Joshua 6":    [{ ref:"Hebrews 11:30", text:"By faith the walls of Jericho fell", type:"thematic" }],
  "1 Samuel 17": [{ ref:"Psalm 27:1-14", text:"The Lord is my light and my salvation — whom shall I fear?", type:"thematic" }],
  "1 Kings 19":  [{ ref:"Romans 11:2-4", text:"Elijah — I have reserved seven thousand", type:"quote" },{ ref:"James 5:17-18", text:"Elijah was a human being, even as we are", type:"thematic" }],
  "Jonah 1":     [{ ref:"Matthew 12:39-41", text:"The sign of Jonah", type:"thematic" },{ ref:"Jonah 2:1-10", text:"Jonah's prayer from the fish", type:"parallel" }],
  "Matthew 12":  [{ ref:"Jonah 1:17", text:"Three days and three nights in the belly of a huge fish", type:"typology" }],
  "Daniel 7":    [{ ref:"Revelation 13:1-10", text:"The beast from the sea", type:"thematic" },{ ref:"Revelation 1:7", text:"One like a son of man coming with the clouds", type:"prophecy-fulfillment" }],
  "Daniel 12":   [{ ref:"Matthew 24:15", text:"The abomination that causes desolation", type:"prophecy-fulfillment" }],
  "Joel 2":      [{ ref:"Acts 2:17-21", text:"I will pour out my Spirit on all people", type:"prophecy-fulfillment" }],
  "Amos 9":      [{ ref:"Acts 15:16-18", text:"I will restore David's fallen tent", type:"prophecy-fulfillment" }],
  "Malachi 4":   [{ ref:"Matthew 11:13-14", text:"Elijah — John the Baptist", type:"prophecy-fulfillment" },{ ref:"Malachi 3:1", text:"I will send my messenger, who will prepare the way before me", type:"prophecy-fulfillment" }],
  "Malachi 3":   [{ ref:"Malachi 4:5-6", text:"Elijah before the great day", type:"parallel" }],

  // ── Gospels & Acts ──
  "John 1":      [{ ref:"Genesis 1:1-5", text:"In the beginning was the Word", type:"thematic" },{ ref:"Exodus 34:6", text:"Grace and truth came through Jesus Christ", type:"thematic" }],
  "Acts 9":      [{ ref:"Acts 22:1-21", text:"Paul's defense — his conversion story", type:"parallel" },{ ref:"Acts 26:12-18", text:"Paul's testimony before Agrippa", type:"parallel" }],
  "Acts 10":     [{ ref:"Acts 11:1-18", text:"Peter explains his vision to the Jerusalem church", type:"parallel" }],
  "Acts 15":     [{ ref:"Galatians 2:1-10", text:"The Jerusalem council", type:"parallel" }],

  // ── Paul's Letters ──
  "1 Corinthians 1": [{ ref:"Isaiah 29:14", text:"I will destroy the wisdom of the wise", type:"quote" },{ ref:"Jeremiah 9:23-24", text:"Let the one who boasts boast in the Lord", type:"quote" }],
  "1 Corinthians 10":[{ ref:"Exodus 13:21-22", text:"Baptized into Moses in the cloud and the sea", type:"typology" },{ ref:"Exodus 16:4-36", text:"Spiritual food — manna", type:"typology" }],
  "1 Corinthians 11":[{ ref:"Exodus 12:1-30", text:"The Lord's Supper — Passover connection", type:"thematic" }],
  "1 Corinthians 15":[{ ref:"Genesis 2:7", text:"The first man Adam became a living being", type:"quote" },{ ref:"Psalm 110:1", text:"He will reign until God puts all enemies under his feet", type:"quote" }],
  "2 Corinthians 3": [{ ref:"Exodus 34:29-35", text:"Moses' face shone — the glory that fades vs the glory that remains", type:"thematic" }],
  "Ephesians 1":  [{ ref:"Psalm 110:1", text:"Seated at God's right hand", type:"quote" },{ ref:"Psalm 8:6", text:"All things under his feet", type:"quote" }],
  "Ephesians 6":  [{ ref:"Isaiah 59:17", text:"The armor of God — righteousness as a breastplate", type:"quote" },{ ref:"Wisdom of Solomon 5:17-20", text:"The armor of the Lord", type:"thematic" }],

  // ── Hebrews ──
  "Hebrews 5":    [{ ref:"Psalm 110:4", text:"You are a priest forever, in the order of Melchizedek", type:"quote" }],
  "Hebrews 7":    [{ ref:"Genesis 14:18-20", text:"Melchizedek king of Salem, priest of God Most High", type:"typology" }],
  "Hebrews 9":    [{ ref:"Exodus 24:1-8", text:"The blood of the covenant", type:"typology" },{ ref:"Leviticus 16:1-34", text:"The Day of Atonement", type:"typology" }],
  "Hebrews 12":   [{ ref:"Exodus 19:16-25", text:"Mount Sinai — the trembling and fire", type:"typology" },{ ref:"Deuteronomy 9:19", text:"I am trembling with fear", type:"quote" }],

  // ── Revelation ──
  "Revelation 4": [{ ref:"Isaiah 6:1-5", text:"Holy, holy, holy — the throne vision", type:"thematic" },{ ref:"Ezekiel 1:1-28", text:"The wheel within a wheel — God's throne", type:"thematic" }],
  "Revelation 5": [{ ref:"Isaiah 11:1-10", text:"The Root of Jesse — the Lion of Judah", type:"prophecy-fulfillment" }],
  "Revelation 12":[{ ref:"Genesis 3:15", text:"The woman and the serpent", type:"thematic" },{ ref:"Daniel 7:7", text:"The dragon with seven heads", type:"thematic" }],
  "Revelation 21":[{ ref:"Isaiah 65:17-25", text:"New heavens and a new earth", type:"prophecy-fulfillment" },{ ref:"Ezekiel 40:1-48:35", text:"The new temple", type:"thematic" }],
  "Revelation 22":[{ ref:"Genesis 2:9-10", text:"The tree of life and the river", type:"thematic" },{ ref:"Ezekiel 47:1-12", text:"The river from the temple", type:"thematic" }],

  // ── Psalms & Wisdom ──
  "Psalm 1":     [{ ref:"Jeremiah 17:5-8", text:"Blessed is the one who trusts in the Lord — like a tree planted by water", type:"thematic" }],
  "Psalm 2":     [{ ref:"Revelation 2:26-27", text:"Rule with an iron scepter", type:"quote" },{ ref:"Acts 4:25-28", text:"Why do the nations rage?", type:"quote" }],
  "Psalm 8":     [{ ref:"Hebrews 2:6-8", text:"What is man that you are mindful of him?", type:"quote" }],
  "Psalm 23":    [{ ref:"John 10:1-21", text:"The Good Shepherd", type:"thematic" },{ ref:"Revelation 7:17", text:"The Lamb at the center of the throne will be their shepherd", type:"thematic" }],
  "Psalm 24":    [{ ref:"1 Corinthians 10:26", text:"The earth is the Lord's, and everything in it", type:"quote" }],
  "Psalm 34":    [{ ref:"1 Peter 2:3", text:"Taste and see that the Lord is good", type:"quote" },{ ref:"John 19:36", text:"Not one of his bones will be broken", type:"quote" }],
  "Psalm 51":    [{ ref:"Psalm 32:1-5", text:"Blessed is the one whose transgression is forgiven", type:"thematic" }],
  "Psalm 84":    [{ ref:"Psalm 42:1-5", text:"My soul thirsts for God", type:"thematic" }],
  "Psalm 95":    [{ ref:"Hebrews 3:7-19", text:"Today, if you hear his voice, do not harden your hearts", type:"quote" }],
  "Psalm 139":   [{ ref:"Jeremiah 1:5", text:"Before I formed you in the womb I knew you", type:"thematic" },{ ref:"Romans 11:33-36", text:"How unsearchable his judgments", type:"thematic" }],
  "Proverbs 1":  [{ ref:"Psalm 111:10", text:"The fear of the Lord is the beginning of wisdom", type:"thematic" }],
  "Proverbs 3":  [{ ref:"James 4:6-10", text:"God opposes the proud but shows favor to the humble", type:"quote" }],
  "Proverbs 9":  [{ ref:"Proverbs 1:7", text:"Fear of the Lord is the beginning of knowledge", type:"parallel" }],
  "Ecclesiastes 1": [{ ref:"Ecclesiastes 12:8-14", text:"Vanity of vanities — the conclusion", type:"parallel" }],

  // ── Prophets ──
  "Jeremiah 1":   [{ ref:"Galatians 1:15-16", text:"Set apart from birth — Paul's calling", type:"thematic" }],
  "Jeremiah 7":   [{ ref:"Jeremiah 26:1-24", text:"Jeremiah's temple sermon", type:"parallel" }],
  "Jeremiah 23":  [{ ref:"Zechariah 3:8", text:"The Branch — a righteous King", type:"thematic" },{ ref:"Jeremiah 33:14-16", text:"The righteous Branch from David's line", type:"parallel" }],
  "Ezekiel 1":    [{ ref:"Revelation 4:6-8", text:"The four living creatures", type:"thematic" },{ ref:"Isaiah 6:1-4", text:"The throne of God", type:"thematic" }],
  "Ezekiel 18":   [{ ref:"Jeremiah 31:29-30", text:"The soul who sins is the one who will die", type:"parallel" }],
  "Ezekiel 34":   [{ ref:"John 10:1-21", text:"The Good Shepherd", type:"prophecy-fulfillment" }],
  "Ezekiel 36":   [{ ref:"Jeremiah 31:31-34", text:"A new heart and a new spirit — the new covenant", type:"thematic" }],
  "Ezekiel 37":   [{ ref:"Revelation 11:11", text:"The valley of dry bones — resurrection", type:"thematic" }],
  "Hosea 1":      [{ ref:"Romans 9:25-26", text:"I will call them 'my people' who are not my people", type:"quote" }],
  "Hosea 11":     [{ ref:"Matthew 2:15", text:"Out of Egypt I called my Son", type:"prophecy-fulfillment" }],
  "Zephaniah 3":  [{ ref:"Romans 3:10-18", text:"The righteous will live by faith", type:"thematic" }]
};

function getCrossReferences(book, chapter) {
  var key = book + ' ' + chapter;
  var results = CROSS_REFS[key];
  if (results) return results;
  // Also check without chapter-specific (e.g., whole book cross-refs)
  results = CROSS_REFS[book];
  if (results) return results;
  return [];
}

function getAvailableRefs() {
  var refs = [];
  for (var key in CROSS_REFS) {
    if (CROSS_REFS.hasOwnProperty(key)) {
      refs.push(key);
    }
  }
  return refs.sort();
}

module.exports = { getCrossReferences: getCrossReferences, getAvailableRefs: getAvailableRefs };
