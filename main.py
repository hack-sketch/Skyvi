from flask import Flask, render_template, request, jsonify
import openai
import asyncio
import httpx

app = Flask(__name__)

# Integrating OpenAI APIs
class GPT:
    def __init__(self):
        '''Setup OpenAI APIs'''
        self.key = "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"
        openai.api_key = self.key

    async def get_response(self, prompt) -> str:
        '''Return response based on prompt'''
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": prompt}],
                },
            )
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]

# Creating Session for GPT
gpt = GPT() 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/login_validation', methods=['POST'])
def login_validation():
    email = request.form.get('email')
    password = request.form.get('password')
    return f"The email is {email} and the password is {password}"

@app.route('/bot', methods=['POST'])
async def chat_bot():
    if request.method == "POST":
        try:
            data = request.json
            response = await gpt.get_response(data['prompt'])
            return jsonify({'response': response})
        except Exception as error:
            print(error)
            return jsonify({'error': True, 'message': str(error)})
    return jsonify({'error': True, 'message': 'Method not allowed'})


if __name__ == "__main__":
    app.run(debug=True)

    
    
    
    
    
    
    
    
    
    
    
    