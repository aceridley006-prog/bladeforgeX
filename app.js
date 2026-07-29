/* ==========================================================================
   BLADE FORGE - Interactive Beyblade Customizer & Simulator Engine
   ========================================================================== */

// --- PARTS DATABASE ---
const BEYBLADE_PARTS = {
  blades: [
    {
      id: 'scythe',
      name: 'Scythe Rod',
      type: 'Stamina',
      attack: 55,
      defense: 75,
      stamina: 95,
      burst: 70,
      weight: 34.2,
      price: 18.99,
      bladesCount: 4,
      shape: 'smooth-curve',
      desc: 'Sleek aerodynamic circular blade engineered for supreme gyro inertia.'
    },
    {
      id: 'drake',
      name: 'Drake Buster',
      type: 'Attack',
      attack: 95,
      defense: 40,
      stamina: 50,
      burst: 85,
      weight: 36.8,
      price: 20.99,
      bladesCount: 3,
      shape: 'aggressive-spikes',
      desc: 'Heavy tri-winged die-cast zinc blade for massive knock-out impact.'
    },
    {
      id: 'phoenix',
      name: 'Phoenix Shield',
      type: 'Defense',
      attack: 50,
      defense: 95,
      stamina: 65,
      burst: 90,
      weight: 38.5,
      price: 22.49,
      bladesCount: 6,
      shape: 'heavy-armor',
      desc: 'Hexagonal armored perimeter that repels violent recoil strikes.'
    },
    {
      id: 'pegasus',
      name: 'Pegasus Dash',
      type: 'Balance',
      attack: 75,
      defense: 65,
      stamina: 75,
      burst: 80,
      weight: 35.0,
      price: 19.99,
      bladesCount: 5,
      shape: 'star-wings',
      desc: 'Balanced 5-blade contact layer adaptable to both aggressive and defensive spin styles.'
    }
  ],
  ratchets: [
    {
      id: '3-60',
      name: '3-60 Torque',
      height: 6.0,
      teeth: 3,
      attack: 15,
      defense: 10,
      stamina: 10,
      burst: 20,
      weight: 6.2,
      price: 7.99,
      desc: 'Low clearance 3-burst lock ratchet providing tight center of gravity.'
    },
    {
      id: '5-60',
      name: '5-60 Balanced',
      height: 6.0,
      teeth: 5,
      attack: 10,
      defense: 15,
      stamina: 15,
      burst: 15,
      weight: 6.5,
      price: 7.99,
      desc: '5-point symmetric ratchet designed for smooth rotation stability.'
    },
    {
      id: '9-60',
      name: '9-60 Aero',
      height: 6.0,
      teeth: 9,
      attack: 5,
      defense: 12,
      stamina: 20,
      burst: 12,
      weight: 6.0,
      price: 8.49,
      desc: 'Multi-tooth circular ratchet minimizing drag for endurance bladers.'
    },
    {
      id: '1-60',
      name: '1-60 Heavy Recoil',
      height: 6.0,
      teeth: 1,
      attack: 25,
      defense: 5,
      stamina: 5,
      burst: 25,
      weight: 7.1,
      price: 8.99,
      desc: 'Single heavy-weighted ratchet protrusion focused on maximum burst contact.'
    }
  ],
  bits: [
    {
      id: 'flat',
      name: 'Flat Rubber Tip',
      type: 'Attack',
      attack: 25,
      defense: 5,
      stamina: 5,
      burst: 15,
      weight: 2.1,
      price: 7.99,
      desc: 'Wide flat rubber point for high friction stadium wall dashes.'
    },
    {
      id: 'ball',
      name: 'Polycarbonate Ball',
      type: 'Stamina',
      attack: 5,
      defense: 15,
      stamina: 25,
      burst: 10,
      weight: 2.3,
      price: 7.49,
      desc: 'Smooth spherical tip minimizing friction for prolonged spin battles.'
    },
    {
      id: 'hexa',
      name: 'Hexa Needle',
      type: 'Defense',
      attack: 10,
      defense: 25,
      stamina: 10,
      burst: 20,
      weight: 2.5,
      price: 8.49,
      desc: 'Sharp needle tip anchored by hexagonal guard for central crater control.'
    },
    {
      id: 'taper',
      name: 'Taper Gear',
      type: 'Balance',
      attack: 15,
      defense: 15,
      stamina: 15,
      burst: 15,
      weight: 2.2,
      price: 7.99,
      desc: 'Angled tip switching from outer dash attacks to stable center spinning.'
    }
  ]
};

// PRESET COMBOS
const PRESETS = {
  drake: { blade: 'drake', ratchet: '1-60', bit: 'flat', name: 'Drake Buster 1-60 Flat', primaryColor: '#ef4444', accentColor: '#f97316' },
  scythe: { blade: 'scythe', ratchet: '9-60', bit: 'ball', name: 'Scythe Rod 9-60 Ball', primaryColor: '#3b82f6', accentColor: '#06b6d4' },
  phoenix: { blade: 'phoenix', ratchet: '5-60', bit: 'hexa', name: 'Phoenix Shield 5-60 Hexa', primaryColor: '#a855f7', accentColor: '#ec4899' }
};

