import axios from 'axios';

const API_URL = 'http://localhost:3000/random';


class TableDataService{

    getTable(){
        return axios.get(API_URL);
    }

}


export default TableDataService();