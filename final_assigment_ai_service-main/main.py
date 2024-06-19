# Chat with an intelligent assistant in your terminal
from itertools import islice
from openai import OpenAI
import json
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
from transformers import BarkModel, AutoProcessor
import scipy
import random
from faster_whisper import WhisperModel
import os
from nltk.corpus import cmudict
from sklearn.feature_extraction.text import CountVectorizer
import torch
from transformers import RobertaForSequenceClassification, AutoTokenizer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

a = [
    {"vocabulary": 'apple', "meaning": 'quả táo'},
    {"vocabulary": 'banana', "meaning": 'quả chuối'},
    {"vocabulary": 'computer', "meaning": 'máy tính'},
    {"vocabulary": 'dog', "meaning": 'con chó'},
    {"vocabulary": 'elephant', "meaning": 'con voi'},
    {"vocabulary": 'flower', "meaning": 'hoa'},
    {"vocabulary": 'guitar', "meaning": 'đàn guitar'},
    {"vocabulary": 'house', "meaning": 'nhà'},
    {"vocabulary": 'internet', "meaning": 'internet'},
    {"vocabulary": 'jacket', "meaning": 'áo khoác'},
    {"vocabulary": 'kiwi', "meaning": 'quả kiwi'},
    {"vocabulary": 'lion', "meaning": 'con sư tử'},
    {"vocabulary": 'moon', "meaning": 'mặt trăng'},
    {"vocabulary": 'notebook', "meaning": 'sổ tay'},
    {"vocabulary": 'ocean', "meaning": 'đại dương'},
    {"vocabulary": 'piano', "meaning": 'đàn piano'},
    {"vocabulary": 'queen', "meaning": 'nữ hoàng'},
    {"vocabulary": 'rabbit', "meaning": 'con thỏ'},
    {"vocabulary": 'sun', "meaning": 'mặt trời'},
    {"vocabulary": 'tree', "meaning": 'cây'},
    {"vocabulary": 'umbrella', "meaning": 'ô'},
    {"vocabulary": 'violin', "meaning": 'đàn violin'},
    {"vocabulary": 'water', "meaning": 'nước'},
    {"vocabulary": 'xylophone', "meaning": 'đàn xylophone'},
    {"vocabulary": 'yacht', "meaning": 'du thuyền'},
    {"vocabulary": 'zebra', "meaning": 'ngựa vằn'},
    {"vocabulary": 'airplane', "meaning": 'máy bay'},
    {"vocabulary": 'book', "meaning": 'sách'},
    {"vocabulary": 'car', "meaning": 'xe hơi'},
    {"vocabulary": 'desk', "meaning": 'bàn làm việc'},
]

model = M2M100ForConditionalGeneration.from_pretrained("facebook/m2m100_418M")
tokenizer = M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")
tokenizer.src_lang = "en"

# Point to the local server
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

with (open('history.json', 'r') as f):
    # Đọc chuỗi JSON từ tệp
    json_data = f.read()
    # Chuyển chuỗi JSON thành đối tượng Python
    history = json.loads(json_data)

# Danh sách các từ tiếng Anh
word_path = "C:\\Users\\ADMIN\\PycharmProjects\\test_api\\words_alpha.txt"

words = open(word_path)
word_list = words.readlines()
json_words = json.loads(json.dumps(word_list, indent=4))


def chat_AI(usr_inp):
    history.append({"role": "user", "content": usr_inp})
    completion = client.chat.completions.create(
        model="uonlp/Vistral-7B-Chat-gguf",
        messages=history,
        temperature=0.7,
        stream=True,
    )

    new_message = {"role": "assistant", "content": ""}

    for chunk in completion:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)
            new_message["content"] += chunk.choices[0].delta.content
    if (new_message["content"] != ""):
        history.append(new_message)

    with open('history.json', 'w') as f:
        json.dump(history, f)
    return history


def gen_sentence(base_word):
    sentence = ""
    prompt = f"Compose a coherent sentence using the word '{base_word}'. Limited to 10 words"
    completion = client.chat.completions.create(
        model="uonlp/Vistral-7B-Chat-gguf",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        stream=True,
    )
    for chunk in completion:
        if chunk.choices[0].delta.content:
            sentence += chunk.choices[0].delta.content
    return sentence


def suggest_word(prefix):
    # Chuyển danh sách thành một set
    item_set = set(json_words)
    # Lọc ra các phần tử bắt đầu bằng tiền tố đã cho
    filtered_items = filter(lambda x: x.startswith(prefix), item_set)
    # Giới hạn số lượng mục trả về
    return list(islice(filtered_items, 3))