// --- APP STATE ---
let state = {
  currentBlade: BEYBLADE_PARTS.blades[0],
  currentRatchet: BEYBLADE_PARTS.ratchets[0],
  currentBit: BEYBLADE_PARTS.bits[0],
  primaryColor: '#3b82f6',
  accentColor: '#06b6d4',
  bladeName: 'Scythe Rod 3-60 Flat',
  isSpinning: true,
  sparksEnabled: true,
  spinSpeed: 75,
  tiltAngle: 15,
  currentAngle: 0,
  cartCount: 1
};

// DOM READY INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initHeroBladeCanvas();
  renderPartsGrids();
  initForgeCanvas();
  initTabNavigation();
  initColorPickers();
  initControls();
  initStadiumSimulator();
  updateStats();
  initCartModal();
});

// ==========================================
// 1. BACKGROUND PARTICLE CANVAS
// ==========================================
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    color: Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(6, 182, 212, ',
    alpha: Math.random() * 0.5 + 0.1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================
// 2. HERO SECTION ROTATING CANVAS
// ==========================================
function initHeroBladeCanvas() {
  const canvas = document.getElementById('hero-blade-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let angle = 0;

  function renderHero() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    drawBeybladeGraphic(ctx, 0, 0, 140, {
      bladesCount: 3,
      shape: 'aggressive-spikes',
      primaryColor: '#3b82f6',
      accentColor: '#06b6d4',
      ratchetTeeth: 3
    });

    ctx.restore();
    angle += 0.05;
    requestAnimationFrame(renderHero);
  }
  renderHero();
}

// ==========================================
// 3. RENDER PARTS SELECTION GRIDS
// ==========================================
function renderPartsGrids() {
  // Blades
  const bladeGrid = document.getElementById('blade-parts-grid');
  if (bladeGrid) {
    bladeGrid.innerHTML = BEYBLADE_PARTS.blades.map(b => `
      <div class="part-card ${state.currentBlade.id === b.id ? 'active' : ''}" data-id="${b.id}" data-type="${b.type}" onclick="selectPart('blade', '${b.id}')">
        <div class="part-header">
          <span class="part-name">${b.name}</span>
          <span class="part-type-tag">${b.type}</span>
        </div>
        <p class="part-desc">${b.desc}</p>
        <div class="part-mini-stats">
          <span>ATK ${b.attack}</span>
          <span>DEF ${b.defense}</span>
          <span>STM ${b.stamina}</span>
        </div>
      </div>
    `).join('');
  }

  // Ratchets
  const ratchetGrid = document.getElementById('ratchet-parts-grid');
  if (ratchetGrid) {
    ratchetGrid.innerHTML = BEYBLADE_PARTS.ratchets.map(r => `
      <div class="part-card ${state.currentRatchet.id === r.id ? 'active' : ''}" data-id="${r.id}" onclick="selectPart('ratchet', '${r.id}')">
        <div class="part-header">
          <span class="part-name">${r.name}</span>
          <span class="part-type-tag">${r.teeth} Teeth</span>
        </div>
        <p class="part-desc">${r.desc}</p>
        <div class="part-mini-stats">
          <span>BURST +${r.burst}</span>
          <span>WT ${r.weight}g</span>
        </div>
      </div>
    `).join('');
  }

  // Bits
  const bitGrid = document.getElementById('bit-parts-grid');
  if (bitGrid) {
    bitGrid.innerHTML = BEYBLADE_PARTS.bits.map(bt => `
      <div class="part-card ${state.currentBit.id === bt.id ? 'active' : ''}" data-id="${bt.id}" data-type="${bt.type}" onclick="selectPart('bit', '${bt.id}')">
        <div class="part-header">
          <span class="part-name">${bt.name}</span>
          <span class="part-type-tag">${bt.type}</span>
        </div>
        <p class="part-desc">${bt.desc}</p>
        <div class="part-mini-stats">
          <span>SPD ${bt.attack * 2}</span>
          <span>FRIC ${bt.stamina * 2}</span>
        </div>
      </div>
    `).join('');
  }
}

function selectPart(category, partId) {
  if (category === 'blade') {
    state.currentBlade = BEYBLADE_PARTS.blades.find(b => b.id === partId);
  } else if (category === 'ratchet') {
    state.currentRatchet = BEYBLADE_PARTS.ratchets.find(r => r.id === partId);
  } else if (category === 'bit') {
    state.currentBit = BEYBLADE_PARTS.bits.find(bt => bt.id === partId);
  }

  // Update name code display
  state.bladeName = `${state.currentBlade.name.split(' ')[0]} ${state.currentRatchet.id} ${state.currentBit.name.split(' ')[0]}`;
  const customInput = document.getElementById('blade-custom-name');
  if (customInput) customInput.value = state.bladeName;

  renderPartsGrids();
  updateStats();
}

// ==========================================
// 4. MAIN FORGE CANVAS RENDERER & SPARKS
// ==========================================
let forgeCanvas, forgeCtx;
let sparkParticles = [];

function initForgeCanvas() {
  forgeCanvas = document.getElementById('blade-forge-canvas');
  if (!forgeCanvas) return;
  forgeCtx = forgeCanvas.getContext('2d');

  function renderLoop() {
    renderForgeStage();
    requestAnimationFrame(renderLoop);
  }
  renderLoop();
}

function renderForgeStage() {
  if (!forgeCtx) return;
  const width = forgeCanvas.width;
  const height = forgeCanvas.height;
  const cx = width / 2;
  const cy = height / 2;

  forgeCtx.clearRect(0, 0, width, height);

  // Update rotation angle based on spin state and speed slider
  if (state.isSpinning) {
    const speedFactor = (state.spinSpeed / 100) * 0.15;
    state.currentAngle += speedFactor;
  }

  // Generate sparks if spinning and sparks toggle enabled
  if (state.isSpinning && state.sparksEnabled && Math.random() < (state.spinSpeed / 100) * 0.6) {
    const sparkAngle = Math.random() * Math.PI * 2;
    const sparkRadius = 140;
    sparkParticles.push({
      x: cx + Math.cos(sparkAngle) * sparkRadius,
      y: cy + Math.sin(sparkAngle) * sparkRadius,
      vx: Math.cos(sparkAngle + Math.PI/2) * (Math.random() * 6 + 2),
      vy: Math.sin(sparkAngle + Math.PI/2) * (Math.random() * 6 + 2),
      life: 1.0,
      decay: Math.random() * 0.05 + 0.03,
      color: Math.random() > 0.3 ? '#facc15' : '#ef4444'
    });
  }

  // Render ground shadow
  forgeCtx.save();
  forgeCtx.translate(cx, cy + 130);
  forgeCtx.scale(1, 0.3);
  forgeCtx.beginPath();
  forgeCtx.arc(0, 0, 130, 0, Math.PI * 2);
  forgeCtx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  forgeCtx.filter = 'blur(10px)';
  forgeCtx.fill();
  forgeCtx.restore();

  // Render Beyblade with 3D tilt transformation
  forgeCtx.save();
  forgeCtx.translate(cx, cy);
  
  // Apply tilt angle effect
  const tiltRad = (state.tiltAngle * Math.PI) / 180;
  forgeCtx.scale(1, Math.cos(tiltRad));

  // Rotate blade
  forgeCtx.rotate(state.currentAngle);

  // Draw main Beyblade graphic
  drawBeybladeGraphic(forgeCtx, 0, 0, 140, {
    bladesCount: state.currentBlade.bladesCount,
    shape: state.currentBlade.shape,
    primaryColor: state.primaryColor,
    accentColor: state.accentColor,
    ratchetTeeth: state.currentRatchet.teeth
  });

  forgeCtx.restore();

  // Render Spark Particles
  sparkParticles.forEach((sp, idx) => {
    sp.x += sp.vx;
    sp.y += sp.vy;
    sp.life -= sp.decay;

    if (sp.life <= 0) {
      sparkParticles.splice(idx, 1);
      return;
    }

    forgeCtx.beginPath();
    forgeCtx.arc(sp.x, sp.y, Math.random() * 3 + 1, 0, Math.PI * 2);
    forgeCtx.fillStyle = sp.color;
    forgeCtx.globalAlpha = sp.life;
    forgeCtx.shadowColor = sp.color;
    forgeCtx.shadowBlur = 10;
    forgeCtx.fill();
    forgeCtx.globalAlpha = 1.0;
    forgeCtx.shadowBlur = 0;
  });
}

// GRAPHIC RENDERING ENGINE FOR BEYBLADES
function drawBeybladeGraphic(ctx, x, y, radius, config) {
  const { bladesCount, shape, primaryColor, accentColor, ratchetTeeth } = config;

  // 1. Outer Metallic Weight Ring (Zinc Alloy base)
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  const outerGrad = ctx.createRadialGradient(x, y, radius * 0.7, x, y, radius);
  outerGrad.addColorStop(0, '#94a3b8');
  outerGrad.addColorStop(0.5, '#334155');
  outerGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = outerGrad;
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 4;
  ctx.stroke();

  // 2. Blades / Contact Wings
  const step = (Math.PI * 2) / bladesCount;
  for (let i = 0; i < bladesCount; i++) {
    const angle = i * step;
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    if (shape === 'aggressive-spikes') {
      ctx.moveTo(radius * 0.6, 0);
      ctx.lineTo(radius * 1.15, radius * 0.3);
      ctx.lineTo(radius * 0.7, radius * 0.4);
    } else if (shape === 'smooth-curve') {
      ctx.arc(radius * 0.85, 0, radius * 0.35, 0, Math.PI);
    } else if (shape === 'heavy-armor') {
      ctx.rect(radius * 0.6, -radius * 0.25, radius * 0.45, radius * 0.5);
    } else { // star-wings
      ctx.moveTo(radius * 0.6, -radius * 0.1);
      ctx.lineTo(radius * 1.05, 0);
      ctx.lineTo(radius * 0.6, radius * 0.2);
    }

    ctx.fillStyle = primaryColor;
    ctx.shadowColor = primaryColor;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  // 3. Ratchet Teeth Internal Gear Ring
  ctx.beginPath();
  const ratchetRadius = radius * 0.55;
  const ratchetStep = (Math.PI * 2) / ratchetTeeth;
  for (let i = 0; i < ratchetTeeth; i++) {
    const rAngle = i * ratchetStep;
    ctx.arc(x + Math.cos(rAngle) * ratchetRadius, y + Math.sin(rAngle) * ratchetRadius, 8, 0, Math.PI * 2);
  }
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // 4. Center Core Emblem Chip
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.35, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.35);
  coreGrad.addColorStop(0, accentColor);
  coreGrad.addColorStop(0.8, primaryColor);
  coreGrad.addColorStop(1, '#07090e');
  ctx.fillStyle = coreGrad;
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 5. Center Icon / Symbol Emblem
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⚡', x, y);
}

// ==========================================
// 5. CONTROLS, TABS & COLOR PICKERS
// ==========================================
function initTabNavigation() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `tab-${tab.getAttribute('data-tab')}`;
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

function initColorPickers() {
  const primarySwatches = document.querySelectorAll('#primary-color-swatches .color-swatch');
  primarySwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      primarySwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      state.primaryColor = swatch.getAttribute('data-color');
    });
  });

  const accentSwatches = document.querySelectorAll('#accent-color-swatches .color-swatch');
  accentSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      accentSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      state.accentColor = swatch.getAttribute('data-accent');
    });
  });
}

