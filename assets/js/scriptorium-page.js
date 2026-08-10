const LEGENDS = [
    { name: "Eusebius of Caesarea",  chars: 84200 },
    { name: "St. Jerome",            chars: 72150 },
    { name: "Origen of Alexandria",  chars: 58400 },
    { name: "Athanasius the Great",  chars: 46100 },
    { name: "John Chrysostom",       chars: 38900 },
    { name: "Cyril of Jerusalem",    chars: 31200 },
    { name: "Ephrem the Syrian",     chars: 27500 },
    { name: "Augustine of Hippo",    chars: 24100 },
    { name: "Basil the Great",       chars: 19800 },
    { name: "Gregory of Nyssa",      chars: 15400 }
];

let currentType   = 'NT';

var scribeData = {
    totalCharacters: 0, rank: "INITIATE", name: "",
    versesCompleted: 0, ntVerses: 0, dailyChars: 0, dailyDate: ""
};

(function refreshScribeData() {
    var u = window.__getUnifiedUser ? window.__getUnifiedUser() : null;
    if (u) {
        scribeData.totalCharacters = u.progress.totalCharacters || 0;
        scribeData.rank = u.rank.title || "INITIATE";
        scribeData.name = u.profile.name || "";
        scribeData.versesCompleted = u.progress.versesCompleted || 0;
        scribeData.ntVerses = u.progress.ntVerses || 0;
        scribeData.dailyChars = u.progress.dailyChars || 0;
        scribeData.dailyDate = u.progress.dailyDate || "";
    }
    var today = new Date().toDateString();
    if (scribeData.dailyDate !== today) {
        scribeData.dailyChars = 0;
        scribeData.dailyDate = today;
        writeScribeData();
    }
})();

function writeScribeData() {
    if (!window.__getUnifiedUser || !window.__setUnifiedUser) return;
    var v2 = window.__getUnifiedUser();
    if (!v2) return;
    v2.progress.totalCharacters = scribeData.totalCharacters;
    v2.progress.dailyChars = scribeData.dailyChars;
    v2.progress.dailyDate = scribeData.dailyDate;
    v2.progress.versesCompleted = scribeData.versesCompleted;
    v2.progress.ntVerses = scribeData.ntVerses;
    v2.rank.title = scribeData.rank;
    v2.profile.name = scribeData.name;
    window.__setUnifiedUser(v2);
}

function refreshScribeData() {
    var u = window.__getUnifiedUser ? window.__getUnifiedUser() : null;
    if (u) {
        scribeData.totalCharacters = u.progress.totalCharacters || 0;
        scribeData.rank = u.rank.title || "INITIATE";
        scribeData.name = u.profile.name || "";
        scribeData.versesCompleted = u.progress.versesCompleted || 0;
        scribeData.ntVerses = u.progress.ntVerses || 0;
        scribeData.dailyChars = u.progress.dailyChars || 0;
        scribeData.dailyDate = u.progress.dailyDate || "";
    }
}

(function() {
    var overlay = document.getElementById('namingOverlay');
    var input = document.getElementById('namingInput');
    var gender = document.getElementById('namingGender');
    var region = document.getElementById('namingRegion');
    var submit = document.getElementById('namingSubmit');
    var error = document.getElementById('namingError');
    function commit() {
        var trimmed = (input.value || '').trim();
        if (!trimmed) { error.style.display = 'block'; return; }
        error.style.display = 'none';
        scribeData.name = trimmed;
        scribeData.rank = calculateRank(scribeData.totalCharacters);
        writeScribeData();
        if (window.__getUnifiedUser && window.__setUnifiedUser) {
            var v2 = window.__getUnifiedUser();
            if (v2) {
                v2.profile.gender = gender.value || 'male';
                v2.profile.location = region.value.trim() || '—';
                window.__setUnifiedUser(v2);
            }
        }
        overlay.classList.remove('active');
        if (typeof ThreadUnwrap !== 'undefined' && ThreadUnwrap.play) {
            ThreadUnwrap.play('OT', function() {});
        }
    }
    if (!scribeData.name) {
        overlay.classList.add('active');
        setTimeout(function() { input.focus(); }, 150);
        submit.addEventListener('click', commit);
        input.addEventListener('keydown', function(e) { if (e.key === 'Enter') commit(); });
        input.addEventListener('input', function() { error.style.display = 'none'; });
    }
})();

