document.addEventListener('DOMContentLoaded', function () {
    var size = 12;
    var attempts = 50;
    var show_delay = 1200;
    var min_hide_delay = 500;
    var max_hide_delay = 2500;
    var catch_delay = 500;

    var attempt_counter = 0;
    var catch_counter = 0;

    var point;
    var timeout_id;

    function getClientWidth()
    {
        return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
    }

    function getClientHeight()
    {
        return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
    }
    function getTitle()
    {
        var p = attempt_counter ? Math.round(catch_counter / attempt_counter * 100) : 0;
        return 'Catch: ' + catch_counter + ', total: ' + attempt_counter + '/' + attempts + ', ' + p + '%';
    }
    function Hide()
    {
        point.style.display = 'none';
        point.style.backgroundColor = '#cc0000';
        point.style.width = size + 'px';
        point.style.height = size + 'px';
        if (attempt_counter >= attempts) {
            var s = getTitle();
            document.title = s;
            alert(s);
            return;
        }
        var p_top = 0;
        var p_left = 0;
        do {
            p_top = Math.round(Math.random() * 2000);
        } while ((p_top + size) > getClientHeight());
        do {
            p_left = Math.round(Math.random() * 2000);
        } while ((p_left + size) > getClientWidth());
        point.style.left = p_left + 'px';
        point.style.top = p_top + 'px';
        var delay = max_hide_delay;
        do {
            delay = Math.round(Math.random() * max_hide_delay);
        } while (delay > max_hide_delay || delay < min_hide_delay);
        timeout_id = setTimeout(Show, delay);
        document.title = getTitle();
    }
    function Show()
    {
        attempt_counter++;
        point.style.display = 'block';
        timeout_id = setTimeout(Hide, show_delay);
    }
    function Catch()
    {
        clearTimeout(timeout_id);
        catch_counter++;
        document.title = getTitle();
        point.style.display = 'block';
        point.style.backgroundColor = '#ff0000';
        point.style.width = (size * 4) + 'px';
        point.style.height = (size * 4) + 'px';
        point.style.left = (parseInt(point.style.left) - size) + 'px';
        point.style.top = (parseInt(point.style.top) - size) + 'px';
        timeout_id = setTimeout(Hide, catch_delay);
    }
    function Init()
    {
        alert('Lets begin');
        point = document.getElementById('point');
        point.addEventListener('click', Catch);
        Hide();
    }
    
    Init();
});
