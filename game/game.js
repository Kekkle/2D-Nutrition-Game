// =================================================================
// NutriRun — Level 1: Carbohydrates
// A 2D nutrition platformer built with Phaser 3
// Style: 16-Bit Pixel Art (Style A — Bold Outlined / Thin-outline food)
// =================================================================

const GAME_W = 960;
const GAME_H = 540;
const LEVEL_W = 6800;
const GROUND_Y = 420;
const GROUND_H = 120;

const PLAYER_SPEED = 250;
const PLAYER_JUMP = -520;
const PHANTOM_SPEED = 55;
const PHANTOM_DETECT = 280;

const ENERGY_START = 100;
const ENERGY_DRAIN = 0.85;
const ENERGY_DRAIN_IDLE = 0.2;
const ENERGY_CARB = 7;
const ENERGY_FIBRE = 9;
const ENERGY_NEUTRAL = 3;
const ENERGY_FUN = 12;
const ENERGY_RARE = 15;
const PHANTOM_DMG = 10;
const CARBS_NEEDED = 14;

// All food definitions — matches food-items-inventory-thin.html
const FOOD_DEFS = {
  // L1 Starchy (texture size includes 2px padding each side)
  white_bread:  { name: 'White Bread',  type: 'starchy', w: 32, h: 28 },
  white_rice:   { name: 'White Rice',   type: 'starchy', w: 34, h: 26 },
  pasta:        { name: 'Pasta',        type: 'starchy', w: 30, h: 22 },
  potato:       { name: 'Potato',       type: 'starchy', w: 30, h: 24 },
  cereal:       { name: 'Cereal',       type: 'starchy', w: 32, h: 24 },
  tortilla:     { name: 'Tortilla',     type: 'starchy', w: 32, h: 20 },
  pita:         { name: 'Pita Bread',   type: 'starchy', w: 32, h: 22 },
  // L1 Fibre+
  brown_bread:  { name: 'Whole Grain',  type: 'fibre',   w: 32, h: 28 },
  brown_rice:   { name: 'Brown Rice',   type: 'fibre',   w: 34, h: 26 },
  oats:         { name: 'Oats',         type: 'fibre',   w: 32, h: 24 },
  banana:       { name: 'Banana',       type: 'fibre',   w: 32, h: 18 },
  apple:        { name: 'Apple',        type: 'fibre',   w: 28, h: 37 },
  orange:       { name: 'Orange',       type: 'fibre',   w: 28, h: 32 },
  sweetcorn:    { name: 'Sweetcorn',    type: 'fibre',   w: 18, h: 37 },
  pear:         { name: 'Pear',         type: 'fibre',   w: 24, h: 37 },
  raspberries:  { name: 'Raspberries',  type: 'fibre',   w: 26, h: 24 },
  watermelon:   { name: 'Watermelon',   type: 'fibre',   w: 32, h: 20 },
  grapes:       { name: 'Grapes',       type: 'fibre',   w: 22, h: 26 },
  cherry:       { name: 'Cherry',       type: 'fibre',   w: 28, h: 26 },
  broccoli:     { name: 'Broccoli',     type: 'fibre',   w: 28, h: 34 },
  carrots:      { name: 'Carrots',      type: 'fibre',   w: 18, h: 38 },
  tomato:       { name: 'Tomato',       type: 'fibre',   w: 28, h: 28 },
  cucumber:     { name: 'Cucumber',     type: 'fibre',   w: 18, h: 30 },
  sweetpotato:  { name: 'Sweet Potato', type: 'fibre',   w: 32, h: 22 },
  chia:         { name: 'Chia Seeds',   type: 'fibre',   w: 28, h: 28 },
  // L2 Protein (neutral in L1)
  egg:          { name: 'Egg',          type: 'neutral', w: 26, h: 30 },
  chicken:      { name: 'Chicken',      type: 'neutral', w: 50, h: 22 },
  cheese:       { name: 'Cheese',       type: 'neutral', w: 30, h: 26 },
  // Fun foods — quick energy
  fries:        { name: 'Fries',        type: 'fun',     w: 28, h: 32 },
  cookie:       { name: 'Cookie',       type: 'fun',     w: 30, h: 30 },
  donut:        { name: 'Donut',        type: 'fun',     w: 34, h: 32 },
};

const RARE_ITEMS = [
  { id: 'pizza',     name: 'Pizza',     desc: 'Complete Meal!' },
  { id: 'hamburger', name: 'Hamburger', desc: 'Complete Meal!' },
  { id: 'sushi',     name: 'Sushi',     desc: 'Complete Meal!' },
  { id: 'taco',      name: 'Taco',      desc: 'Complete Meal!' },
];

// ----- Level 1 layout -----

const L1 = {
  platforms: [
    { x: 280,  y: 320, w: 120 },   // 0
    { x: 630,  y: 260, w: 100 },   // 1
    { x: 980,  y: 300, w: 140 },   // 2
    { x: 1470, y: 280, w: 120 },   // 3
    { x: 1890, y: 340, w: 100 },   // 4
    { x: 2310, y: 230, w: 120 },   // 5
    { x: 2660, y: 310, w: 100 },   // 6
    { x: 3010, y: 260, w: 140 },   // 7
    { x: 3220, y: 320, w: 80 },    // 8  stepping stone toward plat 9
    { x: 3430, y: 190, w: 100 },   // 9  (was 8) high platform — sushi & pear
    { x: 3780, y: 320, w: 120 },   // 10
    { x: 4200, y: 280, w: 100 },   // 11
    { x: 4620, y: 340, w: 140 },   // 12
    { x: 4970, y: 220, w: 100 },   // 13
    { x: 5390, y: 300, w: 120 },   // 14
    { x: 5600, y: 340, w: 80 },    // 15 stepping stone toward plat 16
    { x: 5810, y: 270, w: 100 },   // 16 (was 14) sweet potato
    { x: 6230, y: 320, w: 140 },   // 17
  ],
  foods: [
    // Starchy carbs — ground (easy pickups)
    { id: 'white_bread', x: 350,  onGround: true },
    { id: 'white_rice',  x: 780,  onGround: true },
    { id: 'pasta',       x: 1200, onGround: true },
    { id: 'potato',      x: 1680, onGround: true },
    { id: 'cereal',      x: 2480, onGround: true },
    { id: 'tortilla',    x: 3300, onGround: true },
    { id: 'pita',        x: 4000, onGround: true },
    { id: 'white_bread', x: 4540, onGround: true },
    { id: 'pasta',       x: 5740, onGround: true },
    // Fibre+ carbs — platforms (reward exploration)
    { id: 'oats',        x: 320,  platIdx: 0 },
    { id: 'banana',      x: 670,  platIdx: 1 },
    { id: 'apple',       x: 1020, platIdx: 2 },
    { id: 'brown_bread', x: 1510, platIdx: 3 },
    { id: 'brown_rice',  x: 1930, platIdx: 4 },
    { id: 'orange',      x: 2350, platIdx: 5 },
    { id: 'sweetcorn',   x: 3050, platIdx: 7 },
    { id: 'pear',        x: 3460, platIdx: 9 },
    { id: 'raspberries', x: 3820, platIdx: 10 },
    { id: 'watermelon',  x: 4240, platIdx: 11 },
    { id: 'cherry',      x: 4660, platIdx: 12 },
    { id: 'carrots',     x: 5430, platIdx: 14 },
    { id: 'sweetpotato', x: 5850, platIdx: 16 },
    // Fibre+ carbs — ground (mixed in)
    { id: 'broccoli',    x: 2820, onGround: true },
    { id: 'tomato',      x: 3640, onGround: true },
    { id: 'grapes',      x: 4380, onGround: true },
    { id: 'cucumber',    x: 5200, onGround: true },
    { id: 'chia',        x: 6160, onGround: true },
    // Fun foods — quick energy
    { id: 'cookie',      x: 1440, onGround: true, fun: true },
    { id: 'fries',       x: 2960, onGround: true, fun: true },
    { id: 'donut',       x: 5360, onGround: true, fun: true },
    // Above crash pits (reachable by jumping)
    { id: 'banana',      x: 2060, aboveY: GROUND_Y - 70 },
    { id: 'oats',        x: 2150, aboveY: GROUND_Y - 70 },
    { id: 'orange',      x: 4920, aboveY: GROUND_Y - 70 },
    { id: 'apple',       x: 5020, aboveY: GROUND_Y - 70 },
  ],
  energyCells: [
    500, 940, 1350, 1780, 2260, 2680,
    3160, 3480,
    3940, 4140,
    4480,
    5560,
  ],
  cellsOnPlats: [
    { x: 640, pi: 1 },
    { x: 2380, pi: 5 },
    { x: 5060, pi: 13 },
  ],
  phantoms: [
    { x: 2940 }, { x: 3780 }, { x: 4490 }, { x: 5180 }, { x: 6020 },
  ],
  crashPits: [
    { x: 1990, w: 240 },
    { x: 4870, w: 240 },
  ],
  finishX: 6600,
};

const FIBRE_IDS = [
  'brown_bread','brown_rice','oats','banana','apple','orange','sweetcorn',
  'pear','raspberries','watermelon','grapes','cherry','broccoli','carrots',
  'tomato','cucumber','sweetpotato','chia',
];

// =================================================================
// SFX — Procedural sound effects via Web Audio API
// =================================================================

const SFX = {
  ctx: null,
  sfxMuted: false,
  musicMuted: false,
  musicGain: null,
  musicPlaying: false,
  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.06;
    this.musicGain.connect(this.ctx.destination);
  },
  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },
  toggleSfx() {
    this.sfxMuted = !this.sfxMuted;
    return this.sfxMuted;
  },
  toggleMusic() {
    this.musicMuted = !this.musicMuted;
    if (this.musicGain) this.musicGain.gain.value = this.musicMuted ? 0 : 0.06;
    return this.musicMuted;
  },
  _tone(freq, dur, type, vol, ramp) {
    if (!this.ctx || this.sfxMuted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (ramp) o.frequency.linearRampToValueAtTime(ramp, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(t); o.stop(t + dur);
  },
  collectStarchy() {
    this._tone(520, 0.12, 'square', 0.15);
    setTimeout(() => this._tone(660, 0.12, 'square', 0.12), 60);
  },
  collectFibre() {
    this._tone(440, 0.1, 'sine', 0.15);
    setTimeout(() => this._tone(587, 0.1, 'sine', 0.15), 70);
    setTimeout(() => this._tone(740, 0.15, 'sine', 0.12), 140);
  },
  collectFun() {
    this._tone(600, 0.08, 'triangle', 0.12);
    setTimeout(() => this._tone(750, 0.1, 'triangle', 0.1), 50);
  },
  collectCell() {
    this._tone(1200, 0.15, 'sine', 0.1, 2400);
    this._tone(1800, 0.08, 'triangle', 0.06);
    setTimeout(() => this._tone(2200, 0.12, 'sine', 0.07), 40);
  },
  typeClick() {
    if (!this.ctx || this.sfxMuted) return;
    const t = this.ctx.currentTime;
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.02, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.20, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 3000 + Math.random() * 1000; f.Q.value = 2;
    src.connect(f); f.connect(g); g.connect(this.ctx.destination);
    src.start(t); src.stop(t + 0.03);
  },
  shootBall() {
    this._tone(300, 0.15, 'sawtooth', 0.08, 800);
  },
  hitEnemy() {
    this._tone(200, 0.1, 'square', 0.12);
    setTimeout(() => this._tone(300, 0.08, 'square', 0.1), 60);
  },
  defeatEnemy() {
    this._tone(330, 0.08, 'square', 0.12);
    setTimeout(() => this._tone(440, 0.08, 'square', 0.12), 70);
    setTimeout(() => this._tone(660, 0.15, 'square', 0.1), 140);
  },
  playerHurt() {
    this._tone(180, 0.2, 'sawtooth', 0.12, 80);
  },
  crashPit() {
    this._tone(120, 0.3, 'triangle', 0.12, 60);
  },
  stomp() {
    this._tone(250, 0.06, 'square', 0.12);
    setTimeout(() => this._tone(500, 0.08, 'square', 0.1), 40);
  },
  faint() {
    this._tone(400, 0.4, 'sine', 0.12, 100);
    setTimeout(() => this._tone(150, 0.5, 'sine', 0.1, 60), 300);
  },
  finish() {
    const fanfare = [
      { f: 523, t: 0,   dur: 0.12, vol: 0.13 },   // ta  (C5)
      { f: 659, t: 130, dur: 0.12, vol: 0.13 },   // ta  (E5)
      { f: 784, t: 260, dur: 0.12, vol: 0.14 },   // ta  (G5)
      { f: 1047, t: 480, dur: 0.45, vol: 0.16 },  // DA! (C6 — held longer after a pause)
      { f: 1319, t: 500, dur: 0.35, vol: 0.07 },  // harmonic shimmer (E6)
      { f: 1568, t: 520, dur: 0.28, vol: 0.04 },  // upper sparkle (G6)
    ];
    fanfare.forEach(n => {
      setTimeout(() => this._tone(n.f, n.dur, 'sine', n.vol), n.t);
    });
  },
  starEarned() {
    this._tone(880, 0.1, 'sine', 0.1);
    setTimeout(() => this._tone(1100, 0.15, 'sine', 0.1), 80);
  },

  // Background music — gentle classical minuet style
  _playNote(freq, start, dur, type, vol) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(vol, start + 0.02);
    g.gain.setValueAtTime(vol * 0.7, start + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.001, start + dur);
    o.connect(g); g.connect(this.musicGain);
    o.start(start); o.stop(start + dur + 0.01);
  },
  startMusic() {
    if (!this.ctx || this.musicPlaying) return;
    this.musicPlaying = true;
    const bpm = 100;
    const q = 60 / bpm;

    // Gentle waltz in C major — melody (sine) + bass (triangle)
    // Each entry: [freq, startBeat, durationBeats]
    const melodyNotes = [
      // Phrase 1 — ascending, hopeful
      [523, 0, 1], [587, 1, 1], [659, 2, 1.5], [587, 3.5, 0.5],
      [523, 4, 1], [494, 5, 0.5], [523, 5.5, 0.5], [587, 6, 2],
      // Phrase 2 — gentle descent
      [659, 8, 1], [784, 9, 1], [740, 10, 1.5], [659, 11.5, 0.5],
      [587, 12, 1], [523, 13, 1], [494, 14, 0.5], [523, 14.5, 1.5],
      // Phrase 3 — lilting middle section
      [440, 16, 1], [523, 17, 0.5], [587, 17.5, 0.5], [659, 18, 1.5], [587, 19.5, 0.5],
      [523, 20, 1], [440, 21, 1], [392, 22, 1], [440, 23, 1],
      // Phrase 4 — resolution
      [523, 24, 1], [587, 25, 1], [659, 26, 0.5], [587, 26.5, 0.5],
      [523, 27, 0.5], [494, 27.5, 0.5], [440, 28, 1], [494, 29, 1], [523, 30, 2],
    ];

    const bassNotes = [
      // Waltz bass — root on beat 1, chord on beats 2-3
      [131, 0, 1.5], [196, 1.5, 0.5], [196, 2, 0.5],
      [131, 4, 1.5], [165, 5.5, 0.5], [165, 6, 0.5],
      [165, 8, 1.5], [196, 9.5, 0.5], [196, 10, 0.5],
      [131, 12, 1.5], [165, 13.5, 0.5], [165, 14, 0.5],
      [110, 16, 1.5], [165, 17.5, 0.5], [165, 18, 0.5],
      [131, 20, 1.5], [165, 21.5, 0.5], [165, 22, 0.5],
      [131, 24, 1.5], [196, 25.5, 0.5], [196, 26, 0.5],
      [110, 28, 1.5], [131, 29.5, 0.5], [131, 30, 2],
    ];

    const loopBeats = 32;

    const playLoop = () => {
      if (!this.musicPlaying) return;
      const now = this.ctx.currentTime + 0.05;
      melodyNotes.forEach(([f, b, d]) => {
        this._playNote(f, now + b * q, d * q, 'sine', 0.5);
      });
      bassNotes.forEach(([f, b, d]) => {
        this._playNote(f, now + b * q, d * q, 'triangle', 0.35);
      });
      this._musicTimer = setTimeout(() => playLoop(), loopBeats * q * 1000 - 100);
    };
    playLoop();
  },
  stopMusic() {
    this.musicPlaying = false;
    if (this._musicTimer) { clearTimeout(this._musicTimer); this._musicTimer = null; }
  },
};

