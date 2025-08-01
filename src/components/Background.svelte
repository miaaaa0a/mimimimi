<script>
    import { onMount } from 'svelte';
    var canvas;
    var innerWidth;
    var innerHeight;

    function draw_background() {
        let ctx = canvas.getContext("2d");
        
        let patternCanvas = document.createElement('canvas');
        patternCanvas.width = 2;
        patternCanvas.height = 2;
        let pCtx = patternCanvas.getContext('2d');
        
        pCtx.fillStyle = 'white';
        pCtx.fillRect(0, 0, 2, 2);
        pCtx.fillStyle = 'black';
        pCtx.fillRect(0, 1, 1, 1);
        
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