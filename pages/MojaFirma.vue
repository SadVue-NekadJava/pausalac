<template >
<v-container  >


  <v-layout  row wrap>
    <v-flex  class="forma  pr-5 pl-5 pb-4 pt-4"  md8 offset-md2 xl6 offset-xl3>
<div   >
<h1 class="text-xs-center">{{imeFirme}}</h1>



<div class="text-xs-center">



<v-btn v-if="izmenaPodataka"  @click="dugmeIzmena "    color="warning ">Izmeni</v-btn>
<v-btn v-if="!izmenaPodataka" @click="odustani"    color="secondary">Odustani</v-btn>

<v-btn  v-if="!izmenaPodataka" color="primary">Sacuvaj</v-btn>

</div>
</div >
<hr>
<v-layout row wrap>
  <v-flex>
    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >Pun naziv:</h3>
</v-flex>
<v-flex class="pa-4" hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{punNaziv}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"


v-model="punNaziv"
></v-text-field>
</v-flex>
    </v-layout>

    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >Maticni broj:</h3>
</v-flex>
<v-flex hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{maticniBroj}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"


  v-model="maticniBroj"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >Pib:</h3>
</v-flex>
<v-flex hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{pib}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
  v-model="pib"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >Ziro racun:</h3>
</v-flex>
<v-flex hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{ziroRacun|accNumber}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
  v-model="ziroRacun"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >Sifra delatnosti:</h3>
</v-flex>
<v-flex hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{sifraDelatnosti}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
  v-model="sifraDelatnosti"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
  <v-flex  xs7>
  <h3 >Opis delatnosti:</h3>
  </v-flex>
  <v-flex hidden-sm-and-up xs5>
  </v-flex>
  <v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{opisDelatnosti}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
  v-model="opisDelatnosti"
  ></v-text-field>
  </v-flex>
    </v-layout>
<h3 class="pt-5 pb-1 blue-grey--text"><em>Kontakt podaci</em></h3>
<hr>
<v-layout class="pt-3" row wrap>
  <v-flex xs7>
    <h3 >Adresa:</h3>

  </v-flex>
  <v-flex hidden-sm-and-up xs5>
  </v-flex>
  <v-flex xs5>
