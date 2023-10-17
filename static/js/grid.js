// JavaScript code for handling the grid, drawing, and exporting functionality
// Include grid-specific JavaScript here
const gridContainer = document.getElementById("gridContainer");
const drawingGrid = document.getElementById("drawingGrid");
const gridCellSelector = document.getElementById("gridCellSelector");

let drawing = false;
let selectedCells = [];

// Function to generate the grid of cells
function generateGrid() {
    const numRows = 10; // Adjust the number of rows as needed
    const numCols = 5; // Fixed number of columns

    for (let row = 0; row < numRows; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "grid";

        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement("div");
            cell.className = "cell default"; // Default cell type
            rowDiv.appendChild(cell);

            // Event listeners for drawing
            cell.addEventListener("mousedown", () => {
                drawing = true;
                if (drawing) {
                    if (event.shiftKey) {
                        // Remove the cell if Shift key is held
                        cell.className = "cell default";
                    } else {
                        selectedCells.push(cell);
                        updateCellColor(cell);
                    }
                }
            });

            cell.addEventListener("mouseup", () => {
                drawing = false;
            });

            cell.addEventListener("mouseover", () => {
                if (drawing) {
                    if (event.shiftKey) {
                        // Remove the cell if Shift key is held
                        cell.className = "cell default";
                    } else {
                        selectedCells.push(cell);
                        updateCellColor(cell);
                    }
                }
            });
        }

        gridContainer.appendChild(rowDiv);
    }
}

// Call the function to generate the grid when the page loads
window.addEventListener("load", generateGrid);

// Function to update cell color based on the selected cell type
function updateCellColor(cell) {
    const selectedCellType = gridCellSelector.value;
    cell.className = `cell ${selectedCellType}`;
}