const stage       = document.getElementById('stage');
const toast       = document.getElementById('toast');

function calculateRank(chars) {
    if (typeof ScriptoriumCore !== 'undefined' && ScriptoriumCore.computeRankFromXp) {
        return ScriptoriumCore.computeRankFromXp(ScriptoriumCore.getTotalXp());
    }
    if (chars > 5000)  return "ILLUMINATOR";
    if (chars > 1000)  return "MASTER SCRIBE";
    if (chars > 200)   return "SCRIBE";
    return "INITIATE";
}

function renderHallOfScribes() {
    const el = document.getElementById('hallOfScribes');
    if (!el) return;
    el.innerHTML = LEGENDS.map(function(e) {
        return '<div style="display:flex;justify-content:space-between;padding:3px 0;font-family:\'Cormorant Garamond\',serif;font-size:0.65rem;color:rgba(212,175,55,0.25);border-bottom:1px solid rgba(255,255,255,0.02);">' +
            '<span>' + e.name + '</span>' +
            '<span style="font-family:\'Cinzel\',serif;font-size:var(--text-micro);color:rgba(212,175,55,0.15);">' + e.chars.toLocaleString() + '</span></div>';
    }).join('');
}

function getLeaderboard() {
    var xp = 0;
    if (typeof ScriptoriumCore !== 'undefined' && ScriptoriumCore.getTotalXp) xp = ScriptoriumCore.getTotalXp();
    const userEntry = { name: scribeData.name || "Anonymous Scribe", chars: xp, isUser: true };
    return [userEntry];
}

function updateUI() {
    scribeData.rank = calculateRank(scribeData.totalCharacters);
    writeScribeData();
    const rank  = scribeData.rank;
    const chars = scribeData.totalCharacters;
    const lbTc = document.getElementById('lbTotalChars');
    const lbCr = document.getElementById('lbCurrentRank');
    if (lbTc) lbTc.innerText = chars.toLocaleString();
    if (lbCr) lbCr.innerText = rank;
    var xp = 0;
    if (typeof ScriptoriumCore !== 'undefined' && ScriptoriumCore.getTotalXp) xp = ScriptoriumCore.getTotalXp();
    const elRank = document.getElementById('rankDisplay');
    const elChars = document.getElementById('charsDisplay');
    const elSidebar = document.getElementById('sidebarRank');
    if (elRank) elRank.innerText = rank;
    if (elChars) elChars.innerText = xp.toLocaleString() + ' XP';
    if (elSidebar) elSidebar.innerHTML = rank + '<br><span id="sidebarChars" style="opacity:0.5;font-size:0.75em;">' + xp + ' XP</span>';
    renderLedger();
    renderHallOfScribes();
}

function renderLedger() {
    const body = document.getElementById('ledgerBody');
    if (!body) return;
    const all  = getLeaderboard();
    body.innerHTML = "";
    all.forEach(function(entry) {
        const row = document.createElement('div');
        row.className = 'ledger-row' + (entry.isUser ? ' user-row' : '');
        row.innerHTML = '<span style="color:rgba(212,175,55,0.5);font-size: var(--text-micro);">&#9733;</span><span>' + window.escHtml(entry.name) + ' <span style="font-size: var(--text-micro);color:rgba(212,175,55,0.85);font-family:Cinzel,serif;letter-spacing:1px;">(YOU)</span></span><span style="font-family:Cinzel,serif;font-size: var(--text-micro);letter-spacing:1px;color:rgba(212,175,55,0.85);">' + entry.chars.toLocaleString() + '</span>';
        body.appendChild(row);
    });
}

function showToast(msg, duration) {
    duration = duration || 2800;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, duration);
}

function switchTestament(type) {
    var ropeThread = document.querySelector('#ropeLine .rope-thread');
    if (ropeThread) ropeThread.style.boxShadow = '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.3)';
    currentType = type;
    stage.classList.remove('ot-active', 'nt-active', 'scribe-active');
    stage.classList.add(type === 'OT' ? 'ot-active' : 'nt-active');
    document.body.classList.remove('ot-active', 'nt-active');
    document.body.classList.add(type === 'OT' ? 'ot-active' : 'nt-active');
    if (window.ScriptoriumAudio && window.ScriptoriumAudio.init) {
        window.ScriptoriumAudio.init();
        window.ScriptoriumAudio.transitionTo(type === 'OT' ? 'ot' : 'nt');
    }
    var ropeLine = document.getElementById('ropeLine');
    if (ropeLine) {
        ropeLine.classList.remove('rope-animating');
        void ropeLine.offsetWidth;
        ropeLine.classList.add('rope-animating');
        setTimeout(function() { ropeLine.classList.remove('rope-animating'); }, 3200);
    }
    var sb = document.getElementById('sidebar');
    if (sb) { sb.style.opacity = '1'; sb.style.pointerEvents = 'auto'; }
    createParticles(type);
}

