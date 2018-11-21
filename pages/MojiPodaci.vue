<template >
<v-container  >



  <v-layout  row wrap>
    <v-flex   class="forma   pr-5 pl-5 pb-4 pt-4"  md8 offset-md2 xl6 offset-xl3>

<div   >
<h1 class="text-xs-center">Licni podaci</h1>



<div class="text-xs-center">



<v-btn v-if="izmenaPodataka"  @click="dugmeIzmena"    color="warning ">Izmeni</v-btn>
<v-btn v-if="!izmenaPodataka" @click="odustani"    color="secondary">Odustani</v-btn>

<v-btn :disabled="!valid" @click="sacuvajIzmeneFirme" v-if="!izmenaPodataka" color="primary">Sacuvaj</v-btn>

</div>
</div >
<hr>
<v-form refs="form" v-model="valid">



<v-layout row wrap>
  <v-flex>
    <v-layout class="pt-4" row wrap>
      <v-flex  xs7>
      <h3 >Ime i prezime</h3>
      </v-flex>
      <v-flex class="pa-4" hidden-sm-and-up xs5>
      </v-flex>
      <v-flex xs5 v-if="izmenaPodataka">
        <h3 class="podaci">{{ime}} {{prezime}}</h3>
      </v-flex>
      <v-flex xs5 v-else>
        <v-text-field
          class="podaciIzmena pa-0"
          v-model="ime"
          :rules="obaveznoPoljeRules"
        ></v-text-field>
        <v-text-field
          class="podaciIzmena pa-0"
          v-model="prezime"
          :rules="obaveznoPoljeRules"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >Ime roditelja</h3>
</v-flex>
<v-flex class="pa-4" hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{imeRoditelja}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"
v-model="imeRoditelja"
  :rules="obaveznoPoljeRules"
></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >Jmbg</h3>
</v-flex>
<v-flex class="pa-4" hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{jmbg}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
  v-model="jmbg"
    mask="#############"
  :rules="obaveznoPoljeRules"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >Strucna sprema: </h3>
</v-flex>
<v-flex class="pa-4" hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{strucnaSprema}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
  v-model="strucnaSprema"
    :rules="obaveznoPoljeRules"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs7>
<h3 >U radnom odnosu: </h3>
</v-flex>
<v-flex class="pa-4" hidden-sm-and-up xs5>
</v-flex>
<v-flex xs5>
  <h3 v-if="izmenaPodataka" class="podaci">{{uRadnomOdnosuNiz[uRadnomOdnosu].uRadnomOdnosuTekst}}</h3>
  <v-select v-if="!izmenaPodataka"
    :items="uRadnomOdnosuNiz"
    v-model="uRadnomOdnosu"
      item-text="uRadnomOdnosuTekst"
        item-value="uRadnomOdnosuVrednost"
  :rules="obaveznoPoljeRules"

  ></v-select>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
  <v-flex  xs7>
  <h3 >Pol: </h3>
  </v-flex>
  <v-flex class="pa-4" hidden-sm-and-up xs5>
  </v-flex>
  <v-flex xs5>
    <h3 v-if="izmenaPodataka" class="podaci">{{polNiz[pol].polNizTekst}}</h3>
    <v-select v-if="!izmenaPodataka"
      :items="polNiz"
      v-model="pol"
        item-text="polNizTekst"
          item-value="polNizVrednost"
    :rules="obaveznoPoljeRules"

    ></v-select>
  </v-flex>
    </v-layout>
<h3 class="pt-5 pb-1 blue-grey--text"><em>Kontakt podaci</em></h3>
<hr>
<v-layout class="pt-3" row wrap>
  <v-flex xs7>
    <h3 >Adresa:</h3>

  </v-flex>
  <v-flex class="pa-4" hidden-sm-and-up xs5>
  </v-flex>
  <v-flex xs5>
