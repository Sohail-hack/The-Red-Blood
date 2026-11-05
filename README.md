# ⚔️ RED BLOOD - Tactical 2D Fighter Arena

A retro 16-bit arcade fighting arena game built with HTML5 Canvas, Vanilla JavaScript, and the Web Audio API.

🎮 **Live Demo:** [https://sohail-hack.github.io/Red-Blood/](https://sohail-hack.github.io/Red-Blood/)

---

## 🌟 Features
- **16-bit Retro Arcade Aesthetics:** Authentic pixelated typography (`Press Start 2P`, `Pixelify Sans`), hand-crafted pixel combat HUD, and daytime open-air arena visuals.
- **Elemental Wind Blades:** 
  - **Player 1 (Crimson):** Hurls piercing Blue Wind slashes (`E`).
  - **Player 2 / AI (Azure):** Unleashes flaming Red Wind slashes (`0`).
  - Built-in tactical delay cooldown to prevent projectile spamming.
- **Dynamic Platformer Physics:** Floating stone platforms that players can jump onto and drop down/jump through from below.
- **Field Healing Items:** Floating Medkits periodically drop on platforms to restore **+3 HP**.
- **Adaptive AI Bot:** AI tracks targets, dodges incoming wind blades, climbs platforms, and contests medkits.
- **[ESC] Pause Menu:** Seamlessly pause the fight anytime with `ESC` to adjust settings, toggle music, or restart.
- **Full Arena Settings & Sound Adjuster:**
  - Independent volume sliders for Master, Music, and SFX.
  - Dedicated one-click Music & SFX mute toggles.
  - Configurable Fighter Health: 10 HP (Balanced), 15 HP (Extended), 20 HP (Endurance).
  - Match Format selection (Best of 3, Best of 5, or 1 Round).
  - AI Bot Difficulty settings (Easy, Normal, Hard).
  - Screen shake impact toggle.
  - All settings persist automatically via `localStorage`.

---

## 🎮 Controls

| Action | Player 1 (Crimson) | Player 2 (Azure) |
|---|---|---|
| **Move Left / Right** | `A` / `D` | `←` / `→` (Arrow Keys) |
| **Jump** | `W` | `↑` (Up Arrow) |
| **Wind Strike** | `E` | `0` (Zero / Numpad 0) |
| **Pause Match** | `ESC` | `ESC` |

---

## 🚀 How to Run Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/Sohail-hack/Red-Blood.git
   cd Red-Blood
   ```
2. Open `docs/index.html` in any web browser (Chrome, Edge, Firefox, Brave, Safari).
3. That's it! No build steps or dependencies required.

---

## 🌐 How to Enable GitHub Pages (Live Website)

1. Push this repository to `https://github.com/Sohail-hack/Red-Blood`.
2. Go to your repository on GitHub: **Settings** > **Pages** (under Code and automation in the left sidebar).
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/docs`
4. Click **Save**.
5. Within 1-2 minutes, your game will be live at:
   **`https://sohail-hack.github.io/Red-Blood/`**

---

## 👤 Developer & Creator

**Shaik Sohail**
- **LinkedIn:** [linkedin.com/in/shaik-sohail-a5482b328](https://www.linkedin.com/in/shaik-sohail-a5482b328)
- **GitHub:** [@Sohail-hack](https://github.com/Sohail-hack)
- **Email:** sohailbasheer2005@gmail.com
