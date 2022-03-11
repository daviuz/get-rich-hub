<template>
  <div id="nav">
    <el-card v-if="navType=='top'" id="top" class="navbar" :body-style="{ padding: '0px' }">
      <section id="logo" class="py-2 pr-2">
        <img src="@/assets/images/logo.svg" class="w-12 inline-block" />
        <span v-if="screenOrder !== 2" class="font-bold text-green-600 text-sm sm:text-base">
          Passive Traders
        </span>
      </section>
      <section  v-if="screenOrder > 1" class="flex justify-center text-sm">
        <template v-for="(route, index) in routes" :key="index">
          <RouterItem :route="route" />
        </template>
      </section>
      <section id="account" class="flex items-center justify-end">
        <AccountDrop />
      </section>
    </el-card>
    <el-card v-else id="bottom" class="navbar w-full" :body-style="{ padding: '0px' }">
      <template v-for="(route, index) in routes" :key="index">
        <RouterItem :route="route" />
      </template>
    </el-card>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { routes } from '../../router/index'
import RouterItem from './navbarComponents/RouterItem.vue'
import AccountDrop from './navbarComponents/AccountDrop.vue'

export default {
  props: ['navType'],
  components: {
    RouterItem,
    AccountDrop
  },
  setup() {
    const store = useStore()
    const screenOrder = computed(() => store.getters['layout/order'])

    return { routes, screenOrder }
  }
}
</script>


<style lang="scss" scoped>
.navbar {
  background-color: #cefcf173;
  border: 1px solid white;

  &#top :deep(.el-card__body) {
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 1fr;

    @screen md {
      grid-template-columns: minmax(50px, 25%) 1fr minmax(50px, 25%);
    }
  }

  &#bottom :deep(.el-card__body) {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
