const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let y = 0;

// Draw loop
function loop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Player car
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width / 2 - 25, canvas.height - 150, 50, 100);

    requestAnimationFrame(loop);
}

loop();
