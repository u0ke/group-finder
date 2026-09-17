const lastnameInput = document.getElementById("lastname");
const result = document.getElementById("result");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

// =========================
// NORMALIZE NAME
// =========================

function normalizeName(name) {
return name
.trim()
.toUpperCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "");
}

// =========================
// FIND GROUP
// =========================

function findGroup(lastname) {

```
const name = normalizeName(lastname);

if (!name) {
    return null;
}


/*
    G1 = before AMEN
    G2 = AMEN → BOUH
    G3 = BOUH → EL H
    G4 = EL H → FARR
    G5 = FARR → KARS
    G6 = KARS → OUBA
    G7 = OUBA and after
*/


if (name < "AMEN") {
    return "G1";
}


if (name < "BOUH") {
    return "G2";
}


if (name < "EL H") {
    return "G3";
}


if (name < "FARR") {
    return "G4";
}


if (name < "KARS") {
    return "G5";
}


if (name < "OUBA") {
    return "G6";
}


return "G7";
```

}

// =========================
// SHOW RESULT
// =========================

function showResult() {

```
const lastname = lastnameInput.value.trim();


if (!lastname) {

    result.className = "result";

    result.innerHTML = `
        <div>
            <span class="result-icon">⌕</span>

            <span class="result-message">
                Type your last name above
            </span>
        </div>
    `;

    return;
}


const group = findGroup(lastname);


result.className = "result success";


result.innerHTML = `
    <div>

        <span class="small">
            Your name belongs to group
        </span>

        <span class="group-name">
            ${group}
        </span>

        <span class="name">
            ${lastname.toUpperCase()}
        </span>

    </div>
`;
```

}

// =========================
// THEME
// =========================

function setTheme(theme) {

```
if (theme === "dark") {

    document.body.classList.add("dark");

    themeIcon.textContent = "☀";
    themeText.textContent = "Light";

    localStorage.setItem("theme", "dark");

} else {

    document.body.classList.remove("dark");

    themeIcon.textContent = "☾";
    themeText.textContent = "Dark";

    localStorage.setItem("theme", "light");
}
```

}

// =========================
// LOAD SAVED THEME
// =========================

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {

```
setTheme(savedTheme);
```

} else {

```
setTheme("light");
```

}

// =========================
// THEME BUTTON
// =========================

themeToggle.addEventListener("click", () => {

```
const isDark = document.body.classList.contains("dark");

setTheme(isDark ? "light" : "dark");
```

});

// =========================
// SEARCH WHILE TYPING
// =========================

lastnameInput.addEventListener("input", showResult);
