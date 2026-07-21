// ══════════════════════════════════════════
//  ZONE DATA
// ══════════════════════════════════════════
const ZONE_DATA = {
    outer: {
        title:"THE OUTER COURT",
        ticker:"Approaching the Bronze Altar. The Levites prepare sacrificial fires. Smoke ascends toward heaven.",
        desc:"The open-air forecourt (100×50 cubits) enclosed by linen curtains hung on bronze pillars. All Israel could enter here. Fire, blood, and the scent of sacrifice filled the air.",
        bgColor:0x0d0a07, fogColor:0x1a1005, fogNear:15, fogFar:65,
        ambientInt:0.45, sunColor:0xffcc66,
        vessels:[
            { key:"altar", name:"ALTAR OF BURNT OFFERING", dotClass:"bronze", pos:[0,0,3.5], color:0x7a5320, emissive:0x331100, size:[2.2,1.0,2.2], shape:"box", hasFlame:true, tipRef:"Exodus 27:1",
              info:"A hollow acacia wood frame overlaid in bronze. 5×5×3 cubits. Four horns at the corners — fugitives could grasp them for sanctuary. The fire was never to go out; a continual burnt offering day and night.",
              mat:"Bronze-overlaid acacia wood", dims:"5×5×3 cubits",
              typology:{antitype:"Christ Our Sacrifice",scripture:"Hebrews 13:10",exposition:"Every animal laid on this altar was a shadow of the one Lamb of God whose blood would truly atone once for all."} },
            { key:"laver", name:"BRONZE LAVER", dotClass:"bronze", pos:[0,0,1], color:0x5c7a8a, emissive:0x002233, size:[0.9,0.7,0.9], shape:"cylinder", hasFlame:false, tipRef:"Exodus 30:18",
              info:"Made entirely from the bronze mirrors donated by the serving women at the Tent of Meeting. Priests washed their hands and feet before ministering — or face death.",
              mat:"Solid bronze (women's mirrors)", dims:"Unspecified in Scripture",
              typology:{antitype:"Regeneration & the Word",scripture:"Titus 3:5",exposition:"Water washing prerequisite to priestly service foreshadows regeneration and the sanctifying washing of the Word."} },
            { key:"gate", name:"GATE OF THE COURT", dotClass:"gold", pos:[0,0,8.5], color:0xd4af37, emissive:0x332200, size:[3,1.8,0.12], shape:"gate", hasFlame:false, tipRef:"Exodus 27:16",
              info:"A 20-cubit wide hanging of blue, purple, scarlet, and fine twined linen — the only entrance into the Outer Court. Facing east, visible from the rising of the sun.",
              mat:"Blue, purple, scarlet & white linen", dims:"20×5 cubits",
              typology:{antitype:"Christ the Only Way",scripture:"John 10:9",exposition:"One gate. One entrance. No one comes to the Father except through Him."} },
             { key:"pillars", name:"COURT PILLARS", dotClass:"bronze", pos:[0,0,0], color:0x8a6a40, emissive:0x110800, size:[0.1,2.5,0.1], shape:"pillar-row", hasFlame:false, tipRef:"Exodus 27:9",
              info:"Sixty bronze pillars, each set in a bronze socket with silver hooks and bands, holding the 5-cubit high white linen walls of the Outer Court. Silver top bands caught the desert sun.",
              mat:"Bronze pillars, silver caps, linen curtains", dims:"60 pillars, 5 cubits high",
              typology:{antitype:"The Saints as Living Pillars",scripture:"Revelation 3:12",exposition:"Overcomers are made pillars in God's temple, never to depart — the permanent dwelling the linen court foreshadowed."} },
            { key:"highpriest", name:"THE HIGH PRIEST", dotClass:"priest", pos:[0,0,7], color:0xf0ede0, emissive:0x110000, size:[0.5,1.6,0.4], shape:"priest", hasFlame:false, tipRef:"Hebrews 9:7",
              info:"The High Priest ministers daily in the Outer Court — washing at the laver, offering at the bronze altar, and entering the Holy Place to tend the lamps and incense. Clothed in white linen with the golden ephod.",
              mat:"White linen, gold, blue, purple & scarlet", dims:"Human stature",
              typology:{antitype:"Christ Our Great High Priest",scripture:"Hebrews 9:11",exposition:"Every ritual act in the court was a shadow of Christ's eternal ministry — washing, offering, interceding."} }
        ]
    },
    holy: {
        title:"THE HOLY PLACE",
        ticker:"The Sanctuary sealed. Incense smoke fills the chamber. The Menorah casts golden light across golden walls.",
        desc:"The first chamber inside the Tabernacle (20×10 cubits). Covered by four curtain layers, enclosed by golden acacia planks. Only priests could enter. The primary experience was golden light, incense, and the presence of bread.",
        bgColor:0x080604, fogColor:0x120d06, fogNear:8, fogFar:30,
        ambientInt:0.2, sunColor:0xffd080,
        vessels:[
            { key:"menorah", name:"THE GOLDEN MENORAH", dotClass:"gold", pos:[-1.8,0,0], color:0xd4af37, emissive:0x553300, size:[0.6,1.4,0.12], shape:"menorah", hasFlame:true, tipRef:"Exodus 25:31",
              info:"Beaten from a single talent (75 lbs) of pure gold. Seven branches with almond-shaped cups. Tended by Aaron every morning and evening. The only light source in the windowless Holy Place.",
              mat:"75 lbs solid beaten gold", dims:"~3 feet tall",
              typology:{antitype:"The Holy Spirit — Seven-fold Fullness",scripture:"Revelation 4:5",exposition:"The seven lamps burning before God's throne are the seven Spirits of God, echoing the Menorah's continual burning in God's presence."} },
            { key:"showbread", name:"TABLE OF SHEWBREAD", dotClass:"gold", pos:[1.8,0,0], color:0xd4af37, emissive:0x332200, size:[1.2,0.7,0.6], shape:"table", hasFlame:false, tipRef:"Leviticus 24:5",
              info:"Gold-overlaid acacia, 2×1×1.5 cubits. Twelve loaves of fine wheat flour replaced every Sabbath. The removed loaves were eaten only by priests, in the Holy Place.",
              mat:"Gold-overlaid acacia wood", dims:"2×1×1.5 cubits",
              typology:{antitype:"Christ the Bread of Life",scripture:"John 6:35",exposition:"Twelve loaves for twelve tribes — presence bread for all Israel, pointing to the one Bread who gives life to the world."} },
            { key:"incense", name:"GOLDEN ALTAR OF INCENSE", dotClass:"gold", pos:[0,0,-2.6], color:0xd4af37, emissive:0x442200, size:[0.5,1.0,0.5], shape:"box", hasFlame:true, tipRef:"Exodus 30:1",
              info:"Golden acacia altar, 1×1×2 cubits, positioned directly before the veil. Incense burned every morning and evening — same times as the Menorah was tended.",
              mat:"Gold-overlaid acacia wood", dims:"1×1×2 cubits",
              typology:{antitype:"The Prayers of the Saints",scripture:"Revelation 8:3",exposition:"An angel with a golden censer offered incense with the prayers of all saints before the throne — earth mirroring heaven."} },
            { key:"veil", name:"THE INNER VEIL", dotClass:"gold", pos:[0,0,-3.4], color:0x3a1a5a, emissive:0x100520, size:[5.0,2.5,0.05], shape:"veil", hasFlame:false, tipRef:"Exodus 26:31",
              info:"Woven of blue, purple, scarlet, and fine twisted linen with cherubim worked into it. Hung on four golden pillars. Torn top to bottom at Christ's death.",
              mat:"Blue, purple, scarlet linen with Cherubim", dims:"10×10 cubits",
              typology:{antitype:"Christ's Flesh — The New and Living Way",scripture:"Hebrews 10:20",exposition:"The veil was His body. Its tearing was not destruction but the opening of an eternal way into God's holy presence for all."} }
        ]
    },
    holies: {
        title:"THE HOLY OF HOLIES",
        ticker:"CRITICAL: Sanctum Sanctorum. The great veil is parted. The Shekinah glory rests between the Cherubim.",
        desc:"A perfect 10×10×10 cubit cube — the innermost chamber. Entered once per year by the High Priest alone on Yom Kippur, with blood and incense smoke. The throne-room of God on earth.",
        bgColor:0x060002, fogColor:0x0d0005, fogNear:5, fogFar:20,
        ambientInt:0.15, sunColor:0xff4040,
        vessels:[
            { key:"ark", name:"ARK OF THE COVENANT", dotClass:"gold", pos:[0,0,-1], color:0xd4af37, emissive:0x553300, size:[1.5,0.9,0.8], shape:"ark", hasFlame:false, isArk:true, tipRef:"Exodus 25:10",
              info:"Acacia wood chest overlaid inside and out with pure gold. 2.5×1.5×1.5 cubits. Contents: the two tablets of the Law, a pot of manna, and Aaron's budded rod.",
              mat:"Gold-overlaid acacia wood (inside and out)", dims:"2.5×1.5×1.5 cubits",
              typology:{antitype:"Christ — Throne of Grace & Propitiation",scripture:"Romans 3:25",exposition:"The Ark held the broken Law; the Mercy Seat covered it with blood. Christ both fulfilled the Law and became the one propitiation."} },
            { key:"mercyseat", name:"THE MERCY SEAT", dotClass:"gold", pos:[0,0.45,-1], color:0xf5d86a, emissive:0x664400, size:[1.5,0.08,0.8], shape:"box", hasFlame:false, tipRef:"Exodus 25:17",
              info:"Solid gold slab, 2.5×1.5 cubits. Two cherubim of beaten gold, wings spread upward, overshadowing it, faces turned toward the seat. 'There I will meet with you.'",
              mat:"Solid beaten gold", dims:"2.5×1.5 cubits",
              typology:{antitype:"The Throne of Grace",scripture:"Hebrews 4:16",exposition:"What the High Priest approached in trembling once a year, we now approach continually and boldly through Christ."} },
            { key:"highpriest", name:"THE HIGH PRIEST", dotClass:"priest", pos:[-1.5,0,0.5], color:0xf0ede0, emissive:0x110000, size:[0.5,1.6,0.4], shape:"priest", hasFlame:false, tipRef:"Hebrews 9:7",
              info:"Enters alone, once a year, on Yom Kippur. Wears only white linen (not the colorful ephod). Carries blood of bull and goat. A censer of burning incense creates a smoke cloud over the Mercy Seat.",
              mat:"White linen (Yom Kippur garments)", dims:"Human stature",
              typology:{antitype:"Christ Our Great High Priest",scripture:"Hebrews 9:12",exposition:"He entered once for all into the holy places by means of his own blood, securing an eternal redemption."} }
        ]
    }
};

// ══════════════════════════════════════════
//  THREE.JS ENGINE
// ══════════════════════════════════════════
let renderer, scene, camera, clock;
let currentZone = null, activeVesselKey = null;
let vesselMeshes = [], particleSystems = [];
let exploredZones = new Set();
let cameraTarget = {x:0,y:0,z:0};
let cameraPhi = Math.PI/5, cameraTheta = 0, cameraRadius = 13;
let isDragging = false, lastMouse = {x:0,y:0};
let labelTimeout, tourActive = false;
let tourZoneIdx = 0, tourVesselIdx = 0;
const tourZones = ['outer','holy','holies'];

function getMountSize() {
    const mount = document.getElementById('threejs-mount');
    // clientWidth/Height can be 0 before first paint — fall back to window minus sidebar
    const sidebarW = 80;
    const inspW = window.innerWidth > 768 ? 360 : 0;
    const w = mount.clientWidth  || (window.innerWidth  - sidebarW - inspW);
    const h = mount.clientHeight || (window.innerHeight - 130); // approx header height
    return { mount, w: Math.max(w, 100), h: Math.max(h, 100) };
}

function initThreeJS() {
    const { mount, w, h } = getMountSize();
    renderer = new THREE.WebGLRenderer({
        antialias:true, alpha:false, powerPreference:'high-performance',
        stencil:false, depth:true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.setSize(w, h, false);
    // r152+ color space
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    mount.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(52, w/h, 0.1, 200);
    camera.position.set(0,6,12);
    clock = new THREE.Clock();
    lastDragTime = performance.now();

    window.addEventListener('resize', () => {
        const { w, h } = getMountSize();
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        if (bloomRT) resizeBloom();
    });

    // Mouse orbit
    renderer.domElement.addEventListener('mousedown', e => { isDragging=true; lastMouse={x:e.clientX,y:e.clientY}; });
    window.addEventListener('mouseup', () => isDragging=false);
    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        cameraTheta -= (e.clientX-lastMouse.x)*0.008;
        cameraPhi = Math.max(0.15, Math.min(Math.PI/2.1, cameraPhi+(e.clientY-lastMouse.y)*0.006));
        lastMouse = {x:e.clientX,y:e.clientY};
    });
    renderer.domElement.addEventListener('wheel', e => { cameraRadius = Math.max(3,Math.min(25,cameraRadius+e.deltaY*0.02)); }, {passive:true});

    // Touch orbit
    renderer.domElement.addEventListener('touchstart', e => { if(e.touches.length===1){isDragging=true;lastMouse={x:e.touches[0].clientX,y:e.touches[0].clientY};} });
    renderer.domElement.addEventListener('touchend', () => isDragging=false);
    renderer.domElement.addEventListener('touchmove', e => {
        if(e.touches.length===1&&isDragging){
            cameraTheta -= (e.touches[0].clientX-lastMouse.x)*0.008;
            cameraPhi = Math.max(0.15,Math.min(Math.PI/2.1,cameraPhi+(e.touches[0].clientY-lastMouse.y)*0.006));
            lastMouse={x:e.touches[0].clientX,y:e.touches[0].clientY};
        }
    },{passive:true});

    // Raycasting vessel click
    renderer.domElement.addEventListener('click', e => {
        if (isDragging) return;
        const rect = renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
            ((e.clientX-rect.left)/rect.width)*2-1,
            -((e.clientY-rect.top)/rect.height)*2+1
        );
        const ray = new THREE.Raycaster();
        ray.setFromCamera(mouse, camera);
        const hits = ray.intersectObjects(vesselMeshes.map(v=>v.mesh).filter(Boolean), true);
        if (hits.length) {
            let obj = hits[0].object;
            while(obj.parent && !obj.userData.vesselKey) obj = obj.parent;
            if (obj.userData.vesselKey) selectVessel(obj.userData.vesselKey);
        }
    });

    initBloom();
    initWaterResources();
    animate();
}

// ═══════════════════════════════════════════
// CINEMATIC STATE
// ═══════════════════════════════════════════
let cinematicDrift = true;   // slow auto-pan when not dragging
let lastDragTime   = 0;
let priestMesh     = null;   // ref for breathing animation
let dynamicLights  = [];     // animated point lights per zone
let godRayMeshes   = [];     // volumetric light shaft planes
let waterMesh      = null;   // animated laver water
let sunCycle = { mesh:null, key:null, ambient:null };
let veilPanels = [];
let veilTearEvent = null;
let emberMeshes = [];
let smokeSpheres = [];
let priestPatrol = null; // { waypoints, wpIdx, progress, state, elapsed, refs }

const PRIEST_PATH = {
    outer: [
        { pos: [0, 8.5], action: 'stand', dur: 4, travel: 4 },
        { pos: [0, 1],   action: 'wash',  dur: 5, travel: 4 },
        { pos: [0, 3.5], action: 'offer', dur: 5, travel: 3 },
        { pos: [0, 8.5], action: 'stand', dur: 8, travel: 4 }
    ]
};

const ARM_DEFAULTS = {
    right: { upper: {z:-0.55,x:0.18}, fore: {z:-0.20,x:0.65}, hand: {z:-0.10,x:0.15} },
    left:  { upper: {z:0.50,x:0.15},  fore: {z:0.18,x:0.55},  hand: {z:0.10,x:0.135} }
};

const ACTION_POSES = {
    stand:   { upper:{z:[0,0],x:[0,0]}, fore:{z:[0,0],x:[0,0]}, hand:{z:[0,0],x:[0,0]} },
    wash:    { upper:{z:[-0.15,-0.15],x:[0.25,0.25]}, fore:{z:[0.1,-0.1],x:[-0.4,-0.4]}, hand:{z:[0.05,-0.05],x:[-0.3,-0.3]} },
    offer:   { upper:{z:[-0.35,0.1],x:[-0.45,0.1]}, fore:{z:[-0.1,0.1],x:[-0.5,0.1]}, hand:{z:[0,0.05],x:[-0.4,0]} },
};

let bloomRT, bloomRT2, bloomRT3, bloomScene, bloomCam, bloomQuad;
let brightMat, blurHMat, blurVMat, compositeMat;
let waterNormalCanvas, waterNormalCtx, waterNormalMap, waterEnvMap;

function initBloom() {
    const { w, h } = getMountSize();
    const w2 = Math.floor(w / 2), h2 = Math.floor(h / 2);
    bloomRT = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType });
    bloomRT2 = new THREE.WebGLRenderTarget(w2, h2, { type: THREE.HalfFloatType });
    bloomRT3 = new THREE.WebGLRenderTarget(w2, h2, { type: THREE.HalfFloatType });
    bloomScene = new THREE.Scene();
    bloomCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geo = new THREE.PlaneGeometry(2, 2);
    const vs = 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
    brightMat = new THREE.ShaderMaterial({
        uniforms: { tDiffuse: { value: null }, threshold: { value: 0.55 } },
        vertexShader: vs,
        fragmentShader: 'uniform sampler2D tDiffuse;uniform float threshold;varying vec2 vUv;void main(){vec4 c=texture2D(tDiffuse,vUv);float l=dot(c.rgb,vec3(0.299,0.587,0.114));gl_FragColor=vec4(c.rgb*smoothstep(threshold,1.0,l),1.0);}'
    });
    blurHMat = new THREE.ShaderMaterial({
        uniforms: { tDiffuse: { value: null }, step: { value: 2.0 / w2 } },
        vertexShader: vs,
        fragmentShader: 'uniform sampler2D tDiffuse;uniform float step;varying vec2 vUv;void main(){vec4 s=texture2D(tDiffuse,vUv);s+=texture2D(tDiffuse,vUv+vec2(-2.0,0.0)*step)*0.25;s+=texture2D(tDiffuse,vUv+vec2(-1.0,0.0)*step)*0.5;s+=texture2D(tDiffuse,vUv+vec2(1.0,0.0)*step)*0.5;s+=texture2D(tDiffuse,vUv+vec2(2.0,0.0)*step)*0.25;gl_FragColor=s*0.4;}'
    });
    blurVMat = new THREE.ShaderMaterial({
        uniforms: { tDiffuse: { value: null }, step: { value: 2.0 / h2 } },
        vertexShader: vs,
        fragmentShader: 'uniform sampler2D tDiffuse;uniform float step;varying vec2 vUv;void main(){vec4 s=texture2D(tDiffuse,vUv);s+=texture2D(tDiffuse,vUv+vec2(0.0,-2.0)*step)*0.25;s+=texture2D(tDiffuse,vUv+vec2(0.0,-1.0)*step)*0.5;s+=texture2D(tDiffuse,vUv+vec2(0.0,1.0)*step)*0.5;s+=texture2D(tDiffuse,vUv+vec2(0.0,2.0)*step)*0.25;gl_FragColor=s*0.4;}'
    });
    compositeMat = new THREE.ShaderMaterial({
        uniforms: { tScene: { value: null }, tBloom: { value: null }, intensity: { value: 1.2 } },
        vertexShader: vs,
        fragmentShader: 'uniform sampler2D tScene;uniform sampler2D tBloom;uniform float intensity;varying vec2 vUv;void main(){vec4 s=texture2D(tScene,vUv);vec4 b=texture2D(tBloom,vUv);gl_FragColor=vec4(s.rgb+b.rgb*intensity,1.0);}'
    });
    bloomQuad = new THREE.Mesh(geo, brightMat);
    bloomScene.add(bloomQuad);
}

