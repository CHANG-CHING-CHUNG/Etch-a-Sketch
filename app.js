let size = 1;
let isEraser = false;

const gridContainer = document.querySelector(".grid-container");

const btn = document.querySelector('.btn');

const eraser = document.querySelector('.eraser');

btn.addEventListener('click', () => {
  removeGridBox();
  gridSize();
  isEraser = false;
})

eraser.addEventListener('click', () => {
  if(!isEraser) {
    isEraser = true;
  } else {
    isEraser = false;
  }
})


gridContainer.addEventListener('mouseover', (e) => {
  if(isEraser) {
    eraseColor(e);
  } else {
    
    changeGridBoxColor(e)
  }
})
eraser.addEventListener('touchmove', () => {
  if(!isEraser) {
    isEraser = true;
  } else {
    isEraser = false;
  }
})


gridContainer.addEventListener('touchmove', (e) => {
  if(isEraser) {
    eraseColor(e);
  } else {
    
    changeGridBoxColor(e)
  }
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
  let targetColor = window.getComputedStyle(e.target).getPropertyValue('background-color');
  let colorA = getRGBA(targetColor);

  if(e.target.className === "grid-box") {
    if(targetColor != 'rgb(0, 0, 0)') {
      e.target.style.cssText = `background-color: rgba(0,0,0,${colorA + 0.1});`
    } 
  }
}

function eraseColor(e) {
  let targetColor = window.getComputedStyle(e.target).getPropertyValue('background-color');
  let colorA = getRGBA(targetColor);
  if(targetColor === 'rgb(0, 0, 0)') {
    e.target.style.cssText = `background-color: rgba(0,0,0,${0.9});`
  } else if(e.target.className === "grid-box") {
    e.target.style.cssText = `background-color: rgba(0,0,0,${colorA - 0.1});`
  }
}

function getRGBA(str) {
  const match = str.match(/rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d\.?\d?)\)/);
  if(match) {
    const A = Number(match[4]);
    return A;
  }
}

function removeGridBox() {
  gridContainer.innerHTML = '';
}

window.onload = gridSize();