import { DashBoardAxios } from "../plugins/axios";

function findAll(){
    return DashBoardAxios.get('/vinculo/listar')
}

function findSpecific(idVinculo){
    return DashBoardAxios.get('/pessoasVinculo/vinculo/'+idVinculo)
}

export {findAll, findSpecific}