function resizeBloom() {
    const { w, h } = getMountSize();
    const w2 = Math.floor(w / 2), h2 = Math.floor(h / 2);
    bloomRT.setSize(w, h);
    bloomRT2.setSize(w2, h2);
    bloomRT3.setSize(w2, h2);
    blurHMat.uniforms.step.value = 2.0 / w2;
    blurVMat.uniforms.step.value = 2.0 / h2;
}

function renderBloom() {
    renderer.setRenderTarget(bloomRT);
    renderer.render(scene, camera);
    renderer.setRenderTarget(bloomRT2);
    brightMat.uniforms.tDiffuse.value = bloomRT.texture;
    bloomQuad.material = brightMat;
    renderer.render(bloomScene, bloomCam);
    renderer.setRenderTarget(bloomRT3);
    blurHMat.uniforms.tDiffuse.value = bloomRT2.texture;
    bloomQuad.material = blurHMat;
    renderer.render(bloomScene, bloomCam);
    renderer.setRenderTarget(bloomRT2);
    blurVMat.uniforms.tDiffuse.value = bloomRT3.texture;
    bloomQuad.material = blurVMat;
    renderer.render(bloomScene, bloomCam);
    renderer.setRenderTarget(null);
    compositeMat.uniforms.tScene.value = bloomRT.texture;
    compositeMat.uniforms.tBloom.value = bloomRT2.texture;
    bloomQuad.material = compositeMat;
    renderer.render(bloomScene, bloomCam);
}

function initWaterResources() {
    waterNormalCanvas = document.createElement('canvas');
    waterNormalCanvas.width = waterNormalCanvas.height = 256;
    waterNormalCtx = waterNormalCanvas.getContext('2d');
    waterNormalMap = new THREE.CanvasTexture(waterNormalCanvas);
    waterNormalMap.wrapS = waterNormalMap.wrapT = THREE.RepeatWrapping;
    const sz = 64, faces = [];
    for (let i = 0; i < 6; i++) {
        const c = document.createElement('canvas'); c.width = c.height = sz;
        const ctx = c.getContext('2d');
        const g = ctx.createRadialGradient(sz/2, sz/2, 0, sz/2, sz/2, sz/2);
        g.addColorStop(0, '#d4af37'); g.addColorStop(0.3, '#8a6a30'); g.addColorStop(0.7, '#3a2010'); g.addColorStop(1, '#0a0604');
        ctx.fillStyle = g; ctx.fillRect(0, 0, sz, sz);
        for (let j = 0; j < 20; j++) { ctx.fillStyle = `rgba(212,175,55,${Math.random()*0.25})`; ctx.beginPath(); ctx.arc(Math.random()*sz, Math.random()*sz, Math.random()*2+1, 0, Math.PI*2); ctx.fill(); }
        faces.push(c);
    }
    waterEnvMap = new THREE.CubeTexture(faces);
    waterEnvMap.needsUpdate = true;
}

function updateWaterNormal(t) {
    const ctx = waterNormalCtx;
    ctx.fillStyle = '#8080ff'; // flat normal (0,0,1)
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 6; i++) {
        const cx = 128 + Math.sin(t*0.6 + i*1.8) * 80;
        const cy = 128 + Math.cos(t*0.5 + i*1.3) * 80;
        const rx = 18 + Math.sin(t*0.3 + i*0.7) * 6;
        const ry = 14 + Math.cos(t*0.4 + i*0.9) * 5;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
        g.addColorStop(0, '#a0a0ff'); g.addColorStop(0.5, '#8080ff'); g.addColorStop(1, '#7070e0');
        ctx.globalAlpha = 0.35; ctx.fillStyle = g; ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, i * 0.5, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    waterNormalMap.needsUpdate = true;
}

function initPriestPatrol(zoneKey) {
    const refs = { upper: [], forearm: [], hand: [] };
    priestMesh.traverse(c => {
        if (c.userData.armPart === 'upper') refs.upper.push(c);
        else if (c.userData.armPart === 'forearm') refs.forearm.push(c);
        else if (c.userData.armPart === 'hand') refs.hand.push(c);
    });
    priestPatrol = { waypoints: PRIEST_PATH[zoneKey] || PRIEST_PATH.outer, wpIdx: 0, progress: 0, state: 'travel', elapsed: 0, refs };
}

function applyActionPose(action, refs, blend) {
    const pose = ACTION_POSES[action] || ACTION_POSES.stand;
    ['upper','forearm','hand'].forEach(part => {
        [-1, 1].forEach(side => {
            const mesh = refs[part].find(m => m.userData.side === side);
            if (!mesh) return;
            const def = ARM_DEFAULTS[side === 1 ? 'right' : 'left'][part === 'forearm' ? 'fore' : part];
            const p = pose[part];
            const idx = side === 1 ? 0 : 1;
            if (p) {
                mesh.rotation.z += ((def.z + (p.z[idx]||0)) - mesh.rotation.z) * blend;
                mesh.rotation.x += ((def.x + (p.x[idx]||0)) - mesh.rotation.x) * blend;
            }
        });
    });
}

// ── SPATIAL AUDIO — zone soundscapes ──
let tabAudio = null;

function initTabAudio() {
    if (tabAudio) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const master = ctx.createGain();
        master.gain.value = 0.2;
        const panner = ctx.createStereoPanner();
        master.connect(panner);
        panner.connect(ctx.destination);
        master.panner = panner;

        const noise = (dur) => {
            const b = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
            const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
            return b;
        };

        const source = (gain, freq, type, q) => {
            const g = ctx.createGain(); g.gain.value = gain;
            const s = ctx.createBufferSource(); s.buffer = noise(3); s.loop = true;
            const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
            if (q) f.Q.value = q;
            s.connect(f); f.connect(g);
            g.connect(master);
            s.start();
            return { source: s, gainNode: g, filter: f, setGain: (v) => g.gain.setTargetAtTime(v, ctx.currentTime, 0.3) };
        };

        const osc = (freq, type, gain) => {
            const g = ctx.createGain(); g.gain.value = gain;
            const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq;
            o.connect(g); g.connect(master); o.start();
            return { osc: o, gainNode: g, setGain: (v) => g.gain.setTargetAtTime(v, ctx.currentTime, 0.3) };
        };

        const lfo = (target, depth, rate) => {
            const o = ctx.createOscillator(); o.frequency.value = rate;
            const g = ctx.createGain(); g.gain.value = depth;
            o.connect(g); g.connect(target); o.start();
        };

        const zones = {};

        // OUTER COURT: desert wind + fire crackle + distant camp
        zones.outer = (() => {
            const wind = source(0.05, 250, 'lowpass');
            lfo(wind.filter.frequency, 80, 0.04);
            const fire = source(0.02, 450, 'bandpass', 2);
            fire.gainNode.gain.value = 0.01;
            const fireLFO = ctx.createOscillator(); fireLFO.frequency.value = 7 + Math.random();
            const fireMod = ctx.createGain(); fireMod.gain.value = 0.02;
            fireLFO.connect(fireMod); fireMod.connect(fire.gainNode.gain); fireLFO.start();
            const camp = source(0.01, 100, 'lowpass');
            lfo(camp.gainNode.gain, 0.008, 0.03);
            return { setGain: (v) => { wind.setGain(v*0.05); fire.setGain(v*0.02); camp.setGain(v*0.01); } };
        })();

        // HOLY PLACE: incense crackle + oil hiss + low hum
        zones.holy = (() => {
            const crackle = source(0.01, 700, 'bandpass', 3);
            crackle.gainNode.gain.value = 0.005;
            const cLFO = ctx.createOscillator(); cLFO.frequency.value = 9;
            const cMod = ctx.createGain(); cMod.gain.value = 0.015;
            cLFO.connect(cMod); cMod.connect(crackle.gainNode.gain); cLFO.start();
            const hiss = source(0.008, 2500, 'bandpass', 2);
            lfo(hiss.gainNode.gain, 0.006, 0.5);
            const hum = osc(58, 'sine', 0.005);
            lfo(hum.osc.frequency, 1.5, 0.25);
            return { setGain: (v) => { crackle.setGain(v*0.015); hiss.setGain(v*0.008); hum.setGain(v*0.005); } };
        })();

        // HOLY OF HOLIES: divine resonance
        zones.holies = (() => {
            const tone = osc(53, 'sine', 0.003);
            lfo(tone.osc.frequency, 2, 0.15);
            lfo(tone.gainNode.gain, 0.002, 0.08);
            const harm = osc(106, 'sine', 0.001);
            lfo(harm.osc.frequency, 1.5, 0.12);
            const floor = source(0.002, 60, 'lowpass');
            lfo(floor.gainNode.gain, 0.002, 0.05);
            return { setGain: (v) => { tone.setGain(v*0.003); harm.setGain(v*0.001); floor.setGain(v*0.002); } };
        })();

        tabAudio = { ctx, master, zones, activeZone: null, panner };
    } catch (e) { console.warn('Audio unavailable:', e.message); }
}

function activateZoneAudio(zone) {
    if (!tabAudio) { initTabAudio(); if (!tabAudio) return; }
    if (tabAudio.activeZone === zone) return;
    if (tabAudio.activeZone && tabAudio.zones[tabAudio.activeZone]) {
        tabAudio.zones[tabAudio.activeZone].setGain(0);
    }
    tabAudio.activeZone = zone;
    if (tabAudio.zones[zone]) tabAudio.zones[zone].setGain(1);
}

function updateAudioPan(theta) {
    if (!tabAudio || !tabAudio.panner) return;
    tabAudio.panner.pan.setTargetAtTime(Math.sin(theta) * 0.4, tabAudio.ctx.currentTime, 0.1);
}

let _lastT = 0;

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const dt = Math.min(t - _lastT, 0.05); _lastT = t;

    // ── CINEMATIC SLOW DRIFT (resumes 3s after drag stops) ──
    const timeSinceDrag = performance.now() - lastDragTime;
    if (!isDragging && timeSinceDrag > 3000 && cinematicDrift) {
        cameraTheta += 0.0008 * Math.cos(t * 0.12); // gentle sinusoidal pan
        cameraPhi = Math.max(0.18, Math.min(Math.PI/2.2,
            cameraPhi + 0.00015 * Math.sin(t * 0.07))); // slight tilt breathe
    }

    // ── CAMERA BREATHING (subtle vertical bob) ──
    const breathe = Math.sin(t * 0.4) * 0.018;

    // ── CAMERA SMOOTH ORBIT ──
    const tx = cameraTarget.x + Math.sin(cameraTheta)*Math.sin(cameraPhi)*cameraRadius;
    const ty = cameraTarget.y + Math.cos(cameraPhi)*cameraRadius + breathe;
    const tz = cameraTarget.z + Math.cos(cameraTheta)*Math.sin(cameraPhi)*cameraRadius;
    camera.position.lerp(new THREE.Vector3(tx,ty,tz), 0.06);
    camera.lookAt(
        cameraTarget.x + Math.sin(t*0.09)*0.04,
        cameraTarget.y + 0.8 + breathe*0.3,
        cameraTarget.z
    );

    // ── PARTICLES ──
    particleSystems.forEach(ps => tickParticles(ps));

    // ── DYNAMIC LIGHTS — flicker & pulse ──
    dynamicLights.forEach(dl => {
        if (dl.type === 'flame') {
            const flicker = 0.7 + 0.3*Math.sin(t*9.1+dl.phase) + 0.15*Math.sin(t*17.3+dl.phase);
            dl.light.intensity = dl.baseIntensity * flicker;
            dl.light.position.x = dl.baseX + Math.sin(t*8+dl.phase)*0.04;
            dl.light.position.z = dl.baseZ + Math.cos(t*6+dl.phase)*0.03;
        }
        if (dl.type === 'shekinah') {
            const pulse = 0.65 + 0.35*Math.sin(t*1.8+dl.phase);
            dl.light.intensity = dl.baseIntensity * pulse;
            dl.light.color.setHSL(0.05 + Math.sin(t*0.5)*0.02, 0.9, 0.5+pulse*0.15);
        }
        if (dl.type === 'menorah') {
            const glow = 0.6 + 0.4*Math.sin(t*6.5+dl.phase);
            dl.light.intensity = dl.baseIntensity * glow;
        }
    });

    // ── SUNRISE TIME-OF-DAY CYCLE (outer court only) ──
    if (currentZone === 'outer' && sunCycle.key) {
        const dayT = (t % 120) / 120;
        const angle = dayT * Math.PI;
        sunCycle.key.position.set(Math.cos(angle) * 28, Math.sin(angle) * 20, 18);
        sunCycle.key.color.setHSL(0.08 - dayT * 0.06, 0.9, 0.4 + dayT * 0.3);
        sunCycle.key.intensity = 0.8 + dayT * 1.2;
        if (sunCycle.ambient) {
            sunCycle.ambient.color.setHSL(0.08 - dayT * 0.06, 0.4, 0.35 + dayT * 0.2);
        }
        if (sunCycle.mesh) {
            sunCycle.mesh.position.set(Math.cos(angle) * 28, Math.sin(angle) * 20, 18);
            sunCycle.mesh.material.opacity = 0.2 + dayT * 0.6;
        }
    }

    // ── GOD RAY ANIMATION ──
    godRayMeshes.forEach((gr, i) => {
        gr.material.opacity = (0.04 + 0.025*Math.sin(t*0.6+i*1.3)) * gr.userData.baseOpacity;
        gr.rotation.y += 0.0003 * Math.sin(t*0.2+i);
    });

    // ── WATER ANIMATION (procedural normal map) ──
    if (waterMesh) updateWaterNormal(t);

    // ── EMBER DRIFT (altar) ──
    emberMeshes.forEach(em => {
        em.position.add(em.userData.vel);
        const d = em.position.distanceTo(em.userData.basePos);
        if (d > 0.15) { em.position.copy(em.userData.basePos); em.userData.vel.set((Math.random()-.5)*.003, Math.random()*.002+.001, (Math.random()-.5)*.003); }
        em.material.opacity = 0.6 + 0.4 * (1 - d / 0.15);
    });

    // ── INCENSE SMOKE FLOAT ──
    smokeSpheres.forEach(s => {
        s.position.y += s.userData.speed;
        const p = (s.position.y - s.userData.baseY) / (s.userData.ceil - s.userData.baseY);
        s.material.opacity = 0.12 * (1 - p);
        if (s.position.y > s.userData.ceil) { s.position.y = s.userData.baseY; s.material.opacity = 0.12; }
    });

    // ── PRIEST RITUAL PATROL ──
    if (priestMesh) {
        const breathScale = 1 + Math.sin(t*1.1)*0.012;
        priestMesh.scale.set(breathScale, 1+Math.sin(t*1.1)*0.006, breathScale);
        priestMesh.children.forEach(child => {
            if (child.userData.isHead) child.rotation.x = -0.04 + Math.sin(t*0.9)*0.012;
        });
    }
    if (priestPatrol && priestMesh) {
        const pp = priestPatrol;
        const wp = pp.waypoints[pp.wpIdx];
        const prev = pp.waypoints[(pp.wpIdx - 1 + pp.waypoints.length) % pp.waypoints.length];
        const blend = Math.min(1, dt * 6);
        if (pp.state === 'travel') {
            pp.progress += dt / wp.travel;
            const p = pp.progress < 0.5 ? 2*pp.progress*pp.progress : 1 - Math.pow(-2*pp.progress+2,2)/2;
            priestMesh.position.x = prev.pos[0] + (wp.pos[0] - prev.pos[0]) * p;
            priestMesh.position.z = prev.pos[1] + (wp.pos[1] - prev.pos[1]) * p;
            const dx = wp.pos[0] - prev.pos[0], dz = wp.pos[1] - prev.pos[1];
            if (Math.abs(dx) > 0.001 || Math.abs(dz) > 0.001) priestMesh.rotation.y = Math.atan2(dx, dz);
            applyActionPose('stand', pp.refs, blend);
            if (pp.progress >= 1) { pp.progress = 0; pp.state = 'action'; pp.elapsed = 0; }
        } else {
            pp.elapsed += dt;
            const actionBlend = Math.min(1, blend + pp.elapsed * 2);
            applyActionPose(wp.action, pp.refs, actionBlend);
            if (pp.elapsed >= wp.dur) {
                pp.wpIdx = (pp.wpIdx + 1) % pp.waypoints.length;
                pp.state = 'travel'; pp.progress = 0;
            }
        }
    }

    // ── VESSEL ANIMATIONS ──
    vesselMeshes.forEach(v => {
        if (!v.mesh) return;
        // Flame flicker on emissive materials
        if (v.flicker) {
            const f = 0.55+0.45*Math.sin(t*11+v.foff);
            v.mesh.traverse(c => {
                if (c.isMesh && c.material && c.material.emissiveIntensity !== undefined) {
                    c.material.emissiveIntensity = 0.38*(0.65+0.7*f);
                }
                if (c.isMesh && c.userData.isFlame) {
                    c.material.opacity = (0.6+0.4*Math.sin(t*13+v.foff));
                    deformFlame(c, t + v.foff);
                }
            });
        }
        // Active vessel gentle float (skip highpriest when patrol is active — patrol controls position/rotation)
        if (v.key === activeVesselKey && (v.key !== 'highpriest' || !priestPatrol)) {
            v.mesh.position.y = v.baseY + Math.sin(t*1.4)*0.055;
            v.mesh.rotation.y = Math.sin(t*0.3)*0.04;
        }
    });

    // ── VEIL CLOTH ANIMATION (traveling wind wave) ──
    veilPanels.forEach(p => {
        const pos = p.geo.attributes.position;
        for (let j = 0; j < pos.count; j++) {
            const yy = pos.getY(j) / 2.6;
            pos.setZ(j, Math.sin(pos.getX(j) * 3 + t * 0.8 + p.phase) * 0.04 * (1 - yy));
        }
        pos.needsUpdate = true;
        p.geo.computeVertexNormals();
    });

    // ── SPATIAL AUDIO — camera-relative panning ──
    updateAudioPan(cameraTheta);

    // ── POST FX: vignette pulse on holies ──
    if (currentZone === 'holies') {
        const vigEl = document.getElementById('cinematic-vignette');
        if (vigEl) {
            const pulse = 0.55+0.12*Math.sin(t*0.8);
            vigEl.style.opacity = pulse;
        }
    }

    // ── VEIL TEARING EVENT ──
    if (veilTearEvent && veilTearEvent.phase === 'tearing') {
        const e = veilTearEvent;
        const p = Math.min((performance.now() - e.startTime) / e.duration, 1);
        e.panels.forEach((pn, i) => {
            pn.mesh.rotation.y = p * Math.PI * 0.35 * pn.side;
            pn.mesh.position.x += pn.side * 0.002;
            if (p > 0.5) pn.mesh.material.opacity = 1 - (p - 0.5) / 0.5;
        });
        const pos = e.particles.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            pos.setX(i, pos.getX(i) + e.vel[i].x);
            pos.setY(i, pos.getY(i) + e.vel[i].y);
            pos.setZ(i, pos.getZ(i) + e.vel[i].z);
        }
        pos.needsUpdate = true;
        e.particles.material.opacity = 1 - p;
        if (p >= 1) {
            e.panels.forEach(pn => { scene.remove(pn.mesh); pn.mesh.geometry.dispose(); pn.mesh.material.dispose(); });
            scene.remove(e.particles); e.particles.geometry.dispose(); e.particles.material.dispose();
            veilTearEvent = null;
        }
    }

    renderBloom();
}

