const sketch = (p) => {
  let sourceText;
  let response;
  let img;
  let startIndex = 0;
  const url = getCurrentURL();
  const lastChar = url.split('/').pop()

  p.preload = () => {
    img = p.loadImage("/public/images/installation-" + lastChar + ".png");
    sourceText = p.loadStrings("/public/test.txt");
  };

  function getCurrentURL() {
    return window.location.href;
  }

  p.setup = () => {
    p.createCanvas(400, 400);
    response = sourceText.join(' ');
    p.textFont("Courier-Bold");

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
  };

  p.draw = () => {
    p.background(0);
    p.frameRate(6);

    let w = p.width / img.width;
    let h = p.height / img.height;
    img.loadPixels();

    let charIndex = startIndex;
    for (let j = 0; j < img.height; j++) {
      for (let i = 0; i < img.width; i++) {
        const pixelIndex = (i + j * img.width) * 4;
        const r = img.pixels[pixelIndex + 0];
        const g = img.pixels[pixelIndex + 1];
        const b = img.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;

        p.noStroke();
        p.fill(avg);
        p.textSize(w * 1.2);
        p.textAlign(p.CENTER, p.CENTER);

        p.text(response.charAt(charIndex % response.length), i * w + w * 0.5, j * h + h * 0.5);
        charIndex++;
      }
    }

    startIndex++;
  };
};

const myp5 = new p5(sketch, "sketch");
