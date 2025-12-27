export enum EditorType {
  SCENARIO = 'Scenario',
  SCENE = 'Scene',
}

export enum EpisodeCategory {
  LEXICA = 'lexica',
  VIOLENCE = 'violence',
  EROTIC = 'erotic',
  SUBSTANCES = 'substances',
  FEAR = 'fear',
}

export enum SeverityType {
  MILD = 1,
  MODERATE = 2,
  SEVERE = 3,
}

export enum ScenarioRating {
  CLEAR = 0, //0+
  LOW = 1, //6+
  MEDIUM = 2, //12+
  HARD = 3, //16+
  HIGH = 4, //18+
}

export enum SceneElementType {
  ACTION = 'action',
  SPEAKER = 'speaker',
  DIALOGUE = 'dialogue',
  TRANSITION = 'transition',
  PARENTHETICAL = 'parenthetical',
}

export enum MarkType {
  FP = 'FP',
  FN = 'FN',
}

export enum ReportType {
  HTML = 'html',
  PDF = 'pdf',
}
