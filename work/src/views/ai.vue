<template>
  <div class="chat-container">
    <div>
      <img alt="four" src="@/imgs/four.png" class="four" />
    </div>
    <!-- 消息显示区域 -->
    <div class="chat-messages" ref="chatMessagesRef">
      <!-- 循环渲染消息列表 -->
      <div
        :class="['message', message.type === 'user' ? 'user-message' : message.type === 'thinking' ? 'thinking-message' : 'ai-message']"
        v-for="(message, index) in messageList"
        :key="index"
      >
        <!-- AI 消息显示头像 -->
        <img
          v-if="message.type === 'ai' || message.type === 'thinking'"
          class="aitou"
          src="@/imgs/bot.png"
          alt="AI Avatar"
        />
        <img
          v-if="message.type === 'user'"
          class="usertou"
          src="@/imgs/user.png"
          alt="User Avatar"
        />
          <!-- 显示深度思考内容 -->
          <div v-if="message.thinkingContent" class="thinking-content">
          {{ message.thinkingContent }}
        </div>
      
        <!-- 显示消息内容 -->
        <div v-if="message.content">{{ message.content }}</div>
         <!-- 思考中状态 -->
         <div v-if="message.type === 'thinking'" class="thinking">
          <span>思考中...</span>
          <div class="loader"></div>
        </div>
        <div
    v-if="message.type === 'ai' && !isGreeting(message.content)"
    class="action-icons"
  >    <el-icon class="copy-icon" @click="copyMessage(message.content)">
      <CopyDocument />
    </el-icon>
    <el-icon class="refresh-icon" @click="regenerateResponse(index)">
      <Refresh />
    </el-icon>
    <el-icon class="check-icon" @click="likeMessage(index)">
      <CircleCheck />
    </el-icon>
    <el-icon class="close-icon" @click="dislikeMessage(index)">
      <CircleClose/>
    </el-icon>
  </div>
  
        <!-- 显示图片预览 -->
        <img
          v-if="message.imageUrl"
          :src="message.imageUrl"
          alt="Uploaded Image"
          class="uploaded-image"
        />
        <!-- 显示文件名称 -->
        <div v-if="message.fileName" class="file-name">
          文件: {{ message.fileName }}
        </div>
      </div>
    </div>
    <!-- 输入和发送区域 -->
    <div class="chat-input">
      <div>
      <input
        v-model="inputMessage"
        type="text"
        placeholder="请输入您想要问的问题"
        @keydown.enter="sendMessage"
      /></div>
      <!-- 隐藏的图片上传输入框 -->
      <input
        type="file"
        ref="imageInput"
        style="display: none"
        accept="image/*"
        @change="handleImageUpload"
      />
      <!-- 隐藏的文件上传输入框 -->
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        accept=".doc,.docx,.pdf"
        @change="handleFileUpload"
      />
      <el-popover
        placement="top"
        title="上传图片"
        :width="200"
        trigger="hover"
        content="一次1张,单张最大10MB,支持jpg、png等格式。"
      >
        <template #reference>
          <el-icon @click="triggerImageInput" class="pic">
            <Picture />
          </el-icon>
        </template>
      </el-popover>
      <el-popover
        placement="top"
        title="上传文件"
        :width="200"
        trigger="hover"
        content="一次1份,单份最大10MB,支持word、pdf等格式。"
      >
        <template #reference>
          <el-icon @click="triggerFileInput" class="doc">
            <FolderOpened />
          </el-icon>
        </template>
      </el-popover>
      <el-popover
        placement="top"
        width="fit-content"
        trigger="hover"
        content="新建对话"
      >
        <template #reference>
          <el-icon @click="handleNewDialog" class="dia">
            <ChatDotRound />
          </el-icon>
        </template>
      </el-popover>
      <el-divider />
      <button @click="sendMessage">
        <img alt="" src="@/imgs/send.png" class="send" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { ElMessage } from "element-plus";

