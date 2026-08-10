document.addEventListener(
    "DOMContentLoaded",
    function () {
        const canvas =
            document.querySelector(
                "#reaction-canvas"
            );

        if (!canvas) {
            console.error(
                "没有找到reaction-canvas"
            );
            return;
        }

        const context =
            canvas.getContext("2d");

        const width = canvas.width;
        const height = canvas.height;
        const size = width * height;

        const diffusionU = 0.16;
        const diffusionV = 0.08;
        const feed = 0.0367;
        const kill = 0.0649;
        const dt = 1.0;

        let u = new Float32Array(size);
        let v = new Float32Array(size);

        let nextU =
            new Float32Array(size);

        let nextV =
            new Float32Array(size);

        const image =
            context.createImageData(
                width,
                height
            );

        function initialize() {
            u.fill(1);
            v.fill(0);

            for (
                let seed = 0;
                seed < 16;
                seed += 1
            ) {
                const centerX =
                    10
                    + Math.floor(
                        Math.random()
                        * (width - 20)
                    );

                const centerY =
                    10
                    + Math.floor(
                        Math.random()
                        * (height - 20)
                    );

                for (
                    let offsetY = -4;
                    offsetY <= 4;
                    offsetY += 1
                ) {
                    for (
                        let offsetX = -4;
                        offsetX <= 4;
                        offsetX += 1
                    ) {
                        const x =
                            centerX + offsetX;

                        const y =
                            centerY + offsetY;

                        const index =
                            y * width + x;

                        u[index] = 0;
                        v[index] = 1;
                    }
                }
            }
        }

        function laplacian(
            field,
            x,
            y
        ) {
            const left =
                (x - 1 + width) % width;

            const right =
                (x + 1) % width;

            const up =
                (y - 1 + height) % height;

            const down =
                (y + 1) % height;

            const centerIndex =
                y * width + x;

            return (
                field[y * width + left]
                + field[y * width + right]
                + field[up * width + x]
                + field[down * width + x]
                - 4 * field[centerIndex]
            );
        }

        function update() {
            for (
                let y = 0;
                y < height;
                y += 1
            ) {
                for (
                    let x = 0;
                    x < width;
                    x += 1
                ) {
                    const index =
                        y * width + x;

                    const currentU =
                        u[index];

                    const currentV =
                        v[index];

                    const reaction =
                        currentU
                        * currentV
                        * currentV;

                    nextU[index] =
                        currentU
                        + (
                            diffusionU
                            * laplacian(u, x, y)
                            - reaction
                            + feed
                            * (1 - currentU)
                        ) * dt;

                    nextV[index] =
                        currentV
                        + (
                            diffusionV
                            * laplacian(v, x, y)
                            + reaction
                            - (feed + kill)
                            * currentV
                        ) * dt;
                }
            }

            const oldU = u;
            u = nextU;
            nextU = oldU;

            const oldV = v;
            v = nextV;
            nextV = oldV;
        }

        function draw() {
            for (
                let index = 0;
                index < size;
                index += 1
            ) {
                const intensity =
                    Math.min(
                        1,
                        Math.max(
                            0,
                            v[index] * 2.5
                        )
                    );

                const pixel =
                    index * 4;

                image.data[pixel] =
                    10 + intensity * 60;

                image.data[pixel + 1] =
                    16 + intensity * 190;

                image.data[pixel + 2] =
                    32 + intensity * 220;

                image.data[pixel + 3] =
                    255;
            }

            context.putImageData(
                image,
                0,
                0
            );
        }

        function animate() {
            for (
                let step = 0;
                step < 6;
                step += 1
            ) {
                update();
            }

            draw();

            requestAnimationFrame(
                animate
            );
        }

        initialize();
        draw();

        requestAnimationFrame(
            animate
        );
    }
);