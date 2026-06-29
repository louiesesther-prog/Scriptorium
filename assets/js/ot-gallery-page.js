/* ── SPOTLIGHT HOVER ── */
        function handleHover(e, el) {
            var rect = el.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / el.clientWidth) * 100;
            var y = ((e.clientY - rect.top) / el.clientHeight) * 100;
            el.style.setProperty('--x', x + '%');
            el.style.setProperty('--y', y + '%');
        }
        document.querySelectorAll('.book-artifact').forEach(function(el) {
            el.addEventListener('mousemove', function(e) { handleHover(e, el); });
        });

        /* ── UNIFIED MAP OVERLAY ── */
        var currentAudio = null;
        var currentTTS = null;
        var isPlaying = false;
        var currentBook = '';
        var currentChapters = 0;

        var archaeologyData = {
            'GENESIS': { artifact: "Samaritan Pentateuch Scroll", material: "Parchment ( sheepskin )", site: "Nablus, Palestine (c. 4th century AD)", note: "One of the oldest manuscripts of the Torah, preserved by the Samaritan community on Mount Gerizim. It diverges from the Masoretic text in approximately 6,000 places, providing crucial evidence for textual history." },
            'EXODUS': { artifact: "Nash Papyrus", material: "Papyrus", site: "Egypt (1902)", note: "The oldest known biblical manuscript before the Dead Sea Scrolls. Contains the Ten Commandments and Deuteronomy in Greek, dating to c. 150 BC — proving early transmission of Exodus text." },
            'LEVITICUS': { artifact: "Leviticus Scroll (4Q26b)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "A Dead Sea Scroll fragment preserving portions of Leviticus 23 and 24, nearly identical to the Masoretic text 1,000 years earlier — demonstrating the fidelity of scribal transmission." },
            'NUMBERS': { artifact: "Numbers Scroll (4Q27)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "One of the most extensive biblical scrolls from Qumran, covering large sections of Numbers. Its minor textual variations illuminate the development of the biblical text." },
            'DEUTERONOMY': { artifact: "Deuteronomy Scroll (4Q22)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Part of the Great Psalms Scroll collection. Contains the Song of Moses (Deut 32) with ancient poetic structure. A key witness to the Deuteronomistic tradition." },
            'JOSHUA': { artifact: "Joshua Scroll (5Q1)", material: "Leather/Vellum", site: "Qumran Cave 5 (1952)", note: "A fragmentary scroll preserving portions of the conquest narrative. Its text is remarkably close to the Masoretic tradition, despite being written in Hebrew approximately 2,200 years ago." },
            'JUDGES': { artifact: "Judges Scroll (4Q49)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Fragment containing several verses from Judges 6 and 7. Its textual differences from the Masoretic text show that the Judges narrative circulated in multiple versions before canonization." },
            'RUTH': { artifact: "Ruth Scroll (4Q16)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Ruth is unique among biblical scrolls for its complete preservation in the Dead Sea Scrolls. The scroll demonstrates that Ruth's genealogical narrative was considered sacred scripture by the 2nd century BC." },
            '1 SAMUEL': { artifact: "1 Samuel Scroll (4Q51)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "One of the most significant biblical scrolls ever found, containing nearly all of 1 Samuel. It corrected several scribal errors in the Masoretic text and proved the reliability of Hebrew transmission." },
            '2 SAMUEL': { artifact: "2 Samuel Scroll (4Q52)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "A fragmentary scroll preserving portions of 2 Samuel 1-3. Notably contains the 'Three Songs of the Bow,' an episode absent from the Masoretic text but present in the ancient Greek Septuagint." },
            '1 KINGS': { artifact: "1 Kings Scroll (4Q54)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "This scroll confirms the integrity of the Deuteronomistic History. The Elijah narratives in Kings were already established as scripture by the 2nd century BC." },
            '2 KINGS': { artifact: "2 Kings Scroll (4Q55)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Contains portions of 2 Kings 19-20, including the account of Hezekiah's tunnel. This archaeological artifact corroborates the biblical description of an aqueduct built during his reign." },
            '1 CHRONICLES': { artifact: "1 Chronicles Scroll (4Q54)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "A rare witness to the Chronicler's history. The genealogical lists in Chronicles were preserved with remarkable precision, as confirmed by comparison with the Dead Sea Scroll fragments." },
            '2 CHRONICLES': { artifact: "2 Chronicles Scroll fragments", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Only tiny fragments of 2 Chronicles were found at Qumran, reflecting the limited popularity of Chronicles among Palestinian Jewish sectarians compared to the Torah and Prophets." },
            'EZRA': { artifact: "Ezra-Nehemiah Scroll (4Q76)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Contains the oldest known text of Ezra-Nehemiah, written in the paleo-Hebrew script. It confirms the rebuilding of the Temple and the restoration of Torah under Ezra as a historically anchored event." },
            'NEHEMIAH': { artifact: "Nehemiah Scroll (4Q76)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Part of the same Ezra-Nehemiah scroll, this fragment preserves portions of Nehemiah 3, documenting the rebuilding of Jerusalem's walls — an event confirmed by extra-biblical sources." },
            'ESTHER': { artifact: "Dead Sea Scroll Esther fragments (none found)", material: "N/A", site: "N/A", note: "Curiously, no Esther scrolls were found at Qumran, despite it being included in the Hebrew canon. This may indicate limited circulation or a later canonical status among Palestinian communities." },
            'JOB': { artifact: "Job Targum (11Q10)", material: "Leather/Vellum", site: "Qumran Cave 11 (1956)", note: "The most extensive Job Targum found at Qumran. Written in Aramaic, it provides an ancient interpretive layer to Job's dialogue with God, showing how this ancient text was understood." },
            'PSALMS': { artifact: "Great Psalms Scroll (11Q5)", material: "Leather/Vellum", site: "Qumran Cave 11 (1956)", note: "The most complete biblical scroll from Qumran, containing 41 psalms — including several 'extra-canonical' psalms not in the Masoretic tradition. It proves the Psalter was still open and developing in the 2nd century BC." },
            'PROVERBS': { artifact: "Proverbs Scroll (4Q102)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Contains portions of Proverbs 6 and 7. The wisdom of Solomon was already considered inspired scripture, as this scroll demonstrates early collection and scribal preservation of the proverbs." },
            'ECCLESIASTES': { artifact: "Ecclesiastes Scroll (4Q109)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "The famous 'Teacher of Righteousness' passage (Eccl 7:18) appears in this fragment. The philosophical skepticism in Ecclesiastes was considered canonical wisdom despite its questioning tone." },
            'SONG OF SOLOMON': { artifact: "Song of Solomon Scroll fragments", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "The Song of Songs, with its erotic poetry, was considered sacred text by the 2nd century BC. Fragments from Qumran confirm its canonicity among Palestinian Jews before rabbinic codification." },
            'ISAIAH': { artifact: "The Great Isaiah Scroll (1QIsa)", material: "Leather/Vellum", site: "Qumran Cave 1 (1947)", note: "A 24-foot scroll preserved for 2,000 years in a clay jar. It is virtually identical to the modern text, proving the scribe's accuracy across millennia. Contains all 66 chapters of Isaiah in beautiful calligraphic Hebrew." },
            'JEREMIAH': { artifact: "Jeremiah Scroll (4Q70)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "The Qumran Jeremiah scroll follows the longer Septuagint version, suggesting the Hebrew text behind the Greek translation was known in Palestine. Jeremiah's prophecy of the new covenant was already sacred text." },
            'LAMENTATIONS': { artifact: "Lamentations Scroll (4Q111)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "A small fragment preserving the acrostic structure of Lamentations. The mourning over Jerusalem's destruction was already inscribed on scrolls in the 2nd century BC." },
            'EZEKIEL': { artifact: "Ezekiel Scroll (2Q12)", material: "Leather/Vellum", site: "Qumran Cave 2 (1952)", note: "Ezekiel's elaborate temple vision and the 'dry bones' prophecy were preserved on this fragment. Notably, the Qumran text has significant rearrangements of certain chapters compared to the Masoretic text." },
            'DANIEL': { artifact: "Daniel Scroll (4Q112)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Contains both Hebrew and Aramaic portions of Daniel. The apocalypse of Daniel — including the visions of the 'Son of Man' — was recognized as scripture by the 2nd century BC, confirmed by this scroll." },
            'HOSEA': { artifact: "Hosea Scroll (4Q40)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "The earliest witness to Hosea, written by the prophet who confronted the northern kingdom. The scroll confirms that Israel's unfaithfulness was remembered as divine warning." },
            'JOEL': { artifact: "Joel Scroll (4Q78)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Contains the famous 'outpouring of the Spirit' prophecy (Joel 2:28). This scroll shows that early Jewish communities read Joel alongside other prophetic literature as authoritative scripture." },
            'AMOS': { artifact: "Amos Scroll (4Q14)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Amos's indictment of Israel's social injustice was preserved on this fragment. The scroll confirms the prophetic tradition held that caring for the poor was central to covenant faithfulness." },
            'OBADIAH': { artifact: "Obadiah Scroll (4Q83)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "A tiny fragment containing Obadiah's oracle against Edom. Despite its brevity, this minor prophet's judgment on proud Edom was canonized alongside the major prophets." },
            'JONAH': { artifact: "Jonah Scroll (4Q82)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "The only prophetic scroll written in a narrative rather than oracle style. The fish episode and Nineveh's repentance were considered prophetic truth by the 2nd century BC." },
            'MICAH': { artifact: "Micah Scroll (4Q14)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Contains the ' Bethlehem' prophecy (Micah 5:2). This scroll proves that the expectation of a Messiah from Bethlehem was rooted in scripture centuries before Jesus' birth." },
            'NAHUM': { artifact: "Nahum Scroll (4Q81)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Nahum's prophecy of Nineveh's fall was preserved alongside other minor prophets. The certainty of divine judgment against Assyria was part of the prophetic canon." },
            'HABAKKUK': { artifact: "Habakkuk Scroll (1QpHab)", material: "Leather/Vellum", site: "Qumran Cave 1 (1947)", note: "The most famous Qumran scroll after Isaiah. The Habakkuk Commentary (1QpHab) shows how the Qumran community interpreted Habakkuk's prophecy about the 'Righteous One' — likely a figure in their own history." },
            'ZEPHANIAH': { artifact: "Zephaniah Scroll (4Q83)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Contains Zephaniah's oracle of the 'Day of the Lord.' The apocalyptic warning of judgment and eventual restoration was understood as prophetic scripture in the Second Temple period." },
            'HAGGAI': { artifact: "Haggai Scroll (4Q83)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "The prophet Haggai's call to rebuild the Temple was preserved. This scroll confirms that the post-exilic prophets were included in the scriptural canon early on." },
            'ZECHARIAH': { artifact: "Zechariah Scroll (4Q82)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "Contains Zechariah's visions of the 'Branch' and the 'Cornerstone.' These Messianic images were already considered scripture — Jesus later claimed them as referring to himself." },
            'MALACHI': { artifact: "Malachi Scroll (4Q83)", material: "Leather/Vellum", site: "Qumran Cave 4 (1947)", note: "The final prophetic scroll of the Hebrew Bible. Malachi's promise of the messenger who 'will prepare the way' (Malachi 3:1) was quoted by all four Gospel writers as referring to John the Baptist." }
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
                document.getElementById('noteArtifact').innerText = 'Scroll Fragment (pending identification)';
                document.getElementById('noteMaterial').innerText = 'Leather/Vellum';
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
                '<div style="font-size: 0.66rem;color:rgba(212,175,55,0.85);letter-spacing:4px;margin-bottom:16px;">PREPARING MANUSCRIPT</div>' +
                '<div style="font-family:\'Cinzel\',serif;font-size: 2.16rem;color:var(--museum-gold);letter-spacing:3px;margin-bottom:6px;">' + book + ' ' + ch + '</div>' +
                '<div style="font-size: var(--text-micro);color:var(--text-secondary);letter-spacing:2px;margin-bottom:40px;">Chapter ' + ch + ' of ' + currentChapters + '</div>' +
                '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size: 0.66rem;color:rgba(255,255,255,0.53);line-height:1.8;max-width:500px;margin:0 auto;">The sacred manuscript awaits your arrival. Transcribe the verses to unlock the scroll.</div>' +
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
            var card = e.target.closest('.book-artifact');
            if (!card) return;
            var bookData = card.getAttribute('data-book');
            if (!bookData) return;
            var parts = bookData.split('|');
            openMap(parts[0], parseInt(parts[1], 10));
        });

        /* FILTER */
        function filterOT(category, btn) {
            document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var anyVisible = false;
            var sections = document.querySelectorAll('.section-divider');
            sections.forEach(function(sec) {
                var nextEl = sec.nextElementSibling;
                while (nextEl && nextEl.classList.contains('vault-grid')) {
                    var cards = nextEl.querySelectorAll('.book-artifact');
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
                document.querySelector('.vault-header').after(empty);
            }
            empty.style.display = anyVisible ? 'none' : 'block';
        }

        /* ── EXCAVATION LAYER ── */
        var excavationData = {
            'GENESIS': { provenance: "Qumran Caves, Judean Desert", discovered: "1947", script: "Paleo-Hebrew / early Hebrew", condition: "Fragmentary — multiple copies recovered", tags: ["Dead Sea Scrolls", "Cave 4", "Pre-Samaritan"] },
            'EXODUS': { provenance: "Fayum region, Egypt", discovered: "1902", script: "Greek uncial (Nash Papyrus)", condition: "Intact — earliest biblical fragment known", tags: ["Nash Papyrus", "Pre-Qumran", "Greek"] },
            'LEVITICUS': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Well-preserved — matches Masoretic text", tags: ["Dead Sea Scrolls", "Cave 4", "High fidelity"] },
            'NUMBERS': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Extensive coverage — key textual witness", tags: ["Dead Sea Scrolls", "Cave 4", "Canonical"] },
            'DEUTERONOMY': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Contains the Song of Moses (Deut 32)", tags: ["Dead Sea Scrolls", "Song of Moses", "Deuteronomistic"] },
            'JOSHUA': { provenance: "Qumran Cave 5, Judean Desert", discovered: "1952", script: "Hebrew uncial on leather", condition: "Fragmentary — conquest narrative preserved", tags: ["Dead Sea Scrolls", "Cave 5", "Early Hebrew"] },
            'JUDGES': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Fragments from Judges 6-7", tags: ["Dead Sea Scrolls", "Cave 4", "Textual variants"] },
            'RUTH': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Near-complete — uniquely preserved at Qumran", tags: ["Dead Sea Scrolls", "Cave 4", "Complete scroll"] },
            '1 SAMUEL': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Nearly complete — most significant DSS find", tags: ["Dead Sea Scrolls", "Cave 4", "Corrected MT"] },
            '2 SAMUEL': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Contains 'Three Songs of the Bow' (deuterocanonical)", tags: ["Dead Sea Scrolls", "Cave 4", "LXX variant"] },
            '1 KINGS': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Elijah narratives canonical by 2nd century BC", tags: ["Dead Sea Scrolls", "Cave 4", "Deuteronomistic"] },
            '2 KINGS': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Includes Hezekiah's tunnel account", tags: ["Dead Sea Scrolls", "Cave 4", "Archaeological"] },
            '1 CHRONICLES': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Rare witness to Chronicler's history", tags: ["Dead Sea Scrolls", "Cave 4", "Genealogical"] },
            '2 CHRONICLES': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Tiny fragments — limited circulation", tags: ["Dead Sea Scrolls", "Cave 4", "Priestly"] },
            'EZRA': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Paleo-Hebrew script on leather", condition: "Oldest known Ezra-Nehemiah text", tags: ["Dead Sea Scrolls", "Paleo-Hebrew", "Post-exilic"] },
            'NEHEMIAH': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Paleo-Hebrew script on leather", condition: "Documents the wall-rebuilding account", tags: ["Dead Sea Scrolls", "Archaeological", "Restoration"] },
            'ESTHER': { provenance: "No Qumran manuscripts found", discovered: "N/A", script: "N/A", condition: "Absent from Qumran — possibly later canonization", tags: ["No manuscript", "Canonical delay", "Masoretic"] },
            'JOB': { provenance: "Qumran Cave 11, Judean Desert", discovered: "1956", script: "Aramaic Targum on leather", condition: "Extensive — oldest Job Targum found", tags: ["Dead Sea Scrolls", "Cave 11", "Aramaic"] },
            'PSALMS': { provenance: "Qumran Cave 11, Judean Desert", discovered: "1956", script: "Hebrew uncial on leather", condition: "Near-complete — 41 psalms including extra-canonical", tags: ["Dead Sea Scrolls", "Cave 11", "Great Psalms Scroll"] },
            'PROVERBS': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Contains Proverbs 6-7", tags: ["Dead Sea Scrolls", "Cave 4", "Wisdom literature"] },
            'ECCLESIASTES': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Contains 'Teacher of Righteousness' passage", tags: ["Dead Sea Scrolls", "Cave 4", "Philosophical"] },
            'SONG OF SOLOMON': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Erotic poetry canonized by 2nd century BC", tags: ["Dead Sea Scrolls", "Cave 4", "Covenant"] },
            'ISAIAH': { provenance: "Qumran Cave 1, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather (1QIsa-a)", condition: "Complete 24-foot scroll — virtually identical to MT", tags: ["Great Isaiah Scroll", "Cave 1", "Complete"] },
            'JEREMIAH': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Follows longer Septuagint version", tags: ["Dead Sea Scrolls", "Cave 4", "LXX tradition"] },
            'LAMENTATIONS': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Acrostic structure preserved", tags: ["Dead Sea Scrolls", "Cave 4", "Poetic"] },
            'EZEKIEL': { provenance: "Qumran Cave 2, Judean Desert", discovered: "1952", script: "Hebrew uncial on leather", condition: "Significant chapter rearrangements vs MT", tags: ["Dead Sea Scrolls", "Cave 2", "Apocalyptic"] },
            'DANIEL': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew & Aramaic uncial on leather", condition: "Son of Man vision canonical by 2nd century BC", tags: ["Dead Sea Scrolls", "Cave 4", "Apocalypse"] },
            'HOSEA': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Earliest witness to Hosea", tags: ["Dead Sea Scrolls", "Cave 4", "Northern kingdom"] },
            'JOEL': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "'Outpouring of the Spirit' prophecy preserved", tags: ["Dead Sea Scrolls", "Cave 4", "Eschatological"] },
            'AMOS': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Social justice indictment preserved", tags: ["Dead Sea Scrolls", "Cave 4", "Ethics"] },
            'OBADIAH': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Shortest prophetic scroll", tags: ["Dead Sea Scrolls", "Cave 4", "Edom"] },
            'JONAH': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Unique narrative prophetic scroll", tags: ["Dead Sea Scrolls", "Cave 4", "Narrative"] },
            'MICAH': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "'Bethlehem' prophecy preserved", tags: ["Dead Sea Scrolls", "Cave 4", "Messianic"] },
            'NAHUM': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Nineveh's fall certain", tags: ["Dead Sea Scrolls", "Cave 4", "Assyria"] },
            'HABAKKUK': { provenance: "Qumran Cave 1, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather (1QpHab)", condition: "Most famous DSS after Isaiah — commentary included", tags: ["Commentary scroll", "Cave 1", "Righteous One"] },
            'ZEPHANIAH': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Day of the Lord oracle preserved", tags: ["Dead Sea Scrolls", "Cave 4", "Apocalyptic"] },
            'HAGGAI': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Temple-rebuilding call preserved", tags: ["Dead Sea Scrolls", "Cave 4", "Post-exilic"] },
            'ZECHARIAH': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "'Branch' and 'Cornerstone' visions canonical", tags: ["Dead Sea Scrolls", "Cave 4", "Messianic"] },
            'MALACHI': { provenance: "Qumran Cave 4, Judean Desert", discovered: "1947", script: "Hebrew uncial on leather", condition: "Final prophetic scroll — quoted in all four Gospels", tags: ["Dead Sea Scrolls", "Cave 4", "Messenger"] }
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
                '<div class="prov-row"><div class="prov-key">CONDITION</div><div class="prov-val">' + data.condition + '</div></div>' +
                '<div class="prov-row condition-row"><div class="prov-key">CLASSIFICATION</div><div class="condition-tags">' +
                data.tags.map(function(t) { return '<span class="condition-tag">' + t + '</span>'; }).join('') +
                '</div></div>' +
                '</div>';
            overlay.classList.add('active');
        }

        function closeExcavation() {
            var overlay = document.getElementById('excavationOverlay');
            if (overlay) overlay.classList.remove('active');
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeExcavation();
        });

        var exOverlay = document.getElementById('excavationOverlay');
        if (exOverlay) exOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeExcavation();
        });

        /* ── ARTIFACT EXAMINATION ── */
        var examineData = {
            'GENESIS': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/4Q119_frg._1.jpg', text: 'In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.', leftMarg: 'And the earth was without form, and void', rightMarg: 'The Spirit moved upon the face of the waters', lore1: 'The opening words of Scripture — "Bereshith" — written in the ancient paleo-Hebrew script found in Cave 4.', lore2: 'The first scribe to write this passage used carbon ink on sheepskin parchment, a technique unchanged for three centuries.' },
            'EXODUS': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Codex_Sinaiticus_1-2.jpg', text: 'And the angel of the LORD appeared to him in a flame of fire out of the midst of a bush. He looked, and behold, the bush was burning, yet it was not consumed.', leftMarg: 'I AM WHO I AM', rightMarg: 'The burning bush — divine presence in the ordinary', lore1: 'The divine name revealed to Moses at Horeb — "Ehyeh Asher Ehyeh" — preserved in this manuscript with extraordinary fidelity.', lore2: 'Nash Papyrus carbon-dated to 150 BC makes this among the earliest surviving biblical fragments.' },
            'LEVITICUS': { chapter: "Chapter XIX", image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Codex_Vaticanus.jpg', text: 'Speak to all the congregation of the people of Israel and say to them, You shall be holy, for I the LORD your God am holy.', leftMarg: 'Holiness code — parashah Kedoshim', rightMarg: 'The foundational call: be holy as I am holy', lore1: 'The scroll shows the distinctive Kedoshim section break used by Samaritan scribes.', lore2: 'Line-for-line correspondence with the Masoretic text proves careful transmission across five centuries.' },
            'NUMBERS': { chapter: "Chapter VI", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P46.jpg', text: 'And the LORD spoke to Moses, saying, Speak to the people of Israel and say to them, When either man or woman makes a special vow, the vow of a Nazirite.', leftMarg: 'The Nazirite vow — separation for divine service', rightMarg: 'Aaronic blessing begins: The LORD bless you and keep you', lore1: 'This fragment preserves the transitional passage between census narratives and the wilderness journey.', lore2: 'The Nazirite chapter includes the Aaronic blessing later immortalized in synagogue liturgy worldwide.' },
            'DEUTERONOMY': { chapter: "Chapter XXXIV", image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Aleppo_Codex_(Deut).jpg', text: 'And Moses went up from the plains of Moab to mount Nebo, to the top of the mountain that is over against Jericho. And the LORD showed him all the land.', leftMarg: 'Moses views the Promised Land — the only man denied entry', rightMarg: 'He died there in the land of Moab, according to the word of the LORD', lore1: 'The final chapter of the Torah — Moses eyes the land he will never enter, then is buried by the LORD.', lore2: 'No manuscript of Deuteronomy has ever been found at Qumran, though the book is universally present in all other biblical collections.' },
            'JOSHUA': { chapter: "Chapter VI", image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/4Q120_frg20_with_Divine_Name.jpg', text: 'And the walls of the city fell flat, so that the people went up into the city, every man straight before him, and they captured the city.', leftMarg: 'Jericho fell — the first Canaanite city to fall', rightMarg: 'Rahab and her household preserved by faith', lore1: 'The archaeological site of Jericho confirms the destruction layer corresponding to this chapter.', lore2: 'Cave 5 Joshua fragments show the earliest known account of the conquest, predating the Deuteronomistic history by two centuries.' },
            'JUDGES': { chapter: "Chapter XXI", image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Codex_Vaticanus.jpg', text: 'In those days there was no king in Israel. Everyone did what was right in his own eyes.', leftMarg: 'The recurring refrain of the judges cycle', rightMarg: 'The tribal league before monarchy', lore1: 'The famous closing phrase of Judges — "Everyone did what was right in his own eyes" — appears here with a distinctive scribal emphasis mark.', lore2: 'The fragment preserves the account of the missing tribe of Benjamin, one of the most obscure passages in the Hebrew canon.' },
            'RUTH': { chapter: "Chapter IV", image: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Codex_Colberto-Sarravianus.png', text: 'So Boaz took Ruth and she became his wife. And when he came to her, the LORD gave her conception, and she bore a son.', leftMarg: 'Obed — the genealogy linking Ruth to David', rightMarg: 'The kinsman-redeemer fulfilled', lore1: 'Ruth is the only Old Testament book named for a non-Jewish woman whose lineage leads directly to King David.', lore2: 'The scroll is uniquely complete among Qumran texts — Ruth held a special place in Second Temple scripture.' },
            '1 SAMUEL': { chapter: "Chapter XVI", image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Ambrosiano_O39_sup.jpg', text: 'And the LORD said, Arise, anoint him, for this is the one. So Samuel took the horn of oil and anointed him in the presence of his brothers.', leftMarg: 'David — the shepherd-king chosen', rightMarg: 'The Spirit of the LORD rushed upon David from that day forward', lore1: 'The most complete scroll at Qumran — virtually the entire book recovered from Cave 4.', lore2: 'This passage corrected over a dozen scribal errors in the received Masoretic text.' },
            '2 SAMUEL': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Ambrosiano_O39_sup.jpg', text: 'And after this, David smote the Philistine, and cut off his head, and brought it to the king. And the king said, whose son are you, young man?', leftMarg: 'The "Three Songs of the Bow" — deuterocanonical', rightMarg: 'David and the Philistine champion', lore1: 'This scroll contains the famous "Three Songs of the Bow" absent from the Masoretic text but present in the Septuagint.', lore2: 'The passage was considered scripture by the 2nd century BC community that preserved it.' },
            '1 KINGS': { chapter: "Chapter XVIII", image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Codex_Ambrosianus_A_147.jpg', text: 'And Ahab went to eat and drink, and he called for Baal and answered him. And there was no voice, and no answer, and no response.', leftMarg: 'Carmel confrontation — 450 prophets of Baal', rightMarg: 'Fire from heaven — the LORD is God', lore1: 'The Elijah narrative on Mount Carmel is one of the most dramatic episodes preserved in the Qumran manuscripts.', lore2: 'The fragment dates to approximately 100 BC, placing it in the same era as the Teacher of Righteousness.' },
            '2 KINGS': { chapter: "Chapter XX", image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Codex_Ambrosianus_A_147.jpg', text: 'And Hezekiah turned his face to the wall, and prayed to the LORD, saying, Remember now, how I have walked before you in faithfulness.', leftMarg: 'Hezekiah and the sundial miracle', rightMarg: "Hezekiah's tunnel — the Siloam inscription", lore1: "The famous Siloam inscription — a contemporaneous artifact corroborating the Hezekiah tunnel account — confirms this passage.", lore2: 'Archaeological evidence from the tunnel matches the biblical dimensions almost exactly.' },
'1 CHRONICLES': { chapter: "Chapter XVII", image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Codex_Alexandrinus_1.jpg', text: 'Now the word of the LORD came to Nathan, saying, Go and tell my servant David, Thus says the LORD, You shall not build me a house to dwell in.', leftMarg: "The Davidic covenant — Nathan's oracle", rightMarg: 'The eternal throne promised', lore1: "The Chronicler's genealogical emphasis preserved the royal lineage from Adam to David with extraordinary precision.", lore2: 'This section of Chronicles appears in all Qumran copies, indicating its importance to Second Temple Judaism.' },

            '2 CHRONICLES': { chapter: "Chapter VII", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P46.jpg', text: 'And the priests stood in their offices, and the Levites also with instruments of music of the LORD, which the king had made.', leftMarg: "Solomon's dedication of the Temple", rightMarg: 'The glory of the LORD filled the house', lore1: "The Chronicler's focus on Temple liturgy and worship practices is reflected in this passage.", lore2: "Josiah's discovery of the Book of the Law — the pivotal moment of Deuteronomic reform — is preserved here." },

            'EZRA': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Papyrus_Bodmer_II.jpg', text: 'Thus says Cyrus king of Persia, The LORD, the God of heaven, has given me all the kingdoms of the earth, and he has charged me to build him a house at Jerusalem.', leftMarg: 'The decree of Cyrus — 538 BC', rightMarg: 'The first return from Babylon', lore1: 'The Cyrus decree is corroborated by extra-biblical cuneiform tablets found at Babylon.', lore2: 'This fragment in the paleo-Hebrew script is among the oldest Ezra-Nehemiah texts discovered.' },

            'NEHEMIAH': { chapter: "Chapter IV", image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Papyrus_Bodmer_II.jpg', text: 'And from that time on, half of my servants worked in construction, and half held spears, shields, bows, and coats of mail.', leftMarg: "The walls rebuilt in 52 days — Nehemiah's leadership", rightMarg: 'We built the wall, for the people had a mind to work', lore1: "Nehemiah's account of the wall rebuilt in 52 days is supported by extra-biblical sources.", lore2: 'The fragment preserves the dramatic night patrol scene — one of the most vivid passages in biblical history.' },

            'ESTHER': { chapter: "Chapter IX", image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/P47.jpg', text: 'So the Jews burned all the merchandise in the gate of the city, because their enemies had seized it, as they did with their property.', leftMarg: 'No scroll found at Qumran — the canonical question', rightMarg: 'Feast of Purim established', lore1: 'The complete absence of Esther from Qumran remains one of the most puzzling mysteries in biblical manuscript studies.', lore2: "Some scholars speculate the book's lack of divine name may have limited its appeal to the Qumran community." },
            'JOB': { chapter: "Chapter XXXVIII", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Papyrus_Bodmer_XIV-XV_%28P75%29.jpg', text: 'Then the LORD answered Job out of the whirlwind, and said, Who is this that darkens my counsel by words without knowledge?', leftMarg: 'The LORD answers from the whirlwind', rightMarg: 'Where were you when I laid the foundation of the earth?', lore1: 'The Aramaic Targum preserved here is the oldest known interpretive translation of Job.', lore2: 'This passage — God speaking from the whirlwind — is one of the most theologically charged in all literature.' },
            'PSALMS': { chapter: "Chapter XXIII", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Codex_Marchalianus_%28Ezk_1%2C28-2%2C6%29.JPG', text: 'The LORD is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters.', leftMarg: 'The Shepherd Psalm — most beloved in Scripture', rightMarg: 'The valley of the shadow of death', lore1: 'The Great Psalms Scroll contains 41 psalms, including several not in the Masoretic tradition.', lore2: 'This passage is inscribed in royal Davidic cipher, suggesting liturgical use in the Temple.' },
            'PROVERBS': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Codex_Alexandrinus_1.jpg', text: 'My son, do not forget my teaching, but let your heart keep my commandments, for length of days and years of life and peace they will add to you.', leftMarg: 'Wisdom instruction — the fear of the LORD', rightMarg: 'Do not despise the discipline of the LORD', lore1: 'The Proverbs fragments show the text was considered sacred wisdom literature by the 2nd century BC.', lore2: 'The scribal marginal notations in this fragment are among the earliest known biblical commentaries.' },
            'ECCLESIASTES': { chapter: "Chapter XII", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P46.jpg', text: 'Vanity of vanities, says the Preacher, vanity of vanities. All is vanity. What does a man gain by all the toil at which he toils under the sun?', leftMarg: 'The philosophical conclusion — under the sun', rightMarg: 'Fear God and keep his commandments', lore1: 'The famous "Teacher of Righteousness" reference in Ecclesiastes appears in this fragment with a distinctive scribal mark.', lore2: 'The Qumran community read Ecclesiastes as wisdom scripture despite its skeptical tone.' },
            'SONG OF SOLOMON': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Codex_Alexandrinus_1.jpg', text: 'Kiss me with the kisses of your mouth, for your love is more delightful than wine. The scent of your perfumes is fragrant.', leftMarg: 'Shulammite addressing Solomon — love poetry', rightMarg: 'The vineyard of the king', lore1: 'The allegorical interpretation — covenant love between God and Israel — is reflected in the scribe\'s marginal notation.', lore2: 'This scroll confirms that erotic poetry was considered sacred scripture by the 2nd century BC.' },
            'ISAIAH': { chapter: "Chapter LIII", image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Great_Isaiah_Scroll.jpg', text: 'He was despised and rejected by men, a man of sorrows and acquainted with grief. Surely he has borne our griefs and carried our sorrows.', leftMarg: 'The Fourth Servant Song — the suffering Messiah', rightMarg: 'He was pierced for our transgressions', lore1: 'The Great Isaiah Scroll contains the full Servant Songs — passages Jesus quoted as referring to himself.', lore2: 'Carbon dating confirmed this 24-foot scroll is 2,000 years old with virtually no textual deviation from modern versions.' },
            'JEREMIAH': { chapter: "Chapter XXXI", image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Codex_Sinaiticus_1-2.jpg', text: 'Behold, the days are coming, declares the LORD, when I will make a new covenant with the house of Israel and the house of Judah.', leftMarg: 'The New Covenant — prophetic promise', rightMarg: 'I will put my law within them and write it on their hearts', lore1: 'Jeremiah\'s New Covenant prophecy was quoted by the writer of Hebrews as fulfilled in Christ.', lore2: 'The Qumran scroll follows the longer Septuagint version, suggesting the Hebrew behind the LXX was known in Palestine.' },
            'LAMENTATIONS': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Codex_Vaticanus.jpg', text: 'I am the man who has seen affliction by the rod of his wrath. He has driven me into darkness and not into light.', leftMarg: 'The acrostic poem of grief — third of five', rightMarg: 'Great is your faithfulness', lore1: 'The acrostic structure — each line beginning with the next letter of the Hebrew alphabet — is perfectly preserved here.', lore2: 'Despite the anguish, the prophet ends with trust in the faithful God who does not utterly reject.' },
            'EZEKIEL': { chapter: "Chapter XXXVII", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Papyrus_Bodmer_XIV-XV_%28P75%29.jpg', text: 'The hand of the LORD was upon me, and he brought me out in the Spirit of the LORD and set me down in the middle of the valley, and it was full of bones.', leftMarg: 'The valley of dry bones — prophecy of resurrection', rightMarg: 'Thus says the Lord GOD to these bones', lore1: 'The vision of the dry bones — the most dramatic apocalyptic imagery in the Old Testament — is preserved here.', lore2: 'The Qumran scroll has significant chapter rearrangements compared to the Masoretic text, showing the text was still open.' },
            'DANIEL': { chapter: "Chapter VII", image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/4Q120_frg20_with_Divine_Name.jpg', text: 'I saw in the night visions, and behold, with the clouds of heaven there came one like a son of man. He came to the Ancient of Days and was presented before him.', leftMarg: 'The Son of Man vision — apocalyptic cornerstone', rightMarg: 'His dominion is an everlasting dominion', lore1: '"Son of Man" appears in this scroll — confirming the title was recognized as scripture by the 2nd century BC.', lore2: 'The dual Hebrew/Aramaic composition of Daniel is confirmed by the linguistic variation in this fragment.' },
            'HOSEA': { chapter: "Chapter XI", image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Codex_Sinaiticus_1-2.jpg', text: 'When Israel was a child, I loved him, and out of Egypt I called my son. The more they were called, the more they went away.', leftMarg: "God's unfailing love for unfaithful Israel", rightMarg: 'How can I give you up, Ephraim?', lore1: "Hosea's living parable — marrying a prostitute to represent God's love for faithless Israel — was already scripture by the 2nd century BC.", lore2: 'This fragment is the earliest witness to the prophetic tradition preserved at Qumran.' },
            'JOEL': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Codex_Vaticanus.jpg', text: 'And it shall come to pass afterward, that I will pour out my Spirit on all flesh. Your sons and your daughters shall prophesy.', leftMarg: 'The outpouring of the Spirit — Pentecost prophecy', rightMarg: 'And I will show wonders in the heavens', lore1: 'Peter quoted this prophecy on the day of Pentecost (Acts 2), connecting Joel\'s words to the birth of the Church.', lore2: 'The Qumran community read Joel alongside other prophetic literature as authoritative scripture.' },
            'AMOS': { chapter: "Chapter V", image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Codex_Alexandrinus_1.jpg', text: 'But let justice roll down like waters, and righteousness like an ever-flowing stream.', leftMarg: 'The social justice oracle — Amos\'s core message', rightMarg: 'Seek good and not evil, that you may live', lore1: 'Amos\'s indictment of the wealthy and the complacent was preserved as prophetic truth by the Qumran community.', lore2: 'The fragment shows the text was read alongside Hosea and Micah as part of the Minor Prophets collection.' },
            'OBADIAH': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P46.jpg', text: 'The vision of Obadiah. Thus says the Lord GOD concerning Edom: We have heard news from the LORD, and a messenger has been sent among the nations.', leftMarg: "Edom's pride and fall — the shortest prophetic book", rightMarg: 'The house of Jacob shall possess their own possession', lore1: 'The shortest book in the Hebrew Bible — a single chapter oracle against Edom — is preserved with remarkable fidelity.', lore2: 'Despite its brevity, Obadiah was considered canonical alongside the Major Prophets.' },
            'JONAH': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Bodmer_VII-IX.jpg', text: 'And Jonah began to enter into the city, going one day\'s journey, and he called out, Yet forty days and Nineveh shall be overthrown.', leftMarg: 'The reluctant prophet — the great city repents', rightMarg: 'God relented from the disaster he had declared against them', lore1: 'The fish narrative is unique among prophetic books — the only one written as a narrative rather than an oracle.', lore2: 'The scroll confirms that Nineveh\'s repentance was considered prophetic truth by the 2nd century BC community.' },
            'MICAH': { chapter: "Chapter V", image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Codex_Sinaiticus_1-2.jpg', text: 'But you, Bethlehem Ephrathah, though you are little among the thousands of Judah, yet out of you shall come forth to me the one who is to be ruler.', leftMarg: 'The Bethlehem prophecy — Messianic cornerstone', rightMarg: 'From you shall come forth for me one whose origin is from of old', lore1: 'Matthew quoted this passage as fulfilled in Jesus\' birth (Matthew 2:6), making it one of the most historically significant fragments.', lore2: 'The scroll proves the Bethlehem expectation was rooted in scripture centuries before Jesus\' birth.' },
            'NAHUM': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Papyrus_Bodmer_XIV-XV_%28P75%29.jpg', text: 'The LORD is slow to anger and great in power, and the LORD will by no means clear the guilty, visiting his wrath on his enemies.', leftMarg: 'The fall of Nineveh — divine judgment on Assyria', rightMarg: 'The LORD is good, a refuge in times of trouble', lore1: 'Nahum\'s prophecy of Nineveh\'s destruction was fulfilled in 612 BC when the city fell to Babylon.', lore2: 'The certainty of divine judgment against Assyria was part of the prophetic canon preserved at Qumran.' },
            'HABAKKUK': { chapter: "Chapter II", image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Codex_Alexandrinus_1.jpg', text: 'The just shall live by his faith. Behold, his soul is puffed up; it is not upright within him, but the just shall live by his faith.', leftMarg: 'The just shall live by faith — quoted in Romans and Galatians', rightMarg: 'The proud and insolent thing he does not accomplish', lore1: 'Paul quoted this passage in Romans 1:17 and Galatians 3:11 to establish the doctrine of justification by faith.', lore2: 'The Habakkuk Commentary (1QpHab) is the most famous Qumran text after Isaiah, showing how the community interpreted this passage.' },
            'ZEPHANIAH': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/P46.jpg', text: 'Seek the LORD, all you humble of the land, who do his just commands; seek righteousness, seek humility.', leftMarg: 'The Day of the Lord — judgment and restoration', rightMarg: 'A people humble and lowly shall take refuge in the name of the LORD', lore1: 'The apocalyptic warning of judgment and eventual restoration was understood as prophetic scripture in the Second Temple period.', lore2: 'Zephaniah\'s promise of a "humble and lowly people" was read Messianically by the Qumran community.' },
            'HAGGAI': { chapter: "Chapter I", image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Papyrus_Bodmer_II.jpg', text: 'Is it a time for you yourselves to dwell in your paneled houses, while this house lies in ruins?', leftMarg: 'The call to rebuild the Temple — 520 BC', rightMarg: 'Consider how you have fared much better than this', lore1: 'Haggai\'s practical call to prioritize the Temple rebuilt was preserved on this fragment.', lore2: 'The post-exilic prophets were included in the scriptural canon early, as confirmed by this scroll.' },
            'ZECHARIAH': { chapter: "Chapter IX", image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Codex_Sinaiticus_1-2.jpg', text: 'Behold, your king is coming to you; righteous and having salvation is he, humble and mounted on a donkey.', leftMarg: 'The King on a colt — Palm Sunday prophecy', rightMarg: 'Zion, your king is coming to you', lore1: 'Matthew quoted this passage to describe Jesus\' entry into Jerusalem (Matthew 21:5), fulfilled on Palm Sunday.', lore2: 'The Messianic imagery — the Branch and the Cornerstone — was already considered scripture when the Qumran community copied this.' },
            'MALACHI': { chapter: "Chapter III", image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Codex_Vaticanus.jpg', text: 'Behold, I will send my messenger, who will prepare the way before me. Then the Lord whom you seek will suddenly come to his temple.', leftMarg: 'The messenger who prepares the way — John the Baptist', rightMarg: 'The sun of righteousness shall rise with healing', lore1: 'This final prophetic scroll of the Hebrew Bible was quoted by all four Gospel writers as referring to John the Baptist.', lore2: 'The 400 years of silence between the Old and New Testaments begin from this prophetic voice.' }
        };

        var examineZoom = 1;
        var examineBook = '';
        var examineChapter = 1;
        var examineBookTotal = 0;

        function openExamine(book) {
            var data = examineData[book.toUpperCase()];
            if (!data) return;
            examineBook = book;
            var bookData = document.querySelector('[data-book^="' + book + '|"]');
            if (bookData) {
                var parts = bookData.getAttribute('data-book').split('|');
                examineBookTotal = parseInt(parts[1], 10);
                examineChapter = 1;
            }
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
                '<div class="artifact-fabric-margin left">scroll // manuscript // ' + examineBook + '</div>' +
                '<div class="artifact-fabric-margin right">folio ' + examineChapter + 'r</div>' +
                '</div></div>';
            document.getElementById('zoomDisplay').innerText = Math.round(examineZoom * 100) + '%';
            if (loreDrawer) {
                loreDrawer.innerHTML = '<div class="lore-drawer-inner"><div><h3>SCRIBAL LORE</h3><div class="lore-item"><strong>Lore I:</strong> ' + data.lore1 + '</div></div><div><h3>&nbsp;</h3><div class="lore-item"><strong>Lore II:</strong> ' + data.lore2 + '</div></div><div class="scribe-citation" style="margin-top:16px;padding-top:8px;border-top-color:rgba(212,175,55,0.08);">Digital manuscript imagery courtesy of the <a href="https://www.deadseascrolls.org.il/" target="_blank">Leon Levy DSS Digital Library</a>, <a href="https://www.bl.uk/manuscripts" target="_blank">British Library</a>, &amp; <a href="https://csntm.org/" target="_blank">CSNTM</a>.<br><span style="font-style:italic;margin-top:4px;display:block;opacity:0.6;">"Preserving the Word across the corridors of time."</span></div></div>';
            }
            document.getElementById('artifactCursorLens').style.display = 'none';
        }

        function closeExamine() {
            var panel = document.getElementById('artifactPanel');
            if (panel) panel.classList.remove('active');
        }

        document.addEventListener('keydown', function(e) {
            if (!document.getElementById('artifactPanel').classList.contains('active')) return;
            if (e.key === 'Escape') closeExamine();
            if (e.key === '+' || e.key === '=') {
                examineZoom = Math.min(3, examineZoom + 0.25);
                document.getElementById('artifactManuscript').querySelector('.artifact-page').style.transform = 'scale(' + examineZoom + ')';
                document.getElementById('zoomDisplay').innerText = Math.round(examineZoom * 100) + '%';
            }
            if (e.key === '-') {
                examineZoom = Math.max(0.5, examineZoom - 0.25);
                document.getElementById('artifactManuscript').querySelector('.artifact-page').style.transform = 'scale(' + examineZoom + ')';
                document.getElementById('zoomDisplay').innerText = Math.round(examineZoom * 100) + '%';
            }
            if (e.key === 'l' || e.key === 'L') {
                document.getElementById('loreDrawer').classList.toggle('active');
            }
        });

        var artifactPanel = document.getElementById('artifactPanel');
        if (artifactPanel) {
            artifactPanel.addEventListener('click', function(e) {
                if (e.target.closest('.artifact-control-bar') || e.target.closest('.artifact-lore-drawer') || e.target.closest('.artifact-manuscript')) return;
                closeExamine();
            });
        }

        var cursorLens = document.getElementById('artifactCursorLens');
        if (cursorLens) {
            cursorLens.style.display = 'block';
        }

        var artifactCursorLens = document.getElementById('artifactCursorLens');
        if (artifactCursorLens) {
            artifactCursorLens.addEventListener('mouseleave', function() {
                this.style.display = 'none';
            });
        }

        var timelineBooks = [
            { name: 'GENESIS', date: '1400 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'EXODUS', date: '1400 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'LEVITICUS', date: '1400 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'NUMBERS', date: '1400 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'DEUTERONOMY', date: '1400 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: '✧ THE SONG', date: '1380 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'JOSHUA', date: '1350 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'JUDGES', date: '1100 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'RUTH', date: '1050 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: '1 SAMUEL', date: '950 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: '2 SAMUEL', date: '950 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: '1 KINGS', date: '900 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: '2 KINGS', date: '900 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: '1 CHRONICLES', date: '900 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: '2 CHRONICLES', date: '900 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'EZRA', date: '450 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'NEHEMIAH', date: '430 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'ESTHER', date: '450 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'JOB', date: '1400 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'PSALMS', date: '1000 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'PROVERBS', date: '900 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'ECCLESIASTES', date: '450 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'SONG OF SONGS', date: '900 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'ISAIAH', date: '700 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'JEREMIAH', date: '600 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'LAMENTATIONS', date: '600 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'EZEKIEL', date: '590 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'DANIEL', date: '530 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'HOSEA', date: '750 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'JOEL', date: '830 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'AMOS', date: '760 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'OBADIAH', date: '580 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'JONAH', date: '750 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'MICAH', date: '700 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'NAHUM', date: '660 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'HABAKKUK', date: '600 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'ZEPHANIAH', date: '630 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'HAGGAI', date: '520 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'ZECHARIAH', date: '520 BC', era: 'ot', link: 'ot-gallery.html' },
            { name: 'MALACHI', date: '430 BC', era: 'ot', link: 'ot-gallery.html' }
        ];

        function parseDate(d) {
            var BC = d.includes('BC');
            var num = parseInt(d.replace(/[^0-9]/g, ''));
            return BC ? -num : num;
        }

        function isApocalypse(name) {
            var n = name.toUpperCase();
            if (n === 'DANIEL' || n === 'EZEKIEL') return true;
            return false;
        }

        function buildTimeline() {
            timelineTrack = document.getElementById('timelineTrack');
            timelineTooltip = document.getElementById('timelineTooltip');
            rail = document.getElementById('timelineRail');
            if (!timelineTrack || !timelineTooltip || !rail) return;
            rail.style.display = 'flex';
            var dates = timelineBooks.map(function(b) { return parseDate(b.date); });
            var minDate = Math.min.apply(null, dates) - 20;
            var maxDate = Math.max.apply(null, dates) + 20;
            var range = maxDate - minDate;

            var majorDates = [parseDate('1000 BC'), parseDate('430 BC')];
            majorDates.forEach(function(d) {
                if (d > minDate && d < maxDate) {
                    var pct = ((d - minDate) / range) * 100;
                    var major = document.createElement('div');
                    major.className = 'timeline-tick-major';
                    major.style.position = 'absolute';
                    major.style.left = pct + '%';
                    major.style.top = '-7px';
                    major.style.transform = 'translateX(-50%)';
                    timelineTrack.appendChild(major);
                }
            });

            timelineBooks.forEach(function(book, idx) {
                var rawPct = ((parseDate(book.date) - minDate) / range) * 100;
                var marker = document.createElement('div');
                marker.className = 'timeline-era-marker';
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

            /* Stagger overlapping label clusters — each subsequent label drops lower */
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
        })();
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