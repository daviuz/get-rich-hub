<template>
  <div id="login-component" class="w-full py-10 px-4">
    <section class="flex justify-center items-center p-4 w-full mb-4">
      <img src="@/assets/images/logo.svg" class="w-16 mr-4 inline" />
      <h1 class="font-bold text-3xl">Passive Traders</h1>
    </section>
    <section class="sm:block text-center w-full">
      <h1 class="font-bold text-primary text-4xl pb-4">Let's get started.</h1>
      <div class="w-full px-20 text-lg text-gray-400">
        Easily keep track of your trading bots.
      </div>
    </section>
    <el-form :model="form" class="mt-12 px-10 w-full" @submit.prevent>
      <div class="flex items-center flex-col">
        <el-input
          v-model="form.email"
          ref="inputRef"
          type="email"
          size="large"
          class="w-full mb-4 max-w-md"
          placeholder="Email"
          autocomplete="off"
          :prefix-icon="Message"
        />
        <el-input
          v-model="form.password"
          type="password"
          size="large"
          class="w-full mb-4 max-w-md"
          placeholder="Password"
          autocomplete="off"
          :prefix-icon="Lock"
          @keyup.enter="loginToApp()"

        />
        <el-button
          class="w-full p-3 text-white font-bold rounded-md max-w-md"
          size="large"
          type="primary"
          @click="loginToApp()"
          :loading-icon="Eleme"
          :loading="isLoading"
        >
          <template v-if="isLoading">Loggin in...</template>
          <template v-else>Login</template>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Message, Lock, Eleme } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const store = useStore()
    const form = reactive({ email: '', password: '' }) 
    const isLoading = ref(false)
    const inputRef = ref(null)
  
    const loginToApp = () => {
      ElMessage.closeAll()
      if(form.email !== '' && form.password !== '') {
        isLoading.value = true
        store.dispatch('auth/login', form)
          .then(result => {
            if (result !== undefined) {
              ElMessage({
                showClose: true,
                duration: 0,
                message: result,
                type: 'error'
              })
              form.password = ''
              inputRef.value.focus()
              isLoading.value = false
            }
          })
      } else {
        ElMessage({
          showClose: true,
          duration: 0,
          message: 'Please fill in your email and password.',
          type: 'error'
        })
      }
    }

    return { form, Message, Lock, Eleme, inputRef, isLoading, loginToApp }
  }
}
</script>

<style lang="scss" scoped>
#login-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-image: url('~@/assets/images/bg-circles.png');
  background-size: cover;
  height: 100vh;
}
</style>
