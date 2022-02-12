<template>
  <div id="login-component" class="w-full">
    <section id="title" class="bg-white h-full">
      <h1>Get Rich Hub</h1>
      <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
        </svg>
      </div>
    </section>
    <section class="py-12 w-full">
      <el-form :model="form" class="px-2">
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            type="email"
            class="w-full"
            placeholder="Email"
            autocomplete="off"
            :prefix-icon="Message"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            class="w-full my-2"
            placeholder="Password"
            autocomplete="off"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-button class="w-full bg-primary p-3 text-white" @click="loginToApp()" rounded-md>LOGIN</el-button>
      </el-form>
    </section>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import auth from '@/composable/auth'
import useError from '@/composable/useError'
import { Message, Lock } from '@element-plus/icons-vue'

export default {
  setup() {
    const { login, isAuthenticated } = auth()
    const router = useRouter()
    const { error, setError } = useError();
    const form = reactive({ email: '', password: '' })

    const loginToApp = async () => {
      await login(form.email, form.password)
      if (isAuthenticated.value) {
        router.push('/about')
      } else {
        setError('Invalid username or password')
        start()
      }
    }

    return { login, isAuthenticated, form, Message, Lock, loginToApp }
  }
}
</script>

<style scoped>
#login-component {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

#title {
  background-image: linear-gradient(to left, #177c9bc9, #42cca3c9), url('~@/assets/images/bg-login.jpg');
  background-size: cover;
  background-position: 50% 70%;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#title h1 {
  height: 100%;
}

section:nth-child(2) {
  border-radius: 3rem 3rem 0 0;
  flex-grow: 1;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-1px;
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}

@media (max-width: 768px) {
  .waves {
    height:60px;
    min-height:30px;
  }
  .content {
    height:35vh;
  }
  h1 {
    font-size:24px;
  }
}
</style>
