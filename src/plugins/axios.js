
import axios from 'axios'

let DashBoardAxios = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API,
})

export {DashBoardAxios}