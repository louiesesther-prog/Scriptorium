// --- Weather Engine ---
setTimeout(function() {
            var container = document.createElement('div');
            container.style.cssText = `
                position: fixed !important;
                top: 60px !important;
                left: 75px !important;
                width: calc(100% - 75px) !important;
                height: calc(84vh - 60px) !important;
                overflow: hidden !important;
                pointer-events: none !important;
                z-index: 400 !important;
            `;
            
            // Weather vault container with canvas + fog batches
            container.innerHTML = `
                <div class="weather-vault-container" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;">
                    <canvas id="weather-canvas"></canvas>
                    <div id="weather-sky-tint"></div>
                </div>
                <div class="fog-batch batch-1"></div>
                <div class="fog-batch batch-1b"></div>
                <div class="fog-batch batch-2"></div>
                <div class="fog-batch batch-2b"></div>
                <div class="fog-batch batch-3"></div>
                <div class="fog-batch batch-3b"></div>
                <div class="fog-batch batch-4"></div>
                <div class="fog-batch batch-4b"></div>
                <div class="fog-batch batch-5"></div>
                <div class="fog-batch batch-5b"></div>
            `;
            document.body.appendChild(container);
            
            // Add weather CSS
            var weatherCSS = document.createElement('style');
            weatherCSS.textContent = `
                .weather-vault-container { position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none; }
                #weather-canvas { position:absolute;top:0;left:0;width:100%;height:100%; }
                #weather-sky-tint { position:absolute;top:0;left:0;width:100%;height:100%;mix-blend-mode:multiply;opacity:0;transition:opacity 5s ease-in-out,background-color 5s ease-in-out; }
                .sky-rain { background-color:#1a2230;opacity:0.45 !important; }
                .sky-sandstorm { background-color:#422d1b;opacity:0.55 !important; }
            `;
            document.head.appendChild(weatherCSS);
            
            // Weather sounds
            try {
                window.weatherAudioRain = new Audio('assets/audio/rain.mp3');
                window.weatherAudioRain.loop = true;
                window.weatherAudioRain.volume = 0.4;
            } catch(e) { window.weatherAudioRain = null; }
            try {
                window.weatherAudioSand = new Audio('assets/audio/sandstorm.mp3');
                window.weatherAudioSand.loop = true;
                window.weatherAudioSand.volume = 0.3;
            } catch(e) { window.weatherAudioSand = null; }
            
            // Weather Engine
            (function ScriptoriumWeatherEngine() {
                const canvas = document.getElementById('weather-canvas');
                const ctx = canvas.getContext('2d');
                const skyTint = document.getElementById('weather-sky-tint');
                
                let w = canvas.width = container.offsetWidth;
                let h = canvas.height = container.offsetHeight;
                
                window.addEventListener('resize', function() {
                    w = canvas.width = container.offsetWidth;
                    h = canvas.height = container.offsetHeight;
                });
                
                let currentState = "clear";
                let particles = [];
                const maxParticles = 120;
                
                function render() {
                    ctx.clearRect(0, 0, w, h);
                    requestAnimationFrame(render);
                }
                
                function weatherOracleLoop() {
                    var states = ['clear', 'rain', 'sandstorm'];
                    var next = states[Math.floor(Math.random() * states.length)];
                    if (next === 'rain') {
                        currentState = 'rain';
                        skyTint.className = 'sky-rain';
                        if (window.weatherAudioRain) { window.weatherAudioRain.play().catch(function(){}); }
                    } else if (next === 'sandstorm') {
                        currentState = 'sandstorm';
                        skyTint.className = 'sky-sandstorm';
                        if (window.weatherAudioSand) { window.weatherAudioSand.play().catch(function(){}); }
                    } else {
                        currentState = 'clear';
                        skyTint.className = '';
                        if (window.weatherAudioRain) { window.weatherAudioRain.pause(); window.weatherAudioRain.currentTime = 0; }
                        if (window.weatherAudioSand) { window.weatherAudioSand.pause(); window.weatherAudioSand.currentTime = 0; }
                    }
                    setTimeout(weatherOracleLoop, 30000 + Math.random() * 60000);
                }
                requestAnimationFrame(render);
                setTimeout(weatherOracleLoop, 10000);
            })();
        }, 1000);

// --- Global Functions ---
// ==================== GLOBAL FUNCTIONS ====================
    // These are early stubs — full implementations are defined below once the map loads.
    window.setLayerMode = window.setLayerMode || function(mode) {

    };
    function toggleSelah() {
        var panel = document.getElementById('selah-panel');
        var btn = document.getElementById('selah-toggle');
        if (panel && btn) {
            if (panel.classList.contains('open')) {
                panel.classList.remove('open');
                btn.innerHTML = 'VAULT';
            } else {
                panel.classList.add('open');
                btn.innerHTML = 'CLOSE';
            }
        }
    }
    function togglePlay() { var btn = document.getElementById('play-btn'); if (btn) btn.click(); }
    function toggleLayer() { window.setLayerMode('vellum'); }
    function toggleTerrain() { window.setLayerMode('terrain'); }
    function toggleCovenant() { var btn = document.getElementById('covenant-toggle'); if (btn) btn.click(); }
    function filterEra(era) { if (typeof updateMarkers === 'function') updateMarkers(); }
    
    // Theme query param support
    (function() {
        var params = new URLSearchParams(window.location.search);
        if (params.get('theme') === 'ethiopian') {
            document.body.classList.add('theme-ethiopian');
        }
    })();
    
    function openTab(tabName) {
        document.querySelectorAll('.selah-tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('.selah-content').forEach(function(c) { c.classList.remove('active'); });
        var tab = document.querySelector('.selah-tab[data-tab="' + tabName + '"]');
        var content = document.getElementById('tab-' + tabName);
        if (tab) tab.classList.add('active');
        if (content) content.classList.add('active');
    }
    
    // ==================== DATA ====================

// --- Main Map Engine ---
function formatYear(year) {
            if (year === 0 || year === 1) return "1 AD";
            const abs = Math.abs(year);
            return year < 0 ? abs + ' BC' : abs + ' AD';
        }
        
        function getPeriodLabel(year) {
            if (year > -6) return "GOSPELS";
            if (year > -400) return "INTER-TESTAMENTAL";
            if (year > -586) return "PERSIAN";
            if (year > -1000) return "MONARCHY";
            if (year > -1446) return "EXODUS";
            return "PATRIARCHS";
        }
        
        // ==================== SESSION CHECK ====================
        (function protectArchive() {
            if (typeof Scriptorium !== 'undefined' && Scriptorium.requireAuth) {
                Scriptorium.requireAuth();
            }
        })();

        // Locked fragment icon for guest users
        var lockedFragmentIcon = L.divIcon({
            className: 'discovery-marker locked-fragment',
            html: '<div class="wax-seal" title="Sealed Fragment — Undergo Induction to Unlock">&#x2726;</div>',
            iconSize: [28, 34],
            iconAnchor: [14, 17]
        });

        // HIDDEN_FINDS — archaeological fragments for DIG mode
        const HIDDEN_FINDS = [
            { name: 'Siloam Inscription', lat: 31.7733, lng: 35.2361, revealed: false, info: 'Proof of Hezekiah\'s tunnel engineering — 2 Kings 20:20.', siteGroup: 'Jerusalem' },
            { name: 'Pilate Stone', lat: 32.5036, lng: 34.8919, revealed: false, info: 'The only contemporary archaeological evidence of Pontius Pilate\'s governorship.' },
            { name: 'Magdala Stone', lat: 32.8258, lng: 35.5222, revealed: false, info: 'A 1st-century synagogue stone carving depicting the Second Temple.' },
            { name: 'Hezekiah\'s Bulla', lat: 31.7730, lng: 35.2370, revealed: false, info: 'Royal seal of Hezekiah king of Judah — found in the Ophel.', siteGroup: 'Jerusalem' },
            { name: 'Tel Dan Stele Fragment', lat: 33.2492, lng: 35.6518, revealed: false, info: 'Fragment mentioning the \"House of David\" — first extra-biblical evidence.' },
            { name: 'Caiaphas Ossuary', lat: 31.7500, lng: 35.2200, revealed: false, info: 'Bone box of Caiaphas the High Priest — Matthew 26:57.', siteGroup: 'Jerusalem' }
        ];

        window.viewFragment = function(id) {
            if (!localStorage.getItem('activeScribe')) {
                if (window.ScriptoriumAudio) { try { ScriptoriumAudio.transitionTo('ot'); } catch(e) {} }
                if (window.Scr && Scr.toast) Scr.toast('This archaeological record is sealed. Join the Order of Scribes.', 'info');
                setTimeout(function() { window.location.href = 'register.html'; }, 1200);
            } else {
                openDossier(id);
            }
        };

        // ==================== MAP INIT ====================
        window.map = L.map('map', { center: [32, 38], zoom: 5, zoomControl: false });
        
        window.baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: 'Leaflet | CARTO'
        }).addTo(window.map);
        
        // Fallback tile set if CARTO CDN is blocked
        var fallbackTiles = function() {
            if (!window.map || !window.baseLayer) return;
            try { window.map.removeLayer(window.baseLayer); } catch(e) {}
            window.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(window.map);
            
        };
        var tileFailCount = 0;
        window.map.on('tileerror', function() {
            tileFailCount++;
            if (tileFailCount >= 4) fallbackTiles();
        });
        setTimeout(function() {
            if (tileFailCount > 0) fallbackTiles();
        }, 5000);
        
        // Digging cursor animation on map click
        map.on('mousedown', function() { document.body.classList.add('digging-active'); });
        map.on('mouseup', function() { document.body.classList.remove('digging-active'); });
        
        window.mapLayerMode = 'vellum';
        
        var markers;
        try {
            markers = L.markerClusterGroup({
                chunkedLoading: true,
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true,
                maxClusterRadius: 60,
                iconCreateFunction: function(cluster) {
                    var count = cluster.getChildCount();
                    var size = count < 10 ? 'small' : count < 50 ? 'medium' : 'large';
                    return L.divIcon({
                        html: '<div><span>' + count + '</span></div>',
                        className: 'marker-cluster marker-cluster-' + size,
                        iconSize: L.point(40, 40)
                    });
                }
            }).addTo(map);
        } catch(e) {
            console.warn('MarkerCluster unavailable, using plain layer group:', e.message);
            markers = L.layerGroup().addTo(map);
        }
        const journeyLayer = L.layerGroup().addTo(map);

        // Place locked markers on hidden finds for guest users
        if (!localStorage.getItem('activeScribe')) {
            HIDDEN_FINDS.forEach(function(f) {
                L.marker([f.lat, f.lng], { icon: lockedFragmentIcon })
                    .addTo(map)
                    .bindPopup('<div style="text-align:center;font-family:\'Space Grotesk\',sans-serif;padding:6px;"><h3 style="color:#8b2500;font-family:\'Cinzel\',serif;font-size: 0.66rem;letter-spacing:2px;">&#x1F512; SEALED FRAGMENT</h3><p style="font-size: 0.66rem;color:rgba(255,255,255,0.4);margin:8px 0;">This archaeological record is reserved for the Order of Scribes.</p><button onclick="window.location.href=\'register.html\'" style="background:transparent;border:1px solid #d4af37;color:#d4af37;padding:6px 16px;cursor:pointer;font-size: 0.66rem;border-radius:3px;font-family:\'Cinzel\',serif;">UNDERGO INDUCTION</button></div>');
            });
        }
        
        // ==================== REGION LABELS ====================
        function addRegionLabels() {
const regions = [
                { name: "JUDEA", lat: 31.500, lng: 35.100, region: "judea" },
                { name: "GALILEE", lat: 32.850, lng: 35.500, region: "galilee" },
                { name: "SAMARIA", lat: 32.300, lng: 35.250, region: "samaria" },
                { name: "DECAPOLIS", lat: 32.600, lng: 35.650, region: " Transjordan" },
                { name: "NEGEV", lat: 31.100, lng: 34.800, region: "negev" },
                { name: "COASTAL PLAIN", lat: 32.400, lng: 34.650, region: "coastal-plain" },
                { name: "JORDAN VALLEY", lat: 31.850, lng: 35.500, region: "jordan-valley" },
                { name: "TRANSJORDAN", lat: 31.700, lng: 36.000, region: " Transjordan" },
                { name: "SINAI", lat: 28.000, lng: 34.000, region: "negev" },
                { name: "PHOENICIA", lat: 33.300, lng: 35.200, region: "coastal-plain" },
                { name: "ASIA MINOR", lat: 38.500, lng: 27.000, region: " Transjordan" }
            ];
            
            regions.forEach(function(r) {
                var safeRegion = r.region.replace(/[^a-zA-Z0-9-_]/g, '-');
                var label = L.divIcon({
                    className: 'region-label',
                    html: '<div data-region="' + safeRegion + '">' + r.name + '</div>',
                    iconSize: [100, 20],
                    iconAnchor: [50, 10]
                });
                L.marker([r.lat, r.lng], { icon: label }).addTo(map);
            });

            // Tribal territory markers
            var tribes = [
                { name: "JUDAH", lat: 31.400, lng: 34.950, focus: "judah" },
                { name: "BENJAMIN", lat: 31.800, lng: 35.250, focus: "benjamin" },
                { name: "EPHRAIM", lat: 32.100, lng: 35.200, focus: "joseph" },
                { name: "MANASSEH", lat: 32.350, lng: 35.050, focus: "joseph" },
                { name: "ZEBULUN", lat: 32.700, lng: 35.150, focus: "zebulun" },
                { name: "ISSACHAR", lat: 32.550, lng: 35.400, focus: "issachar" },
                { name: "NAPHTALI", lat: 33.000, lng: 35.450, focus: "naphtali" },
                { name: "ASHER", lat: 33.050, lng: 35.100, focus: "asher" },
                { name: "DAN", lat: 31.950, lng: 34.800, focus: "dan" },
                { name: "SIMEON", lat: 31.100, lng: 34.800, focus: "simeon" },
                { name: "REUBEN", lat: 31.700, lng: 35.700, focus: "reuben" },
                { name: "GAD", lat: 32.100, lng: 35.750, focus: "gad" }
            ];
            tribes.forEach(function(t) {
                var tribalIcon = L.divIcon({
                    className: 'tribe-label',
                    html: '<div style="font-family:Cinzel,serif;font-size: 0.54rem;letter-spacing:3px;color:rgba(212,175,55,0.2);cursor:pointer;transition:0.3s;">⚜ ' + t.name + '</div>',
                    iconSize: [120, 18],
                    iconAnchor: [60, 9]
                });
                var m = L.marker([t.lat, t.lng], { icon: tribalIcon }).addTo(map);
                m.bindPopup(
                    '<div style="text-align:center;font-family:Cormorant Garamond,serif;padding:8px;">' +
                    '<div style="font-family:Cinzel,serif;font-size: 0.66rem;letter-spacing:3px;color:#d4af37;margin-bottom:6px;">✦ TERRITORY OF ' + t.name + ' ✦</div>' +
                    '<button onclick="window.location.href=\'onomasticon.html?focus=' + t.focus + '\'" ' +
                    'style="background:transparent;border:1px solid rgba(212,175,55,0.3);color:#d4af37;padding:6px 14px;cursor:pointer;font-family:Cinzel,serif;font-size: 0.54rem;letter-spacing:1px;border-radius:3px;margin-top:4px;">EXAMINE NAME SIGNIFICANCE</button>' +
                    '</div>'
                );
            });
        }
        
        addRegionLabels();

        // ==================== TEXTURE OVERLAY (Chronicle Filter) ====================
        var textureOverlay = document.createElement('div');
        textureOverlay.id = 'map-texture-overlay';
        document.getElementById('map').appendChild(textureOverlay);

        // ==================== SHARE URL PARAM ====================
