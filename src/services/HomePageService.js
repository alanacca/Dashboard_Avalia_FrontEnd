import { DashBoardAxios } from "../plugins/axios";

function pesquisar(idPessoa,idPlat){
    return DashBoardAxios.get('/pesquisa/'+idPessoa+'/'+idPlat)
}


export {pesquisar}