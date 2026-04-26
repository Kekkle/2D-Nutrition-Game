# Building NutriRun: A 2D Platformer That Teaches Nutrition Through Play

I've been working on a 2D side-scrolling platformer called ... well I don't have a name yet. But it's a game that teaches nutrition concepts through the gameplay itself, no lectures. Here's a look at the process so far: 

---

## The Idea

The concept is simple: I wanted to take the classic Mario-style platformer — run, jump, collect things, avoid hazards — and create a simple nutrition themed game. Each level focuses on a single concept, for example, Level 1 is "Collect all the Carbs." Level 2 is Protein. And so forth. The player learns through *doing*, not reading. I have a full "curriculum" planned out, which at the moment goes up to level 15, but it could be more than that. 

Each level opens with a short instruction splash — one simple, punchy fact card. That's the only "lecture" moment in the entire game. After that, everything is communicated through mechanics. Eg., When you don't collect carbs, your energy drops. When you eat, it goes back up. The experience teaches the principle.

The long-term vision goes deeper: later levels introduce glucose, amino acids, energy balance, ultra-processed foods, and even how the body stores and uses reserves. But for now, the focus is on getting the first four levels — the demo set — right.

---

## The Process: A Publishing Approach

I took what I'd call a **publishing approach** to this project rather than diving straight into code. The workflow looked roughly like this:

1. **Write the concept.** I documented the full game idea — mechanics, learning goals, level progression — before anything was built.
2. **Set up the AI agent.** I created an AGENTS.md file to give the coding agent the project context it needed.
3. **Develop the game plan.** The agent helped flesh out the rules of play: points, challenges, energy mechanics, level structure, enemies, and progression.
4. **Create the content.** All the instructional text, level specs, and food item catalogs were written, researched, and reviewed before visual development started.
5. **Build the visuals.** Only after the content was pretty set did we move to the visual style and actual game screens.

This editorial-first workflow forced clarity early. Before a single pixel was placed, the nutrition science was reviewed, the food lists were complete, and every level had a design spec.

---

## Finding the Art Style

This turned into one of the more interesting parts of the process. I had the agent generate sample level screens in several styles:

- **16-bit pixel art** (SNES-era look)
- **32-bit** (more detailed sprites)
- **8-bit** (NES-era, very blocky)
- **Modern / vector** (clean, flat design)

I went with **16-bit** early on (also based on feedback from my kids). The agent then generated sample screens for each of the first four levels, each with its own color palette — a warm garden feel for Carbs, yellows for Fats, greens for Fibre, blue hues for Protein. The general tone felt right.

But getting the visual *details* right was another story.

---

## The Background Saga (Or: The Limits of CSS Art)

The Carbs level background wasn't working. The hills looked ugly. The clouds were flat. There was no depth. So I tried to direct the agent with written instructions, and it produced something *significantly worse*. Reverted. I gave it two reference photos. The output was again terrible. Reverted.

I thought maybe I needed to design the backgrounds myself, so I mocked some things up in Canva. I gave the agent another shot, this time going piece by piece — first the clouds and hills, then the foreground. I asked for more slope-like hills. Still terrible.

I asked the agent directly: *Do I need to create the visuals myself?*

Its response was enlightening:

> *"The core problem is that CSS border-radius and stacked divs are very limited for creating natural-looking shapes like hills and clouds. I'm essentially sculpting with rectangles and circles, which is why the results keep looking off."*

It suggested SVG paths as an alternative. We tried that. Also ugly. Eventually I handed it a PNG I'd made, but something still wasn't clicking — the style had gradually drifted from the original pixel art direction into something more "polished" that didn't quite work.

In the end, I decided to just stick to the strange hills the agent had envisioned and focus instead on the game mechanics. Maybe the design details can come later? I'm not sure if this is the right approach, but I felt like I was getting stuck on the details and needed to step back and focus on the whole for a bit. 

---

## Playtesting with Real Kids

My kids played through the first level, and one of my daughter's friends tried it too. It took her a little while to get through — which felt like the right level of challenge for Level 1.

But the most interesting moment came when my daughter was playing and I noticed she was avoiding the fries.

"Get the fries," I said.

"Oh, I thought they'd be bad."

I smiled because that was exactly what I'm trying to *not* reinforce with this game.

