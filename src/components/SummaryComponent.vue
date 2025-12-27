<template>
  <div class="summary-container">
    <TitleComponent label="Сводка" />
    <div class="rating-label">
      Итоговый возрастной рейтинг сценария:
      <span class="text-weight-bold" :style="'color: ' + ratingData[documentStore.getScenarioRating].color"> {{
        ratingData[documentStore.getScenarioRating].label }}</span>
    </div>
    <div class="line-container">
      <div class="full-line">
        <div class="colored-segment" :style="segmentStyle"></div>
      </div>
    </div>
    <div class="tip-label">
      * На графике выше представлена условная «общая шкала» содержания сценария.
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from './utils/TitleComponent.vue';
import { computed } from 'vue';
import { useDocumentStore } from 'src/stores/document-store';
import { ScenarioRating } from 'src/common/enums';
import { ratingData } from 'src/common/dictionaries';

const documentStore = useDocumentStore();

const segmentOffset = computed(() => {
  const position = Math.max(ScenarioRating.CLEAR,
    Math.min(ScenarioRating.HIGH, documentStore.getScenarioRating));
  return `${position * 22.5}%`;
});

const segmentStyle = computed(() => ({
  left: segmentOffset.value,
  backgroundColor: ratingData[documentStore.getScenarioRating].color
}));
</script>

<style lang="scss" scoped>
.rating-label {
  font-size: 18px;
}

.tip-label {
  font-size: 14px;
  color: #787878;
}

.line-container {
  width: 100%;
  padding-top: 16px;
  padding-bottom: 8px;
}

.full-line {
  position: relative;
  width: 100%;
  height: 8px;
  background-color: darkgrey;
  border-radius: 4px;
  overflow: hidden;
}

.colored-segment {
  position: absolute;
  top: 0;
  width: 10%;
  height: 100%;
  border-radius: 4px;
  transition: left 0.3s ease, background-color 0.3s ease;
}
</style>