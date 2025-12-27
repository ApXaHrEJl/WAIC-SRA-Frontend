<template>
  <div class="indexpage-container">
    <div class="toolbar-block">
      <ToolbarComponent />
    </div>
    <q-separator />
    <q-splitter class="main-block" v-model="splitterModelScenario" :limits="[0, 100]">
      <template v-slot:before>
        <div class="q-pa-md">
          <ScenarioTextComponent v-if="documentStore.editorMode === EditorType.SCENARIO" />
          <SceneEditorComponent v-if="documentStore.editorMode === EditorType.SCENE" />
        </div>
      </template>
      <template v-slot:after>
        <div class="q-pa-md">
          <EpisodesComponent />
        </div>
      </template>
    </q-splitter>
    <q-separator />
    <div class="q-pa-md summary-block">
      <SummaryComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EditorType } from 'src/common/enums';
import SceneEditorComponent from 'src/components/SceneEditorComponent.vue';
import EpisodesComponent from 'src/components/EpisodesComponent.vue';
import ScenarioTextComponent from 'src/components/ScenarioTextComponent.vue';
import SummaryComponent from 'src/components/SummaryComponent.vue';
import ToolbarComponent from 'src/components/ToolbarComponent.vue';
import { useDocumentStore } from 'src/stores/document-store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const route = useRoute();
const documentStore = useDocumentStore();

const splitterModelScenario = ref(67);

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
      message: `Анализ в процессе...`
    });
    
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }
  
  throw new Error('Превышено время ожидания анализа');
}

onMounted(async () => {
  const documentId = route.params.id;
  if (documentId && typeof documentId == 'string' && documentStore.getDocumentId === '0') {
    try {
      $q.loading.show({ message: 'Загрузка документа...' });
      await documentStore.getDocumentData(documentId);
      
      const status = documentStore.analysisStatus;
      if (status === 'processing') {
        $q.loading.show({ message: 'Анализ в процессе...' });
        await waitForAnalysisCompletion(documentId);
      }
      
      $q.notify({
        type: 'positive',
        message: 'Документ успешно загружен',
        position: 'top'
      });
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Ошибка при загрузке документа',
        position: 'top'
      });
      window.location.hash = ''
    } finally {
      $q.loading.hide();
    }
  }
})
</script>

<style lang="scss" scoped>
.indexpage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar-block {
  height: 52px;
  flex-shrink: 1;
}

.main-block {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.summary-block {
  flex-shrink: 1;
  // background-color: #F9FAFC;
}
</style>
