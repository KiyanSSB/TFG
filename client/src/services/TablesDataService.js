const API_URL =       'https://server-api-tfgtable.herokuapp.com//tablas';
const API_URL_LOTES = 'https://server-api-tfgtable.herokuapp.com//lotes';
const API_URL_STORE = 'https://server-api-tfgtable.herokuapp.com/store'

const jsonPlaceHolderAlmbums = 'https://jsonplaceholder.typicode.com/albums'
const jsonPlaceHolderUsers = 'https://jsonplaceholder.typicode.com/users'



import fichero from '../lotes/megamix.json'
import axios from 'axios'; //PARA EL XACCESSTOKEN



class TableDataService{
    getTable(){
        console.log(location.origin)
        return axios.get(API_URL);
    }

    getLote(){
        console.log(location.origin)
        return fichero;
    }

    getLotefromServer(){
        console.log(location.origin)
        return axios.get(API_URL_LOTES)
    }

    storeResult(patata){g
        console.log(location.origin)
        return axios.post(API_URL_STORE,patata);
    }
}

export default new TableDataService();
