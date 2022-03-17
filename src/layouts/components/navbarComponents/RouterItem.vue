<template>
  <section id="route-item">
    <router-link :to="route.path" class="grid justify-items-center py-4 md:py-2 px-2">
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

    :deep(.svg-inline--fa) path {
      fill: white;
      stroke: #4ab1a8;
      stroke-width: 50;
    }

    span {
      display: none;

      @screen md {
        display: block;
      }
    }

    @screen md {
      width: 5rem;
    }

    @screen lg {
      &:hover {
        color: #48e2d5;
      }
    }

    .router-link-active {
      color: #48e2d5; 

      :deep(.svg-inline--fa) path {
        fill: #48e2d5;
        stroke: none;
        stroke-width: initial;
      }
    }
  }
</style>
