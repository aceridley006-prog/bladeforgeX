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
// 7. BEYSTADIUM BATTLE SIMULATOR ENGINE
// ==========================================
let simCanvas, simCtx;
let battleActive = false;
let p1State = { x: 200, y: 210, vx: 0, vy: 0, hp: 100, radius: 28, color: '#3b82f6' };
let p2State = { x: 500, y: 210, vx: 0, vy: 0, hp: 100, radius: 28, color: '#ef4444' };
let simSparks = [];

function initStadiumSimulator() {
  simCanvas = document.getElementById('stadium-canvas');
  if (!simCanvas) return;
  simCtx = simCanvas.getContext('2d');

  const launchBtn = document.getElementById('launch-battle-btn');
  if (launchBtn) {
    launchBtn.addEventListener('click', startBattle);
  }

  function renderSimLoop() {
    updateAndDrawStadium();
    requestAnimationFrame(renderSimLoop);
  }
  renderSimLoop();
}

function startBattle() {
  const overlay = document.getElementById('stadium-start-overlay');
  if (overlay) overlay.classList.add('hidden');

  const cx = simCanvas.width / 2;
  const cy = simCanvas.height / 2;

  // Reset Tops
  p1State = { x: cx - 180, y: cy, vx: 4, vy: -3, hp: 100, radius: 30, color: state.primaryColor };
  p2State = { x: cx + 180, y: cy, vx: -4, vy: 3, hp: 100, radius: 30, color: '#ef4444' };
  battleActive = true;

  const logBox = document.getElementById('sim-log-box');
  if (logBox) logBox.innerText = '⚡ 3, 2, 1... LET IT RIP! Tops launched into arena!';
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
  simCtx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
  simCtx.lineWidth = 6;
  simCtx.stroke();

  // Draw X-Celerator Rail Outer Ring
  simCtx.beginPath();
  simCtx.arc(cx, cy, arenaRadius - 15, 0, Math.PI * 2);
  simCtx.strokeStyle = 'rgba(250, 204, 21, 0.3)';
  simCtx.lineWidth = 3;
  simCtx.setLineDash([12, 8]);
  simCtx.stroke();
  simCtx.setLineDash([]);

  if (battleActive) {
    // 2. Physics Update: Gravity pull towards center crater
    [p1State, p2State].forEach(p => {
      const dx = cx - p.x;
      const dy = cy - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      p.vx += (dx / dist) * 0.12;
      p.vy += (dy / dist) * 0.12;

      p.x += p.vx;
      p.y += p.vy;

      // Friction & Stamina loss
      p.vx *= 0.992;
      p.vy *= 0.992;
      p.hp -= 0.05;

      // Wall bounce
      if (dist + p.radius > arenaRadius) {
        const nx = dx / dist;
        const ny = dy / dist;
        const dot = p.vx * nx + p.vy * ny;
        p.vx -= 1.8 * dot * nx;
        p.vy -= 1.8 * dot * ny;
        p.hp -= 1.5;
      }
    });

    // 3. Collision Detection between P1 & P2
    const cdx = p2State.x - p1State.x;
    const cdy = p2State.y - p1State.y;
    const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
    const minDist = p1State.radius + p2State.radius;

    if (cdist < minDist) {
      // Elastic Smash Collision
      const angle = Math.atan2(cdy, cdx);
      const targetX = p1State.x + Math.cos(angle) * minDist;
      const targetY = p1State.y + Math.sin(angle) * minDist;

      const ax = (targetX - p2State.x) * 0.4;
      const ay = (targetY - p2State.y) * 0.4;

      p1State.vx -= ax;
      p1State.vy -= ay;
      p2State.vx += ax;
      p2State.vy += ay;

      // Damage calculation based on attack stats
      const damageP1 = 4.0;
      const damageP2 = 5.5;
      p1State.hp -= damageP1;
      p2State.hp -= damageP2;

      // Generate Collision Sparks
      const sparkX = (p1State.x + p2State.x) / 2;
      const sparkY = (p1State.y + p2State.y) / 2;
      for (let i = 0; i < 12; i++) {
        simSparks.push({
          x: sparkX,
          y: sparkY,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
          life: 1.0,
          color: '#facc15'
        });
      }

      const logBox = document.getElementById('sim-log-box');
      if (logBox) logBox.innerText = `💥 HEAVY IMPACT! Recoil strike at ${Math.round(cdist)} Force!`;
    }

    // Check Win/Loss Condition
    if (p1State.hp <= 0 || p2State.hp <= 0) {
      battleActive = false;
      const winner = p1State.hp > p2State.hp ? 'PLAYER 1 (Your Build)' : 'RIVAL CPU';
      const logBox = document.getElementById('sim-log-box');
      if (logBox) logBox.innerText = `🏆 SURVIVAL FINISH! Winner: ${winner}!`;
    }
  }

  // Update HP bars
  const p1Bar = document.getElementById('p1-hp-bar');
  if (p1Bar) p1Bar.style.width = `${Math.max(0, p1State.hp)}%`;

  const p2Bar = document.getElementById('p2-hp-bar');
  if (p2Bar) p2Bar.style.width = `${Math.max(0, p2State.hp)}%`;

  // Draw P1 and P2 Tops
  [p1State, p2State].forEach((p, idx) => {
    simCtx.save();
    simCtx.translate(p.x, p.y);
    simCtx.rotate(Date.now() * 0.02 * (idx === 0 ? 1 : -1));

    drawBeybladeGraphic(simCtx, 0, 0, p.radius, {
      bladesCount: idx === 0 ? state.currentBlade.bladesCount : 3,
      shape: idx === 0 ? state.currentBlade.shape : 'aggressive-spikes',
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