// Track drag end for cinematic resume
const _origMouseUp = () => { isDragging=false; lastDragTime=performance.now(); };
window.removeEventListener('mouseup',()=>isDragging=false);
window.addEventListener('mouseup', _origMouseUp);

// Helper to register a dynamic light
function addDynLight(light, type, baseIntensity, phase) {
    dynamicLights.push({
        light, type, baseIntensity, phase: phase||Math.random()*Math.PI*2,
        baseX: light.position.x, baseZ: light.position.z
    });
    scene.add(light);
}

// ── SCENE BUILD — CINEMATIC ──
function disposeObject(obj) {
    if (!obj) return;
    if (obj.geometry) { obj.geometry.dispose(); }
    if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); });
        else { if (obj.material.map) obj.material.map.dispose(); obj.material.dispose(); }
    }
    if (obj.children) for (let i = obj.children.length - 1; i >= 0; i--) disposeObject(obj.children[i]);
}

function buildZoneScene(zoneKey) {
    // Full dispose to prevent memory leak
    while(scene.children.length) {
        const c = scene.children[0];
        scene.remove(c);
        if (c.type !== 'Scene') disposeObject(c);
    }
    vesselMeshes = []; particleSystems = [];
    dynamicLights = []; godRayMeshes = [];
    waterMesh = null; priestMesh = null; priestPatrol = null;
    emberMeshes = []; smokeSpheres = [];
    // Floor plan overlay cleanup
    const oldPlan = document.getElementById('floor-plan-overlay');
    if (oldPlan) oldPlan.remove();
    const Z = ZONE_DATA[zoneKey];

    scene.background = new THREE.Color(Z.bgColor);
    scene.fog = new THREE.FogExp2(Z.fogColor, zoneKey==='holies'?0.055:zoneKey==='holy'?0.038:0.018);

    // ── BASE LIGHTING ──
    const ambient = new THREE.AmbientLight(0xffeedd, Z.ambientInt * 0.7);
    scene.add(ambient);
    sunCycle.ambient = ambient;

    // Cinematic key light (angled dramatic)
    const key = new THREE.DirectionalLight(Z.sunColor, zoneKey==='outer'?1.6:0.8);
    sunCycle.key = key;
    key.position.set(zoneKey==='outer'?8:4, 14, zoneKey==='outer'?12:6);
    key.castShadow = true;
    key.shadow.mapSize.set(4096,4096);
    key.shadow.camera.left=-22; key.shadow.camera.right=22;
    key.shadow.camera.top=22; key.shadow.camera.bottom=-22;
    key.shadow.bias=-0.0005; key.shadow.radius=3;
    scene.add(key);

    // Fill light (opposite side, cool)
    const fill = new THREE.DirectionalLight(
        zoneKey==='outer'?0x3040a0:zoneKey==='holy'?0x8060ff:0x200010, 0.25);
    fill.position.set(-6, 5, -8);
    scene.add(fill);

    // ── ZONE-SPECIFIC CINEMATIC LIGHTS ──
    if (zoneKey==='outer') {
        // Warm golden sunrise light from east
        const sunrise = new THREE.DirectionalLight(0xff9933, 0.9);
        sunrise.position.set(0, 4, 18); scene.add(sunrise);
        // Fire glow from altar
        const altarGlow1 = new THREE.PointLight(0xff6600, 3.5, 9);
        altarGlow1.position.set(0, 2.2, 3.5);
        addDynLight(altarGlow1, 'flame', 3.5);
        const altarGlow2 = new THREE.PointLight(0xff9900, 2.0, 6);
        altarGlow2.position.set(0, 1.8, 3.5);
        addDynLight(altarGlow2, 'flame', 2.0, 1.2);
        // Laver water reflection
        const laverRefl = new THREE.PointLight(0x88ccee, 0.8, 3);
        laverRefl.position.set(0, 1.5, 1); scene.add(laverRefl);
        // God rays from east entrance
        addGodRays(0, 2, 7, 'outer');
    }

    if (zoneKey==='holy') {
        // 7 Menorah flame lights — one per branch
        const branchX = [-0.62,-0.38,-0.2,0,0.2,0.38,0.62];
        const branchY = [1.18,1.36,1.52,2.08,1.52,1.36,1.18];
        branchX.forEach((bx,i)=>{
            const fl = new THREE.PointLight(0xffcc44, 1.8, 4);
            fl.position.set(-1.8+bx, branchY[i], 0);
            fl.castShadow = true;
            fl.shadow.mapSize.set(512, 512);
            fl.shadow.bias = -0.002;
            fl.shadow.camera.near = 0.1;
            fl.shadow.camera.far = 5;
            addDynLight(fl, 'menorah', 1.8, i*0.9);
        });
        // Incense altar glow
        const incGlow = new THREE.PointLight(0xffaa44, 2.2, 5);
        incGlow.position.set(0, 1.6, -2.6);
        addDynLight(incGlow, 'flame', 2.2, 0.4);
        // Golden wall bounce — warm fill
        const wallBounce = new THREE.PointLight(0xd4a030, 1.2, 12);
        wallBounce.position.set(0, 2.5, 0); scene.add(wallBounce);
        // Incense smoke column
        addSmokeColumn(0, 1.4, -2.6, 18, 0.08);
        // God rays filtering through roof gaps
        addGodRays(0, 2.5, 0, 'holy');
    }

    if (zoneKey==='holies') {
        // Shekinah glory — multi-layered supernatural light
        const sh1 = new THREE.PointLight(0xff6020, 5.0, 12);
        sh1.position.set(0, 2.0, -1);
        addDynLight(sh1, 'shekinah', 5.0, 0);
        const sh2 = new THREE.PointLight(0xffe080, 3.5, 8);
        sh2.position.set(0, 2.8, -1);
        addDynLight(sh2, 'shekinah', 3.5, 1.4);
        const sh3 = new THREE.PointLight(0xff3000, 2.0, 6);
        sh3.position.set(0, 1.0, -1);
        addDynLight(sh3, 'shekinah', 2.0, 2.8);
        // Ark glow — mercy seat radiance
        const arkGlow = new THREE.PointLight(0xffd060, 4.0, 5);
        arkGlow.position.set(0, 1.2, -1);
        addDynLight(arkGlow, 'shekinah', 4.0, 0.7);
        // Censer smoke for priest
        addSmokeColumn(-1.5, 1.0, 0.5, 28, 0.06);
        // Shekinah vertical beam god ray
        addGodRays(0, 3, -1, 'holies');
    }

    // ── FLOOR — high-res with parallax suggestion ──
    const floorTex = getTex('sand'); floorTex.repeat.set(10,10);
    const floorMat = new THREE.MeshStandardMaterial({
        map:floorTex, roughness:.92, metalness:.04,
        color:zoneKey==='holies'?0x1a0404:zoneKey==='holy'?0x261c0a:0x4a3418,
        envMapIntensity:0.3
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60,60,1,1), floorMat);
    floor.rotation.x=-Math.PI/2; floor.position.y=-.01; floor.receiveShadow=true; scene.add(floor);

    // ── ENVIRONMENT ──
    buildEnv(zoneKey, Z);

    // ── VESSELS ──
    Z.vessels.forEach(v => buildVessel(v));

    // Store priest ref for breathing
    const priestVM = vesselMeshes.find(v=>v.key==='highpriest');
    if (priestVM) { priestMesh = priestVM.mesh; initPriestPatrol(zoneKey); }

    // ── CAMERA PRESET ──
    const cp = {
        outer: {r:13, th:0.12, ph:0.40},
        holy:  {r:9,  th:0.06, ph:0.33},
        holies:{r:7,  th:0.0,  ph:0.30}
    };
    const p = cp[zoneKey];
    cameraRadius=p.r; cameraTheta=p.th; cameraPhi=p.ph;
    cameraTarget={x:0,y:0,z:0};
    lastDragTime = 0; // immediately enable cinematic drift
}

// ── GOD RAYS — volumetric light shafts ──
function addGodRays(cx, cy, cz, zone) {
    const rayCount = zone==='holies'?5:4;
    const rayColor = zone==='holies'?0xff8030:zone==='holy'?0xffd080:0xffdd99;
    for (let i=0; i<rayCount; i++) {
        const angle = (i/rayCount)*Math.PI*2 + Math.random()*0.3;
        const spread = zone==='holies'?0.3:0.8;
        const rx = cx + Math.cos(angle)*spread;
        const rz = cz + Math.sin(angle)*spread;
        const rayH = zone==='holies'?4.5:3.5;
        const rayGeo = new THREE.CylinderGeometry(0.05+Math.random()*0.12, 0.4+Math.random()*0.4, rayH, 6, 1, true);
        const rayMat = new THREE.MeshBasicMaterial({
            color: rayColor, transparent:true,
            opacity: 0.06+Math.random()*0.04,
            side:THREE.DoubleSide, depthWrite:false, blending:THREE.AdditiveBlending
        });
        const ray = new THREE.Mesh(rayGeo, rayMat);
        ray.position.set(rx, cy+rayH*0.3, rz);
        ray.userData.baseOpacity = 1.0;
        // Tilt slightly
        ray.rotation.z = (Math.random()-0.5)*0.15;
        ray.rotation.x = (Math.random()-0.5)*0.1;
        scene.add(ray);
        godRayMeshes.push(ray);
    }
    // Central bright core beam
    if (zone==='holies') {
        const coreGeo = new THREE.CylinderGeometry(0.02, 0.15, 5, 8, 1, true);
        const coreMat = new THREE.MeshBasicMaterial({
            color:0xffffff, transparent:true, opacity:0.08,
            side:THREE.DoubleSide, depthWrite:false, blending:THREE.AdditiveBlending
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.set(cx, cy+1.5, cz); core.userData.baseOpacity=1.2;
        scene.add(core); godRayMeshes.push(core);
    }
}

// ── SMOKE SHADER — per-particle alpha & size lifecycle ──
const smokeVS = `
  attribute float alpha;
  attribute float size;
  varying float vAlpha;
  void main() {
    vAlpha = alpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (240.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }`;
const smokeFS = `
  varying float vAlpha;
  void main() {
    float d = 1.0 - length(gl_PointCoord - 0.5) * 2.0;
    gl_FragColor = vec4(0.84, 0.83, 0.75, smoothstep(0.0, 0.55, d) * vAlpha);
  }`;

// ── SMOKE COLUMN — rising animated particles ──
function addSmokeColumn(ox, oy, oz, count, speed) {
    const pos = new Float32Array(count*3);
    const vel = new Float32Array(count*3);
    const life = new Float32Array(count);
    const maxL = new Float32Array(count);
    const sizeArr = new Float32Array(count);
    const alphaArr = new Float32Array(count);
    for(let i=0;i<count;i++){
        resetSmoke(i,pos,vel,life,maxL,ox,oy,oz,speed);
        const t = life[i]/maxL[i];
        sizeArr[i] = 0.10 + 0.22*t;
        alphaArr[i] = 1 - Math.pow(t, 0.6);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizeArr, 1));
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphaArr, 1));
    const mat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: smokeVS, fragmentShader: smokeFS,
        transparent: true, depthWrite: false,
        blending: THREE.NormalBlending
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    particleSystems.push({pts,geo,pos,vel,life,maxL,ox,oy,oz,n:count,isSmoke:true,speed,size:sizeArr,alpha:alphaArr});
}

function resetSmoke(i,pos,vel,life,maxL,ox,oy,oz,speed) {
    pos[i*3]  = ox+(Math.random()-.5)*0.1;
    pos[i*3+1]= oy;
    pos[i*3+2]= oz+(Math.random()-.5)*0.1;
    vel[i*3]  = (Math.random()-.5)*0.006;
    vel[i*3+1]= (speed||0.06)*(0.5+Math.random());
    vel[i*3+2]= (Math.random()-.5)*0.006;
    maxL[i]   = Math.random()*120+60;
    life[i]   = Math.random()*maxL[i];
}

function tickParticles(ps) {
    const{pos,vel,life,maxL,ox,oy,oz,n}=ps;
    for(let i=0;i<n;i++){
        life[i]++;
        if(life[i]>=maxL[i]){
            if(ps.isSmoke) resetSmoke(i,pos,vel,life,maxL,ox,oy,oz,ps.speed);
            else resetP(i,pos,vel,life,maxL,ox,oy,oz);
            continue;
        }
        pos[i*3]  +=vel[i*3];
        pos[i*3+1]+=vel[i*3+1];
        pos[i*3+2]+=vel[i*3+2];
        if(ps.isSmoke) vel[i*3]*=1.004, vel[i*3+2]*=1.004;
    }
    ps.geo.attributes.position.needsUpdate=true;
    if(ps.isSmoke && ps.size){
        const a=ps.alpha, s=ps.size;
        for(let i=0;i<n;i++){
            const t = life[i]/maxL[i];
            a[i] = 1 - Math.pow(t, 0.6);
            s[i] = 0.10 + 0.22*t;
        }
        ps.geo.attributes.alpha.needsUpdate=true;
        ps.geo.attributes.size.needsUpdate=true;
    }
}

