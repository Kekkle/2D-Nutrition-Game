# NutriRun — 2D Nutrition Platformer Game Plan

## 1. Vision & Core Loop

**Elevator pitch:** A side-scrolling platformer where each level teaches one nutrition concept. Players collect foods, dodge abstract hazards, and fuel a character whose performance visibly depends on how well they eat.

**Core loop:**

1. **Instruction splash** — A single, punchy fact card before each level (the only "lecture" moment).
2. **Play** — Run, jump, duck, and collect target items while avoiding obstacles.
3. **Score & feedback** — End-of-level screen showing what was collected, a brief reinforcement of the concept, and stars/grade.
4. **Progression** — Unlock the next level (and occasionally new abilities).

---

## 2. Player Character

### 2.1 Movement & Skills

| Skill | Available from | Notes |
|---|---|---|
| **Run** (left/right) | Level 1 | Base speed; can sprint with a stamina bar |
| **Jump** | Level 1 | Variable height (tap vs. hold) |
| **Duck / Slide** | Level 1 | Dodge overhead obstacles; slide under gaps |
| **Wall-slide** | Unlockable | Slow descent on walls, opens shortcuts |
| **Glide** | Unlockable | Float down from apex of jump; costs energy |
| **Dash** | Unlockable | Short horizontal burst; costs energy |
| **Ground pound** | Unlockable | Smash breakable platforms from above |

### 2.2 Energy / Fuel Meter

This is the single most important design decision to get right. Rather than traditional "health," consider an **Energy Meter** that ties directly into the nutrition theme:

- Collecting the level's **target foods** fills the meter.
- Different foods fill the meter at different rates and for different durations (whole foods sustain longer, processed foods give a quick spike that fades faster — but neither is forbidden).
- When energy is low, the character visibly slows down, jump height decreases, and screen color desaturates — reinforcing the "low energy availability" concept.
- Reaching zero energy = level fail (not "death" — the character sits down exhausted).
- From L9 onward, a **Storage Reserve** bar appears alongside the meter. Surplus energy flows into storage; when the meter is low, reserves automatically feed back in. This teaches the body's glycogen/fat storage system through gameplay.

This naturally teaches energy balance without moralizing any specific food.

---

## 3. Level Progression & Curriculum

### Tier 1 — Macronutrients (Levels 1–4)

| Level | Concept | Collect | Level Challenge |
|---|---|---|---|
| **L1: Carbs** | What carbs are; which foods contain them | Bread, rice, pasta, fruit, oats, potatoes, vegetables | Distinguish starchy carbs from fibre-rich carbs as you collect |
| **L2: Protein** | What protein is; its role as the body's primary building material — all tissue is built from protein (muscle, skin, organs, hair, nails, enzymes, immune cells) | Chicken breast, eggs, beans, fish, tofu, lentils, meat | Collect complete protein combos (e.g., rice + beans together) for bonus energy |
| **L3: Fats** | What fats are; the spectrum from unsaturated to saturated to trans fats | Avocado, nuts, olive oil, salmon, seeds | Collect a balanced mix of fat types; variety matters more than avoiding any single type |
| **L4: Fibre** | What fibre is; how it feeds beneficial gut bacteria and supports digestion, immunity, and satiety; why getting enough daily fibre matters | Whole grains, vegetables, fruits with skin, legumes, nuts, seeds | Feed the gut microbiome — deliver fibre to "microbiome stations" that power up your character's digestion and immunity; collect diverse fibre sources for a microbiome diversity bonus |

### Tier 2 — Building Blocks (Levels 5–7)

| Level | Concept | Collect | Level Challenge |
|---|---|---|---|
| **L5: Glucose** | Carbs break down into glucose; the brain's primary fuel source | Glucose molecules (abstract collectible) | Keep the brain station fueled — glucose depletes fastest there |
| **L6: Amino Acids** | Proteins break down into amino acids — the building blocks used to construct and repair all body tissue | Amino acid molecules; complete vs. incomplete protein combos | Assemble amino acid chains to repair "tissue stations" (muscle, immune, organ) along the route |
| **L7: Lipids / Fatty Acids** | Fats break down into fatty acids & glycerol; cell membranes, hormones, and long-term energy all depend on them | Lipid droplets, omega-3 icons | Balance omega-3 and omega-6 collection for optimal energy output |

