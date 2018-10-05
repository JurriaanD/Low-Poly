let img;
let copy;
let sliderVertices;
let sliderTreshold;
let VERTICES = 2500;
let EDGE_TRESHOLD = 30;
let BLUR = 1;

function initImage() {
    document.getElementById("inputForm").style.display = "none";
    img = loadImage(URL.createObjectURL(document.getElementById("imageInput").files[0]), init, () => alert("Error bij het uploaden. Enkel .jp(e)g en .png zijn toegelaten."));
}

function init() {
    // Make sure the image fits in the viewport without overflow
    if (img.width > window.innerWidth) {
        img.resize(window.innerWidth, 0);
    }
    if (img.height > window.innerHeight) {
        img.resize(0, window.innerHeight);
    }

    img.loadPixels();
    copy = copyImage(img, copy);
    resizeCanvas(img.width, img.height);
    document.getElementById("sidebar").style.display = "block";

    // Create control panel
    sliderVertices = createSlider(100, 3500, 2000);
    sliderVertices.parent('sliderVerticesSpan');
    sliderVertices.name = "sliderVertices";
    sliderVertices.changed(magic);

    sliderTreshold = createSlider(0, 254, 80);
    sliderTreshold.parent('sliderTresholdSpan');
    sliderTreshold.name = "sliderTreshold";
    sliderTreshold.changed(magic);

    sliderBlur = createSlider(0, 15, 1);
    sliderBlur.parent('sliderBlurSpan');
    sliderBlur.name = "sliderBlur";
    sliderBlur.changed(magic);

    magic();
}

function setup() {
    createCanvas(100, 100);
    pixelDensity(1)
    
    noLoop();
}

function magic() {
    VERTICES = sliderVertices.value();
    EDGE_TRESHOLD = sliderTreshold.value();
    BLUR = sliderBlur.value();

    img.loadPixels();
    copy.loadPixels();

    preprocess();
    copy.updatePixels();
    image(copy, 0, 0);
    /*
    sobel();

    copy.updatePixels();
    img.updatePixels();
    image(img, 0, 0);
    img.loadPixels();
    generateMesh();
    */
}

function downloadCanvas() {
    saveCanvas('Low-poly', 'png');
}