import { Picture, FolderOpened, ChatDotRound,CopyDocument ,Refresh, CircleCheck,CircleClose } from '@element-plus/icons-vue';
const emit = defineEmits(['add-to-recent-dialogs']);
const chatMessagesRef = ref(null);
const messageList = ref([]);
const inputMessage = ref('');
const imageInput = ref(null);
const fileInput = ref(null);
const isFirstInput = ref(true);
const currentDialogId = ref(null);
// 判断是否为问候语
const isGreeting = (content) => {
  const greetingText = '亲爱的用户,你好!我是你的智能数学助手QMathify。我可以帮助你解答数学问题,包括但不限于：代数问题求解，概率统计计算 数学知识归纳....请告诉我你的问题，我会为你解答。';
  return content === greetingText;
};
const copyMessage = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      ElMessage.warning('消息复制成功');
    })
    .catch((err) => {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制。');
    });
};
// 重新生成 AI 回答
const regenerateResponse = (index) => {
  const message = messageList.value[index];
  if (message.type === 'ai') {
    // 模拟重新生成回答
    const newResponse = '这是重新生成的 AI 回复示例。';
    messageList.value[index].content = newResponse;
  }
};

// 喜欢消息
const likeMessage = (index) => {
  const message = messageList.value[index];
  if (message.type === 'ai') {
    ElMessage.warning('感谢您的喜爱');
    // 这里可以添加记录用户反馈的逻辑
  }
};

// 不喜欢消息
const dislikeMessage = (index) => {
  const message = messageList.value[index];
  if (message.type === 'ai') {
    ElMessage.warning('我们已收到您的反馈');
    // 这里可以添加记录用户反馈的逻辑
  }
};
const saveDialogToLocal = () => {
  const dialog = {
    id: currentDialogId.value || Date.now().toString(),
    messages: messageList.value,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(`dialog-${dialog.id}`, JSON.stringify(dialog));
  currentDialogId.value = dialog.id;
};

const loadDialogFromLocal = (id) => {
  const dialog = JSON.parse(localStorage.getItem(`dialog-${id}`));
  if (dialog) {
    messageList.value = dialog.messages;
    currentDialogId.value = dialog.id;
  }
};

const deleteDialogFromLocal = (id) => {
  localStorage.removeItem(`dialog-${id}`);
};

const clearAllDialogs = () => {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith('dialog - '));
  keys.forEach((key) => localStorage.removeItem(key));
};

watch(messageList, () => {
  saveDialogToLocal();
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

const scrollToBottom = () => {
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
  }
};
const sendMessage = () => {
  const trimmedMessage = inputMessage.value.trim();
  if (trimmedMessage) {
    // 如果是第一次输入，将前七个字添加到近期对话列表
    if (isFirstInput.value) {
      emit('add-to-recent-dialogs', trimmedMessage);
      isFirstInput.value = false;
    }
    // 添加用户消息到消息列表
    messageList.value.push({
      type: 'user',
      content: trimmedMessage,
    });
    inputMessage.value = ''; // 清空输入框

    // 添加深度思考内容
    messageList.value.push({
      type: 'thinking',
      thinkingContent: `正在深度思考 "${trimmedMessage}"...`,
      content: '',
    });

    // 模拟 AI 思考过程
    setTimeout(() => {
      // 移除“思考中”状态
      messageList.value = messageList.value.filter(
        (msg) => msg.type !== 'thinking'
      );

      // 模拟调用后端接口
      fetchAIResponse(trimmedMessage).then((response) => {
        // 添加 AI 回复
        messageList.value.push({
          type: 'ai',
          content: response,
        });
      });
    }, 2000); // 模拟 2 秒的思考时间
  } else {
    alert('请输入消息内容'); // 如果输入框为空，提示用户
  }
};

// 模拟调用后端接口
const fetchAIResponse = async (message) => {
  // 这里可以替换为实际的后端接口调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`这是 AI 对 "${message}" 的深度思考回复。`);
    }, 1000); // 模拟 1 秒的接口响应时间
  });
};
const handleNewDialog = () => {
  messageList.value = [];
  currentDialogId.value = null;
  isFirstInput.value = true;
  messageList.value.push({
    type: 'ai',
    content: '亲爱的用户,你好!我是你的智能数学助手QMathify。我可以帮助你解答数学问题,包括但不限于：代数问题求解，概率统计计算 数学知识归纳....请告诉我你的问题，我会为你解答。'
  });
};

