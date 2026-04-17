# Level 3: Fats — Design Spec

**Tier:** 1 (Macronutrients)
**Position:** Third level
**Difficulty:** Moderate — the variety mechanic and splitting enemies add real challenge
**Core concept:** Fats are the body's slow-burn energy source and build every cell membrane
**Level challenge:** Collect a balanced mix of fat types; variety matters more than avoiding any single type

---

## Food Item Catalog

### Target Items (Fat-Rich Foods)

Items are tagged by fat type. The variety mechanic tracks how many *different* types the player collects.

| Item | Fat Type | Energy Meter Fill | Notes |
|---|---|---|---|
| Avocado half | Monounsaturated | Standard, sustained | Slow, steady fill — stays on the meter longer |
| Olive oil bottle | Monounsaturated | Standard, sustained | |
| Almonds (handful) | Monounsaturated | Standard, sustained | |
| Peanuts | Monounsaturated | Standard, sustained | |
| Salmon fillet | Polyunsaturated (Omega-3) | Standard, sustained | Also appeared in L2 (protein) — player recognizes it |
| Walnuts | Polyunsaturated (Omega-3) | Standard, sustained | |
| Chia seeds | Polyunsaturated (Omega-3) | Standard, sustained | |
| Flaxseed | Polyunsaturated (Omega-3) | Standard, sustained | |
| Sunflower seeds | Polyunsaturated (Omega-6) | Standard, sustained | |
| Sesame seeds | Polyunsaturated (Omega-6) | Standard, sustained | |
| Butter pat | Saturated | Standard, sustained | Present without judgment — it's a fat source |
| Cheese wedge | Saturated | Standard, sustained | |
| Coconut (piece) | Saturated | Standard, sustained | |
| Cream dollop | Saturated | Standard, sustained | |

### Neutral Items

| Item | Why It's Here |
|---|---|
| Apple | Carb callback (L1) — very low fat |
| Rice bowl | Carb callback (L1) |
| Chicken drumstick | Protein callback (L2) — has some fat but is primarily protein |
| Lentils | Protein/fibre callback |

---

## Variety Mechanic — Detailed Design

**The collection bar has four sub-segments** corresponding to the fat types:
1. Monounsaturated
2. Omega-3
3. Omega-6
4. Saturated

**How it works:**
- Each fat item collected fills its corresponding sub-segment AND the overall collection bar.
- A **"Variety Meter"** (separate small indicator) tracks how many of the 4 types have been collected at least once.
- Collecting your first item of a new type triggers a distinct visual/audio cue — a broader, warmer glow and a harmony chime.
- When all 4 types are represented (Variety Meter full), the player receives:
  - A burst of energy meter fill (+20%)
  - A brief visual effect (the character glows with a warm aura for ~5 seconds)
  - A speed boost lasting ~5 seconds
- After the variety bonus triggers, collecting additional items still fills the collection bar normally, but no second variety bonus fires.

**Over-specialization feedback:**
- If the player collects 6+ items of the same type without collecting another type, a gentle visual cue appears — the sub-segment bar starts to dim slightly and the energy fill per item decreases marginally (~75% of normal).
- This is subtle, not punitive. The player can still complete the level collecting only one type. But variety is clearly more rewarding.

**Why this works:**
- Teaches "balance matters" through feel, not lecture.
- No fat type is villainized — even the saturated segment fills and contributes positively.
- The variety bonus is a satisfying moment that rewards intentional play.

---

## Enemy Roster

L3 introduces the Free Radical — the most mechanically complex enemy so far.

| Enemy | Count | Placement |
|---|---|---|
| **Fatigue Phantom** | 2–3 | Light presence, mostly early level (familiar) |
| **Free Radical** | 5–7 | Introduced early-mid level. Main threat. Scattered throughout the middle and late sections. |

