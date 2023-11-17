// store.js
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      articles: {}
    };
  },
  mutations: {
    setArticles(state, newValue) {
      state.articles = newValue;
    }
  },
  actions: {
    updateArticles({ commit }, newValue) {
      commit('setArticles', newValue);
    }
  }
});
