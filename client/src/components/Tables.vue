<script>
import TablesDataService from '@/services/TablesDataService';

export default {
    name: "Tables",

    data() {
        return {
            candidateTable: [],
            referenceTable: [],
            tables: [],
            columns: [],
            row_data: [],
            currentIndex: -1,
            Tabla: Object
        };
    },

    methods: {
        di: function (mensaje) {
            alert(mensaje)
        },

        paintColumn: function (key) {
            // console.log(this.columns.values())
            // console.log(this.columns.find(element => element = key))
            console.log(this.columns[key]);
            this.referenceTable.forEach(function (valor, indice, array) {
                console.log(Object.keys(valor));
            });
        },



        GetKeys(Table) {
            return this.colums = Object.keys(Table);
        },

        retrieveTables() {
            TablesDataService.getTable()
                .then((response) => {
                    this.tables = response.data
                    const that = this;
                    var i = 0;
                    for (var key of Object.keys(this.tables)) {
                        console.log(key)
                        if (i == 0) {
                            that.referenceTable = that.tables[key]
                            i++;
                        } else {
                            that.candidateTable = that.tables[key]
                        }
                    }
                    console.log(that.referenceTable)
                    console.log(that.candidateTable)
                })

        },
        retrieveCandidateTable() {
            TablesDataService.getTable()
                .then((response) => {
                    if (response.data._id == this.candidateTable._id) {
                        this.retrieveCandidateTable();
                    } else {
                        this.candidateTable = response.data
                    }
                });
        },
    },


    mounted() {
        this.retrieveTables();
    }

}

</script>

<template>
    <div class="container_center">
        <!-- <button v-on:click="di('que')">Di que</button> -->
        <table>
            <!-- Nombre de la tabla -->
            <tr style="display: flex; justify-content: center; ">
                <th> {{this.referenceTable.title}} </th>
            </tr>
            <!-- Resto de la tabla -->
            <th v-for="(value, key) in columns" @click="saludar" v-on:click="paintColumn(key)">{{ value }}</th>


            <tr v-for="(value, key) in referenceTable">
                <td v-for="(value2, key) in value">{{ value2 }}</td>

            </tr>
        </table>


        <table>
            <tr>
                <th>{{ Object.keys(this.candidateTable) }}</th>
            </tr>
        </table>

    </div>
</template>

<style>
.container_center {
    height: 100%;
    width: 100%;
    min-height: 100%;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.active {
    color: brown;
}

table,
th,
td {
    border: 1px solid black;
}
</style>