const gridContainer = document.querySelector(".grid-container");

// Create a 10x5 grid
for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 10; col++) {
    
        const cell = document.createElement("div");
        cell.classList.add("cell");
        // Generate random shapes by adding different CSS classes to cells
        const randomNumber = Math.random();
        if (randomNumber < 0.2) {
            cell.classList.add("circle");
        } else if (randomNumber < 0.4) {
            cell.classList.add("square");
        } else if (randomNumber < 0.6) {
            cell.classList.add("triangle");
        } else {
            cell.classList.add("empty");
        }

        gridContainer.appendChild(cell);
    }
}