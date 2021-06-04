import createPersistedState from 'vuex-persistedstate';

export default ({store}) => {
  createPersistedState({
    key: 'melissa',
    paths: ['cart']
  })(store)
}