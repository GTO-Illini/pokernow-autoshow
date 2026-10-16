console.log("AutoShow: Content script loaded and running");

const observer = new MutationObserver((mutations) => {
    // Check storage every time a mutation happens to get the live toggle state
    chrome.storage.local.get(['autoShowEnabled'], (result) => {
        if (!result.autoShowEnabled) return; // Exit if toggled off

        const buttons = Array.from(document.querySelectorAll('button'));

        console.log("Buttons found:", buttons.map(b => b.textContent.trim()));

        const showBtn = buttons.find(b => 
            b.textContent.toLowerCase().includes('show') &&
            !b.textContent.toLowerCase().includes('hide')
        );

        if (showBtn) {
            console.log("AutoShow: Found Show Button", showBtn);
            
            if (!showBtn.disabled && !showBtn.dataset.autoClicked) {
                console.log("AutoShow: Show Button active, clicking now");
                showBtn.dataset.autoClicked = "true";
                showBtn.click();
            } else {
                console.log("AutoShow: Show Button disabled or already clicked");
            }
        }

    });
});

observer.observe(document.body, { childList: true, subtree: true });