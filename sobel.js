function sobel() {
    addFilter();
    hardEdge();
}

function addFilter() {
    let temp = copyImage(copy);
    for (let i = 1; i < img.height-1; i++) {
        for (let j = 1; j < img.width-1; j++) {

            let sumX = 0; let sumY = 0;
            for (let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {
                    let gray = getRed(j+x, i+y, copy);
                    sumX += kernelX[y+1][x+1] * gray;
                    sumY += kernelY[y+1][x+1] * gray;
                }
            }

            let sum = Math.sqrt(sumX*sumX + sumY*sumY);
            setPixelRGB(j, i, temp, sum, sum, sum);
        }
    }
    copy = temp;
}

function hardEdge() {
    let temp = copyImage(copy);
    for (let i = 1; i < img.height-1; i++) {
        for (let j = 1; j < img.width-1; j++) {

            let sum = 0;
            for (let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {
                    sum += getRed(j+x, i+y, copy);
                }
            }

            sum = sum/9 > EDGE_TRESHOLD ? 255 : 0;
            setPixelRGB(j, i, temp, sum, sum, sum);
        }
    }
    copy = temp;
}

const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
]

const kernelY = [
    [1, 2, 1], 
    [0, 0, 0],
    [-1, -2, -1]
]