def translate(ori_word):
    encoded_hi = tokenizer(ori_word, return_tensors="pt")
    generated_tokens = model.generate(**encoded_hi, forced_bos_token_id=tokenizer.get_lang_id("vi"))
    meaning = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
    return meaning


def get_list_history():
    return history


def get_voice(sentence):
    device = "cuda" if torch.cuda.is_available() else "cpu"

    model_bark = BarkModel.from_pretrained("suno/bark-small", torch_dtype=torch.float).to(device)

    processor = AutoProcessor.from_pretrained("suno/bark")
    voice_preset = "v2/en_speaker_5"

    inputs = processor(sentence, voice_preset=voice_preset).to(device)

    audio_array = model_bark.generate(**inputs)
    audio_array = audio_array.cpu().numpy().squeeze()

    sample_rate = model_bark.generation_config.sample_rate
    scipy.io.wavfile.write("bark_out.wav", rate=sample_rate, data=audio_array)


def translate_sentence(s):
    sentence = ""
    prompt = f"Translate the following English sentence into Vietnamese: '{s}'."
    completion = client.chat.completions.create(
        model="uonlp/Vistral-7B-Chat-gguf",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        stream=True,
    )
    for chunk in completion:
        if chunk.choices[0].delta.content:
            sentence += chunk.choices[0].delta.content
    return sentence


def gen_question_drag(word):
    sentence = gen_sentence(word["vocabulary"])
    meaning = translate_sentence(sentence)
    wl = meaning.split()
    random.shuffle(wl)
    return {"sentence": sentence, "question": wl, "answer": meaning.split()}


def gen_question_pair(list_word):
    list_vocabulary = []
    list_meaning = []
    for i in range(len(list_word)):
        list_vocabulary.append({"key": i, "vocabulary": list_word[i]["vocabulary"]})
        list_meaning.append({"key": i, "meaning": list_word[i]["meaning"]})

    random.shuffle(list_meaning)
    for i in range(len(list_word)):
        list_vocabulary[i]["no"] = i + 1
        list_meaning[i]["no"] = i + 1 + len(list_word)

    return {"vocabularies": list_vocabulary, "meanings": list_meaning}


def gen_question_chose_meaning(word):
    aClone = a.copy()
    random.shuffle(aClone)
    answer = []
    correct_key = -1
    for i in range(len(aClone)):
        if len(answer) < 4:
            if len(answer) == 3:
                answer.append({"meaning": word["meaning"], "key": i})
                correct_key = i
            else:
                if word["vocabulary"].lower() != a[i]["vocabulary"].lower():
                    answer.append({"meaning": aClone[i]["meaning"], "key": i})
        else:
            random.shuffle(answer)
            for i in range(len(answer)):
                answer[i]["no"] = i + 1
            return {"question": word["vocabulary"], "answer": answer, "key": correct_key}


def gen_question_listen(word):
    aClone = a.copy()
    random.shuffle(aClone)
    answer = []
    correct_key = -1
    for i in range(len(aClone)):
        if len(answer) < 4:
            if len(answer) == 3:
                answer.append({"vocabulary": word["vocabulary"], "key": i})
                correct_key = i
            else:
                if word["vocabulary"].lower() != aClone[i]["vocabulary"].lower():
                    answer.append({"vocabulary": aClone[i]["vocabulary"], "key": i})
        else:
            random.shuffle(answer)
            for i in range(len(answer)):
                answer[i]["no"] = i + 1
            return {"question": word["vocabulary"], "answer": answer, "key": correct_key}


def gen_question_speak(word):
    sentence = gen_sentence(word["vocabulary"])
    return {"question": sentence, "answer": sentence}


