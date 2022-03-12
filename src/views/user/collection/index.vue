<template>
  <div class="dashboard-container">
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <!--最左边尖括号展开-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="发布日期">
              <span>{{ props.row.releasetime }}</span>
            </el-form-item>
            <el-form-item label="点击量">
              <span>{{ props.row.click }}</span>
            </el-form-item>
            <el-form-item label="跳转到详情">
              <el-link
                :underline="false"
                class="is-size-6"
                @click="detailById(props.row.id)"
              >
                {{ Substr(props.row.title, 0, 300) }}
              </el-link>
            </el-form-item>
            <el-form-item label="内容" style="width:100%">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180"
      >
        <template slot-scope="props">
          <el-link
            :underline="false"
            class="is-size-6"
            @click="detailById(props.row.id)"
          >
            {{ Substr(props.row.title, 0, 250) }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容预览"
        :formatter="formatter"
      >
        <template slot-scope="props">
          <span>
            {{ Substr(props.row.content, 0, 250) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100"
        :filters="[{ text: '官方资源', value: '官方资源' }, { text: '个人资源', value: '个人资源' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === '官方资源' ? 'primary' : 'success'"
            disable-transitions
          >{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="releasetime"
        label="发布日期"
        sortable
        width="100"
        column-key="releasetime"
        align="center"
      />
      <el-table-column
        prop="click"
        label="点击量"
        sortable
        width="100"
        column-key="click"
        align="center"
      />
      <el-table-column
        prop="opera"
        label="操作"
        width="80px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button type="text" @click="unCollectionPostById(scope.row.id)">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCollectionPostListByUserId, userUnCollectPost } from '@/api/collection'
import { logout, getInfo } from '@/api/user'

export default {
  data() {
    return {
      input: '',
      listLoading: true,
      tableData: []
    }
  },
  created() {
    this.fetchData()
    // eslint-disable-next-line no-undef
  },
  methods: {
    fetchData() {
      if (this.$session.get('userinfo') != null) {
        var userinfo = this.$session.get('userinfo')
        console.log(userinfo.id)
        getCollectionPostListByUserId(userinfo.id).then(response => {
          console.log(response)
          this.tableData = response
          this.listLoading = false
        })
      } else {
        logout()
        getInfo().then(res => {
          console.log('res:')
          console.log(res)
        })
      }
    },
    unCollectionPostById(id) {
      if (this.$session.get('userinfo') != null) {
        var userinfo = this.$session.get('userinfo')
        console.log(userinfo.id)
        console.log(id)
        var collection = {
          userId: userinfo.id,
          postId: id
        }
        userUnCollectPost(collection).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.fetchData()
          }
        })
      } else {
        logout()
        getInfo().then(res => {
          console.log('res:')
          console.log(res)
        })
      }
    },
    detailById(id) {
      console.log(id)
      const routeData = this.$router.resolve({
        path: '/Detail',
        query: { key: id }
      })
      window.open(routeData.href, '_blank')
    },
    Substr(str, start, n) {
      // eslint-disable-line
      if (str.replace(/[\u4e00-\u9fa5]/g, '**').length <= n) {
        return str
      }
      let len = 0
      let tmpStr = ''
      for (let i = start; i < str.length; i++) {
        // 遍历字符串
        if (/[\u4e00-\u9fa5]/.test(str[i])) {
          // 中文 长度为两字节
          len += 2
        } else {
          len += 1
        }
        if (len > n) {
          break
        } else {
          tmpStr += str[i]
        }
      }
      return tmpStr + '...'
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.content
    },
    filterTag(value, row) {
      return row.type === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
