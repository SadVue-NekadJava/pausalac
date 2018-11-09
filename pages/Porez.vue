<template >
<v-container>

<v-layout class="mt-5" row wrap>


<v-flex class="mt-5 " xs4>


  <v-flex  xs8 >
    <div class="forma tabovi  pa-3 ma-2">


<h3>Porez na prihode</h3>
    </div>
  </v-flex>
  <v-flex  xs8 >
    <div class="forma tabovi pa-3 ma-2">
<h3>Doprinos za zdravstveno osiguranje</h3>
    </div>
  </v-flex>
  <v-flex  xs8 >
    <div class="forma tabovi pa-3 ma-2">


<h3>Doprinos za osiguranje za slucaj nezaposlenosti</h3>
    </div>
  </v-flex>
  <v-flex  xs8 >
    <div class="forma tabovi pa-3 ma-2">


<h3>Doprinos za pio</h3>
    </div>
  </v-flex>
</v-flex>

<v-flex class="forma pa-3"  xs8>
  <div class="uplatnica">
    <v-layout row wrap>


      <v-flex class="mt-4 pr-2 pb-2" xs12 lg6>
  <p class="textLabel mt-2 ml-3">Isplatilac</p>

<div class="ml-2 uplatnica">
</div>
<p class="textLabel mt-2 ml-3">Svrha isplate</p>
<div class="ml-2 uplatnica">
</div>
<p class="textLabel mt-2 ml-3">Primalac</p>
<div class="ml-2 uplatnica">
</div>
<div>
  <div class="d-flex mt-5">
    <v-flex xs12 lg9 class="text-xs-center">
      <hr>
      <p>pecat i potpis platioca</p>
    </v-flex>
  </div>
  <div class="d-flex justify-end">
    <v-flex xs12 lg9 class="text-xs-center">
      <hr>
      <p>mesto i datum prijema</p>
    </v-flex>
  </div>
</div>
</v-flex>

<v-flex xs12 lg6 class="pa-2">
<v-layout row wrap class="mt-1">
  <v-flex class="malaPolja pr-2" xs2>
    <p class="textLabel">Sifra placanja</p>
    <div class=" manjaUplatnica">
    </div>
  </v-flex>
  <v-flex class="malaPolja pr-2" xs2>
    <p class="textLabel ">Valuta</p>
    <div class=" manjaUplatnica">
    </div>
  </v-flex>
  <v-flex class="malaPolja" xs8>
    <p class="textLabel ">Iznos</p>
      <div class=" manjaUplatnica">
      </div>
  </v-flex>
</v-layout>
<p class="textLabel">Racun platioca</p>
  <div class="mt-1 manjaUplatnica">
  </div>
  <p class="textLabel">Model i poziv na broj (zaduzenje)</p>
  <v-layout row wrap>
    <v-flex xs2>
      <div class=" manjaUplatnica">
      </div>
    </v-flex>
    <v-flex xs9 offset-xs1>
      <div class=" manjaUplatnica">
      </div>
    </v-flex>
  </v-layout>
  <p class="textLabel">Racun primaoca</p>
    <div class="mt-1 manjaUplatnica">
    </div>
    <p class="textLabel">Model i poziv na broj (odobrenje)</p>
    <v-layout row wrap>
      <v-flex xs2>
        <div class=" manjaUplatnica">
        </div>
      </v-flex>
      <v-flex xs9 offset-xs1>
        <div class=" manjaUplatnica">
        </div>
      </v-flex>
    </v-layout>
    <div class="d-flex mt-5">
      <v-flex xs12 lg9 class="text-xs-center">
        <hr>
        <p>datum izvrsenja</p>
      </v-flex>
      <v-flex xs12 lg3>
        <input type="checkbox"><span>hitno</span>

      </v-flex>
    </div>



</v-flex>
  </v-layout>
</div>
</v-flex>
</v-layout>
<div class="text-xs-center">


<v-btn fixed large  class="mt-4" color="success">Stampaj sve</v-btn>

</div>
</v-container>

</template>

<script>
export default {
}
</script>

<style >
.malaPolja{
  flex-direction: column;
  min-height: 45px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
}
.manjaUplatnica{
  min-height: 30px;
  border:1px solid black;
}
.textLabel{
  margin-bottom: 0px;
}
.uplatnica{
  border:1px solid black;
min-height: 60px;
}
.tabovi{
  cursor: pointer;

}
.tabovi:hover{
  transform: scale(1.1);
}
.potpis{
  width: 60%;
}
</style>
