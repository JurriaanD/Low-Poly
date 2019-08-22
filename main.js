let img;
let copy;
let sliderVertices;
let sliderTreshold;
let checkboxMono;
let VERTICES = 2500;
let EDGE_TRESHOLD = 30;
let doColor = false;
let boundary = null;

function initImage() {
    document.getElementById("inputForm").style.display = "none";
    img = loadImage(URL.createObjectURL(document.getElementById("imageInput").files[0]), init, () => alert("Error while uploading. Only .jp(e)g and .png files are allowed."));
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

    // Create control panel
    document.getElementById("sidebar").style.display = "block";
    sliderVertices = createSlider(100, 3500, 2000);
    sliderVertices.parent('sliderVerticesSpan');
    sliderVertices.name = "sliderVertices";
    sliderVertices.changed(magic);
    sliderTreshold = createSlider(0, 254, 80);
    sliderTreshold.parent('sliderTresholdSpan');
    sliderTreshold.name = "sliderTreshold";
    sliderTreshold.changed(magic);
    checkboxMono = createCheckbox('Keep color');
    checkboxMono.parent('checkboxMono');
    checkboxMono.name = "checkboxMono";
    checkboxMono.changed(magic);

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
    doColor = checkboxMono.checked();

    strokeWeight(1);

    img.loadPixels();
    copy.loadPixels();

    toGrayscale(img, copy);
    sobel();

    copy.updatePixels();
    if (doColor) {
        img.updatePixels();
        image(img, 0, 0);
        img.loadPixels();
    } else {
        background(52);
    }
    generateMesh();
}

function downloadCanvas() {
    saveCanvas('Low-poly', 'png');
}