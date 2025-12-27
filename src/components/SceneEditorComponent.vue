<template>
  <input type="file" ref="fileInput" accept=".txt,text/plain" @change="uploadFile" style="display: none" />
  <div class="episode-editor-container">
    <div class="editor-title">
      <TitleComponent label="Редактирование фрагмента сцены" />
      <div class="buttons">
        <ButtonComponent label="Сохранить" @click="onSaveClick" />
        <ButtonComponent label="Отмена" @click="onCancelClick" />
      </div>
    </div>
    <q-editor class="text-editor" ref="editorRef" @paste="onPaste" v-model="editorText" :definitions="customCommands"
      :toolbar="[['upload', 'save'], ['undo', 'redo']]" />
  </div>
</template>

<script setup lang="ts">
import { EditorType } from 'src/common/enums';
import ButtonComponent from './utils/ButtonComponent.vue';
import TitleComponent from './utils/TitleComponent.vue';
import { useDocumentStore } from 'src/stores/document-store';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

interface QEditorInstance {
  runCmd: (command: string, value?: string) => void;
}

const $q = useQuasar();
const documentStore = useDocumentStore();
const editorRef = ref<QEditorInstance>();
const editorText = ref(getSceneElementText());
const fileInput = ref<HTMLInputElement | null>(null);

function getSceneElementText() {
  return documentStore.getScenes.find((scene) => scene.scene_id === documentStore.getCurrentSceneId)?.elements?.at(documentStore.getCurrentSceneElement)?.text ?? '';
}

watch(
  () => [documentStore.currentSceneId, documentStore.currentSceneElement],
  () => {
    editorText.value = getSceneElementText();
  });

async function onSaveClick() {
  try {
    $q.loading.show({ message: 'Обновление сцены...' });
    await documentStore.updateScene(editorText.value);
    $q.notify({
      type: 'positive',
      message: 'Сценарий успешно обновлён',
      position: 'top'
    });
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при обновлении сценария',
      position: 'top'
    });
  } finally {
    $q.loading.hide();
  }
}

function onCancelClick() {
  documentStore.setEditorMode(EditorType.SCENARIO);
}

function onPaste(evt: ClipboardEvent) {
  const target = evt.target as HTMLElement;

  if (target.nodeName === 'INPUT') return;

  evt.preventDefault();
  evt.stopPropagation();

  let text: string | null = null;
  let onPasteStripFormattingIEPaste: boolean | undefined;

  const editor = editorRef.value as unknown as QEditorInstance;

  if (!editor) {
    console.error('Editor reference is not available');
    return;
  }

  if (evt.clipboardData) {
    text = evt.clipboardData.getData('text/plain');
    if (text) {
      editor.runCmd('insertText', text);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  else if ((window as any).clipboardData && (window as any).clipboardData.getData) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text = (window as any).clipboardData.getData('Text');
    if (text && !onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true;
      editor.runCmd('ms-pasteTextOnly', text);
    }
    onPasteStripFormattingIEPaste = false;
  }
}

function triggerFileInput() {
  fileInput.value?.click();
};

function uploadFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) {
    return;
  }

  if (!isValidTextFile(file)) {
    $q.notify({
      type: 'negative',
      message: 'Пожалуйста, выберите валидный TXT файл',
      position: 'top'
    });

    console.error('Invalid file format');
    resetFileInput();
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      editorText.value = content;
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Ошибка при чтении файла',
        position: 'top'
      });
      console.error('File reading error:', error);
    }
  };

  reader.onerror = () => {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при чтении файла',
      position: 'top'
    });
  };

  reader.readAsText(file);
};

function isValidTextFile(file: File): boolean {
  const fileName = file.name.toLowerCase();
  if (!fileName.endsWith('.txt')) {
    return false;
  }

  const validMimeTypes = [
    'text/plain',
    'text/html',
    'application/octet-stream'
  ];

  if (file.type && !validMimeTypes.includes(file.type)) {
    return false;
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return false;
  }

  return true;
};

function resetFileInput() {
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

function downloadFile() {
  if (!editorText.value || !editorText.value.length) {
    $q.notify({
      type: 'negative',
      message: 'Нет содержимого для скачивания',
      position: 'top'
    });
    return;
  }

  try {
    const blob = new Blob([editorText.value], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `Фрагмент-сцены-${documentStore.getCurrentSceneId}.txt`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при скачивании файла',
      position: 'top'
    });
    console.error('Download error:', error);
  }
};

const customCommands = {
  save: {
    tip: 'Скачать фрагмент сценария на устройство в виде TXT файла',
    icon: 'save',
    label: 'Скачать',
    handler: downloadFile
  },
  upload: {
    tip: 'Загрузить в редактор TXT файл с устройства',
    icon: 'cloud_upload',
    label: 'Загрузить с устройства',
    handler: triggerFileInput
  }
}
</script>

<style lang="scss" scoped>
.episode-editor-container {
  display: flex;
  flex-direction: column;
  justify-items: space-between;
  height: calc(80vh - 74px);
}

.text-editor {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background-color: #F9FAFC;
}

.editor-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.buttons {
  display: flex;
  flex-direction: row;
}
</style>