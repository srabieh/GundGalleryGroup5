//SCMP 318 Wordcloud

const sketch = (p) => {
  let sourceText;
  let response;
  let img;
  let startIndex = 0;

  p.preload = () => {
    img = p.loadImage("man.jpeg");
    sourceText = p.loadStrings("db.txt");
  };

  p.setup = () => {
    p.createCanvas(800, 800);
    response = sourceText.join(' ');
    p.textFont("Courier-Bold");
  };

  p.draw = () => {
    p.background(0);
    p.frameRate(5);
    img.resize(60, 0); //method to resize image

    let charIndex = startIndex;
    let w = p.width / img.width;
    let h = p.height / img.height;
    img.loadPixels();
    //loads the pixel data for the display window into the pixels[] array

    for (let j = 0; j < img.height; j++) {
      for (let i = 0; i < img.width; i++) {
        const pixelIndex = (i + j * img.width) * 4;
        const r = img.pixels[pixelIndex + 0];
        const g = img.pixels[pixelIndex + 1];
        const b = img.pixels[pixelIndex + 2];
        //created a pixel array with every pixel having 4 values: r, g, b, a
        const avg = (r + g + b) / 3;
        //averaging the rgb values in order to create a greyscale color. this identifies the brightest pixels the picture.

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

  //fun with some keypressed functions
  p.keyPressed = () => {
    if (p.background(0)) {
      p.background(256);
    } else {
      p.background(0);
    }
  };
};

new p5(sketch);
