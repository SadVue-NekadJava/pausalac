<template>
<v-container>
  <v-layout row wrap class="mt-5 pa-0" v-if="!registerUser">
    <v-flex sm6 offset-sm3 md4 offset-md4 xs10 offset-xs1 class="mt-5">
      <v-form class="forma pa-5">
        <v-text-field v-model="loginEmail" :rules="[rules.required]" type="email" label="Email"></v-text-field>
        <v-text-field v-model="loginPassword" :append-icon="show1 ? 'visibility_off' : 'visibility'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" label="Korisnicka sifra" hint="Minimum 6 karaktera" counter @click:append="show1 = !show1">
        </v-text-field>
        <v-btn large color="primary mt-3">Login</v-btn>
        <v-layout row wrap class="mb-0">
        <v-flex xs8 class="mb-0">
        </v-flex>
        <v-flex xs4>
            <v-btn @click="registerUser=!registerUser" small color="secondary mt-5 mb-0">Register</v-btn>
        </v-flex>
  </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
  <v-layout row wrap v-if="registerUser">
    <v-flex xs10 offset-xs1 md8 offset-md2 class="mt-4">
      <v-stepper class="forma" v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Korisnik</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">Korisnicki podaci</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Podaci o firmi</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-flex xs10 offset-xs1>
              <v-card class="mb-3" color="grey lighten-5"></v-card>
              <v-layout row wrap>
                <v-form>
                  <v-text-field v-model="usrEmail" type="email" label="Email"></v-text-field>
                  <v-layout row wrap class="mt-3 mb-3">
                    <v-flex xs5>
                      <v-text-field v-model="password" :append-icon="show1 ? 'visibility_off' : 'visibility'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" label="Korisnicka sifra" hint="Minimum 6 karaktera" counter
                        @click:append="show1 = !show1">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs1>
                    </v-flex>
                    <v-flex xs5>
                      <v-text-field v-model="passwordConfirm" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" label="Potvrdi  sifru" hint="Minimum 6 karaktera" counter>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-layout>
              <v-btn color="primary" @click="e1 = 2">
                Nastavi <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-flex>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card class="mb-5">
              <v-layout row wrap>
                <v-flex xs10 offset-xs1>
                  <v-form>
                    <v-text-field v-model="korIme" :rules="[rules.required]" label="Ime"></v-text-field>
                    <v-text-field v-model="korPrezime" :rules="[rules.required]" label="Prezime"></v-text-field>
                    <v-text-field v-model="korImeOca" :rules="[rules.required]" label="Ime oca"></v-text-field>
                    <v-checkbox label="Strani Drzavljanin" v-model="stranac" value="true"></v-checkbox>
                    <v-text-field v-if="stranac" v-model="korJmbg" label="Broj Pasosa"></v-text-field>
                    <v-text-field v-if="!stranac" v-model="korJmbg" mask="#############" :counter="13" label="Jbmg"></v-text-field>
                    <v-text-field v-model="korSprema" :rules="[rules.required]" label="Strucna sprema"></v-text-field>
                    <v-checkbox label="U radnom odnosu" v-model="zaposlen" value="true">
                    </v-checkbox>
                    <v-radio-group v-model="korPol" :mandatory="false">
                      <label class="labela mb-3">Pol</label>
                      <v-radio label="Muski" value="1"></v-radio>
                      <v-radio label="Zenski" value="2"></v-radio>
                    </v-radio-group>
                    <v-select :items="gradovi" name="grad" item-text="naziv" item-value="id"  v-model="korGrad" label="Izaberite Grad"></v-select>
                    <v-select :items="opstine" name="opstina" item-text="naziv" item-value="id" v-model="korOpstina" label="Izaberite Opstinu"></v-select>
                    <v-text-field class="mb-4" v-model="korAdresa" :rules="[rules.required]" label="Adresa "></v-text-field>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-card>
            <v-btn color="primary" @click="probna">
              Nastavi<v-icon right>arrow_right_alt</v-icon>
            </v-btn>
            <v-btn @click="e1--" flat>Nazad</v-btn>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card class="mb-5">
              <form class="forma mt-3 pa-3">
                <v-text-field v-model="imeFirme" :rules="[rules.required]" label="Ime Firme"></v-text-field>
                <v-text-field v-model="punNaziv" :rules="[rules.required]" label="Pun naziv sa resenja"></v-text-field>
                <v-text-field v-model="pib" mask="#########" :counter="9" :rules="[rules.required,rules.tacnoPib]" label="Pib"></v-text-field>
                <v-text-field v-model="matBroj" mask="########" :counter="8" :rules="[rules.required,rules.tacnoMaticni]" label="Maticni broj"></v-text-field>
                <v-text-field v-model="sifraDelatnosti" :counter="4" mask="####" :rules="[rules.required]" label="Sifra delatnosti"></v-text-field>
                <v-text-field v-model="opisDelatnosti" :rules="[rules.required]" label="Opis delatnosti"></v-text-field>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
                  <v-text-field slot="activator" v-model="date" label="Datum registracije Firme " prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-text-field v-model="racun" mask="###-#############-##" label="Broj Ziro racuna"></v-text-field>
                <v-select :items="gradovi" name="grad" item-text="naziv" item-value="id"  v-model="grad" label="Izaberite grad"></v-select>
                <v-select :items="opstine" name="opstina" item-text="naziv" item-value="id" v-model="opstina" label="Izaberite opstinu"></v-select>
                <v-text-field v-model="adresa" label="Adresa"></v-text-field>
                <v-text-field v-model="email" label="E-mail"></v-text-field>
                <v-text-field v-model="telefon" label="Telefon"></v-text-field>
                <v-checkbox v-model="spreman" label="Proverili ste tacnost podataka?"></v-checkbox>
              </form>
            </v-card>
            <v-btn color="primary" @click="register">
              Potvrdi
            </v-btn>
            <v-btn @click="e1--" flat>Nazad</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
