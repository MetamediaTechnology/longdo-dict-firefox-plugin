
var t

if (document.getElementById('tooltip-off').checked) {
    t = document.getElementById('tooltip-off').value;
    browser.storage.local.set({ tt: t })
}
    
document.getElementById('tooltip-save-btn').addEventListener('click', function () {
    if (document.getElementById('tooltip-on').checked) {
        t = document.getElementById('tooltip-on').value;
        browser.storage.local.set({ tt: t })

    } else {
        t = document.getElementById('tooltip-off').value;
        browser.storage.local.set({ tt: t })
    }
    alert("Tooltip is " + t )
})