function createParticles(type) {
    const canvas = document.getElementById('particleCanvas');
    canvas.innerHTML = '';
    for (let i = 0; i < 45; i++) {
        const p = document.createElement('div');
        p.className = 'particle ' + (type === 'NT' ? 'nt-particle' : 'ot-particle');
        const drift = (Math.random() * 100 - 50);
        const startX = 45 + Math.random() * 10;
        const startY = Math.random() * 100;
        const size = Math.random() * 3.5 + 0.8;
        const duration = Math.random() * 3.5 + 2;
        const delay = Math.random() * 2.5;
        p.style.cssText = 'left:' + startX + '%;top:' + startY + '%;width:' + size + 'px;height:' + size + 'px;--drift:' + drift + 'px;animation:floatParticle ' + duration + 's linear ' + delay + 's forwards;';
        canvas.appendChild(p);
        setTimeout(function() { if (p.parentNode) p.remove(); }, (duration + delay + 0.5) * 1000);
    }
}

function toggleLeaderboard() {
    const lb = document.getElementById('leaderboardOverlay');
    if (lb.classList.contains('active')) { lb.classList.remove('active'); }
    else { updateUI(); lb.classList.add('active'); }
}

document.getElementById('leaderboardOverlay').addEventListener('click', function(e) {
    if (e.target === this) toggleLeaderboard();
});

document.getElementById('typologyOverlay').addEventListener('click', function(e) {
    if (e.target === this) toggleTypology();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var lb = document.getElementById('leaderboardOverlay');
        if (lb.classList.contains('active')) toggleLeaderboard();
        var ty = document.getElementById('typologyOverlay');
        if (ty.classList.contains('active')) toggleTypology();
    }
});

updateUI();
stage.classList.add('nt-active');

function updateSeal() {
    var prog = (function() {
        var u = window.__getUnifiedUser ? window.__getUnifiedUser() : null;
        if (u) return { epigraphy: u.seal.epigraphy, astronomy: u.seal.astronomy, prophecy: u.seal.prophecy, restoration: u.seal.restoration };
        return JSON.parse(localStorage.getItem('scribe_seal') || '{"epigraphy":0,"astronomy":0,"prophecy":0,"restoration":0}');
    })();
    var rings = { epigraphy:document.getElementById('sealRingAstronomy'), astronomy:document.getElementById('sealRingProphetic'), prophecy:document.getElementById('sealRingRestoration'), restoration:document.getElementById('sealInner') };
    var rows = { epigraphy:document.getElementById('sealRowEpigraphy'), astronomy:document.getElementById('sealRowAstronomy'), prophecy:document.getElementById('sealRowProphetic'), restoration:document.getElementById('sealRowRestoration') };
    var total = 0;
    var moduleMap = { epigraphy:'epigraphy', astronomy:'astronomy', prophecy:'prophecy', restoration:'restoration' };
    for (var key in moduleMap) {
        var val = prog[moduleMap[key]] || 0;
        if (val > 0) total++;
        if (rings[key]) rings[key].classList.toggle('earned', val > 0);
        if (rows[key]) rows[key].classList.toggle('earned', val > 0);
    }
    var rank = document.getElementById('sealRank');
    if (rank) {
        if (total === 0) { rank.textContent = 'INITIATE SCRIBE'; }
        else if (total === 1) { rank.textContent = 'SCRIBE OF THE FIRST LETTER'; }
        else if (total === 2) { rank.textContent = 'SCRIBE OF THE COVENANT'; }
        else if (total === 3) { rank.textContent = 'SCRIBE OF THE THREADS'; }
        else { rank.textContent = 'MASTER SCRIBE OF THE ANCIENT PATHS'; }
    }
    var dailyRing = document.getElementById('sealDailyRing');
    if (dailyRing) {
        var DAILY_GOAL = 500;
        var circ = 2 * Math.PI * 100;
        dailyRing.style.strokeDasharray = circ;
        var data = (function() {
            var u = window.__getUnifiedUser ? window.__getUnifiedUser() : null;
            return u ? { dailyChars: u.progress.dailyChars || 0 } : { dailyChars: 0 };
        })();
        var dailyChars = data.dailyChars || 0;
        var pct = Math.min(dailyChars / DAILY_GOAL, 1);
        dailyRing.style.strokeDashoffset = circ * (1 - pct);
        dailyRing.style.stroke = pct >= 1 ? 'var(--museum-gold)' : 'rgba(212,175,55,0.4)';
        var dailyEl = document.getElementById('sealDaily');
        if (dailyEl) dailyEl.textContent = 'DAILY: ' + dailyChars + ' / ' + DAILY_GOAL;
    }
}

