document.addEventListener(
    "DOMContentLoaded",
    function () {
	console.log("script.js loaded");

const testButton =
    document.querySelector("#test-button");

const resetButton =
    document.querySelector("#reset-button");
					        const testResult =
    document.querySelector("#test-result");

const canvas =
    document.querySelector("#test-canvas");

if (!testButton) {
    console.error("没有找到id为test-button的元素"
    );
    return;
}

if (!resetButton) {
    console.error("没有找到id为reset-button的元素"
    );
    return;
}

if (!testResult) {
    console.error("没有找到id为test-result的元素"
);
    return;
}

if (!canvas) {
    console.error("没有找到id为test-canvas的元素"
);
    return;
}

let clickCount = 0;

testButton.addEventListener(
    "click",
    function () {
	clickCount += 1;
	testResult.textContent =
	    `Success: clicked ${clickCount} times`;
    }
);

resetButton.addEventListener(
    "click",
    function (){
	clickCount = 0;
	testResult.textContent = 
	    "??????";
    }
);

const context =
    canvas.getContext("2d");

let x = 40;
let speed = 3;

const radius = 20;
const centerY = canvas.height / 2;

function draw() {
    context.clearRect(
	0,
	0,
	canvas.width,
	canvas.height
    );

    context.beginPath();

    context.arc(
	x,
	centerY,
	radius,
	0,
	2 * Math.PI
    );

    context.fillStyle = "#7db2ff";
    context.fill();

    x += speed;

    if (
	x + radius >= canvas.width
	|| x - radius <= 0
	){
	speed = -speed;
	}
    requestAnimationFrame(draw);
    }
draw();
    }
);
