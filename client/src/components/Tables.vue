<script>
    import TablesDataService from '@/services/TablesDataService';

    export default {
        

        name: "Tables",

    data(){
        return{
            tables: []
        };
    },

    methods: {
        retrieveTable(){
            TablesDataService.getTable()
                .then((response) => {
                    this.tables = response.data
                })
        }
    },

    mounted(){
        this.retrieveTable();
    }

    }
   

</script>
<template>
asdf
    <table>
        
    </table>
    



</template>