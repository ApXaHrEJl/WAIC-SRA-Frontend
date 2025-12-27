<template>
  <div class="episode-card-container" @contextmenu="onEditClick" :disabled="props.episodeData.marked_as">
    <q-card flat bordered class="episode-card q-pa-md" :style="segmentStyle" @click="onClick">
      <div class="episode-title">
        <div class="category-label"> {{ categoryLabel[props.episodeData.category] }} </div>
        <q-btn :ripple="false" :color="severityData[props.episodeData.severity].color" dense unelevated size="12px"
          class="severity-label">
          <div class="text-weight-bold">{{ severityData[props.episodeData.severity].label }}</div>
        </q-btn>
      </div>
      <div class="quote-label">
        «{{ props.episodeData.quote }}»
      </div>
      <div class="position-label">
        Позиция: {{documentStore.scenes.find((scene: SceneData) => scene.scene_id ===
          props.episodeData.scene_id)?.header}}
      </div>
      <div class="reason-recommendation-label">
        <span class="text-weight-bold">Причина:</span>
        {{ annotation.reason }}
      </div>
      <div class="reason-recommendation-label">
        <span class="text-weight-bold">Рекомендации:</span>
        {{ annotation.recommendation }}
      </div>
      <div class="buttons">
        <q-btn :disable="isActive || !!props.episodeData.marked_as" color="amber" no-caps unelevated size="12px"
          @click="onEditClick">
          <div class="text-weight-bold">Править</div>
        </q-btn>
        <q-btn :disable="isActive || !!props.episodeData.marked_as" color="amber" no-caps unelevated outline size="12px"
          @click="onIgnoreClick">
          <div class="text-weight-bold">Игнорировать</div>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { EditorType, MarkType } from 'src/common/enums';
import type { EpisodeData, SceneData } from 'src/common/types';
import { computed, ref } from 'vue';
import { useDocumentStore } from 'src/stores/document-store';
import { useQuasar } from 'quasar';
import { categoryLabel, getAnnotation, severityData } from 'src/common/dictionaries';

const $q = useQuasar();

const documentStore = useDocumentStore();

interface Props {
  episodeData: EpisodeData;
  episodeIndex: number;
}

const props = withDefaults(defineProps<Props>(), {});

const annotation = ref(getAnnotation(props.episodeData.category, props.episodeData.severity));

const isActive = computed(() => {
  return documentStore.getEditorMode === EditorType.SCENE
    && documentStore.getCurrentEpisode === props.episodeIndex;
})

function onEditClick(event: Event) {
  event.preventDefault();
  if (props.episodeData.marked_as) {
    return
  }
  documentStore.setEditorMode(EditorType.SCENE, props.episodeData.scene_id, props.episodeData.position, props.episodeIndex);
}

async function onIgnoreClick() {
  try {
    $q.loading.show({ message: 'Исключаем эпизод...' });
    await documentStore.markEpisode(props.episodeIndex, MarkType.FP);
    $q.notify({
      type: 'positive',
      message: 'Эпизод помечен как ложноположительный (FP)',
      position: 'top'
    });
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при пометке эпизода',
      position: 'top'
    });
  } finally {
    $q.loading.hide();
  }
}

function onClick() {
  documentStore.highlightElement(
    documentStore.getScenes.findIndex((scene) => scene.scene_id == props.episodeData.scene_id),
    props.episodeData.position);
}

const segmentStyle = computed(() => ({
  borderColor: isActive.value ? 'darkorange' : '#dbdcdd'
}));
</script>

<style lang="scss" scoped>
.episode-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.episode-card {
  min-height: 0;
  overflow: auto;
  transition: border-color 0.3s ease
}

.episode-card-active {
  border-color: darkorange;
}

.category-label {
  font-size: 16px;
  font-weight: bolder;
}

.quote-label {
  font-size: 15px;
  font-style: italic;
}

.position-label {
  font-size: 14px;
  color: #787878;
  padding-top: 4px;
  padding-bottom: 4px;
}

.reason-recommendation-label {
  font-size: 14px;
}

.buttons {
  display: flex;
  gap: 8px;
  padding-top: 8px;
}

.severity-label {
  width: 72px;
}
</style>