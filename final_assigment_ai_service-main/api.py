import os
from flask import Flask, jsonify, send_file
from flask_cors import cross_origin
from flask import request
import base64
from main import chat_AI, get_list_history, translate, suggest_word, gen_sentence, get_voice, gen_question, record, \
    check_ipa, sentiment_comment, suggest_blog

app = Flask(__name__)


@app.route("/chat", methods=['POST'])
@cross_origin("*")
def chat():
    data_str = request.json
    history = chat_AI(data_str)
    return jsonify(history)


@app.route("/get_history", methods=['GET'])
@cross_origin("*")
def get_history():
    history = get_list_history()
    return jsonify(history)


@app.route("/translate", methods=['POST'])
@cross_origin("*")
def translate_api():
    data_str = request.json
    meaning = translate(data_str)
    return jsonify(meaning)


@app.route("/gen_sentence", methods=['POST'])
@cross_origin("*")
def gen_w():
    data_str = request.json
    sentence = gen_sentence(data_str)
    return jsonify(sentence)


@app.route("/suggest_word", methods=['POST'])
@cross_origin("*")
def suggest():
    data_str = request.json
    list_word = suggest_word(data_str)
    return jsonify(list_word)


@app.route("/get_voice/<word>", methods=['GET'])
@cross_origin("*")
def get_voice_api(word):
    sentence = gen_sentence(word)
    get_voice(sentence)
    audio_file_path = os.path.join(os.path.dirname(__file__), "bark_out.wav")
    d = {"sentence": sentence, "audioUrl": audio_file_path}
    return jsonify(d)


@app.route("/get_voice_by_word", methods=['POST'])
@cross_origin("*")
def get_voice_by_word_api():
    data_str = request.json
    get_voice(data_str["data"])
    audio_file_path = os.path.join(os.path.dirname(__file__), "bark_out.wav")
    with open(audio_file_path, 'rb') as audio_file:
        audio_data = audio_file.read()

        # Mã hóa dữ liệu audio thành base64
    audio_base64 = base64.b64encode(audio_data).decode('utf-8')

    return jsonify({'base64': audio_base64})


@app.route("/get_audio", methods=['GET'])
@cross_origin("*")
def get_audio_api():
    audio_file_path = os.path.join(os.path.dirname(__file__), "bark_out.wav")
    return send_file(audio_file_path, mimetype="audio/wav")


@app.route("/get_question", methods=['POST'])
@cross_origin("*")
def get_question_api():
    data_str = request.json
    return jsonify({"question": gen_question(data_str["data"], data_str["type"])})


# Đường dẫn để nhận file âm thanh
@app.route('/record', methods=['POST'])
@cross_origin("*")
def upload():
    current_directory = os.path.dirname(os.path.realpath(__file__))
    if 'audio' not in request.files:
        return 'No audio file provided', 400
    audio_file = request.files['audio']
    if audio_file.filename == '':
        return 'No selected file', 400
    save_path = os.path.join(current_directory, f"{audio_file.filename}.wav")
    try:
        audio_file.save(save_path)
        return jsonify({"data": record()}), 200

    except Exception as e:
        print("Error saving file:", e)
        return e, 400


@app.route('/score', methods=['POST'])
@cross_origin("*")
def score_api():
    data = request.json
    return jsonify({"data": check_ipa(data["answer"], data["user"])})


@app.route('/rating', methods=['POST'])
@cross_origin("*")
def rating_api():
    data = request.json
    return jsonify({"data": sentiment_comment(data["content"])})

@app.route('/get_list_suggest_blog', methods=['POST'])
@cross_origin("*")
def get_list_suggest_blog():
    data = request.json
    list_user_id = []
    list_item_id = []
    list_rating = []
    d = {}
    for comment in data["list"]:
        list_user_id.append(comment["userId"])
        list_item_id.append(comment["blogId"])
        list_rating.append(comment["rating"])
    d["user_id"] = list_user_id
    d["item_id"] = list_item_id
    d["rating"] = list_rating
    return jsonify({"data": suggest_blog(d, data["userId"])})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6868)