### Tier 3 — Energy Systems (Levels 8–12)

| Level | Concept | Collect | Level Challenge |
|---|---|---|---|
| **L8: Quick vs. Slow Energy** | Carbs = fast fuel, Fats = sustained fuel; different activities demand different fuel types | Timed collection: carbs for sprint sections, fats for endurance sections | Match the right fuel to the right activity — sprinting burns carbs fast, long stretches need fat stores |
| **L9: Energy Storage** | The body stores surplus energy as glycogen (short-term, in muscles and liver) and in fat tissue (long-term) for later use when food is scarce | Collect surplus food beyond what you immediately need to fill storage reserves | Manage your reserves — stored energy lets you survive scarce stretches ahead, but you must balance collecting enough now without slowing down from overfilling |
| **L10: Low Energy Availability** | What happens when you chronically undereat — the body breaks down its own tissue (muscle, fat) to produce glucose for essential functions | Survive a level where food is scarce; draw from reserves built in earlier levels | Reserves deplete visibly; when empty, tissue breakdown begins — character slows, jump weakens, screen desaturates |
| **L11: Fueling Your Systems** | Brain (~20% of energy), immune system, and digestive tract all have high, constant energy demands | Deliver energy to three "stations" (brain, immune, gut) before time runs out | Unfueled stations cause debuffs — fog obscures vision (brain), enemies move faster (immune weakened), character slows (gut) |
| **L12: The Full Picture** | Energy balance over time — sometimes you eat more than you need (storage), sometimes less (drawing from reserves); the body is constantly managing this flow | Maintain energy balance across a long, varied level with feast and famine sections | Energy meter fluctuates with intake and expenditure; storage reserves buffer the lows; the goal is to keep all systems running across the entire level |

### Tier 4 — Real-World Application (Levels 13–15)

| Level | Concept | Collect | Level Challenge |
|---|---|---|---|
| **L13: Food Quality Spectrum** | Not all sources of a macronutrient fuel the body equally — whole foods sustain energy longer while heavily processed options provide shorter bursts; neither is "bad," but understanding the difference matters | Choose paths with different food-quality mixes; whole-food paths sustain energy longer, processed paths give quick boosts that fade | Energy duration varies by food quality; plan your route based on what's ahead — sometimes a quick boost is exactly what you need |
| **L14: Balanced Plates** | Putting it all together — a meal with carbs, protein, fat, and fibre fuels every system optimally | Collect a balanced meal (carb + protein + fat + fibre) to unlock each checkpoint | Unbalanced combos leave you underpowered for the next section; the game rewards variety, not restriction |
| **L15: Boss Level** | Final test of all concepts | Mixed collection under pressure; all prior hazards combined | Everything from previous levels — manage fuel types, storage, system stations, and balance across one long gauntlet |

> **Design note:** 15 levels is ambitious but achievable in tiers. You can always trim to 12 by consolidating Tier 3, or expand with bonus tiers (micronutrients, hydration, meal timing) later. Build and playtest Tier 1 first.

---

## 4. Obstacles & Enemies

Enemies are **abstract physiological threats** — not food items. No food is the villain here. The obstacles represent things that happen *inside the body* when it isn't fueled well, or external stressors that drain energy. This avoids moralizing any food while still giving the player meaningful things to dodge and overcome.

### 4.1 Enemies (Active Threats)

| Enemy | Behavior | Thematic Tie |
|---|---|---|
| **Fatigue Phantom** | Drifts toward the player and drains energy on contact; moves faster when your energy meter is low | Exhaustion — the feeling of running on empty |
| **Stress Sprite** | Appears in clusters with erratic, hard-to-predict movement | Cortisol / stress response that disrupts the body's ability to use fuel efficiently |
| **Free Radical** | Bounces chaotically off walls and platforms; splits into two smaller radicals when jumped on | Oxidative stress and cellular wear |
| **Entropy Blob** | Stationary at first, slowly expands to block pathways; must be outrun or circumvented | Disorder and breakdown in body systems when they lack energy |
| **Sedentary Slime** | Doesn't chase you, but grows over time to cover platforms; stepping in it sticks the player briefly | Sluggishness and inactivity |
| **Brain Fog Wisp** | Floats near the top of the screen and periodically drops "fog patches" that obscure your view | Cognitive decline from insufficient fueling |

