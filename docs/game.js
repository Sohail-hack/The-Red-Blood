// =========================================================
// RED BLOOD - Tactical 2D Fighter Arena
// Retro Arcade Engine (Daylight & Greenery Edition)
// =========================================================

// --- Settings & Audio State ---
const audioSettings = {
  masterVol: 0.8,
  musicVol: 0.5,
  sfxVol: 0.7,
  musicEnabled: true,
  sfxEnabled: true,
  matchRounds: 3,
  playerMaxHp: 10, // Increased health so battles last longer!
  aiDifficulty: "normal",
  medkitsEnabled: true,
  screenShake: true
};

// Load saved settings from localStorage
try {
  const saved = localStorage.getItem("red_blood_settings");
  if (saved) {
    Object.assign(audioSettings, JSON.parse(saved));
  }
} catch (e) {
  console.warn("Storage access not available:", e);
}

// Audio Elements
const musicMenu = new Audio("assets/sounds/red-blood-menu.mp3");
musicMenu.loop = true;

const musicFight = new Audio("assets/sounds/fight-music.mp3");
musicFight.loop = true;

const sfxGun = new Audio("assets/sounds/gun.mp3");
const sfxJump = new Audio("assets/sounds/jump.mp3");
const sfxRestart = new Audio("assets/sounds/restart.mp3");

// Web Audio API context for reliable sound effects
let webAudioCtx = null;
function getAudioContext() {
  if (!webAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) webAudioCtx = new AudioCtx();
  }
  if (webAudioCtx && webAudioCtx.state === "suspended") {
    webAudioCtx.resume().catch(() => {});
  }
  return webAudioCtx;
}

