import axios from 'axios';

    
export const callBackGetListaCarros = async () => {
    try {
        const response = await axios.get('http://localhost:8080/carro');
        return response.data;
    }
    catch (error) {
        console.log('Erro ao listar carros: ' + error);
    }
}

export const callBackGetCarroByNome = async (nome) => {
    try{
        const response = await axios.get(`http://localhost:8080/carro/modelo/${nome}`);
        return response.data;   
    }catch(error){
        console.log('Erro ao listar carro por nome: ' + nome + ' ' + error);
    }
}

export const callBackDeletarCarro = async (id) => {
    try{
        const response = await axios.delete(`http://localhost:8080/carro/deletar/${id}`);
        return response;   
    }catch(error){
        console.log('Erro ao listar carro por nome: ' + id + ' ' + error);
    }
}

export const callBackCadastrarCarro = async (listaCarros) => {
    try{
        const response = await axios.post('http://localhost:8080/carro', listaCarros);
        return response;
    } catch (error) {
        console.log('Erro ao cadastrar o veiculo' + error);
        return { status: error.response ? error.response.status : 500, message: error.message };
    }
}

export const callBackUpdateCarro = async (listaCarros) => {
    try{
        const response = await axios.put('http://localhost:8080/carro', listaCarros);
        return response;
    } catch (error) {
        console.log('Erro ao Atualizar o veiculo' + error);
        return { status: error.response ? error.response.status : 500, message: error.message };
    }
}