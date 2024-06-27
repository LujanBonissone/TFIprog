// components/imc/IMC.jsx

import './imc.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Asegúrate de importar el icono correcto
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);
            determineBMICategory(bmiValue);
        }
    };

    const determineBMICategory = (bmiValue) => {
        let category = '';
        if (bmiValue < 18.5) {
            category = 'Peso bajo';
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            category = 'Peso normal';
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            category = 'Sobrepeso';
        } else {
            category = 'Obesidad';
        }
        setCategory(category);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateBMI();
    };

    return (
        <div>
            <Navbar />
            <div className="modal">
                <div className="mContainer">
                    
                    <div className="mTitle">Calculadora de IMC</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="formInput"
                            type="number"
                            placeholder="Peso (kg)"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <input
                            className="formInput"
                            type="number"
                            placeholder="Altura (cm)"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <button className="mButton" type="submit">Calcular</button>
                    </form>
                    {bmi && (
                        <div className="bmiResult">
                            <p>Tu IMC es: {bmi}</p>
                            <p>Categoría: {category}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BMICalculator;