function initControls() {
  // Speed slider
  const speedSlider = document.getElementById('speed-slider');
  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      state.spinSpeed = parseInt(e.target.value);
      const rpmDisplay = document.getElementById('current-rpm');
      if (rpmDisplay) rpmDisplay.innerText = Math.round((state.spinSpeed / 100) * 16500).toLocaleString();
      const rpmBar = document.getElementById('rpm-bar-fill');
      if (rpmBar) rpmBar.style.width = `${state.spinSpeed}%`;
    });
  }

  // Angle slider
  const angleSlider = document.getElementById('angle-slider');
  if (angleSlider) {
    angleSlider.addEventListener('input', (e) => {
      state.tiltAngle = parseInt(e.target.value);
    });
  }

  // Toggle Spin
  const spinBtn = document.getElementById('toggle-spin-btn');
  if (spinBtn) {
    spinBtn.addEventListener('click', () => {
      state.isSpinning = !state.isSpinning;
      spinBtn.style.color = state.isSpinning ? '#3b82f6' : '#9ca3af';
    });
  }

  // Toggle Sparks
  const sparksBtn = document.getElementById('toggle-sparks-btn');
  if (sparksBtn) {
    sparksBtn.addEventListener('click', () => {
      state.sparksEnabled = !state.sparksEnabled;
      sparksBtn.style.color = state.sparksEnabled ? '#facc15' : '#9ca3af';
    });
  }

  // Preset Loaders
  const presetBtns = document.querySelectorAll('.load-preset-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.getAttribute('data-preset');
      if (PRESETS[presetKey]) {
        const p = PRESETS[presetKey];
        state.currentBlade = BEYBLADE_PARTS.blades.find(b => b.id === p.blade);
        state.currentRatchet = BEYBLADE_PARTS.ratchets.find(r => r.id === p.ratchet);
        state.currentBit = BEYBLADE_PARTS.bits.find(bt => bt.id === p.bit);
        state.primaryColor = p.primaryColor;
        state.accentColor = p.accentColor;
        state.bladeName = p.name;
        
        const customInput = document.getElementById('blade-custom-name');
        if (customInput) customInput.value = p.name;
        
        renderPartsGrids();
        updateStats();

        // Smooth scroll up to Forge
        document.getElementById('forge').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ==========================================
// 6. STATS & POWER METERS CALCULATOR
// ==========================================
function updateStats() {
  const b = state.currentBlade;
  const r = state.currentRatchet;
  const bt = state.currentBit;

  const totalAttack = Math.min(100, b.attack + r.attack + bt.attack);
  const totalDefense = Math.min(100, b.defense + r.defense + bt.defense);
  const totalStamina = Math.min(100, b.stamina + r.stamina + bt.stamina);
  const totalBurst = Math.min(100, b.burst + r.burst + bt.burst);
  const totalWeight = (b.weight + r.weight + bt.weight).toFixed(1);
  const totalPrice = (b.price + r.price + bt.price).toFixed(2);

  // Update text & bar widths
  document.getElementById('val-attack').innerText = totalAttack;
  document.getElementById('bar-attack').style.width = `${totalAttack}%`;

  document.getElementById('val-defense').innerText = totalDefense;
  document.getElementById('bar-defense').style.width = `${totalDefense}%`;

  document.getElementById('val-stamina').innerText = totalStamina;
  document.getElementById('bar-stamina').style.width = `${totalStamina}%`;

  document.getElementById('val-burst').innerText = totalBurst;
  document.getElementById('bar-burst').style.width = `${totalBurst}%`;

  document.getElementById('val-weight').innerText = `${totalWeight}g`;
  document.getElementById('bar-weight').style.width = `${Math.min(100, (totalWeight / 50) * 100)}%`;

  document.getElementById('build-total-price').innerText = `$${totalPrice}`;

  // Update Type Tag
  const typeTag = document.getElementById('build-type-tag');
  if (typeTag) {
    typeTag.innerText = `${b.type.toUpperCase()} TYPE`;
    typeTag.className = `type-badge ${b.type.toLowerCase()}`;
  }

  // Update code display badge
  const codeDisplay = document.getElementById('build-code-display');
  if (codeDisplay) {
    codeDisplay.innerText = `BF-${b.id.substring(0,3).toUpperCase()}-${r.id}-${bt.id.substring(0,1).toUpperCase()}`;
  }

  // Sync to Battle Sim player name
  const simP1Name = document.getElementById('sim-p1-name');
  if (simP1Name) simP1Name.innerText = state.bladeName;
}

// ==========================================
// 7. BEYSTADIUM BATTLE SIMULATOR ENGINE (UPGRADED)
// ==========================================
let simCanvas, simCtx;
let battleActive = false;
let p1State = { x: 200, y: 210, vx: 0, vy: 0, hp: 100, radius: 28, color: '#3b82f6' };
let p2State = { x: 500, y: 210, vx: 0, vy: 0, hp: 100, radius: 28, color: '#ef4444' };
let simSparks = [];

const opponentsList = {
  viper: {
    id: 'viper',
    name: 'Viper Tail 4-60 Taper',
    color: '#ef4444',
    shape: 'viper-fangs',
    bladesCount: 3,
    ai: 'balanced',
    attack: 75,
    defense: 65,
    stamina: 70
  },
  drake: {
    id: 'drake',
    name: 'Drake Buster 1-60 Flat',
    color: '#f97316',
    shape: 'aggressive-spikes',
    bladesCount: 2,
    ai: 'aggressive',
    attack: 95,
    defense: 45,
    stamina: 55
  },
  scythe: {
    id: 'scythe',
    name: 'Scythe Rod 9-60 Ball',
    color: '#34d399',
    shape: 'scythe-blade',
    bladesCount: 4,
    ai: 'stamina',
    attack: 55,
    defense: 75,
    stamina: 98
  },
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix Shield 5-60 Hexa',
    color: '#a855f7',
    shape: 'shield-round',
    bladesCount: 6,
    ai: 'defender',
    attack: 60,
    defense: 98,
    stamina: 70
  },
  wizard: {
    id: 'wizard',
    name: 'Wizard Arrow 3-80 Needle',
    color: '#06b6d4',
    shape: 'arrow-wings',
    bladesCount: 3,
    ai: 'sniper',
    attack: 68,
    defense: 72,
    stamina: 85
  }
};

let currentSelectedOpponent = opponentsList.drake;
let specialDashAvailable = true;
let specialBrakeAvailable = true;

let chargingPower = 50;
let isChargingLaunch = false;
let chargeInterval = null;
let simFloatingTexts = [];
let keysPressed = {};
let isDraggingP1 = false;

function initStadiumSimulator() {
  simCanvas = document.getElementById('stadium-canvas');
  if (!simCanvas) return;
  simCtx = simCanvas.getContext('2d');

  // Swapped workflow buttons
  const chargeBtn = document.getElementById('charge-power-btn');
  if (chargeBtn) {
    chargeBtn.addEventListener('click', startLaunchChargingPhase);
  }

  const launchBtn = document.getElementById('launch-battle-btn');
  if (launchBtn) {
    launchBtn.addEventListener('click', executeLaunch);
  }

  const lockPowerBtn = document.getElementById('release-launch-btn');
  if (lockPowerBtn) {
    lockPowerBtn.addEventListener('click', () => {
      const powerContainer = document.getElementById('launch-power-container');
      const welcomeBox = document.getElementById('overlay-welcome-box');
      if (powerContainer) powerContainer.classList.add('hidden');
      if (welcomeBox) {
        welcomeBox.classList.remove('hidden');
        welcomeBox.querySelector('h3').innerText = 'POWER LOCKED!';
        welcomeBox.querySelector('p').innerHTML = `Launch Power set to <strong>${Math.round(chargingPower)}%</strong>!<br>Now click <strong>"2. LET IT RIP!"</strong> to start the match.`;
      }
    });
  }

  const opponentSelect = document.getElementById('opponent-select');
  if (opponentSelect) {
    opponentSelect.addEventListener('change', (e) => {
      const key = e.target.value;
      if (opponentsList[key]) {
        currentSelectedOpponent = opponentsList[key];
        const p2NameEl = document.getElementById('sim-p2-name');
        const p2DotEl = document.getElementById('sim-p2-dot');
        if (p2NameEl) p2NameEl.innerText = currentSelectedOpponent.name;
        if (p2DotEl) {
          p2DotEl.style.background = currentSelectedOpponent.color;
          p2DotEl.style.boxShadow = `0 0 10px ${currentSelectedOpponent.color}`;
        }
      }
    });
  }

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
      keysPressed[e.code] = true;
      if (e.code === 'Space') e.preventDefault();
    }
  });
  window.addEventListener('keyup', (e) => {
    if (keysPressed[e.code]) {
      keysPressed[e.code] = false;
    }
  });

  // Mouse / Touch Dragging controls on arena canvas
  simCanvas.addEventListener('mousedown', (e) => {
    const rect = simCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (Math.hypot(mx - p1State.x, my - p1State.y) < p1State.radius + 20) {
      isDraggingP1 = true;
    }
  });
  simCanvas.addEventListener('mousemove', (e) => {
    if (!isDraggingP1 || !battleActive) return;
    const rect = simCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    p1State.vx = (mx - p1State.x) * 0.35;
    p1State.vy = (my - p1State.y) * 0.35;
  });
  window.addEventListener('mouseup', () => { isDraggingP1 = false; });

  // Special Action Buttons
  const dashBtn = document.getElementById('special-dash-btn');
  if (dashBtn) {
    dashBtn.addEventListener('click', () => {
      if (!battleActive || !specialDashAvailable) return;
      specialDashAvailable = false;
      dashBtn.classList.add('disabled');
      const angle = Math.atan2(p2State.y - p1State.y, p2State.x - p1State.x);
      p1State.vx += Math.cos(angle) * 16;
      p1State.vy += Math.sin(angle) * 16;
      p2State.hp -= 20;

      simFloatingTexts.push({ x: p2State.x, y: p2State.y - 25, text: '-20 DMG!', color: '#3b82f6', life: 1.0 });
      
      const logBox = document.getElementById('sim-log-box');
      if (logBox) logBox.innerText = '⚡ X-EXTREME DASH UNLEASHED! Direct impact on rival!';
      
      for (let i = 0; i < 18; i++) {
        simSparks.push({
          x: p1State.x,
          y: p1State.y,
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 0.5) * 16,
          life: 1.2,
          color: '#3b82f6'
        });
      }
    });
  }

  const brakeBtn = document.getElementById('special-brake-btn');
  if (brakeBtn) {
    brakeBtn.addEventListener('click', () => {
      if (!battleActive || !specialBrakeAvailable) return;
      specialBrakeAvailable = false;
      brakeBtn.classList.add('disabled');
      p1State.hp = Math.min(100, p1State.hp + 15);
      p1State.vx *= 0.1;
      p1State.vy *= 0.1;

      simFloatingTexts.push({ x: p1State.x, y: p1State.y - 25, text: '+15 HP STABILIZED', color: '#10b981', life: 1.0 });

      const logBox = document.getElementById('sim-log-box');
      if (logBox) logBox.innerText = '🛡️ STABILIZE ACTIVATED! Burst teeth locked, stamina recovered!';
    });
  }

  function renderSimLoop() {
    updateAndDrawStadium();
    requestAnimationFrame(renderSimLoop);
  }
  renderSimLoop();
}

