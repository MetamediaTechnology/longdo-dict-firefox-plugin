var url, text, recentSearch;
document.getElementById('btn').addEventListener('click', function () {
    textDefinition(document.getElementById('query').value);

});

document.getElementById('query').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        textDefinition(document.getElementById('query').value);
    }
});

recentSearch = localStorage.getItem("recentSearchText");

function textDefinition(searchText) {
    searchText = (searchText || "").toString().trim();
    // skip search on multi words select
    if (/\s+/.test(searchText)) {
        return;
    }
    localStorage.setItem("recentSearchText", searchText);
    getDefinition(searchText);
}

function getDefinition(text) {
    url = "https://dict.longdo.com/mobile.php?search=" + text;
    biframe(url)
};

function biframe(url) {

    var iframe = document.createElement("iframe");
    iframe.id = "myframe"
    iframe.src = url;
    iframe.style = "border:none;height:384px;width:97%;";
    iframe.textContent = "Please Wait...";
    document.body.removeChild(document.body.lastChild)
    document.body.appendChild(iframe)
}

