const API_URL = 'http://localhost:3000/random';
import axios from 'axios'; //PARA EL XACCESSTOKEN


class TableDataService{

    getTable(){
        return axios.get(API_URL);
    }

}


export default new TableDataService();