function playSynthTone(freq, duration = 0.15, type = "sine", gainLevel = 0.25) {
  if (!audioSettings.sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    const effectiveGain = Math.max(0.0001, gainLevel * audioSettings.masterVol * audioSettings.sfxVol);
    gain.gain.setValueAtTime(effectiveGain, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playChime() {
  playSynthTone(587.33, 0.15, "triangle", 0.3);
  setTimeout(() => playSynthTone(880, 0.35, "sine", 0.35), 100);
}

function updateAudioVolumes() {
  const effMusicVol = audioSettings.musicEnabled
    ? audioSettings.masterVol * audioSettings.musicVol
    : 0;
  const effSfxVol = audioSettings.sfxEnabled
    ? audioSettings.masterVol * audioSettings.sfxVol
    : 0;

  musicMenu.volume = Math.max(0, Math.min(1, effMusicVol));
  musicFight.volume = Math.max(0, Math.min(1, effMusicVol * 0.7));

  sfxGun.volume = Math.max(0, Math.min(1, effSfxVol));
  sfxJump.volume = Math.max(0, Math.min(1, effSfxVol * 0.8));
  sfxRestart.volume = Math.max(0, Math.min(1, effSfxVol));
}
updateAudioVolumes();

function playSfx(audio) {
  if (!audioSettings.sfxEnabled) return;
  try {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch (e) {}
}

// Global user interaction sound unlock
function unlockAndStartAudio() {
  getAudioContext();
  if (menu.style.display !== "none" && audioSettings.musicEnabled) {
    musicMenu.play().catch(() => {});
  }
}

musicMenu.play().catch(() => {
  window.addEventListener("pointerdown", unlockAndStartAudio, { once: true });
  window.addEventListener("keydown",     unlockAndStartAudio, { once: true });
});

// --- Asset Loading ---
const bgImage = new Image();
bgImage.src = "assets/images/background.png";

const skin1 = new Image();
skin1.src = "assets/images/player1.png";

const skin2 = new Image();
skin2.src = "assets/images/player2.png";

const blueWindImg = new Image();
blueWindImg.src = "assets/images/blue-wind.png";

const redWindImg = new Image();
redWindImg.src = "assets/images/red-wind.png";

const platformImg = new Image();
platformImg.src = "assets/images/platform.png";

const medkitImg = new Image();
medkitImg.src = "assets/images/medkit.png";

// --- UI Elements ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const topBar = document.getElementById("topBar");
const gameWrapper = document.getElementById("gameWrapper");
const endScreen = document.getElementById("endScreen");
const winnerBanner = document.getElementById("winnerBanner");
const matchScoreSummary = document.getElementById("matchScoreSummary");

const pvpBtn = document.getElementById("pvpBtn");
const pvaBtn = document.getElementById("pvaBtn");
const settingsBtn = document.getElementById("settingsBtn");
const howToPlayBtn = document.getElementById("howToPlayBtn");
const aboutBtn = document.getElementById("aboutBtn");

const quickMusicBtn = document.getElementById("quickMusicBtn");
const quickMusicIcon = document.getElementById("quickMusicIcon");
const quickMusicText = document.getElementById("quickMusicText");

const restartBtn = document.getElementById("restartBtn");
const mainMenuBtn = document.getElementById("mainMenuBtn");
const endSettingsBtn = document.getElementById("endSettingsBtn");

// ESC Pause Modal Elements
const pauseModal = document.getElementById("pauseModal");
const resumeBtn = document.getElementById("resumeBtn");
const pauseAudioBtn = document.getElementById("pauseAudioBtn");
const pauseSettingsBtn = document.getElementById("pauseSettingsBtn");
const pauseRestartBtn = document.getElementById("pauseRestartBtn");
const pauseMainMenuBtn = document.getElementById("pauseMainMenuBtn");

// Settings Modal Elements
const settingsModal = document.getElementById("settingsModal");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const resetSettingsBtn = document.getElementById("resetSettingsBtn");

const howToPlayModal = document.getElementById("howToPlayModal");
const closeHowToBtn = document.getElementById("closeHowToBtn");
const gotItBtn = document.getElementById("gotItBtn");

// About Modal Elements
const aboutModal = document.getElementById("aboutModal");
const closeAboutBtn = document.getElementById("closeAboutBtn");
const closeAboutOkBtn = document.getElementById("closeAboutOkBtn");

// Settings Controls
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicVolSlider = document.getElementById("musicVolSlider");
const musicVolVal = document.getElementById("musicVolVal");

const sfxToggleBtn = document.getElementById("sfxToggleBtn");
const sfxVolSlider = document.getElementById("sfxVolSlider");
const sfxVolVal = document.getElementById("sfxVolVal");

const masterVolSlider = document.getElementById("masterVolSlider");
const masterVolVal = document.getElementById("masterVolVal");

const healthSelector = document.getElementById("healthSelector");
const roundsSelector = document.getElementById("roundsSelector");
const difficultySelector = document.getElementById("difficultySelector");
const medkitToggleBtn = document.getElementById("medkitToggleBtn");
const screenShakeToggleBtn = document.getElementById("screenShakeToggleBtn");

// --- Settings UI Sync ---
function syncSettingsUI() {
  musicToggleBtn.textContent = audioSettings.musicEnabled ? "ON" : "OFF";
  musicToggleBtn.className = "toggle-btn " + (audioSettings.musicEnabled ? "active" : "off");
  musicVolSlider.value = Math.round(audioSettings.musicVol * 100);
  musicVolVal.textContent = musicVolSlider.value + "%";

  sfxToggleBtn.textContent = audioSettings.sfxEnabled ? "ON" : "OFF";
  sfxToggleBtn.className = "toggle-btn " + (audioSettings.sfxEnabled ? "active" : "off");
  sfxVolSlider.value = Math.round(audioSettings.sfxVol * 100);
  sfxVolVal.textContent = sfxVolSlider.value + "%";

  masterVolSlider.value = Math.round(audioSettings.masterVol * 100);
  masterVolVal.textContent = masterVolSlider.value + "%";

  if (quickMusicText && quickMusicIcon) {
    quickMusicText.textContent = audioSettings.musicEnabled ? "MUSIC: ON" : "MUSIC: OFF";
    quickMusicIcon.textContent = audioSettings.musicEnabled ? "🎵" : "🔇";
  }

  if (pauseAudioBtn) {
    pauseAudioBtn.textContent = audioSettings.musicEnabled ? "🎵 MUSIC: ON" : "🔇 MUSIC: OFF";
  }

  if (healthSelector) {
    Array.from(healthSelector.children).forEach(btn => {
      btn.classList.toggle("active", parseInt(btn.dataset.hp, 10) === (audioSettings.playerMaxHp || 10));
    });
  }

  if (roundsSelector) {
    Array.from(roundsSelector.children).forEach(btn => {
      btn.classList.toggle("active", parseInt(btn.dataset.rounds, 10) === audioSettings.matchRounds);
    });
  }

  if (difficultySelector) {
    Array.from(difficultySelector.children).forEach(btn => {
      btn.classList.toggle("active", btn.dataset.diff === audioSettings.aiDifficulty);
    });
  }

  if (medkitToggleBtn) {
    medkitToggleBtn.textContent = audioSettings.medkitsEnabled ? "ON" : "OFF";
    medkitToggleBtn.className = "toggle-btn " + (audioSettings.medkitsEnabled ? "active" : "off");
  }

  if (screenShakeToggleBtn) {
    screenShakeToggleBtn.textContent = audioSettings.screenShake ? "ON" : "OFF";
    screenShakeToggleBtn.className = "toggle-btn " + (audioSettings.screenShake ? "active" : "off");
  }
}
syncSettingsUI();

function saveSettings() {
  try {
    localStorage.setItem("red_blood_settings", JSON.stringify(audioSettings));
  } catch (e) {}
}

function stopAllBattleAudio() {
  try {
    musicFight.pause();
    musicFight.currentTime = 0;
  } catch (e) {}
  try {
    sfxRestart.pause();
    sfxRestart.currentTime = 0;
  } catch (e) {}
}

function toggleMusic() {
  audioSettings.musicEnabled = !audioSettings.musicEnabled;
  updateAudioVolumes();
  if (audioSettings.musicEnabled) {
    if (menu.style.display !== "none") {
      musicMenu.play().catch(() => {});
    } else if (gameWrapper.style.display !== "none" && !matchOver && !isPaused) {
      musicFight.play().catch(() => {});
    }
  } else {
    musicMenu.pause();
    stopAllBattleAudio();
  }
  syncSettingsUI();
  saveSettings();
}

quickMusicBtn.onclick = toggleMusic;
musicToggleBtn.onclick = toggleMusic;
pauseAudioBtn.onclick = toggleMusic;

musicVolSlider.oninput = (e) => {
  audioSettings.musicVol = e.target.value / 100;
  musicVolVal.textContent = e.target.value + "%";
  updateAudioVolumes();
  saveSettings();
};

sfxToggleBtn.onclick = () => {
  audioSettings.sfxEnabled = !audioSettings.sfxEnabled;
  updateAudioVolumes();
  syncSettingsUI();
  saveSettings();
  if (audioSettings.sfxEnabled) playSynthTone(500, 0.1);
};

sfxVolSlider.oninput = (e) => {
  audioSettings.sfxVol = e.target.value / 100;
  sfxVolVal.textContent = e.target.value + "%";
  updateAudioVolumes();
  saveSettings();
};

masterVolSlider.oninput = (e) => {
  audioSettings.masterVol = e.target.value / 100;
  masterVolVal.textContent = e.target.value + "%";
  updateAudioVolumes();
  saveSettings();
};

if (healthSelector) {
  healthSelector.onclick = (e) => {
    const btn = e.target.closest(".pill-option");
    if (!btn) return;
    audioSettings.playerMaxHp = parseInt(btn.dataset.hp, 10);
    syncSettingsUI();
    saveSettings();
    playSynthTone(400, 0.08);
  };
}

if (roundsSelector) {
  roundsSelector.onclick = (e) => {
    const btn = e.target.closest(".pill-option");
    if (!btn) return;
    audioSettings.matchRounds = parseInt(btn.dataset.rounds, 10);
    syncSettingsUI();
    saveSettings();
    playSynthTone(400, 0.08);
  };
}

if (difficultySelector) {
  difficultySelector.onclick = (e) => {
    const btn = e.target.closest(".pill-option");
    if (!btn) return;
    audioSettings.aiDifficulty = btn.dataset.diff;
    syncSettingsUI();
    saveSettings();
    playSynthTone(400, 0.08);
  };
}

if (medkitToggleBtn) {
  medkitToggleBtn.onclick = () => {
    audioSettings.medkitsEnabled = !audioSettings.medkitsEnabled;
    syncSettingsUI();
    saveSettings();
    playSynthTone(400, 0.08);
  };
}

if (screenShakeToggleBtn) {
  screenShakeToggleBtn.onclick = () => {
    audioSettings.screenShake = !audioSettings.screenShake;
    syncSettingsUI();
    saveSettings();
    playSynthTone(400, 0.08);
  };
}

// Modals Open / Close (Settings shows in front of pause menu)
settingsBtn.onclick = () => {
  playSynthTone(440, 0.08);
  settingsModal.style.display = "flex";
};
endSettingsBtn.onclick = () => {
  playSynthTone(440, 0.08);
  settingsModal.style.display = "flex";
};
pauseSettingsBtn.onclick = () => {
  playSynthTone(440, 0.08);
  settingsModal.style.display = "flex"; // High z-index brings it in front
};
closeSettingsBtn.onclick = () => { settingsModal.style.display = "none"; };
saveSettingsBtn.onclick = () => { settingsModal.style.display = "none"; };
resetSettingsBtn.onclick = () => {
  audioSettings.masterVol = 0.8;
  audioSettings.musicVol = 0.5;
  audioSettings.sfxVol = 0.7;
  audioSettings.musicEnabled = true;
  audioSettings.sfxEnabled = true;
  audioSettings.matchRounds = 3;
  audioSettings.playerMaxHp = 10;
  audioSettings.aiDifficulty = "normal";
  audioSettings.medkitsEnabled = true;
  audioSettings.screenShake = true;
  updateAudioVolumes();
  syncSettingsUI();
  saveSettings();
  playSynthTone(520, 0.1);
};

howToPlayBtn.onclick = () => {
  playSynthTone(440, 0.08);
  howToPlayModal.style.display = "flex";
};
closeHowToBtn.onclick = () => { howToPlayModal.style.display = "none"; };
gotItBtn.onclick = () => { howToPlayModal.style.display = "none"; };

// About Creator Modal
if (aboutBtn) {
  aboutBtn.onclick = () => {
    playSynthTone(440, 0.08);
    aboutModal.style.display = "flex";
  };
}
if (closeAboutBtn) closeAboutBtn.onclick = () => { aboutModal.style.display = "none"; };
if (closeAboutOkBtn) closeAboutOkBtn.onclick = () => { aboutModal.style.display = "none"; };

// Close modal if clicking overlay background
window.onclick = (e) => {
  if (e.target === settingsModal) settingsModal.style.display = "none";
  if (e.target === howToPlayModal) howToPlayModal.style.display = "none";
  if (e.target === aboutModal) aboutModal.style.display = "none";
};

// --- Match & Round State ---
let mode = "pvp";
let scoreP1 = 0;
let scoreP2 = 0;
let currentRound = 1;
let matchOver = false;
let isPaused = false;
let isCountingDown = false;
let gameOver = false;

// Anti-spam key held state
let p1ShootPressed = false;
let p2ShootPressed = false;

// Per-round state
let player1, player2, bulletsP1, bulletsP2, aiCd;
let particles = [];
let floatingTexts = [];
let activeMedkit = null;
let medkitTimer = 0;

// Screen shake
let screenShakeRemaining = 0;
let screenShakeMag = 0;

// Controls
const keys = {};
const gravity = 0.5;

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  // ESC PAUSE HANDLER
  if (e.key === "Escape" || e.code === "Escape") {
    if (settingsModal.style.display === "flex") {
      settingsModal.style.display = "none";
      return;
    }
    if (howToPlayModal.style.display === "flex") {
      howToPlayModal.style.display = "none";
      return;
    }
    if (aboutModal && aboutModal.style.display === "flex") {
      aboutModal.style.display = "none";
      return;
    }

    if (gameWrapper.style.display !== "none" && !matchOver && !isCountingDown) {
      togglePause();
    }
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
  // Reset semi-auto shoot lock when key is released
  if (e.key === "e" || e.key === "E") p1ShootPressed = false;
  if (e.key === "0" || e.key === "Insert") p2ShootPressed = false;
});

// ESC Pause Toggle
function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    musicFight.pause();
    pauseModal.style.display = "flex";
    playSynthTone(350, 0.1, "sine", 0.3);
  } else {
    pauseModal.style.display = "none";
    settingsModal.style.display = "none";
    if (audioSettings.musicEnabled) {
      musicFight.play().catch(() => {});
    }
    playSynthTone(550, 0.1, "sine", 0.3);
    requestAnimationFrame(gameLoop);
  }
}

resumeBtn.onclick = () => {
  if (isPaused) togglePause();
};

pauseRestartBtn.onclick = () => {
  pauseModal.style.display = "none";
  isPaused = false;
  stopAllBattleAudio();
  playSynthTone(580, 0.12, "triangle", 0.3);
  startMatch(mode);
};

pauseMainMenuBtn.onclick = () => {
  pauseModal.style.display = "none";
  returnToMenu();
};

// Floating Platforms
const platforms = [
  { x: 140, y: 250, w: 200, h: 24 },
  { x: 460, y: 190, w: 200, h: 24 }
];

function createPlayer(x, skin, isAI = false) {
  const hp = audioSettings.playerMaxHp || 10;
  return {
    x, y: 300, w: 50, h: 50, skin,
    hp, maxHp: hp, vy: 0, grounded: true, facing: 1,
    shootCd: 0, jumpCnt: isAI ? 2 : 1, isAI,
    damageFlash: 0
  };
}

// Menu button click handlers
pvpBtn.onclick = () => {
  unlockAndStartAudio();
  musicMenu.pause();
  startMatch("pvp");
};

pvaBtn.onclick = () => {
  unlockAndStartAudio();
  musicMenu.pause();
  startMatch("pva");
};

mainMenuBtn.onclick = returnToMenu;

function returnToMenu() {
  stopAllBattleAudio();
  matchOver = true;
  gameOver = true;
  isPaused = false;
  isCountingDown = false;

  endScreen.style.display = "none";
  pauseModal.style.display = "none";
  gameWrapper.style.display = "none";

  // Switch back to Main Menu Daylight Wallpaper
  document.body.className = "menu-view";

  topBar.style.display = "flex";
  menu.style.display = "flex";

  if (audioSettings.musicEnabled) {
    musicMenu.currentTime = 0;
    musicMenu.play().catch(() => {});
  }
}

restartBtn.onclick = () => {
  endScreen.style.display = "none";
  stopAllBattleAudio();
  playSynthTone(580, 0.12, "triangle", 0.3);
  startMatch(mode);
};

// --- Start Full Match ---
function startMatch(m) {
  mode = m;
  menu.style.display = "none";
  topBar.style.display = "none";

  // Switch to In-Game Daylight Arena Bezel Wallpaper
  document.body.className = "game-view";

  gameWrapper.style.display = "flex";
  endScreen.style.display = "none";
  pauseModal.style.display = "none";

  scoreP1 = 0;
  scoreP2 = 0;
  currentRound = 1;
  matchOver = false;
  isPaused = false;
  p1ShootPressed = false;
  p2ShootPressed = false;

  startRound();
}

// --- Start One Round ---
function startRound() {
  musicMenu.pause();
  stopAllBattleAudio();

  player1 = createPlayer(100, skin1, false);
  player2 = createPlayer(650, skin2, mode === "pva");
  bulletsP1 = [];
  bulletsP2 = [];
  particles = [];
  floatingTexts = [];
  activeMedkit = null;
  medkitTimer = 220;
  aiCd = 60;
  gameOver = false;
  isCountingDown = true;
  p1ShootPressed = false;
  p2ShootPressed = false;

  runAnimatedCountdown(() => {
    isCountingDown = false;
    if (matchOver || isPaused) return;
    if (audioSettings.musicEnabled) {
      musicFight.currentTime = 0;
      musicFight.play().catch(() => {});
    }
    requestAnimationFrame(gameLoop);
  });
}

// --- Animated Pixel Countdown 3-2-1-FIGHT (Freeze-Proof) ---
function runAnimatedCountdown(onComplete) {
  const counts = [
    { text: "3", color: "#e5bc4b", tone: 440 },
    { text: "2", color: "#d97706", tone: 554 },
    { text: "1", color: "#c83b4b", tone: 659 },
    { text: "FIGHT!", color: "#f8f1de", tone: 880 }
  ];

  const durationPerStage = 800;
  let stageIndex = 0;
  let stageStartTime = null;

  function countdownFrame(now) {
    if (matchOver) return;

    try {
      if (stageStartTime === null) {
        stageStartTime = now;
        playSynthTone(counts[0].tone, 0.2, "triangle", 0.35);
      }

      const elapsed = Math.max(0, now - stageStartTime);
      const progress = Math.min(1, Math.max(0, elapsed / durationPerStage));

      drawArena();
      drawScoreboard();
      drawHealthBars();
      drawPlayers();

      const cur = counts[stageIndex];
      const scale = 1.0 + Math.pow(1 - progress, 2) * 1.2;
      const alpha = progress < 0.85 ? 1 : Math.max(0, (1 - progress) / 0.15);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Safe shockwave ring (always positive radius)
      if (progress < 0.65) {
        const radius = Math.max(0, progress * 130);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = cur.color;
        ctx.lineWidth = Math.max(1, 2 * (1 - progress));
        ctx.globalAlpha = Math.max(0, (1 - progress) * 0.6);
        ctx.stroke();
      }

      ctx.scale(scale, scale);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.font = stageIndex === 3 ? "36px 'Press Start 2P'" : "58px 'Press Start 2P'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = "#000";
      ctx.fillText(cur.text, 3, 3);
      ctx.fillText(cur.text, -2, -2);
      ctx.fillText(cur.text, 2, -2);
      ctx.fillText(cur.text, -2, 2);

      ctx.fillStyle = cur.color;
      ctx.fillText(cur.text, 0, 0);
      ctx.restore();

      if (elapsed >= durationPerStage) {
        stageIndex++;
        if (stageIndex < counts.length) {
          stageStartTime = now;
          const next = counts[stageIndex];
          if (stageIndex === 3) {
            playSfx(sfxGun);
            playSynthTone(880, 0.35, "sawtooth", 0.35);
          } else {
            playSynthTone(next.tone, 0.2, "triangle", 0.35);
          }
          requestAnimationFrame(countdownFrame);
        } else {
          onComplete();
        }
      } else {
        requestAnimationFrame(countdownFrame);
      }
    } catch (err) {
      console.error("Countdown safely advanced:", err);
      onComplete();
    }
  }

  requestAnimationFrame(countdownFrame);
}

// Camera shake
function triggerShake(magnitude = 5, duration = 10) {
  if (!audioSettings.screenShake) return;
  screenShakeMag = magnitude;
  screenShakeRemaining = duration;
}

// Particles
function spawnWindTrail(x, y, isP1) {
  const color = isP1 ? "#4a7eb8" : "#b8303f";
  particles.push({
    x, y: y + (Math.random() - 0.5) * 8,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    size: 3 + Math.random() * 2,
    alpha: 0.75,
    decay: 0.05,
    color
  });
}

function spawnHitSparks(x, y, isBlue) {
  const color = isBlue ? "#79a6db" : "#e57380";
  for (let i = 0; i < 10; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2 + Math.random() * 3,
      alpha: 1,
      decay: 0.05,
      color
    });
  }
}

