<template>
  <div class="w-40">
    <h1 class="text-blue-400">Login</h1>
    <form @submit.prevent="login">
      <font-awesome-icon icon="coffee"></font-awesome-icon>
      <w-input class="mb2"
        label="Password"
        :type="isPassword ? 'password' : 'text'"
        :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
        @click:inner-icon-right="isPassword = !isPassword">
      </w-input>
    </form>
  </div>
</template>

