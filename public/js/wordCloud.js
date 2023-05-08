// SCMP 318 Wordcloud

let sourceText;
let response;
let img;
let startIndex = 0;
const url = getCurrentURL()
let lastChar = url.charAt(url.length - 1);
console.log(url);
console.log(lastChar)


function preload() {
  img = loadImage("/public/images/installation-"+lastChar+".png");
  sourceText = loadStrings("/public/test.txt");
}

function getCurrentURL () {
  return window.location.href
}

function setup() {
  createCanvas(800, 800);

  response = sourceText.join(' ');
  textFont("Courier-Bold");

  img.resize(60, 0);
  img.loadPixels();

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];

      if (r > 220 && g > 220 && b > 220 && a > 200) {
        img.pixels[index] = 0;
        img.pixels[index + 1] = 0;
        img.pixels[index + 2] = 0;
        img.pixels[index + 3] = a;
      }
    }
  }

  img.updatePixels();
}

function draw() {
  background(0);
  frameRate(6);

  let w = width / img.width;
  let h = height / img.height;
  img.loadPixels();

  let charIndex = startIndex;
  for (let j = 0; j < img.height; j++) {
    for (let i = 0; i < img.width; i++) {
      const pixelIndex = (i + j * img.width) * 4;
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      noStroke();
      fill(avg);
      textSize(w * 1.2);
      textAlign(CENTER, CENTER);

      text(response.charAt(charIndex % response.length), i * w + w * 0.5, j * h + h * 0.5);
      charIndex++;
    }
  }

  startIndex++;
}

function keyPressed() {
  if (background(0)) {
    background(256);
  } else {
    background(0);
  }
}