(function() {
    var params = new URLSearchParams(window.location.search);
    var placeParam = params.get('place');
    if (placeParam) {
        var decoded = decodeURIComponent(placeParam);
        var found = PLACES.find(function(p) { return p.name === decoded; });
        if (found) {
            setTimeout(function() {
                openPlaceDossier(decoded);
                map.flyTo([found.lat, found.lng], Math.max(map.getZoom(), 12), { duration: 1 });
            }, 500);
        }
        if (window.history.replaceState) {
            window.history.replaceState({}, '', window.location.pathname);
        }
    }
    var journeyParam = params.get('journey');
    if (journeyParam) {
        var decodedJ = decodeURIComponent(journeyParam);
        if (JOURNEYS[decodedJ]) {
            var stopParam = parseInt(params.get('stop')) || 0;
            setTimeout(function() {
                document.getElementById('journey-select').value = decodedJ;
                loadJourney(decodedJ);
                if (stopParam > 0) {
                    var stepIdx = Math.min(stopParam, JOURNEYS[decodedJ].path.length - 1);
                    setTimeout(function() {
                        currentStepIndex = stepIdx;
                        updateJourneyStep();
                    }, 800);
                }
            }, 500);
        }
        if (window.history.replaceState) {
            window.history.replaceState({}, '', window.location.pathname);
        }
    }
})();