---

## The Food Neutrality Principle

This is an important design/concept decision I made for this game: **no food is the villain.** Potato chips, cookies, fries — they all appear as collectibles alongside fruits and vegetables. There's no "good food" vs "bad food" language anywhere in the game.

That said, the *mechanics* still teach the difference. In later levels dealing with ultra-processed foods, collecting a UPF will boost your energy bar — but energy will deplete faster afterward. On the other hand, collecting whole foods will provide steadier, longer-lasting energy. The player discovers this through experience, not through being told.

The collectible distribution also reinforces this: 80% of food items are whole foods, 20% are "less-healthy" options. This mirrors the real-world "80/20" concept — if most of what you eat is nourishing, there's room for the other stuff (in moderation).

This principle even shaped the enemies. The AI initially suggested using certain food types as enemies (e.g., an evil sugar sprite), which directly contradicted the no-villain-foods rule. We changed enemies to abstract physiological threats instead: things like Brain Fog Geist and Fatigue Phantom. The hazards are things that *happen to you*, not foods that are "bad."

---

## Food Items and Visual Iteration

Once the art style was locked, we built out the full catalog of food item sprites. This involved a lot of back-and-forth:

- **Removed bold outlines** on the food icons — they looked better without.
- **Adjusted specific items** that didn't read well at small sizes (chicken, banana, and peanut all needed rework).
- **Reorganized the food categories.** The agent had separated fibre foods from carb foods since Fibre is its own level, but it needed to be clear that fibre falls *under* carbs nutritionally.
- **Introduced rarity items** — complete meals like pizza, tacos, sushi, and hamburgers that appear as rare collectibles. I'm thinking more meals will appear as rarity items as we go along. Stuff like Fejoada, Lomosaltado, butter chicken curry, and other dishes. 
- **Removed permanent food labels** from the icons. Now the food name appears briefly when collected, which is cleaner and also serves as a learning moment.
- **Added a green icon** on fibre-containing carbs so players can start recognizing which carbs also carry fibre.
- **Different sound effects** for different food types, adding another layer of sensory feedback.

Overall, I'm still not fully happy with how the collectibles look — everything is a bit too simplistic and unclear at this stage. But the game is *functioning* well, the sound effects feel right, and the core loop works. Good enough to move forward.

---

## Working with an AI Agent: What I've Learned

A few reflections on the process of building a game collaboratively with an AI coding agent:

**Clarity is everything.** If this process teaches you nothing else, it shows you exactly where your gaps in explaining things lie. Every time the agent produced something I didn't want, it was usually because I hadn't been specific enough. You learn to communicate with precision — which is a useful skill far beyond game dev.

**Version control is crucial.** When the agent creates a new version of a file, it saves over the old one. Unless you're using Git or asking it to create separate files, the previous version is gone. Coming from an editorial background where you can always look back or revert, this was frustrating. I started taking screenshots just to have some documentation of older versions. If you're working this way, set up version control early.

**Go piece by piece.** Big sweeping instructions ("make the background look like a real landscape") tend to produce chaotic results. Small, incremental requests ("make the hills more sloped, leave the clouds alone") work much better.

**Reference images help, but aren't magic.** I tried giving the agent photos for inspiration. Results were mixed. The agent works best when changes are described structurally rather than aesthetically.

**Your kids are your best playtesters.** They'll tell you what's actually fun, what's confusing, and what assumptions you've baked in without realizing it.

---

## What's Next

The first level (Carbs) is nearly complete. A few more adjustments and I'll move on to Protein, Fats, and Fibre. There are also some new mechanics in the pipeline:

- **Energy ball attack** — the player can throw energy balls at enemies using mouse aim, adding a ranged combat option alongside stomping.
- **Enemy stomping** — jumping on enemies bounces you upward and damages them without costing energy, rewarding skilled platforming.
- **Treasure chests** — rare chests that appear every 2-3 levels, containing special "rarity" food items (complete meals) with unique effects yet to be decided.
- **Music** — attempted, but the looping chiptune was more annoying than atmospheric. Still working on that one.

The game still has a long way to go, but the foundation is there: a platformer that respects its audience, treats all food with neutrality, and trusts the player to learn through experience. More updates to come.
