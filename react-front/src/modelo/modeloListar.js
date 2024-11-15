import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { XIcon } from '@heroicons/react/outline';
import * as CallbackModelo from '../callBack/callBackModelo/CallbackModelos'

function ModeloListar() {
    const [listaModelos, setListaModelos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalList, setOriginalList] = useState([]);
    const [erroBusca, setErroBusca] = useState(false);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchModelos = async () => {
            const modelos = await CallbackModelo.callBackGetListaModelos();
            setListaModelos(modelos);
            setOriginalList(modelos);
        };

        fetchModelos();
    },[]);

    const handleBuscaModelo = async () => {
        if (searchTerm === '') {
            setListaModelos(originalList);
            setErroBusca(true);
            return;
        }
        const modelosFiltrados = await CallbackModelo.callBackGetListaModelosByNome(searchTerm);
        if (modelosFiltrados && modelosFiltrados.length > 0){
            setErroBusca(false);
            setListaModelos(modelosFiltrados);
        } else {
            alert(modelosFiltrados.status)
            setListaModelos(originalList);
            setErroBusca(true);
        }
        setSearchTerm('');
    }
    const handleClickVoltar = () => {
        navigate('/');
    };

    const handleLimparBusca = () => {
        setSearchTerm('');
        setListaModelos(originalList);
        setErroBusca(false);
    }

    return (
        <div className='flex flex-col items-center p-5'>
            <div>
                <button
                    onClick={handleClickVoltar}
                    className='absolute top-16 left-6 text-gray-500 hover:text-gray-700 focus:outline-none'
                >
                    <XIcon className='h-6 w-6' />
                </button>
                <h1 className='text-2xl font-bold mb-4'>Lista de Modelos</h1>
                <div className="relative mb-4 w-70 flex flex-row items-center">
                    <input
                        type='text'
                        placeholder='Pesquisar Modelo'
                        className='border border-gray-300 rounded-md py-2 px-4 pl-10 w-full'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <BiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <button
                        className='ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={handleBuscaModelo}
                    >
                        Buscar
                    </button>
                    <button
                        className='ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={handleLimparBusca}
                    >
                        Limpar
                    </button>
                </div>
                <div className="w-full max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg p-4 bg-white shadow">
                    <ul>
                        {listaModelos.map((modelo) => (
                            <li key={modelo.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                                <strong>Modelo: </strong> {modelo.nome ? modelo.nome : "Modelo não disponivel"} <br/>
                                <strong>Valor Fipe: </strong> 
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(modelo.valorFipe)}<br/>
                                <strong>Marca: </strong> {modelo.marca.nomeMarca} <br/>
                            </li>
                        ))}
                    </ul>
                </div>
                {erroBusca && <p className="text-red-500 mt-3 font-bold">Nenhum resultado encontrado</p>}
            </div>
        </div>
    )
}

export default ModeloListar