def gen_question(list_word, type="all"):
    resource = random.sample(list_word, 5)
    listen = []
    speak = []
    read = {"choose": [], "drag": [], "pair": []}
    test = {"listen": [], "speak": [], "read": {"choose": [], "drag": [], "pair": []}}
    if type == "all":
        # Nghe
        for i in range(len(resource)):
            listen.append(gen_question_listen(resource[i]))

        # Đọc
        for i in range(len(resource)):
            if i < 2:
                read["choose"].append(gen_question_chose_meaning(resource[i]))
            elif 2 <= i < 4:
                read["drag"].append(gen_question_drag(resource[i]))
            else:
                read["pair"].append(gen_question_pair(resource))

        # Nói
        for i in range(len(resource)):
            speak.append(gen_question_speak(resource[i]))

        resource = random.sample(list_word, 5)
        # Kiểm tra
        test["listen"].append(gen_question_listen(resource[1]))
        test["speak"].append(gen_question_speak(resource[0]))
        test["read"]["choose"].append(gen_question_chose_meaning(resource[2]))
        test["read"]["drag"].append(gen_question_drag(resource[3]))
        test["read"]["pair"].append(gen_question_pair(resource))
        return {"test": test, "listen": listen, "speak": speak, "read": read}

    elif type == "listen":
        # Nghe
        for i in range(len(resource)):
            listen.append(gen_question_listen(resource[i]))
        return listen

    elif type == "read":
        for i in range(len(resource)):
            if i < 2:
                read["choose"].append(gen_question_chose_meaning(resource[i]))
            elif 2 <= i < 4:
                read["drag"].append(gen_question_drag(resource[i]))
            else:
                read["pair"].append(gen_question_pair(resource))
        return read

    elif type == "speak":
        # Nói
        for i in range(len(resource)):
            speak.append(gen_question_speak(resource[i]))
        return speak
    else:
        # Kiểm tra
        test["listen"].append(gen_question_listen(resource[1]))
        test["speak"].append(gen_question_speak(resource[0]))
        test["read"]["choose"].append(gen_question_chose_meaning(resource[2]))
        test["read"]["drag"].append(gen_question_drag(resource[3]))
        test["read"]["pair"].append(gen_question_pair(resource))
        return test


def record():
    model_size = "large-v3"

    # Run on GPU with FP16
    model = WhisperModel(model_size, device="cuda", compute_type="float16")

    segments, info = model.transcribe("blob.wav", beam_size=5)

    # print("Detected language '%s' with probability %f" % (info.language, info.language_probability))

    text = ""
    for segment in segments:
        text += segment.text
    return ''.join(char for char in text.strip().lower() if char.isalpha() or char.isspace())


def convert_text_to_ipa(word):
    # Tải từ điển phát âm tiếng Anh từ CMU Pronouncing Dictionary
    cmu = cmudict.dict()

    # Chuyển đổi từ tiếng Anh thành mã IPA nếu từ có sẵn trong từ điển
    if word.lower() in cmu:
        res = ' '.join(cmu[word.lower()][0])
        ipa_mapping = {
            "AA0": "ɑ", "AH0": "ʌ", "AW0": "aʊ", "AH2": "ə", "AO0": "ɔ", "AH1": "ʌ",
            "AY1": "aɪ", "AO2": "ɔ", "IH1": "ɪ", "N": "n", "G": "ɡ", "UW2": "u",
            "R": "r", "ZH": "ʒ", "UH2": "ʊ", "TH": "θ", "S": "s", "EH2": "ɛ",
            "ER0": "ɜ", "OY0": "ɔɪ", "D": "d", "OW0": "oʊ", "CH": "tʃ", "AA1": "ɑ",
            "Z": "z", "NG": "ŋ", "AW1": "aʊ", "B": "b", "IH0": "ɪ", "OW1": "oʊ",
            "AY2": "aɪ", "EH1": "ɛ", "DH": "ð", "AO1": "ɔ", "AE2": "æ", "L": "l",
            "UW0": "u", "K": "k", "OW2": "oʊ", "AW2": "aʊ", "F": "f", "OY2": "ɔɪ",
            "ER2": "ɜ", "UH0": "ʊ", "HH": "h", "EY1": "eɪ", "AE0": "æ", "W": "w",
            "UW1": "u", "EH0": "ɛ", "UW": "u", "AE1": "æ", "IY1": "i", "Y": "j",
            "JH": "dʒ", "EY2": "eɪ", "ER1": "ɝ", "OY1": "ɔɪ", "IH2": "ɪ", "SH": "ʃ",
            "UH1": "ʊ", "V": "v", "P": "p", "AA2": "ɑ", "EY0": "eɪ", "IY0": "i",
            "M": "m", "AY0": "aɪ", "T": "t", "IY2": "i"
        }

        ipa = ""
        for phoneme in res.split():
            ipa += ipa_mapping.get(phoneme,
                                   phoneme)  # Lấy mã IPA tương ứng từ bảng ánh xạ, nếu không tìm thấy thì giữ nguyên
        return ipa

    else:
        return ""


def score_pronunciation(ipa1, ipa2):
    # Tạo vector đặc trưng từ các chuỗi IPA
    vectorizer = CountVectorizer().fit([ipa1, ipa2])
    vectors = vectorizer.transform([ipa1, ipa2])
    # Tính toán cosine similarity giữa hai vector đặc trưng
    cosine_sim = cosine_similarity(vectors[0], vectors[1])
    return cosine_sim[0][0]