window.toggleSealTooltip = function() {
    var tip = document.getElementById('sealTooltip');
    tip.classList.toggle('visible');
};

function toggleTypology() {
    document.getElementById('typologyOverlay').classList.toggle('active');
}

document.addEventListener('click', function(e) {
    var tip = document.getElementById('sealTooltip');
    if (tip && tip.classList.contains('visible') && !e.target.closest('.seal-medallion') && !e.target.closest('.seal-tooltip')) {
        tip.classList.remove('visible');
    }
});

updateSeal();
var sealTimer = null;
var sealLastUpdate = 0;
function scheduleSeal() {
    if (sealTimer) { clearTimeout(sealTimer); sealTimer = null; }
    if (document.hidden) return;
    var elapsed = Date.now() - sealLastUpdate;
    var delay = Math.max(15000 - elapsed, 1000);
    sealTimer = setTimeout(function() { sealTimer = null; sealLastUpdate = Date.now(); updateSeal(); scheduleSeal(); }, delay);
}
scheduleSeal();
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) { sealLastUpdate = 0; scheduleSeal(); }
});

const ORACLE_QUOTES = [
    '"The grass withers, the flower fades, but the word of our God will stand forever." — Isaiah 40:8',
    '"In the beginning was the Word, and the Word was with God, and the Word was God." — John 1:1',
    '"Nations shall come to your light, and kings to the brightness of your rising." — Isaiah 60:3',
    '"Verba volant, scripta manent. (Words fly away, the written word remains.)" — Ancient Proverb',
    '"To search out historical tracks is to touch the footprints of early witness." — Scriptorium Maxim'
];

