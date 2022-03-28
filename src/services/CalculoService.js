import { DashBoardAxios } from "../plugins/axios";

function calculoIndices(ano_inicio, ano_final){
    return DashBoardAxios.get("/curriculo/estrato/"+ano_inicio+"/"+ano_final);
}

export{calculoIndices}