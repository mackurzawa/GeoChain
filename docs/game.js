// Letters from the main strongly-connected component — all pairs reachable
const SCC_LETTERS = ["A", "E", "G", "I", "J", "K", "L", "M", "N", "O", "R", "S", "T", "U"];

// Precomputed letter-to-letter shortest path distances (from analyze_countries_pl.ipynb)
const LETTER_DISTANCES = {"A":{"A":0,"E":4,"G":3,"I":5,"J":3,"K":5,"L":2,"M":4,"N":1,"O":3,"R":2,"S":3,"T":5,"U":2,"Y":2},"B":{"A":1,"B":0,"E":1,"G":3,"I":1,"J":3,"K":2,"L":2,"M":2,"N":1,"O":1,"R":2,"S":1,"T":2,"U":2,"Y":1,"Z":1,"Ś":1},"C":{"A":1,"C":0,"D":1,"E":1,"G":4,"I":2,"J":4,"K":3,"L":3,"M":5,"N":2,"O":3,"R":1,"S":4,"T":2,"U":3,"Y":1},"D":{"A":1,"D":0,"E":2,"G":3,"I":1,"J":4,"K":2,"L":2,"M":4,"N":2,"O":3,"R":3,"S":3,"T":3,"U":3,"Y":3},"E":{"A":1,"E":0,"G":3,"I":1,"J":3,"K":2,"L":2,"M":4,"N":2,"O":2,"R":1,"S":3,"T":1,"U":2,"Y":3},"F":{"A":1,"E":2,"F":0,"G":3,"I":1,"J":4,"K":2,"L":2,"M":4,"N":2,"O":3,"R":3,"S":3,"T":3,"U":3,"Y":1},"G":{"A":1,"E":4,"G":0,"I":5,"J":2,"K":5,"L":2,"M":4,"N":1,"O":3,"R":2,"S":3,"T":5,"U":1,"Y":2},"H":{"A":1,"E":2,"G":3,"H":0,"I":1,"J":4,"K":2,"L":2,"M":2,"N":2,"O":2,"R":2,"S":1,"T":3,"U":3,"Y":2},"I":{"A":1,"E":1,"G":2,"I":0,"J":3,"K":1,"L":1,"M":3,"N":1,"O":2,"R":2,"S":2,"T":2,"U":2,"Y":2},"J":{"A":1,"E":4,"G":3,"I":5,"J":0,"K":5,"L":2,"M":4,"N":1,"O":3,"R":2,"S":3,"T":5,"U":2,"Y":2},"K":{"A":1,"E":2,"G":3,"I":1,"J":3,"K":0,"L":2,"M":4,"N":1,"O":1,"R":1,"S":3,"T":1,"U":2,"Y":1},"L":{"A":1,"E":2,"G":1,"I":3,"J":3,"K":3,"L":0,"M":2,"N":1,"O":1,"R":2,"S":1,"T":3,"U":2,"Y":2},"M":{"A":1,"E":2,"G":3,"I":1,"J":4,"K":1,"L":2,"M":0,"N":2,"O":1,"R":1,"S":1,"T":2,"U":3,"Y":1},"N":{"A":1,"E":3,"G":2,"I":4,"J":2,"K":4,"L":1,"M":3,"N":0,"O":2,"R":1,"S":2,"T":4,"U":1,"Y":1},"O":{"A":2,"E":4,"G":3,"I":5,"J":3,"K":5,"L":2,"M":4,"N":1,"O":0,"R":2,"S":3,"T":5,"U":2,"Y":2},"P":{"A":1,"E":4,"G":3,"I":5,"J":1,"K":5,"L":2,"M":4,"N":1,"O":3,"P":0,"R":2,"S":3,"T":5,"U":1,"Y":2},"R":{"A":1,"E":5,"G":4,"I":6,"J":4,"K":6,"L":3,"M":5,"N":2,"O":4,"R":0,"S":4,"T":6,"U":3,"Y":3},"S":{"A":1,"E":1,"G":2,"I":2,"J":3,"K":2,"L":1,"M":1,"N":1,"O":1,"R":1,"S":0,"T":2,"U":2,"Y":1},"T":{"A":1,"E":2,"G":3,"I":1,"J":2,"K":2,"L":2,"M":4,"N":1,"O":1,"R":2,"S":3,"T":0,"U":1,"Y":2},"U":{"A":1,"E":4,"G":3,"I":5,"J":1,"K":5,"L":2,"M":4,"N":1,"O":3,"R":2,"S":3,"T":5,"U":0,"Y":2},"V":{"A":2,"E":5,"G":4,"I":6,"J":2,"K":6,"L":3,"M":5,"N":2,"O":4,"R":3,"S":4,"T":6,"U":1,"V":0,"Y":3},"W":{"A":1,"E":3,"G":3,"I":2,"J":1,"K":2,"L":2,"M":1,"N":1,"O":2,"R":2,"S":2,"T":3,"U":2,"W":0,"Y":1},"Y":{"Y":0},"Z":{"A":1,"E":1,"G":4,"I":2,"J":4,"K":3,"L":3,"M":5,"N":2,"O":3,"R":2,"S":4,"T":2,"U":3,"Y":3,"Z":0},"Ł":{"A":1,"E":5,"G":4,"I":6,"J":4,"K":6,"L":3,"M":5,"N":2,"O":4,"R":3,"S":4,"T":6,"U":3,"Y":3,"Ł":0},"Ś":{"Ś":0}};

