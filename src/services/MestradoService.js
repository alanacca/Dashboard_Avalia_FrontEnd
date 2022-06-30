import { DashBoardAxios } from "../plugins/axios";

function getMestrado(){
    return DashBoardAxios.get('/pessoas/findMestrado')
}

export {getMestrado}