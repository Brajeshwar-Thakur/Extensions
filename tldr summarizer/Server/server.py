from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()
        text = data['text']

        # Make a request to the ChatGPT API for summarization
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ENTER_API_KEY_HERE '
        }
        payload = {
            'messages': [
                {'role': 'system', 'content': 'You are a summarizer'},
                {'role': 'user', 'content': text}
            ],
            'max_tokens': 50,
            'temperature': 0.3
        }
        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)
        response_data = response.json()
        summary = response_data['choices'][0]['message']['content']

        return jsonify({'summary': summary})

    except Exception as e:
        print(e)
        return jsonify({'error': 'An error occurred'}), 500

if __name__ == '__main__':
    app.run(port=8000)