function spawnHealParticles(x, y) {
  for (let i = 0; i < 14; i++) {
    particles.push({
      x: x + (Math.random() - 0.5) * 26,
      y: y + (Math.random() - 0.5) * 26,
      vx: (Math.random() - 0.5) * 1.2,
      vy: -1.2 - Math.random() * 1.8,
      size: 3 + Math.random() * 2,
      alpha: 1,
      decay: 0.035,
      color: "#256b49"
    });
  }
}

function addFloatingText(text, x, y, color = "#256b49") {
  floatingTexts.push({
    text, x, y,
    vy: -1.0,
    alpha: 1,
    decay: 0.02,
    color
  });
}

// --- Arena Rendering ---
function drawArena() {
  ctx.save();

  if (screenShakeRemaining > 0) {
    const sx = (Math.random() - 0.5) * screenShakeMag;
    const sy = (Math.random() - 0.5) * screenShakeMag;
    ctx.translate(sx, sy);
    screenShakeRemaining--;
  }

  // Daylight Mountain Arena Background
  if (bgImage.complete && bgImage.naturalWidth > 0) {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#121420";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Floating Platforms
  platforms.forEach(pl => {
    if (platformImg.complete && platformImg.naturalWidth > 0) {
      ctx.drawImage(platformImg, pl.x, pl.y - 2, pl.w, pl.h + 8);
    } else {
      ctx.fillStyle = "#3b435c";
      ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
    }

    ctx.strokeStyle = "rgba(229, 188, 75, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pl.x + 4, pl.y);
    ctx.lineTo(pl.x + pl.w - 4, pl.y);
    ctx.stroke();
  });

  // Medkit Item (+3 HP)
  if (activeMedkit) {
    const bobY = activeMedkit.y + Math.sin(performance.now() * 0.005) * 4;

    ctx.save();
    ctx.beginPath();
    ctx.arc(activeMedkit.x + activeMedkit.w / 2, bobY + activeMedkit.h / 2, 18, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(37, 107, 73, 0.35)";
    ctx.fill();

    if (medkitImg.complete && medkitImg.naturalWidth > 0) {
      ctx.drawImage(medkitImg, activeMedkit.x, bobY, activeMedkit.w, activeMedkit.h);
    } else {
      ctx.fillStyle = "#256b49";
      ctx.fillRect(activeMedkit.x, bobY, activeMedkit.w, activeMedkit.h);
    }
    ctx.restore();
  }

  // Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= p.decay;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    ctx.restore();
  }

  // Floating Combat Text
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y += ft.vy;
    ft.alpha -= ft.decay;
    if (ft.alpha <= 0) {
      floatingTexts.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.globalAlpha = Math.max(0, ft.alpha);
    ctx.font = "bold 12px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.fillText(ft.text, ft.x + 1, ft.y + 1);
    ctx.fillStyle = ft.color;
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.restore();
  }

  ctx.restore();
}

// --- Scoreboard HUD ---
function drawScoreboard() {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const cx = canvas.width / 2;
  const plateW = 160;
  const plateH = 42;

  ctx.fillStyle = "rgba(14, 17, 26, 0.94)";
  ctx.fillRect(cx - plateW / 2, 8, plateW, plateH);
  ctx.strokeStyle = "#c59929";
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - plateW / 2, 8, plateW, plateH);

  ctx.fillStyle = "#f8f1de";
  ctx.font = "bold 11px 'Press Start 2P'";
  ctx.fillText(`ROUND ${currentRound}/${audioSettings.matchRounds}`, cx, 22);

  ctx.font = "8px 'Press Start 2P'";
  ctx.fillStyle = "#b5ac96";
  ctx.fillText("[ESC] PAUSE", cx, 38);

  ctx.restore();
}

