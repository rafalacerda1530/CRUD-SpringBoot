import React, { useState, useEffect } from 'react';
import * as CallBackMarca from '../callBack/callBackMarca/callBackMarca'
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { XIcon } from '@heroicons/react/outline';

function UpdateMarca() {
    const [searchTerm, setSearchTerm] = useState('');
    const [erroBusca, setErroBusca] = useState(false);
    const [ListaMarca, setListaMarca] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const navigate = useNavigate();
    const [marcaAtualizar, setmarcaAtualizar] = useState(null);
    const [marcaAtualizarModal, setmarcaAtualizarModal] = useState(false);
    const [atualizadoSucesso, setDeletadoComSucesso] = useState(false);

    const fetchMarcas = async () => {
        const marcas = await CallBackMarca.callBackGetListaMarca();
        setListaMarca(marcas);
        setOriginalList(marcas);
    };

    useEffect(() => {
        fetchMarcas();
    }, []);

    const handleBuscamarcas = async () => {
        if (searchTerm === '') {
            setErroBusca(true);
            return;
        }

        const marcasFiltradas = await CallBackMarca.callBackGetMarcaByNome(searchTerm);
        if (marcasFiltradas && marcasFiltradas.length > 0) {
            setErroBusca(false);
            setListaMarca(marcasFiltradas);
        } else {
            setErroBusca(true);
        }
        setSearchTerm('');
    };

    const handleLimparBusca = () => {
        setSearchTerm('');
        setListaMarca(originalList);
        setErroBusca(false);
        setDeletadoComSucesso(false);
    };

    const handleClickVoltar = () => {
        navigate('/');
    };

    const openEditModal = (marca) => {
        setmarcaAtualizar(marca);
    };

    const closeEditModal = () => {
        setmarcaAtualizar(null);
    };

    const handleAtualizar = async () => {
        const dadosMarca = {
            id: marcaAtualizar.id,
            nomeMarca : marcaAtualizar.nomeMarca
        };
        try {
            const response =  await CallBackMarca.callBackUpdateMarca(dadosMarca);
            if (response.status === 200){
                alert('marca atualizada com sucesso!');
                setListaMarca((prevLista) =>
                    prevLista.map((marca) =>
                        marca.id === marcaAtualizar.id ? marcaAtualizar : marca
                    )
                );
                fetchMarcas();
            }else{
                alert ("Erro ao atualizar marca : " + response.message)
            }
            closeEditModal();
            setmarcaAtualizarModal(false);
        } catch (error) {
            console.error('Erro ao atualizar o marca:', error);
            alert('Ocorreu um erro ao atualizar o marca: ' + error);
            closeEditModal();
            setmarcaAtualizarModal(false);
        }
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
            <h1 className="text-2xl font-bold mb-4">Atualizar Marca</h1>
            <div className="relative mb-4 w-full max-w-md flex flex-row items-center">
                <input
                    className="border border-gray-300 rounded-md py-2 px-6 pl-10 w-full"
                    type="text"
                    placeholder="Pesquisar veiculo"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <button
                    className="ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleBuscamarcas}
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
                    {ListaMarca.map((marca) => (
                        <li key={marca.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50 flex justify-between items-center">
                            <div>
                                <strong>marca:</strong> {marca.nomeMarca ? marca.nomeMarca : 'marca não disponível'}<br />
                            </div>
                            <button
                                className="bg-blue-600 hover:bg-blue text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => openEditModal(marca)}
                            >
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {marcaAtualizar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Editar Marca</h2>

                        <p className="text-lg font-bold mb-4">Nome Marca </p>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={marcaAtualizar.nomeMarca}
                            onChange={(e) => setmarcaAtualizar({ ...marcaAtualizar, nomeMarca: e.target.value })}
                            className="bg-blue-100 border border-gray-300 rounded-md py-2 px-4 mb-4 w-full"
                        />

                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setmarcaAtualizarModal(true)}
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

            {marcaAtualizarModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmar Atualização ?</h2>
                        <p>Você tem certeza que deseja atualizar esta Marca?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleAtualizar}
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => setmarcaAtualizarModal(false)}
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

export default UpdateMarca;