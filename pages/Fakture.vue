<template>
<v-container id="wrapper">
  <v-form ref="form" v-model="valid">
    <v-layout row wrap>
      <v-flex v-if="novafaktura" class="forma pa-4" xs12 sm8 offset-sm2>
        <v-expansion-panel popout>
          <v-layout align-center justify-center row wrap class="mb-1">
            <v-btn class="success mb-3 mt-0" @click="novaFakturaDugme" v-if="novafaktura">Kreiraj novu Fakturu</v-btn>
          </v-layout>
          <v-expansion-panel-content class=" listaFaktura" v-for="(faktura,index) in fakture" :key="faktura.id">
            <div slot="header">
              <v-layout row wrap>
                <v-flex xs5>
                  <h2 :class="{'grey--text':faktura.fak_status==3}">{{faktura.kom_naziv}}</h2>
                  <h3>{{faktura.date}}</h3>
                </v-flex>
                <v-flex xs4>
                  <div class="mr-5">
                    <h2 v-if="faktura.fak_status==3" class="storno text-xs-center">Stornirano</h2>
                    <h2 v-if="faktura.fak_status==2" class="izrada text-xs-center">U izradi</h2>

                  </div>
                </v-flex>
                <v-flex xs3>
                  <h2 :class="{'grey--text':faktura.fak_status==3}">{{faktura.fak_total|thousandSeparator}} RSD</h2>
                </v-flex>
              </v-layout>
            </div>
            <v-card class="pa-2">
              <v-card-text class="pa-0">
                <h2 class="text-xs-center pb-3" v-if="faktura.fak_brojFakture!=='Samo izdate fakture mogu imati broj.'">Broj fakture: {{faktura.fak_brojFakture}}</h2>
                <h2 class="text-xs-center pb-3" v-else><em>{{faktura.fak_brojFakture}}</em></h2>
                <v-data-table :items="faktura.stavkeFakture" class="elevation-1" hide-actions hide-headers no-data-text="Faktura nema stavke.">
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center"> {{tipSelekt[props.item.usp_tip].tipTekst}}</td>
                    <td class="text-xs-center">{{ props.item.usp_naziv }}</td>
                    <td class="text-xs-center">{{ props.item.usp_cena|thousandSeparator }}</td>
                    <td class="text-xs-center">{{ props.item.usp_mera }}</td>
                    <td class="text-xs-center">{{ props.item.usp_kolicina }}</td>
                    <td class="text-xs-center">{{ (props.item.usp_cena * props.item.usp_kolicina)|thousandSeparator}}</td>
                  </template>
                </v-data-table>
                <p class="faktura-opis"><em>Opis:</em> {{faktura.fak_uputstva}}</p>
                <h2 class="pt-5 text-xs-center">Ukupna cena: {{faktura.fak_total|thousandSeparator}} RSD</h2>
                <v-layout row wrap>
                  <v-flex xs7>
                    <h2 class="pt-5 text-xs-left">Mesto: {{faktura.grad}}, {{faktura.fak_datumPrometaIspis}}</h2>
                  </v-flex>
                  <v-flex xs5>
                    <h2 class="pt-5 text-xs-right">Plativo do: {{faktura.fak_valutaIspis}}</h2>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="justify-center mb-1">
                  <v-tooltip bottom>
                    <v-btn slot="activator" v-if="faktura.fak_status==1" @click="dugmeStoriniranjeFakture(faktura) " icon>
                      <v-icon size="35px" color="primary">close</v-icon>
                    </v-btn>
                    Storniraj
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn slot="activator" v-if="faktura.fak_status==1" icon>
                      <v-icon size="35px" color="primary">print</v-icon>
                    </v-btn>
                    Stampaj
                  </v-tooltip>


                  <v-tooltip bottom>
                    <v-btn @click="izmeniFakturu(index)" slot="activator" v-if="faktura.fak_status==2" large icon>
                      <v-icon size="35px" color="primary">edit
                      </v-icon>
                    </v-btn>
                    Izmeni
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn slot="activator" @click="izbrisiRadnuVerzijuFakture(faktura.fak_id)" v-if="faktura.fak_status==2" large icon>
                      <v-icon size="35px" color="primary">delete</v-icon>
                    </v-btn>
                    Izbrisi
                  </v-tooltip>
                  <v-tooltip bottom>

                    <v-btn slot="activator" v-if="faktura.fak_status==2&&!faktura.isteklaValuta" large @click="fakturisiDraft(faktura.fak_id)" icon>
                      <v-icon size="35px" color="primary">check</v-icon>
                    </v-btn>
                    Fakturisi
                  </v-tooltip>
                  <v-tooltip bottom>

                    <v-btn slot="activator" v-if="faktura.fak_status==2&&faktura.isteklaValuta" disabled large @click="fakturisiDraft(faktura.fak_id)" icon>
                      <v-icon size="35px" color="primary">check</v-icon>
                    </v-btn>
                    Valuta je istekla
                  </v-tooltip>
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
        <v-form v-model="valid" class="forma pa-3">
          <v-layout class="justify-end">
            <v-icon @click="novaFakturaDugme" class="iks">clear</v-icon>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select :rules="obaveznoPoljeRules" light class="pa-3" :items="komitenti" item-text="kom_naziv" item-value="kom_id" v-model="komitentId" label=" Komitent" no-data-text="Trenutno nema stavki."></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>

            <v-flex sm4>



              <v-dialog ref="datumPrometa" v-model="modal" :return-value.sync="datumPrometa" persistent lazy full-width width="290px">
                <v-text-field :rules="obaveznoPoljeRules" slot="activator" v-model="datumPrometa" label="Datum prometa" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="datumPrometa" :min="danasnjiDatum" scrollable>
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
              <v-select
                :items="tipSelekt"
                v-model="tipTrenutnaVrednost"
                item-text="tipTekst"
                item-value="tipVrednost"
                :rules="selektRules"
              ></v-select>
            </v-flex>
            <v-flex md2 mr-4>
              <v-text-field v-model="proizvodNazivUsluge" label="Naziv usluge/proizvoda"></v-text-field>
            </v-flex>
            <v-flex md2 mr-4>
              <v-text-field v-model="proizvodJedinicnaCena" type="number"  label="Jedinicna cena (RSD)"></v-text-field>
            </v-flex>
            <v-flex md2 mr-4>
              <v-text-field v-model="proizvodJedinicaMere" label="Jedinica mere"></v-text-field>
            </v-flex>
            <v-flex md2 mr-4>
              <v-text-field v-model="proizvodKolicina" type="number" label="Kolicina"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
            <v-btn class="px-3" color="success" @click="dodajProizvod()">Dodaj proizvod</v-btn>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              <div class="nevidljiviInput">


                <v-text-field :rules="obaveznoPoljeRules" v-model="promenljiva"></v-text-field>
              </div>
              <v-data-table :headers="headers" :items="proizvodi" hide-actions class="elevation-1" no-data-text="Trenutno nema stavki.">
                <tr slot="items" slot-scope="props">
                  <td>{{ props.index+1 }}</td>
                  <td class="text-xs-center">{{ tipSelekt[props.item.tip].tipTekst }}</td>
                  <td class="text-xs-center">{{ props.item.naziv }}</td>
                  <td class="text-xs-center">{{ props.item.cena|thousandSeparator }}</td>
                  <td class="text-xs-center">{{ props.item.mera }}</td>
                  <td class="text-xs-center">{{ props.item.kolicina }}</td>
                  <td class="text-xs-center">{{ props.item.ukupnaCena|thousandSeparator }}</td>
                  <td class="text-xs-center">
                    <v-icon small @click="ukloniStavku(props.item)">
                      delete
                    </v-icon>
                  </td>
                </tr>
              </v-data-table>
              <v-card>
                <v-card-text class="headline text-xs-center pt-3" v-if="ukupno!=0"><em>Ukupno:</em> {{ukupno|thousandSeparator}} (RSD)</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>

          <v-text-field label="Opis" v-model="opisFakture"></v-text-field>
          <v-layout row wrap class="justify-center">
            <v-btn color="success" :disabled="!valid" @click="posaljiFakturu(1)">Fakturisi</v-btn>
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
      idFakture: null,
      danasnjiDatum: null,
      promenljiva: '',
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
      mesta: [],
      // POPUNJAVA LISTU FAKTURA
      fakture: [],
      proizvodNazivUsluge: '',
      proizvodJedinicaMere: '',
      proizvodKolicina: '',
      proizvodJedinicnaCena: '',
      headers: [{
          align: 'left',
          sortable: false,
          width: '10px'
        },
        {
          text: 'Proizvod/usluga',
          value: "tip",
          sortable: false
        },
        {
          text: 'Naziv proizvoda',
          value: "nazivProizvoda",
          sortable: false
        },
        {
          text: 'Jedinicna cena (RSD)',
          value: 'jedinicnaCena'
        },
        {
          text: 'Jedinica mere',
          value: "jedinicaMere",
          sortable: false
        },
        {
          text: 'Kolicina',
          value: 'kolicina'
        },
        {
          text: 'Ukupna cena (RSD)',
          value: 'ukupnaCena'
        },
        {
          text: 'Ukloni stavku',
          value: 'ukloniStavku',
          sortable: false
        }
      ],
      proizvodi: [],
      ukupno: 0,
      komitenti: [],
      // ID ODABRANOG KOMITENTA
      komitentId: '',
      // REQUIRED POLJA
      obaveznoPoljeRules: [
        v => !!v || 'Obavezno polje.'
      ],
      // KONTROLA ZA DUGMAD
      valid: true,
      opisFakture: '',
      // BRISANJE/ARHIVIRANJE FAKTURE
      modal2: false,
      odabranaFaktura: {},
      tipTrenutnaVrednost: 0,
      tipSelekt:[
        {
          tipTekst: 'Usluga',
          tipVrednost: 0
        },
        {
          tipTekst: 'Proizvod',
          tipVrednost: 1
        }
      ],
      selektRules: [
        v => (v == 0 || v == 1) || 'Izaberite jednu od opcija'
      ]
    }

  },
  methods: {

    izbrisiRadnuVerzijuFakture(fakId){
      axios.delete("http://837s121.mars-e1.mars-hosting.com/deleteTemplate", {
      params:{  sid: localStorage.getItem('sessionid'),
        fakId}

      }).then(response => {

        this.preuzmiFakture();
      });

    },
    novaFakturaDugme() {
      this.novafaktura = !this.novafaktura;
      this.datumValute = null;
      this.mesto = '';
      this.proizvodi = [];
      this.ukupno = 0;
      this.komitentId = '';
      this.proizvodNazivUsluge = '';
      this.proizvodJedinicaMere = '';
      this.proizvodKolicina = '';
      this.proizvodJedinicnaCena = '';
      this.tipPocetnaVrednost=0;
    },
    preuzmiFakture() {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getInvoices", {
        params: {
          sid: localStorage.getItem('sessionid')
        }
      }).then(response => {

        // MENJAM FORMAT DATUMA GDE POSTOJI I KONTROLISEM DA LI POSTOJI BROJ FAKTURE
        for (var faktura of response.data.fakture) {
          faktura.isteklaValuta = false;
          if (faktura.fak_status == 2) {
            if (new Date() >= new Date(faktura.fak_valuta)) {
              faktura.isteklaValuta = true;

            }
          } else {
            // RASTAVLJAM DATUM NA OSNOVU MINUSA
            faktura.fak_datumIzdavanja = faktura.fak_datumIzdavanja.split('-');
            // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
            faktura.fak_datumIzdavanja = faktura.fak_datumIzdavanja[2] + '.' + faktura.fak_datumIzdavanja[1] + '.' + faktura.fak_datumIzdavanja[0] + '.';
          } // RASTAVLJAM DATUM NA OSNOVU MINUSA
          faktura.fak_datumPrometaIspis = faktura.fak_datumPrometa.split('-');
          // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
          faktura.fak_datumPrometaIspis = faktura.fak_datumPrometaIspis[2] + '.' + faktura.fak_datumPrometaIspis[1] + '.' + faktura.fak_datumPrometaIspis[0] + '.';
          // RASTAVLJAM DATUM NA OSNOVU MINUSA
          faktura.fak_valutaIspis = faktura.fak_valuta.split('-');
          // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
          faktura.fak_valutaIspis = faktura.fak_valutaIspis[2] + '.' + faktura.fak_valutaIspis[1] + '.' + faktura.fak_valutaIspis[0] + '.';
          // DA LI POSTOJI BROJ FAKTURE?
          if (faktura.fak_brojFakture === null) {
            faktura.fak_brojFakture = 'Samo izdate fakture mogu imati broj.'
          }
        }
        this.fakture = response.data.fakture;

      });
    },
    izmeniFakturu(index) {
      this.novafaktura = false;
      this.komitentId = this.fakture[index].kom_id;
      this.datumPrometa = this.fakture[index].fak_datumPrometa;
      this.datumValute = this.fakture[index].fak_valuta;
      this.mesto = this.fakture[index].fak_mestoPrometa;
      this.idFakture = this.fakture[index].fak_id;
      this.opisFakture = this.fakture[index].fak_uputstva;
      this.promenljiva = 1;
      for (var j = 0; j < this.fakture[index].stavkeFakture.length; j++) {
        this.ukupno += this.fakture[index].stavkeFakture[j].usp_cena * this.fakture[index].stavkeFakture[j].usp_kolicina;
        this.proizvodi.push({
          naziv: this.fakture[index].stavkeFakture[j].usp_naziv,
          cena: this.fakture[index].stavkeFakture[j].usp_cena,
          mera: this.fakture[index].stavkeFakture[j].usp_mera,
          kolicina: this.fakture[index].stavkeFakture[j].usp_kolicina,
          ukupnaCena: this.fakture[index].stavkeFakture[j].usp_cena * this.fakture[index].stavkeFakture[j].usp_kolicina,
          tip: this.fakture[index].stavkeFakture[j].usp_tip


        })
      }
    },

    fakturisiDraft(fakId) {
      axios.post("http://837s121.mars-e1.mars-hosting.com/postInvoice", {
        sid: localStorage.getItem('sessionid'),
        fakId

      }).then(response => {
          setTimeout(this.preuzmiFakture, 700);
      });

    },


    dodajProizvod() {

      if (this.proizvodNazivUsluge === '' || this.proizvodJedinicaMere === '' || this.proizvodKolicina === '' || this.proizvodJedinicnaCena === '') {
        alert('Morate popuniti sve podatke vezane za proizvod!');
      } else {
        var noviProizvod = {
          tip: this.tipTrenutnaVrednost,
          naziv: this.proizvodNazivUsluge,
          mera: this.proizvodJedinicaMere,
          kolicina: this.proizvodKolicina,
          cena: this.proizvodJedinicnaCena,
          ukupnaCena: this.proizvodKolicina * this.proizvodJedinicnaCena
        }
        this.proizvodi.push(noviProizvod);
        // DODAJEM NA UKUPNU CENU FAKTURE
        this.ukupno += this.proizvodKolicina * this.proizvodJedinicnaCena;
        this.promenljiva = this.proizvodi.length;
      }
    },
    ukloniStavku(stavka) {
      const zaBrisanje = this.proizvodi.indexOf(stavka)
      confirm('Da li ste sigurni?') && this.proizvodi.splice(zaBrisanje, 1)
      this.ukupno -= stavka.ukupnaCena;
      if (this.proizvodi.length == 0) {
        this.promenljiva = '';
      }
    },
    posaljiFakturu(statusFakture) {

      if (new Date(this.datumPrometa) >= new Date(this.datumValute)) {
        alert('Datum valute ne moze biti pre datuma prometa.')
      }
      // SVE KONTROLE SU USPESNE
      else {
        if (statusFakture === 1) {
          axios.post("http://837s121.mars-e1.mars-hosting.com/postInvoice", {
              sid: localStorage.getItem('sessionid'),
              valuta: this.datumValute,
              datumPrometa: this.datumPrometa,
              mestoPrometa: this.mesto,
              total: this.ukupno,
              statusFakture: statusFakture,
              uputstva: this.opisFakture,
              komId: this.komitentId,
              stavkeFakture: this.proizvodi,
              fakId: this.idFakture
            })
            .then(response => {
              if (response.data.status) {
                alert('Uspesno ste uneli fakturu. Broj fatkure: ' + response.data.brojFakture);
                this.preuzmiFakture();
                this.novafaktura = true;
              } else {
                alert('Doslo je do greske, faktura nije uneta.');
              }
            });
        } else {
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
              stavkeFakture: this.proizvodi,
              fakId: this.idFakture
            })
            .then(response => {

              this.preuzmiFakture();
              this.novafaktura = true;
            });
        }
        this.proizvodi=[];
        this.ukupno=0;

      }
    },
    dugmeStoriniranjeFakture(faktura) {
      this.odabranaFaktura = faktura;
      this.modal2 = true;

    },
    storiniranjeFakture(n) {
      if (n) {
        axios.post("http://837s121.mars-e1.mars-hosting.com/cancelInvoice", {
            sid: localStorage.getItem('sessionid'),
            fakId: this.odabranaFaktura.fak_id
          })
          .then(response => {

            this.preuzmiFakture();
          });
      }
      this.modal2 = false;
    }
  },
  mounted() {
    this.preuzmiFakture();
    this.danasnjiDatum = new Date().toISOString().split('T')[0]

    this.datumPrometa = new Date().toISOString().split('T')[0]

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

  },
}
</script>
<style scoped>
.nevidljiviInput {
  display: none;
}


