<template>
  <q-dialog :model-value="modelValue" @update:model-value="updateModel">
    <q-card style="min-width: 400px">
      <q-card-section>
        <TitleComponent label="Загрузить сценарий" />
        <q-file v-model="selectedFile" label="Выберите файл (PDF или DOCX)" accept=".pdf,.docx" color="grey"
          :max-file-size="52428800" @rejected="onFileRejected">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right">
        <ButtonComponent label="Загрузить" @click="uploadFile" :disable="!selectedFile" />
        <ButtonComponent label="Отмена" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useDocumentStore } from 'src/stores/document-store';
import { ref, watch } from 'vue';
import ButtonComponent from './utils/ButtonComponent.vue';
import TitleComponent from './utils/TitleComponent.vue';

interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const emit = defineEmits<Emits>();

const localShow = ref(props.modelValue);

function updateModel(value: boolean) {
  localShow.value = value;
  emit('update:modelValue', value);
};

watch(() => props.modelValue, (newValue) => {
  localShow.value = newValue;
});


const $q = useQuasar();
const documentStore = useDocumentStore();
const selectedFile = ref<File | null>(null);

function openDocument(documentPath: string) {
  const currentPath = window.location.hash.substring(1);
  if (!currentPath || currentPath === '/') {
    window.location.hash = documentPath;
  } else {
    const newUrl = `${window.location.origin}${window.location.pathname}#${documentPath}`;
    window.open(newUrl, '_blank');
  }
}

async function waitForAnalysisCompletion(documentId: string): Promise<void> {
  const maxAttempts = 60;
  const pollInterval = 5000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await documentStore.getDocumentData(documentId);
    const status = documentStore.analysisStatus;

    if (status === 'completed') {
      return;
    }

    if (status === 'failed') {
      throw new Error('Анализ завершился с ошибкой');
    }

    $q.loading.show({
      message: `Анализ содержания...`
    });

    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  throw new Error('Превышено время ожидания анализа');
}

async function uploadFile() {
  if (!selectedFile.value) return;

  try {
    $q.loading.show({
      message: 'Загрузка и парсинг сценария...'
    });

    const documentData = await documentStore.analyzeFile(selectedFile.value);
    openDocument(`/${documentData.doc_id}`);
    if (documentStore.getDocumentId !== '0') {
      return;
    }
    documentStore.loadDocument(documentData);
    const documentId = documentStore.getDocumentId;

    await waitForAnalysisCompletion(documentId);

    $q.notify({
      type: 'positive',
      message: 'Анализ успешно завершен!',
      position: 'top'
    });

    selectedFile.value = null;
    updateModel(false);
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при анализе сценария',
      position: 'top'
    });
  } finally {
    $q.loading.hide();
  }
}

function onFileRejected() {
  $q.notify({
    type: 'negative',
    message: 'Неподдерживаемый тип файла или файл слишком большой (макс. 50 МБ)',
    position: 'top'
  });
}
</script>