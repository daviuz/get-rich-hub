<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <vs-input v-model="email" placeholder="Email">
        <template #icon>
          <i class='bx bx-user'></i>
        </template>
      </vs-input>
    </form>
  </div>
</template>

