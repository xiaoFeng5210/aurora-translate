<script setup lang="ts">
import { filter, map, Subject } from 'rxjs'

const subject = new Subject()

subject.pipe(
  filter(event => event.type === '事件1'),
  map(event => `${event.type}123`),
).subscribe((data) => {
  console.log(data)
})

function test() {
  subject.next({ type: '事件1' })
  subject.next({ type: '事件2' })
}
</script>

<template>
  <div class="w-full h-[62px] home_actions_box">
    <!-- TODO: 操作栏 -->
    <!-- <button @click="test">
      测试
    </button> -->
  </div>
</template>

<style scoped lang="scss">
.home_actions_box {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
