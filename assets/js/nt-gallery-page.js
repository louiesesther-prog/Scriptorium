/* ── UNIFIED MAP OVERLAY ── */
        var currentAudio = null;
        var currentTTS = null;
        var isPlaying = false;
        var currentBook = '';
        var currentChapters = 0;

        var archaeologyData = {
            'MATTHEW': { artifact: "Codex Vaticanus (B/03)", material: "Vellum (calfskin)", site: "Constantinople (4th century AD)", note: "One of the earliest complete manuscripts of the New Testament, preserved in the Vatican Library. Its Matthew text is remarkably pure, showing the Gospel was already fixed by the early 4th century." },
            'MARK': { artifact: "Papyrus 45 (P45)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 225 AD)", note: "The oldest known collection of Gospels on a single papyrus codex. P45 contains fragments of Mark, Luke, John, and Acts — proving these four Gospels circulated together as a unified corpus." },
            'LUKE': { artifact: "Papyrus 75 (P75)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "Contains nearly complete text of Luke and Acts. Its textual purity is so remarkable that scholars call it 'B' because it rivals Vaticanus. Luke's infancy narrative and parables were already scripture." },
            'JOHN': { artifact: "Rylands Library Papyrus P52", material: "Papyrus", site: "Oxyrhynchus, Egypt (1920)", note: "The oldest fragment of the New Testament, recording John 18:31-33. Found thousands of miles from where the book was written, it proves the Gospel spread rapidly across the Roman Empire within decades." },
            'ACTS': { artifact: "Codex Sinaiticus (01)", material: "Vellum (calfskin)", site: "St. Catherine's Monastery, Sinai (1844)", note: "The iconic find of the 19th century — a 4th-century complete Bible including Acts. Its witness to the Book of Acts is crucial for understanding the early church's missionary journeys." },
            'ROMANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "The oldest witness to Paul's epistles, containing Romans through Hebrews. This papyrus proves Paul's letters circulated as a collected corpus by the early 3rd century — less than 150 years after they were written." },
            '1 CORINTHIANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "The earliest textual evidence for 1 Corinthians, found alongside Romans and other Pauline epistles. Paul's wisdom on love (1 Cor 13) and resurrection (1 Cor 15) were already sacred text." },
            '2 CORINTHIANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "Preserved alongside other Pauline letters, this fragment shows Paul's emotionally intense letter to the Corinthians was already in the apostolic canon within a century of his writing it." },
            'GALATIANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "Paul's thunderous declaration of justification by faith was preserved on this early papyrus. The Galatian controversy over circumcision was already canonized as scripture." },
            'EPHESIANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "The prison epistle to the Ephesians, with its cosmic vision of Christ as head of the church, was already scripture when this fragment was copied. The 'powers and principalities' theology was established." },
            'PHILIPPIANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "Paul's letter from a Roman prison — the 'joy' epistle — was already canonical. The Christ hymn (Phil 2:5-11) was preserved verbatim, showing early liturgical use." },
            'COLOSSIANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "The mystery of Christ's fullness (Col 1-2) was already scripture. The warning against 'philosophy and empty deceit' (Col 2:8) shows the tension with early Gnostic thought was already recognized." },
            '1 THESSALONIANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "The earliest surviving Pauline letter, preserved in P46. Paul's eschatological teaching on the 'man of lawlessness' (2 Thess 2) was already part of the canon." },
            '2 THESSALONIANS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "The Thessalonian correspondence — Paul's first letter and a follow-up — were already collected and read as scripture in the 3rd century." },
            '1 TIMOTHY': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "The pastoral epistles — Timothy and Titus — circulated as Paul's instruction to church leaders. The 'sound doctrine' emphasis (1 Tim 1:10) was recognized as authoritative." },
            '2 TIMOTHY': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "Paul's final letter, written just before his death, was already in the Pauline corpus. 'All Scripture is breathed out by God' (2 Tim 3:16) was already quoted as authoritative." },
            'TITUS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "Titus's role in organizing Crete's churches was canonized. The qualifications for elders (Titus 1:5-9) became the blueprint for church leadership structure." },
            'PHILEMON': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "The shortest of Paul's letters, a private appeal on behalf of Onesimus, was preserved alongside the major epistles — proving even personal letters were considered scripture." },
            'HEBREWS': { artifact: "Papyrus 46 (P46)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "Though anonymous, Hebrews was included in the Pauline corpus. Its theology of Christ's priesthood 'after the order of Melchizedek' (Heb 7) was preserved as apostolic teaching." },
            'JAMES': { artifact: "Codex Sinaiticus (01)", material: "Vellum (calfskin)", site: "St. Catherine's Monastery, Sinai (1844)", note: "Though debated by Luther, James was accepted into the canon. Its famous declaration that 'faith without works is dead' (James 2:26) was preserved on this ancient vellum." },
            '1 PETER': { artifact: "Papyrus 72 (P72)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 300 AD)", note: "Contains 1 Peter and 2 Peter together. Peter's letter about 'being born again through imperishable seed' (1 Peter 1:23) was already authoritative teaching." },
            '2 PETER': { artifact: "Papyrus 72 (P72)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 300 AD)", note: "2 Peter 3:15-16 shows the author knew Paul's letters were scripture. This 'sibling epistle' to 1 Peter, with its warning against false teachers, was included in the canon." },
            '1 JOHN': { artifact: "Bodmer Papyri (P66)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 200 AD)", note: "John's letter on love and light, 'God is love' (1 John 4:8), was preserved in the same manuscript tradition as John's Gospel — showing the Johannine corpus was already unified." },
            '2 JOHN': { artifact: "Codex Alexandrinus (A)", material: "Vellum (calfskin)", site: "Egypt (5th century AD)", note: "The shortest New Testament letter, just 13 verses, was included alongside the longer Johannine epistles. Its warning against 'antichrists' (2 John 7) was recognized as scripture." },
            '3 JOHN': { artifact: "Codex Alexandrinus (A)", material: "Vellum (calfskin)", site: "Egypt (5th century AD)", note: "The only New Testament book that approves of someone — Gaius — for his hospitality. Even this brief personal letter was preserved as divinely inspired." },
            'JUDE': { artifact: "Papyrus 72 (P72)", material: "Papyrus", site: "Oxyrhynchus, Egypt (c. 300 AD)", note: "Contains the famous 'archangel' battle (Jude 9) and the ' Enoch' quote (Jude 14-15). This brief letter defending the faith was included alongside the greater epistles." },
            'REVELATION': { artifact: "Codex Sinaiticus (01)", material: "Vellum (calfskin)", site: "St. Catherine's Monastery, Sinai (1844)", note: "The only apocalypses in the New Testament, sealed by John on Patmos. Its vision of the 'New Jerusalem' descending from heaven (Rev 21) was the final book accepted into the canon around 400 AD." }
        };

        function openMap(bookName, chapters) {
            currentBook = bookName;
            currentChapters = chapters;
            var overlay = document.getElementById('mapOverlay');
            document.getElementById('overlayTitle').innerText = bookName;
            document.getElementById('overlaySubtitle').innerText = 'Provenance & Discovery';
            document.getElementById('btnChapter').classList.add('active');
            document.getElementById('btnArch').classList.remove('active');
            document.getElementById('chapterView').style.display = 'block';
            document.getElementById('archaeologyView').style.display = 'none';

            var grid = document.getElementById('chapterGrid');
            grid.innerHTML = '';
            for (var i = 1; i <= chapters; i++) {
                var btn = document.createElement('button');
                btn.className = 'chapter-btn';
                btn.innerText = i;
                btn.onclick = (function(ch) { return function() { readChapter(bookName, ch); }; })(i);
                grid.appendChild(btn);
            }

            var archData = archaeologyData[bookName.toUpperCase()];
            var img = document.getElementById('artifactImg');
            if (archData) {
                document.getElementById('noteArtifact').innerText = archData.artifact;
                document.getElementById('noteMaterial').innerText = archData.material;
                document.getElementById('noteSite').innerText = archData.site;
                document.getElementById('noteDetail').innerText = archData.note;
            } else {
                document.getElementById('noteArtifact').innerText = 'Manuscript Fragment (pending identification)';
                document.getElementById('noteMaterial').innerText = 'Papyrus / Vellum';
                document.getElementById('noteSite').innerText = 'Archaeological survey ongoing';
                document.getElementById('noteDetail').innerText = 'Field notes are being compiled. This manuscript awaits archaeological classification.';
            }

            stopAudio();
            overlay.style.display = 'flex';
            overlay.classList.add('active');
        }

        function switchView(view) {
            document.getElementById('chapterView').style.display = view === 'chapters' ? 'block' : 'none';
            document.getElementById('archaeologyView').style.display = view === 'archaeology' ? 'block' : 'none';
            document.getElementById('btnChapter').classList.toggle('active', view === 'chapters');
            document.getElementById('btnArch').classList.toggle('active', view === 'archaeology');
            stopAudio();
        }

        function closeOverlay() {
            var overlay = document.getElementById('mapOverlay');
            overlay.style.display = 'none';
            overlay.classList.remove('active');
            stopAudio();
        }

        function readChapter(book, ch) {
            var overlay = document.getElementById('mapOverlay');
            var content = overlay.querySelector('.overlay-content');
            content.innerHTML = '<button class="close-btn" data-action="close-chapter">[ X ] CLOSE ARCHIVE</button>' +
                '<div style="text-align:center;padding:80px 20px 60px;">' +
                '<div style="font-size: 0.66rem;color:var(--text-secondary);letter-spacing:4px;margin-bottom:16px;">PREPARING MANUSCRIPT</div>' +
                '<div style="font-family:\'Cinzel\',serif;font-size: 2.16rem;color:var(--reality-silver);letter-spacing:3px;margin-bottom:6px;">' + book + ' ' + ch + '</div>' +
                '<div style="font-size: var(--text-micro);color:var(--text-secondary);letter-spacing:2px;margin-bottom:40px;">Chapter ' + ch + ' of ' + currentChapters + '</div>' +
                '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size: 0.66rem;color:var(--text-secondary);line-height:1.8;max-width:500px;margin:0 auto;">The sacred manuscript awaits your arrival. Transcribe the verses to unlock the scroll.</div>' +
                '</div>';
            overlay.classList.add('active');
        }

        function closeChapter() {
            closeOverlay();
            openMap(currentBook, currentChapters);
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeChapter();
        });

        function toggleNarration() {
            var btn = document.getElementById('audioTrigger');
            var icon = document.getElementById('audioIcon');
            if (isPlaying) {
                stopAudio();
            } else {
                isPlaying = true;
                btn.classList.add('playing');
                icon.innerHTML = '&#9208;';
                var ch = typeof currentChapter === 'number' ? currentChapter : 1;
                fetch('/api/audio/' + encodeURIComponent(currentBook.toLowerCase().replace(/ /g, '-')) + '/' + ch)
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data.available && data.url) {
                        if (!currentAudio) { currentAudio = document.createElement('audio'); }
                        currentAudio.src = data.url;
                        currentAudio.play();
                        currentAudio.onended = function() { stopAudio(); };
                    } else {
                        fallbackTTS();
                    }
                })
                .catch(function() { fallbackTTS(); });
            }
        }

        function fallbackTTS() {
            if (window.speechSynthesis) {
                stopAudio();
                var chapterText = currentBook + ' Chapter ' + (typeof currentChapter === 'number' ? currentChapter : 1);
                var utter = new SpeechSynthesisUtterance(chapterText);
                utter.rate = 0.85;
                utter.pitch = 0.9;
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utter);
                var btn = document.getElementById('audioTrigger');
                if (btn) btn.classList.add('playing');
                var icon = document.getElementById('audioIcon');
                if (icon) icon.innerHTML = '&#9208;';
                currentTTS = utter;
                utter.onend = function() { stopAudio(); };
            } else {
                stopAudio();
                ScriptoriumCore.showToast('Audio narration unavailable for this book');
            }
        }

        function stopAudio() {
            if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
            if (currentTTS) { window.speechSynthesis.cancel(); currentTTS = null; }
            isPlaying = false;
            var btn = document.getElementById('audioTrigger');
            if (btn) btn.classList.remove('playing');
            var icon = document.getElementById('audioIcon');
            if (icon) icon.innerHTML = '&#128266;';
        }

        function moveLens(e) {
            var img = document.getElementById('artifactImg');
            var lens = document.getElementById('zoomLens');
            var result = document.getElementById('zoomResult');
            var zoom = 3;
            if (!img || !lens || !result) return;
            var rect = img.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) { hideLens(); return; }
            lens.style.display = 'block';
            lens.style.left = (x - 50) + 'px';
            lens.style.top = (y - 50) + 'px';
            result.style.backgroundImage = "url('" + img.src + "')";
            result.style.backgroundSize = (rect.width * zoom) + 'px ' + (rect.height * zoom) + 'px';
            result.style.backgroundPosition = '-' + (x * zoom - 100) + 'px -' + (y * zoom - 100) + 'px';
        }

        function hideLens() {
            var lens = document.getElementById('zoomLens');
            var result = document.getElementById('zoomResult');
            if (lens) lens.style.display = 'none';
            if (result) result.style.backgroundImage = '';
        }

        /* Book card click — event delegation */
        document.querySelector('body').addEventListener('click', function(e) {
            var card = e.target.closest('.book-card');
            if (!card) return;
            var bookData = card.getAttribute('data-book');
            if (!bookData) return;
            var parts = bookData.split('|');
            openMap(parts[0], parseInt(parts[1], 10));
        });

        /* FILTER */
        function filterNT(category, btn) {
            document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var anyVisible = false;
            var sections = document.querySelectorAll('.section-divider');
            sections.forEach(function(sec) {
                var nextEl = sec.nextElementSibling;
                while (nextEl && nextEl.classList.contains('hall-grid')) {
                    var cards = nextEl.querySelectorAll('.book-card');
                    cards.forEach(function(card) {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    });
                    var visibleInSection = Array.from(cards).filter(function(c) { return !c.classList.contains('hidden'); }).length;
                    if (visibleInSection === 0) {
                        nextEl.style.display = 'none';
                        sec.style.display = 'none';
                    } else {
                        nextEl.style.display = 'grid';
                        sec.style.display = 'flex';
                        anyVisible = true;
                    }
                    nextEl = nextEl.nextElementSibling;
                }
            });
            var empty = document.getElementById('filterEmpty');
            if (!empty) {
                empty = document.createElement('div');
                empty.id = 'filterEmpty';
                empty.style.cssText = 'text-align:center;padding:80px 20px;display:none;font-family:\'Cormorant Garamond\',serif;font-size: 0.66rem;color:var(--text-secondary);font-style:italic;';
                empty.textContent = 'No scrolls match this filter.';
                (document.querySelector('.hall-header') || document.querySelector('.vault-header')).after(empty);
            }
            empty.style.display = anyVisible ? 'none' : 'block';
        }

        /* ── EXCAVATION LAYER ── */
        var excavationData = {
            'MATTHEW': { provenance: "Vatican Library, Rome", discovered: "4th century AD", script: "Greek uncial on vellum (Codex Vaticanus)", condition: "Near-complete — remarkably pure Matthew text", tags: ["Codex Vaticanus", "4th century", "Canonical"] },
            'MARK': { provenance: "Oxyrhynchus, Egypt", discovered: "1929", script: "Greek papyrus (P45)", condition: "Fragments — oldest collection of Gospels on one codex", tags: ["Papyrus P45", "3rd century", "Gospel corpus"] },
            'LUKE': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P75)", condition: "Near-complete — textual purity rivals Vaticanus", tags: ["Papyrus P75", "Late 2nd century", "Luke-Acts"] },
            'JOHN': { provenance: "Oxyrhynchus, Egypt", discovered: "1920", script: "Greek papyrus (P52)", condition: "Tiny fragment — oldest NT manuscript, John 18:31-33", tags: ["Papyrus P52", "c. 125 AD", "Early spread"] },
            'ACTS': { provenance: "St. Catherine's Monastery, Sinai", discovered: "1844", script: "Greek uncial on vellum (Codex Sinaiticus)", condition: "Complete — key witness for early church missions", tags: ["Codex Sinaiticus", "4th century", "Iconic find"] },
            'ROMANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Near-complete — oldest witness to Pauline epistles", tags: ["Papyrus P46", "c. 200 AD", "Pauline corpus"] },
            '1 CORINTHIANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — love chapter and resurrection preserved", tags: ["Papyrus P46", "c. 200 AD", "Spiritual gifts"] },
            '2 CORINTHIANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — Paul's emotionally intense letter", tags: ["Papyrus P46", "c. 200 AD", "Comfort letter"] },
            'GALATIANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — justification by faith canonical", tags: ["Papyrus P46", "c. 200 AD", "Freedom epistle"] },
            'EPHESIANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — prison epistle already authoritative", tags: ["Papyrus P46", "c. 200 AD", "Cosmic vision"] },
            'PHILIPPIANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — Christ hymn preserved verbatim", tags: ["Papyrus P46", "c. 200 AD", "Joy epistle"] },
            'COLOSSIANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — mystery of Christ fullness preserved", tags: ["Papyrus P46", "c. 200 AD", "Preeminence"] },
            '1 THESSALONIANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — earliest surviving Pauline letter", tags: ["Papyrus P46", "c. 200 AD", "Eschatology"] },
            '2 THESSALONIANS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — man of lawlessness preserved", tags: ["Papyrus P46", "c. 200 AD", "Apostasy"] },
            '1 TIMOTHY': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — pastoral instruction canonical", tags: ["Papyrus P46", "c. 200 AD", "Church order"] },
            '2 TIMOTHY': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — Paul's final letter, 'all Scripture' quote", tags: ["Papyrus P46", "c. 200 AD", "Final letter"] },
            'TITUS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — elder qualifications canonical", tags: ["Papyrus P46", "c. 200 AD", "Crete"] },
            'PHILEMON': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — personal letter in Pauline corpus", tags: ["Papyrus P46", "c. 200 AD", "Onesimus"] },
            'HEBREWS': { provenance: "Oxyrhynchus, Egypt", discovered: "1931", script: "Greek papyrus (P46)", condition: "Fragments — Melchizedek priesthood canonical", tags: ["Papyrus P46", "c. 200 AD", "Anonymous"] },
            'JAMES': { provenance: "St. Catherine's Monastery, Sinai", discovered: "1844", script: "Greek uncial on vellum (Codex Sinaiticus)", condition: "Complete — debated by Luther, accepted into canon", tags: ["Codex Sinaiticus", "4th century", "Faith & works"] },
            '1 PETER': { provenance: "Oxyrhynchus, Egypt", discovered: "1935", script: "Greek papyrus (P72)", condition: "Near-complete — 'born again through imperishable seed'", tags: ["Papyrus P72", "3rd century", "Suffering"] },
            '2 PETER': { provenance: "Oxyrhynchus, Egypt", discovered: "1935", script: "Greek papyrus (P72)", condition: "Fragments — author knew Paul's letters as scripture", tags: ["Papyrus P72", "3rd century", "False teachers"] },
            '1 JOHN': { provenance: "Oxyrhynchus, Egypt", discovered: "1947", script: "Greek papyrus (P66)", condition: "Near-complete — 'God is love' in Johannine corpus", tags: ["Papyrus P66", "c. 200 AD", "Love"] },
            '2 JOHN': { provenance: "British Museum, London", discovered: "Early 5th century", script: "Greek uncial on vellum (Codex Alexandrinus)", condition: "Complete — 13 verses, shortest NT letter", tags: ["Codex Alexandrinus", "5th century", "Antichrists"] },
            '3 JOHN': { provenance: "British Museum, London", discovered: "Early 5th century", script: "Greek uncial on vellum (Codex Alexandrinus)", condition: "Complete — only NT book approving someone", tags: ["Codex Alexandrinus", "5th century", "Gaius"] },
            'JUDE': { provenance: "Oxyrhynchus, Egypt", discovered: "1935", script: "Greek papyrus (P72)", condition: "Fragments — Enoch quote canonical", tags: ["Papyrus P72", "3rd century", "Enoch quote"] },
            'REVELATION': { provenance: "St. Catherine's Monastery, Sinai", discovered: "1844", script: "Greek uncial on vellum (Codex Sinaiticus)", condition: "Complete — final canonical book accepted c. 400 AD", tags: ["Codex Sinaiticus", "4th century", "Final book"] }
        };

        function openExcavation(book) {
            var data = excavationData[book.toUpperCase()];
            var overlay = document.getElementById('excavationOverlay');
            var content = document.getElementById('excavationContent');
            if (!data || !overlay || !content) return;
            content.innerHTML =
                '<button class="close-case" data-action="close-excavation">[ X ] CLOSE</button>' +
                '<div class="case-label">EXCAVATION REPORT</div>' +
                '<h2 class="case-title">' + book + '</h2>' +
                '<div class="case-section">PROVENANCE & DISCOVERY</div>' +
                '<div class="provenance-grid">' +
                '<div class="prov-row"><div class="prov-key">PROVENANCE</div><div class="prov-val">' + data.provenance + '</div></div>' +
                '<div class="prov-row"><div class="prov-key">DISCOVERED</div><div class="prov-val">' + data.discovered + '</div></div>' +
                '<div class="prov-row"><div class="prov-key">SCRIPT</div><div class="prov-val">' + data.script + '</div></div>' +
                '<div class="prov-row condition-row"><div class="prov-key">CONDITION</div><div class="prov-val">' + data.condition + '</div></div>' +
                '<div class="prov-row condition-row"><div class="prov-key">TAGS</div><div class="prov-val"><div class="condition-tags">' + (data.tags||[]).map(function(t){return '<span class="condition-tag">'+t+'</span>';}).join('') + '</div></div></div>' +
                '</div>' +
                '<div style="margin-top:28px;display:flex;gap:10px;flex-wrap:wrap;">' +
                  '<button class="scr-read-btn" data-action="scr-read" data-book="' + book + '" style="font-size:0.65rem;padding:10px 22px;">📖 READ FULL BOOK</button>' +
                '</div>';
            overlay.classList.add('active');
        }
        function closeExcavation() {
            var overlay = document.getElementById('excavationOverlay');
            if (overlay) overlay.classList.remove('active');
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !document.getElementById('artifactPanel').classList.contains('active')) closeExcavation();
        });

        var exOverlay = document.getElementById('excavationOverlay');
        if (exOverlay) exOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeExcavation();
        });

        /* ── ARTIFACT EXAMINATION ── */
        var examineData = {
            'MATTHEW': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Codex_Vaticanus_Matthew_1%2C22-2%2C18.jpg', text: 'The book of the genealogy of Jesus Christ, the son of David, the son of Abraham. Abraham was the father of Isaac, and Isaac the father of Jacob.', leftMarg: 'The genealogy — Son of David, Son of Abraham', rightMarg: "The Messiah's lineage through Tamar, Ruth, and Bathsheba", lore1: 'Matthew begins with Abraham, tracing the Messianic line through David to Jesus — the new Abraham.', lore2: 'The genealogy contains four women with scandalous histories — each a divine exception to patriarchal convention.' },
            'MARK': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/P45_Marc_8.35-9.1.jpg', text: 'The beginning of the gospel of Jesus Christ, the Son of God. As it is written in Isaiah the prophet, Behold, I send my messenger before your face.', leftMarg: 'The swift opening — immediately', rightMarg: "John the Baptist's voice in the wilderness", lore1: "Mark's gospel opens without a genealogy, without a birth narrative — immediately into the mission.", lore2: 'The word "immediately" appears over 40 times in Mark, giving the narrative its characteristic urgency.' },
            'LUKE': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Papyrus_Bodmer_XIV-XV_%28P75%29.jpg', text: 'And the angel said to them, Fear not, for behold, I bring you good news of a great joy that will be for all the people.', leftMarg: 'The angels appear to the shepherds', rightMarg: 'Glory to God in the highest, and on earth peace', lore1: 'Luke alone preserves the angels\' message to the shepherds — the good news announced to the poor.', lore2: 'The census of Quirinius, mentioned here, was a historical event that forced Mary and Joseph to Bethlehem.' },
            'JOHN': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/P52_recto.jpg', text: 'In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God.', leftMarg: 'The Prologue — the Logos made flesh', rightMarg: 'The Light shines in the darkness', lore1: 'The most theologically dense opening in all literature — "In the beginning" echoes Genesis.', lore2: 'The Word "was God" — not "was a god" — the Greek text affirms full deity. This was the key verse in the Arian controversy.' },
            'ACTS': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Codex_Bezae_01.jpg', text: 'And they were all filled with the Holy Spirit and began to speak in other tongues as the Spirit gave them utterance. And there were dwelling in Jerusalem Jews.', leftMarg: 'The day of Pentecost — the Spirit descends', rightMarg: 'They were amazed and perplexed, saying to one another', lore1: 'The birth of the Church on Pentecost — tongues of fire, 120 disciples, three thousand converts in one day.', lore2: 'Peter quotes Joel\'s prophecy — \u201cIn the last days I will pour out my Spirit\u201d — the same text from the Old Testament.' },
            'ROMANS': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P46.jpg', text: 'Therefore you have no excuse, O man, whoever you are, when you judge another, for in judging you condemn yourself, because you practice the very same things.', leftMarg: 'No one is righteous — not even one', rightMarg: 'All are under the power of sin', lore1: 'Paul builds the case for universal sinfulness before the stunning declaration of Romans 3:21.', lore2: 'The phrase "all have sinned and fall short of the glory of God" (3:23) uses the perfect tense — a state that continues.' },
            '1 CORINTHIANS': { chapter: "Chapter XIII", image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/1K2-4p46.JPG', text: 'If I speak in the tongues of men and of angels, but have not love, I am a sounding gong or a clanging cymbal.', leftMarg: 'The Love Chapter — the greatest gift', rightMarg: 'Love never ends; prophecies cease, tongues stop', lore1: 'Paul wrote this chapter to correct the Corinthian worship that prioritized tongues over love.', lore2: 'The famous trilogy — faith, hope, and love — appears in verse 13, with love declared the greatest.' },
            '2 CORINTHIANS': { chapter: "Chapter IV", image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Codex_Ephraemi_f52.jpg', text: 'For we have this treasure in jars of clay, to show that the surpassing power belongs to God and not to us.', leftMarg: 'Treasure in jars of clay — the dying Jesus', rightMarg: 'We are afflcited in every way, but not crushed', lore1: 'The paradox of divine power in human weakness — the key to understanding Paul\'s suffering and ministry.', lore2: '"Jars of clay" — cheap, fragile pottery — containing an infinitely valuable treasure.' },
            'GALATIANS': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Codex_claromontanus_greek_%28The_S.S._Teacher%27s_Edition-The_Holy_Bible_-_Plate_XXVII%29.jpg', text: 'But the Scripture imprisoned everything under sin, so that the promise by faith in Jesus Christ might be given to those who believe.', leftMarg: 'The law as tutor leading to Christ', rightMarg: 'You are all sons of God through faith in Christ', lore1: 'Paul uses the example of Abraham — justified by faith 430 years before the law was given.', lore2: '"In Christ Jesus you are all sons of God, through faith" — the radical equality of Jew and Greek, slave and free.' },
            'EPHESIANS': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/P.Mich.inv._6238.jpg', text: 'But God, being rich in mercy, because of the great love with which he loved us, even when we were dead in our trespasses, made us alive together with Christ.', leftMarg: 'Dead in trespasses — made alive in Christ', rightMarg: 'Raised us up with him and seated us with him', lore1: 'The magnificent "but God" moment — the pivot of Ephesians, explaining salvation from God\'s perspective.', lore2: '"Seated us with him in the heavenly places" — past tense. Spiritually, we are already seated with Christ.' },
            'PHILIPPIANS': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Codex_Alexandrinus_1.jpg', text: 'Have this mind among yourselves, which is yours in Christ Jesus, who, though he was in the form of God, did not count equality with God a thing to be grasped.', leftMarg: 'The Kenosis Hymn — Christ\'s self-emptying', rightMarg: 'He humbled himself by becoming obedient to the point of death', lore1: 'The most profound Christological hymn in the New Testament — pre-existence, incarnation, obedience, exaltation.', lore2: '"Even death on a cross" — the most shameful death in the Roman world applied to the most exalted being.' },
            'COLOSSIANS': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P46.jpg', text: 'He is the image of the invisible God, the firstborn of all creation. For by him all things were created, in heaven and on earth, visible and invisible.', leftMarg: 'Christ preeminent — image of the invisible God', rightMarg: 'All things hold together in him', lore1: 'Paul argues that Christ is fully God — "the image of the invisible God" — the fullest revelation of deity.', lore2: '"Firstborn of all creation" does not mean first created, but supreme over all creation — the heir of everything.' },
            '1 THESSALONIANS': { chapter: "Chapter IV", image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Codex_Sinaiticus_1-2.jpg', text: 'Then we who are alive, who are left, will be caught up together with them in the clouds to meet the Lord in the air.', leftMarg: 'The Coming of the Lord — the rapture', rightMarg: 'The dead in Christ rise first; then we who are alive', lore1: 'The clearest passage on the "rapture" — caught up to meet the Lord in the air.', lore2: 'Paul says \u201cwe\u201d — he expected to be alive at Christ\'s return. His eschatology was imminent.' },
            '2 THESSALONIANS': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Codex_Vaticanus_B%2C_2Thess._3%2C11-18%2C_Hebr._1%2C1-2%2C2.jpg', text: 'Let no one deceive you in any way, for that day will not come unless the rebellion comes first and the man of lawlessness is revealed.', leftMarg: 'The man of lawlessness — the son of destruction', rightMarg: 'The one who now restrains it will do so until he is out of the way', lore1: 'The "man of lawlessness" — also called "the son of destruction" — will sit in the Temple claiming to be God.', lore2: 'The phrase "the son of destruction" (Hebrew: bar shelial) was a common idiom for a most wicked person.' },
            '1 TIMOTHY': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Codex_Ephraemi_1_Tim_3%2C15-16.JPG', text: 'If anyone aspires to the office of bishop, he desires a noble task. Now a bishop must be above reproach, the husband of one wife.', leftMarg: 'Qualifications for elders and deacons', rightMarg: 'Deacons must be the husband of one wife', lore1: 'The qualifications for church leadership established here became the blueprint for all subsequent church orders.', lore2: '"Noble task" — the Greek word "kalkon" carries the sense of noble, excellent, commanding respect.' },
            '2 TIMOTHY': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Codex_Sinaiticus_-_Early_5th_century.JPG', text: 'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.', leftMarg: '"All Scripture" — the most quoted verse on biblical authority', rightMarg: 'The sacred writings are able to make you wise for salvation', lore1: 'The most important verse on biblical inspiration — " breathed out by God" (theopneustos).', lore2: "Paul writes to Timothy, a young pastor, emphasizing the Old Testament as scripture for the early church." },
            'TITUS': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Codex_Sinaiticus_1-2.jpg', text: 'For the grace of God has appeared, bringing salvation for all people, training us to renounce ungodliness and worldly passions.', leftMarg: 'The appearing of grace — the kindness of God', rightMarg: 'Live self-controlled, upright, and godly in this present age', lore1: "Titus, left to organize Crete's churches, was given this practical letter on doctrine and life.", lore2: '"Training us" — Greek "paideuousa" — the same root as "pedagogy," suggesting education in godliness.' },
            'PHILEMON': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Codex_Vaticanus.jpg', text: 'For I have derived much joy and comfort from your love, because the hearts of the saints have been refreshed through you.', leftMarg: 'The personal appeal — onboarding Onesimus', rightMarg: "Perhaps this is why I was eager to send him", lore1: "The shortest of Paul's letters — just one page — and the most radical in its challenge to social hierarchy.", lore2: 'Onesimus (meaning "useful") was a slave who escaped, then became useful to Paul and was sent back as a free brother.' },
            'HEBREWS': { chapter: "Chapter VII", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P46.jpg', text: 'For this Melchizedek, king of Salem, priest of the Most High God, met Abraham returning from the slaughter of the kings and blessed him.', leftMarg: 'Melchizedek — priest king of Salem', rightMarg: 'Without father, without mother, without genealogy', lore1: 'The author reveals a mystery: Melchizedek, king of Salem and priest of God Most High, prefigured Christ.', lore2: 'Christ as priest "after the order of Melchizedek" (Psalm 110:4) — a superior priesthood to the Levitical order.' },
            'JAMES': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/British_Library_03.jpg', text: 'What good is it, my brothers, if someone says he has faith but does not have works? Can faith save him? Faith by itself, if it does not have works, is dead.', leftMarg: 'Faith without works is dead', rightMarg: 'You see then that faith was accounted to Abraham as righteousness', lore1: 'Luther called James "an epistle of straw" — but its emphasis on works flowing from faith was echoed by the entire Reformation.', lore2: "The example of Abraham offering Isaac (Genesis 22) shows works as the evidence, not the cause, of Abraham's faith." },
            '1 PETER': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Papyrus_Bodmer_VIII.jpg', text: 'Blessed be the God and Father of our Lord Jesus Christ, who according to his great mercy has caused us to be born again to a living hope.', leftMarg: 'Born again — through imperishable seed', rightMarg: 'An inheritance that is imperishable, undefiled, and unfading', lore1: '"Imperishable seed" — Peter uses the agricultural metaphor to show that the word of God is living and permanent.', lore2: '"A living hope" — not a dead ritual, but a living relationship with a living God through a living hope.' },
            '2 PETER': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Bodmer_VII-IX.jpg', text: 'His divine power has granted to us all things that pertain to life and godliness, through the knowledge of him who called us.', leftMarg: 'All things for life and godliness — through knowledge', rightMarg: 'By which he has granted to us his precious and very great promises', lore1: 'Peter shows that godliness is not achieved by human effort but granted through divine power and promises.', lore2: 'The phrase "knowledge of him" (epignosis) is the fuller, more complete knowing — not mere head knowledge.' },
            '1 JOHN': { chapter: "Chapter IV", image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Papyrus66.jpg', text: 'Beloved, let us love one another, for love is from God, and whoever loves has been born of God and knows God.', leftMarg: 'God is love — the defining attribute', rightMarg: 'In this is love, not that we have loved God but that he loved us', lore1: 'John defines God by love — not by power, knowledge, or justice, but by the nature of self-giving love.', lore2: '"Whoever loves has been born of God" — love is the proof of spiritual birth, not the other way around.' },
            '2 JOHN': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Codex_Vaticanus.jpg', text: 'I rejoiced greatly to find some of your children walking in truth, as we received commandment from the Father.', leftMarg: 'Walking in truth — the test of love', rightMarg: 'And now I ask you, dear lady — not as though I were writing a new commandment', lore1: 'The shortest New Testament letter — just 13 verses — on the relationship between love and truth.', lore2: '"Test the spirits" — the first explicit instruction in the New Testament to evaluate prophetic claims.' },
            '3 JOHN': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Codex_Alexandrinus_1.jpg', text: 'I have no greater joy than to hear that my children are walking in truth. Beloved, it is a faithful thing you do.', leftMarg: 'Gaius — approved by his hospitality', rightMarg: 'Diotrephes — who likes to put himself first', lore1: 'The only New Testament book that explicitly approves of someone — Gaius, for walking in the truth.', lore2: 'Diotrephes is the only person in Scripture described as loving to be first — a warning against church ambition.' },
            'JUDE': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Bodmer_VII-IX.jpg', text: 'Beloved, although I was very eager to write to you about our common salvation, I found it necessary to write appealing you to contend for the faith.', leftMarg: 'The faith once for all delivered to the saints', rightMarg: 'Certain people have crept in unnoticed', lore1: 'The briefest epistle in the "general" category — a call to defend the apostolic deposit against false teachers.', lore2: 'Jude quotes from the Book of Enoch (1 En 1:9) — proving this Jewish text was considered authoritative in the early church.' },
            'REVELATION': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/P47.jpg', text: 'The revelation of Jesus Christ, which God gave him to show his servants what must soon take place. He made it known by sending his angel.', leftMarg: 'The apocalypse — unveiling of Jesus Christ', rightMarg: 'Blessedness for those who read, hear, and keep', lore1: 'The final book of the Bible — an apocalypse meaning "unveiling" — not a prediction of the future, but a revelation of the present.', lore2: '"What must soon take place" — the Greek "en tachei" can mean either "quickly" or "suddenly" — both have guided interpretation.' }
        };

        var examineZoom = 1;
        var examineBook = '';

        function openExamine(book) {
            var data = examineData[book.toUpperCase()];
            if (!data) return;
            examineBook = book;
            examineZoom = 1;
            var panel = document.getElementById('artifactPanel');
            document.getElementById('artifactTitle').innerText = book;
            document.getElementById('artifactLabel').innerText = 'ARTIFACT EXAMINATION';
            renderExaminePage();
            panel.classList.add('active');
        }

        function renderExaminePage() {
            var data = examineData[examineBook.toUpperCase()];
            if (!data) return;
            var loreDrawer = document.getElementById('loreDrawer');
            loreDrawer.classList.remove('active');
            document.getElementById('artifactManuscript').innerHTML =
                '<div class="artifact-page" style="transform: scale(' + examineZoom + ');">' +
                '<img class="fragment-img" src="' + data.image + '" alt="' + examineBook + ' fragment" onerror="this.style.display=\'none\'" />' +
                '<div class="artifact-page-inner">' +
                '<div class="artifact-book-title">' + examineBook.toUpperCase() + '</div>' +
                '<div class="artifact-chapter-heading">' + data.chapter + '</div>' +
                '<div class="artifact-text-block">' + data.text + '</div>' +
                (data.leftMarg ? '<div class="artifact-marginalia left"><span class="marg-label">MARGINALIA</span>' + data.leftMarg + '</div>' : '') +
                (data.rightMarg ? '<div class="artifact-marginalia right"><span class="marg-label">ANNOTATION</span>' + data.rightMarg + '</div>' : '') +
                '<div class="artifact-fabric-margin left">codex // manuscript // ' + examineBook + '</div>' +
                '<div class="artifact-fabric-margin right">folio 1r</div>' +
                '</div></div>';
            document.getElementById('zoomDisplay').innerText = Math.round(examineZoom * 100) + '%';
            if (loreDrawer) {
                loreDrawer.innerHTML = '<div class="lore-drawer-inner"><div><h3>SCRIBAL LORE</h3><div class="lore-item"><strong>Lore I:</strong> ' + data.lore1 + '</div></div><div><h3>&nbsp;</h3><div class="lore-item"><strong>Lore II:</strong> ' + data.lore2 + '</div></div><div class="scribe-citation" style="margin-top:16px;padding-top:8px;border-top-color:rgba(255,255,255,0.45);">Digital manuscript imagery courtesy of the <a href="https://www.deadseascrolls.org.il/" target="_blank">Leon Levy DSS Digital Library</a>, <a href="https://www.bl.uk/manuscripts" target="_blank">British Library</a>, &amp; <a href="https://csntm.org/" target="_blank">CSNTM</a>.<br><span style="font-style:italic;margin-top:4px;display:block;opacity:0.6;">"Preserving the Word across the corridors of time."</span></div></div>';
            }
        }

        function closeExamine() {
            var panel = document.getElementById('artifactPanel');
            if (panel) panel.classList.remove('active');
        }

        document.addEventListener('keydown', function(e) {
            var ap = document.getElementById('artifactPanel');
            if (!ap || !ap.classList.contains('active')) return;
            if (e.key === 'Escape') closeExamine();
            if (e.key === '+' || e.key === '=') {
                examineZoom = Math.min(3, examineZoom + 0.25);
                var am = document.getElementById('artifactManuscript');
                if (am) am.querySelector('.artifact-page').style.transform = 'scale(' + examineZoom + ')';
                var zd = document.getElementById('zoomDisplay');
                if (zd) zd.innerText = Math.round(examineZoom * 100) + '%';
            }
            if (e.key === '-') {
                examineZoom = Math.max(0.5, examineZoom - 0.25);
                var am = document.getElementById('artifactManuscript');
                if (am) am.querySelector('.artifact-page').style.transform = 'scale(' + examineZoom + ')';
                var zd = document.getElementById('zoomDisplay');
                if (zd) zd.innerText = Math.round(examineZoom * 100) + '%';
            }
            if (e.key === 'l' || e.key === 'L') {
                var ld = document.getElementById('loreDrawer');
                if (ld) ld.classList.toggle('active');
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            var ap = document.getElementById('artifactPanel');
            if (ap) ap.addEventListener('click', function(e) {
                if (e.target.closest('.artifact-control-bar') || e.target.closest('.artifact-lore-drawer') || e.target.closest('.artifact-manuscript')) return;
                closeExamine();
            });

            var cl = document.getElementById('artifactCursorLens');
            if (cl) {
                cl.addEventListener('mousemove', function(e) {
                    this.style.display = 'block';
                    this.style.left = e.clientX + 'px';
                    this.style.top = e.clientY + 'px';
                });
                cl.addEventListener('mouseleave', function() {
                    this.style.display = 'none';
                });
            }
        });

        var timelineBooks = [
            { name: 'MATTHEW', date: '50 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'MARK', date: '55 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'LUKE', date: '60 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'JOHN', date: '90 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'ACTS', date: '62 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'ROMANS', date: '57 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '1 CORINTHIANS', date: '55 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '2 CORINTHIANS', date: '56 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'GALATIANS', date: '49 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'EPHESIANS', date: '60 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'PHILIPPIANS', date: '61 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'COLOSSIANS', date: '62 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '1 THESSALONIANS', date: '51 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '2 THESSALONIANS', date: '52 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '1 TIMOTHY', date: '64 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '2 TIMOTHY', date: '67 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'TITUS', date: '66 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'PHILEMON', date: '63 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'HEBREWS', date: '68 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'JAMES', date: '62 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '1 PETER', date: '64 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '2 PETER', date: '67 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '1 JOHN', date: '90 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '2 JOHN', date: '90 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: '3 JOHN', date: '90 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'JUDE', date: '67 AD', era: 'nt', link: 'nt-gallery.html' },
            { name: 'REVELATION', date: '95 AD', era: 'nt', link: 'nt-gallery.html' }
        ];

        function parseDate(d) {
            var BC = d.includes('BC');
            var num = parseInt(d.replace(/[^0-9]/g, ''));
            return BC ? -num : num;
        }

        function isApocalypse(name) {
            var n = name.toUpperCase();
            if (n === 'REVELATION' || n === 'DANIEL') return true;
            return false;
        }

        function buildTimeline() {
            timelineTrack = document.getElementById('timelineTrack');
            timelineTooltip = document.getElementById('timelineTooltip');
            rail = document.getElementById('timelineRail');
            if (!timelineTrack || !timelineTooltip || !rail) return;
            rail.style.display = 'flex';
            var dates = timelineBooks.map(function(b) { return parseDate(b.date); });
            var minDate = Math.min.apply(null, dates) - 5;
            var maxDate = Math.max.apply(null, dates) + 5;
            var range = maxDate - minDate;

            timelineBooks.forEach(function(book, idx) {
                var rawPct = ((parseDate(book.date) - minDate) / range) * 100;
                var marker = document.createElement('div');
                marker.className = 'timeline-era-marker nt';
                marker.style.left = rawPct + '%';
                marker.dataset.idx = idx;
                if (isApocalypse(book.name)) marker.classList.add('apocalypse');

                var tick = document.createElement('div');
                tick.className = 'timeline-tick';
                var dot = document.createElement('div');
                dot.className = 'timeline-book-dot';
                var label = document.createElement('div');
                label.className = 'timeline-book-label';
                label.innerText = book.name;

                marker.appendChild(tick);
                marker.appendChild(dot);
                marker.appendChild(label);

                marker.addEventListener('click', function() {
                    window.location.href = book.link + '?book=' + book.name.toLowerCase();
                });
                marker.addEventListener('mouseenter', function() {
                    var html = '<div class="tooltip-main">' + book.name + ' — ' + book.date + '</div>';
                    var aData = window.archaeologyData && window.archaeologyData[book.name];
                    if (aData && aData.artifact) {
                        html += '<div class="tooltip-artifact">' + aData.artifact + '</div>';
                    }
                    timelineTooltip.innerHTML = html;
                    timelineTooltip.classList.add('active');
                });
                marker.addEventListener('mousemove', function(e) {
                    var tipW = timelineTooltip.offsetWidth || 120;
                    var gap = 12;
                    var leftPos = e.clientX - tipW - gap;
                    if (leftPos < 10) {
                        timelineTooltip.style.left = (e.clientX + gap) + 'px';
                        timelineTooltip.style.transform = 'translateX(0%)';
                    } else {
                        timelineTooltip.style.left = leftPos + 'px';
                        timelineTooltip.style.transform = 'translateX(0%)';
                    }
                });
                marker.addEventListener('mouseleave', function() {
                    timelineTooltip.style.left = '';
                    timelineTooltip.style.transform = '';
                    timelineTooltip.classList.remove('active');
                });

                timelineTrack.appendChild(marker);
            });

            /* Spread markers at the same position slightly apart */
            var posGroups = {};
            var markers = timelineTrack.querySelectorAll('.timeline-era-marker');
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

            /* Stagger overlapping label clusters */
            markers = timelineTrack.querySelectorAll('.timeline-era-marker');
            var clusterDepth = 0;
            for (var i = 1; i < markers.length; i++) {
                var prev = markers[i - 1];
                var curr = markers[i];
                var prevPct = parseFloat(prev.style.left);
                var currPct = parseFloat(curr.style.left);
                if (currPct - prevPct < 3) {
                    clusterDepth++;
                    var label = curr.querySelector('.timeline-book-label');
                    if (label) label.style.top = (20 + clusterDepth * 22) + 'px';
                } else {
                    clusterDepth = 0;
                }
            }
        }

        var timelineTrack, timelineTooltip, rail;
        setTimeout(buildTimeline, 100);

        (function() {
            var flame = document.getElementById('streakFlame');
            var counter = document.getElementById('streakCounter');
            var daysEl = document.getElementById('streakDays');
            var statusEl = document.getElementById('streakStatus');
            var data = (function() {
                var u = window.__getUnifiedUser ? window.__getUnifiedUser() : null;
                if (u) return { streak: u.streak.current, lastVisit: u.streak.lastVisit, totalCharacters: u.progress.totalCharacters, dailyChars: u.progress.dailyChars, dailyDate: u.progress.dailyDate };
                return {};
            })();
            var today = new Date().toDateString();
            var lastDate = data.lastVisit || null;
            var streak = data.streak || 0;
            if (lastDate !== today) {
                var yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
                streak = lastDate === yesterday.toDateString() ? streak + 1 : 1;
            }
            data.streak = streak; data.lastVisit = today;
            function calcRank(c) { return c > 5000 ? "ILLUMINATOR" : c > 1000 ? "MASTER SCRIBE" : c > 200 ? "SCRIBE" : "INITIATE"; }
            if (data.totalCharacters) data.rank = calcRank(data.totalCharacters);
            if (window.__setUnifiedUser && window.__getUnifiedUser) {
                var v2 = window.__getUnifiedUser();
                if (!v2) v2 = { profile: {}, progress: {}, streak: {}, rank: {} };
                v2.streak.current = streak;
                v2.streak.lastVisit = today;
                v2.rank.title = data.rank;
                v2.progress.totalCharacters = data.totalCharacters;
                v2.progress.dailyChars = data.dailyChars;
                v2.progress.dailyDate = data.dailyDate;
                window.__setUnifiedUser(v2);
            }
            if (streak > 0 && flame) {
                flame.classList.add('lit');
                if (streak >= 3) flame.classList.add('warm');
                if (streak >= 7) flame.classList.add('blazing');
                if (streak >= 14) flame.classList.add('eternal');
                counter.textContent = streak;
                daysEl.textContent = streak;
                statusEl.textContent = streak < 3 ? 'Flame kindled' : streak < 7 ? 'Devotion growing' : streak < 14 ? 'Sacred discipline' : 'Eternal flame';
            }
            (function() {
                var params = new URLSearchParams(window.location.search);
                var bookParam = params.get('book');
                var chapterParam = params.get('chapter');
                if (bookParam) {
                    setTimeout(function() {
                        var idx = timelineBooks.findIndex(function(b) { return b.name.toLowerCase() === bookParam; });
                        if (idx !== -1) {
                            var dots = document.querySelectorAll('.timeline-book-dot');
                            if (dots[idx]) {
                                dots[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                dots[idx].classList.add('active');
                            }
                        }
                    }, 300);
                }
                if (bookParam && chapterParam) {
                    setTimeout(function() {
                        if (!window.ScrReader) return;
                        var name = bookParam.charAt(0).toUpperCase() + bookParam.slice(1);
                        window.ScrReader.open(name);
                        var ch = parseInt(chapterParam, 10);
                        if (ch > 1) {
                            setTimeout(function() { if (window.ScrReader) window.ScrReader.goToChapter(ch); }, 500);
                        }
                    }, 800);
                }
            })();
        // Sidebar accessibility
        document.querySelectorAll('.sidebar-nav a').forEach(function(a) {
            if (!a.hasAttribute('tabindex')) a.setAttribute('tabindex', '0');
            var title = a.getAttribute('title');
            if (title && !a.hasAttribute('aria-label')) a.setAttribute('aria-label', title);
        });
        // Image fallback placeholder
        document.querySelectorAll('.fragment-img').forEach(function(img) {
            img.addEventListener('error', function() {
                this.alt = 'Fragment image unavailable';
            });
        });
        })();