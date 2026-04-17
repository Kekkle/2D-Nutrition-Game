# Level 1: Carbohydrates — Design Spec

**Tier:** 1 (Macronutrients)
**Position:** First level in the game (after Tutorial L0)
**Difficulty:** Easiest — this is the player's introduction to the core loop
**Core concept:** Carbs are the body's preferred quick-energy fuel
**Level challenge:** Distinguish starchy carbs from fibre-rich carbs as you collect

---

## Food Item Catalog

### Target Items (Carb-Rich Foods)

These are the primary collectibles. Collecting enough fills the collection bar to complete the level.

| Item | Starchy / Fibre-Rich | Energy Meter Fill | Notes |
|---|---|---|---|
| White bread slice | Starchy | Standard | Common, easy to spot |
| Brown bread slice | Fibre-rich | Standard + small bonus | Slightly different visual (darker color, visible grains) |
| White rice bowl | Starchy | Standard | |
| Brown rice bowl | Fibre-rich | Standard + small bonus | Darker visual |
| Pasta (penne/spaghetti) | Starchy | Standard | |
| Banana | Fibre-rich | Standard + small bonus | |
| Apple (with skin) | Fibre-rich | Standard + small bonus | Skin detail visible in sprite |
| Orange | Fibre-rich | Standard + small bonus | |
| Oats / porridge bowl | Fibre-rich | Standard + small bonus | |
| Potato (no skin) | Starchy | Standard | |
| Potato (with skin) | Fibre-rich | Standard + small bonus | Skin detail visible |
| Sweetcorn | Fibre-rich | Standard + small bonus | |
| Cereal bowl | Starchy | Standard | |
| Tortilla / wrap | Starchy | Standard | |

### Neutral Items (Non-Carb Foods)

Present in the level but don't fill the carb collection bar. Collecting them still gives a small energy meter bump (all food provides energy) but doesn't count toward the level objective.

| Item | Why It's Here |
|---|---|
| Egg | Introduces food that's primarily protein — foreshadows L2 |
| Cheese wedge | Primarily fat — foreshadows L3 |
| Chicken drumstick | Primarily protein |
| Broccoli floret | Has carbs but is more notable for fibre — foreshadows L4 |

> **Design intent:** Neutral items teach the player that not all food is "the target" without punishing them. Collecting a neutral item is never harmful — it just doesn't advance the collection bar. The end-of-level screen notes which non-target items were collected, building awareness for later levels.

---

## Enemy Roster

L1 introduces only **one** enemy type to keep cognitive load low.

| Enemy | Count | Placement |
|---|---|---|
| **Fatigue Phantom** | 4–6 total | None in the first third of the level. First one appears mid-level as a gentle introduction. Frequency increases slightly in the final third. |

**Behavior in this level:**
- Slow drift speed (base speed, no scaling yet — energy meter should stay high in L1).
- Generous telegraph — a faint glow or shimmer appears 1–2 seconds before the Phantom materializes.
- Contact drains ~10% energy meter (enough to notice, not enough to threaten failure on first contact).

---

## Hazard Placement

L1 introduces only **one** hazard type.

| Hazard | Count | Placement |
|---|---|---|
| **Crash Pits** | 2–3 | One mid-level (teaches the mechanic), one or two in the final third |

**Behavior in this level:**
- Quicksand-like visual. Character sinks slightly and movement slows to ~50% for 2 seconds.
- No energy drain — just a movement penalty. The player learns to avoid them through feel.
- Placed near collectibles so the player must decide: walk through the Crash Pit to grab an item, or jump over it and miss the item?

---

## Level Challenge Mechanic: Starchy vs. Fibre-Rich

The collection bar has two visual segments:
1. **Carbs collected** (main bar — fills toward 100%)
2. **Fibre-rich carbs collected** (secondary indicator — a smaller overlay or glow on the main bar)

**How it works:**
- All carb items count toward the main collection bar equally.
- Fibre-rich carb items *also* trigger a small fibre indicator pulse and a distinct collection SFX (a warmer, fuller chime vs. the standard collect sound).
- At the end of the level, the score screen shows "X of Y fibre-rich carbs found" as a secondary stat.
- Collecting all fibre-rich carbs earns one of the three Knowledge Stars.

**Why this works for L1:**
- It doesn't overwhelm — the player can complete the level by collecting *any* carbs.
- But observant players notice the visual/audio difference and start distinguishing the two types.
- This foreshadows L4 (Fibre) without requiring the player to understand fibre yet.

---

## Energy Cell Placement

**Total Energy Cells in level:** ~30–40

| Placement Type | Count | Description |
|---|---|---|
| **Main path** | ~20 | Obvious, hard to miss — reward basic traversal |
| **Above platforms (requires jumping)** | ~8 | Requires variable jump height — teaches tap vs. hold |
| **Below platforms (requires ducking/dropping)** | ~5 | Teaches ducking and dropping down through soft platforms |
| **Hidden (requires exploration)** | ~5 | Behind breakable walls or at the end of short detour paths |

**Bonus Energy Cells:**
- +5 for completing level with energy meter above 75%
- +3 for each Knowledge Star found
- +5 for no enemy contact (damage-free run)

---

## Knowledge Star Locations

| Star | How to Earn |
|---|---|
| **Star 1** | Collect all fibre-rich carb items in the level |
| **Star 2** | Find the hidden alcove above the second Crash Pit (requires precise jumping) |
| **Star 3** | Complete the level with energy meter at 90% or above |

---

## Difficulty Calibration Notes

This is the first real level. The player just came from Tutorial L0 (controls only). The priority is:

1. **Teach the core loop** — splash, collect, avoid, finish.
2. **Make the player feel competent** — they should complete L1 on their first attempt with reasonable play.
3. **Layer in secondary depth** — the starchy/fibre-rich distinction and Knowledge Stars give experienced players something to chase on replay.

**Specific tuning targets:**
- Level length: ~60–90 seconds at normal run speed.
- Target food density: High. There should be more collectibles than needed — the player should comfortably fill the bar at ~70–80% of level completion, leaving the last stretch as a victory lap.
- Enemy damage: Low. A player who gets hit by every single Phantom should still be able to complete the level.
- Platform difficulty: Very easy. Wide platforms, short gaps, no precision jumps required. One or two slightly tricky jumps near the end for star-hunters.

---

## Visual / Audio Notes

- **Environment:** Bright, welcoming. A kitchen or farm/garden aesthetic. First-level warmth.
- **Carb items:** Warm golden/brown tones (bread, rice, pasta, oats). Fruits have their natural vibrant colors.
- **Fibre-rich indicator:** A subtle green sparkle or leaf icon appears briefly when a fibre-rich carb is collected.
- **Fatigue Phantom:** Semi-transparent, purple/grey, wispy. Shouldn't look scary — more drowsy and sluggish.
- **Music:** Upbeat, medium tempo. Encouraging. Sets the tone for the whole game.
