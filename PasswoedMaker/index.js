const CHAR_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "~`!@#$%^&*()_-+={[}]|:;<>,.?/",
};

const lengthEl = document.getElementById("length");
const lengthValueEl = document.getElementById("lengthValue");
const generateBtn = document.getElementById("generateBtn");
const errorMsgEl = document.getElementById("errorMsg");
const box1El = document.getElementById("box1");
const box2El = document.getElementById("box2");
const checkboxes = {
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    numbers: document.getElementById("numbers"),
    symbols: document.getElementById("symbols"),
};

lengthEl.addEventListener("input", () => {
    lengthValueEl.textContent = lengthEl.value;
});

// Rejection sampling avoids modulo bias, unlike `Math.random() * max | 0`.
function secureRandomIndex(max) {
    const range = 256 - (256 % max);
    const bytes = new Uint8Array(1);
    let value;
    do {
        crypto.getRandomValues(bytes);
        value = bytes[0];
    } while (value >= range);
    return value % max;
}

function buildCharacterPool() {
    return Object.keys(CHAR_SETS)
        .filter((key) => checkboxes[key].checked)
        .map((key) => CHAR_SETS[key])
        .join("");
}

function generatePassword(pool, length) {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += pool[secureRandomIndex(pool.length)];
    }
    return password;
}

function makePass() {
    const pool = buildCharacterPool();

    if (pool.length === 0) {
        errorMsgEl.textContent = "Select at least one character type.";
        box1El.textContent = "";
        box2El.textContent = "";
        return;
    }
    errorMsgEl.textContent = "";

    const length = Number(lengthEl.value);
    box1El.textContent = generatePassword(pool, length);
    box2El.textContent = generatePassword(pool, length);
}

generateBtn.addEventListener("click", makePass);

document.querySelectorAll(".copyBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
        const text = document.getElementById(btn.dataset.target).textContent;
        if (!text) return;

        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
            btn.textContent = original;
        }, 1500);
    });
});
