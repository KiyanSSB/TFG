<script>
import TablesDataService from '@/services/TablesDataService';


const modules = import.meta.glob('../../public/tables/*.json')

export default {
    name: "Tables",

    data() {
        return {
            lote: [],
            currentCandidateIndex: 0,
            loteCandidatas: [],
            candidateTable: [],
            referenceTable: [],
            tables: [],
            currentIndex: -1,
            currentTable: null,
            columnasRelacionadas: [],
            Tabla: Object,
            referenceClicked: false,
            candidateClicked: false,
            nextColor: [
                "red",
                "green",
                "blue",
                "yellow",
                "purple"
            ],
            selectedColors: [0 ,0 ,0 ,0 ,0],
            result: {}
        };
    },

    methods: {
        di: function (mensaje) {
            alert(mensaje)
        },

        //Función que recibe las tablas desde el servicio del servidor
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


        //Función que recibe un lote para gestionarlo
        retrieveLote() {
            //Recibimos el lote
            TablesDataService.getLotefromServer()
                .then((response) => {
                    var keys = Object.keys(response.data);
                    this.lote = response.data[keys[0]];
                    //Buscamos la tabla correspondiente en los ficheros
                    for (const path in modules) {
                        modules[path]()
                            .then((mod) => {
                                var tablas = Object.keys(mod.default);

                                for (var i = 0; i < tablas.length; i++) {
                                    //Si encontramos la tabla de referencia , la cogemos
                                    if (tablas[i] == this.lote.query) {
                                        this.referenceTable = mod.default[tablas[i]]
                                    }
                                }

                                for (var j = 0; j < tablas.length; j++) {
                                    if (this.lote.candidates.includes(tablas[j])) {
                                        this.loteCandidatas.push(mod.default[tablas[j]])
                                    }
                                }
                                this.candidateTable = this.loteCandidatas[0];
                            })
                    }
                });
        },

        resetControl() {
            this.currentIndex = -1
            this.currentTable = null
        },

        nextCandidateTable() {
             //Si estamos en la última tabla 
            if((this.currentCandidateIndex -1) == this.loteCandidatas.length ){
                console.logç("estoy en next candidate table")
                this.retrieveLote();
                this.currentCandidateIndex = 0 
                for ( i = 0 ; i < this.selectedColors.length; i++){
                    this.selectedColors[i] = 0
                }
                return
            }
            (this.currentCandidateIndex)++;
            this.candidateTable = this.loteCandidatas[this.currentCandidateIndex];
        },

        juntarColumnas(table, key, whichTable) {
            //Tenía columna antes?
            //Si:
            if (this.currentIndex != -1) {
                console.log("Tengo una columna, es la misma EN LA MISMA TABLA?")
                //Es la misma columna?
                if (this.currentIndex == key && whichTable == this.currentTable) {
                    console.log("Has seleccionado la misma columna")
                    this.removeColor(whichTable, this.currentIndex);
                    this.currentIndex = -1
                    this.currentTable = null
                    return false;
                } else {
                    console.log("Es otra columna, es de la misma tabla?")
                    //Comprobamos cual de las tablas ha sido clickada y actuamos en función si ha sido clickada antes o no
                    if (this.currentTable == whichTable) {
                        for (i = 0; i < this.columnasRelacionadas.length; i++) {
                            if (whichTable == 'referenceTable') {
                                if (this.columnasRelacionadas[i].includes(this.referenceTable.title[key])) {
                                    alert("La columna ya está seleccionada, borral la relación")
                                    return
                                }
                            } else {
                                if (this.columnasRelacionadas[i].includes(this.candidateTable.title[key])) {
                                    alert("La columna ya está seleccionada, borra la relación")
                                    return
                                }
                            }
                        }
                        this.removeColor(whichTable, this.currentIndex)
                        this.cambiarColor(whichTable, key)
                        this.currentIndex = key
                    }
                    else {
                        //Si hemos llegado aquí es que hemos seleccionado dos columnas de las tablas
                        for (i = 0; i < this.columnasRelacionadas.length; i++) {
                            if (whichTable == 'referenceTable') {
                                if (this.columnasRelacionadas[i].includes(this.referenceTable.title[key])) {
                                    alert("La columna ya está seleccionada, borral la relación")
                                    return
                                }
                            } else {
                                if (this.columnasRelacionadas[i].includes(this.candidateTable.title[key])) {
                                    alert("La columna ya está seleccionada, borra la relación")
                                    return
                                }
                            }
                        }
                        //1º Guardamos la pareja creada:
                        if (whichTable == 'candidateTable') {
                            var pair = [this.referenceTable.title[this.currentIndex], table.title[key]]
                            console.log(pair)
                            for (var i = 0; i < this.columnasRelacionadas.length; i++) {
                                console.log(JSON.stringify(this.columnasRelacionadas[i]));
                                console.log(JSON.stringify(pair))
                                if (JSON.stringify(this.columnasRelacionadas[i]) == JSON.stringify(pair)) {
                                    alert("Ya has hecho esta selección")
                                    this.removeColor(whichTable, key)
                                    this.removeColor('referenceTable', key)
                                    this.resetControl();
                                    return;
                                }
                            }
                            this.cambiarColor("candidateTable", key)
                            this.columnasRelacionadas.push([this.referenceTable.title[this.currentIndex], table.title[key]])
                            this.resetControl();
                            return
                        } else {
                            console.log("La última clickada es de referencia")
                            var pair = [table.title[key], this.candidateTable.title[this.currentIndex]]
                            for (var i = 0; i < this.columnasRelacionadas.length; i++) {
                                if (JSON.stringify(this.columnasRelacionadas[i]) == JSON.stringify(pair)) {
                                    alert("Ya has hecho esta selección")
                                    this.removeColor(whichTable, key)
                                    this.removeColor('candidateTable', key)
                                    this.resetControl();
                                    return;
                                }
                            }
                            this.cambiarColor("referenceTable", key)
                            this.columnasRelacionadas.push([table.title[key], this.candidateTable.title[this.currentIndex]])
                            this.resetControl();
                            return;
                        }
                    }
                }
            }

            //No:
            if (this.currentIndex == -1) {
                //Esta columna ha sido seleccionada ya? si es así, borrarla
                for (i = 0; i < this.columnasRelacionadas.length; i++) {
                    if (whichTable == 'referenceTable') {
                        if (this.columnasRelacionadas[i].includes(this.referenceTable.title[key])) {
                            this.deletePair(i)
                            return
                        }
                    } else {
                        if (this.columnasRelacionadas[i].includes(this.candidateTable.title[key])) {
                            this.deletePair(i)
                            return
                        }
                    }
                }
                console.log("No tengo columna clickada, selecciono una")
                this.currentIndex = key //Guardamos la columna seleccionada
                this.currentTable = whichTable
                console.log(this.currentIndex)
                //Indicamos que tabla hemos clickado
                if (whichTable == 'referenceTable') {
                    this.referenceClicked = true
                } else {
                    this.candidateClicked = true
                }
                this.cambiarColor(whichTable, key);//Ponemos de color la columna en cuestión
            }
        },

        cambiarColor(whichTable, key) {
            for(var i = 0 ; i  < this.selectedColors.length; i++){
                console.log(this.selectedColors[i])
                console.log(this.nextColor[i])
                console.log(i)
                if (this.selectedColors[i] == 0 || this.selectedColors[i] == 1 ){
                    document.getElementById(whichTable + key).classList.add(this.nextColor[i])
                    this.selectedColors[i]++
                    console.log(this.selectedColors[i])
                    break;
                }
            }
        },

        removeColor(whichTable, currentIndex) {
            // console.log("La columna tiene el Id: " + whichTable + currentIndex)
            // console.log("Vamos a borrar el color:" + this.nextColor[this.columnasRelacionadas.length])
            // document.getElementById(whichTable + currentIndex).classList = ""

            var color = document.getElementById(whichTable + currentIndex).classList
            console.log(color[0]);
            console.log(this.nextColor.indexOf(color[0]))
            this.selectedColors[this.nextColor.indexOf(color[0])] = 0
            document.getElementById(whichTable + currentIndex).classList = ""

        },

        deletePair(key) {
            var eliminados = this.columnasRelacionadas.splice(key, 1)
            console.log(this.nextColor[this.columnasRelacionadas.length])
            //Borramos el color de la columna de referencia
            this.removeColor('referenceTable', this.referenceTable.title.indexOf(this.referenceTable.title.find(element => element == eliminados[0][0])))
            //Borramos el color de la columna de candidata
            this.removeColor('candidateTable', this.candidateTable.title.indexOf(this.candidateTable.title.find(element => element == eliminados[0][1])))
        },

        noRelationships() {
            alert("No hay relaciones")
        },

        cleanAll(){
            try{
                //Cogemos todas las columna seleccionadas y las limpiamos 
                this.currentIndex = -1
                console.log(this.referenceTable.data)
                for(var i = 0 ;i < this.referenceTable.numCols; i ++){
                            var color = document.getElementById('referenceTable' + i).classList 
                            if(color.length != 0){
                                document.getElementById('referenceTable' + i).classList = ""
                            }
                            console.log(color)
                }

                for(var j = 0 ; j < this.candidateTable.numCols ; j++){
                    var color = document.getElementById('candidateTable' + j).classList 
                        if(color.length != 0){
                            document.getElementById('candidateTable' + j).classList = ""
                        }
                        console.log(color)
                }

                //Limpiamos todas las columnas relacionadas
                this.columnasRelacionadas.length = 0 
                for ( i = 0 ; i < this.selectedColors.length; i++){
                    this.selectedColors[i] = 0
                }
                console.log("He pasado paor aquí")
            }catch(error){
                console.log(error)
            }

        },

        enviarResultado(){
            //Tenemos que añadir los valores de los campos en cada uno de los arrays
            for(var i = 0 ; i < this.columnasRelacionadas.length; i++){
                //Comprobamos el valor de las checkboxes para ver si el título o el contenido han sido elegidos
                var contenido = document.getElementById('contenido' + i);
                var titulo = document.getElementById('titulo' + i);

                if(contenido.checked == true){
                    var contenido = {"contenido" : 1}
                    this.columnasRelacionadas[i].push(contenido)
                }

                if(titulo.checked == true){
                    var titulo = {"titulo" :  1}
                    this.columnasRelacionadas[i].push(titulo)
                }

                if(titulo.checked == false && contenido.checked == false){
                    alert("Selecciona en la relación número: " + i + "el motivo por el consideras que hay una relación")
                    return;
                }

                var comentario = document.getElementById('comentario' + i);
                this.columnasRelacionadas[i].push(comentario.value)
            }

            //Añadimos las tablas que han sido seleccionadas al array
            var tablas = {
                "tablas":[
                    {"query" : this.lote.query },
                    {"candidate" : this.lote.candidates[this.currentCandidateIndex]}
                ]
            }

            this.result["tablas"]       = tablas
            this.result["completada"]   = true
            this.result["relaciones"]   = this.columnasRelacionadas
            this.result["motivo"]       = null

            TablesDataService.storeResult(this.result)
                .then((response) => {
                    console.log(response);
                      this.cleanAll();
                      console.log("El current candidate index es:" +this.currentCandidateIndex)
                      console.log("El tamaño del lote es:" + this.loteCandidatas.length)
                      if(this.currentCandidateIndex +1 == this.loteCandidatas.length){
                          console.log("Esto en la última tabla")
                          this.retrieveLote();
                      }else{
                          this.nextCandidateTable();
                      }
                      
                  
                })
            
            console.log(this.currentCandidateIndex);
            console.log(this.loteCandidatas.length);

           
        }
    },

    mounted() {
        this.retrieveLote();
    }
}

