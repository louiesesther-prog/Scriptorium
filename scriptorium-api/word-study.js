const path = require('path');
const fs = require('fs');

var BIBLE_DIR = path.join(__dirname, '..', 'assets', 'data', 'bible-text');
var WORD_FREQ = {};

function computeFrequencies() {
  try {
    if (!fs.existsSync(BIBLE_DIR)) return;
    var files = fs.readdirSync(BIBLE_DIR).filter(function(f) { return f.endsWith('.json'); });
    var total = 0;
    for (var i = 0; i < files.length; i++) {
      try {
        var data = JSON.parse(fs.readFileSync(path.join(BIBLE_DIR, files[i]), 'utf8'));
        if (data.version !== 'NIV') continue;
        data.chapters.forEach(function(ch) {
          ch.verses.forEach(function(verse) {
            var words = verse.toLowerCase().replace(/[^a-z\s'-]/g, '').split(/\s+/);
            words.forEach(function(w) {
              if (w.length > 1) { WORD_FREQ[w] = (WORD_FREQ[w] || 0) + 1; total++; }
            });
          });
        });
      } catch(e) {}
    }
  } catch(e) {}
}

var LEXICON = {
  "faith": { strong: "G4102", greek: "πίστις (pistis)", hebrew: "אֱמוּנָה (emunah)", def: "Faith, trust, belief, fidelity; conviction of the truth of anything; a firmly held persuasion." },
  "grace": { strong: "G5485", greek: "χάρις (charis)", hebrew: "חֵן (chen)", def: "Grace, favor, kindness, gratitude; unmerited divine assistance given to humans for their regeneration or sanctification." },
  "love": { strong: "G26", greek: "ἀγάπη (agape)", hebrew: "אַהֲבָה (ahavah)", def: "Love, affection, benevolence; unconditional, self-sacrificing love; the highest form of love." },
  "sin": { strong: "G266", greek: "ἁμαρτία (hamartia)", hebrew: "חַטָּאָת (chatta'at)", def: "Sin, offense, trespass; missing the mark; transgression of the divine law; moral failure." },
  "covenant": { strong: "G1242", greek: "διαθήκη (diatheke)", hebrew: "בְּרִית (berit)", def: "Covenant, testament, contract; a divine promise; a solemn binding agreement between God and His people." },
  "redemption": { strong: "G629", greek: "ἀπολύτρωσις (apolytrosis)", hebrew: "גְּאֻלָּה (ge'ullah)", def: "Redemption, deliverance, liberation; releasing by payment of a ransom; being set free from bondage." },
  "salvation": { strong: "G4991", greek: "σωτηρία (soteria)", hebrew: "יְשׁוּעָה (yeshu'ah)", def: "Salvation, deliverance, preservation; rescue from danger, disease, or eternal death; the saving work of Christ." },
  "righteousness": { strong: "G1343", greek: "δικαιοσύνη (dikaiosyne)", hebrew: "צְדָקָה (tzedakah)", def: "Righteousness, justice, justification; the quality of being morally right; conformity to God's standard." },
  "glory": { strong: "G1391", greek: "δόξα (doxa)", hebrew: "כָּבוֹד (kavod)", def: "Glory, honor, praise, splendor; divine brightness; the manifest presence and majesty of God." },
  "peace": { strong: "G1515", greek: "εἰρήνη (eirene)", hebrew: "שָׁלוֹם (shalom)", def: "Peace, tranquility, harmony; completeness, wholeness, welfare; the reconciled state between God and man." },
  "truth": { strong: "G225", greek: "ἀλήθεια (aletheia)", hebrew: "אֱמֶת (emet)", def: "Truth, reality, faithfulness; that which corresponds to reality; the revealed truth of God." },
  "mercy": { strong: "G1656", greek: "ἔλεος (eleos)", hebrew: "חֶסֶד (chesed)", def: "Mercy, compassion, lovingkindness; the withholding of deserved judgment; active compassion toward the afflicted." },
  "hope": { strong: "G1680", greek: "ἐλπίς (elpis)", hebrew: "תִּקְוָה (tikvah)", def: "Hope, expectation, trust; confident anticipation of future good; the joyful expectation of eternal salvation." },
  "light": { strong: "G5457", greek: "φῶς (phos)", hebrew: "אוֹר (or)", def: "Light, illumination; metaphorically truth, knowledge, goodness, the divine nature; Christ as the light of the world." },
  "darkness": { strong: "G4655", greek: "σκότος (skotos)", hebrew: "חֹשֶׁךְ (choshekh)", def: "Darkness, obscurity; metaphorically ignorance, evil, sin; the realm opposed to God's light." },
  "life": { strong: "G2222", greek: "ζωή (zoe)", hebrew: "חַיִּים (chayyim)", def: "Life, living; not merely physical existence but the full, abundant, eternal life that comes from God." },
  "death": { strong: "G2288", greek: "θάνατος (thanatos)", hebrew: "מָוֶת (mavet)", def: "Death; physical separation of soul from body; spiritual separation from God; the final enemy overcome by Christ." },
  "word": { strong: "G3056", greek: "λόγος (logos)", hebrew: "דָּבָר (davar)", def: "Word, speech, message, account; the expression of thought; the divine Word (Logos) as the second person of the Trinity." },
  "spirit": { strong: "G4151", greek: "πνεῦμα (pneuma)", hebrew: "רוּחַ (ruach)", def: "Spirit, wind, breath; the non-material part of a person; the Holy Spirit; spiritual beings." },
  "soul": { strong: "G5590", greek: "ψυχή (psyche)", hebrew: "נֶפֶשׁ (nephesh)", def: "Soul, life, self, inner being; the seat of emotions, desires, and will; the immaterial essence of a person." },
  "body": { strong: "G4983", greek: "σῶμα (soma)", hebrew: "גּוּף (guf)", def: "Body; the physical frame; the church as the body of Christ; the resurrected body of the believer." },
  "blood": { strong: "G129", greek: "αἷμα (haima)", hebrew: "דָּם (dam)", def: "Blood; the life-force of living creatures; sacrificial blood atones; the blood of Christ cleanses from sin." },
  "sacrifice": { strong: "G2378", greek: "θυσία (thysia)", hebrew: "זֶבַח (zevach)", def: "Sacrifice, offering; the act of offering something precious to God; Christ's once-for-all atoning sacrifice." },
  "temple": { strong: "G3485", greek: "ναός (naos)", hebrew: "הֵיכָל (heikhal)", def: "Temple, sanctuary; the dwelling place of God; the believer's body as God's temple; the heavenly temple." },
  "kingdom": { strong: "G932", greek: "βασιλεία (basileia)", hebrew: "מַלְכוּת (malkhut)", def: "Kingdom, royal power, reign; the rule and reign of God; the domain over which a king exercises authority." },
  "power": { strong: "G1411", greek: "δύναμις (dynamis)", hebrew: "כֹּחַ (koach)", def: "Power, strength, might, ability; inherent capability; miraculous power; the power of God for salvation." },
  "authority": { strong: "G1849", greek: "ἐξουσία (exousia)", hebrew: "מֶמְשָׁלָה (memshalah)", def: "Authority, power, jurisdiction, right; the right to act; delegated power; Christ's supreme authority." },
  "judgment": { strong: "G2920", greek: "κρίσις (krisis)", hebrew: "מִשְׁפָּט (mishpat)", def: "Judgment, condemnation, decision; the process of separating good from evil; God's righteous verdict." },
  "wrath": { strong: "G3709", greek: "ὀργή (orge)", hebrew: "אַף (af)", def: "Wrath, anger, indignation; divine judgment against sin; God's righteous and holy response to evil." },
  "repentance": { strong: "G3341", greek: "μετάνοια (metanoia)", hebrew: "תְּשׁוּבָה (teshuvah)", def: "Repentance, change of mind; a transformative turning from sin to God; a fundamental reorientation of life." },
  "forgiveness": { strong: "G859", greek: "ἄφεσις (aphesis)", hebrew: "סְלִיחָה (selichah)", def: "Forgiveness, remission, release; the cancellation of debt; the pardon of sins through Christ's atonement." },
  "wisdom": { strong: "G4678", greek: "σοφία (sophia)", hebrew: "חָכְמָה (chokhmah)", def: "Wisdom, insight, skill; the ability to apply knowledge rightly; divine wisdom as a gift from God." },
  "fool": { strong: "G3474", greek: "μωρός (moros)", hebrew: "אֱוִיל (evil)", def: "Foolish, dull, stupid; one who rejects God's wisdom; moral deficiency rather than intellectual lack." },
  "blessing": { strong: "G2127", greek: "εὐλογέω (eulogeo)", hebrew: "בָּרַךְ (barakh)", def: "To bless, praise, invoke blessing; to speak well of; to bestow favor; divine empowerment for flourishing." },
  "curse": { strong: "G2671", greek: "κατάρα (katara)", hebrew: "אָרָה (arah)", def: "Curse, malediction; the pronouncement of judgment; the opposite of blessing; Christ became a curse for us." },
  "holiness": { strong: "G41", greek: "ἁγιωσύνη (hagiosyne)", hebrew: "קֹדֶשׁ (kodesh)", def: "Holiness, sanctity, consecration; being set apart for God; moral purity; the essential nature of God." },
  "holy": { strong: "G40", greek: "ἅγιος (hagios)", hebrew: "קָדוֹשׁ (kadosh)", def: "Holy, sacred, set apart; dedicated to God; morally pure; the Holy Spirit; saints as holy ones." },
  "glorify": { strong: "G1392", greek: "δοξάζω (doxazo)", hebrew: "כָּבַד (kavad)", def: "To glorify, honor, magnify; to ascribe weight and worth; to reflect God's glory; to praise." },
  "praise": { strong: "G1368", greek: "αἰνέω (aineo)", hebrew: "הָלַל (halal)", def: "To praise, commend, sing praise; to express admiration and honor; both human and angelic worship of God." },
  "worship": { strong: "G4352", greek: "προσκυνέω (proskyneo)", hebrew: "שָׁחָה (shachah)", def: "To worship, bow down, prostrate; to render reverent homage; to acknowledge worth by physical gesture." },
  "prayer": { strong: "G4335", greek: "προσευχή (proseuche)", hebrew: "תְּפִלָּה (tefillah)", def: "Prayer, petition, supplication; communication with God; the lifting up of the heart to the Creator." },
  "angel": { strong: "G32", greek: "ἄγγελος (angelos)", hebrew: "מַלְאָךְ (mal'akh)", def: "Angel, messenger; a supernatural being; a divine messenger; a ministering spirit sent to serve the elect." },
  "demon": { strong: "G1140", greek: "δαιμόνιον (daimonion)", hebrew: "שֵׁד (shed)", def: "Demon, evil spirit; a fallen angel; an unclean spirit opposing God's work; subject to Christ's authority." },
  "satan": { strong: "G4567", greek: "σατανᾶς (satanas)", hebrew: "שָׂטָן (satan)", def: "Satan, adversary, accuser; the chief adversary of God and humanity; the tempter; the deceiver." },
  "heaven": { strong: "G3772", greek: "οὐρανός (ouranos)", hebrew: "שָׁמַיִם (shamayim)", def: "Heaven, sky, air; the dwelling place of God; the celestial realm; the eternal home of the redeemed." },
  "earth": { strong: "G1093", greek: "γῆ (ge)", hebrew: "אֶרֶץ (eretz)", def: "Earth, land, ground, soil; the terrestrial world; the inhabited world; the physical planet created by God." },
  "world": { strong: "G2889", greek: "κόσμος (kosmos)", hebrew: "תֵּבֵל (tevel)", def: "World, universe, order; the arrangement of creation; the fallen world system opposed to God." },
  "flesh": { strong: "G4561", greek: "σάρξ (sarx)", hebrew: "בָּשָׂר (basar)", def: "Flesh, body, human nature; the physical body; human frailty; the sinful nature in opposition to the Spirit." },
  "stone": { strong: "G3037", greek: "λίθος (lithos)", hebrew: "אֶבֶן (even)", def: "Stone, rock; building material; Christ as the cornerstone; stumbling stone; precious stones in the New Jerusalem." },
  "rock": { strong: "G4073", greek: "πέτρα (petra)", hebrew: "סֶלַע (sela)", def: "Rock, bedrock, cliff; God as the Rock of refuge; Peter (Petros); Christ as the spiritual Rock." },
  "shepherd": { strong: "G4166", greek: "ποιμήν (poimen)", hebrew: "רֹעֶה (ro'eh)", def: "Shepherd, pastor; one who tends flocks; Christ the Good Shepherd; spiritual leaders as under-shepherds." },
  "sheep": { strong: "G4263", greek: "πρόβατον (probaton)", hebrew: "שֶׂה (seh)", def: "Sheep; God's people; the lost sheep of Israel; the flock committed to the Shepherd's care." },
  "lamb": { strong: "G721", greek: "ἀρνίον (arnion)", hebrew: "כֶּבֶשׂ (keves)", def: "Lamb; the Passover lamb; Christ as the Lamb of God who takes away the sin of the world." },
  "king": { strong: "G935", greek: "βασιλεύς (basileus)", hebrew: "מֶלֶךְ (melekh)", def: "King, ruler; one who reigns; God as the great King; Christ as King of kings; the kingly office of Christ." },
  "priest": { strong: "G2409", greek: "ἱερεύς (hiereus)", hebrew: "כֹּהֵן (kohen)", def: "Priest; one who offers sacrifices and mediates between God and humanity; Christ as High Priest." },
  "prophet": { strong: "G4396", greek: "προφήτης (prophetes)", hebrew: "נָבִיא (navi)", def: "Prophet; one who speaks for God; a divinely inspired messenger who proclaims God's word." },
  "apostle": { strong: "G652", greek: "ἀπόστολος (apostolos)", hebrew: "שָׁלִיחַ (shaliach)", def: "Apostle, messenger, delegate; one sent with authority; the foundational office in the early church." },
  "disciple": { strong: "G3101", greek: "μαθητής (mathetes)", hebrew: "לִמּוּד (limmud)", def: "Disciple, learner, follower; one who learns from and follows a teacher; a committed follower of Christ." },
  "servant": { strong: "G1401", greek: "δοῦλος (doulos)", hebrew: "עֶבֶד (eved)", def: "Servant, slave, bondservant; one who is subject to another's will; a willing servant of Christ." },
  "master": { strong: "G2962", greek: "κύριος (kyrios)", hebrew: "אָדוֹן (adon)", def: "Lord, master, owner; one having authority; the divine name; Jesus Christ as Lord and Master." },
  "teacher": { strong: "G1320", greek: "διδάσκαλος (didaskalos)", hebrew: "מוֹרֶה (moreh)", def: "Teacher, instructor; one who imparts knowledge; a recognized office in the early church." },
  "law": { strong: "G3551", greek: "νόμος (nomos)", hebrew: "תּוֹרָה (torah)", def: "Law, principle, instruction; the Mosaic Law; the Pentateuch; the guiding principle of Christian life." },
  "commandment": { strong: "G1785", greek: "ἐντολή (entole)", hebrew: "מִצְוָה (mitzvah)", def: "Commandment, order, precept; a divine injunction; the moral commands of God." },
  "sabbath": { strong: "G4521", greek: "σάββατον (sabbaton)", hebrew: "שַׁבָּת (shabbat)", def: "Sabbath, rest; the seventh day of rest; the principle of spiritual rest in Christ." },
  "circumcision": { strong: "G4061", greek: "περιτομή (peritome)", hebrew: "מִילָה (milah)", def: "Circumcision; the physical sign of the Abrahamic covenant; the circumcision of the heart." },
  "baptism": { strong: "G908", greek: "βάπτισμα (baptisma)", hebrew: "טְבִילָה (tevilah)", def: "Baptism, immersion; the initiatory rite of the Christian faith; identification with Christ's death and resurrection." },
  "communion": { strong: "G2842", greek: "κοινωνία (koinonia)", hebrew: "חֲבוּרָה (chavurah)", def: "Fellowship, communion, participation, sharing; the intimate bond of believers; the Lord's Supper." },
  "church": { strong: "G1577", greek: "ἐκκλησία (ekklesia)", hebrew: "קָהָל (kahal)", def: "Church, assembly, congregation; the called-out people of God; the body of Christ." },
  "witness": { strong: "G3144", greek: "μάρτυς (martys)", hebrew: "עֵד (ed)", def: "Witness, martyr; one who testifies; one who bears testimony even unto death; the Holy Spirit as witness." },
  "testimony": { strong: "G3142", greek: "μαρτύριον (martyron)", hebrew: "עֵדוּת (edut)", def: "Testimony, evidence, witness; the attestation of truth; the testimony of Scripture; the testimony of Jesus." },
  "miracle": { strong: "G4592", greek: "σημεῖον (semeion)", hebrew: "אוֹת (ot)", def: "Sign, miracle, wonder; a supernatural occurrence; a token pointing to divine power or truth." },
  "sign": { strong: "G4592", greek: "σημεῖον (semeion)", hebrew: "אוֹת (ot)", def: "Sign, mark, token; an indicator pointing beyond itself; a miracle as authenticating divine commission." },
  "parable": { strong: "G3850", greek: "παραβολή (parabole)", hebrew: "מָשָׁל (mashal)", def: "Parable, proverb, figure; an earthly story with a heavenly meaning; Jesus' primary teaching method." },
  "proverb": { strong: "G3942", greek: "παροιμία (paroimia)", hebrew: "מָשָׁל (mashal)", def: "Proverb, maxim, aphorism; a short wisdom saying; a figurative or enigmatic saying." },
  "vision": { strong: "G3706", greek: "ὅραμα (horama)", hebrew: "מַחֲזֶה (chazon)", def: "Vision, appearance, revelation; a supernatural sight; divine revelation through visual imagery." },
  "dream": { strong: "G1798", greek: "ἐνύπνιον (enypnion)", hebrew: "חֲלוֹם (chalom)", def: "Dream; a vision in sleep; a means of divine communication in the biblical narrative." },
  "prophecy": { strong: "G4394", greek: "προφητεία (propheteia)", hebrew: "נְבוּאָה (nevurah)", def: "Prophecy, inspired utterance; the declaration of God's message; foretelling and forthtelling." },
  "revelation": { strong: "G602", greek: "ἀποκάλυψις (apokalypsis)", hebrew: "גִּלּוּי (gillui)", def: "Revelation, unveiling, disclosure; the uncovering of hidden truth; the divine self-disclosure." },
  "mystery": { strong: "G3466", greek: "μυστήριον (mysterion)", hebrew: "סוֹד (sod)", def: "Mystery, secret; divine truth hidden but now revealed; the mystery of Christ; the gospel." },
  "resurrection": { strong: "G386", greek: "ἀνάστασις (anastasis)", hebrew: "תְּחִיָּה (techeeyah)", def: "Resurrection, rising up; the raising of the dead; Christ's victory over death; the believer's future hope." },
  "ascension": { strong: "G399", greek: "ἀνάληψις (analepsis)", hebrew: "עֲלִיָּה (aliyah)", def: "Ascension; Christ's bodily ascent into heaven; His exaltation to the right hand of the Father." },
  "incarnation": { strong: "none", greek: "ἐνσάρκωσις (ensarkosis)", hebrew: "הִתְגַּלְּמוּת (hitgalmut)", def: "Incarnation; the act of God becoming flesh in Jesus Christ; the union of divine and human natures." },
  "atonement": { strong: "G2643", greek: "καταλλαγή (katallage)", hebrew: "כַּפָּרָה (kaparah)", def: "Atonement, reconciliation; the covering of sin; Christ's work of restoring the relationship between God and humanity." },
  "justification": { strong: "G1347", greek: "δικαίωσις (dikaiosis)", hebrew: "הַצְדָּקָה (hatzdakah)", def: "Justification, acquittal; the act of being declared righteous by God through faith in Christ." },
  "sanctification": { strong: "G38", greek: "ἁγιασμός (hagiasmos)", hebrew: "קִדּוּשׁ (kiddush)", def: "Sanctification, consecration, holiness; the process of being made holy; being set apart for God's purposes." },
  "election": { strong: "G1589", greek: "ἐκλογή (ekloge)", hebrew: "בְּחִירָה (bechirah)", def: "Election, selection, choice; God's sovereign choosing of individuals or a people for His purposes." },
  "predestination": { strong: "G4309", greek: "προορίζω (proorizo)", hebrew: "יִעוּד (yi'ud)", def: "To predestine, foreordain; to determine beforehand; God's eternal decree regarding His people." },
  "providence": { strong: "G4307", greek: "πρόνοια (pronoia)", hebrew: "הַשְׁגָּחָה (hashgachah)", def: "Providence, foresight, care; God's sustaining and governing of all creation; His attentive care." },
  "sovereignty": { strong: "G2963", greek: "κυριότης (kyriotes)", hebrew: "מֶמְשָׁלָה (memshalah)", def: "Sovereignty, lordship, dominion; God's supreme authority over all creation; His absolute rule." },
  "glorification": { strong: "G1392", greek: "δοξάζω (doxazo)", hebrew: "כָּבַד (kavad)", def: "Glorification; the final stage of salvation; the transformation of believers into Christ's likeness at His coming." },
  "adoption": { strong: "G5206", greek: "υἱοθεσία (huiothesia)", hebrew: "אִמּוּץ (imutz)", def: "Adoption, sonship; the act of God making believers His children; full rights as heirs of God." },
  "inheritance": { strong: "G2817", greek: "κληρονομία (kleronomia)", hebrew: "נַחֲלָה (nachalah)", def: "Inheritance, heritage, portion; the eternal possession promised to God's children; the kingdom." },
  "temptation": { strong: "G3986", greek: "πειρασμός (peirasmos)", hebrew: "נִסָּיוֹן (nisayon)", def: "Temptation, trial, testing; enticement to sin; a test that refines character; overcome by Christ." },
  "perseverance": { strong: "G5281", greek: "ὑπομονή (hypomone)", hebrew: "סַבְלָנוּת (savlanut)", def: "Perseverance, endurance, steadfastness; the capacity to remain faithful under trial; patient waiting." },
  "suffering": { strong: "G3804", greek: "πάθημα (pathema)", hebrew: "עִנּוּי (inui)", def: "Suffering, affliction, hardship; the experience of pain and difficulty; redemptive suffering in Christ." },
  "joy": { strong: "G5479", greek: "χαρά (chara)", hebrew: "שִׂמְחָה (simchah)", def: "Joy, delight, gladness; deep inner rejoicing; the fruit of the Spirit; joy in the presence of God." },
  "happiness": { strong: "G3107", greek: "μακάριος (makarios)", hebrew: "אַשְׁרֵי (ashrei)", def: "Blessed, happy, fortunate; the state of well-being that comes from divine favor; the Beatitudes." },
  "blessed": { strong: "G3107", greek: "μακάριος (makarios)", hebrew: "בָּרוּךְ (baruch)", def: "Blessed, praised, fortunate; the recipient of divine favor; the state of those who inherit God's kingdom." },
  "poor": { strong: "G4434", greek: "πτωχός (ptochos)", hebrew: "עָנִי (ani)", def: "Poor, destitute, beggarly; those lacking material wealth; the spiritually humble; objects of God's special care." },
  "rich": { strong: "G4145", greek: "πλούσιος (plousios)", hebrew: "עָשִׁיר (ashir)", def: "Rich, wealthy; possessing abundance; the danger of wealth; being rich toward God." },
  "humble": { strong: "G5011", greek: "ταπεινός (tapeinos)", hebrew: "שָׁפָל (shafal)", def: "Humble, lowly, meek; having a modest view of oneself; the virtue of recognizing dependence on God." },
  "pride": { strong: "G5244", greek: "ὑπερήφανος (hyperephanos)", hebrew: "גַּאֲוָה (ga'avah)", def: "Pride, arrogance, haughtiness; an inflated self-estimation; the root of sin; what God opposes." },
  "fear": { strong: "G5401", greek: "φόβος (phobos)", hebrew: "יִרְאָה (yir'ah)", def: "Fear, reverence, awe; the fear of the Lord as the beginning of wisdom; reverent awe of God's majesty." },
  "comfort": { strong: "G3870", greek: "παρακλησις (paraklesis)", hebrew: "נֶחָמָה (nechamah)", def: "Comfort, consolation, encouragement; the ministry of the Holy Spirit as Comforter; the encouragement of Scripture." },
  "strength": { strong: "G2479", greek: "ἰσχύς (ischys)", hebrew: "כֹּחַ (koach)", def: "Strength, might, power; physical or spiritual capacity; divine enablement; the Lord as our strength." },
  "heal": { strong: "G2390", greek: "ἰάομαι (iaomai)", hebrew: "רָפָא (rafa)", def: "To heal, cure, restore; physical or spiritual restoration; divine healing; the Great Physician." },
  "restore": { strong: "G600", greek: "ἀποκαθίστημι (apokathistemi)", hebrew: "שׁוּב (shuv)", def: "To restore, renew, reestablish; to bring back to original state; the restoration of all things." },
  "deliver": { strong: "G4506", greek: "ῥύομαι (rhyomai)", hebrew: "נָצַל (natzal)", def: "To deliver, rescue, save; to draw out of danger; God's act of delivering His people from bondage." },
  "protect": { strong: "G5432", greek: "φρουρέω (phroureo)", hebrew: "שָׁמַר (shamar)", def: "To guard, protect, keep; to watch over; God's protective care over His people; the keeping of the faith." },
  "guide": { strong: "G3594", greek: "ὁδηγέω (hodegeo)", hebrew: "נָחָה (nachah)", def: "To guide, lead, direct; to show the way; the Holy Spirit's leading; God's guidance of His people." },
  "teach": { strong: "G1321", greek: "διδάσκω (didasko)", hebrew: "לָמַד (lamad)", def: "To teach, instruct; to impart knowledge and understanding; the teaching office in the church; God as Teacher." },
  "preach": { strong: "G2784", greek: "κηρύσσω (kerusso)", hebrew: "קָרָא (kara)", def: "To preach, proclaim, herald; to announce publicly; the proclamation of the gospel to all nations." },
  "gospel": { strong: "G2098", greek: "εὐαγγέλιον (euangelion)", hebrew: "בְּשׂוֹרָה (besorah)", def: "Gospel, good news; the glad tidings of salvation through Jesus Christ; the message of the kingdom." },
  "scripture": { strong: "G1124", greek: "γραφή (graphe)", hebrew: "כָּתוּב (katuv)", def: "Scripture, writing; the sacred writings; the divinely inspired Word of God; the Old and New Testaments." },
  "heavenly": { strong: "G2032", greek: "ἐπουράνιος (epouranios)", hebrew: "שָׁמַיְמִי (shamaymi)", def: "Heavenly, celestial; belonging to or originating from heaven; the heavenly realm; the heavenly calling." },
  "eternal": { strong: "G166", greek: "αἰώνιος (aionios)", hebrew: "נִצְחִי (nitzchi)", def: "Eternal, everlasting, perpetual; age-enduring; without beginning or end; the nature of God's life." },
  "immortal": { strong: "G862", greek: "ἄφθαρτος (aphthartos)", hebrew: "אַל־מָוֶת (al-mavet)", def: "Immortal, imperishable, incorruptible; not subject to decay or death; the resurrection body." },
  "invisible": { strong: "G517", greek: "ἀόρατος (aoratos)", hebrew: "נֶעְלָם (ne'lam)", def: "Invisible, unseen; that which cannot be perceived by physical sight; the nature of God; eternal realities." },
  "believe": { strong: "G4100", greek: "πιστεύω (pisteuo)", hebrew: "אָמַן (aman)", def: "To believe, trust, have faith; to accept as true; to entrust oneself to Christ; saving faith." },
  "obey": { strong: "G5219", greek: "ὑπακούω (hypakouo)", hebrew: "שָׁמַע (shama)", def: "To obey, listen, heed; to submit to authority; the obedience of faith; hearing and doing God's word." },
  "confess": { strong: "G3670", greek: "ὁμολογέω (homologeo)", hebrew: "יָדָה (yadah)", def: "To confess, acknowledge, profess; to declare openly; confession of sin; confession of Christ as Lord." },
};

computeFrequencies();

function getWordStudy(word) {
  var w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w || w.length < 2) return null;
  var entry = LEXICON[w];
  var freq = WORD_FREQ[w] || 0;
  var baseForm = w;
  if (!entry && w.endsWith('s')) { baseForm = w.slice(0, -1); entry = LEXICON[baseForm]; }
  if (!entry && w.endsWith('ed')) { baseForm = w.slice(0, -2); entry = LEXICON[baseForm]; }
  if (!entry && w.endsWith('ing')) { baseForm = w.slice(0, -3); entry = LEXICON[baseForm]; }
  if (!entry && w.endsWith('ly')) { baseForm = w.slice(0, -2); entry = LEXICON[baseForm]; }
  if (!entry && w.endsWith('ness')) { baseForm = w.slice(0, -4); entry = LEXICON[baseForm]; }
  if (!entry && w.endsWith('tion')) { baseForm = w.slice(0, -4) + 'e'; entry = LEXICON[baseForm]; }
  if (!entry && w.endsWith('ment')) { baseForm = w.slice(0, -4); entry = LEXICON[baseForm]; }
  return {
    word: w,
    baseForm: baseForm !== w ? baseForm : null,
    frequency: freq,
    strong: entry ? entry.strong : null,
    greek: entry ? entry.greek : null,
    hebrew: entry ? entry.hebrew : null,
    definition: entry ? entry.def : null,
    inLexicon: !!entry
  };
}

module.exports = { getWordStudy, LEXICON: LEXICON, WORD_FREQ: WORD_FREQ };
