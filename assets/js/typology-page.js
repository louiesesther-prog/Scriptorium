(function() {
'use strict';
var TYPOLOGY_DATA = {
    tabernacle: [
        { ot: "GATE OF THE COURT", otRef: "Exodus 27:16", nt: "Christ the Only Way", ntRef: "John 10:9", cat: "ACCESS", exp: "One gate. One entrance. No one comes to the Father except through Him. The single east-facing entrance to the Outer Court was the only way into God's presence." },
        { ot: "ALTAR OF BURNT OFFERING", otRef: "Exodus 27:1", nt: "Christ Our Sacrifice", ntRef: "Hebrews 13:10", cat: "ATONEMENT", exp: "Every animal laid on the bronze altar foreshadowed the one Lamb of God whose blood would truly atone once for all. The fire that never went out speaks of God's eternal demand for righteousness." },
        { ot: "BRONZE LAVER", otRef: "Exodus 30:18", nt: "Regeneration & the Word", ntRef: "Titus 3:5", cat: "WASHING", exp: "The washing prerequisite to priestly service foreshadows regeneration and the sanctifying washing of the water of the Word. Made from the mirrors of serving women — the Word exposes and cleanses." },
        { ot: "THE HIGH PRIEST (Outer Court)", otRef: "Hebrews 9:7", nt: "Christ Our Great High Priest", ntRef: "Hebrews 9:11", cat: "MEDIATION", exp: "Every ritual act in the court — washing, offering, interceding — was a shadow of Christ's eternal ministry in the heavenly sanctuary." },
        { ot: "COURT PILLARS", otRef: "Exodus 27:9", nt: "The Saints as Living Pillars", ntRef: "Revelation 3:12", cat: "BUILDING", exp: "The sixty bronze pillars that held up the linen court walls foreshadow the overcomers who are made pillars in God's temple, never to depart." },
        { ot: "THE GOLDEN MENORAH", otRef: "Exodus 25:31", nt: "The Holy Spirit — Seven-fold Fullness", ntRef: "Revelation 4:5", cat: "ILLUMINATION", exp: "The seven lamps burning before God's throne echo the Menorah's continual burning in God's presence. The Spirit as the seven lamps supplies light for the priestly service." },
        { ot: "TABLE OF SHEWBREAD", otRef: "Leviticus 24:5", nt: "Christ the Bread of Life", ntRef: "John 6:35", cat: "SUSTENANCE", exp: "Twelve loaves for twelve tribes — presence bread for all Israel, pointing to the one Bread who gives life to the world. Replaced every Sabbath, pointing to the eternal provision in Christ." },
        { ot: "GOLDEN ALTAR OF INCENSE", otRef: "Exodus 30:1", nt: "The Prayers of the Saints", ntRef: "Revelation 8:3", cat: "INTERCESSION", exp: "Incense burned every morning and evening before the veil, rising to God. The prayers of all saints rise before the throne as incense, mingled with Christ's intercession." },
        { ot: "THE INNER VEIL", otRef: "Exodus 26:31", nt: "Christ's Flesh — The Way Opened", ntRef: "Hebrews 10:20", cat: "ACCESS", exp: "The veil was His body. Its tearing from top to bottom was not destruction but the opening of an eternal way into God's holy presence for all who believe." },
        { ot: "ARK OF THE COVENANT", otRef: "Exodus 25:10", nt: "Christ — Throne of Grace & Propitiation", ntRef: "Romans 3:25", cat: "PROPITIATION", exp: "The Ark held the broken Law; the Mercy Seat covered it with blood. Christ both fulfilled the Law and became the one propitiation for our sins." },
        { ot: "THE MERCY SEAT", otRef: "Exodus 25:17", nt: "The Throne of Grace", ntRef: "Hebrews 4:16", cat: "ACCESS", exp: "Approached by the High Priest in trembling once a year with blood, we now approach continually and boldly through Christ, who is our propitiation." },
        { ot: "HIGH PRIEST (Holy of Holies)", otRef: "Hebrews 9:7", nt: "Christ's Eternal Priesthood", ntRef: "Hebrews 9:12", cat: "REDEMPTION", exp: "He entered once for all into the holy places by means of His own blood, securing an eternal redemption — not the blood of bulls and goats." }
    ],
    feasts: [
        { ot: "PASSOVER (Pesach)", otRef: "Exodus 12:1-14", nt: "Christ Our Passover", ntRef: "1 Corinthians 5:7", cat: "REDEMPTION", exp: "The lamb without blemish, its blood applied to the doorposts, the haste of deliverance — all perfectly fulfilled in the crucifixion of Christ, the Lamb of God." },
        { ot: "UNLEAVENED BREAD (Matzot)", otRef: "Exodus 12:15-20", nt: "Sincerity and Truth", ntRef: "1 Corinthians 5:8", cat: "SANCTIFICATION", exp: "Leaven represents sin and malice. The seven days of unleavened bread depict the Christian life as a continual feast of purity, feeding on Christ the sinless One." },
        { ot: "FIRSTFRUITS (Bikkurim)", otRef: "Leviticus 23:9-14", nt: "Christ's Resurrection", ntRef: "1 Corinthians 15:20", cat: "RESURRECTION", exp: "The sheaf of firstfruits waved before the Lord on the day after the Sabbath — Christ rose as the firstfruits of those who have fallen asleep, guaranteeing the harvest." },
        { ot: "PENTECOST (Shavuot)", otRef: "Leviticus 23:15-22", nt: "The Outpouring of the Spirit", ntRef: "Acts 2:1-4", cat: "DISPENSING", exp: "Two loaves baked with leaven — Jew and Gentile — waved before the Lord. Fifty days after the firstfruits, the Spirit was poured out to form the church, the Body of Christ." },
        { ot: "TRUMPETS (Yom Teruah)", otRef: "Leviticus 23:23-25", nt: "The Rapture of the Church", ntRef: "1 Thessalonians 4:16", cat: "CONSUMMATION", exp: "The blowing of trumpets on the first day of the seventh month heralds the gathering of God's people. The last trumpet signals the resurrection and translation of the saints." },
        { ot: "DAY OF ATONEMENT (Yom Kippur)", otRef: "Leviticus 23:26-32", nt: "National Repentance of Israel", ntRef: "Zechariah 12:10", cat: "RESTORATION", exp: "The one day the High Priest entered the Holy of Holies with blood. The affliction of souls and the scapegoat sent into the wilderness prefigure Israel's future repentance and cleansing when they look upon the One they pierced." },
        { ot: "TABERNACLES (Sukkot)", otRef: "Leviticus 23:33-44", nt: "The Eternal Dwelling of God", ntRef: "Revelation 21:3", cat: "CONSUMMATION", exp: "Seven days in booths remembering the wilderness journey point to the eternal tabernacle — God dwelling with men in the New Jerusalem, the ultimate feast of ingathering." }
    ],
    offerings: [
        { ot: "BURNT OFFERING", otRef: "Leviticus 1:1-17", nt: "Christ's Absolute Consecration", ntRef: "Hebrews 10:5-7", cat: "CONSECRATION", exp: "Wholly consumed on the altar — a sweet savor to God. Christ offered Himself without spot to God, not for sin but for God's pleasure. The entire animal ascending in smoke speaks of total self-giving to God." },
        { ot: "MEAL OFFERING", otRef: "Leviticus 2:1-16", nt: "Christ's Perfect Humanity", ntRef: "Philippians 2:5-8", cat: "INCARNATION", exp: "Fine flour mingled with oil and frankincense — no blood. The fine flour speaks of Christ's balanced, refined humanity. Oil is the Spirit; frankincense is the fragrance of His life. No leaven (sin) and no honey (natural sweetness)." },
        { ot: "PEACE OFFERING", otRef: "Leviticus 3:1-17", nt: "Christ Our Peace & Fellowship", ntRef: "Ephesians 2:14-16", cat: "FELLOWSHIP", exp: "A shared meal between God, the priest, and the offerer — communion restored. Christ made peace through the blood of His cross, creating one new man and bringing access to the Father." },
        { ot: "SIN OFFERING", otRef: "Leviticus 4:1-35", nt: "Christ Made Sin for Us", ntRef: "2 Corinthians 5:21", cat: "PROPITIATION", exp: "Offered for sins of ignorance — the deepest exposure of human need. The fat burned on the altar; the body burned outside the camp. Christ was made sin on our behalf outside the gate of Jerusalem." },
        { ot: "TRESPASS OFFERING", otRef: "Leviticus 5:14-6:7", nt: "Christ Restores What Was Lost", ntRef: "Colossians 2:13-14", cat: "RESTORATION", exp: "A specific restitution — the trespass plus one-fifth. Christ not only forgives sins but restores what sin destroyed. The handwriting of ordinances was nailed to the cross." }
    ],
    people: [
        { ot: "ADAM — The First Man", otRef: "Genesis 2:7", nt: "Christ — The Last Adam", ntRef: "1 Corinthians 15:45", cat: "LIFE", exp: "Adam was a living soul; Christ became a life-giving Spirit. As in Adam all die, so in Christ all are made alive. The first man is of the earth; the second Man is out of heaven." },
        { ot: "ABEL — Righteous Shepherd", otRef: "Genesis 4:4", nt: "Christ — The Good Shepherd", ntRef: "John 10:11", cat: "WORSHIP", exp: "Abel's acceptable offering of the firstborn of his flock speaks of Christ, the Lamb slain from the foundation of the world. His blood cries out better things than that of Abel." },
        { ot: "MELCHIZEDEK — Priest-King", otRef: "Genesis 14:18", nt: "Christ — Priest Forever", ntRef: "Hebrews 7:1-3", cat: "PRIESTHOOD", exp: "King of Salem, priest of God Most High, without genealogy — a type of Christ's eternal priesthood. Melchizedek brought bread and wine to Abraham, as Christ brought the new covenant." },
        { ot: "ISAAC — The Beloved Son", otRef: "Genesis 22:2", nt: "Christ — The Only Begotten", ntRef: "John 3:16", cat: "SACRIFICE", exp: "Abraham offered his only beloved son on Moriah; the ram caught in the thicket was the substitute. God so loved the world that He gave His only begotten Son, and the Lord Himself provided the Lamb." },
        { ot: "JOSEPH — Rejected Ruler", otRef: "Genesis 37:28", nt: "Christ — Despised and Exalted", ntRef: "Acts 7:9-10", cat: "EXALTATION", exp: "Hated by his brothers, sold for silver, falsely accused, yet raised to the throne of Egypt. Joseph's provision of grain during famine prefigures Christ as the bread of life for a starving world." },
        { ot: "MOSES — The Deliverer", otRef: "Exodus 3:10", nt: "Christ — The Greater Prophet", ntRef: "Acts 3:22", cat: "DELIVERANCE", exp: "A prophet like Moses — but greater. Moses led Israel from physical bondage; Christ delivers from the bondage of sin and death. Moses was faithful as a servant; Christ as a Son over His house." },
        { ot: "JOSHUA — The Conqueror", otRef: "Joshua 1:1-6", nt: "Jesus — Captain of Salvation", ntRef: "Hebrews 2:10", cat: "INHERITANCE", exp: "Joshua (Yeshua) led Israel into the Promised Land, conquering Jericho and the seven nations. Jesus (the Greek form of Yeshua) leads many sons into glory, the true rest of God." },
        { ot: "DAVID — The Shepherd King", otRef: "1 Samuel 16:12-13", nt: "Christ — Son of David", ntRef: "Luke 1:32-33", cat: "KINGSHIP", exp: "Anointed by Samuel, shepherd of Israel, slayer of Goliath, established of Jerusalem. David's greater Son sits on the throne of David forever in an unshakeable kingdom." },
        { ot: "SOLOMON — The Wise Builder", otRef: "1 Kings 3:5-14", nt: "Christ — Greater than Solomon", ntRef: "Matthew 12:42", cat: "WISDOM", exp: "Solomon built the Temple, spoke wisdom, and received the wealth of the nations. Christ builds the church, is the wisdom of God, and possesses all the treasures of wisdom and knowledge." },
        { ot: "JONAH — Buried and Risen", otRef: "Jonah 1:17", nt: "Christ — Three Days in the Grave", ntRef: "Matthew 12:40", cat: "RESURRECTION", exp: "Three days and three nights in the belly of the great fish — the only sign given to an evil generation. As Jonah was raised to preach repentance, Christ was raised for our justification." }
    ],
    wilderness: [
        { ot: "CROSSING THE RED SEA", otRef: "Exodus 14:21-22", nt: "Baptism into Christ", ntRef: "1 Corinthians 10:1-2", cat: "DELIVERANCE", exp: "The waters parted, Israel passed through on dry ground, and the pursuing Egyptians were drowned. So baptism separates us from the world and joins us to Christ in His death and resurrection." },
        { ot: "MANNA FROM HEAVEN", otRef: "Exodus 16:14-18", nt: "Christ the Heavenly Bread", ntRef: "John 6:31-35", cat: "LIFE", exp: "Daily bread from heaven — gathered morning by morning, enough for each day. Christ is the true manna, the living bread that comes down from heaven, given for the life of the world." },
        { ot: "WATER FROM THE ROCK", otRef: "Exodus 17:6", nt: "Christ the Spiritual Rock", ntRef: "1 Corinthians 10:4", cat: "DISPENSING", exp: "Moses struck the rock at Horeb, and water flowed for the thirsty people. The smitten Rock is Christ, and the flowing water is the Spirit — the divine dispensing of life to God's people." },
        { ot: "THE BRAZEN SERPENT", otRef: "Numbers 21:8-9", nt: "Christ Lifted Up for Sin", ntRef: "John 3:14-15", cat: "SALVATION", exp: "Those bitten by serpents looked upon the bronze serpent lifted on a pole and lived. Christ was made in the likeness of sinful flesh and lifted up on the cross — whoever looks upon Him in faith is saved." },
        { ot: "THE PILLAR OF CLOUD & FIRE", otRef: "Exodus 13:21", nt: "The Spirit of Guidance", ntRef: "Romans 8:14", cat: "GUIDANCE", exp: "The cloud by day and fire by night led Israel through the wilderness. The Spirit leads the sons of God, guiding them into all truth and directing their path through the journey of life." },
        { ot: "ENTERING THE LAND OF CANAAN", otRef: "Joshua 3:14-17", nt: "Entering the Kingdom", ntRef: "Acts 14:22", cat: "INHERITANCE", exp: "The Jordan River parted as the priests bore the Ark. Israel crossed into the Promised Land, their inheritance. The kingdom of God is entered through much tribulation, the overcoming of the Jordan of death." }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    function renderGrid(gridId, data) {
        var grid = document.getElementById(gridId);
        if (!grid) return;
        grid.innerHTML = '';
        data.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'ty-card';
            card.innerHTML =
                '<div class="ty-ot"><div class="ty-label">TYPE &#8212; OLD TESTAMENT</div><div class="ty-name">' + item.ot + '</div><div class="ty-ref">' + item.otRef + '</div></div>' +
                '<div class="ty-arc"><span class="arc-arrow">&#10230;</span><span class="arc-cat">' + item.cat + '</span></div>' +
                '<div class="ty-nt"><div class="ty-label">ANTITYPE &#8212; NEW TESTAMENT</div><div class="ty-name">' + item.nt + '</div><div class="ty-ref" data-ref="' + item.ntRef + '" onclick="window.openScriptureRef(this.dataset.ref)">' + item.ntRef + '</div></div>' +
                '<div class="ty-exposition">' + item.exp + '</div>';
            grid.appendChild(card);
        });
    }

    renderGrid('tabernacleGrid', TYPOLOGY_DATA.tabernacle);
    renderGrid('feastsGrid', TYPOLOGY_DATA.feasts);
    renderGrid('offeringsGrid', TYPOLOGY_DATA.offerings);
    renderGrid('peopleGrid', TYPOLOGY_DATA.people);
    renderGrid('wildernessGrid', TYPOLOGY_DATA.wilderness);
});

window.openScriptureRef = function(ref) {
    if (!ref) return;
    var parts = ref.split(' ');
    var book = parts.slice(0, -1).join(' ');
    var ch = parseInt(parts[parts.length - 1].split(':')[0]) || 1;
    var isOt = window.ScriptoriumCanon && ScriptoriumCanon.isOT ? ScriptoriumCanon.isOT(book) : (function() { var ot = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi']; return ot.indexOf(book) !== -1; })();
    var page = isOt ? 'ot-gallery.html' : 'nt-gallery.html';
    window.location.href = page + '?book=' + encodeURIComponent(book) + '&chapter=' + ch;
};
})();
