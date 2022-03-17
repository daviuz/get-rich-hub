<template>
  <section>
    Bots {{ accountIds }}
    {{ currentAccountIds }}
    {{ botIds }}
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import threeCBotsApi from '@/services/api/bots'

export default {
  setup() {
    const store = useStore()
    const botIds = ref([])
    const currentAccountIds = ref([])
    const accountIds = computed(() => store.getters['profile/accountIds'])
    const fetchBots = () => {
      const promiseArray = currentAccountIds.value.map(id => {
        return new Promise((resolve, reject) => {
          threeCBotsApi.getAllBots(id)
            .then(response => {
              resolve(response.data)
            })
            .catch(error => {
              reject(error)
            })
        })
      })

      Promise.allSettled(promiseArray)
        .then(response => {
          botIds.value.push(response.map(res => res.value))
        })
    }

    watch(accountIds, current => {
      currentAccountIds.value = current
      if (currentAccountIds.value.length > 0 && botIds.value.length === 0) {
        fetchBots()
      }
    })

    return { botIds, accountIds, currentAccountIds }
  }
}
</script>
