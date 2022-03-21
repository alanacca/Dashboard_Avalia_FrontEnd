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

function excluir(fkPessoa){
    return DashBoardAxios.delete('/pessoasVinculo/deletar/'+fkPessoa)
}

function verifExist(fkPessoa){
    return DashBoardAxios.get('pessoasVinculo/verificarExist/'+fkPessoa)
}

export {findAll, findSpecific, findByVinculo, verificarLista, excluir,verifExist}