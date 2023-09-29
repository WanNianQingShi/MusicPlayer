

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
function changePlaybackSpeed() {
   var speedSelect = document.getElementById("speed-select");
   var selectedSpeed = speedSelect.options[speedSelect.selectedIndex].value;
   var audio = document.getElementById("play-kit");
   audio.playbackRate = selectedSpeed; // 设置播放速度
 }
 
 function toggleLoop() {
   var loopCheckbox = document.getElementById("loop-checkbox");
   var audio = document.getElementById("play-kit");
   audio.loop = loopCheckbox.checked; // 切换循环播放状态
 }
 
 function changePlayerStyle() {
   var styleSelect = document.getElementById("style-select");
   var selectedStyle = styleSelect.options[styleSelect.selectedIndex].value;
   // 在这里根据选择的样式执行相应的逻辑
   if (selectedStyle === "default") {
     // 使用默认样式
   } else if (selectedStyle === "dark") {
     // 使用黑暗样式
   } else if (selectedStyle === "light") {
     // 使用亮白样式
   }
 }
 
 
 function changeVolume() {
   var volumeSlider = document.getElementById("volume-slider");
   var volume = volumeSlider.value;
   var audio = document.getElementById("play-kit");
   audio.volume = volume; // 设置音量
 }
    function toggleLoop() {
  var loopCheckbox = document.getElementById("loop-checkbox");
  var audio = document.getElementById("play-kit");
  audio.loop = loopCheckbox.checked; // 切换循环播放状态
}

function toggleMute() {
  var muteCheckbox = document.getElementById("mute-checkbox");
  var audio = document.getElementById("play-kit");
  audio.muted = muteCheckbox.checked; // 切换静音状态
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
