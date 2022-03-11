import { DashBoardAxios } from "../plugins/axios";

function countProducoes(idCurriculo){
    return DashBoardAxios.get('/dashboard/contar/'+idCurriculo)
}

function listCapitulos(idCurriculo){
    return DashBoardAxios.get('/capitulosAutores/listar/'+idCurriculo)
}

export{countProducoes,listCapitulos}