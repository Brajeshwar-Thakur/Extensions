function extractTextContent() {
  // Extract the text content of the webpage
  var text = document.body.innerText;
  return text;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "extractText") {
    var text = extractTextContent();
    sendResponse({text: text});
  }
  else if (request.action === "displaySummary") {
    // Display the summary on the webpage
    var summaryElement = document.createElement("div");
    summaryElement.style.backgroundColor = "#F5F5F5";
    summaryElement.style.padding = "10px";
    summaryElement.style.position = "fixed";
    summaryElement.style.top = "0";
    summaryElement.style.left = "0";
    summaryElement.style.width = "100%";
    summaryElement.style.zIndex = "9999";
    summaryElement.textContent = request.summary;
    document.body.appendChild(summaryElement);
  }
});

// Send a message to the background script to initiate the summarization process
chrome.runtime.sendMessage({action: "summarize"});
