import axios from 'axios';


export const callBackGetListaModelos = async () => {
    try{
        const response = await axios.get('http://localhost:8080/modelo');
        return response.data
    } catch (error){
        console.log('Erro ao listar modelos: ' + error);
    }
}

export const callBackGetListaModelosByNome = async (nome) => {
    try{
        const response = await axios.get(`http://localhost:8080/modelo/modeloNome/${nome}`);
        return response.data
    } catch (error){
        console.log('Erro ao listar modelos: ' + error);
    }
}


export const callBackCadastrarModelo = async (listaModelo) => {
    try{
        const response = await axios.post(`http://localhost:8080/modelo`, listaModelo);
        return response
    } catch (error){
        const errorResponse = error.response ? error.response : { status: 500, data: { details: error.message } };
        return errorResponse; 
    }
}

export const callBackDeletarModelo = async (id) => {
    try{
        const response = await axios.delete(`http://localhost:8080/modelo/${id}`);
        return response;   
    }catch(error){
        console.log('Erro ao deletar marca id: ' + id + ' ' + error);
    }
}


export const callBackUpdateModelo = async (listaModelo) => {
    try{
        const response = await axios.put('http://localhost:8080/modelo', listaModelo);
        return response;
    } catch (error) {
        console.log('Erro ao atualizar o modelo' + error);
        return { status: error.response ? error.response.status : 500, message: error.message };
    }
}