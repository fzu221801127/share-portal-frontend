<template>
  <div class="app-container" :style="{backgroundImage: 'url(' + img + ')'}" style="color:white;position: absolute;top:0;left:0;right:0;bottom:0">
    <div style="width:30%;float:left;margin-top:3%;margin-left:5%;">
      <p>用户昵称</p>
      <el-input v-model="input1" placeholder="请输入内容" style="width:70%" />
      <p>生日</p>
      <el-input v-model="input2" placeholder="请输入内容" style="width:70%" />
      <p>签名</p>
      <el-input v-model="input3" placeholder="请输入内容" style="width:70%" />
      <el-button style="margin-top:20px;margin-left:20%">修改</el-button>
    </div>
    <div style="width:30%;float:left;margin-top:6%;margin-left:5%">
      <p>密码:</p>
      <el-input v-model="input4" placeholder="请输入内容" style="width:70%" />
      <el-button style="margin-top:10px;margin-left:38%">修改密码</el-button>
      <p>手机:</p>
      <el-input v-model="input5" placeholder="请输入内容" style="width:70%" :disabled="true" />
    </div>
    <div style="width:30%;float:left">
      <img
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        alt="头像"
        style="width: 12%;height: 25%;position: absolute;right:10%;top: 5%;"
      >
      <button style="width: 10%;height: 5%;position: absolute;right:11%;top: 32%;">修改头像</button>
    </div>
  </div>
</template>

<script>

export default {
  filters: {
  },
  data() {
    return {
      list: null,
      listLoading: true,
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      img: require('@/assets/preview.jpg')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

    }
  }
}
</script>
