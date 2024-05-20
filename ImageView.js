javascript: function addButtonToImages() {
    const images = document.getElementsByTagName('img');
	const excludeAlts = ["Profilbild"];
    for (let i = 0; i < images.length; i++) {
        const image = images[i];	
		let a = image.alt || '';
        let t = a.split(' ');
        let n = false;
        for (let j = 0; j < t.length; j++) {
            if (excludeAlts.includes(t[j])) {
                n = true;
                break;
            }
        }
        if (n) {
            continue;
        }
        if (!image.nextElementSibling || !image.nextElementSibling.classList.contains('image-button-container')) {
            const c = document.createElement('div');
            c.classList.add('image-button-container');  
            const oB = document.createElement('button');
            oB.style.position = 'absolute';         
            oB.style.left = '0px';
            oB.style.zIndex = '9999';
            oB.innerText = '🔎';
            oB.addEventListener('click', function () {
                openImageInNewTab(image.src);
            });
			const sB = document.createElement('button');
            sB.style.position = 'absolute';         
            sB.style.left = '25px';
            sB.style.zIndex = '9999';
            sB.innerText = '💾';
            sB.addEventListener('click', function () {
                saveImage(image.src);
            });
            c.appendChild(oB);
            c.appendChild(sB);
            image.parentNode.insertBefore(c, image.nextElementSibling);
            c.style.position = 'absolute';
            c.style.zIndex = '9999';
            c.style.left = '0px';
            c.style.top = '0px';
            c.style.height = '50px';
			
			if(window.location.hostname.includes('instagram')){
				c.style.top = '5px';
				c.style.left = '5px';
			}
        }
    }
}
function openImageInNewTab(imageUrl) {
    window.open(imageUrl, '_blank');
}
function saveImage(imageUrl){
	var filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1).split("?")[0];
	 if (!(/\.(jpg|jpeg|png|gif)$/i.test(filename))) {
        filename += ".png";
    }
	var xhr = new XMLHttpRequest();
    xhr.open("GET", imageUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (xhr.status === 200) {
            var blob = xhr.response;
            var a = document.createElement("a");
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            alert(":(");
        }
    };
    xhr.send();
}
setInterval(addButtonToImages, 10);
