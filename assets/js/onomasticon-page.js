(function() {
'use strict';
const SCRIPTORIUM_ONOMASTICON = {
    "reuben": {
        hebrew: "רְאוּבֵן", geez: "ሮቤል", phonetic: "Re'uven",
        meaning: "Behold, a Son!",
        historicalContext: "Exclaimed by Leah upon his birth: 'Because the LORD has looked upon my affliction' (Genesis 29:32). The firstborn who forfeited his preeminence due to instability.",
        alliance: "Vanguard of the Southern Camp (Flag of the Man)", category: "tribe"
    },
    "simeon": {
        hebrew: "שִׁמְעוֹן", geez: "ስምዖን", phonetic: "Shim'on",
        meaning: "Heard / One Who Hears",
        historicalContext: "Named by Leah to signify that 'the LORD has heard that I am hated' (Genesis 29:33). Known for a volatile, fierce zeal that led to scattered territories.",
        alliance: "Flank of the Southern Camp", category: "tribe"
    },
    "levi": {
        hebrew: "לֵוִי", geez: "ሌዊ", phonetic: "Lewi",
        meaning: "Attached / Joined",
        historicalContext: "Signified Leah's hope that her husband would become intimately attached to her. His lineage was set apart as the priestly class to guard the Tabernacle ark.",
        alliance: "Keepers of the Inner Court (Encamped Centrally)", category: "tribe"
    },
    "judah": {
        hebrew: "יְהוּדָה", geez: "ይሁዳ", phonetic: "Yehudah",
        meaning: "Praised / Thanksgiving",
        historicalContext: "Named by Leah: 'This time I will praise the LORD' (Genesis 29:35). Prophesied as the royal lineage of the Lion, the scepter holder, and the line of David.",
        alliance: "Vanguard of the Eastern Camp (Flag of the Lion)", category: "tribe", place: "Jerusalem"
    },
    "dan": {
        hebrew: "דָּן", geez: "ዳን", phonetic: "Dan",
        meaning: "Judge / Vindicator",
        historicalContext: "Named by Rachel via Bilhah: 'God has judged me... and given me a son' (Genesis 30:6). Prophesied to judge his people as a serpent along the trail.",
        alliance: "Vanguard of the Northern Camp (Flag of the Eagle)", category: "tribe", place: "Tel Dan"
    },
    "naphtali": {
        hebrew: "נַפְתָּלִי", geez: "ናፍታሌ", phonetic: "Naftali",
        meaning: "My Wrestling",
        historicalContext: "Named by Rachel to signify her spiritual rivalry: 'With mighty wrestlings have I wrestled... and prevailed' (Genesis 30:8). Characterized as a doe let loose.",
        alliance: "Flank of the Northern Camp", category: "tribe"
    },
    "gad": {
        hebrew: "גָּד", geez: "ጋድ", phonetic: "Gad",
        meaning: "A Troop Comes / Fortune",
        historicalContext: "Named by Leah via Zilpah, declaring, 'Fortune comes!' (Genesis 30:11). Prophesied by Jacob to be raided by marauders but overcoming them at the heel.",
        alliance: "Flank of the Southern Camp", category: "tribe"
    },
    "asher": {
        hebrew: "אָשֵׁר", geez: "አሴር", phonetic: "Asher",
        meaning: "Happy / Blessed",
        historicalContext: "Named by Leah via Zilpah: 'Happy am I! For the daughters will call me happy' (Genesis 30:13). Noted for fertile, rich borders yielding royal delicacies.",
        alliance: "Flank of the Northern Camp", category: "tribe"
    },
    "issachar": {
        hebrew: "יִשָּׂשכָר", geez: "ይሳኮር", phonetic: "Yissakhar",
        meaning: "There is a Reward / Man of Hire",
        historicalContext: "Named when Leah stated, 'God has given me my hire' (Genesis 30:18). Renowned as men who understood the seasons and knew what paths Israel should take.",
        alliance: "Flank of the Eastern Camp", category: "tribe"
    },
    "zebulun": {
        hebrew: "זְבוּלֻן", geez: "ዛብሎን", phonetic: "Zevulun",
        meaning: "Dwelling / Honor",
        historicalContext: "Named when Leah rejoiced, 'Now will my husband dwell with me' (Genesis 30:20). Destined to settle by the coastlines as a strategic haven for ships.",
        alliance: "Flank of the Eastern Camp", category: "tribe"
    },
    "joseph": {
        hebrew: "יוֹסֵף", geez: "ዮሴፍ", phonetic: "Yosef",
        meaning: "May He Add / Increaser",
        historicalContext: "Named by Rachel after long barrenness: 'The LORD will add to me another son' (Genesis 30:24). Divided into the two dominant tribes of Ephraim and Manasseh.",
        alliance: "Vanguard of the Western Camp (Flag of the Ox)", category: "tribe", place: "Shechem"
    },
    "benjamin": {
        hebrew: "בִּנְיָמִין", geez: "ብንያም", phonetic: "Binyamin",
        meaning: "Son of the Right Hand",
        historicalContext: "Originally named Ben-Oni ('Son of my sorrow') by Rachel as she passed, but renamed by Jacob to represent honor and strength. Characterized as a fierce wolf.",
        alliance: "Guardians of the Sanctuary West", category: "tribe", place: "Jerusalem"
    },
    "abraham": {
        hebrew: "אַבְרָהָם", geez: "አብርሃም", phonetic: "Avraham",
        meaning: "Father of a Multitude",
        historicalContext: "Originally Abram ('Exalted Father'), he was renamed by God to seal the eternal covenant promising that he would become the progenitor of many nations (Genesis 17:5).",
        alliance: "The Root of the Promise", category: "patriarch", place: "Hebron"
    },
    "isaac": {
        hebrew: "יִצְחָק", geez: "ይስሐቅ", phonetic: "Yitzchak",
        meaning: "He Laughs / Laughter",
        historicalContext: "Named from Abraham's joyful laughter at the impossible promise of a son in old age (Genesis 17:17). The beloved son who carried the covenant lineage through near-sacrifice on Mount Moriah.",
        alliance: "The Heir of the Promise", category: "patriarch", place: "Beersheba"
    },
    "jacob": {
        hebrew: "יַעֲקֹב", geez: "ያዕቆብ", phonetic: "Ya'akov",
        meaning: "Heel Grabber / Supplanter",
        historicalContext: "Born gripping Esau's heel (Genesis 25:26). After wrestling with the angel at Peniel he was renamed Israel ('He who contends with God'), becoming the father of the twelve tribes.",
        alliance: "The Father of the Twelve", category: "patriarch", place: "Hebron"
    },
    "sarah": {
        hebrew: "שָׂרָה", geez: "ሣራ", phonetic: "Sarah",
        meaning: "Princess / Noblewoman",
        historicalContext: "Originally Sarai ('Contentious'), her name was elevated by divine decree alongside Abraham's to establish her as a mother of kings and nations (Genesis 17:15).",
        alliance: "The Matriarch of Promise", category: "matriarch", place: "Hebron"
    },
    "rebekah": {
        hebrew: "רִבְקָה", geez: "ርብቃ", phonetic: "Rivkah",
        meaning: "Enslaver / Captivating",
        historicalContext: "The daughter of Bethuel who drew water for Abraham's servant at the well, chosen as Isaac's bride (Genesis 24). Her name reflects the binding cord of covenant destiny.",
        alliance: "The Chosen Bride", category: "matriarch", place: "Hebron"
    },
    "rachel": {
        hebrew: "רָחֵל", geez: "ራሄል", phonetic: "Rachel",
        meaning: "Ewe [Female Sheep]",
        historicalContext: "The beloved wife of Jacob for whom he served fourteen years. Mother of Joseph and Benjamin, her tomb at Bethlehem marks the pivot of Israel's birth-narrative (Genesis 29–35).",
        alliance: "The Beloved of Jacob", category: "matriarch", place: "Bethlehem"
    },
    "moses": {
        hebrew: "מֹשֶׁה", geez: "ሙሴ", phonetic: "Moshe",
        meaning: "Drawn Out [of the Water]",
        historicalContext: "Named by Pharaoh's daughter who rescued him from the Nile (Exodus 2:10). Prophetically pointed to his future assignment: drawing the entire nation of Israel out of Egyptian bondage.",
        alliance: "The Lawgiver of Israel", category: "prophet", place: "Sinai"
    },
    "noah": {
        hebrew: "נֹחַ", geez: "ኖህ", phonetic: "Noach",
        meaning: "Rest / Comfort",
        historicalContext: "Named by Lamech with hope: 'This one will comfort us concerning our work' (Genesis 5:29). The righteous remnant who built the ark and became the second father of all humanity through the flood.",
        alliance: "The Rest of the Earth", category: "patriarch"
    },
    "david": {
        hebrew: "דָּוִד", geez: "ዳዊት", phonetic: "Dawid",
        meaning: "Beloved One",
        historicalContext: "The shepherd king anointed by Samuel. He established Jerusalem as the capital, brought the Ark to Zion, and received the unconditional promise of an everlasting kingdom.",
        alliance: "The Throne of Judah", category: "royal", place: "Jerusalem"
    },
    "solomon": {
        hebrew: "שְׁלֹמֹה", geez: "ሰሎሞን", phonetic: "Shlomoh",
        meaning: "Peaceful / Peaceable",
        historicalContext: "The son of David and Bathsheba who inherited the throne and built the First Temple. Renowned for unequaled wisdom, he composed Proverbs, Ecclesiastes, and the Song of Songs.",
        alliance: "The Wise King", category: "royal", place: "Jerusalem"
    },
    "esther": {
        hebrew: "אֶסְתֵּר", geez: "አስቴር", phonetic: "Ester",
        meaning: "Star / Hidden [Myrtle]",
        historicalContext: "Originally Hadassah ('Myrtle'), she adopted the Persian name Esther to conceal her Jewish identity in Susa. She bravely risked execution to intercept Haman's plot, declaring, 'If I perish, I perish' (Esther 4:16).",
        alliance: "The Guardian of the Exile", category: "royal", place: "Babylon"
    },
    "bathsheba": {
        hebrew: "בַּת־שֶׁבַע", geez: "ቤርሳቤህ", phonetic: "Bat-Sheva",
        meaning: "Daughter of the Oath",
        historicalContext: "The wife of Uriah the Hittite whom David took after her bath on the rooftop. Her first child died as judgment, but she later bore Solomon, through whom the royal lineage continued (2 Samuel 11–12).",
        alliance: "The Mother of the King", category: "royal", place: "Jerusalem"
    },
    "abigail": {
        hebrew: "אֲבִיגַיִל", geez: "አቢግያ", phonetic: "Avigayil",
        meaning: "My Father Rejoices",
        historicalContext: "A woman of wisdom and beauty who prevented David from bloodguilt by intercepting him with provisions (1 Samuel 25). After Nabal's death she became David's wife, embodying shrewd peacemaking.",
        alliance: "The Wise Intercessor", category: "royal", place: "Hebron"
    },
    "zerubbabel": {
        hebrew: "זְרֻבָּבֶל", geez: "ዘሩባቤል", phonetic: "Zerubavel",
        meaning: "Seed of Babylon",
        historicalContext: "The grandson of King Jehoiachin who led the first wave of Jewish exiles back from Babylon. He laid the foundation of the Second Temple and is named in the Davidic messianic line (Haggai 1–2).",
        alliance: "The Rebuilder of the Temple", category: "royal", place: "Jerusalem"
    },
    "nehemiah": {
        hebrew: "נְחֶמְיָה", geez: "ነህምያ", phonetic: "Nechemyah",
        meaning: "Yahweh Comforts",
        historicalContext: "The Jewish cupbearer to the Persian king Artaxerxes who secured leave to rebuild Jerusalem's walls. His leadership restored both the physical city and the covenant community (Nehemiah 1–6).",
        alliance: "The Restorer of the Wall", category: "royal", place: "Jerusalem"
    },
    "elijah": {
        hebrew: "אֵלִיָּהוּ", geez: "ኤልያስ", phonetic: "Eliyahu",
        meaning: "My God is Yahweh",
        historicalContext: "The northern prophet who confronted Ahab and the prophets of Baal on Mount Carmel (1 Kings 18). His entire life was a physical manifestation of his name.",
        alliance: "The Voice of Judgment", category: "prophet", place: "Mount Carmel"
    },
    "elisha": {
        hebrew: "אֱלִישָׁע", geez: "ኤልሳዕ", phonetic: "Elisha",
        meaning: "God is Salvation",
        historicalContext: "The disciple and successor of Elijah who received a double portion of his spirit (2 Kings 2). He performed twice as many recorded miracles: cleansing Naaman, raising the Shunammite's son, and multiplying oil.",
        alliance: "The Double-Portion Heir", category: "prophet", place: "Jericho"
    },
    "isaiah": {
        hebrew: "יְשַׁעְיָהוּ", geez: "ኢሳይያስ", phonetic: "Yeshayahu",
        meaning: "Yahweh is Salvation",
        historicalContext: "The eighth-century prophet whose oracles span judgment, messianic prophecy, and the suffering servant. His vision of the seraphim and the call 'Holy, Holy, Holy' define the temple liturgy (Isaiah 6).",
        alliance: "The Seraph's Voice", category: "prophet", place: "Jerusalem"
    },
    "jeremiah": {
        hebrew: "יִרְמְיָהוּ", geez: "ኤርምያስ", phonetic: "Yirmeyahu",
        meaning: "Yahweh Exalts / Appoints",
        historicalContext: "The weeping prophet called before birth to uproot and build (Jeremiah 1:5). He prophesied the seventy-year Babylonian exile, the New Covenant written on hearts, and Jerusalem's fall.",
        alliance: "The Weeping Prophet", category: "prophet", place: "Jerusalem"
    },
    "daniel": {
        hebrew: "דָּנִיֵּאל", geez: "ዳንኤል", phonetic: "Daniyyel",
        meaning: "God is My Judge",
        historicalContext: "The Jewish exile in Babylon who rose to become chief advisor to Nebuchadnezzar and Darius. His apocalyptic visions of the four beasts, seventy weeks, and the Son of Man redefined eschatology (Daniel 7–12).",
        alliance: "The Seer of the Kingdoms", category: "prophet", place: "Babylon"
    },
    "samuel": {
        hebrew: "שְׁמוּאֵל", geez: "ሳሙኤል", phonetic: "Shemu'el",
        meaning: "Heard of God / Name of God",
        historicalContext: "The last judge of Israel who anointed both Saul and David as kings. Dedicated to the Tabernacle by his barren mother Hannah, he heard the voice of Yahweh calling him as a child (1 Samuel 3).",
        alliance: "The Anointer of Kings", category: "prophet"
    },
    "miriam": {
        hebrew: "מִרְיָם", geez: "ማርያም", phonetic: "Miriam",
        meaning: "Wished-for Child / Bitter Sea",
        historicalContext: "The prophetess and sister of Moses who watched over his basket in the Nile. She led the women in song and dance after the Red Sea crossing (Exodus 15:20) and is a matriarch of Israel's musical tradition.",
        alliance: "The Prophetess of the Exodus", category: "prophet", place: "Sinai"
    },
    "deborah": {
        hebrew: "דְּבוֹרָה", geez: "ድቦራ", phonetic: "Devorah",
        meaning: "Bee / Worker",
        historicalContext: "The only female judge of Israel, who held court under the Palm of Deborah and commanded Barak to lead an army against Sisera. Her victory song (Judges 5) is among the oldest Hebrew poetry.",
        alliance: "The Mother in Israel", category: "judge", place: "Megiddo"
    },
    "joshua": {
        hebrew: "יְהוֹשֻׁעַ", geez: "ኢያሱ", phonetic: "Yehoshua",
        meaning: "Yahweh is Salvation",
        historicalContext: "Moses' successor and the military commander who led Israel across the Jordan and into the Promised Land. His name is the Hebrew original of the name Jesus, foreshadowing a greater conquest (Joshua 1–6).",
        alliance: "The Conqueror of Canaan", category: "hero", place: "Jericho"
    },
    "ruth": {
        hebrew: "רוּת", geez: "ሩት", phonetic: "Rut",
        meaning: "Friendship / Companion",
        historicalContext: "The Moabite widow who pledged herself to Naomi with the famous words 'Your people shall be my people and your God my God' (Ruth 1:16). She became the great-grandmother of David and a witness to covenant loyalty beyond Israel's borders.",
        alliance: "The Faithful Foreigner", category: "hero", place: "Bethlehem"
    },
    "naomi": {
        hebrew: "נָעֳמִי", geez: "ናኦሚ", phonetic: "No'omi",
        meaning: "Pleasant / Sweet",
        historicalContext: "The bereaved mother-in-law of Ruth who returned to Bethlehem empty but found restoration through Ruth's loyalty and Boaz's redemption. She renamed herself Mara ('Bitter') before witnessing the lineage restored (Ruth 1:20).",
        alliance: "The Bitter Turned Sweet", category: "matriarch", place: "Bethlehem"
    },
    "ezra": {
        hebrew: "עֶזְרָא", geez: "እዝራ", phonetic: "Ezra",
        meaning: "Help / Helper",
        historicalContext: "The priest-scribe who led the second wave of returnees from Babylon and reestablished the Torah as the foundation of Jewish life. He read the Law publicly from a wooden platform, sparking national revival (Nehemiah 8).",
        alliance: "The Scribe of the Law", category: "scribe", place: "Jerusalem"
    },
    "jesus": {
        hebrew: "יֵשׁוּעַ", geez: "ኢየሱስ", phonetic: "Yeshua",
        meaning: "Yahweh is Salvation",
        historicalContext: "Announced by the angel Gabriel to Mary and Joseph: 'You shall call his name Jesus, for he will save his people from their sins' (Matthew 1:21). The Greek translation is Iesous.",
        alliance: "The Chief Cornerstone", category: "messiah", place: "Bethlehem"
    },
    "john": {
        hebrew: "יוֹחָנָן", geez: "ዮሐንስ", phonetic: "Yochanan",
        meaning: "Yahweh is Gracious",
        historicalContext: "Applied to John the Baptist breaking centuries of familial naming traditions by divine command (Luke 1:60), and to the Beloved Apostle who penned the Gospel, Epistles, and Revelation.",
        alliance: "The Herald of the New Covenant", category: "prophet", place: "Jordan River"
    },
    "paul": {
        hebrew: "שָׁאוּל / Παῦλος", geez: "ጳውሎስ", phonetic: "Sha'ul / Paulos",
        meaning: "Asked For / Small / Humble",
        historicalContext: "Born Saul ('Asked For'), the Pharisee who persecuted early believers. Following his road to Damascus encounter, he primarily used his Roman name Paul ('Small/Humble') to minister to the Gentile nations.",
        alliance: "Apostle to the Nations", category: "apostle", place: "Ephesus"
    },
    "peter": {
        hebrew: "כֵּיפָא / Πέτρος", geez: "ጴጥሮስ", phonetic: "Kepha / Petros",
        meaning: "Rock / Stone",
        historicalContext: "Born Simon bar-Jonah, renamed by Jesus with the Aramaic name Kepha ('Rock') at Caesarea Philippi (Matthew 16:18). The fisherman who walked on water, denied Christ, and later preached the Pentecost sermon.",
        alliance: "The Foundation Stone", category: "apostle", place: "Capernaum"
    },
    "mary": {
        hebrew: "מִרְיָם", geez: "ማርያም", phonetic: "Miriam",
        meaning: "Wished-for Child / Exalted",
        historicalContext: "The virgin of Nazareth chosen by God to conceive the Messiah by the Holy Spirit (Luke 1:26–38). Her Magnificat ('My soul magnifies the Lord') echoes Hannah's song and establishes the model of humble obedience.",
        alliance: "The Theotokos", category: "matriarch", place: "Nazareth"
    },
    "mary-magdalene": {
        hebrew: "מִרְיָם מִגְדָּל", geez: "ማርያም ማግደላዊት", phonetic: "Miriam Migdal",
        meaning: "Miriam of the Tower",
        historicalContext: "The disciple from whom Jesus cast seven demons (Luke 8:2). She stood at the foot of the cross, witnessed the burial, and was the first to encounter the Risen Christ at the tomb, earning the title 'Apostle to the Apostles.'",
        alliance: "The First Witness of the Resurrection", category: "disciple", place: "Capernaum"
    }
};

var currentCategory = 'all';
var CATEGORY_MAP = {
    all: function() { return true; },
    tribes: function(r) { return r.category === 'tribe'; },
    patriarchs: function(r) { return ['patriarch','matriarch'].indexOf(r.category) !== -1; },
    royalProphetic: function(r) { return ['royal','prophet','judge','hero','scribe'].indexOf(r.category) !== -1; },
    apostolic: function(r) { return ['apostle','messiah','disciple'].indexOf(r.category) !== -1; }
};

window.filterRegistry = function() {
    var query = document.getElementById('onomasticonSearch').value.toLowerCase();
    var rows = document.querySelectorAll('.name-row');
    var fn = CATEGORY_MAP[currentCategory] || CATEGORY_MAP.all;
    rows.forEach(function(row) {
        var name = row.innerText.toLowerCase();
        var key = row.getAttribute('data-key');
        var record = SCRIPTORIUM_ONOMASTICON[key];
        var categoryMatch = fn(record);
        if (name.indexOf(query) !== -1 && categoryMatch) {
            row.style.display = 'block';
        } else {
            row.style.display = 'none';
        }
    });
};

window.setRegistryCategory = function(cat) {
    document.querySelectorAll('.filter-badge').forEach(function(b) { b.classList.remove('active'); });
    currentCategory = cat;
    window.filterRegistry();
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.filter-badge-row').addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-badge')) {
            var category = e.target.getAttribute('data-category');
            window.setRegistryCategory(category);
        }
    });

    function reveal(key, element) {
        document.querySelectorAll('.name-row').forEach(function(r) { r.classList.remove('active'); });
        if (element) element.classList.add('active');
        var record = SCRIPTORIUM_ONOMASTICON[key];
        var sheet = document.getElementById('activeMeaningSheet');
        sheet.style.opacity = '0';
        setTimeout(function() {
            var imgKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/\s+/g, '-');
            var imgSrc = 'assets/images/onomasticon/' + imgKey + '.png';
            sheet.innerHTML =
                '<div class="onom-image-frame">' +
                    '<img src="' + imgSrc + '" alt="' + key + '" onerror="this.outerHTML=\'<span class=\\\"onom-image-placeholder\\\">✦</span>\'">' +
                '</div>' +
                '<div class="onom-text-frame">' +
                    '<h2 class="meaning-title">' + key.toUpperCase().replace(/-/g, ' ') + '</h2>' +
                    '<div class="phonetic-sub">&lsqb;/' + record.phonetic + '/&rsqb;</div>' +
                    '<div class="hebrew-glyph">' + record.hebrew + '</div>' +
                    (record.geez ? '<div class="geez-glyph">' + record.geez + '</div>' : '') +
                    '<div class="data-segment">' +
                        '<h4>ROOT LITERAL MEANING</h4>' +
                        '<p style="color:#fff; font-weight:600; letter-spacing: 0.5px;">' + record.meaning + '</p>' +
                    '</div>' +
                    '<div class="data-segment">' +
                        '<h4>HISTORICAL WITNESS &amp; RECORD</h4>' +
                        '<p>' + record.historicalContext + '</p>' +
                    '</div>' +
                    (record.alliance !== '—' ? '<div class="data-segment">' +
                        '<h4>TRIBAL ALLIANCE COORDINATE</h4>' +
                        '<p class="alliance-text" style="color: var(--gold); font-family:\'Cinzel\'; font-size:1rem;">' + record.alliance + '</p>' +
                    '</div>' : '') +
                    (record.place ? '<div class="data-segment"><a href="map.html?place=' + encodeURIComponent(record.place) + '" class="locate-on-map-btn">🗺 LOCATE ON MAP: ' + record.place.toUpperCase() + '</a></div>' : '') +
                '</div>';
            sheet.style.opacity = '1';
        }, 200);
    }

    function renderRegistryList() {
        var container = document.getElementById('nameListContainer');
        if (!container) return;
        var keys = Object.keys(SCRIPTORIUM_ONOMASTICON).sort();
        var currentLetter = '';
        keys.forEach(function(key) {
            var first = key.charAt(0).toUpperCase();
            if (first !== currentLetter) {
                currentLetter = first;
                var heading = document.createElement('div');
                heading.className = 'registry-section';
                heading.textContent = currentLetter;
                container.appendChild(heading);
            }
            var row = document.createElement('div');
            row.className = 'name-row';
            row.setAttribute('data-key', key);
            row.innerText = key.toUpperCase().replace(/-/g, ' ');
            row.onclick = function() { reveal(key, row); };
            container.appendChild(row);
        });
    }

    renderRegistryList();

    var params = new URLSearchParams(window.location.search);
    var focus = params.get('focus');
    if (focus && SCRIPTORIUM_ONOMASTICON[focus]) {
        var target = document.querySelector('.name-row[data-key="' + focus + '"]');
        if (target) {
            reveal(focus, target);
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
})();
