console.log("AutoShow: Content script loaded and running");

const observer = new MutationObserver((mutations) => {
    chrome.storage.local.get(['autoShowEnabled'], (result) => {
        if (!result.autoShowEnabled) return;

        const buttons = Array.from(document.querySelectorAll('button'));
        const showBtn = buttons.find(b => 
            b.textContent.toLowerCase().includes('show') &&
            !b.textContent.toLowerCase().includes('hide')
        );

        if (showBtn) {            
            if (!showBtn.disabled && !showBtn.dataset.autoClicked) {
                showBtn.dataset.autoClicked = "true";
                showBtn.click();
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });