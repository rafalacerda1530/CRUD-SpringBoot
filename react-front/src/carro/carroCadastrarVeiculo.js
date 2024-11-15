import React, { useState, useEffect } from 'react';
import * as CallBackCarro from '../callBack/callBackCarro/CallBackCarro';
import { XIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import * as CallbackModelo from '../callBack/callBackModelo/CallbackModelos'

function CarroCadastrarVeiculo() {
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [combustivel, setCombustivel] = useState('');
    const [numPortas, setNumPortas] = useState('');
    const [cor, setCor] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [listaModelos, setListaModelos] = useState([]);

    useEffect (() => {
        const fetchModelos = async () => {
            const modelos = await CallbackModelo.callBackGetListaModelos();
            setListaModelos(modelos);
        };

        fetchModelos();
    },[]);

    const handleSubmit = async () => {
        const dadosCarro = {
            nomeModelo: modelo,
            ano: parseInt(ano),
            combustivel: combustivel,
            numPortas: parseInt(numPortas),
            cor: cor
        };

        try {
            const response = await CallBackCarro.callBackCadastrarCarro(dadosCarro);
            
            if (response.status === 201) {
                alert("Carro cadastrado com sucesso.");
                setModelo('');
                setAno('');
                setCombustivel('');
                setNumPortas('');
                setCor('');
                setIsModalOpen(false); 
            } else if (response.status === 404) {
                alert("Erro ao cadastrar o carro, validar se o modelo inserido realmente existe, tente novamente.");
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert("Erro ao cadastrar o carro: " + error);
        }
    };

    const handleConfirm = () => {
        handleSubmit();
    };

    const handleClickVoltar = () => {
        navigate('/');
    }

    const handleModeloChange = (event) => {
        setModelo(event.target.value);
    };
    
    return (
        <div>
            <button 
                onClick={handleClickVoltar}
                className="absolute top-16 left-6 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <XIcon className="h-6 w-6" />
            </button>

            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="flex flex-col space-y-5 items-center p-8">
                <h1 className="text-2xl font-bold mb-4">Cadastrar Carro</h1>
                <select
                    value={modelo}
                    onChange={handleModeloChange}
                    className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                >
                <option value="" disabled>Selecione um Modelo</option>
                {listaModelos.length > 0 ? (
                    listaModelos.map((item, index) => {
                        const nomeModelo = item.nome || item;
                        return (
                            <option key={index} value={nomeModelo}>
                                {nomeModelo}
                            </option>
                        );
                    })
                ) : (
                    <option disabled>Nenhuma sugestão encontrada</option>
                )}
            </select>
                <input 
                    type="number" 
                    placeholder="Ano" 
                    value={ano} 
                    onChange={(e) => setAno(e.target.value)}
                    className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                />
                <input 
                    type="text" 
                    placeholder="Combustível" 
                    value={combustivel} 
                    onChange={(e) => setCombustivel(e.target.value)}
                    className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                />
                <input 
                    type="number" 
                    placeholder="Número de Portas" 
                    value={numPortas} 
                    onChange={(e) => setNumPortas(e.target.value)}
                    className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                />
                <input 
                    type="text" 
                    placeholder="Cor" 
                    value={cor} 
                    onChange={(e) => setCor(e.target.value)}
                    className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                />
                
                <button 
                    type="submit" 
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Cadastrar
                </button>
            </form>

            {/* Modal de Confirmação */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmar Cadastro</h2>
                        <p>Você tem certeza que deseja cadastrar este carro?</p>
                        <div className="mt-4 flex justify-between">
                            <button 
                                onClick={handleConfirm} 
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarroCadastrarVeiculo;
