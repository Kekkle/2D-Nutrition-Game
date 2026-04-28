# Level 2: Protein — Design Spec

**Tier:** 1 (Macronutrients)
**Position:** Second level
**Difficulty:** Easy-to-moderate — adds a sorting/delivery mechanic on top of L1's foundation
**Core concept:** Protein is the body's primary building material — every tissue (muscle, skin, organs, enzymes, immune cells) is built and repaired with protein
**Level challenge:** Collect protein-rich foods, then sort them into the correct basket: Animal Protein or Plant Protein

---

## Nutrition Notes (Source: Prof. Stuart Phillips / ZOE)

The old "complete vs. incomplete protein" framing is outdated. Key points from current research:

- Plant proteins are **not inferior** to animal proteins for health or muscle.
- Plants are not "deficient" in amino acids — they may be lower in certain ones, but variety across a normal diet covers all needs.
- Pairing a plant protein with a grain is **not necessary** for nutritional completeness (though it can be tasty and culturally traditional).
- The real value of plant protein is the **protein package** — it comes with fibre, bioactive compounds, and complex carbs that animal protein doesn't provide.
- Both animal and plant protein sources are valuable. The game should teach awareness of *where* protein comes from (animal vs. plant sources), not rank one above the other.

This level teaches: protein is your building material, it comes from many sources, and both animal and plant foods provide it.

---

## Food Item Catalog

### Target Items (Protein-Rich Foods)

All target items fill the energy meter at the standard rate when collected. They also enter the player's inventory (up to 3 slots) for sorting into baskets.

| Item | Source | Energy Meter Fill | Notes |
|---|---|---|---|
| Chicken drumstick | Animal | Standard | Familiar from L1 neutral items |
| Egg | Animal | Standard | Familiar from L1 neutral items |
| Salmon fillet | Animal | Standard | Rich pink/orange visual |
| Beef steak | Animal | Standard |
| Cheese  | Animal/Dairy | Standard | 
| Yogurt cup | Animal/Dairy | Standard | White/cream visual |
| Tofu block | Plant | Standard | White block with visible texture |
| Quinoa bowl | Plant | Standard | Looks like a grain but is protein-rich |
| Black beans | Plant | Standard | Dark with visible bean shapes |
| Lentils | Plant | Standard | Small, round, earthy |
| Chickpeas | Plant | Standard | Pale, round |
| Peanuts | Plant | Standard | Warm brown |
| Kidney beans | Plant | Standard | Dark red, distinctive shape |


**Balance:** 6 animal, 7 plant. The slight lean toward plant protein reflects variety and subtly teaches that protein comes from many plant sources — not just meat. Neither category is framed as better.

### Neutral Items (Non-Protein Foods)

Present in the level. Collecting them gives a small energy bump but they don't count toward the protein collection bar and **cannot be deposited in baskets** (rejected with a gentle error sound).

| Item | Why It's Here |
|---|---|
| Banana | Primarily carbs — callback to L1 |
| Avocado | Primarily fat — foreshadows L3 |
| Pasta | Primarily carbs |
| Olive oil bottle | Primarily fat |
| White bread | Primarily carbs — familiar from L1 |
| White rice | Primarily carbs — familiar from L1 |

### Fun Foods

| Item | Notes |
|---|---|
| Donut | Fun food. Goes into inventory but is rejected by baskets (not protein) |
| Croissant | Fun food. Same behavior |

> **Design intent:** Neutral and fun foods teach that not all food is protein — without punishing the player. Attempting to deposit a non-protein item is a learning moment, not a failure. The item returns to inventory, the basket gives a gentle "nope" animation, and the player continues.

---

## Protein Basket Mechanic — Detailed Design

### Overview

The level's core mechanic replaces the old combo system. Players collect protein-rich foods into a 3-slot inventory, then deposit them into the correct sorting basket. This teaches where protein comes from (animal vs. plant sources) through hands-on categorization.

### The Baskets

Two basket types are placed throughout the level:

