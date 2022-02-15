import { DashBoardAxios } from "../plugins/axios";

function salvar(pessoa){
    return DashBoardAxios.post("/pessoas",pessoa);
}

function findAll(){
    return DashBoardAxios.get("/pessoas/listar");
}

function existsByIdPlataforma(id){
    return DashBoardAxios.get("/pessoas/verificaId/"+id);
}

function existsbyNomeCompleto(nome){
    return DashBoardAxios.get("/pessoas/verificaNome/"+nome);
}

export {salvar,findAll,existsByIdPlataforma,existsbyNomeCompleto}