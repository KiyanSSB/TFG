<script>
import TablesDataService from '@/services/TablesDataService';
import { nextTick } from 'vue'
import { useUserStore } from "../stores/user";

const modules = import.meta.glob('../../public/tables/*.json')
import indices from '../../public/indice/indice.json';

export default {
    name: "Tables",
    data() {
        return {
            lote: [],
            currentCandidateIndex: 0,
            byColumn: 0,
            byTitle: 0,
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
                "orange",
                "pink",
                "cyan",
                "magenta",
                "purple",
                "maroon"
            ],
            selectedColors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            rememberColor: -1,
            result: {}
        };
    },

    methods: {
        di: function (mensaje) {
            alert(mensaje)
        },

        increaseByOrigin(origen) {
            console.log("El origen", origen)
            if (origen == 'titulo') {
                this.byTitle++
            } else {
                this.byColumn++
            }
        },

        //Función que recibe un lote para gestionarlo
        async retrieveLote() {
            await TablesDataService.getLotefromServer()
                .then((response) => {
                    var keys = Object.keys(response.data);
                    this.lote = response.data[keys[0]];

                    var ficheroQuery = indices[this.lote.query]
                    modules["../../public/tables/" + ficheroQuery]()
                        .then((mod) => {
                            this.referenceTable = mod.default[this.lote.query]
                        })

                    var that = this //Guradamos el contexto de vue base para pasarlo dentro del foreach
                    this.lote.candidates.forEach(function (item, i) {
                        modules["../../public/tables/" + indices[item]]()
                            .then((mod) => {
                                that.loteCandidatas.push(mod.default[item])
                                that.candidateTable = that.loteCandidatas[0] //Esto tiene que ir aquí, si no los contextos no coinciden y no se pueden sacar los datos 
                            })
                    })
                });
        },

        resetControl() {
            this.currentIndex = -1
            this.currentTable = null
            this.candidateClicked = false;
            this.referenceClicked = false;
            this.byColumn = 0
            this.byTitle = 0
        },

        nextCandidateTable() {
            //Si estamos en la última tabla checked
            if ((this.currentCandidateIndex - 1) == this.loteCandidatas.length) {
                this.retrieveLote();
                this.currentCandidateIndex = 0
                for (var i = 0; i < this.selectedColors.length; i++) {
                    this.selectedColors[i] = 0
                }
                return
            }
            (this.currentCandidateIndex)++;
            this.candidateTable = this.loteCandidatas[this.currentCandidateIndex];
        },

        remove_selectedFirstColumn(whichTable) {
            this.removeColor(whichTable, this.currentIndex);
            this.currentIndex = -1
            this.currentTable = null
            if (this.byColumn != 0) {
                this.byColumn = 0
            } else {
                this.byTitle = 0
            }
            return false;
        },

        swapSelectedColumn(whichTable, key) {
            this.removeColor(whichTable, this.currentIndex)
            this.cambiarColor(whichTable, key)
            this.currentIndex = key
        },

        error_SelectedColumnSameTable(whichTable, key) {
            for (var i = 0; i < this.columnasRelacionadas.length; i++) {
                if (whichTable == 'referenceTable') {
                    if (document.getElementById("referenceTable" + key).classList != "") {
                        alert("La columna ya está seleccionada, borra la relación")
                        return true
                    }

                    // if (this.columnasRelacionadas[i].includes(this.referenceTable.title[key])) {
                    //     alert("La columna ya está seleccionada, borra la relación")
                    //     return true;
                    // }
                } else {
                    if (document.getElementById("candidateTable" + key).classList != "") {
                        alert("La columna ya está seleccionada, borra la relación")
                        return true;
                    }
                }
            }
        },

        async juntarColumnas(table, key, whichTable, origen) {
            console.log("---------------------")
            console.log(table)
            console.log(key)
            console.log(whichTable)
            console.log(origen)
            console.log("---------------------")
            //Tenía columna antes?
            //Si:
            if (this.currentIndex != -1) {
                //Es la misma columna que he seleccionado al principio??
                if (this.currentIndex == key && whichTable == this.currentTable) {
                    return this.remove_selectedFirstColumn(whichTable);
                } else {
                    //Si la columna ya ha sido aparejada, mostramos el error de que ya ha sido seleccionada
                    if (this.currentTable == whichTable) {
                        if (this.error_SelectedColumnSameTable(whichTable, key)) {
                            return
                        }
                        //Si la columna no ha sido aparejada, cambiamos la columna 
                        this.swapSelectedColumn(whichTable, key)
                    }
                    //La columna ya está seleccionada en referencia o en candidata
                    else {
                        if (this.error_SelectedColumnSameTable(whichTable, key)) {
                            return
                        }
                        //1º Guardamos la pareja creada:
                        if (whichTable == 'candidateTable') {
                            var pair = [this.referenceTable.title[this.currentIndex], table.title[key]] //Creamos la pareja, con las dos columnas [col,]
                            console.log(pair)
                            for (var i = 0; i < this.columnasRelacionadas.length; i++) {
                                if (JSON.stringify(this.columnasRelacionadas[i]) == JSON.stringify(pair)) {
                                    alert("Ya has hecho esta selección")
                                    this.removeColor(whichTable, key)
                                    this.removeColor('referenceTable', key)
                                    this.resetControl();
                                    return;
                                }
                            }

                            this.increaseByOrigin(origen)
                            this.cambiarColor("candidateTable", key)
                            this.columnasRelacionadas.push([this.referenceTable.title[this.currentIndex], table.title[key], this.rememberColor])
                            await nextTick()

                            document.getElementById('conjunto' + this.columnasRelacionadas[this.columnasRelacionadas.length - 1][2])
                                .classList.add(this.nextColor[this.columnasRelacionadas[this.columnasRelacionadas.length - 1][2]])


                            if (this.byTitle == 2) {
                                document.getElementById('titulo' + ((this.columnasRelacionadas.length) - 1)).checked = true
                            }

                            if (this.byColumn == 2) {
                                document.getElementById('contenido' + ((this.columnasRelacionadas.length) - 1)).checked = true
                            }
                            this.resetControl();
                            return

                        } else {
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

                            this.increaseByOrigin(origen)
                            this.cambiarColor("referenceTable", key)
                            this.columnasRelacionadas.push([table.title[key], this.candidateTable.title[this.currentIndex], this.rememberColor])
                            await nextTick()

                            document.getElementById('conjunto' + this.columnasRelacionadas[this.columnasRelacionadas.length - 1][2])
                                .classList.add(this.nextColor[this.columnasRelacionadas[this.columnasRelacionadas.length - 1][2]])

                            console.log(this.byColumn)
                            console.log(this.byTitle)


                            if (this.byTitle == 2) {
                                console.log("Ajustado por titulo")
                                document.getElementById('titulo' + ((this.columnasRelacionadas.length) - 1)).checked = true
                            }

                            if (this.byColumn == 2) {
                                console.log("Ajustado por contenido")
                                document.getElementById('contenido' + ((this.columnasRelacionadas.length) - 1)).checked = true
                            }
                            this.resetControl();
                            return;
                        }
                    }
                }
            }

            //No:
            if (this.currentIndex == -1) {
                console.log("En teoría estoy aquí")
                //Esta columna ha sido seleccionada ya? si es así, borrar la selección
                if (whichTable == 'referenceTable') {
                    if (document.getElementById("referenceTable" + key).classList != "") {
                        this.limpiarColoresRelaciones()
                        this.deletePair(key, whichTable)
                        await this.recolorearRelaciones()
                        return
                    }
                } else {
                    if (document.getElementById("candidateTable" + key).classList != "") {
                        this.limpiarColoresRelaciones()
                        this.deletePair(key, whichTable)
                        await this.recolorearRelaciones()
                        return
                    }
                }

                this.currentIndex = key //Guardamos la columna seleccionada
                this.currentTable = whichTable

                //Guardamos que parte de la tabla ha sido seleccionada para poder automatizar
                this.increaseByOrigin(origen)

                //Indicamos que tabla hemos clickado
                if (whichTable == 'referenceTable') {
                    this.referenceClicked = true
                } else {
                    this.candidateClicked = true
                }
                this.cambiarColor(whichTable, key);//Ponemos de color la columna en cuestión
            }
        },


        //Limpia todos los colores de las relaciones de la parte derecha
        limpiarColoresRelaciones() {
            for (var i = 0; i < this.columnasRelacionadas.length; i++) {
                document.getElementById("conjunto" + this.columnasRelacionadas[i][2]).classList.remove(this.nextColor[this.columnasRelacionadas[i][2]])
            }
        },

        //Coloca los colores en las relacioens de la parte derecha en función de variable que tiene asociada
        async recolorearRelaciones() {
            await nextTick()
            for (var i = 0; i < this.columnasRelacionadas.length; i++) {
                // console.log("------------------------")
                // console.log("conjunto" + this.columnasRelacionadas[i][2])
                // console.log(this.nextColor[this.columnasRelacionadas[i][2]])
                // console.log(document.getElementById("conjunto" + this.columnasRelacionadas[i][2]))
                document.getElementById("conjunto" + this.columnasRelacionadas[i][2]).classList.add(this.nextColor[this.columnasRelacionadas[i][2]])
            }
        },

        cambiarColor(whichTable, key) {
            var remember;
            for (var i = 0; i < this.selectedColors.length; i++) {
                if (this.selectedColors[i] == 0 || this.selectedColors[i] == 1) {
                    document.getElementById(whichTable + key).classList.add(this.nextColor[i])
                    this.selectedColors[i]++
                    this.rememberColor = i;
                    break;
                }
            }
        },



        removeColor(whichTable, currentIndex) {
            var columna = document.getElementById(whichTable + currentIndex)
            console.log(columna)

            if (document.getElementById(whichTable + currentIndex) != null) {
                var color = document.getElementById(whichTable + currentIndex).classList
                this.selectedColors[this.nextColor.indexOf(color[0])]--
                document.getElementById(whichTable + currentIndex).classList = ""
            }
        },



        //Borra la pareja cuando se clicka en una de las relaciones creadas en la tabla
        deletePair(key, whichTable) {
            //Sacamos el array que contiene los nombres de las columnas
            console.log("------------------------")
            console.log("Estoy en delete pair")
            console.log(key)
            console.log(whichTable)


            //Quitamos el color de la columna seleccionada
            this.removeColor(whichTable, key)

            //Borramos la relación que tenga dicha columna



            for (var i = 0; i < this.columnasRelacionadas.length; i++) {
                console.log(this.columnasRelacionadas[i])
                if (this.columnasRelacionadas[i][0] == this.referenceTable.title[key] && whichTable == 'referenceTable') {
                    var eliminados = this.columnasRelacionadas.splice(i, 1);
                    this.currentTable = 'candidateTable'
                    this.currentIndex = this.candidateTable.title.indexOf(this.candidateTable.title.find(element => element == eliminados[0][1]))
                    this.candidateClicked = true;
                    break;
                }

                if (this.columnasRelacionadas[i][1] == this.candidateTable.title[key] && whichTable == 'candidateTable') {
                    var eliminados = this.columnasRelacionadas.splice(i, 1);
                    this.currentTable = 'referenceTable'
                    this.currentIndex = this.referenceTable.title.indexOf(this.referenceTable.title.find(element => element == eliminados[0][0]))
                    this.referenceClicked = true;
                    break;
                }
            }


            // //Borramos el color de la columna de referencia
            // if (whichTable == 'referenceTable') {
            //     this.removeColor('referenceTable', this.referenceTable.title.indexOf(this.referenceTable.title.find(element => element == eliminados[0][0])))
            //     this.currentIndex = this.candidateTable.title.indexOf(this.candidateTable.title.find(element => element == eliminados[0][1]))
            //     this.currentTable = 'candidateTable'
            //     this.candidateClicked = true;
            // } else {
            //     this.removeColor('candidateTable', this.candidateTable.title.indexOf(this.candidateTable.title.find(element => element == eliminados[0][1])))
            //     this.currentIndex = this.referenceTable.title.indexOf(this.referenceTable.title.find(element => element == eliminados[0][0]))
            //     this.currentTable = 'referenceTable'
            // }
        },


        //Borra una columna a través del botón de la relación
        async deleteByButton(key) {
            if (this.currentIndex != -1) {
                this.removeColor(this.currentTable, this.currentIndex)

                this.currentIndex = -1
                this.byTitle = 0
                this.byColumn = 0
                this.referenceClicked = false;
                this.candidateClicked = false;
                this.currentTable = null;


                for (var i = 0; i < this.selectedColors.length; i++) {
                    if (this.selectedColors[i] == 1) {
                        this.selectedColors[1] == 0;
                    }
                }
            }


            this.limpiarColoresRelaciones()
            var eliminados = this.columnasRelacionadas.splice(key, 1)
            await nextTick()
            console.log(eliminados)
            this.removeColor('referenceTable', this.referenceTable.title.indexOf(eliminados[0][0]))
            this.removeColor('candidateTable', this.candidateTable.title.indexOf(eliminados[0][1]))

            await this.recolorearRelaciones()
        },

        //Eliminamos todos los colores y todas las relaciones de la parte derecha
        cleanAll() {
            try {
                //Cogemos todas las columna seleccionadas y las limpiamos 
                this.currentIndex = -1
                for (var i = 0; i < this.referenceTable.numCols; i++) {
                    this.removeColor('referenceTable', i);
                }

                for (var j = 0; j < this.candidateTable.numCols; j++) {
                    this.removeColor('candidateTable', j);
                }

                //Limpiamos todas las columnas relacionadas
                this.columnasRelacionadas.length = 0

                for (var i = 0; i < this.selectedColors.length; i++) {
                    this.selectedColors[i] = 0
                }
            } catch (error) {
                console.log(error)
            }
        },

        enviarResultado() {
            //Tenemos que añadir los valores de los campos en cada uno de los arrays
            for (var i = 0; i < this.columnasRelacionadas.length; i++) {
                //Comprobamos el valor de las checkboxes para ver si el título o el contenido han sido elegidos
                var contenido = document.getElementById('contenido' + i);
                var titulo = document.getElementById('titulo' + i);

                if (contenido.checked == true) {
                    var contenido = { "contenido": 1 }
                    this.columnasRelacionadas[i].push(contenido)
                }

                if (titulo.checked == true) {
                    var titulo = { "titulo": 1 }
                    this.columnasRelacionadas[i].push(titulo)
                }

                if (titulo.checked == false && contenido.checked == false) {
                    alert("Selecciona en la relación número: " + i + "el motivo por el consideras que hay una relación")
                    return;
                }

                var comentario = document.getElementById('comentario' + i);
                this.columnasRelacionadas[i].push(comentario.value)
            }

            //Añadimos las tablas que han sido seleccionadas al array
            var tablas = {
                "tablas": [
                    { "query": this.lote.query },
                    { "candidate": this.lote.candidates[this.currentCandidateIndex] }
                ]
            }

            const userStore = useUserStore();
            this.result["email"] = userStore.userData.email
            this.result["tablas"] = tablas
            this.result["completada"] = true
            this.result["relaciones"] = this.columnasRelacionadas
            this.result["motivo"] = null

            TablesDataService.storeResult(this.result)
                .then((response) => {
                    // console.log(response);
                    //Si es la última tabla, del lote, limpiamos el lote y cogemos uno nuevo 
                    if (this.currentCandidateIndex + 1 == this.loteCandidatas.length) {
                        // console.log("Era la última tabla del lote")
                        this.loteCandidatas.length = 0
                        this.currentCandidateIndex = 0
                        //Limpiamos los colores de la tabla
                        this.cleanAll();
                        this.referenceTable = []
                        this.candidateTable = []
                        this.lote = []
                        this.result = {}
                        this.retrieveLote();
                    } else {
                        this.cleanAll();
                        this.nextCandidateTable();
                    }
                })
        },

        async noCompletada(motivo) {
            //Si no conozco el dominio, tenemos que enviar un resultado que indique el motivo:
            var tablas = {
                "tablas": [
                    { "query": this.lote.query },
                    { "candidate": this.lote.candidates[this.currentCandidateIndex] }
                ]
            }
            this.result["tablas"] = tablas
            this.result["completada"] = false
            this.result["relaciones"] = null
            this.result["motivo"] = motivo

            if (motivo == "otro") {
                this.result["motivo"] = document.getElementById("motivo").value
            }

            TablesDataService.storeResult(this.result)
                .then(() => {
                    //Si es la última tabla, del lote, limpiamos el lote y cogemos uno nuevo 
                    if (this.currentCandidateIndex + 1 == this.loteCandidatas.length) {
                        console.log("Era la última tabla del lote")
                        this.loteCandidatas.length = 0
                        this.currentCandidateIndex = 0
                        //Limpiamos los colores de la tabla
                        this.cleanAll();
                        this.referenceTable = []
                        this.candidateTable = []
                        this.lote = []
                        this.result = {}
                        this.retrieveLote();
                    } else {
                        this.cleanAll();
                        nextTick()
                        this.nextCandidateTable();
                    }
                })

        }
    },

    async mounted() {
        await this.retrieveLote();
    },

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
                        <th draggable="false" class="noselect" v-for="(value, key) in referenceTable.title"
                            v-on:click="juntarColumnas(referenceTable, key, 'referenceTable', 'titulo');">
                            {{ value }}
                        </th>
                    </tr>
                </thead>

                <!-- Resto de la tabla -->
                <tr v-for="(value, key) in referenceTable.data">
                    <td draggable="false" class="noselect" v-for="(value2, key) in value"
                        v-on:click="juntarColumnas(referenceTable, key, 'referenceTable', 'contenido');">
                        {{ value2 }}
                    </td>
                </tr>
            </table>

            <b-skeleton-table style="width: 75%;" :rows="5" :columns="3"
                :table-props="{ bordered: true, striped: true }" v-if="lote.length == 0">
            </b-skeleton-table>



            <table>
                <colgroup>
                    <col v-for="(value, key) in candidateTable.title" v-bind:id="'candidateTable' + key">
                </colgroup>
                <thead>
                    <tr>
                        <th draggable="false" class="noselect" v-for="(value, key) in candidateTable.title"
                            v-on:click="juntarColumnas(candidateTable, key, 'candidateTable', 'titulo');">
                            {{ value }}
                        </th>
                    </tr>
                </thead>

                <tr v-for="(value, key) in candidateTable.data">
                    <td draggable="false" class="noselect" v-for="(value2, key) in value"
                        v-on:click="juntarColumnas(candidateTable, key, 'candidateTable', 'contenido');">
                        {{ value2 }}
                    </td>
                </tr>
            </table>


            <b-skeleton-table style="width: 75%;" :rows="5" :columns="3"
                :table-props="{ bordered: true, striped: true }" v-if="lote.length == 0">
            </b-skeleton-table>


            <div class="d-flex" style="width: 100%; justify-content: space-evenly;">
                <div class="d-flex justify-content-center">
                    <button class="btn btn-danger" style="margin-top: 5%;" v-on:click="noCompletada('idioma')">No
                        conozco el idioma</button>
                </div>

                <div class="d-flex justify-content-center">
                    <button class="btn btn-danger" style="margin-top: 5%;" v-on:click="noCompletada('dominio')">No
                        conozco el dominio de las tablas</button>
                </div>

                <div className="motivo-button">
                    <button class="btn btn-warning" style="margin-top: 5%;" v-on:click="noCompletada('otro')">Otro
                        motivo</button>
                    <input v-bind:id="'motivo'" placeholder="Indica el motivo" />
                </div>

            </div>

        </div>

        <div class="right_side">
            <h1>Columnas seleccionadas</h1>
            <ul class="listaColumnas">
                <div v-for="(value, key) in columnasRelacionadas" class="d-flex flex-column flex-wrap cristal"
                    v-bind:id="'conjunto' + value[2]">


                    <div className="table-titles" style="width: 100%">
                        <span>
                            L - {{ value[0] }}
                        </span>
                        <hr class="solid" />
                        <span>
                            R - {{ value[1] }}
                        </span>
                    </div>

                    <div className="card-checkboxes">
                        <div className="checkbox">
                            <input v-bind:id="'titulo' + key" type="checkbox">
                            <label for="checkbox">Por el título</label>
                        </div>
                        <div className="checkbox">
                            <input v-bind:id="'contenido' + key" type="checkbox">
                            <label for="checkbox2">Por el contenido</label>
                        </div>
                    </div>

                    <div className="card-comment">
                        <input v-bind:id="'comentario' + key" placeholder="Añade un comentario" />
                        <div class="d-flex justify-content-center" style="width: 100%">
                            <button class="btn btn-danger" v-on:click="deleteByButton(key)" style="margin-top: 5%;">
                                Borrame</button>
                        </div>
                    </div>

                </div>
            </ul>
            <button class="btn btn-success" style="margin-top: 5%;" v-on:click="enviarResultado()">Tabla
                completada</button>

            <div style="width: 75%; margin-top: 2%;">
                <b-progress :value="currentCandidateIndex" :max="loteCandidatas.length" variant="success" striped :animated="animate" ></b-progress>
            </div>

        </div>
    </div>
