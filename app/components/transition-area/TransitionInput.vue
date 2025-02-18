<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
import { debounce } from 'lodash'
import useFetchTranslate from '~/composables/useFetchTranslate'
import { addStyle, clearStyle, handleSelectLanguage, useTranslateFromSelect } from '~/composables/useTranslateFrom'

const emit = defineEmits<{
  'translate-finish': [res: string[]]
  'translating': [res: boolean]
}>()
const { fetchTranslateText } = useFetchTranslate()
const languageSelected = useTranslateFromSelect()
const currentLanguage = useCurrentLanguage()
const isShowSelectPanel = ref(false)
const message = useMessage()
function switchExpandSelectLanguage() {
  isShowSelectPanel.value = !isShowSelectPanel.value
}

async function getText() {
  const $el = document.getElementById('textarea_input') as HTMLTextAreaElement
  currentLanguage.value.text = $el.value ?? ''
  try {
    translateSuccess(currentLanguage.value.text)
  }
  catch (err) {
    message.error(err)
  }
}

async function uiChangeTargetLanguage(language: string) {
  switchExpandSelectLanguage()
  handleSelectLanguage(language)
  if (currentLanguage.value.text) {
    translateSuccess(currentLanguage.value.text)
  }
}

async function translateSuccess(text: string) {
  emit('translating', true)
  try {
    const res = await fetchTranslateText(text)
    if (res) {
      emit('translate-finish', res)
    }
  }
  catch {

  }
  finally {
    emit('translating', false)
  }
}

const handlerGetText = debounce(getText, 500, { leading: false, trailing: true })
const canShowDeleteButton = computed(() => {
  return currentLanguage.value.text.length > 0
})

watchEffect(() => {
  if (currentLanguage.value.text === '') {
    clearText()
  }
})

function clearText() {
  currentLanguage.value.text = ''
  const $el = document.getElementById('textarea_input') as HTMLTextAreaElement
  if ($el) {
    $el.value = ''
    emit('translate-finish', [])
  }
}
</script>

<template>
  <div id="translate_from_area" class="transition_input inline-flex flex-col" @mouseenter="addStyle"
    @mouseleave="clearStyle">
    <header class="w-full h-[40px] cursor-pointer inline-flex items-center">
      <div class="inline-flex h-[22px] px-[2px] py-[2px] cursor-pointer hover:bg-gray-100 from_language rounded">
        <span>自动识别</span>
      </div>
      <img class="w-[16px] h-[16px] ml-[5px] mr-[5px]"
        src="https://cdn-web.caiyunapp.com/lingoCloud/newVersion/img/change.png" alt="">
      <n-dropdown trigger="hover" placement="bottom-start" :options="translateFromOptions"
        @select="uiChangeTargetLanguage">
        <div class="inline-flex h-[22px] px-[2px] py-[2px] cursor-pointer hover:bg-gray-100 from_language rounded"
          @click="uiChangeTargetLanguage">
          <span>{{ languageSelected.text }}</span>
          <img v-if="!isShowSelectPanel" class="w-[16px] h-[16px]"
            src="https://cdn-web.caiyunapp.com/lingoCloud/newVersion/img/downArrow.png" alt="">
          <img v-else class="w-[16px] h-[16px]"
            src="https://cdn-web.caiyunapp.com/lingoCloud/newVersion/img/downArrow.png" alt="">
        </div>
      </n-dropdown>

      <!-- 右侧清空内容按钮 -->
      <div v-show="canShowDeleteButton" class="w-[20px] h-[20px] ml-auto" @click="clearText">
        <img src="/img/delete.svg" class="w-full h-full" alt="">
      </div>
    </header>
    <textarea id="textarea_input" placeholder="请输入要翻译的文字" @input="handlerGetText" />
  </div>
</template>

<style scoped lang="scss">
.transition_input {
  width: 100%;
  background: white;
  //border: 1px solid transparent;
  box-shadow: 0 6px 18px #41a36f0f;
  padding: 15px 20px 20px;
  color: #333;
  border-radius: 5px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  height: 100%;

  textarea {
    flex: 1;
    resize: none;
    width: 100%;
    border: none;
    font-size: 18px !important;
    font-style: normal;
    font-weight: 500;
    line-height: 26px;
    overflow-y: auto;

    &:focus {
      //outline: none;
    }

    &:focus-visible {
      outline: none;
    }
  }

  header {
    .from_language {
      vertical-align: center;
    }

    span {
      color: #000000e0;
      font-size: 13px;
      font-weight: 500;
      vertical-align: middle;
      font-family: PingFang SC, sans-serif;
    }
  }
}
</style>
