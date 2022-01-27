import { DashBoardAxios } from "../plugins/axios";

function pesquisar(nome){
    return DashBoardAxios.get('/pesquisa/'+nome)
}

export {pesquisar}