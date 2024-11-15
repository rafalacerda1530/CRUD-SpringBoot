import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { XIcon } from '@heroicons/react/outline';
import * as CallBackMarca from '../callBack/callBackMarca/callBackMarca'

function CadastrarMarca () {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nomeMarca, setNomeMarca] = useState('')

    const handleSubmit = async () => {
        const dadosMarca= {
            nomeMarca: nomeMarca
        }

        try{
            const response = await CallBackMarca.callBackCadastrarMarca(dadosMarca)
            if (response.status === 201){
                alert("Marca cadastrado com sucesso.");
                setNomeMarca('')
                setIsModalOpen(false);
            }
            else if  (response.status === 400){
                alert("Erro ao cadastrar o Marca, por gentileza validar se não tem nenhum dado importante faltando.");
                setIsModalOpen(false);
            }
            else{
                const errorDetails = response.data;
                const errorMessage = errorDetails.details
                alert("Erro ao cadastrar o Marca: " + errorMessage);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert("Erro ao cadastrar o Marca: " + error);
        }
    }

    const handleClickVoltar = () => {
        navigate('/');
    }
    
    const handleConfirm = () => {
        handleSubmit();
    }

    return (
        <div>
            <button
                onClick={handleClickVoltar}
                className="absolute top-16 left-6 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <XIcon className='h-6 w-6' />
            </button>
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="flex flex-col space-y-5 items-center p-8">
                <h1 className="text-2xl font-bold mb-4"> Cadastrar Marca </h1>
                <input
                    type='text'
                    placeholder='Nome Marca'
                    value={nomeMarca}
                    onChange={(e) => setNomeMarca(e.target.value)}
                    className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                />
                <button 
                    type="submit" 
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Cadastrar
                </button>
            </form>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmar Cadastro</h2>
                        <p>Você tem certeza que deseja cadastrar esta Marca?</p>
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
    )
}

export default CadastrarMarca;