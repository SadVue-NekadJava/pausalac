<template>
<v-container  id="wrapper">
  <v-form  ref="form" v-model="valid">
  <v-layout row wrap>
    <v-flex   v-if="novafaktura" class="forma pa-4" xs12 sm8 offset-sm2>
      <v-expansion-panel popout  >
        <v-layout align-center justify-center  row wrap class="mb-1">
          <v-btn class="success mb-3 mt-0" @click="novafaktura=!novafaktura" v-if="novafaktura">Kreiraj novu Fakturu</v-btn>
        </v-layout>
        <v-expansion-panel-content class=" listaFaktura" v-for="faktura in fakture" :key="faktura.id"  >
          <div slot="header" >
<v-layout  row wrap>
  <v-flex   xs5>


              <h2 :class="{'grey--text':faktura.fak_status==3}">{{faktura.kom_naziv}}</h2> <h3>{{faktura.date}}</h3>
            </v-flex>
            <v-flex  xs4>
<div class="storno mr-5"  v-if="faktura.fak_status==3">
  <h2 class=" text-xs-center">Stornirano</h2>
</div>
            </v-flex>
            <v-flex xs3>
              <h2>{{faktura.fak_total|thousandSeparator}} RSD</h2>
            </v-flex>
          </v-layout>
          </div>
          <v-card class="pa-2">
            <v-card-text class="pa-0">
           <h2 class="text-xs-center pb-3" v-if="faktura.fak_brojFakture!=='Samo izdate fakture mogu imati broj.'">Broj fakture: {{faktura.fak_brojFakture}}</h2>
           <h2 class="text-xs-center pb-3" v-else><em>{{faktura.fak_brojFakture}}</em></h2>
            <v-data-table
            :items="faktura.stavkeFakture"
            class="elevation-1"
            hide-actions
            hide-headers
            no-data-text="Faktura nema stavke."
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.usp_naziv }}</td>
                <td class="text-xs-center">{{ props.item.usp_cena|thousandSeparator }}</td>
                <td class="text-xs-center">{{ props.item.usp_mera }}</td>
                <td class="text-xs-center">{{ props.item.usp_kolicina }}</td>
                <td class="text-xs-center">{{ (props.item.usp_cena * props.item.usp_kolicina)|thousandSeparator}}</td>
              </template>
            </v-data-table>
            <h2 class="pt-5 text-xs-center">Ukupna cena: {{faktura.fak_total|thousandSeparator}} RSD</h2>
            <v-layout row wrap >
              <v-flex xs7>
                <h2 class="pt-5 text-xs-left">Mesto: {{faktura.fak_mestoPrometa}}, {{faktura.fak_datumPrometa}}</h2>
              </v-flex>
              <v-flex xs5>
                <h2 class="pt-5 text-xs-right">Plativo do: {{faktura.fak_valuta}}</h2>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="justify-center mb-1">
              <v-btn v-if="faktura.fak_status!=3" color="error" @click="dugmeStoriniranjeFakture(faktura)">Storniraj</v-btn>
            </v-layout>
            </v-card-text>
          </v-card>
          <!-- BRISANJE FAKTURE -->
          <div v-if="modal2" class="text-xs-center  modal pa-5">
            <h1>Da li ste sigurni da zelite da stornirate fakturu "{{odabranaFaktura.kom_naziv}}"?</h1>
            <v-btn @click="storiniranjeFakture(1)" color="warning">Da</v-btn>
            <v-btn @click="storiniranjeFakture(0)" color="secondary">Ne</v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>

  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 class="fadeIn text-xs-center" v-if="!novafaktura">
      <v-form class="forma pa-3">
        <v-layout class="justify-end">
          <v-icon @click="novafaktura=true" class="iks">clear</v-icon>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select :rules="obaveznoPoljeRules" @input="fakturaSelekt($event)" light class="pa-3" :items="komitenti" item-text="kom_naziv" item-value="kom_id" v-model="komitentId" label=" Komitent"></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>

          <v-flex sm4>



            <v-dialog ref="datumPrometa" v-model="modal" :return-value.sync="datumPrometa" persistent lazy full-width width="290px">
              <v-text-field :rules="obaveznoPoljeRules" slot="activator" v-model="datumPrometa" label="Datum prometa" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="datumPrometa" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal=false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.datumPrometa.save(datumPrometa)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex sm4>


            <v-dialog ref="datumValute" v-model="modal1" :return-value.sync="datumValute" persistent lazy full-width width="290px">
              <v-text-field :rules="obaveznoPoljeRules" slot="activator" v-model="datumValute" label="Datum valute" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="datumValute" :min="datumPrometa" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.datumValute.save(datumValute)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex sm4>
            <v-select light class="pa-3" :rules="obaveznoPoljeRules" :items="mesta" item-text="gra_naziv" item-value="gra_id" v-model="mesto" label="Mesto"></v-select>
          </v-flex>
        </v-layout>
    <v-layout row wrap justify-center>


          <v-flex md2 mr-5>
            <v-text-field v-model="proizvodNazivUsluge" label="Naziv usluge/proizvoda"></v-text-field>
          </v-flex>
          <v-flex md2 mr-5>
            <v-text-field v-model="proizvodKolicina" type="number" label="Kolicina"></v-text-field>
          </v-flex>
          <v-flex md2 mr-5>
            <v-text-field v-model="proizvodJedinicaMere" label="Jedinica mere"></v-text-field>
          </v-flex>
          <v-flex md2 mr-5>
            <v-text-field v-model="proizvodJedinicnaCena" type="number" label="Jedinicna cena"></v-text-field>
          </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
            <v-btn class="px-3" color="success" @click="dodajProizvod()">Dodaj proizvod</v-btn>
      </v-layout>
      <v-layout row wrap>
          <v-flex>
            <v-data-table
              :headers="headers"
              :items="proizvodi"
              hide-actions
              class="elevation-1"
              no-data-text="Trenutno nema stavki."
            >
              <tr slot="items" slot-scope="props">
                <td>{{ props.index+1 }}</td>
                <td class="text-xs-center">{{ props.item.naziv }}</td>
                <td class="text-xs-center">{{ props.item.cena|thousandSeparator }}</td>
                <td class="text-xs-center">{{ props.item.mera }}</td>
                <td class="text-xs-center">{{ props.item.kolicina }}</td>
                <td class="text-xs-center">{{ props.item.ukupnaCena|thousandSeparator }}</td>
                <td class="text-xs-center">
                  <v-icon
                    small
                    @click="ukloniStavku(props.item)"
                  >
                  delete
                  </v-icon>
                </td>
              </tr>
            </v-data-table>
            <v-card>
              <v-card-text class="headline text-xs-right" v-if="ukupno!=0"><em>Ukupno:</em> {{ukupno|thousandSeparator}} (RSD)</v-card-text>
            </v-card>
          </v-flex>
    </v-layout>

        <v-text-field label="Opis" v-model="opisFakture"></v-text-field>
      <v-layout row wrap class="justify-center">
          <v-btn color="success" :disabled="!valid" @click="posaljiFakturu(1)">Sacuvaj fakturu</v-btn>
          <v-btn color="primary" :disabled="!valid" @click="posaljiFakturu(2)">Sacuvaj radnu verziju</v-btn>
      </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
  </v-form>
