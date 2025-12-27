import { defineStore } from 'pinia';
import { type MarkType, EditorType, ScenarioRating, SceneElementType } from 'src/common/enums';
import type { DocumentRawData, EpisodeData, SceneData } from 'src/common/types';
import { episodeData, sceneData } from 'src/mock/documentData';
import ApiService from 'src/services/api';

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    documentId: '2918-1897', // '0',
    editorMode: EditorType.SCENARIO, 
    episodes: episodeData, // [] as EpisodeData[],
    scenes: sceneData, // [] as SceneData[],
    currentEpisode: -1,
    currentSceneId: '',
    currentSceneElement: -1,
    scenarioRating: ScenarioRating.HARD,
    highlightedSceneIndex: -1,
    highlightedElementIndex: -1,
    analysisStatus: 'unknown' as 'unknown' | 'processing' | 'completed' | 'failed',
  }),

  getters: {
    getDocumentId: (state) => state.documentId,
    getEditorMode: (state) => state.editorMode,
    getEpisodes: (state) => state.episodes,
    getCurrentEpisode: (state) => state.currentEpisode,
    getCurrentSceneId: (state) => state.currentSceneId,
    getCurrentSceneElement: (state) => state.currentSceneElement,
    getScenarioRating: (state) => state.scenarioRating,
    getHighlightedSceneIndex: (state) => state.highlightedSceneIndex,
    getHighlightedElementIndex: (state) => state.highlightedElementIndex,
    getScenes: (state) => state.scenes,
    getAnalysisStatus: (state) => state.analysisStatus,
  },

  actions: {
    setDocumentId(documentId: string) {
      this.documentId = documentId;
    },
    setEditorMode(
      editorMode: EditorType,
      sceneId: string = '',
      sceneElement: number = -1,
      episodeIndex: number = -1,
    ) {
      this.editorMode = editorMode;
      this.currentSceneId = sceneId;
      this.currentSceneElement = sceneElement;
      this.currentEpisode = episodeIndex;
    },
    setEpisodes(episodes: EpisodeData[]) {
      this.episodes = episodes;
    },
    setScenarioRating(scenarioRating: ScenarioRating) {
      this.scenarioRating = scenarioRating;
    },
    setScenes(scenes: SceneData[]) {
      this.scenes = scenes;
    },
    highlightElement(sceneIndex: number, elementIndex: number) {
      this.highlightedSceneIndex = sceneIndex;
      this.highlightedElementIndex =
        this.scenes[sceneIndex]?.elements?.at(elementIndex)?.type === SceneElementType.DIALOGUE
          ? elementIndex - 1
          : elementIndex;
    },
    resetHighlight() {
      this.highlightedSceneIndex = -1;
      this.highlightedElementIndex = -1;
    },
    resetCurrentElement() {
      this.currentEpisode = -1;
      this.currentSceneId = '';
      this.currentSceneElement = -1;
    },
    loadDocument(documentData: DocumentRawData) {
      this.documentId = documentData.doc_id;
      this.scenes = documentData.scenes;
      this.episodes = documentData.episodes;
      this.scenarioRating =
        (documentData.rating as unknown as string) === '0+'
          ? ScenarioRating.CLEAR
          : documentData.rating;
      this.resetHighlight();
      this.setEditorMode(EditorType.SCENARIO);
    },
    async getDocumentData(documentId: string) {
      const documentData = await ApiService.getResult(documentId);
      if (documentData) {
        this.loadDocument(documentData);
        this.analysisStatus = documentData.analysis_status || 'unknown';
        this.resetHighlight();
        this.setEditorMode(EditorType.SCENARIO);
      }
    },
    async analyzeFile(file: File) {
      const documentData = await ApiService.analyzeDocument(file);
      if (documentData) {
        this.analysisStatus = 'processing';
      }
      return documentData;
    },
    async updateScene(text: string) {
      await ApiService.updateScene(this.currentSceneId, this.currentSceneElement, text);
    },
    async markEpisode(episodeIndex: number, markType: MarkType) {
      const documentData = await ApiService.markEpisode(
        episodeIndex,
        markType,
        'Marked as ' + markType,
      );
      if (documentData) {
        this.loadDocument(documentData);
      }
    },
  },
});
