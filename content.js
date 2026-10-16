const observer = new MutationObserver((mutations) => {
    // Check storage every time a mutation happens to get the live toggle state
    chrome.storage.local.get(['autoShowEnabled'], (result) => {
        if (!result.autoShowEnabled) return; // Exit if toggled off

        const buttons = Array.from(document.querySelectorAll('button'));
        const showBtn = buttons.find(b => 
            b.textContent.trim().toLowerCase() === 'show cards' || 
            b.textContent.trim().toLowerCase() === 'show' ||
            b.textContent.trim().toLowerCase() === 'show all cards'
        );

        if (showBtn && !showBtn.disabled && !showBtn.dataset.autoClicked) {
            showBtn.dataset.autoClicked = "true";
            showBtn.click();
            console.log("Auto-Show: Cards revealed!");
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });