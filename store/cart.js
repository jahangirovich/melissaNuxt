export const state = () => {
  return {
    products: []
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
        console.log(targetProduct, 1)
        state.products.splice(targetProduct, 1);
        return;
      }
      console.log(targetProduct, 2)
      state.products[targetProduct].count = count;
    } else {
      console.log(5)
      if(isDelete) return;
      console.log(4)
      state.products.push({ id: productId, count })
    }
  },
  addProduct(state, { productId }) {
    if (state.products.filter(product => product.id == productId).length) {
      let targetProduct = state.products.indexOf(state.products.filter(product => product.id == productId)[0]);
      state.products[targetProduct].count = 1;
    } else {
      state.products.push({ id: productId, count: 1 });
    }
  }
}