### 4.2 Environmental Hazards

| Hazard | Effect | Thematic Tie |
|---|---|---|
| **Soda Geysers** | Launch player uncontrollably upward | Sugar rush / loss of control |
| **Crash Pits** | Quicksand-like zones that slow movement | Energy crash after sugar spike |
| **Fog Banks** | Obscure vision of upcoming platforms | Brain fog from low energy |
| **Inflammation Zones** | Pulsing red areas that damage over time | Chronic inflammation from poor diet |
| **Misleading Labels** | Items that look healthy but aren't (granola bars, "fruit" juice) | Food marketing literacy |

---

## 5. Collectibles & Economy

### 5.1 Primary Collectibles

| Item | Purpose |
|---|---|
| **Target Foods** (level-specific) | Primary objective; fill the collection bar to complete the level |
| **Knowledge Stars** (3 per level) | Hidden in hard-to-reach places; reward exploration and mastery |
| **Power-up Capsules** | Grant temporary abilities (see Section 2.1 unlockables) |

### 5.2 Currency: Energy Cells

The game's currency is **Energy Cells** — small glowing orbs scattered throughout levels that represent the fundamental unit of biological energy (a nod to ATP, the molecule cells actually use for energy). This keeps the economy thematically grounded in nutrition science without turning any specific food into a "coin."

**How you earn Energy Cells:**
- Scattered throughout levels like traditional platformer coins
- Bonus cells for efficiently collecting the level's target foods
- Bonus cells for completing levels with a high energy meter
- Bonus cells for discovering Knowledge Stars
- Bonus cells for clearing a level without taking enemy damage

**How you spend Energy Cells:**
- **Ability shop** — Unlock glide, dash, wall-slide, ground pound
- **Cosmetic skins** — Character outfits, trail effects, energy meter visual themes
- **Hint tokens** — Reveal the location of one Knowledge Star (accessibility option)
- **Reserve tank upgrades** — Increase your energy meter capacity and storage reserves (becomes relevant from L9 onward)

> **Design note:** Energy Cells are *separate* from the Energy Meter. The meter is your in-level health/fuel (filled by food). Energy Cells are your persistent currency (spent between levels). This distinction keeps the economy clean — food fuels you in the moment, Energy Cells represent long-term progress.

---

## 6. Instruction Splash Design

Since this is the sole teaching moment, it needs to hit hard in under 10 seconds of reading:

```
┌──────────────────────────────────────────┐
│  LEVEL 1: CARBOHYDRATES                  │
│                                          │
│  [Icon: bread, rice, fruit]              │
│                                          │
│  "Carbs are your body's preferred        │
│   quick-energy fuel. They're found in    │
│   grains, fruits, and starchy veggies."  │
│                                          │
│  YOUR MISSION: Collect all the carbs!    │
│  WATCH OUT: Fatigue Phantoms drain        │
│  your energy if they catch you!           │
│                                          │
│         [ TAP TO START ]                 │
└──────────────────────────────────────────┘
```

**Guidelines:**
- Max 2–3 sentences of fact.
- Always state the mission clearly.
- Always preview the hazard/enemy for that level.
- Use large, friendly icons — not walls of text.
- Consider optional voice-over narration for accessibility and younger players.

---

## 7. Technical Considerations

### 7.1 Engine & Framework Options

