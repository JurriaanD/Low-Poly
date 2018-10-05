function generateMesh() {
    let candidates = getCandidates();
    let chosenOnes = getChosenOnes(candidates);
    showMesh(chosenOnes);
}

function showMesh(vertices) {
    let triangles = Delaunay.triangulate(vertices);
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

function getCandidates() {
    let result = [];
    const rowPixels = 4*img.width;
    for (let i = 0; i < copy.pixels.length; i+=4) {
        if (copy.pixels[i] === 255) {
            const y = Math.floor(i/rowPixels);
            const x = 0.25*(i % rowPixels);
            result.push([x, y]);
        }
    }
    return result;
}

function getChosenOnes(candidates) {
    const nbOfVertices = Math.min(candidates.length, VERTICES);
    let chosen = [];
    for (let i = 0; i < nbOfVertices; i++) {
        chosen.push(candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]);
    }
    return chosen;
}