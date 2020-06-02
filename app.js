let size = 1;
let colorPercentage = 0.1;

const gridContainer = document.querySelector(".grid-container");

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  removeGridBox();
  gridSize();
})



gridContainer.addEventListener('mouseover', (e) => {
  changeGridBoxColor(e)
})



function gridSize() {
  size = parseInt(prompt('Enter Grid Size(1~64)'));
  if(size < 1 || size > 64 || isNaN(size)) {
    alert("Size is too large or too small! enter again!!");
    gridSize();
  }
  changeGridSize(size)
}

function changeGridSize(size) {
  gridContainer.style.cssText = `grid-template-columns: repeat(${size},1fr); grid-template-rows: repeat(${size},1fr);`;
  makeGridBox(size);
}

function makeGridBox(size) {
  let gridSize = size * size;
  for(let i = 0; i < gridSize; i++) {
    const gridBox = document.createElement('div');
    gridBox.classList.add('grid-box');
    gridContainer.appendChild(gridBox);
  }
}

function changeGridBoxColor(e) {
  if(e.target.className === "grid-box") {
    if(colorPercentage >= 1) {
      colorPercentage = 0.1;
    }
    e.target.style.cssText = `background-color: rgba(0,0,0,${colorPercentage});`
    colorPercentage += 0.1;
  }
}
function removeGridBox() {
  gridContainer.innerHTML = '';
}


window.onload = gridSize();