// ==================== UPDATE MARKERS ====================
        function updateMarkers() {
            markers.clearLayers();
            var sliderVal = parseInt(document.getElementById('time-slider').value);
            var year = 4000 - sliderVal; // Slider 0 = 4000 BC, Slider 4100 = 100 AD
            var activeEra = document.querySelector('.era-btn.active') && document.querySelector('.era-btn.active').dataset.era || 'all';
            
            PLACES.forEach(function(p) {
                // Show places that existed by this year (including future places with year > currentYear)
                var timeMatch = year >= p.year;
                const eraMatch = activeEra === 'all' || p.era === activeEra;
                const zoomMatch = map.getZoom() >= (p.importance === 'major' ? 2 : 4);
                // Knowledge level filter: Novices see only major, Sages see all
                var scribe = JSON.parse(localStorage.getItem('activeScribe') || '{}');
                var kLevel = parseInt(scribe.knowledge || '1');
                var knowledgeMatch = kLevel >= 3 || p.importance === 'major' || kLevel >= 2;
                
                if (timeMatch && eraMatch && zoomMatch && knowledgeMatch) {
                    const popContent = `
                        <b style="color:#D4AF37;font-size: 16.8px;">${p.name}</b>
                        ${p.region ? `<span style="color:#888;font-size: 12px;display:block;margin:2px 0;">${p.region.toUpperCase()}</span>` : ''}
                        <span style="color:#D4AF37;font-size: 13.2px;">${p.importance.toUpperCase()} • ${formatYear(p.year)}</span>
                        <span style="color:#666;font-size: 12px;display:block;">${p.era.toUpperCase()}</span>
                        ${p.pop ? `<span style="color:#aaa;font-size: 12px;margin-top:4px;display:block;">Population: ~${p.pop}</span>` : ''}
                        ${p.events ? `<span style="color:#ccc;font-size: 12px;margin-top:4px;display:block;border-top:1px solid #333;padding-top:4px;">${p.events.split(' | ').join('<br>')}</span>` : ''}
                        ${p.refs ? `<span style="color:#D4AF37;font-size: 10.8px;font-style:italic;margin-top:4px;display:block;">${p.refs.split(' | ').join('<br>')}</span>` : ''}
                        ${p.archaeology ? `<button onclick="openDossier('${p.name}')" style="margin-top:8px;padding:4px 8px;background:rgba(212,175,55,0.2);border:1px solid var(--gold);color:var(--gold);cursor:pointer;font-size: 12px;border-radius:3px;margin-right:4px;">📜 ARCHAEOLOGICAL DOSSIER</button><button onclick="showFieldNotes('${p.name}')" style="margin-top:8px;padding:4px 8px;background:rgba(139,0,0,0.2);border:1px solid #8B0000;color:#c77;font-size: 12px;border-radius:3px;cursor:pointer;">🔬 FIELD NOTES</button>` : `<button onclick="openDossier('${p.name}')" style="margin-top:8px;padding:4px 8px;background:rgba(212,175,55,0.2);border:1px solid var(--gold);color:var(--gold);cursor:pointer;font-size: 12px;border-radius:3px;">📜 ARCHAEOLOGICAL DOSSIER</button>`}
                    `;
                    const m = L.marker([p.lat, p.lng], {
                icon: L.divIcon({
                    className: 'museum-marker',
                    html: '<div class="marker-pulse' + (p.importance === 'major' ? ' major' : '') + '"></div><div class="marker-core"></div>',
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                })
            }).bindTooltip(p.name.toUpperCase(), {
                direction: 'top',
                className: 'museum-tooltip-style',
                offset: [0, -15]
            }).bindPopup(popContent);
                    markers.addLayer(m);
                }
            });
        }
        
        // ==================== INIT ====================
        map.on('zoomend', updateMarkers);
        updateMarkers();
        
        // ==================== SHARE A LOCATION ====================
        (function() {
            var params = new URLSearchParams(window.location.search);
            var placeName = params.get('place');
            if (placeName) {
                var place = PLACES.find(function(p) { return p.name === placeName; });
                if (place) {
                    setTimeout(function() {
                        map.setView([place.lat, place.lng], 10);
                        L.marker([place.lat, place.lng]).bindPopup(place.name).addTo(markers).openPopup();
                        openPlaceDossier(place.name);
                    }, 500);
                }
                if (window.history.replaceState) {
                    window.history.replaceState({}, '', window.location.pathname);
                }
            }
        })();
         
        // ==================== TIMELINE ====================
        window.jumpToEra = function(era) {
            var eraYears = { 'patriarchal': -2000, 'exodus': -1446, 'kingdom': -1010, 'exile': -586, 'new_testament': 30 };
            var year = eraYears[era] || 0;
            var sliderVal = 4000 - year;
            if (year > 0) sliderVal = 4000 - year;
            if (year === 0) sliderVal = 4000;
            var slider = document.getElementById('time-slider');
            if (slider) {
                slider.value = Math.max(0, Math.min(4100, sliderVal));
                slider.dispatchEvent(new Event('input'));
            }
        };

        window.updateEra = function(year) {
            var y = parseInt(year);
            var label = y < 0 ? Math.abs(y) + ' BC' : (y === 0 ? '1 AD' : y + ' AD');
            document.getElementById('year-display').innerText = label;
        };

        document.getElementById('time-slider').addEventListener('input', (e) => {
            let year = 4000 - e.target.value;
            if (year === 0) year = 1; // No year zero
            document.getElementById('year-display').innerText = formatYear(year);
            
            const period = getPeriodLabel(year);
            document.getElementById('era-display').innerText = '// ' + period;
            
            // Chapter markers highlight - activate epoch markers within range
            document.querySelectorAll('.epoch-mark').forEach(function(m) { m.classList.remove('active'); });
            var epochYears = [4000, 2554, 2990, 3414, 3994, 4006]; // positive values now
            epochYears.forEach(function(y, i) {
                var elems = document.querySelectorAll('.epoch-mark');
                if (elems[i] && Math.abs(year - y) < 80) elems[i].classList.add('active');
            });
            
            var slider = document.getElementById('time-slider');
            var pct = ((4000 - year) / 4000) * 100;
            var ind = document.getElementById('epoch-indicator');
            if (ind) ind.style.left = pct + '%';
            
            // Sepia-to-color era shift + body class for CSS filters
            var tilePane = document.querySelector('.leaflet-tile-pane');
            if (tilePane) {
                document.body.classList.remove('era-ot', 'era-silent', 'era-nt', 'era-intertestamental');
                if (year < -400) {
                    document.body.classList.add('era-ot');
                    tilePane.style.filter = 'sepia(0.4) brightness(0.9)';
                } else if (year >= -400 && year <= -6) {
                    document.body.classList.add('era-intertestamental');
                    tilePane.style.filter = 'sepia(0.15) brightness(0.95)';
                } else if (year > -6 && year <= 30) {
                    document.body.classList.add('era-silent');
                    tilePane.style.filter = 'sepia(0.15) brightness(0.95)';
                } else {
                    document.body.classList.add('era-nt');
                    tilePane.style.filter = 'brightness(1.05)';
                }
            }
            
            // Fog clearing
            document.getElementById('fog-overlay').classList.toggle('cleared', year > -2000);

            // Auto-switch audio era based on timeline position
            if (window.ScriptoriumAudio && window.ScriptoriumAudio.init) {
                window.ScriptoriumAudio.init();
                if (year > 0) window.ScriptoriumAudio.transitionTo('nt');
                else if (year < -400) window.ScriptoriumAudio.transitionTo('ot');
                else window.ScriptoriumAudio.transitionTo('default');
            }

            // Check for secret discoveries
            window.checkSecretDiscovery();

            updateMarkers();
        });

        // Initialize fog overlay to match default slider position
        document.getElementById('time-slider').dispatchEvent(new Event('input'));

        // ==================== SECRET VAULT ====================
        var secretVaultUnlocked = false;
        function checkSecretVault() {
            var u = window.__getUnifiedUser ? window.__getUnifiedUser() : null;
            return u ? u.progress.totalCharacters >= 5000 : false;
        }

        window.revealGoldenCompass = function() {
            if (!checkSecretVault()) return;
            var goldenIcon = L.divIcon({
                html: '<div style="width:28px;height:28px;background:rgba(212,175,55,0.3);border:2px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 0 20px rgba(212,175,55,0.8);animation:pulseGlow 2s infinite;"><span style="font-size: 16.8px;">&#127919;</span></div>',
                className: 'golden-compass', iconSize: [28, 28], iconAnchor: [14, 14]
            });
            var secretMarker = L.marker([28.539, 33.978], { icon: goldenIcon }).bindPopup('<b style="color:#D4AF37;">SECRET VAULT — MT. SINAI</b><p style="font-size: 13.2px;color:#888;margin:4px 0;">The place where Moses received the Law. Unlocked by an Illuminator.</p>');
            markers.addLayer(secretMarker);
            secretMarker.openPopup();
        };

        // ==================== HIDDEN GEOGRAPHY — SECRET COORDINATES ====================
        var secretDiscovered = { Sinai: false, Ark: false };

        window.checkSecretDiscovery = function() {
            var sliderVal = parseInt(document.getElementById('time-slider') ? document.getElementById('time-slider').value : 4000);
            var year = 4000 - sliderVal;
            var center = map.getCenter();

            var sinaiZone = (Math.abs(center.lat - 28.5) < 0.3 && Math.abs(center.lng - 33.9) < 0.3);
            var redSeaZone = (Math.abs(center.lat - 28.2) < 0.5 && Math.abs(center.lng - 34.5) < 0.5);

            if (year >= -1460 && year <= -1430 && sinaiZone && !secretDiscovered.Sinai) {
                secretDiscovered.Sinai = true;
                if (window.ScriptoriumAudio) window.ScriptoriumAudio.playEffect('thunder');
                var secretGoldIcon = L.divIcon({
                    html: '<div style="width:32px;height:32px;background:rgba(212,175,55,0.4);border:2px solid #D4AF37;border-radius:50%;display:flex;align-items:center;justify-content:center;animation:pulseGlow 1.5s infinite;box-shadow:0 0 25px rgba(212,175,55,0.9);"><span style="font-size: 16.8px;">&#128293;</span></div>',
                    className: 'secret-vault-marker', iconSize: [32, 32], iconAnchor: [16, 16]
                });
                L.marker([28.539, 33.978], { icon: secretGoldIcon })
                    .bindPopup('<b style="color:#D4AF37;">DISCOVERY: THE EXODUS PATH</b><p style="font-size: 13.2px;color:#aaa;margin:4px 0;">Archaeological evidence of the Hebrew camp at the base of Jebel el-Lawz. Bronze Age blackened stones and Nabatean incense altars found here.</p><p style="font-size: 12px;color:#D4AF37;margin-top:6px;">&#128992; Coordinate: 28.539°N, 33.978°E — The true Mt. Sinai</p>')
                    .addTo(map)
                    .openPopup();

                var revealPath = [
                    [29.5, 34.8], [29.0, 34.5], [28.7, 34.2], [28.539, 33.978]
                ];
                var pathLine = L.polyline(revealPath, {
                    color: '#D4AF37',
                    weight: 2,
                    opacity: 0.6,
                    dashArray: '8, 8'
                }).addTo(map);
                pathLine.bindPopup('<b style="color:#D4AF37;">THE COVENANT PATH</b><p style="font-size: 12px;color:#888;">The route Moses may have walked from the Red Sea crossing to Mt. Sinai.</p>');
            }

            if (year >= -970 && year <= -930 && redSeaZone && !secretDiscovered.Ark) {
                secretDiscovered.Ark = true;
                if (window.ScriptoriumAudio) window.ScriptoriumAudio.playEffect('stone');
                var secretPurpleIcon = L.divIcon({
                    html: '<div style="width:32px;height:32px;background:rgba(138,43,226,0.3);border:2px solid rgba(138,43,226,0.8);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:patmosPulse 1.5s infinite;box-shadow:0 0 25px rgba(138,43,226,0.8);"><span style="font-size: 16.8px;">&#9878;</span></div>',
                    className: 'secret-ark-marker', iconSize: [32, 32], iconAnchor: [16, 16]
                });
                L.marker([29.2, 34.2], { icon: secretPurpleIcon })
                    .bindPopup('<b style="color:#9370DB;">POTENTIAL ARK ROUTE: ETHIOPIA</b><p style="font-size: 13.2px;color:#aaa;margin:4px 0;">Based on the Kebra Nagast, the Ark was taken south along the Red Sea coast to Axum, Ethiopia. The Ark of the Covenant may rest in the Chapel of the Tablet at Maryam Tsion.</p><p style="font-size: 12px;color:#9370DB;margin-top:6px;">&#128992; Coordinate: 29.2°N, 34.2°E — Ethiopian Sea Route</p>')
                    .addTo(map)
                    .openPopup();
            }
        };

        map.on('moveend', function() {
            if (window.ScriptoriumAudio) window.ScriptoriumAudio.init();
            window.checkSecretDiscovery();
        });

        map.on('zoomend', function() {
            if (window.ScriptoriumAudio) window.ScriptoriumAudio.init();
            window.checkSecretDiscovery();
        });

        // ==================== PATMOS EASTER EGG (90 AD) ====================
        var patmosTriggered = false;
        window.checkPatmosEasterEgg = function() {
            var sliderVal = parseInt(document.getElementById('time-slider').value);
            var year = 4000 - sliderVal;
            if (year >= 85 && year <= 100 && !patmosTriggered) {
                patmosTriggered = true;
                document.getElementById('map').style.boxShadow = 'inset 0 0 80px rgba(138,43,226,0.4), inset 0 0 40px rgba(75,0,130,0.3)';
                document.getElementById('map').style.transition = 'box-shadow 2s ease';
                var patmosIcon = L.divIcon({
                    html: '<div style="width:36px;height:36px;background:rgba(138,43,226,0.2);border:2px solid rgba(138,43,226,0.8);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:patmosPulse 1.5s infinite;box-shadow:0 0 30px rgba(138,43,226,0.6);"><span style="font-size: 19.2px;">&#127754;</span></div>',
                    className: 'patmos-marker', iconSize: [36, 36], iconAnchor: [18, 18]
                });
                var patmosMarker = L.marker([37.309, 26.555], { icon: patmosIcon }).bindPopup('<b style="color:#9370DB;">ISLE OF PATMOS</b><p style="font-size: 13.2px;color:#888;margin:4px 0;">John exile — 90 AD. Revelation received.</p><button onclick="triggerPatmosSound()" style="margin-top:8px;padding:6px 12px;background:rgba(138,43,226,0.3);border:1px solid rgba(138,43,226,0.6);color:#D8BFD8;cursor:pointer;font-size: 13.2px;border-radius:4px;">&#127754; Hear the Waves</button>');
                markers.addLayer(patmosMarker);
                patmosMarker.openPopup();
                if (typeof window.ScriptoriumAudio !== 'undefined') {
                    window.ScriptoriumAudio.triggerPatmos();
                }
            } else if (year < 85 || year > 100) {
                patmosTriggered = false;
                document.getElementById('map').style.boxShadow = '';
            }
        };

        window.triggerPatmosSound = function() {
            if (typeof window.ScriptoriumAudio !== 'undefined') {
                window.ScriptoriumAudio.triggerPatmos();
            }
        };

        // Patmos check fires after slider settles
        setTimeout(window.checkPatmosEasterEgg, 500);

        // Auto-reveal golden compass for Illuminators on load
        if (checkSecretVault()) {
            setTimeout(window.revealGoldenCompass, 2000);
        }

        // ==================== PLAY BUTTON ====================
        var isPlaying = false;
        var playInterval = null;
        var playbackSpeed = 1;
        var journeyReplayActive = false;
        
        document.getElementById('play-btn').onclick = function() {
            var slider = document.getElementById('time-slider');
            var btn = this;
            
            if (isPlaying) {
                isPlaying = false;
                journeyReplayActive = false;
                clearInterval(playInterval);
                btn.innerHTML = '▶ PLAY';
                slider.classList.remove('playing');
                document.getElementById('status-text').innerText = 'Paused';
            } else {
                isPlaying = true;
                btn.innerHTML = '⏸ PAUSE';
                slider.classList.add('playing');
                document.getElementById('status-text').innerText = '▶playing (' + playbackSpeed + '×)';
                
                if (currentJourneyKey) {
                    journeyReplayActive = true;
                    playInterval = setInterval(function() {
                        if (!currentJourneyKey) { clearInterval(playInterval); return; }
                        var journey = JOURNEYS[currentJourneyKey];
                        if (!journey || currentStepIndex >= journey.path.length - 1) {
                            isPlaying = false;
                            journeyReplayActive = false;
                            clearInterval(playInterval);
                            btn.innerHTML = '▶ REPLAY';
                            slider.classList.remove('playing');
                            document.getElementById('status-text').innerText = 'Journey Complete';
                            return;
                        }
                        currentStepIndex++;
                        updateJourneyStep();
                    }, 1200 / playbackSpeed);
                } else {
                    var intervalMs = 50 / playbackSpeed;
                    playInterval = setInterval(function() {
                        var val = parseInt(slider.value) + 5;
                        if (val > 4100) {
                            isPlaying = false;
                            clearInterval(playInterval);
                            btn.innerHTML = '▶ REPLAY';
                            slider.classList.remove('playing');
                            document.getElementById('status-text').innerText = 'Done';
                        } else {
                            slider.value = val;
                            slider.dispatchEvent(new Event('input'));
                        }
                    }, intervalMs);
                }
            }
        };
        
        // Speed control button
        var speedBtn = document.createElement('button');
        speedBtn.id = 'speed-btn';
        speedBtn.className = 'tool-btn';
        speedBtn.innerHTML = '1×';
        speedBtn.style.marginLeft = '4px';
        speedBtn.title = 'Playback Speed';
        speedBtn.onclick = function() {
            var speeds = [1, 2, 5];
            var idx = speeds.indexOf(playbackSpeed);
            playbackSpeed = speeds[(idx + 1) % speeds.length];
            this.innerHTML = playbackSpeed + '×';
            if (isPlaying) {
                clearInterval(playInterval);
                if (journeyReplayActive && currentJourneyKey) {
                    playInterval = setInterval(function() {
                        if (!currentJourneyKey) { clearInterval(playInterval); return; }
                        var journey = JOURNEYS[currentJourneyKey];
                        if (!journey || currentStepIndex >= journey.path.length - 1) {
                            isPlaying = false;
                            journeyReplayActive = false;
                            clearInterval(playInterval);
                            document.getElementById('play-btn').innerHTML = '▶ REPLAY';
                            return;
                        }
                        currentStepIndex++;
                        updateJourneyStep();
                    }, 1200 / playbackSpeed);
                } else {
                    var slider = document.getElementById('time-slider');
                    var intervalMs = 50 / playbackSpeed;
                    playInterval = setInterval(function() {
                        var val = parseInt(slider.value) + 5;
                        if (val > 4100) {
                            isPlaying = false;
                            clearInterval(playInterval);
                            document.getElementById('play-btn').innerHTML = '▶ REPLAY';
                        } else {
                            slider.value = val;
                            slider.dispatchEvent(new Event('input'));
                        }
                    }, intervalMs);
                }
                document.getElementById('status-text').innerText = '▶playing (' + playbackSpeed + '×)';
            }
        };
        document.getElementById('play-btn').parentNode.insertBefore(speedBtn, document.getElementById('play-btn').nextSibling);
        
        // ==================== ERA BUTTONS ====================
        document.querySelectorAll('.era-btn').forEach(function(btn) {
            btn.onclick = function() {
                document.querySelectorAll('.era-btn').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                filterEra(btn.getAttribute('data-era'));
            };
        });
        
        // ==================== FILTER ERA ====================
        function filterEra(era) {
            if (typeof updateMarkers === 'function') {
            updateMarkers();

            // Astronomical Layer — celestial sky effects
            var star = document.getElementById('starBethlehem');
            var pillar = document.getElementById('pillarCloud');
            var exile = document.getElementById('exileDarkness');
            var glory = document.getElementById('kingdomGlory');
            var label = document.getElementById('skyPhaseLabel');
            var celestial = document.getElementById('celestial-overlay');
            if (star && pillar && exile && glory) {
                star.classList.remove('active');
                pillar.classList.remove('active');
                exile.classList.remove('active');
                glory.classList.remove('active');
                if (celestial) { celestial.className = ''; }
                if (year >= -6 && year <= -1) {
                    star.classList.add('active');
                    label.textContent = 'STAR OF BETHLEHEM';
                    label.style.color = 'rgba(255,255,200,0.2)';
                    if (celestial) celestial.className = 'sky-bethlehem';
                } else if (year >= -1450 && year <= -1440) {
                    pillar.classList.add('active');
                    label.textContent = 'PILLAR OF CLOUD';
                    label.style.color = 'rgba(200,180,140,0.15)';
                    if (celestial) celestial.className = 'sky-exodus';
                } else if (year === 33) {
                    label.textContent = 'CRUCIFIXION DARKNESS';
                    label.style.color = 'rgba(0,0,0,0.4)';
                    if (celestial) celestial.className = 'sky-crucifixion';
                } else {
                    label.textContent = 'ASTRONOMICAL CYCLE';
                    label.style.color = 'rgba(255,255,255,0.06)';
                }
            }
            }
            
        }
        
        // ==================== TAB NAVIGATION ====================
        document.querySelectorAll('.selah-tab').forEach(function(tab) {
            tab.onclick = function() {
                document.querySelectorAll('.selah-tab').forEach(function(t) { t.classList.remove('active'); });
                document.querySelectorAll('.selah-content').forEach(function(c) { c.classList.remove('active'); });
                tab.classList.add('active');
                document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('active');
            };
        });
        
        function openTab(tabName) {
            document.querySelectorAll('.selah-tab').forEach(function(t) { t.classList.remove('active'); });
            document.querySelectorAll('.selah-content').forEach(function(c) { c.classList.remove('active'); });
            document.querySelector('.selah-tab[data-tab="' + tabName + '"]').classList.add('active');
            document.getElementById('tab-' + tabName).classList.add('active');
        }
        
        // ==================== MAP ZOOM FUNCTIONS ====================
        function zoomIn() {
            if (window.map && window.map.zoomIn) window.map.zoomIn();
        }
        function zoomOut() {
            if (window.map && window.map.zoomOut) window.map.zoomOut();
        }
        
        // ==================== PLAY TOGGLE ====================
        function togglePlay() {
            var btn = document.getElementById('play-btn');
            if (btn) btn.click();
        }
        
        // ==================== LAYER TOGGLE ====================
        function toggleLayer() {
            setLayerMode('vellum');
        }
        
        // ==================== COVENANT TOGGLE ====================
        function toggleCovenant() {
            var btn = document.getElementById('covenant-toggle');
            if (btn) btn.click();
        }
        
        // ==================== SELAH PANEL TOGGLE ====================
        function toggleSelah() {
            var panel = document.getElementById('selah-panel');
            var btn = document.getElementById('selah-toggle');
            if (panel && btn) {
                if (panel.classList.contains('open')) {
                    panel.classList.remove('open');
                    document.body.classList.remove('selah-open');
                    btn.innerHTML = 'VAULT';
                } else {
                    panel.classList.add('open');
                    document.body.classList.add('selah-open');
                    btn.innerHTML = 'CLOSE';
                }
            }
        }
        
        // ==================== SEARCH ====================
        function showSidebar(place) {
            // Open the selah panel and show place info
            const panel = document.getElementById('selah-panel');
            panel.classList.add('open');
            document.getElementById('selah-toggle').innerHTML = 'CLOSE';
            
            // Switch to journey tab to show info
            document.querySelectorAll('.selah-tab').forEach(function(t) { t.classList.remove('active'); });
            document.querySelectorAll('.selah-content').forEach(function(c) { c.classList.remove('active'); });
            document.querySelector('.selah-tab[data-tab="journey"]').classList.add('active');
            document.getElementById('tab-journey').classList.add('active');
            
            document.getElementById('step-info').innerHTML = 
                '<div class="step-breadcrumb">LOCATION</div>' +
                '<div class="step-info-header">' +
                    '<div>' +
                        '<span class="step-info-name" style="color:var(--gold)">' + place.name + '</span>' +
                        '<span class="era-badge">' + place.era.toUpperCase() + '</span>' +
                    '</div>' +
                    '<span class="step-info-ref">' + (place.refs || '') + '</span>' +
                '</div>' +
                '<div class="step-info-body">' +
                    '<div class="step-info-content">' +
                        '<div class="step-info-desc">' + (place.events || '') + '</div>' +
                        '<div class="step-info-stats">' +
                            '<span><strong>Year:</strong> ' + formatYear(place.year) + '</span>' +
                            '<span><strong>Region:</strong> ' + (place.region || '') + '</span>' +
                            '<span><strong>Population:</strong> ~' + (place.pop || 'Unknown') + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';
        }
        
        window.showSidebar = showSidebar;
        
        // Place Dossier - full data panel
        function openPlaceDossier(placeName) {
            var place = PLACES.find(function(p) { return p.name === placeName; });
            if (!place) return;
            
            // Find journeys that visit this place
            var journeysHere = [];
            Object.keys(JOURNEYS).forEach(function(jKey) {
                var journey = JOURNEYS[jKey];
                var visits = journey.path.filter(function(stop) { return stop.name === placeName; });
                if (visits.length > 0) {
                    journeysHere.push(journey.name + ' (' + visits.length + ' stop' + (visits.length > 1 ? 's' : '') + ')');
                }
            });
            
            // Find related figures (people who lived here)
            var people = window.getPeopleWhoLived(placeName) || 'None recorded';
            
            // Open selah panel with dossier content
            var panel = document.getElementById('selah-panel');
            panel.classList.add('open');
            document.getElementById('selah-toggle').innerHTML = 'CLOSE';
            
            // Switch to journey tab
            document.querySelectorAll('.selah-tab').forEach(function(t) { t.classList.remove('active'); });
            document.querySelectorAll('.selah-content').forEach(function(c) { c.classList.remove('active'); });
            var journeyTab = document.querySelector('.selah-tab[data-tab="journey"]');
            if (journeyTab) journeyTab.classList.add('active');
            var journeyContent = document.getElementById('tab-journey');
            if (journeyContent) journeyContent.classList.add('active');
            
            document.getElementById('journey-select').value = '';
            
            document.getElementById('step-info').innerHTML = 
                '<div class="step-breadcrumb">📜 PLACE DOSSIER</div>' +
                '<div class="step-info-header" style="display:flex;align-items:center;justify-content:space-between;">' +
                    '<div>' +
                        '<span class="step-info-name" style="color:var(--gold)">' + placeName + '</span>' +
                        '<span class="era-badge">' + place.era.toUpperCase() + '</span>' +
                    '</div>' +
                    '<button onclick="shareLocation(\'' + placeName + '\')" style="background:rgba(212,175,55,0.85);border:1px solid rgba(212,175,55,0.4);color:var(--gold);cursor:pointer;font-size: 13.2px;padding:4px 10px;border-radius:4px;font-family:\'Montserrat\';" title="Copy shareable link">⎘ Share</button>' +
                '</div>' +
                '<span class="step-info-ref">' + (place.refs || '') + '</span>' +
                '<div class="step-info-body" style="max-height:none;flex:auto;">' +
                    '<div class="step-info-content">' +
                        '<div class="step-info-desc">' + (place.events || '') + '</div>' +
                        '<div class="step-info-stats">' +
                            '<span><strong>Year:</strong> ' + formatYear(place.year) + '</span>' +
                            '<span><strong>Region:</strong> ' + (place.region || 'Unknown') + '</span>' +
                            '<span><strong>Population:</strong> ~' + (place.pop || 'Unknown') + '</span>' +
                            '<span><strong>Importance:</strong> ' + (place.importance || 'Unknown') + '</span>' +
                        '</div>' +
                        '<div class="step-info-people" style="margin-top:12px;">' +
                            '<strong>👤 Notable Figures:</strong><br>' + people + '</div>' +
                        (journeysHere.length > 0 ? 
                        '<div class="step-info-events" style="margin-top:12px;">' +
                            '<strong>Journeys Passing Through:</strong><ul>' + 
                            journeysHere.map(function(j) { return '<li>' + j + '</li>'; }).join('') +
                            '</ul></div>' : '') +
                        '<div class="step-info-events" style="margin-top:12px;">' +
                            '<strong>📖 Biblical References:</strong><ul>' +
                            (place.refs ? place.refs.split(' | ').map(function(r) { return '<li>' + r + '</li>'; }).join('') : '<li>None recorded</li>') +
                            '</ul></div>' +
                        (place.archaeology ? 
                        '<div class="step-info-arch" style="margin-top:12px; border-top:1px solid rgba(212,175,55,0.3); padding-top:12px;">' +
                            '<div style="display:flex; align-items:center; gap:8px; cursor:pointer;" onclick="this.nextElementSibling.classList.toggle(\'collapsed\'); this.querySelector(\'span\').textContent = this.nextElementSibling.classList.contains(\'collapsed\') ? \'▶ ARCHAEOLOGY\' : \'▼ ARCHAEOLOGY\';">' +
                                '<span>▶ ARCHAEOLOGY</span>' +
                            '</div>' +
                            '<div class="arch-content collapsed" style="margin-top:8px; font-size: 15.6px; line-height:1.5;">' +
                                '<div style="margin-bottom:6px;"><strong style="color:var(--gold);">Status:</strong> ' + place.archaeology.status + '</div>' +
                                '<div style="margin-bottom:6px;"><strong style="color:var(--gold);">Excavated:</strong> ' + place.archaeology.excavated + '</div>' +
                                '<div style="margin-bottom:6px;"><strong style="color:var(--gold);">Key Finds:</strong> ' + place.archaeology.finds + '</div>' +
                                (place.archaeology.controversy ? '<div style="margin-bottom:6px;"><strong style="color:#CD853F;">Controversy:</strong> ' + place.archaeology.controversy + '</div>' : '') +
                            '</div>' +
                        '</div>' : '') +
                        (recoveryVerses[placeName] ?
                        '<div class="step-info-rv" style="margin-top:12px; border-top:1px solid rgba(212,175,55,0.3); padding-top:12px;">' +
                            '<div style="display:flex; align-items:center; gap:8px; cursor:pointer;" onclick="this.nextElementSibling.classList.toggle(\'collapsed\'); this.querySelector(\'span\').textContent = this.nextElementSibling.classList.contains(\'collapsed\') ? \'▶ RECOVERY VERSION\' : \'▼ RECOVERY VERSION\';">' +
                                '<span>▶ RECOVERY VERSION</span>' +
                            '</div>' +
                            '<div class="rv-content collapsed" style="margin-top:8px; font-size: 15.6px; line-height:1.6; color:var(--gold-text);">' + recoveryVerses[placeName] + '</div>' +
                        '</div>' : '') +
                    '</div>' +
                '</div>';
        }
        
        window.openPlaceDossier = openPlaceDossier;
        window.recoveryVerses = recoveryVerses;

        // ==================== DOSSIER SIDE PANEL ====================
        window.openDossier = function(name) {
            var place = PLACES.find(function(p) { return p.name === name; });
            if (!place) return;
            document.getElementById('dossierTitle').textContent = place.name;
            document.getElementById('dossierCoords').textContent = place.lat + String.fromCharCode(176) + ' N, ' + place.lng + String.fromCharCode(176) + ' E';
            document.getElementById('dossierDesc').textContent = place.events || 'Historical significance pending.';
            document.getElementById('dossierEra').textContent = (place.era || 'Multiple').toUpperCase();
            document.getElementById('dossierPop').textContent = place.pop || '-';
            var arch = place.archaeology || {};
            document.getElementById('dossierExcavated').textContent = arch.excavated || '-';
            document.getElementById('dossierStatus').textContent = arch.status || '-';
            document.getElementById('dossierFinds').textContent = arch.finds || 'No excavation data recorded.';
            document.getElementById('dossierRefs').textContent = place.refs || '-';
            document.getElementById('dossierControversy').textContent = arch.controversy || 'No major debates recorded.';
            document.getElementById('placeDossier').classList.add('active');
            if (!localStorage.getItem('dossier_opened')) {
                localStorage.setItem('dossier_opened', 'true');
                if (window.checkAchievements) setTimeout(checkAchievements, 500);
            }
            if (SITE_SIGNATURES[name] && window.ScriptoriumAudio) {
                try { ScriptoriumAudio.playEffect('shofar_echo'); ScriptoriumAudio.transitionTo('ot'); } catch(e) {}
            } else if (window.ScriptoriumAudio) {
                try { ScriptoriumAudio.transitionTo('ot'); } catch(e) {}
            }
        };

        window.closeDossier = function() {
            document.getElementById('placeDossier').classList.remove('active');
        };
        
        window.shareLocation = function(name, journeyStep) {
            var url = name && journeyStep !== undefined && currentJourneyKey
                ? window.location.origin + window.location.pathname + '?journey=' + encodeURIComponent(currentJourneyKey) + '&stop=' + journeyStep
                : window.location.origin + window.location.pathname + '?place=' + encodeURIComponent(name);
            var btn = null;
            if (journeyStep !== undefined && currentJourneyKey) {
                var escapedName = name.replace(/'/g, "\\'").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                var regex = new RegExp("shareLocation\\('" + escapedName + "'[,\\s]");
                var allBtns = document.querySelectorAll('button');
                for (var i = 0; i < allBtns.length; i++) {
                    if (regex.test(allBtns[i].getAttribute('onclick') || '')) { btn = allBtns[i]; break; }
                }
            } else {
                var escapedName2 = name.replace(/'/g, "\\'").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                btn = document.querySelector("button[onclick=\"shareLocation('" + escapedName2 + "')\"]");
            }
            try {
                navigator.clipboard.writeText(url).then(function() {
                    if (btn) { btn.innerHTML = '✓ Copied!'; btn.style.background = 'rgba(212,175,55,0.3)'; btn.style.borderColor = 'var(--gold)'; setTimeout(function() { btn.innerHTML = '⎘ Share'; btn.style.background = ''; btn.style.borderColor = ''; }, 2000); }
                    if (window.Scr && Scr.toast) Scr.toast('Link copied to clipboard.', 'success');
                });
            } catch(e) {
                if (window.Scr && Scr.toast) Scr.toast('Could not copy link.', 'error');
            }
        };
        
        // Recovery Version verses (sample data - would need API for full content)
        var recoveryVerses = {
            "Ur": "Genesis 12:1 - Now Jehovah said to Abram...",
            "Haran": "Genesis 12:4 - So Abram went forth as Jehovah had spoken...",
            "Shechem": "Genesis 12:6 - And Abram passed through the land...",
            "Bethel": "Genesis 28:19 - And he called the name of that place Bethel...",
            "Hebron": "Genesis 13:18 - Then Abram moved his tent and came and dwelt by the oaks of Mamre...",
            "Egypt": "Genesis 12:10 - And there was a famine in the land...",
            "Red Sea": "Exodus 14:21 - Then Moses stretched out his hand over the sea...",
            "Sinai": "Exodus 19:17 - And Moses brought the people out of the camp to meet God...",
            "Kadesh": "Numbers 20:1 - Then the children of Israel, the whole assembly, came to the wilderness of Zin...",
            "Jordan": "Joshua 3:13 - And it shall be, when the soles of the feet of the priests...",
            "Jericho": "Joshua 6:20 - So the people shouted with a great shout...",
            "Jerusalem": "2 Samuel 5:6 - And David and all the house of Israel came to Jerusalem...",
            "Babylon": "2 Kings 25:11 - And the remainder of the people...carried away captive to Babylon...",
            "Nazareth": "Luke 2:51 - And He went down with them and came to Nazareth...",
            "Bethlehem": "Luke 2:4 - Joseph also went up from Galilee, from the city of Nazareth...",
            "Jordan River": "Matthew 3:13 - Then Jesus came from Galilee to the Jordan...",
            "Capernaum": "Mark 2:1 - And He entered again into Capernaum after some days...",
            "Gethsemane": "Luke 22:39 - And He came out and went, as He was wont, to the Mount of Olives...",
            "Calvary/Golgotha": "Luke 23:33 - And when they came to the place called Skull...",
            "Ephesus": "Acts 18:19 - And he came to Ephesus, and left them there...",
            "Corinth": "Acts 18:1 - After these things he departed from Athens and came to Corinth...",
            "Philippi": "Acts 16:12 - and from there to Philippi, which is the leading city of the district of Macedonia...",
            "Damascus": "Acts 9:3 - And as he went and drew near, suddenly a light from heaven shone around him...",
            "Antioch": "Acts 11:26 - And when he had found him, he brought him to Antioch. So for a whole year they assembled together with the church...",
            "Smyrna": "Rev 2:8 - And to the angel of the church in Smyrna write...",
            "Pergamum": "Rev 2:12 - And to the angel of the church in Pergamum write...",
            "Thyatira": "Rev 2:18 - And to the angel of the church in Thyatira write...",
            "Sardis": "Rev 3:1 - And to the angel of the church in Sardis write...",
            "Philadelphia": "Rev 3:7 - And to the angel of the church in Philadelphia write...",
            "Laodicea": "Rev 3:14 - And to the angel of the church of the Laodiceans write...",
            "Iconium": "Acts 14:1 - And it happened in Iconium that they went together to the synagogue...",
            "Lystra": "Acts 14:8 - And a certain man in Lystra, without strength in his feet, sat...",
            "Colossae": "Col 1:2 - To the saints and faithful brothers in Christ in Colossae...",
            "Charia": "Matt 10:5 - These twelve Jesus sent out, commanding them...",
            "Tarsus": "Acts 9:11 - But the Lord said to him, Arise and go to the street called Straight...",
            "Athens": "Acts 17:22 - Then Paul stood in the midst of the Areopagus and said..."
        };
        
        // Search-on-Demand toggle
        document.getElementById('search-toggle').onclick = (e) => {
            e.stopPropagation();
            document.getElementById('search-bar').classList.toggle('open');
            if (document.getElementById('search-bar').classList.contains('open')) {
                document.getElementById('map-search').focus();
            }
        };
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container') && document.getElementById('search-bar').classList.contains('open')) {
                document.getElementById('search-bar').classList.remove('open');
            }
        });
        
        // ==================== MOBILE TOUCH GESTURES ====================
        (function() {
            var touchStartY = 0;
            var touchEndY = 0;
            var swipeZone = document.getElementById('selah-panel');
            var threshold = 70;
            
            document.addEventListener('touchstart', function(e) {
                var screenY = e.touches[0].screenY;
                if (screenY > window.innerHeight * 0.65) {
                    touchStartY = screenY;
                }
            }, { passive: true });
            
            document.addEventListener('touchend', function(e) {
                if (touchStartY === 0) return;
                touchEndY = e.changedTouches[0].screenY;
                var deltaY = touchStartY - touchEndY;
                if (deltaY > threshold && window.innerWidth <= 900) {
                    var panel = document.getElementById('selah-panel');
                    if (!panel.classList.contains('open')) {
                        panel.classList.add('open');
                        document.getElementById('selah-toggle').innerHTML = 'CLOSE';
                    }
                }
                touchStartY = 0;
            }, { passive: true });
        })();
        
        // ==================== KEYBOARD NAVIGATION ====================
        document.addEventListener('keydown', function(e) {
            if (!currentJourneyKey) return;
            var journey = JOURNEYS[currentJourneyKey];
            if (!journey) return;
            var max = journey.path.length - 1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentStepIndex < max) { currentStepIndex++; updateJourneyStep(); }
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentStepIndex > 0) { currentStepIndex--; updateJourneyStep(); }
            }
        });
        
        const fuse = new Fuse(PLACES, { keys: ['name', 'events', 'refs'], threshold: 0.4 });

        // Expand search to include discovered hidden finds
        var journal = JSON.parse(localStorage.getItem('scribe_journal') || '[]');
        window._journalFuse = new Fuse(journal, { keys: ['name', 'site', 'info'], threshold: 0.5 });
        
        document.getElementById('map-search').addEventListener('input', (e) => {
            const q = e.target.value.trim();
            const resultsDiv = document.getElementById('search-results');
            if (q.length < 2) { 
                resultsDiv.classList.remove('show'); 
                return; 
            }
            
            var results = fuse.search(q).slice(0, 5);
            var journalResults = (window._journalFuse || new Fuse([],{})).search(q).slice(0, 3);
            
            var html = '';
            results.forEach(function(r) {
                var archBadge = '';
                if (r.item.archaeology && r.item.archaeology.excavated) {
                    archBadge = '<div class="result-arch-badge">' + r.item.archaeology.excavated + '</div>';
                }
                html += '<div class="search-result-item" onclick="selectSearchResult(\'' + r.item.name + '\')">' +
                       '<div class="result-name">' + r.item.name + '</div>' +
                       '<div class="result-era">' + (r.item.era || '') + ' · ' + formatYear(r.item.year) + '</div>' +
                       '<div class="result-desc">' + (r.item.events || '').split(' | ')[0] + '</div>' +
                       archBadge + '</div>';
            });
            journalResults.forEach(function(r) {
                html += '<div class="search-result-item" onclick="selectSearchResult(\'' + r.item.name + '\')" style="opacity:0.6;">' +
                       '<div class="result-name">&#128142; ' + r.item.name + '</div>' +
                       '<div class="result-era">' + (r.item.site || 'Discovered') + '</div>' +
                       '<div class="result-desc">' + r.item.info + '</div></div>';
            });
            if (html) {
                resultsDiv.innerHTML = html;
                resultsDiv.classList.add('show');
            } else {
                resultsDiv.classList.remove('show');
            }
        });
        
        window.selectSearchResult = function(name) {
            var found = PLACES.find(function(p) { return p.name === name; });
            if (found) {
                map.flyTo([found.lat, found.lng], 14, { duration: 2.5, easeLinearity: 0.25 });
                setTimeout(function() { openDossier(name); }, 2600);
            } else {
                var journal = JSON.parse(localStorage.getItem('scribe_journal') || '[]');
                var jf = journal.find(function(j) { return j.name === name; });
                if (jf) {
                    // Try to find coordinates from HIDDEN_FINDS
                    var hf = HIDDEN_FINDS.find(function(f) { return f.name === name; });
                    if (hf) { map.flyTo([hf.lat, hf.lng], 14, { duration: 2 }); }
                }
            }
            document.getElementById('search-results').classList.remove('show');
            document.getElementById('map-search').value = '';
        };
        
        // ==================== LAYER TOGGLE ====================
        document.getElementById('layer-toggle').onclick = function() {
            setLayerMode('vellum');
        };
        
        // ==================== TERRAIN MODE ====================
        window.setLayerMode = function(mode) {
            if (!baseLayer) return;
            map.removeLayer(baseLayer);
            var layerBtn = document.getElementById('layer-toggle');
            var terrainBtn = document.getElementById('terrain-toggle');
            
            if (mode === 'terrain') {
                baseLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data: &copy; <a href="https://openstreetmap.org">OSM</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
                    className: 'terrain-tiles'
                }).addTo(map);
                window.mapLayerMode = 'terrain';
                if (layerBtn) layerBtn.innerHTML = '📜 VELLUM';
                if (terrainBtn) terrainBtn.style.background = 'rgba(212,175,55,0.3)';
            } else if (mode === 'satellite') {
                baseLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'ESRI'
                }).addTo(map);
                window.mapLayerMode = 'satellite';
                if (layerBtn) layerBtn.innerHTML = '🛰️ SAT';
                if (terrainBtn) terrainBtn.style.background = '';
            } else {
                baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);
                window.mapLayerMode = 'vellum';
                if (layerBtn) layerBtn.innerHTML = '📜 VELLUM';
                if (terrainBtn) terrainBtn.style.background = '';
            }
        };
        
        // Terrain sepia CSS
        var terrainCSS = document.createElement('style');
        terrainCSS.textContent = '.terrain-tiles{filter:sepia(0.3) brightness(0.9) contrast(1.1);}';
        document.head.appendChild(terrainCSS);
        
        // ==================== HEAT MAP ====================
        var heatLayer = null;
        var heatActive = false;
        
        window.toggleHeatMap = function() {
            var btn = document.getElementById('heat-toggle');
            if (!window.map || typeof L === 'undefined' || typeof L.heatLayer === 'undefined') {
                if (btn) { btn.textContent = '⚠ HEAT UNAVAILABLE'; btn.style.background = 'rgba(255,0,0,0.2)'; btn.style.color = '#c77'; }
                return;
            }
            
            if (heatActive) {
                if (heatLayer) map.removeLayer(heatLayer);
                heatActive = false;
                if (btn) { btn.textContent = '🔥 HEAT'; btn.style.background = ''; }
            } else {
                var heatData = PLACES
                    .filter(function(p) { return p.lat && p.lng; })
                    .map(function(p) {
                        var imp = p.importance || 1;
                        return [p.lat, p.lng, imp];
                    });
                
                heatLayer = L.heatLayer(heatData, {
                    radius: 35,
                    blur: 25,
                    maxZoom: 12,
                    max: 2.0,
                    gradient: {
                        0.0: 'rgba(0,0,0,0)',
                        0.2: 'rgba(139,90,43,0.4)',
                        0.4: 'rgba(212,175,55,0.6)',
                        0.6: 'rgba(255,140,0,0.75)',
                        0.8: 'rgba(255,69,0,0.85)',
                        1.0: 'rgba(255,215,0,1)'
                    }
                }).addTo(map);
                heatActive = true;
                if (btn) { btn.textContent = '🔥 ON'; btn.style.background = 'rgba(255,100,0,0.3)'; }
            }
        };
        
        // ==================== COVENANT PATH MODE ====================
        var covenantPathLayer = L.layerGroup().addTo(map);
        var covenantActive = false;
        
        var covenantPath = [
            { name: "Ur", lat: 30.963, lng: 46.103 },
            { name: "Haran", lat: 36.864, lng: 40.866 },
            { name: "Shechem", lat: 32.233, lng: 35.167 },
            { name: "Bethel", lat: 31.936, lng: 35.243 },
            { name: "Hebron", lat: 31.533, lng: 35.098 },
            { name: "Beersheba", lat: 31.400, lng: 34.900 },
            { name: "Egypt/Goshen", lat: 30.044, lng: 32.000 },
            { name: "Red Sea", lat: 30.500, lng: 33.500 },
            { name: "Sinai", lat: 28.539, lng: 33.978 },
            { name: "Kadesh", lat: 30.850, lng: 35.450 },
            { name: "Jordan", lat: 31.858, lng: 35.463 },
            { name: "Jericho", lat: 31.858, lng: 35.463 },
            { name: "Shiloh", lat: 32.267, lng: 35.283 },
            { name: "Gibeah", lat: 31.774, lng: 35.236 },
            { name: "Hebron", lat: 31.533, lng: 35.098 },
            { name: "Jerusalem", lat: 31.774, lng: 35.236 },
            { name: "Mount Zion", lat: 31.778, lng: 35.235 },
            { name: "Temple Mount", lat: 31.778, lng: 35.235 },
            { name: "Babylon", lat: 32.537, lng: 44.421 },
            { name: "Susa", lat: 32.189, lng: 48.267 },
            { name: "Jerusalem", lat: 31.774, lng: 35.236 },
            { name: "Nazareth", lat: 32.707, lng: 35.298 },
            { name: "Bethlehem", lat: 31.904, lng: 35.202 },
            { name: "Egypt", lat: 30.044, lng: 31.236 },
            { name: "Jordan River", lat: 31.947, lng: 35.571 },
            { name: "Capernaum", lat: 32.876, lng: 35.542 },
            { name: "Jerusalem", lat: 31.774, lng: 35.236 },
            { name: "Gethsemane", lat: 31.783, lng: 35.240 },
            { name: "Calvary/Golgotha", lat: 31.778, lng: 35.227 }
        ];
        
        window.toggleCovenant = function() {
            var btn = document.getElementById('covenant-toggle');
            covenantActive = !covenantActive;
            if (covenantActive) {
                if (btn) { btn.style.background = 'rgba(212,175,55,0.3)'; btn.style.borderColor = 'var(--gold)'; }
                
                var coords = covenantPath.map(function(p) { return [p.lat, p.lng]; });
                
                L.polyline(coords, {
                    color: '#FFD700', weight: 10, opacity: 0.25,
                    lineCap: 'round', lineJoin: 'round'
                }).addTo(covenantPathLayer);
                
                L.polyline(coords, {
                    color: '#FFD700', weight: 3, opacity: 0.9,
                    lineCap: 'round', lineJoin: 'round'
                }).addTo(covenantPathLayer);
                
                covenantPath.forEach(function(p, i) {
                    var m = L.circleMarker([p.lat, p.lng], {
                        radius: 5, fillColor: '#FFD700', color: '#FFF', weight: 1.5, fillOpacity: 0.9
                    }).bindPopup('<b style="color:#D4AF37">' + (i+1) + '. ' + p.name + '</b><br><span style="color:#888;font-size: 12px">✦ Promise Line</span>');
                    m.addTo(covenantPathLayer);
                });
                
                map.fitBounds(L.polyline(coords).getBounds(), { padding: [40, 40] });
            } else {
                if (btn) { btn.style.background = ''; btn.style.borderColor = ''; }
                covenantPathLayer.clearLayers();
            }
        };
        
        // ==================== JOURNEYS ====================
        var journeySelect = document.getElementById('journey-select');
        var journeyFavorites = JSON.parse(localStorage.getItem('journeyFavorites') || '[]');
        
        // Force populate dropdown with categories
        if (journeySelect && typeof JOURNEYS !== 'undefined') {
            var html = '<option value="">Select a journey...</option>';
            
            // Group by category
            var categories = ['Patriarchs', 'Judges', 'Kings', 'Prophets', 'Apostles'];
            var favorites = JSON.parse(localStorage.getItem('journeyFavorites') || '[]');
            
            // Add favorites first
            if (favorites.length > 0) {
                var favHtml = '';
                favorites.forEach(function(fav) {
                    if (JOURNEYS[fav]) {
                        favHtml += '<option value="' + fav + '" style="color:#FFD700">★ ' + JOURNEYS[fav].name + '</option>';
                    }
                });
                if (favHtml) html += '<optgroup label="★ FAVORITES">' + favHtml + '</optgroup>';
            }
            
            // Add by category
            categories.forEach(function(cat) {
                var journeysInCat = Object.keys(JOURNEYS).filter(function(k) { return JOURNEYS[k].category === cat; });
                if (journeysInCat.length > 0) {
                    var options = '';
                    journeysInCat.forEach(function(k) {
                        options += '<option value="' + k + '">' + (JOURNEYS[k].name || k) + '</option>';
                    });
                    html += '<optgroup label="' + cat.toUpperCase() + '">' + options + '</optgroup>';
                }
            });
            
            journeySelect.innerHTML = html;
            
        } else {
            
        }
        
        // Favorites button - one-time handler (not inside journey change handler)
        var favBtn = document.getElementById('journey-fav-btn');
        if (favBtn) {
            favBtn.onclick = function() {
                if (!currentJourneyKey) return;
                var key = currentJourneyKey;
                var favs = JSON.parse(localStorage.getItem('journeyFavorites') || '[]');
                var idx = favs.indexOf(key);
                if (idx > -1) {
                    favs.splice(idx, 1);
                } else {
                    favs.push(key);
                }
                localStorage.setItem('journeyFavorites', JSON.stringify(favs));
                document.getElementById('journey-fav-btn').innerHTML = idx > -1 ? '☆' : '★';
                refreshJourneyDropdown();
            };
        }

        function refreshJourneyDropdown() {
            var journeySelect = document.getElementById('journey-select');
            var categories = ['Patriarchs', 'Judges', 'Kings', 'Prophets', 'Apostles'];
            var favoritesHtml = '';
            var favs = JSON.parse(localStorage.getItem('journeyFavorites') || '[]');
            favs.forEach(function(fav) {
                if (JOURNEYS[fav]) {
                    favoritesHtml += '<option value="' + fav + '" style="color:#FFD700">★ ' + JOURNEYS[fav].name + '</option>';
                }
            });
            var selectHtml = '<option value="">Select a journey...</option>';
            if (favoritesHtml) selectHtml += '<optgroup label="★ FAVORITES">' + favoritesHtml + '</optgroup>';
            categories.forEach(function(cat) {
                var journeysInCat = Object.keys(JOURNEYS).filter(function(k) { return JOURNEYS[k].category === cat; });
                if (journeysInCat.length > 0) {
                    var options = journeysInCat.map(function(k) {
                        var style = JOURNEYS[k].name === 'Jesus' ? 'style="font-weight:bold;color:#FFD700"' : '';
                        return '<option value="' + k + '" ' + style + '>' + JOURNEYS[k].name + '</option>';
                    }).join('');
                    selectHtml += '<optgroup label="' + cat + '">' + options + '</optgroup>';
                }
            });
            journeySelect.innerHTML = selectHtml;
        }

        // Populate dropdown on load
        refreshJourneyDropdown();

        // ==================== DISTANCE CALCULATOR (MEASURE MODE) ====================
        var measureMode = false;
        var measurePoint1 = null;
        var measurePoint2 = null;
        var measureMarker1 = null;
        var measureMarker2 = null;
        var measureLine = null;
        var measurePopup = null;
        
        window.toggleMeasureMode = function() {
            var btn = document.getElementById('measure-btn');
            measureMode = !measureMode;
            
            if (measureMode) {
                if (btn) { btn.style.background = 'rgba(212,175,55,0.3)'; btn.style.borderColor = 'var(--gold)'; btn.innerHTML = '📏 ON'; }
                map.getContainer().style.cursor = 'crosshair';
                document.getElementById('status-text').innerText = 'Click two points to measure distance';
                
                measurePopup = L.popup()
                    .setLatLng([31.5, 35.2])
                    .setContent('<div style="text-align:center;font-family:Space Grotesk,sans-serif;font-size: 14.4px;color:#D4AF37;padding:8px;">' +
                        '<div style="font-size: 16.8px;margin-bottom:4px;">📏 Measure Distance</div>' +
                        '<div style="color:#8C7853;font-size: 12px;">Click first point on the map</div>' +
                    '</div>')
                    .addTo(map);
            } else {
                if (btn) { btn.style.background = ''; btn.style.borderColor = ''; btn.innerHTML = '📏 RULER'; }
                map.getContainer().style.cursor = '';
                clearMeasure();
            }
            
            if (measureMode) {
        map.on('click', measureMapClick);
    } else {
        map.off('click', measureMapClick);
    }
        };
        
        window.measureMapClick = function(e) {
            if (!measureMode) return;
            
            if (!measurePoint1) {
                measurePoint1 = e.latlng;
                measureMarker1 = L.circleMarker(measurePoint1, {
                    radius: 8, fillColor: '#D4AF37', color: '#FFF', weight: 2, fillOpacity: 0.9
                }).addTo(map);
                
                if (measurePopup) map.removeLayer(measurePopup);
                measurePopup = L.popup()
                    .setLatLng(measurePoint1)
                    .setContent('<div style="text-align:center;font-family:Space Grotesk,sans-serif;font-size: 14.4px;color:#D4AF37;padding:6px;">' +
                        '<div style="color:#8C7853;font-size: 12px;">Point A selected ✓</div>' +
                        '<div style="color:#8C7853;font-size: 10.8px;margin-top:2px;">Click second point</div>' +
                    '</div>')
                    .addTo(map);
            } else if (!measurePoint2) {
                measurePoint2 = e.latlng;
                measureMarker2 = L.circleMarker(measurePoint2, {
                    radius: 8, fillColor: '#F9E076', color: '#FFF', weight: 2, fillOpacity: 0.9
                }).addTo(map);
                
                var distMiles = calcDistance(measurePoint1.lat, measurePoint1.lng, measurePoint2.lat, measurePoint2.lng);
                var distKm = distMiles * 1.60934;
                var daysOnFoot = Math.ceil(distMiles / 20);
                var daysCamel = Math.ceil(distMiles / 30);
                var daysDonkey = Math.ceil(distMiles / 15);
                
                var equivalences = '';
                if (daysOnFoot <= 30) equivalences = '~' + daysOnFoot + ' days on foot · ~' + daysDonkey + ' days by donkey · ~' + daysCamel + ' days by camel';
                else if (daysOnFoot <= 100) equivalences = '~' + Math.round(daysOnFoot / 7) + ' weeks on foot · ~' + Math.round(daysDonkey / 7) + ' weeks by donkey';
                else equivalences = '~' + Math.round(daysOnFoot / 365) + ' year' + (Math.round(daysOnFoot / 365) !== 1 ? 's' : '') + ' on foot · ~' + Math.round(daysOnFoot / 30) + ' months';
                
                var journeyNames = findNearestJourney(measurePoint1, measurePoint2);
                var journeyNote = journeyNames ? '<div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(212,175,55,0.2);color:#c9a2ff;font-size: 10.8px;">' + journeyNames + '</div>' : '';
                
                if (measurePopup) map.removeLayer(measurePopup);
                measurePopup = L.popup()
                    .setLatLng(measurePoint2)
                    .setContent('<div style="text-align:center;font-family:Space Grotesk,sans-serif;min-width:200px;">' +
                        '<div style="font-size: 15.6px;color:#D4AF37;margin-bottom:6px;">📏 Distance</div>' +
                        '<div style="font-size: 24px;color:#F3E5AB;font-weight:600;">' + Math.round(distMiles) + ' mi</div>' +
                        '<div style="font-size: 13.2px;color:#8C7853;">' + Math.round(distKm) + ' km</div>' +
                        '<div style="margin-top:8px;font-size: 12px;color:#D4AF37;">' + equivalences + '</div>' +
                        journeyNote +
                        '<div style="margin-top:8px;"><button onclick="clearMeasure()" style="padding:5px 12px;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-family:Space Grotesk;font-size: 10.8px;cursor:pointer;border-radius:3px;">CLEAR</button></div>' +
                    '</div>')
                    .addTo(map);
                
                if (measureLine) map.removeLayer(measureLine);
                measureLine = L.polyline([measurePoint1, measurePoint2], {
                    color: '#D4AF37', weight: 3, opacity: 0.85,
                    dashArray: '10,6',
                    className: 'measure-line'
                }).addTo(map);
                
                document.getElementById('status-text').innerText = Math.round(distMiles) + ' mi · ' + Math.round(distKm) + ' km · ' + equivalences.split('·')[0].trim();
                
                var measureCSS = document.createElement('style');
                measureCSS.textContent = '.measure-line{animation:measureDash 1s linear infinite;}' +
                    '@keyframes measureDash{to{stroke-dashoffset:-16;}}';
                if (!document.querySelector('.measure-css')) {
                    measureCSS.className = 'measure-css';
                    document.head.appendChild(measureCSS);
                }
                
                measurePoint1 = null;
                measurePoint2 = null;
            }
        };
        
        window.clearMeasure = function() {
            if (measureMarker1) map.removeLayer(measureMarker1);
            if (measureMarker2) map.removeLayer(measureMarker2);
            if (measureLine) map.removeLayer(measureLine);
            if (measurePopup) map.removeLayer(measurePopup);
            measureMarker1 = null;
            measureMarker2 = null;
            measureLine = null;
            measurePopup = null;
            measurePoint1 = null;
            measurePoint2 = null;
            document.getElementById('status-text').innerText = '';
        };
        
        function findNearestJourney(p1, p2) {
            if (typeof JOURNEYS === 'undefined') return null;
            var matches = [];
            Object.keys(JOURNEYS).forEach(function(key) {
                var j = JOURNEYS[key];
                j.path.forEach(function(stop) {
                    var d1 = calcDistance(p1.lat, p1.lng, stop.lat, stop.lng);
                    var d2 = calcDistance(p2.lat, p2.lng, stop.lat, stop.lng);
                    if (d1 < 30 || d2 < 30) {
                        if (!matches.includes(j.name)) matches.push(j.name);
                    }
                });
            });
            return matches.length > 0 ? '✦ Routes nearby: ' + matches.slice(0, 2).join(', ') : null;
        }
        
        // ==================== TAB SYSTEM ====================
        document.querySelectorAll('.selah-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.selah-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.selah-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
            };
        });
        
        // ==================== SELAH PANEL ====================
        document.getElementById('selah-toggle').onclick = () => {
            const panel = document.getElementById('selah-panel');
            const btn = document.getElementById('selah-toggle');
            if (panel.classList.contains('open')) {
                panel.classList.remove('open');
                btn.innerHTML = 'VAULT';
                btn.style.borderColor = '';
                btn.style.color = '';
            } else {
                panel.classList.add('open');
                btn.innerHTML = 'CLOSE';
                btn.style.borderColor = '';
                btn.style.color = '';
            }
        };
        
        journeySelect.addEventListener('change', (e) => {
            const key = e.target.value;
            if (!key) return;
            
            currentJourneyKey = key;
            currentStepIndex = 0;
            
            const journey = JOURNEYS[key];
            
            // Calculate journey stats
            let totalDist = 0;
            for (let i = 1; i < journey.path.length; i++) {
                totalDist += calcDistance(journey.path[i-1].lat, journey.path[i-1].lng, journey.path[i].lat, journey.path[i].lng);
            }
            const totalDays = Math.ceil(totalDist / 25);
            const stopCount = journey.path.length;
            var minYear = Infinity, maxYear = -Infinity;
            journey.path.forEach(function(s) {
                var sy = s.year !== undefined ? s.year : journey.year;
                if (sy < minYear) minYear = sy;
                if (sy > maxYear) maxYear = sy;
            });
            var yearLabel;
            if (minYear === maxYear) {
                yearLabel = journey.year > 0 ? journey.year + ' AD' : Math.abs(journey.year) + ' BC';
            } else {
                yearLabel = (minYear > 0 ? minYear + ' AD' : Math.abs(minYear) + ' BC') + ' \u2192 ' + (maxYear > 0 ? maxYear + ' AD' : Math.abs(maxYear) + ' BC');
            }
            const isFav = journeyFavorites.includes(key);
            
            // Show journey preview card
            document.getElementById('journey-fav-btn').innerHTML = isFav ? '★' : '☆';
            
            document.getElementById('journey-preview').style.display = 'block';
            var journeyName = journey.name || 'Unknown';
            var journeyColor = journey.color || 'var(--gold)';
            var stopInfo = stopCount + ' stops, ' + Math.round(totalDist) + ' mi, ' + totalDays + ' days, ' + yearLabel;
            document.getElementById('journey-preview').innerHTML = '<div class="journey-card"><div class="journey-card-header"><span class="journey-card-name" style="color:' + journeyColor + '">' + journeyName + '</span></div><div class="journey-card-stats">' + stopInfo + '</div></div>';
            

            const coords = journey.path.map(s => [s.lat, s.lng]);
            
            journeyLayer.clearLayers();
            
            // Background fade for all journey paths with ink-draw animation
            var bgPath = L.polyline(coords, { color: journey.color, weight: 3, opacity: 0.5, className: 'ink-path' }).addTo(journeyLayer);
            
            // Active segment highlight (prev → curr → next) drawn after marker setup
            const activeSegmentPolyline = () => {
                const journeyData = JOURNEYS[currentJourneyKey];
                if (!journeyData) return;
                const idx = currentStepIndex;
                const pathLen = journeyData.path.length;
                const activeCoords = [];
                if (idx > 0) activeCoords.push([journeyData.path[idx-1].lat, journeyData.path[idx-1].lng]);
                activeCoords.push([journeyData.path[idx].lat, journeyData.path[idx].lng]);
                if (idx < pathLen - 1) activeCoords.push([journeyData.path[idx+1].lat, journeyData.path[idx+1].lng]);
                if (activeCoords.length > 1) {
                    L.polyline(activeCoords, { color: '#D4AF37', weight: 3.5, opacity: 0.95 }).addTo(journeyLayer);
                }
            };
            
            var denseMode = journey.path.length > 12;
            window._denseMode = denseMode;
            
            if (denseMode) {
                var firstStop = journey.path[0];
                window._currentJourneyMarker = L.marker([firstStop.lat, firstStop.lng], {
                    icon: L.divIcon({
                        className: 'journey-stop active-marker',
                        html: '<div>1</div>',
                        iconSize: [22, 22],
                        iconAnchor: [11, 11]
                    })
                }).bindTooltip(firstStop.name, { permanent: true, direction: 'top', offset: [0, -12], className: 'stop-tooltip' }).addTo(journeyLayer);
            } else {
                journey.path.forEach(function(stop, i) {
                    var isActive = i === currentStepIndex;
                    var marker = L.marker([stop.lat, stop.lng], {
                        icon: L.divIcon({
                            className: 'journey-stop' + (isActive ? ' active-marker' : ''),
                            html: '<div>' + (i+1) + '</div>',
                            iconSize: [22, 22],
                            iconAnchor: [11, 11]
                        })
                    }).bindTooltip(stop.name, { permanent: true, direction: 'top', offset: [0, -12], className: 'stop-tooltip' });
                    marker.addTo(journeyLayer);
                });
            }
            
            map.fitBounds(L.polyline(coords).getBounds(), { padding: [100, 100], maxZoom: 15 });
            if (key === 'nehemiah_rebuild') {
                map.setView([31.773, 35.215], 17);
            }
            updateJourneyStep();
        });
        
        let currentJourneyKey = null;
        let currentStepIndex = 0;
        
        function updateJourneyStep() {
            if (!currentJourneyKey) return;
            const journey = JOURNEYS[currentJourneyKey];
            const stop = journey.path[currentStepIndex];
            const totalStopsInPath = journey.path.length;
            const remainingStops = totalStopsInPath - currentStepIndex - 1;
            
            // Redraw active segment highlight
            journeyLayer.eachLayer(layer => {
                if (layer.options.color === '#D4AF37') journeyLayer.removeLayer(layer);
            });
            const activeCoords = [];
            if (currentStepIndex > 0) activeCoords.push([journey.path[currentStepIndex-1].lat, journey.path[currentStepIndex-1].lng]);
            activeCoords.push([stop.lat, stop.lng]);
            if (currentStepIndex < totalStopsInPath - 1) activeCoords.push([journey.path[currentStepIndex+1].lat, journey.path[currentStepIndex+1].lng]);
            if (activeCoords.length > 1) {
                L.polyline(activeCoords, { color: '#D4AF37', weight: 3.5, opacity: 0.95 }).addTo(journeyLayer);
            }
            
            // Update active marker - handle both dense and normal mode
            if (window._denseMode && window._currentJourneyMarker) {
                window._currentJourneyMarker.setLatLng([stop.lat, stop.lng]);
                window._currentJourneyMarker.setTooltipContent(stop.name);
                var el = window._currentJourneyMarker.getElement();
                if (el) {
                    var numDiv = el.querySelector('div');
                    if (numDiv) numDiv.textContent = currentStepIndex + 1;
                }
            } else if (!window._denseMode) {
                journeyLayer.eachLayer(function(l) {
                    if (l instanceof L.Marker) {
                        var el = l.getElement();
                        if (el) {
                            var idx = parseInt(el.querySelector('div').textContent, 10) - 1;
                            var isActive = idx === currentStepIndex;
                            el.classList.toggle('active-marker', isActive);
                        }
                    }
                });
            } else {
                journeyLayer.eachLayer(function(layer) {
                    if (layer instanceof L.Marker) {
                        var el = layer.getElement();
                        if (el) {
                            el.classList.remove('active-marker');
                        }
                    }
                });
                const markers = journeyLayer.getLayers().filter(l => l instanceof L.Marker);
                if (markers[currentStepIndex]) {
                    const el = markers[currentStepIndex].getElement();
                    if (el) {
                        const icon = el.querySelector('.journey-stop');
                        if (icon) icon.classList.add('active-marker');
                    }
                }
            }
            
            // Zoom to separate overlapping markers
            const zoomLat = stop.lat || 31.5;
            const zoomLng = stop.lng || 35.2;
            const currentStopNum = currentStepIndex + 1;
            const totalStopsInPathInJourney = totalStopsInPath;
            
            // Dynamic zoom based on journey position - cinematic feel
            let zoomLevel = 10;
            if (currentStopNum === 1) {
                zoomLevel = 8; // Wide view for journey start
            } else if (currentStopNum === totalStopsInPathInJourney) {
                zoomLevel = 12; // Tight zoom on final destination
            } else if (currentStopNum <= Math.floor(totalStopsInPathInJourney / 3)) {
                zoomLevel = 9; // Early journey - moderate wide
            } else if (currentStopNum <= Math.floor(2 * totalStopsInPathInJourney / 3)) {
                zoomLevel = 10; // Mid journey
            } else {
                zoomLevel = 11; // Late journey - closer view
            }
            
            // Smooth cinematic pan with ease-in-out
            // Trigger vellum blur before pan
            document.body.classList.add('map-blur');
            
            map.flyTo([zoomLat, zoomLng], zoomLevel, { 
                duration: 1.2,
                easeLinearity: 0.25,
                noMoveStart: false,
                speed: 0.7,
                curve: 1.5,
                essential: true,
                padding: [30, 30]
            });
            
            // Remove blur after pan completes
            setTimeout(() => document.body.classList.remove('map-blur'), 1300);
            
            // Add atmospheric effects during zoom
            const tilePane = document.querySelector('.leaflet-tile-pane');
            const fogOverlay = document.querySelector('.fog-overlay');
            if (tilePane) {
                tilePane.classList.add('zooming');
                tilePane.classList.add('panning');
                setTimeout(() => {
                    tilePane.classList.remove('zooming');
                    tilePane.classList.remove('panning');
                }, 1200);
            }
            if (fogOverlay) {
                fogOverlay.classList.add('vignette-active');
                setTimeout(() => fogOverlay.classList.remove('vignette-active'), 1400);
            }
            
            // Calculate distance and travel time from previous stop (or start)
            let distanceSincePrev = 0;
            let daysSincePrev = 0;
            if (currentStepIndex > 0) {
                const prevStop = journey.path[currentStepIndex - 1];
                distanceSincePrev = calcDistance(prevStop.lat, prevStop.lng, stop.lat, stop.lng);
                daysSincePrev = Math.ceil(distanceSincePrev / 25); // ~25 miles/day ancient pace
            } else if (journey.startDistance) {
                // Distance from journey origin
                distanceSincePrev = journey.startDistance;
                daysSincePrev = Math.ceil(distanceSincePrev / 25);
            }
            
            // Calculate total journey stats
            var totalDistance = 0;
            for (var i = 1; i < journey.path.length; i++) {
                totalDistance += calcDistance(journey.path[i-1].lat, journey.path[i-1].lng, journey.path[i].lat, journey.path[i].lng);
            }
            var totalDays = Math.ceil(totalDistance / 25);
            
            // Calculate remaining distance from current position to end
            var remainingDistance = 0;
            for (var j = currentStepIndex + 1; j < journey.path.length - 1; j++) {
                remainingDistance += calcDistance(journey.path[j].lat, journey.path[j].lng, journey.path[j+1].lat, journey.path[j+1].lng);
            }
            var remainingDays = Math.ceil(remainingDistance / 25);
            
            // Update progress bar with journey stats
            document.getElementById('journey-progress').style.display = 'block';
            var stopText = 'Stop ' + (currentStepIndex + 1) + ' of ' + totalStopsInPath;
            document.getElementById('journey-stop-count').textContent = stopText;
            if (daysSincePrev > 0) {
                var daysText = '~' + daysSincePrev + ' day' + (daysSincePrev > 1 ? 's' : '') + ' from last stop';
                document.getElementById('journey-eta').textContent = daysText;
            } else {
                var remainingText = remainingDays > 0 ? '~' + remainingDays + ' day' + (remainingDays > 1 ? 's' : '') + ' remaining' : 'Final stop';
                document.getElementById('journey-eta').textContent = remainingText;
            }
            
            // Render progress arc instead of dots
            var dotsContainer = document.getElementById('journey-progress-dots');
            var totalStopsInPathJourney = journey.path.length;
            var arcLength = 200; // approximate SVG width
            var filledPercent = totalStopsInPathJourney > 1 ? (currentStepIndex / (totalStopsInPathJourney - 1)) * arcLength : 0;
            
            var stopPositions = [];
            for (var ai = 0; ai < totalStopsInPathJourney; ai++) {
                var xPos = (ai / (totalStopsInPathJourney - 1)) * arcLength;
                stopPositions.push(xPos);
            }
            
            var arcHtml = '<div class="journey-progress-arc">' +
                '<svg viewBox="0 0 200 30" preserveAspectRatio="none">' +
                '<path class="arc-bg" d="M 5,25 Q 100,5 195,25" />' +
                '<path class="arc-fill" d="M 5,25 Q 100,5 195,25" stroke-dasharray="' + filledPercent + ' ' + arcLength + '" />';
            
            journey.path.forEach(function(s, i) {
                var cx = stopPositions[i];
                var stateClass = i < currentStepIndex ? 'completed' : (i === currentStepIndex ? 'active' : 'future');
                arcHtml += '<circle class="arc-stop ' + stateClass + '" cx="' + (5 + cx) + '" cy="15" r="4" data-idx="' + i + '" />';
            });
            
            arcHtml += '</svg></div>';
            dotsContainer.innerHTML = arcHtml;
            
            // Add click handlers to arc stops
            dotsContainer.querySelectorAll('.arc-stop').forEach(function(stop) {
                stop.onclick = function() {
                    currentStepIndex = parseInt(this.getAttribute('data-idx'));
                    updateJourneyStep();
                };
            });
            
            // Enhanced stop info with who lived there, key events, biblical refs
            var peopleWhoLived = getPeopleWhoLived(stop.name);
            var keyEvents = stop.notes ? stop.notes.join('|') : getKeyEvents(stop.name, stop.ref);
            
            var stepNum = currentStepIndex + 1;
            var stopName = stop.name || 'Unknown';
            var stopDesc = stop.desc || '';
            var descClampCSS = 'height:auto;';
            var stopRef = stop.ref || '';
            var journeyColor = journey.color || 'var(--gold)';
            var stopImage = stop.image || '';
            var stopYear = stop.year !== undefined ? stop.year : journey.year;
            var yearDisplay = stopYear > 0 ? stopYear + ' AD' : Math.abs(stopYear) + ' BC';

            // Build step-info panel
            var html = '<div class="step-breadcrumb">STOP ' + stepNum + ' OF ' + totalStopsInPath + '</div>' +
                '<div class="breadcrumb-trail">';
            for (var i = 0; i < totalStopsInPath; i++) {
                var dotClass = i < currentStepIndex ? 'visited' : (i === currentStepIndex ? 'active' : 'pending');
                var stopNameDot = journey.path[i].name || '?';
                html += '<div class="dot ' + dotClass + '" onclick="jumpToStep(' + i + ')" title="' + stopNameDot + '">' + (i + 1) + '</div>';
                if (i < totalStopsInPath - 1) {
                    var lineClass = i < currentStepIndex ? 'visited' : '';
                    html += '<div class="dot-line ' + lineClass + '"></div>';
                }
            }
            html += '</div>';

            document.getElementById('step-info').innerHTML = html;

            // Show detailed stop info on map popup — constrained split-screen layout
            var selahOpen = document.getElementById('selah-panel').classList.contains('open');
            var chronicleHeight = Math.max(105, window.innerHeight * 0.16);
            var availableWidth = selahOpen ? window.innerWidth - 360 : window.innerWidth - 160;
            var maxWidth = Math.min(900, availableWidth);
            var maxHeight = Math.min(600, window.innerHeight - chronicleHeight - 80);
            var rightPadding = selahOpen ? 370 : 90;
            var bottomPadding = chronicleHeight + 40;
            var popupWidth = stopImage ? 880 : 510;
            
            var popupHtml =
                '<div style="display: flex; flex-direction: row; background: rgba(12,12,18,0.96); border: 1px solid rgba(212,175,55,0.3); border-radius: 4px; width: ' + popupWidth + 'px; max-width: 94vw; height: auto; min-height: 280px; max-height: ' + maxHeight + 'px; font-family:\'Cormorant Garamond\',serif; box-shadow: 0 25px 50px rgba(0,0,0,0.9); position: relative;">' +

                    // LEFT COLUMN: Strictly Locked to 45% Width
                    (stopImage ?
                    '<div style="width: 45%; height: 100%; border-right: 1px solid rgba(212,175,55,0.15); background: #000; flex-shrink: 0; overflow: hidden;">' +
                        '<img src="' + stopImage + '" alt="' + stopName + '" style="width: 100%; height: 100%; object-fit: cover; display: block;">' +
                    '</div>' : '') +

                    // RIGHT COLUMN: Strictly Locked to 55% Width (Fixes Text Clipping)
                    '<div style="width: ' + (stopImage ? '55%' : '100%') + '; height: 100%; padding: 35px 35px 35px 30px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; background: linear-gradient(180deg, #0a0908 0%, #030303 100%);">' +

                        '<div style="font-family:\'Cinzel\',serif; font-size: 1.5rem; color:#d4af37; margin-bottom: 4px; line-height: 1.2; padding-right: 20px;">' + stopName + '</div>' +
                        '<div style="font-size: 1rem; color: rgba(212,175,55,0.7); margin-bottom: 20px; font-style: italic;">' + (stopRef.startsWith('http') ? '<a href="' + stopRef + '" target="_blank" style="color:rgba(212,175,55,0.7);text-decoration:underline;word-break:break-word;overflow-wrap:break-word;">' + stopRef + '</a>' : stopRef) + '</div>' +

                        (stopDesc ? '<div style="font-size: 1.15rem; color: rgba(255,255,255,0.95); margin-bottom: 12px; line-height: 1.6; word-wrap: break-word; overflow-wrap: break-word;' + descClampCSS + '">' + stopDesc + '</div>' : '') +

                        (peopleWhoLived ? '<div style="font-size: 1.05rem; color: rgba(255,255,255,0.5); border-top: 1px solid rgba(212,175,55,0.15); padding-top: 8px; margin-bottom: 6px; padding-bottom: 6px; word-wrap: break-word;"><strong style="color:#d4af37;">People:</strong> ' + peopleWhoLived + '</div>' : '') +
                        (keyEvents ? '<div style="font-size:1rem;color:rgba(255,255,255,0.85);margin-bottom:10px;word-break:break-word;overflow-wrap:break-word;"><strong style="color:#d4af37;">Notes:</strong> ' + keyEvents.replace(/\|/g, '; ') + '</div>' : '') +
                        (distanceSincePrev > 0 ? '<div style="font-size:0.9rem;color:rgba(255,255,255,0.7);margin-bottom:12px;"><strong style="color:#d4af37;">Travel:</strong> ' + Math.round(distanceSincePrev) + ' mi (~' + daysSincePrev + ' day' + (daysSincePrev > 1 ? 's' : '') + ')</div>' : '') +
                        '<div style="padding-top:12px;border-top:1px solid rgba(212,175,55,0.12);display:flex;gap:14px;flex-wrap:wrap;font-size:0.8rem;color:rgba(255,255,255,0.35);">' +
                            '<span><strong style="color:#d4af37;">Year:</strong> ' + yearDisplay + '</span>' +
                            '<span><strong style="color:#d4af37;">Journey:</strong> ' + Math.round(totalDistance) + ' mi</span>' +
                            '<span><strong style="color:#d4af37;">Stop:</strong> ' + stepNum + '/' + totalStopsInPath + '</span>' +
                        '</div>' +
                    '</div>' +

                '</div>';

            setTimeout(function() {
                document.fonts.ready.then(function() {
                    if (window._denseMode && window._currentJourneyMarker) {
                        var m = window._currentJourneyMarker;
                        if (m._popup) m.closePopup();
                        m.bindPopup(popupHtml, {
                            maxWidth: maxWidth,
                            minWidth: 300,
                            autoPan: true,
                            autoPanPadding: [rightPadding, bottomPadding],
                            keepInView: true,
                            closeButton: true,
                            className: 'journey-stop-popup'
                        }).openPopup();
                    } else {
                        journeyLayer.eachLayer(function(l) {
                            if (l instanceof L.Marker && Math.abs(l.getLatLng().lat - stop.lat) < 0.01 && Math.abs(l.getLatLng().lng - stop.lng) < 0.01) {
                                l.bindPopup(popupHtml, {
                                    maxWidth: maxWidth,
                                    minWidth: 300,
                                    autoPan: true,
                                    autoPanPadding: [rightPadding, bottomPadding],
                                    keepInView: true,
                                    closeButton: true,
                                    className: 'journey-stop-popup'
                                }).openPopup();
                            }
                        });
                    }
                });
            }, 300);

            document.getElementById('prev-step').disabled = currentStepIndex === 0;
            const nextBtn = document.getElementById('next-step');
            const isLastStop = currentStepIndex === journey.path.length - 1;
            nextBtn.disabled = isLastStop;
            
            // Show complete state instead of dark disabled
            if (isLastStop) {
                nextBtn.innerHTML = '✓ COMPLETE';
                nextBtn.style.borderColor = 'var(--gold)';
                nextBtn.style.color = 'var(--gold)';
                nextBtn.style.boxShadow = '0 0 15px rgba(212,175,55,0.6)';
                nextBtn.style.opacity = '1';
            } else {
                nextBtn.innerHTML = 'NEXT';
                nextBtn.style.borderColor = '';
                nextBtn.style.color = '';
                nextBtn.style.boxShadow = '';
                nextBtn.style.opacity = '';
            }
            
            // Auto-sync timeline to stop era
            if (document.getElementById('time-slider')) {
                var eraYear = stop.year !== undefined ? stop.year : journey.year;
                var sliderYear = eraYear > 0 ? eraYear + 2000 : Math.abs(eraYear);
                document.getElementById('time-slider').value = sliderYear;
                var display = sliderYear < 2000 ? (2000 - sliderYear) + ' BC' : (sliderYear - 2000) + ' AD';
                document.getElementById('year-display').textContent = display;
            }
            
        }
        
        window.jumpToStep = function(idx) {
            currentStepIndex = idx;
            updateJourneyStep();
        };
        
        document.getElementById('next-step').onclick = () => {
            if (!currentJourneyKey) return;
            const journey = JOURNEYS[currentJourneyKey];
            if (currentStepIndex < journey.path.length - 1) {
                currentStepIndex++;
                updateJourneyStep();
            }
        };
        
        document.getElementById('prev-step').onclick = () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                updateJourneyStep();
            }
        };
        
        // ==================== JOURNEY AUTOPLAY ====================
        let journeyPlayInterval = null;
        
        document.getElementById('journey-play').onclick = function() {
            if (!currentJourneyKey) return;

            // Stop the timeline play interval if running
            if (playInterval) {
                clearInterval(playInterval);
                playInterval = null;
                isPlaying = false;
                var timelineBtn = document.getElementById('play-btn');
                if (timelineBtn) { timelineBtn.innerHTML = '▶ PLAY'; timelineBtn.classList.remove('playing'); }
                document.getElementById('status-text').innerText = '';
            }

            if (journeyPlayInterval) {
                clearInterval(journeyPlayInterval);
                journeyPlayInterval = null;
                this.innerHTML = '▶ PLAY';
                this.style.background = 'var(--accent)';
                return;
            }

            this.innerHTML = '⏹ STOP';
            this.style.background = '#333';

            journeyPlayInterval = setInterval(() => {
                if (currentStepIndex >= JOURNEYS[currentJourneyKey].path.length - 1) {
                    clearInterval(journeyPlayInterval);
                    journeyPlayInterval = null;
                    this.innerHTML = '▶ PLAY';
                    this.style.background = 'var(--accent)';
                    return;
                }
                currentStepIndex++;
                updateJourneyStep();
            }, 2000);
        };

        // ==================== OPEN MICROSCOPE (Archaeological Lens) ====================
        window.openMicroscope = function(name) {
            var arch = ARCHAEOLOGY_VAULT[name];
            if (!arch) return;
            var stratHtml = '';
            if (arch.stratigraphy) {
                stratHtml = '<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(212,175,55,0.1);">' +
                    '<div style="font-size: 10.8px;color:rgba(0,255,255,0.3);letter-spacing:2px;margin-bottom:6px;font-family:\'Montserrat\',sans-serif;">STRATIGRAPHY</div>';
                arch.stratigraphy.forEach(function(layer, i) {
                    var colors = ['#c0392b', '#e67e22', '#f1c40f', '#2980b9', '#8e44ad'];
                    var c = colors[i % colors.length];
                    stratHtml += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">' +
                        '<div style="width:12px;height:12px;background:' + c + ';opacity:0.4;border-radius:2px;"></div>' +
                        '<div style="font-size: 10.8px;color:rgba(255,255,255,0.3);font-family:\'Space Grotesk\',sans-serif;">' + layer + '</div>' +
                    '</div>';
                });
                stratHtml += '</div>';
            }
            var content = '<div style="font-family:\'Space Grotesk\',sans-serif;min-width:340px;padding:8px;">' +
                '<div style="text-align:center;margin-bottom:12px;">' +
                    '<div style="font-family:\'Cinzel\',serif;font-size: 21.6px;color:#D4AF37;letter-spacing:3px;">' + name + '</div>' +
                    '<div style="font-size: 12px;color:#8B0000;letter-spacing:2px;margin-top:4px;">ARCHAEOLOGICAL LENS</div>' +
                '</div>' +
                '<div style="border:1px solid rgba(212,175,55,0.3);padding:14px;background:rgba(26,21,16,0.98);border-radius:4px;">' +
                    '<div style="font-size: 13.2px;color:#888;margin-bottom:4px;"><strong style="color:#D4AF37;">ARTIFACT:</strong> ' + arch.artifact + '</div>' +
                    '<div style="font-size: 12px;color:#666;margin-bottom:4px;"><strong>ARTIFACT ID:</strong> ' + (arch.id || 'N/A') + '</div>' +
                    '<div style="font-size: 12px;color:#666;margin-bottom:4px;"><strong>DISCOVERED:</strong> ' + arch.year + '</div>' +
                    '<div style="font-size: 13.2px;color:#aaa;font-style:italic;line-height:1.5;margin-top:8px;">' + arch.note + '</div>' +
                    stratHtml +
                '</div>' +
                '<div style="text-align:center;margin-top:10px;">' +
                    '<button onclick="map.closePopup();" style="padding:6px 14px;background:rgba(212,175,55,0.2);border:1px solid var(--gold);color:var(--gold);cursor:pointer;font-size: 12px;border-radius:3px;font-family:\'Syncopate\';">CLOSE LENS</button>' +
                '</div>' +
            '</div>';
            L.popup()
                .setLatLng(map.getCenter())
                .setContent(content)
                .addTo(map)
                .openOn(map);
        };

        // ==================== FIELD NOTES (Digital Microscope) ====================
        const POTTERY_TYPOLOGY = {
            "Iron Age I": "Collar-rim storage jars — associated with early Israelite settlement (1200-1000 BC)",
            "Iron Age II": "LMLK Royal stamped handles — associated with King Hezekiah (c. 700 BC)",
            "Iron Age": "Burnished red-slip bowls and holemouth jars",
            "Roman": "Herodian Terra Sigillata — red-slipped luxury ware",
            "Early Roman": "Herodian oil lamps and glass unguentaria",
            "Herodian": "Fineware bowl and cooking pot rims (1st c. BC-1st c. AD)",
            "Hellenistic": "Fish-plate and Megarian bowl fragments",
            "Middle Bronze": "Tell el-Yahudiyeh ware — black juglets with white dotted decoration",
            "Late Bronze": "Bichrome and Base-Ring wares — Cypriot imports",
            "Early Bronze": "Platter bowls and grain-wash decoration",
            "Neo-Babylonian": "Palace ware — carinated bowls and glazed bricks",
            "Neo-Assyrian": "Palace ware — fine-ribbed beakers and Nimrud ivories",
            "Persian": "Mortaria bowls and Attic Black-Figure imports",
            "Byzantine": "African Red Slip ware — stamped crosses and fish",
            "Chalcolithic": "Cornet vessels and violin-shaped figurines"
        };

        window.showFieldNotes = function(placeName) {
            var place = PLACES.find(function(p) { return p.name === placeName; }) ||
                        JOURNEYS[currentJourneyKey] && JOURNEYS[currentJourneyKey].path.find(function(s) { return s.name === placeName; });

            if (!place) return;

            var arch = place.archaeology || {};
            var era = place.era || '';
            var eraLabel = { 'patriarchal': 'Middle Bronze', 'exodus': 'Late Bronze',
                'kingdom': 'Iron Age II', 'new_testament': 'Roman' }[era] || 'Iron Age';
            var potteryNote = POTTERY_TYPOLOGY[eraLabel] || 'General domestic ware';

            var html = '<div style="font-family:\'Space Grotesk\',sans-serif;min-width:300px;">' +
                '<h3 style="color:#D4AF37;margin:0 0 8px;font-family:\'Cinzel\',serif;">' + (place.name || placeName) + '</h3>' +
                '<div style="margin-bottom:8px;padding:8px;background:rgba(139,0,0,0.06);border-left:3px solid #8B0000;border-radius:0 3px 3px 0;">' +
                    '<div style="font-size: 10.8px;color:#c77;letter-spacing:2px;font-family:\'Montserrat\',sans-serif;">CERAMIC TYPOLOGY</div>' +
                    '<div style="font-size: 12px;color:rgba(255,255,255,0.4);margin-top:2px;font-style:italic;">' + potteryNote + '</div>' +
                '</div>';

            if (arch.status) html += '<p style="color:#c77;font-size: 13.2px;margin:4px 0;">STATUS: <strong>' + arch.status + '</strong></p>';
            if (arch.excavated) html += '<p style="color:#aaa;font-size: 13.2px;margin:4px 0;">EXCAVATED: <strong>' + arch.excavated + '</strong></p>';
            if (arch.finds) html += '<p style="color:#888;font-size: 12px;margin:6px 0 4px;border-top:1px solid #333;padding-top:6px;"><strong style="color:#D4AF37;">FINDS:</strong><br>' + arch.finds.split(', ').join('<br>') + '</p>';
            if (arch.controversy) html += '<p style="color:#666;font-size: 12px;margin:6px 0 4px;font-style:italic;border-top:1px solid #222;padding-top:6px;"><strong style="color:#c77;">DEBATE:</strong> ' + arch.controversy + '</p>';

            html += '<div style="margin-top:8px;display:flex;gap:4px;">' +
                '<button onclick="map.closePopup();openSiteLab(\'' + placeName + '\')" style="flex:1;padding:4px 6px;background:rgba(0,100,0,0.2);border:1px solid #4caf50;color:#81c784;cursor:pointer;font-size: 10.8px;border-radius:3px;">🧪 C14 LAB</button>' +
                '<button onclick="map.closePopup();openMicroscope(\'' + placeName + '\')" style="flex:1;padding:4px 6px;background:rgba(212,175,55,0.2);border:1px solid var(--gold);color:var(--gold);cursor:pointer;font-size: 10.8px;border-radius:3px;">&#128220; ARTIFACT LENS</button>' +
            '</div>' +
            '</div>';

            L.popup()
                .setLatLng([place.lat || map.getCenter().lat, place.lng || map.getCenter().lng])
                .setContent(html)
                .addTo(map)
                .openOn(map);
        };

        // ==================== STRATIGRAPHY PANEL ====================
        window.showStratigraphy = function(placeName) {
            var panel = document.getElementById('stratigraphyPanel');
            var siteEl = document.getElementById('strataSite');
            var layersEl = document.getElementById('strataLayers');
            var arch = ARCHAEOLOGY_VAULT[placeName];

            if (!arch || !arch.stratigraphy || arch.stratigraphy.length === 0) {
                panel.classList.remove('visible');
                return;
            }

            siteEl.textContent = placeName.toUpperCase();
            var html = '';
            var classMap = {
                'roman': 'l-roman', 'iron': 'l-iron', 'bronze': 'l-bronze',
                'byzantine': 'l-byzantine', 'persian': 'l-persian',
                'hellenistic': 'l-hellenistic', 'neo-assyrian': 'l-neoassyrian',
                'neo-babylonian': 'l-neobabylonian', 'herodian': 'l-herodian',
                'early bronze': 'l-earlybronze', 'middle bronze': 'l-middlebronze',
                'late bronze': 'l-latebronze', 'chalcolithic': 'l-chalcolithic'
            };

            arch.stratigraphy.forEach(function(layer) {
                var cls = 'l-iron';
                var lower = layer.toLowerCase();
                for (var key in classMap) {
                    if (lower.indexOf(key) !== -1) { cls = classMap[key]; break; }
                }
                html += '<div class="strata-layer ' + cls + '">' +
                    '<span class="layer-period">' + layer + '</span>' +
                '</div>';
            });

            layersEl.innerHTML = html;
            panel.classList.add('visible');
        };

        // Integrate stratigraphy into openMicroscope
        var origOpenMicroscope = window.openMicroscope;
        window.openMicroscope = function(name) {
            showStratigraphy(name);
            origOpenMicroscope(name);
        };

        // ==================== SCIENTIFIC LAB (C14 + Pottery) ====================
        const POTTERY_MARKERS = {
            'patriarchal': 'Middle Bronze Burnished Ware — Tell el-Yahudiyeh juglets',
            'exodus': 'Bichrome Ware — Cypriot-inspired pottery',
            'conquest': 'Collar-rim jars — early Israelite settlement',
            'judges': 'Iron Age I collared pithoi',
            'kingdom': 'LMLK Royal Stamped Handles — Hezekiah\'s administration',

            'exile': 'Babylonian Palace Ware — carinated bowls',
            'return': 'Persian Mortaria bowls — Attic imports',
            'new_testament': 'Herodian Oil Lamps & Eastern Sigillata A'
        };



        function runLabC14(percent) {
            percent = parseInt(percent);
            var halfLife = 5730;
            var age = Math.log(percent / 100) / -0.693 * halfLife;
            var year = Math.round(2025 - age);

            document.getElementById('labC14Age').textContent = Math.round(age).toLocaleString() + ' YRS';
            document.getElementById('labC14Year').textContent = formatYear(year);

            var matchEl = document.getElementById('labC14Match');
            var siteName = document.getElementById('labLocation').textContent;
            var arch = ARCHAEOLOGY_VAULT[siteName];
            if (arch && arch.c14) {
                var diff = Math.abs(percent - arch.c14.target);
                if (diff <= 2) {
                    matchEl.innerHTML = '&#9989; Match! ' + formatYear(year);
                    matchEl.style.color = '#4caf50';
                } else {
                    matchEl.innerHTML = '&#128300; Target: ' + arch.c14.target + '%';
                    matchEl.style.color = 'rgba(255,255,255,0.15)';
                }
            } else {
                matchEl.innerHTML = '';
            }
        }

        window.openSiteLab = function(placeName) {
            var lab = document.getElementById('sciLab');
            var place = PLACES.find(function(p) { return p.name === placeName; });
            if (!place) return;

            document.getElementById('labLocation').textContent = placeName;
            var era = place.era || 'kingdom';
            var potteryLabel = POTTERY_MARKERS[era] || 'Common domestic ware';
            document.getElementById('labPotteryInfo').textContent = potteryLabel;

            document.getElementById('labC14Slider').value = 100;
            runLabC14(100);
            lab.style.display = 'block';

            var arch = ARCHAEOLOGY_VAULT[placeName];
            if (arch && arch.c14) {
                document.getElementById('labC14Slider').value = arch.c14.target + 15;
                runLabC14(arch.c14.target + 15);
            }
        };

        // Update Field Notes popup to include lab trigger
        var origShowFieldNotes = window.showFieldNotes;
        window.showFieldNotes = function(placeName) {
            if (origShowFieldNotes) origShowFieldNotes(placeName);
            setTimeout(function() { openSiteLab(placeName); }, 100);
        };

        // ==================== DIG MODE (Digital Trowel) ====================
        const SITE_SIGNATURES = {
            'Jerusalem': { effect: 'shofar_echo', ambient: 'temple_atmosphere', filter: 'high_reverb' },
            'Ephesus': { effect: 'marble_scrape', ambient: 'roman_marketplace', filter: 'open_air' }
        };

        var isDigging = false;

        window.toggleDigMode = function() {
            isDigging = !isDigging;
            var mapEl = document.getElementById('map');
            var btn = document.getElementById('digToggle');

            if (isDigging) {
                mapEl.classList.add('dig-mode-active');
                btn.classList.add('active');
                btn.innerHTML = '&#9968; STOP';
                showDigNotification('DIG MODE — Brush the map to uncover hidden artifacts.');
            } else {
                mapEl.classList.remove('dig-mode-active');
                btn.classList.remove('active');
                btn.innerHTML = '&#9968; DIG';
            }
        };

        function showDigNotification(msg) {
            var n = document.createElement('div');
            n.className = 'dig-notification';
            n.textContent = msg;
            document.getElementById('map').parentNode.appendChild(n);
            setTimeout(function() { n.remove(); }, 2500);
        }

        if (map) {
            map.on('mousemove', function(e) {
                if (!isDigging) return;

                var container = map.getContainer();
                var rect = container.getBoundingClientRect();
                var x = e.originalEvent.clientX - rect.left;
                var y = e.originalEvent.clientY - rect.top;

                var dust = document.createElement('div');
                dust.className = 'dust-cloud';
                dust.style.left = x + 'px';
                dust.style.top = y + 'px';
                container.appendChild(dust);
                setTimeout(function() { dust.remove(); }, 800);

                // Proximity signal — hot/cold pulse when near a hidden find
                var closestDist = 99999;
                HIDDEN_FINDS.forEach(function(f) {
                    if (f.revealed) return;
                    var d = e.latlng.distanceTo(L.latLng(f.lat, f.lng));
                    if (d < closestDist) closestDist = d;
                });
                if (closestDist < 300) {
                    var sigRadius = Math.max(20, closestDist * 0.3);
                    var sigOpacity = Math.max(0.02, 0.15 - closestDist / 3000);
                    var signal = L.circle(e.latlng, {
                        radius: sigRadius,
                        color: '#d4af37',
                        fillColor: '#d4af37',
                        fillOpacity: sigOpacity,
                        weight: 0.5,
                        opacity: sigOpacity * 2
                    }).addTo(map);
                    setTimeout(function() { map.removeLayer(signal); }, 1200);
                }

                HIDDEN_FINDS.forEach(function(find) {
                    if (find.revealed) return;
                    var distance = e.latlng.distanceTo(L.latLng(find.lat, find.lng));
                    if (distance < 80) {
                        find.revealed = true;
                        var isGreat = find.siteGroup && SITE_SIGNATURES[find.siteGroup];
                        var goldIcon = L.divIcon({
                            className: 'discovery-marker' + (isGreat ? ' great-site' : ''),
                            iconSize: [20, 20],
                            iconAnchor: [10, 10]
                        });
                        L.marker([find.lat, find.lng], { icon: goldIcon })
                            .addTo(map)
                            .bindPopup('<div style="font-family:Space Grotesk,sans-serif;"><strong style="color:#D4AF37;">&#128142; UNCOVERED: ' + find.name + '</strong><br><span style="font-size: 13.2px;color:#aaa;">' + find.info + '</span></div>')
                            .openPopup();

                        showDigNotification('&#128142; DISCOVERY: ' + find.name + ' uncovered!');

                        saveToJournal(find);

                        if (window.ScriptoriumAudio) {
                            try {
                                if (isGreat) {
                                    ScriptoriumAudio.playEffect('shofar_echo');
                                }
                                ScriptoriumAudio.transitionTo('nt');
                            } catch(e) {}
                        }
                    }
                });
            });
        }

        // ═══════════════════════════════════════
        // SCRIBE BADGE
        // ═══════════════════════════════════════
        function initScribeBadge() {
            var scribe = JSON.parse(localStorage.getItem('activeScribe')) || { name: 'Guest Scribe', gender: 'male', location: '—', knowledge: '1' };
            var streak = JSON.parse(localStorage.getItem('scribe_logia_streak')) || { count: 0 };
            document.getElementById('badgeName').textContent = scribe.name.toUpperCase();
            if (streak.count >= 7) {
                var glow = document.getElementById('badgeGlow');
                if (glow) { glow.style.background = '#00d4ff'; glow.style.boxShadow = '0 0 15px #00d4ff'; }
            }
            // Profile card
            var av = document.getElementById('avatarLetter');
            if (av) av.textContent = scribe.gender === 'female' ? 'S' : 'B';
            var pn = document.getElementById('pName');
            if (pn) pn.textContent = scribe.name;
            var pr = document.getElementById('pRank');
            var titles = { '1': 'Novice', '2': 'Student', '3': 'Witness', '4': 'Scribe' };
            if (pr) pr.textContent = titles[scribe.knowledge] || 'Seeker';
            var ps = document.getElementById('pStanding');
            if (ps) ps.textContent = (scribe.knowledge || '1') + '/4';
            var po = document.getElementById('pOrigin');
            if (po) po.textContent = scribe.location || '—';
        }
        initScribeBadge();

        // ═══════════════════════════════════════
        // SCRIBE'S JOURNAL
        // ═══════════════════════════════════════
        function saveToJournal(find) {
            var journal = JSON.parse(localStorage.getItem('scribe_journal')) || [];
            if (!journal.some(function(item) { return item.name === find.name; })) {
                journal.push({ name: find.name, info: find.info, date: new Date().toLocaleDateString(), site: find.siteGroup || 'Unknown Site' });
                localStorage.setItem('scribe_journal', JSON.stringify(journal));
                if (window.checkAchievements) setTimeout(checkAchievements, 500);
                // Refresh search fuse
                window._journalFuse = new Fuse(journal, { keys: ['name', 'site', 'info'], threshold: 0.5 });
            }
            renderJournal();
        }

        function renderJournal() {
            var container = document.getElementById('journalInventory');
            if (!container) return;
            var journal = JSON.parse(localStorage.getItem('scribe_journal')) || [];
            if (journal.length === 0) {
                container.innerHTML = '<p class="empty-msg">No artifacts yet cataloged...</p>';
                return;
            }
            container.innerHTML = journal.map(function(item) {
                return '<div class="journal-card"><div class="card-site">' + item.site + '</div><div class="card-name">' + item.name + '</div><div class="card-date">Cataloged: ' + item.date + '</div></div>';
            }).join('');
        }

        window.exportJournal = function() {
            var journal = JSON.parse(localStorage.getItem('scribe_journal')) || [];
            if (journal.length === 0) { if (window.Scr && Scr.toast) Scr.toast('The journal is empty. Explore the map to catalog artifacts.', 'error'); return; }
            if (window.ScriptoriumAudio) { try { ScriptoriumAudio.transitionTo('nt'); } catch(e) {} }
            setTimeout(function() { window.print(); }, 500);
        };

        setTimeout(renderJournal, 500);

        // Check for first-visit handbook
        if (!localStorage.getItem('seen_handbook')) {
            setTimeout(function() { document.getElementById('scribeHandbook').style.display = 'block'; if (window.ScriptoriumAudio) { try { ScriptoriumAudio.transitionTo('ot'); } catch(e) {} } }, 2000);
        }

        window.nextHandbookPage = function(num) {
            document.querySelectorAll('.handbook-page').forEach(function(p) { p.classList.remove('active'); });
            var page = document.getElementById('handbookPage' + num);
            if (page) page.classList.add('active');
            if (window.ScriptoriumAudio) { try { ScriptoriumAudio.transitionTo('nt'); } catch(e) {} }
        };

        window.closeHandbook = function() {
            document.getElementById('scribeHandbook').style.display = 'none';
            localStorage.setItem('seen_handbook', 'true');
            if (window.ScriptoriumAudio) { try { ScriptoriumAudio.transitionTo('ot'); } catch(e) {} }
        };