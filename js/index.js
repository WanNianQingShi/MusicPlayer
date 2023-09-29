var package;
var running;
window.oncontextmenu = function (e) {
    e.preventDefault();
}

window.onload = function () {
    initialize();
    menuPervent();
    getTime()

    var GT=setInterval(getTime, 2000);
    //setInterval(addMDUI, 2000);   
    addEmptyBox()
    //getExpandList();

    //App Debug Region


    //
    addSubmitListener()

    addPlayerManager()
    

    //
    const range = document.querySelector('ion-range');
    range.pinFormatter = (value) => {
      return `${value}%`;
    };

    var mySwiper = new Swiper('.swiper-container')

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
function addMDUI(){
    document.querySelectorAll("button").forEach(item => item.classList.add("mdui-ripple","mdui-ripple-white"));
}


function setRightSlideClosePage() {
    var startX = 0;

    document.onmousedown = function (downEvent) {
        var pages = document.querySelectorAll(".page");
        var currentPage = pages[pages.length - 1];

        if (downEvent.clientX < document.documentElement.clientWidth * 0.1 && currentPage.style.display === "block") {
            startX = downEvent.clientX;

            document.onmousemove = function (moveEvent) {
                var deltaX = moveEvent.clientX - startX;
                currentPage.style.marginLeft = deltaX + "px";
                
            };

            document.onmouseup = function (upEvent) {
                var deltaXRounded = upEvent.clientX - startX;
                var threshold = document.documentElement.clientWidth * 0.5;

                if (deltaXRounded >= threshold) {
                    currentPage.style.marginLeft = "100%";
                    setTimeout(function () {
                        currentPage.remove();
                    }, 500); 
                } else {
                    currentPage.style.marginLeft = "2.5%";
                }

                document.onmousemove = null; 
                document.onmouseup = null; 
            };
        }
    };
}

function initialize() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

            package = JSON.parse(ajax.responseText);
            //初次加载时执行
            setAppInfo();
            setDispalyLayout();
            
            
        }
    }
    ajax.open("GET", "./data/package.json", true);
    ajax.send();
}

function setAppInfo() {
    //当应用首次打开是执行
    console.log(package)
    echoid("app-name", package.appname)
}

function setDispalyLayout() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var headh = package.headHeight;
    document.getElementById("home").style.height = h * 0.99 + "px";
    document.getElementById("head").style.height = headh * 100 + "%";
    document.getElementById("home-body").style.height = (1 - headh) * 100 + "%";

    document.querySelectorAll(".page").forEach(function (item) {
        item.style.height = h * 0.99 + "px";
    })
    document.querySelectorAll(".page-head").forEach(function (item) {
        item.style.height = headh * 100 + "%";
    })
    document.querySelectorAll(".page-body").forEach(function (item) {
        item.style.height = (1 - headh) * 100 + "%"
    });

    //当class为page-name的元素被点击时删除父级元素

}

function menuPervent() {
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
    // document.addEventListener('touchstart', function (event) {
    //     if (event.touches.length >= 2) {
    //         event.preventDefault();
    //     }
    // })
    // document.addEventListener('touchmove', function (event) {
    //     if (event.touches.length >= 2) {
    //         event.preventDefault();
    //     }
    // })
    // document.addEventListener('touchend', function (event) {
    //     if (event.touches.length >= 2) {
    //         event.preventDefault();
    //     }
    // })
}

function clonePage(id) {
    var page = document.getElementById(id);
    var clone = page.cloneNode(true);
    clone.style.display = "block";
    //clone.style.animation="page-appear";
    document.body.appendChild(clone);
    document.querySelectorAll(".page-name").forEach(function (item) {
        item.addEventListener("click", function () {
            //点击page-name是关闭该页面
            item.parentElement.parentElement.style.left = "120%";
            /* setTimeout(function () { item.parentElement.parentElement.remove(); }, 350); */
            setTimeout(function () { item.parentElement.parentElement.style.display=`none`; }, 350);



        })
    })

}

function showPage(id){
    document.getElementById(id).style.left = "0";
    document.getElementById(id).style.display=`block`;
    document.querySelectorAll(".page-name").forEach(function (item) {
        item.addEventListener("click", function () {
            //点击page-name是关闭该页面
            item.parentElement.parentElement.style.left = "120%";
            /* setTimeout(function () { item.parentElement.parentElement.remove(); }, 350); */
            setTimeout(function () { item.parentElement.parentElement.style.display=`none`; }, 350);



        })
    })
}
function addEmptyBox(){
    document.querySelectorAll(".page").forEach(item=>{
        item.children[1].insertAdjacentHTML("beforeend",`<div class="empty-box"></div>`)
    })
}

function getTime() {
    var time = new Date;
    var h = time.getHours();
    var min = time.getMinutes();
    if (h < 10) { h = `0${h}` }
    if (min < 10) { min = `0${min}` }
    var out = h + ":" + min+"&nbsp";
    echoid("time", out);
}

function echoid(id, string) {
    document.getElementById(id).innerHTML = string;
}

function preventEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
}
