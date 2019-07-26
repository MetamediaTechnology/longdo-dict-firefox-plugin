// create a context menu
browser.contextMenus.create({
  id: "longdo",
  title: "Translate in Longdo",
  contexts: ["all"]
});

//add action listener to the context menu
browser.contextMenus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info, tab) {
  const url = "https://dict.longdo.com/mobile/?search=" + info.selectionText;
  
  browser.windows.create({
    'url': url, 
    'type': 'popup', 
    height: 500,
    width: 400
  });
  window.close();

}





