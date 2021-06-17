<template>
  <main class="user-data">
    <div class="private-info cabinet-block">
      <h2 class="block-title">Личная информация</h2>
      <div class="block-inner" v-if="!privateEdit">
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">ФИО</div>
            <div class="user-data-text">{{ userData.user.name }}</div>
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Телефон</div>
            <div class="user-data-text">{{'+' + userData.user.phone_number }}</div>
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Дата рождения</div>
            <div class="user-data-text">{{ userData.user.bDay || 'Не указана' }}</div>
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Почта</div>
            <div class="user-data-text">{{ userData.user.email || 'Не указана' }}</div>
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Пол</div>
            <div class="user-data-text">{{ userData.user.sex == 1 ? 'Мужской' : 'Женский' }}</div>
          </div>
        </div>
      </div>
      <div class="block-inner editing" v-else>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">ФИО</div>
            <input class="user-data-editing" type="text" v-model.trim="$v.userName.$model">
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Телефон</div>
            <div class="user-data-text">{{'+' + userData.user.phone_number }}</div>
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Дата рождения</div>
            <div class="user-data-text">{{ userData.user.bDay || 'Не указана' }}</div>
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Почта</div>
            <input class="user-data-editing" type="text" v-model.trim="$v.userEmail.$model">
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Пол</div>
            <div class="user-data-text">{{ userData.user.sex == 1 ? 'Мужской' : 'Женский' }}</div>
          </div>
        </div>
      </div>
      <svg class="block-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="privateEdit = !privateEdit">
        <path d="M4 17V20H7L16 11L13 8L4 17Z" stroke="#A1A4B2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 6L18 9L20.5 6.5L17.5 3.5L15 6Z" stroke="#A1A4B2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div class="ads-discounts cabinet-block">
      <h2 class="block-title">Реклама и акции</h2>
      <div class="block-inner">
        <div class="inner-column-40">
          <label for="email" class="notification">
            <input type="checkbox" name="email" id="email" v-model="user.notifications.email">
            <span class="title">Эл. почта</span>
            <div class="switch"></div>
          </label>
        </div>
        <div class="inner-column-40">
          <label for="push" class="notification">
            <input type="checkbox" name="push" id="push" v-model="user.notifications.push">
            <span class="title">Push уведомления</span>
            <div class="switch"></div>
          </label>
        </div>
      </div>
    </div>
    <div class="addresses cabinet-block">
      <h2 class="block-title">Адреса</h2>
      <div class="block-inner" v-if="user.addresses && user.addresses.length">
        <div class="inner-column-40" v-for="(address, index) in user.addresses" :key="index">
          <label :for="'address-' + index" class="address-line">
            <input type="radio" name="address" :id="'address-' + index" :value="index" :key="'checkbox-'+index" v-model="user.selectedAddress">
            <span class="radio-btn"></span>
            <div class="address-label">
              <span class="city-name">{{ address.city }}</span>
              <span class="address-main">{{ address.address }}</span>
            </div>
          </label>
        </div>
      </div>
      <div class="block-inner" v-else>
        <span class="no-addresses">
          Нет добавленных адресов
        </span>
      </div>
      <svg class="block-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 17V20H7L16 11L13 8L4 17Z" stroke="#A1A4B2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 6L18 9L20.5 6.5L17.5 3.5L15 6Z" stroke="#A1A4B2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="cards cabinet-block">
      <h2 class="block-title">Карты</h2>
      <div class="block-inner">
        <div class="inner-column-40" v-for="(card, index) in user.cards" :key="index">
          <label :for="'card-' + index" class="card-line">
            <input type="radio" name="card" :id="'card-' + index" :value="index" :key="'card-'+index" v-model="user.selectedCard">
            <span class="radio-btn"></span>
            <div class="card-label">
              <img :src="cardImage(card.type)" alt="">
              <span class="card-number">{{ card.firstNumbers + '******' + card.lastNumbers }}</span>
            </div>
          </label>
        </div>
      </div>
      <svg class="block-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 17V20H7L16 11L13 8L4 17Z" stroke="#A1A4B2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 6L18 9L20.5 6.5L17.5 3.5L15 6Z" stroke="#A1A4B2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </main>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      privateEdit: false,
      user: {
        fullName: 'Балдёж Приколдесович',
        birthDay: '02.02.1990',
        phoneNumber: '+77081234567',
        email: 'test@gmail.com',
        isMale: true,
        notifications: {
          push: false,
          email: true
        },
        selectedAddress: 0,
        selectedCard: 0,
        addresses: [
          {
            city: 'Алматы',
            address: 'ул. Розыбакиева, 45',
          },
          {
            city: 'Алматы',
            address: 'ул. Толе Би, 153'
          },
          {
            city: 'Алматы',
            address: 'пр. Абая, 93'
          },
        ],
        cards: [
          {
            firstNumbers: 510324,
            lastNumbers: 3143,
            type: 'mastercard'
          },
          {
            firstNumbers: 420941,
            lastNumbers: 9237,
            type: 'visa'
          }
        ]
      },
      userName: this.userData.user.name || null,
      userEmail: this.userData.user.email || null,
      userBDay: this.userData.user.bDay || null,
      userSex: this.userData.user.sex,
    }
  },
  mixins: [validationMixin],
  props: {
    userData: {
      type: Object,
      required: true,
    }
  },
  methods: {
    cardImage(type) {
      return type == 'mastercard' ? require('~/assets/img/cards/mastercard.png') :
        type == 'visa' ? require('~/assets/img/cards/visa.png') :
        type == 'maestro' ? require('~/assets/img/cards/maestro.png') :
        type == 'americanexpress' ? require('~/assets/img/cards/americanexpress.png') :
        require('~/assets/img/cards/unknown.png');
    }
  },
  validations: {
    userEmail: {
      email,
      required
    },
    userName: {
      required
    }
  }
}
</script>

