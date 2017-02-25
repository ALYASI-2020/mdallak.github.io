function override() {
    
    **
    
    var elements = document.getElementsByClassName(elementsRaw[0]);
    var i = 1;
    while (elements.length == 0) {
        var className = elementsRaw[i];
        i++;
        if (!className.length) {
            return;
        }
        elements = document.getElementsByClassName(className);
        console.log(elements);
    }
    
    if (elements.length == 0) {
        return;
    }
    
    var element = elements[0];
    var retina = window.devicePixelRatio > 1;
    var img = (retina ? 'url(https://j-gessner.de/cydia/protube/images/PTSwatchHD.png)' : 'url(https://j-gessner.de/cydia/protube/images/PTSwatchSD.png)');
    if (element.style.backgroundImage != img) {
        element.style.backgroundImage = img;
    }
    if (element.style.backgroundPosition != '0px 0px') {
        element.style.backgroundPosition = '0px 0px';
    }
    if (element.style.backgroundSize != '100%') {
        element.style.backgroundSize = '100%';
    }
}

override();
