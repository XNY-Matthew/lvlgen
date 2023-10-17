// JavaScript code for handling general functionality across the page
// Include any global JavaScript here
const cellTypeSelect = document.getElementById("cellType");
const exportButton = document.getElementById("exportButton");
let drawing = false;
let selectedCells = [];

// Function to update cell color based on the selected cell type
function updateCellColor(cell) {
    const selectedCellType = cellTypeSelect.value;
    cell.className = `cell ${selectedCellType}`;
}

exportButton.addEventListener("click", () => {
    if (selectedCells.length === 0) {
        alert("No region drawn. Please draw a region first.");
        return;
    }

    // Create a temporary canvas to copy the selected region
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    // Calculate the bounding box of the drawn cells
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    selectedCells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        minX = Math.min(minX, rect.left);
        minY = Math.min(minY, rect.top);
        maxX = Math.max(maxX, rect.right);
        maxY = Math.max(maxY, rect.bottom);
    });

    const width = maxX - minX;
    const height = maxY - minY;

    // Set the dimensions of the temporary canvas
    tempCanvas.width = width;
    tempCanvas.height = height;

    selectedCells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const x = rect.left - minX;
        const y = rect.top - minY;

        // Get the background image of the cell
        const backgroundImage = getComputedStyle(cell).backgroundImage;

        // Draw the background image on the canvas
        const img = new Image();
        img.src = backgroundImage.slice(4, -1).replace(/"/g, "");
        tempCtx.drawImage(img, x, y, cell.offsetWidth, cell.offsetHeight);
    });

    // Convert the temporary canvas to a PNG image and open it in a new tab
    tempCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "drawn_region.png";
        a.click();
        URL.revokeObjectURL(url);
    });
});