function initializeMuseumEnhancements() {
    var quoteIndex = 0;
    var quoteElement = document.getElementById('dynamic-oracle-string');
    if (quoteElement) {
        setInterval(function() {
            quoteElement.style.opacity = 0;
            setTimeout(function() {
                quoteIndex = (quoteIndex + 1) % ORACLE_QUOTES.length;
                quoteElement.innerText = ORACLE_QUOTES[quoteIndex];
                requestAnimationFrame(function() {
                    quoteElement.style.opacity = 0.65;
                });
            }, 1200);
        }, 12000);
    }
    var activeScribe = window.ScriptoriumValidator ? ScriptoriumValidator.getActiveScribe() : null;
    var dynamicGreeting = document.getElementById('mainWelcomeSubtitle');
    if (activeScribe && dynamicGreeting) {
        var rankTitles = ["", "Novice Scribe", "Scholar Student", "Active Witness", "Master Scribe", "Archivist Sage"];
        var appliedRank = rankTitles[activeScribe.knowledgeLevel] || "Inscribed Scholar";
        var formalTitle = activeScribe.gender === 'female' ? 'Sister' : 'Brother';
        dynamicGreeting.innerHTML = 'Welcome back, ' + window.escHtml(formalTitle) + ' ' + window.escHtml(activeScribe.name) + ' (<span style="color:var(--museum-gold);letter-spacing:1px;font-weight:600;">' + window.escHtml(appliedRank) + '</span>). The inner vaults stand ready for your continued inspection.';
    } else if (!activeScribe && dynamicGreeting) {
        var v2 = window.__getUnifiedUser ? window.__getUnifiedUser() : null;
        if (v2 && v2.profile.name) {
            dynamicGreeting.innerHTML = 'Welcome back, ' + window.escHtml(v2.profile.name) + ' (<span style="color:var(--museum-gold);letter-spacing:1px;font-weight:600;">' + window.escHtml(v2.rank.title) + '</span>). The inner vaults stand ready for your continued inspection.';
        }
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeMuseumEnhancements);
} else {
    initializeMuseumEnhancements();
}
var ThreadUnwrap = (function() {
    var canvas, ctx, veil, raf, done;
    var W, H, cx, cy;
    var phase, t, config;

    var NT_CFG = {
        threadColor:    'rgba(240,235,210,1)',
        threadGlow:     'rgba(255,255,230,0.55)',
        threadWidth:    2.2,
        glowWidth:      10,
        coils:          4.5,
        unwindSpeed:    0.018,
        sparkColors:    ['#fff','#fffbe0','#d4af37','#f8e878','rgba(255,255,200,0.8)'],
        bloomColor:     'rgba(255,245,180,',
        bloomSize:      Math.min(window.innerWidth, window.innerHeight) * 1.2,
        dustClass:      'nt-sparkle',
        dustCount:      40,
        dustRadius:     { min: 3, max: 8 },
        dustBurst:      180,
        trailOpacity:   0.18,
        label:          'NT'
    };

    var OT_CFG = {
        threadColor:    'rgba(160,110,45,1)',
        threadGlow:     'rgba(120,80,20,0.45)',
        threadWidth:    2.8,
        glowWidth:      14,
        coils:          5.5,
        unwindSpeed:    0.013,
        sparkColors:    ['rgba(180,130,60,0.95)','rgba(140,95,30,0.9)','rgba(90,60,15,0.8)','rgba(200,150,70,0.7)'],
        bloomColor:     'rgba(140,95,30,',
        bloomSize:      Math.min(window.innerWidth, window.innerHeight) * 1.0,
        dustClass:      'ot-dust',
        dustCount:      55,
        dustRadius:     { min: 2, max: 7 },
        dustBurst:      220,
        trailOpacity:   0.22,
        label:          'OT'
    };

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        cx = W / 2;
        cy = H / 2;
    }

    function buildPath(progress, cfg) {
        var startR  = Math.min(W, H) * 0.42;
        var endR    = 60;
        var r       = startR - (startR - endR) * progress;
        var turns   = cfg.coils * (1 - progress * 0.7);
        var angle   = -Math.PI / 2 + turns * Math.PI * 2 * (1 - progress);
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, angle: angle, r: r };
    }

    function drawFrame() {
        ctx.clearRect(0, 0, W, H);
        var cfg = config;
        var steps = Math.ceil(t / 0.003);
        if (steps > 1) {
            ctx.save();
            ctx.globalAlpha = cfg.trailOpacity;
            ctx.strokeStyle = cfg.threadColor;
            ctx.lineWidth   = cfg.threadWidth * 0.7;
            ctx.lineCap     = 'round';
            ctx.beginPath();
            for (var i = 0; i <= steps; i++) {
                var pFrac = (i / steps) * t;
                var pt    = buildPath(pFrac, cfg);
                if (i === 0) ctx.moveTo(pt.x, pt.y);
                else         ctx.lineTo(pt.x, pt.y);
            }
            ctx.stroke();
            ctx.restore();
        }
        var tip  = buildPath(t, cfg);
        var prev = buildPath(Math.max(0, t - 0.008), cfg);
        ctx.save();
        ctx.strokeStyle = cfg.threadGlow;
        ctx.lineWidth   = cfg.glowWidth;
        ctx.lineCap     = 'round';
        ctx.globalAlpha = 0.5 - t * 0.3;
        ctx.shadowColor = cfg.threadGlow;
        ctx.shadowBlur  = 18;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(tip.x, tip.y);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.strokeStyle = cfg.threadColor;
        ctx.lineWidth   = cfg.threadWidth;
        ctx.lineCap     = 'round';
        ctx.globalAlpha = 0.95;
        ctx.shadowColor = cfg.threadGlow;
        ctx.shadowBlur  = 6;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(tip.x, tip.y);
        ctx.stroke();
        ctx.restore();
        if (cfg.label === 'NT' && Math.random() < 0.55) { drawTipSparkle(tip.x, tip.y, cfg); }
        if (cfg.label === 'OT' && Math.random() < 0.40) { drawTipDust(tip.x, tip.y, cfg); }
    }

    function drawTipSparkle(x, y, cfg) {
        var arms  = 6 + Math.floor(Math.random() * 4);
        var outer = 4 + Math.random() * 6;
        var inner = outer * 0.38;
        var col   = cfg.sparkColors[Math.floor(Math.random() * cfg.sparkColors.length)];
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI);
        ctx.fillStyle   = col;
        ctx.shadowColor = col;
        ctx.shadowBlur  = 10;
        ctx.globalAlpha = 0.7 + Math.random() * 0.3;
        ctx.beginPath();
        for (var i = 0; i < arms * 2; i++) {
            var r2  = i % 2 === 0 ? outer : inner;
            var ang = (i / (arms * 2)) * Math.PI * 2;
            i === 0 ? ctx.moveTo(Math.cos(ang)*r2, Math.sin(ang)*r2)
                    : ctx.lineTo(Math.cos(ang)*r2, Math.sin(ang)*r2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawTipDust(x, y, cfg) {
        var n = 3 + Math.floor(Math.random() * 4);
        for (var i = 0; i < n; i++) {
            var angle = Math.random() * Math.PI * 2;
            var dist  = Math.random() * 12;
            var r2    = 1 + Math.random() * 3;
            var col   = cfg.sparkColors[Math.floor(Math.random() * cfg.sparkColors.length)];
            ctx.save();
            ctx.fillStyle   = col;
            ctx.globalAlpha = 0.4 + Math.random() * 0.4;
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle)*dist, y + Math.sin(angle)*dist, r2, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
        }
    }

    function burstParticles(cfg) {
        var n = cfg.dustCount;
        for (var i = 0; i < n; i++) {
            (function(i) {
                var el = document.createElement('div');
                el.className = cfg.dustClass;
                var angle  = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
                var dist   = cfg.dustBurst * (0.4 + Math.random() * 0.6);
                var tx     = Math.cos(angle) * dist;
                var ty     = Math.sin(angle) * dist;
                var size   = cfg.dustRadius.min + Math.random() * (cfg.dustRadius.max - cfg.dustRadius.min);
                var dur    = 0.5 + Math.random() * 0.9;
                var delay  = Math.random() * 0.35;
                el.style.cssText =
                    'left:' + cx + 'px;top:' + cy + 'px;' +
                    'width:' + size + 'px;height:' + size + 'px;' +
                    '--tx:' + tx + 'px;--ty:' + ty + 'px;' +
                    '--dur:' + dur + 's;--delay:' + delay + 's;';
                document.body.appendChild(el);
                setTimeout(function() { if (el.parentNode) el.remove(); }, (dur + delay + 0.2) * 1000);
            })(i);
        }
    }

    function bloomExpand(cfg) {
        var el = document.createElement('div');
        el.className = 'thread-bloom';
        var s = cfg.bloomSize;
        el.style.cssText =
            'left:' + cx + 'px;top:' + cy + 'px;' +
            'width:' + s + 'px;height:' + s + 'px;' +
            'background:radial-gradient(circle,' + cfg.bloomColor + '0.35) 0%,' + cfg.bloomColor + '0.12) 35%,transparent 70%);' +
            '--bloom-dur:1.1s;';
        document.body.appendChild(el);
        setTimeout(function() { if (el.parentNode) el.remove(); }, 1300);
    }

    function loop() {
        t += config.unwindSpeed;
        if (t >= 1) {
            t = 1;
            drawFrame();
            burstParticles(config);
            bloomExpand(config);
            setTimeout(function() { veil.classList.remove('fade-in'); veil.classList.add('fade-out'); }, 180);
            setTimeout(function() { canvas.classList.remove('active'); }, 400);
            setTimeout(function() {
                if (done) done();
                setTimeout(function() { veil.classList.remove('fade-out'); }, 900);
            }, 520);
            cancelAnimationFrame(raf);
            return;
        }
        drawFrame();
        raf = requestAnimationFrame(loop);
    }

    return {
        init: function() {
            canvas = document.getElementById('threadCanvas');
            ctx    = canvas.getContext('2d');
            veil   = document.getElementById('threadVeil');
            resize();
            window.addEventListener('resize', resize);
        },
        play: function(type, callback) {
            config = type === 'NT' ? NT_CFG : OT_CFG;
            done   = callback;
            t      = 0;
            phase  = 0;
            resize();
            veil.classList.remove('fade-out');
            requestAnimationFrame(function() { veil.classList.add('fade-in'); });
            setTimeout(function() {
                canvas.classList.add('active');
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(loop);
            }, 220);
        }
    };
})();

