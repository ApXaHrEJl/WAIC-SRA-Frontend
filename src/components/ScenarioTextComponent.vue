<template>
  <div class="scenario-text-container">
    <TitleComponent label="Текст сценария" />
    <q-card flat bordered class="scenario-card">
      <div class="scenario" ref="scenarioRef">
        <div v-if="documentStore.documentId === '0'" class="scene-text">Здесь появится текст сценария после загрузки и
          обработки документа</div>
        <div v-for="(scene, i) of documentStore.scenes" v-bind:key='i' class="scene">
          <div class="scene-label">{{ scene.header }}</div>
          <div class="speakers-label" v-if="scene.cast">
            <div v-for="(speaker, j) of scene.cast" v-bind:key="scene.scene_id + speaker">
              <span v-if="j !== 0">,&nbsp;</span>
              {{ speaker }}
            </div>
          </div>
          <div v-for="(element, k) of scene.elements" v-bind:key="getELementId(i, k)"
            :class="isHighlighted(i, k) ? 'highlighted' : ''" @mouseenter="highlightElement(i, k)"
            @mouseleave="resetHighlight"
            :ref="el => { if (el) { itemRefs[getELementId(i, k)] = el as HTMLDivElement } }">
            <div v-if="element.type === SceneElementType.SPEAKER" class="scene-text">
              <span class="text-weight-bold" @contextmenu="(event) => editElement(event, scene.scene_id, k)">{{
                element.text }}:&nbsp;</span>
              <span class="scene-text" v-if="scene.elements!.length > k + 1"
                @contextmenu="(event) => editElement(event, scene.scene_id, k + 1)">{{
                  scene.elements![k + 1]?.text }}</span>
            </div>
            <div v-else-if="element.type !== SceneElementType.DIALOGUE"
              :class="element.type == SceneElementType.TRANSITION || element.type == SceneElementType.PARENTHETICAL ? 'italic-text' : 'scene-text'"
              @contextmenu="(event) => editElement(event, scene.scene_id, k)">
              {{ element.text }}
            </div>
          </div>
          <div v-if="scene.note" class="notes-text">{{ scene.note }}</div>
          <q-separator v-if="i < documentStore.scenes.length - 1" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from './utils/TitleComponent.vue';
import { useDocumentStore } from 'src/stores/document-store';
import { EditorType, SceneElementType } from 'src/common/enums';
import { ref, watch, type Ref } from 'vue';

const documentStore = useDocumentStore();

const scenarioRef: Ref<HTMLDivElement | null> = ref(null);
const itemRefs = ref({} as {
  [key: string]: HTMLDivElement;
})

function getELementId(sceneIndex: number, elementIndex: number) {
  return sceneIndex * 100000 + elementIndex;
}

function isHighlighted(sceneIndex: number, elementIndex: number) {
  return documentStore.getHighlightedSceneIndex === sceneIndex
    && documentStore.getHighlightedElementIndex === elementIndex;
}

const handleHighlight = ref(false);

function highlightElement(sceneIndex: number, elementIndex: number) {
  documentStore.highlightElement(sceneIndex, elementIndex);
  handleHighlight.value = true;
}

function resetHighlight() {
  documentStore.resetHighlight();
  handleHighlight.value = false;
}

const scrollToItem = (itemId: number) => {
  const element = itemRefs.value[itemId]
  if (element && scenarioRef.value) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}

watch(
  () => [documentStore.getHighlightedSceneIndex, documentStore.getHighlightedElementIndex],
  (newValue) => {
    if (!handleHighlight.value && newValue[0]! !== -1 && newValue[1]! !== -1) {
      scrollToItem(getELementId(newValue[0]!, newValue[1]!));
    }
  }
);

function editElement(event: Event, sceneId: string, elementIndex: number) {
  event.preventDefault();
  documentStore.setEditorMode(EditorType.SCENE, sceneId, elementIndex);
}
</script>

<style lang="scss" scoped>
.scenario-text-container {
  display: flex;
  flex-direction: column;
  justify-items: space-between;
  height: calc(80vh - 74px);
}

.scenario-card {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background-color: #F9FAFC;
}

.scenario {
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.separator {
  padding-top: 8px;
  padding-bottom: 8px;
}

.edit-button {
  padding-top: 6px;
  width: 21px;
  height: 21px;
}

.scene-label {
  display: flex;
  flex-direction: row;
  gap: 8px;
  font-size: 18px;
  font-weight: bolder;
  padding-top: 8px;
}

.speakers-label {
  display: flex;
  padding-top: 8px;
  font-weight: bolder;
  font-style: italic;
}

.notes-text {
  padding-top: 8px;
  color: #787878;
}

.scene-text {
  padding-top: 4px;
  padding-bottom: 4px;
}

.italic-text {
  padding-top: 4px;
  font-style: italic;
}

.highlighted {
  background-color: cornsilk;
  transition: background-color 0.6s ease
}
</style>