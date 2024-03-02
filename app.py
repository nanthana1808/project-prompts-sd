from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import the CORS module
import json

app = Flask(__name__, static_url_path='/static')
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Handle preflight request for /sdapi/v1/txt2img endpoint
@app.route('/sdapi/v1/txt2img', methods=['OPTIONS'])
def handle_preflight():
    response = app.make_default_options_response()
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Origin'] = '*'  # Set the allowed origin
    return response

# อ่านข้อมูลจากไฟล์ JSON ทุกครั้งที่มีการเรียกใช้ฟังก์ชัน translate_prompt
def load_data():
    with open('data.json', 'r', encoding='utf-8') as file:
        return json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/HOME')
def home():
    return render_template('home.html')

# แปลง prompt จากภาษาไทยเป็นภาษาอังกฤษ
def translate(thai_prompt, data):
    translated_words = [data.get(word.strip(), word.strip()) for word in thai_prompt.split(',')]
    return ', '.join(translated_words)

# ในฟังก์ชัน translate_prompt เรียกใช้ฟังก์ชัน translate
@app.route('/translate_prompt', methods=['POST'])
def translate_prompt():
    thai_prompt = request.json.get('thai_prompt', '')
    data = load_data()  # โหลดข้อมูลทุกครั้งที่มีการเรียกใช้ฟังก์ชัน translate_prompt
    translated_prompt = translate(thai_prompt, data)
    return jsonify({"english_prompt": translated_prompt})

if __name__ == '__main__':
    app.run(debug=True)
