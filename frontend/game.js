// Letters from the main strongly-connected component — all pairs reachable
const SCC_LETTERS = ["A", "E", "G", "I", "J", "K", "L", "M", "N", "O", "R", "S", "T", "U"];

function getDailyChallenge() {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const d = parseInt(dateStr.replace(/-/g, ""));    // 20260606
    const startIdx = d % SCC_LETTERS.length;
    let endIdx = (d * 31 + 7) % SCC_LETTERS.length;
    if (endIdx === startIdx) endIdx = (endIdx + 1) % SCC_LETTERS.length;
    return {
        date: dateStr,
        start: SCC_LETTERS[startIdx],
        end: SCC_LETTERS[endIdx],
    };
}

// ── state ─────────────────────────────────────────────────────────────────────
let countries = [];       // [{name, first, last}]
let challenge = null;     // {date, start, end}
let chain = [];           // list of accepted country names
let currentLetter = "";   // first letter required for next country
let used = new Set();

async function init() {
    const res = await fetch("countries.json");
    countries = await res.json();
    challenge = getDailyChallenge();
    currentLetter = challenge.start;

    document.getElementById("start-letter").textContent = challenge.start;
    document.getElementById("end-letter").textContent = challenge.end;
    document.getElementById("current-letter").textContent = currentLetter;
    document.getElementById("date-display").textContent = challenge.date;

    document.getElementById("country-form").addEventListener("submit", onSubmit);
    document.getElementById("country-input").focus();
}

function validateInput(name) {
    const normalised = name.trim();
    if (!normalised) return { ok: false, error: "Wpisz nazwę kraju." };

    const match = countries.find(
        (c) => c.name.toLowerCase() === normalised.toLowerCase()
    );
    if (!match) return { ok: false, error: `Nieznany kraj: "${normalised}"` };
    if (used.has(match.name))
        return { ok: false, error: `"${match.name}" był już użyty.` };
    if (match.first !== currentLetter)
        return {
            ok: false,
            error: `Kraj musi zaczynać się na "${currentLetter}". "${match.name}" zaczyna się na "${match.first}".`,
        };
    return { ok: true, country: match };
}

function onSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("country-input");
    const msg = document.getElementById("message");
    const result = validateInput(input.value);

    if (!result.ok) {
        msg.textContent = result.error;
        msg.className = "error";
        return;
    }

    const country = result.country;
    used.add(country.name);
    chain.push(country.name);
    currentLetter = country.last;

    renderChain();
    input.value = "";
    input.focus();

    if (country.last === challenge.end) {
        showWin();
        return;
    }

    document.getElementById("current-letter").textContent = currentLetter;
    msg.textContent = `✓ Poprawnie! Następna litera: ${currentLetter}`;
    msg.className = "ok";
}

function renderChain() {
    const list = document.getElementById("chain-list");
    list.innerHTML = "";
    chain.forEach((name, i) => {
        const c = countries.find((x) => x.name === name);
        const li = document.createElement("li");
        li.textContent = `${name}  (${c.first} → ${c.last})`;
        list.appendChild(li);
    });
}

function showWin() {
    document.getElementById("final-score").textContent = chain.length;
    document.getElementById("win-chain").textContent = chain.join(" → ");
    document.getElementById("win-overlay").classList.remove("hidden");
    document.getElementById("input-area").classList.add("hidden");
}

init();
