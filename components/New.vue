<template>
  <v-btn color="primary" large depressed dark @click="showAddModal">
    <v-icon large>mdi-plus</v-icon>
  </v-btn>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["addNew"]);

const showAddModal = () => {
  emit("addNew");
};
</script>
