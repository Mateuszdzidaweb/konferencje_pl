<template>
  <div v-if="conference">
    <div class="flex items-center justify-center p-12">
      <!-- Author: FormBold Team -->
      <!-- Learn More: https://formbold.com -->
      <div class="mx-auto w-full max-w-[550px]">
        <h1 class="text-3xl py-4">Edytuj Konferencje</h1>
        <form action="">
          <div class="mb-5">
            <label
                for="tytul"
                class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Tytuł
            </label>
            <input v-model="conference.tytul"

                   type="text"
                   name="tytul"
                   id="tytul"
                   placeholder="tytul"
                   class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                   required
            />
          </div>


          <div class="mb-5">
            <label
                for="tytul"
                class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Oraganizator
            </label>
            <input v-model="conference.organizator"
                   type="text"
                   name="organizator"
                   id="organizator"
                   placeholder="organizator"
                   class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                   required
            />
          </div>

          <div class="mb-5">
            <label
                for="tytul"
                class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Kontakt
            </label>
            <input v-model="conference.kontakt"

                   type="text"
                   name="kontakt"
                   id="kontakt"
                   placeholder="kontakt"
                   class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                   required
            />
          </div>

          <div class="mb-5">
            <label for="dyscyplina">Wybierz dyscypline</label>

            <select v-model="dyscyplina" id="dyscyplina" name="dyscyplina"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option  value="">Wybierz Dyscypline</option>
              <option value="Filozofia">Filozofia</option>
              <option value="Ekonomia">Ekonomia</option>
              <option value="Finanse">Finanse</option>
              <option value="Biologia">Biologia</option>
              <option value="Ekologia">Ekologia</option>
              <option value="Farmacja">Farmacja</option>
              <option value="Psychologia">Psychologia</option>
              <option value="Fizyka">Fizyka</option>
              <option value="Ekonomia">Ekonomia</option>
            </select>
          </div>
          <div class="mb-5">
            <label
                for="miejsce_konferencji"
                class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nazwa miejsca konferencji (adres)
            </label>
            <input v-model="conference.miejsce_konferencji"
                   required
                   type="text"
                   name="miejsce_konferencji"
                   id="miejsce_konferencji"
                   placeholder="Miejsce Konferencji"
                   class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div class="mb-5">
            <label
                for="miejscowosc"
                class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Miejscowość
            </label>
            <input v-model="conference.miejscowosc"
                   required
                   type="text"
                   name="miejscowosc"
                   id="miejscowosc"
                   placeholder="Miejscowosc"
                   class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div class="mb-5">
            <label for="start">Data rozpoczęcia konferencji</label>

            <input v-model="data_konferecnji" type="date" id="start" name="trip-start"
                   required
                   class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                   value=""
                   :min='current_date' max="2025-01-01">
            <!--          {{ current_date }}-->
          </div>
          <div class="mb-5">
            <label
                for="opis"
                class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Opis
            </label>
            <textarea v-model="conference.opis"
                      required
                      rows="6"
                      name="opis"
                      id="opis"
                      placeholder="Opis Konferencji"
                      class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <div>
            <button v-on:click="edit_conference"
                    class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import firebase from  "firebase/compat/app";
let db = firebase.firestore();
export default {
  props:['kid'],
  data(){
    return{
      conference: '',
      tytul: '',
      dyscyplina: '',
      miejsce_konferencji: '',
      miejscowosc: '',
      data_konferecnji:'',
      opis: '',
      current_date:'',
      data_dodania: '',
      organizator: '',
      kontakt: '',
      created: '',
    }
  },
  methods: {
    getUserConference() {
      let docRef = db.collection('konferencje').doc(this.kid)
      docRef.get().then((doc) => {
        if (doc.exists) {
          this.conference = doc.data();
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    },
    edit_conference(e){
      e.preventDefault()
      const input = document.querySelector('input');

      let d = new Date(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      let today = [year, month, day].join('-');

      if (this.data_konferecnji <= today) {
        alert("Niepoprawna data Konferencji");
      }else if(input.value !== ''){
          db.collection('konferencje').doc(this.kid)
              .update({
                tytul: this.conference.tytul,
                dyscyplia: this.dyscyplina,
                miejsce_konferencji: this.conference.miejsce_konferencji,
                miejscowosc: this.conference.miejscowosc,
                organizator: this.conference.organizator,
                kontakt: this.conference.kontakt,
                data_konferecnji: this.data_konferecnji,
                opis: this.conference.opis,
                data_dodania: firebase.firestore.FieldValue.serverTimestamp(),
                created: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() =>{

                this.$router.replace(`/single-conference/${this.kid}`);
              })
              .catch((error) =>{
                console.log("Error writing conference ", error);
              });
      }else {
        alert('Prosze Wypelnic forme konferencji')
      }
    },
  },
  beforeMount(){
    this.checkUserFavorite();
  },
  mounted() {
    this.getUserConference();
  }
}
</script>
