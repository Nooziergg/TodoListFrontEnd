<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="modal modal-open">
      <div class="modal-box">
        <h2 class="text-xl">{{ title }}</h2>
        <slot name="body"></slot>
        <div class="modal-action">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  title: String,
});
</script>
