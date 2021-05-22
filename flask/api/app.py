from flask import Flask, request
from flask_cors import CORS
import base64
from datetime import datetime

# os libraries
from werkzeug.utils import secure_filename
import os
import random

# Preprocessing Libraries
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.python.keras.applications.vgg16 import decode_predictions
import keras
from keras.preprocessing import image
import cv2

UPLOAD_FOLDER = '../uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# loading model

model = load_model('../model/building_defects_detection_vgg16_model.h5')

# output list to send predicted values

result_to_send = []

# Index


@app.route('/')
def index():
    return "Hello Flask"

# Uploded File


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    mimetype = file.content_type.split('/')

    dateTimeObj = datetime.now()
    file_name = dateTimeObj.strftime(
        "%d-%b-%Y--(%H-%M-%S)") + "." + str(mimetype[-1])

    filename = secure_filename(file_name)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return "success"

# render file from folder


def renderFile():
    res = ""
    for file in os.listdir("../uploads"):
        if file.endswith(".mp4") or file.endswith(".webm"):
            path = os.path.join("../uploads", file)
            res = predict(path)
    return res

# image prediction


def predict(file):
    vs = cv2.VideoCapture(file)
    # try:
    #     if not os.path.exists('../images'):
    #         os.makedirs('../images')

    # except OSError:
    #     print('Error: Creating directory of data')

    (W, H) = (None, None)

    name = ""
    count = 0
    while True:
        (grabbed, frame) = vs.read()

        if not grabbed:
            break
        if W is None or H is None:
            (H, W) = frame.shape[:2]

        output = frame.copy()

        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = cv2.resize(frame, (224, 224))

        x = image.img_to_array(frame)
        x = np.expand_dims(x, axis=0)

        img_data = preprocess_input(x)

        result = np.argmax(model.predict(img_data), axis=1)

        if (result == 0 or result == 1 or result == 2):
            name = '../images/result'+str(count)+'.jpg'
            count += 1
            cv2.imwrite(name, output)

        index = ['crack', 'flakes', 'roof']

        defect = str(index[result[0]])

    vs.release()
    cv2.destroyAllWindows()
    return {'defect': defect, 'img': name}


# Creating base64

def get_image_base_URL():
    output = renderFile()
    img = output.get('img')
    f = open(img, "rb")
    my_string = base64.b64encode(f.read())
    id = str(random.random())
    result_to_send.append(
        {
            "id": id,
            "defect": output['defect'],
            "img": str(my_string)
        }
    )

# clearing folder


def clearAll():
    for file in os.listdir("../uploads"):
        if file.endswith(".mp4") or file.endswith(".webm"):
            path = os.path.join("../uploads", file)
            os.remove(path)
    for file in os.listdir("../images"):
        if file.endswith(".jpg"):
            path = os.path.join("../images", file)
            os.remove(path)


@ app.route('/result', methods=['GET'])
def result():
    get_image_base_URL()
    clearAll()
    return {'result': result_to_send}
