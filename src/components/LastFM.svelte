<script>
    import { onMount } from 'svelte';
    import toAscii from './ascii.js';

    let response = $state({
        now_playing: {
            name: "Exampler",
            artist: {
                name: "The Examples"
            }
        },
        scrobbles: [
            {
                image: [
                    {
                        url: "https://files.catbox.moe/tv7080.gif"
                    }
                ],
                artist: {
                    name: "The Examples"
                },
                name: "Exampler",
                dateAdded: "apr 20th, 2025"
            }
        ]
    });
    let songTitle = $state('The Examples');
    let songArtist = $state('Exampler');
    let scrobbleDate = $state('playing now!!');
    let cover;

    let scrobbles;

    function main() {
        fetch("/api/lastfm")
        .then(async function (request) {
            response = await request.json();

            songTitle = response.now_playing.name;
            songArtist = response.now_playing.artist.name;
            scrobbleDate ||= response.now_playing.dateAdded;
            
            let coverUrl = response.now_playing.image.at(-1).url;
            toAscii(coverUrl, cover);
        })
        .catch(function (error) {
            console.error('error during api request: ', error);
        // TRULY STRAW HUT PRODUCTION
        }).finally(() => {
            scrobbles.style = "";
        });
    }

    onMount(() => {
        // marvels of straw engineering right here
        scrobbles.style = "height: 12px";
        main();
    });
</script>

<div class="flex items-center justify-center p-5">
    <div class="w-3/4 bg-white">
	    <!-- title bar -->
		<div class="h-5 bg-black">
			<p class="text-white font-[Cozette]">
				&lt;&lt; LAST.FM &gt;&gt;
			</p>
		</div>

		<!-- content div -->
		<div class="console-border text-black font-[Cozette] leading-none" bind:this={scrobbles}>
            <div class="lfm">
                <p class="text-nowrap" bind:this={cover}></p>
                <div>
                    <p>===</p>
                    <div>
                        <p class="bolder">{songTitle}</p>
                        <p>
                            <span class="bg-black text-white bolder">{songArtist}</span>
                        </p>
                        <p>{scrobbleDate}</p>
                        <p>===</p>
                    </div>
                    {#each response.scrobbles as s}
                    <div>
                        <p>{s.name}</p>
                        <p>
                            <span class="bg-black text-white">{s.artist.name}</span>
                        </p>
                        <p>{s.dateAdded}</p>
                        <p>===</p>
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>