// --- Health Bars HUD (Clear Dark Cards, Scaled for 10-20 HP) ---
function drawHealthBars() {
  ctx.save();

  const cardW = 190;
  const cardH = 52;
  const barW = 170;
  const barH = 14;

  // PLAYER 1 HUD CARD (Left)
  const p1X = 10;
  const p1Y = 8;

  ctx.fillStyle = "rgba(14, 17, 26, 0.94)";
  ctx.fillRect(p1X, p1Y, cardW, cardH);
  ctx.strokeStyle = "#a62432";
  ctx.lineWidth = 2;
  ctx.strokeRect(p1X, p1Y, cardW, cardH);

  ctx.textAlign = "left";
  ctx.font = "bold 9px 'Press Start 2P'";
  ctx.fillStyle = "#f8f1de";
  ctx.fillText("P1 • CRIMSON", p1X + 10, p1Y + 16);

  ctx.textAlign = "right";
  ctx.font = "bold 9px 'Press Start 2P'";
  ctx.fillStyle = "#e5bc4b";
  ctx.fillText(`W: ${scoreP1}`, p1X + cardW - 10, p1Y + 16);

  const p1BarX = p1X + 10;
  const p1BarY = p1Y + 26;
  ctx.fillStyle = "#0c0e16";
  ctx.fillRect(p1BarX, p1BarY, barW, barH);
  ctx.strokeStyle = "#38415c";
  ctx.lineWidth = 1;
  ctx.strokeRect(p1BarX, p1BarY, barW, barH);

  const p1Ratio = Math.max(0, player1.hp / player1.maxHp);
  ctx.fillStyle = "#c83b4b";
  ctx.fillRect(p1BarX, p1BarY, barW * p1Ratio, barH);

  ctx.textAlign = "center";
  ctx.font = "bold 9px 'Press Start 2P'";
  ctx.fillStyle = "#000";
  ctx.fillText(`${player1.hp} / ${player1.maxHp} HP`, p1BarX + barW / 2 + 1, p1BarY + 11);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${player1.hp} / ${player1.maxHp} HP`, p1BarX + barW / 2, p1BarY + 10);

  // PLAYER 2 / AI HUD CARD (Right - Crystal Clear)
  const p2X = canvas.width - cardW - 10;
  const p2Y = 8;

  ctx.fillStyle = "rgba(14, 17, 26, 0.94)";
  ctx.fillRect(p2X, p2Y, cardW, cardH);
  ctx.strokeStyle = "#3d6499";
  ctx.lineWidth = 2;
  ctx.strokeRect(p2X, p2Y, cardW, cardH);

  ctx.textAlign = "left";
  ctx.font = "bold 9px 'Press Start 2P'";
  ctx.fillStyle = "#f8f1de";
  const p2Title = mode === "pva" ? "AI • AZURE" : "P2 • AZURE";
  ctx.fillText(p2Title, p2X + 10, p2Y + 16);

  ctx.textAlign = "right";
  ctx.font = "bold 9px 'Press Start 2P'";
  ctx.fillStyle = "#e5bc4b";
  ctx.fillText(`W: ${scoreP2}`, p2X + cardW - 10, p2Y + 16);

  const p2BarX = p2X + 10;
  const p2BarY = p2Y + 26;
  ctx.fillStyle = "#0c0e16";
  ctx.fillRect(p2BarX, p2BarY, barW, barH);
  ctx.strokeStyle = "#38415c";
  ctx.lineWidth = 1;
  ctx.strokeRect(p2BarX, p2BarY, barW, barH);

  const p2Ratio = Math.max(0, player2.hp / player2.maxHp);
  ctx.fillStyle = "#3d6499";
  ctx.fillRect(p2BarX + (barW * (1 - p2Ratio)), p2BarY, barW * p2Ratio, barH);

  ctx.textAlign = "center";
  ctx.font = "bold 9px 'Press Start 2P'";
  ctx.fillStyle = "#000";
  ctx.fillText(`${player2.hp} / ${player2.maxHp} HP`, p2BarX + barW / 2 + 1, p2BarY + 11);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${player2.hp} / ${player2.maxHp} HP`, p2BarX + barW / 2, p2BarY + 10);

  ctx.restore();
}

