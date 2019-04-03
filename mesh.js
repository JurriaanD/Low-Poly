const AVG_FILTER_CUTOFF = 2.5;
const MIN_CIRC = 3;
const MIN_ANGLE = 0.1;

function generateMesh() {
    let candidates = getCandidates();
    let chosenOnes = getChosenOnes(candidates);
    doColor ? showColorMesh(chosenOnes) : showMonoMesh(chosenOnes);
}

function getCandidates() {
    let result = [];
    const rowPixels = 4*img.width;
    for (let i = 0; i < copy.pixels.length; i+=4) {
        if (copy.pixels[i] === 255) {
            const y = Math.floor(i/rowPixels);
            const x = 0.25*(i % rowPixels);
            if (boundary == null) {
                result.push([x, y]);
            } else if (isWithinBoundary(x, y)) {
                result.push([x, y]);
            }
        }
    }
    return result;
}

function getChosenOnes(candidates) {
    if (candidates.length < VERTICES) return candidates;
    let chosen = [];
    for (let i = 0; i < VERTICES; i++) {
        chosen.push(candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]);
    }
    return chosen;
}

function showColorMesh(vertices) {
    let triangles = Delaunay.triangulate(vertices);
    triangles = filterUglyTriangles(triangles, vertices);
    noStroke();
    for (let i = 0; i < triangles.length; i += 3) {
        const p1 = vertices[triangles[i]];
        const p2 = vertices[triangles[i+1]];
        const p3 = vertices[triangles[i+2]];
        const centerX = Math.floor((p1[0] + p2[0] + p3[0])/3); 
        const centerY = Math.floor((p1[1] + p2[1] + p3[1])/3);
        fill(getRed(centerX, centerY, img), getGreen(centerX, centerY, img), getBlue(centerX, centerY, img));
        beginShape();
        vertex(p1[0], p1[1]);
        vertex(p2[0], p2[1]);
        vertex(p3[0], p3[1]);
        endShape();
    }
}

function showMonoMesh(vertices) {
    let triangles = Delaunay.triangulate(vertices);
    triangles = filterUglyTriangles(triangles, vertices);
    stroke(255, 100);
    noFill();
    for (let i = 0; i < triangles.length; i += 3) {
        const p1 = vertices[triangles[i]];
        const p2 = vertices[triangles[i+1]];
        const p3 = vertices[triangles[i+2]];
        beginShape();
        vertex(p1[0], p1[1]);
        vertex(p2[0], p2[1]);
        vertex(p3[0], p3[1]);
        endShape();
    }
}

function filterUglyTriangles(triangles, vertices) {
    if (boundary == null) return triangles;
    let result = [];

    for (let i = 0; i < triangles.length; i += 3) {
        if (isValidTriangle(vertices[triangles[i]], vertices[triangles[i+1]], vertices[triangles[i+2]])) {
            result.push(triangles[i]);
            result.push(triangles[i+1]);
            result.push(triangles[i+2]);
        }
    }

    return result;
    
    
    /*
    let cumLength = 0;

    for (let i = 0; i < triangles.length; i += 3) {
        cumLength += getCircumference(vertices[triangles[i]], vertices[triangles[i+1]], vertices[triangles[i+2]]);
    }

    
    let avg = cumLength / triangles.length;
    let result = [];
    for (let i = 0; i < triangles.length; i += 3) {
        if (getCircumference(vertices[triangles[i]], vertices[triangles[i+1]], vertices[triangles[i+2]]) < avg * AVG_FILTER_CUTOFF) {
            result.push(triangles[i]);
            result.push(triangles[i+1]);
            result.push(triangles[i+2]);
        }
    }
    return result;
    
    
    let lengths = new Array(triangles.length/3);

    for (let i = 0; i < lengths.length; i++) {
        lengths[i] = getCircumference(vertices[triangles[3*i]], vertices[triangles[3*i+1]], vertices[triangles[3*i+2]]);
    }

    lengths.sort();
    const maxIdx = Math.floor(0.99 * lengths.length);
    const maxVal = lengths[maxIdx];

    let result = [];
    for (let i = 0; i < triangles.length; i += 3) {
        const circ = getCircumference(vertices[triangles[i]], vertices[triangles[i+1]], vertices[triangles[i+2]]);
        if (MIN_CIRC < circ && circ < maxVal) {
            result.push(triangles[i]);
            result.push(triangles[i+1]);
            result.push(triangles[i+2]);
        }
    }
    return result;
    */
}

function getCircumference(v1, v2, v3) {
    return getManhattanDist(v1, v2) + getManhattanDist(v2, v3) + getManhattanDist(v3, v1);
}

function getManhattanDist(v1, v2) {
    return Math.abs(v2[0] - v1[0]) + Math.abs(v2[1] - v1[1]);
}

// https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
function isWithinBoundary(px, py) {
    const testx = px;
    const testy = py;
    const nvert = boundary.xs.length;
    const verty = boundary.ys;
    const vertx = boundary.xs;

    let i = 0;
    let j = 0;
    let c = false;
    for (i = 0, j = nvert-1; i < nvert; j = i++) {
        if ( ((verty[i]>testy) != (verty[j]>testy)) &&
        (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) ) {
            c = !c;
        }
    }
    return c;
}