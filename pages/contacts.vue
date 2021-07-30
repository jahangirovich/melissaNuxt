<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="contacts-main">
        <h1 class="title">Контакты</h1>
        <div class="contacts-container">
          <div class="contact-block" v-for="contact in contacts" :key="contact.id">
            <div class="contact-line">
              <span class="title">Телефон:</span>
              <a class="value" :href="`tel:${contact.phone_number}`">{{contact.phone_number}}</a>
            </div>
            <div class="contact-line">
              <span class="title">Адрес:</span>
              <span class="value">{{ contact.address }}</span>
            </div>
            <div class="contact-line">
              <span class="title">Город:</span>
              <span class="value">{{ contact.city }}</span>
            </div>
          </div>
        </div>
        <h1 class="title">Адреса Аптек</h1>
        <div class="address-container">
          <div class="address-names">
            <div class="addres-item" v-for="(obj,i) in addresses" :key="i">
              <span>{{ obj.address }}</span>
              <span>Тел: {{ obj.phone_number }}</span>
            </div>
            <!-- <div class="addres-item">
              <span>пр. Сейфуллина, 468</span>
              <span>Тел.: 279–95–18</span>
            </div>
            <div class="addres-item">
              <span>ул. Габдуллина, 57</span>
              <span>Тел.: 394–90–06</span>
              <span>Тел.: 394–85–68</span>
              <span>Тел.: 394–86–55</span>
            </div>
            <div class="addres-item">
              <span>пр. Абая, 141</span>
              <span>Тел.: 375–80–86</span>
            </div>
             <div class="addres-item">
              <span>ул. Жандосова, 162 а</span>
              <span>Тел.: 309–25–01</span>
            </div>
             <div class="addres-item">
              <span>мкр. Аксай 4, дом 20 б</span>
              <span>Тел.: 373–24–72</span>
            </div>
             <div class="addres-item">
              <span>ул. Таугуль, 49</span>
              <span>Тел.: 309–07–23</span>
            </div>
             <div class="addres-item">
              <span>ул. Туркебаева, 92, ТЦ "Асыл"</span>
              <span>Тел.: 374–69–39</span>
            </div>
             <div class="addres-item">
              <span>ул. Халиуллина, 34
              </span>
              <span>Тел.: 234–42–61</span>
            </div> -->
          </div>
          <div class="address-map">
            <yandex-map :coords="[43.23661509196045, 76.88159782898272]" zoom="12">
              <div v-for="(coordinate, i) in addresses" :key="i">
                <ymap-marker 
                  :coords="[coordinate.cordinate1, coordinate.cordinate2]"
                  marker-id="123123"
                  marker-type="placemark"
                />
              </div>

            </yandex-map>
            <!-- <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1xrndyqt3rrGqPYgOnmNELK4VnAHRoWwQ" width="100%" height="480"></iframe> -->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  components: { yandexMap, ymapMarker },
  data() {
    return {
      coords: [54.82896654088406, 39.831893822753904],
      breadcrumbs: [
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: 'Контакты',
          url: '/questions'
        }
      ],
      placemarks: [
        {
          coords: [54.82896654088406, 39.831893822753904],
          properties: {
            balloonContentBody: 'asdfd',
            balloonContentFooter: '1',
            balloonContentHeader: '1'
          },
          clusterName: '1',
          markerId: '1'
        },
        {
          coords: [54.82796654088306, 39.831893822753904],
          properties: {
            balloonContentBody: 'asdfasdf',
            balloonContentFooter: '1',
            balloonContentHeader: '1'
          },
          clusterName: '1',
          markerId: '2'
        },
        {
          coords: [54.82996654088506, 39.831893822753904],
          properties: {
            balloonContentBody: 'asdfasdf',
            balloonContentFooter: '1',
            balloonContentHeader: '1'
          },
          clusterName: '1',
          markerId: '3'
        },
      ],
      addresses: []
    }
  },
  async asyncData({ $axios }) {
    let contacts = await $axios.$get('/contacts');
    contacts = contacts.contacts;
    return { contacts };
  },
  created(){
    this.$axios.get('/company-addresses').then(res => {
      this.addresses = res.data.addresses;
    }) 
  }
}
</script>

<style lang="scss" scoped>
.contacts-main {
  margin-top: 24px;
  margin-bottom: 48px;
}
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}
.address-container{
  display: flex;
}
.contacts-container {
  display: flex;
  flex-wrap: wrap;
}
.address-names{
  width: 25%;
}
.addres-item{
  font-weight: 500;
  margin-top: 20px;
  &:first-child{
    margin-top: 0;
  }
}
.ymap-container {
  height: 400px;
}
.address-map{
  // margin-top: 20px;
  width: 75%;
}

.contact-block {
  margin-bottom: 18px;
}

.contact-line {
  margin-bottom: 6px;
  .title {
    font-weight: 500;
  }
  .value {
    text-decoration: none;
    color: #3F414E;
  }
}
</style>