import { extractTextContent } from './content.js';

document.addEventListener('DOMContentLoaded', function() {
  const summaryElement = document.getElementById('summary');
  const text = extractTextContent();

  fetch('http://localhost:8000/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: text })
  })
    .then(response => response.json())
    .then(data => {
      summaryElement.textContent = data.summary;
    })
    .catch(error => console.log(error));
});
