const TRIBAL_INTEL = {
    'Reuben': { icon: '&#128014;', blessing: 'Unstable as water, you shall not excel.', artifact: 'Reuben\'s territory — Transjordan plateau', region: 'south' },
    'Simeon': { icon: '&#9878;', blessing: 'I will scatter them in Jacob.', artifact: 'Simeon absorbed into Judah by 8th c. BC', region: 'south' },
    'Levi': { icon: '&#10017;', blessing: 'They shall teach Jacob your rules.', artifact: 'High Priest\'s Breastplate — 12 stones', region: 'scattered' },
    'Judah': { icon: '&#129529;', blessing: 'The scepter shall not depart from Judah.', artifact: 'Tel Dan Stele — House of David (c. 840 BC)', region: 'south' },
    'Dan': { icon: '&#128018;', blessing: 'Dan shall judge his people.', artifact: 'Dan city gate — 18th c. BC', region: 'north' },
    'Naphtali': { icon: '&#129420;', blessing: 'He gives beautiful words.', artifact: 'Galilee — ancient Via Maris', region: 'north' },
    'Gad': { icon: '&#128056;', blessing: 'Raided by raiders, but he raids at their heels.', artifact: 'Mishor plateau — Gad\'s inheritance', region: 'east' },
    'Asher': { icon: '&#127806;', blessing: 'His bread shall be rich.', artifact: 'Olive Presses of Galilee — 10th c. BC', region: 'north' },
    'Issachar': { icon: '&#128024;', blessing: 'He bowed his shoulder to bear.', artifact: 'Jezreel Valley — chariot routes', region: 'north' },
    'Zebulun': { icon: '&#128674;', blessing: 'He shall dwell at the shore of the sea.', artifact: 'Phoenician-style sea anchors — Haifa coast', region: 'north' },
    'Joseph': { icon: '&#127855;', blessing: 'Joseph is a fruitful vine.', artifact: 'Ephraim & Manasseh — central highlands', region: 'central' },
    'Benjamin': { icon: '&#128058;', blessing: 'Benjamin is a ravenous wolf.', artifact: 'Central Highlands — Gibeah', region: 'south' }
};

(function initTribalObserver() {
    var sidebar = document.getElementById('tribalSidebar');
    var cardIcon = document.getElementById('cardIcon');
    var cardName = document.getElementById('cardName');
    var cardBlessing = document.getElementById('cardBlessing');
    var cardArtifact = document.getElementById('cardArtifact');

    var nodes = document.querySelectorAll('[data-tribe]');
    if (nodes.length === 0) return;

    sidebar.classList.add('visible');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var tribe = entry.target.getAttribute('data-tribe');
            var info = TRIBAL_INTEL[tribe];
            if (!info) return;

            cardIcon.innerHTML = info.icon;
            cardName.textContent = tribe.toUpperCase();
            cardBlessing.textContent = '"' + info.blessing + '"';
            cardArtifact.textContent = '\uD83D\uDCDC ' + info.artifact;

            document.querySelectorAll('.mini-territory').forEach(function(t) {
                t.classList.remove('active');
                if (t.getAttribute('data-territory') === tribe) {
                    t.classList.add('active');
                }
            });

            var exile = document.getElementById('node-jeconiah');
            if (exile && entry.target.compareDocumentPosition(exile) & Node.DOCUMENT_POSITION_FOLLOWING) {
                document.querySelectorAll('.mini-territory').forEach(function(t) {
                    var reg = TRIBAL_INTEL[t.getAttribute('data-territory')];
                    if (reg && reg.region === 'north') t.classList.add('shattered');
                });
            } else {
                document.querySelectorAll('.mini-territory.shattered').forEach(function(t) {
                    t.classList.remove('shattered');
                });
            }
        });
    }, { threshold: 0.4 });

    nodes.forEach(function(n) { observer.observe(n); });
})();