// =================================================================
// BOOT SCENE — Generate all textures
// =================================================================

class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    this.generateNibble();
    this.generateFoods();
    this.generateEnergyCell();
    this.generateEnergyBall();
    this.generatePhantom();
    this.generateFibreTag();
    this.generateSpeakerIcons();
    this.generateTreasureChest();
    this.generateRareItems();
    this.generateStar();
    this.generateFinishFlag();
    document.fonts.load('16px "Special Elite"').then(() => {
      this.scene.start('Splash');
    });
  }


  generateNibble() {
    const P = 2;
    const states = [
      { key: 'nibble',           body: 0x48a8e0, border: 0x2868a0, shadow: 0x1a4878, foot: 0x48a8e0, footBorder: 0x2868a0, highlight: 0x68c8f8, hlAlpha: 0.6 },
      { key: 'nibble_energized', body: 0x60c8ff, border: 0x3090d0, shadow: 0x2070a8, foot: 0x60c8ff, footBorder: 0x3090d0, highlight: 0xa0e8ff, hlAlpha: 0.9 },
      { key: 'nibble_tired',     body: 0x6888a0, border: 0x486878, shadow: 0x384858, foot: 0x6888a0, footBorder: 0x486878, highlight: 0x8098a8, hlAlpha: 0.25 },
    ];
    const tired = (s) => s.key === 'nibble_tired';
    const energized = (s) => s.key === 'nibble_energized';

    for (const s of states) {
      const g = this.make.graphics({ add: false });
      const footR = { tl: 0, tr: 0, bl: 6, br: 6 };

      // Feet (drawn first, body shadow partially covers their tops)
      g.fillStyle(s.foot);
      g.fillRoundedRect(P + 4, P + 44, 14, 10, footR);
      g.fillRoundedRect(P + 26, P + 44, 14, 10, footR);
      g.lineStyle(3, s.footBorder);
      g.strokeRoundedRect(P + 4, P + 44, 14, 10, footR);
      g.strokeRoundedRect(P + 26, P + 44, 14, 10, footR);

      // Body shadow
      g.fillStyle(s.shadow);
      g.fillRoundedRect(P, P + 3, 44, 44, 10);

      // Main body
      g.fillStyle(s.body);
      g.fillRoundedRect(P, P, 44, 44, 10);
      g.lineStyle(3, s.border);
      g.strokeRoundedRect(P, P, 44, 44, 10);

      // Highlight shine
      g.fillStyle(s.highlight, s.hlAlpha);
      g.fillRoundedRect(P + 5, P + 4, 14, 8, 4);

      // Eyes
      const eyeH = tired(s) ? 7 : 14;
      const eyeY = tired(s) ? 16 : 10;
      const eyeR = tired(s) ? { tl: 8, tr: 8, bl: 3, br: 3 } : eyeH / 2;
      g.fillStyle(0xffffff);
      g.fillRoundedRect(P + 5, P + eyeY, 12, eyeH, eyeR);
      g.fillRoundedRect(P + 27, P + eyeY, 12, eyeH, eyeR);
      g.lineStyle(2, tired(s) ? 0x999999 : 0xaaaaaa);
      g.strokeRoundedRect(P + 5, P + eyeY, 12, eyeH, eyeR);
      g.strokeRoundedRect(P + 27, P + eyeY, 12, eyeH, eyeR);

      // Pupils
      const pupilH = tired(s) ? 5 : 8;
      const pupilY = P + eyeY + eyeH - pupilH;
      g.fillStyle(0x1a2a3a);
      g.fillEllipse(P + 14, pupilY + pupilH / 2, 6, pupilH);
      g.fillEllipse(P + 36, pupilY + pupilH / 2, 6, pupilH);

      // Pupil shine
      if (!tired(s)) {
        g.fillStyle(0xffffff);
        g.fillCircle(P + 15, pupilY + 1, 1.5);
        g.fillCircle(P + 37, pupilY + 1, 1.5);
      }

      g.generateTexture(s.key, 48, 58);
      g.destroy();
    }

    // Fainted state — fallen over with X eyes
    const fg = this.make.graphics({ add: false });
    const footR = { tl: 0, tr: 0, bl: 6, br: 6 };
    const fc = states[2]; // use tired colors as base

    // Feet (sideways — character tipped over)
    fg.fillStyle(fc.foot);
    fg.fillRoundedRect(P + 44, P + 28, 10, 14, { tl: 0, tr: 6, bl: 0, br: 6 });
    fg.fillRoundedRect(P + 44, P + 6, 10, 14, { tl: 0, tr: 6, bl: 0, br: 6 });
    fg.lineStyle(3, fc.footBorder);
    fg.strokeRoundedRect(P + 44, P + 28, 10, 14, { tl: 0, tr: 6, bl: 0, br: 6 });
    fg.strokeRoundedRect(P + 44, P + 6, 10, 14, { tl: 0, tr: 6, bl: 0, br: 6 });

    // Body shadow (tipped)
    fg.fillStyle(fc.shadow);
    fg.fillRoundedRect(P, P + 3, 44, 44, 10);

    // Body
    fg.fillStyle(fc.body);
    fg.fillRoundedRect(P, P, 44, 44, 10);
    fg.lineStyle(3, fc.border);
    fg.strokeRoundedRect(P, P, 44, 44, 10);

    // X eyes
    fg.lineStyle(3, 0xcc4444);
    fg.lineBetween(P + 7, P + 12, P + 17, P + 22);
    fg.lineBetween(P + 17, P + 12, P + 7, P + 22);
    fg.lineBetween(P + 27, P + 12, P + 37, P + 22);
    fg.lineBetween(P + 37, P + 12, P + 27, P + 22);

    fg.generateTexture('nibble_fainted', 58, 48);
    fg.destroy();
  }

  generateFoods() {
    const g = this.make.graphics({ add: false });
    const P = 2;

    // --- L1 STARCHY --- (exact colors from food-items-sprites.html)

    // White Bread — sa-bread: #e8b84c / #b8882a
    g.clear(); g.fillStyle(0xe8b84c); g.fillRoundedRect(P, P, 28, 24, { tl: 8, tr: 8, bl: 3, br: 3 });
    g.lineStyle(2, 0xb8882a); g.strokeRoundedRect(P, P, 28, 24, { tl: 8, tr: 8, bl: 3, br: 3 });
    g.fillStyle(0xd4a040); g.fillRoundedRect(P+3, P+4, 22, 3, 2);
    g.fillStyle(0xdaa848); g.fillRoundedRect(P+3, P+9, 22, 3, 2);
    g.generateTexture('food_white_bread', 32, 28);

    // White Rice — sa-rice: #f5f0e0 / #c0b898
    g.clear(); g.fillStyle(0xf5f0e0); g.fillRoundedRect(P, P+4, 30, 18, { tl: 4, tr: 4, bl: 12, br: 12 });
    g.lineStyle(2, 0xc0b898); g.strokeRoundedRect(P, P+4, 30, 18, { tl: 4, tr: 4, bl: 12, br: 12 });
    g.fillStyle(0xf5f0e0); g.lineStyle(1, 0xc0b898);
    g.fillCircle(P+7, P+2, 2); g.strokeCircle(P+7, P+2, 2);
    g.fillCircle(P+14, P+1, 2); g.strokeCircle(P+14, P+1, 2);
    g.fillCircle(P+21, P+2, 2); g.strokeCircle(P+21, P+2, 2);
    g.generateTexture('food_white_rice', 34, 26);

    // Pasta — sa-pasta: two wavy strips #f0d870 / #b8a040
    g.clear();
    g.fillStyle(0xf0d870); g.fillRoundedRect(P+1, P+1, 22, 5, { tl: 0, tr: 8, bl: 8, br: 0 });
    g.lineStyle(2, 0xb8a040); g.strokeRoundedRect(P+1, P+1, 22, 5, { tl: 0, tr: 8, bl: 8, br: 0 });
    g.fillStyle(0xf0d870); g.fillRoundedRect(P+1, P+12, 22, 5, { tl: 8, tr: 0, bl: 0, br: 8 });
    g.lineStyle(2, 0xb8a040); g.strokeRoundedRect(P+1, P+12, 22, 5, { tl: 8, tr: 0, bl: 0, br: 8 });
    g.generateTexture('food_pasta', 30, 22);

    // Potato — sa-potato: #c8a060 / #907038
    g.clear(); g.fillStyle(0xc8a060); g.fillEllipse(P+13, P+10, 26, 20);
    g.lineStyle(2, 0x907038); g.strokeEllipse(P+13, P+10, 26, 20);
    g.fillStyle(0xa08040);
    g.fillCircle(P+6, P+6, 1.5); g.fillCircle(P+14, P+9, 1.5); g.fillCircle(P+10, P+13, 1.5);
    g.generateTexture('food_potato', 30, 24);

    // Cereal — sa-cereal: #f5e8c8 / #b8a878
    g.clear(); g.fillStyle(0xf5e8c8); g.fillRoundedRect(P, P+4, 28, 16, { tl: 4, tr: 4, bl: 12, br: 12 });
    g.lineStyle(2, 0xb8a878); g.strokeRoundedRect(P, P+4, 28, 16, { tl: 4, tr: 4, bl: 12, br: 12 });
    g.fillStyle(0xd89030); g.fillRect(P+3, P+6, 4, 4); g.fillRect(P+13, P+6, 4, 4);
    g.fillStyle(0xc87820); g.fillRect(P+8, P+7, 4, 4); g.fillRect(P+18, P+7, 4, 4);
    g.fillStyle(0xd89030); g.fillRect(P+6, P+11, 4, 4); g.fillRect(P+16, P+11, 4, 4);
    g.fillStyle(0xc87820); g.fillRect(P+11, P+11, 4, 4);
    g.generateTexture('food_cereal', 32, 24);

    // Tortilla — sa-tortilla: #e8d0a0 / #a89868
    g.clear(); g.fillStyle(0xe8d0a0); g.fillEllipse(P+14, P+8, 28, 16);
    g.lineStyle(2, 0xa89868); g.strokeEllipse(P+14, P+8, 28, 16);
    g.fillStyle(0xc8a870);
    g.fillCircle(P+8, P+6, 1); g.fillCircle(P+15, P+8, 1); g.fillCircle(P+22, P+7, 1);
    g.fillCircle(P+11, P+11, 1); g.fillCircle(P+18, P+11, 1);
    g.generateTexture('food_tortilla', 32, 20);

    // Pita — sa-pita: #e0c890 / #a89060
    g.clear(); g.fillStyle(0xe0c890); g.fillRoundedRect(P, P, 28, 18, { tl: 14, tr: 14, bl: 3, br: 3 });
    g.lineStyle(2, 0xa89060); g.strokeRoundedRect(P, P, 28, 18, { tl: 14, tr: 14, bl: 3, br: 3 });
    g.fillStyle(0xc0a870); g.fillRoundedRect(P+4, P+13, 20, 2, 1);
    g.generateTexture('food_pita', 32, 22);

    // --- L1 FIBRE+ ---

    // Whole Grain — sa-bread-brown: #906020 / #604010
    g.clear(); g.fillStyle(0x906020); g.fillRoundedRect(P, P, 28, 24, { tl: 8, tr: 8, bl: 3, br: 3 });
    g.lineStyle(2, 0x604010); g.strokeRoundedRect(P, P, 28, 24, { tl: 8, tr: 8, bl: 3, br: 3 });
    g.fillStyle(0xc89050);
    g.fillCircle(P+6, P+6, 1.5); g.fillCircle(P+12, P+7, 1.5);
    g.fillCircle(P+9, P+12, 1.5); g.fillCircle(P+21, P+11, 1.5);
    g.fillStyle(0xb88040);
    g.fillCircle(P+18, P+6, 1.5); g.fillCircle(P+15, P+11, 1.5);
    g.generateTexture('food_brown_bread', 32, 28);

    // Brown Rice — sa-rice-brown: #a08050 / #705830
    g.clear(); g.fillStyle(0xa08050); g.fillRoundedRect(P, P+4, 30, 18, { tl: 4, tr: 4, bl: 12, br: 12 });
    g.lineStyle(2, 0x705830); g.strokeRoundedRect(P, P+4, 30, 18, { tl: 4, tr: 4, bl: 12, br: 12 });
    g.fillStyle(0xa08050); g.lineStyle(1, 0x705830);
    g.fillCircle(P+7, P+2, 2); g.strokeCircle(P+7, P+2, 2);
    g.fillCircle(P+14, P+1, 2); g.strokeCircle(P+14, P+1, 2);
    g.fillCircle(P+21, P+2, 2); g.strokeCircle(P+21, P+2, 2);
    g.generateTexture('food_brown_rice', 34, 26);

    // Oats — sa-oats: #d4b87a / #a08848
    g.clear(); g.fillStyle(0xd4b87a); g.fillRoundedRect(P, P+4, 28, 16, { tl: 4, tr: 4, bl: 12, br: 12 });
    g.lineStyle(2, 0xa08848); g.strokeRoundedRect(P, P+4, 28, 16, { tl: 4, tr: 4, bl: 12, br: 12 });
    g.fillStyle(0xc8a868); g.fillRoundedRect(P+3, P+7, 22, 3, 1); g.fillRoundedRect(P+3, P+12, 22, 3, 1);
    g.generateTexture('food_oats', 32, 24);

    // Banana — sa-banana: #f0d040 / #b8a020
    g.clear(); g.fillStyle(0xf0d040); g.fillRoundedRect(P, P, 28, 14, { tl: 14, tr: 14, bl: 6, br: 6 });
    g.lineStyle(2, 0xb8a020); g.strokeRoundedRect(P, P, 28, 14, { tl: 14, tr: 14, bl: 6, br: 6 });
    g.fillStyle(0x5a3a1a); g.fillCircle(P+27, P+7, 2);
    g.generateTexture('food_banana', 32, 18);

    // Apple — sa-apple: #dd3333 / #991818
    g.clear(); g.fillStyle(0xdd3333); g.fillRoundedRect(P, P+7, 24, 26, { tl: 12, tr: 12, bl: 10, br: 10 });
    g.lineStyle(2, 0x991818); g.strokeRoundedRect(P, P+7, 24, 26, { tl: 12, tr: 12, bl: 10, br: 10 });
    g.fillStyle(0x5a3a1a); g.fillRect(P+10, P, 3, 7);
    g.lineStyle(1, 0x3a2010); g.strokeRect(P+10, P, 3, 7);
    g.fillStyle(0x3a8a2a); g.fillRoundedRect(P+15, P, 8, 6, { tl: 4, tr: 4, bl: 0, br: 4 });
    g.lineStyle(1, 0x286018); g.strokeRoundedRect(P+15, P, 8, 6, { tl: 4, tr: 4, bl: 0, br: 4 });
    g.generateTexture('food_apple', 28, 37);

    // Orange — sa-orange: #e89020 / #a86010
    g.clear(); g.fillStyle(0xe89020); g.fillCircle(P+12, P+14, 12);
    g.lineStyle(2, 0xa86010); g.strokeCircle(P+12, P+14, 12);
    g.fillStyle(0x3a8a2a); g.fillCircle(P+12, P+2, 2.5);
    g.lineStyle(1, 0x286018); g.strokeCircle(P+12, P+2, 2.5);
    g.fillStyle(0xd07818);
    g.fillRect(P+7, P+11, 3, 6); g.fillRect(P+12, P+12, 3, 6); g.fillRect(P+17, P+11, 3, 6);
    g.generateTexture('food_orange', 28, 32);

    // Sweetcorn — sa-sweetcorn: #f0d040 / #b8a020
    g.clear(); g.fillStyle(0xf0d040); g.fillRoundedRect(P, P+5, 14, 28, 6);
    g.lineStyle(2, 0xb8a020); g.strokeRoundedRect(P, P+5, 14, 28, 6);
    g.fillStyle(0x3a8a2a); g.fillRoundedRect(P+3, P, 8, 6, 2);
    g.lineStyle(1, 0x286018); g.strokeRoundedRect(P+3, P, 8, 6, 2);
    g.fillStyle(0xc8a020);
    for (let r = 0; r < 5; r++) { g.fillCircle(P+4, P+9+r*5, 1); g.fillCircle(P+10, P+9+r*5, 1); }
    g.generateTexture('food_sweetcorn', 18, 37);

    // Pear — sa-pear: #a8c840 / #789020
    g.clear(); g.fillStyle(0xa8c840); g.fillRoundedRect(P, P+5, 20, 28, { tl: 8, tr: 8, bl: 10, br: 10 });
    g.lineStyle(2, 0x789020); g.strokeRoundedRect(P, P+5, 20, 28, { tl: 8, tr: 8, bl: 10, br: 10 });
    g.fillStyle(0x5a3a1a); g.fillRect(P+8, P, 3, 6);
    g.lineStyle(1, 0x3a2010); g.strokeRect(P+8, P, 3, 6);
    g.generateTexture('food_pear', 24, 37);

    // Raspberries — sa-raspberries: #cc2244 / #881428
    g.clear(); g.fillStyle(0xcc2244); g.fillEllipse(P+11, P+10, 22, 20);
    g.lineStyle(2, 0x881428); g.strokeEllipse(P+11, P+10, 22, 20);
    g.fillStyle(0xdd4466);
    const rp = [[4,4],[8,4],[12,5],[16,4],[6,8],[10,7],[14,8],[4,11],[8,11],[12,10],[16,11]];
    for (const [rx, ry] of rp) g.fillCircle(P+rx, P+ry, 1.5);
    g.generateTexture('food_raspberries', 26, 24);

    // Watermelon — sa-watermelon: #3a8a2a / #286018
    g.clear(); g.fillStyle(0x3a8a2a); g.fillRoundedRect(P, P, 28, 16, { tl: 0, tr: 0, bl: 14, br: 14 });
    g.lineStyle(2, 0x286018); g.strokeRoundedRect(P, P, 28, 16, { tl: 0, tr: 0, bl: 14, br: 14 });
    g.fillStyle(0xe85060); g.fillRoundedRect(P+2, P, 24, 12, { tl: 0, tr: 0, bl: 10, br: 10 });
    g.lineStyle(1, 0xc84050); g.beginPath(); g.moveTo(P+2, P+11); g.lineTo(P+26, P+11); g.strokePath();
    g.generateTexture('food_watermelon', 32, 20);

    // Grapes — sa-grapes: #8040a0 / #5a2070
    g.clear();
    g.fillStyle(0x5a3a1a); g.fillRect(P+7, P, 3, 5);
    g.lineStyle(1, 0x3a2010); g.strokeRect(P+7, P, 3, 5);
    g.fillStyle(0x8040a0);
    const gp = [[4,17],[10,17],[7,12],[13,12],[10,7]];
    for (const [gx, gy] of gp) { g.fillCircle(P+gx, P+gy, 2.5); g.lineStyle(1, 0x5a2070); g.strokeCircle(P+gx, P+gy, 2.5); }
    g.generateTexture('food_grapes', 22, 26);

    // Cherry — sa-cherry: #cc2020 / #881010
    g.clear(); g.lineStyle(2, 0x5a3a1a); g.beginPath();
    g.arc(P+11, P+5, 7, Math.PI, 0, false); g.strokePath();
    g.fillStyle(0xcc2020); g.fillCircle(P+6, P+16, 5);
    g.lineStyle(2, 0x881010); g.strokeCircle(P+6, P+16, 5);
    g.fillStyle(0xcc2020); g.fillCircle(P+18, P+16, 5);
    g.lineStyle(2, 0x881010); g.strokeCircle(P+18, P+16, 5);
    g.generateTexture('food_cherry', 28, 26);

    // Broccoli — sa-broccoli: top #3a8a2a/#286018, stem #5a9a3a/#3a7020
    g.clear();
    g.fillStyle(0x5a9a3a); g.fillRoundedRect(P+8, P+18, 8, 12, { tl: 0, tr: 0, bl: 3, br: 3 });
    g.lineStyle(2, 0x3a7020); g.strokeRoundedRect(P+8, P+18, 8, 12, { tl: 0, tr: 0, bl: 3, br: 3 });
    g.fillStyle(0x3a8a2a); g.fillRoundedRect(P, P+2, 24, 18, { tl: 12, tr: 12, bl: 5, br: 5 });
    g.lineStyle(2, 0x286018); g.strokeRoundedRect(P, P+2, 24, 18, { tl: 12, tr: 12, bl: 5, br: 5 });
    g.fillStyle(0x4a9a3a);
    g.fillCircle(P+5, P+6, 2); g.fillCircle(P+11, P+4, 2); g.fillCircle(P+17, P+5, 2);
    g.fillCircle(P+8, P+10, 2); g.fillCircle(P+14, P+9, 2); g.fillCircle(P+20, P+7, 2);
    g.generateTexture('food_broccoli', 28, 34);

    // Carrots — sa-carrots: #e87830 / #a85018
    g.clear(); g.fillStyle(0xe87830); g.fillRoundedRect(P, P+6, 14, 28, { tl: 3, tr: 3, bl: 7, br: 7 });
    g.lineStyle(2, 0xa85018); g.strokeRoundedRect(P, P+6, 14, 28, { tl: 3, tr: 3, bl: 7, br: 7 });
    g.fillStyle(0x3a8a2a); g.fillRoundedRect(P, P, 14, 8, { tl: 4, tr: 4, bl: 0, br: 0 });
    g.lineStyle(1, 0x286018); g.strokeRoundedRect(P, P, 14, 8, { tl: 4, tr: 4, bl: 0, br: 0 });
    g.fillStyle(0xc86820);
    g.fillRect(P+5, P+10, 2, 10); g.fillRect(P+7, P+12, 2, 10); g.fillRect(P+3, P+13, 2, 8);
    g.generateTexture('food_carrots', 18, 38);

    // Tomato — sa-tomato: #dd3030 / #991818
    g.clear(); g.fillStyle(0xdd3030); g.fillCircle(P+12, P+12, 12);
    g.lineStyle(2, 0x991818); g.strokeCircle(P+12, P+12, 12);
    g.lineStyle(2, 0xb42828, 0.45);
    g.beginPath(); g.arc(P+8, P+12, 5, Math.PI*0.5, Math.PI*1.5, false); g.strokePath();
    g.beginPath(); g.arc(P+16, P+12, 5, -Math.PI*0.5, Math.PI*0.5, false); g.strokePath();
    g.generateTexture('food_tomato', 28, 28);

    // Cucumber — sa-cucumber: #3a8a3a / #286028
    g.clear(); g.fillStyle(0x3a8a3a); g.fillRoundedRect(P, P, 14, 26, 7);
    g.lineStyle(2, 0x286028); g.strokeRoundedRect(P, P, 14, 26, 7);
    g.fillStyle(0xa0d8a0); g.fillRoundedRect(P+4, P+3, 5, 14, 3);
    g.generateTexture('food_cucumber', 18, 30);

    // Sweet Potato — sa-sweetpotato: #c86030 / #904018
    g.clear(); g.fillStyle(0xc86030); g.fillEllipse(P+14, P+9, 28, 18);
    g.lineStyle(2, 0x904018); g.strokeEllipse(P+14, P+9, 28, 18);
    g.fillStyle(0xe88848); g.fillRoundedRect(P+7, P+5, 14, 5, 3);
    g.generateTexture('food_sweetpotato', 32, 22);

    // Chia Seeds — sa-chia: #f0ece0 / #b8b098
    g.clear(); g.fillStyle(0xf0ece0); g.fillCircle(P+12, P+12, 12);
    g.lineStyle(2, 0xb8b098); g.strokeCircle(P+12, P+12, 12);
    g.fillStyle(0x555555);
    const cp = [[5,5],[9,6],[13,5],[17,6],[4,9],[8,10],[12,9],[16,10],[6,13],[10,14],[14,13],[4,17],[8,17],[12,17]];
    for (const [cx, cy] of cp) g.fillCircle(P+cx, P+cy, 1);
    g.generateTexture('food_chia', 28, 28);

    // --- NEUTRAL (L2 Protein) ---

    // Egg — sa-egg: #f8f0e0 / #c0b898
    g.clear(); g.fillStyle(0xf8f0e0); g.fillRoundedRect(P, P, 22, 26, { tl: 11, tr: 11, bl: 10, br: 10 });
    g.lineStyle(2, 0xc0b898); g.strokeRoundedRect(P, P, 22, 26, { tl: 11, tr: 11, bl: 10, br: 10 });
    g.fillStyle(0xe8a828); g.fillCircle(P+11, P+14, 5);
    g.lineStyle(2, 0xd09020); g.strokeCircle(P+11, P+14, 5);
    g.generateTexture('food_egg', 26, 30);

    // Chicken — sa-chicken: #d8a050 / #a07028
    g.clear(); g.fillStyle(0xd8a050); g.fillRoundedRect(P, P, 32, 18, { tl: 9, tr: 4, bl: 9, br: 4 });
    g.lineStyle(2, 0xa07028); g.strokeRoundedRect(P, P, 32, 18, { tl: 9, tr: 4, bl: 9, br: 4 });
    g.fillStyle(0xf0e8d0); g.beginPath(); g.moveTo(P+32, P+3); g.lineTo(P+40, P+9); g.lineTo(P+32, P+15); g.closePath(); g.fillPath();
    g.fillStyle(0xf0e8d0); g.fillRoundedRect(P+38, P+4, 6, 10, 3);
    g.lineStyle(2, 0xb8a890); g.strokeRoundedRect(P+38, P+4, 6, 10, 3);
    g.generateTexture('food_chicken', 50, 22);

    // Cheese — sa-cheese: #f0c840 / #b89020
    g.clear(); g.fillStyle(0xf0c840);
    g.beginPath(); g.moveTo(P+4, P); g.lineTo(P+26, P); g.lineTo(P+26, P+22); g.lineTo(P, P+22); g.lineTo(P+4, P+11); g.closePath(); g.fillPath();
    g.lineStyle(2, 0xb89020);
    g.beginPath(); g.moveTo(P+4, P); g.lineTo(P+26, P); g.lineTo(P+26, P+22); g.lineTo(P, P+22); g.lineTo(P+4, P+11); g.closePath(); g.strokePath();
    g.fillStyle(0xd8a830); g.fillCircle(P+12, P+6, 2); g.fillCircle(P+19, P+11, 2); g.fillCircle(P+10, P+15, 2);
    g.generateTexture('food_cheese', 30, 26);

    // --- FUN FOODS ---

    // Fries — sa-fries: sticks #f0d040/#c8a020, container #cc2020/#881010
    g.clear();
    g.fillStyle(0xf0d040); g.lineStyle(1, 0xc8a020);
    g.fillRect(P+5, P, 3, 16); g.strokeRect(P+5, P, 3, 16);
    g.fillStyle(0xe8c020); g.fillRect(P+10, P+2, 3, 14); g.strokeRect(P+10, P+2, 3, 14);
    g.fillStyle(0xf0d040); g.fillRect(P+15, P, 3, 15); g.strokeRect(P+15, P, 3, 15);
    g.fillStyle(0xcc2020); g.fillRoundedRect(P+1, P+14, 22, 14, { tl: 0, tr: 0, bl: 2, br: 2 });
    g.lineStyle(2, 0x881010); g.strokeRoundedRect(P+1, P+14, 22, 14, { tl: 0, tr: 0, bl: 2, br: 2 });
    g.generateTexture('food_fries', 28, 32);

    // Cookie — sa-cookie: #c89040 / #906020
    g.clear(); g.fillStyle(0xc89040); g.fillCircle(P+13, P+13, 13);
    g.lineStyle(2, 0x906020); g.strokeCircle(P+13, P+13, 13);
    g.fillStyle(0x503020);
    g.fillCircle(P+6, P+7, 2); g.fillCircle(P+15, P+8, 2);
    g.fillCircle(P+10, P+14, 2); g.fillCircle(P+19, P+14, 2); g.fillCircle(P+14, P+19, 2);
    g.generateTexture('food_cookie', 30, 30);

    // Donut — sa-donut: body #e89850/#b06828, glaze #f0a0c8/#b86888
    g.clear();
    g.fillStyle(0xe89850); g.fillCircle(P+15, P+15, 13);
    g.lineStyle(2, 0xb06828); g.strokeCircle(P+15, P+15, 13);
    g.fillStyle(0xf0a0c8); g.fillRoundedRect(P, P, 30, 15, { tl: 14, tr: 14, bl: 0, br: 0 });
    g.lineStyle(2, 0xb86888); g.strokeRoundedRect(P, P, 30, 15, { tl: 14, tr: 14, bl: 0, br: 0 });
    g.lineStyle(2, 0xb06828); g.strokeCircle(P+15, P+15, 3);
    g.generateTexture('food_donut', 34, 32);

    g.destroy();
  }

  generateEnergyCell() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xccaa20); g.fillCircle(8, 8, 7);
    g.fillStyle(0xf0d860, 0.8); g.fillCircle(7, 7, 5);
    g.fillStyle(0xffffff, 0.5); g.fillCircle(6, 5, 2);
    g.generateTexture('energy_cell', 16, 16);
    g.destroy();
  }

  generateEnergyBall() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xe0c040); g.fillCircle(6, 6, 6);
    g.fillStyle(0xf0dd70, 0.7); g.fillCircle(5, 5, 4);
    g.fillStyle(0xffffff, 0.6); g.fillCircle(4, 3, 2);
    g.generateTexture('energy_ball', 12, 12);
    g.destroy();
  }

  generateFibreTag() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x3a8a2a);
    g.beginPath();
    g.moveTo(5, 0); g.lineTo(10, 5); g.lineTo(5, 10); g.lineTo(0, 5);
    g.closePath(); g.fillPath();
    g.fillStyle(0x80ff80, 0.6);
    g.beginPath();
    g.moveTo(5, 1); g.lineTo(8, 5); g.lineTo(5, 9); g.lineTo(2, 5);
    g.closePath(); g.fillPath();
    g.fillStyle(0xffffff, 0.4);
    g.fillCircle(4, 4, 1.5);
    g.generateTexture('fibre_tag', 10, 10);
    g.destroy();
  }

  generateSpeakerIcons() {
    // Music note ON
    const m1 = this.make.graphics({ add: false });
    m1.fillStyle(0xf0c040);
    m1.fillEllipse(7, 18, 10, 7);
    m1.fillRect(11, 4, 3, 15);
    m1.fillRect(11, 3, 12, 3);
    m1.fillEllipse(20, 8, 8, 6);
    m1.generateTexture('music_on', 26, 24);
    m1.destroy();

    // Music note OFF
    const m2 = this.make.graphics({ add: false });
    m2.fillStyle(0x666666);
    m2.fillEllipse(7, 18, 10, 7);
    m2.fillRect(11, 4, 3, 15);
    m2.fillRect(11, 3, 12, 3);
    m2.fillEllipse(20, 8, 8, 6);
    m2.lineStyle(2.5, 0xcc4444);
    m2.lineBetween(2, 2, 24, 22);
    m2.generateTexture('music_off', 26, 24);
    m2.destroy();

    // SFX speaker ON
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xf0c040);
    g.fillRect(4, 7, 5, 10);
    g.fillTriangle(9, 5, 9, 19, 17, 12);
    g.lineStyle(2, 0xf0c040);
    g.beginPath(); g.arc(17, 12, 5, -0.7, 0.7); g.strokePath();
    g.beginPath(); g.arc(17, 12, 9, -0.5, 0.5); g.strokePath();
    g.generateTexture('sfx_on', 28, 24);
    g.destroy();

    // SFX speaker OFF
    const g2 = this.make.graphics({ add: false });
    g2.fillStyle(0x666666);
    g2.fillRect(4, 7, 5, 10);
    g2.fillTriangle(9, 5, 9, 19, 17, 12);
    g2.lineStyle(2.5, 0xcc4444);
    g2.lineBetween(19, 6, 27, 18);
    g2.lineBetween(27, 6, 19, 18);
    g2.generateTexture('sfx_off', 28, 24);
    g2.destroy();
  }

  generateTreasureChest() {
    const g = this.make.graphics({ add: false });

    // Closed chest
    g.fillStyle(0x8a5a20); g.fillRoundedRect(0, 10, 32, 22, 3);
    g.lineStyle(2, 0x5a3810); g.strokeRoundedRect(0, 10, 32, 22, 3);
    g.fillStyle(0xa06828); g.fillRoundedRect(0, 0, 32, 14, { tl: 6, tr: 6, bl: 0, br: 0 });
    g.lineStyle(2, 0x5a3810); g.strokeRoundedRect(0, 0, 32, 14, { tl: 6, tr: 6, bl: 0, br: 0 });
    g.fillStyle(0xf0c040); g.fillRect(12, 8, 8, 10);
    g.lineStyle(1, 0xb08020); g.strokeRect(12, 8, 8, 10);
    g.fillStyle(0xf0c040); g.fillCircle(16, 11, 3);
    g.generateTexture('chest_closed', 32, 32);

    // Open chest
    g.clear();
    g.fillStyle(0x8a5a20); g.fillRoundedRect(0, 16, 32, 16, 3);
    g.lineStyle(2, 0x5a3810); g.strokeRoundedRect(0, 16, 32, 16, 3);
    g.fillStyle(0x6a4418); g.fillRect(2, 18, 28, 12);
    g.fillStyle(0xf0c040, 0.6); g.fillRect(4, 20, 24, 8);
    g.fillStyle(0xa06828); g.fillRoundedRect(0, 0, 32, 12, { tl: 6, tr: 6, bl: 0, br: 0 });
    g.lineStyle(2, 0x5a3810); g.strokeRoundedRect(0, 0, 32, 12, { tl: 6, tr: 6, bl: 0, br: 0 });
    g.generateTexture('chest_open', 32, 32);

    g.destroy();
  }

  generateRareItems() {
    const g = this.make.graphics({ add: false });
    const P = 2;

    // Pizza — dough base, red sauce, yellow cheese, green pepper dots
    g.fillStyle(0xd4a040); g.fillCircle(P+14, P+14, 14);
    g.lineStyle(2, 0xa07020); g.strokeCircle(P+14, P+14, 14);
    g.fillStyle(0xcc3020); g.fillCircle(P+14, P+14, 10);
    g.fillStyle(0xf0c840); g.fillCircle(P+10, P+10, 3);
    g.fillStyle(0xf0c840); g.fillCircle(P+18, P+12, 3);
    g.fillStyle(0xf0c840); g.fillCircle(P+13, P+18, 3);
    g.fillStyle(0x40a030); g.fillCircle(P+8, P+16, 2);
    g.fillStyle(0x40a030); g.fillCircle(P+19, P+8, 2);
    g.generateTexture('rare_pizza', 32, 32);

    // Hamburger — bun top, lettuce, patty, bun bottom
    g.clear();
    g.fillStyle(0xc88030); g.fillRoundedRect(P, P, 28, 10, { tl: 10, tr: 10, bl: 0, br: 0 });
    g.lineStyle(2, 0x9a6020); g.strokeRoundedRect(P, P, 28, 10, { tl: 10, tr: 10, bl: 0, br: 0 });
    g.fillStyle(0x50b830); g.fillRect(P, P+10, 28, 4);
    g.fillStyle(0x7a3a10); g.fillRect(P+2, P+14, 24, 6);
    g.lineStyle(1, 0x5a2a08); g.strokeRect(P+2, P+14, 24, 6);
    g.fillStyle(0xc88030); g.fillRoundedRect(P, P+20, 28, 6, { tl: 0, tr: 0, bl: 4, br: 4 });
    g.lineStyle(2, 0x9a6020); g.strokeRoundedRect(P, P+20, 28, 6, { tl: 0, tr: 0, bl: 4, br: 4 });
    g.generateTexture('rare_hamburger', 32, 30);

    // Sushi — nori wrap, rice, salmon
    g.clear();
    g.fillStyle(0x444444); g.fillRoundedRect(P, P, 24, 22, 4);
    g.lineStyle(2, 0x2a2a2a); g.strokeRoundedRect(P, P, 24, 22, 4);
    g.fillStyle(0xf5f0e0); g.fillRoundedRect(P+2, P+2, 20, 18, 2);
    g.fillStyle(0xe87830); g.fillRoundedRect(P+7, P+8, 10, 6, 1);
    g.lineStyle(1, 0xc86020); g.strokeRoundedRect(P+7, P+8, 10, 6, 1);
    g.generateTexture('rare_sushi', 28, 26);

    // Taco — shell, meat, lettuce, cheese
    g.clear();
    g.fillStyle(0xd4a040); g.fillRoundedRect(P, P+8, 28, 16, { tl: 0, tr: 0, bl: 12, br: 12 });
    g.lineStyle(2, 0xa07020); g.strokeRoundedRect(P, P+8, 28, 16, { tl: 0, tr: 0, bl: 12, br: 12 });
    g.fillStyle(0x7a3a10); g.fillRect(P+4, P+10, 20, 5);
    g.fillStyle(0x50b830); g.fillRect(P+3, P+8, 22, 4);
    g.fillStyle(0xf0c840); g.fillRect(P+6, P+6, 4, 3);
    g.fillStyle(0xf0c840); g.fillRect(P+14, P+6, 4, 3);
    g.fillStyle(0xf0c840); g.fillRect(P+20, P+7, 4, 3);
    g.generateTexture('rare_taco', 32, 28);

    g.destroy();
  }

  generatePhantom() {
    const g = this.make.graphics({ add: false });
    const P = 2;

    // Tail wisps — draw first so body covers the junction
    for (let i = 0; i < 4; i++) {
      const wx = P + i * 12;
      g.fillStyle(0x8866aa);
      g.fillRoundedRect(wx, P + 40, 12, 16, { tl: 0, tr: 0, bl: 6, br: 6 });
      g.lineStyle(3, 0x4a3460);
      g.strokeRoundedRect(wx, P + 40, 12, 16, { tl: 0, tr: 0, bl: 6, br: 6 });
    }

    // Body — solid purple dome with bold dark outline (sa-phantom)
    g.fillStyle(0x8866aa);
    g.fillRoundedRect(P, P, 48, 40, { tl: 24, tr: 24, bl: 0, br: 0 });
    g.lineStyle(3, 0x4a3460);
    g.strokeRoundedRect(P, P, 48, 40, { tl: 24, tr: 24, bl: 0, br: 0 });

    // Slit eyes — flat dark bars
    g.fillStyle(0x4a3460);
    g.fillRect(P + 7, P + 18, 10, 3);
    g.fillRect(P + 31, P + 18, 10, 3);

    // Mouth — centered horizontal bar
    g.fillRect(P + 18, P + 30, 12, 2);

    g.generateTexture('phantom', 52, 60);

    // Telegraph shimmer
    g.clear();
    g.fillStyle(0x8866aa, 0.15);
    g.fillCircle(28, 28, 28);
    g.fillStyle(0xccaaff, 0.08);
    g.fillCircle(28, 28, 18);
    g.generateTexture('phantom_telegraph', 56, 56);

    g.destroy();
  }

  generateStar() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xf0c040);
    const cx = 10, cy = 10, outer = 10, inner = 4;
    g.beginPath();
    for (let i = 0; i < 5; i++) {
      const aO = (i * 72 - 90) * Math.PI / 180;
      const aI = ((i * 72) + 36 - 90) * Math.PI / 180;
      g.lineTo(cx + Math.cos(aO) * outer, cy + Math.sin(aO) * outer);
      g.lineTo(cx + Math.cos(aI) * inner, cy + Math.sin(aI) * inner);
    }
    g.closePath(); g.fillPath();
    g.generateTexture('star_icon', 20, 20);
    g.destroy();

    this.generateResultStar('result_star_earned', 0xf0c040, 0xd4a020, true);
    this.generateResultStar('result_star_empty', 0x444455, 0x333344, false);
  }

  generateResultStar(key, fill, outline, glow) {
    const size = 48, cx = size / 2, cy = size / 2;
    const outer = 20, inner = 9;
    const g = this.make.graphics({ add: false });

    const drawStar = (g2, ox, oy, or, ir) => {
      g2.beginPath();
      for (let i = 0; i < 5; i++) {
        const aO = (i * 72 - 90) * Math.PI / 180;
        const aI = ((i * 72) + 36 - 90) * Math.PI / 180;
        g2.lineTo(ox + Math.cos(aO) * or, oy + Math.sin(aO) * or);
        g2.lineTo(ox + Math.cos(aI) * ir, oy + Math.sin(aI) * ir);
      }
      g2.closePath();
    };

    if (glow) {
      g.fillStyle(fill, 0.12);
      drawStar(g, cx, cy, outer + 5, inner + 3);
      g.fillPath();
    }

    // Shadow
    g.fillStyle(outline, 0.5);
    drawStar(g, cx + 1, cy + 2, outer, inner);
    g.fillPath();

    // Main fill
    g.fillStyle(fill);
    drawStar(g, cx, cy, outer, inner);
    g.fillPath();

    // Bold outline
    g.lineStyle(3, outline);
    drawStar(g, cx, cy, outer, inner);
    g.strokePath();

    // Cartoon highlight on upper-left arm
    if (glow) {
      g.fillStyle(0xffffff, 0.4);
      g.fillCircle(cx - 5, cy - 8, 4);
      g.fillStyle(0xffffff, 0.2);
      g.fillCircle(cx - 8, cy - 4, 2.5);
    }

    g.generateTexture(key, size, size);
    g.destroy();
  }

  generateFinishFlag() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x8b6914); g.fillRect(0, 0, 6, 80);
    g.fillStyle(0xf0c040); g.fillRect(6, 0, 30, 20);
    g.fillStyle(0xffffff);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
      if ((r + c) % 2 === 0) g.fillRect(6 + c * 5, r * 5, 5, 5);
    }
    g.generateTexture('finish_flag', 36, 80);
    g.destroy();
  }
}

