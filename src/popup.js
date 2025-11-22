document.addEventListener('DOMContentLoaded', function () {
    // Apply localization
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = chrome.i18n.getMessage(key);
    });

    const buttons = document.querySelectorAll('.server-btn');
    const statusText = document.getElementById('status');

    // Default to 'kr' if not set
    chrome.storage.local.get(['targetServer'], function (result) {
        let currentServer = result.targetServer;
        if (!currentServer) {
            // Migrate old boolean setting if exists
            chrome.storage.local.get(['targetKR'], function (oldResult) {
                if (oldResult.targetKR !== undefined) {
                    currentServer = oldResult.targetKR ? 'kr' : 'global';
                } else {
                    currentServer = 'kr'; // Default
                }
                updateUI(currentServer);
                chrome.storage.local.set({ targetServer: currentServer });
            });
        } else {
            updateUI(currentServer);
        }
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const selectedServer = this.getAttribute('data-value');
            chrome.storage.local.set({ targetServer: selectedServer }, function () {
                updateUI(selectedServer);
            });
        });
    });

    function updateUI(server) {
        // Update buttons
        buttons.forEach(btn => {
            if (btn.getAttribute('data-value') === server) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update status text
        // We might want to update messages.json to support dynamic status or just simple "Target: X"
        // For now, let's just show the target server name
        let serverName = "";
        if (server === 'global') serverName = chrome.i18n.getMessage("labelGlobal");
        else if (server === 'kr') serverName = chrome.i18n.getMessage("labelKR");
        else if (server === 'jp') serverName = chrome.i18n.getMessage("labelJP");

        statusText.textContent = chrome.i18n.getMessage("currentTarget") + ' : ' + serverName;
    }
});
