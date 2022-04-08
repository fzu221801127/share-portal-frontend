<template>
  <div class="dashboard-container">
    <div :style="{backgroundImage: 'url(' + img + ')'}" class="table">
      <div style="float:left;width:45.6%" :style="{backgroundImage: 'url(' + img + ')'}" class="table">
        <el-table
          ref="filterTable"
          v-loading="listLoading"
          :data="list"
          style="width: 100%;color:#409EFF"
          :show-header="false"
        >
          <el-table-column
            prop="title"
            width="180"
          >
            <template slot-scope="props">
              <el-link
                :underline="false"
                class="is-size-6"
                style="color:#409EFF"
                @click="detailById(props.row.id)"
              >
                {{ Substr(props.row.title, 0, 250) }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            width="100"
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
            width="100"
            column-key="releasetime"
            align="center"
          />
          <el-table-column
            prop="click"
            width="100"
            column-key="click"
            align="center"
          />
        </el-table>
      </div>
      <div style="float:right;width:54.4%;height:777.8px" :style="{backgroundImage: 'url(' + img + ')'}" class="table">
        <v-TopTenClickPost />
      </div>
    </div>
  </div>
</template>

<script>
import { getTopTenClickPost } from '@/api/post'
import { logout, getInfo } from '@/api/user'
import TopTenClickPost from '@/components/Table/TopTenClickPost'

export default {
  components: {
    'v-TopTenClickPost': TopTenClickPost
  },
  data() {
    return {
      img: require('@/assets/preview.jpg'),
      input: '',
      list: null,
      listLoading: true,
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎古董车狗赛后晒哦和个骚货干啥都公司大',
        address: '上海市普陀区金沙江路 1518 弄io故事大纲十大h广佛爱好三个是故事大纲四阿哥粉碎大哥i十大是个代购i速度十大硅酸钙德国i哦i哦傻噶啥的撒大噶i哦好个傻瓜现场个傻瓜分公司的噶三国杀的刮痧噶啥的噶啥的噶啥的爱干啥噶啥噶噶啥的噶啥多个噶啥爱国散搭噶啥的噶噶啥的给沙噶啥多个沙杠杆收购按时给杀手多个艰苦撒旦和公开傻瓜啊ui给i十大固沙有啥共有四大给法院关于噶是否大于啥',
        tag: '官方资源',
        clicks: '122'
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '个人资源',
        clicks: '853'
      }, {
        id: 112,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '533'
      }, {
        id: 321,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '个人资源',
        clicks: '619'
      }, {
        id: 1122,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '233'
      }, {
        id: 152,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '523'
      }, {
        id: 154,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '个人资源',
        clicks: '23'
      }],
      currentPage: 1,
      pageSize: 10,
      total: 1
    }
  },
  created() {
    if (this.$session.get('userinfo') != null) {
      var userinfo = this.$session.get('userinfo')
      console.log(userinfo.id)
    } else {
      logout()
      getInfo().then(res => {
        console.log('res:')
        console.log(res)
      })
    }
    this.fetchData()
    // eslint-disable-next-line no-undef
  },
  methods: {
    fetchData() {
      // console.log('加载表格')
      // this.listLoading = true
      // getPostPageList(this.currentPage, this.pagesize).then(response => {
      //   this.list = response.page.list
      //   this.total = response.page.total
      //   this.listLoading = false
      //   console.log(response)
      // })
      this.listLoading = true
      getTopTenClickPost().then(response => {
        this.list = response
        this.currentPage = 1
        this.total = 10
        this.listLoading = false
      })
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
    formatter(row, column) {
      return row.content
    },
    filterTag(value, row) {
      return row.type === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    }
  }
}

</script>

<style lang="stylus" scoped>
/*最外层透明*/
>>>  .el-table, >>>  .el-table__expanded-cell
  background-color transparent

/* 表格内背景颜色 */
>>>  .el-table th, >>>  .el-table tr, >>>  .el-table td
  background-color transparent
</style>
