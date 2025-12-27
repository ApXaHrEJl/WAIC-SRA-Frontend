<template>
  <div class="toolbar-container">
    <div class="buttons">
      <ButtonComponent label="Загрузить сценарий" @click="showUploadDialog = true" />
      <ButtonComponent :disable="!documentStore.documentId || documentStore.documentId === '0'"
        label="Открыть HTML отчёт" @click="viewHTMLReport" />
      <ButtonComponent :disable="!documentStore.documentId || documentStore.documentId === '0'"
        label="Скачать PDF отчёт" @click="downloadPDFReport" />
    </div>
    <img src="wink-ai-challenge.webp" class="logo" />
  </div>

  <ScenarioLoadingPopupComponent v-model="showUploadDialog" />
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import ButtonComponent from './utils/ButtonComponent.vue';
import ApiService, { API_BASE_URL } from 'src/services/api';
import { useDocumentStore } from 'src/stores/document-store';
import ScenarioLoadingPopupComponent from './ScenarioLoadingPopupComponent.vue';

const $q = useQuasar();
const documentStore = useDocumentStore();

const showUploadDialog = ref(false);

function viewHTMLReport() {
  const docId = documentStore.getDocumentId;

  if (!docId || docId === '0') {
    $q.notify({
      type: 'warning',
      message: 'Сначала загрузите сценарий',
      position: 'top'
    });
    return;
  }
  window.open(`${API_BASE_URL}/api/report/${docId}/html`, '_blank');
}

async function downloadPDFReport() {
  const docId = documentStore.getDocumentId;

  if (!docId || docId === '0') {
    $q.notify({
      type: 'warning',
      message: 'Сначала загрузите сценарий',
      position: 'top'
    });
    return;
  }

  try {
    $q.loading.show({
      message: 'Генерирую PDF отчёт...'
    });

    const pdfBlob = await ApiService.getPDFReport();
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report_${docId}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    $q.notify({
      type: 'positive',
      message: 'PDF скачан успешно!',
      position: 'top'
    });

  } catch (error) {
    console.error('Ошибка при скачивании PDF:', error);
    $q.notify({
      type: 'negative',
      message: 'Ошибка при генерации PDF отчёта',
      position: 'top'
    });
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  const currentPath = window.location.hash.substring(1);
  if (!currentPath || currentPath === '/') {
    showUploadDialog.value = true;
  }
});
</script>

<style lang="scss" scoped>
.toolbar-container {
  display: flex;
  flex-direction: row;
  padding-left: 8px;
  padding-top: 8px;
  justify-content: space-between;
  background: linear-gradient(to right,
      white 0%,
      white 67%,
      darkgrey 100%);
}

.buttons {
  display: flex;
  flex-direction: row;
}

.logo {
  height: 30px;
  width: auto;
  padding-right: 16px;
}
</style>