.storno {
  color: #f10000;
  border: 3px ridge #f10000;
  border-radius: 4px;
  min-height: 30px;

}

.izrada {
  color: #2980b9;
  border: 3px ridge #2980b9;
  border-radius: 4px;
  min-height: 30px;

}

.klasa {
  width: 60%;
  background-color: red;
  color: white !important;
  text-align: center;
  transform: rotateZ(25deg);

  border-radius: 5px;
}

.fadeIn {
  animation: test 0.5s;
}

/* RESETOVANJE STILOVA */

.listaFaktura {
  opacity: 0.9;
  border-radius: 6px;
  max-width: 100%;
}
.faktura-opis{
  opacity: 1;
  padding-left: 10px;
  margin-top: 10px;
}

/* DUGME IKS PRILIKOM PRAVLJENJA FAKTURE */
.iks {
  cursor: pointer;

}

.iks:hover {
  transform: scale(1.4);
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
#wrapper {
  box-sizing: content-box;
}

/* STIL ZA TABELU */
th {
  padding: 5px;
}

.theme--light.v-table {
  cursor: pointer;
}

@media (min-width: 0) .flex .xs2 {
  max-width: 20%;
}

/* MODAL ZA BRISANJE FAKTURE */
.modal {
  width: 50%;
  z-index: 100;
  opacity: 1;
  top: 30%;
  left: 25%;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  position: fixed;
}
</style>
