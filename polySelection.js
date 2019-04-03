function polyClickListener() {
    if (mouseX > width || mouseY > height) return;
    boundary.push([mouseX, mouseY]);
    boundary.xs.push(mouseX);
    boundary.ys.push(mouseY);
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
    boundary.xs = [];
    boundary.ys = [];
    mouseClicked = polyClickListener;
    image(img, 0, 0);
}

function endPolySelection() {
    let button = document.getElementById("buttonBoundary");
    button.onclick = startPolySelection;
    button.innerHTML = "Select boundary";
    mouseClicked = () => null;

    boundary.xs.push(boundary.xs[0]);
    boundary.ys.push(boundary.ys[0]);

    alert("Your boundary will be used until you select a new one, or refresh the page.");
    magic();
}