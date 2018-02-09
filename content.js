(() => {
    function load() {
        window.document.documentElement.classList.add('fb-anonymous')
    }

    function unload() {
        window.document.documentElement.classList.remove('fb-anonymous')
    }

    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === 'toggle') {
            chrome.storage.local.get((items) => {
                if (chrome.runtime.lastError) {
                    return
                }

                if (typeof items.hide === 'undefined') {
                    items.hide = false
                }

                let newState = !items.hide

                chrome.storage.local.set({ hide: newState }, () => {
                    if (newState) {
                        load()
                        return
                    }
                    unload()
                })
            })
        }
    })

    chrome.storage.local.get((fb) => {
        if (chrome.runtime.lastError) {
            return
        }
        if (fb.hide) {
            load()
        }
    })
})()
