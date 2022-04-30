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
            columnasRelacionadas: [],
            Tabla: Object
        };
    },

    methods: {
        di: function (mensaje) {
            alert(mensaje)
        },

        paintColumn: function (key) {
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
                        if (i == 0) {
                            that.referenceTable = that.tables[key]
                            i++;
                        } else {
                            that.candidateTable = that.tables[key]
                        }
                    }
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
            var data = []

            if (this.notAllowedKeys.indexOf(key) == -1) {
                //Comprobamos cuanto vale Data = []
                console.log(data)

                //1º Añadir a los arrays nuevos tantas entradas vacías como tenga la tabla columnas en el momento:
                for (var i = 0; i < table.data.length; i++) {
                    for (var j = 0; j < this.candidateTable.data[j].length; j++) {
                        data.push("")
                    }

                    //Añadimos Data a la tabla candidata
                    //Reiniciamos Data
                    data = []
                }

                //Añadimos tantas entradas al resto como tamaño máximo tenga el array más grande de los datos
                for (var i = 0; i < this.candidateTable.data.length; i++) {
                    this.candidateTable.data[i].push("")
                }

                //Añadimos la columna a la lista de columnas no permitidas para no volver a añadirla
                this.notAllowedKeys.push(key)

                //Añadimos los títulos
                this.candidateTable.title.push(table.title[key])
            }
            console.log(this.candidateTable.data)
        },


        juntarColumnas(table, key) {
            console.log("Estoy en juntarColumnas")
            this.columnasRelacionadas.push(table.title[key])
        },

        cambiarColor(table,key) {
            console.log(table)
            console.log(key)
            
            document.getElementById(key+table).classList.add('red')
        }


    },

    mounted() {
        this.retrieveTables();
    }

}

</script>

<template>
    <div class="container_center">
        <div class="left_side">
            <!-- <button v-on:click="di('que')">Di que</button> -->
            <table>
                <colgroup>
                    <col v-for="(value, key) in referenceTable.title" v-bind:id="key+'referenceTable'">
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="(value, key) in referenceTable.title"
                            v-on:click="selectColumn(referenceTable, key); juntarColumnas(referenceTable, key); cambiarColor('referenceTable',key);">
                            {{ value }} </th>
                    </tr>
                </thead>

                <!-- Resto de la tabla -->
                <tr v-for="(value, key) in referenceTable.data">
                    <td v-for="(value2, key) in value">{{ value2 }}</td>
                </tr>
            </table>


            <table>
                <colgroup>
                    <col v-for="(value, key) in candidateTable.title" v-bind:id="key+'candidateTable'">
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="(value, key) in candidateTable.title" 
                            v-on:click="cambiarColor('candidateTable',key);">
                            {{ value }} 
                        </th>
                    </tr>
                </thead>

                <tr v-for="(value, key) in candidateTable.data">
                    <td v-for="(value2, key) in value">{{ value2 }}</td>
                </tr>
            </table>
        </div>









        <div class="right_side">
            <h1>Columnas seleccionadas</h1>

            <ul>
                <li v-for="(value, key) in columnasRelacionadas">{{ value }}</li>
            </ul>

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

.left_side {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;
    height: 100%;
}

.right_side {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: 100%;
    height: auto;
    border-left: 1px solid black;
}

.active {
    color: brown;
}


table {
    border: 1px solid black;
}

tr {
    border: 1px solid black;
}

th {
    border: 1px solid black !important;
}

td {
    border: 1px solid black !important;
}

.red {
    background-color: rgba(255, 0, 0, .25);
}
</style>