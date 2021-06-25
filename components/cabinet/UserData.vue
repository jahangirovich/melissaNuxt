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
            <div class="user-data-text">{{
              userData.user.bDay && new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long'}).format(new Date(userData.user.bDay)) || 'Не указана'
              }}</div>
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Почта</div>
            <div class="user-data-text">{{ userData.user.email || 'Не указана' }}</div>
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Пол</div>
            <div class="user-data-text">{{ +userData.user.sex == 0 ? 'Мужской' : 'Женский' }}</div>
          </div>
        </div>
      </div>
      <div class="block-inner editing" v-else>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">ФИО</div>
            <input class="user-data-editing" :class="{ 'has-error': $v.userName.$error }" type="text" v-model.trim="$v.userName.$model">
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Телефон</div>
            <div class="user-data-text">{{ '+' + userData.user.phone_number }}</div>
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Дата рождения</div>
            <VueDatePicker
              v-model="userBDay"
              placeholder="ГГГГ-ММ-ДД"
              :max-date="new Date().toISOString().substr(0, 10)"
              min-date="1901-01-01"
              color="#3BDE15"
            />
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Почта</div>
            <input class="user-data-editing" :class="{ 'has-error': $v.userEmail.$error }" type="text" v-model.trim="$v.userEmail.$model">
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Пол</div>
            <select name="sex" id="sex" class="user-data-editing" v-model="userSex">
              <option value="1">Женский</option>
              <option value="0">Мужской</option>
            </select>
          </div>
        </div>
      </div>
      <div class="save-btn" :class="{ disabled: privateHasErrors }" v-if="privateEdit" @click="saveUserData">Сохранить</div>
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
  components: {

  },
  computed: {
    privateHasErrors() {
      let hasErrors = !(
        this.$v.userName.required
      )
      return hasErrors;
    }
  },
  methods: {
    cardImage(type) {
      return type == 'mastercard' ? require('~/assets/img/cards/mastercard.png') :
        type == 'visa' ? require('~/assets/img/cards/visa.png') :
        type == 'maestro' ? require('~/assets/img/cards/maestro.png') :
        type == 'americanexpress' ? require('~/assets/img/cards/americanexpress.png') :
        require('~/assets/img/cards/unknown.png');
    },
    saveUserData() {
      if(this.privateHasErrors) return;
      this.$axios.setHeader('Authorization', `Bearer ${this.$cookies.get('auth-token')}`)
      let data = {
        name: this.userName,
        sex: this.userSex,
        bDay: this.userBDay,
      };
      if (this.userEmail) {
        data.email = this.userEmail;
      }
      this.$axios.$put('profile/update', data).then(res => {
        this.privateEdit = false;
        this.userData.user.name = this.userName;
        this.userData.user.sex = this.userSex;
        this.userData.user.bDay = this.userBDay;
        this.userData.user.email = this.userEmail;
      });
    }
  },
  validations: {
    userEmail: {
      email,
      required
    },
    userName: {
      required
    },
  }
}
</script>

<style lang="scss" scoped>
.block-inner {
  display: flex;
  flex-wrap: wrap;
}
.inner-column-30 {
  width: 32%;
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

.user-data-text {
  display: -webkit-box;
  line-height: 1rem;
  height: 2rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.block-edit {
  position: absolute;
  cursor: pointer;
  right: 24px;
  top: 24px;
}
.private-info.cabinet-block {
  display: flex;
  flex-direction: column;
}

.save-btn {
  display: flex;
  background: #3BDE15;
  padding: 12px 18px;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 24px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color .3s;
  &.disabled {
    background: #aaa;
    cursor: not-allowed;
  }
}

.ads-discounts {
  .block-inner {
    justify-content: space-between;
  }
}

.no-addresses {
  font-size: 14px;
}

input.user-data-editing {
  outline: none;
  border: none;
  border-bottom: 1px solid #A1A4B2;
  width: 90%;
  &.has-error {
    border-color: #f55555;
  }
}

select.user-data-editing {
  outline: none;
  border: none;
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

@media screen and (max-width: 992px) {
  .cabinet-block {
    width: 100%;
  }
}

@media screen and (max-width: 576px) {
  .cabinet-block {
    .block-inner {
      flex-wrap: wrap;
      .inner-column-30 {
        width: 100%;
        .user-dataline, .user-dataline:not(:last-child) {
          margin-bottom: 12px;
        }
      }
      .inner-column-40 {
        width: 100%;
        margin-bottom: 18px;
      }
    }
  }
}
</style>