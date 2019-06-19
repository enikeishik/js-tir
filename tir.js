document.addEventListener("DOMContentLoaded", function () {
    var size = 12;
    var attempts = 50;
    var showDelay = 1200;
    var hideDelayMin = 500;
    var hideDelayMax = 2500;
    var catchDelay = 500;

    var attemptCounter = 0;
    var catchCounter = 0;

    var point;
    var timeoutId;

    function getClientWidth()
    {
        return document.compatMode==="CSS1Compat" && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
    }

    function getClientHeight()
    {
        return document.compatMode==="CSS1Compat" && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
    }
    function getTitle()
    {
        var p = attemptCounter ? Math.round(catchCounter / attemptCounter * 100) : 0;
        return "Catch: " + catchCounter + ", total: " + attemptCounter + "/" + attempts + ", " + p + "%";
    }
    function Hide()
    {
        point.style.display = "none";
        point.style.backgroundColor = "#cc0000";
        point.style.width = size + "px";
        point.style.height = size + "px";
        if (attemptCounter >= attempts) {
            var s = getTitle();
            document.title = s;
            alert(s);
            return;
        }
        var pTop = 0;
        var pLeft = 0;
        do {
            pTop = Math.round(Math.random() * 2000);
        } while ((pTop + size) > getClientHeight());
        do {
            pLeft = Math.round(Math.random() * 2000);
        } while ((pLeft + size) > getClientWidth());
        point.style.left = pLeft + "px";
        point.style.top = pTop + "px";
        var delay = hideDelayMax;
        do {
            delay = Math.round(Math.random() * hideDelayMax);
        } while (delay > hideDelayMax || delay < hideDelayMin);
        timeoutId = setTimeout(Show, delay);
        document.title = getTitle();
    }
    function Show()
    {
        attemptCounter++;
        point.style.display = "block";
        timeoutId = setTimeout(Hide, showDelay);
    }
    function Catch()
    {
        clearTimeout(timeoutId);
        catchCounter++;
        document.title = getTitle();
        point.style.display = "block";
        point.style.backgroundColor = "#ff0000";
        point.style.width = (size * 4) + "px";
        point.style.height = (size * 4) + "px";
        point.style.left = (parseInt(point.style.left, 10) - size) + "px";
        point.style.top = (parseInt(point.style.top, 10) - size) + "px";
        timeoutId = setTimeout(Hide, catchDelay);
    }
    function Init()
    {
        alert("Lets begin");
        point = document.getElementById("point");
        point.addEventListener("click", Catch);
        Hide();
    }
    
    Init();
});
