const API_URL = 'http://localhost:3000/tablas';
const API_URL_LOTES = 'http://localhost:3000/lotes';

const jsonPlaceHolderAlmbums = 'https://jsonplaceholder.typicode.com/albums'
const jsonPlaceHolderUsers = 'https://jsonplaceholder.typicode.com/users'



import fichero from '../lotes/megamix.json'
import axios from 'axios'; //PARA EL XACCESSTOKEN



class TableDataService{
    getTable(){
        return axios.get(API_URL);
    }

    getLote(){
        return fichero;
    }

    getLotefromServer(){
        return axios.get(API_URL_LOTES)
    }
}

export default new TableDataService();
