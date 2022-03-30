<template>
  <section id="route-item">
    <router-link :to="route.path" class="grid justify-items-center py-3 md:py-3 px-2">
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
    color: #3f928b;
    transition: 250ms all ease-in;
    width: 100%;

    :deep(.svg-inline--fa) path {
      fill: transparent;
      stroke: #4ab1a8;
      stroke-width: 30;
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
      color: #4df7e8;
      font-size: 1rem;

      svg {
        filter: drop-shadow(0px 0px 10px rgb(0, 236, 236));

        @screen md {
          filter: initial;
        }
      }

      :deep(.svg-inline--fa) path {
        fill: #4df7e8;
        stroke: none;
        stroke-width: 50;
      }
    }
  }
</style>
