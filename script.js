const nameArray = [
    {name: "Harry Potter", owner: "Martl_Spedl", haus: "Gryffindor"},
    {name: "Ginny Weasley", owner: "Maris Hikari", haus: "Gryffindor"},
    {name: "Luna Lovegood", owner: "JulieK05", haus: "Ravenclaw"},
    {name: "Molly Weasley", owner: "Hippo2269", haus: "Gryffindor"},
    {name: "Draco Malfoy", owner: "Naira Riddle", haus: "Slytherin"},
    {name: "Nymphadora Tonks", owner: "TheLillySnape", haus: "Hufflepuff"},
    {name: "Remus Lupin", owner: "Mutato", haus: "Gryffindor"},
    {name: "Minerva Mcgonagall", owner: "Kodala22", haus: "Gryffindor"},
    {name: "Filius Flitwick", owner: "SardieKane", haus: "Ravenclaw"},
    {name: "Sirius Black", owner: "JamesLupin_S", haus: "Gryffindor"},
    {name: "Bellatrix Lestrange", owner: "Wölfchen_DA", haus: "Slytherin"},
    {name: "Severus Snape", owner: "Wusel_Flusel", haus: "Slytherin"},
];

function showOwner(owner, event) {
    const ownerPopup = document.getElementById('ownerPopup');
    ownerPopup.innerText = `${owner}`;
    ownerPopup.style.left = `${event.clientX}px`;
    ownerPopup.style.top = `${event.clientY}px`;
    ownerPopup.style.display = 'block';
}

function hideOwner() {
    const ownerPopup = document.getElementById('ownerPopup');
    ownerPopup.style.display = 'none';
}

function checkOverlap(newNameElement, existingElements) {
    const margin = 10; // Abstand zwischen den Elementen

    for (const existingElement of existingElements) {
        const rect1 = newNameElement.getBoundingClientRect();
        const rect2 = existingElement.getBoundingClientRect();

        if (
            rect1.right + margin > rect2.left &&
            rect1.left - margin < rect2.right &&
            rect1.bottom + margin > rect2.top &&
            rect1.top - margin < rect2.bottom
        ) {
            return true;
        }
    }

    return false;
}

function getRandomPosition(existingElements) {
    const maxWidth = window.innerWidth - 100;
    const maxHeight = window.innerHeight - 20;

    let left, top;

    do {
        left = Math.random() * maxWidth;
        top = Math.random() * maxHeight;
    } while (checkOverlap({getBoundingClientRect: () => ({left, top})}, existingElements));

    return {left, top};
}

function redirectToPage(name) {
    const sanitizedName = name.replace(/\s+/g, '-').toLowerCase();
    window.location.href = `./characters/${sanitizedName}.html`;
}

function displayRandomNames() {
    const body = document.body;
    const existingElements = [];

    nameArray.forEach(({name, owner, haus}) => {
        const nameElement = document.createElement('div');
        nameElement.innerText = name;
        nameElement.classList.add('name');

        // Farbzuordnung je nach Hogwarts-Haus
        switch (haus) {
            case 'Gryffindor':
                nameElement.style.color = 'red';
                break;
            case 'Ravenclaw':
                nameElement.style.color = 'blue';
                break;
            case 'Slytherin':
                nameElement.style.color = 'green';
                break;
            case 'Hufflepuff':
                nameElement.style.color = 'yellow';
                break;
            default:
                nameElement.style.color = 'black';
        }

        let position;
        do {
            position = getRandomPosition(existingElements);
        } while (checkOverlap({getBoundingClientRect: () => position}, existingElements));

        nameElement.style.left = `${position.left}px`;
        nameElement.style.top = `${position.top}px`;

        nameElement.addEventListener('click', () => redirectToPage(name));
        nameElement.addEventListener('mouseover', (event) => showOwner(owner, event));
        nameElement.addEventListener('mouseout', hideOwner);

        existingElements.push(nameElement);
        body.appendChild(nameElement);
    });
}

displayRandomNames();
