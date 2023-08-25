<template>
  <BaseModal :show="show" title="Delete Task">
    <template #body>
      <p>Are you sure you want to delete this task?</p>
    </template>

    <template #actions>
      <button @click="emitDelete" class="btn btn-error">Delete</button>
      <button @click="closeModal" class="btn">Cancel</button>
    </template>
  </BaseModal>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
});

const emits = defineEmits(["close", "confirmDelete"]);

const closeModal = () => {
  emits("close");
};

const emitDelete = () => {
  emits("confirmDelete");
  closeModal();
};
</script>