// ─── FLAME TURBULENCE ENGINE ─────────────────────────────
function flameNoise3D(x, y, z) {
    return 0.5 * Math.sin(x*2.1 + z*1.3 + y*0.7)
         + 0.25 * Math.sin(x*4.3 + z*3.7 + y*2.1)
         + 0.125 * Math.sin(x*8.7 + z*7.3 + y*5.9)
         + 0.0625 * Math.sin(x*16.1 + z*13.9 + y*11.3);
}
function deformFlame(mesh, t) {
    const geo = mesh.geometry, pos = geo.attributes.position;
    const base = mesh.userData.basePos;
    if (!base || !pos) return;
    const phase = mesh.userData.phase || 0;
    const arr = pos.array;
    const windDrift = Math.sin(t * 1.7 + phase) * 0.035;
    let maxY = 0;
    for (let i = 1; i < arr.length; i += 3) { if (base[i] > maxY) maxY = base[i]; }
    const h = maxY || 0.01;
    for (let i = 0; i < arr.length; i += 3) {
        const bx = base[i], by = base[i+1], bz = base[i+2];
        const falloff = 0.3 + 0.7 * (by / h);
        const n = flameNoise3D(bx * 7 + t * 3.2 + phase, by * 5 + t * 2.1, bz * 7 + phase);
        const d = n * 0.055 * falloff;
        const w = windDrift * (by / h) * falloff;
        arr[i] = bx + (bx === 0 ? 0 : d * (bx > 0 ? 1 : -1)) + w;
        arr[i+1] = by + d * 0.12;
        arr[i+2] = bz + (bz === 0 ? 0 : d * (bz > 0 ? 1 : -1));
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
}

function buildEnv(zoneKey, Z) {

    if (zoneKey==='outer') {
        // ── CINEMATIC SKY — layered gradient dome ──
        // Outer sky (dark deep blue-amber at horizon)
        const skyGeo = new THREE.SphereGeometry(65,32,16);
        const skyMat = new THREE.MeshBasicMaterial({color:0x160e04, side:THREE.BackSide});
        scene.add(new THREE.Mesh(skyGeo, skyMat));

        // Horizon glow — warm amber band
        const horizonGeo = new THREE.CylinderGeometry(63,65,8,32,1,true);
        const horizonMat = new THREE.MeshBasicMaterial({
            color:0x8a4400, transparent:true, opacity:0.55,
            side:THREE.DoubleSide, blending:THREE.AdditiveBlending
        });
        const horizon = new THREE.Mesh(horizonGeo, horizonMat);
        horizon.position.y = -4; scene.add(horizon);

        // Sun disk (east — behind viewer)
        const sunGeo = new THREE.CircleGeometry(3.5, 24);
        const sunMat = new THREE.MeshBasicMaterial({
            color:0xffdd88, transparent:true, opacity:0.65,
            blending:THREE.AdditiveBlending
        });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        sun.position.set(0, 8, 32); scene.add(sun);
        sunCycle.mesh = sun;
        // Sun halo
        const haloMat = new THREE.MeshBasicMaterial({
            color:0xff8800, transparent:true, opacity:0.18,
            blending:THREE.AdditiveBlending, side:THREE.DoubleSide
        });
        scene.add(new THREE.Mesh(new THREE.RingGeometry(3.5,9,32), haloMat));

        // ── DESERT TERRAIN ──
        const sandTex=getTex('sand'); sandTex.repeat.set(12,12);
        const terrain = new THREE.Mesh(new THREE.PlaneGeometry(90,90,24,24),
            new THREE.MeshStandardMaterial({map:sandTex,roughness:.96,metalness:.02,color:0x6a4e2a}));
        // Subtle terrain height variation
        const tp = terrain.geometry.attributes.position;
        for(let i=0;i<tp.count;i++){
            const x=tp.getX(i),z=tp.getZ(i),r=Math.sqrt(x*x+z*z);
            if(r>12) tp.setY(i,(Math.random()-.5)*0.15*Math.min(1,(r-12)/8));
        }
        terrain.geometry.computeVertexNormals();
        terrain.rotation.x=-Math.PI/2; terrain.position.y=-.02;
        terrain.receiveShadow=true; scene.add(terrain);

        // Sand dunes at perimeter
        const sandMat=new THREE.MeshStandardMaterial({map:sandTex,roughness:.96,color:0x5a3e1e});
        for(let i=0;i<18;i++){
            const dune=new THREE.Mesh(new THREE.SphereGeometry(2.5+Math.random()*3,10,8),sandMat);
            dune.scale.set(1.4+Math.random()*.6, 0.18+Math.random()*.08, 1.2+Math.random()*.5);
            const a=Math.random()*Math.PI*2, r=20+Math.random()*10;
            dune.position.set(Math.cos(a)*r,-.28,Math.sin(a)*r);
            scene.add(dune);
        }

        // ── LINEN CURTAIN WALLS — cloth-like texture ──
        const linTex=getTex('linen'); linTex.repeat.set(5,1.8);
        const linMat=new THREE.MeshStandardMaterial({
            map:linTex,roughness:.90,metalness:0,
            side:THREE.DoubleSide,color:0xece4c4
        });
        // North/South walls with slight cloth sag (subdivided)
        [[-9,1.3,0,.15,2.6,18],[9,1.3,0,.15,2.6,18]].forEach(([x,y,z,w,h,d])=>{
            const wg=new THREE.BoxGeometry(w,h,d,1,6,1);
            // Cloth sag on vertices
            const wp=wg.attributes.position;
            for(let i=0;i<wp.count;i++){
                const yy=wp.getY(i)/h;
                // Sag more at middle-bottom, less at top (attached to rod)
                const sag=(1-yy)*0.06*Math.sin((wp.getZ(i)/d+0.5)*Math.PI);
                wp.setX(i,wp.getX(i)+(Math.random()-.5)*0.004);
            }
            wg.computeVertexNormals();
            const m=new THREE.Mesh(wg,linMat);
            m.position.set(x,y,z); m.receiveShadow=true; m.castShadow=true; scene.add(m);
        });
        // West wall
        const wWall=new THREE.Mesh(new THREE.BoxGeometry(18,.15,2.6,8,1,1),linMat);
        wWall.position.set(0,1.3,-9); wWall.rotation.y=Math.PI/2;
        // correct orientation
        const wwMesh=new THREE.Mesh(new THREE.BoxGeometry(18,2.6,.15),linMat);
        wwMesh.position.set(0,1.3,-9); scene.add(wwMesh);

        // ── PILLARS ──
        for(let i=-8;i<=8;i+=1.5){
            addPillar(i,2.6,9,'pillars'); addPillar(i,2.6,-9,'pillars');
        }
        for(let j=-8;j<=8;j+=1.5){
            addPillar(-9,2.6,j,'pillars'); addPillar(9,2.6,j,'pillars');
        }

        // Top cords
        const cordMat=new THREE.MeshStandardMaterial({color:0xc0aa70,roughness:.8,metalness:.1});
        [[0,2.66,9],[0,2.66,-9]].forEach(([x,y,z])=>{
            const cord=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,18.2,8),cordMat);
            cord.rotation.z=Math.PI/2; cord.position.set(x,y,z); scene.add(cord);
        });
        const cordW=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,18.2,8),cordMat);
        cordW.position.set(-9,2.66,0); scene.add(cordW);
        const cordE=cordW.clone(); cordE.position.set(9,2.66,0); scene.add(cordE);

        // Fire smoke column from altar
        addSmokeColumn(0, 2.8, 3.5, 35, 0.09);

        // Distant tent/camp suggestion dots
        const campMat=new THREE.MeshBasicMaterial({color:0x6a4010,transparent:true,opacity:.4});
        for(let c=0;c<20;c++){
            const tent=new THREE.Mesh(new THREE.ConeGeometry(.4+Math.random()*.3,.6+Math.random()*.4,6),campMat);
            const a=Math.random()*Math.PI*2, r=28+Math.random()*12;
            tent.position.set(Math.cos(a)*r,.2,Math.sin(a)*r); scene.add(tent);
        }
    }

    if (zoneKey==='holy'||zoneKey==='holies') {
        const goldTex=getTex('gold'); goldTex.repeat.set(2,1);
        const goldWallMat=new THREE.MeshStandardMaterial({
            map:goldTex,roughness:.22,metalness:.95,color:0x5a4200,
            emissive:new THREE.Color(.06,.035,.0),emissiveIntensity:.4
        });

        // ── GOLD ACACIA PLANK WALLS ──
        [[-4,1.3,0,.12,2.6,12],[4,1.3,0,.12,2.6,12],[0,1.3,-6.5,8,2.6,.12]].forEach(([x,y,z,w,h,d])=>{
            const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),goldWallMat);
            m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; scene.add(m);
        });

        // Vertical acacia plank divisions
        const grooveMat=new THREE.MeshBasicMaterial({color:0x2a1600,transparent:true,opacity:.45,depthWrite:false});
        for(let gi=-3.5;gi<=3.5;gi+=.5){
            const gv=new THREE.Mesh(new THREE.BoxGeometry(.018,2.6,.13),grooveMat);
            gv.position.set(gi,1.3,-6.44); scene.add(gv);
        }

        // ── 4-LAYER ROOF ──
        [[0xddd8c0,2.68,0],[0x7a5432,2.63,.04],[0x5a2020,2.58,.08],[0x3a2010,2.53,.12]].forEach(([col,y,off])=>{
            const roof=new THREE.Mesh(new THREE.BoxGeometry(8+off,0.09,12+off),
                new THREE.MeshStandardMaterial({color:col,roughness:.92,side:THREE.DoubleSide}));
            roof.position.y=y; scene.add(roof);
        });

        // ── DOORWAY FRAME + HANGING SCREEN ──
        [[-2.1,1.3,5.96],[2.1,1.3,5.96]].forEach(([x,y,z])=>{
            const post=new THREE.Mesh(new THREE.CylinderGeometry(.08,.09,2.7,14),goldWallMat);
            post.position.set(x,y,z); scene.add(post);
        });
        const lintel=new THREE.Mesh(new THREE.BoxGeometry(4.5,.22,.3),goldWallMat);
        lintel.position.set(0,2.74,5.96); scene.add(lintel);

        // Screen panels (5 colours for doorway)
        const scrColors=[0x1a1060,0x4a0858,0x721010,0x1a1060,0xe0d8c0];
        for(let si=0;si<5;si++){
            const sp=new THREE.Mesh(new THREE.PlaneGeometry(.82,2.44),
                new THREE.MeshStandardMaterial({color:scrColors[si],roughness:.88,side:THREE.DoubleSide,transparent:true,opacity:.9}));
            sp.position.set(-2.05+si*.82+si*.01,1.28,5.92); scene.add(sp);
        }
        // Screen rod
        const scrRod=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,4.6,10),goldWallMat);
        scrRod.rotation.z=Math.PI/2; scrRod.position.set(0,2.52,5.92); scene.add(scrRod);

        // ── GOLDEN FLOOR REFLECTION (additive shimmer) ──
        const reflMat=new THREE.MeshBasicMaterial({
            color:0xd4a020,transparent:true,opacity:.07,
            blending:THREE.AdditiveBlending,depthWrite:false
        });
        const refl=new THREE.Mesh(new THREE.PlaneGeometry(8,12),reflMat);
        refl.rotation.x=-Math.PI/2; refl.position.y=.005; scene.add(refl);

        // ── INCENSE SMOKE HAZE — fills room ──
        const hazeGeo=new THREE.SphereGeometry(7,16,12);
        const hazeMat=new THREE.MeshBasicMaterial({
            color:0xd0c8a0,transparent:true,opacity:.03,
            side:THREE.BackSide,depthWrite:false
        });
        scene.add(new THREE.Mesh(hazeGeo,hazeMat));
    }

    if (zoneKey==='holies') {
        // ── HOLY OF HOLIES INNER CUBE ──
        const hMat=new THREE.MeshStandardMaterial({
            color:0x0e0310,roughness:.6,metalness:.3,
            emissive:new THREE.Color(.06,.0,.04),emissiveIntensity:.7
        });
        [[-4.6,1.3,0,.12,2.6,10],[4.6,1.3,0,.12,2.6,10],[0,1.3,-4.9,9.4,2.6,.12]].forEach(([x,y,z,w,h,d])=>{
            const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),hMat);
            m.position.set(x,y,z); scene.add(m);
        });

        // ── SHEKINAH GLORY — multi-layer volumetric ──
        // Outer crimson haze
        [
            [8.0,  0x440808, 0.10],
            [5.5,  0x880808, 0.08],
            [3.5,  0xcc4400, 0.06],
            [2.0,  0xffaa00, 0.05],
            [1.0,  0xffffff, 0.04],
        ].forEach(([r,col,op])=>{
            const sm=new THREE.Mesh(new THREE.SphereGeometry(r,28,28),
                new THREE.MeshBasicMaterial({
                    color:col,transparent:true,opacity:op,
                    side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false
                }));
            sm.position.set(0,1.2,-1); scene.add(sm);
        });

        // Ceiling divine fire
        const ceilFireMat=new THREE.MeshBasicMaterial({
            color:0xff8800,transparent:true,opacity:.12,
            blending:THREE.AdditiveBlending,depthWrite:false
        });
        const ceilFire=new THREE.Mesh(new THREE.CircleGeometry(3,24),ceilFireMat);
        ceilFire.rotation.x=-Math.PI/2; ceilFire.position.set(0,2.58,-1); scene.add(ceilFire);

        // Floor radiance pool
        const floorGlowMat=new THREE.MeshBasicMaterial({
            color:0xff4400,transparent:true,opacity:.1,
            blending:THREE.AdditiveBlending,depthWrite:false
        });
        const floorGlow=new THREE.Mesh(new THREE.CircleGeometry(2.5,24),floorGlowMat);
        floorGlow.rotation.x=-Math.PI/2; floorGlow.position.set(0,.005,-1); scene.add(floorGlow);
    }
}

// ══════════════════════════════════════════
//  PROCEDURAL TEXTURE LIBRARY
// ══════════════════════════════════════════
const _TEX = {};
function getTex(name) {
    if (_TEX[name]) return _TEX[name];
    const c = document.createElement('canvas'); c.width = 256; c.height = 256;
    const ctx = c.getContext('2d');
    if (name === 'gold') {
        const g = ctx.createLinearGradient(0,0,256,256);
        g.addColorStop(0,'#3a2200'); g.addColorStop(.18,'#b87a00');
        g.addColorStop(.38,'#f5d86a'); g.addColorStop(.55,'#d4af37');
        g.addColorStop(.75,'#a07800'); g.addColorStop(1,'#5a3800');
        ctx.fillStyle=g; ctx.fillRect(0,0,256,256);
        // fine grain lines
        for(let i=0;i<256;i+=2){ctx.globalAlpha=.06;ctx.fillStyle=i%6?'#fff':'#000';ctx.fillRect(0,i,256,1);}
        ctx.globalAlpha=1;
    } else if (name === 'bronze') {
        const g = ctx.createLinearGradient(0,0,256,256);
        g.addColorStop(0,'#1a0e04'); g.addColorStop(.3,'#6a3c14');
        g.addColorStop(.6,'#a06030'); g.addColorStop(1,'#3a1c06');
        ctx.fillStyle=g; ctx.fillRect(0,0,256,256);
        for(let i=0;i<256;i+=3){ctx.globalAlpha=.08;ctx.fillStyle='#000';ctx.fillRect(0,i,256,1);}
        ctx.globalAlpha=1;
    } else if (name === 'linen') {
        ctx.fillStyle='#e0d8c0'; ctx.fillRect(0,0,256,256);
        for(let i=0;i<256;i+=4){ctx.globalAlpha=.12;ctx.fillStyle='#8a7050';ctx.fillRect(0,i,256,2);}
        for(let i=0;i<256;i+=4){ctx.globalAlpha=.08;ctx.fillStyle='#8a7050';ctx.fillRect(i,0,2,256);}
        ctx.globalAlpha=1;
    } else if (name === 'sand') {
        ctx.fillStyle='#4a3418'; ctx.fillRect(0,0,256,256);
        for(let i=0;i<400;i++){ctx.globalAlpha=Math.random()*.14;ctx.fillStyle=Math.random()>.5?'#7a5828':'#201006';const x=Math.random()*256,y=Math.random()*256,r=Math.random()*4+1;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
        ctx.globalAlpha=1;
    } else if (name === 'water') {
        const g=ctx.createRadialGradient(128,128,10,128,128,100);
        g.addColorStop(0,'#b8d8e8'); g.addColorStop(.5,'#4888a0'); g.addColorStop(1,'#183850');
        ctx.fillStyle=g; ctx.fillRect(0,0,256,256);
        for(let i=0;i<15;i++){ctx.globalAlpha=.18;ctx.strokeStyle='#c8e8f8';ctx.lineWidth=.8;ctx.beginPath();const cx=Math.random()*256,cy=Math.random()*128+64;ctx.ellipse(cx,cy,Math.random()*30+8,Math.random()*6+2,Math.random()*.6,0,Math.PI*2);ctx.stroke();}
        ctx.globalAlpha=1;
    } else if (name === 'skin') {
        const g=ctx.createRadialGradient(128,100,10,128,128,100);
        g.addColorStop(0,'#e8b880'); g.addColorStop(.5,'#c8905a'); g.addColorStop(1,'#8a5028');
        ctx.fillStyle=g; ctx.fillRect(0,0,256,256);
    } else if (name === 'veil') {
        // 4 colour stripes — blue purple scarlet white
        const cols=['#100858','#400460','#6a0808','#c8c0a0'];
        cols.forEach((col,i)=>{ctx.fillStyle=col;ctx.fillRect(i*64,0,64,256);});
        // Gold thread suggestion
        ctx.globalAlpha=.28; ctx.strokeStyle='#d4af37'; ctx.lineWidth=1.2;
        for(let x=18;x<256;x+=64){for(let y=20;y<256;y+=32){ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+8,y+6,x+12,y+12,x,y+20);ctx.stroke();}}
        ctx.globalAlpha=1;
    } else if (name === 'wood') {
        const g=ctx.createLinearGradient(0,0,256,0);
        g.addColorStop(0,'#3a1e08'); g.addColorStop(.4,'#7a4020'); g.addColorStop(.7,'#5a2c10'); g.addColorStop(1,'#2e1604');
        ctx.fillStyle=g; ctx.fillRect(0,0,256,256);
        for(let i=0;i<256;i+=8){ctx.globalAlpha=.07;ctx.fillStyle=i%16?'#fff':'#000';ctx.fillRect(0,i,256,4);}
        ctx.globalAlpha=1;
    }
    _TEX[name] = new THREE.CanvasTexture(c);
    _TEX[name].wrapS = _TEX[name].wrapT = THREE.RepeatWrapping;
    return _TEX[name];
}

function goldMat(emissInt=0.35) {
    return new THREE.MeshStandardMaterial({map:getTex('gold'),roughness:.15,metalness:.98,emissive:new THREE.Color(.18,.1,.0),emissiveIntensity:emissInt});
}
function bronzeMat() {
    return new THREE.MeshStandardMaterial({map:getTex('bronze'),roughness:.55,metalness:.82,emissive:new THREE.Color(.06,.03,.0),emissiveIntensity:.2});
}

// ══════════════════════════════════════════
//  PILLAR (improved — lathe profile)
// ══════════════════════════════════════════
function addPillar(x, h, z, vesselKey) {
    const ms = [];
    const pts = [];
    for(let i=0;i<=16;i++){const t=i/16; pts.push(new THREE.Vector2(.095-.025*t, t*h));}
    const p = new THREE.Mesh(new THREE.LatheGeometry(pts,14), bronzeMat());
    p.position.set(x,0,z); p.castShadow=true; scene.add(p); ms.push(p);
    const sock = new THREE.Mesh(new THREE.CylinderGeometry(.13,.14,.14,12), bronzeMat());
    sock.position.set(x,.07,z); scene.add(sock); ms.push(sock);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.16,12),
        new THREE.MeshStandardMaterial({color:0xd8d8d8,roughness:.22,metalness:.95}));
    cap.position.set(x,h+.08,z); scene.add(cap); ms.push(cap);
    const band = new THREE.Mesh(new THREE.TorusGeometry(.1,.025,8,16),
        new THREE.MeshStandardMaterial({color:0xd0d0d0,roughness:.2,metalness:.95}));
    band.position.set(x,h-.18,z); band.rotation.x=Math.PI/2; scene.add(band); ms.push(band);
    if (vesselKey) ms.forEach(m => { m.userData.vesselKey = vesselKey; });
}

function buildVessel(v) {
    const group = new THREE.Group();
    group.userData.vesselKey = v.key;
    group.position.set(v.pos[0], v.pos[1], v.pos[2]);

    let mesh;
    if      (v.shape==='menorah')    mesh = buildMenorah();
    else if (v.shape==='ark')        mesh = buildArk();
    else if (v.shape==='priest')     mesh = buildHighPriest();
    else if (v.shape==='table')      mesh = buildShowbreadTable();
    else if (v.shape==='gate')       mesh = buildGate(v.size[0], v.size[1]);
    else if (v.shape==='veil')       mesh = buildVeil(v.size[0], v.size[1]);
    else if (v.shape==='cylinder')   mesh = buildLaver();
    else if (v.shape==='pillar-row') { scene.add(group); vesselMeshes.push({key:v.key,mesh:group,flicker:false,foff:0,baseY:v.pos[1]}); return; }
    else if (v.shape==='box' && v.key==='altar')   mesh = buildAltar();
    else if (v.shape==='box' && v.key==='incense') mesh = buildIncenseAltar();
    else if (v.shape==='box' && v.key==='mercyseat') mesh = buildMercySeat();
    else mesh = new THREE.Mesh(new THREE.BoxGeometry(v.size[0],v.size[1],v.size[2]), goldMat());

    mesh.traverse(c => { if(c.isMesh){ c.userData.vesselKey=v.key; c.castShadow=true; c.receiveShadow=true; } });
    group.add(mesh);

    if (v.hasFlame) {
        const ps = buildFlame(v.pos[0], v.pos[1]+v.size[1]*0.5+0.2, v.pos[2]);
        particleSystems.push(ps); scene.add(ps.pts);
    }

    // Gold glow ring on floor
    const ring = new THREE.Mesh(
        new THREE.RingGeometry(v.size[0]*0.65, v.size[0]*0.82, 40),
        new THREE.MeshBasicMaterial({color:0xd4af37,side:THREE.DoubleSide,transparent:true,opacity:0})
    );
    ring.rotation.x = -Math.PI/2; ring.position.y = -0.01; ring.userData.isRing=true;
    group.add(ring);

    scene.add(group);
    vesselMeshes.push({key:v.key, mesh:group, flicker:v.hasFlame, foff:Math.random()*Math.PI*2, baseY:v.pos[1]});
}

