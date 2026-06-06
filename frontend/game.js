// Letters from the main strongly-connected component — all pairs reachable
const SCC_LETTERS = ["A", "E", "G", "I", "J", "K", "L", "M", "N", "O", "R", "S", "T", "U"];

// Country data inlined — no HTTP fetch needed, works on GitHub Pages and file://
const COUNTRIES_DATA = [{"name":"Afganistan","first":"A","last":"N"},{"name":"Albania","first":"A","last":"A"},{"name":"Algieria","first":"A","last":"A"},{"name":"Andora","first":"A","last":"A"},{"name":"Angola","first":"A","last":"A"},{"name":"Antigua i Barbuda","first":"A","last":"A"},{"name":"Arabia Saudyjska","first":"A","last":"A"},{"name":"Argentyna","first":"A","last":"A"},{"name":"Armenia","first":"A","last":"A"},{"name":"Australia","first":"A","last":"A"},{"name":"Austria","first":"A","last":"A"},{"name":"Azerbejdżan","first":"A","last":"N"},{"name":"Bahamy","first":"B","last":"Y"},{"name":"Bahrajn","first":"B","last":"N"},{"name":"Bangladesz","first":"B","last":"Z"},{"name":"Barbados","first":"B","last":"S"},{"name":"Belgia","first":"B","last":"A"},{"name":"Belize","first":"B","last":"E"},{"name":"Benin","first":"B","last":"N"},{"name":"Bhutan","first":"B","last":"N"},{"name":"Białoruś","first":"B","last":"Ś"},{"name":"Boliwia","first":"B","last":"A"},{"name":"Bośnia i Hercegowina","first":"B","last":"A"},{"name":"Botswana","first":"B","last":"A"},{"name":"Brazylia","first":"B","last":"A"},{"name":"Brunei","first":"B","last":"I"},{"name":"Bułgaria","first":"B","last":"A"},{"name":"Burkina Faso","first":"B","last":"O"},{"name":"Burundi","first":"B","last":"I"},{"name":"Chile","first":"C","last":"E"},{"name":"Chiny","first":"C","last":"Y"},{"name":"Chorwacja","first":"C","last":"A"},{"name":"Cypr","first":"C","last":"R"},{"name":"Czad","first":"C","last":"D"},{"name":"Czarnogóra","first":"C","last":"A"},{"name":"Czechy","first":"C","last":"Y"},{"name":"Dania","first":"D","last":"A"},{"name":"Demokratyczna Republika Konga","first":"D","last":"A"},{"name":"Dominika","first":"D","last":"A"},{"name":"Dominikana","first":"D","last":"A"},{"name":"Dżibuti","first":"D","last":"I"},{"name":"Egipt","first":"E","last":"T"},{"name":"Ekwador","first":"E","last":"R"},{"name":"Erytrea","first":"E","last":"A"},{"name":"Estonia","first":"E","last":"A"},{"name":"Eswatini","first":"E","last":"I"},{"name":"Etiopia","first":"E","last":"A"},{"name":"Fidżi","first":"F","last":"I"},{"name":"Filipiny","first":"F","last":"Y"},{"name":"Finlandia","first":"F","last":"A"},{"name":"Francja","first":"F","last":"A"},{"name":"Gabon","first":"G","last":"N"},{"name":"Gambia","first":"G","last":"A"},{"name":"Ghana","first":"G","last":"A"},{"name":"Grecja","first":"G","last":"A"},{"name":"Grenada","first":"G","last":"A"},{"name":"Gruzja","first":"G","last":"A"},{"name":"Gujana","first":"G","last":"A"},{"name":"Gwatemala","first":"G","last":"A"},{"name":"Gwinea","first":"G","last":"A"},{"name":"Gwinea Bissau","first":"G","last":"U"},{"name":"Gwinea Równikowa","first":"G","last":"A"},{"name":"Haiti","first":"H","last":"I"},{"name":"Hiszpania","first":"H","last":"A"},{"name":"Holandia","first":"H","last":"A"},{"name":"Honduras","first":"H","last":"S"},{"name":"Indie","first":"I","last":"E"},{"name":"Indonezja","first":"I","last":"A"},{"name":"Irak","first":"I","last":"K"},{"name":"Iran","first":"I","last":"N"},{"name":"Irlandia","first":"I","last":"A"},{"name":"Islandia","first":"I","last":"A"},{"name":"Izrael","first":"I","last":"L"},{"name":"Jamajka","first":"J","last":"A"},{"name":"Japonia","first":"J","last":"A"},{"name":"Jemen","first":"J","last":"N"},{"name":"Jordania","first":"J","last":"A"},{"name":"Kambodża","first":"K","last":"A"},{"name":"Kamerun","first":"K","last":"N"},{"name":"Kanada","first":"K","last":"A"},{"name":"Katar","first":"K","last":"R"},{"name":"Kazachstan","first":"K","last":"N"},{"name":"Kenia","first":"K","last":"A"},{"name":"Kirgistan","first":"K","last":"N"},{"name":"Kiribati","first":"K","last":"I"},{"name":"Kolumbia","first":"K","last":"A"},{"name":"Komory","first":"K","last":"Y"},{"name":"Kongo","first":"K","last":"O"},{"name":"Korea Południowa","first":"K","last":"A"},{"name":"Korea Północna","first":"K","last":"A"},{"name":"Kostaryka","first":"K","last":"A"},{"name":"Kuba","first":"K","last":"A"},{"name":"Kuwejt","first":"K","last":"T"},{"name":"Laos","first":"L","last":"S"},{"name":"Lesotho","first":"L","last":"O"},{"name":"Liban","first":"L","last":"N"},{"name":"Liberia","first":"L","last":"A"},{"name":"Libia","first":"L","last":"A"},{"name":"Liechtenstein","first":"L","last":"N"},{"name":"Litwa","first":"L","last":"A"},{"name":"Luksemburg","first":"L","last":"G"},{"name":"Łotwa","first":"Ł","last":"A"},{"name":"Macedonia Północna","first":"M","last":"A"},{"name":"Madagaskar","first":"M","last":"R"},{"name":"Malawi","first":"M","last":"I"},{"name":"Malediwy","first":"M","last":"Y"},{"name":"Malezja","first":"M","last":"A"},{"name":"Mali","first":"M","last":"I"},{"name":"Malta","first":"M","last":"A"},{"name":"Maroko","first":"M","last":"O"},{"name":"Mauretania","first":"M","last":"A"},{"name":"Mauritius","first":"M","last":"S"},{"name":"Meksyk","first":"M","last":"K"},{"name":"Mikronezja","first":"M","last":"A"},{"name":"Mjanma","first":"M","last":"A"},{"name":"Mołdawia","first":"M","last":"A"},{"name":"Monako","first":"M","last":"O"},{"name":"Mongolia","first":"M","last":"A"},{"name":"Mozambik","first":"M","last":"K"},{"name":"Namibia","first":"N","last":"A"},{"name":"Nauru","first":"N","last":"U"},{"name":"Nepal","first":"N","last":"L"},{"name":"Niemcy","first":"N","last":"Y"},{"name":"Niger","first":"N","last":"R"},{"name":"Nigeria","first":"N","last":"A"},{"name":"Nikaragua","first":"N","last":"A"},{"name":"Norwegia","first":"N","last":"A"},{"name":"Nowa Zelandia","first":"N","last":"A"},{"name":"Oman","first":"O","last":"N"},{"name":"Pakistan","first":"P","last":"N"},{"name":"Palau","first":"P","last":"U"},{"name":"Panama","first":"P","last":"A"},{"name":"Papua-Nowa Gwinea","first":"P","last":"A"},{"name":"Paragwaj","first":"P","last":"J"},{"name":"Peru","first":"P","last":"U"},{"name":"Polska","first":"P","last":"A"},{"name":"Południowa Afryka","first":"P","last":"A"},{"name":"Portugalia","first":"P","last":"A"},{"name":"Republika Środkowoafrykańska","first":"R","last":"A"},{"name":"Republika Zielonego Przylądka","first":"R","last":"A"},{"name":"Rosja","first":"R","last":"A"},{"name":"Rumunia","first":"R","last":"A"},{"name":"Rwanda","first":"R","last":"A"},{"name":"Saint Kitts i Nevis","first":"S","last":"S"},{"name":"Saint Lucia","first":"S","last":"A"},{"name":"Saint Vincent i Grenadyny","first":"S","last":"Y"},{"name":"Salwador","first":"S","last":"R"},{"name":"Samoa","first":"S","last":"A"},{"name":"San Marino","first":"S","last":"O"},{"name":"Senegal","first":"S","last":"L"},{"name":"Serbia","first":"S","last":"A"},{"name":"Seszele","first":"S","last":"E"},{"name":"Sierra Leone","first":"S","last":"E"},{"name":"Singapur","first":"S","last":"R"},{"name":"Słowacja","first":"S","last":"A"},{"name":"Słowenia","first":"S","last":"A"},{"name":"Somalia","first":"S","last":"A"},{"name":"Sri Lanka","first":"S","last":"A"},{"name":"Stany Zjednoczone","first":"S","last":"E"},{"name":"Sudan","first":"S","last":"N"},{"name":"Sudan Południowy","first":"S","last":"Y"},{"name":"Surinam","first":"S","last":"M"},{"name":"Syria","first":"S","last":"A"},{"name":"Szwajcaria","first":"S","last":"A"},{"name":"Szwecja","first":"S","last":"A"},{"name":"Tadżykistan","first":"T","last":"N"},{"name":"Tajlandia","first":"T","last":"A"},{"name":"Tanzania","first":"T","last":"A"},{"name":"Timor Wschodni","first":"T","last":"I"},{"name":"Togo","first":"T","last":"O"},{"name":"Tonga","first":"T","last":"A"},{"name":"Trynidad i Tobago","first":"T","last":"O"},{"name":"Tunezja","first":"T","last":"A"},{"name":"Turcja","first":"T","last":"A"},{"name":"Turkmenistan","first":"T","last":"N"},{"name":"Tuvalu","first":"T","last":"U"},{"name":"Uganda","first":"U","last":"A"},{"name":"Ukraina","first":"U","last":"A"},{"name":"Urugwaj","first":"U","last":"J"},{"name":"Uzbekistan","first":"U","last":"N"},{"name":"Vanuatu","first":"V","last":"U"},{"name":"Watykan","first":"W","last":"N"},{"name":"Wenezuela","first":"W","last":"A"},{"name":"Węgry","first":"W","last":"Y"},{"name":"Wielka Brytania","first":"W","last":"A"},{"name":"Wietnam","first":"W","last":"M"},{"name":"Włochy","first":"W","last":"Y"},{"name":"Wybrzeże Kości Słoniowej","first":"W","last":"J"},{"name":"Wyspy Marshalla","first":"W","last":"A"},{"name":"Wyspy Salomona","first":"W","last":"A"},{"name":"Wyspy Świętego Tomasza i Książęca","first":"W","last":"A"},{"name":"Zambia","first":"Z","last":"A"},{"name":"Zimbabwe","first":"Z","last":"E"},{"name":"Zjednoczone Emiraty Arabskie","first":"Z","last":"E"}];

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

function init() {
    countries = COUNTRIES_DATA;
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
