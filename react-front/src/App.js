import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModuloInicial from './moduloInicial/moduloInicial';
import CarroListarVeiculos from './carro/carroListaVeiculos';
import CarroDeletarVeiculo from './carro/carroDeletarVeiculo';
import CarroCadastrarVeiculo from './carro/carroCadastrarVeiculo'
import ModeloListar from './modelo/modeloListar'
import CadastrarModelo from './modelo/cadastrarModelo'
import ModeloDeletar from './modelo/deletarModelo';
import ListarMarca from './marca/marcaListar';
import DeletarMarca from './marca/deletarMarca';
import CadastrarMarca from './marca/cadastrarMarca';
import UpdateCarro from './carro/carroUpdate';
import UpdateModelo from './modelo/modeloUpdate';
import UpdateMarca from './marca/updateMarca';

function App() {
  return (
    <Router>
      <div className="min-h-screen "> {/* Adicione min-h-screen para preencher a altura total */}
        <div>
          <Routes>
            <Route path="/" element={<ModuloInicial />} /> {/* Rota inicial */}
            <Route path='/listarCarros' element={<CarroListarVeiculos />} /> {/* Rota para listar carros */}
            <Route path='/deletarveiculo' element={<CarroDeletarVeiculo />} /> {/* Rota para deletar veículo */}
            <Route path='/cadastrarVeiculo' element={< CarroCadastrarVeiculo/>}/>
            <Route path='/updateVeiculo' element={< UpdateCarro/>}/>
            <Route path='/listaModelos' element={< ModeloListar />}/>
            <Route path='/cadastrarModelo' element={<CadastrarModelo />}/>
            <Route path='/deletarModelo' element={<ModeloDeletar />}/>
            <Route path='/updateModelo' element={<UpdateModelo />}/>
            <Route path='/listarMarca' element={< ListarMarca/>}/>
            <Route path='/deletarMarca' element={< DeletarMarca/>}/>
            <Route path='/cadastrarMarca' element={< CadastrarMarca/>}/>
            <Route path='/updateMarca' element={< UpdateMarca/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