const LEXICON = {
    'ADAM': { heb: 'אָדָם', gez: 'አዳም', root: 'Of the ground / Mankind' },
    'SETH': { heb: 'שֵׁת', gez: 'ሴት', root: 'Appointed / Placed' },
    'ENOSH': { heb: 'אֱנוֹשׁ', gez: 'ሄኖስ', root: 'Mortal / Human' },
    'CAINAN': { heb: 'קֵינָן', gez: 'ቃይናን', root: 'Possession' },
    'MAHALALEL': { heb: 'מַהֲלַלְאֵל', gez: 'ማህላልኤል', root: 'Praise of God' },
    'JARED': { heb: 'יֶרֶד', gez: 'ያሬድ', root: 'Descent' },
    'ENOCH': { heb: 'חֲנוֹךְ', gez: 'ሄኖክ', root: 'Initiated / Dedicated' },
    'METHUSELAH': { heb: 'מְתוּשֶׁלַח', gez: 'ማቱሳላ', root: 'Man of the dart' },
    'LAMECH': { heb: 'לֶמֶךְ', gez: 'ላሜክ', root: 'Powerful / Wild man' },
    'NOAH': { heb: 'נֹחַ', gez: 'ኖኅ', root: 'Rest / Comfort' },
    'SHEM': { heb: 'שֵׁם', gez: 'ሴም', root: 'Name / Renown' },
    'ABRAHAM': { heb: 'אַבְרָהָם', gez: 'አብርሃም', root: 'Father of a Multitude' },
    'ISAAC': { heb: 'יִצְחָק', gez: 'ይስሐቅ', root: 'He Laughs' },
    'JACOB': { heb: 'יַעֲקֹב', gez: 'ያዕቆብ', root: 'Supplanter / Heel-holder' },
    'JUDAH': { heb: 'יְהוּדָה', gez: 'ይሁዳ', root: 'Praise' },
    'DAVID': { heb: 'דָּוִד', gez: 'ዳዊት', root: 'Beloved One' },
    'SOLOMON': { heb: 'שְׁלֹמֹה', gez: 'ሰሎሞን', root: 'Peaceful' },
    'ZERUBBABEL': { heb: 'זְרֻבָּבֶל', gez: 'ዘሩባቤል', root: 'Seed of Babylon' },
    'ARPACHSHAD': { heb: 'אַרְפַּכְשַׁד', gez: 'አርፋክስድ', root: 'Healer / Boundary Breaker' },
    'SHELAH': { heb: 'שֵׁלָה', gez: 'ሴላህ', root: 'Petition / Sprout' },
    'EBER': { heb: 'עֵבֶר', gez: 'ኤበር', root: 'Crossing Over / Region Beyond' },
    'PELEG': { heb: 'פֶּלֶג', gez: 'ፋሌግ', root: 'Division / Channel' },
    'REU': { heb: 'רְעוּ', gez: 'ራጉ', root: 'Friend / Shepherd' },
    'SERUG': { heb: 'שְׂרוּג', gez: 'ሰሩግ', root: 'Branch / Vine Tendril' },
    'NAHOR': { heb: 'נָחוֹר', gez: 'ናሆር', root: 'Snorting / Flaring Nostril' },
    'TERAH': { heb: 'תֶּרַח', gez: 'ታራህ', root: 'Delay / Wanderer' },
    'PEREZ': { heb: 'פֶּרֶץ', gez: 'ፋሬጽ', root: 'Breach / Bursting Forth' },
    'HEZRON': { heb: 'חֶצְרוֹן', gez: 'ሔጽሮን', root: 'Enclosed / Surrounded by a Wall' },
    'RAM': { heb: 'רָם', gez: 'ራም', root: 'Exalted / High' },
    'AMMINADAB': { heb: 'עַמִּינָדָב', gez: 'አምሚናዳብ', root: 'My People Are Noble / My Kinsman is Willing' },
    'NAHSHON': { heb: 'נַחְשׁוֹן', gez: 'ናህሾን', root: 'Enchanter / Oracle Diviner' },
    'SALMON': { heb: 'שַׂלְמוֹן', gez: 'ሳልሞን', root: 'Clothing / Peaceable Vesture' },
    'BOAZ': { heb: 'בֹּעַז', gez: 'ቦአዝ', root: 'In Him Is Strength / Swift Strength' },
    'OBED': { heb: 'עוֹבֵד', gez: 'ዖበድ', root: 'Servant / Worshiper' },
    'JESSE': { heb: 'יִשַׁי', gez: 'ኢሳይ', root: 'Gift / Husband' },
    'REHOBOAM': { heb: 'רְחַבְעָם', gez: 'ርህብዓም', root: 'A People Has Enlarged / Widening of the People' },
    'ABIJAH': { heb: 'אֲבִיָּם', gez: 'አብያም', root: 'My Father Is Yahweh' },
    'ASA': { heb: 'אָסָא', gez: 'አሳ', root: 'Healer / Physician' },
    'JEHOSHAPHAT': { heb: 'יְהוֹשָׁפָט', gez: 'ይሁሻፋጥ', root: 'Yahweh Has Judged' },
    'JEHORAM': { heb: 'יְהוֹרָם', gez: 'ይሁራም', root: 'Yahweh Is Exalted' },
    'AHAZIAH': { heb: 'אֲחַזְיָה', gez: 'አህዝያሁ', root: 'Yahweh Has Grasped / Possessed' },
    'JOASH': { heb: 'יוֹאָשׁ', gez: 'ዮአሽ', root: 'Yahweh Gives / Fire of Yahweh' },
    'AMAZIAH': { heb: 'אֲמַצְיָה', gez: 'አምጽያሁ', root: 'Yahweh Is Mighty / Strengthened by Yahweh' },
    'UZZIAH': { heb: 'עֻזִּיָּה', gez: 'ኡዝያሁ', root: 'Yahweh Is My Strength' },
    'JOTHAM': { heb: 'יוֹתָם', gez: 'ዮጣም', root: 'Yahweh Is Perfect / Complete' },
    'AHAZ': { heb: 'אָחָז', gez: 'አሐዝ', root: 'He Has Grasped / Possessor' },
    'HEZEKIAH': { heb: 'חִזְקִיָּה', gez: 'ሕዝቅያስ', root: 'Yahweh Is My Strength' },
    'MANASSEH': { heb: 'מְנַשֶּׁה', gez: 'ምናሴ', root: 'Causing to Forget' },
    'AMON': { heb: 'אָמוֹן', gez: 'አሞን', root: 'Master Workman / Faithful' },
    'JOSIAH': { heb: 'יֹאשִׁיָּה', gez: 'ዮስያስ', root: 'Yahweh Supports / Healed by Yahweh' },
    'JECONIAH': { heb: 'יְכָנְיָה', gez: 'ይኮንያስ', root: 'Yahweh Will Establish' },
    'SHEALTIEL': { heb: 'שְׁאַלְתִּיאֵל', gez: 'ሳልትኤል', root: 'I Have Asked of God' },
    'ABIHUD': { heb: 'אֲבִיהוּד', gez: 'አብሁድ', root: 'My Father Is Majesty' },
    'ELIAKIM': { heb: 'אֶלְיָקִים', gez: 'ኤልያቄም', root: 'God Will Raise Up' },
    'AZOR': { heb: 'אָזוֹר', gez: 'አዞር', root: 'Helper / Gatherer' },
    'ZADOK': { heb: 'צָדוֹק', gez: 'ጻዶቅ', root: 'Righteous / Justified' },
    'ACHIM': { heb: 'אָכִים', gez: 'አኪም', root: 'Yahweh Has Set / Appointed' },
    'ELIUD': { heb: 'Ἐλιούδ', gez: 'ኤልዩድ', root: 'God Is My Majesty' },
    'ELEAZAR': { heb: 'אֶלְעָזָר', gez: 'ኤልዓዛር', root: 'God Has Helped' },
    'MATTHAN': { heb: 'מַתָּן', gez: 'ማታን', root: 'Gift / Giving' },
    'JACOB (father of Joseph)': { heb: 'יַעֲקֹב', gez: 'ያዕቆብ', root: 'Supplanter / Heel-holder' },
    'JOSEPH': { heb: 'יוֹסֵף', gez: 'ዮሴፍ', root: 'He Will Add / Increase' },
    'YESHUA': { heb: 'יֵשׁוּעַ', gez: 'ኢየሱስ', root: 'Yahweh Is Salvation' },
    'MELCHIZEDEK': { heb: 'מַלְכִּי־צֶדֶק', gez: 'ሜልከጼዴቅ', root: 'King of Righteousness / My King Is Righteous' },
    'CAIN': { heb: 'קַיִן', gez: 'ቃየን', root: 'Acquired / Spear' },
    'ABEL': { heb: 'הֶבֶל', gez: 'ሀቤል', root: 'Vapor / Breath / Transience' },
    'EVE': { heb: 'חַוָּה', gez: 'ሔዋን', root: 'Life / Living One' },
    'SARAH': { heb: 'שָׂרָה', gez: 'ሳራ', root: 'Princess / Noblewoman' },
    'TAMAR': { heb: 'תָּמָר', gez: 'ታማር', root: 'Palm Tree' },
    'RAHAB': { heb: 'רָחָב', gez: 'ራክዓብ', root: 'Broad / Spacious' },
    'RUTH': { heb: 'רוּת', gez: 'ሩት', root: 'Friendship / Companion' },
    'BATHSHEBA': { heb: 'בַּת־שֶׁבַע', gez: 'ባትሸባ', root: 'Daughter of the Oath / Seventh Daughter' },
    'MARY': { heb: 'מִרְיָם', gez: 'ማርያም', root: 'Beloved / Exalted One / Star of the Sea' },
    'QUEEN OF SHEBA': { heb: 'מַלְכַּת שְׁבָא', gez: 'ንግሥተ ሳባ', root: 'Queen of the South — Makeda, the Ethiopian queen' },
    'MENELIK I': { heb: 'מְנֶלֶךְ', gez: 'ምኒልክ', root: 'Son of the Wise Man — Ebna La-Hakim' },
    'EZANA': { heb: 'אֶזָנָה', gez: 'ዔዛና', root: 'He Who Shines — First Christian emperor of Axum' },
    'GEBRE MESKEL': { heb: 'גֶבְרֶה מֶסְקֶל', gez: 'ገብረ መስቀል', root: 'Servant of the Cross' },
    'LALIBELA': { heb: 'לָלִיבֶּלָה', gez: 'ላሊበላ', root: 'The Bees Acknowledge Him — King of the Zagwe dynasty' },
    'YEKUNO AMLAK': { heb: 'יֶקוּנוֹ אַמְלָק', gez: 'ይኩኖ አምላክ', root: 'May God Establish — Restorer of the Solomonic line' },
    'ZARA YACOB': { heb: 'זָרָה יַעֲקֹב', gez: 'ዘርዐ ያዕቆብ', root: 'Seed of Jacob — Reformer and religious consolidator' },
    'FASILIDES': { heb: 'פָסִילִידֶס', gez: 'ፋሲልደስ', root: 'The Powerful — Gondar castle builder' },
    'TEWODROS II': { heb: 'תֵאוֹדְרוֹס', gez: 'ቴዎድሮስ', root: 'Gift of God — Last Solomonic emperor of the medieval line' },
    'MENELIK II': { heb: 'מְנֶלֶךְ הַשֵּׁנִי', gez: 'ዳግማዊ ምኒልክ', root: 'Son of the Wise Man — Victor of Adwa, modernizer' },
    'HAILE SELASSIE I': { heb: 'הַיְלֶה סֶלַאסִּיֶה', gez: 'ቀዳማዊ ኃይለ ሥላሴ', root: 'Power of the Trinity — The last emperor of the Solomonic dynasty' }
};

(function initLinguisticLab() {
    var lab = document.getElementById('linguisticLab');
    var hebEl = document.getElementById('hebName');
    var gezEl = document.getElementById('gezName');
    var rootEl = document.getElementById('rootMeaning');
    var labelEl = document.getElementById('nameLabel');

    var nodes = document.querySelectorAll('[data-linguistic]');
    if (nodes.length === 0) return;

    setTimeout(function() { lab.classList.add('visible'); }, 2000);

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var key = entry.target.getAttribute('data-linguistic');
            var entry_lex = LEXICON[key];
            if (!entry_lex) return;

            hebEl.classList.add('morphing');
            gezEl.classList.add('morphing');

            clearTimeout(entry._morphTimer);
            entry._morphTimer = setTimeout(function() {
                hebEl.textContent = entry_lex.heb;
                gezEl.textContent = entry_lex.gez;
                rootEl.textContent = entry_lex.root;
                labelEl.textContent = key;
                hebEl.classList.remove('morphing');
                gezEl.classList.remove('morphing');
            }, 300);
        });
    }, { threshold: 0.3 });

    nodes.forEach(function(n) { observer.observe(n); });
})();