<style lang="scss" scoped>
.block-inner {
  display: flex;
  flex-wrap: wrap;
}
.inner-column-30 {
  width: 30%;
}
.inner-column-40 {
  width: 40%;
  margin-bottom: 18px;
  &:nth-last-child(2), &:last-child {
    margin-bottom: 0;
  }
}
.user-dataline {
  font-size: 14px;
  &:not(:last-child) {
    margin-bottom: 36px;
  }
}
.user-data-label {
  color: #A1A4B2;
  margin-bottom: 6px;
}
.block-edit {
  position: absolute;
  cursor: pointer;
  right: 24px;
  top: 24px;
}

.ads-discounts {
  .block-inner {
    justify-content: space-between;
  }
}

.no-addresses {
  font-size: 14px;
}

.inner-column-40 {
  label.notification {
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .switch {
      position: relative;
      width: 36px;
      height: 20px;
      border-radius: 10px;
      background: #A1A4B2;
      transition: all .3s;
      &::after {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        background: #fff;
        left: 1px;
        top: 1px;
        border-radius: 50%;
      }
    }
    input:checked ~ .switch{
      background: #3BDE15;
      &::after {
        left: auto;
        right: 1px;
      }
    }
  }
  label.address-line, label.card-line {
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    input[type=radio] {
      display: none;
      &:checked ~ span.radio-btn {
        border-color: #3BDE15;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          top: 3px;
          left: 3px;
          background: #3BDE15;
          border-radius: 50%;
        }
      }
    }
    .address-label {
      display: flex;
      flex-direction: column;
      margin-left: 12px;
      .address-main {
        margin-top: 3px;
        font-size: 12px;
        color: #A1A4B2;
      }
    }
    .card-label {
      display: flex;
      margin-left: 12px;
      img {
        margin-right: 6px;
        width: 20px;
        height: 20px;
        object-fit: contain;
      }
      span.card-number {
        line-height: 20px;
      }
    }
    span.radio-btn {
      display: block;
      width: 16px;
      height: 16px;
      border: 1px solid #A1A4B2;
      border-radius: 50%;
    }
  }
  input[type=checkbox] {
    display: none;
  }
}
</style>