ThreadUnwrap.init();

/* onclick handlers for testaments */
function triggerPortalTransition(era) {
    var curtain = document.getElementById('narthex-transition-curtain');
    var seal = curtain.querySelector('.wax-seal');

    curtain.style.display = 'flex';
    curtain.style.opacity = '1';
    seal.style.opacity = '1';
    seal.classList.add('spin');

    if (window.ScriptoriumAudio) {
        window.ScriptoriumAudio.transitionTo(era);
        try { window.ScriptoriumAudio.playEffect('seal-break'); } catch(e) {}
    }

    setTimeout(function() {
        window.location.href = era === 'ot' ? 'ot-gallery.html' : 'nt-gallery.html';
    }, 1200);
}

function launchOT() { triggerPortalTransition('ot'); }
function launchNT() { triggerPortalTransition('nt'); }

(function() {
    var shown = false;
    var dismissed = localStorage.getItem('nl_dismissed');
    var token = (function() { try { return Scriptorium.getToken(); } catch(e) {} })();
    if (token) return;
    function showPopup() {
        if (shown || dismissed) return;
        shown = true;
        var overlay = document.getElementById('nlPopupOverlay');
        if (overlay) overlay.classList.add('show');
    }
    setTimeout(showPopup, 8000);
    document.addEventListener('scroll', function() {
        if (!shown && !dismissed && window.scrollY > 300) showPopup();
    }, { once: true });
})();

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('nlPopupForm');
    var msg = document.getElementById('nlPopupMsg');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var input = form.querySelector('input[type="email"]');
            if (!input || !input.value) return;
            msg.textContent = 'Dispatching...';
            fetch((window.SCRIPTORIUM_API || '/api') + '/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: input.value })
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.error) { msg.textContent = data.error; return; }
                msg.textContent = data.message || 'Subscription confirmed. A missive is on its way.';
                input.value = '';
                setTimeout(function() {
                    document.getElementById('nlPopupOverlay').classList.remove('show');
                }, 2000);
            })
            .catch(function() { msg.textContent = 'The Archive is unreachable.'; });
        });
    }

    // ── DAILY PERICOPE ──
    (function() {
        try { localStorage.setItem('achiev_daily_verse_used', 'true'); } catch(e) {}
        var container = document.getElementById('dailyPericope');
        var labelEl = document.getElementById('pericopeLabel');
        var readingsEl = document.getElementById('pericopeReadings');
        if (!container) return;

        if (!window.ScriptoriumLectionary) {
            if (labelEl) labelEl.textContent = 'The Archive — Ordinary Time';
            if (readingsEl) {
                readingsEl.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:16px 0;font-family:\'Cormorant Garamond\',serif;font-size:0.65rem;color:var(--text-secondary);font-style:italic;">The day&#8217;s readings are being prepared. Please return when the pericope cycle has been loaded.</div>';
            }
            return;
        }

        var today = new Date();
        var userTrad = '';
        try { var u = window.__getUnifiedUser ? window.__getUnifiedUser() : null; if (u && u.profile) userTrad = u.profile.tradition || ''; } catch(e) {}
        var pericope = window.ScriptoriumLectionary.getTodayReadings(today, userTrad);
        if (labelEl) labelEl.textContent = pericope.label;
        if (readingsEl) {
            readingsEl.innerHTML = '';
            pericope.readings.forEach(function(r, idx) {
                var card = document.createElement('a');
                var bookParam = encodeURIComponent(r.book.toLowerCase());
                card.href = r.testament === 'ot' ? 'ot-gallery.html?book=' + bookParam + '&chapter=' + r.chapter : 'nt-gallery.html?book=' + bookParam + '&chapter=' + r.chapter;
                card.className = 'pericope-card';
                card.innerHTML = '<span class="pc-type pc-' + r.type.toLowerCase() + '">' + r.type + '</span>' +
                    '<span class="pc-book">' + r.book + '</span>' +
                    '<span class="pc-chapter">' + r.chapter + '</span>' +
                    '<span class="pc-arrow">&#8594;</span>';
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    var curtain = document.getElementById('narthex-transition-curtain');
                    var seal = curtain && curtain.querySelector('.wax-seal');
                    var dir = r.testament === 'ot' ? 'swipe-left' : (r.type === 'Gospel' ? 'swipe-right' : 'swipe-up');
                    card.classList.add(dir);
                    if (curtain) {
                        curtain.style.display = 'flex';
                        curtain.style.opacity = '0';
                        requestAnimationFrame(function() {
                            curtain.style.transition = 'opacity 0.4s ease';
                            curtain.style.opacity = '1';
                            if (seal) { seal.style.opacity = '1'; seal.classList.add('spin'); }
                        });
                    }
                    setTimeout(function() { window.location.href = card.href; }, 500);
                });
                readingsEl.appendChild(card);
            });
        }
    })();

    var dismissBtn = document.getElementById('nlPopupDismiss');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', function() {
            document.getElementById('nlPopupOverlay').classList.remove('show');
        });
    }
    var neverBtn = document.getElementById('nlPopupNever');
    if (neverBtn) {
        neverBtn.addEventListener('click', function() {
            try { localStorage.setItem('nl_dismissed', '1'); } catch(e) {}
            document.getElementById('nlPopupOverlay').classList.remove('show');
        });
    }

    // ── PRAYER WALL ──
    var pwOpen = localStorage.getItem('prayer_wall_open') !== '0';
    var pwBody = document.getElementById('prayerBody');
    var pwToggle = document.getElementById('prayerToggle');
    if (pwBody && pwToggle) {
        if (!pwOpen) { pwBody.style.display = 'none'; pwToggle.classList.remove('open'); }
        else { pwToggle.classList.add('open'); }
    }
    loadPrayers();
});

