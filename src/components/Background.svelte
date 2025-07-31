<script>
    import { onMount } from 'svelte';
    import { watchResize } from "svelte-watch-resize";
    var canvas;
    var innerWidth;
    var innerHeight;

    function draw_background() {
        let width = canvas.width;
        let height = canvas.height;
        let ctx = canvas.getContext("2d");
        let image_data = ctx.createImageData(width, height);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var index = (y * width + x) * 4;

                if (x % 2 == 0 && y % 2 != 0) {
                    image_data.data[index] = 0;
                    image_data.data[index+1] = 0;
                    image_data.data[index+2] = 0;
                    image_data.data[index+3] = 255;
                } else {
                    image_data.data[index] = 255;
                    image_data.data[index+1] = 255;
                    image_data.data[index+2] = 255;
                    image_data.data[index+3] = 255;
                }
            }
        }

        ctx.putImageData(image_data, 0, 0);
    }

    onMount(() => {
        draw_background();
    });
</script>
<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight} />
<canvas class="fixed w-screen h-screen z-[-9]" width="{innerWidth}" height="{innerHeight}" bind:this={canvas} use:watchResize={draw_background}></canvas>