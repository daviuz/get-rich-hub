<template>
  <section>
    <BotData v-if="currentAccountIds.length > 0" :accountIds="currentAccountIds" />
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import BotData from './BotData.vue'

export default {
  components: { BotData },
  setup() {
    const store = useStore()
    const currentAccountIds = ref([])
    const accountIds = computed(() => store.getters['profile/accountIds'])

    watch(accountIds, current => {
      currentAccountIds.value = current
    }, { immediate: true })

    return { currentAccountIds }
  }
}
</script>
