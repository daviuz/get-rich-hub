<template>
  <div id="login-component" class="w-full">
    <section id="title" class="h-full w-1/2">
      <h1>Get Rich Hub</h1>
    </section>
    <section class="py-12 w-1/2 flex justify-center">
      <el-form :model="form" class="px-5 w-full sm:w-1/2 lg:w-1/2">
        <el-alert v-if="error !== null" class="mb-4 p-1" :title="error" type="error" />
        <el-input
          v-model="form.email"
          type="email"
          class="w-full mb-4"
          placeholder="Email"
          autocomplete="off"
          :prefix-icon="Message"
        />
        <el-input
          v-model="form.password"
          type="password"
          class="w-full mb-4"
          placeholder="Password"
          autocomplete="off"
          :prefix-icon="Lock"
        />
        <el-button class="w-full bg-primary p-3 text-white font-bold" @click="loginToApp()" round>LOGIN</el-button>
      </el-form>
    </section>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { Message, Lock } from '@element-plus/icons-vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const error = ref(null)
    const form = reactive({ email: '', password: '' }) 
    const loginToApp = () => {
      store.dispatch('auth/login', form)
        .then(result => {
          if (result !== undefined) {
            error.value = result
          }
        })
    }

    return { form, Message, Lock, loginToApp, error }
  }
}
</script>

<style scoped>
#login-component {
  display: flex;
  justify-content: center;
  height: 100vh;
}

#title {
  background-image: url('~@/assets/images/bg-circles.png');
  background-size: cover;
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
</style>