// --- Player Drawing (NO WHITE DOT) ---
function drawPlayers() {
  drawPlayer(player1, player2);
  drawPlayer(player2, player1);
}

function drawPlayer(p, o) {
  p.facing = p.x < o.x ? 1 : -1;

  ctx.save();
  if (p.damageFlash > 0) {
    p.damageFlash--;
    ctx.filter = "brightness(2) drop-shadow(0 0 6px #a62432)";
  }

  if (p.facing < 0) {
    ctx.translate(p.x + p.w / 2, 0);
    ctx.scale(-1, 1);
    ctx.translate(-(p.x + p.w / 2), 0);
  }

  if (p.skin.complete && p.skin.naturalWidth > 0) {
    ctx.drawImage(p.skin, p.x, p.y, p.w, p.h);
  } else {
    ctx.fillStyle = p === player1 ? "#a62432" : "#29476f";
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }

  ctx.restore();
}

// --- Physics & Platform Landing ---
function applyPhysics(p) {
  p.vy += gravity;
  let ny = p.y + p.vy;

  if (ny >= 300) {
    ny = 300;
    p.vy = 0;
    p.grounded = true;
    p.jumpCnt = p.isAI ? 2 : 1;
  } else {
    p.grounded = false;
  }

  if (p.vy >= 0) {
    platforms.forEach(pl => {
      if (
        p.x + p.w > pl.x && p.x < pl.x + pl.w &&
        p.y + p.h <= pl.y && ny + p.h >= pl.y
      ) {
        ny = pl.y - p.h;
        p.vy = 0;
        p.grounded = true;
        p.jumpCnt = p.isAI ? 2 : 1;
      }
    });
  }

  p.y = ny;
}

