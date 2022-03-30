import { API } from '@/common/api';
import { UsersModule, User, RegisterUser } from '@/types/store/users';

export const state: UsersModule['state'] = () => ({
  users: [],
  page: 1,
});

export const getters: UsersModule['getters'] = {
  users: (state): User[] => state.users,
  page: (state): number => state.page,
};

export const mutations: UsersModule['mutations'] = {
  setUsers(state, users: User[]): void {
    state.users.push(...users);
  },
  setPage(state, toStart: boolean): void {
    toStart ? state.page = 1 : state.page += 1;
  },
};

export const actions: UsersModule['actions'] = {
  async fetchUsers({ commit, state }): Promise<number> {
    const users = await API.getUsers(state.page);
    console.log(users.data.users);
    commit('setUsers', users.data.users);
    return users.data.total_pages;
  },
  async fetchUser({ commit, dispatch, state }): Promise<void> {
    // С одной стороны необязательно это выделять в отденльную функцию,
    // но для большей наглядности решил выделить.
    commit('setPage', true); // Переходим на первую страницу
    state.users.length = 0; // Очищаем список пользователей
    dispatch('fetchUsers'); // И заново загружаем (с только что зареганым)
  },
  async registerUser({ commit, dispatch }, user: RegisterUser): Promise<unknown> {
    // Формируем объект с данными юзера как данные формы
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('position_id', user.position_id);
    // @ts-ignore
    formData.append('photo', user.photo);

    try {
      const response = await API.registerUser(formData);
      dispatch('fetchUser'); // Если выше была какая-то ошибка этого не произойдёт
      return response.data;
    } catch (error) {
      // @ts-ignore
      return error.response.data;
    }
  },
};