def check_ipa(text1, text2):
    text1_process = ''.join(char for char in text1.strip().lower() if char.isalpha() or char.isspace())
    text2_process = ''.join(char for char in text2.strip().lower() if char.isalpha() or char.isspace())
    ipa1 = ' '.join([convert_text_to_ipa(word) for word in text1_process.strip().split(" ")])
    ipa2 = ' '.join([convert_text_to_ipa(word) for word in text2_process.strip().split(" ")])

    return score_pronunciation(ipa1, ipa2)


def convert_sentiment_to_rating(x):
    # Giá trị min và max của thang điểm gốc
    x_min = 0
    x_max = 1

    # Giá trị min và max của thang điểm mới
    a = 1
    b = 5

    # Công thức chuẩn hóa
    y = a + (x - x_min) * (b - a) / (x_max - x_min)
    return round(y)


def sentiment_comment(comment):
    model = RobertaForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")

    tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)

    # Just like PhoBERT: INPUT TEXT MUST BE ALREADY WORD-SEGMENTED!
    sentence = comment

    input_ids = torch.tensor([tokenizer.encode(sentence)])

    with torch.no_grad():
        out = model(input_ids)
        data = out.logits.softmax(dim=-1).tolist()
        pos = data[0][1]
        neg = data[0][0]
        nel = data[0][2]
        if nel > neg and nel > pos:
            return 3
        else:
            sentiment = pos - neg
            if sentiment < 0:
                sentiment = 1 + sentiment
            return convert_sentiment_to_rating(sentiment)


def suggest_blog(data, user_id):
    # Giả sử bạn có DataFrame như sau:
    df = pd.DataFrame(data)
    df = df.groupby(['user_id', 'item_id']).agg({'rating': 'mean'}).reset_index()

    def check_user_exists(user_id):
        return (df['user_id'] == user_id).any()
    is_exist = check_user_exists(user_id)
    if is_exist:
        # Tạo danh sách người dùng và mục duy nhất
        unique_user_ids = df['user_id'].unique()
        unique_item_ids = df['item_id'].unique()

        # Tạo từ điển ánh xạ
        user_id_to_index = {user_id: index for index, user_id in enumerate(unique_user_ids)}
        index_to_user_id = {index: user_id for user_id, index in user_id_to_index.items()}

        item_id_to_index = {item_id: index for index, item_id in enumerate(unique_item_ids)}
        index_to_item_id = {index: item_id for item_id, index in item_id_to_index.items()}

        # Tạo ma trận người dùng - mục
        user_item_matrix = np.zeros((len(unique_user_ids), len(unique_item_ids)))

        # Điền các giá trị đánh giá vào ma trận
        for row in df.itertuples():
            user_index = user_id_to_index[row.user_id]
            item_index = item_id_to_index[row.item_id]
            user_item_matrix[user_index, item_index] = row.rating

        similarity_matrix = cosine_similarity(user_item_matrix)

        def get_similar_users(user_id, similarity_matrix, top_n=5):
            user_index = user_id_to_index[user_id]
            similarity_scores = similarity_matrix[user_index]
            similar_users_indices = np.argsort(-similarity_scores)[1:top_n + 1]
            similar_users = [index_to_user_id[idx] for idx in similar_users_indices]
            return similar_users

        def predict_rating(user_id, item_id, user_item_matrix, similar_users, similarity_matrix):
            user_index = user_id_to_index[user_id]
            item_index = item_id_to_index[item_id]

            total_similarity = 0
            weighted_sum = 0
            for similar_user in similar_users:
                similar_user_index = user_id_to_index[similar_user]
                similarity = similarity_matrix[user_index, similar_user_index]
                rating = user_item_matrix[similar_user_index, item_index]
                if rating > 0:  # Chỉ xem xét các đánh giá không rỗng
                    weighted_sum += similarity * rating
                    total_similarity += similarity

            if total_similarity == 0:
                return 0
            return weighted_sum / total_similarity

        def recommend(user_id, user_item_matrix, similarity_matrix, top_n=6):
            similar_users = get_similar_users(user_id, similarity_matrix)
            item_indices = np.where(user_item_matrix[user_id_to_index[user_id]] == 0)[0]
            predictions = []

            for item_index in item_indices:
                item_id = index_to_item_id[item_index]
                predicted_rating = predict_rating(user_id, item_id, user_item_matrix, similar_users, similarity_matrix)
                predictions.append((item_id, predicted_rating))

            recommendations = sorted(predictions, key=lambda x: x[1], reverse=True)[:top_n]
            return [int(item) for item, score in recommendations]

        recommendations = recommend(user_id, user_item_matrix, similarity_matrix)
        return recommendations
    else:
        return []




