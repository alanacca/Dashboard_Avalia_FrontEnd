import { DashBoardAxios } from "../plugins/axios";

function countProducoes(idCurriculo){
    return DashBoardAxios.get('/dashboard/contar/'+idCurriculo)
}

export{countProducoes}