function startLaunchChargingPhase() {
  const welcomeBox = document.getElementById('overlay-welcome-box');
  const powerContainer = document.getElementById('launch-power-container');
  const overlay = document.getElementById('stadium-start-overlay');
  if (overlay) overlay.classList.remove('hidden');
  if (welcomeBox) welcomeBox.classList.add('hidden');
  if (powerContainer) powerContainer.classList.remove('hidden');

  isChargingLaunch = true;
  chargingPower = 20;
  let direction = 1;

  if (chargeInterval) clearInterval(chargeInterval);
  chargeInterval = setInterval(() => {
    if (!isChargingLaunch) return;
    chargingPower += direction * 4.0;
    if (chargingPower >= 100) {
      chargingPower = 100;
      direction = -1;
    } else if (chargingPower <= 15) {
      chargingPower = 15;
      direction = 1;
    }

    const fillEl = document.getElementById('power-meter-fill');
    const valEl = document.getElementById('power-val-num');
    if (fillEl) fillEl.style.width = `${chargingPower}%`;
    if (valEl) valEl.innerText = Math.round(chargingPower);
  }, 25);
}

function executeLaunch() {
  if (isChargingLaunch) {
    isChargingLaunch = false;
    if (chargeInterval) clearInterval(chargeInterval);
  }

  const overlay = document.getElementById('stadium-start-overlay');
  if (overlay) overlay.classList.add('hidden');

  const actionOverlay = document.getElementById('battle-action-overlay');
  if (actionOverlay) actionOverlay.classList.remove('hidden');

  specialDashAvailable = true;
  specialBrakeAvailable = true;
  const dashBtn = document.getElementById('special-dash-btn');
  const brakeBtn = document.getElementById('special-brake-btn');
  if (dashBtn) dashBtn.classList.remove('disabled');
  if (brakeBtn) brakeBtn.classList.remove('disabled');

  let launchSpeed = 6.0;
  let launchBonusMsg = 'Balanced Launch!';
  if (chargingPower >= 75 && chargingPower <= 95) {
    launchSpeed = 9.0;
    launchBonusMsg = '⚡ X-EXTREME SUPER LAUNCH! Perfect Sweet Spot!';
  } else if (chargingPower < 50) {
    launchSpeed = 4.0;
    launchBonusMsg = 'Weak Launch...';
  } else {
    launchSpeed = 7.0;
    launchBonusMsg = 'Strong Power Launch!';
  }

  const cx = simCanvas.width / 2;
  const cy = simCanvas.height / 2;

  p1State = {
    x: cx - 160,
    y: cy,
    vx: launchSpeed,
    vy: -launchSpeed * 0.7,
    hp: chargingPower >= 75 && chargingPower <= 95 ? 105 : 100,
    radius: 30,
    color: state.primaryColor,
    drain: 1.0
  };

  p2State = {
    x: cx + 160,
    y: cy,
    vx: -launchSpeed * 0.9,
    vy: launchSpeed * 0.7,
    hp: 100,
    radius: 30,
    color: currentSelectedOpponent.color,
    drain: 1.0
  };

  battleActive = true;

  const logBox = document.getElementById('sim-log-box');
  if (logBox) logBox.innerText = `🚀 ${launchBonusMsg} vs ${currentSelectedOpponent.name}! Use WASD/Arrows to drive & smash!`;
}