// --- Wind Strike Projectiles (With Controlled Delay) ---
function shootWind(player, isP1) {
  const isFacingRight = player.facing > 0;
  const projX = isFacingRight ? player.x + player.w : player.x - 34;
  const projY = player.y + 10;
  const speed = 9 * player.facing;

  const proj = {
    x: projX,
    y: projY,
    w: 34,
    h: 28,
    vx: speed,
    isP1,
    rotation: 0
  };

  if (isP1) {
    bulletsP1.push(proj);
  } else {
    bulletsP2.push(proj);
  }

  playSfx(sfxGun);
  playSynthTone(isP1 ? 650 : 420, 0.1, "sine", 0.2);
}

function updateProjectiles(arr, tgt, isP1) {
  const projImg = isP1 ? blueWindImg : redWindImg;

  for (let i = arr.length - 1; i >= 0; i--) {
    const b = arr[i];
    b.x += b.vx;
    b.rotation += 0.2 * Math.sign(b.vx);

    if (Math.random() < 0.5) {
      spawnWindTrail(b.x + b.w / 2, b.y + b.h / 2, isP1);
    }

    ctx.save();
    ctx.translate(b.x + b.w / 2, b.y + b.h / 2);
    if (b.vx < 0) ctx.scale(-1, 1);

    if (projImg.complete && projImg.naturalWidth > 0) {
      ctx.drawImage(projImg, -b.w / 2, -b.h / 2, b.w, b.h);
    } else {
      ctx.fillStyle = isP1 ? "#4a7eb8" : "#b8303f";
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
    }
    ctx.restore();

    if (b.x < -60 || b.x > canvas.width + 60) {
      arr.splice(i, 1);
      continue;
    }

    if (
      b.x < tgt.x + tgt.w && b.x + b.w > tgt.x &&
      b.y < tgt.y + tgt.h && b.y + b.h > tgt.y
    ) {
      tgt.hp--;
      tgt.damageFlash = 8;
      spawnHitSparks(b.x + b.w / 2, b.y + b.h / 2, isP1);
      triggerShake(6, 8);
      playSynthTone(180, 0.12, "square", 0.25);
      addFloatingText("-1 HP", tgt.x + tgt.w / 2, tgt.y, "#a62432");
      arr.splice(i, 1);
    }
  }
}

