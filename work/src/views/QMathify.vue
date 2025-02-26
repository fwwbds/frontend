<template>
  <div class="container">
    <!-- 边栏 -->
    <div
      class="sidebar"
      :class="{ 'sidebar-open': isSidebarOpen, 'sidebar-collapsed': !isSidebarOpen }"
    >
      <!-- 侧栏收起时的内容 -->
      <div v-if="!isSidebarOpen" class="collapsed-content">
        <el-icon class="menu-icon" @click="toggleSidebar">
          <Memo /> <!-- Memo图标 -->
        </el-icon>
        <img alt="logo" class="logo" src="@/imgs/logo.png" />
        <el-button type="primary" class="bo01" @click="toggleSidebar">
          <img alt="dia" src="@/imgs/dia.png" />
        </el-button>
        <el-button type="primary" class="bo02" @click="toggleSidebar">
          <img alt="sear" src="@/imgs/search.png" />
        </el-button>
        <el-button type="primary" class="bo03" @click="toggleSidebar">
          <img alt="late" src="@/imgs/lately.png" />
        </el-button>
        <el-button type="primary" class="bo04" @click="toggleSidebar">
          <img alt="per" src="@/imgs/person.png" />
        </el-button>
      </div>

      <!-- 侧栏展开时的内容 -->
      <div v-else class="expanded-content">
        <!-- Memo图标（移动到右上角） -->
        <el-icon class="menu-icon-top-right" @click="toggleSidebar">
          <Memo /> <!-- Memo图标 -->
        </el-icon>
        <img class="math" src="@/imgs/math.png" />

        <el-button type="primary" class="bo05" @click="handleNewDialog">
          <div class="button-content">
            <img alt="dia" src="@/imgs/dia.png" class="dia-icon" />
            <span>新建对话</span>
          </div>
        </el-button>

        <img class="line" src="@/imgs/line.png" />

        <el-button type="primary" class="bo06">
          <div class="button-content">
            <img alt="" src="@/imgs/search.png" class="search-icon" />
            <span>搜索历史记录</span>
          </div>
        </el-button>

        <el-button type="primary" class="bo07" @click="toggleDialogList">
          <div class="button-content">
            <img alt="" src="@/imgs/lately.png" class="lately-icon" />
            <span>近期对话</span>
          </div>
        </el-button>

        <!-- 近期对话列表 -->
        <div v-if="isDialogListVisible" class="recent-dialog-list">
          <div v-for="(dialog, index) in dialogs" :key="index" class="dialog-item">
            <span @click="loadDialog(dialog.id)">{{ dialog.name }}</span>
            <div class="icon-container">
              <el-icon class="edit-icon" @click.stop="renameDialog(index)">
                <Edit />
              </el-icon>
              <el-icon class="delete-icon" @click.stop="deletedialog(dialog.id)">
                <Delete />
              </el-icon>
            </div>
          </div>
        </div>
        <div>
          <el-button type="primary" class="bo08" @mouseenter="handleButtonEnter" @mouseleave="handleButtonLeave" @click="togglePopover">
            <div class="button-content">
              <img alt="per" src="@/imgs/person.png" class="per-icon" />
              <span>个人信息</span>
            </div>
          </el-button>
          <div v-if="showPopover" class="popover" @mouseenter="handlePopoverEnter" @mouseleave="handlePopoverLeave">
            <el-button type="text" class="xiu">
              <img alt="pen" src="@/imgs/pen.png" class="pen" />
              修改个人信息</el-button>
            <el-button type="text" @click="clearAllDialogs" class="shan">
              <img alt="delete" src="@/imgs/delete.png" class="delete" />
              删除历史记录</el-button>
            <el-button type="text" class="she">
              <img alt="set" src="@/imgs/set.png" class="set" />
              系统设置</el-button>
            <el-button type="text" class="jiao">
              <img alt="call" src="@/imgs/call.png" class="call" />
              联系我们</el-button>
            <el-button type="text" class="tui">
              <img alt="loginout" src="@/imgs/loginout.png" class="loginout" />
              退出登录</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="ai" :class="{ 'content-shifted': isSidebarOpen }">
      <ai ref="aiComponent" :dialogs="dialogs" @add-to-recent-dialogs="addToRecentDialogs" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Memo, Edit, Delete } from '@element-plus/icons-vue'; // 引入图标
