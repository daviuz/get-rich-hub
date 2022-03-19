<template>
  <div id="error-layout">
    <div class="flex items-center justify-center flex-col h-full"> 
      <span class="text-primary font-bold text-8xl px-4">OOPS!</span>
      <code class="text-gray-300">Error code: 404</code>
      <img src="@/assets/images/404-img.svg" class="w-3/4 md:w-1/3 lg:w-1/4 p-4" />
      <div class="text-center my-8 mx-4 text-sm md:text-lg">
        We can't seem to find the page that you're looking for.<br />
        Try going back to previous page or click on the button below.
      </div>
      <router-link to="/" class="">
        <el-button type="primary" size="large">GO TO HOMEPAGE</el-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #error-layout {
    @screen md {
      padding: 30px;
    }
    margin: 0;
    width: 100%;
    background-size: cover;
    height: 100vh;
  }
</style>