</v-container>
</template>


<script>
import RegistracijaFirme from '@/components/registracijaFirme'
export default {
  components: {
    RegistracijaFirme
  },
  data() {
    return {
      date: null,
      datumPrometa: null,
      datumValute: null,
      mesto: '',
      menu: false,
      modal: false,
      modal1: false,
      menu2: false,
      value: '',
      novafaktura: true,
      mesta:[],
      // POPUNJAVA LISTU FAKTURA
      fakture: [],
      proizvodNazivUsluge: '',
      proizvodJedinicaMere: '',
      proizvodKolicina: '',
      proizvodJedinicnaCena:'',
      headers: [
          {
            align: 'left',
            sortable: false,
            width: '10px'
          },
          { text: 'Naziv proizvoda', value:"nazivProizvoda", sortable: false},
          { text: 'Jedinicna cena (RSD)', value: 'jedinicnaCena' },
          { text: 'Jedinica mere', value:"jedinicaMere", sortable: false},
          { text: 'Kolicina', value: 'kolicina'},
          { text: 'Ukupna cena (RSD)', value: 'ukupnaCena' },
          { text: 'Ukloni stavku', value: 'ukloniStavku', sortable: false}
        ],
      proizvodi: [],
      ukupno: 0,
      komitenti:[],
      // ID ODABRANOG KOMITENTA
      komitentId: '',
      // REQUIRED POLJA
      obaveznoPoljeRules:[
         v => !!v || 'Obavezno polje.'
      ],
      // KONTROLA ZA DUGMAD
      valid: false,
      opisFakture: '',
      // BRISANJE/ARHIVIRANJE FAKTURE
      modal2: false,
      odabranaFaktura: {}
    }

  },
  methods:{
    fakturaSelekt(faktura){

    },
    dodajProizvod(){
      if(this.proizvodNazivUsluge==='' || this.proizvodJedinicaMere==='' || this.proizvodKolicina==='' || this.proizvodJedinicnaCena===''){
        alert('Morate popuniti sve podatke vezane za proizvod!');
      }
      else{
        var noviProizvod={
          naziv: this.proizvodNazivUsluge,
          mera: this.proizvodJedinicaMere,
          kolicina: this.proizvodKolicina,
          cena: this.proizvodJedinicnaCena,
          ukupnaCena: this.proizvodKolicina * this.proizvodJedinicnaCena
        }
        this.proizvodi.push(noviProizvod);
        // DODAJEM NA UKUPNU CENU FAKTURE
        this.ukupno+=this.proizvodKolicina * this.proizvodJedinicnaCena
      }
    },
    ukloniStavku(stavka) {
        const zaBrisanje = this.proizvodi.indexOf(stavka)
        confirm('Da li ste sigurni?') && this.proizvodi.splice(zaBrisanje, 1)
        this.ukupno-=stavka.ukupnaCena;
    },
    posaljiFakturu(statusFakture){
      // FAKTURA JE ZAVRSENA
      if(statusFakture===1){
        // KONTROLA DA LI JE ODABRAN KOMITENT
        if(this.komitentId===''){
          alert('Niste odabrali komitenta.');
        }
        // KONTROLA DA LI JE ODABRAN DATUM PROMETA
        else if(this.datumPrometa===null){
          alert('Niste uneli datum prometa.');
        }
        // KONTROLA DA LI JE ODABRAN DATUM VALUTE
        else if(this.datumValute===null){
          alert('Niste uneli datum valute.');
        }
        // KONTROLA DA LI JE ODABRANO MESTO
        else if(this.mesto===''){
          alert('Niste odabrali mesto pisanja fakture.')
        }
        // KONTROLA DA LI POSTOJI BAR JEDAN PROIZVOD ILI USLUGA
        else if(this.proizvodi.length===0){
          alert('Morate uneti barem jedan proizvod ili uslugu.');
        }
        else{
          // PROVERA DA LI DATUM PROMETA IDE PRE DATUMA VALUTE
          if(new Date(this.datumPrometa)>=new Date(this.datumValute)){
            alert('Datum valute ne moze biti pre datuma prometa.')
          }
          // SVE KONTROLE SU USPESNE
          else{
            axios.post("http://837s121.mars-e1.mars-hosting.com/postInvoice", {
                  sid: localStorage.getItem('sessionid'),
                  valuta: this.datumValute,
                  datumPrometa: this.datumPrometa,
                  mestoPrometa: this.mesto,
                  total: this.ukupno,
                  statusFakture: statusFakture,
                  uputstva: this.opisFakture,
                  komId: this.komitentId,
                  stavkeFakture: this.proizvodi
              })
              .then(response => {
              if(response.data.status){
                alert('Uspesno ste uneli fakturu. Broj fatkure: '+response.data.brojFakture);
              }
              else{
                alert('Doslo je do greske, faktura nije uneta.');
              }
              });
          }
        }
      }
      // FAKTURA SE CUVA KAO NACRT
      else{

        // PROVERA DA LI SU DATUMI UNESENI
        if(this.datumPrometa!==null && this.datumValute!==null){
          // PROVERA DA LI DATUM PROMETA IDE PRE DATUMA VALUTE
          if(new Date(this.datumPrometa)>new Date(this.datumValute)){
            alert('Datum valute ne moze biti pre datuma prometa!');
            // ZUSTAVLJAM FUNKCIJU
            return false;
          }
        }
        if(this.komitentId==='' && this.mesto===''){
          alert('Morate odabrati komitenta i mesto prometa!');
        }
        else if(this.komitentId===''){
          alert('Morate odabrati komitenta!');
        }
        else if(this.mesto===''){
          alert('Morate odabrati mesto prometa!');
        }
        else{
          // CUVAM FAKTURU KAO NACRT
          axios.post("http://837s121.mars-e1.mars-hosting.com/postTemplate", {
              sid: localStorage.getItem('sessionid'),
              valuta: this.datumValute,
              datumPrometa: this.datumPrometa,
              mestoPrometa: this.mesto,
              total: this.ukupno,
              statusFakture: statusFakture,
              uputstva: this.opisFakture,
              komId: this.komitentId,
              stavkeFakture: this.proizvodi
            })
            .then(response => {
              console.log(response.data);
            });
        }
      }
    },
    dugmeStoriniranjeFakture(faktura){
      this.odabranaFaktura=faktura;
      this.modal2=true;
      console.log(this.odabranaFaktura);
    },
    storiniranjeFakture(n){
      if(n){
        axios.post("http://837s121.mars-e1.mars-hosting.com/cancelInvoice", {
          sid: localStorage.getItem('sessionid'),
          fakId: this.odabranaFaktura.fak_id
        })
        .then(response => {
          console.log(response.data);
        });
      }
      this.modal2=false;
    }
  },
  mounted() {
    axios.get("http://837s121.mars-e1.mars-hosting.com/getComittents", {
      params: {
        sid: localStorage.getItem('sessionid')
      }
    }).then(response => {
      this.komitenti = response.data.komitenti;
    });
    // POPUNJAVANJE SELEKTA GRADOVI
    axios.get("http://837s121.mars-e1.mars-hosting.com/getCity")
      .then(response => {
        this.mesta = response.data.gradovi;
      });
    // PREUZIMA SVE FAKTURE
    axios.get("http://837s121.mars-e1.mars-hosting.com/getInvoices", {
      params: {
        sid: localStorage.getItem('sessionid')
      }
    }).then(response => {
      console.log(response.data);
      // MENJAM FORMAT DATUMA GDE POSTOJI I KONTROLISEM DA LI POSTOJI BROJ FAKTURE
      for (var faktura of response.data.fakture){
        // DA LI POSTOJI DATUM IZDAVANJA?
        if(faktura.fak_datumIzdavanja!==null){
          // RASTAVLJAM DATUM NA OSNOVU MINUSA
          faktura.fak_datumIzdavanja=faktura.fak_datumIzdavanja.split('-');
          // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
          faktura.fak_datumIzdavanja=faktura.fak_datumIzdavanja[2]+'.'+faktura.fak_datumIzdavanja[1]+'.'+faktura.fak_datumIzdavanja[0]+'.';
        }
        else{
          faktura.fak_datumIzdavanja='Datum izdavanja nije naveden.'
        }
        // DA LI POSTOJI DATUM PROMETA?
        if(faktura.fak_datumPrometa!==null){
          // RASTAVLJAM DATUM NA OSNOVU MINUSA
          faktura.fak_datumPrometa=faktura.fak_datumPrometa.split('-');
          // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
          faktura.fak_datumPrometa=faktura.fak_datumPrometa[2]+'.'+faktura.fak_datumPrometa[1]+'.'+faktura.fak_datumPrometa[0]+'.';
        }
        else{
          faktura.fak_datumPrometa='Datum prometa nije naveden.'
        }
        // DA LI POSTOJI DATUM VALUTE?
        if(faktura.fak_valuta!==null){
          // RASTAVLJAM DATUM NA OSNOVU MINUSA
          faktura.fak_valuta=faktura.fak_valuta.split('-');
          // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
          faktura.fak_valuta=faktura.fak_valuta[2]+'.'+faktura.fak_valuta[1]+'.'+faktura.fak_valuta[0]+'.';
        }
        else{
          faktura.fak_valuta='Datum valute nije naveden.'
        }
        // DA LI POSTOJI BROJ FAKTURE?
        if(faktura.fak_brojFakture===null){
          faktura.fak_brojFakture='Samo izdate fakture mogu imati broj.'
        }
      }
      this.fakture=response.data.fakture;
    });
  },

}
</script>
<style scoped>
/* .listaFaktura{
  opacity:0.6;
} */
.storno{
color:#f10000 ;
border:3px ridge #f10000 ;
border-radius: 4px;
min-height: 30px;

}
.klasa{
  width:60%;
  background-color:red;
  color:white !important;
  text-align: center;
    transform:rotateZ(25deg);

border-radius: 5px;
}
.fadeIn {
  animation: test 0.5s;
}
/* RESETOVANJE STILOVA */

.listaFaktura{
  opacity:0.9;
border-radius:6px;
  max-width: 100%;
}
/* DUGME IKS PRILIKOM PRAVLJENJA FAKTURE */
.iks{
  cursor:pointer;

}
.iks:hover{
  transform:scale(1.4);
}
@keyframes test {
  from {
    transform: scale(0.9);
    opacity: 0.8;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }

}

/* GAZIM STILOVE SA DRUGIH FAJLOVA */
#wrapper{
  box-sizing: content-box;
}
/* STIL ZA TABELU */
th {
  padding: 5px;
}
.theme--light.v-table{
  cursor: pointer;
}
@media (min-width: 0)
.flex .xs2 {
  max-width: 20%;
}
/* MODAL ZA BRISANJE FAKTURE */
.modal{
  width:50%;
  z-index: 100;
  opacity:1;
  top: 30%;
  left: 25%;
  box-sizing: border-box;
  border-radius: 10px;
  background-color:white;
  -webkit-box-shadow: 0px 2px 241px -3px rgba(0,0,0,1);
  -moz-box-shadow: 0px 2px 241px -3px rgba(0,0,0,1);
  box-shadow: 0px 2px 241px -3px rgba(0,0,0,1);
  position:fixed;
}
</style>
