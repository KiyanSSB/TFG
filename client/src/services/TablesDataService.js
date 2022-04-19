const API_URL = 'http://localhost:3000/random';
const jsonPlaceHolderAlmbums = 'https://jsonplaceholder.typicode.com/albums'
const jsonPlaceHolderUsers = 'https://jsonplaceholder.typicode.com/users'

import axios from 'axios'; //PARA EL XACCESSTOKEN



class TableDataService{
    getTable(){
        return axios.get(API_URL);
    }

    jsonPlaceHolderAlmbums(){
        return axios.get(jsonPlaceHolderAlmbums);
    }

    jsonPlaceHolderUsers(){
        return axios.get(jsonPlaceHolderUsers);
    }
}

export default new TableDataService();