window.openLinguisticLab = function(key) {
    var entry = LEXICON[key];
    if (!entry) return;
    var lab = document.getElementById('linguisticLab');
    var hebEl = document.getElementById('hebName');
    var gezEl = document.getElementById('gezName');
    var rootEl = document.getElementById('rootMeaning');
    var labelEl = document.getElementById('nameLabel');
    if (!lab || !hebEl) return;
    hebEl.textContent = entry.heb;
    gezEl.textContent = entry.gez;
    rootEl.textContent = entry.root;
    labelEl.textContent = key;
    lab.classList.add('visible');
    setTimeout(function() {
        lab.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 200);
};
var pathActive = false;

function toggleMessianicPath() {
    pathActive = !pathActive;
    var btn = document.getElementById('messianicToggle');

    if (pathActive) {
        document.body.classList.add('messianic-view');
        if (!localStorage.getItem('messianic_path_viewed')) {
            localStorage.setItem('messianic_path_viewed', 'true');
            if (window.checkAchievements) setTimeout(checkAchievements, 500);
        }
        btn.innerHTML = '&#9812; VIEW FULL TREE';
        btn.classList.add('active');
        if (window.ScriptoriumAudio) ScriptoriumAudio.transitionTo('nt');
        drawMessianicSpine();
    } else {
        document.body.classList.remove('messianic-view');
        btn.innerHTML = '&#9812; REVEAL THE SEED';
        btn.classList.remove('active');
        if (window.ScriptoriumAudio) ScriptoriumAudio.transitionTo('ot');
        var spine = document.getElementById('messianicSpine');
        if (spine) spine.innerHTML = '';
    }
}

function drawMessianicSpine() {
    var svg = document.getElementById('messianicSpine');
    if (!svg) return;
    var nodes = document.querySelectorAll('.genealogy-node.messianic');
    if (nodes.length < 2) return;

    var svgRect = svg.getBoundingClientRect();
    var path = '';
    nodes.forEach(function(node, i) {
        var rect = node.getBoundingClientRect();
        var x = rect.left + rect.width / 2 - svgRect.left;
        var y = rect.top + rect.height / 2 - svgRect.top;
        path += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
    });

    var pw = svg.parentNode ? svg.parentNode.scrollWidth : window.innerWidth;
    var ph = svg.parentNode ? svg.parentNode.scrollHeight : window.innerHeight;
    svg.setAttribute('viewBox', '0 0 ' + pw + ' ' + ph);
    svg.setAttribute('width', pw);
    svg.setAttribute('height', ph);
    svg.innerHTML = '<path d="' + path + '" stroke="rgba(212,175,55,0.85)" stroke-width="2" fill="none" stroke-dasharray="8,4" stroke-linejoin="round"/>' +
                    '<path d="' + path + '" stroke="rgba(212,175,55,0.08)" stroke-width="6" fill="none" stroke-linejoin="round" filter="url(#glow)"/>';
}

window.addEventListener('scroll', function() {
    if (document.body.classList.contains('messianic-view')) drawMessianicSpine();
});
window.addEventListener('resize', function() {
    if (document.body.classList.contains('messianic-view')) drawMessianicSpine();
});

// Linguistic hover-to-reveal: transform <h3> into name-container
(function() {
    var LEX = {
        'ADAM': { heb: '\u05D0\u05B8\u05D3\u05B8\u05DD', gez: '\u1220\u12F5\u12EB' },
        'SETH': { heb: '\u05E9\u05B5\u05C1\u05EA', gez: '\u1234\u1275' },
        'ENOSH': { heb: '\u05D0\u05B1\u05E0\u05D5\u05B9\u05E9\u05C1', gez: '\u1204\u1295\u12ED\u1235' },
        'CAINAN': { heb: '\u05E7\u05B5\u05D9\u05E0\u05B8\u05DF', gez: '\u12F3\u12ED\u1293\u1295' },
        'MAHALALEL': { heb: '\u05DE\u05B7\u05D4\u05B2\u05DC\u05B7\u05DC\u05B0\u05D0\u05B5\u05DC', gez: '\u121B\u1205\u120B\u120D\u12A4\u120D' },
        'JARED': { heb: '\u05D9\u05B6\u05E8\u05B6\u05D3', gez: '\u12E8\u122D\u12F5' },
        'ENOCH': { heb: '\u05D7\u05B2\u05E0\u05D5\u05B9\u05DA\u05B0', gez: '\u1204\u1295\u12AD' },
        'METHUSELAH': { heb: '\u05DE\u05B0\u05EA\u05D5\u05BC\u05E9\u05B6\u05C1\u05DC\u05B7\u05D7', gez: '\u121B\u1270\u1233\u120B' },
        'LAMECH': { heb: '\u05DC\u05B6\u05DE\u05B6\u05DA\u05B0', gez: '\u120B\u121C\u12AD' },
        'NOAH': { heb: '\u05E0\u05B9\u05D7\u05B7', gez: '\u1295\u122D' },
        'SHEM': { heb: '\u05E9\u05B5\u05C1\u05DD', gez: '\u1234\u121D' },
        'ARPACHSHAD': { heb: '\u05D0\u05B7\u05E8\u05B0\u05E4\u05BC\u05B7\u05DB\u05B0\u05E9\u05C1\u05B7\u05D3', gez: '\u12A0\u122D\u134D\u12AD\u1233\u12F5' },
        'SHELAH': { heb: '\u05E9\u05B5\u05C1\u05DC\u05B8\u05D4', gez: '\u1234\u120B\u1205' },
        'EBER': { heb: '\u05E2\u05B5\u05D1\u05B6\u05E8', gez: '\u12A4\u1265\u122D' },
        'PELEG': { heb: '\u05E4\u05BC\u05B6\u05DC\u05B6\u05D2', gez: '\u134D\u120C\u12F5' },
        'REU': { heb: '\u05E8\u05B0\u05E2\u05D5\u05BC', gez: '\u1228\u130E' },
        'SERUG': { heb: '\u05E9\u05C2\u05B0\u05E8\u05D5\u05BC\u05D2', gez: '\u1230\u1228\u130D' },
        'NAHOR': { heb: '\u05E0\u05B8\u05D7\u05D5\u05B9\u05E8', gez: '\u1293\u1206\u122D' },
        'TERAH': { heb: '\u05EA\u05BC\u05B6\u05E8\u05B7\u05D7', gez: '\u1273\u1228\u1205' },
        'ABRAHAM': { heb: '\u05D0\u05B7\u05D1\u05B0\u05E8\u05B8\u05D4\u05B8\u05DD', gez: '\u12A0\u1265\u122D\u1203\u121D' },
        'ISAAC': { heb: '\u05D9\u05B4\u05E6\u05B0\u05D7\u05B8\u05E7', gez: '\u12E5\u1235\u1210\u1245' },
        'JACOB': { heb: '\u05D9\u05B7\u05E2\u05B2\u05E7\u05B9\u05D1', gez: '\u12E8\u12E2\u1246\u1265' },
        'JUDAH': { heb: '\u05D9\u05B0\u05D4\u05D5\u05BC\u05D3\u05B8\u05D4', gez: '\u12E8\u1203\u12F3' },
        'PEREZ': { heb: '\u05E4\u05BC\u05B6\u05E8\u05B6\u05E5', gez: '\u134D\u122D\u14D5' },
        'HEZRON': { heb: '\u05D7\u05B6\u05E6\u05B0\u05E8\u05D5\u05B9\u05DF', gez: '\u1200\u14DA\u122D\u12AE\u1295' },
        'RAM': { heb: '\u05E8\u05B8\u05DD', gez: '\u1228\u121D' },
        'AMMINADAB': { heb: '\u05E2\u05B7\u05DE\u05BC\u05B4\u05D9\u05E0\u05B8\u05D3\u05B8\u05D1', gez: '\u12A0\u121D\u1293\u12F3\u1265' },
        'NAHSHON': { heb: '\u05E0\u05B7\u05D7\u05B0\u05E9\u05C1\u05D5\u05B9\u05DF', gez: '\u1293\u1206\u1234\u12AE\u1295' },
        'SALMON': { heb: '\u05E9\u05C2\u05B7\u05DC\u05B0\u05DE\u05D5\u05B9\u05DF', gez: '\u1233\u120D\u121D\u12AE\u1295' },
        'BOAZ': { heb: '\u05D1\u05BC\u05B9\u05E2\u05B7\u05D6', gez: '\u1261\u12A0\u14DA' },
        'OBED': { heb: '\u05E2\u05D5\u05B9\u05D1\u05B5\u05D3', gez: '\u12D2\u1265\u12F5' },
        'JESSE': { heb: '\u05D9\u05B4\u05E9\u05C1\u05B7\u05D9', gez: '\u12A5\u1233\u12ED' },
        'DAVID': { heb: '\u05D3\u05B8\u05BC\u05D5\u05B4\u05D3', gez: '\u12F3\u12CB\u1275' },
        'SOLOMON': { heb: '\u05E9\u05B0\u05C1\u05DC\u05B9\u05DE\u05B9\u05D4', gez: '\u1230\u1208\u121D\u1295' },
        'REHOBOAM': { heb: '\u05E8\u05B0\u05D7\u05B7\u05D1\u05B0\u05E2\u05B8\u05DD', gez: '\u122D\u1205\u1265\u12D3\u121D' },
        'ABIJAH': { heb: '\u05D0\u05B2\u05D1\u05B4\u05D9\u05BC\u05B8\u05DD', gez: '\u12A0\u1265\u12ED\u12ED\u12EB\u121D' },
        'ASA': { heb: '\u05D0\u05B8\u05E1\u05B8\u05D0', gez: '\u12A0\u1233' },
        'JEHOSHAPHAT': { heb: '\u05D9\u05B0\u05D4\u05D5\u05B9\u05E9\u05C1\u05B8\u05E4\u05B8\u05D8', gez: '\u12E8\u1206\u1234\u134D\u1433\u1275' },
        'JEHORAM': { heb: '\u05D9\u05B0\u05D4\u05D5\u05B9\u05E8\u05B8\u05DD', gez: '\u12E8\u1206\u1228\u121D' },
        'AHAZIAH': { heb: '\u05D0\u05B2\u05D7\u05B7\u05D6\u05B0\u05D9\u05B8\u05D4', gez: '\u12A0\u1205\u12DA\u12ED\u12EB' },
        'JOASH': { heb: '\u05D9\u05D5\u05B9\u05D0\u05B8\u05E9\u05C1', gez: '\u12EE\u12A0\u1234' },
        'AMAZIAH': { heb: '\u05D0\u05B2\u05DE\u05B7\u05E6\u05B0\u05D9\u05B8\u05D4', gez: '\u12A0\u121D\u14D0\u12ED\u12EB' },
        'UZZIAH': { heb: '\u05E2\u05BB\u05D6\u05BC\u05B4\u05D9\u05BC\u05B8\u05D4', gez: '\u12A5\u14DA\u12ED\u12EB' },
        'JOTHAM': { heb: '\u05D9\u05D5\u05B9\u05EA\u05B8\u05DD', gez: '\u12EE\u14D3\u121D' },
        'AHAZ': { heb: '\u05D0\u05B8\u05D7\u05B8\u05D6', gez: '\u12A0\u1200\u14DA' },
        'HEZEKIAH': { heb: '\u05D7\u05B4\u05D6\u05B0\u05E7\u05B4\u05D9\u05BC\u05B8\u05D4', gez: '\u1200\u12DA\u1240\u12ED\u12EB' },
        'MANASSEH': { heb: '\u05DE\u05B0\u05E0\u05B7\u05E9\u05C1\u05BC\u05B6\u05D4', gez: '\u121B\u1293\u1234' },
        'AMON': { heb: '\u05D0\u05B8\u05DE\u05D5\u05B9\u05DF', gez: '\u12A0\u121D\u12AE\u1295' },
        'JOSIAH': { heb: '\u05D9\u05B9\u05D0\u05E9\u05C1\u05B4\u05D9\u05BC\u05B8\u05D4', gez: '\u12EE\u1234\u12ED\u12EB' },
        'JECONIAH': { heb: '\u05D9\u05B0\u05DB\u05B8\u05E0\u05B0\u05D9\u05B8\u05D4', gez: '\u12E8\u12AE\u1295\u12ED\u12EB' },
        'SHEALTIEL': { heb: '\u05E9\u05B0\u05C1\u05D0\u05B7\u05DC\u05B0\u05EA\u05BC\u05B4\u05D9\u05D0\u05B5\u05DC', gez: '\u1234\u12A0\u120D\u1274\u12A4\u120D' },
        'ZERUBBABEL': { heb: '\u05D6\u05B0\u05E8\u05BB\u05D1\u05B8\u05D1\u05B6\u05DC', gez: '\u12D8\u1228\u1263\u1260\u1208' },
        'ABIHUD': { heb: '\u05D0\u05B2\u05D1\u05B4\u05D9\u05D4\u05D5\u05BC\u05D3', gez: '\u12A0\u1265\u1209\u12F5' },
        'ELIAKIM': { heb: '\u05D0\u05B6\u05DC\u05B0\u05D9\u05B8\u05E7\u05B4\u05D9\u05DD', gez: '\u12A4\u120D\u12ED\u12EB\u1240\u12ED\u121D' },
        'AZOR': { heb: '\u05D0\u05B8\u05D6\u05D5\u05B9\u05E8', gez: '\u12A0\u12EE\u122D' },
        'ZADOK': { heb: '\u05E6\u05B8\u05D3\u05D5\u05B9\u05E7', gez: '\u14D0\u12F3\u1240' },
        'ACHIM': { heb: '\u05D0\u05B8\u05DB\u05B4\u05D9\u05DD', gez: '\u12A0\u12AD\u12ED\u121D' },
        'ELIUD': { heb: '\u1F18\u03BB\u03B9\u03BF\u03CD\u03B4', gez: '\u12A4\u120D\u12ED\u12ED\u12F5' },
        'ELEAZAR': { heb: '\u05D0\u05B6\u05DC\u05B0\u05E2\u05B8\u05D6\u05B8\u05E8', gez: '\u12A4\u120D\u12D3\u12DA\u122D' },
        'MATTHAN': { heb: '\u05DE\u05B7\u05EA\u05BC\u05B8\u05DF', gez: '\u121B\u1273\u1295' },
        'JOSEPH': { heb: '\u05D9\u05D5\u05B9\u05E1\u05B5\u05E3', gez: '\u12EE\u1234\u134D' },
        'YESHUA': { heb: '\u05D9\u05B5\u05E9\u05C1\u05D5\u05BC\u05E2\u05B7', gez: '\u12A5\u12E8\u1233\u12F5' },
        'MELCHIZEDEK': { heb: '\u05DE\u05B7\u05DC\u05B0\u05DB\u05BC\u05B4\u05D9\u05BE\u05E6\u05B6\u05D3\u05B6\u05E7', gez: '\u121C\u120D\u12A8\u14F0\u12F5\u1240' },
        'CAIN': { heb: '\u05E7\u05B7\u05D9\u05B4\u05DF', gez: '\u1243\u12ED\u1295' },
        'ABEL': { heb: '\u05D4\u05B6\u05D1\u05B6\u05DC', gez: '\u1200\u1265\u1208' },
        'EVE': { heb: '\u05D7\u05B7\u05D5\u05BC\u05B8\u05D4', gez: '\u1200\u12CB\u1295' },
        'SARAH': { heb: '\u05E9\u05C2\u05B8\u05E8\u05B8\u05D4', gez: '\u1233\u1228' },
        'TAMAR': { heb: '\u05EA\u05BC\u05B8\u05DE\u05B8\u05E8', gez: '\u1273\u121B\u122D' },
        'RAHAB': { heb: '\u05E8\u05B8\u05D7\u05B8\u05D1', gez: '\u1228\u12ED\u12A0\u1265' },
        'RUTH': { heb: '\u05E8\u05D5\u05BC\u05EA', gez: '\u1228\u1275' },
        'BATHSHEBA': { heb: '\u05D1\u05BC\u05B7\u05EA\u05BE\u05E9\u05C1\u05B6\u05D1\u05B7\u05E2', gez: '\u1261\u1273\u1234\u1265\u12D3' },
        'MARY': { heb: '\u05DE\u05B4\u05E8\u05B0\u05D9\u05B8\u05DD', gez: '\u121B\u122D\u12ED\u12EB\u121D' },
        'LOT': { heb: '\u05DC\u05D5\u05B9\u05D8', gez: '\u120B\u1433' },
        'ISHMAEL': { heb: '\u05D9\u05B4\u05E9\u05C1\u05B0\u05DE\u05B8\u05E2\u05B5\u05D0\u05B5\u05DC', gez: '\u12A5\u1234\u121C\u12A4\u120D' },
        'ESAU': { heb: '\u05E2\u05B5\u05E9\u05C2\u05B8\u05D5', gez: '\u12A4\u1233\u12CB' },
        'QUEEN OF SHEBA': { heb: '\u05DE\u05B7\u05DC\u05B0\u05DB\u05BC\u05B7\u05EA \u05E9\u05B0\u05C1\u05D1\u05B8\u05D0', gez: '\u1295\u130D\u1235\u1275 \u1233\u1265' },
        'MENELIK I': { heb: '\u05DE\u05B0\u05E0\u05B6\u05DC\u05B6\u05DA\u05B0', gez: '\u121D\u1295\u12ED\u120D\u12AD' },
        'EZANA': { heb: '\u05D0\u05B6\u05D6\u05B8\u05E0\u05B8\u05D4', gez: '\u12D4\u14DA\u1295\u12EB' },
        'GEBRE MESKEL': { heb: '\u05D2\u05BC\u05B6\u05D1\u05B0\u05E8\u05B6\u05D4 \u05DE\u05B6\u05E1\u05B0\u05E7\u05B6\u05DC', gez: '\u1308\u1265\u1228 \u1218\u1235\u1240\u120D' },
        'LALIBELA': { heb: '\u05DC\u05B8\u05DC\u05B4\u05D9\u05D1\u05BC\u05B6\u05DC\u05B8\u05D4', gez: '\u120B\u1208\u1265\u120B' },
        'YEKUNO AMLAK': { heb: '\u05D9\u05B6\u05E7\u05D5\u05BC\u05E0\u05D5\u05B9 \u05D0\u05B7\u05DE\u05B0\u05DC\u05B8\u05E7', gez: '\u12ED\u12AE\u1295\u12EE \u12A0\u121D\u120B\u12AD' },
        'ZARA YACOB': { heb: '\u05D6\u05B8\u05E8\u05B8\u05D4 \u05D9\u05B7\u05E2\u05B2\u05E7\u05B9\u05D1', gez: '\u12F0\u122D\u12D3 \u12E8\u12E2\u1246\u1265' },
        'FASILIDES': { heb: '\u05E4\u05BC\u05B8\u05E1\u05B4\u05D9\u05DC\u05B4\u05D9\u05D3\u05B6\u05E1', gez: '\u134D\u1234\u120D\u12F5\u1235' },
        'TEWODROS II': { heb: '\u05EA\u05BC\u05B5\u05D0\u05D5\u05B9\u05D3\u05B0\u05E8\u05D5\u05B9\u05E1', gez: '\u1274\u12EE\u12F5\u1228\u1235' },
        'MENELIK II': { heb: '\u05DE\u05B0\u05E0\u05B6\u05DC\u05B6\u05DA\u05B0 \u05D4\u05B7\u05E9\u05BC\u05B5\u05C1\u05E0\u05B4\u05D9', gez: '\u12F3\u130D\u121B\u12CB \u121D\u1295\u12ED\u120D\u12AD' },
        'HAILE SELASSIE I': { heb: '\u05D4\u05B7\u05D9\u05B0\u05DC\u05B6\u05D4 \u05E1\u05B6\u05DC\u05B7\u05D0\u05E1\u05B4\u05BC\u05D9\u05B6\u05D4', gez: '\u1240\u12F3\u121B\u12CB \u12C3\u120B \u1233\u120C\u1234' }
    };

    document.querySelectorAll('.genealogy-node').forEach(function(node) {
        var h3 = node.querySelector('.node-content h3');
        if (!h3) return;
        var name = h3.textContent.trim().toUpperCase();
        var entry = LEX[name];
        if (!entry) return;
        var container = document.createElement('div');
        container.className = 'name-container';
        var modern = document.createElement('span');
        modern.className = 'modern-name';
        modern.textContent = h3.textContent.trim();
        var ancient = document.createElement('div');
        ancient.className = 'ancient-scripts';
        ancient.innerHTML = '<span class="lang-heb">' + entry.heb + '</span><span class="lang-gez">' + entry.gez + '</span>';
        container.appendChild(modern);
        container.appendChild(ancient);
        h3.parentNode.replaceChild(container, h3);
    });
})();

// ═══════════════════════════════════════
// TYPOLOGY DATA & OVERLAY
// ═══════════════════════════════════════
const TYPOLOGY = {
    'ADAM': { type: 'Christ as the Last Adam', ref: 'Romans 5:14, 1 Corinthians 15:45', desc: 'As Adam brought death through one act of disobedience, Christ brings life through one act of righteousness.' },
    'SETH': { type: 'The Appointed Seed', ref: 'Genesis 4:25', desc: 'Seth replaces Abel as the promised seed — a type of Christ who replaces the old covenant with the new.' },
    'NOAH': { type: 'Salvation Through Judgment', ref: '1 Peter 3:20-21', desc: 'As Noah passed through the waters of judgment into a new creation, baptism prefigures salvation through Christ.' },
    'MELCHIZEDEK': { type: 'Priest-King', ref: 'Hebrews 7:1-17', desc: 'The priest-king of Salem who blessed Abraham. A type of Christ\'s eternal priesthood, not by lineage but by divine appointment.' },
    'ABRAHAM': { type: 'Father of Faith', ref: 'Galatians 3:6-9, Romans 4:1-25', desc: 'Abraham believed God and it was credited as righteousness. He is the prototype of all who are justified by faith.' },
    'ISAAC': { type: 'The Beloved Sacrifice', ref: 'Hebrews 11:17-19', desc: 'Isaac carried the wood for his own sacrifice, as Christ carried His cross. Abraham\'s willingness to sacrifice Isaac prefigures God the Father giving His Son.' },
    'JACOB': { type: 'The Chosen Supplanter', ref: 'Romans 9:10-13', desc: 'Jacob was chosen before birth, not by works. A type of election by grace. His ladder vision prefigures Christ as the bridge between heaven and earth.' },
    'JUDAH': { type: 'The Lion of the Tribe', ref: 'Revelation 5:5', desc: 'The scepter belongs to Judah. Christ is the Lion of Judah who alone is worthy to open the scroll.' },
    'BOAZ': { type: 'The Kinsman-Redeemer', ref: 'Ruth 4:1-10', desc: 'Boaz redeems Ruth by paying the price and taking her as his bride. Christ redeems His Church as the greater Kinsman-Redeemer.' },
    'DAVID': { type: 'The Shepherd King', ref: 'Ezekiel 34:23-24, John 10:11', desc: 'David the shepherd-king prefigures Christ the Good Shepherd who lays down His life for the sheep and reigns forever.' },
    'SOLOMON': { type: 'The Prince of Peace', ref: 'Matthew 12:42, Isaiah 9:6', desc: 'Solomon built the Temple and ruled in wisdom. Christ builds the spiritual temple and is Wisdom incarnate. The Queen of Sheba prefigures the Gentiles seeking Christ.' },
    'ZERUBBABEL': { type: 'The Restorer', ref: 'Haggai 2:23, Zechariah 4:6-10', desc: 'Zerubbabel rebuilt the Temple after exile. A type of Christ who restores the house of God and rebuilds what was broken.' },
    'JOSEPH (guardian)': { type: 'The Righteous Guardian', ref: 'Matthew 1:19-20', desc: 'Joseph, a just man, protected and provided for the Messiah. A type of faithful stewardship and obedience to divine direction.' }
};

var typologyActive = false;

function toggleTypology() {
    typologyActive = !typologyActive;
    var btn = document.getElementById('typologyToggle');
    if (typologyActive) {
        document.body.classList.add('typology-active');
        btn.classList.add('active');
        btn.innerHTML = '&#128214; TYPOLOGY ON';
    } else {
        document.body.classList.remove('typology-active');
        btn.classList.remove('active');
        btn.innerHTML = '&#128214; TYPOLOGY';
        document.querySelectorAll('.typology-badge').forEach(function(b) { b.remove(); });
        document.querySelectorAll('.typology-node').forEach(function(n) { n.classList.remove('typology-node'); });
    }
    attachTypologyBadges();
}

function attachTypologyBadges() {
    if (!typologyActive) return;
    document.querySelectorAll('.genealogy-node').forEach(function(node) {
        if (node.querySelector('.typology-badge')) return;
        var h3 = node.querySelector('.node-content h3, .name-container .modern-name');
        if (!h3) return;
        var name = h3.textContent.trim().toUpperCase().replace(/^\u2713\s*/, '').replace(/\s*\(.*?\)\s*$/, '').trim();
        var typ = TYPOLOGY[name];
        if (!typ) return;
        var badge = document.createElement('div');
        badge.className = 'typology-badge';
        badge.innerHTML = '<strong>TYPE & SHADOW:</strong> ' + typ.type + '<br><span style="font-size: var(--text-micro);color:rgba(212,175,55,0.2);">' + typ.ref + '</span><br>' + typ.desc;
        node.querySelector('.node-content').appendChild(badge);
        node.classList.add('typology-node');
    });
}

// ═══════════════════════════════════════
// COLLAPSIBLE SECTIONS
// ═══════════════════════════════════════
(function initCollapsible() {
    document.querySelectorAll('.era-section').forEach(function(section) {
        var header = section.querySelector('.era-header');
        if (!header) return;
        var content = document.createElement('div');
        content.className = 'era-content';
        var childNodes = Array.from(section.childNodes);
        var afterHeader = false;
        childNodes.forEach(function(node) {
            if (node === header) { afterHeader = true; return; }
            if (afterHeader) content.appendChild(node);
        });
        section.innerHTML = '';
        section.appendChild(header);
        section.appendChild(content);
        var toggle = document.createElement('button');
        toggle.className = 'era-collapse-toggle';
        toggle.textContent = '\u2014';
        toggle.setAttribute('aria-label', 'Collapse section');
        toggle.onclick = function() {
            section.classList.toggle('collapsed');
            toggle.textContent = section.classList.contains('collapsed') ? '+' : '\u2014';
        };
        header.appendChild(toggle);
    });
})();

// ═══════════════════════════════════════
// ERA JUMP NAV
// ═══════════════════════════════════════
(function initEraJumpNav() {
    var nav = document.createElement('nav');
    nav.className = 'era-jump-nav';
    nav.id = 'eraJumpNav';
    var eras = [
        { label: 'ANTE-DILUVIAN', section: 0 },
        { label: 'PATRIARCHS', section: 1 },
        { label: 'TRIBES', section: 2 },
        { label: 'EXODUS', section: 3 },
        { label: 'MONARCHY', section: 4 },
        { label: 'DIVIDED', section: 5 },
        { label: 'EXILE', section: 6 },
        { label: 'SILENT', section: 7 },
        { label: 'ETHIOPIAN', section: 8 }
    ];
    var sections = document.querySelectorAll('.era-section');
    eras.forEach(function(e, i) {
        var btn = document.createElement('button');
        btn.className = 'era-jump-btn';
        btn.textContent = e.label;
        btn.onclick = function() {
            if (sections[e.section]) sections[e.section].scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        nav.appendChild(btn);
    });
    document.body.appendChild(nav);

    // Scroll-spy
    var btns = nav.querySelectorAll('.era-jump-btn');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var idx = Array.from(sections).indexOf(entry.target);
            if (idx >= 0 && btns[idx]) {
                btns.forEach(function(b) { b.classList.remove('active'); });
                btns[idx].classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(function(s) { observer.observe(s); });
})();

// ═══════════════════════════════════════
// LUKE 3 TOGGLE
// ═══════════════════════════════════════
function toggleLukeLine() {
    var c = document.getElementById('lukeLineContent');
    var btn = document.getElementById('lukeLineToggle');
    if (!c || !btn) return;
    var visible = c.classList.toggle('visible');
    btn.classList.toggle('active', visible);
    btn.innerHTML = visible ? '&#128214; HIDE LUKE 3 LINE' : '&#128214; REVEAL LUKE 3 — BIOLOGICAL LINE';
}

// ═══════════════════════════════════════
// 70 GENERATIONS TOGGLE
// ═══════════════════════════════════════
function toggleSeventyGenerations() {
    var c = document.getElementById('seventyLineContent');
    var btn = document.getElementById('seventyToggle');
    if (!c || !btn) return;
    var visible = c.classList.toggle('visible');
    btn.classList.toggle('active', visible);
    btn.innerHTML = visible ? '&#128214; HIDE 70 GENERATIONS' : '&#128214; REVEAL 70 GENERATIONS — LUKE 3:23-38';
}
// ═══════════════════════════════════════
// DOSSIER DRAWER
// ═══════════════════════════════════════
(function() {
    var drawer = document.getElementById('dossierDrawer');
    var body = document.getElementById('dossierBody');
    var nameEl = document.getElementById('dossierName');
    var dateEl = document.getElementById('dossierDate');
    var repoEl = document.getElementById('dossierRepository');
    var summaryEl = document.getElementById('dossierSummary');
    var refEl = document.getElementById('dossierRef');
    var closeBtn = document.getElementById('dossierClose');
    var handle = document.getElementById('dossierHandle');

    var DOSSIER_DATA = {
        '1 Enoch — Qumran Cave 4': {
            name: '1 Enoch Fragments',
            date: '1947–1956 (Qumran Cave 4)',
            repo: 'Israel Museum, Jerusalem / Jordan Museum, Amman',
            summary: 'Over 20 Aramaic manuscripts of 1 Enoch were discovered among the Dead Sea Scrolls at Qumran. These fragments (4Q201–212) preserve the oldest known copies of the Book of Enoch, including the "Watchers" narrative cited by Jude 14-15. The manuscripts predate the New Testament by more than a century, confirming the apocalyptic context into which Yeshua was born.',
            ref: '4Q201-212; Milik, The Books of Enoch (1976)'
        },
        'Gilgamesh Tablet XI (651 BC)': {
            name: 'Gilgamesh Epic — Flood Tablet',
            date: 'c. 651 BC (Library of Ashurbanipal)',
            repo: 'British Museum, London (K.3375)',
            summary: 'The eleventh tablet of the Standard Babylonian Gilgamesh Epic, discovered in the library of Ashurbanipal at Nineveh. It preserves a flood narrative strikingly parallel to Genesis 6-9: a hero builds a boat, takes animals aboard, releases birds to find dry land, and offers a sacrifice after the flood. While the parallels are remarkable, the theological differences — the Bible\'s monotheistic, moral framework versus polytheistic myth — are equally significant.',
            ref: 'George, The Babylonian Gilgamesh Epic (2003)'
        },
        'Ancient Near Eastern Covenant Parallels': {
            name: 'ANE Covenant Ceremony Parallels',
            date: 'Various (2nd–1st millennium BC)',
            repo: 'Multiple collections (Louvre, British Museum, Vorderasiatisches Museum)',
            summary: 'The covenant ceremony of Genesis 15 — where God passes between the divided animals alone — follows the pattern of ancient Near Eastern "covenant-making" rituals, particularly from Mari and Hittite sources. The unique element is that Yahweh passes through alone, taking the curse upon Himself rather than requiring Abraham to walk. This is a profound type of the cross: God Himself bears the penalty of the covenant.',
            ref: 'Weinfeld, "Covenant Terminology in the Ancient Near East" (JAOS, 1973)'
        },
        'Tel Dan Stele — House of David': {
            name: 'Tel Dan Stele',
            date: 'c. 840 BC',
            repo: 'Israel Museum, Jerusalem',
            summary: 'The Tel Dan Stele, discovered in 1993 at Tel Dan in northern Israel, bears an Aramaic inscription by Hazael of Aram-Damascus boasting of his victory over the "king of Israel" and the "House of David." This is the earliest extra-biblical reference to the Davidic dynasty, confirming that David was regarded as the founder of a royal line that endured centuries after his death.',
            ref: 'Biran & Naveh, "An Aramaic Stele Fragment from Tel Dan" (IEJ, 1993)'
        },
        'Tel Dan Stele (c. 840 BC)': {
            name: 'Tel Dan Stele',
            date: 'c. 840 BC',
            repo: 'Israel Museum, Jerusalem',
            summary: 'A basalt stele discovered in 1993 at Tel Dan, inscribed in Aramaic by Hazael of Damascus. It boasts of his military victories and explicitly mentions the "House of David" (bytdwd). The inscription provides the earliest known reference to King David outside the Bible, dating to less than 200 years after his reign.',
            ref: 'Biran & Naveh, IEJ 43 (1993), 39-47'
        },
        'Mesha Stele': {
            name: 'Mesha Stele (Moabite Stone)',
            date: 'c. 840 BC',
            repo: 'Louvre Museum, Paris',
            summary: 'The Mesha Stele, discovered at Dhiban (ancient Dibon) in 1868, records the victories of Mesha, king of Moab, over the kingdom of Israel. It mentions the name of Yahweh (YHWH) and is considered by many scholars to also reference the "House of David," making it a second contemporary witness (alongside the Tel Dan Stele) to the historical reality of the Davidic dynasty.',
            ref: 'Lemaire, "House of David" in the Mesha Stele (BASOR, 1994)'
        },
        "Solomon's Seal (Bullae)": {
            name: 'Solomon Bullae',
            date: 'c. 10th–6th c. BC (debated)',
            repo: 'Private collection / Moussaieff Collection',
            summary: 'A bulla (seal impression) bearing the name "Solomon" was reportedly discovered in Jerusalem, though its provenance and authenticity remain debated among scholars. If authentic, it would be one of the very few artifacts directly associated with the legendary king. Whether authentic or not, the Solomonic period is archaeologically attested by the monumental architecture at Hazor, Megiddo, and Gezer.',
            ref: 'Dever, "What Did the Biblical Writers Know?" (2001)'
        },
        'Uzziah Bullae': {
            name: 'Uzziah Bulla',
            date: 'c. 8th c. BC',
            repo: 'Israel Antiquities Authority',
            summary: 'A bulla (seal impression) bearing the inscription "Belonging to Uzziah son of Joram, King of Judah" was discovered in Jerusalem during excavations. It provides contemporary evidence for the reign of Uzziah (also called Azariah), who ruled Judah for 52 years (2 Kings 15:1-7).',
            ref: 'Avigad, "Hebrew Bullae from the Time of Jeremiah" (1986)'
        },
        "Hezekiah's Bulla": {
            name: 'Hezekiah Bulla',
            date: 'c. 8th c. BC',
            repo: 'Israel Museum, Jerusalem',
            summary: 'A personal seal impression (bulla) of King Hezekiah, inscribed "Belonging to Hezekiah, son of Ahaz, King of Judah." Discovered during excavations in Jerusalem, it bears the royal emblem of a winged sun-disk, flanked by ankh symbols — reflecting Hezekiah\'s reign during the period of Assyrian domination.',
            ref: 'Grena, "Hezekiah\'s Authentic Seal" (2004)'
        },
        'Siloam Inscription (c. 701 BC)': {
            name: 'Siloam Tunnel Inscription',
            date: 'c. 701 BC',
            repo: 'Istanbul Archaeology Museums',
            summary: 'An inscription carved into the wall of Hezekiah\'s Tunnel (the Siloam Tunnel), commemorating the meeting of the two excavation crews who dug from opposite ends. The tunnel, described in 2 Kings 20:20 and 2 Chronicles 32:30, was built to secure Jerusalem\'s water supply during the Assyrian siege. The inscription describes the final breakthrough — "the water flowed from the spring to the pool."',
            ref: 'Shiloh, "Jerusalem Water Systems" (BAR, 1980)'
        },
        "Taylor Prism (c. 691 BC)": {
            name: 'Taylor Prism',
            date: 'c. 691 BC',
            repo: 'British Museum, London',
            summary: 'A hexagonal clay prism of the Assyrian king Sennacherib, recording his military campaigns including his siege of Jerusalem in 701 BC. The prism boasts that he "shut up Hezekiah the Judahite in Jerusalem like a caged bird" — but notably does NOT claim to have captured the city, consistent with the biblical account of the Assyrian army\'s miraculous defeat.',
            ref: 'Luckenbill, "The Annals of Sennacherib" (1924)'
        },
        'The Temple Scroll Discovery': {
            name: 'Josiah\'s Temple Discovery / Deuteronomy Core',
            date: 'c. 622 BC (biblical date) / c. 3rd c. BC (Dead Sea Scrolls)',
            repo: 'Biblical account (2 Kings 22) / Temple Scroll: Israel Museum',
            summary: 'The "Book of the Law" discovered during the reign of King Josiah (2 Kings 22) is widely identified by scholars with the core of Deuteronomy. The Temple Scroll (11Q19), discovered at Qumran, shows how Deuteronomy\'s legal traditions were expanded in the Second Temple period. The discovery during Josiah\'s reforms led to a national revival — itself a type of restoration through the rediscovery of God\'s Word.',
            ref: 'Cross, "The Priestly Tabernacle" (1961)'
        },
        "Jehoiachin's Ration Tablets (c. 592 BC)": {
            name: 'Jehoiachin\'s Ration Tablets',
            date: 'c. 592 BC',
            repo: 'Vorderasiatisches Museum, Berlin (VAT 16378)',
            summary: 'Babylonian cuneiform tablets from the reign of Nebuchadnezzar II record rations of oil and grain allocated to "Yaukin, king of the land of Judah" and his sons in exile. These tablets confirm the biblical account of Jehoiachin (Jeconiah) being held in Babylon and later shown favor by Evil-Merodach (2 Kings 25:27-30). The curse of Jeremiah 22:30 — that no descendant of Jeconiah would prosper on David\'s throne — thus had a concrete historical backdrop.',
            ref: 'Weidner, "Jojachin in Babylon" (Mélanges Syriens, 1939)'
        },
        'Cyrus Cylinder': {
            name: 'Cyrus Cylinder',
            date: 'c. 539 BC',
            repo: 'British Museum, London (BM 90920)',
            summary: 'A clay cylinder inscribed with the declaration of Cyrus the Great after his conquest of Babylon. It describes his policy of returning captive peoples to their homelands and restoring their temples — consistent with the biblical account of Cyrus decreeing the return of the Jewish exiles and the rebuilding of the Temple (Ezra 1:1-4). Isaiah\'s prophecy naming Cyrus 150 years earlier (Isaiah 44:28–45:1) remains one of the most striking predictive prophecies in Scripture.',
            ref: 'Kuhrt, "The Cyrus Cylinder and Persian Imperial Policy" (JSOT, 1983)'
        },
        'The Jeconiah Curse Bypass': {
            name: 'The Jeconiah Curse — Legal Throne-Right',
            date: 'c. 597 BC (curse) / c. 1st c. BC (resolution)',
            repo: 'Biblical text: Jeremiah 22:30, Matthew 1:11-16, Luke 3:23-38',
            summary: 'Jeremiah 22:30 pronounces that no descendant of Jeconiah (Jehoiachin) would sit on David\'s throne. Since Joseph (Jesus\' legal father) descends from Solomon through Jeconiah, this curse would seem to jeopardize Jesus\' right to David\'s throne. The resolution is found in the dual genealogy: Matthew traces the LEGAL line through Joseph (and Jeconiah), while Luke traces the BIOLOGICAL line through Mary, who descends from Nathan (Solomon\'s brother) — bypassing the curse entirely. Jesus thus inherits the legal throne-right through Joseph and the biological descent through Mary, fulfilling all requirements.',
            ref: 'MacArthur, "The Genealogy of Jesus Christ" (1992)'
        },
        'Kebra Nagast — The Glory of Kings': {
            name: 'Kebra Nagast (ክብረ ነገሥት)',
            date: 'c. 14th century AD (compiled from earlier sources)',
            repo: 'Ethiopian Orthodox Tewahedo Church / British Museum (Or. 818)',
            summary: 'The Kebra Nagast ("Glory of the Kings") is the foundational epic of the Ethiopian Solomonic dynasty. It recounts the visit of the Queen of Sheba (Makeda) to King Solomon in Jerusalem, their son Menelik I, and his journey to Ethiopia bearing the Ark of the Covenant. The text weaves together biblical narrative, apocryphal tradition, and Ethiopian legend to establish the divine right of the Solomonic line. Composed in Ge\'ez during the reign of Emperor Amda Seyon I, it remains the single most important work of Ethiopian national literature.',
            ref: 'Budge, "The Queen of Sheba and Her Only Son Menyelek" (1922)'
        }
    };

    function openDossier(name) {
        var data = DOSSIER_DATA[name];
        if (!data) return;
        nameEl.textContent = data.name;
        dateEl.textContent = data.date;
        repoEl.textContent = data.repo;
        summaryEl.textContent = data.summary;
        refEl.textContent = data.ref;
        drawer.classList.add('open');
        body.scrollTop = 0;
    }

    function closeDossier() {
        drawer.classList.remove('open');
    }

    document.querySelectorAll('.arch-badge').forEach(function(badge) {
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            var name = this.dataset.dossierKey;
            if (!name) return;
            openDossier(name);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDossier);
    if (handle) handle.addEventListener('click', function(e) {
        if (e.target === handle || e.target.classList.contains('drawer-title')) closeDossier();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) closeDossier();
    });
})();

// ═══════════════════════════════════════
// RV NOTE TOGGLES (14 messianic nodes)
// ═══════════════════════════════════════
(function() {
    var RV_NOTES = {
        'ADAM': { text: 'The first man, Adam, became a living soul. As the head of the old creation, he brought sin and death into the world. Christ as the last Adam (1 Cor. 15:45) is the head of the new creation, imparting the divine life to all who believe.', ref: 'Recovery Version, Romans 5:14, note 2' },
        'ENOCH': { text: 'Enoch walked with God and was translated to heaven without experiencing death. This is a pattern of the overcomers who will be raptured before the great tribulation. His prophecy of the Lord\'s coming with ten thousands of His saints (Jude 14-15) connects the antediluvian age to the end times.', ref: 'Recovery Version, Hebrews 11:5, note 1' },
        'NOAH': { text: 'Noah found grace in the eyes of the Lord and built the ark for the salvation of his household. The ark is a type of Christ — the one means of escape from God\'s judgment. By passing through the flood waters, Noah was separated from the corrupted world and entered a new creation.', ref: 'Recovery Version, 1 Peter 3:20-21, note 3' },
        'ABRAHAM': { text: 'Abraham believed God and it was counted to him as righteousness. He is the father of all who believe, both Jew and Gentile. His journey of faith — leaving Ur, sojourning in Canaan, offering Isaac — is a pattern of the believer\'s walk of faith. The promise that "all nations shall be blessed in you" finds its fulfillment in Christ.', ref: 'Recovery Version, Galatians 3:8, note 1' },
        'ISAAC': { text: 'Isaac is a type of Christ as the promised Son who was offered and received back from the dead. He is uniquely the son of promise, born not by natural effort but by divine intervention. His marriage to Rebekah typifies Christ\'s marriage to the church as His chosen bride.', ref: 'Recovery Version, Hebrews 11:17, note 1' },
        'JACOB': { text: 'Jacob, the supplanter, was transformed into Israel, a prince with God. His life illustrates God\'s sovereign selection and the divine work of transformation. Despite his scheming nature, God loved him (Mal. 1:2-3) and worked all circumstances — including his exile, his servitude, and his losses — to transform him into a vessel for God\'s purpose.', ref: 'Recovery Version, Romans 9:13, note 1' },
        'JUDAH': { text: 'Judah, whose name means "praise," is the tribe from which the Messiah would come. The scepter would not depart from Judah until Shiloh comes (Gen. 49:10). Despite Judah\'s failures — including his sin with Tamar — the messianic line was preserved. The Lion of the tribe of Judah prevails to open the scroll.', ref: 'Recovery Version, Revelation 5:5, note 1' },
        'BOAZ': { text: 'Boaz, the kinsman-redeemer, is a rich type of Christ. He redeemed Ruth\'s inheritance and took her as his bride, as Christ redeems what was lost and takes the church as His bride. His wealth, his position as a man of standing, and his dwelling in Bethlehem all prefigure Christ.', ref: 'Recovery Version, Ruth 4:1-10, note 1' },
        'DAVID': { text: 'David, the shepherd-king, is the most prominent type of Christ in the Old Testament. Anointed years before he ascended the throne, he suffered rejection, gathered his outcasts, and established a kingdom. As David brought the ark to Zion, Christ brings God\'s presence to His people. The covenant of an eternal throne finds its fulfillment in Christ.', ref: 'Recovery Version, 2 Samuel 7:12-14, note 1' },
        'SOLOMON': { text: 'Solomon, the wise king who built the temple, is a type of Christ in His millennial kingdom. His wisdom, his wealth, and his peaceful reign prefigure Christ\'s reign in the age to come. However, Solomon\'s failure with foreign wives warns that even the wisest man falls apart from grace. The greater Son of David would never fail.', ref: 'Recovery Version, 1 Kings 11:1-8, note 1' },
        'HEZEKIAH': { text: 'Hezekiah trusted in Jehovah more than any king of Judah before or after him. His reform — cleansing the temple, restoring the Passover, and destroying the bronze serpent — prefigures the restoration of true worship. His prayer during Sennacherib\'s siege is a model of faith in God\'s deliverance.', ref: 'Recovery Version, 2 Kings 18:5, note 1' },
        'ZERUBBABEL': { text: 'Zerubbabel led the first return of the exiles and rebuilt the temple. He is a type of Christ the Restorer, who rebuilds the house of God — the church. Haggai\'s prophecy that Zerubbabel would be a "signet ring" (Hag. 2:23), reversing the curse on Jeconiah (Jer. 22:24), points to the restoration of the Davidic line in the Messiah.', ref: 'Recovery Version, Haggai 2:23, note 1' },
        'JOSEPH (guardian)': { text: 'Joseph, the just man, is the silent guardian of the messianic line. Though not the biological father of Jesus, his legal paternity was essential to establish Jesus\' throne-right as a descendant of David through Solomon (the legal line in Matthew). His obedience to the angelic instruction, his protection of Mary and the child, and his self-effacement model faithful stewardship.', ref: 'Recovery Version, Matthew 1:19, note 1' },
        'YESHUA': { text: 'Jesus Christ, the Son of David, the Son of Abraham, is the fulfillment of every promise, the substance of every type, the terminus of every genealogy. In Him the Seed of the Woman crushes the serpent\'s head, the Seed of Abraham blesses all nations, the Son of David sits on the eternal throne. All the generations — from Adam through Abraham, from David through the exile, from the exile to His birth — converge in Him.', ref: 'Recovery Version, Matthew 1:1, note 1' }
    };

    document.querySelectorAll('.genealogy-node.messianic').forEach(function(node) {
        var ref = node.querySelector('.node-ref');
        if (!ref) return;
        var h3 = node.querySelector('h3, .modern-name');
        if (!h3) return;
        var key = h3.textContent.trim().toUpperCase().replace(/^\u2713\s*/, '').replace(/\(.*?\)$/, '').trim();
        var note = RV_NOTES[key];
        if (!note) return;

        var toggle = document.createElement('button');
        toggle.className = 'rv-note-toggle';
        toggle.textContent = 'RV NOTE';

        var content = document.createElement('div');
        content.className = 'rv-note-content';

        var text = document.createElement('div');
        text.className = 'rv-text';
        text.textContent = note.text;

        var rvRef = document.createElement('div');
        rvRef.className = 'rv-ref';
        rvRef.textContent = note.ref;

        content.appendChild(text);
        content.appendChild(rvRef);
        ref.parentNode.insertBefore(toggle, ref.nextSibling);
        toggle.parentNode.insertBefore(content, toggle.nextSibling);

        toggle.addEventListener('click', function() {
            var isOpen = content.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
        });
    });
})();

// ═══════════════════════════════════════
// INTERSECTION OBSERVER — ERA SECTIONS + YESHUA → checkAchievements
// ═══════════════════════════════════════
(function() {
    if (typeof window.checkAchievements !== 'function') return;

    var eraSections = document.querySelectorAll('.era-section');
    var observedEras = new Set();

    var eraObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var idx = Array.from(eraSections).indexOf(entry.target);
            if (idx >= 0) observedEras.add(idx);
            if (observedEras.size >= eraSections.length) {
                if (!localStorage.getItem('achiev_all_eras_toasted')) {
                    localStorage.setItem('achiev_all_eras_toasted', 'true');
                    setTimeout(checkAchievements, 500);
                }
            }
        });
    }, { threshold: 0.1 });

    eraSections.forEach(function(s) { eraObserver.observe(s); });

    var yeshuaNode = document.getElementById('node-yeshua');
    if (yeshuaNode) {
        var yeshuaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                if (!localStorage.getItem('luke_line_viewed')) {
                    localStorage.setItem('luke_line_viewed', 'true');
                    setTimeout(checkAchievements, 500);
                }
                yeshuaObserver.unobserve(entry.target);
            });
        }, { threshold: 0.3 });
        yeshuaObserver.observe(yeshuaNode);
    }
})();

