<template>
  <div>
  <el-card>
    <div slot="header">
      <my-bread>内容管理</my-bread>
    </div>
    <!-- 表单 -->
    <el-form label-width="80px" size="small">
      <el-form-item label="状态 :">
        <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>.
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道 :">
        <el-select v-model="reqParams.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期 :">
        <el-date-picker
          v-model="dateArr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 筛选结构布局 -->
    <page>
      <!-- <slot></slot> -->
      <!-- scope作用域 作用：收集该插槽传入的所有数据-->

      <!-- <div slot="content" slot-scope="scope">新的{{ scope.test }}</div> -->
      <!-- <div slot="content" slot-scope="scope">新的{{ scope.fn }}</div> -->
      <!-- 新的语法 -->
      <template v-slot:content="scope">新的{{ scope.test }}</template>

      <div slot="footer">底部的内容</div>
    </page>
  </div>
</template>

<script>
import Page from '@/test/page'
export default {
  components: { Page },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [
        { value: 1, label: 'java' },
        { value: 2, label: '前端' }
      ],
      // 日期数组
      dateArr: []
    }
  }
}
</script>

<style scoped lang='less'></style>
