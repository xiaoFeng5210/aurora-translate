<script setup lang="ts">
import {addStyle, clearStyle, useTranslateFromSelect} from "~/composables/useTranslateFrom";
import {debounce} from 'lodash';

const languageSelected = useTranslateFromSelect();
const isShowSelectPanel = ref(false);

const switchExpandSelectLanguage = () => {
  isShowSelectPanel.value = !isShowSelectPanel.value;
}

function getText(event: Event) {
  console.log((event.target as HTMLTextAreaElement).value);
}

const handlerGetText = debounce(getText, 500, {leading: false, trailing: true});

</script>

<template>
  <div id="translate_from_area" class="transition_input inline-flex flex-col" @mouseenter="addStyle"
       @mouseleave="clearStyle">
    <header class="w-full h-[40px] cursor-pointer inline-flex items-center">
      <div class="inline-flex h-[22px] px-[2px] py-[2px] cursor-pointer hover:bg-gray-100 from_language rounded"
           @click="switchExpandSelectLanguage">
        <span>{{ languageSelected.text }}</span>
        <img v-if="!isShowSelectPanel" class="w-[16px] h-[16px]"
             src="https://cdn-web.caiyunapp.com/lingoCloud/newVersion/img/downArrow.png" alt="">
        <img v-else class="w-[16px] h-[16px]"
             src="https://cdn-web.caiyunapp.com/lingoCloud/newVersion/img/downArrow.png" alt="">
      </div>
      <img class="w-[16px] h-[16px] ml-[5px]" src="https://cdn-web.caiyunapp.com/lingoCloud/newVersion/img/change.png"
           alt="">

      <n-dropdown
          trigger="hover"
          placement="bottom-start"
          :options="translateFromOptions"
          @select="handleSelectLanguage"
      >
        <div class="inline-flex h-[22px] px-[2px] py-[2px] cursor-pointer hover:bg-gray-100 from_language rounded"
             @click="switchExpandSelectLanguage">
          <span>{{ languageSelected.text }}</span>
          <img v-if="!isShowSelectPanel" class="w-[16px] h-[16px]"
               src="https://cdn-web.caiyunapp.com/lingoCloud/newVersion/img/downArrow.png" alt="">
          <img v-else class="w-[16px] h-[16px]"
               src="https://cdn-web.caiyunapp.com/lingoCloud/newVersion/img/downArrow.png" alt="">
        </div>
      </n-dropdown>
    </header>
    <textarea placeholder="请输入要翻译的文字" @input="handlerGetText"></textarea>
  </div>
</template>

<style scoped lang="scss">
.transition_input {
  width: 100%;
  height: 100%;
  background: white;
  //border: 1px solid transparent;
  box-shadow: 0 6px 18px #41a36f0f;
  padding: 15px 20px 20px;
  color: #333;
  border-radius: 5px;
  box-sizing: border-box;

  textarea {
    min-height: 240px;
    cursor: pointer;
    resize: none;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 18px !important;
    font-style: normal;
    font-weight: 500;
    line-height: 26px;
    overflow: auto;

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