// --- Medkits ---
function updateMedkits() {
  if (!audioSettings.medkitsEnabled) {
    activeMedkit = null;
    return;
  }

  if (!activeMedkit) {
    medkitTimer--;
    if (medkitTimer <= 0) {
      const targetPl = platforms[Math.random() < 0.5 ? 0 : 1];
      activeMedkit = {
        x: targetPl.x + targetPl.w / 2 - 16,
        y: targetPl.y - 32,
        w: 32,
        h: 28
      };
      medkitTimer = 550 + Math.floor(Math.random() * 300);
    }
  } else {
    [player1, player2].forEach(p => {
      if (!activeMedkit) return;
      if (
        p.x < activeMedkit.x + activeMedkit.w &&
        p.x + p.w > activeMedkit.x &&
        p.y < activeMedkit.y + activeMedkit.h &&
        p.y + p.h > activeMedkit.y
      ) {
        const healAmt = Math.min(3, p.maxHp - p.hp);
        p.hp = Math.min(p.maxHp, p.hp + 3);
        spawnHealParticles(p.x + p.w / 2, p.y + p.h / 2);
        playChime();
        addFloatingText(healAmt > 0 ? `+${healAmt} HP` : "MAX HP", p.x + p.w / 2, p.y, "#256b49");
        activeMedkit = null;
      }
    });
  }
}

