import React, { useState, useEffect } from 'react';
import * as CallBackCarro from '../callBack/callBackCarro/CallBackCarro';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { XIcon } from '@heroicons/react/outline';
import * as CallbackModelo from '../callBack/callBackModelo/CallbackModelos'

function UpdateCarro() {

    const [searchTerm, setSearchTerm] = useState('');
    const [erroBusca, setErroBusca] = useState(false);
    const [listaCarros, setListaCarros] = useState([]);
    const [atualizadoSucesso, setDeletadoComSucesso] = useState(false)
    const [originalList, setOriginalList] = useState([]);
    const navigate = useNavigate();
    const [carroAtualizar, setCarroAtualizar] = useState(null);
    const [carroAtualizarModal, setCarroAtualizarModal] = useState(false)
    const [listaModelos, setListaModelos] = useState([]);
    const [modelo, setModelo] = useState('');

    useEffect (() => {
        const fetchModelos = async () => {
            const modelos = await CallbackModelo.callBackGetListaModelos();
            setListaModelos(modelos);
        };

        fetchModelos();
    },[]);

    const fetchCarros = async () => {
        const carros = await CallBackCarro.callBackGetListaCarros();
        setListaCarros(carros);
        setOriginalList(carros);
    };

    useEffect(() => {
        fetchCarros();
    }, []);


    const handleBuscaCarroDeletar = async () => {
        if (searchTerm === '') {
            setErroBusca(true);
            return;
        }

        const carrosFiltrados = await CallBackCarro.callBackGetCarroByNome(searchTerm);
        if (carrosFiltrados && carrosFiltrados.length > 0) {
            setErroBusca(false);
            setListaCarros(carrosFiltrados)
        } else {
            setErroBusca(true);
        }
        setSearchTerm('');
    }

    const handleLimparBusca = () => {
        setSearchTerm('');
        setListaCarros(originalList);
        setErroBusca(false);
        setDeletadoComSucesso(false);
    }

    const handleClickVoltar = () => {
        navigate('/');
    };

    const openEditModal = (carro) => {
        setCarroAtualizar(carro);
    }

    const closeEditModal = () => {
        setCarroAtualizar(null);
    };

    const handleAtualizar = async () => {
        const dadosCarro = {
            id: carroAtualizar.id,
            ano: carroAtualizar.ano,
            combustivel: carroAtualizar.combustivel,
            numPortas: carroAtualizar.numPortas,
            cor: carroAtualizar.cor,
            nomeModelo : modelo
        }
        try {
            await CallBackCarro.callBackUpdateCarro(dadosCarro);
            alert("Carro atualizado com sucesso!");
            setListaCarros((prevLista) =>
                prevLista.map((carro) =>
                    carro.id === carroAtualizar.id ? carroAtualizar : carro
                )
            );
            closeEditModal();
            setCarroAtualizarModal(false)
            fetchCarros();
        } catch (error) {
            console.error("Erro ao atualizar o carro:", error);
            alert("Ocorreu um erro ao atualizar o carro: " + error);
            closeEditModal();
            setCarroAtualizarModal(false)
        }
    };

    const handleModeloChange = (event) => {
        const novoModelo = event.target.value;
        setModelo(novoModelo);
        setCarroAtualizar({
            ...carroAtualizar,
            modelo: {
                nome: novoModelo
            }
        });
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
            <h1 className="text-2xl font-bold mb-4">Atualizar Carros</h1>
            <div className="relative mb-4 w-full max-w-md flex flex-row items-center">
                <input
                    className="border border-gray-300 rounded-md py-2 px-6 pl-10 w-full"
                    type="text"
                    placeholder='Pesquisar veiculo'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <button
                    className='ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                    onClick={handleBuscaCarroDeletar}>
                    Buscar
                </button>
                <button
                    className='ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                    onClick={handleLimparBusca}>
                    Limpar
                </button>
            </div>

            <div className="w-full max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg p-4 bg-white shadow">
                <ul>
                    {listaCarros.map((carro) => (
                        <li key={carro.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50 flex justify-between items-center">
                            <div>
                                <strong>Modelo:</strong> {carro.modelo ? carro.modelo.nome : "Modelo não disponível"}<br />
                                <strong>Ano:</strong> {carro.ano}<br />
                                <strong>Combustível:</strong> {carro.combustivel}<br />
                                <strong>Número de Portas:</strong> {carro.numPortas}<br />
                                <strong>Cor:</strong> {carro.cor}<br />
                                <strong>Valor Fipe: </strong>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(carro.modelo.valorFipe)}<br />
                                <strong>Marca:</strong> {carro.modelo && carro.modelo.marca ? carro.modelo.marca.nomeMarca : "Marca não disponível"}<br />
                            </div>
                            <button
                                className="bg-blue-600 hover:bg-blue text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => openEditModal(carro)}
                            >
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {carroAtualizar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Editar Carro</h2>
                        <select
                            value={carroAtualizar.modelo.nome}
                            onChange={handleModeloChange}
                            className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-md"
                        >
                            <option value={""} disabled>Selecione um Modelo</option>
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
                        <p className="text-lg font-bold mb-4" >Ano </p>
                        <input
                            type="number"
                            placeholder="Ano"
                            value={carroAtualizar.ano}
                            onChange={(e) => setCarroAtualizar({ ...carroAtualizar, ano: e.target.value })}
                            className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full"
                        />
                        <p className="text-lg font-bold mb-4" > Combustível </p>
                        <input
                            type="text"
                            placeholder="Combustível"
                            value={carroAtualizar.combustivel}
                            onChange={(e) => setCarroAtualizar({ ...carroAtualizar, combustivel: e.target.value })}
                            className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full"
                        />
                        <p className="text-lg font-bold mb-4" > Numero de portas </p>
                        <input
                            type="number"
                            placeholder="Numero de portas"
                            value={carroAtualizar.numPortas}
                            onChange={(e) => setCarroAtualizar({ ...carroAtualizar, numPortas: e.target.value })}
                            className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full"
                        />
                        <p className="text-lg font-bold mb-4" > Cor </p>
                        <input
                            type="text"
                            placeholder="Cor"
                            value={carroAtualizar.cor}
                            onChange={(e) => setCarroAtualizar({ ...carroAtualizar, cor: e.target.value })}
                            className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full"
                        />
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setCarroAtualizarModal(true)}
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
            {carroAtualizarModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmar Atualização ?</h2>
                        <p>Você tem certeza que deseja atualizar este Carro?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleAtualizar}
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
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
            {atualizadoSucesso && <p className="text-green-500 mt-3 font-bold"> Carro atualizado com sucesso</p>}
            {erroBusca && <p className="text-red-500 mt-3 font-bold">Nenhum resultado encontrado</p>}
        </div>
    );
}

export default UpdateCarro;