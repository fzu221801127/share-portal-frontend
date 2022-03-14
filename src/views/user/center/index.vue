<template>
  <div class="app-container" :style="{backgroundImage: 'url(' + img + ')'}" style="color:white;position: absolute;top:0;left:0;right:0;bottom:0">
    <div style="width:30%;float:left;margin-top:3%;margin-left:5%;">
      <p>用户昵称</p>
      <el-input v-model="nickname" placeholder="请输入内容" style="width:70%" />
      <p>生日</p>
      <el-input v-model="birthday" placeholder="请输入内容" style="width:70%" />
      <p>签名</p>
      <el-input v-model="signature" :rows="3" type="textarea" placeholder="请输入内容" style="width:70%" />
      <el-button style="margin-top:20px;margin-left:20%" @click="updateUserMessage()">修改</el-button>
    </div>
    <div style="width:30%;float:left;margin-top:6%;margin-left:5%">
      <el-form :rules="rules" :model="form">
        <el-form-item prop="password">
          <p>密码:</p>
          <el-input v-model="form.password" placeholder="请输入内容" style="width:70%" show-password />
          <el-button style="margin-top:10px;margin-left:38%" @click="updatePassword()">修改密码</el-button>
        </el-form-item>
        <el-form-item prop="phoneNumber">
          <p>手机:</p>
          <el-input v-model="form.phoneNumber" placeholder="请输入内容" style="width:70%" :disabled="true" />
        </el-form-item>
      </el-form>
    </div>
    <div style="width:30%;float:left">
      <img
        src="https://img0.baidu.com/it/u=3725297972,3236585201&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
        alt="头像"
        style="width: 12%;height: 25%;position: absolute;right:10%;top: 5%;"
      >
      <button style="width: 10%;height: 5%;position: absolute;right:11%;top: 32%;">修改头像</button>
    </div>
  </div>
</template>

<script>
import { logout, getInfo } from '@/api/user'
import { updateUser, getUserInfoById } from '@/api/portalUser'

export default {
  filters: {
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('新密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      listLoading: true,
      id: '',
      nickname: '',
      birthday: '',
      signature: '',
      form: {
        password: '',
        phoneNumber: ''
      },
      img: require('@/assets/preview.jpg'),
      rules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.$session.get('userinfo') != null) {
        var userinfo = this.$session.get('userinfo')
        this.id = userinfo.id
        getUserInfoById(this.id).then(response => {
          var message = response.message
          if (message === 'Success') {
            this.$session.set('userinfo', response)
            var userinfo = this.$session.get('userinfo')
            console.log('userinfo:')
            console.log(userinfo)
            this.nickname = userinfo.nickname
            this.birthday = userinfo.birthday
            this.signature = userinfo.signature
            this.form.phoneNumber = userinfo.phoneNumber
            this.form.password = this.$session.get('password')
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
    updateUserMessage() {
      var user = {
        id: this.id,
        nickname: this.nickname,
        birthday: this.birthday,
        signature: this.signature
      }
      updateUser(user).then(response => {
        if (response) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: '更新失败!'
          })
        }
      })
    },
    updatePassword() {
      var user = {
        id: this.id,
        password: this.form.password
      }
      updateUser(user).then(response => {
        if (response) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: '修改失败!'
          })
        }
      })
    }
  }
}
</script>
