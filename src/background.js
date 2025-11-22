const GLOBAL_BASE = "https://mahjongsoul.game.yo-star.com/";
const KR_BASE = "https://mahjongsoul.game.yo-star.com/kr/index.html";
const JP_BASE = "https://game.mahjongsoul.com/";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading' && tab.url) {
        checkAndRedirect(tabId, tab.url);
    }
});

function checkAndRedirect(tabId, urlStr) {
    try {
        const url = new URL(urlStr);

        // Check if it's one of the Mahjong Soul domains
        const isGlobal = url.hostname === 'mahjongsoul.game.yo-star.com';
        const isJP = url.hostname === 'game.mahjongsoul.com';

        if (!isGlobal && !isJP) return;

        const hasRoom = url.searchParams.has('room');
        const hasPaipu = url.searchParams.has('paipu');

        if (!hasRoom && !hasPaipu) return;

        chrome.storage.local.get(['targetServer'], function (result) {
            let targetServer = result.targetServer;

            // Handle migration or default
            if (!targetServer) {
                chrome.storage.local.get(['targetKR'], function (oldResult) {
                    targetServer = (oldResult.targetKR !== undefined && oldResult.targetKR) ? 'kr' : 'global';
                    // If we don't save it here, next time it will check again. It's fine.
                    performRedirect(tabId, url, targetServer);
                });
            } else {
                performRedirect(tabId, url, targetServer);
            }
        });
    } catch (e) {
        console.error("Invalid URL:", urlStr);
    }
}

function performRedirect(tabId, currentUrl, targetServer) {
    let newUrlStr = "";
    const search = currentUrl.search;

    if (targetServer === 'kr') {
        // Target is KR
        // If current is Global root or JP, redirect to KR
        if (currentUrl.hostname === 'game.mahjongsoul.com' ||
            (currentUrl.hostname === 'mahjongsoul.game.yo-star.com' && !currentUrl.pathname.startsWith('/kr/'))) {
            newUrlStr = KR_BASE + search;
        }
    } else if (targetServer === 'global') {
        // Target is Global
        // If current is KR or JP, redirect to Global
        if (currentUrl.hostname === 'game.mahjongsoul.com' ||
            (currentUrl.hostname === 'mahjongsoul.game.yo-star.com' && currentUrl.pathname.startsWith('/kr/'))) {
            newUrlStr = GLOBAL_BASE + search;
        }
    } else if (targetServer === 'jp') {
        // Target is JP
        // If current is Global or KR, redirect to JP
        if (currentUrl.hostname === 'mahjongsoul.game.yo-star.com') {
            newUrlStr = JP_BASE + search;
        }
    }

    if (newUrlStr) {
        chrome.tabs.update(tabId, { url: newUrlStr });
    }
}