function startBattle() {
  executeLaunch();
}

function updateAndDrawStadium() {
  if (!simCtx) return;
  const width = simCanvas.width;
  const height = simCanvas.height;
  const cx = width / 2;
  const cy = height / 2;
  const arenaRadius = 180;

  simCtx.clearRect(0, 0, width, height);

  // 1. Draw Dish Stadium Arena
  simCtx.beginPath();
  simCtx.arc(cx, cy, arenaRadius, 0, Math.PI * 2);
  const arenaGrad = simCtx.createRadialGradient(cx, cy, 10, cx, cy, arenaRadius);
  arenaGrad.addColorStop(0, '#1e293b');
  arenaGrad.addColorStop(0.8, '#0f172a');
  arenaGrad.addColorStop(1, '#334155');
  simCtx.fillStyle = arenaGrad;
  simCtx.fill();
  simCtx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
  simCtx.lineWidth = 6;
  simCtx.stroke();

  // Draw X-Celerator Rail Outer Ring
  simCtx.beginPath();
  simCtx.arc(cx, cy, arenaRadius - 15, 0, Math.PI * 2);
  simCtx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
  simCtx.lineWidth = 3;
  simCtx.setLineDash([12, 8]);
  simCtx.stroke();
  simCtx.setLineDash([]);

  if (!battleActive && !isChargingLaunch) {
    const time = Date.now() * 0.003;
    p1State.x = cx + Math.cos(time) * 85;
    p1State.y = cy + Math.sin(time) * 85;
    p1State.color = state.primaryColor;

    p2State.x = cx + Math.cos(time + Math.PI) * 85;
    p2State.y = cy + Math.sin(time + Math.PI) * 85;
    p2State.color = currentSelectedOpponent.color;
  }

  if (battleActive) {
    // Player Keyboard Steering (WASD / Arrows)
    const steerPower = 0.5;
    if (keysPressed['ArrowUp'] || keysPressed['KeyW']) p1State.vy -= steerPower;
    if (keysPressed['ArrowDown'] || keysPressed['KeyS']) p1State.vy += steerPower;
    if (keysPressed['ArrowLeft'] || keysPressed['KeyA']) p1State.vx -= steerPower;
    if (keysPressed['ArrowRight'] || keysPressed['KeyD']) p1State.vx += steerPower;

    // AI Behavior for P2 (Rival)
    const p2Ai = currentSelectedOpponent.ai;
    let aiPull = 0.12;
    if (p2Ai === 'aggressive') {
      const angToP1 = Math.atan2(p1State.y - p2State.y, p1State.x - p2State.x);
      p2State.vx += Math.cos(angToP1) * 0.18;
      p2State.vy += Math.sin(angToP1) * 0.18;
    } else if (p2Ai === 'stamina') {
      p2State.vx -= 0.04;
      p2State.vy -= 0.04;
    } else if (p2Ai === 'defender') {
      aiPull = 0.22;
    }

    // Physics Update: Gravity pull towards center crater
    [p1State, p2State].forEach((p, idx) => {
      const dx = cx - p.x;
      const dy = cy - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const pull = (idx === 1 && p2Ai === 'defender') ? aiPull : 0.12;
      p.vx += (dx / dist) * pull;
      p.vy += (dy / dist) * pull;

      p.x += p.vx;
      p.y += p.vy;

      // Friction & Stamina loss
      p.vx *= 0.992;
      p.vy *= 0.992;
      p.hp -= (idx === 0 ? (0.04 * p1State.drain) : 0.045);

      // Wall bounce & Over Finish check
      if (dist + p.radius > arenaRadius) {
        const nx = dx / dist;
        const ny = dy / dist;
        const dot = p.vx * nx + p.vy * ny;
        p.vx -= 1.8 * dot * nx;
        p.vy -= 1.8 * dot * ny;
        p.hp -= 2.0;

        if (dist > arenaRadius + 10) {
          battleActive = false;
          const winner = idx === 0 ? currentSelectedOpponent.name : 'PLAYER 1 (Your Build)';
          const loser = idx === 0 ? 'PLAYER 1' : currentSelectedOpponent.name;
          const logBox = document.getElementById('sim-log-box');
          if (logBox) logBox.innerText = `🚀 OVER FINISH! ${loser} knocked out of the Beystadium! Winner: ${winner}!`;
          const actionOverlay = document.getElementById('battle-action-overlay');
          if (actionOverlay) actionOverlay.classList.add('hidden');
        }
      }
    });

    // 3. Collision Detection between P1 & P2
    const cdx = p2State.x - p1State.x;
    const cdy = p2State.y - p1State.y;
    const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
    const minDist = p1State.radius + p2State.radius;

    if (cdist < minDist) {
      const angle = Math.atan2(cdy, cdx);
      const targetX = p1State.x + Math.cos(angle) * minDist;
      const targetY = p1State.y + Math.sin(angle) * minDist;

      const ax = (targetX - p2State.x) * 0.45;
      const ay = (targetY - p2State.y) * 0.45;

      p1State.vx -= ax;
      p1State.vy -= ay;
      p2State.vx += ax;
      p2State.vy += ay;

      const p1Attack = state.currentBlade.attack || 75;
      const p2Attack = currentSelectedOpponent.attack || 70;
      const damageP1 = (p2Attack / 55) * 3.5;
      const damageP2 = (p1Attack / 55) * 3.5;

      p1State.hp -= damageP1;
      p2State.hp -= damageP2;

      const sparkX = (p1State.x + p2State.x) / 2;
      const sparkY = (p1State.y + p2State.y) / 2;
      for (let i = 0; i < 14; i++) {
        simSparks.push({
          x: sparkX,
          y: sparkY,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.5) * 14,
          life: 1.0,
          color: Math.random() > 0.5 ? '#facc15' : '#38bdf8'
        });
      }

      const logBox = document.getElementById('sim-log-box');
      if (logBox) {
        const impactForce = Math.round(Math.abs(p1State.vx) + Math.abs(p2State.vx) * 10);
        logBox.innerText = `💥 EXTREME CLASH! X-Rail Impact Force: ${impactForce}!`;
      }
    }

    if (p1State.hp <= 0 || p2State.hp <= 0) {
      battleActive = false;
      const winner = p1State.hp > p2State.hp ? 'PLAYER 1 (Your Build)' : currentSelectedOpponent.name;
      const logBox = document.getElementById('sim-log-box');
      if (logBox) logBox.innerText = `🏆 SPIN FINISH! Winner: ${winner}!`;
      const actionOverlay = document.getElementById('battle-action-overlay');
      if (actionOverlay) actionOverlay.classList.add('hidden');
    }
  }

  // Update HP bars and texts
  const p1Bar = document.getElementById('p1-hp-bar');
  const p1Text = document.getElementById('p1-hp-text');
  const p2Bar = document.getElementById('p2-hp-bar');
  const p2Text = document.getElementById('p2-hp-text');

  const p1HpVal = Math.max(0, Math.round(p1State.hp));
  const p2HpVal = Math.max(0, Math.round(p2State.hp));

  if (p1Bar) p1Bar.style.width = `${p1HpVal}%`;
  if (p1Text) p1Text.innerText = `${p1HpVal}%`;
  if (p2Bar) p2Bar.style.width = `${p2HpVal}%`;
  if (p2Text) p2Text.innerText = `${p2HpVal}%`;

  // Draw P1 and P2 Tops
  [p1State, p2State].forEach((p, idx) => {
    simCtx.save();
    simCtx.translate(p.x, p.y);
    simCtx.rotate(Date.now() * 0.025 * (idx === 0 ? 1 : -1));

    drawBeybladeGraphic(simCtx, 0, 0, p.radius, {
      bladesCount: idx === 0 ? state.currentBlade.bladesCount : currentSelectedOpponent.bladesCount,
      shape: idx === 0 ? state.currentBlade.shape : currentSelectedOpponent.shape,
      primaryColor: p.color,
      accentColor: idx === 0 ? state.accentColor : '#ffffff',
      ratchetTeeth: 4
    });

    simCtx.restore();
  });

  // Render Collision Sparks in Arena
  simSparks.forEach((sp, i) => {
    sp.x += sp.vx;
    sp.y += sp.vy;
    sp.life -= 0.08;
    if (sp.life <= 0) {
      simSparks.splice(i, 1);
      return;
    }
    simCtx.beginPath();
    simCtx.arc(sp.x, sp.y, 3, 0, Math.PI * 2);
    simCtx.fillStyle = sp.color;
    simCtx.globalAlpha = sp.life;
    simCtx.fill();
    simCtx.globalAlpha = 1.0;
  });
}


