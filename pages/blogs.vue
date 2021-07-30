<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="contacts-main">
        <h1 class="title">Блог</h1>
        <div class="blogs">
            <div class="">
                <img src="@/assets/img/blogImage.svg" alt="">
                <h3>Lorem ipsum</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially </p>
            </div>
            <div class="">
                <img src="@/assets/img/blogImage.svg" alt="">
                <h3>Lorem ipsum</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially </p>
            </div>
            <div class="">
                <img src="@/assets/img/blogImage.svg" alt="">
                <h3>Lorem ipsum</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially </p>
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
      breadcrumbs: [
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: 'Блог',
          url: '/blogs'
        }
      ],
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
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 24px;
}
.blogs{
    display: flex;
    flex-wrap: wrap;
    &>div{
        width: 30%;
        border: 1px solid #DEE0E4;
        box-sizing: border-box;
        padding: 14px;
        border-radius: 14px;
        margin-left: 30px;
        &:first-child{
            margin-left: 0;
        }
        &>img{
            width: 100%;
        }
        &>h3{
            font-weight: bold;
            font-size: 28px;
            margin: 20px 0;
            line-height: 33px;
        }
        &>p{
            color: #3F414E;
        }
    }
}
</style>