// =================================================================
// SPLASH SCENE — Instruction splash before L1 (Typewriter Version C)
// =================================================================

class SplashScene extends Phaser.Scene {
  constructor() { super('Splash'); }

  create() {
    const cx = GAME_W / 2, cy = GAME_H / 2;

    // Sky background
    const skyGfx = this.add.graphics();
    skyGfx.fillGradientStyle(0x3a7ecf, 0x3a7ecf, 0x5fa8d3, 0x5fa8d3, 1);
    skyGfx.fillRect(0, 0, GAME_W, GAME_H);

    // Sun
    const sun = this.add.graphics();
    sun.fillStyle(0xf0c040); sun.fillCircle(0, 0, 25);
    sun.setPosition(GAME_W - 60, 40);

    // Clouds
    const cg = this.add.graphics();
    cg.fillStyle(0xffffff);
    cg.fillRoundedRect(100, 40, 80, 30, 15);
    cg.fillRoundedRect(110, 28, 40, 25, 12);
    cg.fillRoundedRect(130, 32, 50, 20, 10);
    cg.fillRoundedRect(500, 70, 60, 22, 11);
    cg.fillRoundedRect(508, 60, 35, 18, 9);
    cg.fillRoundedRect(750, 30, 70, 26, 13);
    cg.fillRoundedRect(762, 20, 38, 20, 10);

    // Hills + ground
    const hills = this.add.graphics();
    hills.fillStyle(0x4a8e2e, 0.5);
    hills.fillEllipse(100, GAME_H - 120, 300, 100);
    hills.fillEllipse(525, GAME_H - 120, 250, 80);
    hills.fillEllipse(850, GAME_H - 120, 200, 70);
    const ground = this.add.graphics();
    ground.fillStyle(0x5a9e3e); ground.fillRect(0, GAME_H - 120, GAME_W, 80);
    ground.fillStyle(0x8b6914); ground.fillRect(0, GAME_H - 40, GAME_W, 40);
    ground.lineStyle(4, 0x4a8e2e); ground.lineBetween(0, GAME_H - 120, GAME_W, GAME_H - 120);
    ground.lineStyle(4, 0x6d5410); ground.lineBetween(0, GAME_H - 40, GAME_W, GAME_H - 40);

    // Dimmer overlay
    this.add.rectangle(cx, cy, GAME_W, GAME_H, 0x000000, 0.58);

    // Splash panel
    const panelW = 580, panelH = 340;
    const panelX = cx, panelY = cy;
    this.add.rectangle(panelX, panelY, panelW + 3, panelH + 3, 0xf0c040, 0.35);
    this.add.rectangle(panelX, panelY, panelW, panelH, 0x0c0c18);
    this.add.rectangle(panelX, panelY - panelH / 2 + 1.5, panelW, 3, 0xf0c040);

    const SF = "'Special Elite', 'Courier New', monospace";

    // Header
    const headerY = panelY - panelH / 2 + 36;
    this.add.text(panelX, headerY, 'Level One', {
      fontFamily: SF, fontSize: '13px', color: '#666666', letterSpacing: 4,
    }).setOrigin(0.5);
    this.add.text(panelX, headerY + 26, 'CARBOHYDRATES', {
      fontFamily: SF, fontSize: '30px', color: '#f0c040', letterSpacing: 3,
    }).setOrigin(0.5);
    this.add.rectangle(panelX, headerY + 48, 80, 2, 0xf0c040, 0.27);

    // Fact text
    this.add.text(panelX, headerY + 78, 'Carbs are your body\'s preferred fuel source.\nThey break down into glucose, which powers\nevery cell in your body.', {
      fontFamily: SF, fontSize: '17px', color: '#d8d0c0', align: 'center', lineSpacing: 8,
    }).setOrigin(0.5);

    // Divider
    this.add.rectangle(panelX, headerY + 120, panelW - 72, 1, 0xffffff, 0.04);

    // Mission section (typed in)
    const sectY = headerY + 138;
    const missionLabel = this.add.text(panelX - panelW / 2 + 40, sectY, 'YOUR MISSION', {
      fontFamily: SF, fontSize: '12px', color: '#80cc60', letterSpacing: 3,
    }).setAlpha(0);
    const missionBar = this.add.rectangle(panelX - panelW / 2 + 42, sectY + 19, 2, 0, 0xffffff, 0.04).setOrigin(0, 0);
    const missionText = this.add.text(panelX - panelW / 2 + 56, sectY + 20, '', {
      fontFamily: SF, fontSize: '15px', color: '#999999', lineSpacing: 6, wordWrap: { width: panelW - 120 },
    });

    // Hazard section (typed in after mission)
    const hazardY = sectY + 74;
    const hazardLabel = this.add.text(panelX - panelW / 2 + 40, hazardY, 'WATCH OUT', {
      fontFamily: SF, fontSize: '12px', color: '#cc6655', letterSpacing: 3,
    }).setAlpha(0);
    const hazardBar = this.add.rectangle(panelX - panelW / 2 + 42, hazardY + 19, 2, 0, 0xffffff, 0.04).setOrigin(0, 0);
    const hazardText = this.add.text(panelX - panelW / 2 + 56, hazardY + 20, '', {
      fontFamily: SF, fontSize: '15px', color: '#997777', lineSpacing: 6, wordWrap: { width: panelW - 180 },
    });

    // Phantom sprite next to hazard text
    const phantomImg = this.add.image(panelX + panelW / 2 - 60, hazardY + 32, 'phantom').setAlpha(0).setScale(0.9);

    // Start prompt
    const promptText = this.add.text(panelX, panelY + panelH / 2 - 24, 'PRESS ANY KEY TO START', {
      fontFamily: SF, fontSize: '14px', color: '#f0c040', letterSpacing: 4,
    }).setOrigin(0.5).setAlpha(0);

    // Typewriter animation with click-to-skip
    const TYPE_SPEED = 40;
    const missionStr = 'Collect all the carbs. Bonus points are awarded for collecting all fibre-rich carbs as well.';
    const hazardStr = 'Fatigue Phantoms drain your energy \u2026 if they catch you!';

    this.startEnabled = false;
    this.animComplete = false;
    this.typingStarted = false;
    this.activeTimers = [];

    // Initial prompt — wait for user interaction to init audio & start typewriter
    const beginPrompt = this.add.text(panelX, panelY + panelH / 2 - 24, 'CLICK OR PRESS ANY KEY', {
      fontFamily: SF, fontSize: '14px', color: '#f0c040', letterSpacing: 4,
    }).setOrigin(0.5).setAlpha(1);
    this.tweens.add({
      targets: beginPrompt, alpha: 0.35, duration: 600,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
    });

    const showComplete = () => {
      if (this.animComplete) return;
      this.animComplete = true;
      this.activeTimers.forEach(t => t.remove && t.remove());
      this.activeTimers = [];
      missionLabel.setAlpha(1); missionBar.setSize(2, 34);
      missionText.setText(missionStr);
      hazardLabel.setAlpha(1); hazardBar.setSize(2, 34);
      hazardText.setText(hazardStr);
      phantomImg.setAlpha(1).setScale(1);
      promptText.setAlpha(1);
      this.tweens.add({
        targets: promptText, alpha: 0.35, duration: 600,
        yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
      });
      this.startEnabled = true;
    };

    const typeText = (textObj, str, speed, cb) => {
      let i = 0;
      const timer = this.time.addEvent({
        delay: speed, repeat: str.length - 1,
        callback: () => {
          if (this.animComplete) return;
          i++;
          textObj.setText(str.slice(0, i));
          if (str[i - 1] !== ' ') SFX.typeClick();
          if (i >= str.length && cb) cb();
        },
      });
      this.activeTimers.push(timer);
      return timer;
    };

    const startTypewriter = () => {
      beginPrompt.destroy();
      const d1 = this.time.delayedCall(300, () => {
        missionLabel.setAlpha(1); missionBar.setSize(2, 34);
        const d2 = this.time.delayedCall(400, () => {
          typeText(missionText, missionStr, TYPE_SPEED, () => {
            const d3 = this.time.delayedCall(350, () => {
              hazardLabel.setAlpha(1); hazardBar.setSize(2, 34);
              const d4 = this.time.delayedCall(400, () => {
                typeText(hazardText, hazardStr, TYPE_SPEED, () => {
                  this.tweens.add({ targets: phantomImg, alpha: 1, scale: 1, duration: 400 });
                  const d5 = this.time.delayedCall(500, () => {
                    promptText.setAlpha(1);
                    this.tweens.add({
                      targets: promptText, alpha: 0.35, duration: 600,
                      yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
                    });
                    this.startEnabled = true;
                    this.animComplete = true;
                  });
                  this.activeTimers.push(d5);
                });
              });
              this.activeTimers.push(d4);
            });
            this.activeTimers.push(d3);
          });
        });
        this.activeTimers.push(d2);
      });
      this.activeTimers.push(d1);
    };

    const handleInput = () => {
      SFX.init(); SFX.resume();
      if (this.startEnabled) { this.scene.start('Game'); return; }
      if (!this.typingStarted) { this.typingStarted = true; startTypewriter(); return; }
      if (!this.animComplete) showComplete();
    };

    this.input.keyboard.on('keydown', handleInput);
    this.input.on('pointerdown', handleInput);

    // Audio toggles on splash
    const musicIcon = this.add.image(GAME_W - 54, GAME_H - 24, SFX.musicMuted ? 'music_off' : 'music_on')
      .setDepth(100).setInteractive({ useHandCursor: true }).setScale(1.2);
    musicIcon.on('pointerdown', (p, lx, ly, e) => {
      e.stopPropagation();
      SFX.init(); SFX.resume();
      const m = SFX.toggleMusic();
      musicIcon.setTexture(m ? 'music_off' : 'music_on');
    });
    const sfxIcon = this.add.image(GAME_W - 24, GAME_H - 24, SFX.sfxMuted ? 'sfx_off' : 'sfx_on')
      .setDepth(100).setInteractive({ useHandCursor: true }).setScale(1.2);
    sfxIcon.on('pointerdown', (p, lx, ly, e) => {
      e.stopPropagation();
      SFX.init(); SFX.resume();
      const m = SFX.toggleSfx();
      sfxIcon.setTexture(m ? 'sfx_off' : 'sfx_on');
    });
  }
}

