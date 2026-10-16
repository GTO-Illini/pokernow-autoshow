document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggleSwitch');
    const statusText = document.getElementById('statusText');
  
    // Load saved state
    chrome.storage.local.get(['autoShowEnabled'], (result) => {
      toggle.checked = result.autoShowEnabled || false;
      updateUI(toggle.checked);
    });
  
    // Save state and update styles when toggled
    toggle.addEventListener('change', () => {
      chrome.storage.local.set({ autoShowEnabled: toggle.checked });
      updateUI(toggle.checked);
    });
  
    function updateUI(isEnabled) {
      statusText.textContent = isEnabled ? "Active" : "Off";
      
      // Toggles the Illini Orange text color class
      if (isEnabled) {
        statusText.classList.add('active');
      } else {
        statusText.classList.remove('active');
      }
    }
  });