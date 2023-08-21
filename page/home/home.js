

function addSubmitListener() {
    document.getElementById("submit").addEventListener('change', (event) => {
        
        if(event.target.files.length!=0) {clearInterval(running);}
        var file = event.target.files[0];
        console.log(file)
        var url = URL.createObjectURL(file);
        var kit = document.getElementById("play-kit")
        kit.setAttribute("src", url);
        kit.play();
        document.getElementById('play').innerHTML = "<i class='bi bi-pause-fill' style='font-size:60px'></i>"

        running = setInterval(function () {
            var kit = document.getElementById("play-kit")
            var current = kit.currentTime;
            var duration = kit.duration;
            var percent = (current / duration) * 100;
            //console.log(percent)
            percent.toString()
            document.getElementById("slider").value = percent
            //console.log(document.activeElement)

        }, 100)
        document.getElementById("song-name").innerHTML = file.name
        document.getElementById("singer").innerHTML = file.type
        console.log(url)
        
    }, false)
}



function addPlayerManager() {
    document.getElementById("slider").ontouchstart = function () {
        clearInterval(running);

    }

    document.getElementById("slider").ontouchend = function () {
        var kit = document.getElementById("play-kit")
        kit.currentTime = (document.getElementById("slider").value / 100) * kit.duration
        running = setInterval(function () {
            var kit = document.getElementById("play-kit")
            var current = kit.currentTime;
            var duration = kit.duration;
            var percent = (current / duration) * 100;
            //console.log(percent)
            percent.toString()
            document.getElementById("slider").value = percent
            //console.log(document.activeElement)

        }, 100)
    }

    document.getElementById("play").addEventListener("click", function () {
        var kit = document.getElementById("play-kit");

        if (kit.paused == true) {
            document.getElementById('play').innerHTML = "<i class='bi bi-pause-fill' style='font-size:60px'></i>"
            kit.play();
        }
        else {
            kit.pause();
            document.getElementById('play').innerHTML = "<i class='bi bi-play-fill' style='font-size:60px'></i>"
        }
    });
}
