<template>
<v-container>

<div class="forma text-xs-center">


  <h1>Spisak Komitenata</h1>
  <v-expansion-panel class="pa-5">
    <v-expansion-panel-content
      v-for="(komitent,i) in komitenti"
      :key="i"
    >
      <div slot="header"><h2>{{komitent.kom_naziv   }}</h2></div>
      <v-card>
        <v-card-text>

        <h1 class="display-2" >{{komitent.kom_punNaziv}}</h1>  
          <hr>
        <h3 class="pt-3">Adresa:{{komitent.kom_adresa}} </h3>
        <h3 class="pt-2">Email:  {{komitent.kom_mejl}}</h3>
        <h3 class="pt-2">Pib: {{komitent.kom_pib}} </h3>
        <h3 class="pt-2">Telefon:  {{komitent.kom_telefon}}</h3>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </div>
  </v-container>
</template>

<script>
export default {
data(){
  return{
komitenti:[]
  }
},
mounted(){
  axios.get("http://837s121.mars-e1.mars-hosting.com/getComittents",{
                params:{ sid: localStorage.getItem('sessionid')  }
               }).then(response => {
                  this.komitenti=response.data.komitenti;
                  console.log(this.komitenti);


               });
}



}
</script>

<style lang="css">
</style>
