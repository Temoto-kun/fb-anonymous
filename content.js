(() => {
    function deploy() {
        let head = document.getElementsByTagName('head')[0]
        let fbAnonymous = document.createElement('style')
        fbAnonymous.setAttribute('id', 'fb-anonymous')
        fbAnonymous.innerHTML = `
.fb-anonymous #fb-timeline-cover-name {
  display: none !important;
}

.fb-anonymous .profileLink {
  display: none !important;
}

.fb-anonymous .UFICommentActorName {
  display: none !important;
}

.fb-anonymous ._50f3 {
  display: none !important;
}

.fb-anonymous .fwb {
  display: none !important;
}

.fb-anonymous ._1vp5 {
  display: none !important;
}

.fb-anonymous ._55lr {
  display: none !important;
}

.fb-anonymous #userNav .linkWrap {
  display: none !important;
}

.fb-anonymous .titlebarText.fixemoji {
  display: none !important;
}

.fb-anonymous .author.fixemoji
`
        head.appendChild(fbAnonymous)
    }

    function load() {
        console.log('load')
        window.document.documentElement.classList.add('fb-anonymous')
    }

    function unload() {
        console.log('load')
        window.document.documentElement.classList.remove('fb-anonymous')
    }

    chrome.storage.onChanged.addListener((change, which) => {
        console.log(change, which)
        if (which !== 'local') {
            return
        }

        console.log('FB ANONYMOUS', change)

        if (change['fb-anonymous'].newValue) {
            load()
            return
        }
        unload()
    })

    chrome.storage.local.get('fb-anonymous', (fb) => {
        if (chrome.runtime.lastError || !fb.hide) {
            return
        }
        load()
    })

    deploy()
    chrome.runtime.getBackgroundPage((window) => {
        let chrome = window.chrome

        console.log('FB ANONYMOUS', window)

        chrome.browserAction.onClicked.addListener((tab) => {
            chrome.storage.local.get(tab.url, (items) => {
                if (chrome.runtime.lastError) {
                    return
                }
                chrome.storage.local.set({ 'fb-anonymous': !items['fb-anonymous'] }, () => {
                    chrome.storage.local.get(tab.url, (items) => {
                        console.log(items)
                    })
                })
            })
        })
    })
    console.log('FB ANONYMOUS')
})()
