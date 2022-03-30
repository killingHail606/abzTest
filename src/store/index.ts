import { createStore } from 'vuex';
import { UsersModule } from '@/types/store/users';
import { InfoState } from '@/types/store/info';
import * as users from '@/store/modules/users';
import * as info from '@/store/modules/info';

export interface StoreState {
  info: InfoState;
  users: UsersModule;
}

const store = createStore<StoreState>({
  modules: {
    users,
    info,
  },
  plugins: [
    ...info.plugins,
  ],
});

export {
  store,
};
