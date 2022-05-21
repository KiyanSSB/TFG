<script>
import TablesDataService from '@/services/TablesDataService';
 import {useUserStore} from '../stores/user'
export default {
    name: "Tables",

    data() {
        return {
            candidateTable: [],
            referenceTable: [],
            tables: [],
            columns: [],
            currentIndex: -1,
            currentTable: null,
            notAllowedKeys: [],
            columnasRelacionadas: [],
            currentSelection: [],
            alreadySelected: false,
            Tabla: Object,
            referenceClicked: false,
            candidateClicked: false,
            nextColor:[
                "red",
                "green",
                "blue",
                "yellow"
            ]

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

        setCurrentIndex(key) {
            this.currentIndex = key
        },

        selectColumn(table, key) {
            var data = []
            if (this.notAllowedKeys.indexOf(key) == -1) {
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

        unselectColumn(table,key){
            this.currentIndex == -1

            console.log(key+table)
            document.getElementById(key + table).classList.remove("red")
        },

        resetControl(){
            this.currentIndex = -1
            this.currentTable = null
        },

        checkSameTable(table, key, whichTable) {
            console.log(this.referenceClicked)
            console.log(whichTable)
            console.log("El current index es:" + this.currentIndex + " La key es : " + key)

            if (whichTable == 'referenceTable') {
                console.log('Estoy en referenceTable')
                if (this.referenceClicked == true && whichTable == 'referenceTable' && this.currentIndex != key) {
                    return false
                }

            }

            if (whichTable == 'candidateTable') {
                console.log('Estoy en CandidateTable')
                if (this.candidateClicked == true && whichTable == 'candidateTable' && this.currentIndex != key) {
                    return false
                }
            }

        },

        juntarColumnas(table, key, whichTable) {
            //Tenía columna antes?
                //Si:
                if(this.currentIndex != -1){
                    console.log("Tengo una columna, es la misma EN LA MISMA TABLA?")
                    //Es la misma columna?
                    if(this.currentIndex == key && whichTable == this.currentTable){
                        console.log("Has seleccionado la misma columna")
                        this.removeColor(whichTable,this.currentIndex);
                        this.currentIndex = -1
                        this.currentTable = null
                        return false;
                    }else{
                        console.log("Es otra columna, es de la misma tabla?")
                        //Comprobamos cual de las tablas ha sido clickada y actuamos en función si ha sido clickada antes o no
                        if(this.currentTable == whichTable){
                            for(i=0; i<this.columnasRelacionadas.length; i++){
                                if(whichTable == 'referenceTable'){
                                    if(this.columnasRelacionadas[i].includes(this.referenceTable.title[key])){
                                        alert("La columna ya está seleccionada, borral la relación")
                                        return
                                    }
                                }else{
                                    if(this.columnasRelacionadas[i].includes(this.candidateTable.title[key])){
                                        alert("La columna ya está seleccionada, borra la relación")
                                        return
                                    }
                                }
                            }
                            this.removeColor(whichTable,this.currentIndex)
                            this.cambiarColor(whichTable,key)
                            this.currentIndex=key         
                        }else{
                            //Si hemos llegado aquí es que hemos seleccionado dos columnas de las tablas
                                for(i=0; i<this.columnasRelacionadas.length; i++){
                                    if(whichTable == 'referenceTable'){
                                        if(this.columnasRelacionadas[i].includes(this.referenceTable.title[key])){
                                            alert("La columna ya está seleccionada, borral la relación")
                                            return
                                        }
                                    }else{
                                        if(this.columnasRelacionadas[i].includes(this.candidateTable.title[key])){
                                            alert("La columna ya está seleccionada, borra la relación")
                                            return
                                        }
                                    }
                                }
                                //1º Guardamos la pareja creada:
                                if(whichTable=='candidateTable'){
                                    var pair = [this.referenceTable.title[this.currentIndex] ,table.title[key]]
                                    console.log(pair)
                                    for(var i = 0  ; i < this.columnasRelacionadas.length; i++){
                                        console.log(JSON.stringify(this.columnasRelacionadas[i]));
                                        console.log(JSON.stringify(pair))
                                        if(JSON.stringify(this.columnasRelacionadas[i]) == JSON.stringify(pair) ){
                                            alert("Ya has hecho esta selección")
                                            this.removeColor(whichTable,key)
                                            this.removeColor('referenceTable',key)
                                            this.resetControl();
                                            return;
                                        }
                                    }
                                    this.cambiarColor("candidateTable",key)
                                    this.columnasRelacionadas.push([  this.referenceTable.title[this.currentIndex] , table.title[key]     ])
                                    this.resetControl(); 
                                    return
                                }else{
                                    console.log("La última clickada es de referencia")
                                    var pair = [table.title[key] , this.candidateTable.title[this.currentIndex]]
                                      for(var i = 0  ; i < this.columnasRelacionadas.length; i++){
                                        if(JSON.stringify(this.columnasRelacionadas[i]) == JSON.stringify(pair) ){
                                            alert("Ya has hecho esta selección")
                                            this.removeColor(whichTable,key)
                                            this.removeColor('candidateTable',key)
                                            this.resetControl();
                                            return;
                                        }
                                    }
                                    this.cambiarColor("referenceTable",key)
                                    this.columnasRelacionadas.push([table.title[key] , this.candidateTable.title[this.currentIndex]])
                                    this.resetControl();
                                    return;
                                }
                                
                        }
                        // this.currentIndex = key //Guardamos la columna seleccionada
                        // console.log(this.currentIndex)
                        // //Si es la tabla de referencia 
                        // if(this.referenceClicked == true && whichTable == 'referenceTable'){
                        //     this.cambiarColor(whichTable,key)
                        //     this.removeColor(whichTable,this.currentIndex)
                        // }
                    }
                }

                //No:
                if(this.currentIndex == -1){
                    //Esta columna ha sido seleccionada ya? si es así, borrarla
                    for(i=0; i<this.columnasRelacionadas.length; i++){
                        if(whichTable == 'referenceTable'){
                            if(this.columnasRelacionadas[i].includes(this.referenceTable.title[key])){
                                this.deletePair(i)
                                return
                            }
                        }else{
                            if(this.columnasRelacionadas[i].includes(this.candidateTable.title[key])){
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
                    if(whichTable=='referenceTable'){
                        this.referenceClicked = true
                    }else{
                        this.candidateClicked = true
                    }
       
                    this.cambiarColor(whichTable, key);//Ponemos de color la columna en cuestión
                }



            // this.setCurrentIndex(key)
   
            // //Antes de nada, comprobar cual de las tablas ha sido clickada para bloquear su click
            // if (whichTable == 'referenceTable') {
            //     this.referenceClicked = true
            // }

            // if (whichTable == 'candidateTable') {
            //     this.candidateClicked = true
            // }


            // this.cambiarColor('referenceTable',key)


            // //1º , Crear un array donde juntar las columnas que se van a seleccionar
            // //Es current Selection

            // this.currentSelection.push(table.title[key]);

            // //2º, Cuando se selecciona una columna, se debe bloquear de poder seleccionar otra columna de la tabla Origen
            // //Por ejemplo con un booleano 
            // //Lo colocamos a true cuando tengamos una columna seleccionada

            // this.alreadySelected = true;

            // //3ª Es necesario cambiar la función de selección de las columnas para comprobar que no se clicka 2 veces sobre la misma columna 



            

        },

        cambiarColor(whichTable, key) {
            document.getElementById(whichTable+key).classList.add(this.nextColor[this.columnasRelacionadas.length])
        },

        removeColor(whichTable,currentIndex){
            console.log("La columna tiene el Id: " + whichTable+currentIndex)
            console.log("Vamos a borrar el color:" +  this.nextColor[this.columnasRelacionadas.length])
            document.getElementById(whichTable+currentIndex).classList = ""
        },
        

        deletePair(key){
            var eliminados = this.columnasRelacionadas.splice(key,1)
            console.log(this.nextColor[this.columnasRelacionadas.length])
            //Borramos el color de la columna de referencia
            this.removeColor('referenceTable', this.referenceTable.title.indexOf(this.referenceTable.title.find(element => element == eliminados[0][0])))
            //Borramos el color de la columna de candidata
            this.removeColor('candidateTable', this.candidateTable.title.indexOf(this.candidateTable.title.find(element => element == eliminados[0][1])))
        },

        noRelationships(){
            alert("No hay relaciones")
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
                            v-on:click="juntarColumnas(candidateTable,key,'candidateTable');">
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
                <div v-for="(value, key) in columnasRelacionadas">
                      <li >{{ value }}</li> 
                      <button v-on:click="deletePair(key)"> borrame</button>
                      <input type="checkbox" id="checboxTitle" v-model="checked">
                      <label for="checkbox">Por el título</label>
                      <input type="checkbox" id="checkboxContent" v-model="checkContent">
                      <label for="checkbox2">Por el contenido</label> 
                      <input placeholder="Añade un comentario"/> 
                </div>  
            </ul>
            
          




            <button style="margin-top: 5%;" v-on:click="noRelationships()">No hay relaciones</button>
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

.blue{
    background-color: blue;
}

.green{
    background-color: green;
}

.yellow{
    background-color: yellow;
}
</style>