// --- AI Behavior ---
function updateAI() {
  const diff = audioSettings.aiDifficulty;
  const moveSpeed = diff === "hard" ? 3.2 : (diff === "normal" ? 2.3 : 1.6);
  const shootThreshold = diff === "hard" ? 65 : (diff === "normal" ? 95 : 140);

  let targetX = player1.x;
  if (activeMedkit && player2.hp <= player2.maxHp * 0.6 && Math.random() < 0.65) {
    targetX = activeMedkit.x;
  }

  if (player2.x < targetX - 50) player2.x += moveSpeed;
  else if (player2.x > targetX + 50) player2.x -= moveSpeed;

  bulletsP1.forEach(b => {
    const dist = Math.abs(b.x - player2.x);
    if (dist < 110 && b.vx > 0 && player2.grounded && Math.random() < (diff === "hard" ? 0.65 : 0.3)) {
      player2.vy = -12;
      player2.jumpCnt = 1;
      player2.grounded = false;
      playSfx(sfxJump);
    }
  });

  if (player2.grounded && Math.random() < (diff === "hard" ? 0.02 : 0.01)) {
    player2.vy = -12;
    player2.jumpCnt = 1;
    player2.grounded = false;
    playSfx(sfxJump);
  } else if (!player2.grounded && player2.jumpCnt > 0 && Math.random() < 0.007) {
    player2.vy = -12;
    player2.jumpCnt--;
    playSfx(sfxJump);
  }

  aiCd--;
  if (aiCd <= 0) {
    aiCd = shootThreshold + Math.floor(Math.random() * 30);
    player2.shootCd = 45;
    shootWind(player2, false);
  }
}

// --- Main Game Loop ---
function gameLoop() {
  if (gameOver || matchOver || isPaused || isCountingDown) return;

  drawArena();
  drawScoreboard();
  drawHealthBars();

  [player1, player2].forEach(p => { if (p.shootCd > 0) p.shootCd--; });

  // Player 1 Movement
  if (keys["a"] || keys["A"]) player1.x -= 5;
  if (keys["d"] || keys["D"]) player1.x += 5;
  if ((keys["w"] || keys["W"]) && player1.jumpCnt > 0) {
    player1.vy = -12;
    player1.jumpCnt--;
    player1.grounded = false;
    keys["w"] = false;
    keys["W"] = false;
    playSfx(sfxJump);
  }

  // Player 1 Shoot (With Tactical Delay & Anti-Spam Lock)
  if ((keys["e"] || keys["E"])) {
    if (!p1ShootPressed && player1.shootCd === 0) {
      player1.shootCd = 45; // 45 frames delay (~0.75s) prevents rapid spam
      p1ShootPressed = true; // Requires releasing key or waiting out delay
      shootWind(player1, true);
    }
  }

  // Player 2 Movement & Shoot (PvP)
  if (mode === "pvp") {
    if (keys["ArrowLeft"])  player2.x -= 5;
    if (keys["ArrowRight"]) player2.x += 5;
    if (keys["ArrowUp"] && player2.jumpCnt > 0) {
      player2.vy = -12;
      player2.jumpCnt--;
      player2.grounded = false;
      keys["ArrowUp"] = false;
      playSfx(sfxJump);
    }

    // Player 2 Shoot (With Tactical Delay & Anti-Spam Lock)
    if ((keys["0"] || keys["Insert"])) {
      if (!p2ShootPressed && player2.shootCd === 0) {
        player2.shootCd = 45; // 45 frames delay prevents rapid spam
        p2ShootPressed = true;
        shootWind(player2, false);
      }
    }
  } else {
    updateAI();
  }

  [player1, player2].forEach(p => {
    p.x = Math.max(0, Math.min(p.x, canvas.width - p.w));
    applyPhysics(p);
  });

  updateProjectiles(bulletsP1, player2, true);
  updateProjectiles(bulletsP2, player1, false);
  updateMedkits();
  drawPlayers();

  if (player1.hp <= 0 || player2.hp <= 0) {
    gameOver = true;
    stopAllBattleAudio();

    if (player1.hp <= 0) scoreP2++;
    else scoreP1++;

    const neededToWin = Math.ceil(audioSettings.matchRounds / 2);
    const p1MatchWon = scoreP1 >= neededToWin;
    const p2MatchWon = scoreP2 >= neededToWin;
    const isFinalRound = currentRound >= audioSettings.matchRounds || p1MatchWon || p2MatchWon;

    if (isFinalRound) {
      matchOver = true;
      setTimeout(() => {
        drawArena();
        drawScoreboard();
        drawHealthBars();
        drawPlayers();

        let champText = "";
        let champColor = "#e5bc4b";

        if (scoreP1 > scoreP2) {
          champText = "PLAYER 1 WINS MATCH!";
          champColor = "#c83b4b";
        } else if (scoreP2 > scoreP1) {
          champText = mode === "pva" ? "AI BOT WINS MATCH!" : "PLAYER 2 WINS MATCH!";
          champColor = "#79a6db";
        } else {
          champText = "IT'S A DRAW!";
        }

        winnerBanner.textContent = champText;
        winnerBanner.style.color = champColor;
        matchScoreSummary.textContent = `FINAL SCORE: ${scoreP1} - ${scoreP2}`;
        endScreen.style.display = "block";
      }, 900);
    } else {
      currentRound++;
      setTimeout(() => {
        if (!matchOver) startRound();
      }, 1400);
    }
    return;
  }

  requestAnimationFrame(gameLoop);
}
