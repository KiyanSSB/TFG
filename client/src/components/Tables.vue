<script>
    import TablesDataService from '@/services/TablesDataService';

    export default {
        name: "Tables",

        data(){
            return{
                candidateTable: [],
                referenceTable: [],
                columns:[],
                row_data:[],
                currentIndex: -1
            };
        },

        methods: {
            di: function(mensaje){
                alert(mensaje)
            },

            paintColumn: function(key){
                // console.log(this.columns.values())
                // console.log(this.columns.find(element => element = key))
                console.log(this.columns[key]);


                this.referenceTable.forEach( function(valor,indice,array){
                        console.log(Object.keys(valor));
                });
                    

            },


            GetKeys(Table){
                return this.colums = Object.keys(Table);
            },

            retrieveReferenceTable(){
                TablesDataService.getTable()
                    .then((response) => {
                        this.referenceTable = response.data
                    })
            },
            retrieveCandidateTable(){
                TablesDataService.getTable()
                    .then((response) => {
                        if(response.data._id == this.candidateTable._id){
                            this.retrieveCandidateTable();
                        }else{
                            this.candidateTable = response.data
                        }
                    });
            },
            Reference_Users(){
                TablesDataService.jsonPlaceHolderUsers()
                    .then((response) => {
                        this.referenceTable = response.data
                        this.columns = Object.keys(this.referenceTable[0]);

                    });
            },
            Candidate_Albums(){
                TablesDataService.jsonPlaceHolderAlmbums()
                    .then((response) => {
                        this.candidateTable = response.data 
                    });
                }
            },
            saludar(){
                alert('Soy tonto');
            },

        mounted(){
            this.Reference_Users();
            this.Candidate_Albums();
          
            // this.retrieveReferenceTable();
            // this.retrieveCandidateTable();
            console.log(this.candidateTable);
            console.log(this.referenceTable);
        }

    }
   
</script>
<template>

    <div class="container_center">
   
        <button v-on:click="di('que')">Di que</button>


    <table>
        <th v-for="(value,key) in columns" @click="saludar" v-on:click="paintColumn(key)" >{{value}}</th>
            <tr v-for="(value,key) in referenceTable">
                <td v-for="(value2,key) in value">{{value2}}</td> 
            </tr>
    </table>
    



    </div>

 



</template>


<style>

.container_center{
    height: 100%;
    width: 100%;
    min-height: 100%;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.active{
    color: brown;
}
</style>