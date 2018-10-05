function preprocess() {
    toGrayscale();
    if (BLUR != 0)
        blur();
}

function toGrayscale() {
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          let gray = 0.21*getRed(x, y, img) + 0.72*getGreen(x, y, img) + 0.07*getBlue(x, y, img);
          setPixelRGB(x, y, copy, gray, gray, gray);
        }
      }
}

function blur() {
    let horizontal = copyImage(copy);

    for (let i = 0; i < img.height; i++) {
        for (let j = 0; j < img.width; j++) {
            let value = getAverage(j, i, copy);
            setPixelRGB(j, i, horizontal, value, value, value);
        }
    }

    copy = horizontal;
}

function getAverage(x, y, source) {
    let sum = 0;
    let fields = 0;
    for (let i = -BLUR; i <= BLUR; i++) {
        for (let j = -BLUR; j <= BLUR; j++) {
            if (x+j >= 0 && x+j < source.width && y+i >= 0 && y+i < source.height) {
                fields++;
                sum += getRed(x+j, y+i, source);
            }
        }
    }
    return sum / fields;
}