const triggerFileInput = () => {
  fileInput.value.click();
};


onMounted(() => {
  // 尝试从本地存储加载对话
  const storedDialogId = localStorage.getItem('currentDialogId');
  if (storedDialogId) {
    loadDialogFromLocal(storedDialogId);
  } else {
    // 如果本地存储没有对话，添加初始问候语
    handleNewDialog();
  }
});
defineExpose({
  handleNewDialog,
  loadDialogFromLocal,
  deleteDialogFromLocal,
  clearAllDialogs
});

</script>
<style scoped>
/* 对话框容器样式 */
.chat-container {
  position: absolute;
  width: 1000px;
  height: 650px;
  align-items: center;
  justify-content: center;
  opacity: 1;
  border-radius: 20px;
  margin: 0 auto; /* 居中显示 */
  background: linear-gradient(
    132.73deg,
    rgba(194, 247, 252, 0.2) 0%,
    rgba(177, 223, 252, 0.2) 29.73%,
    rgba(194, 210, 255, 0.2) 57.22%,
    rgba(194, 175, 240, 0.2) 100%
  );
  top: 100px;
  bottom: 0%;
}
/* 深度思考内容样式 */
.thinking-content {
  font-style: italic;
  color: #666;
  margin-bottom: 8px;
}

/* 思考中状态样式 */
.thinking-message {
  background: rgba(255, 255, 255, 1);
  align-self: flex-start;
  margin-left: 60px; /* 为右侧头像留出空间 */
  width: fit-content;
  border-radius: 15px;
  padding: 12px;
  max-width: 70%;
  position: relative;
  left: 45px;
}

.thinking {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #409eff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* 功能图标区域样式 */
.action-icons {
  display: flex;
  gap: 10px; /* 图标之间的间距 */
  justify-content: flex-start; /* 图标靠右对齐 */
  padding-top: 8px; /* 与消息内容的间距 */
 padding-bottom: 5px;
}

/* 图标样式 */
.copy-icon,
.refresh-icon,
.check-icon,
.close-icon {
  cursor: pointer;
  color: #666; /* 默认颜色 */
  font-size: 20px;
 
}

.copy-icon:hover {
  color: #409eff; /* 复制图标悬停颜色 */
}

.refresh-icon:hover {
  color: #67c23a; /* 重新回答图标悬停颜色 */
}

.check-icon:hover {
  color: #f56c6c; /* 喜欢图标悬停颜色 */
}

.close-icon:hover {
  color: #909399; /* 不喜欢图标悬停颜色 */}
.four{width: 180px;
  height: 57px;
position: absolute;
top: -65px;
right: 0px;
}
/* 消息显示区域样式 */
.chat-messages {
  flex: 1;
  padding: 10px; /* 只给左侧添加内边距 */
  overflow-y: auto;
  overflow-x: hidden; /* 新增这一行，禁用横向滚动 */
  height: calc(90% - 160px); /* 调整高度，确保不覆盖输入框区域 */
}

/* 单条消息样式 */
.message {
  padding: 8px;
  margin: 15px;
  border-radius: 15px;
  display: flex;
  align-items: center; /* 确保头像和内容对齐 */
  position: relative; /* 为头像的绝对定位提供参考 */
  max-width: 70%; /* 设置消息的最大宽度 */
  word-wrap: break-word; /* 强制长单词或 URL 换行 */
}


.uploaded-image {
  max-width: 100%;
  max-height: 100px;
  margin-top: 10px;
  border-radius: 5px;
}

.file-name {
  margin-top: 10px;
  font-weight: bold;
}
/* 用户消息样式 */
.user-message {
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
  align-self: flex-end;
  margin-right: 50px;
  margin-left: auto; /* 左侧外边距自动，将消息推到最右侧 */
  width: fit-content;
  position: relative;
  padding: 8px;
 
  max-width: 70%; /* 设置消息的最大宽度 */
  word-wrap: break-word;
  word-break: break-all;

}

.user-message::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;

  background: linear-gradient(
    90deg,
    rgba(170, 239, 242, 1) 0.92%,
    rgba(136, 191, 242, 0.95) 33.49%,
    rgba(162, 169, 252, 0.89) 74.36%,
    rgba(113, 61, 235, 0.8) 100%
  );
  border-radius: 17px; /* 比实际边框大2px */
  z-index: -1;
}

/* AI 消息样式 */
.ai-message {
  background: rgba(255, 255, 255, 1);
  align-self: flex-start;
  margin-left: 60px; /* 为右侧头像留出空间 */
  width: fit-content;
  margin-bottom: 8px; /* 为功能图标区域留出空间 */
}
.ai-message::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  
  background: linear-gradient(
    90deg,
    rgba(170, 239, 242, 1) 0.92%,
    rgba(136, 191, 242, 0.95) 33.49%,
    rgba(162, 169, 252, 0.89) 74.36%,
    rgba(113, 61, 235, 0.8) 100%
  );
  border-radius: 17px; /* 比实际边框大2px */
  z-index: -1;
}
/* 头像样式 */
.aitou {
  width: 40px; /* 头像大小 */
  height: 40px;
  border-radius: 50%; /* 圆形头像 */
  position: absolute;
  left: -60px; /* 定位到对话框左侧外部 */
  top: 50%;
  transform: translateY(-50%);
  
}