**Free Radical behavior in this level:**
- Bounces off walls and platforms at ~45-degree angles. Constant motion.
- When the player jumps on a Free Radical, it splits into 2 smaller radicals that bounce faster but in tighter patterns.
- Small radicals can be jumped on to destroy them (they don't split further).
- Contact with any radical (large or small) drains ~12% energy.
- Visual: Spiky, electric-green/yellow orbs with erratic particle trails.
- Audio: A buzzing, crackling sound that intensifies when radicals split.

**Strategic depth:**
- Sometimes it's better to avoid a Free Radical entirely than to jump on it and create two smaller, faster threats.
- Radicals near collectibles create risk/reward decisions: do you engage the radical to clear the path, or try to weave around it?

---

## Hazard Placement

| Hazard | Count | Placement |
|---|---|---|
| **Crash Pits** | 1–2 | Early level (familiar) |
| **Fog Banks** | 1–2 | Mid-level (familiar from L2) |
| **Inflammation Zones** | 2–3 | New in L3. Late-mid to late level. |

**Inflammation Zone behavior:**
- Pulsing red/orange area covering a section of a platform or floating in mid-air.
- Standing in the zone drains energy at ~5% per second — a slow but steady burn.
- The player must decide: run through quickly, jump over, or find an alternate route.
- Placed near high-value collectibles (omega-3 items, hidden Energy Cells) to create risk/reward moments.

---

## Energy Cell Placement

**Total Energy Cells in level:** ~40–50

| Placement Type | Count | Description |
|---|---|---|
| **Main path** | ~18 | Standard traversal |
| **Near varied fat types** | ~10 | Clustered near less-common fat items (omega-6, saturated) to reward variety-seeking |
| **Risk/reward (near Inflammation Zones or Free Radicals)** | ~8 | Requires engaging with hazards/enemies to collect |
| **Hidden** | ~7 | Behind breakable walls, on high platforms requiring precise jumps, in short detour paths |

**Bonus Energy Cells:**
- +5 for completing level with energy meter above 75%
- +3 for each Knowledge Star found
- +5 for no enemy contact
- +5 for triggering the variety bonus (all 4 fat types collected)

---

## Knowledge Star Locations

| Star | How to Earn |
|---|---|
| **Star 1** | Trigger the variety bonus (collect at least one of each fat type) |
| **Star 2** | Destroy all Free Radicals in the level (including their split smaller versions) |
| **Star 3** | Find the hidden chamber behind the final Inflammation Zone — requires running through it to reach a secret alcove with the star and bonus Energy Cells |

---

## Difficulty Calibration Notes

L3 is the midpoint of Tier 1. The player knows the core loop and has dealt with Phantoms, Sprites, Crash Pits, and Fog Banks. Now we raise the bar.

**Compared to L2:**
- Free Radicals are the first enemy with a complex interaction mechanic (splitting).
- Inflammation Zones are the first hazard that deals continuous damage.
- The variety mechanic adds a strategic layer to collection — it's not just "grab everything."
- More neutral/decoy items than L1 or L2.
- Level length: ~100–130 seconds.

**Tuning targets:**
- A first-time player should complete L3 within 1–3 attempts.
- The variety bonus should be achievable on a first playthrough if the player reads the splash text and explores.
- Free Radical splitting should feel fair — the player always has time to react to the split.
- Inflammation Zones should feel uncomfortable but survivable — sprinting through one should cost ~10–15% energy, not cause a fail.

---

## Visual / Audio Notes

- **Environment:** A Mediterranean or tropical palette — warm sunlight, olive trees, ocean hints. Fats are associated with richness and warmth.
- **Fat items:** Rich, glossy textures. Avocados are vibrant green, salmon is pink/coral, nuts are warm brown, olive oil has a golden glow.
- **Variety bonus animation:** When the 4th fat type is collected, all four sub-segments flash in sequence, then merge into a unified golden glow that envelops the character briefly.
- **Free Radicals:** Electric green/yellow spiky spheres. Erratic particle trails. When they split, there's a sharp "crack" sound and two smaller, faster versions zip away.
- **Inflammation Zones:** Deep red/orange pulsing glow. Slight heat-haze visual distortion. A low throbbing ambient sound when the player is nearby.
- **Music:** Warmer, richer instrumentation than L1/L2. Slightly more complex arrangement. Mediterranean feel — acoustic guitar or marimba elements.