</template>

<style scoped>
.card-title {
    background-image: linear-gradient(to bottom right, #ffffff00, #00000025);
    border-radius: 8px;
    padding: 0.4em;
}

.card-checkboxes {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0.3em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.listaColumnas hr {
    margin: 0.1em;
}

.card-comment {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
    padding: 0.3em;
}

.left_side th {}

.motivo-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.motivo-button button {
    margin-bottom: 0.2em;
}

.card-comment input {
    width: 100%;
}

.table-titles {
    justify-content: center;
    align-items: center;
    padding: 0.3em;
    margin-top: 0.5em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.checkbox input {
    margin: 0.5em;
}

.container_center {
    height: 100%;
    height: 80vh;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 5em;
}

.left_side {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    height: 100%;
}

.right_side {
    display: flex;
    flex-direction: column;
    justify-content: space;
    align-items: center;
    width: 40%;
    height: 100% !important;
    border-left: 1px solid black;
}

.active {
    color: brown;
}

.left_side table {
    border-collapse: collapse;
    table-layout: fixed;
    border: 1px solid #ddd;
}

table {
    table-layout: fixed;
    border: 1px solid black;
    color: black;
}

.red {
    background-color: #e6194B;
}

.blue {
    background-color: #4363d8;
}

.green {
    background-color: #3cb44b;
}

.yellow {
    background-color: #ffe119;
}

.pink {
    background-color: #fabed4;
}

.purple {
    background-color: #911eb4;
    color: white !important;
}

.orange {
    background-color: #f58231;
}

.cyan {
    background-color: #42d4f4 ;
}

.magenta {
    background-color: #f032e6;
}

.maroon {
    background-color: #800000;
    color: white !important;
}

html,
body {
    height: 100%;
}

body {
    margin: 0;
    background: linear-gradient(45deg, #49a09d, #5f2c82);
    font-family: sans-serif;
    font-weight: 100;
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

table {
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin: 2%;
    background-color: white;
}


td {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid black !important;
    text-align: center;
    padding-left: 0.5em;
    padding-right: 0.5em;
}

th {
    color: white;
    text-align: center;
    background-color: #55608f
}

td:hover {
    background-color: #ddd;
    opacity: 0.9;
}

.left_side table td {
    word-wrap: break-word;
}


.cristal {
    margin: 2%;
    box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.25);
    backdrop-filter: blur(10.5px);

    color: black;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.listaColumnas {
    height: 80%;
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
}


/* Desktops and laptops ----------- */

@media only screen and (max-width: 1280px) {
    table {
        font-size: 65%;
    }

    .cristal {
        font-size: smaller;
    }

    button {
        font-size: smaller;
    }
}

@media only screen and (max-width: 1550px) {
    table {
        font-size: 65%;
    }
}

@media only screen and (max-height: 800px) {
    table {
        font-size: 70%;
    }
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {}
</style>