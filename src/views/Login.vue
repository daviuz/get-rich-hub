<template>
  <div id="login-component">
    <section class="bg-white">
      <img src="@/assets/images/crypto.svg" class="mx-auto my-8 w-1/2 lg:w-56">
    </section>
    <section>
      <form @submit.prevent="login" class="w-1/2">
        <w-input
          class="mb-3 text-left"
          label="Email"
          type="email"
          v-model="form.email"
          static-label
          required
        />
        <w-input class="mb-3 text-left"
          label="Password"
          type="password"
          v-model="form.password"
          static-label
          required
        />
        <w-button class="w-full bg-primary p-3" round>LOGIN</w-button>
      </form>
    </section>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const form = reactive({ email: '', password: '' })

    return { form }
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
section:nth-child(2) {
  background: #e9f5ef;
  border-radius: 3rem 3rem 0 0;
  flex-grow: 1;
}
</style>
