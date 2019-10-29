<template>
  <div class="container-page">
    <!-- 头 -->
    <p>头</p>
    <!-- 内容 -->
    <div>
      <!-- 留一个坑 -->
      <slot name="content" :pn="pageName" test="测试">备用的内容</slot>
      <!-- <slot>备用的内容</slot> -->
    </div>
    <!-- 底 -->
    <p>
      <!-- 留一个坑 -->
      <slot name="footer">footer</slot>
      <!-- <slot>footer</slot> -->
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '组件内部数据'
    }
  }
}
</script>

<style scoped lang='less'></style>
