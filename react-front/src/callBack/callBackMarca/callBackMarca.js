import axios from 'axios';

export const callBackGetMarcaByNome = async (nome) => {
    try{
        const response = await axios.get(`http://localhost:8080/marca/marcaNome/${nome}`);
        return response.data;   
    }catch(error){
        console.log('Erro ao listar marca por nome: ' + nome + ' ' + error);
    }
}


export const callBackGetListaMarca = async () => {
    try{
        const response = await axios.get(`http://localhost:8080/marca`);
        return response.data;   
    }catch(error){
        console.log('Erro ao listar marca ' + error);
    }
}


export const callBackDeletarMarca = async (id) => {
    try{
        const response = await axios.delete(`http://localhost:8080/marca/${id}`);
        return response;   
    }catch(error){
        console.log('Erro ao deletar marca id: ' + id + ' ' + error);
    }
}

export const callBackCadastrarMarca = async (nome) => {
    try{
        const response = await axios.post(`http://localhost:8080/marca`, nome);
        return response;   
    }catch(error){
        console.log('Erro ao cadastrar marca, nome: ' + nome + ' ' + error);
    }
}


export const callBackUpdateMarca = async (listaMarca) => {
    try{
        const response = await axios.put('http://localhost:8080/marca', listaMarca);
        return response;
    } catch (error) {
        console.log('Erro ao atualizar a marca' + error);
        return { status: error.response ? error.response.status : 500, message: error.message };
    }
}
