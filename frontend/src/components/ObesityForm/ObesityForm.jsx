import { useState } from 'react';
import axios from 'axios';
import './ObesityForm.css';

const categoricalFields = {
    Gender: ['Male', 'Female'],
    family_history_with_overweight: ['yes', 'no'],
    FAVC: ['yes', 'no'],
    CAEC: ['no', 'Sometimes', 'Frequently', 'Always'],
    SMOKE: ['yes', 'no'],
    SCC: ['yes', 'no'],
    CALC: ['no', 'Sometimes', 'Frequently', 'Always'],
    MTRANS: ['Public_Transportation', 'Walking', 'Bike', 'Motorbike', 'Automobile']
};

const fieldLabels = {
    Gender: 'Gender',
    Age: 'Age',
    Height: 'Height (m)',
    Weight: 'Weight (kg)',
    family_history_with_overweight: 'Family history with overweight',
    FAVC: 'Frequently consumed high-calorie food (FAVC)',
    FCVC: 'Frequency of vegetable consumption (FCVC)',
    NCP: 'Number of main meals (NCP)',
    CAEC: 'Consumption of food between meals (CAEC)',
    SMOKE: 'Do you smoke? (SMOKE)',
    CH2O: 'Daily water consumption (CH2O)',
    SCC: 'Monitor calories consumption (SCC)',
    FAF: 'Physical activity frequency (FAF)',
    TUE: 'Time using technology devices (TUE)',
    CALC: 'Alcohol consumption (CALC)',
    MTRANS: 'Transportation used (MTRANS)'
};

function ObesityForm(){
    const [features, setFeatures] = useState({
        Gender: '',
        Age: '',
        Height: '',
        Weight: '',
        family_history_with_overweight: '',
        FAVC: '',
        FCVC: '',
        NCP: '',
        CAEC: '',
        SMOKE: '',
        CH2O: '',
        SCC: '',
        FAF: '',
        TUE: '',
        CALC: '', 
        MTRANS: '',
    });

    const [prediction, setPrediction] = useState('');
    const [accuracy, setAccuracy] = useState('');
    const [confidence, setConfidence] = useState('');

    const handleChange = (e) => {
        setFeatures({ ...features, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsedFeatures = { ...features };
        Object.keys(parsedFeatures).forEach((key) => {
            if (!categoricalFields[key]) {
                parsedFeatures[key] = parseFloat(parsedFeatures[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:5000/predict', parsedFeatures);
        setPrediction(response.data.prediction);
        setAccuracy(response.data.accuracy);
        setConfidence(response.data.confidence);
        } 
        catch (error) {
            console.error(error);
            alert('Failed to predict!');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="prediction-form">
                {Object.keys(features).map((key) => (
                    <div key={key} className="form-group">
                        <label className="form-label">{fieldLabels[key]}</label>
                        {categoricalFields[key] ? (
                            <select
                                name={key}
                                value={features[key]}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="" disabled hidden></option>
                                {categoricalFields[key].map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="number"
                                name={key}
                                value={features[key]}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        )}
                    </div>
                ))}
                <button type="submit" className="submit-button">Predict</button>
            </form>

            {prediction && <h3 className="result-text">Prediction Result: {prediction}</h3>}
            {confidence && <h4 className="result-text-accuracy">Confidence: {confidence}%</h4>}
            {accuracy && <h4 className="result-text-accuracy">Model Accuracy: {accuracy}%</h4>}
        </div>
    );

}

export default ObesityForm;