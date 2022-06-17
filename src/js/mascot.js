function initMascotEvent(){
    requestAnimationFrame(animate);
    document.querySelector(".mascot").addEventListener("click", evilHarald);
}

async function evilHarald(){
    const img = document.querySelector(".mascot");
    const ogSrc = img.src;
    
    img.src = "./src/images/evil_harald.png";
    createLightning();
    await sleep(100);
    img.src = ogSrc;    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// <cred src=https://dev.to/soorajsnblaze333/make-it-flash-lightning-with-canvas-43nh />
'use strict';
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
const lightningStrikeOffset = 5;
const lightningStrikeLength = 100;
const lightningBoltLength = 5;
const lightningThickness = 4;
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

const createVector = function(x, y) { return { x, y } }

const getRandomFloat = function(min, max) {
  const random = Math.random() * (max - min + 1) + min;
  return random;
}

const getRandomInteger = function(min, max) {
  return Math.floor(getRandomFloat(min, max)); 
}

const clearCanvas = function(x, y, height, width) {
  rectX = x || 0;
  rectY = y || 0;
  rectHeight = height || canvasHeight;
  rectWidth = width || canvasWidth;
  context.clearRect(rectX, rectY, rectWidth, rectHeight);
  context.beginPath();
}

const line = function(start, end, thickness, opacity) {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.lineWidth = thickness;
  let theme =  document.documentElement.getAttribute("data-theme");
  context.strokeStyle = theme == "light" ? `rgba(10, 0, 115, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
  context.shadowBlur = 30;
  context.shadowColor = "#bd9df2";
  context.stroke();
  context.closePath();
}

class Lightning {
  constructor(x1, y1, x2, y2, thickness, opacity) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.thickness = thickness;
    this.opacity = opacity;
  }
  draw() {
    return line(this.start, this.end, this.thickness, this.opacity);
  }
}

const interval = 3000;
let lightning = [];


const createLightning = function() {
  lightning = [];
  let lightningX1 = getRandomInteger(2, canvasWidth - 2);
  let lightningX2 = getRandomInteger(lightningX1 - lightningStrikeOffset, lightningX1 + lightningStrikeOffset);
  lightning[0] = new Lightning(lightningX1, 0, lightningX2, lightningBoltLength, lightningThickness, 1);
  for (let l = 1; l < lightningStrikeLength; l++) {
    let lastBolt = lightning[l - 1];
    let lx1 = lastBolt.end.x;
    let lx2 = getRandomInteger(lx1 - lightningStrikeOffset, lx1 + lightningStrikeOffset);
    lightning.push(new Lightning(
      lx1, 
      lastBolt.end.y, 
      lx2, 
      lastBolt.end.y + lightningBoltLength, 
      lastBolt.thickness, 
      lastBolt.opacity
    ));
  }
}


const animate = function() {
  clearCanvas();

  for (let i = 0 ; i < lightning.length ; i++) {
    lightning[i].opacity -= 0.01;
    lightning[i].thickness -= 0.05;
    if (lightning[i].thickness <= 2) {
      lightning[i].end.y -= 0.05;
    }
    lightning[i].draw();
  }

  requestAnimationFrame(animate);
}

