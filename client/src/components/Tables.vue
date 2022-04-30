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
            notAllowedKeys: [],
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

        selectColumn(table, key) {
            // console.log(table);
            // console.log(key);

            var data = []
            var title

            // console.log(table.title[key])
            // const that   = this

            // table.data.forEach(function (row) {
            //     console.log(row[key])
            //     data.push[row[key]]
            //     that.candidateTable.data.push([row[key]])
            // })

            //  console.log(this.candidateTable.data.length)

            // for(var i = 0 ; i < this.candidateTable.data[i].length ; i++){
            //     data.push("");
            // }

            // for(var i = 0 ; i < table.data.length ; i++){
            //     console.log(table.data[i][key]);
            //     data.push(table.data[i][key]);
            //     this.candidateTable.data.push(data)
            //     data=[]
            // }

            console.log(this.notAllowedKeys)
            console.log(key)
            console.log(this.notAllowedKeys.indexOf(key))
            if(this.notAllowedKeys.indexOf(key) == -1){
                this.notAllowedKeys.push(key)
                this.candidateTable.title.push(table.title[key])
                console.log(this.notAllowedKeys)
            }

            // this.candidateTable.title.push(table.title[key])
            this.candidateTable.data.push(data)
        }
    },


    mounted() {
        this.retrieveTables();
    }

}

</script>

<template>
    <div class="container_center">
        <div class="right_side">
            <!-- <button v-on:click="di('que')">Di que</button> -->
            <table theme="dark">
                <colgroup>
                    <col v-for="(value, key) in referenceTable.title" v-on:click="di('que')">
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="(value, key) in referenceTable.title" v-on:click="selectColumn(referenceTable, key)">
                            {{ value }} </th>
                    </tr>
                </thead>

                <!-- Resto de la tabla -->
                <tr v-for="(value, key) in referenceTable.data">
                    <td v-for="(value2, key) in value">{{ value2 }}</td>
                </tr>
            </table>


            <table>
                <thead>
                    <th v-for="(value, key) in candidateTable.title">{{ value }} </th>
                </thead>

                <!-- Resto de la tabla -->
                <tr v-for="(value, key) in candidateTable.data">
                    <td v-for="(value2, key) in value">{{ value2 }}</td>

                </tr>
            </table>
        </div>

        <div class="left_side">
        </div>

    </div>
</template>

<style>
.container_center {
    height: 100%;
    height: 80vh;
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    align-items: center;
}

.right_side {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;
    height: 100%;
}

.left_side {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: auto;
}

.active {
    color: brown;
}

table,
th,
tr{
    background: rgba( 255, 255, 255, 0.65 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
}


</style>