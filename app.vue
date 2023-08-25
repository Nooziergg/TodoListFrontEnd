<template>
  <div class="container px-12 my-6 mx-auto">
    <LayoutHeader />
    <div class="draggable-container">
      <draggable
        v-model="tasks"
        group="people"
        handle=".drag-handle"
        @start="drag = true"
        @end="updateOrder"
        item-key="id"
        :scroll-sensitivity="40"
        :force-fallback="true"
        :stop-propagation="true"
        :scroll-speed="25"
      >
        <template #item="{ element }">
          <Card
            class="w-full mb-3 card"
            :key="element.id"
            :id="element.id"
            :nome="element.nome"
            :custo="element.custo"
            :dataLimite="element.dataLimite"
            :ordemApresentacao="element.ordemApresentacao"
            @delete="showModalDeleteFor(element.id)"
            @edit="showModalEditFor(element)"
          />
        </template>
      </draggable>
    </div>
    <div class="w-full flex">
      <New class="mx-auto my-12" @addNew="showModalAddFor" />
    </div>
    <LayoutFooter />
  </div>
  <ModalDelete
    :show="showModalDelete"
    @close="showModalDelete = false"
    @confirmDelete="deleteCard"
  />
  <ModalEdit
    :show="showModalEdit"
    @close="showModalEdit = false"
    @update="updateCard"
    :card="cardToEdit"
  />
  <ModalAdd :show="showAddModal" @close="showAddModal = false" @add="addCard" />
</template>

<script setup>
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import { useTasksStore } from "~/stores/tasks";

// Tasks initialization
const tasksStore = useTasksStore();

const tasks = computed({
  get: () => tasksStore.tasks,
  set: (newTasks) => tasksStore.setTasks(newTasks),
});

await tasksStore.fetchTasks();

// Delete-related Section
let showModalDelete = ref(false);
let cardToDelete = ref(null);

const showModalDeleteFor = (id) => {
  cardToDelete.value = id;
  showModalDelete.value = true;
};

const deleteCard = async () => {
  const errorData = await tasksStore.deleteTask(cardToDelete.value);

  const { $toast } = useNuxtApp();
  if (errorData) {
    $toast.error(errorData); // Assuming the error data has a message property
  } else {
    $toast.success("Task deleted!");
  }
  showModalDelete.value = false;
};

// Edit-related Section
let showModalEdit = ref(false);
let cardToEdit = ref(null);

const showModalEditFor = (card) => {
  cardToEdit.value = card;
  showModalEdit.value = true;
};

const updateCard = async (updatedCard, customMessage = "") => {
  const errorData = await tasksStore.updateTask(updatedCard);

  const { $toast } = useNuxtApp();
  if (errorData) {
    $toast.error(errorData); // Assuming the error data has a message property
  } else {
    $toast.success(customMessage || "Task updated!");
  }
  showModalEdit.value = false;
};

// Add-related Section
let showAddModal = ref(false);

const showModalAddFor = () => {
  showAddModal.value = true;
};

const addCard = async (newCard) => {
  const errorData = await tasksStore.addTask(newCard);

  const { $toast } = useNuxtApp();
  if (errorData) {
    $toast.error(errorData); // Assuming the error data has a message property
  } else {
    $toast.success("Task added!");
  }
  showAddModal.value = false;
};

// Reorder-related Section
const updateOrder = (event) => {
  const oldIndex = event.oldIndex;
  const newIndex = event.newIndex;

  if (oldIndex === newIndex) return;

  const updatedCard = tasks.value[newIndex];

  if (newIndex === 0) {
    updatedCard.ordemApresentacao = 1;
  } else {
    const cardAbove = tasks.value[newIndex - 1];
    updatedCard.ordemApresentacao = cardAbove.ordemApresentacao + 1;
  }
  if (updatedCard) updateCard(updatedCard, "Task order updated!");
};
</script>

<style scoped>
.sortable-chosen {
  background-color: hsl(var(--nc));
}
.draggable-source {
  visibility: collapse;
}
.draggable-container {
  overflow: auto;
  height: calc(100vh - 300px);
}
.card {
  height: calc((100vh - 300px) / 3.5);
}
</style>
