from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import base64

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
        last_two_messages = request.json.get('lastTwoMessages')

        
        instruction = "You are an art appreciation assistant. Your goal is to evaluate the interest level of the user's response on a scale of 0 (low interest) to 1 (high interest).\n\
             you will only answer 0 or 1."
        
    
        messages = [{"role": "system", "content": instruction}]

        for msg in last_two_messages:
            if msg and msg['type'] == 'query':
                messages.append({"role": "user", "content": msg['text']})
            elif msg and msg['type'] == 'response':
                messages.append({"role": "assistant", "content": msg['text']})

        ### Request 5 LLM to score
        scores = []
        for _ in range(5):
            response = openai.chat.completions.create(
                model="gpt-4",  # 사용하고자 하는 모델 이름
                messages=messages,
                max_tokens=3,
                top_p=1.0
            )

            # API 응답에서 점수를 추출
            # result = response.choices[0].message['content'].strip()
            result = response.choices[0].message.content
            # print(f"Result: {result}")
            
            if result.lower() in ['0', '1']:
                scores.append(int(result))
            else:
                scores.append(0)  # 예기치 않은 응답이 있을 경우 0으로 처리

        # 다수결을 통해 최종 점수 결정
        final_score = 1 if scores.count(1) > scores.count(0) else 0

        # print(f"Final Score: {final_score}")

        return jsonify({'res': final_score})

    except Exception as e:
        # 에러 발생 시 로그 출력 및 클라이언트로 에러 메시지 전송
        print(e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Flask 서버 실행
    app.run(port=4001, debug=True)