// =================================================================
// GAME SCENE — Main L1 gameplay
// =================================================================

class GameScene extends Phaser.Scene {
  constructor() { super('Game'); }

  create() {
    this.physics.world.setBounds(0, 0, LEVEL_W, GAME_H);
    this.cameras.main.setBounds(0, 0, LEVEL_W, GAME_H);

    this.energy = ENERGY_START;
    this.carbsCollected = 0;
    this.fibreCollected = 0;
    this.neutralCollected = 0;
    this.funCollected = 0;
    this.rareCollected = 0;
    this.cellsCollected = 0;
    this.totalCarbItems = 0;
    this.totalFibreItems = 0;
    this.dmgTaken = false;
    this.isInvincible = false;
    this.levelComplete = false;
    this.levelFailed = false;
    this.isPaused = false;
    this.hasStartedMoving = false;
    this.foundAlcove = false;
    this.fibreItemsFound = [];
    this.startTime = this.time.now;

    this.drawBackground();
    this.createGround();
    this.createPlatforms();
    this.createPlayer();
    this.createFoods();
    this.createEnergyCells();
    this.createPhantoms();
    this.createCrashPits();
    this.createHiddenAlcove();
    this.createTreasureChest();
    this.createFinish();
    this.createHUD();

    this.createEnergyBalls();

    this.cameras.main.startFollow(this.player, true, 0.08, 0);
    this.cameras.main.setDeadzone(100, GAME_H);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    this.input.on('pointerdown', (pointer, targets) => {
      if (this.levelComplete || this.levelFailed || this.isPaused) return;
      if (targets.length > 0) return;
      this.fireEnergyBall(pointer);
    });
    this.keyF.on('down', () => {
      if (this.levelComplete || this.levelFailed || this.isPaused) return;
      this.fireEnergyBall({ x: this.input.activePointer.x, y: this.input.activePointer.y });
    });

    this.createTutorialOverlay();
    SFX.startMusic();
  }

