import React, { useState, useEffect } from 'react';
import * as CallBackCarro from '../callBack/callBackCarro/CallBackCarro';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { XIcon } from '@heroicons/react/outline';

function CarroListarVeiculos() {
    const [listaCarros, setListaCarros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalList, setOriginalList] = useState([]);
    const [erroBusca, setErroBusca] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarros = async () => {
            const carros = await CallBackCarro.callBackGetListaCarros();
            setListaCarros(carros);
            setOriginalList(carros);
        };

        fetchCarros();
    }, []);

    const handleClickVoltar = () => {
        navigate('/');
    };

    const handleBuscaCarro = async () => {
        if (searchTerm === '') {
            setListaCarros(originalList);
            setErroBusca(true);
            return;
        }

        const carrosFiltrados = await CallBackCarro.callBackGetCarroByNome(searchTerm);
        if (carrosFiltrados && carrosFiltrados.length > 0) {
            setErroBusca(false);
            setListaCarros(carrosFiltrados);
        } else {
            setListaCarros(originalList);
            setErroBusca(true);
        }
        setSearchTerm('');

    };

    const handleLimparBusca = () => {
        setSearchTerm('');
        setListaCarros(originalList);
        setErroBusca(false);
    }



    return (

        <div className="flex flex-col items-center p-5">
            <div>
                <button
                    onClick={handleClickVoltar}
                    className="absolute top-16 left-6 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <XIcon className="h-6 w-6" />
                </button>
            <h1 className="text-2xl font-bold mb-4">Lista de Carros</h1>
            <div className="relative mb-4 w-70 flex flex-row items-center">
                <input
                    type="text"
                    placeholder="Pesquisar por nome do modelo..."
                    className="border border-gray-300 rounded-md py-2 px-4 pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <button
                    className='ml-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                    onClick={handleBuscaCarro}
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
                    {listaCarros.map((carro) => (
                        <li key={carro.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
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
                            <strong>Marca:</strong> {carro.modelo ? carro.modelo.marca.nomeMarca : 'Não disponível'}<br />
                        </li>
                    ))}
                </ul>
            </div>

            {erroBusca && <p className="text-red-500 mt-3 font-bold">Nenhum resultado encontrado</p>}
            </div>
        </div>
    );
}

export default CarroListarVeiculos;
