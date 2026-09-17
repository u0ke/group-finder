const lastnameInput = document.getElementById("lastname");
const result = document.getElementById("result");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

function normalizeName(name) {
    return name
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


function findGroup(lastname) {
    const name = normalizeName(lastname);

    if (!name) {
        return null;
    }

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
}

function showResult() {
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
}

function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");

        themeIcon.textContent = "☀";
        themeText.textContent = "Light";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        localStorage.setItem("group-finder-theme", "dark");
    } else {
        document.body.classList.remove("dark");

        themeIcon.textContent = "☾";
        themeText.textContent = "Dark";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        localStorage.setItem("group-finder-theme", "light");
    }
}

const savedTheme = localStorage.getItem("group-finder-theme");

if (savedTheme === "dark") {
    setTheme("dark");
} else {
    setTheme("light");
}

themeToggle.addEventListener("click", function () {
    const darkMode = document.body.classList.contains("dark");

    if (darkMode) {
        setTheme("light");
    } else {
        setTheme("dark");
    }
});

lastnameInput.addEventListener("input", showResult);