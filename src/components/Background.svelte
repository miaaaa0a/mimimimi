<script>
    import { onMount } from 'svelte';
    var canvas;
    var innerWidth;
    var innerHeight;

    function draw_background() {
        let ctx = canvas.getContext("2d");
        
        let patternCanvas = document.createElement('canvas');
        patternCanvas.width = 4;
        patternCanvas.height = 4;
        let pCtx = patternCanvas.getContext('2d');
        
        pCtx.fillStyle = 'black';
        pCtx.fillRect(0, 0, 1, 2);
        pCtx.fillRect(2, 2, 1, 2);
        pCtx.fillStyle = 'white';
        pCtx.fillRect(1, 0, 1, 2);
        pCtx.fillRect(3, 2, 1, 2);
        
        let pattern = ctx.createPattern(patternCanvas, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(draw_background);
    }

    onMount(() => {
        requestAnimationFrame(draw_background);
    });
</script>
<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight} />
<canvas class="fixed w-screen h-screen z-[-9]" width="{innerWidth}" height="{innerHeight}" bind:this={canvas}></canvas>