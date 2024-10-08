javascript:(function(){
    var v = document.querySelectorAll('video');
    if (v.length === 0) {
        return;
    }
    function removeButtons() {
        var b = document.querySelectorAll('.screenshot-button');
        b.forEach(function(button) {
            button.remove();
        });
    }
    v.forEach(function(video) {
        var b = document.createElement('button');
        b.innerText = '📸';
        b.className = 'screenshot-button'; 
        b.style.position = 'absolute';
        b.style.zIndex = '9999';
        b.style.top = video.getBoundingClientRect().top + window.scrollY + 'px';
        b.style.left = video.getBoundingClientRect().left + window.scrollX + 'px';
        b.style.backgroundColor = 'red';
        b.style.color = 'white';
        b.style.border = 'none';
        b.style.padding = '5px';
        b.style.cursor = 'pointer';

        b.onclick = function() {
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            var imgData = canvas.toDataURL('image/png');
            var newWindow = window.open();
                       newWindow.document.write('<img src="' + imgData + '" id="screenshotImg"/>');
			removeButtons();
        };

        document.body.appendChild(b);
    });
})();
