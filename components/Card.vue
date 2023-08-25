<template>
  <div
    class="card bordered base-content bg-slate-100 rounded-none flex-col sm:flex-row lg:w-full"
  >
    <div
      :class="`card-body text-black flex-row justify-start ${highlightCard}`"
    >
      <div
        class="drag-handle cursor-move flex items-center justify-center mb-2 sm:mb-0 sm:mr-2 lg:mr-2 xl:mr-2"
      >
        <v-icon>mdi-drag-horizontal</v-icon>
      </div>
      <div class="flex justify-between flex-grow">
        <div
          class="flex flex-col justify-center text-xs sm:text-sm md:text-base lg:text-base xl:text-base"
        >
          <h2 class="card-title mb-2">{{ nome }}</h2>
          <h3 class="mb-2">Cost: {{ $currency(custo) }}</h3>
          <h3>Deadline: {{ dataLimite }}</h3>
        </div>
        <div class="justify-end card-actions mt-2 sm:mt-0 lg:mt-0 xl:mt-0">
          <button
            @click="editCard"
            class="btn btn-secondary m-auto text-xs sm:text-sm md:text-base lg:text-base xl:text-base"
          >
            Edit
          </button>
          <button
            @click="deleteCard"
            class="btn btn-error m-auto text-xs sm:text-sm md:text-base lg:text-base xl:text-base"
          >
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
