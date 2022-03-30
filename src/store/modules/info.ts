import { Plugin } from 'vuex';
import { StoreState } from '@/store';
import { API } from '@/common/api';
import { InfoModule } from '@/types/store/info';

export const state: InfoModule['state'] = () => ({
  positions: [],
});

export const getters: InfoModule['getters'] = {
  positions: (state) => state.positions,
};

export const mutations: InfoModule['mutations'] = {
  setPositions(state, positions) {
    state.positions = positions;
  },
};

export const actions: InfoModule['actions'] = {
  async fetchToken({ commit }) {
    const token = await API.getToken();
    localStorage.setItem('token', token.data.token);
  },
  async fetchPositions({ commit }) {
    const positions = await API.getPositions();
    commit('setPositions', positions.data.positions);
  },
};

export const plugins: Array<Plugin<StoreState>> = [
  async (store) => {
    await Promise.all([
      store.dispatch('fetchToken'),
      store.dispatch('fetchPositions'),
    ]);
  },
];
