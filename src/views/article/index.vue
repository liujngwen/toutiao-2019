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
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 :">
          <!-- 频道组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
          <!-- <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="日期 :">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结构布局 -->
    <!-- <page> -->
    <!-- <slot></slot> -->
    <!-- scope作用域 作用：收集该插槽传入的所有数据-->

    <!-- <div slot="content" slot-scope="scope">新的{{ scope.test }}</div> -->
    <!-- <div slot="content" slot-scope="scope">新的{{ scope.fn }}</div> -->
    <!-- 新的语法 -->
    <!-- <template v-slot:content="scope">新的{{ scope.test }}</template>
    <div slot="footer">底部的内容</div>-->
    <!-- </page> -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件查询到{{ total }}条结果</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 第一张封面图 -->
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" width="150p" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1" >待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="toDel(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:20px"
      background layout="prev, pager, next"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      :total="total"
      @current-change="pager"
      ></el-pagination>
  </div>
</template>

<script>
// import Page from '@/test/page'
export default {
  // components: { Page },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 当前页码 每一页显示条数
        page: 1,
        per_page: 12
      },
      // 文章条数
      total: 0,
      channelOptions: [
        // { value: 1, label: 'java' },
        // { value: 2, label: '前端' }
      ],
      // 日期数组
      dateArr: [],
      // 文章列表
      articles: []
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // // 获取频道选项数据
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 获取文章列表数据
    async getArticles () {
      // 第一种： axios.get(url?key=value&key1=vaule1&...) get传参
      // 第二种： axios.get(url, {params:参数对象})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值文章列表依赖数据
      this.articles = data.results
      // 赋值文章总条数依赖数据
      this.total = data.total_count
    },
    // 分页功能
    pager (newPage) {
      // 根据新的页码和当前的筛选条件 重新查询数据即可
      this.reqParams.page = newPage
      this.getArticles()
    },
    changeDate (dateArr) {
      // dateArr 的数据格式：[date,date]
      // 后端需要的是字符串格   dateArr 的数据格式：[string,string]
      // 注意：清除选择的日期后  dateArr的值 null
      console.log(dateArr)
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      // 准备日期数据
      // 进行数据获取
      // 如果频道的值 '' 时候 修改为 null
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      // 回到第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    async toDel (id) {
      await this.$http.delete(`articles/${id}`)
      this.$message.success('删除文章成功')
      this.getArticles()
    }
  }
}
</script>

<style scoped lang='less'></style>
