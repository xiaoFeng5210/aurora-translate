<script setup lang="ts">
const message = useMessage()
onBeforeMount(async () => {
  try {
    await $fetch('/api/ping', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  catch {
    message.error('网络不稳定，请先检查您的网络～')
  }
})
</script>

<template>
  <div class="flex-1 flex flex-col">
    <TransitionArea />
    <div class="w-full h-[86px] mt-[10px]" />
  </div>
</template>

<style scoped></style>