| Basket | Color | Accepts | Visual |
|---|---|---|---|
| **Animal Protein Basket** | Blue | Chicken, egg, salmon, steak, yogurt, cheese | Blue basket/crate with a small animal silhouette icon |
| **Plant Protein Basket** | Green | Tofu, quinoa, black beans, lentils, chickpeas, peanuts, kidney beans | Green basket/crate with a small leaf icon |

**Basket placement:** 4–5 baskets total, scattered through the level. They don't always appear in pairs — sometimes the player encounters a blue basket and must plan when to deposit their plant proteins at the next green basket (and vice versa). At least one pair appears early for teaching the mechanic.

### How It Works

1. **Collect:** The player runs over a food item. If it's a protein item, it enters the 3-slot inventory (visible on the HUD). If the inventory is full, the item can't be collected — a subtle "full" indicator flashes and the item stays on the ground.
2. **Carry:** The player continues through the level, carrying up to 3 items. Non-protein foods (neutral/fun) still give immediate energy but do NOT enter the inventory — they are auto-consumed on contact, same as L1.
3. **Deposit:** When near a basket, the player presses **E** to deposit. The basket checks each item in the inventory:
   - **Correct category** (e.g., chicken → blue basket): Item accepted with a satisfying chime. Counts toward the protein collection bar. Basket glows briefly.
   - **Wrong protein category** (e.g., tofu → blue basket): Item rejected with a gentle buzzer. Item stays in inventory. Basket shakes its head slightly. No penalty.
   - **Non-protein item** (if somehow in inventory): Item rejected, falls to the ground, disappears. Gentle "berp" sound.
4. **Progress:** The protein collection bar fills as items are correctly deposited. The level is complete when the player has deposited enough proteins AND reached the finish flag.

### Inventory HUD

- 3 small square slots displayed at the top-right of the screen (below the energy bar).
- Each slot shows a tiny pixel-art icon of the carried item.
- Empty slots are outlined but transparent.
- When all 3 slots are full, a subtle pulse indicates "inventory full — find a basket."
- Each item in the inventory has a small colored dot: blue for animal, green for plant (helps the player plan which basket to seek).

### Why Baskets Work

- **Teaches through mechanics:** The player learns animal vs. plant protein sources by physically sorting them, not by reading a list.
- **Introduces the carry-and-deliver pattern:** This mechanic returns in L4 (Fibre) with microbiome stations (6-slot inventory, diversity scoring). L2's simpler 3-slot version establishes the pattern.
- **No penalty for mistakes:** Depositing in the wrong basket just bounces the item back. The player learns by doing.
- **Route planning:** Limited inventory (3 slots) + scattered baskets = the player must think about which foods to collect and which basket is ahead. Adds a light strategic layer.
- **Respects food neutrality:** No food is rejected as "bad." Non-protein foods are simply not the target for this level's baskets — the same way non-carb foods weren't the target in L1.

### Keyboard Control

**E** — Deposit items into a nearby basket. Only active when the player is within range of a basket (a subtle glow or "Press E" prompt appears).

### Design Question: Processed Protein Basket?

The idea of a third basket for "processed" proteins (e.g., nuggets) was considered. However, this creates a tension with the content guardrails:

- Separating "processed" from "unprocessed" could imply that processed foods are lesser, which conflicts with food neutrality.
- The food quality spectrum is the explicit focus of **L13** — introducing it in L2 would front-load a concept that deserves its own level.
- Chicken nuggets are still animal protein. Having them go into the Animal Protein basket is accurate and avoids value judgments.

**Recommendation:** Stick with two baskets (Animal / Plant) for L2. Revisit the processing spectrum in L13 where it can be explored with proper nuance.

---

## Enemy Roster

L2 introduces a new enemy alongside the returning Fatigue Phantom.

| Enemy | Count | Placement |
|---|---|---|
| **Fatigue Phantom** | 3–4 | Scattered evenly. Same behavior as L1 but slightly faster drift. Ground level only. |
| **Stress Sprite** | 4–6 | Appear from mid-level onward. Triggered events, not persistent. |

