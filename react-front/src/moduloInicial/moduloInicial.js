import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import car from '../animation/car.json';
import car1 from '../animation/car1.json';
import car2 from '../animation/car2.json';
import car3 from '../animation/car3.json';

function ModuloInicial() {
    const [activeButton, setActiveButton] = useState('');
    const [activeAnimation, setActiveAnimation] = useState(true)
    const navigate = useNavigate();

    const handleListarVeiculosClick = () => {
        navigate('/listarCarros');
    };

    const handleDeletarModelo = () => {
        navigate('/deletarModelo');
    };

    const handleListarModelosClick = () => {
        navigate('/listaModelos');
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleDeletarVeiculosClick = () => {
        navigate('/deletarveiculo');
    }

    const handleCadastrarVeiculosClick = () => {
        navigate('/cadastrarVeiculo');
    }

    const handleCadastrarModeloClick = () => {
        navigate('/cadastrarModelo');
    }

    const handleListarMarcas = () => {
        navigate('/listarMarca')
    }

    const handleDeletarMarcas = () => {
        navigate('/deletarMarca')
    }

    const handleCadastrarMarca = () => {
        navigate('/cadastrarMarca')
    }

    const handleUpdateVeiculo = () => {
        navigate('/updateVeiculo')
    }

    const handleUpdateModelo = () => {
        navigate('/updateModelo')
    }

    const handleUpdateMarcas = () => {
        navigate('/updateMarca')
    }

    return (
        <div>
            <h1 className="flex items-center justify-center text-2xl font-bold py-1">Operações Veicular</h1>
            <div className="flex items-center justify-center space-x-4 py-3 mt-6">
                <button
                    className={`bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${activeButton === 'carros' ? 'opacity-100' : 'opacity-50'}`}
                    onClick={() => {handleButtonClick('carros'); setActiveAnimation(false); }}
                >
                    Carros
                </button>
                <button
                    className={`bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${activeButton === 'modelos' ? 'opacity-100' : 'opacity-50'}`}
                    onClick={() => {handleButtonClick('modelos'); setActiveAnimation(false);}}
                >
                    Modelos
                </button>
                <button
                    className={`bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${activeButton === 'marcas' ? 'opacity-100' : 'opacity-50'}`}
                    onClick={() => {handleButtonClick('marcas'); setActiveAnimation(false);}}
                >
                    Marcas
                </button>
                
            </div>
            {activeAnimation && (
                <div className = "flex items-center justify-center py-8 flex-col space-y-4">
                <Lottie animationData={car} style={{ height: 200, width: 200 }} />
            </div>
            )}
            {activeButton === 'carros' && (
                <div className="flex items-center justify-center py-8 flex-col space-y-4">
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleListarVeiculosClick}>
                        Listar Veículos
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleCadastrarVeiculosClick}>
                        Cadastrar Veículo
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleUpdateVeiculo}>
                        Atualizar Veículo
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleDeletarVeiculosClick}>
                        Deletar Veículos
                    </button>
                    <div className="flex items-center justify-center py-6">
                        <Lottie animationData={car3} style={{ height: 200, width: 200 }} />
                    </div>
                </div>
            )}
            {activeButton === 'marcas' && (
                <div className="flex items-center justify-center py-8 flex-col space-y-4">
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleListarMarcas}>
                        Listar Marcas
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleCadastrarMarca}>
                        Cadastrar Marcas
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleUpdateMarcas}>
                        Atualizar Marcas
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleDeletarMarcas}>
                        Deletar Marcas
                    </button>
                    <div className="flex items-center justify-center py-6">
                        <Lottie animationData={car2} style={{ height: 200, width: 200 }} />
                    </div>

                </div>
            )}
            {activeButton === 'modelos' && (
                <div className="flex items-center justify-center py-8 flex-col space-y-4">
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleListarModelosClick}>
                        Listar Modelos
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleCadastrarModeloClick}
                    >
                        Cadastrar Modelo
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleUpdateModelo}
                    >
                        Atualizar Modelo
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 w-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleDeletarModelo}
                    >
                        Deletar Modelo
                    </button>
                    <div className="flex items-center justify-center py-6">
                        <Lottie animationData={car1} style={{ height: 200, width: 200 }} />
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default ModuloInicial;
