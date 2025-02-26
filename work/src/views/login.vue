<template>
  <body>
  <div class="">
    <img alt="background" class="bg" src="@/imgs/login.png" />
  </div>
  </body>
  <el-input
      class="input2"
      v-model="username"
      style="width: 240px;height: 40px;"
      placeholder="请输入邮箱/用户名"
      :prefix-icon="User "
    />
    <el-input
    class="input3"
    v-model="password"
    style="width: 240px;height: 40px;"
    type="password"
    placeholder="请输入密码"
    show-password
    :prefix-icon="Lock"
  />
  <el-button class="botton02"   @click="handleLogin"   type="primary" >登录</el-button>

  <router-link to="/register" class="link" :style="{ fontSize: '13px' }"
      >还没有账号？点击注册</router-link
    >
    <router-link to="/reset" class="link02" :style="{ fontSize: '12px' }"
      >忘记密码?</router-link
    >
    <el-checkbox  class="box"    v-model="checked5" label="记住密码" ></el-checkbox>
</template>
<script lang="ts" setup>


import { User } from '@element-plus/icons-vue'
import { Lock} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'; // 引入 useRouter
const username = ref('');
const password = ref('');

const checked5 = ref(false)

const router = useRouter(); // 获取路由实例

// 登录按钮点击事件
const handleLogin = () => {
  // 这里可以添加登录逻辑，比如验证用户名和密码
  // 如果登录成功，跳转到 /QMathify 页面
  router.push('/QMathify');
};
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

.input2 {
  position: absolute;
  top: 43%;
  right: 41.3%;
  opacity: 1;
}
.input3 {
  position: absolute;
  top: 50%;
  right: 41.3%;
  opacity: 1;
}
.link{
  position: absolute;
  top: 66%;
  right: 49.3%;
  opacity: 1;
  color: rgba(153, 112, 255, 1);
}
.link02{
  position: absolute;
  top: 57%;
  right: 41.3%;
  opacity: 1;
  color: rgba(153, 112, 255, 0.81);
}
.box{ position: absolute;
  top: 55.6%;
  right: 52.7%;
  opacity: 1;
}
.botton02{
  position: absolute;
  top: 60%;
  right: 41.3%;
  opacity: 1;
  width: 240px;
height: 40px;
font-size: 20px;
font-weight: 400;
opacity: 1;
border-radius: 4px;
background: linear-gradient(135deg, rgba(170, 239, 242, 1) 0%, rgba(136, 191, 242, 0.95) 32.87%, rgba(162, 169, 252, 0.89) 74.12%, rgba(151, 107, 255, 0.8) 100%);
box-shadow: 2px 2px 8px  rgba(0, 0, 0, 0.25);
}
@media (min-width: 1024px) {
  /* 可以根据需要添加响应式样式 */
}
</style>