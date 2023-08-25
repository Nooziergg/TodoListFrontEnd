<template>
  <BaseModal :show="show" title="Add New Task">
    <template #body>
      <input
        v-model="localNome"
        class="input input-bordered w-full my-2"
        :class="{ 'border-red-500': v$.localNome.$invalid && submitAttempted }"
        placeholder="Name"
      />

      <div
        v-if="v$.localNome.$invalid && submitAttempted"
        class="text-red-500 text-xs"
      >
        Please provide a valid name
      </div>

      <input
        v-model.number="localCusto"
        class="input input-bordered w-full my-2"
        :class="{ 'border-red-500': v$.localCusto.$invalid && submitAttempted }"
        type="number"
        placeholder="Cost ($)"
      />

      <div
        v-if="v$.localCusto.$invalid && submitAttempted"
        class="text-red-500 text-xs"
      >
        Please provide a valid cost (0-100000000)
      </div>

      <input
        v-model="localDataLimite"
        class="input input-bordered w-full my-2"
        :class="{
          'border-red-500': v$.localDataLimite.$invalid && submitAttempted,
        }"
        placeholder="Deadline (DD/MM/YYYY)"
      />

      <div
        v-if="v$.localDataLimite.$invalid && submitAttempted"
        class="text-red-500 text-xs"
      >
        Please provide a valid date in DD/MM/YYYY format
      </div>
    </template>

    <template #actions>
      <button
        @click="emitAdd"
        class="btn"
        :disabled="v$.$invalid && submitAttempted"
      >
        Add
      </button>
      <button @click="closeModal" class="btn">Cancel</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, between, helpers } from "@vuelidate/validators";

const props = defineProps({
  show: Boolean,
});

const emits = defineEmits(["close", "add"]);

const localNome = ref("");
const localCusto = ref("");
const localDataLimite = ref("");
const submitAttempted = ref(false);

function isDateValid(value) {
  const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
  return pattern.test(value);
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

const cleanForm = () => {
  localNome.value = "";
  localCusto.value = "";
  localDataLimite.value = "";
  submitAttempted.value = false;
};

const emitAdd = async () => {
  v$.value.$touch();
  submitAttempted.value = true;

  if (!v$.value.$invalid) {
    try {
      emits("add", {
        nome: localNome.value,
        custo: parseFloat(localCusto.value) || 0,
        dataLimite: localDataLimite.value,
      });
      cleanForm();
      closeModal();
    } catch (error) {
      // Handle the error, e.g., show a toast or a message
    }
  }
};
</script>
