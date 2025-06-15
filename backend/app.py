from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score

app = Flask(__name__)

CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

MODEL_PATH = os.path.join(BASE_DIR, '../joblib_train/xgboost_obesity_model.joblib')
ENCODER_PATH = os.path.join(BASE_DIR, '../joblib_train/label_encoder.joblib')
SCALER_PATH = os.path.join(BASE_DIR, '../joblib_train/scaler.joblib')
FEATURE_COLUMNS_PATH = os.path.join(BASE_DIR, '../joblib_train/feature_columns.joblib')
TEST_DATA_PATH = os.path.join(BASE_DIR, '../joblib_train/test_data.joblib')

model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)
scaler = joblib.load(SCALER_PATH)
feature_columns = joblib.load(FEATURE_COLUMNS_PATH)

x_test, y_test = joblib.load(TEST_DATA_PATH)

def preprocess_input(input_json):
    df = pd.DataFrame([input_json])

    df_encoded = pd.get_dummies(df)

    for col in feature_columns:
        if col not in df_encoded.columns:
            df_encoded[col] = 0

    df_encoded = df_encoded[feature_columns]

    df_scaled = scaler.transform(df_encoded)

    return df_scaled

@app.route('/', methods=['GET'])
def home():
    return "Obesity Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        processed_input = preprocess_input(data)
        prediction = model.predict(processed_input)
        prediction_proba = model.predict_proba(processed_input)[0]
        label = label_encoder.inverse_transform(prediction)[0]
        confidence = round(float(max(prediction_proba)) * 100, 2)
        y_pred = model.predict(x_test)
        accuracy = round(accuracy_score(y_test, y_pred) * 100, 2)

        return jsonify({
            'prediction': label,
            'accuracy': accuracy,
            'confidence': confidence
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)