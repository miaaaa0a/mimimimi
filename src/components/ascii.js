export default function toAscii(url, el) {
    var img = new Image;
    img.src = url;
    // this is specifically so the Operation isnt Insecure and the Canvas isnt Tainted
    img.crossOrigin = "Anonymous";

    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.display = 'none';
    var ctx = canvas.getContext("2d");

    // load le image
    img.onload = () => {
        const width = 44;
        const height = 22;
        ctx.drawImage(img, 0, 0, width, height);
        // convert le image to le grayscale
        let data = ctx.getImageData(0, 0, width, height);
        let pixels = data.data;
        let lines = [];
        let line = "";

        // https://stackoverflow.com/a/67780964
        let chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

        for (var i = 0; i < pixels.length; i += 4) {
            if (i % (width*4) == 0) {
                lines.push(line);
                line = "";
            }
            let lightness = parseInt(pixels[i]*.299 + pixels[i + 1]*.587 + pixels[i + 2]*.114);
            let percentage = lightness * 100 / 255;
            let index = Math.ceil(percentage * (chars.length-1) / 100);
            console.log(index)
            let c = chars[index].replace("<", "&lt;").replace(">", "&gt;").replace(" ", "&nbsp;");
            line += c;
        }

        // Fuckery
        let hteemeel = "";
        lines.shift();
        lines.forEach((i) => {
            hteemeel += `<p>${i}&nbsp;</p>`;
        });
        el.innerHTML = hteemeel;
    };
}