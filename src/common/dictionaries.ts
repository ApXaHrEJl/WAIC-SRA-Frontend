import { EpisodeCategory, ScenarioRating, SeverityType } from './enums';

export interface LabelData {
  color: string;
  label: string;
}

export const severityData: Record<SeverityType, LabelData> = {
  [SeverityType.MILD]: { color: 'green-8', label: 'Mild' },
  [SeverityType.MODERATE]: { color: 'yellow-8', label: 'Moderate' },
  [SeverityType.SEVERE]: { color: 'red-6', label: 'Severe' },
};

export const ratingData: Record<ScenarioRating, LabelData> = {
  [ScenarioRating.CLEAR]: { color: 'grey', label: '0+' },
  [ScenarioRating.LOW]: { color: 'green', label: '6+' },
  [ScenarioRating.MEDIUM]: { color: 'goldenrod', label: '12+' },
  [ScenarioRating.HARD]: { color: 'darkorange', label: '16+' },
  [ScenarioRating.HIGH]: { color: 'red', label: '18+' },
};

export const categoryLabel: Record<EpisodeCategory, string> = {
  [EpisodeCategory.LEXICA]: 'Ненормативная лексика',
  [EpisodeCategory.VIOLENCE]: 'Насилие',
  [EpisodeCategory.EROTIC]: 'Эротика',
  [EpisodeCategory.SUBSTANCES]: 'Вещества',
  [EpisodeCategory.FEAR]: 'Страх',
};

type categorySeverity = `${EpisodeCategory}-${SeverityType}`;
export interface Annotation {
  reason: string;
  recommendation: string;
}
type AnnotationData = {
  [key in categorySeverity]?: Annotation;
};

export const annotationData: AnnotationData = {
  'violence-1': {
    reason: 'Упоминание конфликта, но без видимых деталей',
    recommendation: 'Допустимо на 0+/6+/12+, вырезать для снижения рейтинга',
  },
  'violence-2': {
    reason:
      'Видимое насилие с реальными последствиями, но без натуралистичного описания. Кровь и раны есть, но не в фокусе',
    recommendation: 'Допустимо для 12+/16+, вырезать для снижения рейтинга',
  },
  'violence-3': {
    reason:
      'Натуралистичное, подробное описание насилия. Пытки, издевательство, убийство или долгое мучение показаны с деталями',
    recommendation:
      'Только 18+, для снижения рейтинга - оставить за кадром, полностью переделать или убрать сцену',
  },
  'substances-1': {
    reason:
      'Упоминание или видимое присутствие алкогольных напитков или сигарет, но нет показа потребления. Культурный/исторический контекст',
    recommendation: 'Допустимо на 6+/12+, для снижения рейтинга - убрать',
  },
  'substances-2': {
    reason:
      'Показано потребление алкоголя/табака, есть видимые эффекты (невнятная речь, опьянение), долгое потребление или последствия',
    recommendation:
      'Допустимо для 12+/16+, для снижения рейтинга - убрать сцену потребления, акцентировать внимание на отрицательных последствиях',
  },
  'substances-3': {
    reason:
      'Пропаганда наркотиков, подробное описание процесса, рекомендация как способ решения проблем',
    recommendation:
      'Только 18+, для снижения рейтинга убрать пропаганду, оставить только факты потребления с акцентом на отрицательные последствия',
  },
  'erotic-1': {
    reason: 'Влечение, поцелуй или обнимание, но без раздевания или намёков на интимность',
    recommendation: 'Допустимо для 6+/12+, для снижения рейтинга снизить напряжение',
  },
  'erotic-2': {
    reason:
      'Более откровенная сцена с намёком на интимность, видно раздевание или обнаженные тела, но самый акт за кадром или без деталей',
    recommendation:
      'Допустимо для 12+/16+, для 6+ — убрать раздевание, оставить только обнимание или поцелуй, для 0+ — убрать сцену полностью',
  },
  'erotic-3': {
    reason:
      'Подробное описание сексуального акта, видны интимные детали, сексуальное насилие или инцест',
    recommendation: 'Только 18+, для снижения рейтинга - убрать сцену или оставить за кадром',
  },
  'lexica-1': {
    reason: 'Грубые выражения или мягкие бранные слова, но не откровенная обсценная лексика',
    recommendation:
      'Допустимо для +6, характеристика персонажа, для более юной аудитории — заменить эвфемизмом',
  },
  'lexica-2': {
    reason:
      'Открытая обсценная лексика (русские мат-слова, аналоги), но не в каждой реплике. Характеристика персонажа или эмоциональный момент',
    recommendation:
      'Только для 16+/18+, для 12+ — заменить на эвфемизмы, для 6+ — убрать мат полностью',
  },
  'lexica-3': {
    reason:
      'Постоянная обсценная лексика в реплике, откровенные ругательства, оскорбления национальности/религии',
    recommendation:
      'Только 18+, для снижения рейтинга - сократить матерные слова, оставить только в ключевых моментах или заменить',
  },
  'fear-1': {
    reason: 'Герой испуган, но причина понятна и безопасна. Быстро объясняется или разрешается',
    recommendation: 'Допустимо для 6+/12+, для снижения рейтинга - смягчить напряжение',
  },
  'fear-2': {
    reason: 'Герой боится долго, атмосфера напряжения, неопределённость (может быть опасность)',
    recommendation:
      'Допустимо для 12+/16+, для 6+ — сократить напряжение, добавить быстрое разрешение ситуации или убрать сцену полностью',
  },
  'fear-3': {
    reason: 'Герой в полной панике или долго в психозе, кошмары/ловушки повторяются, нет выхода',
    recommendation:
      'Только 18+, для снижения рейтинга - сократить время страха, добавить спасение или оставить последствия паники, но не процесс',
  },
};

export const getAnnotation = (category: EpisodeCategory, severity: SeverityType): Annotation => {
  const key: categorySeverity = `${category}-${severity}`;
  return annotationData[key]!;
};
