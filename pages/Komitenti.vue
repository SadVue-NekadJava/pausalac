<template>
<v-container>
  <v-btn @click="kreiranjeNovog" v-if="!kreirajNovog" color="secondary lighten-2" class="mb-4 mt-4">Dodaj novog komitenta</v-btn>
  <transition name="animacijaForme">
    <div class="forma text-xs-center" v-if="kreirajNovog">



      <v-form v-if="kreirajNovog" ref="form" v-model="valid" class="forma mt-3 pa-3">
        <v-text-field v-model="komImeFirme" :rules="obaveznoPoljeRules" label="Ime Firme"></v-text-field>
        <v-text-field v-model="komPunNaziv" :rules="obaveznoPoljeRules" label="Pun naziv sa resenja"></v-text-field>
        <v-text-field v-model="komPib" mask="#########" :counter="9" :rules="pibRules" label="Pib"></v-text-field>
        <v-text-field v-model="komRacun" :rules="obaveznoPoljeRules" mask="###-#############-##" label="Broj Ziro racuna"></v-text-field>
        <v-select :items="gradovi" :rules="obaveznoPoljeRules" name="grad" item-text="gra_naziv" item-value="gra_id" v-model="komGrad" @change="spisakOpstina($event)" label="Izaberite grad"></v-select>
        <v-select :items="komOpstine" :rules="obaveznoPoljeRules" name="opstina" item-text="ops_naziv" item-value="ops_id" v-model="komOpstina" label="Izaberite opstinu"></v-select>
        <v-text-field v-model="komAdresa" :rules="obaveznoPoljeRules" label="Adresa"></v-text-field>
        <v-text-field v-model="komEmail" label="E-mail"></v-text-field>
        <v-text-field v-model="komTelefon" mask="+(###)##-###-######"  label="Telefon"></v-text-field>

        <v-btn :disabled="!valid" color="primary" @click="sacuvajNovogKomitenta">
          Sacuvaj
        </v-btn>
        <v-btn @click="kreirajNovog=!kreirajNovog" class="secondary mb-4 mt-4" v-if="kreirajNovog">Odustani</v-btn>

      </v-form>
    </div>
  </transition>
  <transition name="animacijaListe">
    <div v-if="!kreirajNovog" class="forma">

      <h1>Spisak Komitenata</h1>
      <v-expansion-panel class="pa-5">
        <v-expansion-panel-content v-for="(komitent,i) in komitenti" :key="i">
          <div slot="header">
            <h2>{{komitent.kom_naziv }}</h2>
          </div>
          <v-card>
            <v-card-text>

              <h1 class="display-2">{{komitent.kom_punNaziv}}</h1>
              <hr>
              <h3 class="pt-3">Adresa:{{komitent.kom_adresa}} </h3>
              <h3 class="pt-2">Email: {{komitent.kom_mejl}}</h3>
              <h3 class="pt-2">Pib: {{komitent.kom_pib}} </h3>
              <h3 class="pt-2">Telefon: {{komitent.kom_telefon}}</h3>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </div>
  </transition>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      komitenti: [],
      valid: true,
      kreirajNovog: false,
      komImeFirme: '',
      komPunNaziv: '',
      komPib: '',
      komRacun: '',
      komGrad: '',
      komOpstina: '',
      komAdresa: '',
      komEmail: '',
      komTelefon: '',
      gradovi: [],
      komOpstine: ['Prvo izaberite grad  '],
      obaveznoPoljeRules: [
        v => !!v || 'Obavezno polje.'
      ],
      pibRules: [
        v => !!v || 'Morate uneti Pib',
        v => (v && v.length == 9) || 'Pib mora sadrzati 9 cifara'
      ]

    }
  },
  mounted() {
    axios.get("http://837s121.mars-e1.mars-hosting.com/getComittents", {
      params: {
        sid: localStorage.getItem('sessionid')
      }
    }).then(response => {
      this.komitenti = response.data.komitenti;
      console.log(this.komitenti);


    });
  },
  methods: {
    sacuvajNovogKomitenta() {
      axios.post("http://837s121.mars-e1.mars-hosting.com/addNewComittent", {

            sid: localStorage.getItem('sessionid'),
            naziv: this.komImeFirme,
            punNaziv: this.komPunNaziv,
            pib: this.komPib,
            ziroRacun: this.komRacun,
            adresaFirme: this.komAdresa,
            telefon: this.komTelefon,
            mejlFirme: this.komEmail,
            opstinaFirme:this.komOpstina

        })
        .then(response => {
        console.log(response.data);



        });
    },
    kreiranjeNovog() {
      this.kreirajNovog = !this.kreirajNovog;
      axios.get("http://837s121.mars-e1.mars-hosting.com/getCity")
        .then(response => {
          this.gradovi = response.data.gradovi;
          console.log(this.gradovi);



        });
    },
    spisakOpstina(gradId) {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
        params: {
          gradId
        }
      }).then(response => {
        this.komOpstine = response.data.opstine;
      });
    },
  }



}
</script>

<style>
.animacijaForme-enter {
  opacity: 0;
}

.animacijaForme-enter-active {
  transition: opacity 0.3s;
  transition-delay: 0.3s;
}

.animacijaForme-leave-active {
  transition: opacity 0.3s;
}

.animacijaForme-leave-to {
  opacity: 0;
}

.animacijaListe-enter {
  opacity: 0;
}

.animacijaListe-enter-active {
  transition: opacity 0.3s;
  transition-delay: 0.3s;
}

.animacijaListe-leave-active {
  transition: opacity 0.3s;
}

.animacijaListe-leave-to {
  opacity: 0;
}
</style>