// ─── ALTAR OF BURNT OFFERING ──────────────────────────
function buildAltar() {
    const g = new THREE.Group();
    const bMat = bronzeMat();
    // Outer box shell
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2,1.0,2.2), bMat);
    body.position.set(0,.5,0); g.add(body);
    // Hollow inner cavity (dark ash)
    const inner = new THREE.Mesh(new THREE.BoxGeometry(1.85,.65,1.85),
        new THREE.MeshStandardMaterial({color:0x080402,roughness:1,metalness:0}));
    inner.position.set(0,.55,0); g.add(inner);
    // Bronze grating — horizontal bars
    for(let i=-4;i<=4;i++){
        const bar = new THREE.Mesh(new THREE.BoxGeometry(.055,.055,2.0), bMat);
        bar.position.set(i*.24,.97,0); g.add(bar);
        const bar2 = new THREE.Mesh(new THREE.BoxGeometry(2.0,.055,.055), bMat);
        bar2.position.set(0,.97,i*.24); g.add(bar2);
    }
    // 4 horns — lathe tapered cones
    const hornPts = [new THREE.Vector2(.1,0),new THREE.Vector2(.09,.1),new THREE.Vector2(.07,.22),new THREE.Vector2(.04,.36),new THREE.Vector2(.02,.44),new THREE.Vector2(0,.48)];
    const hornGeo = new THREE.LatheGeometry(hornPts,10);
    [[-1.06,-1.06],[1.06,-1.06],[-1.06,1.06],[1.06,1.06]].forEach(([hx,hz])=>{
        const horn = new THREE.Mesh(hornGeo, bMat);
        horn.position.set(hx,1.0,hz); g.add(horn);
    });
    // Carrying poles (2 acacia wood poles)
    const poleMat = new THREE.MeshStandardMaterial({map:getTex('wood'),roughness:.65,metalness:.05});
    [-1.0,1.0].forEach(zOff=>{
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,3.8,10),poleMat);
        pole.rotation.z = Math.PI/2; pole.position.set(0,.32,zOff*.72); g.add(pole);
    });
    // Ash & ember pile inside
    const ashMat = new THREE.MeshStandardMaterial({color:0x1a1006,roughness:1,metalness:0});
    const ash = new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),ashMat);
    ash.scale.y=.18; ash.position.set(0,.62,0); g.add(ash);
    // Glowing embers
    for(let i=0;i<12;i++){
        const em = new THREE.Mesh(new THREE.SphereGeometry(.03,4,4),
            new THREE.MeshBasicMaterial({color:Math.random()>.5?0xff4400:0xff8800,transparent:true,opacity:.85}));
        em.position.set((Math.random()-.5)*1.4,.72,(Math.random()-.5)*1.4); g.add(em);
        em.userData.ember = true;
        em.userData.basePos = em.position.clone();
        em.userData.vel = new THREE.Vector3((Math.random()-.5)*.003, Math.random()*.002+.001, (Math.random()-.5)*.003);
        emberMeshes.push(em);
    }
    // Fire point light
    const fl = new THREE.PointLight(0xff6600,2.5,6); fl.position.set(0,1.8,0); g.add(fl);
    return g;
}

// ─── BRONZE LAVER ──────────────────────────────────────
function buildLaver() {
    const g = new THREE.Group();
    const bMat = bronzeMat();
    // Bowl — lathe rotated profile
    const bowlPts = [];
    for(let i=0;i<=24;i++){
        const a = (i/24)*Math.PI;
        const r = .28 + .38*Math.sin(a);
        const y = .55*(1-Math.cos(a))*.5 - .28;
        bowlPts.push(new THREE.Vector2(r,y));
    }
    const bowl = new THREE.Mesh(new THREE.LatheGeometry(bowlPts.slice(0,20),28), bMat);
    g.add(bowl);
    // Water surface
    const wMat = new THREE.MeshStandardMaterial({map:getTex('water'),roughness:.05,metalness:.9,emissive:new THREE.Color(0,.04,.06),emissiveIntensity:.3,normalMap:waterNormalMap,envMap:waterEnvMap,envMapIntensity:1.2});
    const water = new THREE.Mesh(new THREE.CircleGeometry(.55,32),wMat);
    water.rotation.x=-Math.PI/2; water.position.y=.29; g.add(water);
    waterMesh = water;
    // Central pedestal stand
    const stPts = [];
    for(let i=0;i<=14;i++){const t=i/14; stPts.push(new THREE.Vector2(.1-.04*Math.sin(t*Math.PI), -t*.72));}
    const stand = new THREE.Mesh(new THREE.LatheGeometry(stPts,14), bMat);
    stand.position.y=0; g.add(stand);
    // Base foot
    const foot = new THREE.Mesh(new THREE.TorusGeometry(.2,.04,8,24),bMat);
    foot.rotation.x=Math.PI/2; foot.position.y=-.72; g.add(foot);
    // Reflection shimmer light
    const wl = new THREE.PointLight(0x4898b8,.8,3); wl.position.set(0,.5,0); g.add(wl);
    return g;
}

// ─── EASTERN GATE ──────────────────────────────────────
function buildGate(w, h) {
    const g = new THREE.Group();
    const linTex = getTex('linen'); linTex.repeat.set(2,2);
    // 4 colour panels — blue, purple, scarlet, white linen
    const cols = [0x181a80,0x620070,0x8a1010,0xd8d0b0];
    const panW = w/4 - .05;
    cols.forEach((col,i)=>{
        const pMat = new THREE.MeshStandardMaterial({color:col,map:i===3?linTex:null,roughness:.9,metalness:0,side:THREE.DoubleSide});
        const panel = new THREE.Mesh(new THREE.PlaneGeometry(panW,h), pMat);
        panel.position.x = -w/2+panW/2+i*panW+i*.05; g.add(panel);
        // Fold shadow line
        const fold = new THREE.Mesh(new THREE.BoxGeometry(.012,h,.015),
            new THREE.MeshBasicMaterial({color:0x000,transparent:true,opacity:.3}));
        fold.position.x = panel.position.x+panW/2; g.add(fold);
    });
    // Top horizontal beam
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,w+.3,14), bronzeMat());
    beam.rotation.z=Math.PI/2; beam.position.y=h/2+.06; g.add(beam);
    // Two pillar posts
    [-w/2,w/2].forEach(x=>{
        const post = new THREE.Mesh(new THREE.CylinderGeometry(.07,.08,h+.12,14), bronzeMat());
        post.position.set(x,0,0); g.add(post);
    });
    return g;
}

// ─── GOLDEN MENORAH ────────────────────────────────────
function buildMenorah() {
    const g = new THREE.Group();
    const gMat = goldMat(.5);

    // Ornate tripod base — three curved feet via LatheGeometry
    const basePts = [
        new THREE.Vector2(0,0),new THREE.Vector2(.38,0),new THREE.Vector2(.42,.04),
        new THREE.Vector2(.36,.1),new THREE.Vector2(.22,.18),new THREE.Vector2(.12,.28),new THREE.Vector2(.08,.38)
    ];
    const base = new THREE.Mesh(new THREE.LatheGeometry(basePts,24), gMat);
    g.add(base);
    // Decorative knob on base
    const knob = new THREE.Mesh(new THREE.SphereGeometry(.09,12,12),gMat);
    knob.position.y=.38; g.add(knob);

    // Central shaft with 3 almond knobs via LatheGeometry
    const shaftPts = [];
    for(let i=0;i<=50;i++){
        const t=i/50; const y=t*1.62+.42;
        // Three bulge knobs at t=.22, .5, .78
        const bulge=[.22,.5,.78].reduce((acc,bt)=>{
            const d=Math.abs(t-bt); return acc+(d<.055?.07*Math.cos(d/.055*Math.PI/2):0);
        },0);
        shaftPts.push(new THREE.Vector2(.058+bulge, y));
    }
    const shaft = new THREE.Mesh(new THREE.LatheGeometry(shaftPts,18), gMat);
    g.add(shaft);

    // 6 curved branches via TubeGeometry + QuadraticBezierCurve3
    const branchDefs = [
        {x:-.62,y:1.18,baseY:.72}, {x:-.38,y:1.36,baseY:.88}, {x:-.2,y:1.52,baseY:1.04},
        {x:.62, y:1.18,baseY:.72}, {x:.38, y:1.36,baseY:.88}, {x:.2,  y:1.52,baseY:1.04},
    ];
    branchDefs.forEach((b,idx)=>{
        const side = idx<3?-1:1;
        const ctrl = new THREE.Vector3(side*.28, b.baseY+.24, 0);
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, b.baseY, 0),
            ctrl,
            new THREE.Vector3(b.x, b.y-.15, 0)
        );
        const tube = new THREE.TubeGeometry(curve,16,.032,10,false);
        g.add(new THREE.Mesh(tube, gMat));

        // Almond cup at branch tip — lathe
        const cupPts=[new THREE.Vector2(0,0),new THREE.Vector2(.05,0),new THREE.Vector2(.075,.04),
            new THREE.Vector2(.08,.1),new THREE.Vector2(.06,.18),new THREE.Vector2(.03,.24),new THREE.Vector2(0,.27)];
        const cup = new THREE.Mesh(new THREE.LatheGeometry(cupPts,12), gMat);
        cup.position.set(b.x, b.y-.1, 0); g.add(cup);

        // Knob below cup
        const kn = new THREE.Mesh(new THREE.SphereGeometry(.042,10,10),gMat);
        kn.position.set(b.x,b.y-.18,0); g.add(kn);

        addFlameTip(g, b.x, b.y+.12, 0, (idx + 1) * 0.8);
    });

    // Center cup (tallest position)
    const cCupPts=[new THREE.Vector2(0,0),new THREE.Vector2(.055,0),new THREE.Vector2(.08,.04),
        new THREE.Vector2(.09,.12),new THREE.Vector2(.07,.22),new THREE.Vector2(.04,.3),new THREE.Vector2(0,.32)];
    const cCup = new THREE.Mesh(new THREE.LatheGeometry(cCupPts,12), gMat);
    cCup.position.set(0,1.68,0); g.add(cCup);
    addFlameTip(g,0,2.08,0, 6 * 0.8);

    // Central glow light for entire menorah
    const gl = new THREE.PointLight(0xffcc44,2.8,5); gl.position.set(0,1.6,0); g.add(gl);
    return g;
}

function addFlameTip(group, x, y, z, phase) {
    phase = phase || 0;
    function makePts(scale, height) {
        const pts = []; const steps = 14;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            pts.push(new THREE.Vector2(scale * Math.sin(t * Math.PI * 0.85 + 0.15), t * height));
        } return pts;
    }
    const fPts = makePts(0.068, 0.38);
    const fGeo = new THREE.LatheGeometry(fPts, 12);
    const fMat = new THREE.MeshBasicMaterial({color:0xff8800,transparent:true,opacity:.88,depthWrite:false});
    const flame = new THREE.Mesh(fGeo, fMat);
    flame.position.set(x, y, z);
    flame.userData.isFlame = true; flame.userData.phase = phase;
    flame.userData.basePos = new Float32Array(fGeo.attributes.position.array);
    group.add(flame);

    const iPts = makePts(0.033, 0.22);
    const iGeo = new THREE.LatheGeometry(iPts, 10);
    const core = new THREE.Mesh(iGeo, new THREE.MeshBasicMaterial({color:0xffee50,transparent:true,opacity:.95,depthWrite:false}));
    core.position.set(x, y + 0.02, z);
    core.userData.isFlame = true; core.userData.phase = phase;
    core.userData.basePos = new Float32Array(iGeo.attributes.position.array);
    group.add(core);

    const pl = new THREE.PointLight(0xffcc44, 0.5, 1.6);
    pl.position.set(x, y + 0.18, z);
    group.add(pl);
}

// ─── TABLE OF SHOWBREAD ────────────────────────────────
function buildShowbreadTable() {
    const g = new THREE.Group();
    const gMat = goldMat(.3);
    const h=.88, w=1.4, d=.72;

    // Table top slab
    const top = new THREE.Mesh(new THREE.BoxGeometry(w,.08,d), gMat);
    top.position.y=h; g.add(top);
    // Gold crown molding around top edge
    const crown = new THREE.Mesh(new THREE.BoxGeometry(w+.08,.1,d+.08), gMat);
    crown.position.y=h+.06; g.add(crown);

    // 4 legs — lathe ornate profile
    const legPts=[new THREE.Vector2(.065,0),new THREE.Vector2(.07,.06),new THREE.Vector2(.055,.3),
        new THREE.Vector2(.06,.5),new THREE.Vector2(.065,.56),new THREE.Vector2(.058,.88)];
    const legGeo = new THREE.LatheGeometry(legPts,12);
    [[-w/2+.08,d/2-.08],[w/2-.08,d/2-.08],[-w/2+.08,-d/2+.08],[w/2-.08,-d/2+.08]].forEach(([lx,lz])=>{
        const leg=new THREE.Mesh(legGeo,gMat); leg.position.set(lx,0,lz); g.add(leg);
    });
    // Cross braces
    const bMat=gMat;
    [d/2-.08,-(d/2-.08)].forEach(bz=>{
        const bar=new THREE.Mesh(new THREE.BoxGeometry(w-.16,.04,.04),bMat);
        bar.position.set(0,.44,bz); g.add(bar);
    });
    // 12 shewbread loaves — 2 rows of 6
    const breadMat=new THREE.MeshStandardMaterial({color:0xd4a858,roughness:.85,metalness:0,map:getTex('wood')});
    for(let i=0;i<6;i++){
        [-d/4, d/4].forEach(bz=>{
            const loafPts=[new THREE.Vector2(0,0),new THREE.Vector2(.1,.02),new THREE.Vector2(.12,.07),
                new THREE.Vector2(.1,.13),new THREE.Vector2(.06,.16),new THREE.Vector2(0,.17)];
            const loaf=new THREE.Mesh(new THREE.LatheGeometry(loafPts,10),breadMat);
            loaf.scale.set(1,.7,1.35); loaf.rotation.z=Math.PI/2;
            loaf.position.set(-w/2+.16+i*(w-.32)/5, h+.13, bz); g.add(loaf);
        });
    }
    // Small gold vessels/cups
    const cupPts=[new THREE.Vector2(0,0),new THREE.Vector2(.05,0),new THREE.Vector2(.06,.04),new THREE.Vector2(.05,.1),new THREE.Vector2(.03,.12),new THREE.Vector2(0,.13)];
    for(let i=0;i<4;i++){
        const vessel=new THREE.Mesh(new THREE.LatheGeometry(cupPts,10),gMat);
        vessel.position.set(-w/2+.18+i*.34,h+.08,0); g.add(vessel);
    }
    return g;
}

// ─── GOLDEN ALTAR OF INCENSE ───────────────────────────
function buildIncenseAltar() {
    const g = new THREE.Group();
    const gMat = goldMat(.45);

    // Body — lathe for smooth profile
    const bodyPts=[new THREE.Vector2(0,0),new THREE.Vector2(.34,0),new THREE.Vector2(.36,.03),
        new THREE.Vector2(.34,.5),new THREE.Vector2(.34,1.0),new THREE.Vector2(.36,1.05)];
    const body=new THREE.Mesh(new THREE.LatheGeometry(bodyPts,18), gMat);
    g.add(body);
    // Base molding
    const base=new THREE.Mesh(new THREE.BoxGeometry(.76,.1,.76),gMat); base.position.y=-.05; g.add(base);
    // Top crown
    const top=new THREE.Mesh(new THREE.BoxGeometry(.76,.1,.76),gMat); top.position.y=1.08; g.add(top);
    // 4 horns
    const hornPts=[new THREE.Vector2(0,0),new THREE.Vector2(.065,0),new THREE.Vector2(.056,.1),
        new THREE.Vector2(.04,.22),new THREE.Vector2(.02,.32),new THREE.Vector2(0,.34)];
    const hornGeo=new THREE.LatheGeometry(hornPts,10);
    [[-0.3,-.3],[-.3,.3],[.3,-.3],[.3,.3]].forEach(([hx,hz])=>{
        const horn=new THREE.Mesh(hornGeo,gMat); horn.position.set(hx,1.12,hz); g.add(horn);
    });
    // Gold rings for carrying poles
    const ringGeo=new THREE.TorusGeometry(.065,.022,10,18);
    [[-0.34,.7],[.34,.7],[-.34,.35],[.34,.35]].forEach(([rx,ry])=>{
        const r=new THREE.Mesh(ringGeo,gMat); r.position.set(rx,ry,0); r.rotation.y=Math.PI/2; g.add(r);
    });
    // Incense flames + smoke suggestion
    addFlameTip(g,-.06,1.28,.05, 0.5);
    addFlameTip(g,.06,1.26,-.04, 1.5);
    addFlameTip(g,0,1.3,0, 2.5);
    // Smoke wisps (semi-transparent spheres rising)
    const smkMat=new THREE.MeshBasicMaterial({color:0xd8d4c0,transparent:true,opacity:.12,depthWrite:false});
    [0,.12,.26,.42].forEach((dy,i)=>{
        const s=new THREE.Mesh(new THREE.SphereGeometry(.08+dy*.18,8,8),smkMat);
        s.position.set((i%2===0?-.04:.04),1.5+dy*1.1,0); g.add(s);
        s.userData.smoke = true;
        s.userData.baseY = s.position.y;
        s.userData.ceil = 3.2;
        s.userData.speed = 0.002 + Math.random() * 0.002;
        smokeSpheres.push(s);
    });
    return g;
}

// ─── INNER VEIL ────────────────────────────────────────
function buildVeil(w, h) {
    const g = new THREE.Group();
    const vTex = getTex('veil'); vTex.repeat.set(1,1);
    // 4 hanging panels with subtle cloth drape
    [0x181270,0x52065a,0x701010,0xc8c0a8].forEach((col,i)=>{
        const pGeo = new THREE.PlaneGeometry(w/4-.04, h, 4, 20);
        const pMat=new THREE.MeshStandardMaterial({
            color:col,map:i===3?vTex:null,roughness:.9,metalness:.04,
            side:THREE.DoubleSide,transparent:true,opacity:.96
        });
        const panel=new THREE.Mesh(pGeo,pMat);
        panel.position.set(-w/2+(w/4/2)+i*(w/4), 0, 0); g.add(panel);
        veilPanels.push({ geo: pGeo, phase: i * 1.7 });
    });
    // 4 golden pillars
    const pMat=goldMat(.2);
    [-w/2+.02, -w/6, w/6, w/2-.02].forEach(x=>{
        const pillar=new THREE.Mesh(new THREE.CylinderGeometry(.075,.085,h+.22,14),pMat);
        pillar.position.set(x,0,0); g.add(pillar);
        // Pillar capital
        const cap=new THREE.Mesh(new THREE.SphereGeometry(.1,10,10),pMat);
        cap.position.set(x,h/2+.12,0); g.add(cap);
    });
    // Top rod
    const rod=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,w+.2,16),goldMat(.2));
    rod.rotation.z=Math.PI/2; rod.position.y=h/2+.12; g.add(rod);
    // Cherubim gold glow suggestions on veil
    const cMat=new THREE.MeshBasicMaterial({color:0xd4af37,transparent:true,opacity:.15,side:THREE.DoubleSide});
    [-w/4, w/4].forEach(x=>{
        const cGlow=new THREE.Mesh(new THREE.SphereGeometry(.34,10,10),cMat);
        cGlow.position.set(x,.2,.02); g.add(cGlow);
    });
    return g;
}

