<script lang='ts' setup>
import Preloader from '@/components/Preloader.vue';
import { reactive, computed, ref } from 'vue';
import {
  email, helpers, required, requiredIf, minLength, maxLength,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import InputText from '@/components/formElements/InputText.vue';
import InputRadio from '@/components/formElements/InputRadio.vue';
import InputFile from '@/components/formElements/InputFile.vue';
import { useStore } from 'vuex';
import { RegisterUser } from '@/types/store/users';

const store = useStore();

const completeRegister = ref(false);
const isLoading = ref(false);
const isLoadingPhoto = ref(false);
const userExistMessage = ref('');

// Ошибки валидации полей на сервере. Все необходимые валидаторы прописаны на фронте,
// поэтому на сервере ошибок быть не может. Но на всякий случай пусть лучше будет их возможное
// отображение. Выглядеть они будут (и находиться) также как и ошибка с уже существующим юзером
const serverErrors = ref({});

const formData = reactive<RegisterUser>({
  name: '',
  phone: '',
  email: '',
  position_id: '',
  photo: undefined,
});

// Проверямем, что изображение больше 70 * 70 пикселей
async function checkResolution(): Promise<any> {
  // Если изобаржение не загружено - выходим
  if (!formData.photo) return false;

  const image = new Image();
  image.src = URL.createObjectURL(formData.photo);
  isLoadingPhoto.value = true;
  return new Promise((resolve) => {
    image.onload = () => {
      const { width, height } = image;
      isLoadingPhoto.value = false;
      resolve(width >= 70 && height >= 70);
    };
  });
}

// Можно, конечно, вынести в отдельный файл, но в данном случае, как по мне, не имеет смысла
const rules = computed(() => ({
  name: {
    required: helpers.withMessage(
      'Enter your name',
      required,
    ),
    minLength: helpers.withMessage(
      'Name must be at least 2 characters',
      minLength(2),
    ),
    maxLength: helpers.withMessage(
      'Name must be at most 60 characters',
      maxLength(60),
    ),
  },
  phone: {
    required: helpers.withMessage(
      'Enter your phone number',
      required,
    ),
    correctPhone: helpers.withMessage(
      'Enter a valid phone number like +380631112233',
      helpers.regex(/^\+380[0-9]{9}$/g),
    ),
  },
  email: {
    required: helpers.withMessage(
      'Enter your email address',
      required,
    ),
    minLength: helpers.withMessage(
      'Email must be at least 2 characters',
      minLength(2),
    ),
    maxLength: helpers.withMessage(
      'Email must be at most 100 characters',
      maxLength(100),
    ),
    email: helpers.withMessage(
      'Not a valid email address',
      email,
    ),
  },
  position_id: {
    required: helpers.withMessage(
      'Select your position',
      required,
    ),
  },
  photo: {
    required: helpers.withMessage(
      'Upload a photo',
      requiredIf(() => formData.photo === null),
    ),
    maxSize: helpers.withMessage(
      'File size must be less than 5 MB',
      () => formData.photo!.size < 5 * 1024 * 1024,
    ),
    isJpgJpeg: helpers.withMessage(
      'File must be a jpg or jpeg',
      () => formData.photo!.type === 'image/jpeg' || formData.photo!.type === 'image/jpg',
    ),
    resolution: helpers.withMessage(
      'Image resolution must be less than 70x70',
      helpers.withAsync(checkResolution),
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

async function registerUser() {
  await v$.value.$validate();
  if (!v$.value.$error) {
    isLoading.value = true;
    const responseRegister = await store.dispatch('registerUser', formData);
    isLoading.value = false;
    if (responseRegister.success) {
      completeRegister.value = true;
      document.querySelector('#users')!.scrollIntoView({
        behavior: 'smooth',
      }); // Проскролим до блока с юзерами, для комфорта
    } else if ('fails' in responseRegister) {
      // 422 ошибка, по-сути
      serverErrors.value = responseRegister.fails;
    } else {
      // 409 ошибка
      userExistMessage.value = responseRegister.message;
    }
  }
}

</script>

<template>
  <div
    id="sign-up"
    class="registration wrapper"
  >
    <h1>Working with POST request</h1>
    <form
      v-if="!completeRegister"
      method="post"
      enctype="multipart/form-data"
    >
      <InputText
        v-model:text="formData.name"
        label="Your name"
        :validate-data="v$.name"
      />
      <InputText
        v-model:text="formData.email"
        label="Email"
        :validate-data="v$.email"
      />
      <InputText
        v-model:text="formData.phone"
        label="Phone"
        :validate-data="v$.phone"
      />

      <p class="header-radio-buttons">
        Select your position +380639998877
      </p>
      <InputRadio
        v-for="position in store.getters.positions"
        :key="position.id"
        v-model:modelValue="formData.position_id"
        :value="position.id"
        :text="position.name"
      />
      <p
        v-if="v$.position_id.$error"
        class="error-message"
      >
        {{ v$.position_id.$errors[0].$message }}
      </p>

      <InputFile
        v-model:file="formData.photo"
        :validate-data="v$.photo"
        :is-loading="isLoadingPhoto"
      />

      <div
        v-if="userExistMessage.length > 0 || Object.keys(serverErrors).length > 0"
        class="server-errors"
      >
        <p class="server-errors__header">
          Errors:
        </p>
        <p
          v-for="(message, field) in serverErrors"
          :key="field"
          class="error-message"
        >
          {{ message[0] }}
        </p>
        <p
          v-if="userExistMessage.length > 0"
          class="error-message"
        >
          {{ userExistMessage }}
        </p>
      </div>

      <div class="registration__wrapper-button">
        <Preloader v-if="isLoading" />
        <button
          v-if="!isLoading"
          :class="{'btn': true, 'btn-disabled': v$.$error}"
          :disabled="v$.$error"
          @click.prevent="registerUser"
        >
          Sign up
        </button>
      </div>
    </form>
    <div
      v-else
      class="registration__complete"
    >
      <h1>User successfully registered</h1>
      <img
        :src="'/img/success-registration.svg'"
        alt="successfully registered"
      >
    </div>
  </div>
</template>

<style lang='scss' scoped>
.registration {
  margin-top: 140px;
  text-align: center;
  box-sizing: border-box;

  form {
    max-width: 380px;
    width: 100%;
    margin: 0 auto;
    text-align: left;

    .input-text {
      margin: 50px 0;
    }

    .header-radio-buttons {
      margin-bottom: 15px;
    }

    .radio-button {
      margin-bottom: 13px;
    }

    .server-errors {
      margin-bottom: 30px;
      &__header {
        margin-bottom: 0;
      }
    }

    .error-message {
      color: #CB3D40;
      font-size: 12px;
      line-height: 12px;
    }

    .input-file {
      margin: 50px 0;
    }

    .registration__wrapper-button {
      text-align: center;

      button, .preloader {
        margin-bottom: 100px;
      }
    }
  }

  &__complete {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;

    img {
      width: 100%;
      max-width: 330px;
    }
  }
}

@media screen and (max-width: 767px) {
  .registration {
    padding: 0 15px;
  }
}
</style>
