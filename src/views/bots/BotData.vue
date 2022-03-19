<template>
  <section>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">{{data}}
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useQuery } from 'vue-query'
import threeCBotsApi from '@/services/api/bots'

export default {
  props: { accountIds: Array },
  setup(props) {
    const botIds = ref([])
    const { isLoading, isError, data, error } = useQuery('bots', () => fetchBots(), {
      refetchOnMount: true,
      refetchOnReconnect: true
    })

    const fetchBots = async () => {
      const promiseArray = props.accountIds.map(id => {
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

      await Promise.allSettled(promiseArray)
        .then(response => {
          botIds.value.push(response.map(res => res.value))
        })
      
      return botIds
    }

    return { isLoading, isError, data, error, botIds }
  }
}
</script>
