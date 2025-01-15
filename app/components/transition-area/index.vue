<script setup lang="ts">
import TransitionInput from '~/components/transition-area/TransitionInput.vue'

const translateResult = ref<string[]>([])

const translateRender = computed(() => {
  return translateResult.value.join('')
})

const isTranslating = ref(false)

function changeTranslatingState(state: boolean) {
  isTranslating.value = state
}

onBeforeMount(() => {
  if (isTranslating.value) {
    isTranslating.value = false
  }
})
</script>

<template>
  <div class="transition_area_box flex-1">
    <TransitionInput @translate-finish="translateResult = $event" @translating="changeTranslatingState($event)" />
    <div class="transition_output">
      <div class="others pt-[37px]" />
      <span v-show="isTranslating" class="is_translating">正在翻译ing...</span>
      <p v-show="!isTranslating" class="text-[18px] font-weight-500">
        {{ translateRender }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.transition_area_box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(334px, 1fr));
  gap: 12px;

  .transition_input,
  .transition_output {
    width: 100%;
    height: 100%;
    background: white;
    border: 1px solid transparent;
    box-shadow: 0 6px 18px #41a36f0f;
    padding: 15px 20px 20px;
    color: #333;
    border-radius: 5px;
  }

  @media screen and (max-width: 759px) {
    grid-template-rows: repeat(2, minmax(48%, 1fr))
  }
}

.is_translating {
  background: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.7;
  font-weight: 500;
  font-size: 18px;
}
</style>