window.togglePrayerWall = function() {
    var body = document.getElementById('prayerBody');
    var tog = document.getElementById('prayerToggle');
    if (!body || !tog) return;
    var open = body.style.display !== 'none';
    body.style.display = open ? 'none' : '';
    tog.classList.toggle('open', !open);
    try { localStorage.setItem('prayer_wall_open', open ? '0' : '1'); } catch(e) {}
    if (!open) loadPrayers();
};

function loadPrayers() {
    var list = document.getElementById('prayerList');
    if (!list) return;
    fetch('/api/prayer')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var prayers = data.prayers || [];
            if (prayers.length === 0) {
                list.innerHTML = '<div class="prayer-empty">No prayers yet. Be the first to lift a petition.</div>';
                return;
            }
            var html = '';
            prayers.forEach(function(p) {
                var prayedClass = p.prayed ? ' prayed' : '';
                html += '<div class="prayer-item">' +
                    '<div class="prayer-text">' + escHtml(p.text) + '</div>' +
                    '<div class="prayer-meta">' +
                    '<span class="prayer-name">— ' + escHtml(p.name) + '</span>' +
                    '<div class="prayer-actions">' +
                    '<span class="prayer-count" id="pc-' + p.id + '">' + (p.prayCount || 0) + '</span>' +
                    '<button class="prayer-pray-btn' + prayedClass + '" onclick="prayFor(\'' + p.id + '\')">&#10022; PRAYING</button>' +
                    '</div></div></div>';
            });
            list.innerHTML = html;
        })
        .catch(function() {
            list.innerHTML = '<div class="prayer-empty">Could not load prayers. The archive may be quiet.</div>';
        });
}

function escHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

window.submitPrayer = function() {
    var input = document.getElementById('prayerInput');
    var anon = document.getElementById('prayerAnon');
    var list = document.getElementById('prayerList');
    if (!input) return;
    var text = input.value.trim();
    if (text.length < 2) { if (window.Scr && Scr.toast) Scr.toast('Write your prayer, scribe.', 'error'); return; }
    if (list) list.innerHTML = '<div class="prayer-loading">LIFTING UP THE PETITIONS...</div>';
    fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, anonymous: anon ? anon.checked : false })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data.error) {
            if (window.Scr && Scr.toast) Scr.toast(data.error, 'error');
            return;
        }
        input.value = '';
        if (anon) anon.checked = false;
        loadPrayers();
        if (window.Scr && Scr.toast) Scr.toast('Your petition has been laid before the throne.', 'success');
    })
    .catch(function() {
        if (list) list.innerHTML = '<div class="prayer-empty">Could not submit prayer. Try again.</div>';
        if (window.Scr && Scr.toast) Scr.toast('Could not submit prayer.', 'error');
    });
};

window.prayFor = function(id) {
    fetch('/api/prayer/' + id + '/pray', { method: 'POST' })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.error) return;
            var countEl = document.getElementById('pc-' + id);
            if (countEl) countEl.textContent = data.prayer.prayCount;
            var btn = countEl && countEl.parentElement && countEl.parentElement.querySelector('.prayer-pray-btn');
            if (btn) btn.classList.add('prayed');
        })
        .catch(function() {});
};