### Stress Sprite — Redesigned Behavior

Stress Sprites no longer patrol zones with zigzag movement. Instead, they are **sudden, fast, one-shot threats:**

1. **Warning:** A brief audio cue plays (sharp electric crackle, ~0.5s) and a faint glow appears at the edge of the screen on the player's current vertical level (ground, platform, or ladder height).
2. **Attack:** The Stress Sprite rockets across the screen in a straight horizontal line at high speed, passing through the player's current height. It moves fast enough that the player must react quickly.
3. **Avoidance:** The player can:
   - **Jump** over the sprite
   - **Duck** under the sprite (if the sprite is at head/torso height)
   - **Shoot** the sprite with an energy ball (destroys it before it reaches the player)
4. **Disappear:** Once the sprite crosses the full screen width, it vanishes. It does not loop back or persist.
5. **Damage:** Contact drains ~8% energy. The sprite has **1 HP** (one energy ball or one stomp destroys it — but stomping is risky given its speed).
6. **Frequency:** Sprites appear every ~15–20 seconds after the mid-level trigger point. They target the player's current vertical position, so being on a platform doesn't guarantee safety.
7. **Clusters:** Occasionally 2 sprites fire in quick succession (1 second apart) from alternating sides — the player must jump one and duck the other (or shoot both).

**Why this redesign works:**
- Stress is sudden and intense, then passes — the sprite's behavior mirrors an acute stress response.
- Creates quick-reaction moments that punctuate the more strategic basket-sorting gameplay.
- Ducking becomes a meaningful action (currently underused in L1), establishing it before it becomes essential in later levels.
- The audio warning gives the player a fair chance to react without making it trivial.

---

## Hazard Placement

| Hazard | Count | Placement |
|---|---|---|
| **Crash Pits** | 2 | Early level (familiar from L1) |
| **Fog Banks** | 2–3 | Mid-to-late level. Placed near baskets or protein clusters to obscure what's ahead. |

### Fog Banks — Redesigned Behavior

Fog Banks are no longer static translucent boxes. They are dynamic, cloud-shaped events:

1. **Audio cue:** A low wind/hum sound begins ~2 seconds before the fog becomes visible. This warns the player that fog is approaching.
2. **Appearance:** Fog starts as a faint, wispy cloud shape (large, irregular, organic — not a rectangle). It fades in gradually over ~1.5 seconds, becoming progressively denser.
3. **Peak density:** At full density, the fog significantly obscures the area behind it — food items, baskets, platforms, and enemies are hard to see but still collectible/interactive.
4. **Duration:** The fog holds at peak density for ~3 seconds.
5. **Fade out:** The fog gradually fades away over ~1.5 seconds until it's fully gone. Items behind it are now clearly visible.
6. **Cycle:** Each fog bank triggers once as the player approaches (proximity-based, not timed). It does not repeat.
7. **Visual:** Soft grey-blue cloud shape with gentle internal animation (swirling/drifting). Multiple overlapping ellipses or a particle cloud — never a solid rectangle.
8. **Gameplay impact:** The fog doesn't damage or slow the player. It obscures food items and baskets, forcing the player to either:
   - Push through and collect blindly.
   - Wait ~6 seconds for it to clear (costs energy drain time).
   - Memorize item positions from before the fog appeared (rewards observant players).

**Why this redesign works:**
- The audio warning makes fog feel fair, not cheap.
- The gradual fade-in creates tension: "I can see it getting harder to see — do I rush in or wait?"
- Cloud shapes look natural and atmospheric vs. boxy overlays.
- The ~6-second total cycle (fade in + hold + fade out) creates a meaningful but short decision window.

---

## Energy Cell Placement

**Total Energy Cells in level:** ~35–45

