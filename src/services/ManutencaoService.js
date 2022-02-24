import { DashBoardAxios } from "../plugins/axios";

function salvar(plataformapessoa){
    return DashBoardAxios.post("/plataformapessoa",plataformapessoa);
}

function findAll(){
    return DashBoardAxios.get("/pessoas/listar");
}

function findAllPlats(){
    return DashBoardAxios.get("/plataforma/listar");
}

function existsByIdPlataforma(id){
    return DashBoardAxios.get("/pessoas/verificaId/"+id);
}

function existsbyNomeCompleto(nome){
    return DashBoardAxios.get("/pessoas/verificaNome/"+nome);
}

export {salvar,findAll,existsByIdPlataforma,existsbyNomeCompleto,findAllPlats}