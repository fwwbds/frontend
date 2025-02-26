
<template>
   <div class="long-image-container">
  <div class="tu">
     <img alt="background" class="bg" src="@/imgs/hw.png"  />
    
    
      <el-button class="botton01"   @click="goToLogin" type="primary" round>立即开始使用</el-button>
      <el-button class="botton02"   @click="goToLogin" type="primary" round>登录</el-button>
      <el-button class="botton03"   @click=" goToRegister"  type="primary" round>注册</el-button>

    </div>
    <div>
      <img alt="hw2" class="hw2" src="@/imgs/hw2.png"  />
    </div>
    <div>
      <img alt="hw3" class="hw3" src="@/imgs/hw3.png"  />
    </div>
    <div>
      <img alt="hw4"    class="hw4" src="@/imgs/hw4.png"  />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const goToLogin = () => {
      router.push('/login') // 跳转到登录页面
    }

    const goToRegister = () => {
      router.push('/register') // 跳转到注册页面
    }

    return {
      goToLogin,
      goToRegister
    }
  }
})

</script>
<style scoped>

.long-image-container {
  display: flex;
  flex-direction: column; /* 垂直排列页面部分 */

}
.tu{
  min-height: 100vh; /* 每个页面部分至少占满视口高度 */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.hw2 {
  height: auto;
  top: 115%; 
  left: 16%; 
  width: 70%;
  padding: 2px;
  position: absolute;
}
.hw3{
  height: auto;
  top: 195%; 
  left: 16%; 
  width: 70%;
  padding: 2px;
  position: absolute;
}
.hw4{
  height: auto;
  top: 275%; 
  left: 15%; 
  width: 70%;
  padding-bottom: 200px;
  position: absolute;
  display: block; /* 去除图片底部间隙 */
  margin-bottom: 5px; /* 设置图片下方的外边距为 50px */
}
.botton01{
  top: 66%;
  right:36%;
  position: absolute;
  font-size: 30px;
  width: 400px;
height: 80px;
opacity: 1;
border-radius: 20px;
background: linear-gradient(90deg, rgba(170, 239, 242, 1) 0.92%, rgba(136, 191, 242, 0.95) 33.49%, rgba(162, 169, 252, 0.89) 74.36%, rgba(151, 107, 255, 0.8) 100%);

}.botton02{
  left: 84%;
top: 1%;
position: absolute;
font-size: 20px;
width: 100px;
height: 60px;
opacity: 1;
border-radius: 30px;
background: linear-gradient(90deg, rgba(170, 239, 242, 1) 0.92%, rgba(136, 191, 242, 0.95) 33.49%, rgba(162, 169, 252, 0.89) 74.36%, rgba(151, 107, 255, 0.8) 100%);
}
.botton03{
  left: 91.5%;
top: 1%;
position: absolute;
font-size: 20px;
color: rgba(153, 112, 255, 1);
width: 100px;
height: 60px;
opacity: 1;
border-radius: 30px;
background: linear-gradient(90deg, rgba(170, 239, 242, 0.2) 0.92%, rgba(136, 191, 242, 0.19) 33.49%, rgba(162, 169, 252, 0.18) 74.36%, rgba(151, 107, 255, 0.16) 100%)};
.tu{
  padding: 0%;
  margin: 0%;
  border: 0cap;
}
.bg {
  left:0%;
  top: 0%;
  position: absolute;
  width: 97.1%; /* 宽度为容器宽度 */
  height: auto; /* 高度为容器高度 */
  object-fit: cover; /* 让图片覆盖整个元素 */
  object-position: center; /* 图片居中显示 */
}
@media (min-width: 1024px) {
 
}
</style>
