# Level 4: Fibre — Design Spec

**Tier:** 1 (Macronutrients)
**Position:** Fourth and final level of Tier 1
**Difficulty:** Moderate-to-hard — the most complex Tier 1 level with microbiome stations and a diversity mechanic
**Core concept:** Fibre feeds beneficial gut bacteria, supporting digestion, immunity, and overall health
**Level challenge:** Deliver diverse fibre to microbiome stations; different sources power up different stations

---

## Food Item Catalog

### Target Items (Fibre-Rich Foods)

Items are tagged by fibre type (soluble, insoluble, or both) and by "fibre family" for the diversity mechanic.

| Item | Fibre Type | Fibre Family | Energy Meter Fill | Approx. Fibre Represented |
|---|---|---|---|---|
| Oats / porridge bowl | Soluble | Grains | Standard | ~4 g |
| Whole wheat bread slice | Insoluble | Grains | Standard | ~2 g |
| Brown rice bowl | Insoluble | Grains | Standard | ~3.5 g |
| Black beans | Both | Legumes | Standard | ~7.5 g |
| Lentils | Both | Legumes | Standard | ~8 g |
| Chickpeas | Both | Legumes | Standard | ~6 g |
| Raspberries | Insoluble | Fruits | Standard | ~8 g |
| Apple (with skin) | Both | Fruits | Standard | ~4.5 g |
| Pear (with skin) | Both | Fruits | Standard | ~5.5 g |
| Broccoli | Insoluble | Vegetables | Standard | ~5 g |
| Sweet potato (with skin) | Both | Vegetables | Standard | ~4 g |
| Carrots | Insoluble | Vegetables | Standard | ~3.5 g |
| Chia seeds | Soluble | Seeds/Nuts | Standard | ~5 g |
| Almonds | Insoluble | Seeds/Nuts | Standard | ~3.5 g |
| Avocado half | Both | Fruits | Standard | ~5 g |
| Flaxseed | Both | Seeds/Nuts | Standard | ~3 g |

### Fibre Families (5 total)

1. **Grains** — oats, whole wheat bread, brown rice, popcorn
2. **Legumes** — black beans, lentils, chickpeas
3. **Fruits** — raspberries, apple, pear, avocado
4. **Vegetables** — broccoli, sweet potato, carrots
5. **Seeds/Nuts** — chia seeds, almonds, flaxseed

### Neutral Items

| Item | Why It's Here |
|---|---|
| White bread | Carb but very low fibre — player learns the difference from L1's fibre-rich distinction |
| Egg | Protein callback — zero fibre |
| Cheese wedge | Fat callback — zero fibre |
| Chicken drumstick | Protein callback — zero fibre |
| Butter pat | Fat callback — zero fibre |

> **Design intent:** The neutral items are all animal products or refined grains — fibre comes exclusively from plants. The player may start noticing this pattern. It's taught through observation, not through text.

---

## Microbiome Station Mechanic — Detailed Design

### The Stations

There are **3 microbiome stations** placed at roughly the 25%, 50%, and 75% marks of the level. Each station is a visual representation of a bacterial colony in the gut.

| Station | Location | Function When Powered |
|---|---|---|
| **Digestion Station** | ~25% mark | Boosts energy meter fill rate by 25% for the rest of the level |
| **Immunity Station** | ~50% mark | Reduces enemy damage by 50% for the rest of the level |
| **Gut-Brain Station** | ~75% mark | Clears all Fog Banks for the rest of the level and increases character brightness/vibrancy |

### How Stations Work

