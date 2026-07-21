// ═══ AUTHORITATIVE FULL CANON DATA ═══
    // Fix #2: Was incorrectly wrapped as filterCanon function body. Now proper array.
    var CANON_DATA = [
        // ═══ OLD TESTAMENT — TORAH (ORIT) ═══
        { id: "genesis", name: "Genesis", geez: "ኦሪት ዘፍጥረት — Orit Zefet'ret", category: "torah", section: "OT",
          artifact: "EMML 1 (Garima Gospels-era)", site: "Abba Garima Monastery",
          note: "The first book of the Octateuch in the Ethiopian canon. The Ge'ez text of Genesis follows the LXX, with unique readings preserved in the Ethiopic tradition." },
        { id: "exodus", name: "Exodus", geez: "ኦሪት ዘነገር — Orit Zeneger", category: "torah", section: "OT",
          artifact: "EMML 8", site: "Dabra Dammo Monastery",
          note: "Known as 'Orit' in Ethiopian tradition, the book informs the liturgical calendar and the Fetha Nagast legal code." },
        { id: "leviticus", name: "Leviticus", geez: "ኦሪት ዘሌዋውያን — Oit Zelewawyan", category: "torah", section: "OT",
          artifact: "EMML 10", site: "Church of Our Lady Mary of Zion, Axum",
          note: "The Ge'ez Leviticus is central to Ethiopian monastic rules concerning purity and sacrifice." },
        { id: "numbers", name: "Numbers", geez: "ኦሪት ዘኀልቅ — Orit Zehalq", category: "torah", section: "OT",
          artifact: "EMML 12", site: "Dabra Tabor Monastery",
          note: "The wilderness narrative in Ge'ez preserves the LXX numbering of the tribes and the census lists." },
        { id: "deuteronomy", name: "Deuteronomy", geez: "ኦሪት ዘዳግም — Orit Zedagem", category: "torah", section: "OT",
          artifact: "EMML 15", site: "Gunda Gunde Monastery",
          note: "The repeated law — its Ge'ez text is cited extensively in Ethiopian canon law and the legal codex Fetha Nagast." },
        { id: "joshua", name: "Joshua", geez: "ኢያሱ — Iyasu", category: "historical", section: "OT",
          artifact: "EMML 18", site: "Abba Garima Monastery",
          note: "Part of the Octateuch in Ethiopian tradition; the conquest narrative is read during the season of the Cross." },
        { id: "judges", name: "Judges", geez: "መሳፍንት — Mesafint", category: "historical", section: "OT",
          artifact: "EMML 20", site: "Dabra Berhan Selassie, Gondar",
          note: "Includes the Book of Ruth as an appendix in many Ethiopian manuscripts." },
        { id: "ruth", name: "Ruth", geez: "ሩት — Rut", category: "historical", section: "OT",
          artifact: "EMML 22", site: "Dabra Dammo Monastery",
          note: "Often appended to Judges in the Ethiopian manuscript tradition; read during the harvest season." },
        { id: "samuel1", name: "1 Samuel", geez: "መጽሐፈ ሳሙኤል ቀዳማዊ — Mets'hafe Samuel Kedamawi", category: "historical", section: "OT",
          artifact: "EMML 25", site: "Church of St. George, Lalibela",
          note: "1-2 Samuel form a single book in the Ethiopian canon, counted among the 'Books of the Kings' tradition." },
        { id: "samuel2", name: "2 Samuel", geez: "መጽሐፈ ሳሙኤል ካልኣዊ — Mets'hafe Samuel Kali'awi", category: "historical", section: "OT",
          artifact: "EMML 28", site: "Dabra Tabor Monastery",
          note: "David's reign in Ge'ez — the Psalm-scribe king's narrative is central to the Solomonic dynasty claim." },
        { id: "wisdom_solomon", name: "Wisdom of Solomon", geez: "ጥበበ ሰሎሞን — Tibebe Solomon", category: "wisdom", section: "OT",
          artifact: "EMML 746", site: "National Palace Library, Addis Ababa",
          note: "Fully canonical in the Ethiopian Church; the Ge'ez text is quoted extensively in the Ethiopian liturgical prayers." },
        { id: "sirach", name: "Sirach", geez: "መጽሐፈ ሲራክ — Mets'hafe Sirak", category: "wisdom", section: "OT",
          artifact: "EMML 351", site: "Church of Our Lady Mary of Zion, Axum",
          note: "Known in Ethiopian tradition as 'the Wisdom of Yeshua ben Sira'; used extensively in the monastic rule and the Fetha Nagast (Law of Kings)." },

        // ═══ OLD TESTAMENT — PROPHETS ═══
        { id: "isaiah", name: "Isaiah", geez: "ትንቢተ ኢሳይያስ — Tinbite Isayas", category: "prophets", section: "OT",
          artifact: "EMML 1828 (Garima-era)", site: "Abba Garima Monastery",
          note: "The Ge'ez text of Isaiah is the most quoted OT book in Ethiopian liturgy, especially the servant songs and the vision of the New Jerusalem." },
        { id: "jeremiah", name: "Jeremiah", geez: "ትንቢተ ኤርምያስ — Tinbite Eremyas", category: "prophets", section: "OT",
          artifact: "EMML 828", site: "Dabra Berhan Selassie, Gondar",
          note: "The Ge'ez Jeremiah follows the LXX (shorter) text and includes the Book of Baruch and Letter of Jeremiah as integral parts." },
        { id: "lamentations", name: "Lamentations", geez: "ሰቆቃወ ኤርምያስ — S'qoqwa Eremyas", category: "prophets", section: "OT",
          artifact: "EMML 1930", site: "Dabra Tabor Monastery",
          note: "Chanted in Ge'ez during the fast of the Nineveh, the acrostic structure is preserved in the Ethiopian alphabet (Fidel)." },
        { id: "baruch", name: "Baruch", geez: "ትንቢተ ባሩክ — Tinbite Baruk", category: "deuterocanon", section: "OT",
          artifact: "EMML 2087", site: "Gunda Gunde Monastery",
          note: "Included with Jeremiah in the Ethiopian canon; the Ge'ez text contains the Epistle of Jeremiah as an appendix." },
        { id: "ezekiel", name: "Ezekiel", geez: "ትንቢተ ሕዝቅኤል — Tinbite Hezek'el", category: "prophets", section: "OT",
          artifact: "EMML 689", site: "Dabra Dammo Monastery",
          note: "The Ge'ez Ezekiel, with its vision of the heavenly temple, deeply influenced Ethiopian monastic architecture and the rock-hewn churches." },
        { id: "daniel", name: "Daniel (with additions)", geez: "ትንቢተ ዳንኤል — Tinbite Daniel", category: "prophets", section: "OT",
          artifact: "EMML 1951", site: "Hayq Estifanos Monastery",
          note: "The Ethiopian Daniel includes Suzanna, Bel and the Dragon, and the Prayer of Azariah as integral parts — the LXX version preserved in Ge'ez." },

        // Minor Prophets (12)
        { id: "hosea", name: "Hosea", geez: "ትንቢተ ሆሴዕ — Tinbite Hose'", category: "prophets", section: "OT",
          artifact: "EMML 651", site: "Bodleian Library, Oxford",
          note: "Part of the Ge'ez Minor Prophets corpus; the marriage metaphor is preserved with distinctive Ethiopian vocabulary." },
        { id: "joel", name: "Joel", geez: "ትንቢተ ዮኤል — Tinbite Yo'el", category: "prophets", section: "OT",
          artifact: "EMML 651 (continued)", site: "Bodleian Library, Oxford",
          note: "The Ge'ez text of Joel is quoted in Ethiopian Pentecost liturgy: 'I will pour out my Spirit on all people.'" },
        { id: "amos", name: "Amos", geez: "ትንቢተ አሞስ — Tinbite Amos", category: "prophets", section: "OT",
          artifact: "EMML 702", site: "National Museum of Ethiopia",
          note: "Amos's prophecies against social injustice were cited by Emperor Zara Yaqob in his 15th-century reforms." },
        { id: "obadiah", name: "Obadiah", geez: "ትንቢተ አብድዩ — Tinbite Abdyu", category: "prophets", section: "OT",
          artifact: "EMML 702 (continued)", site: "National Museum of Ethiopia",
          note: "The shortest book in the Ge'ez OT; its prophecy against Edom was read as a cipher for enemies of the Ethiopian kingdom." },
        { id: "jonah", name: "Jonah", geez: "ትንቢተ ዮናስ — Tinbite Yonas", category: "prophets", section: "OT",
          artifact: "Gunda Gunde Manuscript 15", site: "Gunda Gunde Monastery",
          note: "Read in full during the Fast of Nineveh — a three-day festival unique to the Ethiopian Church commemorating Jonah's call." },
        { id: "micah", name: "Micah", geez: "ትንቢተ ሚክያስ — Tinbite Mikyas", category: "prophets", section: "OT",
          artifact: "EMML 651", site: "Bodleian Library, Oxford",
          note: "Micah 4 is the source of the Ethiopian tradition that the Ark was taken into the wilderness — 'Arise, thresh, O daughter of Zion.'" },
        { id: "nahum", name: "Nahum", geez: "ትንቢተ ናሆም — Tinbite Nahom", category: "prophets", section: "OT",
          artifact: "EMML 692", site: "Dabra Libanos Monastery",
          note: "The Ge'ez text preserves the prophecy against Nineveh with unique Ethiopian manuscript illuminations." },
        { id: "habakkuk", name: "Habakkuk", geez: "ትንቢተ ዕንባቆም — Tinbite Enbaqom", category: "prophets", section: "OT",
          artifact: "EMML 692 (continued)", site: "Dabra Libanos Monastery",
          note: "Habakkuk 3 ('God came from Teman') is sung in Ge'ez during the sunrise Easter liturgy." },
        { id: "zephaniah", name: "Zephaniah", geez: "ትንቢተ ሶፎንያስ — Tinbite Sefonyas", category: "prophets", section: "OT",
          artifact: "EMML 712", site: "Hayq Estifanos Monastery",
          note: "The Ge'ez text includes the 'Day of the Lord' passage, central to Ethiopian eschatological homilies." },
        { id: "haggai", name: "Haggai", geez: "ትንቢተ ሐጌ — Tinbite Hagge", category: "prophets", section: "OT",
          artifact: "EMML 712 (continued)", site: "Hayq Estifanos Monastery",
          note: "The Ge'ez Haggai focuses on the Temple rebuilding, mirrored in the Ethiopian tradition of church construction in rock." },
        { id: "zechariah", name: "Zechariah", geez: "ትንቢተ ዘካርያስ — Tinbite Zakaryas", category: "prophets", section: "OT",
          artifact: "EMML 714", site: "Dabra Bizan Monastery",
          note: "The visions of Zechariah are depicted in the Ethiopian tradition with distinctive angelic iconography." },
        { id: "malachi", name: "Malachi", geez: "ትንቢተ ሚልክያስ — Tinbite Milyak", category: "prophets", section: "OT",
          artifact: "EMML 714 (continued)", site: "Dabra Bizan Monastery",
          note: "The final book of the Ge'ez Minor Prophets; its messianic prophecy is read during the Ethiopian Christmas (Genna) celebration." },

        // ═══ DEUTEROCANON — UNIQUE TO ETHIOPIAN ═══
        { id: "enoch", name: "1 Enoch (Henok)", geez: "መጽሐፈ ሄኖክ — Mets'hafe Henok", category: "deuterocanon", section: "OT",
          artifact: "EMML 898 (Ethiopic Enoch complete)", site: "Abba Garima Monastery",
          note: "The ONLY complete text of 1 Enoch preserved in any language — Ge'ez manuscripts contain all 108 chapters, including the Book of Parables. The Aramaic fragments from Qumran confirm the Ge'ez translation's fidelity." },
        { id: "jubilees", name: "Jubilees (Kufale)", geez: "መጽሐፈ ኩፋሌ — Mets'hafe Kufale", category: "deuterocanon", section: "OT",
          artifact: "EMML 914", site: "Dabra Dammo Monastery",
          note: "The Ge'ez text of Jubilees is the most complete surviving version. The 364-day solar calendar preserved in this text is the basis of the Ethiopian liturgical year." },
        { id: "meqabyan1", name: "1 Meqabyan", geez: "መጽሐፈ መቃብያን ቀዳማዊ — Mets'hafe Meqabyan Qedamawi", category: "deuterocanon", section: "OT",
          artifact: "EMML 740", site: "National Museum of Ethiopia",
          note: "NOT the same as 1-2 Maccabees from other canons. The Ethiopian Meqabyan books tell the story of the Maccabean martyrs (the 'Makkabeyan') with distinctive Ethiopian theological additions." },
        { id: "meqabyan2", name: "2 Meqabyan", geez: "መጽሐፈ መቃብያን ካልዕ — Mets'hafe Meqabyan Ka'li", category: "deuterocanon", section: "OT",
          artifact: "EMML 740 (continued)", site: "National Museum of Ethiopia",
          note: "Second book of the Ethiopian Maccabean tradition; not to be confused with 2 Maccabees from the Greek LXX canon." },
        { id: "meqabyan3", name: "3 Meqabyan", geez: "መጽሐፈ መቃብያን ሣልሳዊ — Mets'hafe Meqabyan Salsawi", category: "deuterocanon", section: "OT",
          artifact: "EMML 740 (continued)", site: "National Museum of Ethiopia",
          note: "The third Ethiopian Maccabean book, unique to the Ethiopian canon. Contains traditions about the Jewish revolt not found in any other canon." },
        { id: "pseudo_josephus", name: "Pseudo-Josephus (Joseph ben Gurion)", geez: "መጽሐፈ ዮሴፍ ወልደ ኮርዮን — Mets'hafe Yosef Walda Koryon", category: "deuterocanon", section: "OT",
          artifact: "EMML 1437", site: "Gunda Gunde Monastery",
          note: "An Ethiopian Jewish historical work attributed to Joseph ben Gurion (Pseudo-Josephus). Preserves unique traditions about the Second Temple period, including the Ethiopian Jewish (Beta Israel) account of the Queen of Sheba." },
        { id: "ezra_sutuel", name: "4 Ezra (Ezra Sutuel)", geez: "መጽሐፈ ዕዝራ ሱቱኤል — Mets'hafe Ezira Sutuel", category: "deuterocanon", section: "OT",
          artifact: "EMML 1440", site: "Dabra Tabor Monastery",
          note: "The Ethiopian version of 4 Ezra, often called Ezra Sutuel. Contains apocalyptic visions that deeply influenced Ethiopian monastic spirituality." },
        { id: "prayer_manasseh", name: "Prayer of Manasseh", geez: "ጸሎተ ምናሴ — Selote Manase", category: "deuterocanon", section: "OT",
          artifact: "EMML 351", site: "Church of Mary of Zion, Axum",
          note: "A short penitential prayer, fully canonical in Ethiopia. Used in the Ethiopian Lenten Canon." },
        { id: "psalm151", name: "Psalm 151", geez: "መዝሙር ፩፶፩ — Mezmur 151", category: "deuterocanon", section: "OT",
          artifact: "EMML 1847", site: "Monastery of Lake Tana",
          note: "An additional psalm attributed to David after his victory over Goliath. Included as part of the Ethiopian Psalter." },

        // ═══ NEW TESTAMENT — GOSPELS ═══
        { id: "matthew", name: "Matthew", geez: "ወንጌለ ማቴዎስ — Wengele Matewos", category: "gospels", section: "NT",
          artifact: "Garima Gospels (Volume I)", site: "Abba Garima Monastery, Ethiopia",
          note: "The oldest illuminated Gospel manuscript in the world (c. 330–650 AD), pre-dating the Lindisfarne Gospels. Contains 11 full-page canon table arches and the earliest known portrait of the Evangelists." },
        { id: "mark", name: "Mark", geez: "ወንጌለ ማርቆስ — Wengele Marqos", category: "gospels", section: "NT",
          artifact: "Garima Gospels (Volume II)", site: "Abba Garima Monastery, Ethiopia",
          note: "Bound with Luke in the second volume of the Garima Gospels. The Ge'ez text preserves a unique reading of Mark 16:8 — the shorter ending is retained." },
        { id: "luke", name: "Luke", geez: "ወንጌለ ሉቃስ — Wengele Luqas", category: "gospels", section: "NT",
          artifact: "Garima Gospels (Volume II, continued)", site: "Abba Garima Monastery, Ethiopia",
          note: "The Luke portion of the Garima Gospels includes extensive marginal decorations in the Aksumite style — red and yellow geometric patterns." },
        { id: "john", name: "John", geez: "ወንጌለ ዮሐንስ — Wengele Yohannes", category: "gospels", section: "NT",
          artifact: "Garima Gospels (Volume III)", site: "Abba Garima Monastery, Ethiopia",
          note: "The Garima John is preceded by carpet pages showing the Aksumite cross, a design unique to Ethiopian manuscript illumination." },

        // ═══ NEW TESTAMENT — ACTS & EPISTLES ═══
        { id: "acts", name: "Acts", geez: "ግብረ ሐዋርያት — Gibre Hawaryat", category: "epistles", section: "NT",
          artifact: "EMML 852", site: "Dabra Libanos Monastery",
          note: "The Ge'ez Acts follows the Alexandrian text-type; includes the Ethiopian eunuch story (Acts 8) as a key proof-text for Ethiopian Christian origins." },
        { id: "romans", name: "Romans", geez: "ወደ ሮሜ ሰዎች — Wode Rome Sewoch", category: "epistles", section: "NT",
          artifact: "EMML 447", site: "Hayq Estifanos Monastery",
          note: "The Ge'ez Pauline corpus was translated from the LXX-based Greek Vorlage used in the Alexandrian tradition." },
        { id: "corinthians1", name: "1 Corinthians", geez: "ቀዳማዊ ወደ ቆሮንቶስ ሰዎች — Qedamawi Wode Qorontos", category: "epistles", section: "NT",
          artifact: "EMML 447 (continued)", site: "Hayq Estifanos Monastery",
          note: "The Ge'ez text of 1 Corinthians 13 ('Love is patient') is among the most copied passages in Ethiopian manuscript tradition." },
        { id: "corinthians2", name: "2 Corinthians", geez: "ካልዕ ወደ ቆሮንቶስ ሰዎች — Ka'li Wode Qorontos", category: "epistles", section: "NT",
          artifact: "EMML 447 (continued)", site: "Hayq Estifanos Monastery",
          note: "The Ethiopian text includes the full LXX-based Pauline corpus in the traditional Ge'ez translation." },
        { id: "galatians", name: "Galatians", geez: "ወደ ገላትያ ሰዎች — Wode Galatya Sewoch", category: "epistles", section: "NT",
          artifact: "EMML 448", site: "Gunda Gunde Monastery",
          note: "Paul's letter to the Galatians was cited extensively by Emperor Zara Yaqob in his theological treatise Mashafa Berhan." },
        { id: "ephesians", name: "Ephesians", geez: "ወደ ኤፌሶን ሰዎች — Wode Efeson Sewoch", category: "epistles", section: "NT",
          artifact: "EMML 448 (continued)", site: "Gunda Gunde Monastery",
          note: "The Ge'ez text of the armor of God passage (Ephesians 6) is depicted in Ethiopian iconography with distinctive angelic armor." },
        { id: "philippians", name: "Philippians", geez: "ወደ ፊልጵስዩስ ሰዎች — Wode Filip'siyus Sewoch", category: "epistles", section: "NT",
          artifact: "EMML 2085", site: "Dabra Bizan Monastery",
          note: "The Christ hymn (Philippians 2) in Ge'ez preserves a unique theological vocabulary that reflects the Christology of the Ethiopian Church." },
        { id: "colossians", name: "Colossians", geez: "ወደ ቆላስይስ ሰዎች — Wode Qolasis Sewoch", category: "epistles", section: "NT",
          artifact: "EMML 2085 (continued)", site: "Dabra Bizan Monastery",
          note: "The Ge'ez Colossians warns against angel worship — a text that resonated in the Ethiopian context where angel veneration is prominent." },
        { id: "thessalonians1", name: "1 Thessalonians", geez: "ቀዳማዊ ወደ ተሰሎንቄ ሰዎች", category: "epistles", section: "NT",
          artifact: "EMML 2086", site: "Dabra Dammo Monastery",
          note: "The earliest Pauline letter in the Ge'ez canon; the rapture passage is read at the Feast of the Ascension." },
        { id: "thessalonians2", name: "2 Thessalonians", geez: "ካልዕ ወደ ተሰሎንቄ ሰዎች", category: "epistles", section: "NT",
          artifact: "EMML 2086 (continued)", site: "Dabra Dammo Monastery",
          note: "The Ge'ez text of the 'man of lawlessness' passage influenced Ethiopian apocalyptic literature." },
        { id: "timothy1", name: "1 Timothy", geez: "ቀዳማዊ ወደ ጢሞቴዎስ — Qedamawi Wode Timotewos", category: "epistles", section: "NT",
          artifact: "EMML 2091", site: "National Museum of Ethiopia",
          note: "The Pastoral Epistles in Ge'ez shaped the Ethiopian church's canon law on the qualifications of bishops (Fetha Nagast)." },
        { id: "timothy2", name: "2 Timothy", geez: "ካልዕ ወደ ጢሞቴዎስ — Ka'li Wode Timotewos", category: "epistles", section: "NT",
          artifact: "EMML 2091 (continued)", site: "National Museum of Ethiopia",
          note: "Paul's farewell to Timothy in Ge'ez is part of the Ethiopian funeral liturgy." },
        { id: "titus", name: "Titus", geez: "ወደ ቲቶስ — Wode Titos", category: "epistles", section: "NT",
          artifact: "EMML 2092", site: "Hayq Estifanos Monastery",
          note: "The Ge'ez Titus includes instructions for church governance adopted in the Ethiopian monastic codes." },
        { id: "philemon", name: "Philemon", geez: "ወደ ፊልሞን — Wode Filmon", category: "epistles", section: "NT",
          artifact: "EMML 2092 (continued)", site: "Hayq Estifanos Monastery",
          note: "The shortest Pauline letter in Ge'ez; its appeal to receive a runaway slave resonated in Ethiopian social contexts." },
        { id: "hebrews", name: "Hebrews", geez: "ወደ እብራዎስያን — Wode Ebrawosyan", category: "epistles", section: "NT",
          artifact: "EMML 447", site: "Hayq Estifanos Monastery",
          note: "Hebrews is included in the Pauline corpus in the Ethiopian canon following the Eastern tradition. The Ge'ez text emphasizes Christ as High Priest." },
        { id: "james", name: "James", geez: "መልእክተ ያዕቆብ — Mel'kte Ya'iqob", category: "epistles", section: "NT",
          artifact: "EMML 2093", site: "Gunda Gunde Monastery",
          note: "The Ge'ez text of James 2 ('faith without works is dead') was a key text in Ethiopian monastic theology." },
        { id: "peter1", name: "1 Peter", geez: "ቀዳማዊ መልእክተ ጴጥሮስ", category: "epistles", section: "NT",
          artifact: "EMML 2093 (continued)", site: "Gunda Gunde Monastery",
          note: "The Ge'ez text of 1 Peter 5:13 ('She who is in Babylon sends greetings') was interpreted by Ethiopian exegetes as Babyl-on = Rome." },
        { id: "peter2", name: "2 Peter", geez: "ካልዕ መልእክተ ጴጥሮስ — Ka'li Mel'kte Pet'ros", category: "epistles", section: "NT",
          artifact: "EMML 2094", site: "Dabra Tabor Monastery",
          note: "The Ge'ez text of 2 Peter's eschatological warning shaped the Ethiopian apocalyptic tradition." },
        { id: "john1", name: "1 John", geez: "ቀዳማዊ መልእክተ ዮሐንስ", category: "epistles", section: "NT",
          artifact: "EMML 2094 (continued)", site: "Dabra Tabor Monastery",
          note: "The Ge'ez version of 'God is love' — Fet'ret Yihannes — is among the most memorized passages in the Ethiopian Church." },
        { id: "john2", name: "2 John", geez: "ካልዕ መልእክተ ዮሐንስ — Ka'li Mel'kte Yohannes", category: "epistles", section: "NT",
          artifact: "EMML 2095", site: "Dabra Bizan Monastery",
          note: "The shortest Johannine letter in Ge'ez; its warning against false teachers was cited by the Ethiopian monastic reform movement." },
        { id: "john3", name: "3 John", geez: "ሣልሳዊ መልእክተ ዮሐንስ — Salsawi Mel'kte Yohannes", category: "epistles", section: "NT",
          artifact: "EMML 2095 (continued)", site: "Dabra Bizan Monastery",
          note: "The Ge'ez text of 3 John preserves the names Gaius and Diotrephes — rare personal names in the Ethiopian NT manuscript tradition." },
        { id: "jude", name: "Jude", geez: "መልእክተ ይሁዳ — Mel'kte Yihuda", category: "epistles", section: "NT",
          artifact: "EMML 2096", site: "National Museum of Ethiopia",
          note: "The Ge'ez Jude quotes 1 Enoch 1:9 as scripture — consistent with the Ethiopian canon which includes Enoch as a sacred book." },
        { id: "revelation", name: "Revelation", geez: "ራእየ ዮሐንስ — Ra'iy Yohannes", category: "epistles", section: "NT",
          artifact: "EMML 2097", site: "Dabra Dammo Monastery",
          note: "The Ge'ez Revelation is the only complete text of the Apocalypse in an African language from the first millennium. The Ethiopian text includes a unique numbering of the 24 elders with Ethiopian names." },

        // ═══ NEW TESTAMENT — APOSTOLIC FATHERS (Ethiopian Wider Canon) ═══
        { id: "sinodos", name: "Sinodos", geez: "ሲኖዶስ — Sinodos", category: "apostolic", section: "NT",
          artifact: "EMML 2098", site: "Dabra Libanos Monastery",
          note: "A collection of four church orders: Ser'at (The Order), Te'ezaz (The Command), Gessew (The Law), and Abtelis (The Canons). Considered by the Ethiopian Church as apostolic in origin." },
        { id: "clement", name: "1-2 Clement", geez: "መልእክተ ቅልሜንቶስ — Mel'kte Qlimentos", category: "apostolic", section: "NT",
          artifact: "EMML 2099", site: "Gunda Gunde Monastery",
          note: "Two epistles attributed to Clement of Rome. The Ethiopian canon includes both letters as part of the wider NT corpus." },
        { id: "didascalia", name: "Didascalia", geez: "ዲዳስቃልያ — Didasqalya", category: "apostolic", section: "NT",
          artifact: "EMML 2100", site: "Dabra Dammo Monastery",
          note: "The Apostolic Constitution in Ge'ez. This text governed the early Ethiopian church's liturgy, baptism, and ecclesiastical hierarchy." },
        { id: "covenant_book", name: "Book of the Covenant", geez: "መጽሐፈ ኪዳን — Mets'hafe Kidan", category: "apostolic", section: "NT",
            artifact: "EMML 2101", site: "Abba Garima Monastery",
            note: "Ethiopian Apostolic tradition divided into two books: the First and Second Book of the Covenant. Contains the teaching of the apostles and the order of the Ethiopian Mass." },

        // ═══ JEWISH PSEUDEPIGRAPHA ═══
        { id: "baruch2", name: "2 Baruch (Syriac Apocalypse)", geez: "ትንቢተ ባሩክ ካልዕ — Tinbite Baruk Ka'li", category: "extra_canonical", section: "OT",
          artifact: "Syriac Codex (6th century)", site: "Biblioteca Ambrosiana, Milan", discovery: "Preserved in a single 6th-century Syriac manuscript (Codex Ambrosianus) discovered in the Ambrosian Library, Milan. Ethiopic fragments later identified in the 20th century.",
          note: "Also called the Syriac Apocalypse of Baruch. Written after 70 AD, it describes the fall of Jerusalem and the promise of restoration. Preserved in a single 6th-century Syriac manuscript with an Ethiopic fragment." },
        { id: "baruch3", name: "3 Baruch (Greek Apocalypse)", geez: "ትንቢተ ባሩክ ሣልሳዊ — Tinbite Baruk Salsawi", category: "extra_canonical", section: "OT",
          artifact: "Greek MSS (Codex Hierosolymitanus)", site: "Patriarchal Library, Jerusalem", discovery: "First published in 1897 from a 15th-century Greek manuscript discovered in the library of the Greek Orthodox Patriarchate in Jerusalem.",
          note: "A Greek apocalyptic text describing Baruch's tour of the heavens. Survives in Greek and Old Church Slavonic; influenced Ethiopian angelology." },
        { id: "psalms_solomon", name: "Psalms of Solomon", geez: "መዝሙረ ሰሎሞን — Mezmure Solomon", category: "extra_canonical", section: "OT",
          artifact: "Greek Codex (Vaticanus Graecus 336)", site: "Vatican Library", discovery: "Rediscovered in the 17th century in the Vatican Library. A complete Greek text found in Codex Vaticanus Graecus 336 (10th century).",
          note: "18 psalms from the 1st century BC, originally written in Hebrew but preserved in Greek. Contain the earliest references to the 'Son of David' as Messiah." },
        { id: "odes_solomon", name: "Odes of Solomon", geez: "መኃልየ ሰሎሞን — Mehalye Solomon", category: "extra_canonical", section: "OT",
          artifact: "Pistis Sophia Codex (Askewianus)", site: "British Library, London", discovery: "First published in 1909 by J. Rendel Harris from a 15th-century Syriac manuscript discovered in the Nitrian Desert. Later found complete in the Pistis Sophia codex.",
          note: "42 early Christian hymns from the early 2nd century, discovered in the Pistis Sophia codex. Blend Jewish wisdom and early Christian baptismal imagery." },
        { id: "testament_patriarchs", name: "Testament of the Twelve Patriarchs", geez: "ኪዳነ አበው ዐሥርቱ — Kidane Abew Ashertu", category: "extra_canonical", section: "OT",
          artifact: "Mount Athos MS (Koutloumousiou 39)", site: "Monastery of Koutloumousiou, Mount Athos", discovery: "First published in Latin in 1242. Greek manuscripts discovered on Mount Athos in the 16th century. Aramaic fragments found among the Dead Sea Scrolls at Qumran (Cave 4) in 1952.",
          note: "A collection of the dying speeches of the 12 sons of Jacob, composed 2nd-1st century BC. Heavily used in Ethiopian monastic literature and known in Ge'ez fragments." },
        { id: "moses_assumption", name: "Assumption of Moses (Testament of Moses)", geez: "ሕልፈተ ሙሴ — Helfete Muse", category: "extra_canonical", section: "OT",
          artifact: "Latin Palimpsest (Codex Ambrosianus)", site: "Biblioteca Ambrosiana, Milan", discovery: "Discovered in the 19th century by Antonio Ceriani in the Ambrosian Library, Milan, as a 6th-century Latin palimpsest beneath a 9th-century text.",
          note: "A 1st-century AD Jewish apocalypse predicting Israel's history from Moses to the end of days. Survives in a single incomplete 6th-century Latin palimpsest." },
        { id: "isaiah_martyrdom", name: "Martyrdom & Ascension of Isaiah", geez: "ስምዐ ኢሳይያስ — Sim'e Isayas", category: "extra_canonical", section: "OT",
          artifact: "Ethiopic MSS (EMML 154)", site: "National Museum of Ethiopia", discovery: "Ethiopic version known to scholars since the 16th century. Greek and Latin fragments identified later. The complete Ge'ez text was critical for reconstructing the original 1st-century AD composition.",
          note: "A composite Jewish-Christian text from the 1st-2nd century AD. Describes Isaiah being sawn in half by King Manasseh. Preserved fully only in Ge'ez." },
        { id: "adam_eve", name: "Life of Adam and Eve", geez: "ገድለ አዳም ወሔዋን — Gedle Adam we-Hewan", category: "extra_canonical", section: "OT",
          artifact: "Greek Vita (Codex Parisinus)", site: "Bibliothèque Nationale, Paris", discovery: "Multiple versions discovered across Europe and the Middle East in Greek, Latin, Slavic, Armenian, and Ge'ez. Ethiopic 'Conflict of Adam and Eve' brought to Europe in the 19th century.",
          note: "Expanded narrative of the fall and the lives of the protoplasts after expulsion from Eden. Multiple Ethiopic versions exist (the 'Conflict of Adam and Eve')." },
        { id: "abraham_apocalypse", name: "Apocalypse of Abraham", geez: "ራእየ አብርሃም — Ra'iy Abrahim", category: "extra_canonical", section: "OT",
          artifact: "Slavonic MS (14th century)", site: "Russian State Library, Moscow", discovery: "Discovered in the 19th century in a 14th-century Old Slavonic manuscript in the Silvester Collection, Moscow. Originally translated from Greek; likely composed in Hebrew.",
          note: "A Jewish apocalyptic text from the 1st-2nd century AD. Abraham is taken to heaven and shown the destiny of Israel and the end of the age." },
        { id: "elijah_apocalypse", name: "Apocalypse of Elijah", geez: "ራእየ ኤልያስ — Ra'iy Elias", category: "extra_canonical", section: "OT",
          artifact: "Codex Achmim (Coptic)", site: "Coptic Museum, Cairo", discovery: "A Coptic version discovered in 1885 at the White Monastery in Egypt. Ethiopic fragments identified later. Greek fragments found at Oxyrhynchus in the early 20th century.",
          note: "A Jewish/Christian apocalypse from the 1st-3rd century AD describing the Antichrist, the end times, and the martyrdom of Elijah and Enoch. Survives in Coptic and Ethiopic." },
        { id: "maccabees3", name: "3 Maccabees", geez: "መቃብያን ሣልሳዊ በግሪክ — Meqabyan Salsawi be-Grik", category: "extra_canonical", section: "OT",
          artifact: "Codex Alexandrinus (5th century)", site: "British Library, London", discovery: "Known continuously through the Greek Septuagint tradition. Codex Alexandrinus (5th century) and Codex Vaticanus (4th century) are the earliest surviving manuscripts.",
          note: "Not about the Maccabees — a 1st-century BC Greek text describing Ptolemy IV's persecution of Alexandrian Jews. Included in the Greek LXX but not in the Ethiopian canon." },
        { id: "maccabees4", name: "4 Maccabees", geez: "መቃብያን ራብዕ በግሪክ — Meqabyan Rab'i be-Grik", category: "extra_canonical", section: "OT",
          artifact: "Codex Sinaiticus (4th century)", site: "British Library, London", discovery: "Known from Codex Sinaiticus (discovered by Tischendorf at St. Catherine's Monastery, Sinai, 1844–1859) and other Greek LXX manuscripts.",
          note: "A 1st-century AD philosophical treatise on 'reason over passion' using the Maccabean martyrs as examples. Included in the Greek LXX appendix." },
        { id: "esdras1", name: "1 Esdras (3 Esdras)", geez: "ዕዝራ ቀዳማዊ በግሪክ — Ezira Qedamawi be-Grik", category: "extra_canonical", section: "OT",
          artifact: "Codex Vaticanus (4th century)", site: "Vatican Library", discovery: "Present in Codex Vaticanus (4th century) and Codex Alexandrinus (5th century), discovered as part of the great uncial codices. A Latin version found in the Vetus Latina.",
          note: "A Greek version of the Ezra story, paralleling Ezra-Nehemiah but with the addition of the 'Three Guardsmen' debate. Included in the LXX but not the Ethiopian canon." },
        { id: "letter_jeremiah", name: "Epistle of Jeremiah", geez: "መልእክተ ኤርምያስ — Mel'kte Eremyas", category: "extra_canonical", section: "OT",
          artifact: "Papyrus 967 (Chester Beatty)", site: "Chester Beatty Library, Dublin", discovery: "The earliest Greek copy discovered in the Chester Beatty Papyri (Papyrus 967, 2nd-3rd century AD). A Hebrew fragment found at Qumran (Cave 7) in 1955.",
          note: "A 2nd-century BC Hellenistic Jewish polemic against idolatry, attributed to Jeremiah. Included in the LXX as an appendix to Baruch." },
        { id: "sibylline", name: "Sibylline Oracles", geez: "ትንቢተ ሲቢላ — Tinbite Sibila", category: "extra_canonical", section: "OT",
          artifact: "Codex Monacensis Graecus", site: "Bavarian State Library, Munich", discovery: "Rediscovered in the 16th century from manuscripts in the Bavarian State Library and the Vatican. Compiled from scattered Greek and Latin manuscripts across Europe.",
          note: "A collection of Jewish and Christian prophetic oracles in Greek hexameter, composed 2nd century BC – 3rd century AD. Influenced early Christian eschatology." },

        // ═══ GNOSTIC GOSPELS (Nag Hammadi) ═══
        { id: "thomas_gospel", name: "Gospel of Thomas", geez: "ወንጌለ ቶማስ — Wengele Tomas", category: "extra_canonical", section: "NT",
          artifact: "Nag Hammadi Codex II (115 sayings)", site: "Coptic Museum, Cairo", discovery: "Discovered in December 1945 by Egyptian farmers near Nag Hammadi, Egypt, along with 12 other codices sealed in a large earthenware jar. The site is near the ancient monastery of St. Pachomius. Date: c. 350 AD (codex); text dated mid-2nd century AD.",
          note: "A collection of 114 sayings of Jesus discovered in 1945 at Nag Hammadi, Egypt. Lacks a passion narrative — consists only of 'secret sayings.' Dated to the mid-2nd century AD with possible 1st-century layers. Not to be confused with the Infancy Gospel of Thomas." },
        { id: "philip_gospel", name: "Gospel of Philip", geez: "ወንጌለ ፊሊጶስ — Wengele Filpos", category: "extra_canonical", section: "NT",
          artifact: "Nag Hammadi Codex II", site: "Coptic Museum, Cairo", discovery: "Discovered in 1945 at Nag Hammadi, Egypt, as the third treatise in Codex II of the Nag Hammadi library. The codex dates to c. 350 AD; the original Greek text composed c. 200–250 AD.",
          note: "A 3rd-century Gnostic sacramentary describing the rituals of the Valentinian school. Contains the famous line 'the companion of the [Mary] Magdalene' in a damaged passage." },
        { id: "mary_gospel", name: "Gospel of Mary", geez: "ወንጌለ ማርያም — Wengele Maryam", category: "extra_canonical", section: "NT",
          artifact: "Codex Berolinensis Gnosticus 8502", site: "Egyptian Museum, Berlin", discovery: "Purchased in Cairo in 1896 for the Berlin Egyptian Museum (Codex Berolinensis Gnosticus 8502). A Greek fragment was later identified among the Oxyrhynchus Papyri (POxy 3525) in the early 20th century.",
          note: "A Gnostic dialogue gospel in which Mary Magdalene reveals secret teachings given by the risen Jesus. Survives only in Coptic and a Greek fragment from Oxyrhynchus." },
        { id: "judas_gospel", name: "Gospel of Judas", geez: "ወንጌለ ይሁዳ — Wengele Yihuda", category: "extra_canonical", section: "NT",
          artifact: "Codex Tchacos (3rd century)", site: "Coptological Society, Geneva", discovery: "Discovered in the 1970s near El Minya, Egypt. Smuggled out of Egypt and passed through antiquities dealers for decades. Restored and published by the National Geographic Society in 2006. Radiocarbon dated to 220–340 AD.",
          note: "A 2nd-century Gnostic gospel portraying Judas not as a betrayer but as the disciple most trusted by Jesus to fulfill the mystery of salvation. Rediscovered in the 1970s." },
        { id: "truth_gospel", name: "Gospel of Truth", geez: "ወንጌለ ሕማምና ሞት ማለፍ — Wengele Hmanena Mot Malef", category: "extra_canonical", section: "NT",
          artifact: "Nag Hammadi Codex I (Jung Codex)", site: "Coptic Museum, Cairo", discovery: "Discovered at Nag Hammadi in 1945. Codex I was smuggled out of Egypt and purchased by the Jung Institute in Zurich in 1952, hence called the 'Jung Codex.' Returned to Egypt in 1975.",
          note: "A Valentinian meditation on the gospel attributed to the 2nd-century teacher Valentinus. Blends Jewish wisdom motifs with Gnostic cosmology." },
        { id: "john_apocryphon", name: "Apocryphon of John", geez: "ጽሑፈ ዮሐንስ ምሥጢር — Tsehufe Yohannes Mes'tir", category: "extra_canonical", section: "NT",
          artifact: "Nag Hammadi Codex II, III, IV / Berlin Codex", site: "Coptic Museum, Cairo", discovery: "Four separate Coptic copies discovered: three at Nag Hammadi in 1945 (Codices II, III, IV) and one in the Berlin Codex 8502 (purchased 1896). The earliest surviving copy dates to c. 350 AD.",
          note: "A foundational Sethian Gnostic text describing the revelation of the secret teaching given by Jesus to John. Contains the Gnostic creation myth: the fall of Sophia and the making of the Demiurge." },
        { id: "pistis_sophia", name: "Pistis Sophia", geez: "ሃይማኖተ ጥበብ — Haymanote Tsebebab", category: "extra_canonical", section: "NT",
          artifact: "Codex Askewianus (4th century)", site: "British Library, London", discovery: "Purchased by the British Museum in 1785 from the estate of Dr. Anthony Askew. The codex contains 354 pages of Coptic text. First published in Latin in 1812, and in Coptic with English translation in 1851.",
          note: "A 3rd-century Gnostic text in Coptic describing the 11 years after Jesus' resurrection. The risen Christ explains the mysteries of the aeons, repentance, and the ascent of the soul." },
        { id: "sophia_jesus", name: "Sophia of Jesus Christ", geez: "ጥበበ ኢየሱስ ክርስቶስ — Tibebe Iyasus Kristos", category: "extra_canonical", section: "NT",
          artifact: "Nag Hammadi Codex III / Berlin Codex", site: "Coptic Museum, Cairo", discovery: "Three Coptic copies discovered: two at Nag Hammadi in 1945 (Codices III and BG 8502) and one in the Berlin Gnostic Codex. A Greek fragment found at Oxyrhynchus confirms the original language.",
          note: "A Gnostic dialogue between the risen Jesus and his disciples (including Mary and Matthew) about the nature of the divine realm. Closely related to the Eugnostos the Blessed." },

        // ═══ APOCRYPHAL ACTS & INFANCY GOSPELS ═══
        { id: "acts_thomas", name: "Acts of Thomas", geez: "ግብረ ቶማስ — Gibre Tomas", category: "extra_canonical", section: "NT",
          artifact: "Syriac MS (British Library Add. 14645)", site: "British Library, London", discovery: "First published in 1719 from a Greek manuscript in the Bodleian. The Syriac version (British Library Add. 14645) discovered in the 19th century among manuscripts from the Nitrian Desert monasteries in Egypt.",
          note: "A 3rd-century AD text recounting Thomas's missionary journey to India. Contains the 'Hymn of the Pearl' and the 'Wedding Hymn.' Survives in Syriac, Greek, and Ethiopic versions." },
        { id: "acts_paul_thecla", name: "Acts of Paul & Thecla", geez: "ግብረ ጳውሎስ ወተቅላ — Gibre Pawlos we-Teqla", category: "extra_canonical", section: "NT",
          artifact: "Papyrus Oxyrhynchus 7", site: "Egypt Exploration Society, London", discovery: "Papyrus fragments found at Oxyrhynchus, Egypt (1897–1906). A complete Coptic version discovered in the 20th century. The Greek text was known from a 4th-century Greek manuscript from Mount Athos.",
          note: "A 2nd-century AD text recounting Paul's preaching and the story of Thecla, a young woman who abandons her betrothal to follow Paul. Thecla was venerated in the early church and in Ethiopian tradition." },
        { id: "acts_john", name: "Acts of John", geez: "ግብረ ዮሐንስ — Gibre Yohannes", category: "extra_canonical", section: "NT",
          artifact: "Codex Vaticanus Graecus 654", site: "Vatican Library", discovery: "Known from fragmented Greek manuscripts discovered in the Vatican Library and at Mount Athos. Papyrus fragments identified among the Oxyrhynchus Papyri. The earliest fragment dates to the 3rd century AD.",
          note: "A 2nd-century AD apocryphal act recounting John's ministry in Ephesus. Contains the earliest known depiction of Jesus dancing with his disciples at the Last Supper." },
        { id: "acts_peter", name: "Acts of Peter", geez: "ግብረ ጴጥሮስ — Gibre Pet'ros", category: "extra_canonical", section: "NT",
          artifact: "Codex Berolinensis 8502 / Actus Vercellenses", site: "Vercelli Cathedral, Italy", discovery: "The complete text preserved in a Latin manuscript (Actus Vercellenses) discovered in the cathedral library of Vercelli, Italy, in the 16th century. Greek fragments later found at Oxyrhynchus and among the Berlin Papyri.",
          note: "A 2nd-century AD text describing Peter's conflict with Simon Magus and his martyrdom in Rome. Contains the famous 'Quo Vadis' scene." },
        { id: "acts_andrew", name: "Acts of Andrew", geez: "ግብረ እንድሪያስ — Gibre Endreyas", category: "extra_canonical", section: "NT",
          artifact: "Codex Vaticanus Graecus 808 / Armenian", site: "Vatican Library", discovery: "Survives in fragmented Greek manuscripts from the Vatican and Mount Athos. A longer Armenian version discovered in the 19th century. A Coptic papyrus fragment found in Upper Egypt dates to the 4th century.",
          note: "A 2nd-3rd century AD text recounting Andrew's missionary journeys and his martyrdom by crucifixion on an X-shaped cross in Patras, Greece." },
        { id: "protoevangelium_james", name: "Protoevangelium of James", geez: "ዜና ልደተ ማርያም — Zena Lidate Maryam", category: "extra_canonical", section: "NT",
          artifact: "Codex Bodmer 5 (3rd century)", site: "Bodmer Library, Geneva", discovery: "The earliest Greek copy discovered in 1952 among the Bodmer Papyri in Egypt (Papyrus Bodmer 5, 3rd century AD). Numerous later Greek manuscripts known. An Ethiopic version (Mets'hafe Lidate Maryam) is preserved in Ethiopian monasteries.",
          note: "The earliest apocryphal infancy gospel (c. 150 AD), describing the birth and childhood of Mary and the birth of Jesus. The source of the names Joachim and Anne. An Ethiopic version (Mets'hafe Lidate Maryam) is used in the Ethiopian Church." },
        { id: "infancy_thomas", name: "Infancy Gospel of Thomas", geez: "ሕጻን ዘቶማስ — Hitsan ze-Tomas", category: "extra_canonical", section: "NT",
          artifact: "Greek MS (Codex 101, Vienna / Syriac MS)", site: "Austrian National Library, Vienna", discovery: "First published in 1858 from a Greek manuscript in Vienna. A Syriac version discovered among the Nitrian manuscripts of the British Library in the 19th century. Earlier papyrus fragments found at Oxyrhynchus (3rd century AD).",
          note: "A 2nd-century AD collection of legends about the child Jesus (age 5–12). Describes him making sparrows from clay, striking a boy dead, and learning the alphabet. Survives in multiple recensions including Syriac, Greek, and Latin." },
        { id: "infancy_arabic", name: "Arabic Infancy Gospel", geez: "ወንጌለ ሕጻናት ዐረባዊ — Wengele Hitsanat Arebawi", category: "extra_canonical", section: "NT",
          artifact: "Arabic MS (Sinai Arabic 39)", site: "St. Catherine's Monastery, Sinai", discovery: "First brought to European attention from a manuscript discovered at St. Catherine's Monastery, Sinai, in the 18th century. Published in Latin in 1697 (Sike edition) from an Arabic manuscript.",
          note: "A later infancy gospel (6th-7th century AD) compiling traditions from the Protoevangelium of James and the Infancy Gospel of Thomas. Contains legends of Jesus in Egypt." },
        { id: "nicodemus_gospel", name: "Gospel of Nicodemus (Acts of Pilate)", geez: "ወንጌለ ኒቆዲሞስ — Wengele Niqodimos", category: "extra_canonical", section: "NT",
          artifact: "Latin Codex (Einsiedeln 326)", site: "Einsiedeln Abbey, Switzerland", discovery: "Widely circulated in medieval Latin manuscripts across Europe. The earliest Greek manuscript (Codex 36, Jerusalem) discovered in the Patriarchal Library. Coptic and Syriac versions found in Egyptian monasteries.",
          note: "A 4th-century AD compilation claiming to be Pilate's official report of Jesus' trial, death, and resurrection. Includes the 'Harrowing of Hell' — Christ's descent to the underworld." },
        { id: "peter_gospel", name: "Gospel of Peter", geez: "ወንጌለ ጴጥሮስ — Wengele Pet'ros", category: "extra_canonical", section: "NT",
          artifact: "Papyrus Cairensis 10759 (Akhmin Codex)", site: "Coptic Museum, Cairo", discovery: "Discovered in 1886-87 by French archaeologists in a Christian tomb at Akhmim, Upper Egypt. The parchment codex also contained fragments of the Apocalypse of Peter and 1 Enoch. Dated to the 8th-9th century AD but the text dates to the 2nd century.",
          note: "A 2nd-century AD passion gospel fragment discovered in 1886 in a tomb in Akhmim, Egypt. Describes the resurrection in vivid detail — a giant Christ emerging from the tomb supported by two angels." },

        // ═══ APOSTOLIC FATHERS ═══
        { id: "didache", name: "Didache (Teaching of the Twelve)", geez: "ትምህርተ ሐዋርያት — Timhirte Hawaryat", category: "extra_canonical", section: "NT",
          artifact: "Codex Hierosolymitanus (1056 AD)", site: "Patriarchal Library, Jerusalem", discovery: "Discovered in 1873 by Philotheos Bryennios in the library of the Greek Orthodox Patriarchate in Jerusalem, in a manuscript dated 1056 AD. Published in 1883. Papyrus fragments later identified among the Oxyrhynchus Papyri (POxy 1782).",
          note: "The earliest known Christian catechetical manual (c. 70–110 AD). Contains instructions on baptism by immersion or pouring, the Eucharist, fasting, and the Two Ways (life and death)." },
        { id: "hermas", name: "Shepherd of Hermas", geez: "መንጉሠ ሄርማስ — Mengu'se Hermas", category: "extra_canonical", section: "NT",
          artifact: "Codex Sinaiticus (4th century)", site: "British Library, London", discovery: "Known from Codex Sinaiticus (discovered by Tischendorf at St. Catherine's Monastery, Sinai, 1844). Also found in dozens of papyrus fragments from Oxyrhynchus. The original Greek was a 2nd-century AD composition.",
          note: "A 2nd-century AD Christian apocalyptic text composed of visions, mandates, and parables. The Shepherd (an angel) instructs Hermas on repentance, baptism, and the building of the Church Tower." },
        { id: "barnabas_epistle", name: "Epistle of Barnabas", geez: "መልእክተ በርናባስ — Mel'kte Bernabas", category: "extra_canonical", section: "NT",
          artifact: "Codex Sinaiticus / Codex Hierosolymitanus", site: "British Library, London", discovery: "Discovered in Codex Sinaiticus (1844) by Tischendorf, bound after Revelation. Also found in Codex Hierosolymitanus (1873) by Bryennios. A Greek papyrus fragment (Papyrus 10778) found in Egypt dates to the 4th century.",
          note: "A 1st-2nd century AD epistle using allegorical interpretation to argue that the Jewish Law was never meant to be taken literally. Included in Codex Sinaiticus after Revelation." },
        { id: "ignatius_epistles", name: "Epistles of Ignatius", geez: "መልእክተ እግናጥዮስ — Mel'kte Egnatiyos", category: "extra_canonical", section: "NT",
          artifact: "Codex Mediceo-Laurentianus (11th century)", site: "Laurentian Library, Florence", discovery: "Seven genuine letters known from a 10th-century Greek manuscript found in Florence (Mediceo-Laurentianus). A Syriac version discovered in the 19th century among Nitrian manuscripts. A Coptic version found at Deir el-Surian in Egypt.",
          note: "Seven letters written by Ignatius of Antioch (c. 110 AD) while en route to martyrdom in Rome. Foundational for the doctrine of the Trinity, the Virgin Birth, and church hierarchy." },
        { id: "polycarp_epistle", name: "Epistle & Martyrdom of Polycarp", geez: "ሰምዐ ቆስጤርኖስ ወቅርስ — Sim'e Qosternos we-Qiristos", category: "extra_canonical", section: "NT",
          artifact: "Codex Hierosolymitanus / Eusebius, HE 4.15", site: "Patriarchal Library, Jerusalem", discovery: "The Martyrdom of Polycarp preserved in a 10th-century Greek manuscript discovered in the Patriarchal Library, Jerusalem. Also quoted extensively in Eusebius's Church History (4th century).",
          note: "Polycarp's letter to the Philippians (c. 110–140 AD) and the account of his martyrdom in Smyrna (c. 155 AD). The earliest preserved martyrdom account outside the NT." },
        { id: "diognetus", name: "Letter to Diognetus", geez: "መልእክተ ዲዮግኒጦስ — Mel'kte Diyognitos", category: "extra_canonical", section: "NT",
          artifact: "Codex Argentoratensis Graecus 9 (destroyed 1870)", site: "Formerly Strasbourg University", discovery: "Survived in a single 13th-century Greek manuscript discovered in a fish market in Constantinople around 1436. Brought to the Strasbourg library, where it was destroyed by fire in 1870 during the Franco-Prussian War. Known only from printed editions.",
          note: "A 2nd-century AD Christian apologetic letter explaining Christian life and belief to a pagan inquirer. Contains the famous passage: 'What the soul is to the body, Christians are to the world.'" },
        { id: "peter_apocalypse", name: "Apocalypse of Peter", geez: "ራእየ ጴጥሮስ — Ra'iy Pet'ros", category: "extra_canonical", section: "NT",
          artifact: "Codex Akhmim (Ethiopic version complete)", site: "Coptic Museum, Cairo", discovery: "A Greek fragment discovered in 1886-87 in a Christian tomb at Akhmim, Upper Egypt, bound with the Gospel of Peter. The complete text survives only in Ethiopic (Ge'ez), known to scholars since the 16th century from Ethiopian manuscripts.",
          note: "A 2nd-century AD apocalypse describing Peter's tour of heaven and hell — the oldest Christian depiction of the afterlife's torments and rewards. Survives fully only in Ge'ez." },

        // ═══ ADDITIONAL EXTRA-CANONICAL ═══
        { id: "hebrews_gospel", name: "Gospel of the Hebrews", geez: "ወንጌለ ዕብራውያን — Wengele Ebrawyan", category: "extra_canonical", section: "NT",
          artifact: "Patristic citations only — no manuscript survives", site: "Lost text known only from quotations", discovery: "No manuscript discovered. Known solely from quotations in early Christian writers: Clement of Alexandria (c. 200 AD), Origen (c. 250 AD), Jerome (c. 400 AD), and Didymus the Blind (c. 350 AD). Jerome reports that he translated it into Greek and Latin from a Hebrew/Aramaic original preserved in the library of Caesarea.",
          note: "A Jewish-Christian gospel used by the Nazarene and Ebionite communities, composed c. 70-100 AD. Survives only in 23 patristic quotations. Jesus says: 'He who seeks will not rest until he finds, and finding he will be astonished, and astonished he will reign, and reigning he will rest.'" },
        { id: "ebionites_gospel", name: "Gospel of the Ebionites", geez: "ወንጌለ አብዮናውያን — Wengele Abyonawyan", category: "extra_canonical", section: "NT",
          artifact: "Patristic citations in Epiphanius, Panarion 30", site: "Lost text preserved in quotations", discovery: "Known only from seven quotations preserved in Epiphanius of Salamis's heresiography Panarion (c. 376 AD). Epiphanius describes a gospel used by the Ebionites that differed from Matthew. No manuscript has ever been found.",
          note: "A 2nd-century Jewish-Christian gospel harmonizing Matthew, Luke, and distinct Ebionite theology. Jesus is depicted as vegetarian — 'I have come to abolish sacrifices; if you do not cease from sacrificing, the wrath of God will not cease from you.'" },
        { id: "cave_treasures", name: "Cave of Treasures", geez: "ቅዱስ ዋሻ መዝገብ — Qeddus Washa Mezgeb", category: "extra_canonical", section: "OT",
          artifact: "Syriac MSS (British Library Add. 25875)", site: "British Library, London", discovery: "Syriac manuscripts discovered among the Nitrian Desert manuscripts of the British Library in the 19th century. The oldest dated copy is from the 10th century, but the text is attributed to the 4th-6th century AD. An Ethiopic translation (Mets'hafe Mezgeb) is widely copied in Ethiopian monasteries.",
          note: "A 4th-6th century AD Syriac Christian text tracing salvation history from Creation to Pentecost. Describes Adam's body preserved in the Cave of Treasures, the Magi's journey, and the wood of the Cross. Deeply influential on Ethiopian tradition, especially in the Kebra Nagast." },
        { id: "kitab_majall", name: "Book of the Rolls (Kitab al-Majall)", geez: "መጽሐፈ መጽሐፍት ዘኩሉ ዘመን — Mets'hafe Mets'ahaft", category: "extra_canonical", section: "OT",
          artifact: "Arabic MS (Bodleian Marsh 229)", site: "Bodleian Library, Oxford", discovery: "Preserved in Arabic manuscripts discovered in the 17th-18th centuries among Syriac Christian communities in the Middle East. The Bodleian copy (Marsh 229) was acquired in the 18th century. Also known in Ethiopic and Coptic versions from Egyptian monasteries.",
          note: "A 5th-6th century AD Christian apocryphon attributed to Clement of Rome. Contains revelations given by Jesus to the apostles about creation, the Flood, the Table of Nations, and the destiny of the soul. Also called 'The Book of the Rolls' because it was stored in a roll in the Temple." }
    ]; // end CANON_DATA

    function getCanonType(book) {
        var tOnly = ['enoch','jubilees','meqabyan1','meqabyan2','meqabyan3','pseudo_josephus','ezra_sutuel','prayer_manasseh','psalm151','sinodos','clement','didascalia','covenant_book'];
        var dOnly = ['wisdom_solomon','sirach','baruch'];
        if (book.category === 'extra_canonical') return 'r';
        if (tOnly.indexOf(book.id) !== -1) return 't';
        if (dOnly.indexOf(book.id) !== -1) return 'd';
        return 'p';
    }

    window.showVault = function(section) {
        var gateway = document.getElementById('compendiumGateway');
        var filterNav = document.getElementById('filterNav');
        var search = document.querySelector('.canon-search');
        var statusEl = document.getElementById('retrieval-status');
        
        // Trigger unsealing sequence
        var curtain = document.getElementById('narthex-transition-curtain');
        if (curtain) {
            var textEl = document.getElementById('transition-text');
            if (textEl) {
                var sectionNames = {
                    'canonical': 'THE CANONICAL CORE',
                    'pseudepigrapha': 'PSEUDEPIGRAPHA ARCHIVE',
                    'acts_fathers': 'ACTS & FATHERS VAULT',
                    'gnostic': 'GNOSTIC DIALOGUES'
                };
                textEl.textContent = 'UNSEALING ' + sectionNames[section] + '...';
            }
            curtain.classList.add('active');
            
            setTimeout(function() {
                curtain.classList.remove('active');
                
                // Hide gateway, show filter
                if (gateway) gateway.classList.add('hidden');
                if (filterNav) filterNav.style.display = 'flex';
                if (search) search.style.display = 'block';
                
                // Activate the filter
                var btn = document.querySelector('#filterNav button[data-category="' + section + '"]');
                if (btn) {
                    filterCanon(section, btn);
                }
                
                // Update stats display
                if (statusEl) {
                    var sectionLabels = {
                        'canonical': 'THE CANONICAL CORE — 81 BOOKS',
                        'pseudepigrapha': 'PSEUDEPIGRAPHA ARCHIVE — 22 TEXTS',
                        'acts_fathers': 'ACTS & FATHERS VAULT — 18 WRITINGS',
                        'gnostic': 'GNOSTIC DIALOGUES — 15 CODEXES'
                    };
                    statusEl.textContent = sectionLabels[section] || '';
                }
            }, 2200);
        } else {
            // Fallback if curtain not found
            if (gateway) gateway.classList.add('hidden');
            if (filterNav) filterNav.style.display = 'flex';
            if (search) search.style.display = 'block';
            var btn = document.querySelector('#filterNav button[data-category="' + section + '"]');
            if (btn) filterCanon(section, btn);
        }
    };

    // Return to gateway from filter view
    window.returnToGateway = function() {
        var gateway = document.getElementById('compendiumGateway');
        var filterNav = document.getElementById('filterNav');
        var search = document.querySelector('.canon-search');
        var statusEl = document.getElementById('retrieval-status');
        
        if (gateway) gateway.classList.remove('hidden');
        if (filterNav) filterNav.style.display = 'none';
        if (search) search.style.display = 'none';
        if (statusEl) statusEl.textContent = '';
        
        // Reset filter to show all
        var allBtn = document.querySelector('#filterNav button[data-category="all"]');
        if (allBtn) filterCanon('all', allBtn);
        
        // Hide all cards
        document.querySelectorAll('.book-card').forEach(function(card) {
            card.classList.add('hidden');
        });
    };

    window.toggleCanonCompare = function() {
        var gallery = document.getElementById('canonGallery');
        var btn = document.getElementById('canonCompareBtn');
        gallery.classList.toggle('canon-compare');
        btn.classList.toggle('active');
    };

    // Compute stats
    (function() {
        var total = CANON_DATA.length;
        var otCount = CANON_DATA.filter(function(b) { return b.section === 'OT'; }).length;
        var ntCount = CANON_DATA.filter(function(b) { return b.section === 'NT'; }).length;
        var extra = CANON_DATA.filter(function(b) { return b.category === 'extra_canonical'; }).length;
        var canonical = total - extra;
        var statsEl = document.getElementById('canonStats');
        if (statsEl) {
            statsEl.innerHTML =
                '<span>' + otCount + '</span> OLD TESTAMENT &nbsp;·&nbsp; <span>' + ntCount + '</span> NEW TESTAMENT &nbsp;·&nbsp; <span>' + canonical + '</span> CANONICAL BOOKS &nbsp;·&nbsp; <span style="color: var(--text-secondary);">+' + extra + '</span> EXTRACANON';
        }
    })();

