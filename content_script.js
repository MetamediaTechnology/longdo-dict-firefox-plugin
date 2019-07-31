
browser.storage.local.get("tt", function (items) {

    if (items.tt == "on") {
        console.log("Tooltip is on")

        document.addEventListener('dblclick', showMeaning);
        document.addEventListener('click', removeMeaning);
    } else {
        console.log("Tooltip is off")
    }
});

var createdDiv;
function showMeaning(event) {
    var info = getSelectionInfo(event);
    if (!info) {
        return;
    }
    sendRequest(info);
    createDiv(info);
    console.log(url)
}


function getSelectionInfo(event) {
    var text;
    var boundingRect;
    var ifZero = {};

    if (window.getSelection().toString().length > 1) {
        text = (document.all) ? document.selection.createRange().text.toString() : document.getSelection().toString();
        boundingRect = getSelectionCoords(window.getSelection());
    } else {
        return null;
    }

    var top = boundingRect.top + window.scrollY;
    var bottom = boundingRect.bottom + window.scrollY;
    var left = boundingRect.left + window.scrollX;

    if (boundingRect.height == 0) {
        top = event.pageY;
        bottom = event.pageY;
        left = event.pageX;
    }

    var toReturn = {
        top: top,
        bottom: bottom,
        left: left,
        text: text,
        clientY: event.clientY,
        height: boundingRect.height
    };
    return toReturn;
}

var url;
function sendRequest(info) {
    url = "https://dict.longdo.com/mobile.php?search=" + info.text;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true); // true for asynchronous request
    xmlHTTP.send();
}

function createDiv(info) {
    var hostDiv = document.createElement("div");
    hostDiv.id = "SDiv"
    hostDiv.className = "dictionaryDiv";
    hostDiv.style.left = info.left - 10 + "px";
    hostDiv.style.position = "absolute";
    hostDiv.attachShadow({ mode: 'open' });

    var shadow = hostDiv.shadowRoot;
    var style = document.createElement("style");
    style.textContent = ".popups{background:#fff;position:absolute;z-index:110;-webkit-box-shadow:0 30px 90px -20px rgba(0,0,0,0.3),0 0 1px #a2a9b1;box-shadow:0 30px 90px -20px rgba(0,0,0,0.3),0 0 1px #a2a9b1;padding:0;min-width:384px;border-radius:2px}.popups.mwe-popups-is-not-tall{width:384px}.popups .mwe-popups-container{text-decoration:none}.popups.mwe-popups-is-not-tall .popups-extract{min-height:40px;max-height:140px;overflow:hidden;margin-bottom:47px;padding-bottom:0}.popups .mwe-popups-extract{;display:block;color:#222;text-decoration:none;position:relative} .popups.flipped_y:before{content:'';position:absolute;border:8px solid transparent;border-bottom:0;border-top:8px solid #a2a9b1;bottom:-8px;left:10px}.popups.flipped_y:after{content:'';position:absolute;border:11px solid transparent;border-bottom:0;border-top:11px solid #fff;bottom:-7px;left:7px} .popups.mwe-popups-no-image-tri:before{content:'';position:absolute;border:8px solid transparent;border-top:0;border-bottom:8px solid #a2a9b1;top:-8px;left:10px}.popups.mwe-popups-no-image-tri:after{content:'';position:absolute;border:11px solid transparent;border-top:0;border-bottom:11px solid #fff;top:-7px;left:7px}";
    shadow.appendChild(style);

    var popupDiv = document.createElement("div");
    popupDiv.style = "border-radius: 4px";
    shadow.appendChild(popupDiv);

    var contentContainer = document.createElement("div");
    contentContainer.className = "mwe-popups-container";
    popupDiv.appendChild(contentContainer);

    var content = document.createElement("div");
    content.className = "mwe-popups-extract ";
    content.style = "margin-top: 0px; margin-bottom: 0px; max-height: none";
    contentContainer.appendChild(content);


    var meaning = document.createElement("iframe");
    meaning.id = "myIframe";
    meaning.style = "border:none;height:512px;width:384px;";
    meaning.textContent = "Please Wait...";
    meaning.src = url;
    
    content.appendChild(meaning);
    document.body.appendChild(hostDiv);

    if (info.clientY < window.innerHeight / 2) {
        popupDiv.className = "popups mwe-popups-no-image-tri mwe-popups-is-not-tall";
        hostDiv.style.top = info.bottom + 10 + "px";
        if (info.height == 0) {
            hostDiv.style.top = parseInt(hostDiv.style.top) + 8 + "px";
        }
    } else {
        popupDiv.className = "popups flipped_y mwe-popups-is-not-tall";
        hostDiv.style.top = info.top - 10 - popupDiv.clientHeight + "px";
        if (info.height == 0) {
            hostDiv.style.top = parseInt(hostDiv.style.top) - 8 + "px";
        }
    }

    return { meaning: meaning };

}



function getSelectionCoords(selection) {
    var oRange = selection.getRangeAt(0); //get the text range
    var oRect = oRange.getBoundingClientRect();
    return oRect;
}



function noMeaningFound(createdDiv) {

    createdDiv.meaning.textContent = "No definition found.";
}

function removeMeaning(event) {
    var element = event.target;
    if (!element.classList.contains("dictionaryDiv")) {
        document.querySelectorAll(".dictionaryDiv").forEach(function (Node) {
            Node.remove();
        });
    }
}
