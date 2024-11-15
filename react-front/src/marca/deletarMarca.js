import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { XIcon } from '@heroicons/react/outline';
import * as CallBackMarca from '../callBack/callBackMarca/callBackMarca'


function DeletarMarca () {
    const [listaMarca, setlistaMarca] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalList, setOriginalList] = useState([]);
    const [erroBusca, setErroBusca] = useState(false);
    const navigate = useNavigate();
    const [deletadoSucesso, setDeletadoComSucesso] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [marcaIdParaDeletar, setMarcaIdParaDeletar] = useState(null);

    useEffect(() => {
        const fetchMarca = async () => {
            const marca = await CallBackMarca.callBackGetListaMarca();
            setlistaMarca(marca);
            setOriginalList(marca);
        };

        fetchMarca();
    }, []);
    
    const handleDeletar = async (id) => {
        try {

            const marcadeletado = await CallBackMarca.callBackDeletarMarca(id);
            if (marcadeletado.status === 204){
                alert("Marca deletada com sucesso.");
                setlistaMarca((prevLista) => prevLista.filter(marca=>marca.id !== id));
                setDeletadoComSucesso(true);
                closeDeleteModal();
            }else{
                alert("Erro ao deletar")
                closeDeleteModal();
            }
            
        } catch (error) {
            console.error("Erro ao deletar a marca:", error);
            alert("Ocorreu um erro ao deletar a marca: " + error);
            closeDeleteModal();
        }
    }

    const handleBuscaMarcaDeletar = async () => {
        if (searchTerm === '') {
            setErroBusca(true);
            return;
        }

        const marcaFiltrado = await CallBackMarca.callBackGetMarcaByNome(searchTerm);
        if (marcaFiltrado && marcaFiltrado.length > 0 ){
            setErroBusca(false);
            setlistaMarca(marcaFiltrado);
        }else {
            setlistaMarca(originalList);
            setErroBusca(true);
        }
        
        setSearchTerm('');
    }

    const handleLimparBusca = () => {
        setSearchTerm('');
        setlistaMarca(originalList);
        setErroBusca(false);
        setDeletadoComSucesso(false)
    }

    const handleClickVoltar = () => {
        navigate('/');
    };

    const openDeleteModal = (id) => {
        setMarcaIdParaDeletar(id);
    };

    const closeDeleteModal = () => {
        setMarcaIdParaDeletar(null);
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
            <h1 className="text-2xl font-bold mb-4">Deletar Marcas</h1>
            <div className="relative mb-4 w-full max-w-md flex flex-row items-center">
                <input
                    className="border border-gray-300 rounded-md py-2 px-6 pl-10 w-full"
                    type="text"
                    placeholder='Pesquisar Marca'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <button
                    className='ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                    onClick={handleBuscaMarcaDeletar}>
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
                    {listaMarca.map((marca) => (
                        <li key={marca.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50 flex justify-between items-center">
                            <div>
                                <strong> Marca: </strong> {marca.nomeMarca ? marca.nomeMarca : "Marca não disponivel"} <br />
                            </div>
                            <button
                                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => openDeleteModal(marca.id)}
                            >
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {marcaIdParaDeletar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmar Cadastro</h2>
                        <p>Você tem certeza que deseja deletar esta marca?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => handleDeletar(marcaIdParaDeletar)}
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deletadoSucesso && <p className="text-green-500 mt-3 font-bold"> Marca Deletada com sucesso</p>}
            {erroBusca && <p className="text-red-500 mt-3 font-bold">Nenhum resultado encontrado</p>}
        </div>
    );
}

export default DeletarMarca;