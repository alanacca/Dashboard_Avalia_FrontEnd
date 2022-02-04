
import axios from 'axios'

let DashBoardAxios = axios.create({
    baseURL: 'http://localhost:8081/api',
})

export {DashBoardAxios}