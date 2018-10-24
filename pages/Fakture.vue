<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs9>
      <v-expansion-panel popout class="  mt-3">
        <v-expansion-panel-content v-if="  novafaktura" v-for="faktura in fakture" :key="faktura.id">
          <div slot="header">{{faktura.name}} {{faktura.date}}
            <p left>{{faktura.total}}</p>
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
    <v-flex xs8 offset-xs2 class="text-xs-center">
      <RegistracijaFirme/>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import RegistracijaFirme from '@/components/registracijaFirme'
export default {
components:{
  RegistracijaFirme
},
  data() {
    return {

      novafaktura: true,
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