export default {
  data() {
    return {
      registerUser:false,
      loginEmail: '',
      loginPassword: '',

      usrEmail: '',
      password: '',
      passwordConfirm: '',
      korIme: '',
      korPrezime: '',
      korImeOca: '',
      stranac: false,
      korJmbg: '',
      korSprema: '',
      zaposlen: false,
      korPol: 0,
      korGrad: '',
      korOpstina: '',
      korAdresa: '',
      imeFirme: '',
      punNaziv: '',
      pib: '',
      matBroj: '',
      sifraDelatnosti: '',
      opisDelatnosti: '',
      date: null,
      racun: '',
      grad: '',
      opstina: '',
      adresa: '',
      email: '',
      telefon: '',
      spreman: false,


      menu: false,
      modal: false,
      menu2: false,
      gradovi: [
        {id:3, naziv:'Beograd'},
        {id:2,naziv:'Leskovac'},
        {id:1,naziv:'Smederevo'},
        {id:0,naziv:'Dodaj novi'}
      ],
      opstine: [{id:1,naziv:'Novi Beograd'},{id:2,naziv:'Vracar'} ,{id:3,naziv:'Palilula'}  ],
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || 'Obavezno polje.',
        min: v => v.length >= 6 || 'Minimum 6 karaktera',
        tacnoMaticni: v => v.length == 8 || 'Maticni broj treba da ima 8 cifara',
        tacnoPib: v => v.length == 9 || 'Pib treba da ima 9 cifara'
      },
      e1: 0
    }
  },
  methods: {

    probna(){
      // this.e1 = 3;
      console.log(this.korGrad);
      console.log(this.korOpstina);
    },
    register() {
      axios.post("http://837s121.mars-e1.mars-hosting.com/register",{
  mejl:this.usrEmail,
sifra:this.password,
ponovoSifra:this.passwordConfirm,
ime:this.korIme,
prezime:this.korPrezime,
srednjeIme:this.korImeOca,
jmbg:this.korJmbg,
strucnaSprema:this.korSprema,
uRadnomOdnosu:this.zaposlen,
pol:this.korPol,
opstina:this.korOpstina,
adresa:this.korAdresa,
grad:this.korGrad,
naziv:this.imeFirme,
punNaziv:this.punNaziv,
pib:this.pib,
maticniBroj:this.matBroj,
ziroRacun:this.racun,
sifraDelatnosti:this.sifraDelatnosti,
opisDelatnosti:this.opisDelatnosti,
datumRegistracije:this.date,
adresaFirme:this.adresa,
telefon:this.telefon,
mejlFirme:this.email,
opstinaFirme:this.opstina
                    }).then(response => {
                        console.log(response);


                    });

    }
  }
}
</script>

<style >
.labela {
  color: grey;
}

.forma {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border: 1px solid light-green;
}
</style>
