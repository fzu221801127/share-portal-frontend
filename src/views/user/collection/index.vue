<template>
  <div class="dashboard-container">
    <div>
      <span>标题</span>
      <el-input
        v-model="input"
        placeholder="输入标题模糊搜索"
        style="width:500px;margin-left:1%;margin-right:1%"
        @keyup.enter.native="searchStudentByName"
      />
      <el-button type="primary" @click="searchStudentByName">搜索</el-button>
    </div>
    <br>
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="标题">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span>{{ props.row.tag }}</span>
            </el-form-item>
            <el-form-item label="发布日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="点击量">
              <span>{{ props.row.clicks }}</span>
            </el-form-item>
            <el-form-item label="详情">
              <el-link
                :underline="false"
                class="is-size-6"
                @click="detailById(props.row.id)"
              >
                {{ Substr(props.row.name, 0, 300) }}
              </el-link>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题"
        width="180"
      >
        <template slot-scope="props">
          <el-link
            :underline="false"
            class="is-size-6"
            @click="detailById(props.row.id)"
          >
            {{ Substr(props.row.name, 0, 300) }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="内容预览"
        :formatter="formatter"
      >
        <template slot-scope="props">
          <span>
            {{ Substr(props.row.address, 0, 300) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="类型"
        width="100"
        :filters="[{ text: '官方资源', value: '官方资源' }, { text: '个人资源', value: '个人资源' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '官方资源' ? 'primary' : 'success'"
            disable-transitions
          >{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="发布日期"
        sortable
        width="100"
        column-key="date"
        align="center"
      />
      <el-table-column
        prop="clicks"
        label="点击量"
        sortable
        width="100"
        column-key="clicks"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      input: '',
      tableData: [{
        id: '1',
        date: '2016-05-02',
        name: '王小虎古董车狗赛后晒哦和个骚货干啥都公司大',
        address: '上海市普陀区金沙江路 1518 弄io故事大纲十大h广佛爱好三个是故事大纲四阿哥粉碎大哥i十大是个代购i速度十大硅酸钙德国i哦i哦傻噶啥的撒大噶i哦好个傻瓜现场个傻瓜分公司的噶三国杀的刮痧噶啥的噶啥的噶啥的爱干啥噶啥噶噶啥的噶啥多个噶啥爱国散搭噶啥的噶噶啥的给沙噶啥多个沙杠杆收购按时给杀手多个艰苦撒旦和公开傻瓜啊ui给i十大固沙有啥共有四大给法院关于噶是否大于啥',
        tag: '官方资源',
        clicks: '122'
      }, {
        id: '3',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '个人资源',
        clicks: '853'
      }, {
        id: '112',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '533'
      }, {
        id: '321',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '个人资源',
        clicks: '619'
      }, {
        id: '1122',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '233'
      }, {
        id: '152',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '523'
      }, {
        id: '154',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '个人资源',
        clicks: '23'
      }]
    }
  },
  methods: {
    searchStudentByName() {
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
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
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