// ═══════════════════════════════════════
// SVG LIFESPAN CHART
// ═══════════════════════════════════════
(function buildSvgLifespanChart() {
    var container = document.getElementById('lifespanChart');
    if (!container) return;

    var LIFESPAN_CONTEXT = {
        'Adam': { note: 'The first man. Sin entered through him; the Last Adam brings life.' },
        'Seth': { note: 'Appointed by God to replace Abel. The line of promise continues.' },
        'Enosh': { note: 'In his days men began to call on the name of the LORD.' },
        'Cainan': { note: 'The fourth from Adam. The pattern of begetting continues.' },
        'Mahalalel': { note: 'His name means "Praise of God."' },
        'Jared': { note: 'Father of Enoch, the man who walked with God.' },
        'Enoch': { note: 'Walked with God and was not, for God took him. Escaped death.' },
        'Methuselah': { note: 'His name means "When he dies, it comes." He died in the year of the flood.' },
        'Lamech': { note: 'Saw the prophecy of comfort from the ground the LORD had cursed.' },
        'Noah': { note: 'The righteous preserver of the seed through the deluge.' },
        'Shem': { note: 'The blessed son through whom the line continued after the flood.' },
        'Arpachshad': { note: 'Born two years after the flood. The first post-diluvian patriarch.' },
        'Shelah': { note: 'His name means "Sprout." The line grows toward Abram.' },
        'Eber': { note: 'His name means "Crossing Over." From him the Hebrews take their name.' },
        'Peleg': { note: 'In his days the earth was divided — likely the Tower of Babel dispersion.' },
        'Reu': { note: 'Generation after Babel. The lifespans contract.' },
        'Serug': { note: 'Father of Nahor. The patriarchs of the post-flood era.' },
        'Nahor': { note: 'Grandfather of Abraham. The line narrows toward the chosen.' },
        'Terah': { note: 'Father of Abraham. Set out for Canaan but settled in Haran.' },
        'Abraham': { note: 'The father of faith. The covenant bearer.' },
        'Isaac': { note: 'The promised son. Bound on the altar, a type of Christ.' },
        'Jacob': { note: 'The supplanter transformed into Israel.' },
        'David': { note: 'The shepherd-king. The covenant of an eternal throne.' }
    };

    var data = [
        { name: 'Adam', lifespan: 930, era: 'Antediluvian' },
        { name: 'Seth', lifespan: 912, era: 'Antediluvian' },
        { name: 'Enosh', lifespan: 905, era: 'Antediluvian' },
        { name: 'Cainan', lifespan: 910, era: 'Antediluvian' },
        { name: 'Mahalalel', lifespan: 895, era: 'Antediluvian' },
        { name: 'Jared', lifespan: 962, era: 'Antediluvian' },
        { name: 'Enoch', lifespan: 365, era: 'Antediluvian' },
        { name: 'Methuselah', lifespan: 969, era: 'Antediluvian' },
        { name: 'Lamech', lifespan: 777, era: 'Antediluvian' },
        { name: 'Noah', lifespan: 950, era: 'Antediluvian' },
        { name: 'Shem', lifespan: 600, era: 'Patriarch' },
        { name: 'Arpachshad', lifespan: 438, era: 'Patriarch' },
        { name: 'Shelah', lifespan: 433, era: 'Patriarch' },
        { name: 'Eber', lifespan: 464, era: 'Patriarch' },
        { name: 'Peleg', lifespan: 239, era: 'Patriarch' },
        { name: 'Reu', lifespan: 239, era: 'Patriarch' },
        { name: 'Serug', lifespan: 230, era: 'Patriarch' },
        { name: 'Nahor', lifespan: 148, era: 'Patriarch' },
        { name: 'Terah', lifespan: 205, era: 'Patriarch' },
        { name: 'Abraham', lifespan: 175, era: 'Patriarch' },
        { name: 'Isaac', lifespan: 180, era: 'Patriarch' },
        { name: 'Jacob', lifespan: 147, era: 'Patriarch' },
        { name: 'David', lifespan: 70, era: 'Monarchy' }
    ];

    var max = 969;
    var barW = 28;
    var gap = 6;
    var w = data.length * (barW + gap) + 40;
    var h = 360;
    var padL = 40;
    var padB = 60;
    var chartH = h - padB;

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.display = 'block';
    svg.style.margin = '0 auto';
    svg.style.maxWidth = '100%';

    // Background
    var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', w);
    bg.setAttribute('height', h);
    bg.setAttribute('fill', 'rgba(10,8,6,0.3)');
    bg.setAttribute('rx', '4');
    svg.appendChild(bg);

    data.forEach(function(d, i) {
        var pct = d.lifespan / max;
        var barH = pct * chartH;
        var x = padL + i * (barW + gap);
        var y = chartH - barH;

        var colors = { 'Antediluvian': 'rgba(212,175,55,0.6)', 'Patriarch': 'rgba(180,140,80,0.5)', 'Monarchy': 'rgba(140,160,180,0.4)' };
        var color = colors[d.era] || 'rgba(212,175,55,0.3)';

        // Bar
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barW);
        rect.setAttribute('height', barH);
        rect.setAttribute('fill', color);
        rect.setAttribute('rx', '2');
        rect.setAttribute('class', 'lifespan-bar-svg');
        rect.dataset.name = d.name;
        rect.dataset.lifespan = d.lifespan;
        rect.dataset.context = (LIFESPAN_CONTEXT[d.name] || {}).note || '';
        svg.appendChild(rect);

        // Value label
        var vLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        vLabel.setAttribute('x', x + barW / 2);
        vLabel.setAttribute('y', y - 4);
        vLabel.setAttribute('text-anchor', 'middle');
        vLabel.setAttribute('fill', 'rgba(212,175,55,0.3)');
        vLabel.setAttribute('font-size', '10');
        vLabel.setAttribute('font-family', 'Montserrat, sans-serif');
        vLabel.textContent = d.lifespan;
        svg.appendChild(vLabel);

        // Name label (rotated)
        var nLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        nLabel.setAttribute('x', x + barW / 2);
        nLabel.setAttribute('y', chartH + 12);
        nLabel.setAttribute('text-anchor', 'end');
        nLabel.setAttribute('fill', 'rgba(212,175,55,0.25)');
        nLabel.setAttribute('font-size', '9');
        nLabel.setAttribute('font-family', 'Montserrat, sans-serif');
        nLabel.setAttribute('transform', 'rotate(-45, ' + (x + barW / 2) + ', ' + (chartH + 12) + ')');
        nLabel.textContent = d.name;
        svg.appendChild(nLabel);

        // Messianic accent line
        if (d.name === 'Enoch' || d.name === 'Noah' || d.name === 'Abraham' || d.name === 'David') {
            var accent = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            accent.setAttribute('x1', x);
            accent.setAttribute('y1', y);
            accent.setAttribute('x2', x + barW);
            accent.setAttribute('y2', y);
            accent.setAttribute('stroke', 'rgba(212,175,55,0.4)');
            accent.setAttribute('stroke-width', '1.5');
            svg.appendChild(accent);
        }
    });

    // Hover tooltip
    var tooltip = document.createElement('div');
    tooltip.className = 'svg-tooltip';
    tooltip.style.cssText = 'position:fixed;display:none;background:rgba(10,8,6,0.95);border:1px solid rgba(212,175,55,0.2);border-radius:4px;padding:8px 12px;font-family:Montserrat,sans-serif;font-size:var(--text-micro,0.72rem);color:rgba(212,175,55,0.65);pointer-events:none;z-index:10000;max-width:280px;line-height:1.5;';
    document.body.appendChild(tooltip);

    svg.addEventListener('mouseover', function(e) {
        var target = e.target;
        if (target.tagName !== 'rect' || !target.dataset.name) return;
        var html = '<strong style="color:rgba(212,175,55,0.85);">' + target.dataset.name + '</strong> &mdash; ' + target.dataset.lifespan + ' years';
        if (target.dataset.context) html += '<br><span style="color:rgba(212,175,55,0.35);font-size:0.65rem;font-style:italic;">' + target.dataset.context + '</span>';
        tooltip.innerHTML = html;
        tooltip.style.display = 'block';
    });

    svg.addEventListener('mousemove', function(e) {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    });

    svg.addEventListener('mouseout', function(e) {
        if (e.target.tagName === 'rect') tooltip.style.display = 'none';
    });

    container.innerHTML = '';
    container.appendChild(svg);
})();