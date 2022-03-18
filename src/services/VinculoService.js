import { DashBoardAxios } from "../plugins/axios";

function findAll(){
    return DashBoardAxios.get('/vinculo/listar')
}

function findSpecific(idVinculo){
    return DashBoardAxios.get('/pessoasVinculo/vinculo/'+idVinculo)
}

function findByVinculo(idVinculo){
    return DashBoardAxios.get('/pessoasVinculo/'+idVinculo)
}

function verificarLista(pessoas, idVinculo){
    return DashBoardAxios.post('/pessoasVinculo/verificar/'+idVinculo,pessoas)
}

export {findAll, findSpecific, findByVinculo, verificarLista}