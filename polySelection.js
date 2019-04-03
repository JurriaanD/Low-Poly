function polyClickListener() {
    if (mouseX > width || mouseY > height) return;
    boundary.push([mouseX, mouseY]);
    const nbPoints = boundary.length;

    noFill();
    stroke(255);
    strokeWeight(5);
    if (nbPoints > 1) {
        line(mouseX, mouseY, boundary[nbPoints-2][0], boundary[nbPoints-2][1]);
    } else {
        point(mouseX, mouseY);
    }
}

function startPolySelection() {
    let button = document.getElementById("buttonBoundary");
    button.onclick = endPolySelection;
    button.innerHTML = "Finish boundary";
    boundary = []
    mouseClicked = polyClickListener;
    image(img, 0, 0);
}

function endPolySelection() {
    let button = document.getElementById("buttonBoundary");
    button.onclick = startPolySelection;
    button.innerHTML = "Select boundary";
    mouseClicked = () => null;

    // Convert our list of points to a list of x-coordinates and a list of y-coordinates
    let xs = []; let ys = [];
    for (let point of boundary) {
        xs.push(point[0]); ys.push(point[1]);
    }
    xs.push(xs[0]); ys.push(ys[0]);
    boundary.xs = xs; boundary.ys = ys;

    alert("Your boundary will be used until you select a new one, or refresh the page.");
    magic();
}