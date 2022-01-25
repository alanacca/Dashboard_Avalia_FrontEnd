import { DashBoardAxios } from "../plugins/axios";

function salvar(pessoa){
    console.log("entrou")
    return DashBoardAxios.post("/pessoas",pessoa);
}

export {salvar}