1. The player approaches a station. A UI prompt appears showing 3 empty "feed slots."
2. The player deposits fibre items from their collected inventory into the station. Each item fills one slot.
3. **Diversity scoring:**
   - All 3 items from **different fibre families** = Full power-up (100% of the station's benefit)
   - 2 different families = Partial power-up (60% of benefit)
   - All 3 from the same family = Minimal power-up (30% of benefit)
4. The station visually transforms:
   - Full power: Lush, vibrant, glowing with colored bacterial colonies.
   - Partial: Some growth, moderate glow.
   - Minimal: Sparse, dim.
5. After feeding a station, those 3 items are "spent" — they still count toward the collection bar but are removed from the player's carryable inventory.

### Inventory System (L4 Only)

L4 introduces a lightweight inventory:
- The player can carry up to **6 fibre items** at a time (plus unlimited non-fibre items which are auto-consumed).
- Items are auto-collected into the inventory as the player touches them.
- A small inventory bar (6 slots) appears at the top of the screen showing icons of carried fibre items.
- At each station, the player selects 3 items to deposit (or auto-deposits the best diversity combo if auto-mode is enabled).
- Items collected beyond 6 are auto-consumed for energy meter fill but can't be deposited at stations.

> **Design intent:** This adds light resource management without overwhelming the player. The inventory is small (6 slots), the decision is simple (which 3 to deposit), and the auto-mode option means players who don't want to engage with the strategy can still progress.

---

## Enemy Roster

L4 is the Tier 1 finale. All previously introduced enemies may appear, plus the new one.

| Enemy | Count | Placement |
|---|---|---|
| **Fatigue Phantom** | 2–3 | Familiar, scattered. Slightly faster than L1. |
| **Stress Sprite** | 3–4 | In clusters near the mid-level. Familiar from L2. |
| **Free Radical** | 2–3 | Placed near stations to create tension during station-feeding. |
| **Entropy Blob** | 3–5 | New in L4. Primary threat. Placed between stations. |

**Entropy Blob behavior in this level:**
- Starts as a small dark-purple mass on a platform or pathway.
- Expands over time (~1 platform-width every 4 seconds) until it blocks the entire path.
- The player must outrun or route around expanding blobs. Touching one doesn't drain energy but sticks the player for ~1.5 seconds (similar to Sedentary Slime, but blobs are growing threats).
- Blobs stop expanding if the player is far enough ahead — they don't chase, they pressure.
- Between the second and third microbiome stations, 2–3 blobs appear in sequence, creating a "race" section where the player must move quickly and collect fibre on the fly.

**Strategic interaction with stations:** 
- The brief pause at a microbiome station (selecting items to deposit) gives nearby Entropy Blobs time to expand. The player must balance speed of station interaction with awareness of approaching threats.

---

## Hazard Placement

| Hazard | Count | Placement |
|---|---|---|
| **Crash Pits** | 2 | Early level (familiar) |
| **Fog Banks** | 2–3 | Mid-level. Obscure fibre items, forcing the player to explore inside the fog to find diverse types. |
| **Inflammation Zones** | 1–2 | Late level, near the Gut-Brain Station. Running through one to reach the station is a meaningful risk/reward decision. |

---

## Energy Cell Placement

**Total Energy Cells in level:** ~45–55

| Placement Type | Count | Description |
|---|---|---|
| **Main path** | ~18 | Standard traversal |
| **Near diverse fibre families** | ~12 | Clustered near less-common fibre items (seeds, specific vegetables) to reward exploration |
| **Near/behind stations** | ~8 | Reward for engaging fully with stations — bonus cells visible after station is powered |
| **Risk/reward (near Entropy Blobs, Inflammation Zones)** | ~6 | Requires timing and courage |
| **Hidden** | ~6 | In detour paths, behind breakable walls, on high platforms |

**Bonus Energy Cells:**
- +5 for completing level with energy meter above 75%
- +3 for each Knowledge Star found
- +5 for no enemy contact
- +8 for powering all 3 microbiome stations to full (all 3 deposits fully diverse)

---

## Knowledge Star Locations

| Star | How to Earn |
|---|---|
| **Star 1** | Power all 3 microbiome stations to full capacity (each station fed with 3 different fibre families) |
| **Star 2** | Collect fibre items from all 5 fibre families during the level (grains, legumes, fruits, vegetables, seeds/nuts) |
| **Star 3** | Complete the level in under 100 seconds (speed challenge — requires efficient routing and fast station interactions) |

---

## Difficulty Calibration Notes

L4 is the Tier 1 capstone. The player should feel tested but not crushed.

**Compared to L3:**
- New mechanic: Microbiome stations with inventory and diversity scoring.
- New enemy: Entropy Blobs (expanding, path-blocking).
- All 4 Tier 1 enemy types present (Phantoms, Sprites, Free Radicals, Entropy Blobs).
- More hazard variety than any previous level.
- Longest level in Tier 1 (~120–150 seconds).
- More collectible items, more diversity to track.

**Tuning targets:**
- A first-time player should complete L4 within 2–4 attempts.
- Completing the level without fully powering stations is possible — the collection bar fills from collecting fibre regardless. Stations are a bonus mechanic.
- The auto-deposit mode for stations ensures players who find the inventory stressful can still progress.
- Entropy Blobs should feel urgent but not unfair — the player always has enough time to pass if they keep moving. They only become a real problem for players who dawdle.
- Getting all 3 stars requires mastery of both the diversity mechanic and platforming speed — this is the Tier 1 challenge ceiling.

---

## Visual / Audio Notes

- **Environment:** A lush garden or forest floor aesthetic. Rich greens, earth tones, dappled light. The environment should feel alive and vibrant — reflecting the microbiome theme.
- **Fibre items:** Earthy, natural colors. Lots of greens, browns, warm oranges (sweet potato, carrots). Berries are vivid red/purple. Seeds are small and detailed.
- **Microbiome stations:** Organic, rounded shapes — like stylized gut villi or petri dishes. Unpowered stations are grey and inert. As they power up, they bloom with colorful bacterial colonies (bright blues, greens, purples, yellows) — a visual reward.
- **Entropy Blobs:** Dark purple/black amorphous masses. They pulse as they expand. A low, ominous hum grows louder as they grow larger.
- **Inventory bar:** Clean, minimal. 6 small square slots at the top of the screen. Items appear as tiny pixel-art icons. When all 6 slots are full, a subtle "full" indicator pulses.
- **Music:** The most dynamic track in Tier 1. Builds in complexity as the player progresses — starts organic and sparse, adds layers (percussion, melodic elements) as microbiome stations are powered. Powered stations literally add instruments to the music mix (a satisfying audio reward).

---

## Tier 1 Conclusion

After completing L4, the player has:
- Learned what all three macronutrient categories are and which foods contain them.
- Experienced four distinct level mechanics (starchy/fibre distinction, protein combos, fat variety, microbiome stations).
- Encountered all four Tier 1 enemy types and three hazard types.
- Built a foundation of food knowledge that Tier 2 will deepen (glucose, amino acids, lipids).

A brief **Tier Complete** screen could appear after L4:

> "You've mastered the macronutrients! Carbs fuel you fast. Protein builds every tissue. Fats keep you going long. Fibre feeds your gut. Next up: what happens when your body breaks these down..."
