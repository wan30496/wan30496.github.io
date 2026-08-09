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

const animationToggle =
    document.querySelector("#animation-toggle");

const animationSpeed =
    document.querySelector("#animation-speed");

const speedValue =
    document.querySelector("#speed-value");


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

if (!animationToggle) {
     console.error("没有找到id为animation-toggle的元素"
);
    return;
}

if (!animationSpeed) {
     console.error("没有找到id为animation-speed的元素"
);
    return;
}

if (!speedValue) {
     console.error("没有找到id为speed-value的元素"
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
let isPaused = false;

const radius = 20;
const centerY = canvas.height / 2;

animationToggle.addEventListener(
    "click",
    function(){
	isPaused = !isPaused;
	animationToggle.textContent =
	    isPaused ? "Continue" : "Pause"
    }
);

animationSpeed.addEventListener(
    "input",
    function(){
	const direction =
	    speed >=0 ? 1: -1;
	    
	const newSpeed =
	    Number(animationSpeed.value);
	
	speed = direction * newSpeed;
	speedValue.textContent = newSpeed;
    }
);


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

    if (!isPaused) {
	x +=speed;
	
	if (
	    x + radius >= canvas.width
	    || x - radius <= 0
	){
	    speed = -speed;
	}
    }
    requestAnimationFrame(draw);
    }
draw();
    }
);
