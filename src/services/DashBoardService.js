import { DashBoardAxios } from "../plugins/axios";

function countProducoes(idCurriculo){
    return DashBoardAxios.get('/dashboard/contar/'+idCurriculo)
}

function listCapitulos(idCurriculo,page){
    return DashBoardAxios.get('/capitulosAutores/listar?size=5&page='+(page != null? page : 0),{
        params: idCurriculo
    });
}

function listArtigos(idCurriculo,page){
    return DashBoardAxios.get('/artigoEventoAutores/listar?size=5&page='+(page != null? page : 0),{
        params: idCurriculo
    });
}

function listPeriodicos(idCurriculo,page){
    return DashBoardAxios.get('/periodicosAutores/listar?size=5&page='+(page != null? page : 0),{
        params: idCurriculo
    });
}

export{countProducoes,listCapitulos, listArtigos, listPeriodicos}