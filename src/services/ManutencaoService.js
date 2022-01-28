import { DashBoardAxios } from "../plugins/axios";

function salvar(pessoa){
    return DashBoardAxios.post("/pessoas",pessoa);
}

function findAll(){
    return DashBoardAxios.get("/pessoas/listar");
}

export {salvar,findAll}