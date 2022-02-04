import { DashBoardAxios } from "../plugins/axios";

function pesquisar(id){
    return DashBoardAxios.get('/pesquisa/'+id)
}


export {pesquisar}