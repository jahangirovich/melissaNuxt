<template>
  <aside class="cabinet-aside">
    <nuxt-link to="/cabinet">
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-data">
        <path d="M5.76786 20V20.875H7.51786V20H5.76786ZM15.4821 20V20.875H17.2321V20H15.4821ZM7.51786 20V17.5708H5.76786V20H7.51786ZM10.2857 14.8036H12.7143V13.0536H10.2857V14.8036ZM15.4821 17.5708V20H17.2321V17.5708H15.4821ZM12.7143 14.8036C14.2431 14.8036 15.4821 16.0423 15.4821 17.5708H17.2321C17.2321 15.0754 15.2092 13.0536 12.7143 13.0536V14.8036ZM7.51786 17.5708C7.51786 16.0423 8.75687 14.8036 10.2857 14.8036V13.0536C7.79077 13.0536 5.76786 15.0754 5.76786 17.5708H7.51786ZM11.5 5.76786C9.67549 5.76786 8.19643 7.24692 8.19643 9.07143H9.94643C9.94643 8.21342 10.642 7.51786 11.5 7.51786V5.76786ZM14.8036 9.07143C14.8036 7.24692 13.3245 5.76786 11.5 5.76786V7.51786C12.358 7.51786 13.0536 8.21342 13.0536 9.07143H14.8036ZM11.5 12.375C13.3245 12.375 14.8036 10.8959 14.8036 9.07143H13.0536C13.0536 9.92944 12.358 10.625 11.5 10.625V12.375ZM11.5 10.625C10.642 10.625 9.94643 9.92944 9.94643 9.07143H8.19643C8.19643 10.8959 9.67549 12.375 11.5 12.375V10.625ZM4.21429 3.875H18.7857V2.125H4.21429V3.875ZM19.125 4.21429V18.7857H20.875V4.21429H19.125ZM18.7857 19.125H4.21429V20.875H18.7857V19.125ZM3.875 18.7857V4.21429H2.125V18.7857H3.875ZM4.21429 19.125C4.0269 19.125 3.875 18.9731 3.875 18.7857H2.125C2.125 19.9396 3.06041 20.875 4.21429 20.875V19.125ZM19.125 18.7857C19.125 18.9731 18.9731 19.125 18.7857 19.125V20.875C19.9396 20.875 20.875 19.9396 20.875 18.7857H19.125ZM18.7857 3.875C18.9731 3.875 19.125 4.0269 19.125 4.21429H20.875C20.875 3.0604 19.9396 2.125 18.7857 2.125V3.875ZM4.21429 2.125C3.0604 2.125 2.125 3.06041 2.125 4.21429H3.875C3.875 4.0269 4.0269 3.875 4.21429 3.875V2.125Z" fill="#A1A4B2"/>
      </svg>
      <span>Личные данные</span>
    </nuxt-link>
    <nuxt-link to="/cabinet/orders">
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="orders">
        <path d="M10.8666 6.43324H21M10.8666 16.5666H21M3.89997 3.8999H6.4333C7.13286 3.8999 7.69997 4.46701 7.69997 5.16657V7.6999C7.69997 8.39946 7.13286 8.96657 6.4333 8.96657H3.89997C3.20041 8.96657 2.6333 8.39946 2.6333 7.6999V5.16657C2.6333 4.46701 3.20041 3.8999 3.89997 3.8999ZM3.89997 14.0332H6.4333C7.13286 14.0332 7.69997 14.6003 7.69997 15.2999V17.8332C7.69997 18.5328 7.13286 19.0999 6.4333 19.0999H3.89997C3.20041 19.0999 2.6333 18.5328 2.6333 17.8332V15.2999C2.6333 14.6003 3.20041 14.0332 3.89997 14.0332Z" stroke="#A1A4B2" stroke-width="1.72"/>
      </svg>
      <span>Заказы</span>
    </nuxt-link>
    <nuxt-link to="/cabinet/notifications">
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.2666 15.3H19.7333M5.1666 15.3V8.96663C5.1666 5.46883 8.00213 2.6333 11.4999 2.6333C14.9977 2.6333 17.8333 5.46883 17.8333 8.96663V15.3M8.9666 17.2V17.8333C8.9666 19.2324 10.1008 20.3666 11.4999 20.3666C12.8991 20.3666 14.0333 19.2324 14.0333 17.8333V17.2" stroke="#A1A4B2" stroke-width="1.75"/>
      </svg>
      <span>Уведомления</span>
    </nuxt-link>
    <a to="/logout" class="logout" @click.prevent="logout">
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 12.6333V3.56665M5.96681 5.8318C4.49234 7.27132 3.56641 9.27158 3.56641 11.4949C3.56641 15.8735 7.11941 19.4333 11.4997 19.4333C15.8823 19.4333 19.4331 15.8735 19.4331 11.4949C19.4331 9.27498 18.5185 7.27132 17.0474 5.8318" stroke="#A1A4B2" stroke-width="1.75" stroke-linecap="square"/>
      </svg>
      <span>Выйти из профиля</span>
    </a>
  </aside>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$cookies.remove('auth-token');
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  padding: 24px;
  border: 1px solid #DEE0E4;
  border-radius: 6px;
  min-width: 290px;
  align-self: flex-start;
}
aside a {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  color: #3F414E;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
  svg {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
  &.nuxt-link-exact-active {
    color: #3BDE15;
    svg:not(.main-data) {
      path {
        stroke: #3BDE15;
      }
    }
    svg.main-data {
      path {
        fill: #3BDE15;  
      }
    }
  }
}

.logout {
  transition: all .3s;
  cursor: pointer;
  svg {
    path {
      transition: all .3s;
    }
  }
  &:hover {
    color: #F94949;
    svg {
      path {
        stroke: #F94949;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  aside.cabinet-aside {
    box-sizing: border-box;
    width: 100%;
  }
}
</style>