import ai from './ai.vue';

const isSidebarOpen = ref(false);
const isDialogListVisible = ref(false);
const dialogs = ref([]);
const showPopover = ref(false);
const isPopoverHovered = ref(false);
const isButtonHovered = ref(false);

// 获取 ai 组件的引用
const aiComponent = ref(null);

// 删除单条对话
const deletedialog = (id) => {
  if (aiComponent.value) {
    aiComponent.value.deleteDialogFromLocal(id);
    dialogs.value = dialogs.value.filter((dialog) => dialog.id !== id);
  }
};

// 清空所有对话缓存
const clearAllDialogs = () => {
  if (aiComponent.value) {
    aiComponent.value.clearAllDialogs();
    dialogs.value = [];
  }
};

// 新建对话逻辑
const handleNewDialog = () => {
  // 调用 ai 组件中的 handleNewDialog 方法
  if (aiComponent.value)  {
    aiComponent.value.handleNewDialog(); 
  }
};
// 将前七个字添加到近期对话列表
const addToRecentDialogs = (message) => {
  const dialogName = message.slice(0, 7); // 取前七个字
  const dialogId = Date.now().toString(); // 生成唯一的 id
  dialogs.value.unshift({ id: dialogId, name: dialogName }); // 添加到近期对话列表
  // 同时保存当前对话的 id 到本地存储
  localStorage.setItem('currentDialogId', dialogId);
};

// 加载对话
const loadDialog = (id) => {
  if (aiComponent.value) {
    aiComponent.value.loadDialogFromLocal(id);
    // 更新当前对话的 id 到本地存储
    localStorage.setItem('currentDialogId', id);
  }
};
// 定义方法
const handleFunction1 = () => {
  console.log('功能 1 被点击');
  // 这里可以添加具体的功能逻辑
};

const handleFunction2 = () => {
  // 清空近期对话记录
  dialogs.value = [];
};

// 切换侧栏的展开与收起
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// 切换对话列表的显示与隐藏
const toggleDialogList = () => {
  isDialogListVisible.value = !isDialogListVisible.value;
};

// 重命名对话
const renameDialog = (index) => {
  const newValue = prompt('请输入新的名称', dialogs.value[index].name);
  if (newValue !== null) {
    dialogs.value[index].name = newValue;
  }
};

// 删除对话
const deleteDialog = (index) => {
  dialogs.value.splice(index, 1);
};
// 删除所有对话记录的方法
const deleteAllDialogs = () => {
  dialogs.value = [];
};
// 处理鼠标进入个人信息按钮
const handleButtonEnter = () => {
  isButtonHovered.value = true;
  showPopover.value = true;
};

// 处理鼠标离开个人信息按钮
const handleButtonLeave = () => {
  isButtonHovered.value = false;
  // 只有当悬浮卡片未被悬停时才隐藏
  if (!isPopoverHovered.value) {
    setTimeout(() => {
      if (!isPopoverHovered.value) {
        showPopover.value = false;
      }
    }, 100); // 延迟 100ms 确保悬浮卡片的 mouseenter 事件先触发
  }
};

// 处理鼠标进入悬浮卡片
const handlePopoverEnter = () => {
  isPopoverHovered.value = true;
};

// 处理鼠标离开悬浮卡片
const handlePopoverLeave = () => {
  isPopoverHovered.value = false;
  if (!isButtonHovered.value) {
    showPopover.value = false;
  }
};

// 切换悬浮卡片的显示状态
const togglePopover = () => {
  showPopover.value = !showPopover.value;
};
</script>
<style>


