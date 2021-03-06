export const state = () => {
  return {
    products: [],
    isToastContent: {
      content: "",
      isToast: false
    },
    favoriteProducts: {}
  }
};

export const mutations = {
  setProduct(state, { productId, count }) {
    let isDelete = false;
    if (count <= 0) {
      isDelete = true;
    }
    if (state.products.filter(product => product.id == productId).length) {
      let targetProduct = state.products.indexOf(state.products.filter(product => product.id == productId)[0]);
      if(isDelete) {
        state.products.splice(targetProduct, 1);
        return;
      }
      state.products[targetProduct].count = count;
    } else {
      if(isDelete) return;
      state.products.push({ id: productId, count })
    }
  },
  setToast(state, {isToastContent}){
    state.isToastContent = { ...isToastContent};
  },
  addProduct(state, { productId }) {
    if (state.products.filter(product => product.id == productId).length) {
      let targetProduct = state.products.indexOf(state.products.filter(product => product.id == productId)[0]);
      state.products[targetProduct].count = 1;
    } else {
      state.products.push({ id: productId, count: 1 });
    }
  },
  addFavoriteProduct(state, { productId }) {
    const ar = state.favoriteProducts;
    if (ar[productId] != undefined) {
      delete ar[productId];
    } else {
      ar[productId] = productId;
    }
  }
}