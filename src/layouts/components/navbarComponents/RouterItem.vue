<template>
  <section id="route-item" class="py-2 px-6">
    <router-link :to="route.path" class="grid justify-items-center	">
      <el-icon class="text-xl">
        <template v-if="route.meta.icon === 'House'"><House /></template>
        <template v-else-if="route.meta.icon === 'Cpu'"><Cpu /></template>
        <template v-else-if="route.meta.icon === 'Money'"><Money /></template>
      </el-icon>
      <span class="font-bold">{{ route.name }}</span>
    </router-link>
  </section>  
</template>

<script>
import { House, Cpu, Money } from '@element-plus/icons-vue'

export default {
  props: ['route'],
  components: {
    House,
    Cpu,
    Money
  }
}
</script>

<style lang="scss" scoped>
  #route-item {
    color: #4ab1a8;
    transition: 250ms all ease-in;

    &:hover {
      background-color: #91fce5;
      color: #4ab1a8;
    }
  }
</style>
