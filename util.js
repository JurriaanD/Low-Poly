function copyImage(src) {
    let dest = createImage(src.width, src.height);
    dest.loadPixels();
    for (let i = 0; i < src.pixels.length; i++) {
        dest.pixels[i] = src.pixels[i];
    }
    return dest;
}

function getRed(x, y, img) {
    return img.pixels[4*(y*img.width + x)  + 0];
}

function getGreen(x, y, img) {
    return img.pixels[4*(y*img.width + x)  + 1];
}

function getBlue(x, y, img) {
    return img.pixels[4*(y*img.width + x)  + 2];
}

function setPixelRGB(x, y, img, r, g, b) {
    const idx = 4 * (y*img.width + x);
    img.pixels[idx + 0] = r;
    img.pixels[idx + 1] = g;
    img.pixels[idx + 2] = b;
}