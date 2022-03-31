<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Preloader from '@/components/Preloader.vue';
import { User } from '@/types/store/users';

const store = useStore();
const max_page = ref(1);
const isLoadingUsers = ref(false);

const { users, page }: { users: User[]; page: number } = store.getters;

async function showMore() {
  await store.commit('setPage'); // Увеличиваем номер страницы
  isLoadingUsers.value = true;
  await store.dispatch('fetchUsers');
  isLoadingUsers.value = false;
}

onMounted(async () => {
  max_page.value = await store.dispatch('fetchUsers', 1);
});

</script>

<template>
  <div
    v-if="users.length > 0"
    id="users"
    class="users wrapper"
  >
    <h1>Working with GET request</h1>
    <div class="users__content">
      <div
        v-for="user in users"
        :key="user.id"
        class="user"
      >
        <img
          :src="user.photo"
          :alt=" user.name"
          class="user__photo"
        >

        <div class="tooltip user__name">
          <span class="short_name">{{ user.name }}</span>
          <span class="tooltip-text">{{ user.name }}</span>
        </div>
        <p class="user__job">
          {{ user.position }}
        </p>
        <div class="tooltip user__email">
          <span class="short_email">{{ user.email }}</span>
          <span class="tooltip-text">{{ user.email }}</span>
        </div>
        <p class="user__phone">
          {{ user.phone }}
        </p>
      </div>
    </div>
    <Preloader v-if="isLoadingUsers" />
    <button
      v-if="page < max_page && !isLoadingUsers"
      class="btn users__show-more"
      @click="showMore"
    >
      Show more
    </button>
  </div>
</template>

<style lang='scss' scoped>
.users {
  overflow-x: hidden;
  margin-top: 140px;
  text-align: center;
  max-width: 1170px;

  h1 {
    margin-bottom: 50px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;
    margin-bottom: 50px;

    .user {
      background: #fff;
      border-radius: 10px;
      text-align: center;
      padding: 20px;
      margin: 0 15px;

      &__photo {
        display: block;
        height: 70px;
        width: 70px;
        border-radius: 50%;
        margin: 0 auto 20px auto;
      }

      &__name {
        margin-bottom: 13px;
      }

      &__job, &__email {
        margin: 0;
        height: 26px;
      }

      &__email .short_email, &__name .short_name {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 220px;
        white-space: nowrap;
      }

      &__phone {
        margin: 0;
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .users__content {
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
    row-gap: 15px;
    margin: 0 30px 50px 30px;

    .user {
      margin: 0;
    }
  }
}

@media screen and (min-width: 1024px) {
  .users__content {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 30px;
    column-gap: 30px;
    margin: 0 60px 50px 60px;

    .user {
      max-width: 370px;
      margin: 0;
    }
  }
}
</style>
