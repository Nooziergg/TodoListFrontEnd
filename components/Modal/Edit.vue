<template>
  <BaseModal :show="show" title="Edit Task">
    <template #body>
      <input
        v-model="localNome"
        class="input input-bordered w-full my-2"
        :class="{ 'border-red-500': v$.localNome.$invalid }"
        placeholder="Name"
      />

      <div v-if="v$.localNome.$invalid" class="text-red-500 text-xs">
        {{ "Please provide a valid name" }}
      </div>

      <input
        v-model.number="localCusto"
        class="input input-bordered w-full my-2"
        :class="{ 'border-red-500': v$.localCusto.$invalid }"
        type="number"
        placeholder="Cost ($)"
      />
      <div v-if="v$.localCusto.$invalid" class="text-red-500 text-xs">
        {{ "Please provide a valid cost (0-100000000)" }}
      </div>

      <input
        v-model="localDataLimite"
        type="date"
        class="input input-bordered w-full my-2"
        :class="{ 'border-red-500': v$.localDataLimite.$invalid }"
        placeholder="Deadline (DD/MM/YYYY))"
      />

      <div v-if="v$.localDataLimite.$invalid" class="text-red-500 text-xs">
        {{ "Please provide a valid date in DD/MM/YYYY format" }}
      </div>
    </template>

    <template #actions>
      <button @click="emitData" class="btn" :disabled="v$.$invalid">
        Save
      </button>
      <button @click="closeModal" class="btn">Close</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, between } from "@vuelidate/validators";

// Access the date function from Nuxt
const { $date } = useNuxtApp();

const props = defineProps({
  show: Boolean,
  card: Object,
});

const emits = defineEmits(["close", "update"]);

const localNome = ref("");
const localCusto = ref("");
const localDataLimite = ref("");

watchEffect(() => {
  if (props.card) {
    localNome.value = props.card.nome;
    localCusto.value = props.card.custo;
    localDataLimite.value = props.card.dataLimite;
  }
});

function isDateValid(value) {
  const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
  return pattern.test($date(value));
}

const rules = {
  localNome: { required },
  localCusto: { required, between: between(0, 100000000) },
  localDataLimite: {
    required,
    isDate: isDateValid,
  },
};

const v$ = useVuelidate(rules, { localNome, localCusto, localDataLimite });

const closeModal = () => {
  emits("close");
};

const emitData = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    emits("update", {
      id: props.card.id,
      nome: localNome.value,
      custo: localCusto.value,
      dataLimite: $date(localDataLimite.value),
      ordemApresentacao: props.card.ordemApresentacao,
    });
    closeModal();
  }
};
</script>
