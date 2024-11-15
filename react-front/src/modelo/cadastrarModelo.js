import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { XIcon } from '@heroicons/react/outline';
import * as CallbackModelo from '../callBack/callBackModelo/CallbackModelos'
import * as CallBackMarca from '../callBack/callBackMarca/callBackMarca'

function CadastrarModelo() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelo, setModelo] = useState('')
    const [marca, setMarca] = useState('')
    const [valorFipe, setValorFipe] = useState('')
    const [nomeMarca, setNomeMarca] = useState('')
    const [valorNumerico, setValorNumerico] = useState(0)
    const [listaMarcas, setListaMarca] = useState([])

    useEffect(() => {
        const fetchMarca = async () => {
            const marca = await CallBackMarca.callBackGetListaMarca();
            setListaMarca(marca);
        };

        fetchMarca();
    }, []);
    
    const handleSubmit = async () => {
        const dadosModelo= {
            nome: modelo,
            valorFipe: valorNumerico,
            nomeMarca: marca
        }

        try{
            const response = await CallbackModelo.callBackCadastrarModelo(dadosModelo)
            if (response.status === 201){
                alert("Modelo cadastrado com sucesso.");
                setModelo('')
                setNomeMarca('')
                setValorFipe('')
                setIsModalOpen(false);
            }
            else if  (response.status === 400){
                alert("Erro ao cadastrar o Modelo, por gentileza validar se não tem nenhum dado importante faltando.");
                setIsModalOpen(false);
            }
            else{
                const errorDetails = response.data;
                const errorMessage = errorDetails.details
                alert("Erro ao cadastrar o Modelo: " + errorMessage);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert("Erro ao cadastrar o Modelo: " + error);
        }
    }

    const handleClickVoltar = () => {
        navigate('/');
    }
    
    const handleConfirm = () => {
        handleSubmit();
    }

    const handleValorChange = (e) => {
        const somenteNumeros = e.target.value.replace(/\D/g, '')

        const valorNumerico = parseFloat(somenteNumeros) / 100;

        const valorFormatado = new Intl.NumberFormat('PT-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(somenteNumeros / 100);

        setValorNumerico(valorNumerico)
        setValorFipe(valorFormatado)
    }

    const handleMarcaChange = (event) => {
        setMarca(event.target.value);
    };

    return (
        <div>
            <button
                onClick={handleClickVoltar}
                className="absolute top-16 left-6 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <XIcon className='h-6 w-6' />
            </button>
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="flex flex-col space-y-5 items-center p-8">
                <h1 className="text-2xl font-bold mb-4"> Cadastrar Modelo </h1>
                <select
                    value={marca}
                    onChange={handleMarcaChange}
                    className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                >
                <option value="" disabled>Selecione uma Marca</option>
                {listaMarcas.length > 0 ? (
                    listaMarcas.map((item, index) => {
                        const nomeMarca = item.nomeMarca || item;
                        return (
                            <option key={index} value={nomeMarca}>
                                {nomeMarca}
                            </option>
                        );
                    })
                ) : (
                    <option disabled>Nenhuma sugestão encontrada</option>
                )}
                </select>
                <input
                    type='text'
                    placeholder='Modelo'
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                />
                <input
                    type='text'
                    placeholder='Valor Fipe'
                    value={valorFipe}
                    onChange={handleValorChange}
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
                        <p>Você tem certeza que deseja cadastrar este Modelo?</p>
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

export default CadastrarModelo