function toGrayscale(src, dst) {
    for (let y = 0; y < src.height; y++) {
        for (let x = 0; x < src.width; x++) {
          let gray = (getRed(x, y, src) + getGreen(x, y, src) + getBlue(x, y, src)) / 3;
          setPixelRGB(x, y, dst, gray, gray, gray);
        }
    }
}