// Country data inlined — no HTTP fetch needed, works on GitHub Pages and file://
const COUNTRIES_DATA = [{"name":"Afganistan","first":"A","last":"N"},{"name":"Albania","first":"A","last":"A"},{"name":"Algieria","first":"A","last":"A"},{"name":"Andora","first":"A","last":"A"},{"name":"Angola","first":"A","last":"A"},{"name":"Antigua i Barbuda","first":"A","last":"A"},{"name":"Arabia Saudyjska","first":"A","last":"A"},{"name":"Argentyna","first":"A","last":"A"},{"name":"Armenia","first":"A","last":"A"},{"name":"Australia","first":"A","last":"A"},{"name":"Austria","first":"A","last":"A"},{"name":"Azerbejdżan","first":"A","last":"N"},{"name":"Bahamy","first":"B","last":"Y"},{"name":"Bahrajn","first":"B","last":"N"},{"name":"Bangladesz","first":"B","last":"Z"},{"name":"Barbados","first":"B","last":"S"},{"name":"Belgia","first":"B","last":"A"},{"name":"Belize","first":"B","last":"E"},{"name":"Benin","first":"B","last":"N"},{"name":"Bhutan","first":"B","last":"N"},{"name":"Białoruś","first":"B","last":"Ś"},{"name":"Boliwia","first":"B","last":"A"},{"name":"Bośnia i Hercegowina","first":"B","last":"A"},{"name":"Botswana","first":"B","last":"A"},{"name":"Brazylia","first":"B","last":"A"},{"name":"Brunei","first":"B","last":"I"},{"name":"Bułgaria","first":"B","last":"A"},{"name":"Burkina Faso","first":"B","last":"O"},{"name":"Burundi","first":"B","last":"I"},{"name":"Chile","first":"C","last":"E"},{"name":"Chiny","first":"C","last":"Y"},{"name":"Chorwacja","first":"C","last":"A"},{"name":"Cypr","first":"C","last":"R"},{"name":"Czad","first":"C","last":"D"},{"name":"Czarnogóra","first":"C","last":"A"},{"name":"Czechy","first":"C","last":"Y"},{"name":"Dania","first":"D","last":"A"},{"name":"Demokratyczna Republika Konga","first":"D","last":"A"},{"name":"Dominika","first":"D","last":"A"},{"name":"Dominikana","first":"D","last":"A"},{"name":"Dżibuti","first":"D","last":"I"},{"name":"Egipt","first":"E","last":"T"},{"name":"Ekwador","first":"E","last":"R"},{"name":"Erytrea","first":"E","last":"A"},{"name":"Estonia","first":"E","last":"A"},{"name":"Eswatini","first":"E","last":"I"},{"name":"Etiopia","first":"E","last":"A"},{"name":"Fidżi","first":"F","last":"I"},{"name":"Filipiny","first":"F","last":"Y"},{"name":"Finlandia","first":"F","last":"A"},{"name":"Francja","first":"F","last":"A"},{"name":"Gabon","first":"G","last":"N"},{"name":"Gambia","first":"G","last":"A"},{"name":"Ghana","first":"G","last":"A"},{"name":"Grecja","first":"G","last":"A"},{"name":"Grenada","first":"G","last":"A"},{"name":"Gruzja","first":"G","last":"A"},{"name":"Gujana","first":"G","last":"A"},{"name":"Gwatemala","first":"G","last":"A"},{"name":"Gwinea","first":"G","last":"A"},{"name":"Gwinea Bissau","first":"G","last":"U"},{"name":"Gwinea Równikowa","first":"G","last":"A"},{"name":"Haiti","first":"H","last":"I"},{"name":"Hiszpania","first":"H","last":"A"},{"name":"Holandia","first":"H","last":"A"},{"name":"Honduras","first":"H","last":"S"},{"name":"Indie","first":"I","last":"E"},{"name":"Indonezja","first":"I","last":"A"},{"name":"Irak","first":"I","last":"K"},{"name":"Iran","first":"I","last":"N"},{"name":"Irlandia","first":"I","last":"A"},{"name":"Islandia","first":"I","last":"A"},{"name":"Izrael","first":"I","last":"L"},{"name":"Jamajka","first":"J","last":"A"},{"name":"Japonia","first":"J","last":"A"},{"name":"Jemen","first":"J","last":"N"},{"name":"Jordania","first":"J","last":"A"},{"name":"Kambodża","first":"K","last":"A"},{"name":"Kamerun","first":"K","last":"N"},{"name":"Kanada","first":"K","last":"A"},{"name":"Katar","first":"K","last":"R"},{"name":"Kazachstan","first":"K","last":"N"},{"name":"Kenia","first":"K","last":"A"},{"name":"Kirgistan","first":"K","last":"N"},{"name":"Kiribati","first":"K","last":"I"},{"name":"Kolumbia","first":"K","last":"A"},{"name":"Komory","first":"K","last":"Y"},{"name":"Kongo","first":"K","last":"O"},{"name":"Korea Południowa","first":"K","last":"A"},{"name":"Korea Północna","first":"K","last":"A"},{"name":"Kostaryka","first":"K","last":"A"},{"name":"Kuba","first":"K","last":"A"},{"name":"Kuwejt","first":"K","last":"T"},{"name":"Laos","first":"L","last":"S"},{"name":"Lesotho","first":"L","last":"O"},{"name":"Liban","first":"L","last":"N"},{"name":"Liberia","first":"L","last":"A"},{"name":"Libia","first":"L","last":"A"},{"name":"Liechtenstein","first":"L","last":"N"},{"name":"Litwa","first":"L","last":"A"},{"name":"Luksemburg","first":"L","last":"G"},{"name":"Łotwa","first":"Ł","last":"A"},{"name":"Macedonia Północna","first":"M","last":"A"},{"name":"Madagaskar","first":"M","last":"R"},{"name":"Malawi","first":"M","last":"I"},{"name":"Malediwy","first":"M","last":"Y"},{"name":"Malezja","first":"M","last":"A"},{"name":"Mali","first":"M","last":"I"},{"name":"Malta","first":"M","last":"A"},{"name":"Maroko","first":"M","last":"O"},{"name":"Mauretania","first":"M","last":"A"},{"name":"Mauritius","first":"M","last":"S"},{"name":"Meksyk","first":"M","last":"K"},{"name":"Mikronezja","first":"M","last":"A"},{"name":"Mjanma","first":"M","last":"A"},{"name":"Mołdawia","first":"M","last":"A"},{"name":"Monako","first":"M","last":"O"},{"name":"Mongolia","first":"M","last":"A"},{"name":"Mozambik","first":"M","last":"K"},{"name":"Namibia","first":"N","last":"A"},{"name":"Nauru","first":"N","last":"U"},{"name":"Nepal","first":"N","last":"L"},{"name":"Niemcy","first":"N","last":"Y"},{"name":"Niger","first":"N","last":"R"},{"name":"Nigeria","first":"N","last":"A"},{"name":"Nikaragua","first":"N","last":"A"},{"name":"Norwegia","first":"N","last":"A"},{"name":"Nowa Zelandia","first":"N","last":"A"},{"name":"Oman","first":"O","last":"N"},{"name":"Pakistan","first":"P","last":"N"},{"name":"Palau","first":"P","last":"U"},{"name":"Panama","first":"P","last":"A"},{"name":"Papua-Nowa Gwinea","first":"P","last":"A"},{"name":"Paragwaj","first":"P","last":"J"},{"name":"Peru","first":"P","last":"U"},{"name":"Polska","first":"P","last":"A"},{"name":"Południowa Afryka","first":"P","last":"A"},{"name":"Portugalia","first":"P","last":"A"},{"name":"Republika Środkowoafrykańska","first":"R","last":"A"},{"name":"Republika Zielonego Przylądka","first":"R","last":"A"},{"name":"Rosja","first":"R","last":"A"},{"name":"Rumunia","first":"R","last":"A"},{"name":"Rwanda","first":"R","last":"A"},{"name":"Saint Kitts i Nevis","first":"S","last":"S"},{"name":"Saint Lucia","first":"S","last":"A"},{"name":"Saint Vincent i Grenadyny","first":"S","last":"Y"},{"name":"Salwador","first":"S","last":"R"},{"name":"Samoa","first":"S","last":"A"},{"name":"San Marino","first":"S","last":"O"},{"name":"Senegal","first":"S","last":"L"},{"name":"Serbia","first":"S","last":"A"},{"name":"Seszele","first":"S","last":"E"},{"name":"Sierra Leone","first":"S","last":"E"},{"name":"Singapur","first":"S","last":"R"},{"name":"Słowacja","first":"S","last":"A"},{"name":"Słowenia","first":"S","last":"A"},{"name":"Somalia","first":"S","last":"A"},{"name":"Sri Lanka","first":"S","last":"A"},{"name":"Stany Zjednoczone","first":"S","last":"E"},{"name":"Sudan","first":"S","last":"N"},{"name":"Sudan Południowy","first":"S","last":"Y"},{"name":"Surinam","first":"S","last":"M"},{"name":"Syria","first":"S","last":"A"},{"name":"Szwajcaria","first":"S","last":"A"},{"name":"Szwecja","first":"S","last":"A"},{"name":"Tadżykistan","first":"T","last":"N"},{"name":"Tajlandia","first":"T","last":"A"},{"name":"Tanzania","first":"T","last":"A"},{"name":"Timor Wschodni","first":"T","last":"I"},{"name":"Togo","first":"T","last":"O"},{"name":"Tonga","first":"T","last":"A"},{"name":"Trynidad i Tobago","first":"T","last":"O"},{"name":"Tunezja","first":"T","last":"A"},{"name":"Turcja","first":"T","last":"A"},{"name":"Turkmenistan","first":"T","last":"N"},{"name":"Tuvalu","first":"T","last":"U"},{"name":"Uganda","first":"U","last":"A"},{"name":"Ukraina","first":"U","last":"A"},{"name":"Urugwaj","first":"U","last":"J"},{"name":"Uzbekistan","first":"U","last":"N"},{"name":"Vanuatu","first":"V","last":"U"},{"name":"Watykan","first":"W","last":"N"},{"name":"Wenezuela","first":"W","last":"A"},{"name":"Węgry","first":"W","last":"Y"},{"name":"Wielka Brytania","first":"W","last":"A"},{"name":"Wietnam","first":"W","last":"M"},{"name":"Włochy","first":"W","last":"Y"},{"name":"Wybrzeże Kości Słoniowej","first":"W","last":"J"},{"name":"Wyspy Marshalla","first":"W","last":"A"},{"name":"Wyspy Salomona","first":"W","last":"A"},{"name":"Wyspy Świętego Tomasza i Książęca","first":"W","last":"A"},{"name":"Zambia","first":"Z","last":"A"},{"name":"Zimbabwe","first":"Z","last":"E"},{"name":"Zjednoczone Emiraty Arabskie","first":"Z","last":"E"}];