  createTutorialOverlay() {
    const cx = GAME_W / 2, cy = GAME_H / 2;
    const SF = "'Special Elite', 'Courier New', monospace";
    this.tutorialGroup = this.add.group();

    const pW = 520, pH = 250;
    const dim = this.add.rectangle(cx, cy, GAME_W, GAME_H, 0x000000, 0.7).setScrollFactor(0).setDepth(200);
    const panel = this.add.rectangle(cx, cy, pW, pH, 0x0c0c18, 0.95).setScrollFactor(0).setDepth(201);
    const border = this.add.rectangle(cx, cy, pW, pH).setStrokeStyle(2, 0xf0c040, 0.5).setScrollFactor(0).setDepth(201);

    const title = this.add.text(cx, cy - pH / 2 + 24, 'CONTROLS', {
      fontFamily: SF, fontSize: '18px', color: '#f0c040', letterSpacing: 4,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(202);

    const lines = [
      { key: 'A / D  or  ← →', action: 'Move left / right' },
      { key: 'W  or  SPACE', action: 'Jump' },
      { key: 'F  or  CLICK', action: 'Shoot energy ball (aim with mouse)' },
      { key: 'P', action: 'Pause' },
    ];
    const leftX = cx - pW / 2 + 30;
    const rightX = cx + 10;
    const lineObjs = lines.map((l, i) => {
      const y = cy - 40 + i * 32;
      const k = this.add.text(leftX, y, l.key, {
        fontFamily: SF, fontSize: '13px', color: '#f0c040',
      }).setScrollFactor(0).setDepth(202);
      const v = this.add.text(rightX, y, l.action, {
        fontFamily: SF, fontSize: '13px', color: '#999999',
      }).setScrollFactor(0).setDepth(202);
      return [k, v];
    });

    const hint = this.add.text(cx, cy + pH / 2 - 22, 'Press any key to begin', {
      fontFamily: SF, fontSize: '12px', color: '#f0c040', letterSpacing: 2,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(202);
    this.tweens.add({ targets: hint, alpha: 0.35, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    const allObjs = [dim, panel, border, title, hint, ...lineObjs.flat()];
    allObjs.forEach(o => this.tutorialGroup.add(o));

    this.isPaused = true;
    this.physics.world.isPaused = true;

    const dismiss = () => {
      allObjs.forEach(o => o.destroy());
      this.isPaused = false;
      this.physics.world.isPaused = false;
      this.input.keyboard.off('keydown', dismiss);
      this.input.off('pointerdown', dismiss);
    };
    this.input.keyboard.on('keydown', dismiss);
    this.input.on('pointerdown', dismiss);
  }

  drawBackground() {
    const skyGfx = this.add.graphics();
    skyGfx.fillGradientStyle(0x3a7ecf, 0x3a7ecf, 0x5fa8d3, 0x5fa8d3, 1);
    skyGfx.fillRect(0, 0, LEVEL_W, GAME_H);
    skyGfx.setScrollFactor(0.1);
    const sun = this.add.graphics();
    sun.fillStyle(0xf0c040); sun.fillCircle(0, 0, 25);
    sun.setPosition(860, 45); sun.setScrollFactor(0.05);
    this.createCloud(100, 45, 80, 0.15); this.createCloud(500, 75, 60, 0.12);
    this.createCloud(750, 35, 70, 0.18); this.createCloud(1100, 55, 65, 0.14);
    this.createCloud(1500, 40, 75, 0.16); this.createCloud(1900, 70, 55, 0.13);
    this.createCloud(2300, 30, 80, 0.17); this.createCloud(2800, 60, 65, 0.15);
    this.createHill(-50, 300, 100, 0.3); this.createHill(400, 250, 80, 0.25);
    this.createHill(750, 200, 70, 0.3); this.createHill(1100, 280, 90, 0.25);
    this.createHill(1500, 220, 75, 0.3); this.createHill(1900, 260, 85, 0.25);
    this.createHill(2300, 230, 70, 0.3); this.createHill(2700, 290, 95, 0.25);
    this.createHill(3100, 210, 80, 0.3); this.createHill(3500, 270, 88, 0.25);
    for (let x = 20; x < LEVEL_W; x += 80 + Math.random() * 60) {
      this.add.triangle(x, GROUND_Y - 5, 0, 14, 6, 0, 12, 14, 0x4a8e2e);
    }
    const fc = [0xff6688, 0xffcc44, 0xff88aa, 0x88aaff, 0xffaa66];
    for (let x = 55; x < LEVEL_W; x += 200 + Math.random() * 150) {
      this.add.circle(x, GROUND_Y - 3, 4, Phaser.Utils.Array.GetRandom(fc));
      this.add.rectangle(x, GROUND_Y + 2, 2, 8, 0x3a8a2a);
    }
  }

  createCloud(x, y, w, sf) {
    const g = this.add.graphics(); g.fillStyle(0xffffff);
    const h = w * 0.35;
    g.fillRoundedRect(0, h * 0.3, w, h, h / 2);
    g.fillEllipse(w * 0.3, h * 0.15, w * 0.45, h * 0.7);
    g.fillEllipse(w * 0.6, h * 0.1, w * 0.5, h * 0.6);
    g.setPosition(x, y); g.setScrollFactor(sf);
  }

  createHill(x, w, h, sf) {
    const g = this.add.graphics(); g.fillStyle(0x4a8e2e, 0.5);
    g.fillEllipse(w / 2, h, w, h * 2);
    g.setPosition(x, GROUND_Y - h); g.setScrollFactor(sf);
  }

  createGround() {
    const gg = this.add.graphics();
    gg.fillStyle(0x5a9e3e); gg.fillRect(0, GROUND_Y, LEVEL_W, GROUND_H);
    gg.fillStyle(0x4a8e2e); gg.fillRect(0, GROUND_Y, LEVEL_W, 6);
    gg.fillStyle(0x8b6914); gg.fillRect(0, GROUND_Y + GROUND_H - 40, LEVEL_W, 40);
    gg.fillStyle(0x6d5410); gg.fillRect(0, GROUND_Y + GROUND_H - 40, LEVEL_W, 4);
    this.ground = this.physics.add.staticGroup();
    const gb = this.add.rectangle(LEVEL_W / 2, GROUND_Y + 12, LEVEL_W, 24, 0x000000, 0);
    this.ground.add(gb); gb.body.updateFromGameObject();
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    for (const p of L1.platforms) {
      const pg = this.add.graphics();
      pg.fillStyle(0x8b6914); pg.fillRect(0, 4, p.w, 20);
      pg.fillStyle(0x6d5410); pg.fillRect(0, 21, p.w, 3);
      for (let px = 0; px < p.w; px += 8) {
        pg.fillStyle(px % 16 < 8 ? 0x5a9e3e : 0x4a8e2e);
        pg.fillRect(px, 0, 8, 4);
      }
      pg.setPosition(p.x, p.y);
      const pb = this.add.rectangle(p.x + p.w / 2, p.y + 12, p.w, 24, 0x000000, 0);
      this.platforms.add(pb); pb.body.updateFromGameObject();
    }
  }

  createPlayer() {
    this.player = this.physics.add.sprite(80, GROUND_Y - 40, 'nibble');
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(32, 44); this.player.body.setOffset(8, 7);
    this.player.setDepth(10);
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.platforms);
  }

  createFoods() {
    this.foodGroup = this.physics.add.group({ allowGravity: false });
    for (const f of L1.foods) {
      const def = FOOD_DEFS[f.id];
      let y;
      if (f.aboveY) {
        y = f.aboveY - def.h / 2;
      } else if (f.onGround) {
        y = GROUND_Y - def.h / 2 - 4;
      } else {
        const plat = L1.platforms[f.platIdx];
        y = plat.y - def.h / 2 - 4;
      }
      const sprite = this.foodGroup.create(f.x, y, 'food_' + f.id);
      sprite.setData('foodId', f.id);
      sprite.setData('type', def.type);
      sprite.setData('name', def.name);
      sprite.setData('fun', !!f.fun);
      sprite.body.setSize(def.w, def.h); sprite.setDepth(5);

      const tweenTargets = [sprite];

      if (def.type === 'fibre') {
        const tag = this.add.image(f.x + def.w / 2 + 4, y - def.h / 2 + 2, 'fibre_tag').setDepth(6);
        sprite.setData('fibreTag', tag);
        tweenTargets.push(tag);
      }

      this.tweens.add({
        targets: tweenTargets, y: '-=4',
        duration: 1200 + Math.random() * 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
      });

      if (def.type === 'starchy' || def.type === 'fibre') {
        this.totalCarbItems++;
        if (def.type === 'fibre') this.totalFibreItems++;
      }
    }
    this.physics.add.overlap(this.player, this.foodGroup, this.collectFood, null, this);
  }

  collectFood(player, food) {
    const type = food.getData('type');
    const id = food.getData('foodId');
    const name = food.getData('name');

    if (type === 'starchy') {
      this.carbsCollected++;
      this.energy = Math.min(100, this.energy + ENERGY_CARB);
      this.showCollectFX(food.x, food.y, '#f0c040', name);
      SFX.collectStarchy();
    } else if (type === 'fibre') {
      this.carbsCollected++;
      this.fibreCollected++;
      this.fibreItemsFound.push(id);
      this.energy = Math.min(100, this.energy + ENERGY_FIBRE);
      this.showCollectFX(food.x, food.y, '#80ff80', name);
      SFX.collectFibre();
    } else if (type === 'fun') {
      this.funCollected++;
      this.energy = Math.min(100, this.energy + ENERGY_FUN);
      this.showCollectFX(food.x, food.y, '#ff9966', name);
      SFX.collectFun();
    } else {
      this.neutralCollected++;
      this.energy = Math.min(100, this.energy + ENERGY_NEUTRAL);
      this.showCollectFX(food.x, food.y, '#aaaaff', name);
      SFX.collectStarchy();
    }
    const tag = food.getData('fibreTag');
    if (tag) tag.destroy();
    food.destroy();
    this.updateHUD();
  }

  showCollectFX(x, y, color, text) {
    const fx = this.add.text(x, y - 10, text, {
      fontFamily: 'Courier New', fontSize: '12px', color, stroke: '#000000', strokeThickness: 2,
    }).setOrigin(0.5).setDepth(20);
    this.tweens.add({ targets: fx, y: y - 45, alpha: 0, duration: 1400, ease: 'Power2', onComplete: () => fx.destroy() });
  }

  createEnergyCells() {
    this.cellGroup = this.physics.add.group({ allowGravity: false });
    for (const x of L1.energyCells) {
      const cell = this.cellGroup.create(x, GROUND_Y - 20, 'energy_cell').setDepth(4);
      this.tweens.add({ targets: cell, y: '-=3', duration: 800 + Math.random() * 300, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
    for (const cp of L1.cellsOnPlats) {
      const plat = L1.platforms[cp.pi];
      const cell = this.cellGroup.create(cp.x, plat.y - 18, 'energy_cell').setDepth(4);
      this.tweens.add({ targets: cell, y: '-=3', duration: 800 + Math.random() * 300, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
    this.physics.add.overlap(this.player, this.cellGroup, this.collectCell, null, this);
  }

  collectCell(player, cell) {
    this.cellsCollected++;
    this.showCollectFX(cell.x, cell.y, '#f0d860', '+1');
    SFX.collectCell();
    cell.destroy();
    this.updateHUD();
  }

  createPhantoms() {
    this.phantomGroup = this.physics.add.group({ allowGravity: false });
    this.phantomData = [];
    for (const p of L1.phantoms) {
      const telegraph = this.add.image(p.x, GROUND_Y - 35, 'phantom_telegraph').setAlpha(0).setDepth(3);
      const phantom = this.phantomGroup.create(p.x, GROUND_Y - 35, 'phantom');
      phantom.setAlpha(0).setDepth(6);
      phantom.body.setSize(36, 40);
      phantom.setData('active', false);
      phantom.setData('telegraph', telegraph);
      phantom.setData('originX', p.x);
      phantom.setData('hp', 3);
      this.phantomData.push(phantom);
    }
    this.physics.add.overlap(this.player, this.phantomGroup, this.phantomHit, null, this);
  }

  phantomHit(player, phantom) {
    if (this.isInvincible || !phantom.getData('active') || this.levelComplete || this.levelFailed) return;

    const playerBottom = player.body.y + player.body.height;
    const phantomTop = phantom.body.y;
    const isStomp = player.body.velocity.y > 0 && playerBottom < phantomTop + 16;

    if (isStomp) {
      player.setVelocityY(PLAYER_JUMP * 0.6);
      SFX.stomp();
      this.damagePhantom(phantom, 'Stomped!');
      return;
    }

    this.energy = Math.max(0, this.energy - PHANTOM_DMG);
    this.dmgTaken = true;
    this.isInvincible = true;
    this.showCollectFX(player.x, player.y - 20, '#cc4444', '-Energy!');
    SFX.playerHurt();
    this.tweens.add({
      targets: player, alpha: 0.3, duration: 120, yoyo: true, repeat: 8,
      onComplete: () => { player.setAlpha(1); this.isInvincible = false; },
    });
    this.updateHUD();
  }

  createCrashPits() {
    this.crashPitZones = [];
    for (const cp of L1.crashPits) {
      const cpGfx = this.add.graphics();
      for (let px = 0; px < cp.w; px += 5) {
        cpGfx.fillStyle(Math.floor(px / 5) % 2 === 0 ? 0x8a6a30 : 0x6a5020);
        cpGfx.fillRect(px, 0, 5, 14);
      }
      cpGfx.lineStyle(3, 0x3a2a10);
      cpGfx.strokeRoundedRect(0, 0, cp.w, 14, 3);
      cpGfx.setPosition(cp.x, GROUND_Y - 1); cpGfx.setDepth(2);
      const waveTxt = '~ '.repeat(Math.max(3, Math.floor(cp.w / 16))).trim();
      this.add.text(cp.x + cp.w / 2, GROUND_Y - 9, waveTxt, {
        fontFamily: 'Courier New', fontSize: '10px', color: '#aa8840',
      }).setOrigin(0.5, 0.5).setDepth(2);
      const zone = this.add.zone(cp.x + cp.w / 2, GROUND_Y + 2, cp.w, 16);
      this.physics.add.existing(zone, true);
      this.crashPitZones.push(zone);
    }
  }

  createHiddenAlcove() {
    const cp2 = L1.crashPits[1];
    const ax = cp2.x + cp2.w / 2;
    const ay = 80;
    const aw = 90;
    const ah = 14;

    // Alcove backdrop — a small dark recess behind the platform
    const alcGfx = this.add.graphics();
    alcGfx.fillStyle(0x2a4a1a, 0.6);
    alcGfx.fillRoundedRect(-5, -8, aw + 10, 30, 6);
    alcGfx.fillStyle(0x1a3a10, 0.4);
    alcGfx.fillRoundedRect(0, -4, aw, 22, 4);
    alcGfx.setPosition(ax - aw / 2, ay - 6);
    alcGfx.setDepth(1);

    // Platform the player lands on
    const platGfx = this.add.graphics();
    platGfx.fillStyle(0x5a9e3e);
    platGfx.fillRoundedRect(0, 0, aw, ah, 4);
    platGfx.fillStyle(0x4a8e2e);
    platGfx.fillRect(0, 0, aw, 4);
    platGfx.lineStyle(2, 0x3a7828);
    platGfx.strokeRoundedRect(0, 0, aw, ah, 4);
    platGfx.setPosition(ax - aw / 2, ay);
    platGfx.setDepth(4);

    // Physics body for the platform
    const platBody = this.add.rectangle(ax, ay + ah / 2, aw, ah, 0x000000, 0);
    this.platforms.add(platBody);
    platBody.body.updateFromGameObject();

    // Bonus energy cells on the alcove
    for (let i = 0; i < 5; i++) {
      const cell = this.cellGroup.create(ax - 32 + i * 16, ay - 12, 'energy_cell');
      cell.body.allowGravity = false;
      cell.setDepth(5);
    }

    // Small star hint floating above the alcove
    const starHint = this.add.image(ax, ay - 28, 'star_icon').setDepth(5).setAlpha(0.6).setScale(0.7);
    this.tweens.add({ targets: starHint, y: ay - 32, alpha: 0.9, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    // Detection zone — triggers when player lands here
    const alcoveZone = this.add.zone(ax, ay - 10, aw + 20, 40);
    this.physics.add.existing(alcoveZone, true);
    this.physics.add.overlap(this.player, alcoveZone, () => {
      if (this.foundAlcove) return;
      this.foundAlcove = true;
      this.showCollectFX(ax, ay - 20, '#f0c040', '★ Hidden Alcove!');
      starHint.destroy();
    }, null, this);
  }

  createTreasureChest() {
    const levelData = this.levelData || L1;
    if (!levelData.chestSpots || levelData.chestSpots.length === 0) return;
    const spot = Phaser.Utils.Array.GetRandom(levelData.chestSpots);
    const rareItem = Phaser.Utils.Array.GetRandom(RARE_ITEMS);

    const plat = levelData.platforms[spot.platIdx];
    const cx = spot.x;
    const cy = plat.y - 20;

    this.chest = this.physics.add.image(cx, cy, 'chest_closed');
    this.chest.body.allowGravity = false;
    this.chest.body.setImmovable(true);
    this.chest.setDepth(5);
    this.chest.setData('rareItem', rareItem);
    this.chest.setData('opened', false);

    this.tweens.add({
      targets: this.chest, y: cy - 3, duration: 1400,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
    });

    const glow = this.add.graphics();
    glow.fillStyle(0xf0c040, 0.15);
    glow.fillCircle(0, 0, 22);
    glow.setPosition(cx, cy);
    glow.setDepth(4);
    this.tweens.add({
      targets: glow, alpha: 0.4, duration: 800,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
    });
    this.chest.setData('glow', glow);

    this.physics.add.overlap(this.player, this.chest, this.openChest, null, this);
  }

  openChest(player, chest) {
    if (chest.getData('opened')) return;
    chest.setData('opened', true);

    const rareItem = chest.getData('rareItem');
    const glow = chest.getData('glow');
    const cx = chest.x;
    const cy = chest.y;

    chest.setTexture('chest_open');
    this.tweens.killTweensOf(chest);
    this.tweens.killTweensOf(glow);
    glow.destroy();

    const burst = this.add.graphics();
    burst.fillStyle(0xf0c040, 0.5);
    burst.fillCircle(0, 0, 4);
    burst.setPosition(cx, cy);
    burst.setDepth(12);
    this.tweens.add({
      targets: burst, scaleX: 8, scaleY: 8, alpha: 0, duration: 600,
      onComplete: () => burst.destroy(),
    });

    const itemSprite = this.add.image(cx, cy, 'rare_' + rareItem.id);
    itemSprite.setDepth(13).setScale(0.3).setAlpha(0);
    this.tweens.add({
      targets: itemSprite, y: cy - 50, scaleX: 1.5, scaleY: 1.5, alpha: 1,
      duration: 800, ease: 'Back.easeOut',
      onComplete: () => {
        this.showCollectFX(cx, cy - 60, '#f0c040', '★ ' + rareItem.name + '!');
        this.showCollectFX(cx, cy - 75, '#ffcc88', rareItem.desc);
        this.rareCollected++;
        this.energy = Math.min(100, this.energy + ENERGY_RARE);
        this.updateHUD();
        this.tweens.add({
          targets: itemSprite, alpha: 0, scaleX: 0.5, scaleY: 0.5, y: cy - 70,
          duration: 500, delay: 800,
          onComplete: () => itemSprite.destroy(),
        });
      },
    });
  }

  createEnergyBalls() {
    this.ballGroup = this.physics.add.group({ allowGravity: false });
    this.physics.add.overlap(this.ballGroup, this.phantomGroup, this.ballHitPhantom, null, this);
  }

  fireEnergyBall(pointer) {
    const BALL_SPEED = 500;
    if (this.cellsCollected < 1) return;
    this.cellsCollected--;
    this.updateHUD();
    SFX.shootBall();

    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
    const ball = this.ballGroup.create(this.player.x, this.player.y - 10, 'energy_ball');
    ball.setDepth(11);
    ball.body.setCircle(6);

    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y - 10, worldPoint.x, worldPoint.y);
    ball.body.setVelocity(Math.cos(angle) * BALL_SPEED, Math.sin(angle) * BALL_SPEED);

    this.time.delayedCall(2000, () => { if (ball.active) ball.destroy(); });
  }

  ballHitPhantom(ball, phantom) {
    if (!phantom.getData('active')) return;
    this.damagePhantom(phantom, 'Hit!');
    ball.destroy();
  }

  damagePhantom(phantom, label) {
    const hp = phantom.getData('hp') - 1;
    phantom.setData('hp', hp);
    if (hp <= 0) {
      this.showCollectFX(phantom.x, phantom.y - 20, '#40e8a0', 'Defeated!');
      SFX.defeatEnemy();
      phantom.setData('active', false);
      this.tweens.add({
        targets: phantom, alpha: 0, scale: 0.3, duration: 400,
        onComplete: () => phantom.destroy(),
      });
    } else {
      this.showCollectFX(phantom.x, phantom.y - 20, '#80ccaa', label + ' ' + hp + '/3');
      SFX.hitEnemy();
      this.tweens.add({
        targets: phantom, alpha: 0.3, duration: 80, yoyo: true, repeat: 2,
        onComplete: () => phantom.setAlpha(1),
      });
    }
  }

  createFinish() {
    this.finishFlag = this.add.image(L1.finishX, GROUND_Y, 'finish_flag').setOrigin(0.5, 1).setDepth(5);
    this.add.text(L1.finishX, GROUND_Y - 90, 'FINISH', {
      fontFamily: 'Courier New', fontSize: '14px', color: '#f0c040', stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5).setDepth(5);
    const zoneW = LEVEL_W - L1.finishX + 40;
    this.finishZone = this.add.zone(L1.finishX - 20 + zoneW / 2, GAME_H / 2, zoneW, GAME_H);
    this.physics.add.existing(this.finishZone, true);
    this.physics.add.overlap(this.player, this.finishZone, this.reachFinish, null, this);
  }

  reachFinish() {
    if (this.levelComplete || this.levelFailed) return;
    this.levelComplete = true;
    SFX.stopMusic();
    SFX.finish();
    const elapsed = (this.time.now - this.startTime) / 1000;
    const stars = [];
    if (this.fibreCollected >= this.totalFibreItems) stars.push(1);
    if (this.foundAlcove) stars.push(2);
    if (this.energy >= 90) stars.push(3);
    this.scene.start('Result', {
      success: true, carbsCollected: this.carbsCollected, totalCarbs: this.totalCarbItems,
      fibreCollected: this.fibreCollected, totalFibre: this.totalFibreItems,
      energy: Math.round(this.energy), cells: this.cellsCollected, stars,
      dmgTaken: this.dmgTaken, neutralCollected: this.neutralCollected,
      funCollected: this.funCollected, rareCollected: this.rareCollected, elapsed,
    });
  }

  createHUD() {
    this.hudBar = this.add.graphics();
    this.hudBar.fillStyle(0x000000, 0.75);
    this.hudBar.fillRect(0, 0, GAME_W, 56);
    this.hudBar.setScrollFactor(0).setDepth(50);

    this.hudEnergyLabel = this.add.text(16, 8, 'ENERGY', { fontFamily: 'Courier New', fontSize: '9px', color: '#f0c040', letterSpacing: 1.5 }).setScrollFactor(0).setDepth(51);
    this.hudEnergyBg = this.add.rectangle(16 + 100, 30, 200, 14, 0x333333).setOrigin(0.5).setScrollFactor(0).setDepth(51);
    this.hudEnergyBorder = this.add.rectangle(16 + 100, 30, 200, 14).setOrigin(0.5).setScrollFactor(0).setDepth(51).setStrokeStyle(2, 0xf0c040);
    this.hudEnergyFill = this.add.rectangle(17, 24, 196 * 0.72, 10, 0x40cc60).setOrigin(0, 0).setScrollFactor(0).setDepth(52);

    this.hudCarbsLabel = this.add.text(240, 8, 'CARBS COLLECTED', { fontFamily: 'Courier New', fontSize: '9px', color: '#f0c040', letterSpacing: 1.5 }).setScrollFactor(0).setDepth(51);
    this.hudCarbsBg = this.add.rectangle(240 + 90, 30, 180, 14, 0x333333).setOrigin(0.5).setScrollFactor(0).setDepth(51);
    this.hudCarbsBorder = this.add.rectangle(240 + 90, 30, 180, 14).setOrigin(0.5).setScrollFactor(0).setDepth(51).setStrokeStyle(2, 0xe8b84c);
    this.hudCarbsFill = this.add.rectangle(241, 24, 0, 10, 0xe8b84c).setOrigin(0, 0).setScrollFactor(0).setDepth(52);

    this.hudFibreLabel = this.add.text(240, 42, 'Fibre:', { fontFamily: 'Courier New', fontSize: '8px', color: '#80ff80' }).setScrollFactor(0).setDepth(51);
    this.fibreDots = [];
    const maxDots = Math.min(this.totalFibreItems, 18);
    for (let i = 0; i < maxDots; i++) {
      const dot = this.add.circle(288 + i * 10, 46, 3, 0x333333).setScrollFactor(0).setDepth(51).setStrokeStyle(1, 0x3a8a2a);
      this.fibreDots.push(dot);
    }

    this.hudCellIcon = this.add.image(500, 14, 'energy_cell').setScrollFactor(0).setDepth(51).setScale(0.8);
    this.hudCellText = this.add.text(512, 8, '× 0', { fontFamily: 'Courier New', fontSize: '14px', color: '#f0d860', fontStyle: 'bold' }).setScrollFactor(0).setDepth(51);

    this.hudStars = [];
    for (let i = 0; i < 3; i++) {
      this.hudStars.push(this.add.text(500 + i * 18, 30, '★', { fontFamily: 'Courier New', fontSize: '14px', color: '#555555' }).setScrollFactor(0).setDepth(51));
    }

    this.hudLevelName = this.add.text(GAME_W - 16, 10, 'L1 — CARBOHYDRATES', { fontFamily: 'Courier New', fontSize: '10px', color: '#f0c040', letterSpacing: 2 }).setOrigin(1, 0).setScrollFactor(0).setDepth(51);

    // Pause button (clickable, bottom-left)
    const pauseBtn = this.add.text(24, GAME_H - 24, '⏸', {
      fontFamily: 'Courier New', fontSize: '18px', color: '#f0c040',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(51).setInteractive({ useHandCursor: true });

    this.pauseOverlay = this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x000000, 0.6).setScrollFactor(0).setDepth(100).setVisible(false);
    this.pauseText = this.add.text(GAME_W / 2, GAME_H / 2 - 30, 'PAUSED', { fontFamily: "'Special Elite', 'Courier New', monospace", fontSize: '28px', color: '#f0c040', letterSpacing: 4 }).setOrigin(0.5).setScrollFactor(0).setDepth(101).setVisible(false);

    const SF = "'Special Elite', 'Courier New', monospace";
    const resumeBtn = this.add.rectangle(GAME_W / 2, GAME_H / 2 + 20, 180, 36, 0xf0c040)
      .setScrollFactor(0).setDepth(101).setVisible(false).setInteractive({ useHandCursor: true });
    const resumeLabel = this.add.text(GAME_W / 2, GAME_H / 2 + 20, '[ RESUME ]', {
      fontFamily: SF, fontSize: '13px', color: '#1a1a2e', fontStyle: 'bold', letterSpacing: 2,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102).setVisible(false);

    const exitBtn = this.add.rectangle(GAME_W / 2, GAME_H / 2 + 64, 180, 36, 0x888888)
      .setScrollFactor(0).setDepth(101).setVisible(false).setInteractive({ useHandCursor: true });
    const exitLabel = this.add.text(GAME_W / 2, GAME_H / 2 + 64, '[ EXIT ]', {
      fontFamily: SF, fontSize: '13px', color: '#1a1a2e', fontStyle: 'bold', letterSpacing: 2,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102).setVisible(false);

    const pauseElements = [this.pauseOverlay, this.pauseText, resumeBtn, resumeLabel, exitBtn, exitLabel];

    const togglePause = () => {
      this.isPaused = !this.isPaused;
      pauseElements.forEach(el => el.setVisible(this.isPaused));
      this.physics.world.isPaused = this.isPaused;
    };

    this.input.keyboard.on('keydown-P', togglePause);
    pauseBtn.on('pointerdown', togglePause);
    resumeBtn.on('pointerover', () => resumeBtn.setFillStyle(0xf8d868));
    resumeBtn.on('pointerout', () => resumeBtn.setFillStyle(0xf0c040));
    resumeBtn.on('pointerdown', togglePause);
    exitBtn.on('pointerover', () => exitBtn.setFillStyle(0x999999));
    exitBtn.on('pointerout', () => exitBtn.setFillStyle(0x888888));
    exitBtn.on('pointerdown', () => { SFX.stopMusic(); this.scene.start('Splash'); });

    const hudMusicIcon = this.add.image(GAME_W - 54, GAME_H - 24, SFX.musicMuted ? 'music_off' : 'music_on')
      .setScrollFactor(0).setDepth(51).setInteractive({ useHandCursor: true }).setScale(1.2);
    hudMusicIcon.on('pointerdown', () => {
      const m = SFX.toggleMusic();
      hudMusicIcon.setTexture(m ? 'music_off' : 'music_on');
    });
    const hudSfxIcon = this.add.image(GAME_W - 24, GAME_H - 24, SFX.sfxMuted ? 'sfx_off' : 'sfx_on')
      .setScrollFactor(0).setDepth(51).setInteractive({ useHandCursor: true }).setScale(1.2);
    hudSfxIcon.on('pointerdown', () => {
      const m = SFX.toggleSfx();
      hudSfxIcon.setTexture(m ? 'sfx_off' : 'sfx_on');
    });
  }

  updateHUD() {
    const ePct = Math.max(0, this.energy / 100);
    this.hudEnergyFill.setSize(196 * ePct, 10);
    this.hudEnergyFill.setFillStyle(ePct > 0.5 ? 0x40cc60 : ePct > 0.25 ? 0xcccc40 : 0xcc4040);
    this.hudCarbsFill.setSize(176 * Math.min(1, this.carbsCollected / CARBS_NEEDED), 10);
    for (let i = 0; i < this.fibreDots.length; i++) {
      this.fibreDots[i].setFillStyle(i < this.fibreCollected ? 0x3a8a2a : 0x333333);
    }
    this.hudCellText.setText('× ' + this.cellsCollected);
  }

  update(time, delta) {
    if (this.levelComplete || this.levelFailed || this.isPaused) return;
    const dt = delta / 1000;
    const onGround = this.player.body.blocked.down || this.player.body.touching.down;

    const speed = this.getPlayerSpeed();
    const moveLeft = this.cursors.left.isDown || this.keyA.isDown;
    const moveRight = this.cursors.right.isDown || this.keyD.isDown;
    const jumpDown = this.cursors.up.isDown || this.spaceKey.isDown || this.keyW.isDown;
    const isMoving = moveLeft || moveRight;
    if (isMoving) this.hasStartedMoving = true;

    if (this.hasStartedMoving) {
      const drain = isMoving ? ENERGY_DRAIN : ENERGY_DRAIN_IDLE;
      this.energy -= drain * dt;
      if (this.energy <= 0) { this.energy = 0; this.triggerFail(); return; }
    }

    if (moveLeft) { this.player.setVelocityX(-speed); this.player.setFlipX(true); }
    else if (moveRight) { this.player.setVelocityX(speed); this.player.setFlipX(false); }
    else { this.player.setVelocityX(0); }

    if (jumpDown && onGround) {
      if (!this.hasStartedMoving) this.hasStartedMoving = true;
      this.player.setVelocityY(this.getJumpPower());
    }

    this.updatePlayerState();

    const maxY = GROUND_Y - 22;
    if (this.player.y > maxY && onGround) this.player.y = maxY;

    this.checkCrashPits();
    this.updatePhantoms(dt);
    this.updateHUD();
  }

  getPlayerSpeed() { return this.energy < 30 ? PLAYER_SPEED * 0.7 : PLAYER_SPEED; }
  getJumpPower() { return this.energy < 30 ? PLAYER_JUMP * 0.8 : PLAYER_JUMP; }

  updatePlayerState() {
    if (this.isInvincible) return;
    this.player.setTexture(this.energy > 80 ? 'nibble_energized' : this.energy < 30 ? 'nibble_tired' : 'nibble');
  }

  checkCrashPits() {
    for (const cp of L1.crashPits) {
      if (this.player.x > cp.x && this.player.x < cp.x + cp.w && this.player.y > GROUND_Y - 30) {
        this.player.setVelocityX(this.player.body.velocity.x * 0.5);
        if (!cp.drained) {
          cp.drained = true;
          const drain = this.energy * 0.33;
          this.energy = Math.max(0, this.energy - drain);
          this.showCollectFX(this.player.x, this.player.y - 20, '#cc6644', 'Energy Crash!');
          SFX.crashPit();
          this.updateHUD();
          if (this.energy <= 0) { this.triggerFail(); return; }
        }
        return;
      } else {
        cp.drained = false;
      }
    }
  }

  updatePhantoms(dt) {
    const px = this.player.x;
    for (const phantom of this.phantomData) {
      if (!phantom.active) continue;
      const dist = Math.abs(px - phantom.x);
      const telegraph = phantom.getData('telegraph');
      const isActive = phantom.getData('active');
      if (!isActive && dist < PHANTOM_DETECT + 100) {
        if (telegraph.alpha < 0.6) {
          telegraph.setAlpha(Math.min(0.6, telegraph.alpha + dt * 0.5));
          telegraph.setPosition(phantom.getData('originX'), GROUND_Y - 35);
        }
        if (telegraph.alpha >= 0.5) {
          phantom.setData('active', true); phantom.setAlpha(1);
          this.tweens.add({ targets: telegraph, alpha: 0, duration: 500 });
        }
      }
      if (isActive) {
        const dir = px < phantom.x ? -1 : 1;
        const originX = phantom.getData('originX');
        if (dist < PHANTOM_DETECT) {
          const newX = phantom.x + dir * PHANTOM_SPEED * dt;
          if (Math.abs(newX - originX) < 200) phantom.x = newX;
        } else {
          const toOrigin = originX - phantom.x;
          if (Math.abs(toOrigin) > 2) phantom.x += Math.sign(toOrigin) * PHANTOM_SPEED * 0.5 * dt;
        }
        phantom.y = GROUND_Y - 35 + Math.sin(this.time.now / 600 + phantom.getData('originX')) * 5;
      }
    }
  }

  triggerFail() {
    if (this.levelFailed) return;
    this.levelFailed = true;
    SFX.stopMusic();
    this.player.setVelocityX(0); this.player.setVelocityY(0);
    const elapsed = (this.time.now - this.startTime) / 1000;
    const progress = this.player.x / L1.finishX;

    this.player.setTexture('nibble_tired');
    this.player.body.allowGravity = false;
    const baseX = this.player.x;
    const baseY = GROUND_Y - this.player.displayHeight / 2;
    this.player.y = baseY;

    // Fritz / buzz shake
    let shakeCount = 0;
    const shakeTimer = this.time.addEvent({
      delay: 50, repeat: 11,
      callback: () => {
        shakeCount++;
        this.player.x = baseX + (shakeCount % 2 === 0 ? 3 : -3);
        this.player.setAlpha(shakeCount % 2 === 0 ? 0.6 : 1);
      },
    });

    // After shake, fall over on the grass
    this.time.delayedCall(650, () => {
      this.player.x = baseX;
      this.player.setAlpha(1);
      this.player.setTexture('nibble_fainted');
      this.tweens.add({
        targets: this.player,
        angle: 90,
        y: GROUND_Y - 14,
        duration: 300,
        ease: 'Bounce.easeOut',
      });
      this.showCollectFX(baseX, baseY - 30, '#cc6666', 'Out of fuel!');
      SFX.faint();
    });

    this.time.delayedCall(2000, () => {
      this.scene.start('Result', {
        success: false, nearMiss: progress > 0.75,
        carbsCollected: this.carbsCollected, totalCarbs: this.totalCarbItems,
        fibreCollected: this.fibreCollected, totalFibre: this.totalFibreItems,
        energy: 0, cells: this.cellsCollected, stars: [],
        dmgTaken: this.dmgTaken, neutralCollected: this.neutralCollected,
        funCollected: this.funCollected, rareCollected: this.rareCollected, elapsed,
      });
    });
  }
}

// =================================================================
// RESULT SCENE — End-of-level feedback
// =================================================================

class ResultScene extends Phaser.Scene {
  constructor() { super('Result'); }
  init(data) { this.resultData = data; }

  create() {
    const d = this.resultData;
    const cx = GAME_W / 2, cy = GAME_H / 2;
    const SF = "'Special Elite', 'Courier New', monospace";

    this.add.rectangle(cx, cy, GAME_W, GAME_H, 0x0e0e1a);

    const panelW = 580, panelH = 490;
    this.add.rectangle(cx, cy, panelW + 6, panelH + 6, 0xf0c040, 0.35);
    this.add.rectangle(cx, cy, panelW, panelH, 0x0c0c18);
    this.add.rectangle(cx, cy - panelH / 2 + 1.5, panelW, 3, 0xf0c040);

    if (d.success) this.showSuccess(cx, cy, d, SF, panelW, panelH);
    else if (d.nearMiss) this.showNearMiss(cx, cy, d, SF, panelW, panelH);
    else this.showFail(cx, cy, d, SF, panelW, panelH);

    const btnY = cy + panelH / 2 - 35;
    const makeBtn = (x, label, color, scene) => {
      const bg = this.add.rectangle(x, btnY, 180, 36, color).setInteractive({ useHandCursor: true });
      this.add.text(x, btnY, label, {
        fontFamily: SF, fontSize: '13px', color: '#1a1a2e', fontStyle: 'bold', letterSpacing: 2,
      }).setOrigin(0.5);
      bg.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.ValueToColor(color).lighten(15).color));
      bg.on('pointerout', () => bg.setFillStyle(color));
      bg.on('pointerdown', () => this.scene.start(scene));
    };

    makeBtn(cx - 100, '[ REPLAY ]', 0x888888, 'Game');
    if (d.success) {
      makeBtn(cx + 100, '[ NEXT LEVEL ]', 0xf0c040, 'Splash');
    } else {
      makeBtn(cx + 100, '[ TRY AGAIN ]', 0xf0c040, 'Game');
    }

    const rMusicIcon = this.add.image(GAME_W - 54, GAME_H - 24, SFX.musicMuted ? 'music_off' : 'music_on')
      .setDepth(100).setInteractive({ useHandCursor: true }).setScale(1.2);
    rMusicIcon.on('pointerdown', function () {
      const m = SFX.toggleMusic();
      this.setTexture(m ? 'music_off' : 'music_on');
    });
    const rSfxIcon = this.add.image(GAME_W - 24, GAME_H - 24, SFX.sfxMuted ? 'sfx_off' : 'sfx_on')
      .setDepth(100).setInteractive({ useHandCursor: true }).setScale(1.2);
    rSfxIcon.on('pointerdown', function () {
      const m = SFX.toggleSfx();
      this.setTexture(m ? 'sfx_off' : 'sfx_on');
    });
  }

  showSuccess(cx, cy, d, SF, panelW, panelH) {
    const headerY = cy - panelH / 2 + 40;

    this.add.text(cx, headerY, 'Fueled Up!', {
      fontFamily: SF, fontSize: '30px', color: '#f0c040', letterSpacing: 3,
    }).setOrigin(0.5);
    this.add.rectangle(cx, headerY + 20, 80, 2, 0xf0c040, 0.27);

    this.add.text(cx, headerY + 55, '"Great work! You fueled up with carbs!\nYour muscles and brain now have the\nenergy they need to keep going."', {
      fontFamily: SF, fontSize: '14px', color: '#d8d0c0', align: 'center', lineSpacing: 6,
    }).setOrigin(0.5);

    const statY = headerY + 115;
    const stats = [
      `Carb items collected: ${d.carbsCollected} / ${d.totalCarbs}`,
      `Fibre-rich carbs found: ${d.fibreCollected} / ${d.totalFibre}`,
      `Energy at finish: ${d.energy}%`,
      `Energy Cells: ${d.cells}`,
      `Time: ${d.elapsed.toFixed(1)}s`,
    ];
    stats.forEach((s, i) => this.add.text(cx, statY + i * 20, s, {
      fontFamily: SF, fontSize: '13px', color: '#aaaaaa',
    }).setOrigin(0.5));

    const starLabelY = statY + stats.length * 20 + 14;
    this.add.text(cx, starLabelY, 'KNOWLEDGE STARS', {
      fontFamily: SF, fontSize: '11px', color: '#f0c040', letterSpacing: 3,
    }).setOrigin(0.5);

    const starDescs = [
      { id: 1, text: 'Collected all fibre-rich carbs' },
      { id: 2, text: 'Found the hidden alcove' },
      { id: 3, text: 'Finished with 90%+ energy' },
    ];

    const starRowY = starLabelY + 32;
    const starSpacing = 32;

    starDescs.forEach((s, i) => {
      const earned = d.stars.includes(s.id);
      const rowY = starRowY + i * starSpacing;

      const starImg = this.add.image(cx - 150, rowY, earned ? 'result_star_earned' : 'result_star_empty')
        .setOrigin(0.5).setScale(0).setAlpha(0);

      const label = this.add.text(cx - 126, rowY, s.text, {
        fontFamily: SF, fontSize: '13px', color: earned ? '#f0c040' : '#555555',
      }).setOrigin(0, 0.5).setAlpha(0);

      const delay = 400 + i * 500;

      this.time.delayedCall(delay, () => {
        label.setAlpha(1);
        this.tweens.add({
          targets: starImg, scale: earned ? 1 : 0.75, alpha: 1, duration: 400,
          ease: 'Back.easeOut',
        });
        if (earned) {
          SFX.starEarned();
          this.tweens.add({
            targets: starImg, scale: 1.15, duration: 150, delay: 400,
            yoyo: true, ease: 'Sine.easeInOut',
          });
        }
      });
    });

    if (!d.dmgTaken) {
      const bonusY = starRowY + starDescs.length * starSpacing + 8;
      const bonusText = this.add.text(cx, bonusY, 'No damage taken! +5 bonus cells', {
        fontFamily: SF, fontSize: '12px', color: '#80ffcc',
      }).setOrigin(0.5).setAlpha(0);
      this.time.delayedCall(400 + starDescs.length * 500 + 300, () => {
        this.tweens.add({ targets: bonusText, alpha: 1, duration: 400 });
      });
    }
  }

  showNearMiss(cx, cy, d, SF, panelW, panelH) {
    const headerY = cy - panelH / 2 + 40;

    this.add.image(cx, headerY - 5, 'nibble_fainted').setScale(0.8);
    this.add.text(cx, headerY + 30, 'Fuel Tank Empty!', {
      fontFamily: SF, fontSize: '28px', color: '#e8b84c', letterSpacing: 3,
    }).setOrigin(0.5);
    this.add.rectangle(cx, headerY + 50, 80, 2, 0xf0c040, 0.27);

    this.add.text(cx, headerY + 80, '"So close! Nibble ran out of fuel just\nbefore the finish line. A few more carbs\nalong the way would have kept\nthe engine running."', {
      fontFamily: SF, fontSize: '14px', color: '#d8d0c0', align: 'center', lineSpacing: 6,
    }).setOrigin(0.5);

    this.add.text(cx, headerY + 148, 'TIP', {
      fontFamily: SF, fontSize: '12px', color: '#80cc60', letterSpacing: 3,
    }).setOrigin(0.5);
    this.add.text(cx, headerY + 170, '"Fibre-rich carbs like oats and fruits\ngive bonus fuel. Jump over crash pits\nto grab the food floating above them!"', {
      fontFamily: SF, fontSize: '13px', color: '#aaaaaa', align: 'center', lineSpacing: 5,
    }).setOrigin(0.5);

    this.showBasicStats(cx, headerY + 230, d, SF);
  }

  showFail(cx, cy, d, SF, panelW, panelH) {
    const headerY = cy - panelH / 2 + 40;

    this.add.image(cx, headerY - 5, 'nibble_fainted').setScale(0.8);
    this.add.text(cx, headerY + 30, 'Out of Fuel!', {
      fontFamily: SF, fontSize: '28px', color: '#cc6666', letterSpacing: 3,
    }).setOrigin(0.5);
    this.add.rectangle(cx, headerY + 50, 80, 2, 0xf0c040, 0.27);

    this.add.text(cx, headerY + 80, '"Nibble\'s energy hit zero — time for a\npit stop! Grab more carbs along the\nway and watch out for those\nFatigue Phantoms."', {
      fontFamily: SF, fontSize: '14px', color: '#d8d0c0', align: 'center', lineSpacing: 6,
    }).setOrigin(0.5);

    this.add.text(cx, headerY + 148, 'TIP', {
      fontFamily: SF, fontSize: '12px', color: '#80cc60', letterSpacing: 3,
    }).setOrigin(0.5);
    this.add.text(cx, headerY + 170, '"Phantoms shimmer before they appear.\nWhen you spot the glow, jump or\nfire an energy ball their way!"', {
      fontFamily: SF, fontSize: '13px', color: '#aaaaaa', align: 'center', lineSpacing: 5,
    }).setOrigin(0.5);

    this.showBasicStats(cx, headerY + 230, d, SF);
  }

  showBasicStats(cx, y, d, SF) {
    [`Carbs collected: ${d.carbsCollected} / ${d.totalCarbs}`, `Fibre found: ${d.fibreCollected} / ${d.totalFibre}`, `Energy Cells: ${d.cells}`].forEach((s, i) => {
      this.add.text(cx, y + i * 20, s, { fontFamily: SF, fontSize: '13px', color: '#888888' }).setOrigin(0.5);
    });
  }
}

// =================================================================
// PHASER CONFIG & LAUNCH
// =================================================================

const config = {
  type: Phaser.AUTO,
  width: GAME_W,
  height: GAME_H,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 900 }, debug: false },
  },
  scene: [BootScene, SplashScene, GameScene, ResultScene],
};

const game = new Phaser.Game(config);
