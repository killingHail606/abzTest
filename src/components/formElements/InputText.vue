<script lang='ts' setup>
import {
  defineProps, defineEmits, ref, watch,
} from 'vue';

defineProps({
  label: {
    type: String,
    required: true,
  },
  text: String,
  validateData: Object,
});

const emit = defineEmits(['update:text']);

const input = ref<string>('');
watch(input, (value) => {
  emit('update:text', value);
});
</script>

<template>
  <div class="input-text">
    <div
      :class="{
        'error': validateData && validateData.$error,
        'input-group': true,
      }"
    >
      <input
        v-model="input"
        type="text"
        required
      >
      <label>{{ label }}</label>
    </div>
    <p
      v-if="validateData && validateData.$error"
      class="error-message"
    >
      {{ validateData.$errors[0].$message }}
    </p>
  </div>
</template>

<style lang='scss' scoped>
.input-text {
  .input-group {
    position: relative;

    label {
      color: #7E7E7E;
      position: absolute;
      pointer-events: none;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
      background: #F8F8F8;
      padding: 0 5px;
    }

    input {
      padding: 18px 15px;
      max-width: 380px;
      width: 100%;
      display: block;
      border: 1px solid #D0CFCF;
      box-sizing: border-box;
      border-radius: 4px;
      background: #F8F8F8;

      &:focus {
        outline: none;
      }

      &:focus ~ label,
      &:valid ~ label {
        top: -0px;
        font-size: 12px;
        color: #4285f4;
      }
    }

    &.error input {
      border-color: #F44336;
      border-width: 2px;

      &:focus ~ label,
      &:valid ~ label {
        color: #F44336;
      }
    }

    &.error label {
      color: #F44336;
    }
  }

  .error-message {
    color: #CB3D40;
    font-size: 12px;
    margin-top: 2px;
    margin-left: 16px;
    line-height: 1rem;
  }
}

</style>