function minCountriesNeeded(start, end) {
    return (LETTER_DISTANCES[start] || {})[end] ?? Infinity;
}

function formatCountryCount(n) {
    if (n === 1) return "1 kraj";
    if (n <= 4) return `${n} kraje`;
    return `${n} krajów`;
}

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

// ── streak ────────────────────────────────────────────────────────────────────
const STREAK_KEY = "geochain_streak";

function loadStreakData() {
    try {
        return JSON.parse(localStorage.getItem(STREAK_KEY)) || { streak: 0, lastSolvedDate: null };
    } catch {
        return { streak: 0, lastSolvedDate: null };
    }
}

function saveStreakData(data) {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

function yesterday(dateStr) {
    const d = new Date(dateStr + "T12:00:00");
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
}

function streakStatusOnLoad(today) {
    const data = loadStreakData();
    if (data.lastSolvedDate === today)            return { alreadySolved: true,  streak: data.streak };
    if (data.lastSolvedDate === yesterday(today)) return { alreadySolved: false, streak: data.streak, active: true };
    return { alreadySolved: false, streak: 0, active: false };
}

function recordWin(today) {
    const data = loadStreakData();
    if (data.lastSolvedDate === today) return data.streak; // already counted (page refresh)
    const newStreak = data.lastSolvedDate === yesterday(today) ? data.streak + 1 : 1;
    saveStreakData({ streak: newStreak, lastSolvedDate: today });
    return newStreak;
}

// ── state ─────────────────────────────────────────────────────────────────────
let countries = [];       // [{name, first, last}]
let challenge = null;     // {date, start, end}
let chain = [];           // list of accepted country names
let currentLetter = "";   // first letter required for next country
let used = new Set();

function init() {
    countries = COUNTRIES_DATA;
    challenge = getDailyChallenge();
    currentLetter = challenge.start;

    const minPath = minCountriesNeeded(challenge.start, challenge.end);
    const stars = minPath <= 1 ? "⭐☆☆" : minPath === 2 ? "⭐⭐☆" : "⭐⭐⭐";
    document.getElementById("difficulty-display").textContent =
        `Trudność: ${stars} | Cel: min. ${formatCountryCount(minPath)}`;

    document.getElementById("start-letter").textContent = challenge.start;
    document.getElementById("end-letter").textContent = challenge.end;
    document.getElementById("current-letter").textContent = currentLetter;
    document.getElementById("date-display").textContent = challenge.date;

    const streakStatus = streakStatusOnLoad(challenge.date);
    const banner = document.getElementById("streak-banner");

    if (streakStatus.alreadySolved) {
        banner.textContent = `✅ Dzisiaj już grałeś! 🔥 Passa: ${streakStatus.streak} ${streakStatus.streak === 1 ? "dzień" : "dni"}`;
        banner.className = "streak-done";
        document.getElementById("input-area").classList.add("hidden");
    } else if (streakStatus.active && streakStatus.streak > 0) {
        banner.textContent = `🔥 Passa: ${streakStatus.streak} ${streakStatus.streak === 1 ? "dzień" : "dni"} — utrzymaj ją!`;
        banner.className = "streak-active";
    }

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

function buildShareText() {
    const letters = chain.map(name => countries.find(c => c.name === name).first).join("→");
    return `Rozwiązałem dzisiejsze GeoChain w ${chain.length} krajach: ${letters} 🌍`;
}

function copyResult() {
    const text = buildShareText();
    navigator.clipboard.writeText(text).then(() => {
        document.getElementById("copy-msg").textContent = "Skopiowano!";
    }).catch(() => {
        document.getElementById("copy-msg").textContent = text;
    });
}

function showWin() {
    const newStreak = recordWin(challenge.date);
    document.getElementById("final-score").textContent = chain.length;
    document.getElementById("win-chain").textContent = buildShareText();
    document.getElementById("win-streak").textContent =
        `🔥 Passa: ${newStreak} ${newStreak === 1 ? "dzień" : "dni"}`;
    document.getElementById("win-overlay").classList.remove("hidden");
    document.getElementById("input-area").classList.add("hidden");
}

init();
