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
      <p>密码:</p>
      <el-input v-model="password" placeholder="请输入内容" style="width:70%" />
      <el-button style="margin-top:10px;margin-left:38%" @click="updatePassword()">修改密码</el-button>
      <p>手机:</p>
      <el-input v-model="phoneNumber" placeholder="请输入内容" style="width:70%" :disabled="true" />
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
    return {
      list: null,
      listLoading: true,
      id: '',
      nickname: '',
      birthday: '',
      signature: '',
      password: '',
      phoneNumber: '',
      img: require('@/assets/preview.jpg')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.$session.get('userinfo') != null) {
        var userinfo = this.$session.get('userinfo')
        console.log(userinfo.id)
        this.id = userinfo.id
        this.nickname = userinfo.nickname
        this.birthday = userinfo.birthday
        this.signature = userinfo.signature
        this.phoneNumber = userinfo.phoneNumber
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
      console.log('进入updateUserMessage')
      updateUser(user).then(response => {
        if (response) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          getUserInfoById(this.id).then(response => {
            var message = response.message
            if (message === 'Success') {
              // console.log('response:')
              // console.log(response)
              this.$session.set('userinfo', response)
              var userinfo = this.$session.get('userinfo')
              console.log('userinfo:')
              console.log(userinfo)
            }
          })
        }
      })
    }
  }
}
</script>
