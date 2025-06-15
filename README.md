# Obesity Level Classification Web Application

This project is a web-based application designed to classify obesity levels based on user input. The classification covers a wide range of categories, including:

- Insufficient_Weight  
- Normal_Weight  
- Overweight_Level_I  
- Overweight_Level_II  
- Obesity_Type_I  
- Obesity_Type_II  
- Obesity_Type_III  

## 💡 Features

- Built using a machine learning model based on the **XGBoost** algorithm.
- Model is optimized using **Randomized Search** for better performance.
- Integrated with a responsive **ReactJS** frontend for user interaction.
- Accepts various input features (e.g., age, weight, height, family history of overweight, and other relevant features) to predict obesity level.

## 🚀 Tech Stack

- **Backend & Model**: Python, XGBoost, Scikit-learn, Joblib  
- **Optimization**: RandomizedSearchCV  
- **Frontend**: ReactJS  
- **Deployment (optional)**: Flask API

## 📦 How It Works

1. User inputs relevant personal data through the ReactJS frontend.
2. Data is sent to the backend, where it is processed and passed to the XGBoost model.
3. The model returns a prediction indicating the user's obesity category.
4. The prediction is displayed on the frontend.

## 🔧 Future Improvements

- Enhance the dataset with more diverse data.
- Add user authentication and history tracking.
- Improve UI/UX with better data visualization.