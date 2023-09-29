

function addSubmitListener() {
    document.querySelector(`#submit`).addEventListener('change', (event) => {

        if (event.target.files.length != 0) {
            clearInterval(running);
            document.getElementById(`music-list-root`).innerHTML = ``;
        }
        var file = event.target.files[0];
        var allFiles = Array.from(event.target.files);

        
        console.log(allFiles);
        //创建播放列表
        var ionList=document.createElement('ion-list');
    
        allFiles.forEach((item) => {
            var obj = document.createElement('ion-item');     
            ionList.appendChild(obj);
            obj.innerHTML = item.name;
            obj.addEventListener('click', function () {
                clearInterval(running);
                //
                document.getElementById(`music-list`).style.left = "120%";
                setTimeout(function () { document.getElementById(`music-list`).style.display = `none`; }, 350);
                //
                var url = URL.createObjectURL(item);
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
                document.getElementById("song-name").innerHTML = item.name
                document.getElementById("singer").innerHTML = item.type
                console.log(url)
            })
            document.getElementById(`music-list-root`).insertAdjacentElement("beforeend", ionList);
        })


        //console.log(file)
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
function toggleLoop() {
  var loopCheckbox = document.getElementById("loop-checkbox");
  // 在这里添加循环播放的逻辑
}

function toggleMute() {
  var muteCheckbox = document.getElementById("mute-checkbox");
  // 在这里添加静音的逻辑
}

function changePlayerStyle() {
  var styleSelect = document.getElementById("style-select");
  var selectedStyle = styleSelect.value;
  // 在这里根据选择的样式更改播放器的外观
}

function changePlaybackSpeed() {
  var speedSelect = document.getElementById("speed-select");
  var selectedSpeed = speedSelect.value;
  // 在这里根据选择的速度更改播放器的播放速度
}

function changeVolume() {
  var volumeSlider = document.getElementById("volume-slider");
  var volumeValue = volumeSlider.value;
  // 在这里根据滑块的值更改播放器的音量
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
