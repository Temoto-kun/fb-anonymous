chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { action: 'toggle' })
    //chrome.storage.local.get(tab.url, (items) => {
    //    if (chrome.runtime.lastError) {
    //        return
    //    }
    //    chrome.storage.local.set({ 'fb-anonymous': !items['fb-anonymous'] }, () => {
    //        chrome.storage.local.get(tab.url, (items) => {
    //            console.log(items)
    //        })
    //    })
    //})
})
