let currentStatus = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateStatus') {
    currentStatus = message.results;
    chrome.storage.local.set({ currentStatus });
    updateUI();
  } else if (message.action === 'clearStatus') {
    currentStatus = null;
    chrome.storage.local.set({ currentStatus });
    updateUI();
  }
});

function updateUI() {
  chrome.storage.local.get(['currentStatus'], (result) => {
    const status = result.currentStatus;
    if (status && status.overall) {
      chrome.action.setBadgeText({ text: '⚠️' });
      chrome.action.setBadgeBackgroundColor({ color: '#FF4444' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }
  });
}