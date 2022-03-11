<template>
  <section id="route-item">
    <router-link :to="route.path" class="grid justify-items-center py-2 px-2">
      <i class="text-xl md:text-base opacity-70 mb-1" :class="route.meta.icon" />
      <span class="text-sm font-medium">{{ route.name }}</span>
    </router-link>
  </section>  
</template>

<script>
export default {
  props: ['route']
}
</script>

<style lang="scss" scoped>
  #route-item {
    color: #4ab1a8;
    transition: 250ms all ease-in;
    width: 100%;

    span {
      display: none;

      @screen md {
        display: block;
      }
    }

    @screen md {
      width: 5rem;
    }

    &:hover {
      background-color: #91fce5;
      color: #4ab1a8;
    }
  }
</style>
