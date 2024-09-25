from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import base64

import json
from datetime import datetime

load_dotenv()  # .env 파일에서 환경 변수 로드

app = Flask(__name__)
CORS(app)  # 모든 도메인에서의 요청을 허용

# OpenAI API 키 설정
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

@app.route('/', methods=['POST'])
def chat():
    try:
        # 클라이언트로부터 전송된 메시지 내용 가져오기
        conversation = request.json.get('conversation')
        image = request.json.get('image')
        image = "../client/src" + image
        base64_image = encode_image(image)

        messages=[
            {
            "role": "user",
            "content": [
                {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                },
                },
            ],
            }
        ]

        for msg in conversation:
            if msg['type'] == 'query':
                messages.append({"role": "user", "content": msg['text']})
            elif msg['type'] == 'response':
                messages.append({"role": "assistant", "content": msg['text']})
            elif msg['type'] == 'instruction':
                messages.append({"role": "assistant", "content": msg['text']})


        response = openai.chat.completions.create(
            model="gpt-4o",  # 사용하고자 하는 모델 이름
            messages=messages,
            max_tokens=300,
            top_p=1.0
        )

        # API 응답에서 필요한 데이터 추출
        result = response.choices[0].message.content
        # 클라이언트로 응답 전송
        return jsonify({'res': result})

    except Exception as e:
        # 에러 발생 시 로그 출력 및 클라이언트로 에러 메시지 전송
        print(e)
        return jsonify({'error': str(e)}), 500
    
@app.route('/submit', methods=['POST'])
def submit_data():
    try:
        # 클라이언트로부터 전송된 allData 가져오기
        all_data = request.json

        # 데이터 프린트
        print("Received data:")
        print(json.dumps(all_data, indent=2))

        # 현재 시간으로 파일 이름 생성
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"../result/submitted_data_{timestamp}.json"

        # 데이터를 JSON 파일로 저장
        with open(filename, 'w') as f:
            json.dump(all_data, f, indent=2, ensure_ascii=False)

        return jsonify({'status': 'success', 'message': 'Data saved successfully.'})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Flask 서버 실행
    app.run(port=4000, debug=True)