.usertou {
  width: 40px; /* 头像大小 */
  height: 40px;
  border-radius: 50%; /* 圆形头像 */
  position: absolute;
  right: -50px; /* 定位到对话框右侧外部 */
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
}

/* 输入和发送区域样式 */
.chat-input {
  display: flex;
  
}

/* 输入框样式 */
input {
  flex: 1;
  padding: 8px;
  height: 120px;
  width: 770px;
  position: absolute;
  bottom: 8%;
  right: 11%;
  border-radius: 20px;
  background: white;
  border: 2px solid rgba(182, 182, 250, 1)
}
input:focus {
  outline: none; /* 去除默认的聚焦轮廓 */
  border-color:rgba(182, 182, 250, 1)
  ;  /* 聚焦时的边框颜色，与初始颜色一致 */
}
.pic{
  position:absolute;
  top: 466px;
  left: 120px;
  font-size:24px;
  color: rgb(152, 158, 162);
}
.doc{
  position:absolute;
  top: 466px;
  left: 160px;
  font-size:24px;
  color: rgb(152, 158, 162);
}
.dia{
  position:absolute;
  top: 466px;
  left: 198px;
  font-size:24px;
  color: rgb(152, 158, 162);
}
.el-divider{
  position: absolute;
  bottom: 20%;
  left: 10.7%;
  width: 775px;
}
/* 发送按钮样式 */
button {
  margin-left: 10px;
  padding: 8px 15px;
  background: linear-gradient(
    90deg,
    rgba(170, 239, 242, 1) 0.92%,
    rgba(136, 191, 242, 0.95) 33.49%,
    rgba(162, 169, 252, 0.89) 74.36%,
    rgba(151, 107, 255, 0.8) 100%
  );
  width: 60px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  bottom: 10%;
  right: 13%;
  position: absolute;
  border-radius: 20px;
}

.send {
  width: 29px;
  height: 29px;
  opacity: 1;
  bottom: 16%;
  right: 27%;
  position: absolute;
}

button:hover {
  background-color: #1976d2;
}

@media (max-height: 650px) {
  .chat-container {
    height: 90%;
  }
}
</style>