| Option | Pros | Cons | Recommendation |
|---|---|---|---|
| **Godot 4** (GDScript) | Free, open-source, excellent 2D, lightweight | Smaller community than Unity | Best choice for a 2D indie project |
| **Unity** (C#) | Massive ecosystem, great docs | Heavier than needed for 2D; licensing concerns | Solid if you already know C# |
| **Phaser.js** | Runs in browser, JS-based, easy to share | Performance limits, no native mobile build | Great if you want a web-playable prototype |
| **Pygame** | Python-based, simple | Limited tooling, no built-in editor | Good for learning, not for shipping |

### 7.2 Art Style

- **Pixel art** (16-bit or 32-bit style) is the most achievable solo or small-team style and fits the Mario-like aesthetic.
- Food items should be **instantly recognizable** — stylized but not abstract.
- Character should show visible state changes (energized vs. exhausted) through animation and color.

### 7.3 Audio

- Upbeat chiptune soundtrack per level.
- Distinct SFX for: correct collect, wrong collect, enemy hit, energy crash, power-up.
- Consider a subtle heartbeat or stomach-growl SFX when energy is critically low.

### 7.4 Target Platforms

Decide early — this affects engine choice:
- **Web (browser)** — Lowest friction for players; great for educational contexts (schools).
- **Desktop (Windows/Mac/Linux)** — Easy with Godot or Unity.
- **Mobile (iOS/Android)** — Requires touch controls; adds scope significantly.

---

## 8. Things You May Not Have Considered

### 8.1 Nutrition Accuracy & Nuance

These points need careful research or expert review:

- **No food villains.** The game deliberately avoids labeling any food as "bad." Enemies are abstract physiological threats (fatigue, stress, free radicals), not food items. Processed foods aren't forbidden — they just sustain energy for a shorter duration. This is nutritionally accurate and avoids harm.
- **Protein's dual role.** L2 now emphasizes protein as the body's structural building material (all tissue), while L10 covers how the body *can* break down protein for energy via gluconeogenesis when carbs/fats are depleted. Make sure splash text acknowledges both roles without oversimplifying either.
- **Complete vs. incomplete proteins.** The combo mechanic in L2 (rice + beans = complete amino acid profile) is a great gameplay hook. Research which plant protein pairings are nutritionally complementary.
- **Fibre sufficiency.** Most people don't eat enough fibre. L4 should include a specific daily target range in its splash (e.g., 25–38g/day for adults) and emphasize that fibre comes from whole plant foods, not supplements.
- **Energy storage is neutral.** Fat storage is a survival mechanism, not a failure state. L9's splash should frame storage as the body being smart and prepared — "your body saves energy for when you need it later" — not as something to avoid.
- **Individual variation.** Energy needs vary by age, sex, activity level, body composition. A brief nod to this ("everyone's needs are different") avoids one-size-fits-all messaging.
- **Eating disorders.** A game about food and energy can inadvertently trigger or reinforce disordered eating patterns. Consider:
  - Never framing the character's body changing shape as punishment.
  - Having the failure state be "low energy" (tired), not anything body-shame adjacent.
  - Framing all foods as fuel on a spectrum of duration/efficiency, not good vs. bad.
  - Consulting with an RD (Registered Dietitian) or eating disorder specialist during content review.

### 8.2 Game Design Gaps

- **Difficulty curve.** How does difficulty scale? Consider: more enemies, faster scrolling, tighter timers, more decoy items, and platforming complexity — not just more "wrong" answers.
- **Replayability.** Stars, time trials, and leaderboards give reasons to replay. Consider randomized item placement on replay so memorization doesn't replace learning.
- **Accessibility.** Colorblind modes (don't rely solely on red = bad, green = good), remappable controls, adjustable game speed.
- **Tutorial level.** Before L1, consider a brief "Level 0" that teaches controls with no nutrition content — just run, jump, duck, collect a generic coin. Don't overload the player with mechanics *and* content simultaneously.
- **Save system.** Even a simple level-unlock save prevents frustration.
- **Pause & quit.** Sounds obvious but is often forgotten in early design docs.

### 8.3 Scope Management

- **MVP (Minimum Viable Product):** Levels 1–4 (Tier 1: all macronutrients + fibre), basic movement (run/jump/duck), one enemy type, one hazard type, energy meter, Energy Cells, instruction splashes. This alone is a complete, shippable game.
- **V2:** Levels 5–7 (Tier 2: building blocks), unlockable abilities, Energy Cell shop.
- **V3:** Levels 8–15 (Tiers 3–4: energy systems + real-world application), storage reserve system, all enemies/hazards, polish, audio, leaderboards.

Do NOT try to build all 15 levels before testing Tier 1 with real players. Playtest early.

---

## 9. Research Checklist

Areas that need verified, source-backed information before writing instruction splashes:

- [ ] Which specific foods are highest in each macronutrient (use USDA FoodData Central as source)
- [ ] Glucose metabolism pathway (simplified for splash text accuracy)
- [ ] Essential vs. non-essential amino acids (for L6 combo mechanic)
- [ ] Complementary plant protein pairings (rice + beans, etc.) for L2 and L6
- [ ] Omega-3 vs. Omega-6 vs. trans fat distinctions
- [ ] Glycemic index basics (quick vs. slow energy from different carb sources)
- [ ] Gluconeogenesis — when and why the body breaks down protein/fat for glucose (L10)
- [ ] Thermic effect of food (protein costs more energy to digest — potential game mechanic?)
- [ ] Brain's glucose consumption (~20% of daily energy despite being ~2% of body weight) for L5 and L11
- [ ] Gut microbiome basics — which bacteria benefit from which fibre types; diversity vs. quantity (L4)
- [ ] Daily fibre recommendations by age/sex (for L4 splash accuracy)
- [ ] Glycogen storage capacity in muscles and liver; how fat storage works (for L9)
- [ ] Energy balance and expenditure — basal metabolic rate, activity, thermic effect (for L12)
- [ ] NOVA food classification system — for nuanced treatment of processing spectrum in L13
- [ ] Protein's structural roles — tissue types built from protein (muscle, skin, organs, enzymes, antibodies, keratin) for L2 and L6
- [ ] Consult or cite a Registered Dietitian for content review

---

## 10. Development Milestones

| Milestone | Deliverable | Target |
|---|---|---|
| **M0: Prototype** | Character movement + one scrolling level + placeholder art | Week 2–3 |
| **M1: Core Loop** | L1 playable with energy meter, Energy Cells, one enemy type, instruction splash | Week 5–6 |
| **M2: Tier 1** | L1–L4 complete with unique art, enemies, and splashes | Week 10–13 |
| **M3: Playtest** | Get 5–10 people to play L1–L4; collect feedback | Week 13–14 |
| **M4: Iterate** | Revise based on feedback; add Energy Cell shop and unlockables | Week 15–17 |
| **M5: Tier 2** | L5–L7 complete | Week 21–24 |
| **M6: Tier 3** | L8–L12 complete (energy storage/reserve system introduced here) | Week 28–33 |
| **M7: Tier 4 & Polish** | L13–L15, audio, menus, save system, final polish | Week 36–42 |

> Timelines assume solo developer working part-time (~10–15 hrs/week). Adjust accordingly.

---

## 11. Open Questions to Resolve

1. **Target audience age range?** This heavily affects art style, reading level of splashes, difficulty, and how nuanced the nutrition info should be.
2. **Monetization model?** Free (educational grant/portfolio piece), paid ($2–5 indie game), or freemium (cosmetics)?
3. **Single character or character selection?** Multiple characters could represent different dietary needs (athlete, student, etc.).
4. **Story wrapper?** Is there a narrative reason the character is collecting food, or is it purely mechanical? A light story (e.g., "Chef training," "Fueling up for a big race") adds motivation.
5. **Multiplayer or solo only?** Co-op or competitive modes add scope but also engagement.
6. **What engine/language are you most comfortable with?** This should drive the tech choice, not the other way around.

---

## 12. Summary of Recommendations

1. **Start with the energy meter + storage reserve** — these two mechanics are what make this a nutrition game rather than a reskinned Mario. The meter is your moment-to-moment fuel; the reserve is your body's long-term savings. Prototype both early.
2. **Keep instruction splashes ruthlessly short** — if a player skips it, the gameplay itself should still teach the concept through mechanics (correct collection = sustained energy, poor collection = fading performance).
3. **No food villains** — enemies are abstract threats (fatigue, stress, entropy), not food items. All food fuels you; the difference is duration and efficiency, not morality. This is both nutritionally accurate and avoids harm.
4. **Build Tier 1 (4 levels), then playtest** — scope is the #1 killer of indie games. Ship small, iterate.
5. **Get a nutrition expert to review** — even a single pass from an RD will catch inaccuracies and protect you from criticism. Especially important for fibre recommendations, energy storage framing, and protein's structural role.
6. **Choose Godot 4 or Phaser.js** — both are free, excellent for 2D, and well-documented. Pick based on whether you want a native app (Godot) or browser game (Phaser).
