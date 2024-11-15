import React, { useState, useEffect } from 'react';
import * as CallBackCarro from '../callBack/callBackCarro/CallBackCarro';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi'; 
import { XIcon } from '@heroicons/react/outline';

function CarroDeletarVeiculo (){
    const [searchTerm, setSearchTerm] = useState('');
    const [erroBusca, setErroBusca] = useState(false);
    const [listaCarros, setListaCarros] = useState([]);
    const [deletadoSucesso, setDeletadoComSucesso] = useState(false)
    const [originalList, setOriginalList] = useState([]);
    const navigate = useNavigate();
    const [carroIdParaDeletar, setCarroIdParaDeletar] = useState(null);

    useEffect(() => {
        const fetchCarros = async () => {
            const carros = await CallBackCarro.callBackGetListaCarros();
            setListaCarros(carros);
            setOriginalList(carros);
        };

        fetchCarros();
    }, []);

    const handleDeletar = async (id) => {
        try {
            const carroDeletado = await CallBackCarro.callBackDeletarCarro(id);
            if (carroDeletado.status === 204) {
                alert("Carro deletado com sucesso!");
                setListaCarros((prevLista) => prevLista.filter(carro => carro.id !== id));
                setDeletadoComSucesso(true)
                closeDeleteModal();
            } else {
                alert("Erro ao deletar")
                closeDeleteModal();
            }
        }catch (error) {
            console.error("Erro ao deletar o carro:", error);
            alert("Ocorreu um erro ao deletar o carro: " + error);
            closeDeleteModal();
        }
    }

    const handleBuscaCarroDeletar = async () => {
        if (searchTerm === '') {
            setErroBusca(true);
            return;
        }

        const carrosFiltrados = await CallBackCarro.callBackGetCarroByNome(searchTerm);
        if (carrosFiltrados && carrosFiltrados.length > 0){
            setErroBusca(false);
            setListaCarros(carrosFiltrados)
        }else {
            setErroBusca(true);
        }
        setSearchTerm('');
    }

    const handleLimparBusca = () => {
        setSearchTerm('');
        setListaCarros(originalList);
        setErroBusca(false);
        setDeletadoComSucesso(false)
    }

    const handleClickVoltar = () => {
        navigate('/');
    };

    const openDeleteModal = (id) => {
        setCarroIdParaDeletar(id);
    };

    const closeDeleteModal = () => {
        setCarroIdParaDeletar(null);
    };
    return(
        
        <div className="flex flex-col items-center p-5">
            <div>
            <button 
                onClick={handleClickVoltar}
                className="absolute top-16 left-6 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <XIcon className="h-6 w-6" />
            </button>
        </div>
            <h1 className="text-2xl font-bold mb-4">Deletar Carros</h1>
            <div className="relative mb-4 w-full max-w-md flex flex-row items-center">
                <input 
                    className="border border-gray-300 rounded-md py-2 px-6 pl-10 w-full"
                    type = "text"
                    placeholder='Pesquisar modelo'
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
                                    }).format(carro.modelo.valorFipe)}<br/>
                                <strong>Marca:</strong> {carro.modelo.marca.nomeMarca}<br />
                            </div>
                            <button
                                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => openDeleteModal(carro.id)}
                            >
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {carroIdParaDeletar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmar Cadastro</h2>
                        <p>Você tem certeza que deseja deletar este Carro?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => handleDeletar(carroIdParaDeletar)}
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
            {deletadoSucesso && <p className="text-green-500 mt-3 font-bold"> Carro Deletado com sucesso</p>}
            {erroBusca && <p className="text-red-500 mt-3 font-bold">Nenhum resultado encontrado</p>}
        </div>
    );
}

export default CarroDeletarVeiculo;
