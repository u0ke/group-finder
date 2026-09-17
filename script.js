const lastnameInput = document.getElementById("lastname");
const result = document.getElementById("result");


// Normalize the name
function normalizeName(name) {
    return name
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// Find the group
function findGroup(lastname) {

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
}


// Show result
function showResult() {

    const lastname = lastnameInput.value.trim();

    if (!lastname) {

        result.className = "result";

        result.innerHTML = `
            Écrivez votre nom ci-dessus
        `;

        return;
    }


    const group = findGroup(lastname);

    result.className = "result success";

    result.innerHTML = `
        <div>
            <span class="small">
                Votre nom appartient au groupe
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


// Search while typing
lastnameInput.addEventListener("input", showResult);