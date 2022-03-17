<template>
  <section>
    <el-dropdown id="account-dropdown" trigger="click" popper-class="enable-disabled" class="cursor-pointer">
      <span type="primary" class="p-2 flex items-center justify-end">
        <span v-if="screenOrder > 2" class="mr-2 font-bold text-sm name-color">{{ fullName }}</span>
        <avataaars class="w-10" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="text-black" disabled>
            <div>{{ email }}</div>
          </el-dropdown-item>
          <el-divider class="my-1" />
          <el-dropdown-item>
            <i class="fas fa-sliders mr-2" />
            Settings
          </el-dropdown-item>
          <el-divider class="my-1" />
          <el-dropdown-item @click="logoutFromApp">
            <i class="fas fa-right-from-bracket mr-2" />
            Logout
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'

export default {
  components: { Avataaars },

  setup() {
    const store = useStore()
    const fullName = computed(() => store.getters['profile/fullName'])
    const email = computed(() => store.getters['auth/email'])
    const screenOrder = computed(() => store.getters['layout/order'])

    const logoutFromApp = () => {
      store.dispatch('auth/logout')
    }

    return {
      fullName, email, screenOrder, logoutFromApp
    }
  }
}
</script>


<style lang="scss" scoped>
#navbar {
  #account-dropdown :deep {
    transition: all 200ms ease-in-out;

    &:hover {
      background-color: #91fce5;
    }
  }
}

.name-color {
  color: #4ab1a8;
}
</style>
