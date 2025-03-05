function analyzePage() {
  const url = window.location.href;
  const domain = window.location.hostname;
  const content = document.body.innerText.toLowerCase();

  const checks = {
    url: checkURL(url),
    domain: checkDomain(domain),
    content: checkContent(content)
  };

  return {
    url,
    domain,
    content,
    ...checks,
    overall: Object.values(checks).some(v => v),
    timestamp: new Date().toISOString()
  };
}

function checkURL(url) {
  const patterns = [
    /(?=.*\b(secure|login|verify|account)\b)(?=.*\d)/i,
    /[^a-z0-9-]/i,
    /https?:\/\/[^\/]+\/.+\/.+\/.+\/.+\/.+\/.+\/.+\/.+\/.+\/.+\/.+\/.+\/.+/i
  ];
  return patterns.some(p => p.test(url));
}

function checkDomain(domain) {
  return !/^(www\.)?(google|yahoo|microsoft|apple|amazon)\.com$/.test(domain);
}

function checkContent(content) {
  const keywords = [
    'urgent action required',
    'verify your account',
    'click here to secure',
    'suspended account'
  ];
  return keywords.some(k => content.includes(k));
}

// Real-time analysis
document.addEventListener('DOMContentLoaded', () => {
  const results = analyzePage();
  chrome.runtime.sendMessage({ action: 'updateStatus', results });
});

// Handle navigation
window.addEventListener('beforeunload', () => {
  chrome.runtime.sendMessage({ action: 'clearStatus' });
});