<template>
   <body>
  <div class="">
    <img alt="background" class="bg" src="@/imgs/reset.png" />
  </div>
  </body>
  <el-input
      class="input2"
      v-model="username"
      style="width: 240px;height: 40px; "
      placeholder="请输入用户名"
      :prefix-icon="User "
    />
    <el-input
      class="input3"
      v-model="email"
      style="width: 240px;height: 40px;"
      placeholder="请输入邮箱"
      :prefix-icon="Message"
    />
    <el-input
      class="input4"
      v-model="verificationCode"
      style="width: 240px;height: 40px;"
      placeholder="请输入验证码"
      :prefix-icon="Key"
    />
    <el-input
    class="input5"
      v-model="newPassword"
    style="width: 240px;height: 40px;"
    type="password"
    placeholder="请输入密码"
    show-password
    :prefix-icon="Lock"
  />
  <el-input
    class="input6"
      v-model="confirmPassword"
    style="width: 240px;height: 40px;"
    type="password"
    placeholder="请确认密码"
    show-password
    :prefix-icon="Lock"
  />
  <el-button 
  class="yanzheng"
  type="primary" plain>获取验证码</el-button>
  <el-button 
  
      class="botton"
      type="primary"
     
      >重置密码</el-button
    ><router-link to="/login" class="link" :style="{ fontSize: '13px' }"
      >返回登录</router-link
    >
</template>
<script lang="ts" setup>
import { Key, Message, User } from '@element-plus/icons-vue'
import { Lock} from '@element-plus/icons-vue'
import { ref } from 'vue'

const username = ref('');
const email = ref('');
const verificationCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
</script>
<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 隐藏滚动条 */
  height: 100%; /* 确保 html 和 body 占满视口 */
}

.bg {
  left: 0;
  margin: 0;
  top: 0;
  position: absolute;
  width: 100%; /* 宽度为容器宽度 */
  height: 100vh; /* 设置图片高度为视口高度 */
  object-fit: cover; /* 让图片覆盖整个元素 */
  object-position: center; /* 图片居中显示 */
}

.input2{
  position: absolute;
  top: 35%;
  right: 41.3%;
  opacity: 1;
}
.input3{
  position: absolute;
  top: 42%;
  right: 41.3%;
  opacity: 1;
}
.input4{
  position: absolute;
  top: 49%;
  right: 41.3%;
  opacity: 1;
}
.yanzheng{position: absolute;
  top: 49.5%;
  right: 41.3%;
  opacity: 1;
  background: rgba(232, 222, 252, 0.89);}
.input5{
  position: absolute;
  top: 56%;
  right: 41.3%;
  opacity: 1;
}
.input6{
  position: absolute;
  top: 63%;
  right: 41.3%;
  opacity: 1;
}
.botton{position: absolute;
  top: 70%;
  right: 41.3%;
  opacity: 1;
  width: 240px;
height: 40px;
font-size: 20px;
font-weight: 400;
opacity: 1;
border-radius: 4px;
background: linear-gradient(135deg, rgba(170, 239, 242, 1) 0%, rgba(136, 191, 242, 0.95) 32.87%, rgba(162, 169, 252, 0.89) 74.12%, rgba(151, 107, 255, 0.8) 100%);
box-shadow: 2px 2px 8px  rgba(0, 0, 0, 0.25);}
.link{ position: absolute;
  top: 76%;
  right: 54.4%;
  opacity: 1;
  color: rgba(153, 112, 255, 1);}
</style>