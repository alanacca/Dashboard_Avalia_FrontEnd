import { DashBoardAxios } from "../plugins/axios";

function salvar(pessoa){
    return DashBoardAxios.post("/pessoas",pessoa);
}

function testar(){
    console.log("sgf")
    return DashBoardAxios.get("/pessoas/listar");
}

export {salvar,testar}