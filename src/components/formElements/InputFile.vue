<script lang='ts' setup>
import { ref, defineProps, defineEmits } from 'vue';

defineProps({
  validateData: Object,
  file: Object,
  isLoading: Boolean,
});

const emit = defineEmits(['update:file']);

const file = ref<HTMLInputElement | null>(null);
const fileName = ref<string>('Upload your file');

function fileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files![0];
  fileName.value = file.name;
  emit('update:file', file);
}

</script>

<template>
  <div
    :class="{
      'error': validateData && validateData.$error,
      'input-file': true,
    }"
  >
    <label>
      <span class="custom-button">Upload</span>
      <span class="name-photo">{{ fileName }}</span>
      <input
        ref="file"
        type="file"
        @change="fileChange"
      >
    </label>
    <p
      v-if="validateData && validateData.$errors[0]"
      class="error-message"
    >
      {{ validateData.$errors[0].$message }}
    </p>
    <p
      v-if="isLoading"
      class="loading-photo"
    >
      Загрузка файла
    </p>
  </div>
</template>

<style lang='scss' scoped>
.input-file {
  label {
    width: 100%;
    max-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;

    input {
      display: none;
    }

    .custom-button, .name-photo {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 15px;
    }

    .custom-button {
      border: 1px solid rgba(0, 0, 0, 0.87);
      border-radius: 4px 0 0 4px;
    }

    .name-photo {
      border: 1px solid #D0CFCF;
      border-left: none;
      border-radius: 0 4px 4px 0;
      color: #7E7E7E;
      width: 100%;

      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      line-height: 48px;
    }
  }
  .error-message {
    font-size: 12px;
    color: #FF0000;
    margin-left: 16px;
    margin-bottom: 0;
  }
  .loading-photo {
    font-size: 12px;
    color: #00a1e7;
    margin-left: 16px;
    margin-bottom: 0;
  }
  &.error {
    label {
      .custom-button {
        border: 2px solid #FF0000;
      }

      .name-photo {
        border: 2px solid #FF0000;
        border-left: none;
      }
    }
  }
}
</style>
