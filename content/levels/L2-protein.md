# Level 2: Protein — Design Spec

**Tier:** 1 (Macronutrients)
**Position:** Second level
**Difficulty:** Easy-to-moderate — adds the combo mechanic on top of L1's foundation
**Core concept:** Protein is the body's primary building material for all tissue
**Level challenge:** Collect complete protein combos (e.g., rice + beans) for bonus energy

---

## Food Item Catalog

### Target Items (Protein-Rich Foods)

| Item | Complete / Incomplete | Energy Meter Fill | Combo Partner |
|---|---|---|---|
| Chicken drumstick | Complete | Standard | — |
| Egg | Complete | Standard | — |
| Salmon fillet | Complete | Standard | — |
| Beef steak | Complete | Standard | — |
| Tofu block | Complete | Standard | — |
| Yogurt cup | Complete | Standard | — |
| Quinoa bowl | Complete | Standard | — |
| Black beans | Incomplete | Standard | Rice, bread, tortilla |
| Lentils | Incomplete | Standard | Rice, bread |
| Chickpeas / hummus | Incomplete | Standard | Pita, bread, tortilla |
| Peanuts / peanut butter | Incomplete | Standard | Bread |
| Kidney beans | Incomplete | Standard | Rice |

### Combo Items (Carb Partners for Incomplete Proteins)

These items don't fill the protein collection bar on their own but complete a combo when collected near an incomplete protein.

| Item | Completes Combo With |
|---|---|
| Rice bowl | Black beans, lentils, kidney beans |
| Bread slice | Lentils, peanut butter, chickpeas |
| Tortilla / wrap | Black beans, chickpeas |
| Pita bread | Chickpeas / hummus |

### Neutral Items

| Item | Why It's Here |
|---|---|
| Banana | Primarily carbs — callback to L1 |
| Avocado | Primarily fat — foreshadows L3 |
| Pasta | Primarily carbs |
| Olive oil bottle | Primarily fat |

---

## Combo Mechanic — Detailed Design

**How it works:**
1. Player collects an incomplete protein (e.g., black beans). A small icon appears in a "combo slot" at the top of the screen showing what it can pair with (e.g., a faded rice icon).
2. If the player collects the matching partner within the next ~10 seconds (or ~15 platforms of distance), the combo triggers:
   - Visual: Both items flash and combine with a satisfying merge animation.
   - Audio: A distinct two-tone chime (deeper than the standard collect sound).
   - Effect: +15% energy meter fill (vs. the standard ~8% for a single item). The combo counts as a complete protein in the collection bar.
3. If the timer expires without a match, the incomplete protein still counts as a standard collection — no penalty. The combo slot clears.
4. Complete proteins (chicken, eggs, fish, tofu, quinoa, yogurt) don't need a combo partner — they fill the bar immediately at the standard rate.

**Why this works:**
- Rewards knowledge without punishing ignorance. You can complete L2 without ever triggering a combo.
- Combos give experienced or replay players something to optimize.
- Teaches complementary proteins through mechanics, not text.

---

## Enemy Roster

L2 introduces a new enemy alongside the returning Fatigue Phantom.

| Enemy | Count | Placement |
|---|---|---|
| **Fatigue Phantom** | 3–4 | Scattered evenly. Same behavior as L1 but slightly faster drift. |
| **Stress Sprite** | 4–6 | Introduced mid-level. Appear in clusters of 2–3 with erratic zigzag movement. |

**Stress Sprite behavior in this level:**
- Move in quick, short bursts with random direction changes. Harder to predict than Phantoms.
- Each Sprite drains ~8% energy on contact.
- Clusters are visually signposted — a faint crackling energy field appears in the area before they spawn.
- They don't chase the player — they patrol a zone. The player must time their passage through.

---

## Hazard Placement

| Hazard | Count | Placement |
|---|---|---|
| **Crash Pits** | 2 | Early level (familiar from L1) |
| **Fog Banks** | 2–3 | Mid-to-late level. Obscure platforms and collectibles ahead for ~3 seconds of screen travel. |

**Fog Bank behavior:**
- Purely visual — a translucent cloud that obscures the next ~2 screen-widths of level.
- The player must rely on timing and rhythm to jump through fogged sections.
- Items inside the fog are collectible but invisible until the player enters the fog's area.
- Fog Banks are placed near combo partners — an observant player notices a combo opportunity just before entering the fog and can plan their path.

---

## Energy Cell Placement

**Total Energy Cells in level:** ~35–45

| Placement Type | Count | Description |
|---|---|---|
| **Main path** | ~18 | Standard traversal reward |
| **Near combo partners** | ~8 | Clustered around incomplete proteins and their matching carb partners — rewards players who pursue combos |
| **Above/below platforms** | ~8 | Requires jump mastery |
| **Hidden** | ~6 | Behind breakable walls, in detour paths, or visible only after Fog Banks clear |

**Bonus Energy Cells:**
- +5 for completing level with energy meter above 75%
- +3 for each Knowledge Star found
- +5 for no enemy contact
- +3 for triggering at least 3 protein combos

---

## Knowledge Star Locations

| Star | How to Earn |
|---|---|
| **Star 1** | Trigger at least 4 complete protein combos during the level |
| **Star 2** | Find the hidden path behind the second Fog Bank (a short detour with extra collectibles and Energy Cells) |
| **Star 3** | Collect every single protein item in the level (both complete and incomplete) — 100% protein collection |

---

## Difficulty Calibration Notes

L2 is the player's second level. They know the core loop. Now we add a layer.

**Compared to L1:**
- +1 enemy type (Stress Sprites alongside Fatigue Phantoms)
- +1 hazard type (Fog Banks alongside Crash Pits)
- +1 mechanic (combo system)
- Slightly longer level (~90–120 seconds)
- Slightly tighter platform spacing
- More neutral/decoy items mixed in with targets

**Tuning targets:**
- A first-time player should complete L2 on their first or second attempt.
- Completing without combos is easy. Getting all 3 stars requires replay and route planning.
- Fog Banks should feel surprising but not unfair — nothing lethal is hidden inside them.
- Stress Sprites should feel chaotic but avoidable — the player learns to read their zone boundaries.

---

## Visual / Audio Notes

- **Environment:** A marketplace or kitchen interior. More dynamic than L1 — things feel busier and more layered.
- **Protein items:** Rich reds, pinks, and warm browns (meat, beans). Tofu and yogurt are white/cream. Eggs are distinctive.
- **Combo animation:** When a combo triggers, the two items fly toward each other and merge into a glowing combined icon with a brief sparkle burst.
- **Stress Sprites:** Small, crackling blue-white energy balls. Move in jittery bursts. Distinct audio — a sharp electric buzz when nearby.
- **Fog Banks:** Soft grey-blue translucent overlay. Gentle ambient sound (low hum or wind) when inside.
- **Music:** Slightly faster tempo than L1. More percussive. Builds energy.
