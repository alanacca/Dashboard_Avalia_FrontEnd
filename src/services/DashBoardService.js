import { DashBoardAxios } from "../plugins/axios";

function countProducoes(idCurriculo){
    return DashBoardAxios.get('/dashboard/contar/'+idCurriculo)
}

function listCapitulos(idCurriculo,page){
    return DashBoardAxios.get('/capitulosAutores/listar/'+idCurriculo+'?size=5&page='+(page != null? page : 0));
}

function listArtigos(idCurriculo,page){
    return DashBoardAxios.get('/artigoEventoAutores/listar/'+idCurriculo+'?size=5&page='+(page != null? page : 0));
}

function listPeriodicos(idCurriculo,page){
    return DashBoardAxios.get('/periodicosAutores/listar/'+idCurriculo+'?size=5&page='+(page != null? page : 0));
}

function findByCurriculo(idCurriculo){
    return DashBoardAxios.get('/curriculo/'+idCurriculo);
}

export{countProducoes,listCapitulos, listArtigos, listPeriodicos,findByCurriculo}