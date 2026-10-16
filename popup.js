document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggleSwitch');
    const statusText = document.getElementById('statusText');
  
    // Load saved state (default is false/off)
    chrome.storage.local.get(['autoShowEnabled'], (result) => {
      toggle.checked = result.autoShowEnabled || false;
      updateText(toggle.checked);
    });
  
    // Save state when toggled
    toggle.addEventListener('change', () => {
      chrome.storage.local.set({ autoShowEnabled: toggle.checked });
      updateText(toggle.checked);
    });
  
    function updateText(isEnabled) {
      statusText.textContent = isEnabled ? "Active" : "Inactive";
      statusText.style.color = isEnabled ? "red" : "gray";
    }
  });