<h3 v-if="izmenaPodataka" class="podaci">{{adresa}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"
v-model="adresa"
></v-text-field>
  </v-flex>
</v-layout>

<v-layout class="pt-3" row wrap>
  <v-flex xs7>
    <h3 >Mesto:</h3>

  </v-flex>
  <v-flex hidden-sm-and-up xs5>
  </v-flex>
  <v-flex xs5>
<h3 v-if="izmenaPodataka" class="podaci">{{opstinaNaziv}}, {{gradNaziv}}</h3>
<v-select v-if="!izmenaPodataka"
  :items="opstine"
  v-model="opstina"
    item-text="ops_naziv"
      item-value="ops_id"


></v-select>
<v-select v-if="!izmenaPodataka"
  :items="gradovi"
  v-model="grad"
    item-text="gra_naziv"
    item-value="gra_id"

    @change="spisakOpstina($event)"

></v-select>
</v-flex>
</v-layout>
<v-layout class="pt-3" row wrap>
  <v-flex xs7>
    <h3 >Telefon:</h3>

  </v-flex>
  <v-flex hidden-sm-and-up xs5>
  </v-flex>
  <v-flex xs5>
<h3 v-if="izmenaPodataka" class="podaci">{{telefon|phoneNumber}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"
v-model="telefon"
></v-text-field>
  </v-flex>
</v-layout>
<v-layout class="pt-3"  row wrap>
  <v-flex  xs7>
    <h3 >Email:</h3>

  </v-flex>
  <v-flex hidden-sm-and-up xs5>
  </v-flex>
  <v-flex xs5>
<h3 v-if="izmenaPodataka" class="podaci">{{email}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"
v-model="email"
></v-text-field>
  </v-flex>
</v-layout>
  </v-flex>
</v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data(){
    return{
      opstinaNaziv:'',
      gradNaziv:'',
      opstine:[],
      gradovi:[],
      izmenaPodataka:true,
      imeFirme:'',
      punNaziv:'',
      maticniBroj:'',
      pib:'',
      sifraDelatnosti:'',
      opisDelatnosti:'',
      ziroRacun:'',
      adresa:'',
      opstina:'',
      grad:'',
      telefon:'',
      email:''
    }
  },
//   filters: {
//   phoneNumber: function (value) {
//
//
//     value = value.toString();
//         var duzina=value.length;
//         if(value.charAt(0)=='0'){
//           return value.slice(0,3)+'/'+value.slice(4,7)+'-'+value.slice(8,duzina);
//
//         }
//         else{
//     return '+('+value.slice(0,3)+')'+value.slice(4,8)+'-'+value.slice(4,duzina);
//   }}
// },
  mounted(){
    axios.get("http://837s121.mars-e1.mars-hosting.com/getCompany",{
                  params:{ sid: localStorage.getItem('sessionid')  }
                 }).then(response => {
console.log(response.data.res[0]);
this.imeFirme=response.data.res[0].fir_naziv;
this.punNaziv=response.data.res[0].fir_pun_naziv;
this.maticniBroj=response.data.res[0].fir_maticni_broj;
this.pib=response.data.res[0].fir_pib;
this.sifraDelatnosti=response.data.res[0].fir_sifra_delatnosti;
this.opisDelatnosti=response.data.res[0].fir_opis_delatnosti;
this.ziroRacun=response.data.res[0].fir_ziro_racun;
this.adresa=response.data.res[0].fir_adresa;
this.opstina=response.data.res[0].ops_id;
this.grad=response.data.res[0].gra_id;
this.telefon=response.data.res[0].fir_telefon;
this.email=response.data.res[0].fir_mejl;
this.opstinaNaziv=response.data.res[0].ops_naziv;
this.gradNaziv=response.data.res[0].gra_naziv;

                 });

  },
  methods:{
    odustani(){
      axios.get("http://837s121.mars-e1.mars-hosting.com/getCompany",{
                    params:{ sid: localStorage.getItem('sessionid')  }
                   }).then(response => {
    console.log(response.data.res[0]);
    this.imeFirme=response.data.res[0].fir_naziv;
    this.punNaziv=response.data.res[0].fir_pun_naziv;
    this.maticniBroj=response.data.res[0].fir_maticni_broj;
    this.pib=response.data.res[0].fir_pib;
    this.sifraDelatnosti=response.data.res[0].fir_sifra_delatnosti;
    this.opisDelatnosti=response.data.res[0].fir_opis_delatnosti;
    this.ziroRacun=response.data.res[0].fir_ziro_racun;
    this.adresa=response.data.res[0].fir_adresa;
    this.opstina=response.data.res[0].ops_id;
    this.grad=response.data.res[0].gra_id;
    this.telefon=response.data.res[0].fir_telefon;
    this.email=response.data.res[0].fir_mejl;
    this.opstinaNaziv=response.data.res[0].ops_naziv;
    this.gradNaziv=response.data.res[0].gra_naziv;

                   });
                   this.izmenaPodataka=true;
    },
    spisakOpstina(gradId) {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
        params: {
          gradId
        }
      }).then(response => {
        this.opstine = response.data.opstine;
      });
    },
    dugmeIzmena(){
      this.izmenaPodataka=!this.izmenaPodataka;
      axios.get("http://837s121.mars-e1.mars-hosting.com/getCity")
        .then(response => {
          this.gradovi = response.data.gradovi;
          console.log(this.gradovi);



        });

        setTimeout(()=>{
          axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
            params: {
              gradId:this.grad
            }
          }).then(response => {
            this.opstine = response.data.opstine;
            console.log(response.data);
          });

        },100)
    }

  }
}

</script>

<style >
.levoDugme{
  margin-right: 100px;
}
.v-messages{
  min-height: 0;
}
.podaciIzmena{

  margin-top: -14px;
}
.relativno{
  position: relative;
}
.podaci{
  color:#68645a;
  font-weight: 400;
}
input{
  padding-bottom:1px;
  padding-top:9px;
}
</style>
