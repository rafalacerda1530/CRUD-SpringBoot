import React, { useState, useEffect } from 'react';
import * as CallbackModelo from '../callBack/callBackModelo/CallbackModelos';
import * as CallBackMarca from '../callBack/callBackMarca/callBackMarca'
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { XIcon } from '@heroicons/react/outline';

function UpdateModelo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [erroBusca, setErroBusca] = useState(false);
    const [ListaModelo, setListaModelo] = useState([]);
    const [atualizadoSucesso, setDeletadoComSucesso] = useState(false);
    const [originalList, setOriginalList] = useState([]);
    const [modeloAtualizar, setmodeloAtualizar] = useState(null);
    const [modeloAtualizarModal, setmodeloAtualizarModal] = useState(false);
    const [listaMarcas, setListaMarca] = useState([])
    const [marca, setMarca] = useState('')
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchMarca = async () => {
            const marca = await CallBackMarca.callBackGetListaMarca();
            setListaMarca(marca);
        };

        fetchMarca();
    }, []);
    
    const fetchModelos = async () => {
        const modelos = await CallbackModelo.callBackGetListaModelos();
        setListaModelo(modelos);
        setOriginalList(modelos);
    };

    useEffect(() => {
        fetchModelos();
    }, []);

    const handleBuscaModelos = async () => {
        if (searchTerm === '') {
            setErroBusca(true);
            return;
        }

        const modelosFiltrados = await CallbackModelo.callBackGetListaModelosByNome(searchTerm);
        if (modelosFiltrados && modelosFiltrados.length > 0) {
            setErroBusca(false);
            setListaModelo(modelosFiltrados);
        } else {
            setErroBusca(true);
        }
        setSearchTerm('');
    };

    const handleLimparBusca = () => {
        setSearchTerm('');
        setListaModelo(originalList);
        setErroBusca(false);
        setDeletadoComSucesso(false);
    };

    const handleClickVoltar = () => {
        navigate('/');
    };

    const openEditModal = (modelo) => {
        setmodeloAtualizar(modelo);
    };

    const closeEditModal = () => {
        setmodeloAtualizar(null);
    };

    const handleAtualizar = async () => {
        const dadosModelo = {
            id: modeloAtualizar.id,
            valorFipe: modeloAtualizar.valorFipe,
            nome: modeloAtualizar.nome,
            nomeMarca: modeloAtualizar.marca.nomeMarca,
        };
        try {
            const response = await CallbackModelo.callBackUpdateModelo(dadosModelo);
            if (response.status === 200) {
                alert('Modelo atualizado com sucesso!');
                setListaModelo((prevLista) =>
                    prevLista.map((modelo) =>
                        modelo.id === modeloAtualizar.id ? modeloAtualizar : modelo
                    )
                );
                fetchModelos();
            } else {
                alert("Erro ao atualizar Modelo : " + response.message)
            }
            closeEditModal();
            setmodeloAtualizarModal(false);
        } catch (error) {
            console.error('Erro ao atualizar o modelo:', error);
            alert('Ocorreu um erro ao atualizar o modelo: ' + error);
            closeEditModal();
            setmodeloAtualizarModal(false);
        }
    };

    const handleValorChange = (e) => {
        const value = e.target.value.replace(/\D/g, '') 
        const valorNumerico = parseFloat(value) / 100; 

        setmodeloAtualizar({
            ...modeloAtualizar,
            valorFipe: valorNumerico, 
        });


    };

    const handleMarcaChange = (event) => {
        const novaMarca = event.target.value; 
        setMarca(novaMarca); 
        setmodeloAtualizar((prevState) => ({
            ...prevState,
            marca: {
                ...prevState.marca,
                nomeMarca: novaMarca, 
            },
        }));
    };

    return (
        <div className="flex flex-col items-center p-5">
            <div>
                <button
                    onClick={handleClickVoltar}
                    className="absolute top-16 left-6 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Atualizar Modelos</h1>
            <div className="relative mb-4 w-full max-w-md flex flex-row items-center">
                <input
                    className="border border-gray-300 rounded-md py-2 px-6 pl-10 w-full"
                    type="text"
                    placeholder="Pesquisar modelo"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <button
                    className="ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleBuscaModelos}
                >
                    Buscar
                </button>
                <button
                    className="ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleLimparBusca}
                >
                    Limpar
                </button>
            </div>

            <div className="w-full max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg p-4 bg-white shadow">
                <ul>
                    {ListaModelo.map((modelo) => (
                        <li key={modelo.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50 flex justify-between items-center">
                            <div>
                                <strong>Modelo:</strong> {modelo.nome ? modelo.nome : 'Modelo não disponível'}<br />
                                <strong>Valor Fipe: </strong>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(modelo.valorFipe)}<br />
                                <strong>Marca:</strong> {modelo.marca.nomeMarca}<br />
                            </div>
                            <button
                                className="bg-blue-600 hover:bg-blue text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => openEditModal(modelo)}
                            >
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {modeloAtualizar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Editar Modelo</h2>
                        <p className="text-lg font-bold mb-4">Marca</p>
                        <select
                            value={modeloAtualizar.marca.nomeMarca}
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
                        <p className="text-lg font-bold mb-4">Nome Modelo </p>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={modeloAtualizar.nome}
                            onChange={(e) => setmodeloAtualizar({ ...modeloAtualizar, nome: e.target.value })}
                            className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full"
                        />
                        <p className="text-lg font-bold mb-4">Valor Fipe</p>
                        <input
                            type="text" 
                            placeholder="Valor Fipe"
                            value={new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(modeloAtualizar.valorFipe)} 
                            onChange={handleValorChange} 
                            className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full"
                        />

                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setmodeloAtualizarModal(true)}
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Salvar
                            </button>
                            <button
                                onClick={closeEditModal}
                                className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {modeloAtualizarModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmar Atualização ?</h2>
                        <p>Você tem certeza que deseja atualizar este modelo?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleAtualizar}
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => setmodeloAtualizarModal(false)}
                                className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {erroBusca && <p className="text-red-500 mt-3 font-bold">Nenhum resultado encontrado</p>}
        </div>
    );
}

export default UpdateModelo;