<h3 v-if="izmenaPodataka" class="podaci">{{adresa}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"
    :rules="obaveznoPoljeRules"
v-model="adresa"
></v-text-field>
  </v-flex>
</v-layout>

<v-layout class="pt-3" row wrap>
  <v-flex xs7>
    <h3 >Mesto:</h3>

  </v-flex>
  <v-flex class="pa-4" hidden-sm-and-up xs5>
  </v-flex>
  <v-flex xs5>
<h3 v-if="izmenaPodataka" class="podaci">{{opstina}}, {{grad}}</h3>
<v-select v-if="!izmenaPodataka"
  :items="opstine"
  v-model="opstinaId"
    item-text="ops_naziv"
      item-value="ops_id"
:rules="obaveznoPoljeRules"

></v-select>
<v-select v-if="!izmenaPodataka"
  :items="gradovi"
  v-model="gradId"
    item-text="gra_naziv"
    item-value="gra_id"
:rules="obaveznoPoljeRules"
    @change="spisakOpstina($event)"

></v-select>
</v-flex>
</v-layout>
  </v-flex>
</v-layout>
</v-form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data(){
    return{
      // NOVE PROMENLJIVE
      // KORISNICKI PODACI
      ime: '',
      prezime: '',
      imeRoditelja:'',
      jmbg: '',
      strucnaSprema: '',
      uRadnomOdnosu: 0,
      uRadnomOdnosuNiz: [
        {
          uRadnomOdnosuVrednost: 0,
          uRadnomOdnosuTekst: 'Ne'
        },
        {
          uRadnomOdnosuVrednost: 1,
          uRadnomOdnosuTekst: 'Da'
        }
      ],
      pol: 0,
      polNiz: [
        {
          polNizVrednost: 0,
          polNizTekst: 'zenski'
        },
        {
          polNizVrednost: 1,
          polNizTekst: 'muski'
        }
      ],
      adresa: '',
      opstina:'',
      opstinaId:'',
      grad:'',
      graId:'',
      // BOOLEAN KOJI SALTA INPUT-> P
      izmenaPodataka:true,
      // NIZOVI ZA SELEKT
      gradovi:'',
      opstine:'',
      // KONTROLOR ZA FORMU - POPUNJENA POLJA
      valid:false,
      // STARE PROMENLJIVE
      image:'',
      logo:'',
      opstinaNaziv:'',
      gradNaziv:'',
      opstine:[],
      gradovi:[],
      imeFirme:'',
      punNaziv:'',
      maticniBroj:'',
      pib:'',
      sifraDelatnosti:'',
      opisDelatnosti:'',
      ziroRacun:'',
      obaveznoPoljeRules: [
        v => !!v || 'Obavezno polje.'
      ],
  maticniBrojRules: [
        v => !!v || 'Morate uneti Maticni Broj',
        v => (v && v.length == 8) || 'Maticni Broj mora sadrzati 8 cifara'
      ],
  pibRules: [
        v => !!v || 'Morate uneti Pib',
        v => (v && v.length == 9) || 'Pib mora sadrzati 9 cifara'
      ]
    }
  },

  mounted(){
    axios.get("http://837s121.mars-e1.mars-hosting.com/getUser",{
      params:{ sid: localStorage.getItem('sessionid')  }
    }).then(response => {
      console.log(response.data.res[0]);
      var podaci=response.data.res[0];
      this.ime=podaci.kpd_ime;
      this.prezime=podaci.kpd_prezime;
      this.imeRoditelja=podaci.kpd_imeRoditelja;
      this.jmbg=podaci.kpd_jmbg;
      this.strucnaSprema=podaci.kpd_strucnaSprema;
      this.uRadnomOdnosu=Number(podaci.kpd_uRadnomOdnosu);
      this.pol=Number(podaci.kpd_pol);
      this.adresa=podaci.kpd_adresa;
      this.opstina=podaci.opstina;
      this.opstinaId=podaci.ops_id;
      this.grad=podaci.grad;
      this.gradId=podaci.gradId;
    });

    // axios.get("http://837s121.mars-e1.mars-hosting.com/getCompany",{
    //   params:{ sid: localStorage.getItem('sessionid')  }
    // }).then(response => {
    //   console.log(response.data.res[0]);
    //   this.imeFirme=response.data.res[0].fir_naziv;
    //   this.punNaziv=response.data.res[0].fir_pun_naziv;
    //   this.maticniBroj=response.data.res[0].fir_maticni_broj;
    //   this.pib=response.data.res[0].fir_pib;
    //   this.sifraDelatnosti=response.data.res[0].fir_sifra_delatnosti;
    //   this.opisDelatnosti=response.data.res[0].fir_opis_delatnosti;
    //   this.ziroRacun=response.data.res[0].fir_ziro_racun;
    //   this.opstina=response.data.res[0].ops_id;
    //   this.grad=response.data.res[0].gra_id;
    //   this.telefon=response.data.res[0].fir_telefon;
    //   this.email=response.data.res[0].fir_mejl;
    //   this.opstinaNaziv=response.data.res[0].ops_naziv;
    //   this.gradNaziv=response.data.res[0].gra_naziv;
    //   this.logo=response.data.res[0].imgurl;
    // });

  },
  methods:{










sacuvajIzmeneFirme(){
//   var fd=new FormData();
//   fd.append('logo',this.image);
//   fd.append('sid', localStorage.getItem('sessionid'));
//   fd.append('naziv', this.imeFirme);
// fd.append('punNaziv', this.punNaziv);
// fd.append('maticniBroj',this.maticniBroj);
// fd.append('pib', this.pib);
// fd.append('ziroRacun', this.ziroRacun);
// fd.append('sifraDelatnosti', this.sifraDelatnosti);
// fd.append('opisDelatnosti', this.opisDelatnosti);
// fd.append('adresa', this.adresa);
// fd.append('telefon', this.telefon);
// fd.append('mejl', this.email);
// fd.append('opstina', this.opstina);
//   axios.patch('http://837s121.mars-e1.mars-hosting.com/updateCompany',fd).then(
//     function (response) {
//     if(!response.data.status){
//       alert('Doslo je do greske prilikom pravljenja izmena.')
//     }
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
//   this.izmenaPodataka=true;
},

    odustani(){
    //   axios.get("http://837s121.mars-e1.mars-hosting.com/getCompany",{
    //                 params:{ sid: localStorage.getItem('sessionid')  }
    //                }).then(response => {
    // console.log(response.data.res[0]);
    // this.imeFirme=response.data.res[0].fir_naziv;
    // this.punNaziv=response.data.res[0].fir_pun_naziv;
    // this.maticniBroj=response.data.res[0].fir_maticni_broj;
    // this.pib=response.data.res[0].fir_pib;
    // this.sifraDelatnosti=response.data.res[0].fir_sifra_delatnosti;
    // this.opisDelatnosti=response.data.res[0].fir_opis_delatnosti;
    // this.ziroRacun=response.data.res[0].fir_ziro_racun;
    // this.adresa=response.data.res[0].fir_adresa;
    // this.opstina=response.data.res[0].ops_id;
    // this.grad=response.data.res[0].gra_id;
    // this.telefon=response.data.res[0].fir_telefon;
    // this.email=response.data.res[0].fir_mejl;
    // this.opstinaNaziv=response.data.res[0].ops_naziv;
    // this.gradNaziv=response.data.res[0].gra_naziv;
    //
    //                });
    //                this.izmenaPodataka=true;
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
            gradId:this.gradId
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
.labelSlike{
  color:blue;
  cursor:pointer;
  display: block;
  text-align: center;
  margin-top:10px;
  margin-bottom: 5px;
  font-size: 20px;
}
.labelSlike:hover{
text-decoration:underline;
}
#izborSlike{
display:none;
}

.relativni{
  position:relative;
}
.slika{

  width: 200px;
  height: 200px;
  margin-top: 200px;
  left:35%;
  opacity: 0.5;

  position: absolute;
}
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
  color:#68645a ;
  font-weight: 400;
}
input{
  padding-bottom:1px;
  padding-top:9px;
}
</style>
