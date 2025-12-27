<template>
  <div class="episodes-container">
    <div class="episodes-title">
      <TitleComponent label="Эпизоды" />
      <div class="filters" v-if="documentStore.episodes.length">
        <q-btn-dropdown unelevated no-caps v-close-popup color="deep-orange"
          :label="currentCategory ? categoryLabel[currentCategory as EpisodeCategory] : 'Все категории'">
          <q-list>
            <q-item v-for="(category, i) of categoryOptions" v-bind:key="i" clickable v-close-popup
              @click="onCategoryChange(category as EpisodeCategory)">
              <q-item-section>
                <q-item-label>{{ category ? categoryLabel[category] : 'Все категории' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown unelevated no-caps v-close-popup
          :color="currentSeverity ? severityData[currentSeverity as SeverityType].color : 'deep-orange'"
          :label="currentSeverity ? severityData[currentSeverity as SeverityType].label : 'Все типы'">
          <q-list>
            <q-item v-for="(severity, j) of severityOptions" v-bind:key="j" clickable v-close-popup
              @click="onSeverityChange(severity as SeverityType)">
              <q-item-section>
                <q-item-label>{{ severity ? severityData[severity as SeverityType].label : 'Все типы' }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <div class="episodes-list q-pa-md">
      <div v-for="(episode, index) of documentStore.episodes" v-bind:key='index'>
        <EpisodeCardComponent v-if="isEpisodeEnabled(episode)" :episode-data="episode" :episode-index="index"
          class="episode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EpisodeCardComponent from './EpisodeCardComponent.vue';
import TitleComponent from './utils/TitleComponent.vue';
import { useDocumentStore } from 'src/stores/document-store';
import { EpisodeCategory, SeverityType } from 'src/common/enums';
import { categoryLabel, severityData } from 'src/common/dictionaries';
import type { EpisodeData } from 'src/common/types';

const documentStore = useDocumentStore();

const categoryOptions = [undefined, ...Object.values(EpisodeCategory)];
const severityOptions = [undefined, ...Object.values(SeverityType).filter((value) => { return typeof value === 'number' })];

const currentCategory = ref();
const currentSeverity = ref();

function onCategoryChange(category: EpisodeCategory) {
  currentCategory.value = category;
}

function onSeverityChange(severity: SeverityType) {
  currentSeverity.value = severity;
}

function isEpisodeEnabled(episode: EpisodeData) {
  if ((currentCategory.value && currentCategory.value !== episode.category)
    || (currentSeverity.value && currentSeverity.value !== episode.severity)) {
    return false;
  }
  return true;
}

</script>

<style lang="scss" scoped>
.episodes-container {
  display: flex;
  flex-direction: column;
  height: calc(80vh - 74px);
}

.episodes-list {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background-color: #F9FAFC;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
}

.episodes-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.filters {
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 32px;
}

.episode {
  padding-bottom: 16px;
}
</style>