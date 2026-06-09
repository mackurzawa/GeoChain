# GeoChain – Project Recap

## What is it?

A daily word-chain game based on **Polish country names**. The rules:
- Each day two letters are revealed: a **start letter** and an **end letter**
- The player chains country names one by one
- Each country must begin with the **last letter of the previous country**
- The first country must start with the **start letter**
- The game ends (win) when a country ends with the **end letter**
- **Score = number of countries used** (lower is better)

Data source: 194 countries in Polish (`countries_pl.csv`), tab-separated, sourced from a Wikipedia table.

---

## Graph model

The game was modelled as a **directed multigraph**:
- **Nodes** = letters (26 nodes)
- **Edges** = countries (194 edges), directed from `first_letter → last_letter`

### Key findings from graph analysis

**Dead-end letters** (last letters with no country starting there — chain dies):
- `Y` — 11 countries end with Y (Bahamy, Chiny, Czechy, Filipiny, Niemcy, Węgry, Włochy…)
- `Ś` — 1 country (Białoruś)

**Orphan letters** (first letters no country ends with — can only be used as openers):
- B, C, F, H, P, V, W, Ł (53 countries total)

**Trap countries** (12 total): countries that end with a dead-end letter — playing them immediately ends the chain.

**Bottleneck letters** (only one country starts there):
- `O` → only Oman
- `V` → only Vanuatu
- `Ł` → only Łotwa

**Strongly connected components (SCCs):**
- Main SCC has **14 letters**: A, E, G, I, J, K, L, M, N, O, R, S, T, U
- 128 countries fall fully inside this SCC (both first and last letter are in the SCC)
- Letters outside the SCC: B, C, D, F, H, P, V, W, Y, Z, Ł, Ś — these are "entry points" (orphans) or dead ends

**No Eulerian path exists** — the graph is far too imbalanced (letter `A` has in-degree 102 vs out-degree 12) to chain all 194 countries without repetition.

**Degree highlights:**
- Most countries start with: S (22), B (17), M (17), K (16)
- Most countries end with: A (102!), N (20), Y (11), I (10)
- `A` is the dominant sink — almost every chain collapses into letter A

### Letter-to-letter distance matrix

A full 26×26 all-pairs shortest path matrix was computed (BFS on the letter graph). Each cell `[X][Y]` = minimum number of countries needed to travel from state "last letter is X" to state "last letter is Y". This is the key tool for:
- Planning moves ahead
- Generating valid paths of a target length
- Building a "bridge" (short 2–3 country connector) between any two letters

### Path generation algorithm

**find_bridge(from_letter, to_letter, max_hops=3)**: BFS over `(current_letter, path_so_far)` — finds the shortest sequence of countries (length 2 or 3) that bridges from one letter to another. Guarantees shortest-first.

**generate_path(target_length)**: DFS with two heuristics:
1. **Warnsdorff ordering** — at each step, prefer moves to letters with fewest remaining exits (visit constrained letters first)
2. **Look-ahead pruning** — abort a branch early if the number of reachable unused countries drops below the remaining target

The heuristic found chains of ~20+ countries in reasonable time. Finding the true longest chain is NP-hard (Hamiltonian path problem).

---

## Web app (current state)

### Architecture

```
docs/           ← frontend (served by GitHub Pages)
│  index.html
│  style.css
│  game.js      ← all game logic + 194 countries inlined as JSON
│  countries.json
│
backend/        ← Python FastAPI (deployed on Render free tier)
   main.py      ← 3 endpoints: /challenge, /countries, /validate
   requirements.txt
   countries.json
```

**Frontend is fully self-contained** — no backend calls needed. Country data is inlined directly in `game.js`. The frontend works as a pure static site.

### Daily challenge generation

Deterministic date-based formula (same in Python and JS, no server needed):
```
date_int = int("YYYY-MM-DD".replace("-", ""))   # e.g. 20260607
start = SCC_LETTERS[date_int % 14]
end   = SCC_LETTERS[(date_int * 31 + 7) % 14]
# only letters from the main SCC are used → puzzle always solvable
```
SCC_LETTERS = ["A", "E", "G", "I", "J", "K", "L", "M", "N", "O", "R", "S", "T", "U"]

### Hosting (free)

- **Frontend**: GitHub Pages, served from `/docs` folder of `main` branch → free, always on, no cold starts
- **Backend**: Render free tier → ~30 s cold start after inactivity, otherwise fine for prototype

### Game flow

1. Page loads → compute today's start/end letters client-side
2. Display: "Start: G → Cel: U"
3. User types country names → validated against inlined list
4. Chain is displayed after each valid entry
5. Win when a country ends with the end letter → show score

---

## Things not yet built (potential ideas to discuss)

### Game mechanics
- **Hint system** — show which letter the user needs to reach and suggest a 2–3 country bridge using the distance matrix
- **Hard mode** — the start/end letters come from outside the main SCC (requires using trap/orphan countries strategically)
- **Time limit** — add a countdown timer, score penalises time taken
- **Multiplayer** — two players alternate naming countries, loser is whoever can't continue
- **Daily streak** — track how many days in a row the user completed the puzzle

### Scoring / balancing
- **Weighted score** — penalise using "easy" high-degree letters (A), reward using rare letters (O, V, Ł)
- **Par system** — each daily puzzle has a "par" (optimal path length from the distance matrix), score relative to par
- **Leaderboard** — compare scores with other players (requires backend + database)

### Content
- **English version** — use English country names (different graph structure, different dead ends)
- **Other languages** — the graph topology changes significantly per language
- **Territories / capitals** — extend the node set (e.g. also allow capital cities)
- **Difficulty tiers** — easy (start near A, lots of choices), hard (start at a bottleneck letter)

### Tech / product
- **Share button** — "I solved today's GeoChain in 7 countries: G→A→N→N→A→A→U 🌍" (Wordle-style)
- **Monetisation** — Google AdSense (need custom domain + privacy policy first); best ad placement is a 300×250 rectangle next to the chain list and a banner on the win screen
- **Custom domain** — ~$10–15/year, required for AdSense approval
- **PWA** — make it installable on mobile (add manifest + service worker)
- **Analytics** — add Plausible or simple GA4 to understand how players use the game

### Algorithmic / data improvements
- **Pre-compute all optimal bridges** — store a lookup table of shortest paths between all letter pairs for instant hint generation
- **Puzzle curation** — instead of random date-based letters, manually select or algorithmically score the best daily puzzles (most interesting graph topology)
- **Difficulty score per puzzle** — based on how many valid chains of each length exist between start and end letter

---

## Tech stack summary

| Layer | Technology |
|---|---|
| Data analysis | Python, pandas, networkx, matplotlib |
| Frontend | Vanilla HTML/CSS/JS (no framework, no build step) |
| Backend | Python FastAPI |
| Frontend hosting | GitHub Pages (free) |
| Backend hosting | Render free tier |
| Data | 194 countries, Polish names, from Wikipedia |
