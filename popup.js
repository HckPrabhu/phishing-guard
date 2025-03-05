document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  document.getElementById('scanBtn').addEventListener('click', performManualScan);
  document.getElementById('toggleMonitorBtn').addEventListener('click', toggleMonitoring);
});

function updateUI() {
  chrome.storage.local.get(['currentStatus', 'scanHistory', 'isMonitoring'], (data) => {
    updateStatusIndicator(data.currentStatus);
    updateScanHistory(data.scanHistory || []);
    updateMonitoringButton(data.isMonitoring);
  });
}

function updateStatusIndicator(status) {
  const indicator = document.getElementById('statusIndicator');
  const statusText = document.querySelector('h1');
  
  if (status && status.overall) {
    indicator.className = 'status-indicator warning';
    statusText.textContent = 'Phishing Guard Pro (Threat Detected!)';
  } else {
    indicator.className = 'status-indicator safe';
    statusText.textContent = 'Phishing Guard Pro';
  }
}

function updateScanHistory(history) {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = history
    .slice(-5)
    .map(scan => `
      <div class="scan-item">
        <span class="scan-url">${scan.url}</span>
        <span class="${scan.overall ? 'warning' : 'safe'}">
          ${scan.overall ? 'Suspicious' : 'Safe'}
        </span>
        <span class="scan-time">${new Date(scan.timestamp).toLocaleTimeString()}</span>
      </div>
    `).join('');
}

function performManualScan() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => chrome.runtime.sendMessage({ action: 'manualScan' })
      });
    }
  });
}

function toggleMonitoring() {
  chrome.storage.local.get(['isMonitoring'], (data) => {
    const newState = !data.isMonitoring;
    chrome.storage.local.set({ isMonitoring: newState });
    updateMonitoringButton(newState);
  });
}

function updateMonitoringButton(isMonitoring) {
  const btn = document.getElementById('toggleMonitorBtn');
  btn.textContent = isMonitoring ? 'Stop Monitoring' : 'Start Monitoring';
  btn.className = isMonitoring ? 'btn danger' : 'btn secondary';
}