        const ARCHAEOLOGY_VAULT = {
            "Jerusalem": { artifact: "Pilate Stone (AE 1961.1)", year: "1961", id: "AE 1961.1", note: "First physical evidence of Pontius Pilate outside the Bible. Found in Caesarea Maritima.", stratigraphy: ["Iron Age II (1000-586 BC)", "Persian (539-332 BC)", "Hellenistic (332-63 BC)", "Roman (63 BC-324 AD)"], c14: { target: 74, sample: "Burnt olive pits from Ophel excavation" } },
            "Qumran": { artifact: "Great Isaiah Scroll — 1QIsa", year: "1947", id: "1QIsa", note: "A 24-foot near-perfect scroll of Isaiah, dating 1,000 years older than any previously known manuscript.", stratigraphy: ["Hellenistic (100 BC)", "Roman (68 AD destruction)"], c14: { target: 78, sample: "Papyrus fibers from 1QIsa scroll" } },
            "Babylon": { artifact: "Cyrus Cylinder — BM 90920", year: "1879", id: "BM 90920", note: "Confirms the decree of Cyrus the Great allowing Jews to return to Jerusalem after the exile.", stratigraphy: ["Neo-Babylonian (626-539 BC)", "Achaemenid Persian (539-332 BC)"], c14: null },
            "Nineveh": { artifact: "Lachish Reliefs — BM 124901", year: "1847", id: "BM 124901", note: "Stone carvings from Sennacherib's palace depicting the siege mentioned in 2 Kings 18.", stratigraphy: ["Neo-Assyrian (911-612 BC)"], c14: null },
            "Ephesus": { artifact: "Artemis Cult Inscription", year: "1954", id: "Inv. 1954.1", note: "Confirms the existence of the Artemis temple's 'great goddess' worship addressed in Acts 19.", stratigraphy: ["Hellenistic (3rd c. BC)", "Roman (1st-4th c. AD)"], c14: null },
            "Bethlehem": { artifact: "Byzantine Church Mosaics", year: "1922", id: "BETH-1922", note: "Byzantine church over traditional birthplace confirmed by Helena's 4th-century discovery.", stratigraphy: ["Iron Age (1200-586 BC)", "Roman (63 BC-324 AD)", "Byzantine (324-638 AD)"], c14: { target: 82, sample: "Charred grain from Iron Age silo" } },
            "Capernaum": { artifact: "Peter's House Church", year: "1968", id: "CAP-68", note: "Octagonal 4th-century church built directly over a 1st-century dwelling identified as Peter's home.", stratigraphy: ["Early Roman (1st c. AD)", "Byzantine (4th c. AD)"], c14: { target: 85, sample: "Wood from 1st-century fishing boat" } },
            "Bethany": { artifact: "Lazarus Tomb Ossuary", year: "1968", id: "BETHANY-68", note: "Ancient tomb with ossuaries near Lazarus cave, confirming 1st-century burial customs.", stratigraphy: ["Roman (1st c. AD)", "Byzantine (4th-6th c. AD)"], c14: { target: 86, sample: "Bone collagen from ossuary" } },
            "Galilee": { artifact: "Moses-in-Egypt Synagogue Fresco", year: "1890", id: "GAL-1890", note: "Jewish wall paintings in ancient synagogues depicting biblical scenes.", stratigraphy: ["Roman (3rd-4th c. AD)"], c14: null },
            "Jericho": { artifact: "Joshua's Destruction Layer", year: "1930", id: "JERICHO-30", note: "Famous 'Joshua's walls fell' site shows multiple destruction layers matching the biblical account.", stratigraphy: ["Early Bronze (3000-2000 BC)", "Middle Bronze (2000-1550 BC)", "Late Bronze (1550-1200 BC)"], c14: { target: 62, sample: "Burnt grain from Middle Bronze destruction layer" } },
            "Tel Dan": { artifact: "Tel Dan Stele — B.8969", year: "1993", id: "B.8969", note: "The only extra-biblical inscription mentioning the 'House of David'. Discovered in three fragments at Tel Dan.", stratigraphy: ["Iron Age II (9th c. BC)", "Hellenistic (4th c. BC)"], c14: null },
            "Megiddo": { artifact: "Egyptian Pottery of Necho", year: "2023", id: "MEG-2023", note: "Recently discovered Egyptian pottery at Megiddo provides the first physical evidence of Pharaoh Necho's presence during King Josiah's death (2 Kings 23:29).", stratigraphy: ["Late Bronze (1550-1200 BC)", "Iron Age I (1200-1000 BC)", "Iron Age II (1000-586 BC)", "Persian (539-332 BC)"], c14: { target: 72, sample: "Carbonized seeds from Iron Age II stratum" } },
            "Caesarea": { artifact: "Pilate Stone — AE 1961.1", year: "1961", id: "AE 1961.1", note: "A dedicatory inscription by Pontius Pilate discovered in the Caesarea theater, proving his historical governorship of Judaea.", stratigraphy: ["Herodian (1st c. BC-1st c. AD)", "Roman (1st-4th c. AD)", "Byzantine (4th-7th c. AD)"], c14: { target: 84, sample: "Wood from Herodian harbor structure" } },
            "Hazor": { artifact: "Joshua's Destruction Layer", year: "1990", id: "HAZOR-90", note: "A one-meter thick layer of ash and cracked stones confirms a massive burn dating to the conquest of Hazor (Joshua 11).", stratigraphy: ["Late Bronze II (1400-1200 BC)", "Iron Age I (1200-1000 BC)"], c14: { target: 67, sample: "Charred timber from Late Bronze palace" } },
            "Shechem": { artifact: "The Great Massebah", year: "1910", id: "SHEC-1910", note: "The largest standing stone found in Israel, likely the 'witness stone' mentioned in Joshua 24:26.", stratigraphy: ["Middle Bronze (2000-1550 BC)", "Late Bronze (1550-1200 BC)", "Iron Age (1200-586 BC)"], c14: { target: 57, sample: "Organic residue from Canaanite altar" } }
        };

        const PLACES = [
            // MAJOR BIBLICAL CITIES
            { name: "Jerusalem", lat: 31.768, lng: 35.214, era: "kingdom", year: -1000, importance: "major", region: "Judea", pop: "80,000", refs: "2 Samuel 5:6 | 1 Kings 8:1", events: "David's capital | Temple built | Jesus crucified",
                archaeology: { status: "Continuously Excavated", excavated: "1860s–ongoing (Warren, etc.)", finds: "City of David water system, Hezekiah's Tunnel, Sennacherib's siege ramp, Temple Mount Ophel, Wilson's Arch, Pool of Siloam, DSS caves, Bar Kokhba letters", controversy: "Temple location disputed (Dome of Rock vs Ophel); Warren's Shaft dating debated; 70 AD destruction layers confirmed" } },
            { name: "Babylon", lat: 32.537, lng: 44.421, era: "kingdom", year: -586, importance: "major", region: "Mesopotamia", pop: "200,000", refs: "2 Kings 25", events: "Exile begins | Daniel's court",
                archaeology: { status: "Extensively Excavated", excavated: "1899–1917 (Koldewey), 1960s–70s (Sass), 1978–80s (Reade), 2000s (IBNA)", finds: "Ishtar Gate glazed bricks, Processional Way lion statues, Nebuchadnezzar inscriptions, Cyrus Cylinder, Hammurabi Stele, blue-glazed palace bricks", controversy: "Nebuchadnezzar's palace confirmed; Hanging Gardens unproven (no archaeological evidence); Cyrus Cylinder confirms edict" } },
            { name: "Bethlehem", lat: 31.904, lng: 35.202, era: "patriarchal", year: -2000, importance: "major", region: "Judea", pop: "3,000", refs: "Genesis 35:19 | Luke 2:4", events: "Rachel buried | Jesus born | Ruth gleaning",
                archaeology: { status: "Limited Excavation", excavated: "1922–39 (Albright), 1949–50 (Kafar), 1990s (Broshi)", finds: "Rachel's tomb marker, Iron Age tomb complex, Byzantine church foundations, monastic settlement, Ottoman-period houses", controversy: "Most excavation restricted beneath modern town; Byzantine church over traditional birthplace confirmed by Helena; Iron Age necropolis validates biblical scale" } },
            { name: "Calvary/Golgotha", lat: 31.778, lng: 35.227, era: "new_testament", year: 30, importance: "major", region: "Judea", pop: "0", refs: "Luke 23:33", events: "Crucifixion of Jesus",
                archaeology: { status: "Fully Excavated", excavated: "1883–84 (Conrad Schick), 1961–78 (Gibson/Ball), 1970s–80s (Kollmann/Barker)", finds: "Gordon's Golgotha skull-shaped hill, Garden Tomb, 1st-century tombs in Quarry, 'Nailing' inscription (Talpiot tomb), ossuaries", controversy: "Garden Tomb rejected; Church of Holy Sepulchre location contested but accepted by most scholars; Talpiot tomb = Jesus family debated" } },
            { name: "Capernaum", lat: 32.876, lng: 35.542, era: "new_testament", year: 28, importance: "major", region: "Galilee", pop: "1,500", refs: "Mark 2:1 | John 2:12", events: "Jesus' ministry base | Peter's house",
                archaeology: { status: "Fully Excavated", excavated: "1898–1905 (Schneider), 1905–21 (Vendelmann), 1968–72 (Corbo/Loffreda), 1980s–2000s (Frogelli)", finds: "Octagonal 4th-century church over Peter's house, Synagogue white limestone, Jesus boat (1st-century fishing boat from Galilee), marketplace, mosaic floors", controversy: "Peter's house church confirmed; Octagonal church built 4th century over 'house'; Jesus boat carbon-dated to 1st century" } },
{ name: "Sinai", lat: 28.539, lng: 33.978, era: "exodus", year: -1446, importance: "major", region: "Sinai", pop: "0", refs: "Exodus 19", events: "Law given | Moses received Torah",
                archaeology: { status: "Limited Excavation", excavated: "2000s (G. W. and Israeli park service)", finds: "Reed water (Ex 15:13), Saudi border marker, Arabian trade route, Bedouin oral tradition", controversy: "Traditional Jebel Musa location contested by alternative sites (Jebel el-Lawz — claimed but disputed); Reed Sea crossing route debated (Nuweiba vs bitter lakes); Egyptian Merneptah Stele references 'Israel' — oldest extra-biblical mention" } },
            { name: "Mount Carmel", lat: 32.700, lng: 35.033, era: "kingdom", year: -900, importance: "major", region: "Israel", pop: "0", refs: "1 Kings 18:20", events: "Elijah vs Baal prophets",
                archaeology: { status: "Excavated", excavated: "1911–14 (Karge), 1960–70 (B. &)", finds: "Cave of Elijah, Israelite shrine, Phoenician cultic objects, Iron Age burial caves, Prehistoric cave", controversy: "Elijah's cave confirmed by tradition; Muhraqa site = location of contest; Cave inhabited from prehistoric through Byzantine era" } },
            { name: "Mount of Beatitudes", lat: 32.833, lng: 35.533, era: "new_testament", year: 28, importance: "major", region: "Galilee", pop: "0", refs: "Matthew 5:1", events: "Sermon on the Mount",
                archaeology: { status: "Excavated", excavated: "1936 (Baldi), 1984–86", finds: "Byzantine octagonal church (4th century), ornate mosaic floors, Pilgrims' inscriptions, olive press", controversy: "Church built 4th century by Helena; location matches Mt 5:1 'when He saw the crowds, He went up'; octagonal shape symbolic; olive trees around are medieval" } },
            { name: "Emmaus", lat: 31.783, lng: 35.050, era: "new_testament", year: 30, importance: "minor", region: "Judea", pop: "2,000", refs: "Luke 24:13", events: "Jesus appears",
                archaeology: { status: "Excavated", excavated: "1873 (Schick), 1920s (Vincent), 1945–48 (Benoit)", finds: "Byzantine church, Crusader church, necropolis with 1st-century tombs, oil press", controversy: "Three candidate sites (Abu Ghosh=12 km, Imwas=20 km, Nabi Samwil=8 km); Abu Ghosh preferred by Franciscans; Emmaus = 'village of the friends'" } },
            { name: "Abrahams Oak", lat: 31.767, lng: 35.250, era: "patriarchal", year: -2000, importance: "minor", region: "Judea", pop: "0", refs: "Genesis 18:1", events: "Three visitors",
                archaeology: { status: "Not Excavated", excavated: "None (site under religious restriction)", finds: "Ancient oak tree (400–500 years old), Crusader/Mamluk shrine, pilgrim inscriptions", controversy: "Tree dates only 15th–17th century; not OT-era oak; site established in Crusader period; Genesis 18:1 location traditional only" } },
            { name: "Tel Dan", lat: 33.249, lng: 35.652, era: "kingdom", year: -900, importance: "major", region: "Galilee", pop: "2,000", refs: "Judges 18:29 | 1 Kings 12:29", events: "Jeroboam's golden calf | House of David inscription",
                archaeology: { status: "Extensively Excavated", excavated: "1966–2010 (Biran, Ilan), 2010s–ongoing (Gregg)", finds: "Tel Dan Stele (House of David), Bronze Age gate complex, Iron Age high place, Mycenaean tomb, Roman fountain house", controversy: "Stele fragments found 1993–94: three pieces; BYTDWD (House of David) reading debated by minimalists but widely accepted" } },
            { name: "Megiddo", lat: 32.585, lng: 35.185, era: "kingdom", year: -609, importance: "major", region: "Israel", pop: "5,000", refs: "Judges 5:19 | 2 Kings 23:29 | Revelation 16:16", events: "Battle of Deborah | Josiah killed | Armageddon",
                archaeology: { status: "Continuously Excavated", excavated: "1903–05 (Schumacher), 1925–39 (Chicago), 1964–74 (Yadin), 1994–ongoing (Megiddo Expedition)", finds: "Solomon's stables (disputed), 20+ strata, Egyptian pottery (Necho era, 609 BC), ivory collection, water system, Canaanite temples", controversy: "Egyptian pottery (609 BC) first evidence of Necho's presence at Megiddo; 'Solomon's stables' now dated to Ahab; 20+ continuous settlement layers" } },
            { name: "Caesarea Maritima", lat: 32.500, lng: 34.892, era: "new_testament", year: 30, importance: "major", region: "Judea", pop: "40,000", refs: "Acts 10:1 | Acts 25:1-13", events: "Peter & Cornelius | Paul before Festus | Pilate inscription",
                archaeology: { status: "Fully Excavated", excavated: "1950–60s (Frova), 1970s–80s (Bull), 1990s–ongoing (Porath, Patrick)", finds: "Pilate Stone, Herodian theater, underwater harbor structures, Crusader cathedral, hippodrome, aqueduct system", controversy: "Pilate Stone found 1961 in theater reused as step; 'Tiberieum' reconstruction uncertain; harbor concrete (Roman) still intact after 2,000 years" } },
            
            // ADDITIONAL BIBLICAL SITES — journey waypoints
            { name: "Ur", lat: 30.963, lng: 46.103, era: "patriarchal", year: -2100, importance: "major", region: "Mesopotamia", pop: "65,000", refs: "Genesis 11:28-31", events: "Abraham called by God | Journey begins",
                archaeology: { status: "Extensively Excavated", excavated: "1922–34 (Woolley), 1980s (Safar), 1990s (Wright)", finds: "Royal Cemetery, Ziggurat of Ur, Standard of Ur, Royal Tombs with treasures, cuneiform tablets", controversy: "Woolley's 'Great Flood' layer (Ur III) debated; Abraham's Ur = Tell el-Muqayyar widely accepted; Ur III empire confirmed by texts" } },
            { name: "Haran", lat: 36.864, lng: 40.866, era: "patriarchal", year: -2000, importance: "major", region: "Mesopotamia", pop: "10,000", refs: "Genesis 12:1-5", events: "Terah dies | Abraham called | Jacob flees here",
                archaeology: { status: "Excavated", excavated: "1950s (Lloyd), 1980s (Wilhelm)", finds: "Sin temple complex, Assyrian palace, cuneiform tablets, mudbrick houses, city gate", controversy: "Major trading center on Balikh River; moon god Sin cult center; destruction layer from Assyrian conquest" } },
            { name: "Shechem", lat: 32.233, lng: 35.167, era: "patriarchal", year: -1900, importance: "major", region: "Israel", pop: "5,000", refs: "Genesis 12:6 | Joshua 24:1", events: "Abraham's first altar | Covenant renewed | Joseph's bones buried",
                archaeology: { status: "Extensively Excavated", excavated: "1913–14 (Sellin), 1956–73 (Dever, Wright), 1980s (Campbell)", finds: "Temple of Baal-berith, city gate with standing stones, massive fortification walls, Middle Bronze Age tower temple", controversy: "Temple of El-berith identified with Abimelech's temple; destruction layers match Joshua conquest; Great Massebah (standing stone) = covenant witness" } },
            { name: "Hebron", lat: 31.533, lng: 35.098, era: "patriarchal", year: -2000, importance: "major", region: "Judea", pop: "20,000", refs: "Genesis 13:18 | 2 Samuel 2:1", events: "Abraham settles | David crowned king of Judah",
                archaeology: { status: "Continuously Inhabited", excavated: "1920s (Mader), 1960s (Ofer), 1980s (Munro)", finds: "Herodian enclosure over Cave of Machpelah, Iron Age houses, Roman-Byzantine remains, Mamluk mosque complex", controversy: "Cave of Machpelah verified as ancient burial site; Patriarchs tradition accepted; Herodian construction confirmed by masonry style" } },
            { name: "Beersheba", lat: 31.400, lng: 34.900, era: "patriarchal", year: -1900, importance: "major", region: "Israel", pop: "4,000", refs: "Genesis 21:31 | 1 Samuel 8:2", events: "Well of oath | Abraham & Abimelech covenant | Judges' seat",
                archaeology: { status: "Fully Excavated", excavated: "1969–76 (Aharoni), 1990s (Herzog), 2000s (Singer-Avitz)", finds: "Horned altar reused as building stone, well system, city gate complex, storehouse buildings, Iron Age houses", controversy: "Horned altar dismantled by Hezekiah's reform; Iron Age city confirmed as administrative center; well identified with Abraham's well" } },
            { name: "Jericho", lat: 31.858, lng: 35.463, era: "exodus", year: -1400, importance: "major", region: "Canaan", pop: "2,000", refs: "Joshua 6:1-20 | Luke 19:1", events: "Walls fall | Jericho taxed by Zacchaeus",
                archaeology: { status: "Continuously Excavated", excavated: "1907–09 (Sellin), 1930–36 (Garstang), 1952–58 (Kenyon), 1990s (Bienkowski)", finds: "Round Neolithic tower (8000 BC), collapsed mudbrick walls, burnt grain storage, Jericho skulls, Hasmonean palace", controversy: "Kenyon's carbon dates vs Garstang's wall fall date; Late Bronze destruction layer (Kenyon: none; others: limited remains); collapsed walls date debated" } },
            { name: "Jordan River", lat: 31.947, lng: 35.571, era: "exodus", year: -1400, importance: "major", region: "Canaan", pop: "0", refs: "Joshua 3:14-17 | Matthew 3:13", events: "Israel crosses | Elijah ascends | Jesus baptized",
                archaeology: { status: "Limited Excavation", excavated: "1930s (Glueck), 1990s (Wahlin), 2000s (Kafafi)", finds: "Byzantine baptismal pools, pilgrim pilgrim inscriptions, Qasr el-Yahud monasteries, Neolithic settlements along banks", controversy: "Yardenit vs Bethany Beyond the Jordan (Al-Maghtas) as baptism site; UN recognizes Al-Maghtas; Joshua crossing at Adam site (Damiya) debated" } },
            { name: "Nazareth", lat: 32.707, lng: 35.298, era: "new_testament", year: -6, importance: "major", region: "Galilee", pop: "500", refs: "Matthew 2:23 | Luke 4:16", events: "Jesus' childhood | Rejected at synagogue",
                archaeology: { status: "Limited Excavation", excavated: "1955–60 (Bagatti), 1997–2004 (Alexandre), 2006 (Dark)", finds: "1st-century houses, terraced fields (vineyards), 'Jesus Boat' near Galilee, Jewish ritual bath (miqveh), limestone vessels", controversy: "Dark's terracing evidence confirms 1st-century agricultural settlement; Church of Annunciation site debated; No evidence of population >500 — contradicting tradition" } },
            { name: "Cana", lat: 32.739, lng: 35.477, era: "new_testament", year: 28, importance: "minor", region: "Galilee", pop: "1,000", refs: "John 2:1-11", events: "Water to wine — first miracle",
                archaeology: { status: "Excavated", excavated: "1960s (Clermont-Ganneau), 1990s (Richardson), 2000s (Batey)", finds: "1st-century stone water jars, Byzantine church remains, Jewish village houses, synagogue lintel with Hebrew inscription", controversy: "Two candidate sites (Khirbet Qana vs Kafr Kanna); Khirbet Qana preferred; stone jars typical of Jewish purification; miracle location debated" } },
            { name: "Gethsemane", lat: 31.778, lng: 35.243, era: "new_testament", year: 30, importance: "major", region: "Judea", pop: "0", refs: "Matthew 26:36 | Mark 14:32", events: "Agony in the garden | Judas' betrayal | Jesus arrested",
                archaeology: { status: "Partially Excavated", excavated: "1909–10 (P. Savignac), 1950s (B. Bagatti), 1990s (J. Murphy-O'Connor)", finds: "Ancient olive tree root system (confirmed dendrochronologically to 1st century), Byzantine church foundations (4th century), rock-cut Grotto of Gethsemane, 1st-century wine press and oil press", controversy: "Olive trees are regrowth (16th century) but root system ancient; cave identified as Jesus' prayer site; Garden location traditional but accepted; Franciscan ownership since 1681" } },
            { name: "Berea", lat: 40.570, lng: 22.470, era: "new_testament", year: 50, importance: "minor", region: "Macedonia", pop: "5,000", refs: "Acts 17:10-14", events: "Noble Bereans | Paul preaches",
                archaeology: { status: "Excavated", excavated: "1920s (Petros), 1970s (Edwards), 2000s (Kourempanas)", finds: "Roman agora, synagogue remains (1st century AD), Byzantine basilica, city walls, mosaic floors with Christian symbols", controversy: "Synagogue site confirmed by inscriptions; Bereans' 'noble' character recorded in Acts matches reputation" } },
            { name: "Ephesus", lat: 37.942, lng: 27.342, era: "new_testament", year: 30, importance: "major", region: "Asia Minor", pop: "250,000", refs: "Acts 19:1-41 | Revelation 2:1-7", events: "Paul's ministry | Temple of Artemis | John lives here",
                archaeology: { status: "Extensively Excavated", excavated: "1869–74 (Wood), 1895–1907 (Benndorf), 1926–33 (Keil), 1954–ongoing (Austrian Institute)", finds: "Temple of Artemis (one of Seven Wonders), Library of Celsus, Great Theatre (capacity 25,000), Terrace Houses, Church of Mary (Council of Ephesus 431 AD)", controversy: "Temple of Artemis: one column remains; Great Theatre where Demetrius started riot (Acts 19) — seating confirms account; 'Artemis of the Ephesians' statue found" } },
            { name: "Athens", lat: 37.967, lng: 23.717, era: "new_testament", year: 50, importance: "major", region: "Greece", pop: "100,000", refs: "Acts 17:16-34", events: "Paul's Mars Hill sermon | Areopagus address",
                archaeology: { status: "Continuously Excavated", excavated: "1830s (Ross), 1850s (Hansen), 1930s (Dörpfeld), 1990s–ongoing (Camp)", finds: "Parthenon, Areopagus (Mars Hill), Acropolis complex, Agora marketplace (Stoa of Attalos), Temple of Olympian Zeus, Apostle Paul's steps (inscribed)", controversy: "Paul's speech location at Areopagus (Mars Hill) confirmed; 'Unknown God' altar inscription found at Pergamum; Areopagus council's jurisdiction over religious matters confirmed" } }
        ];
        
        // ==================== JOURNEY HELPER FUNCTIONS ====================
        function calcDistance(lat1, lng1, lat2, lng2) {
            var R = 3959; // Earth's radius in miles
            var dLat = (lat2 - lat1) * Math.PI / 180;
            var dLng = (lng2 - lng1) * Math.PI / 180;
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                     Math.sin(dLng/2) * Math.sin(dLng/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        }
        
        window.calcDistance = calcDistance;
        
        const peopleWhoLivedDb = {
            "Ur": "Terah, Abraham's family",
            "Haran": "Abraham, Nahor, Lot",
            "Shechem": "Jacob's family, Joseph buried here",
            "Hebron": "Abraham, Isaac, Jacob, David",
            "Moriah": "Abraham, Isaac (temple location)",
            "Gerar": "Abraham, Isaac",
            "Beersheba": "Abraham, Isaac, David",
            "Bethel": "Jacob, Samuel born here",
            "Penuel": "Jacob wrestled here",
            "Egypt": "Joseph, Jacob's family",
            "Dothan": "Joseph sold here",
            "Potiphar": "Joseph as slave",
            "Pharaoh's Court": "Joseph, Moses born",
            "Egypt/Goshen": "Israelites in bondage",
            "Red Sea": "Exodus crossing",
            "Sinai": "Moses, Law given",
            "Kadesh": "Israelites wander",
            "Jordan": "Joshua, Elijah taken",
            "Jericho": "Joshua, walls fall",
            "Mount Ebal": "Joshua, altar built",
            "Ophrah": "Gideon",
            "Midianite Camp": "Gideon's victory",
            "Zorah": "Samson's birth",
            "Gaza": "Samson captured",
            "Moab": "Ruth, Naomi",
            "Bethlehem": "Ruth, David, Jesus born",
            "Boaz's Field": "Ruth gleaning",
            "Jerusalem": "David, Solomon, Jesus",
            "Mount Zion": "David's altar",
            "Temple Mount": "Solomon's temple",
            "Gibeon": "Solomon's vision",
            "Gilead": "Elijah",
            "Mount Carmel": "Elijah's contest",
            "Horeb": "Elijah's cave",
            "Babylon": "Daniel, Nebuchadnezzar",
            "Lion's Den": "Daniel preserved",
            "Susa": "Esther, Mordecai",
            "Susa Gate": "Esther's plea",
            "Sheep Gate": "Nehemiah's repair",
            "Nazareth": "Jesus grew up",
            "Bethlehem": "Jesus born",
            "Jordan River": "Jesus baptized",
            "Wilderness": "Jesus tempted",
            "Cana": "Jesus' first miracle",
            "Capernaum": "Jesus' ministry base",
            "Samaritan Well": "Jesus & Samaritan woman",
            "Peter's House": "Peter's mother-in-law",
            "Nain": "Widow's son raised",
            "Bethany": "Lazarus, Mary, Martha",
            "Bethphage": "Triumphant entry",
            "Gethsemane": "Jesus' arrest",
            "Calvary/Golgotha": "Jesus crucified",
            "Emmaus": "Resurrection appearance",
            "Galilee": "Disciples ministry"
        };
        
        const keyEventsDb = {
            "Ur": "God calls Abraham to leave",
            "Haran": "Family settles, Terah dies",
            "Shechem": "First altar to LORD",
            "Moriah": "Binding of Isaac",
            "Egypt": "Famine drives south",
            "Beersheba": "Covenant with Abimelech",
            "Bethel": "Jacob's ladder dream",
            "Dothan": "Joseph betrayed",
            "Potiphar": "Rise to prominence",
            "Pharaoh's Court": "Interprets dreams",
            "Egypt/Goshen": "Ten plagues begin",
            "Red Sea": "Miraculous crossing",
            "Sinai": "Ten Commandments given",
            "Jordan": "River parts",
            "Jericho": "Walls collapse",
            "Mount Ebal": "Covenant renewed",
            "Ophrah": "Angel announces victory",
            "Gaza": "Delilah betrayal",
            "Bethlehem": "Ruth redeems",
            "Temple Mount": "Temple dedication",
            "Mount Carmel": "Fire from heaven",
            "Samaritan Well": "Living water talk",
            "Capernaum": "Many miracles",
            "Gethsemane": "Prayer & arrest"
        };
        
        function getPeopleWhoLived(locationName) {
            var loc;
            var keys = Object.keys(peopleWhoLivedDb).sort(function(a, b) { return b.length - a.length; });
            for (var i = 0; i < keys.length; i++) {
                loc = keys[i];
                if (locationName.toLowerCase().indexOf(loc.toLowerCase()) > -1 || loc.toLowerCase().indexOf(locationName.toLowerCase()) > -1) {
                    return peopleWhoLivedDb[loc];
                }
            }
            return '';
        }
        
        function getKeyEvents(locationName, ref) {
            var loc;
            var keys = Object.keys(keyEventsDb).sort(function(a, b) { return b.length - a.length; });
            for (var i = 0; i < keys.length; i++) {
                loc = keys[i];
                if (locationName.toLowerCase().indexOf(loc.toLowerCase()) > -1 || loc.toLowerCase().indexOf(locationName.toLowerCase()) > -1) {
                    return keyEventsDb[loc];
                }
            }
            return '';
        }
        
        // Expose to window for global access
        window.getPeopleWhoLived = getPeopleWhoLived;
        window.getKeyEvents = getKeyEvents;
        
const JOURNEYS = {
            // PATRIARCHS
            "abraham": { name: "Abraham", desc: "Father of Faith", category: "Patriarchs", color: "#D4AF37", year: -2100, era: "PATRIARCHS",
                path: [
                    { name: "Ur", lat: 30.963, lng: 46.103, ref: "Genesis 11:31", desc: "God calls Abraham from Ur of the Chaldees.", notes: ["Archaeological remains discovered in 1922"] },
                    { name: "Haran", lat: 36.864, lng: 40.866, ref: "Genesis 12:1", desc: "Father Terah dies in Haran.", notes: ["Major crossroads of ancient trade routes"] },
                    { name: "Shechem", lat: 32.233, lng: 35.167, ref: "Genesis 12:6", desc: "First altar built at Shechem.", notes: ["Ancient oak tree still grows at site"] },
                    { name: "Hebron", lat: 31.533, lng: 35.098, ref: "Genesis 13:18", desc: "Covenant with Abimelech.", notes: ["One of world's oldest continuously inhabited cities"] },
                    { name: "Moriah", lat: 31.778, lng: 35.235, ref: "Genesis 22:2", desc: "Isaac tested on mountain.", notes: ["Temple Mount location"] }
                ] },
            "isaac": { name: "Isaac", desc: "Son of Promise", category: "Patriarchs", color: "#D4AF37", year: -2000, era: "PATRIARCHS",
                path: [
                    { name: "Gerar", lat: 31.383, lng: 34.617, ref: "Genesis 26:1", desc: "Philistine territory treaty.", notes: ["Ancient Philistine city excavated"] },
                    { name: "Beersheba", lat: 31.400, lng: 34.900, ref: "Genesis 26:23", desc: "Well of oath dug.", notes: ["Southernmost biblical city"] }
                ] },
            "jacob": { name: "Jacob", desc: "Father of 12 Tribes", category: "Patriarchs", color: "#D4AF37", year: -1900, era: "PATRIARCHS",
                path: [
                    { name: "Bethel", lat: 31.936, lng: 35.243, ref: "Genesis 28:19", desc: "Ladder vision in dream.", notes: ["Ancient altar stones recovered"] },
                    { name: "Penuel", lat: 32.117, lng: 35.417, ref: "Genesis 32:24", desc: "Wrestled angel all night.", notes: ["Jordan River crossing point"] },
                    { name: "Egypt", lat: 30.044, lng: 31.236, ref: "Genesis 46:1", desc: "Goes to Egypt during famine.", notes: ["Land of Goshen excavated"] }
                ] },
            "moses": { name: "Moses", desc: "Deliverer of Israel", category: "Judges", color: "#CD853F", year: -1446, era: "EXODUS",
                path: [
                    { name: "Egypt — Nile", lat: 30.044, lng: 32.000, ref: "Exodus 2:1-10", desc: "Born during Pharaoh's decree. Placed in ark of bulrushes among reeds. Pharaoh's daughter finds him. 'I drew him out of the water.' Raised in Pharaoh's court.", notes: ["Ark of bulrushes", "Pharaoh's daughter", "40 years in Egypt"] },
                    { name: "Midian — Well", lat: 28.800, lng: 35.200, ref: "Exodus 2:15-22", desc: "Flees Egypt after killing Egyptian. Defends Jethro's daughters at the well. Marries Zipporah. 'A stranger in a strange land.' 40 years as shepherd.", notes: ["Killed Egyptian", "Zipporah", "40 years shepherd"] },
                    { name: "Horeb — Burning Bush", lat: 28.539, lng: 33.978, ref: "Exodus 3:1-22", desc: "Bush burns but is not consumed. 'Moses, Moses!' 'Take off your sandals — this is holy ground.' 'I AM WHO I AM.' 'I have seen the affliction of My people.' Staff becomes serpent.", notes: ["Burning bush", "I AM", "Staff to serpent"] },
                    { name: "Egypt — Plagues Begin", lat: 30.044, lng: 32.000, ref: "Exodus 7-10", desc: "Before Pharaoh: 'Let My people go.' 10 plagues: water to blood, frogs, gnats, flies, livestock disease, boils, hail, locusts, darkness. Pharaoh's heart hardened.", notes: ["10 plagues", "Hardened heart", "Aaron's rod"] },
                    { name: "Egypt — Passover", lat: 30.044, lng: 32.000, ref: "Exodus 12:1-51", desc: "Lamb without blemish. Blood on doorposts. Death passes over. 'This day shall be a memorial.' Unleavened bread. Midnight — firstborn struck. Pharaoh: 'Rise up, depart!'", notes: ["Passover lamb", "Blood on doorposts", "Midnight judgment"] },
                    { name: "Red Sea Crossing", lat: 30.500, lng: 33.500, ref: "Exodus 14:1-31", desc: "Trapped between sea and army. 'Stand still and see the salvation of the Lord.' Moses stretches out hand. Sea divides. Israel walks on dry ground. Walls of water on right and left. Egyptian army drowned.", notes: ["Sea divided", "Dry ground", "Egyptian army destroyed"] },
                    { name: "Marah — Bitter Waters", lat: 29.500, lng: 33.000, ref: "Exodus 15:22-27", desc: "3 days without water. Find Marah — bitter. Moses cries to Lord. Tree shown — waters sweetened. 'I am the Lord who heals you.' 12 wells at Elim.", notes: ["Bitter to sweet", "Tree", "12 wells at Elim"] },
                    { name: "Wilderness — Manna & Quail", lat: 29.000, lng: 33.500, ref: "Exodus 16:1-36", desc: "Complaints of hunger. Manna appears like frost — 'What is it?' Gather omer per person. Quail in evening. Sabbath provision. 'Bread from heaven.' Stored in golden pot.", notes: ["Manna", "Quail", "Sabbath provision"] },
                    { name: "Rephidim — Water from Rock", lat: 28.700, lng: 33.800, ref: "Exodus 17:1-7", desc: "No water. People quarrel. 'Is the Lord among us or not?' Strike the rock at Horeb. Water flows. 'Massah and Meribah.' Amalek defeated — Moses' hands held up by Aaron and Hur.", notes: ["Rock struck", "Massah & Meribah", "Aaron & Hur"] },
                    { name: "Sinai — Law Given", lat: 28.539, lng: 33.978, ref: "Exodus 19-20", desc: "Mountain quakes. Thunder, lightning, thick cloud. Trumpet sounds. Ten Commandments given. 'You shall have no other gods.' 40 days on mountain. Golden calf incident. Face shines.", notes: ["10 Commandments", "40 days", "Face shines"] },
                    { name: "Tabernacle Built", lat: 28.539, lng: 33.978, ref: "Exodus 40:1-38", desc: "Tabernacle erected. Ark placed. Cloud fills the dwelling. Glory of the Lord fills the tabernacle. 'Moses could not enter.' Cloud by day, fire by night guides them.", notes: ["Cloud fills", "Glory of Lord", "Fire by night"] },
                    { name: "Kadesh — Spies Sent", lat: 30.850, lng: 35.450, ref: "Numbers 13-14", desc: "12 spies sent. 40 days. Report: land flows with milk and honey, but giants. Caleb: 'Let us go up!' People rebel. 40 years wandering decreed. Only Joshua and Caleb enter.", notes: ["12 spies", "40 years wandering", "Giants in land"] },
                    { name: "Wilderness — Bronze Serpent", lat: 30.500, lng: 35.000, ref: "Numbers 21:4-9", desc: "People speak against God and Moses. Fiery serpents sent. Many die. 'Pray for us.' Moses makes bronze serpent on pole. 'Look and live.' Type of Christ lifted up.", notes: ["Fiery serpents", "Look and live", "Type of Christ"] },
                    { name: "Mount Nebo — Moses' End", lat: 31.767, lng: 35.733, ref: "Deuteronomy 34:1-12", desc: "God shows Promised Land from Pisgah. 'I have let you see it with your eyes, but you shall not cross over.' Moses dies at 120. 'His eye was not dim, nor his vigor abated.' Lord buried him. No one knows his grave.", notes: ["120 years old", "Saw Promised Land", "Lord buried him"] }
                ] },
            "joshua": { name: "Joshua", desc: "Conquest Leader — Successor of Moses", category: "Judges", color: "#CD853F", year: -1400, era: "CONQUEST",
                path: [
                    { name: "Shittim", lat: 31.850, lng: 35.600, ref: "Joshua 1:1-2", desc: "Moses dead. God commissions Joshua: 'Be strong and courageous. Do not be terrified. I will be with you as I was with Moses. No one will be able to stand against you all the days of your life.'", notes: ["Moses dead", "Commissioned", "Be strong"] },
                    { name: "Jordan River", lat: 31.947, lng: 35.571, ref: "Joshua 3:1-17", desc: "Ark leads the way. Priests step into Jordan — waters pile up like a dam. Israel crosses on dry ground. 12 stones taken from riverbed as memorial.", notes: ["Waters piled up", "Dry ground", "12 stones"] },
                    { name: "Gilgal", lat: 31.850, lng: 35.450, ref: "Joshua 4:19-5:12", desc: "12 stones set up. Circumcision renewed. 'Today I have rolled away the reproach of Egypt.' Passover kept. Manna ceases. 'Commander of the Lord's army' appears to Joshua.", notes: ["Reproach rolled away", "Manna ceases", "Commander appears"] },
                    { name: "Jericho", lat: 31.858, lng: 35.463, ref: "Joshua 6:1-27", desc: "March around city 7 days. 7 priests with 7 trumpets. On 7th day, shout and walls collapse. Rahab and household spared. 'Cursed is the man who rebuilds this city.'", notes: ["Walls fell", "Rahab saved", "7 days marching"] },
                    { name: "Ai — Defeat & Victory", lat: 31.917, lng: 35.250, ref: "Joshua 7-8", desc: "Achan's sin — defeat at Ai. 36 men killed. Achan stoned. Second attack: ambush strategy. City burned. Altar built on Mount Ebal. Covenant renewed.", notes: ["Achan's sin", "Ambush", "Covenant renewed"] },
                    { name: "Gibeon — Deception", lat: 31.850, lng: 35.200, ref: "Joshua 9:1-27", desc: "Gibeonites trick Joshua with worn sandals and moldy bread. Treaty made. When deception discovered, they become woodcutters and water carriers for the congregation.", notes: ["Deceived", "Treaty made", "Woodcutters"] },
                    { name: "Gibeon — Sun Stands Still", lat: 31.850, lng: 35.200, ref: "Joshua 10:1-15", desc: "5 Amorite kings attack Gibeon. Joshua marches all night. 'Sun, stand still over Gibeon!' Sun stops for about a full day. Hailstones from heaven kill more than the sword. 'No day like it before or since.'", notes: ["Sun stood still", "Hailstones", "5 kings defeated"] },
                    { name: "Mount Ebal & Gerizim", lat: 32.150, lng: 35.083, ref: "Joshua 8:30-35", desc: "Altar built on Mount Ebal. Half the tribes on Mount Gerizim for blessing, half on Mount Ebal for curse. All the law read — every word. 'Not a word failed.'", notes: ["Blessing & curse", "Law read", "Not a word failed"] },
                    { name: "Hazor — Northern Campaign", lat: 33.000, lng: 35.550, ref: "Joshua 11:1-15", desc: "Jabin king of Hazor gathers coalition. Joshua attacks suddenly. 'Take their horses, hamstring them, burn their chariots.' Hazor burned. 'Joshua took the whole land.'", notes: ["Hazor burned", "Chariots destroyed", "Whole land taken"] },
                    { name: "Shechem — Covenant Renewal", lat: 32.233, lng: 35.167, ref: "Joshua 24:1-33", desc: "'Choose this day whom you will serve. As for me and my house, we will serve the Lord.' People: 'God forbid that we should forsake the Lord!' Covenant renewed. Joshua dies at 110. Buried in Timnath-serah.", notes: ["Choose this day", "As for me and my house", "Died at 110"] }
                ] },
            "gideon": { name: "Gideon", desc: "Judge", category: "Judges", color: "#CD853F", year: -1200, era: "JUDGES",
                path: [
                    { name: "Ophrah", lat: 32.800, lng: 35.300, ref: "Judges 6:11", desc: "Angel visits", notes: ["Gideon's city"] },
                    { name: "Midianite Camp", lat: 32.800, lng: 35.300, ref: "Judges 7:1", desc: "300 men chosen", notes: ["God's test"] }
                ] },
            "samson": { name: "Samson", desc: "Judge of Strength", category: "Judges", color: "#CD853F", year: -1100, era: "JUDGES",
                path: [
                    { name: "Zorah", lat: 32.250, lng: 35.000, ref: "Judges 13:2", desc: "Birth foretold", notes: ["Nazirite vow"] },
                    { name: "Gaza", lat: 31.450, lng: 34.450, ref: "Judges 16:1", desc: "Captured", notes: ["Philistine city"] },
                    { name: "Gaza Prison", lat: 31.450, lng: 34.450, ref: "Judges 16:21", desc: "Blinded", notes: ["Dreadlocks cut"] }
                ] },
            "ruth": { name: "Ruth", desc: "Moabite Convert", category: "Judges", color: "#DAA520", year: -1100, era: "JUDGES",
                path: [
                    { name: "Moab", lat: 31.750, lng: 35.500, ref: "Ruth 1:1", desc: "Family moves", notes: ["Naomi's journey"] },
                    { name: "Bethlehem", lat: 31.904, lng: 35.202, ref: "Ruth 1:22", desc: "Returns with Naomi", notes: ["Harvest field"] },
                    { name: "Boaz's Field", lat: 31.904, lng: 35.202, ref: "Ruth 2:2", desc: "Gleaning", notes: ["Redemption"] }
                ] },
            
            // KINGS
            "david": { name: "David", desc: "King of Israel — Shepherd, Warrior, Psalmist", category: "Kings", color: "#DAA520", year: -1010, era: "KINGDOM",
                path: [
                    { name: "Bethlehem", lat: 31.904, lng: 35.202, ref: "1 Samuel 16:1-13", desc: "Anointed by Samuel in secret. Youngest son of Jesse, tending sheep. 'The Lord does not see as man sees.' Spirit of the Lord comes upon David from that day forward.", notes: ["Anointed", "Shepherd boy", "Spirit comes"] },
                    { name: "Saul's Court", lat: 31.778, lng: 35.235, ref: "1 Samuel 16:14-23", desc: "Called to play harp for Saul when evil spirit troubles him. David's music brings relief. Becomes Saul's armor-bearer. 'A man after God's own heart.'", notes: ["Harp player", "Evil spirit departs", "Armor-bearer"] },
                    { name: "Valley of Elah", lat: 31.700, lng: 34.950, ref: "1 Samuel 17:1-58", desc: "Goliath defies armies of Israel. 'Who is this uncircumcised Philistine?' 5 smooth stones from the brook. 'You come with sword and spear — I come in the name of the Lord!' Stone strikes forehead. Giant falls. David cuts off his head.", notes: ["Goliath", "5 smooth stones", "Sling shot"] },
                    { name: "Wilderness — Fugitive", lat: 31.500, lng: 35.100, ref: "1 Samuel 18-26", desc: "Saul pursues David. Jonathan's covenant: 'You shall be king.' David spares Saul in cave at En Gedi. 'I will not stretch out my hand against the Lord's anointed.' Writes Psalms in wilderness.", notes: ["En Gedi cave", "Spared Saul", "Psalms written"] },
                    { name: "Ziklag", lat: 31.350, lng: 34.800, ref: "1 Samuel 30:1-31", desc: "Amalekites raid Ziklag. David's wives captured. 'David encouraged himself in the Lord.' Pursues and recovers all. 'Not one missing.' Distributes spoil to elders of Judah.", notes: ["Amalekite raid", "Encouraged himself", "All recovered"] },
                    { name: "Hebron", lat: 31.533, lng: 35.098, ref: "2 Samuel 2:1-4", desc: "Anointed king over Judah. Reigns 7 years in Hebron. House of David grows stronger. Ish-bosheth reigns over Israel. Civil war between houses.", notes: ["King of Judah", "7 years", "Civil war"] },
                    { name: "Jerusalem — Conquest", lat: 31.774, lng: 35.236, ref: "2 Samuel 5:6-12", desc: "Captures Zion from Jebusites. 'Whoever strikes the Jebusites must go through the water tunnel.' David becomes king over all Israel. 'The Lord God of hosts is with me.' Hiram of Tyre builds his palace.", notes: ["Water tunnel", "All Israel", "Hiram's palace"] },
                    { name: "Jerusalem — Ark Brought", lat: 31.778, lng: 35.235, ref: "2 Samuel 6:1-23", desc: "Ark brought to Jerusalem with shouting and trumpets. David dances before the Lord with all his might. Michal despises him. 'I will be yet more vile than this.' Obed-Edom blessed for 3 months.", notes: ["Danced before Lord", "Michal despised", "Ark in tent"] },
                    { name: "Mount Zion — Covenant", lat: 31.778, lng: 35.235, ref: "2 Samuel 7:1-29", desc: "David wants to build Temple. Nathan prophesies: 'The Lord will make you a house.' Davidic Covenant: 'Your house and kingdom shall be established forever.' David's prayer of thanksgiving.", notes: ["Davidic Covenant", "Forever kingdom", "Nathan's prophecy"] },
                    { name: "Rabbah — War", lat: 31.950, lng: 35.950, ref: "2 Samuel 11-12", desc: "Bathsheba incident. Uriah killed. Nathan confronts: 'You are the man!' David repents: Psalm 51. 'The Lord has put away your sin.' Solomon born.", notes: ["Bathsheba", "Psalm 51", "Solomon born"] },
                    { name: "Mount of Olives — Absalom", lat: 31.778, lng: 35.243, ref: "2 Samuel 15:30-37", desc: "Absalom's rebellion. David flees weeping, barefoot, head covered. 'O Absalom, my son, my son!' Crosses Kidron. Hushai sent as spy. Ark returned to Jerusalem.", notes: ["Fled weeping", "Absalom's revolt", "Hushai spy"] },
                    { name: "Jerusalem — Throne Restored", lat: 31.774, lng: 35.236, ref: "2 Samuel 19-24", desc: "Absalom defeated. David mourns. Joab rebukes. Kingdom restored. David's mighty men. 'I will not offer to the Lord that which costs me nothing.' Purchases threshing floor of Araunah — future Temple site.", notes: ["Threshing floor", "Araunah", "Future Temple site"] },
                    { name: "Jerusalem — Final Words", lat: 31.774, lng: 35.236, ref: "2 Samuel 23:1-7 / 1 Kings 2:1-12", desc: "'The Spirit of the Lord spoke by me.' 'He who rules over men must be just.' Charges Solomon: 'Be strong, keep the charge of the Lord.' Dies at 70. 'Buried in City of David.' Reigned 40 years.", notes: ["40 year reign", "Charged Solomon", "Died at 70"] }
                ] },
            "solomon": { name: "Solomon", desc: "King of Wisdom", category: "Kings", color: "#DAA520", year: -970, era: "KINGDOM",
                path: [
                    { name: "Gibeon", lat: 31.800, lng: 35.150, ref: "1 Kings 3:4-15", desc: "God appears — asks for wisdom in dream", notes: ["First appearance"] },
                    { name: "Jerusalem", lat: 31.778, lng: 35.235, ref: "1 Kings 6:1", desc: "Temple built in 7 years", notes: ["Ark placed"] },
                    { name: "Temple Mount", lat: 31.778, lng: 35.235, ref: "1 Kings 9:2", desc: "God appears a second time", notes: ["Second appearance"] }
                ] },
            
            // PROPHETS
            "elijah": { name: "Elijah", desc: "Prophet of Fire", category: "Prophets", color: "#DAA520", year: -860, era: "PROPHETS",
                path: [
                    { name: "Gilead", lat: 32.500, lng: 36.000, ref: "1 Kings 17:1", desc: "Announces drought", notes: ["Brooks dries"] },
                    { name: "Mount Carmel", lat: 32.700, lng: 34.950, ref: "1 Kings 18:20", desc: "Baal vs Yahweh", notes: ["Fire from heaven"] },
                    { name: "Horeb", lat: 28.539, lng: 33.978, ref: "1 Kings 19:8", desc: "Voice of God", notes: ["Cave"] }
                ]
            },
            "elijah_journey": { name: "Elijah's Lowest to Highest Journey", desc: "1 Kings 18–19 · Carmel → Jezreel → Beersheba → Horeb · Despair to Revelation", category: "Prophets", color: "#CD853F", year: -860, era: "PROPHETS",
                path: [
                    { name: "Mount Carmel", lat: 32.700, lng: 34.950, ref: "1 Kings 18:20", desc: "\"Elijah went to show himself to Ahab.\" Victory over Baal prophets. Fire falls from heaven. Drought broken. Jezebel vows revenge — Elijah flees." },
                    { name: "Jezreel", lat: 32.633, lng: 35.300, ref: "1 Kings 19:1", desc: "Ahab tells Jezebel about Elijah's victory. She sends a messenger: 'May the gods deal with me... by tomorrow.' Elijah runs for his life — already 40 days of despair beginning." },
                    { name: "Beersheba", lat: 31.400, lng: 34.900, ref: "1 Kings 19:3", desc: "Elijah leaves Judah and goes into the wilderness. Sits under a broom tree and prays to die. 'It is enough, O LORD.' Angel feeds him bread and water — first strengthening." },
                    { name: "Wilderness of Sinai", lat: 29.500, lng: 34.500, ref: "1 Kings 19:8", desc: "Strengthened by the bread, Elijah travels 40 days and 40 nights to Horeb, the mountain of God. Enters a cave and spends the night. 'What are you doing here?'" },
                    { name: "Horeb (Mount Sinai)", lat: 28.539, lng: 33.978, ref: "1 Kings 19:9-18", desc: "\"Go out and stand on the mount before the LORD.\" — A great and powerful wind, then an earthquake, then fire. But the LORD was not in any of them. 'A still small voice.' God tells Elijah: 'I reserve 7,000 who have not bowed to Baal.'" }
                ]
            },
            "elisha": { name: "Elisha", desc: "Prophet of Power", category: "Prophets", color: "#DAA520", year: -850, era: "PROPHETS",
                path: [
                    { name: "Jericho", lat: 31.858, lng: 35.463, ref: "2 Kings 2:5", desc: "Heals the waters after Elijah's ascension", notes: ["Healing"] },
                    { name: "Shunem", lat: 32.500, lng: 35.383, ref: "2 Kings 4:8", desc: "Shunammite woman — son restored to life", notes: ["Son resurrection"] },
                    { name: "Dothan", lat: 32.450, lng: 35.250, ref: "2 Kings 6:13", desc: "Army surrounded; chariots of fire", notes: ["Chariots of fire"] }
                ] },
            "daniel": { name: "Daniel", desc: "Exile Prophet", category: "Prophets", color: "#DAA520", year: -605, era: "EXILE",
                path: [
                    { name: "Babylon", lat: 32.537, lng: 44.421, ref: "Daniel 1:3", desc: "In king's court", notes: ["Wisdom test"] },
                    { name: "Lion's Den", lat: 32.537, lng: 44.421, ref: "Daniel 6:1", desc: "Survives lions", notes: ["Saved by God"] },
                    { name: "Susa", lat: 32.189, lng: 48.267, ref: "Daniel 8:2", desc: "Vision", notes: ["Citadel"] }
                ]
            },
            "daniel_journey": { name: "Daniel in Babylon & Beyond", desc: "Daniel 1–10 · Jerusalem → Babylon → Susa · Throne, Lions & Prophecy", category: "Prophets", color: "#9B59B6", year: -605, era: "EXILE",
                path: [
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Daniel 1:1-2", desc: "In the third year of Jehoiakim, Nebuchadnezzar king of Babylon comes to Jerusalem and lays it under tribute. He takes vessels from the house of God to the land of Shinar, to the house of his god — placing them in his treasure house. Daniel, Hananiah, Mishael, Azariah are taken." },
                    { name: "Babylon — King's Palace", lat: 32.537, lng: 44.421, ref: "Daniel 1:3-4", desc: "Ashpenaz, the chief of the court officials, takes Daniel and his friends into the royal palace. They are to be taught the language and literature of the Chaldeans. Daniel resolves not to defile himself with the king's food — tested for 10 days. Found 10 times better in all matters of wisdom." },
                    { name: "Babylon — Nebuchadnezzar's Dream", lat: 32.537, lng: 44.421, ref: "Daniel 2:1-49", desc: "The king dreams a great statue — gold head, silver chest, bronze belly, iron legs, feet of iron and clay. Daniel reveals the dream and its interpretation: 'You are the head of gold.' Kingdom will be divided. Stone cut without hands destroys the statue. Daniel is made ruler over the province of Babylon and chief administrator over all the wise men." },
                    { name: "Babylon — Fiery Furnace", lat: 32.537, lng: 44.421, ref: "Daniel 3:1-30", desc: "Nebuchadnezzar erects a golden statue 90 feet tall. Shadrach, Meshach, Abednego must bow or be cast into the burning furnace. They refuse: 'Our God whom we serve is able to deliver us... But if not, be it known to you.' The furnace is heated 7 times hotter — and a fourth figure like a son of God walks with them. The king promotes them." },
                    { name: "Babylon — King's Pride & Humbling", lat: 32.537, lng: 44.421, ref: "Daniel 4:1-37", desc: "Nebuchadnezzar walks in the palace and says: 'Is not this great Babylon, which I have built?' That very hour the word is fulfilled — he is driven from people, eats grass like an ox, and his hair grows like eagle's feathers. Seven times pass over him. At the end, he lifts his eyes to heaven and his reason returns. 'The Most High rules the kingdom of men.'" },
                    { name: "Babylon — Writing on the Wall", lat: 32.537, lng: 44.421, ref: "Daniel 5:1-31", desc: "Belshazzar holds a great feast. When the fingers of a hand appear and write on the plaster, the king calls for the wise men — but none can read it. Daniel is summoned: 'You have not honored the god whose control is in your hand.' Mene, Mene, Tekel, Upharsin — 'God has numbered your kingdom and finished it.' That night Belshazzar is slain, Darius the Mede takes the kingdom." },
                    { name: "Babylon — Lion's Den", lat: 32.537, lng: 44.421, ref: "Daniel 6:1-28", desc: "Darius appoints 120 satraps and Daniel is made one of the three governors. Daniel excels — an exceptional spirit. The satraps scheme: no one may petition any god for 30 days except the king. Daniel continues praying toward Jerusalem. Cast into the lions' den. An angel shuts their mouths. 'My God sent His angel and shut the lions' mouths.' Darius decrees: 'Every people, nation, and language... tremble before and fear the God of Daniel.'" },
                    { name: "Babylon — Vision of Four Beasts", lat: 32.537, lng: 44.421, ref: "Daniel 7:1-28", desc: "In the first year of Belshazzar, Daniel sees four great beasts coming up from the sea: lion (Babylon), bear (Medo-Persia), leopard (Greece), and a fourth beast with iron teeth and 10 horns (Rome). One like a son of man comes with the clouds of heaven — given dominion, glory, and a kingdom. The holy ones of the Most High receive the kingdom forever." },
                    { name: "Babylon — Seventy Weeks Commissioned", lat: 32.537, lng: 44.421, ref: "Daniel 9:1-27", desc: "In the first year of Darius, Daniel understands from Jeremiah that Jerusalem must lie desolate for 70 years. He confesses Israel's sin, intercedes. Gabriel comes: 'Seventy weeks are determined upon your people and upon your holy city... to finish transgression, make an end of sins, make reconciliation for righteousness, bring in everlasting righteousness.' Messiah will be cut off. The city and sanctuary will be destroyed." },
                    { name: "Susa (Shushan) — Ulai Canal Vision", lat: 32.189, lng: 48.267, ref: "Daniel 8:1-27", desc: "In the third year of Belshazzar's reign, in Susa the citadel (which is in the province of Elam), Daniel has a vision of a ram with two horns (Medo-Persia) pushed westward and northward by a he-goat (Greece). The great horn between its eyes is the first king. A little horn grows and faces south, east, and toward the Beautiful Land — and it stands against the host of heaven. Gabriel explains: the vision concerns the latter time of the indignation. (Daniel 8 directly connects to the 70-weeks prophecy of Daniel 9.)" }
                ]
            },
            "esther": { name: "Esther", desc: "Queen of Persia", category: "Prophets", color: "#DAA520", year: -473, era: "EXILE",
                path: [
                    { name: "Susa", lat: 32.189, lng: 48.267, ref: "Esther 2:8", desc: "Chosen queen", notes: ["Beauty contest"] },
                    { name: "Susa Gate", lat: 32.189, lng: 48.267, ref: "Esther 7:1", desc: "Haman exposed", notes: ["Poison plot"] }
                ] },
            "ezra": { name: "Ezra", desc: "Return & Reform", category: "Prophets", color: "#27ae60", year: -458, era: "RESTORATION",
                path: [
                    { name: "Babylon", lat: 32.537, lng: 44.421, ref: "Ezra 7:1", desc: "Leaves Babylon", notes: ["King's decree"] },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Ezra 7:9", desc: "Arrives", notes: ["Temple restored"] },
                    { name: "Temple", lat: 31.778, lng: 35.235, ref: "Ezra 9:9", desc: "Worship restored", notes: ["Sacrifice"] }
                ] },
            "nehemiah": { name: "Nehemiah", desc: "Rebuilds Walls", category: "Prophets", color: "#27ae60", year: -445, era: "RESTORATION",
                path: [
                    { name: "Susa", lat: 32.189, lng: 48.267, ref: "Nehemiah 1:1", desc: "Cupbearer to king", notes: ["Bad news"] },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Nehemiah 2:12", desc: "Night inspection", notes: ["Survey"] },
                    { name: "Sheep Gate", lat: 31.776, lng: 35.229, ref: "Nehemiah 3:1", desc: "Rebuilding", notes: ["First gate"] }
                ]
            },
            "nehemiah_rebuild": { name: "Nehemiah's Wall Rebuilding Circuit", desc: "Nehemiah 2–3 · Susa → Jerusalem · Every gate named and assigned", category: "Prophets", color: "#DAA520", year: -445, era: "RESTORATION",
                path: [
                    { name: "Susa (Shushan)", lat: 32.189, lng: 48.267, ref: "Nehemiah 1:1", desc: "In the month Kislev, 20th year. Nehemiah hears the wall of Jerusalem is broken down and gates burned with fire. He sits and weeps, fasts, and prays: 'I confess the sins we have committed against You.'" },
                    { name: "Jerusalem — Night Inspection", lat: 31.768, lng: 35.213, ref: "Nehemiah 2:11-15", desc: "Nehemiah rides out at night with a small group. No one knows what God's servant has planned. He inspects the wall from the Valley Gate to the Dung Gate — sees the broken walls and burned gates. Then: 'You see the trouble we are in. Let us rebuild!'" },
                    { name: "Sheep Gate (Northeast)", lat: 31.776, lng: 35.229, ref: "Nehemiah 3:1", desc: "Eliashib the high priest and his brothers begin rebuilding the Sheep Gate, setting its doors in place and sanctifying it. The priests lead the work. This gate faces toward the temple. (Neh 3:1)" },
                    { name: "Fish Gate (North)", lat: 31.775, lng: 35.224, ref: "Nehemiah 3:3", desc: "The sons of Hassenaah build the Fish Gate. Merchants and traders of Ophel repair alongside, setting up doors, bolts, and bars. This gate handles the Galilean trade route. (Neh 3:3)" },
                    { name: "Old Gate / Jeshanah (Northwest)", lat: 31.774, lng: 35.218, ref: "Nehemiah 3:6", desc: "Jehoiada and Meshullam of the sons of Parosh repair the Old Gate, laying its beams and setting doors, bolts, and bars. One of the oldest city gates. (Neh 3:6)" },
                    { name: "Valley Gate (West — Kidron)", lat: 31.773, lng: 35.212, ref: "Nehemiah 2:13 / 3:13", desc: "Nehemiah first scouts through the Valley Gate, riding the wall of the Pool of Siloam. The son of a ruler of Succoth repairs this section — 1,200 cubits. The Dung Gate is at the far end. (Neh 3:13-14)" },
                    { name: "Dung Gate (Southwest)", lat: 31.772, lng: 35.207, ref: "Nehemiah 3:14", desc: "Malchijah son of Rechab repairs the Dung Gate, setting up its doors, bolts, and bars. This gate leads to the Hinnom Valley where refuse was burned. (Neh 3:14)" },
                    { name: "Fountain Gate (Southeast — Siloam)", lat: 31.772, lng: 35.218, ref: "Nehemiah 3:15", desc: "Shallum son of Col-hozeh repairs the Fountain Gate, walling the pool and building from the King's Garden to the stairs going down from the City of David. (Neh 3:15)" },
                    { name: "Water Gate (East — Gihon)", lat: 31.773, lng: 35.224, ref: "Nehemiah 3:26", desc: "The Tekoites repair from the Water Gate eastward, pitching their tents as far as the Broad Wall. This gate faces the Gihon Spring and the aqueduct bringing water into the city. (Neh 3:26-27)" },
                    { name: "Broad Wall (Northwest — Ophel)", lat: 31.775, lng: 35.220, ref: "Nehemiah 3:8", desc: "Uzziel and Hanani repair the Broad Wall. Hananiah the craftsman also repairs, setting up its doors, bolts, and bars. This massive section — over 7 feet thick — is the most impressive remnant of pre-exilic Jerusalem. (Neh 3:8)" },
                    { name: "Gate of Ephraim (West)", lat: 31.774, lng: 35.210, ref: "Nehemiah 8:16 / 12:39", desc: "The Gate of Ephraim (Corner Gate) is repaired. This gate connects to the road from the west — Ezra's return and later Paul's route to Jerusalem. (Neh 12:39)" },
                    { name: "Jerusalem — Wall Completed", lat: 31.768, lng: 35.213, ref: "Nehemiah 6:15-16", desc: "The wall is finished in 52 days. When Sanballat, Tobiah, and Geshem hear this, when the neighboring nations see it — they lose their confidence, for it was done with the help of our God." }
                ]
            },
            
            // APOSTLES
            "jesus": { name: "Jesus", desc: "The Messiah - Full Gospel Journey", category: "Apostles", color: "#D4AF37", year: -6, era: "NEW TESTAMENT",
                path: [
                    { name: "Bethlehem", lat: 31.904, lng: 35.202, ref: "https://www.biblegateway.com/passage/?search=Luke+2%3A4-7&version=NKJV", desc: "Born in a manger. Mary wraps Him in swaddling clothes.", notes: ["Manger", "Shepherds", "Angels"] },
                    { name: "Jerusalem — Temple", lat: 31.778, lng: 35.235, ref: "Luke 2:22-38", desc: "Presented at the Temple. Simeon prophesies: 'A light for revelation to the Gentiles.' Anna the prophetess gives thanks.", notes: ["Simeon", "Anna", "40 days"] },
                    { name: "Egypt", lat: 30.044, lng: 31.236, ref: "Matthew 2:13-15", desc: "Flee to Egypt by night. Herod orders slaughter of infants in Bethlehem. 'Out of Egypt I called My Son.'", notes: ["Herod's decree", "Massacre"] },
                    { name: "Nazareth", lat: 32.707, lng: 35.298, ref: "Matthew 2:19-23", desc: "Return from Egypt. Grows up in Nazareth. 'He shall be called a Nazarene.' Submits to Joseph and Mary.", notes: ["Childhood", "Carpenter's shop", "Wisdom grows"] },
                    { name: "Jerusalem — Age 12", lat: 31.778, lng: 35.235, ref: "Luke 2:41-52", desc: "Found in the Temple at age 12, sitting among teachers, listening and asking questions. 'Did you not know I must be about My Father's business?'", notes: ["Temple teachers", "3 days searching"], year: 8 },
                    { name: "Jordan River", lat: 31.947, lng: 35.571, ref: "Matthew 3:13-17", desc: "Baptized by John. Heavens open. Holy Spirit descends like a dove. Voice from heaven: 'This is My beloved Son, in whom I am well pleased.'", notes: ["Holy Spirit", "Voice from Heaven", "John the Baptist"], year: 27 },
                    { name: "Wilderness of Judea", lat: 31.800, lng: 35.400, ref: "Matthew 4:1-11", desc: "40 days and 40 nights of fasting. Three temptations: stones to bread, throw Yourself down, worship me for kingdoms. 'It is written.' Satan departs; angels minister.", notes: ["Satan test", "3 temptations", "Angels minister"], year: 27 },
                    { name: "Cana", lat: 32.739, lng: 35.477, ref: "John 2:1-11", desc: "First miracle — water turned to wine at a wedding feast. 'My hour has not yet come.' Six stone water jars filled. Master of ceremonies: 'You kept the best wine till now.'", notes: ["1st Miracle", "Wedding", "6 stone jars"], year: 28 },
                    { name: "Jerusalem — Temple Cleansing", lat: 31.778, lng: 35.235, ref: "John 2:13-22", desc: "Drives out money changers with a whip of cords. 'Make not My Father's house a house of merchandise.' 'Destroy this temple, and in three days I will raise it up.'", notes: ["Whip of cords", "Money changers", "3 days prophecy"], year: 28 },
                    { name: "Samarian Well", lat: 32.434, lng: 35.500, ref: "John 4:1-42", desc: "Woman at Jacob's well at noon. 'Give Me a drink.' Living water revelation. 'I who speak to you am He.' Entire village believes.", notes: ["Living water", "5 husbands", "Whole village saved"], year: 28 },
                    { name: "Nazareth — Rejection", lat: 32.707, lng: 35.298, ref: "Luke 4:16-30", desc: "Reads Isaiah 61 in synagogue: 'The Spirit of the Lord is upon Me.' Declares: 'This day this Scripture is fulfilled.' They try to throw Him off a cliff. He passes through them.", notes: ["Isaiah 61", "Rejected at hometown", "Cliff attempt"], year: 28 },
                    { name: "Capernaum", lat: 32.876, lng: 35.542, ref: "Matthew 4:13-17", desc: "Makes Capernaum His ministry base. 'Land of Zebulun and Naphtali — the people who sat in darkness have seen a great light.' Begins teaching in synagogue.", notes: ["Ministry base", "Synagogue", "Galilee of Gentiles"], year: 28 },
                    { name: "Sea of Galilee — Calling", lat: 32.800, lng: 35.530, ref: "Luke 5:1-11", desc: "Miraculous catch of fish. 'Launch out into the deep.' Nets break, boats sink. Peter falls to his knees: 'Depart from me, I am a sinful man.' 'Follow Me, I will make you fishers of men.'", notes: ["Miraculous catch", "Peter's confession", "Fishers of men"], year: 28 },
                    { name: "Capernaum — Paralytic", lat: 32.876, lng: 35.542, ref: "Mark 2:1-12", desc: "Four men lower a paralytic through the roof. 'Son, your sins are forgiven.' Scribes question: 'Who can forgive sins but God?' 'Rise, take up your bed, and walk.'", notes: ["Roof lowered", "Sins forgiven", "Walked away"], year: 28 },
                    { name: "Sermon on the Mount", lat: 32.800, lng: 35.500, ref: "Matthew 5-7", desc: "Mount of Beatitudes. 'Blessed are the poor in spirit... You are the salt of the earth... Love your enemies... Seek first the kingdom.' The greatest sermon ever preached.", notes: ["Beatitudes", "Lord's Prayer", "Sermon on the Mount"], year: 28 },
                    { name: "Galilee — Calming the Storm", lat: 32.800, lng: 35.520, ref: "Mark 4:35-41", desc: "Asleep in the boat. Storm rages. Disciples: 'Teacher, do You not care?' He rebukes the wind: 'Peace, be still.' 'Why are you so fearful? Have you no faith?'", notes: ["Peace be still", "Wind rebuked", "Disciples terrified"], year: 28 },
                    { name: "Sea of Galilee — Walking on Water", lat: 32.800, lng: 35.530, ref: "Matthew 14:22-33", desc: "Walks on water in the fourth watch. Peter steps out: 'Come.' Begins to sink: 'Lord, save me!' Jesus catches him: 'O you of little faith, why did you doubt?' 'Truly You are the Son of God.'", notes: ["Peter walks on water", "Doubt", "Son of God confessed"], year: 28 },
                    { name: "Bethsaida — Feeding 5000", lat: 32.850, lng: 35.580, ref: "John 6:1-14", desc: "5 loaves and 2 fish feed 5,000 men plus women and children. 12 baskets of fragments remain. 'This is truly the Prophet who is to come into the world.' The only miracle in all 4 Gospels.", notes: ["5 loaves 2 fish", "12 baskets left", "All 4 Gospels"], year: 28 },
                    { name: "Decapolis — Feeding 4000", lat: 32.700, lng: 35.700, ref: "Matthew 15:32-39", desc: "7 loaves and a few small fish feed 4,000. 7 large baskets of fragments. 'I have compassion on the multitude — they have been with Me 3 days and have nothing to eat.'", notes: ["7 loaves", "7 baskets", "3 days with Him"], year: 28 },
                    { name: "Caesarea Philippi", lat: 33.234, lng: 35.513, ref: "Matthew 16:13-20", desc: "'Who do you say that I am?' Peter: 'You are the Christ, the Son of the living God.' 'Upon this rock I will build My church. I will give you the keys of the kingdom.'", notes: ["Peter's confession", "Keys of the kingdom", "Church founded"], year: 28 },
                    { name: "Mount of Transfiguration", lat: 32.900, lng: 35.500, ref: "Matthew 17:1-9", desc: "Face shines like the sun, garments white as light. Moses and Elijah appear. Voice from cloud: 'This is My beloved Son — hear Him.' Disciples fall on faces. 'Tell no one till resurrection.'", notes: ["Moses & Elijah", "Voice from Heaven", "Radiant face"], year: 28 },
                    { name: "Bethany — Lazarus Raised", lat: 31.770, lng: 35.260, ref: "John 11:1-44", desc: "Lazarus dead 4 days. 'I am the resurrection and the life.' Martha believes. Jesus weeps. 'Lazarus, come forth!' Dead man walks out bound in grave clothes.", notes: ["4 days dead", "Jesus wept", "I AM the resurrection"], year: 29 },
                    { name: "Jericho — Zacchaeus", lat: 31.858, lng: 35.463, ref: "Luke 19:1-10", desc: "Zacchaeus climbs a sycamore tree. 'Today I must stay at your house.' 'Lord, half my goods I give to the poor.' 'Today salvation has come to this house. The Son of Man came to seek and save the lost.'", notes: ["Sycamore tree", "Tax collector saved", "Seek and save the lost"], year: 29 },
                    { name: "Jericho — Blind Bartimaeus", lat: 31.858, lng: 35.463, ref: "Mark 10:46-52", desc: "Blind beggar cries: 'Jesus, Son of David, have mercy on me!' Crowd silences him. He cries louder. 'What do you want?' 'Lord, that I may receive my sight.' 'Go your way; your faith has made you well.'", notes: ["Son of David", "Faith healed", "Followed Jesus"], year: 29 },
                    { name: "Jerusalem — Triumphal Entry", lat: 31.778, lng: 35.235, ref: "Matthew 21:1-11", desc: "Rides a donkey's colt into Jerusalem. Crowds wave palm branches: 'Hosanna! Blessed is He who comes in the name of the Lord!' 'Blessed is the coming kingdom of our father David!'", notes: ["Palm Sunday", "Donkey colt", "Hosanna"], year: 30 },
                    { name: "Jerusalem — Temple Cleansing II", lat: 31.778, lng: 35.235, ref: "Matthew 21:12-17", desc: "Overturns tables of money changers and seats of dove sellers. 'My house shall be called a house of prayer, but you have made it a den of thieves.' Blind and lame healed in the Temple.", notes: ["Tables overturned", "Den of thieves", "Healed in Temple"], year: 30 },
                    { name: "Bethany — Anointing", lat: 31.770, lng: 35.260, ref: "Matthew 26:6-13", desc: "Mary anoints Jesus' feet with costly spikenard oil. Judas objects: 'Why this waste?' 'She has done what she could — she has anointed My body for burial. Wherever this gospel is preached, this will be told in memory of her.'", notes: ["Spikenard oil", "300 denarii", "Burial anointing"], year: 30 },
                    { name: "Jerusalem — Last Supper", lat: 31.778, lng: 35.235, ref: "Matthew 26:17-30", desc: "Washes disciples' feet. 'One of you will betray Me.' Takes bread: 'This is My body.' Takes the cup: 'This is My blood of the new covenant, shed for many for the forgiveness of sins.'", notes: ["Foot washing", "Institution of Communion", "New Covenant"], year: 30 },
                    { name: "Gethsemane", lat: 31.778, lng: 35.243, ref: "Matthew 26:36-46", desc: "'My soul is exceedingly sorrowful, even to death.' Prays 3 times: 'O My Father, if it is possible, let this cup pass from Me; nevertheless, not as I will, but as You will.' Sweat like drops of blood. Angel strengthens Him.", notes: ["Agony", "Sweat blood", "Cup of wrath"], year: 30 },
                    { name: "Jerusalem — Trial", lat: 31.778, lng: 35.235, ref: "Matthew 26:57-27:26", desc: "Before Caiaphas: false witnesses. 'Are You the Christ?' 'I am. You will see the Son of Man sitting at the right hand of Power.' Before Pilate: 'Are You the King of the Jews?' 'My kingdom is not of this world.' Barabbas released. Pilate washes hands.", notes: ["False witnesses", "Barabbas", "Pilate washes hands"], year: 30 },
                    { name: "Golgotha", lat: 31.778, lng: 35.227, ref: "Matthew 27:33-56", desc: "Crucified between two thieves. 'Father, forgive them, for they do not know what they do.' 'Today you will be with Me in Paradise.' 'Woman, behold your son.' 'My God, My God, why have You forsaken Me?' 'It is finished.' 'Father, into Your hands I commit My spirit.' Darkness over all the land. Temple veil torn in two.", notes: ["3 hours darkness", "Veil torn", "It is finished"], year: 30 },
                    { name: "Tomb", lat: 31.778, lng: 35.235, ref: "Matthew 27:57-66", desc: "Joseph of Arimathea wraps Jesus in linen and places Him in his own new tomb. Great stone rolled. Guards posted. Seal set.", notes: ["Joseph of Arimathea", "New tomb", "Sealed stone"], year: 30 },
                    { name: "Resurrection", lat: 31.778, lng: 35.235, ref: "Matthew 28:1-10", desc: "Early on the first day of the week. Great earthquake. Angel descends, rolls back stone. 'He is not here — He is risen, as He said!' Women touch His feet. 'Go tell My brethren.'", notes: ["Empty tomb", "He is risen", "First day"], year: 30 },
                    { name: "Emmaus Road", lat: 31.783, lng: 35.183, ref: "Luke 24:13-35", desc: "Walks with two disciples who don't recognize Him. Explains all Scriptures concerning Himself. 'Did not our heart burn within us?' Breaks bread — eyes opened. 'It is the Lord!' He vanishes.", notes: ["Heart burned", "Bread broken", "Vanished"], year: 30 },
                    { name: "Upper Room — Appearance", lat: 31.778, lng: 35.235, ref: "John 20:19-29", desc: "Appears through locked doors. 'Peace be with you.' Shows hands and side. 'Thomas — put your finger here.' Thomas: 'My Lord and my God!' 'Blessed are those who have not seen and yet have believed.'", notes: ["Through locked doors", "Thomas believes", "My Lord and my God"], year: 30 },
                    { name: "Sea of Galilee — Restoration", lat: 32.800, lng: 35.530, ref: "John 21:1-19", desc: "153 large fish caught. Breakfast on the shore. 'Simon, do you love Me?' Three times. 'Feed My sheep.' 'Follow Me.' Prophecy of Peter's death.", notes: ["153 fish", "3x Do you love Me", "Feed My sheep"], year: 30 },
                    { name: "Mount of Olives — Ascension", lat: 31.778, lng: 35.243, ref: "Acts 1:9-11", desc: "Lifts up His hands and blesses them. While blessing, carried up into heaven. Cloud receives Him. Two angels: 'Why do you stand looking into heaven? This same Jesus will come back in like manner.'", notes: ["Cloud received Him", "Angels speak", "Will return"], year: 30 }
                ] },

            "peter": { name: "Peter", desc: "Apostle - Martyred in Rome", category: "Apostles", color: "#D4AF37", year: 30,
                path: [
                    { name: "Bethsaida", lat: 32.794, lng: 35.531, ref: "John 1:41", desc: "Called by Jesus - First disciple" },
                    { name: "Lake Galilee", lat: 32.794, lng: 35.531, ref: "Luke 5:1", desc: "Miraculous catch of fish" },
                    { name: "Caesarea Philippi", lat: 33.234, lng: 35.513, ref: "Matthew 16:13", desc: "You are the Christ!" },
                    { name: "Gethsemane", lat: 31.778, lng: 35.236, ref: "Matthew 26:36", desc: "Prays before arrest" },
                    { name: "Caiaphas House", lat: 31.778, lng: 35.235, ref: "Matthew 26:57", desc: "Denies Jesus 3 times" },
                    { name: "Calvary", lat: 31.778, lng: 35.227, ref: "John 18-19", desc: "At the cross" },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 2:14", desc: "Pentecost sermon - 3000 saved" },
                    { name: "Lydda", lat: 32.050, lng: 34.900, ref: "Acts 9:32", desc: "Heals Aeneas" },
                    { name: "Joppa", lat: 32.050, lng: 34.750, ref: "Acts 9:36", desc: "Raises Tabitha" },
                    { name: "Antioch", lat: 36.202, lng: 36.167, ref: "Acts 11:19", desc: "Preaches to Gentiles" },
                    { name: "Corinth", lat: 37.984, lng: 23.726, ref: "1 Corinthians 1:12", desc: "Church planting" },
                    { name: "Babylon", lat: 32.537, lng: 44.421, ref: "1 Peter 5:13", desc: "Writes 1 Peter" },
                    { name: "Rome", lat: 41.893, lng: 12.485, ref: "2 Timothy 4:6", desc: "MARTYRDOM - Crucified upside down" }
                ] },
            "andrew": { name: "Andrew", desc: "Apostle - Martyred in Greece", category: "Apostles", color: "#D4AF37", year: 30,
                path: [
                    { name: "Bethsaida", lat: 32.794, lng: 35.531, ref: "John 1:40", desc: "First called (Peter's brother)" },
                    { name: "Jordan", lat: 31.947, lng: 35.571, ref: "John 1:35", desc: "Follows Jesus" },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "John 3:22", desc: "Discipleship" },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "John 12:20", desc: "Greeks seek Jesus" },
                    { name: "Ephesus", lat: 37.942, lng: 27.342, ref: "tradition", desc: "Preaches in Asia Minor" },
                    { name: "Patras, Greece", lat: 38.231, lng: 21.727, ref: "tradition", desc: "MARTYRDOM - X-shaped cross" }
                ] },
            "john": { name: "John", desc: "Apostle - Exiled on Patmos", category: "Apostles", color: "#D4AF37", year: 30,
                path: [
                    { name: "Jordan", lat: 31.947, lng: 35.571, ref: "John 1:29", desc: "Follows Jesus" },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "John 13:23", desc: "At the Last Supper" },
                    { name: "Calvary", lat: 31.778, lng: 35.227, ref: "John 19:26", desc: "At the cross" },
                    { name: "Ephesus", lat: 37.942, lng: 27.342, ref: "tradition", desc: "Leads church in Ephesus" },
                    { name: "Patmos", lat: 37.300, lng: 26.500, ref: "Revelation 1:9", desc: "EXILED - Revelation given" }
                ] },
            "james": { name: "James", desc: "Apostle - Martyred in Jerusalem", category: "Apostles", color: "#D4AF37", year: 30,
                path: [
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 1:13", desc: "One of the 12" },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 12:1", desc: "Herod kills James" }
                ] },
            "matthew": { name: "Matthew", desc: "Apostle - Gospel Writer", category: "Apostles", color: "#D4AF37", year: 30,
                path: [
                    { name: "Capernaum", lat: 32.876, lng: 35.542, ref: "Mark 2:14", desc: "Called from tax booth" },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "tradition", desc: "Writes Gospel" },
                    { name: "Ethiopia", lat: 9.145, lng: 40.489, ref: "tradition", desc: "MARTYRDOM" }
                ] },
            "paul": { name: "Paul", desc: "Apostle to the Gentiles — 3 Missionary Journeys", category: "Apostles", color: "#D4AF37", year: 35,
                path: [
                    { name: "Damascus Road", lat: 33.500, lng: 36.300, ref: "Acts 9:1-19", desc: "Saul breathing threats. Light from heaven. 'Saul, Saul, why do you persecute Me?' Blinded 3 days. Ananias restores sight. 'He is a chosen vessel to bear My name before Gentiles.'", notes: ["Blinded by light", "Ananias", "Chosen vessel"] },
                    { name: "Arabia", lat: 29.500, lng: 36.000, ref: "Galatians 1:17", desc: "Retires to Arabia for 3 years. Receives revelation directly from Christ. 'I did not receive it from any man.' Foundation of his gospel prepared.", notes: ["3 years", "Direct revelation", "Gospel prepared"] },
                    { name: "Damascus — Escape", lat: 33.500, lng: 36.300, ref: "Acts 9:20-25", desc: "Preaches Christ in synagogues. Jews plot to kill him. Watch gates day and night. Lowered in basket through wall. 'Gained Damascus for Christ.'", notes: ["Basket escape", "Watched gates", "Preached boldly"] },
                    { name: "Jerusalem — First Visit", lat: 31.768, lng: 35.213, ref: "Acts 9:26-30", desc: "Barnabas introduces Saul to apostles. Speaks boldly in Jerusalem. Grecian Jews seek to kill him. Sent to Tarsus for safety.", notes: ["Barnabas", "Bold preaching", "Sent to Tarsus"] },
                    { name: "Tarsus", lat: 36.917, lng: 34.583, ref: "Acts 9:30 / 11:25", desc: "Years in hometown. Barnabas seeks him out: 'Come to Antioch.' A whole year they teach great multitudes. 'Disciples were first called Christians in Antioch.'", notes: ["Called for by Barnabas", "1 year teaching", "Christians named"] },
                    { name: "Antioch — Commissioned", lat: 36.202, lng: 36.167, ref: "Acts 13:1-3", desc: "Holy Spirit says: 'Separate Barnabas and Saul for the work I have called them to.' Fasting, prayer, laying on of hands. First missionary journey begins.", notes: ["Holy Spirit speaks", "Hands laid", "First journey"] },
                    { name: "Cyprus — Paphos", lat: 34.770, lng: 32.410, ref: "Acts 13:4-12", desc: "Sergius Paulus proconsul. Bar-Jesus (Elymas) the sorcerer opposes. 'You son of the devil!' Elymas struck blind. Proconsul believes. Saul becomes Paul.", notes: ["Elymas blinded", "Proconsul believes", "Saul → Paul"] },
                    { name: "Antioch of Pisidia", lat: 38.200, lng: 31.000, ref: "Acts 13:13-52", desc: "Great sermon tracing Israel's history. 'Through this Man is preached forgiveness of sins.' Gentiles rejoice. 'We turn to the Gentiles.' Many believe. Paul and Barnabas expelled.", notes: ["History sermon", "Turn to Gentiles", "Expelled"] },
                    { name: "Iconium", lat: 37.870, lng: 32.480, ref: "Acts 14:1-7", desc: "Great multitude of Jews and Greeks believe. Unbelieving Jews stir up Gentiles. Attempted stoning. Flee to Lystra and Derbe.", notes: ["Many believe", "Stoning attempt", "Fled"] },
                    { name: "Lystra", lat: 37.570, lng: 32.470, ref: "Acts 14:8-20", desc: "Cripple healed. 'The gods have come down!' Call Barnabas Zeus, Paul Hermes. Priest brings oxen. Paul tears clothes: 'We are men like you!' Jews from Antioch stone Paul, leave him for dead. He rises and enters city.", notes: ["Called gods", "Stoned", "Rose and entered city"] },
                    { name: "Jerusalem — Council", lat: 31.768, lng: 35.213, ref: "Acts 15:1-35", desc: "Must Gentiles be circumcised? Great dissension. Peter: 'God made no distinction.' James: 'I will rebuild the tabernacle of David.' Letter sent: 'No greater burden than these necessary things.'", notes: ["Circumcision debate", "Peter speaks", "Letter sent"] },
                    { name: "Philippi", lat: 41.680, lng: 26.560, ref: "Acts 16:11-40", desc: "Macedonian call answered. Lydia converted — first European convert. Demon-possessed girl freed. Beaten and imprisoned. Midnight singing. Earthquake. Jailer: 'What must I do to be saved?' 'Believe on the Lord Jesus.'", notes: ["Lydia", "Earthquake", "Jailer saved"] },
                    { name: "Thessalonica", lat: 40.640, lng: 22.970, ref: "Acts 17:1-9", desc: "3 Sabbats reasoning from Scriptures. 'Christ must suffer and rise.' Some believe. Jealous Jews form mob. 'These who turned the world upside down have come here.'", notes: ["3 Sabbats", "World turned upside down", "Mob formed"] },
                    { name: "Berea", lat: 40.570, lng: 22.470, ref: "Acts 17:10-15", desc: "'More noble than those in Thessalonica — searched the Scriptures daily.' Many believe. Thessalonian Jews follow. Paul sent to Athens by sea.", notes: ["Noble Bereans", "Daily search", "Sent to Athens"] },
                    { name: "Athens — Areopagus", lat: 37.980, lng: 23.730, ref: "Acts 17:16-34", desc: "'I perceive you are very religious.' 'Unknown God — whom you worship in ignorance.' 'In Him we live and move and have our being.' 'God commands all men everywhere to repent.' Some mock. Dionysius and Damaris believe.", notes: ["Unknown God", "Areopagus", "Dionysius believes"] },
                    { name: "Corinth", lat: 37.910, lng: 22.890, ref: "Acts 18:1-18", desc: "18 months. Aquila and Priscilla. 'I am with you — no one shall attack you.' Gallio refuses Jewish charges. Writes 1 & 2 Thessalonians. 'I will go to the Gentiles.'", notes: ["18 months", "Aquila & Priscilla", "Gallio"] },
                    { name: "Ephesus — 3 Years", lat: 37.950, lng: 27.340, ref: "Acts 19:1-41", desc: "2 years in school of Tyrannus. 'All Asia hears the word.' 12 disciples receive Holy Spirit. Miraculous healings. Evil exorcists fail. Books burned worth 50,000 pieces of silver. Riot of silversmiths. Demetrius: 'Great is Diana!'", notes: ["3 years", "Books burned", "Diana riot"] },
                    { name: "Troas — Eutychus", lat: 39.960, lng: 26.240, ref: "Acts 20:7-12", desc: "Paul preaches till midnight. Eutychus falls from 3rd window, taken up dead. Paul embraces him: 'Life is in him.' Breaks bread, talks till daybreak. Young man taken alive.", notes: ["Eutychus raised", "Midnight sermon", "Till daybreak"] },
                    { name: "Miletus — Farewell", lat: 37.530, lng: 27.340, ref: "Acts 20:17-38", desc: "Ephesian elders summoned. 'I have not shunned to declare the whole counsel of God.' 'Wolves will enter among you.' 'I coveted no one's silver or gold.' They weep, embrace, kiss him. 'They will see my face no more.'", notes: ["Farewell tears", "Wolves coming", "See face no more"] },
                    { name: "Caesarea — Agabus", lat: 32.510, lng: 34.900, ref: "Acts 21:8-14", desc: "Agabus binds his hands with Paul's belt: 'So the Jews will bind the man who owns this belt.' 'I am ready not to be bound only but also to die at Jerusalem.' 'The will of the Lord be done.'", notes: ["Agabus prophecy", "Ready to die", "Lord's will"] },
                    { name: "Jerusalem — Arrest", lat: 31.768, lng: 35.213, ref: "Acts 21:15-22:30", desc: "Temple riot. 'Men of Israel, help!' Accused of bringing Gentiles. Dragged from Temple. Chief captain binds him. Paul: 'I am a Roman citizen.' 4,000 soldiers called.", notes: ["Temple riot", "Roman citizen", "4000 soldiers"] },
                    { name: "Caesarea — Trial", lat: 32.510, lng: 34.900, ref: "Acts 24-26", desc: "Before Felix: 'You can become a Christian.' Felix trembles. Before Festus: 'I appeal to Caesar!' Before Agrippa: 'Do you believe the prophets?' Agrippa: 'You almost persuade me to become a Christian.'", notes: ["Felix trembles", "Appeal to Caesar", "Almost persuaded"] },
                    { name: "Shipwreck — Malta", lat: 35.880, lng: 14.440, ref: "Acts 27-28", desc: "Storm 14 days. Angel: 'You must stand before Caesar.' Ship destroyed. All 276 saved. Snake bite — no harm. Publius' father healed. Many diseases cured. 3 months on island.", notes: ["14 day storm", "276 saved", "Snake bite"] },
                    { name: "Rome — House Arrest", lat: 41.893, lng: 12.485, ref: "Acts 28:16-31", desc: "2 years in rented house. 'Receiving all who came to him.' Preaches kingdom of God with all confidence. Writes Ephesians, Philippians, Colossians, Philemon, 2 Timothy. 'No one stood with me at first defense.' Martyred ~67 AD.", notes: ["2 years", "Prison epistles", "Martyred ~67 AD"] }
                ] },
            
            // ADDITIONAL APOSTLES
            "thomas": { name: "Thomas", desc: "Apostle - Doubter", category: "Apostles", color: "#DAA520", year: 30, era: "NEW TESTAMENT",
                path: [
                    { name: "Galilee", lat: 32.800, lng: 35.500, ref: "John 21:2", desc: "Appears to Thomas", notes: ["My Lord and my God"] },
                    { name: "India", lat: 10.163, lng: 76.441, ref: "tradition", desc: "Martyrdom in Madras", notes: ["Parangi"] }
                ] },
            "bartholomew": { name: "Bartholomew", desc: "Apostle - Nathaniel", category: "Apostles", color: "#DAA520", year: 30, era: "NEW TESTAMENT",
                path: [
                    { name: "Galilee", lat: 32.800, lng: 35.500, ref: "John 1:45", desc: "Called", notes: ["True Israelite"] },
                    { name: "Armenia", lat: 40.000, lng: 45.000, ref: "tradition", desc: "Martyrdom", notes: ["Flayed alive"] }
                ] },
            "james_son_of_alphaeus": { name: "James (Alphaeus)", desc: "Apostle - Lesser James", category: "Apostles", color: "#DAA520", year: 30, era: "NEW TESTAMENT",
                path: [
                    { name: "Galilee", lat: 32.800, lng: 35.500, ref: "Mark 15:40", desc: "With Jesus", notes: ["Brother of Jude"] },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "tradition", desc: "Bishop", notes: ["Martyrdom"] }
                ] },
            "thaddaeus": { name: "Thaddaeus (Jude)", desc: "Apostle - Jude", category: "Apostles", color: "#DAA520", year: 30, era: "NEW TESTAMENT",
                path: [
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Jude 1:1", desc: "Writes Epistle", notes: ["Brother of James"] },
                    { name: "Edessa", lat: 37.917, lng: 38.283, ref: "tradition", desc: "Mission", notes: ["Christianity spread"] }
                ] },
            "simon_zelotes": { name: "Simon (Zelotes)", desc: "Apostle - Zealot", category: "Apostles", color: "#DAA520", year: 30, era: "NEW TESTAMENT",
                path: [
                    { name: "Galilee", lat: 32.800, lng: 35.500, ref: "Luke 6:15", desc: "Called", notes: ["Former zealot"] },
                    { name: "Babylon", lat: 32.537, lng: 44.421, ref: "tradition", desc: "Mission", notes: ["Martyrdom"] }
                ] },
            "matthias": { name: "Matthias", desc: "Apostle - Replacement for Judas", category: "Apostles", color: "#DAA520", year: 30, era: "NEW TESTAMENT",
                path: [
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 1:26", desc: "Chosen by lot", notes: ["Replaces Judas"] },
                    { name: "Judea", lat: 31.500, lng: 35.000, ref: "tradition", desc: "Mission", notes: ["Bishop of Jerusalem"] }
                ] },
            "barnabas": { name: "Barnabas", desc: "Apostle - Son of Encouragement", category: "Apostles", color: "#DAA520", year: 35, era: "NEW TESTAMENT",
                path: [
                    { name: "Cyprus", lat: 35.000, lng: 33.500, ref: "Acts 4:36", desc: "Sale of land", notes: ["Good man"] },
                    { name: "Antioch", lat: 36.202, lng: 36.167, ref: "Acts 11:22", desc: "Church sent", notes: ["First Gentile church"] },
                    { name: "Cyprus", lat: 35.000, lng: 33.500, ref: "Acts 15:39", desc: "Dispute with Paul", notes: ["Separate journey"] }
                ] },
            "stephen": { name: "Stephen", desc: "First Martyr", category: "Apostles", color: "#CD853F", year: 34, era: "NEW TESTAMENT",
                path: [
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 6:5", desc: "Deacon chosen", notes: ["Full of faith"] },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 7:54", desc: "Stoned to death", notes: ["First martyrdom"] }
                ] },
            "philip": { name: "Philip", desc: "Apostle - Evangelist", category: "Apostles", color: "#DAA520", year: 34, era: "NEW TESTAMENT",
                path: [
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 6:5", desc: "Deacon", notes: ["Chosen for service"] },
                    { name: "Samaria", lat: 32.417, lng: 35.267, ref: "Acts 8:5", desc: "Preaches", notes: ["Philip the Evangelist"] },
                    { name: "Desert road", lat: 31.500, lng: 35.000, ref: "Acts 8:26", desc: "Ethiopian eunuch", notes: ["Baptism"] }
                ] },
            
            // PAUL'S MISSIONARY JOURNEYS
            "paul_journey1": { name: "Paul — First Journey", desc: "Acts 13–14 · From Antioch to Cyprus and Asia Minor", category: "Apostles", color: "#5DCAA5", year: 46, era: "NEW TESTAMENT",
                path: [
                    { name: "Antioch (Syria)", lat: 36.20, lng: 36.15, ref: "Acts 13:1-3", desc: "Set apart by the Holy Spirit" },
                    { name: "Salamis", lat: 35.18, lng: 33.90, ref: "Acts 13:5", desc: "Synagogues in Cyprus" },
                    { name: "Paphos", lat: 34.77, lng: 32.41, ref: "Acts 13:6", desc: "Elymas the sorcerer blinded" },
                    { name: "Perge", lat: 36.96, lng: 30.85, ref: "Acts 13:13", desc: "John Mark departs" },
                    { name: "Antioch (Pisidia)", lat: 38.20, lng: 31.00, ref: "Acts 13:14", desc: "Sermon in synagogue — Jews reject, Gentiles believe" },
                    { name: "Iconium", lat: 37.87, lng: 32.48, ref: "Acts 14:1", desc: "Jews and Greeks believe" },
                    { name: "Lystra", lat: 37.57, lng: 32.47, ref: "Acts 14:8", desc: "Cripple healed; Paul stoned, left for dead" },
                    { name: "Derbe", lat: 37.35, lng: 33.38, ref: "Acts 14:20", desc: "Many disciples made" },
                    { name: "Antioch (Syria)", lat: 36.20, lng: 36.15, ref: "Acts 14:26", desc: "Return; report to church" }
                ]
            },
            "paul_journey2": { name: "Paul — Second Journey", desc: "Acts 15:36–18:22 · Through Asia Minor and Greece", category: "Apostles", color: "#5DCAA5", year: 50, era: "NEW TESTAMENT",
                path: [
                    { name: "Antioch (Syria)", lat: 36.20, lng: 36.15, ref: "Acts 15:36", desc: "Visits churches; Barnabas and Mark depart" },
                    { name: "Derbe", lat: 37.35, lng: 33.38, ref: "Acts 15:40", desc: "Strengthens disciples" },
                    { name: "Lystra", lat: 37.57, lng: 32.47, ref: "Acts 16:1", desc: "Timothy circumcised; joins the team" },
                    { name: "Troas", lat: 39.96, lng: 26.24, ref: "Acts 16:8", desc: "Macedonian vision: 'Come over and help us'" },
                    { name: "Neapolis", lat: 40.94, lng: 24.88, ref: "Acts 16:11", desc: "First European landing" },
                    { name: "Philippi", lat: 41.68, lng: 26.56, ref: "Acts 16:12", desc: "Lydia baptised; jailer converted" },
                    { name: "Thessalonica", lat: 40.64, lng: 22.97, ref: "Acts 17:1", desc: "Jews jealous; Paul writes 1 & 2 Thessalonians" },
                    { name: "Berea", lat: 40.57, lng: 22.47, ref: "Acts 17:10", desc: "Noble Bereans examine the Scriptures daily" },
                    { name: "Athens", lat: 37.98, lng: 23.73, ref: "Acts 17:16", desc: "Ares' Areopagus; 'Unknown God' sermon" },
                    { name: "Corinth", lat: 37.91, lng: 22.89, ref: "Acts 18:1", desc: "18 months; Aquila and Priscilla; writes 1 & 2 Corinthians" },
                    { name: "Ephesus", lat: 37.95, lng: 27.34, ref: "Acts 18:19", desc: " Apollos instructed" },
                    { name: "Caesarea", lat: 32.51, lng: 34.90, ref: "Acts 18:22", desc: "Greeted the church; Antioch" }
                ]
            },
            "paul_journey3": { name: "Paul — Third Journey", desc: "Acts 18:23–21:17 · Farewell Tour to Asia and Arrest", category: "Apostles", color: "#5DCAA5", year: 54, era: "NEW TESTAMENT",
                path: [
                    { name: "Antioch (Syria)", lat: 36.20, lng: 36.15, ref: "Acts 18:23", desc: "Strengthens disciples" },
                    { name: "Galatia & Phrygia", lat: 38.50, lng: 34.00, ref: "Acts 18:23", desc: "Strengthens all the churches" },
                    { name: "Ephesus", lat: 37.95, lng: 27.34, ref: "Acts 19:1", desc: "2 years; disciples of John instructed; Holy Spirit falls" },
                    { name: "Smyrna", lat: 38.42, lng: 27.05, ref: "Acts 19:10", desc: "All Asia hears the word" },
                    { name: "Troas", lat: 39.96, lng: 26.24, ref: "Acts 20:6", desc: "Eutychus raised from the dead" },
                    { name: "Miletus", lat: 37.53, lng: 27.34, ref: "Acts 20:17", desc: "Ephesian elders: 'wolves among you'" },
                    { name: "Tyre", lat: 33.27, lng: 35.20, ref: "Acts 21:3", desc: " disciples warn Paul not to go to Jerusalem" },
                    { name: "Caesarea", lat: 32.51, lng: 34.90, ref: "Acts 21:8", desc: "Agabus prophesies Paul will be bound" },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 21:15", desc: "Arrested in the Temple; crowd riots" }
                ]
            },
            
            // SEVEN CHURCHES OF REVELATION
            "seven_churches": { name: "Seven Churches of Revelation", desc: "Rev 2–3 · John's Circular Letter Circuit in Asia", category: "Apostles", color: "#9B59B6", year: 96, era: "NEW TESTAMENT",
                path: [
                    { name: "Ephesus", lat: 37.95, lng: 27.34, ref: "Rev 2:1-7", desc: "\"You have forsaken the love you had at first.\" Hold fast. Remove the Nicolaitans. overcoming — eat from the tree of life." },
                    { name: "Smyrna", lat: 38.42, lng: 27.05, ref: "Rev 2:8-11", desc: "\"Be faithful even to the point of death.\" Ten days of tribulation. Crown of life promised. The second death has no power over overcomers." },
                    { name: "Pergamum", lat: 39.13, lng: 27.18, ref: "Rev 2:12-17", desc: "\"Hold firm.\" Where Satan's throne is. Antipas martyred. Balaam & Nicolaitan doctrine. Hidden manna — white stone with new name." },
                    { name: "Thyatira", lat: 38.88, lng: 27.83, ref: "Rev 2:18-29", desc: "\"I know your deeds.\" Jezebel seduces. Deep things of Satan. Hold what you have. To the overcomer — rule the nations with iron scepter." },
                    { name: "Sardis", lat: 38.47, lng: 28.03, ref: "Rev 3:1-6", desc: "\"You have a reputation of being alive, but you are dead.\" Wake up. Strengthen what remains. Nothing in God's scroll found blameless." },
                    { name: "Philadelphia", lat: 38.38, lng: 27.43, ref: "Rev 3:7-13", desc: "\"I know your deeds.\" Kept God's word. Open door before you that no one can shut. Holy nation. Pillars in God's temple." },
                    { name: "Laodicea", lat: 37.92, lng: 27.92, ref: "Rev 3:14-22", desc: "\"Because you are lukewarm — I will vomit you out.\" wretched, pitiful, poor, blind, naked. Buy gold refined in fire. The door stands open." }
                ]
            },
            
            // PETER'S MINISTRY JOURNEY
            "peter_journey": { name: "Peter's Ministry Circuit", desc: "Acts 9–10, Gal 2, 1 Pet 5 · Galilean fisherman to martyr in Rome", category: "Apostles", color: "#27AE60", year: 44, era: "NEW TESTAMENT",
                path: [
                    { name: "Capernaum", lat: 32.78, lng: 35.54, ref: "Mk 1:21", desc: "\"You are the Christ.\" — Peter's confession & Transfiguration mount. Jesus teaches, heals, calls him as fisherman of men." },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 1-5", desc: "Pentecost. Spirit baptism. Pentecost tongue of fire. Bold preaching — 3,000 saved. Fisher of men begins." },
                    { name: "Lydda (Joppa)", lat: 32.33, lng: 34.75, ref: "Acts 9:36-43", desc: "Tabitha raised. Peter stays with tanners. \"In those days I was fishing.\" Joppa — port of Jonah's departure." },
                    { name: "Caesarea Maritima", lat: 32.51, lng: 34.90, ref: "Acts 10", desc: "Cornelius Centurion. \"God shows no partiality.\" Holy Spirit falls — Gentiles grafted in. Peter recognizes the mystery." },
                    { name: "Jerusalem", lat: 31.768, lng: 35.213, ref: "Acts 11-12", desc: "Council confirms Gentile ministry. Herod's prison. Angel frees Peter. \"Now I really know the Lord.\"" },
                    { name: "Antioch (Syria)", lat: 36.20, lng: 36.15, ref: "Gal 2:11-14", desc: "Peter eats with Gentiles — then withdraws. Paul's confrontation. Salvation by grace through faith alone, not by works." },
                    { name: "Babylon", lat: 32.55, lng: 44.43, ref: "1 Pet 5:13", desc: "\"She who is in Babylon, chosen together with you, sends you greetings.\" Babylon = Rome code. Early church cipher." },
                    { name: "Rome", lat: 41.90, lng: 12.50, ref: "2 Pet 1:14-15 / tradition", desc: "Nero's persecution. Upside-down crucifixion (tradition). \"I am going where my Lord once hung on a tree.\" Martyrdom ~64 AD." }
                ]
            }
        };