// ── VEIL TEARING EVENT ──
function triggerVeilTearing() {
    const vg = vesselMeshes.find(v => v.key === 'veil');
    if (!vg) return false;
    const panels = [];
    vg.mesh.traverse(c => { if (c.isMesh && c.geometry.type==='PlaneGeometry') panels.push(c); });
    if (panels.length < 4) return false;
    veilPanels = [];
    const w = new THREE.Vector3();
    const data = panels.map((p,i)=>({mesh:p,worldPos:p.getWorldPosition(w).clone(),origRot:p.rotation.clone(),side:i<2?-1:1}));
    panels.forEach(p => { if (p.parent) p.parent.remove(p); });
    const count = 40; const pos = new Float32Array(count*3); const vel = [];
    for (let i = 0; i < count; i++) { pos[i*3]=(Math.random()-.5)*3; pos[i*3+1]=Math.random()*2.5; pos[i*3+2]=-1.5+(Math.random()-.5)*1.5; vel.push({x:(Math.random()-.5)*.015,y:Math.random()*.012+.005,z:(Math.random()-.5)*.015}); }
    const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    const pMat = new THREE.PointsMaterial({color:0xd4af37,size:0.05,transparent:true,opacity:1,blending:THREE.AdditiveBlending,depthWrite:false});
    const particles = new THREE.Points(pGeo, pMat);
    veilTearEvent = { panels: data, particles, vel, startTime: -1, duration: 2600, phase: 'pending' };
    return true;
}

function initVeilTearScene() {
    const e = veilTearEvent; if (!e || e.phase !== 'pending') return;
    e.panels.forEach((p,i) => { p.mesh.position.set(-1.86+i*1.24, 1.25, -1.5); p.mesh.rotation.set(0,0,0); p.mesh.material.transparent = true; p.mesh.material.depthWrite = false; scene.add(p.mesh); });
    scene.add(e.particles);
    e.startTime = performance.now(); e.phase = 'tearing';
}

// ─── ARK OF THE COVENANT ───────────────────────────────
function buildArk() {
    const g = new THREE.Group();
    const gMat = goldMat(.55);
    const gLidMat = new THREE.MeshStandardMaterial({map:getTex('gold'),roughness:.08,metalness:1,emissive:new THREE.Color(.25,.14,.0),emissiveIntensity:.7});
    const woodMat = new THREE.MeshStandardMaterial({map:getTex('wood'),roughness:.65,metalness:.05});

    // Chest body — wood core visible at edges
    const chest=new THREE.Mesh(new THREE.BoxGeometry(1.65,.82,.95),gMat);
    chest.position.set(0,.41,0); g.add(chest);
    // Vertical wood ribs suggestion
    for(let i=-2;i<=2;i++){
        const rib=new THREE.Mesh(new THREE.BoxGeometry(.04,.82,.96),woodMat);
        rib.position.set(i*.34,.41,0); g.add(rib);
    }
    // Gold crown molding along chest top
    const crown=new THREE.Mesh(new THREE.BoxGeometry(1.72,.07,1.0),gMat);
    crown.position.set(0,.85,0); g.add(crown);
    // Mercy Seat lid
    const lid=new THREE.Mesh(new THREE.BoxGeometry(1.7,.08,1.0),gLidMat);
    lid.position.set(0,.88,0); g.add(lid);
    // Lid edge crown
    const lidEdge=new THREE.Mesh(new THREE.BoxGeometry(1.78,.06,1.08),gLidMat);
    lidEdge.position.set(0,.90,0); g.add(lidEdge);

    // 4 carrying rings
    const rGeo=new THREE.TorusGeometry(.08,.028,12,22);
    [[-0.74,.3],[.74,.3],[-.74,.55],[.74,.55]].forEach(([rx,ry])=>{
        const r=new THREE.Mesh(rGeo,gMat); r.position.set(rx,ry,.5); r.rotation.y=Math.PI/2; g.add(r);
    });
    // Two carrying poles
    const poleMat=new THREE.MeshStandardMaterial({map:getTex('wood'),roughness:.55,metalness:.08});
    [.3,.55].forEach(y=>{
        const pole=new THREE.Mesh(new THREE.CylinderGeometry(.046,.046,3.1,12),poleMat);
        pole.rotation.z=Math.PI/2; pole.position.set(0,y,.5); g.add(pole);
        // Gold bands on poles
        [-1.1,0,1.1].forEach(bx=>{
            const band=new THREE.Mesh(new THREE.CylinderGeometry(.054,.054,.07,12),gMat);
            band.rotation.z=Math.PI/2; band.position.set(bx,y,.5); g.add(band);
        });
    });

    // Two Cherubim — detailed humanoid figures on Mercy Seat
    [-0.5,0.5].forEach((cx,idx)=>{
        const cb=new THREE.Group();
        const side=idx===0?-1:1;

        // Body torso — lathe robed
        const tPts=[new THREE.Vector2(0,0),new THREE.Vector2(.12,.02),new THREE.Vector2(.14,.1),
            new THREE.Vector2(.12,.24),new THREE.Vector2(.09,.38),new THREE.Vector2(.06,.48),new THREE.Vector2(.04,.54)];
        const torso=new THREE.Mesh(new THREE.LatheGeometry(tPts,12),gMat);
        cb.add(torso);
        // Head
        const head=new THREE.Mesh(new THREE.SphereGeometry(.11,12,12),gMat);
        head.position.set(0,.66,0); cb.add(head);
        // Wing inner — broad curved plane
        const wShape=new THREE.Shape();
        wShape.moveTo(0,.44); wShape.quadraticCurveTo(side*.38,.76,side*.1,.92);
        wShape.quadraticCurveTo(side*.18,.62,0,.44);
        const wGeo=new THREE.ShapeGeometry(wShape);
        const wing=new THREE.Mesh(wGeo,new THREE.MeshStandardMaterial({
            color:0xd4af37,map:getTex('gold'),roughness:.22,metalness:.95,side:THREE.DoubleSide,transparent:true,opacity:.78
        }));
        cb.add(wing);
        // Wing outer — second feather layer
        const wShape2=new THREE.Shape();
        wShape2.moveTo(0,.42); wShape2.quadraticCurveTo(side*.56,.68,side*.22,.85);
        wShape2.quadraticCurveTo(side*.28,.56,0,.42);
        const wing2=new THREE.Mesh(new THREE.ShapeGeometry(wShape2),new THREE.MeshStandardMaterial({
            color:0xc8a020,roughness:.28,metalness:.9,side:THREE.DoubleSide,transparent:true,opacity:.65
        }));
        wing2.position.z=.02; cb.add(wing2);

        cb.position.set(cx,.88,0);
        cb.rotation.y=idx===0?-Math.PI/6:Math.PI/6; // face inward toward mercy seat
        g.add(cb);
    });

    // Shekinah glow
    const glowMat=new THREE.MeshBasicMaterial({color:0xffcc44,transparent:true,opacity:.16,side:THREE.DoubleSide});
    const glow=new THREE.Mesh(new THREE.RingGeometry(.2,.8,28),glowMat);
    glow.rotation.x=-Math.PI/2; glow.position.set(0,.92,0); g.add(glow);

    // Shekinah point light
    const sl=new THREE.PointLight(0xffdd88,3.5,5); sl.position.set(0,1.5,0); g.add(sl);
    return g;
}

// ─── MERCY SEAT (standalone lid with cherubim) ──────────────
function buildMercySeat() {
    const g = new THREE.Group();
    const gMat = goldMat(.55);
    const gLidMat = new THREE.MeshStandardMaterial({map:getTex('gold'),roughness:.08,metalness:1,emissive:new THREE.Color(.25,.14,.0),emissiveIntensity:.7});

    // Mercy Seat lid — pure gold slab
    const lid = new THREE.Mesh(new THREE.BoxGeometry(1.7,.08,1.0), gLidMat);
    g.add(lid);
    const lidEdge = new THREE.Mesh(new THREE.BoxGeometry(1.78,.06,1.08), gLidMat);
    lidEdge.position.y = .07; g.add(lidEdge);

    // Two Cherubim — detailed hammered gold figures
    [-0.45, 0.45].forEach((cx, idx) => {
        const cb = new THREE.Group();
        const side = idx === 0 ? -1 : 1;

        // Torso
        const tPts = [new THREE.Vector2(0,0), new THREE.Vector2(.12,.02), new THREE.Vector2(.14,.1),
            new THREE.Vector2(.12,.24), new THREE.Vector2(.09,.38), new THREE.Vector2(.06,.48), new THREE.Vector2(.04,.54)];
        const torso = new THREE.Mesh(new THREE.LatheGeometry(tPts,12), gMat);
        cb.add(torso);
        // Head
        const head = new THREE.Mesh(new THREE.SphereGeometry(.11,12,12), gMat);
        head.position.set(0,.66,0); cb.add(head);
        // Wing inner
        const wShape = new THREE.Shape();
        wShape.moveTo(0,.44); wShape.quadraticCurveTo(side*.38,.76,side*.1,.92);
        wShape.quadraticCurveTo(side*.18,.62,0,.44);
        const wing = new THREE.Mesh(new THREE.ShapeGeometry(wShape), new THREE.MeshStandardMaterial({
            color:0xd4af37, map:getTex('gold'), roughness:.22, metalness:.95, side:THREE.DoubleSide, transparent:true, opacity:.78
        }));
        cb.add(wing);
        // Wing outer
        const wShape2 = new THREE.Shape();
        wShape2.moveTo(0,.42); wShape2.quadraticCurveTo(side*.56,.68,side*.22,.85);
        wShape2.quadraticCurveTo(side*.28,.56,0,.42);
        const wing2 = new THREE.Mesh(new THREE.ShapeGeometry(wShape2), new THREE.MeshStandardMaterial({
            color:0xc8a020, roughness:.28, metalness:.9, side:THREE.DoubleSide, transparent:true, opacity:.65
        }));
        wing2.position.z=.02; cb.add(wing2);

        cb.position.set(cx, .88, 0);
        cb.rotation.y = idx===0 ? -Math.PI/6 : Math.PI/6;
        g.add(cb);
    });

    // Shekinah glow ring
    const glowMat = new THREE.MeshBasicMaterial({color:0xffcc44, transparent:true, opacity:.16, side:THREE.DoubleSide});
    const glow = new THREE.Mesh(new THREE.RingGeometry(.2,.9,28), glowMat);
    glow.rotation.x = -Math.PI/2; glow.position.y = -.01; g.add(glow);

    // Radiance light
    const sl = new THREE.PointLight(0xffdd88, 3.5, 5);
    sl.position.set(0, 1.5, 0); g.add(sl);
    return g;
}

// ═══════════════════════════════════════════════════════
// REALISTIC FACE TEXTURE — painted on canvas, no external files
// ═══════════════════════════════════════════════════════
function makeFaceTexture() {
    const c = document.createElement('canvas'); c.width = 512; c.height = 512;
    const ctx = c.getContext('2d');

    // Base skin — warm olive Middle-Eastern tone
    const skinGrad = ctx.createRadialGradient(256,220,30,256,256,200);
    skinGrad.addColorStop(0,'#d4956a');
    skinGrad.addColorStop(.4,'#c07a50');
    skinGrad.addColorStop(.8,'#a05a30');
    skinGrad.addColorStop(1,'#7a3a18');
    ctx.fillStyle = skinGrad; ctx.fillRect(0,0,512,512);

    // Forehead lighter highlight
    const fhGrad = ctx.createRadialGradient(256,160,10,256,190,90);
    fhGrad.addColorStop(0,'rgba(230,180,130,0.55)');
    fhGrad.addColorStop(1,'rgba(230,180,130,0)');
    ctx.fillStyle = fhGrad; ctx.fillRect(0,0,512,512);

    // Cheekbone highlights
    [140,372].forEach(cx=>{
        const cg = ctx.createRadialGradient(cx,260,5,cx,260,50);
        cg.addColorStop(0,'rgba(240,190,140,0.4)'); cg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=cg; ctx.fillRect(0,0,512,512);
    });

    // === EYES ===
    // Eye whites
    [[168,235],[344,235]].forEach(([ex,ey])=>{
        ctx.fillStyle='#e8ddd0';
        ctx.beginPath(); ctx.ellipse(ex,ey,28,14,0,0,Math.PI*2); ctx.fill();
        // Iris — dark brown
        ctx.fillStyle='#3a1a06';
        ctx.beginPath(); ctx.arc(ex,ey,11,0,Math.PI*2); ctx.fill();
        // Pupil
        ctx.fillStyle='#0a0602';
        ctx.beginPath(); ctx.arc(ex,ey,6,0,Math.PI*2); ctx.fill();
        // Catchlight
        ctx.fillStyle='rgba(255,255,255,0.7)';
        ctx.beginPath(); ctx.arc(ex-4,ey-4,3,0,Math.PI*2); ctx.fill();
        // Upper eyelid crease
        ctx.strokeStyle='#5a2a10'; ctx.lineWidth=2.5;
        ctx.beginPath(); ctx.ellipse(ex,ey-3,30,12,.05,Math.PI,Math.PI*2); ctx.stroke();
        // Lower lid
        ctx.strokeStyle='rgba(90,42,16,0.4)'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.ellipse(ex,ey+2,27,10,0,0,Math.PI); ctx.stroke();
    });

    // === EYEBROWS — thick, dark, slightly arched ===
    [[168,200],[344,200]].forEach(([bx,by],i)=>{
        ctx.fillStyle='#2a1206';
        ctx.beginPath();
        if(i===0){ ctx.moveTo(bx-32,by+5); ctx.quadraticCurveTo(bx,by-14,bx+32,by+2); ctx.quadraticCurveTo(bx,by-6,bx-32,by+12); }
        else { ctx.moveTo(bx+32,by+5); ctx.quadraticCurveTo(bx,by-14,bx-32,by+2); ctx.quadraticCurveTo(bx,by-6,bx+32,by+12); }
        ctx.closePath(); ctx.fill();
    });

    // === NOSE ===
    // Nose bridge shadow
    ctx.strokeStyle='rgba(90,45,15,0.35)'; ctx.lineWidth=4;
    ctx.beginPath(); ctx.moveTo(210,200); ctx.lineTo(230,290); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(302,200); ctx.lineTo(282,290); ctx.stroke();
    // Nose tip
    const ntGrad=ctx.createRadialGradient(256,310,8,256,310,26);
    ntGrad.addColorStop(0,'#c07858'); ntGrad.addColorStop(1,'rgba(160,90,48,0)');
    ctx.fillStyle=ntGrad; ctx.fillRect(0,0,512,512);
    // Nostrils
    [220,292].forEach(nx=>{
        ctx.fillStyle='rgba(50,18,6,0.55)';
        ctx.beginPath(); ctx.ellipse(nx,318,10,7,nx<256?-.4:.4,0,Math.PI*2); ctx.fill();
    });
    // Nose highlight
    ctx.fillStyle='rgba(220,170,120,0.45)';
    ctx.beginPath(); ctx.ellipse(256,298,6,14,0,0,Math.PI*2); ctx.fill();

    // === MOUTH ===
    // Lips — slightly parted, solemn
    ctx.fillStyle='#8a3a20';
    ctx.beginPath(); ctx.ellipse(256,365,35,10,0,0,Math.PI*2); ctx.fill();
    // Upper lip darker
    ctx.fillStyle='#6a2810';
    ctx.beginPath(); ctx.moveTo(218,360); ctx.quadraticCurveTo(256,348,294,360); ctx.quadraticCurveTo(270,368,256,366); ctx.quadraticCurveTo(242,368,218,360); ctx.closePath(); ctx.fill();
    // Cupid's bow highlight
    ctx.fillStyle='rgba(180,100,60,0.4)';
    ctx.beginPath(); ctx.ellipse(256,356,14,4,0,0,Math.PI*2); ctx.fill();
    // Mouth line (closed, serious)
    ctx.strokeStyle='rgba(60,18,6,0.6)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(220,362); ctx.quadraticCurveTo(256,368,292,362); ctx.stroke();

    // === BEARD — full, dark, slightly grey-streaked ===
    // Base beard shape
    ctx.fillStyle='rgba(30,14,4,0.85)';
    ctx.beginPath(); ctx.moveTo(160,380); ctx.quadraticCurveTo(200,470,256,490); ctx.quadraticCurveTo(312,470,352,380); ctx.quadraticCurveTo(310,415,256,420); ctx.quadraticCurveTo(202,415,160,380); ctx.closePath(); ctx.fill();
    // Beard strands — directional lines
    ctx.strokeStyle='rgba(80,45,20,0.3)'; ctx.lineWidth=1.5;
    for(let s=0;s<18;s++){
        const bx=180+s*9.5; const by1=380+Math.random()*20;
        ctx.beginPath(); ctx.moveTo(bx,by1); ctx.quadraticCurveTo(bx+(Math.random()-0.5)*15,by1+40,256,490); ctx.stroke();
    }
    // Grey streak highlights
    ctx.strokeStyle='rgba(180,160,140,0.22)'; ctx.lineWidth=2;
    [220,256,290].forEach(bx=>{
        ctx.beginPath(); ctx.moveTo(bx,400); ctx.quadraticCurveTo(bx+(Math.random()-0.5)*8,440,256,488); ctx.stroke();
    });
    // Moustache
    ctx.fillStyle='rgba(28,12,4,0.88)';
    ctx.beginPath(); ctx.ellipse(256,375,38,9,0,0,Math.PI*2); ctx.fill();

    // === FACE SHADOW/DEPTH ===
    // Jaw shadow
    const jawShadow=ctx.createLinearGradient(0,380,0,500);
    jawShadow.addColorStop(0,'rgba(0,0,0,0)'); jawShadow.addColorStop(1,'rgba(0,0,0,0.35)');
    ctx.fillStyle=jawShadow; ctx.fillRect(0,380,512,132);
    // Temple shadows
    [['rgba(0,0,0,0.2)',100,256],['rgba(0,0,0,0.2)',412,256]].forEach(([col,sx,sy])=>{
        const ts=ctx.createRadialGradient(sx,sy,30,sx,sy,130);
        ts.addColorStop(0,'rgba(0,0,0,0.22)'); ts.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=ts; ctx.fillRect(0,0,512,512);
    });

    // Neck/chin definition line
    ctx.strokeStyle='rgba(80,40,15,0.25)'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(190,430); ctx.quadraticCurveTo(256,445,322,430); ctx.stroke();

    return new THREE.CanvasTexture(c);
}

function makeRobeTexture() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 512;
    const ctx = c.getContext('2d');
    // White linen base
    ctx.fillStyle='#f0ece0'; ctx.fillRect(0,0,256,512);
    // Warp threads (vertical)
    for(let x=0;x<256;x+=3){
        ctx.globalAlpha=.07; ctx.strokeStyle=x%6?'#b8a880':'#8a7858'; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,512); ctx.stroke();
    }
    // Weft threads (horizontal)
    for(let y=0;y<512;y+=3){
        ctx.globalAlpha=.05; ctx.strokeStyle='#b8a880'; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(256,y); ctx.stroke();
    }
    ctx.globalAlpha=1;
    // Subtle fold shadows
    for(let i=0;i<8;i++){
        const fy=Math.random()*512;
        const fGrad=ctx.createLinearGradient(0,fy-8,0,fy+8);
        fGrad.addColorStop(0,'rgba(0,0,0,0)'); fGrad.addColorStop(.5,'rgba(0,0,0,0.07)'); fGrad.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=fGrad; ctx.fillRect(0,fy-8,256,16);
    }
    return new THREE.CanvasTexture(c);
}

