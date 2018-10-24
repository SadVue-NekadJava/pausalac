<template>
<v-container>
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
    <v-flex xs8 class="fadeIn text-xs-center" v-if="!novafaktura">
      <div class="">
        <h1>Kreiraj Fakturu</h1>
      </div>
      <v-form class="forma pa-3">
        <h2>Br. Fakture: 107/18</h2>
        <v-select light class="pa-3" :items="komitenti" v-model="value" label=" Komitent"></v-select>
        <v-btn>Unesi novog Komitenta</v-btn>

        <v-layout row wrap>
          <v-flex xs4>

            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
              <v-text-field slot="activator" v-model="date" label="Datum izdavanja fakture " prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>

          <v-flex xs4>


            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
              <v-text-field slot="activator" v-model="date" label="Datum prometa " prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs4>


            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
              <v-text-field slot="activator" v-model="date" label="Datum valute " prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
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



          <v-flex xs8>
    <v-text-field label="Naziv usluge/proizvoda"></v-text-field>

<v-flex xs12>
  <v-text-field label="Jedinica mere"></v-text-field>
  <v-text-field label="Kolicina"></v-text-field>
  <v-text-field label="Jedinicna cena"></v-text-field>
</v-flex>

      </v-flex>
    </v-layout>

        <v-text-field label="Opis"></v-text-field>


      </v-form>


      <!-- <RegistracijaFirme class="fadeIn" v-if="!novafaktura"/> -->
    </v-flex>
    <v-flex xs1>

    </v-flex>
    <v-flex xs3>
<v-list class="forma mt-5">
  <v-list-tile avatar>
    <v-list-tile-title>title</v-list-tile-title>
  </v-list-tile>
</v-list>
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
      menu: false,
      modal: false,
      menu2: false,
      value: '',
      novafaktura: true,
      mesta:['Beograd','Leskovac','Smederevo','Dodaj novi'],
      komitenti: ['Enon solutions', 'Zlatna Kasika', 'Grill Stefan', 'Poncho'],
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
      ]
    }
  }

}
</script>
<style>
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

.forma {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border: 1px solid light-green;
}
</style>