// Render gallery
    var gallery = document.getElementById('canonGallery');
    
    // Fix #3: SCRIPTORIUM_CANON typo corrected; safe fallback
    var pdfPageMap = (typeof SCRIPTORIUM_CANON !== 'undefined' && SCRIPTORIUM_CANON) ? SCRIPTORIUM_CANON.pdfPageMap : {};
    
    // Merge SCRIPTORIUM_CANON.books into CANON_DATA if available (avoid duplicates)
    var beforeLen = CANON_DATA.length;
    if (typeof SCRIPTORIUM_CANON !== 'undefined' && SCRIPTORIUM_CANON && SCRIPTORIUM_CANON.books) {
        var existingIds = {};
        CANON_DATA.forEach(function(b) { existingIds[b.id] = true; });
        SCRIPTORIUM_CANON.books.forEach(function(b) {
            if (!existingIds[b.id]) {
                CANON_DATA.push(b);
                existingIds[b.id] = true;
            }
        });
    }
    CANON_DATA.forEach(function(book, idx) {
        var card = document.createElement('div');
        card.className = 'book-card hidden'; // Fix #7: start hidden, shown by vault selection
        card.dataset.category = book.category;
        card.dataset.id = book.id; // Fix #6: use data-id instead of _bookIndex property
        card.dataset.bookIdx = idx;
        card.dataset.bookId = book.id;
        card.dataset.canon = getCanonType(book);
        var pdfPage = pdfPageMap[book.id] || (idx + 1);
        var artifactText = (book.artifact || '');
        card.innerHTML =
            '<div class="book-name">' + book.name + '</div>' +
            '<div class="geez-name">' + book.geez + '</div>' +
            '<div class="book-category"><em>' + (book.section === 'OT' ? 'OLD TESTAMENT' : 'NEW TESTAMENT') + '</em> — ' + book.category.toUpperCase() + '</div>' +
            '<div class="artifact-preview">' + artifactText.substring(0, 55) + (artifactText.length > 55 ? '...' : '') + '</div>' +
            '<a class="pdf-link" href="assets/docs/SCRIPTORIUM_ETHIOPIAN_CANON.pdf#page=' + pdfPage + '" target="_blank" data-action="event.stopPropagation()">📜 VIEW IN CATALOG</a>';
        card.onclick = function() { 
            // Fix #4: Use openOverlay (which exists) instead of broken previewArtifact referencing #artifactModal
            openOverlay(book);
        };
        var badge = document.createElement('div');
        badge.className = 'canon-badge';
        var canonLabels = { p: 'SHARED', d: 'DEUTEROCANON', t: 'TEWAHEDO-ONLY', r: 'REFERENCE' };
        badge.textContent = canonLabels[card.dataset.canon] || 'SHARED';
        card.appendChild(badge);
        gallery.appendChild(card);
    });

    // Filter function
    window.filterCanon = function(category, btn) {
        document.querySelectorAll('#filterNav button').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var query = document.getElementById('canonSearch').value.toLowerCase();
        var anyVisible = false;
        var canonicalCats = ['torah', 'historical', 'wisdom', 'prophets', 'gospels', 'epistles'];
        var pseudepigraphaCats = ['deuterocanon', 'baruch2', 'baruch3', 'psalms_solomon', 'odes_solomon', 'testament_patriarchs', 'moses_assumption', 'isaiah_martyrdom', 'adam_eve', 'abraham_apocalypse', 'elijah_apocalypse', 'maccabees3', 'maccabees4', 'esdras1', 'letter_jeremiah', 'sibylline', 'cave_treasures', 'kitab_majall', 'pseudo_josephus', 'ezra_sutuel', 'prayer_manasseh', 'psalm151'];
        var actsFathersCats = ['apostolic', 'didache', 'hermas', 'barnabas_epistle', 'ignatius_epistles', 'polycarp_epistle', 'diognetus', 'peter_apocalypse', 'protoevangelium_james', 'infancy_thomas', 'infancy_arabic', 'nicodemus_gospel', 'peter_gospel'];
        var gnosticCats = ['thomas_gospel', 'philip_gospel', 'mary_gospel', 'judas_gospel', 'truth_gospel', 'john_apocryphon', 'pistis_sophia', 'sophia_jesus', 'acts_thomas', 'acts_paul_thecla', 'acts_john', 'acts_peter', 'acts_andrew', 'hebrews_gospel', 'ebionites_gospel'];
        var gnosticBookIds = ['thomas_gospel', 'philip_gospel', 'apocryphon_john', 'hypostasis_archons', 'ogdoad', 'apocryphon_james'];
        
        // Timeline eras (chronological order)
        var timelineEras = [
            { name: 'PRE-EXILIC PERIOD (1000–586 BC)', books: ['psalms', 'proverbs', 'ecclesiastes', 'song', 'job', 'ruth', 'samuel1', 'samuel2', 'joshua', 'judges', 'kings1', 'kings2', 'chronicles1', 'chronicles2'] },
            { name: 'EXILIC PERIOD (586–538 BC)', books: ['ezekiel', 'daniel', 'lamentations', 'isaiah'] },
            { name: 'POST-EXILIC PERIOD (538–200 BC)', books: ['ezra', 'nehemiah', 'esther', 'haggai', 'zechariah', 'malachi', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'leviticus', 'numbers', 'deuteronomy', 'genesis', 'exodus', 'baruch', 'jeremiah', 'prophet'] },
            { name: 'HELLENISTIC PERIOD (200 BC – 30 AD)', books: ['deuterocanon', 'sirach', 'wisdom_solomon', 'judith', 'tobit', 'maccabees1', 'maccabees2', 'maccabees3', 'maccabees4', 'baruch2', 'baruch3', 'psalm151', 'psalms_solomon', 'jubilees', 'enoch', 'testament_patriarchs', 'sibylline', 'testaments_12'] },
            { name: 'NEW TESTAMENT ERA (30–150 AD)', books: ['gospels', 'acts', 'pauline', 'catholic', 'revelation', 'thomas_gospel', 'philip_gospel', 'apocryphon_john', 'peter_gospel', 'john_gospel', 'hebrews_gospel', 'ebionites_gospel', 'infancy_thomas', 'protoevangelium_james', 'acts_thomas', 'didache', 'clement', 'ignatius', 'polycarp', 'hermas', 'barnabas', 'diognetus', 'peter_apocalypse', 'cave_treasures', 'kitab_majall'] }
        ];
        
        var timelineBookIds = {
            // PRE-EXILIC (1000-586 BC)
            'psalms': 1, 'proverbs': 2, 'song': 3, 'genesis': 4, 'exodus': 5, 'leviticus': 6, 'numbers': 7, 'deuteronomy': 8,
            'joshua': 9, 'judges': 10, 'ruth': 11, 'samuel1': 12, 'samuel2': 13, 'amos': 14, 'hosea': 15, 'jonah': 16, 'micah': 17, 'isaiah': 18, 'kings1': 19, 'kings2': 20, 'nahum': 21, 'zephaniah': 22, 'habakkuk': 23,
            // EXILIC (586-538 BC)
            'jeremiah': 24, 'lamentations': 25, 'obadiah': 26, 'baruch': 27, 'ezekiel': 28, 'job': 29,
            // POST-EXILIC (538-200 BC)
            'haggai': 30, 'zechariah': 31, 'chronicles1': 32, 'chronicles2': 33, 'ezra': 34, 'nehemiah': 35, 'malachi': 36, 'esther': 37, 'joel': 38, 'ecclesiastes': 39, 'psalm151': 40, 'tobit': 41, 'enoch': 42,
            // HELLENISTIC (200 BC - 30 AD)
            'sirach': 43, 'daniel': 44, 'jubilees': 45, 'maccabees1': 46, 'maccabees2': 47, 'maccabees3': 48, 'judith': 49, 'prayer_manasseh': 50, 'testament_patriarchs': 51, 'psalms_solomon': 52, 'wisdom_solomon': 53, 'maccabees4': 54, 'moses_assumption': 55,
            // NEW TESTAMENT (30-100 AD)
            'galatians': 56, 'thessalonians1': 57, 'thessalonians2': 58, 'corinthians1': 59, 'corinthians2': 60, 'romans': 61, 'james': 62, 'ephesians': 63, 'colossians': 64, 'philippians': 65, 'philemon': 66, 'timothy1': 67, 'titus': 68, 'timothy2': 69, 'peter1': 70, 'mark': 71, 'hebrews': 72, 'luke': 73, 'acts': 74, 'matthew': 75, 'jude': 76, 'peter2': 77, 'john1': 78, 'john2': 79, 'john3': 80, 'john': 81, 'revelation': 82,
            // SUB-APOSTOLIC (70-150 AD)
            'baruch2': 83, 'baruch3': 84, 'abraham_apocalypse': 85, 'clement': 86, 'didache': 87, 'sibylline': 88, 'ignatius_epistles': 89, 'odes_solomon': 90, 'john_apocryphon': 91, 'barnabas_epistle': 92, 'diognetus': 93, 'polycarp_epistle': 94, 'peter_apocalypse': 95, 'thomas_gospel': 96, 'truth_gospel': 97, 'hermas': 98, 'matthew': 99, 'hebrews_gospel': 100, 'clement': 101,
            // APOCRYPHAL ACTS & PATRISTIC (150-300 AD)
            'isaiah_martyrdom': 102, 'acts_paul_thecla': 103, 'judas_gospel': 104, 'sophia_jesus': 105, 'acts_john': 106, 'acts_peter': 107, 'elijah_apocalypse': 108, 'infancy_thomas': 109, 'acts_thomas': 110, 'acts_andrew': 111, 'pistis_sophia': 112, 'adam_eve': 113, 'peter_gospel': 114,
            // LATE ANTIQUITY (300-500+ AD)
            'nicodemus_gospel': 115, 'cave_treasures': 116, 'sinodos': 117, 'covenant_book': 118, 'dislava': 119, 'clement': 120, 'kitab_majall': 121, 'infancy_arabic': 122
        };
        
        document.querySelectorAll('.book-card').forEach(function(card) {
            var cat = card.dataset.category;
            var bookId = card.dataset.bookId;
            var catMatch = false;
            if (category === 'all') {
                catMatch = true;
            } else if (category === 'canonical') {
                catMatch = canonicalCats.includes(cat);
            } else if (category === 'pseudepigrapha') {
                catMatch = pseudepigraphaCats.includes(cat) || (cat === 'deuterocanon' && bookId === 'enoch');
            } else if (category === 'acts_fathers') {
                catMatch = actsFathersCats.includes(cat);
            } else if (category === 'gnostic') {
                catMatch = gnosticCats.includes(cat) || gnosticBookIds.includes(bookId) || cat === 'extra_canonical';
            } else if (category === 'timeline') {
                var idx = parseInt(card.dataset.bookIdx);
                var book = CANON_DATA[idx];
                var bkId = (book && book.id) ? book.id : bookId;
                var order = timelineBookIds[bkId] || 999;
                card.style.setProperty('--timeline-order', order);
                catMatch = true;
            } else {
                catMatch = cat === category;
            }
            var idx = parseInt(card.dataset.bookIdx);
            var book = CANON_DATA[idx];
            var searchMatch = !query ||
                book.name.toLowerCase().indexOf(query) !== -1 ||
                book.geez.toLowerCase().indexOf(query) !== -1 ||
                (book.artifact && book.artifact.toLowerCase().indexOf(query) !== -1) ||
                (book.note && book.note.toLowerCase().indexOf(query) !== -1);
            if (catMatch && searchMatch) {
                card.classList.remove('hidden');
                anyVisible = true;
            } else {
                card.classList.add('hidden');
            }
        });
        document.getElementById('emptyState').classList.toggle('show', !anyVisible);
        
        // Timeline view: create era labels and sort cards
        if (category === 'timeline') {
            var gallery = document.getElementById('canonGallery');
            var existingEras = gallery.querySelectorAll('.timeline-era');
            existingEras.forEach(function(e) { e.remove(); });
            
            var visibleCards = Array.from(gallery.querySelectorAll('.book-card:not(.hidden)'));
            visibleCards.sort(function(a, b) {
                var orderA = parseInt(a.style.getPropertyValue('--timeline-order')) || 999;
                var orderB = parseInt(b.style.getPropertyValue('--timeline-order')) || 999;
                return orderA - orderB;
            });
            
            visibleCards.forEach(function(card) { gallery.appendChild(card); });
            
var currentEra = 0;
            var eraNames = ['', 'PRE-EXILIC PERIOD (1000–586 BC)', 'EXILIC PERIOD (586–538 BC)', 'POST-EXILIC PERIOD (538–200 BC)', 'HELLENISTIC PERIOD (200 BC – 30 AD)', 'NEW TESTAMENT ERA (30–100 AD)', 'SUB-APOSTOLIC ERA (70–150 AD)', 'APOCRYPHAL ACTS & PATRISTIC (150–300 AD)', 'LATE ANTIQUITY & ETHIOPIC (300–500+ AD)'];
            visibleCards.forEach(function(card) {
                var order = parseInt(card.style.getPropertyValue('--timeline-order')) || 999;
                var era = 0;
                if (order <= 23) era = 1;         // Pre-Exilic: orders 1-23
                else if (order <= 29) era = 2;    // Exilic: orders 24-29
                else if (order <= 42) era = 3;    // Post-Exilic: orders 30-42
                else if (order <= 55) era = 4;    // Hellenistic: orders 43-55
                else if (order <= 82) era = 5;    // New Testament: orders 56-82
                else if (order <= 101) era = 6;   // Sub-Apostolic: orders 83-101
                else if (order <= 114) era = 7;   // Apocryphal Acts: orders 102-114
                else era = 8;                     // Late Antiquity: orders 115+
                
                if (era !== currentEra && era > 0) {
                    var eraLabel = document.createElement('div');
                    eraLabel.className = 'timeline-era';
                    eraLabel.textContent = eraNames[era];
                    eraLabel.dataset.era = era;
                    gallery.insertBefore(eraLabel, card);
                    currentEra = era;
                }
            });
        }
    };

    // Overlay
    var overlay = document.getElementById('bookOverlay');
    var overlayContent = document.getElementById('overlayContent');

    function openOverlay(book) {
        // Map Ethiopian card id to canonical book name for the reader
        var readerName = book.name;
        overlayContent.innerHTML =
            '<button class="close-btn" data-action="closeOverlay()">&#10005;</button>' +
            '<h2>' + book.name + '</h2>' +
            '<div class="geez-title">' + book.geez + '</div>' +
            '<div class="field"><strong>Canon</strong><span>' + (book.section === 'OT' ? 'Old Testament' : 'New Testament') + ' &mdash; ' + book.category.toUpperCase() + '</span></div>' +
            '<div class="field"><strong>Manuscript</strong><span>' + book.artifact + '</span></div>' +
            '<div class="field"><strong>Repository</strong><span>' + book.site + '</span></div>' +
            (book.discovery ? '<div class="field"><strong>Discovery</strong><span>' + book.discovery + '</span></div>' : '') +
            '<div class="lore">' + book.note + '</div>' +
            '<div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap;">' +
              '<button class="scr-read-btn" data-action="launchScriptoriumReader(\'' + readerName.replace(/'/g,"\\'") + '\',\'ethiopian\');closeOverlay();" style="font-size:0.65rem;padding:10px 20px;">📖 READ FULL BOOK</button>' +
            '</div>';
        overlay.classList.add('active');
    }

    window.closeOverlay = function() { overlay.classList.remove('active'); };
    overlay.onclick = function(e) { if (e.target === overlay) closeOverlay(); };

    // Fix #8: Authoritative search input binding (removed duplicate oninput from HTML)
    document.addEventListener('DOMContentLoaded', function() {
        var searchInput = document.getElementById('canonSearch');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                var activeBtn = document.querySelector('#filterNav button.active');
                if (activeBtn) filterCanon(activeBtn.dataset.category, activeBtn);
                // Search clear button
                var clearBtn = document.getElementById('searchClearBtn');
                if (clearBtn) clearBtn.classList.toggle('visible', this.value.length > 0);
            });
        }
        // Search clear button logic
        var clearBtn = document.getElementById('searchClearBtn');
        if (clearBtn) {
            clearBtn.onclick = function() {
                var si = document.getElementById('canonSearch');
                if (si) { si.value = ''; si.dispatchEvent(new Event('input')); }
                this.classList.remove('visible');
            };
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { closeOverlay(); }
    });

    // ═══ ENHANCED UI — category stripes + animated reveals ═══
    (function enhanceUI() {
        // Add category stripe to every card
        document.querySelectorAll('.book-card').forEach(function(card) {
            var stripe = document.createElement('div');
            stripe.className = 'cat-stripe';
            card.prepend(stripe);
        });

        // Animated card reveal when filterCanon shows cards
        var origFilter = window.filterCanon;
        window.filterCanon = function(category, btn) {
            // Remove old reveal class
            document.querySelectorAll('.book-card.revealed').forEach(function(c) { c.classList.remove('revealed'); });
            origFilter(category, btn);
            // Add revealed class to newly visible cards with slight delay
            setTimeout(function() {
                var visible = document.querySelectorAll('.book-card:not(.hidden)');
                visible.forEach(function(c, i) {
                    setTimeout(function() { c.classList.add('revealed'); }, Math.min(i * 18, 300));
                });
            }, 10);
        };

        // Add book counts to filter buttons
        var catCounts = {};
        document.querySelectorAll('.book-card').forEach(function(card) {
            var cat = card.dataset.category;
            catCounts[cat] = (catCounts[cat] || 0) + 1;
        });
        var canonicalCats = ['torah', 'historical', 'wisdom', 'prophets', 'gospels', 'epistles'];
        var pseudepigraphaCats = ['deuterocanon', 'prayer_manasseh', 'psalm151', 'pseudo_josephus', 'ezra_sutuel'];
        var actsFathersCats = ['apostolic', 'didache', 'hermas', 'barnabas_epistle', 'ignatius_epistles', 'polycarp_epistle', 'diognetus', 'peter_apocalypse', 'protoevangelium_james', 'infancy_thomas', 'infancy_arabic', 'nicodemus_gospel', 'peter_gospel'];
        var gnosticCats = ['thomas_gospel', 'philip_gospel', 'mary_gospel', 'judas_gospel', 'truth_gospel', 'john_apocryphon', 'pistis_sophia', 'sophia_jesus', 'acts_thomas', 'acts_paul_thecla', 'acts_john', 'acts_peter', 'acts_andrew', 'hebrews_gospel', 'ebionites_gospel'];

        function sumCats(cats) {
            return cats.reduce(function(acc, c) { return acc + (catCounts[c] || 0); }, 0);
        }
        var filterCounts = {
            'all': document.querySelectorAll('.book-card').length,
            'canonical': sumCats(canonicalCats),
            'pseudepigrapha': sumCats(pseudepigraphaCats),
            'acts_fathers': sumCats(actsFathersCats),
            'gnostic': sumCats(gnosticCats)
        };

        document.querySelectorAll('#filterNav button[data-category]').forEach(function(btn) {
            var cat = btn.dataset.category;
            if (filterCounts[cat] !== undefined) {
                var countSpan = document.createElement('span');
                countSpan.className = 'btn-count';
                countSpan.textContent = '(' + filterCounts[cat] + ')';
                btn.appendChild(countSpan);
            }
        });

        // Overlay section tag enhancement
        var origOpenOverlay = openOverlay;
        openOverlay = function(book) {
            origOpenOverlay(book);
            // Insert section tag at top of overlay
            var oc = document.getElementById('overlayContent');
            if (oc && !oc.querySelector('.overlay-section-tag')) {
                var tag = document.createElement('div');
                tag.className = 'overlay-section-tag';
                tag.textContent = book.section === 'OT' ? 'OLD TESTAMENT' : 'NEW TESTAMENT';
                oc.insertBefore(tag, oc.firstChild);
            }
        };
    })();


    // TIMELINE RAIL — derives dates from CANON_DATA
    // ═══════════════════════════════════════════
    function assignBookDate(book) {
        var n = book.name, s = book.section, c = book.category;
        
        // PRE-EXILIC (1000-586 BC)
        if (n.indexOf('Psalms') !== -1 && n.indexOf('Solomon') === -1) return '1000 BC';
        if (n.indexOf('Proverbs') !== -1) return '950 BC';
        if (n.indexOf('Song') !== -1) return '950 BC';
        if (c === 'torah') return '950 BC';  // Genesis, Exodus, Leviticus, Numbers, Deuteronomy
        if (n.indexOf('Joshua') !== -1) return '900 BC';
        if (n.indexOf('Judges') !== -1) return '900 BC';
        if (n.indexOf('Ruth') !== -1) return '900 BC';
        if (n.indexOf('Samuel') !== -1) return '800 BC';
        if (n.indexOf('Amos') !== -1) return '760 BC';
        if (n.indexOf('Hosea') !== -1) return '750 BC';
        if (n.indexOf('Jonah') !== -1) return '750 BC';
        if (n.indexOf('Micah') !== -1) return '730 BC';
        if (n.indexOf('Isaiah') !== -1) return '700 BC';
        if (n.indexOf('Kings') !== -1) return '700 BC';
        if (n.indexOf('Nahum') !== -1) return '630 BC';
        if (n.indexOf('Zephaniah') !== -1) return '625 BC';
        if (n.indexOf('Habakkuk') !== -1) return '605 BC';
        
        // EXILIC (586-538 BC)
        if (n.indexOf('Jeremiah') !== -1 || n.indexOf('Lamentations') !== -1) return '585 BC';
        if (n.indexOf('Obadiah') !== -1) return '586 BC';
        if (n.indexOf('Baruch') !== -1) return '580 BC';
        if (n.indexOf('Ezekiel') !== -1) return '570 BC';
        if (n.indexOf('Job') !== -1) return '550 BC';
        
        // POST-EXILIC (538-200 BC)
        if (n.indexOf('Haggai') !== -1 || n.indexOf('Zechariah') !== -1) return '520 BC';
        if (n.indexOf('Chronicles') !== -1) return '450 BC';
        if (n.indexOf('Ezra') !== -1) return '450 BC';
        if (n.indexOf('Nehemiah') !== -1) return '430 BC';
        if (n.indexOf('Malachi') !== -1) return '430 BC';
        if (n.indexOf('Esther') !== -1) return '400 BC';
        if (n.indexOf('Joel') !== -1) return '400 BC';
        if (n.indexOf('Ecclesiastes') !== -1) return '350 BC';
        if (n.indexOf('Psalm 151') !== -1) return '300 BC';
        if (n.indexOf('Tobit') !== -1) return '250 BC';
        if (n.indexOf('Enoch') !== -1) return '300 BC';
        
        // HELLENISTIC (200 BC - 30 AD)
        if (n.indexOf('Sirach') !== -1) return '180 BC';
        if (n.indexOf('Daniel') !== -1) return '165 BC';
        if (n.indexOf('Jubilees') !== -1) return '150 BC';
        if (n.indexOf('Meqabyan') !== -1 || n.indexOf('Maccabees') !== -1) return '100 BC';
        if (n.indexOf('Judith') !== -1) return '150 BC';
        if (n.indexOf('Manasseh') !== -1) return '150 BC';
        if (n.indexOf('Testament of the') !== -1 || n.indexOf('12 Patriarchs') !== -1) return '100 BC';
        if (n.indexOf('Psalms of Solomon') !== -1) return '50 BC';
        if (n.indexOf('Wisdom of Solomon') !== -1) return '30 BC';
        if (n.indexOf('3 Maccabees') !== -1) return '50 BC';
        if (n.indexOf('4 Maccabees') !== -1) return '30 BC';
        if (n.indexOf('Assumption of Moses') !== -1 || n.indexOf('Testament of Moses') !== -1) return '20 AD';
        
        // NEW TESTAMENT (30-100 AD)
        if (n.indexOf('Galatians') !== -1) return '49 AD';
        if (n.indexOf('Thessalonians') !== -1) return '50 AD';
        if (n.indexOf('Corinthians') !== -1) return '55 AD';
        if (n.indexOf('Romans') !== -1) return '57 AD';
        if (n.indexOf('James') !== -1) return '60 AD';
        if (n.indexOf('Ephesians') !== -1 || n.indexOf('Philippians') !== -1 || n.indexOf('Colossians') !== -1 || n.indexOf('Philemon') !== -1) return '60 AD';
        if (n.indexOf('Timothy') !== -1 || n.indexOf('Titus') !== -1) return '62 AD';
        if (n.indexOf('Peter') !== -1 && n.indexOf('1') !== -1) return '64 AD';
        if (n.indexOf('Mark') !== -1) return '70 AD';
        if (n.indexOf('Hebrews') !== -1) return '70 AD';
        if (n.indexOf('Luke') !== -1 || n.indexOf('Acts') !== -1) return '80 AD';
        if (n.indexOf('Matthew') !== -1) return '80 AD';
        if (n.indexOf('Jude') !== -1) return '80 AD';
        if (n.indexOf('Peter') !== -1 && n.indexOf('2') !== -1) return '85 AD';
        if (n.indexOf('John') !== -1 && n.indexOf('1') !== -1) return '90 AD';
        if (n.indexOf('John') !== -1 && (n.indexOf('2') !== -1 || n.indexOf('3') !== -1)) return '90 AD';
        if (n.indexOf('John') !== -1 && n.indexOf('Gospel') !== -1) return '95 AD';
        if (n.indexOf('Revelation') !== -1) return '95 AD';
        
        // SUB-APOSTOLIC (70-150 AD)
        if (n.indexOf('2 Baruch') !== -1) return '80 AD';
        if (n.indexOf('3 Baruch') !== -1 || n.indexOf('4 Baruch') !== -1) return '100 AD';
        if (n.indexOf('Apocalypse of Abraham') !== -1) return '100 AD';
        if (n.indexOf('Clement') !== -1) return '96 AD';
        if (n.indexOf('Didache') !== -1) return '100 AD';
        if (n.indexOf('Sibylline') !== -1) return '100 AD';
        if (n.indexOf('Ignatius') !== -1) return '110 AD';
        if (n.indexOf('Odes of Solomon') !== -1) return '120 AD';
        if (n.indexOf('Apocryphon of John') !== -1) return '120 AD';
        if (n.indexOf('Barnabas') !== -1) return '130 AD';
        if (n.indexOf('Diognetus') !== -1) return '130 AD';
        if (n.indexOf('Polycarp') !== -1) return '135 AD';
        if (n.indexOf('Apocalypse of Peter') !== -1) return '135 AD';
        if (n.indexOf('Gospel of Thomas') !== -1) return '140 AD';
        if (n.indexOf('Gospel of Truth') !== -1) return '140 AD';
        if (n.indexOf('Shepherd of Hermas') !== -1 || n.indexOf('Hermas') !== -1) return '140 AD';
        
        // APOCRYPHAL ACTS & PATRISTIC (150-300 AD)
        if (n.indexOf('Martyrdom') !== -1 && n.indexOf('Isaiah') !== -1) return '150 AD';
        if (n.indexOf('Acts of Paul') !== -1 || n.indexOf('Thecla') !== -1) return '170 AD';
        if (n.indexOf('Gospel of Judas') !== -1) return '180 AD';
        if (n.indexOf('Sophia of Jesus') !== -1) return '180 AD';
        if (n.indexOf('Acts of John') !== -1) return '180 AD';
        if (n.indexOf('Acts of Peter') !== -1) return '180 AD';
        if (n.indexOf('Apocalypse of Elijah') !== -1) return '200 AD';
        if (n.indexOf('Infancy Gospel of Thomas') !== -1) return '200 AD';
        if (n.indexOf('Acts of Thomas') !== -1) return '220 AD';
        if (n.indexOf('Acts of Andrew') !== -1) return '250 AD';
        if (n.indexOf('Pistis Sophia') !== -1) return '250 AD';
        if (n.indexOf('Life of Adam') !== -1 || n.indexOf('Adam and Eve') !== -1) return '250 AD';
        if (n.indexOf('Gospel of Peter') !== -1) return '250 AD';
        
        // LATE ANTIQUITY (300-500+ AD)
        if (n.indexOf('Gospel of Nicodemus') !== -1) return '350 AD';
        if (n.indexOf('Cave of Treasures') !== -1) return '400 AD';
        if (n.indexOf('Sinodos') !== -1) return '400 AD';
        if (n.indexOf('Covenant') !== -1 || n.indexOf('Kidan') !== -1) return '450 AD';
        if (n.indexOf('Discilla') !== -1 || n.indexOf('Didasqal') !== -1) return '450 AD';
        if (n.indexOf('Kitab') !== -1 || n.indexOf('Book of the Rolls') !== -1) return '500 AD';
        if (n.indexOf('Arabic Infancy') !== -1) return '500 AD';
        
        // NT Epistles
        if (c === 'epistles') {
            if (n.indexOf('Acts') !== -1) return '65 AD';
            if (n.indexOf('Romans') !== -1) return '57 AD';
            if (n.indexOf('Corinthians') !== -1 || n.indexOf('Galatians') !== -1) return '55 AD';
            if (n.indexOf('Ephesians') !== -1 || n.indexOf('Philippians') !== -1 || n.indexOf('Colossians') !== -1 || n.indexOf('Philemon') !== -1) return '60 AD';
            if (n.indexOf('Thessalonians') !== -1) return '52 AD';
            if (n.indexOf('Timothy') !== -1 || n.indexOf('Titus') !== -1) return '63 AD';
            if (n.indexOf('Hebrews') !== -1) return '65 AD';
            if (n.indexOf('James') !== -1) return '50 AD';
            if (n.indexOf('Peter') !== -1) return '65 AD';
            if (n.indexOf('John') !== -1 && n.indexOf('Apocryphon') === -1) return '90 AD';
            if (n.indexOf('Jude') !== -1) return '65 AD';
            if (n.indexOf('Revelation') !== -1) return '95 AD';
            return '60 AD';
        }
        // NT Apostolic
        if (c === 'apostolic') return '300 AD';
        // NT Extra-canonical
        if (c === 'extra_canonical' && s === 'NT') {
            if (n.indexOf('Didache') !== -1) return '100 AD';
            if (n.indexOf('Shepherd of Hermas') !== -1) return '140 AD';
            if (n.indexOf('Epistle of Barnabas') !== -1) return '100 AD';
            if (n.indexOf('Ignatius') !== -1) return '110 AD';
            if (n.indexOf('Polycarp') !== -1) return '155 AD';
            if (n.indexOf('Diognetus') !== -1) return '150 AD';
            if (n.indexOf('Apocalypse of Peter') !== -1) return '135 AD';
            if (n.indexOf('Infancy Gospel') !== -1) return '180 AD';
            if (n.indexOf('Arabic Infancy') !== -1) return '600 AD';
            if (n.indexOf('Gospel of Thomas') !== -1) return '150 AD';
            if (n.indexOf('Gospel of Philip') !== -1) return '250 AD';
            if (n.indexOf('Gospel of Mary') !== -1) return '150 AD';
            if (n.indexOf('Gospel of Judas') !== -1) return '250 AD';
            if (n.indexOf('Gospel of Truth') !== -1) return '160 AD';
            if (n.indexOf('Apocryphon of John') !== -1) return '180 AD';
            if (n.indexOf('Pistis Sophia') !== -1) return '250 AD';
            if (n.indexOf('Sophia of Jesus') !== -1) return '200 AD';
            if (n.indexOf('Acts of Thomas') !== -1) return '200 AD';
            if (n.indexOf('Acts of Paul') !== -1) return '180 AD';
            if (n.indexOf('Acts of John') !== -1) return '180 AD';
            if (n.indexOf('Acts of Peter') !== -1) return '190 AD';
            if (n.indexOf('Acts of Andrew') !== -1) return '200 AD';
            if (n.indexOf('Protoevangelium') !== -1) return '150 AD';
            if (n.indexOf('Nicodemus') !== -1) return '400 AD';
            if (n.indexOf('Gospel of Peter') !== -1) return '150 AD';
            if (n.indexOf('Gospel of the Hebrews') !== -1) return '100 AD';
            if (n.indexOf('Gospel of the Ebionites') !== -1) return '150 AD';
            return '200 AD';
        }
        return s === 'OT' ? '500 BC' : '100 AD';
    }

    function parseTimelineDate(d) {
        return d.indexOf('BC') !== -1 ? -parseInt(d.replace(/[^0-9]/g, '')) : parseInt(d.replace(/[^0-9]/g, ''));
    }

    function isApocalypse(name) {
        var n = name.toUpperCase();
        if (n.indexOf('REVELATION') !== -1) return true;
        if (n.indexOf('APOCALYPSE') !== -1) return true;
        if (n === 'DANIEL') return true;
        if (n === 'EZEKIEL') return true;
        if (n === 'SHEPHERD OF HERMAS') return true;
        if (n.indexOf('EZRA SUTUEL') !== -1) return true;
        if (n.indexOf('2 BARUCH') !== -1 || n.indexOf('3 BARUCH') !== -1) return true;
        return false;
    }

    function buildTimeline() {
        var track = document.getElementById('timelineTrack');
        var tooltip = document.getElementById('timelineTooltip');
        var rail = document.getElementById('timelineRail');
        if (!track || !tooltip || !rail) return;
        rail.style.display = 'flex';

        var books = CANON_DATA.map(function(b) {
            return { name: b.name, date: assignBookDate(b), section: b.section, discovery: b.discovery };
        });
        var dates = books.map(function(b) { return parseTimelineDate(b.date); });
        var minDate = Math.min.apply(null, dates) - 20;
        var maxDate = Math.max.apply(null, dates) + 20;
        var range = maxDate - minDate;

        books.forEach(function(book, idx) {
            var pct = ((parseTimelineDate(book.date) - minDate) / range) * 100;
            var marker = document.createElement('div');
            marker.className = 'timeline-era-marker';
            if (book.section === 'NT') marker.classList.add('nt');
            if (isApocalypse(book.name)) marker.classList.add('apocalypse');
            marker.style.left = pct + '%';
            marker.dataset.idx = idx;

            var tick = document.createElement('div');
            tick.className = 'timeline-tick';
            var dot = document.createElement('div');
            dot.className = 'timeline-book-dot';
            var label = document.createElement('div');
            label.className = 'timeline-book-label';
            label.innerText = book.name.toUpperCase();

            marker.appendChild(tick);
            marker.appendChild(dot);
            marker.appendChild(label);

            marker.addEventListener('mouseenter', function() {
                var html = '<div class="tooltip-main">' + book.name + ' — ' + book.date + '</div>';
                if (book.discovery) {
                    var disc = book.discovery;
                    var pIdx = disc.indexOf('.');
                    var summary = pIdx > 0 ? disc.substring(0, pIdx + 1) : disc;
                    if (summary.length > 120) summary = disc.substring(0, 117) + '...';
                    html += '<div class="tooltip-disc">' + summary + '</div>';
                }
                tooltip.innerHTML = html;
                tooltip.classList.add('active');
            });
            marker.addEventListener('mousemove', function(e) {
                var tipW = tooltip.offsetWidth || 120;
                var gap = 12;
                var leftPos = e.clientX - tipW - gap;
                if (leftPos < 10) {
                    tooltip.style.left = (e.clientX + gap) + 'px';
                    tooltip.style.transform = 'translateX(0%)';
                } else {
                    tooltip.style.left = leftPos + 'px';
                    tooltip.style.transform = 'translateX(0%)';
                }
            });
            marker.addEventListener('mouseleave', function() {
                tooltip.style.left = '';
                tooltip.style.transform = '';
                tooltip.classList.remove('active');
            });

            track.appendChild(marker);
        });

        // Spread markers at same date position
        var posGroups = {};
        var markers = track.querySelectorAll('.timeline-era-marker');
        markers.forEach(function(m) {
            var pct = m.style.left;
            if (!posGroups[pct]) posGroups[pct] = [];
            posGroups[pct].push(m);
        });
        Object.keys(posGroups).forEach(function(pct) {
            var group = posGroups[pct];
            if (group.length > 1) {
                group.forEach(function(m, gi) {
                    var offset = (gi - (group.length - 1) / 2) * 0.6;
                    m.style.left = (parseFloat(pct) + offset) + '%';
                });
            }
        });

        // Stagger overlapping label clusters — tighter thresholds for dense data
        markers = track.querySelectorAll('.timeline-era-marker');
        var clusterDepth = 0;
        for (var i = 1; i < markers.length; i++) {
            var prev = markers[i - 1];
            var curr = markers[i];
            var diff = parseFloat(curr.style.left) - parseFloat(prev.style.left);
            if (diff < 0.7) {
                clusterDepth = Math.min(clusterDepth + 1, 4);
                var lbl = curr.querySelector('.timeline-book-label');
                if (lbl) lbl.style.top = (20 + clusterDepth * 10) + 'px';
            } else {
                clusterDepth = 0;
            }
        }
    }

    var timelineTrack, timelineTooltip, rail;
    setTimeout(buildTimeline, 150);

    window.downloadCatalog = function() {
        var sorted = CANON_DATA.slice().sort(function(a, b) {
            var da = parseTimelineDate(assignBookDate(a));
            var db = parseTimelineDate(assignBookDate(b));
            return da - db;
        });

        var sectionLabels = { torah: 'TORAH', historical: 'HISTORICAL', wisdom: 'WISDOM', prophets: 'PROPHETS',
            deuterocanon: 'DEUTEROCANON', gospels: 'GOSPELS', epistles: 'EPISTLES', apostolic: 'APOSTOLIC',
            extra_canonical: 'EXTRACANONICAL' };
        var sectionOrder = ['torah','historical','wisdom','prophets','deuterocanon',
            'gospels','epistles','apostolic','extra_canonical'];

        var h = document.getElementById('printCatalog');
        var otCount = CANON_DATA.filter(function(b) { return b.section === 'OT'; }).length;
        var ntCount = CANON_DATA.filter(function(b) { return b.section === 'NT'; }).length;
        var extraCount = CANON_DATA.filter(function(b) { return b.category === 'extra_canonical'; }).length;

        var html = '<div class="print-header">' +
            '<div class="print-wax-seal">SCRIPTORIUM</div>' +
            '<h1>ETHIOPIAN CANON — COMPLETE CATALOG</h1>' +
            '<div class="print-sub">The 81 books of the Ethiopian Orthodox Tewahedo Church + 40 Extra-Canonical Texts</div>' +
            '<div class="print-stats">' + otCount + ' OT &nbsp;·&nbsp; ' + ntCount + ' NT &nbsp;·&nbsp; ' +
            (otCount+ntCount-extraCount) + ' CANONICAL &nbsp;·&nbsp; +' + extraCount + ' EXTRACANON</div>' +
            '</div>';

        sectionOrder.forEach(function(cat) {
            var books = CANON_DATA.filter(function(b) { return b.category === cat; });
            if (books.length === 0) return;
            html += '<div class="print-section">' +
                '<h2>' + sectionLabels[cat] + ' — ' + books.length + ' Books</h2>';
            books.sort(function(a, b) {
                return parseTimelineDate(assignBookDate(a)) - parseTimelineDate(assignBookDate(b));
            }).forEach(function(b) {
                var isApo = b.name.toUpperCase().indexOf('REVELATION') !== -1 ||
                    b.name === 'Daniel' || b.name === 'Ezekiel' ||
                    b.name.indexOf('Apocalypse') !== -1;
                html += '<div class="print-entry' + (isApo ? ' print-apocalypse' : '') + '">' +
                    '<div class="pe-date">' + assignBookDate(b) + '</div>' +
                    '<div class="pe-body">' +
                    '<div class="pe-name">' + b.name + '</div>' +
                    '<div class="pe-geez">' + b.geez + '</div>' +
                    (b.note ? '<div class="pe-note">' + b.note.substring(0, 180) + (b.note.length > 180 ? '...' : '') + '</div>' : '') +
                    '<div class="pe-meta">' + b.artifact + (b.site ? ' — ' + b.site : '') + '</div>' +
                    '</div></div>';
            });
            html += '</div>';
        });

        h.innerHTML = html;
        window.print();
    };

    window.downloadTimelinePDF = function() {
        var sorted = CANON_DATA.slice().sort(function(a, b) {
            var da = parseTimelineDate(assignBookDate(a));
            var db = parseTimelineDate(assignBookDate(b));
            return da - db;
        });
        
        var eraRanges = [
            { name: 'PRE-EXILIC PERIOD (1000–586 BC)', min: -1000, max: -586 },
            { name: 'EXILIC PERIOD (586–538 BC)', min: -586, max: -538 },
            { name: 'POST-EXILIC PERIOD (538–200 BC)', min: -538, max: -200 },
            { name: 'HELLENISTIC PERIOD (200 BC – 30 AD)', min: -200, max: 30 },
            { name: 'NEW TESTAMENT ERA (30–150 AD)', min: 30, max: 150 },
            { name: 'SUB-APOSTOLIC ERA (70–150 AD)', min: 70, max: 150 },
            { name: 'APOCRYPHAL ACTS & PATRISTIC (150–300 AD)', min: 150, max: 300 },
            { name: 'LATE ANTIQUITY & ETHIOPIC (300–500+ AD)', min: 300, max: 600 }
        ];
        
        var html = '<div class="print-header">' +
            '<div class="print-wax-seal">SCRIPTORIUM</div>' +
            '<h1>CHRONOLOGICAL TIMELINE — TEWAHEDO ARCHIVE</h1>' +
            '<div class="print-sub">The Broad Canon: 81 Canonical + 40+ Extra-Canonical Texts</div>' +
            '<div class="print-stats">' + sorted.length + ' Books in Chronological Order</div>' +
            '</div>';
        
        var currentEra = -1;
        sorted.forEach(function(b, idx) {
            var d = parseTimelineDate(assignBookDate(b));
            var eraIdx = eraRanges.findIndex(function(e) { return d >= e.min && d < e.max; });
            if (eraIdx === -1) eraIdx = eraRanges.length - 1;
            
            if (eraIdx !== currentEra) {
                currentEra = eraIdx;
                html += '<div class="print-section"><h2>' + eraRanges[eraIdx].name + '</h2></div>';
            }
            
            var isApo = b.name.toUpperCase().indexOf('REVELATION') !== -1 ||
                b.name === 'Daniel' || b.name === 'Ezekiel' ||
                b.name.indexOf('Apocalypse') !== -1;
            html += '<div class="print-entry' + (isApo ? ' print-apocalypse' : '') + '">' +
                '<div class="pe-date">' + assignBookDate(b) + '</div>' +
                '<div class="pe-body">' +
                '<div class="pe-name">' + b.name + '</div>' +
                '<div class="pe-geez">' + b.geez + '</div>' +
                (b.note ? '<div class="pe-note">' + b.note.substring(0, 120) + (b.note.length > 120 ? '...' : '') + '</div>' : '') +
                '</div></div>';
        });
        
        var h = document.getElementById('printCatalog');
        h.innerHTML = html;
        window.print();
    };

    // Initialize - hide all book cards until vault is selected
    (function() {
        document.querySelectorAll('.book-card').forEach(function(card) {
            card.classList.add('hidden');
        });
    })();