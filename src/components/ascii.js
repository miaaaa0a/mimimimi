export default function toAscii(url, el) {
    var img = new Image;
    img.src = url;
    // this is specifically so the Operation isnt Insecure and the Canvas isnt Tainted
    img.crossOrigin = "Anonymous";

    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.display = 'none';
    var ctx = canvas.getContext("2d");

    img.onload = () => {
        const width = 44;
        const height = 22;

        ctx.drawImage(img, 0, 0, width, height);
        let data = ctx.getImageData(0, 0, width, height);
        let pixels = data.data;

        let lines = [];
        let line = "";
        let chars = " .,:iгl1owжWЖ";

        for (var i = 0; i < pixels.length; i += 4) {
            if (i % (width*4) == 0) {
                lines.push(line);
                line = "";
            }

            let lightness = parseInt(pixels[i]*.299 + pixels[i + 1]*.587 + pixels[i + 2]*.114);
            let index = Math.ceil(
                (255 - lightness) * (chars.length-1) / 255
            );
            let c = chars[index].replace(" ", "&nbsp;");
            line += c;
        }

        el.innerHTML = lines.slice(1).map(i => `<p>${i}&nbsp;</p>`).join('');
        canvas.remove();
    };
}