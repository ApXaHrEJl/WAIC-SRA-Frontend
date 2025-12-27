import type {
  EpisodeCategory,
  MarkType,
  ScenarioRating,
  SceneElementType,
  SeverityType,
} from './enums';

export interface SceneData {
  scene_id: string;
  header: string;
  cast: string[];
  note?: string;
  elements?: SceneElementData[];
}

export interface SceneElementData {
  type: SceneElementType;
  text: string;
}

export interface EpisodeData {
  scene_id: string;
  position: number;
  category: EpisodeCategory;
  severity: SeverityType;
  quote: string;
  marked_as?: MarkType;
}

export interface DocumentRawData {
  doc_id: string;
  scenes: SceneData[];
  episodes: EpisodeData[];
  rating: ScenarioRating;
  analysis_status?: 'unknown' | 'processing' | 'completed' | 'failed';
}
