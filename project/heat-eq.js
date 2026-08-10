document.addEventListener(
    "DOMContentLoaded",
    function () {
        const canvas =
            document.querySelector("#heat-canvas");

        const toggleButton =
            document.querySelector("#heat-toggle");
        
        const resetButton =
            document.querySelector("#heat-reset");
        
        const alphaControl =
            document.querySelector("#alpha-control");
        
        const alphaValue =
            document.querySelector("#alpha-value");

        if (!canvas) {
            console.error(
                "没有找到id为heat-canvas的元素"
            );
            return;
        }
        
        if (
            !toggleButton
            || !resetButton
            || !alphaControl
            || !alphaValue
        ) {
            console.error("没有找到动画控制元素");
            return;
        }

        const context =
            canvas.getContext("2d");

        if (!context) {
            console.error("无法获取二维绘图环境");
            return;
        }

        const pointCount = 161;
        const dx = 1;
        const dt = 0.2;

        let alpha = 0.4;

        let ratio =
            alpha * dt / (dx * dx);

        let isPaused = false;

        let time = 0;

        let temperature =
            new Array(pointCount).fill(0);

        function initializeTemperature() {
            const center =
                Math.floor(pointCount / 2);

            for (
                let i = 0;
                i < pointCount;
                i += 1
            ) {
                const position =
                    (i - center) / 12;

                temperature[i] =
                    100 * Math.exp(
                        -position * position
                    );
            }

            temperature[0] = 0;

            temperature[
                pointCount - 1
            ] = 0;
        }

        function updateTemperature() {
            const nextTemperature =
                temperature.slice();

            for (
                let i = 1;
                i < pointCount - 1;
                i += 1
            ) {
                nextTemperature[i] =
                    temperature[i]
                    + ratio * (
                        temperature[i + 1]
                        - 2 * temperature[i]
                        + temperature[i - 1]
                    );
            }

            nextTemperature[0] = 0;

            nextTemperature[
                pointCount - 1
            ] = 0;

            temperature =
                nextTemperature;

            time += dt;
        }

        function drawTemperature() {
            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            const left = 50;
            const right =
                canvas.width - 20;

            const top = 30;
            const bottom =
                canvas.height - 45;

            const plotWidth =
                right - left;

            const plotHeight =
                bottom - top;

            context.strokeStyle =
                "#304163";

            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(left, top);
            context.lineTo(left, bottom);
            context.lineTo(right, bottom);
            context.stroke();

            context.strokeStyle =
                "#7db2ff";

            context.lineWidth = 3;
            context.beginPath();

            for (
                let i = 0;
                i < pointCount;
                i += 1
            ) {
                const x =
                    left
                    + i
                    / (pointCount - 1)
                    * plotWidth;

                const y =
                    bottom
                    - temperature[i]
                    / 100
                    * plotHeight;

                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            }

            context.stroke();

            const maximumTemperature =
                Math.max(...temperature);

            context.fillStyle =
                "#e5e7eb";

            context.font =
                "16px Arial";

            context.fillText(
                `time = ${time.toFixed(1)}`,
                left,
                20
            );

            context.fillText(
                `max temperature = ${
                    maximumTemperature.toFixed(1)
                }`,
                left + 160,
                20
            );

            context.fillText(
                "position",
                right - 55,
                bottom + 30
            );
        }
        
        toggleButton.addEventListener(
            "click",
            function () {
                isPaused = !isPaused;
        
                toggleButton.textContent =
                    isPaused ? "Continue" : "Pause";
            }
        );
        
        resetButton.addEventListener(
            "click",
            function () {
                time = 0;
                initializeTemperature();
                drawTemperature();
            }
        );
        
        alphaControl.addEventListener(
            "input",
            function () {
                alpha =
                    Number(alphaControl.value);
        
                ratio =
                    alpha * dt / (dx * dx);
        
                alphaValue.textContent =
                    alpha.toFixed(1);
            }
        );

        function animate() {
            if (!isPaused) {
                for (
                    let step = 0;
                    step < 3;
                    step += 1
                ) {
                    updateTemperature();
                }
            }

            drawTemperature();

            requestAnimationFrame(
                animate
            );
        }

        initializeTemperature();
        drawTemperature();

        requestAnimationFrame(
            animate
        );
    }
);