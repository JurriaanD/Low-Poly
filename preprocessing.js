function preprocess() {
    toGrayscale();
}

function toGrayscale() {
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          let gray = (getRed(x, y, img) + getGreen(x, y, img) + getBlue(x, y, img)) / 3;
          setPixelRGB(x, y, copy, gray, gray, gray);
        }
      }
}