<template>
  <div
    class="card bordered base-content w-72 bg-slate-100 rounded-none flex-row"
  >
    <div
      :class="`card-body text-black flex-row justify-start ${highlightCard}`"
    >
      <div class="drag-handle cursor-move flex items-center justify-center">
        <v-icon>mdi-drag-horizontal</v-icon>
      </div>
      <div class="flex justify-between flex-grow">
        <div class="flex flex-col justify-center">
          <h2 class="card-title mb-3">{{ nome }}</h2>
          <h3 class="mb-3">Cost: {{ $currency(custo) }}</h3>
          <h3>Deadline: {{ dataLimite }}</h3>
        </div>
        <div class="justify-end card-actions">
          <button @click="editCard" class="btn btn-secondary m-auto">
            Edit
          </button>
          <button @click="deleteCard" class="btn btn-error m-auto">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  nome: String,
  custo: Number,
  dataLimite: String,
  ordemApresentacao: Number,
});

const custolimite = 1000;

const highlightCard = computed(() => {
  if (props.custo >= custolimite) return "bg-yellow-500";
  else return "";
});

const emit = defineEmits(["delete", "edit"]);

const editCard = () => {
  emit("edit", props.id);
};

const deleteCard = () => {
  emit("delete", props.id);
};
</script>

<style>
.drag-handle {
  height: 20px;
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
