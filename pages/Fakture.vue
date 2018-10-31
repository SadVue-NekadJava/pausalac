<template>
<v-container id="wrapper">
  <v-layout row wrap>
    <v-flex xs9>
      <v-expansion-panel popout class="  mt-3">
        <v-expansion-panel-content v-if="  novafaktura" v-for="faktura in fakture" :key="faktura.id">
          <div slot="header">{{faktura.name}} {{faktura.date}}
            <p>{{faktura.total}}</p>
          </div>
          <v-card>
            <v-card-text>{{faktura.total}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <v-flex xs2>

    </v-flex>
    <v-flex xs1 class="text-xs-center">
      <v-btn class="elevation-11 mt-2" medium @click="novafaktura=!novafaktura" v-if="novafaktura">Kreiraj novu Fakturu</v-btn>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 class="fadeIn text-xs-center" v-if="!novafaktura">
      <v-form class="forma pa-3">
        <h2>Br. Fakture: 107/18</h2>
        <v-select @input="fakturaSelekt($event)" light class="pa-3" :items="komitenti" v-model="value" label=" Komitent"></v-select>

        <v-layout row wrap>
          <v-flex sm4>

            <v-dialog ref="datumIzdavanja" v-model="modal" :return-value.sync="datumIzdavanja" persistent lazy full-width width="290px">
              <v-text-field slot="activator" v-model="datumIzdavanja" label="Datum izdavanja fakture " prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="datumIzdavanja" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.datumIzdavanja.save(datumIzdavanja)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>

          <v-flex sm4>



            <v-dialog ref="datumPrometa" v-model="modal" :return-value.sync="datumPrometa" persistent lazy full-width width="290px">
              <v-text-field slot="activator" v-model="datumPrometa" label="Datum prometa" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="datumPrometa" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal=false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.datumPrometa.save(datumPrometa)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex sm4>


            <v-dialog ref="datumValute" v-model="modal" :return-value.sync="datumValute" persistent lazy full-width width="290px">
              <v-text-field slot="activator" v-model="datumValute" label="Datum valute " prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="datumValute" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.datumValute.save(datumValute)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
  <v-layout row wrap>
    <v-flex xs3>
      <v-select light class="pa-3" :items="mesta" v-model="value" label=" Mesto"></v-select>

    </v-flex>
    <v-flex xs1>

    </v-flex>
      <v-flex xs5>
          <v-text-field label="Adresa"></v-text-field>


      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around>


          <v-flex lg2>
            <v-text-field v-model="proizvodNazivUsluge" label="Naziv usluge/proizvoda"></v-text-field>
          </v-flex>
          <v-flex lg2>
            <v-text-field v-model="proizvodKolicina" label="Kolicina"></v-text-field>
          </v-flex>
          <v-flex lg2>
            <v-text-field v-model="proizvodJedinicaMere" label="Jedinica mere"></v-text-field>
          </v-flex>
          <v-flex lg2>
            <v-text-field v-model="proizvodJedinicnaCena" label="Jedinicna cena"></v-text-field>
          </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
            <v-btn class="pa-2" color="success" @click="dodajProizvod()">Dodaj proizvod</v-btn>
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
                <td class="text-xs-center">{{ props.item.nazivUsluge }}</td>
                <td class="text-xs-center">{{ props.item.jedinicaMere }}</td>
                <td class="text-xs-center">{{ props.item.kolicina }}</td>
                <td class="text-xs-center">{{ props.item.jedinicnaCena }}</td>
                <td class="text-xs-center">{{ props.item.ukupnaCena }}</td>
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
              <v-card-text class="headline text-xs-right" v-if="ukupno!=0"><em>Ukupno:</em> {{ukupno}} (RSD)</v-card-text>
            </v-card>
          </v-flex>
    </v-layout>

        <v-text-field label="Opis"></v-text-field>


      </v-form>
    </v-flex>
  </v-layout>
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
      datumIzdavanja: null,
      datumPrometa: null,
      datumValute: null,
      menu: false,
      modal: false,
      menu2: false,
      value: '',
      novafaktura: true,
      mesta:['Beograd','Leskovac','Smederevo','Dodaj novi'],
      komitenti: ['Enon solutions', 'Zlatna Kasika', 'Grill Stefan', 'Poncho','Unesi novog Komitenta'],
      fakture: [{
          id: '1',
          name: 'Enon Solutions',
          date: '28.10.2018',
          total: '1149.24'
        },
        {
          id: '2',
          name: 'Zlatna Kasika',
          date: '15.12.2017',
          total: '2379.00'
        },
        {
          id: '3',
          name: 'Grill Stefan',
          date: '25.05.2017',
          total: '514,35'
        },
      ],
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
          { text: 'Naziv proizvoda', value:"nazivProizvoda"},
          { text: 'Jedinica mere', value:"jedinicaMere"},
          { text: 'Kolicina', value: 'kolicina' },
          { text: 'Jedinicna cena (RSD)', value: 'jedinicnaCena' },
          { text: 'Ukupna cena (RSD)', value: 'ukupnaCena' },
          { text: 'Ukloni stavku', value: 'ukloniStavku'}
        ],
      proizvodi: [],
      ukupno: 0
    }
  },
  methods:{
    fakturaSelekt(faktura){
      if(faktura==='Unesi novog Komitenta'){
        alert(1);
      }
      else{
        alert(2);
      }
    },
    dodajProizvod(){
      if(this.proizvodNazivUsluge==='' || this.proizvodJedinicaMere==='' || this.proizvodKolicina==='' || this.proizvodJedinicnaCena===''){
        alert('Morate popuniti sve podatke vezane za proizvod!');
      }
      else{
        var noviProizvod={
          nazivUsluge: this.proizvodNazivUsluge,
          jedinicaMere: this.proizvodJedinicaMere,
          kolicina: this.proizvodKolicina,
          jedinicnaCena: this.proizvodJedinicnaCena,
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
  }

}
</script>
<style scoped>
.fadeIn {
  animation: test 0.5s;

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

// GAZIM STILOVE SA DRUGIH FAJLOVA
#wrapper{
  box-sizing: content-box;
}
// STIL ZA TABELU
th {
  padding: 5px;
}
@media (min-width: 0)
.flex.xs2 {
  max-width: 20%;
}
</style>
