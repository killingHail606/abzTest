<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: [Number, String],
  value: [Number, String],
  text: [Number, String],
  isChecked: Boolean,
  validateData: Object,
});

const emit = defineEmits(['update:modelValue']);

function radioChange() {
  emit('update:modelValue', props.value);
}

</script>

<template>
  <p class="radio-button">
    <input
      :id="`radioButton-${value}`"
      type="radio"
      name="job"
      :checked="isChecked"
      @change="radioChange"
    >
    <label :for="`radioButton-${value}`">{{ text }}</label>
  </p>
</template>

<style lang='scss' scoped>
.radio-button {
  margin: 0;
  padding: 0;
  input {
    &:checked,
    &:not(:checked) {
      position: absolute;
      left: -9999px;

      & + label{
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        line-height: 20px;
        display: inline-block;
        color: #666;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 20px;
          height: 20px;
          border: 1px solid #D0CFCF;
          border-radius: 100%;
        }

        &:after {
          content: '';
          width: 10px;
          height: 10px;
          background: #00BDD3;
          position: absolute;
          top: 5px;
          left: 5px;
          border-radius: 50%;
          -webkit-transition: all 0.2s ease;
          transition: all 0.2s ease;
        }
      }
    }

    &:not(:checked) + label:after {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    &:checked + label {
      &:before {
        border: 1px solid #00BDD3;
      }

      &:after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  }
}
</style>
