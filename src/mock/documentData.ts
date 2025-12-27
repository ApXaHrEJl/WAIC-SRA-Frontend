import type { EpisodeData, SceneData } from 'src/common/types';
import { SeverityType, SceneElementType, EpisodeCategory, MarkType } from 'src/common/enums';

export const sceneData: SceneData[] = [
  {
    scene_id: 'A001',
    header: 'Сцена A001',
    cast: ['Миланья', 'Кто-то', 'Конь в Пальто'],
    elements: [
      {
        type: SceneElementType.ACTION,
        text: 'Текст элемента типа Action. Текст элемента типа Action. Текст элемента типа Action.',
      },
      {
        type: SceneElementType.SPEAKER,
        text: 'Миланья',
      },
      {
        type: SceneElementType.DIALOGUE,
        text: 'Реплика Миланьи',
      },
      {
        type: SceneElementType.SPEAKER,
        text: 'Конь в Пальто',
      },
      {
        type: SceneElementType.DIALOGUE,
        text: 'Реплика Коня в Пальто',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст элемента типа Action. Текст элемента типа Action. Текст элемента типа Action.',
      },
      {
        type: SceneElementType.TRANSITION,
        text: 'Текст элемента типа Transition. Текст элемента типа Transition. Текст элемента типа Transition.',
      },
    ],
  },
  {
    scene_id: 'A002',
    header: 'Сцена A002',
    cast: ['Спикер А', 'Спикер Б'],
    elements: [
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст текст',
      },
      {
        type: SceneElementType.SPEAKER,
        text: 'Спикер А',
      },
      {
        type: SceneElementType.DIALOGUE,
        text: 'Текст текст текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
      {
        type: SceneElementType.ACTION,
        text: 'Текст текст',
      },
    ],
  },
];

export const episodeData: EpisodeData[] = [
  {
    scene_id: 'A001',
    category: EpisodeCategory.VIOLENCE,
    severity: SeverityType.MILD,
    quote: 'Удар ножом в спину персонажа.',
    position: 3,
  },
  {
    scene_id: 'A001',
    category: EpisodeCategory.LEXICA,
    severity: SeverityType.MODERATE,
    quote: '"... да пошел ты!"',
    position: 4,
  },
  {
    scene_id: 'A002',
    category: EpisodeCategory.LEXICA,
    severity: SeverityType.SEVERE,
    quote: '"... твою ж мать!"',
    position: 10,
  },
  {
    scene_id: 'A002',
    category: EpisodeCategory.FEAR,
    severity: SeverityType.SEVERE,
    quote: 'Увидев смерть стольких людей, он...',
    position: 20,
    marked_as: MarkType.FN,
  },
  {
    scene_id: 'A002',
    category: EpisodeCategory.SUBSTANCES,
    severity: SeverityType.SEVERE,
    quote: '"Бро, да с нее ничего не будет"',
    position: 30,
  },
  {
    scene_id: 'A002',
    category: EpisodeCategory.EROTIC,
    severity: SeverityType.SEVERE,
    quote: '<подробное описание сексуального акта>',
    position: 40,
  },
];
