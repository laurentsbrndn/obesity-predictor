import './components/ObesityForm/ObesityForm.css';
import ObesityForm from './components/ObesityForm/ObesityForm';
import '/src/App.css';

function App(){
  return (
    <div className="page-container">
      <h1>Obesity Classification Prediction</h1>
      <ObesityForm />
    </div>
  );
}

export default App