Overview

Phishing Guard is an advanced security tool designed to protect users from phishing attacks. It performs real-time analysis of web pages, checks for suspicious patterns, and provides immediate feedback through visual indicators and detailed reports.
Key Features

- Real-time Analysis: Automatic scanning of every webpage you visit.
- Visual Indicators: Color-coded status badges and popup notifications.
- Manual Scanning: Force a scan on any page at any time.
- Scan History: Track previous scans with timestamps and results.
- ofessional UI: Clean, intuitive interface with responsive design.
- Comprehensive Checks: Analyzes URLs, domains, and page content for phishing indicators.
- External API Ready: Architecture prepared for integration with services like PhishTank.

  Installation
 Prerequisites
- Google Chrome (Latest Version Recommended)

 Steps:
1. Clone the Repository.
2. Load in Chrome:
- Open Chrome and navigate to chrome://extensions/.
- Enable Developer Mode (toggle in top-right corner).
- Click Load Unpacked and select the phishing-guard folder.
3.Optional: API Integration:
- Obtain API keys from services like PhishTank.
- Add keys to src/utils/apiClient.js

  User Guide
-Interface Overview
1.Status Indicator: Shows current page security status.
2.Control Buttons: Start/stop monitoring and manual scan.
3.Scan History: Recent scans with timestamps and results.

  Getting Started
  1.First Run:
- Click the extension icon to open the dashboard.
- Click Start Monitoring to begin real-time protection.
  2.Manual Scan:
- Navigate to any page and click Scan Link for on-demand analysis.
  3.View Results:
- Check the status indicator for immediate results.
- Review detailed reports in the scan history.

  Technical Details
Architecture
 1.Content Scripts: Handle page analysis and data collection.
Background Service: Manages monitoring state and storage. 
 2.Popup Interface: Built with HTML/CSS/JS for user interaction.

Detection Mechanisms
 1.URL Analysis:
Checks for suspicious patterns (e.g., secure.login, IP addresses).
Validates domain reputation against trusted sources.
 2.Content Scanning:
Searches for phishing keywords ("verify account", "urgent action").
Analyzes page structure for hidden elements.
 3.External API Integration:
Ready to connect with PhishTank/Google Safe Browsing (TODO).


Tech Stack
Frontend: HTML5, CSS3, JavaScript
Chrome APIs: chrome.storage, chrome.scripting, chrome.action

Lead Developer: Prabudha Yengde

Contributing
We welcome contributions! To get started