</script>

<template>
    <div class="container_center">
        <div class="left_side">
            <table>
                <colgroup>
                    <col v-for="(value, key) in referenceTable.title" v-bind:id="'referenceTable' + key">
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="(value, key) in referenceTable.title"
                            v-on:click="juntarColumnas(referenceTable, key, 'referenceTable');">
                            {{ value }}
                        </th>
                    </tr>
                </thead>

                <!-- Resto de la tabla -->
                <tr v-for="(value, key) in referenceTable.data">
                    <td v-for="(value2, key) in value">{{ value2 }}</td>
                </tr>
            </table>

            <table>
                <colgroup>
                    <col v-for="(value, key) in candidateTable.title" v-bind:id="'candidateTable' + key">
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="(value, key) in candidateTable.title"
                            v-on:click="juntarColumnas(candidateTable, key, 'candidateTable');">
                            {{ value }}
                        </th>
                    </tr>
                </thead>

                <tr v-for="(value, key) in candidateTable.data">
                    <td v-for="(value2, key) in value">{{ value2 }}</td>
                </tr>
            </table>
            
            <div>
                <button style="margin-top: 5%;" v-on:click="noRelationships()">Tabla Anterior</button>
                <button style="margin-top: 5%;" v-on:click="nextCandidateTable()">Siguiente Tabla</button>
                <button style="margin-top: 5%;" v-on:click="nextCandidateTable()">No conozco el campo de los datos</button>
            </div>
        </div>

        <div class="right_side">
            <h1>Columnas seleccionadas</h1>

            <ul>
                <div v-for="(value, key) in columnasRelacionadas">
                    <li>{{ value }}</li>
                    <button v-on:click="deletePair(key)"> borrame</button>
                    <input v-bind:id="'titulo' +key" type="checkbox">
                    <label for="checkbox">Por el título</label>
                    <input v-bind:id="'contenido' +key" type="checkbox">
                    <label for="checkbox2">Por el contenido</label>
                    <input v-bind:id="'comentario' + key" placeholder="Añade un comentario" />
                </div>
            </ul>

            <button style="margin-top: 5%;" v-on:click="enviarResultado()">Tabla completada</button>
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

.blue {
    background-color: blue;
}

.green {
    background-color: green;
}

.yellow {
    background-color: yellow;
}
</style>