// ==========================================
// 8. CART & ORDER SUMMARY MODAL
// ==========================================
function initCartModal() {
  const modal = document.getElementById('cart-modal');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const addBuildBtn = document.getElementById('add-custom-build-btn');

  if (openCartBtn && modal) {
    openCartBtn.addEventListener('click', () => {
      renderCartContents();
      modal.classList.add('active');
    });
  }

  if (closeCartBtn && modal) {
    closeCartBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (addBuildBtn) {
    addBuildBtn.addEventListener('click', () => {
      state.cartCount += 1;
      const countBadge = document.getElementById('cart-count');
      if (countBadge) countBadge.innerText = state.cartCount;

      renderCartContents();
      modal.classList.add('active');
    });
  }
}

function renderCartContents() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  const totalPrice = (state.currentBlade.price + state.currentRatchet.price + state.currentBit.price).toFixed(2);

  container.innerHTML = `
    <div class="cart-item">
      <div class="item-details">
        <h5>${state.bladeName}</h5>
        <p>Blade: ${state.currentBlade.name} | Ratchet: ${state.currentRatchet.name} | Bit: ${state.currentBit.name}</p>
      </div>
      <span class="price-value">$${totalPrice}</span>
    </div>
  `;

  document.getElementById('modal-subtotal').innerText = `$${totalPrice}`;
  document.getElementById('modal-total').innerText = `$${totalPrice}`;
}
