document.addEventListener("DOMContentLoaded", function () {
    var attempts = 50;
    var showDelay = 1200;
    var hideDelayMin = 500;
    var hideDelayMax = 2500;
    var catchDelay = 500;
    var targetSize = 12;
    var targetBgColor = "#cc0000";
    var targetHighlightBgColor = "#ff0000";
    var targetOn = true;

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
    function getTargetTop()
    {
        var pTop = 0;
        do {
            pTop = Math.round(Math.random() * 2000);
        } while ((pTop + targetSize) > getClientHeight());
        return pTop;
    }
    function getTargetLeft()
    {
        var pLeft = 0;
        do {
            pLeft = Math.round(Math.random() * 2000);
        } while ((pLeft + targetSize) > getClientWidth());
        return pLeft;
    }
    function getTargetHideDelay()
    {
        var delay = hideDelayMax;
        do {
            delay = Math.round(Math.random() * hideDelayMax);
        } while (delay > hideDelayMax || delay < hideDelayMin);
        return delay;
    }
    function switchTarget()
    {
        if (!targetOn) {
            attemptCounter++;
            
            point.style.display = "block";
            targetOn = true;
            
            timeoutId = setTimeout(switchTarget, showDelay)
            
            return;
        }
        
        point.style.display = "none";
        point.style.backgroundColor = targetBgColor;
        point.style.width = targetSize + "px";
        point.style.height = targetSize + "px";
        targetOn = false;
        
        if (attemptCounter >= attempts) {
            clearTimeout(timeoutId);
            var s = getTitle();
            document.title = s;
            alert(s);
            return;
        }
        
        point.style.left = getTargetLeft() + "px";
        point.style.top = getTargetTop() + "px";
        timeoutId = setTimeout(switchTarget, getTargetHideDelay())
        
        document.title = getTitle();
    }
    function catchTarget()
    {
        clearTimeout(timeoutId);
        catchCounter++;
        document.title = getTitle();
        point.style.display = "block";
        point.style.backgroundColor = targetHighlightBgColor;
        point.style.width = (targetSize * 4) + "px";
        point.style.height = (targetSize * 4) + "px";
        point.style.left = (parseInt(point.style.left, 10) - targetSize) + "px";
        point.style.top = (parseInt(point.style.top, 10) - targetSize) + "px";
        timeoutId = setTimeout(switchTarget, catchDelay);
    }
    function init()
    {
        alert("Lets begin");
        point = document.getElementById("point");
        point.addEventListener("click", catchTarget);
        switchTarget();
    }
    
    init();
});