// ─── HIGH PRIEST — FULLY REALISTIC ────────────────────
function buildHighPriest() {
    const g = new THREE.Group();

    // ── MATERIALS ──
    const faceTex   = makeFaceTexture();
    const robeTex   = makeRobeTexture();
    const skinColor = 0xc07848;
    const skinMat   = new THREE.MeshStandardMaterial({color:skinColor,roughness:.72,metalness:0,map:null});
    const linenMat  = new THREE.MeshStandardMaterial({map:robeTex,roughness:.88,metalness:0,color:0xf0ece2});
    const linenMat2 = new THREE.MeshStandardMaterial({map:robeTex,roughness:.88,metalness:0,color:0xe8e4d4});
    const gMat      = goldMat(.45);
    const bMat      = bronzeMat();
    const darkMat   = new THREE.MeshStandardMaterial({color:0x1a0a02,roughness:.95,metalness:0});
    const bloodMat  = new THREE.MeshStandardMaterial({color:0x5c0808,roughness:.35,metalness:.08,emissive:new THREE.Color(.08,0,0),emissiveIntensity:.3});

    // ══ BODY — bottom to top ══════════════════════════

    // ── SANDALS/FEET ──
    const sandalMat = new THREE.MeshStandardMaterial({color:0x4a2808,roughness:.95,metalness:0});
    [-0.1,0.1].forEach(sx=>{
        // Foot base
        const foot = new THREE.Mesh(new THREE.BoxGeometry(.14,.055,.28),sandalMat);
        foot.position.set(sx,.028,.06); g.add(foot);
        // Sandal strap
        const strap = new THREE.Mesh(new THREE.BoxGeometry(.16,.04,.06),sandalMat);
        strap.position.set(sx,.07,.0); g.add(strap);
        // Toe detail
        const toe = new THREE.Mesh(new THREE.SphereGeometry(.055,8,6),skinMat);
        toe.scale.set(1.3,.55,1); toe.position.set(sx,.05,.18); g.add(toe);
    });

    // ── LOWER LEGS (visible below robe) ──
    [-0.1,0.1].forEach(sx=>{
        const shin = new THREE.Mesh(new THREE.CylinderGeometry(.055,.065,.35,12),skinMat);
        shin.position.set(sx,.25,.02); g.add(shin);
    });

    // ── LINEN ROBE — main body, properly shaped silhouette ──
    // Uses subdivided cylinder with vertex displacement for cloth drape
    const robeGeo = new THREE.CylinderGeometry(.28,.32,.72,20,6,true);
    // Slightly narrow at waist
    const rPos = robeGeo.attributes.position;
    for(let i=0;i<rPos.count;i++){
        const y=rPos.getY(i); const x=rPos.getX(i); const z=rPos.getZ(i);
        const waistPinch = 1 - .08*Math.pow(Math.max(0,1-Math.abs(y-.18)/.25),2);
        rPos.setX(i,x*waistPinch); rPos.setZ(i,z*waistPinch);
        // Subtle fold ripple
        const a=Math.atan2(z,x);
        const fold=.012*Math.sin(a*6+y*8);
        rPos.setX(i,rPos.getX(i)+fold*Math.cos(a));
        rPos.setZ(i,rPos.getZ(i)+fold*Math.sin(a));
    }
    robeGeo.computeVertexNormals();
    const robe = new THREE.Mesh(robeGeo,linenMat);
    robe.position.y=.74; g.add(robe);

    // Robe bottom cap (closed hem)
    const hemCap = new THREE.Mesh(new THREE.CircleGeometry(.32,20),linenMat);
    hemCap.rotation.x=-Math.PI/2; hemCap.position.y=.38; g.add(hemCap);

    // Upper robe (chest-to-waist, slightly different colour)
    const uRobeGeo = new THREE.CylinderGeometry(.22,.28,.44,20,4,true);
    const uRobe = new THREE.Mesh(uRobeGeo,linenMat2);
    uRobe.position.y=1.32; g.add(uRobe);

    // ── GIRDLE / SASH (woven belt at waist) ──
    const sashColors=['#d4af37','#4a1898','#8a1010','#d4af37'];
    for(let s=0;s<4;s++){
        const sashRing=new THREE.Mesh(
            new THREE.TorusGeometry(.285,.016,6,28),
            new THREE.MeshStandardMaterial({color:parseInt(sashColors[s].replace('#','0x')),roughness:.45,metalness:s%2===0?.85:.1})
        );
        sashRing.rotation.x=Math.PI/2; sashRing.position.y=1.02+s*.026; g.add(sashRing);
    }

    // ── TORSO BLOCK (shoulders) ──
    const torsoGeo = new THREE.SphereGeometry(.24,16,10);
    const torsoPos = torsoGeo.attributes.position;
    for(let i=0;i<torsoPos.count;i++){
        torsoPos.setX(i,torsoPos.getX(i)*1.45);
        torsoPos.setY(i,torsoPos.getY(i)*.52);
        torsoPos.setZ(i,torsoPos.getZ(i)*.88);
    }
    torsoGeo.computeVertexNormals();
    const torso = new THREE.Mesh(torsoGeo,linenMat2);
    torso.position.y=1.54; g.add(torso);

    // ── ARMS — fully connected chain, right then left ──
    [
      { side:1,  // RIGHT arm — holds censer, bent more forward
        uArmAngleZ: -0.55, uArmAngleX:  0.18,
        fArmAngleZ: -0.20, fArmAngleX:  0.65,
        handAngleZ: -0.10, handAngleX:  0.5 },
      { side:-1, // LEFT arm — holds basin, slightly lower
        uArmAngleZ:  0.50, uArmAngleX:  0.15,
        fArmAngleZ:  0.18, fArmAngleX:  0.55,
        handAngleZ:  0.10, handAngleX:  0.45 }
    ].forEach(cfg=>{
        const {side,uArmAngleZ,uArmAngleX,fArmAngleZ,fArmAngleX,handAngleZ,handAngleX}=cfg;

        // Shoulder joint
        const shoulderJoint=new THREE.Mesh(new THREE.SphereGeometry(.075,10,8),linenMat);
        shoulderJoint.position.set(side*.32,1.52,.04); g.add(shoulderJoint);

        // Upper arm — from shoulder outward/down
        const uArm=new THREE.Mesh(new THREE.CylinderGeometry(.068,.062,.42,12),linenMat);
        // Position = midpoint between shoulder and elbow
        uArm.position.set(side*.42,1.36,.1);
        uArm.rotation.z=uArmAngleZ;
        uArm.rotation.x=uArmAngleX;
        g.add(uArm);
        uArm.userData.armPart = 'upper'; uArm.userData.side = side;

        // Elbow joint — where upper arm ends
        const elbowX=side*.54, elbowY=1.18, elbowZ=.22;
        const elbow=new THREE.Mesh(new THREE.SphereGeometry(.062,10,8),linenMat);
        elbow.position.set(elbowX,elbowY,elbowZ); g.add(elbow);

        // Forearm — from elbow, angled more forward/down
        const fArm=new THREE.Mesh(new THREE.CylinderGeometry(.058,.050,.36,12),linenMat);
        const fArmX=elbowX+side*.04, fArmY=elbowY-.14, fArmZ=elbowZ+.14;
        fArm.position.set(fArmX,fArmY,fArmZ);
        fArm.rotation.z=fArmAngleZ;
        fArm.rotation.x=fArmAngleX;
        g.add(fArm);
        fArm.userData.armPart = 'forearm'; fArm.userData.side = side;

        // Wrist joint — where forearm ends

        const wrX=fArmX+side*.03, wrY=fArmY-.18, wrZ=fArmZ+.18;
        const wrist=new THREE.Mesh(new THREE.SphereGeometry(.048,10,8),skinMat);
        wrist.position.set(wrX,wrY,wrZ); g.add(wrist);

        // Palm — centred on wrist, rotated to match arm direction
        const palm=new THREE.Mesh(new THREE.BoxGeometry(.09,.055,.12),skinMat);
        palm.position.set(wrX,wrY-.04,wrZ+.06);
        palm.rotation.z=handAngleZ;
        palm.rotation.x=handAngleX*.3;
        g.add(palm);
        palm.userData.armPart = 'hand'; palm.userData.side = side;

        // 4 fingers — spread evenly from palm front edge
        const fingerSpread=.018;
        for(let f=0;f<4;f++){
            const fxOff=side*(-.03+f*fingerSpread*side); // spread across palm width
            const fing=new THREE.Mesh(new THREE.CylinderGeometry(.011,.009,.09,6),skinMat);
            const fingBase=new THREE.Vector3(wrX+fxOff, wrY-.06, wrZ+.14);
            fing.position.copy(fingBase);
            fing.rotation.x=.55; // curl slightly forward
            fing.rotation.z=handAngleZ*.4;
            g.add(fing);
            // Fingertip
            const tip=new THREE.Mesh(new THREE.SphereGeometry(.012,6,6),skinMat);
            tip.position.set(fingBase.x, fingBase.y-.04, fingBase.z+.08);
            g.add(tip);
        }

        // Thumb — on lateral side of palm
        const thumbX=wrX+side*.06, thumbY=wrY-.02, thumbZ=wrZ+.04;
        const thumb=new THREE.Mesh(new THREE.CylinderGeometry(.015,.012,.07,6),skinMat);
        thumb.position.set(thumbX,thumbY,thumbZ);
        thumb.rotation.z=-side*.9;  // points outward from palm
        thumb.rotation.x=.25;
        g.add(thumb);
        const thumbTip=new THREE.Mesh(new THREE.SphereGeometry(.014,6,6),skinMat);
        thumbTip.position.set(thumbX+side*.055,thumbY-.01,thumbZ+.03); g.add(thumbTip);
    });

    // ── NECK ──
    const neckGeo=new THREE.CylinderGeometry(.08,.1,.2,14);
    const neck=new THREE.Mesh(neckGeo,skinMat);
    neck.position.y=1.72; g.add(neck);
    // Adam's apple
    const adam=new THREE.Mesh(new THREE.SphereGeometry(.022,6,6),skinMat);
    adam.position.set(0,1.74,.09); g.add(adam);

    // ── HEAD — highly detailed sculpt ──
    // Main cranium
    const headGeo=new THREE.SphereGeometry(.168,24,20);
    const headPos=headGeo.attributes.position;
    for(let i=0;i<headPos.count;i++){
        const y=headPos.getY(i);
        // Flatten top slightly (head shape)
        if(y>.12) headPos.setY(i,y*.88+.02);
        // Push jaw forward and down
        if(y<-.05) headPos.setY(i,y*1.12);
        // Slight facial protrusion on front
        const z=headPos.getZ(i), x=headPos.getX(i);
        if(z>.0) headPos.setZ(i,z*(1+.18*Math.max(0,z/.168)));
    }
    headGeo.computeVertexNormals();
    // Use face texture on head
    const headMat=new THREE.MeshStandardMaterial({map:faceTex,roughness:.68,metalness:0,bumpMap:faceTex,bumpScale:.003});
    const head=new THREE.Mesh(headGeo,headMat);
    head.position.set(0,1.92,0);
    head.rotation.x=-.04; // very slight forward tilt
    g.add(head);

    // Back of head — plain skin (no face texture)
    const headBackGeo=new THREE.SphereGeometry(.164,16,12,0,Math.PI);
    const headBack=new THREE.Mesh(headBackGeo,skinMat);
    headBack.position.set(0,1.92,-.005);
    headBack.rotation.y=Math.PI;
    g.add(headBack);

    // ── NOSE — 3D projection ──
    const nosePts=[new THREE.Vector2(0,0),new THREE.Vector2(.028,.005),new THREE.Vector2(.032,.04),new THREE.Vector2(.028,.075),new THREE.Vector2(.038,.1),new THREE.Vector2(.032,.13),new THREE.Vector2(.024,.145),new THREE.Vector2(0,.15)];
    const noseMesh=new THREE.Mesh(new THREE.LatheGeometry(nosePts,10),skinMat);
    noseMesh.scale.set(1.1,1,.5);
    noseMesh.position.set(0,1.87,.148); noseMesh.rotation.x=-.3;
    g.add(noseMesh);

    // Nostril wings
    [-1,1].forEach(ns=>{
        const nw=new THREE.Mesh(new THREE.SphereGeometry(.022,8,6),skinMat);
        nw.scale.set(1.4,.8,.7); nw.position.set(ns*.032,1.858,.156); g.add(nw);
    });

    // ── EAR stubs ──
    [-1,1].forEach(es=>{
        const earOut=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),skinMat);
        earOut.scale.set(.5,1,1); earOut.position.set(es*.175,1.91,.0); g.add(earOut);
        const earIn=new THREE.Mesh(new THREE.SphereGeometry(.025,8,6),new THREE.MeshStandardMaterial({color:0x904828,roughness:.9,metalness:0}));
        earIn.scale.set(.4,.8,.5); earIn.position.set(es*.19,1.91,.0); g.add(earIn);
    });

    // ── MITRE — proper elongated linen turban ──
    // Base ring
    const mitreRing=new THREE.Mesh(new THREE.TorusGeometry(.172,.024,10,28),linenMat);
    mitreRing.rotation.x=Math.PI/2; mitreRing.position.y=2.06; g.add(mitreRing);
    // Turban body — lathe for proper shape
    const mitrePts=[new THREE.Vector2(0,0),new THREE.Vector2(.168,0),new THREE.Vector2(.172,.04),new THREE.Vector2(.165,.12),new THREE.Vector2(.145,.22),new THREE.Vector2(.118,.34),new THREE.Vector2(.085,.46),new THREE.Vector2(.048,.56),new THREE.Vector2(.022,.64),new THREE.Vector2(0,.68)];
    const mitre=new THREE.Mesh(new THREE.LatheGeometry(mitrePts,20),linenMat);
    mitre.position.y=2.06; g.add(mitre);
    // Mitre top cap
    const mitreTop=new THREE.Mesh(new THREE.SphereGeometry(.024,8,8),linenMat);
    mitreTop.position.y=2.74; g.add(mitreTop);
    // Holy gold plate (Tzitz) — front of mitre
    const tzitzGeo=new THREE.BoxGeometry(.18,.055,.015);
    const tzitz=new THREE.Mesh(tzitzGeo,gMat);
    tzitz.position.set(0,2.13,.172); g.add(tzitz);
    // Tzitz engraved text suggestion
    const tzitzText=new THREE.Mesh(new THREE.PlaneGeometry(.15,.035),
        new THREE.MeshBasicMaterial({color:0xd4af37,transparent:true,opacity:.7}));
    tzitzText.position.set(0,2.13,.18); g.add(tzitzText);

    // ── HAIR visible below mitre ──
    const hairMat=new THREE.MeshStandardMaterial({color:0x1e0e04,roughness:.95,metalness:0});
    // Side hair
    [-1,1].forEach(hs=>{
        const hair=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),hairMat);
        hair.scale.set(.35,1.2,.5); hair.position.set(hs*.155,1.92,-.02); g.add(hair);
    });
    // Neck hair / sideburn suggestion
    [-1,1].forEach(hs=>{
        const sb=new THREE.Mesh(new THREE.BoxGeometry(.055,.16,.04),hairMat);
        sb.position.set(hs*.16,1.79,.05); sb.rotation.z=hs*.1; g.add(sb);
    });

    // ── BEARD — full, layered, realistic ──
    // Main beard mass — shaped group of overlapping spheroids
    const beardMat=new THREE.MeshStandardMaterial({color:0x1e0e04,roughness:.95,metalness:0});
    const beardDark=new THREE.MeshStandardMaterial({color:0x0e0602,roughness:.98,metalness:0});
    const beardGrey=new THREE.MeshStandardMaterial({color:0x4a3a2a,roughness:.92,metalness:0});

    // Chin volume
    const chinBeard=new THREE.Mesh(new THREE.SphereGeometry(.12,14,12),beardMat);
    chinBeard.scale.set(1.4,1.6,.7); chinBeard.position.set(0,1.75,.1); g.add(chinBeard);
    // Lower beard extension
    const lowerBeard=new THREE.Mesh(new THREE.SphereGeometry(.1,12,10),beardMat);
    lowerBeard.scale.set(1.2,2.0,.6); lowerBeard.position.set(0,1.61,.08); g.add(lowerBeard);
    // Beard point/tip
    const beardTip=new THREE.Mesh(new THREE.ConeGeometry(.06,.3,10),beardDark);
    beardTip.position.set(0,1.46,.06); g.add(beardTip);
    // Side beard cheek volume
    [-1,1].forEach(bs=>{
        const cheekBeard=new THREE.Mesh(new THREE.SphereGeometry(.075,10,8),beardMat);
        cheekBeard.scale.set(.7,1.4,.55); cheekBeard.position.set(bs*.14,1.77,.06); g.add(cheekBeard);
    });
    // Grey streak wisps (3D strand lines via thin boxes)
    for(let gr=0;gr<6;gr++){
        const greyStrand=new THREE.Mesh(new THREE.BoxGeometry(.012,.18,.015),beardGrey);
        greyStrand.position.set((Math.random()-.5)*.2,1.6+Math.random()*.1,.08+Math.random()*.04);
        greyStrand.rotation.z=(Math.random()-.5)*.15;
        g.add(greyStrand);
    }
    // Moustache
    const moustacheMat=beardMat;
    const moustache=new THREE.Mesh(new THREE.SphereGeometry(.065,10,8),moustacheMat);
    moustache.scale.set(2.2,.45,.55); moustache.position.set(0,1.84,.13); g.add(moustache);
    // Moustache drooping corners
    [-1,1].forEach(ms=>{
        const corner=new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),moustacheMat);
        corner.scale.set(.7,1.6,.5); corner.position.set(ms*.1,1.80,.12); g.add(corner);
    });

    // ══ LITURGICAL OBJECTS ════════════════════════════

    // ── RIGHT HAND — GOLDEN CENSER (fire-pan on chains) ──
    // Right wrist ends at approx: x=0.61, y=0.86, z=0.54
    const censerX=0.60, censerY=0.80, censerZ=0.56;
    // Pan/bowl — lathe
    const censerPanPts=[new THREE.Vector2(0,0),new THREE.Vector2(.07,0),new THREE.Vector2(.085,.03),new THREE.Vector2(.09,.07),new THREE.Vector2(.08,.12),new THREE.Vector2(.055,.14),new THREE.Vector2(0,.15)];
    const censerPan=new THREE.Mesh(new THREE.LatheGeometry(censerPanPts,14),bMat);
    censerPan.position.set(censerX,censerY,censerZ); g.add(censerPan);
    // Coals inside — glowing
    const coalGeo=new THREE.SphereGeometry(.05,6,6);
    const coalMat1=new THREE.MeshBasicMaterial({color:0xff5500,transparent:true,opacity:.9});
    const coal=new THREE.Mesh(coalGeo,coalMat1); coal.position.set(censerX,censerY+.04,censerZ); g.add(coal);
    // Incense smoke (layered wisps)
    const smkMat=new THREE.MeshBasicMaterial({color:0xe8e4d0,transparent:true,opacity:.09,depthWrite:false});
    [0,.12,.26,.44,.64,.88].forEach((dy,i)=>{
        const drift=(i%2===0?.025:-.025)*i;
        const smk=new THREE.Mesh(new THREE.SphereGeometry(.045+dy*.07,8,8),smkMat);
        smk.position.set(censerX+drift,censerY+.06+dy*.85,censerZ+drift*.5); g.add(smk);
    });
    // Chains (5 segments rising to right hand)
    const chainMat=new THREE.MeshStandardMaterial({color:0xc8a820,roughness:.4,metalness:.9});
    for(let ch=0;ch<5;ch++){
        const lnk=new THREE.Mesh(new THREE.TorusGeometry(.018,.006,6,10),chainMat);
        lnk.position.set(censerX,censerY+.16+ch*.065,censerZ); lnk.rotation.x=Math.PI/2+ch*.12; g.add(lnk);
    }
    // Handle top ring at palm level
    const handleRing=new THREE.Mesh(new THREE.TorusGeometry(.025,.007,6,12),chainMat);
    handleRing.position.set(censerX,censerY+.50,censerZ-.04); handleRing.rotation.z=Math.PI/4; g.add(handleRing);
    // Fire glow light
    const fireLight=new THREE.PointLight(0xff8800,1.2,1.8);
    fireLight.position.set(censerX,censerY+.1,censerZ+.1); g.add(fireLight);

    // ── LEFT HAND — BLOOD SPRINKLE BASIN ──
    // Left wrist ends at approx: x=-0.61, y=0.88, z=0.50
    const basinX=-0.60, basinY=0.84, basinZ=0.52;
    const basinPts=[new THREE.Vector2(0,0),new THREE.Vector2(.09,0),new THREE.Vector2(.1,.02),new THREE.Vector2(.1,.07),new THREE.Vector2(.09,.1),new THREE.Vector2(.07,.115),new THREE.Vector2(0,.12)];
    const basin=new THREE.Mesh(new THREE.LatheGeometry(basinPts,14),bMat);
    basin.position.set(basinX,basinY,basinZ); g.add(basin);
    // Blood inside
    const bloodSurface=new THREE.Mesh(new THREE.CircleGeometry(.088,14),bloodMat);
    bloodSurface.rotation.x=-Math.PI/2; bloodSurface.position.set(basinX,basinY+.075,basinZ); g.add(bloodSurface);
    // Blood shimmer ring
    const bloodShimmer=new THREE.Mesh(new THREE.RingGeometry(.04,.085,14),
        new THREE.MeshBasicMaterial({color:0x8a0000,transparent:true,opacity:.5,side:THREE.DoubleSide}));
    bloodShimmer.rotation.x=-Math.PI/2; bloodShimmer.position.set(basinX,basinY+.08,basinZ); g.add(bloodShimmer);

    // ── GOLDEN BELLS at hem of robe ──
    for(let b=0;b<12;b++){
        const angle=(b/12)*Math.PI*2;
        const bx=Math.cos(angle)*.28, bz=Math.sin(angle)*.28;
        // Bell body
        const bellPts=[new THREE.Vector2(0,0),new THREE.Vector2(.025,0),new THREE.Vector2(.03,.015),new THREE.Vector2(.03,.04),new THREE.Vector2(.025,.058),new THREE.Vector2(.012,.065),new THREE.Vector2(0,.065)];
        const bell=new THREE.Mesh(new THREE.LatheGeometry(bellPts,10),gMat);
        bell.position.set(bx,.42,bz); g.add(bell);
        // Clapper
        const clapper=new THREE.Mesh(new THREE.SphereGeometry(.007,4,4),gMat);
        clapper.position.set(bx,.38,bz); g.add(clapper);
        // Pomegranate (alternating) — small red sphere cluster
        if(b%2===1){
            const pomMat=new THREE.MeshStandardMaterial({color:0x8a1818,roughness:.7,metalness:.1});
            const pom=new THREE.Mesh(new THREE.SphereGeometry(.022,8,8),pomMat);
            pom.position.set(bx,.42,bz); g.add(pom);
        }
    }

    // ── LINEN GIRDLE SASH hanging end ──
    const sashEnd=new THREE.Mesh(new THREE.BoxGeometry(.06,.28,.012),
        new THREE.MeshStandardMaterial({color:0xd4af37,roughness:.45,metalness:.8}));
    sashEnd.position.set(.16,.86,.3); sashEnd.rotation.z=.18; g.add(sashEnd);

    // ── AMBIENT PRIEST LIGHT — warm glow on figure ──
    const priestAura=new THREE.PointLight(0xffcc88,.6,2.8);
    priestAura.position.set(0,1.5,.6); g.add(priestAura);

    return g;
}

