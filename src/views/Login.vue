<template>
  <div id="login-component" class="w-full py-10 px-4">
    <section class="flex justify-center items-center p-4 w-full mb-4">
      <img src="@/assets/images/logo.svg" class="w-20 inline" />
      <h1 class="font-bold text-3xl">Passive Traders</h1>
    </section>
    <section class="sm:block text-center w-full">
      <h1 class="font-bold text-primary text-4xl pb-4">Let's get started.</h1>
      <div class="w-full px-20 text-lg text-gray-400">
        Easily keep track of your trading bots.
      </div>
    </section>
    <el-form :model="form" class="mt-12 px-10 w-full">
      <el-input
        v-model="form.email"
        type="email"
        size="large"
        class="w-full mb-4"
        placeholder="Email"
        autocomplete="off"
        :prefix-icon="Message"
      />
      <el-input
        v-model="form.password"
        type="password"
        size="large"
        class="w-full mb-4"
        placeholder="Password"
        autocomplete="off"
        :prefix-icon="Lock"
      />
      <el-button size="large" class="w-full bg-primary p-3 text-white font-bold rounded-md" @click="loginToApp()">LOGIN</el-button>
    </el-form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { Message, Lock } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const store = useStore()
    const form = reactive({ email: '', password: '' }) 
    const loginToApp = () => {
      if(form.email !== '' && form.password !== '') {
        store.dispatch('auth/login', form)
          .then(result => {
            if (result !== undefined) {
              ElMessage.closeAll()
              ElMessage({
                showClose: true,
                duration: 0,
                message: result,
                type: 'error'
              })
            }
          })
      } else {
        ElMessage.closeAll()
        ElMessage({
          showClose: true,
          duration: 0,
          message: 'Please fill in your email and password.',
          type: 'error'
        })
      }
    }

    return { form, Message, Lock, loginToApp }
  }
}
</script>

<style scoped>
#login-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-image: url('~@/assets/images/bg-circles.png');
  background-size: cover;
  height: 100vh;
}

#error-message {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  top: 10rem;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