| Placement Type | Count | Description |
|---|---|---|
| **Main path** | ~18 | Standard traversal reward |
| **Near baskets** | ~8 | Clustered around basket locations — rewards the player for engaging with the sorting mechanic |
| **Above/below platforms** | ~8 | Requires jump mastery. Some near ladders. |
| **Hidden** | ~6 | Behind breakable walls, in detour paths, or revealed after Fog Banks clear |

**Spacing rule:** All energy cells maintain a minimum **60px horizontal gap** from each other and from food items on the same vertical layer. No overlapping or stacking.

**Bonus Energy Cells:**
- +5 for completing level with energy meter above 75%
- +3 for each Knowledge Star found
- +5 for no enemy contact
- +3 for sorting all proteins correctly on first attempt (no wrong-basket deposits)

---

## Knowledge Star Locations

| Star | How to Earn |
|---|---|
| **Star 1** | Deposit every protein item into the correct basket — 100% sorting accuracy with zero wrong-basket attempts |
| **Star 2** | Find the hidden path behind the second Fog Bank (a short detour with extra collectibles and Energy Cells) |
| **Star 3** | Collect every single protein item in the level — 100% protein collection |

---

## Difficulty Calibration Notes

L2 is the player's second level. They know the core loop. Now we add a layer.

**Compared to L1:**
- +1 enemy type (Stress Sprites alongside Fatigue Phantoms)
- +1 hazard type (Fog Banks alongside Crash Pits)
- +1 mechanic (basket sorting with 3-slot inventory)
- Slightly longer level (~90–120 seconds)
- Slightly tighter platform spacing with ladders for vertical traversal
- More neutral/decoy items mixed in with targets
- Introduces the carry-and-deliver pattern (expanded in L4)

**Tuning targets:**
- A first-time player should complete L2 on their first or second attempt.
- Completing without perfect sorting is easy — the player just needs to collect enough proteins and reach the finish. Stars reward mastery.
- Fog Banks should feel surprising but not unfair — the audio cue and gradual fade give fair warning.
- Stress Sprites should feel sudden and intense but avoidable — the audio crackle gives just enough warning to react.
- The 3-slot inventory is deliberately small and simple to establish the pattern before L4's 6-slot version.

---

## Visual / Audio Notes

- **Environment:** A marketplace or kitchen interior. Busier and more layered than L1. Platforms look like brick shelves or wooden planks — focus on a "structure" feel to echo protein's role as building material. Ladders connect vertical sections.
- **Protein items:** Rich reds, pinks, and warm browns (meat, beans). Tofu and yogurt are white/cream. Eggs are distinctive. Plant proteins have a subtle green dot or leaf accent on their inventory icon.
- **Baskets:** Clearly distinct. Blue baskets have a small animal silhouette. Green baskets have a small leaf icon. Both glow subtly when the player is in deposit range. A small "Press E" prompt appears above the basket when in range.
- **Stress Sprites:** Small, crackling blue-white energy bolts. They streak across the screen with a lightning-trail effect. Distinct audio — a sharp electric crack on spawn, a buzz-whoosh as they pass. They appear and disappear; they don't linger.
- **Fog Banks:** Soft grey-blue cloud shapes with gentle swirling animation. Not rectangular. Low ambient hum when nearby, building before the fog appears.
- **Music:** Slightly faster tempo than L1. More percussive. Builds energy. Brief musical sting when a Stress Sprite warning fires.

---

## Updates Needed in Other Files

When this design is finalized, the following files need updating:

- **`instruction-splashes.md`** — Remove combo mechanic reference. Add basket sorting mission. Update hazard description for new Stress Sprite behavior.
- **`level-feedback.md`** — Remove combo stats/highlights. Add sorting stats (correct deposits, accuracy). Update hints for new mechanics.
- **`GAME_PLAN.md`** — Update L2 description in Section 3 (Level Progression) to reflect basket mechanic instead of combos. Update Section 9.1 to remove "complete vs. incomplete proteins" reference.
- **`L4-fibre.md`** — Verify the inventory mechanic language is consistent (L2 introduces 3-slot carry-and-deliver, L4 expands to 6-slot).