function buildFlame(ox,oy,oz) {
    const n=120, pos=new Float32Array(n*3), vel=new Float32Array(n*3), life=new Float32Array(n), maxL=new Float32Array(n);
    for(let i=0;i<n;i++) resetP(i,pos,vel,life,maxL,ox,oy,oz);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({color:0xff6600,size:0.08,transparent:true,opacity:0.7,sizeAttenuation:true,depthWrite:false}));
    return {pts,geo,pos,vel,life,maxL,ox,oy,oz,n};
}

// ══════════════════════════════════════════
//  UI CONTROLLERS
// ══════════════════════════════════════════
function switchZone(zoneKey, btn) {
    if (zoneKey === currentZone) return;
    const veil = document.getElementById('zone-veil');

    const doSwitch = () => {
        currentZone = zoneKey;
        exploredZones.add(zoneKey);
        document.querySelectorAll('.nav-seal').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        const dot = document.getElementById('dot-' + zoneKey);
        if (dot) dot.classList.add('visited');

        buildZoneScene(zoneKey);
        activateZoneAudio(zoneKey);
        updateTicker(ZONE_DATA[zoneKey].ticker);
        activeVesselKey = null;
        selectVessel(ZONE_DATA[zoneKey].vessels[0].key);

        // Always remove veil after scene is built
        veil.classList.remove('active');

        // Cinematic zone title flash
        const flash = document.getElementById('zone-title-flash');
        if (flash) {
            flash.textContent = ZONE_DATA[zoneKey].title;
            flash.classList.remove('hide'); flash.classList.add('show');
            setTimeout(()=>{ flash.classList.remove('show'); flash.classList.add('hide'); }, 2400);
        }
    };

    if (exploredZones.size === 0) {
        // First load — no transition, just build
        doSwitch();
    } else if (zoneKey === 'holies' && currentZone === 'holy' && !exploredZones.has('holies') && triggerVeilTearing()) {
        // First entry to Holy of Holies — dramatic veil tearing
        doSwitch();
        initVeilTearScene();
    } else {
        // Subsequent zones — brief fade
        veil.classList.add('active');
        setTimeout(doSwitch, 500);
    }
}

function selectVessel(key) {
    const Z=ZONE_DATA[currentZone];
    const v=Z.vessels.find(x=>x.key===key);
    if(!v) return;
    activeVesselKey=key;

    // Ring highlight
    vesselMeshes.forEach(vm => {
        if(!vm.mesh) return;
        vm.mesh.traverse(c => { if(c.userData.isRing) c.material.opacity = (vm.key===key?0.35:0); });
    });

    document.getElementById('insp-zone-label').textContent=Z.title;
    document.getElementById('insp-title').textContent=v.name;
    document.getElementById('insp-body').textContent=v.info;
    document.getElementById('insp-fields').innerHTML=`
        <div class="insp-sep"></div>
        <div class="insp-field"><strong>SCRIPTURE</strong><span>${v.tipRef}</span></div>
        <div class="insp-field"><strong>MATERIAL</strong><span>${v.mat}</span></div>
        <div class="insp-field"><strong>DIMENSIONS</strong><span>${v.dims}</span></div>`;

    const block=document.getElementById('typology-block');
    if(v.typology) {
        block.classList.add('show');
        document.getElementById('typ-antitype').textContent=v.typology.antitype;
        const ref=document.getElementById('typ-verse');
        ref.textContent=v.typology.scripture; ref.dataset.ref=v.typology.scripture;
        document.getElementById('typ-exposition').textContent=v.typology.exposition;
    } else block.classList.remove('show');

    renderVesselList(key);
    if(v.isArk) { if(window.ScriptoriumAudio) ScriptoriumAudio.transitionTo('nt'); setTimeout(()=>document.getElementById('ark-overlay').classList.add('active'),1200); }
    showLabel(v.name);
    cameraTarget={x:v.pos[0],y:v.pos[1]+0.5,z:v.pos[2]};
    cameraRadius=Math.max(4,cameraRadius*0.85);
}

function renderVesselList(activeKey) {
    const Z=ZONE_DATA[currentZone], c=document.getElementById('vessel-rows');
    c.innerHTML='';
    Z.vessels.forEach(v => {
        const row=document.createElement('div');
        row.className='vessel-row'+(v.key===activeKey?' active':'');
        row.onclick=()=>selectVessel(v.key);
        row.innerHTML=`<div class="vessel-row-dot ${v.dotClass}"></div><div class="vessel-row-name">${v.name}</div>`;
        c.appendChild(row);
    });
}

function showLabel(name) {
    clearTimeout(labelTimeout);
    const l=document.getElementById('vessel-label');
    l.textContent=name; l.classList.add('show');
    labelTimeout=setTimeout(()=>l.classList.remove('show'),2000);
}

function updateTicker(msg) {
    const el=document.getElementById('ticker-msg');
    el.style.animation='none'; void el.offsetHeight;
    el.textContent=msg; el.style.animation='textFade 0.5s ease';
}

// GUIDED TOUR
function startGuidedTour() {
    tourActive=true; tourZoneIdx=0; tourVesselIdx=0;
    document.getElementById('tour-controls').style.display='flex';
    document.getElementById('cam-hint').classList.add('hidden');
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('btn-tour').classList.add('active');
    const zk=tourZones[tourZoneIdx];
    switchZone(zk, document.querySelector(`.nav-seal[data-action*="'${zk}'"]`));
    setTimeout(()=>{ selectVessel(ZONE_DATA[zk].vessels[0].key); cameraRadius=5; },600);
}

function tourNext() {
    const Z=ZONE_DATA[tourZones[tourZoneIdx]];
    tourVesselIdx++;
    if(tourVesselIdx<Z.vessels.length) { selectVessel(Z.vessels[tourVesselIdx].key); cameraRadius=Math.max(4,cameraRadius-0.5); }
    else { tourZoneIdx++; if(tourZoneIdx<tourZones.length) { tourVesselIdx=0; const nk=tourZones[tourZoneIdx]; switchZone(nk,document.querySelector(`.nav-seal[data-action*="'${nk}'"]`)); setTimeout(()=>{selectVessel(ZONE_DATA[nk].vessels[0].key);cameraRadius=5;},600); } else stopTour(); }
}

function tourPrev() {
    if(tourVesselIdx>0) { tourVesselIdx--; selectVessel(ZONE_DATA[tourZones[tourZoneIdx]].vessels[tourVesselIdx].key); }
    else if(tourZoneIdx>0) { tourZoneIdx--; tourVesselIdx=0; const pk=tourZones[tourZoneIdx]; switchZone(pk,document.querySelector(`.nav-seal[data-action*="'${pk}'"]`)); }
}

function stopTour() {
    tourActive=false;
    document.getElementById('tour-controls').style.display='none';
    document.getElementById('cam-hint').classList.remove('hidden');
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('btn-3d').classList.add('active');
}

function buildFloorPlan() {
    if (document.getElementById('floor-plan-overlay')) return;
    const mount = document.getElementById('threejs-mount');
    const div = document.createElement('div');
    div.id = 'floor-plan-overlay';
    div.style.cssText = 'position:absolute;inset:0;z-index:6;display:none;align-items:center;justify-content:center;background:rgba(3,3,3,0.92);pointer-events:none;';
    div.innerHTML = '<svg viewBox="0 0 600 400" width="80%" height="80%" style="max-width:540px;opacity:0.7;">' +
        // Outer Court boundary
        '<rect x="90" y="50" width="420" height="300" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1" stroke-dasharray="4,3"/>' +
        '<text x="300" y="30" text-anchor="middle" fill="rgba(212,175,55,0.3)" font-family="Cinzel,serif" font-size="8" letter-spacing="3">OUTER COURT</text>' +
        // Holy Place boundary
        '<rect x="140" y="70" width="320" height="260" fill="none" stroke="rgba(212,175,55,0.2)" stroke-width="0.8"/>' +
        '<text x="300" y="64" text-anchor="middle" fill="rgba(212,175,55,0.2)" font-family="Cinzel,serif" font-size="6" letter-spacing="2">THE HOLY PLACE</text>' +
        // Holy of Holies
        '<rect x="240" y="100" width="120" height="200" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1.2"/>' +
        '<text x="300" y="95" text-anchor="middle" fill="rgba(212,175,55,0.2)" font-family="Cinzel,serif" font-size="5" letter-spacing="2">HOLY OF HOLIES</text>' +
        // Veil (between Holy and Holy of Holies)
        '<line x1="240" y1="100" x2="240" y2="300" stroke="rgba(180,50,50,0.4)" stroke-width="1.5" stroke-dasharray="3,2"/>' +
        // Altar of Burnt Offering (Outer Court)
        '<rect x="175" y="160" width="30" height="30" fill="rgba(212,175,55,0.08)" stroke="rgba(212,175,55,0.4)" stroke-width="0.8" rx="1"/>' +
        '<text x="190" y="180" text-anchor="middle" fill="rgba(212,175,55,0.4)" font-family="Cinzel,serif" font-size="5">ALTAR</text>' +
        // Laver (Outer Court)
        '<circle cx="190" cy="230" r="10" fill="rgba(100,180,255,0.06)" stroke="rgba(100,180,255,0.3)" stroke-width="0.8"/>' +
        '<text x="190" y="234" text-anchor="middle" fill="rgba(100,180,255,0.3)" font-family="Cinzel,serif" font-size="4">LAVER</text>' +
        // Menorah (Holy Place)
        '<circle cx="330" cy="150" r="10" fill="rgba(255,200,50,0.08)" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>' +
        '<text x="330" y="154" text-anchor="middle" fill="rgba(212,175,55,0.4)" font-family="Cinzel,serif" font-size="4">MENORAH</text>' +
        // Showbread Table (Holy Place)
        '<rect x="320" y="190" width="24" height="14" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.3)" stroke-width="0.6"/>' +
        '<text x="332" y="200" text-anchor="middle" fill="rgba(212,175,55,0.3)" font-family="Cinzel,serif" font-size="4">TABLE</text>' +
        // Incense Altar (Holy Place)
        '<rect x="325" y="240" width="12" height="12" fill="rgba(255,150,50,0.06)" stroke="rgba(212,175,55,0.3)" stroke-width="0.6"/>' +
        '<text x="331" y="257" text-anchor="middle" fill="rgba(212,175,55,0.3)" font-family="Cinzel,serif" font-size="4">INCENSE</text>' +
        // Ark (Holy of Holies)
        '<rect x="280" y="185" width="30" height="18" fill="rgba(255,215,0,0.08)" stroke="rgba(212,175,55,0.5)" stroke-width="0.8"/>' +
        '<text x="295" y="197" text-anchor="middle" fill="rgba(212,175,55,0.5)" font-family="Cinzel,serif" font-size="5">ARK</text>' +
        // Entrance arrow (east side)
        '<line x1="300" y1="370" x2="300" y2="355" stroke="rgba(212,175,55,0.2)" stroke-width="1" marker-end="url(#arrow)"/>' +
        '<text x="300" y="385" text-anchor="middle" fill="rgba(212,175,55,0.15)" font-family="Cinzel,serif" font-size="5" letter-spacing="2">EAST ENTRANCE</text>' +
        // Legend
        '<text x="30" y="20" fill="rgba(212,175,55,0.15)" font-family="Cinzel,serif" font-size="5" letter-spacing="2">NOT TO SCALE</text>' +
        // Empty tomb without crucifix (prophetic) - north side of Holy Place
        '<text x="465" y="390" text-anchor="end" fill="rgba(212,175,55,0.04)" font-family="Cinzel,serif" font-size="6" letter-spacing="4">+</text>' +
        '</svg>';
    mount.appendChild(div);
    // Arrow marker def
    const svg = div.querySelector('svg');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('markerWidth', '6');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('refX', '3');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowPath.setAttribute('d', 'M0,0 L6,3 L0,6 Z');
    arrowPath.setAttribute('fill', 'rgba(212,175,55,0.2)');
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svg.insertBefore(defs, svg.firstChild);
}

function setViewMode(mode) {
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('btn-'+mode).classList.add('active');
    const planOverlay = document.getElementById('floor-plan-overlay');
    if (mode === 'plan') {
        buildFloorPlan();
        if (planOverlay) planOverlay.style.display = 'flex';
        cameraPhi = 0.16; cameraRadius = 20; cameraTheta = 0;
    } else {
        if (planOverlay) planOverlay.style.display = 'none';
        cameraPhi = 0.35; cameraRadius = 12;
    }
}

function openCanonForVerse(ref) {
    if(!ref) return;
    const b=ref.split(' ')[0].toLowerCase();
    const nt=['hebrews','romans','revelation','john','titus','peter','luke','acts','corinthians','galatians','ephesians','philippians','colossians','thessalonians','timothy'];
    window.location.href=nt.some(x=>b.includes(x))?'nt-gallery.html':'ot-gallery.html';
}

function closeArk() {
    document.getElementById('ark-overlay').classList.remove('active');
    if(window.ScriptoriumAudio) ScriptoriumAudio.transitionTo('ot');
}

document.addEventListener('keydown', e => {
    if(e.key==='Escape') closeArk();
    if(e.key==='ArrowRight'&&tourActive) tourNext();
    if(e.key==='ArrowLeft'&&tourActive) tourPrev();
});

setTimeout(()=>document.getElementById('cam-hint').classList.add('hidden'),4000);

// ══════════════════════════════════════════
//  BOOT
// ══════════════════════════════════════════
function setLoad(p,msg) {
    document.getElementById('load-bar').style.width=p+'%';
    document.getElementById('load-status').textContent=msg;
}

window.addEventListener('DOMContentLoaded', () => {
    setLoad(20,'Forging the bronze...');

    function tryBoot() {
        if (typeof THREE === 'undefined') {
            setLoad(30,'Loading Three.js engine...');
            setTimeout(tryBoot, 200);
            return;
        }
        setLoad(55,'Raising the sanctuary curtains...');
        setTimeout(() => {
            // Initialize renderer
            initThreeJS();
            setLoad(82,'Consecrating the vessels...');

            setTimeout(() => {
                setLoad(100,'The Mishkan is consecrated.');

                // 1. Fade and remove loading screen
                const ls = document.getElementById('loading-screen');
                ls.classList.add('fade');
                setTimeout(() => { if (ls.parentNode) ls.parentNode.removeChild(ls); }, 900);

                // 2. Clear zone veil so scene is visible
                document.getElementById('zone-veil').classList.remove('active');

                // 3. Boot into outer court
                currentZone = null;
                switchZone('outer', document.querySelector('.nav-seal.active'));

                // 4. After one frame, kick resize so canvas fills correctly
                requestAnimationFrame(() => {
                    const { w, h } = getMountSize();
                    renderer.setSize(w, h);
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                });

            }, 500);
        }, 300);
    }

    tryBoot();
});