/* 容器样式 */
.container {
  display: flex;
  min-height: 100vh; /* 确保容器占满整个视口高度 */
  overflow: hidden; /* 隐藏滚动条 */
}

/* 边栏样式 */
.sidebar {
  width: 250px; /* 展开时的宽度 */
  height: calc(100vh - 40px); /* 高度减去上下边距 */
  background-color: #ffffff;
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: white;
  position: fixed;
  top: 20px; /* 上边距 */
  left: 20px; /* 左边距 */
  transition: all 0.3s ease;
  z-index: 1000; /* 确保边栏在最上层 */
  border-radius: 8px; /* 圆角效果 */
}

/* 边栏收起时的样式 */
.sidebar-collapsed {
  width: 80px; /* 收起时的宽度 */
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff; /* 收起时的背景颜色 */
 
}

.math {
  width: 200px;
  height: auto;
  position: absolute; /* 绝对定位 */
  top: 30px;
}

.logo {
  width: 50px;
  height: 50px;
  display: block;
  margin-top: 10px; /* 根据需要调整间距 */
}

.bo01,
.bo02,
.bo03,
.bo04,
.bo05 {
  position: absolute; /* 绝对定位 */
  width: 40px;
  height: 40px;
  opacity: 1;
  border-radius: 10px;
  background: rgba(237, 230, 255, 0.81);
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.bo01 img,
.bo02 img,
.bo03 img,
.bo04 img,
.bo05 img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.line {
  width: 190px;
  height: auto;
  position: absolute;
  top: 170px;
  left: 30px;
}

.bo01 {
  left: 20px;
  top: 100px;
}

.bo02 {
  left: 8px;
  top: 150px;
}

.bo03 {
  left: 8px;
  top: 200px;
}

.bo04 {
  left: 8px;
  bottom: 40px;
}

.bo05 {
  left: 30px;
  top: 105px;
  width: 180px;
  height: 50px;
  background: rgba(226, 214, 255, 1);
  color: rgba(111, 58, 246, 1);
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: flex-start; /* 内容靠左对齐 */
  padding-left: 10px; /* 左侧内边距 */
}

.bo06 {
  left: 30px;
  top: 180px;
  width: 180px;
  height: 50px;
  position: absolute; /* 绝对定位 */
  background: rgba(248, 245, 255, 0.81);
  color: rgba(111, 58, 246, 1);
  display: flex;
  border-radius: 10px;
  align-items: center; /* 垂直居中 */
  justify-content: flex-start; /* 内容靠左对齐 */
  padding-left: 10px; /* 左侧内边距 */
}

.bo07 {
  left: 18px;
  top: 250px;
  width: 180px;
  height: 50px;
  position: absolute; /* 绝对定位 */
  background: rgba(248, 245, 255, 0.81);
  color: rgba(111, 58, 246, 1);
  display: flex;
  border-radius: 10px;
  align-items: center; /* 垂直居中 */
  justify-content: flex-start; /* 内容靠左对齐 */
  padding-left: 10px; /* 左侧内边距 */
}

.bo08 {
  left: 50px;
  top: 650px;
  width: 180px;
  height: 50px;
  position:fixed; /* 绝对定位 */
  background: rgba(248, 245, 255, 0.81);
  color: rgba(111, 58, 246, 1);
  display: flex;
  border-radius: 10px;
  align-items: center; /* 垂直居中 */
  justify-content: flex-start; /* 内容靠左对齐 */
  padding-left: 10px; /* 左侧内边距 */
}

.popover {
  position: absolute;
  top: 400px;
  left: 40px;
  width: 140px;
height: 180px;
opacity: 1;
border-radius: 10px;
background: rgba(255, 255, 255, 1);
box-shadow: 0px 2px 4px  rgba(0, 0, 0, 0.25);
  border: 1px solid #ccc;
  padding-top: 25px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.loginout,
.call,
.set,
.delete,
.pen{ 
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 8px; /* 图片与文字的间距 */

}

.xiu{
  color: black;
  position: relative;
  left: 10px;
}
.shan{ color: black;
  position: relative;
  left:-2px;}
  .she{ color: black;
  position: relative;
  left:-2px;}
  .jiao{ color: black;
  position: relative;
  left:-2px;}  
  .tui{ color: black;
  position: relative;
  left:-2px;}  
.bo08 img,
.bo07 img,
.bo06 img,
.bo05 img {
  width: 20px;
  height: 20px;
  margin-right: 8px; /* 图片与文字的间距 */
}

.button-content {
  display: flex;
  align-items: center; /* 垂直居中 */
}

/* 近期对话列表样式 */
.recent-dialog-list {
  margin-top:10px;
  padding-left: 30px;
  position: absolute;
  top: 300px;
  max-height:200px; /* 根据实际调整 */
  overflow-y: auto;
  width: 180px;
height: 200px;
opacity: 1;
border-radius: 10px;
background: rgba(249, 246, 255, 1);
}

.dialog-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px ;
  color: rgba(111, 58, 246, 1);
  cursor: pointer;
  border-bottom: 1px solid #c0b7b7; /* 可选：添加分隔线 */
  position: relative;
  left: -13px;
  width: 180px;
}

.dialog-item:last-child {
  border-bottom: none; /* 最后一个项不显示分隔线 */
}
.dialog-item:hover {
  background-color: rgba(237, 230, 255, 0.81);
  border-radius: 4px;

}
.edit-icon,
.delete-icon {
  margin-left: 8px;
  cursor: pointer;
 
}

.edit-icon:hover,
.delete-icon:hover {
  color: #409eff; /* Element Plus 主题色 */
}

/* 侧栏收起时的内容样式 */
.collapsed-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

/* 侧栏展开时的内容样式 */
.expanded-content {
  padding: 20px;
  position: relative; /* 为 Memo 图标定位提供参考 */
}

/* 菜单图标样式（收起时） */
.menu-icon {
  color: rgba(164, 128, 252, 1);
  position: absolute; /* 绝对定位 */
  top: 15px; /* 距离顶部 10px */
  right: 5px; /* 距离右侧 10px */
  font-size: 14px;
  cursor: pointer;
}

.menu-icon:hover {
  color: #409eff; /* Element Plus 主题色 */
}

/* 菜单图标样式（展开时，移动到右上角） */
.menu-icon-top-right {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 距离顶部 10px */
  right: 10px; /* 距离右侧 10px */
  color: rgba(164, 128, 252, 1);
  font-size: 14px;
  cursor: pointer;
}

.menu-icon-top-right:hover {
  color: #409eff; /* Element Plus 主题色 */
}

/* 页面内容样式 */
.ai {
  flex: 1; /* 占据剩余空间 */
  display: flex;
  position: relative;
  right: -45px;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  padding: 0px;
  overflow-y: auto; /* 允许内部滚动 */
  transition: margin-left 0.3s ease;
  max-width: calc(100vw 0px); /* 限制最大宽度，避免超出视口 */
}
/* 边栏打开时，页面内容向右移动 */
.content-shifted {
  margin-left: 290px; /* 250px 侧栏宽度 + 20px 左边距 + 20px 右侧间距 */
  max-width: calc(100vw - 290px); /* 限制最大宽度，避免超出视口 */
  position: relative;
  right: 10px;
}

/* 全局样式重置 */
body,
html {
  margin: 0;
  padding: 0;
  -ms-overflow-style: none;
}

/* 容器样式 */
.container {
  display: flex;
  min-height: 100vh; /* 确保容器占满整个视口高度 */
  overflow: hidden; /* 隐藏滚动条 */
}

/* 边栏样式 */
.sidebar {
  width: 250px; /* 展开时的宽度 */
  height: calc(100vh - 40px); /* 高度减去上下边距 */
  background-color: #ffffff;
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: white;
  position: fixed;
  top: 20px; /* 上边距 */
  left: 20px; /* 左边距 */
  transition: all 0.3s ease;
  z-index: 1000; /* 确保边栏在最上层 */
  overflow-y: auto; /* 允许侧栏内部滚动 */
  border-radius: 8px; /* 圆角效果 */
}

/* 边栏收起时的样式 */
.sidebar-collapsed {
  width: 80px; /* 收起时的宽度 */
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff; /* 收起时的背景颜色 */
}

.math {
  width: 200px;
  height: auto;
  position: absolute; /* 绝对定位 */
  top: 30px;
}

.logo {
  width: 50px;
  height: 50px;
  display: block;
  margin-top: 10px; /* 根据需要调整间距 */
}

.bo01,
.bo02,
.bo03,
.bo04,
.bo05,
.bo06,
.bo07 {
  position: absolute; /* 绝对定位 */
  width: 40px;
  height: 40px;
  opacity: 1;
  border-radius: 10px;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.bo01 img,
.bo02 img,
.bo03 img,
.bo04 img,
.bo05 img,
.bo06 img,
.bo07 img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.bo01 {
  left: 20px;
  top: 100px;
  background: rgba(237, 230, 255, 0.81);
}

.bo02 {
  left: 8px;
  top: 150px;
  background: rgba(237, 230, 255, 0.81);
}

.bo03 {
  left: 8px;
  top: 200px;
  background: rgba(237, 230, 255, 0.81);
}

.bo04 {
  left: 8px;
  bottom: 40px;
  background: rgba(237, 230, 255, 0.81);
}

.bo05 {
  left: 30px;
  top: 105px;
  width: 180px;
  height: 50px;
  background: rgba(226, 214, 255, 1);
  color: rgba(111, 58, 246, 1);
  justify-content: flex-start; /* 内容靠左对齐 */
  padding-left: 10px; /* 左侧内边距 */
}

.bo06 {
  left: 30px;
  top: 180px;
  width: 180px;
  height: 50px;
  background: rgba(248, 245, 255, 0.81);
  color: rgba(111, 58, 246, 1);
  justify-content: flex-start; /* 内容靠左对齐 */
  padding-left: 10px; /* 左侧内边距 */
}

.bo07 {
  left: 18px;
  top: 250px;
  width: 180px;
  height: 50px;
  background: rgba(248, 245, 255, 0.81);
  color: rgba(111, 58, 246, 1);
  justify-content: flex-start; /* 内容靠左对齐 */
  padding-left: 10px; /* 左侧内边距 */
}

.bo05 img,
.bo06 img,
.bo07 img {
  margin-right: 8px; /* 图片与文字的间距 */
}

.line {
  width: 190px;
  height: auto;
  position: absolute;
  top: 170px;
  left: 30px;
}

.button-content {
  display: flex;
  align-items: center; /* 垂直居中 */
}

/* 侧栏收起时的内容样式 */
.collapsed-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

/* 侧栏展开时的内容样式 */
.expanded-content {
  padding: 20px;
  position: relative; /* 为 Memo 图标定位提供参考 */
}

/* 菜单图标样式（收起时） */
.menu-icon {
  color: rgba(164, 128, 252, 1);
  position: absolute; /* 绝对定位 */
  top: 15px; /* 距离顶部 10px */
  right: 5px; /* 距离右侧 10px */
  font-size: 14px;
  cursor: pointer;
}

.menu-icon:hover {
  color: #409eff; /* Element Plus 主题色 */
}

/* 菜单图标样式（展开时，移动到右上角） */
.menu-icon-top-right {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 距离顶部 10px */
  right: 10px; /* 距离右侧 10px */
  color: rgba(164, 128, 252, 1);
  font-size: 14px;
  cursor: pointer;
}

.menu-icon-top-right:hover {
  color: #409eff; /* Element Plus 主题色 */
}


/* 边栏打开时，页面内容向右移动 */
.content-shifted {
  margin-left: 290px; /* 250px 侧栏宽度 + 20px 左边距 + 20px 右侧间距 */
  max-width: calc(100vw - 290px); /* 限制最大宽度，避免超出视口 */
}
</style>