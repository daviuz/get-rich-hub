<template>
  <section id="bot-container">
    <div v-if="isLoading">
      <el-skeleton class="w-full" animated>
        <template #template>
          <div class="grid gap-3">
            <el-skeleton-item
              v-for="(number, index) in 20"
              :key="index"
              variant="p"
              class="h-14 w-full"
            />
          </div>
        </template>
      </el-skeleton>
    </div>
    <div v-else-if="isError" class="mt-20 text-gray-400 flex items-center justify-center flex-col">
      <img src="@/assets/images/error.svg" class="w-3/4 md:w-1/3 lg:w-1/4 p-4" />
      <div class="text-center m-4 text-base md:text-lg">
        Oops something went wrong!
      </div>
    </div>
    <div v-else-if="data" class="grid">
      <template v-if="data.filter(item => item.length > 0).length === 0">
        <div class="mt-16 text-gray-400 flex items-center justify-center flex-col">
          <span class="text-primary font-bold text-4xl px-4">NO WAY!</span>
          <img src="@/assets/images/aliens.svg" class="w-1/2 md:w-1/3 lg:w-1/6 p-4" />
          <div class="text-center m-4 text-base md:text-lg">
            <p>There were no bots found.</p>
            <p>The alients must've taken them!</p>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="accounts in data" :key="accounts" class="grid">
          <el-card
            v-for="bot in accounts"
            :key="bot.id" 
            :body-style="{ padding: '0.5rem 0.75rem' }"
            class="bot-card"
          >
            <div class="grid gap-2">
              <div class="card-grid grid items-center md:gap-10 xl:gap-20">
                <div class="flex items-center gap-3">
                  <img
                    :src="(accountDetails.find(account => account.id === bot.account_id) || {}).market_icon"
                    class="w-6"
                  >
                  <div class="bot-name truncate">
                    {{ bot.name }}
                    <div class="text-xs text-gray-400">{{ bot.account_name }}</div>
                  </div>
                </div>
                <template v-if="screenOrder >= 3">
                  <div class="bot-pairs flex gap-2 flex-wrap">
                    <div v-for="(pair, index) in bot.pairs.slice(0, 10)" :key="index" class="bot-tag-card p-1 flex gap-1 text-gray-400">
                      <img :src="iconUrl + pair.split('_')[1].replace('DOWN', '').replace('UP', '')" class="inline-block w-4" />
                      {{ pair.split('_').reverse().join('/') }}
                    </div>
                  </div>
                  <div class="bot-strategy grid gap-2">
                    <div class="flex gap-2 flex-wrap">
                      <div v-for="(item, index) in bot.strategy_list" :key="index" class="bot-tag-card p-1 flex gap-1 text-gray-400">
                        {{ item.strategy.replace('_', '').replace('tradingview', 'tv').toUpperCase() }}
                        &nbsp;
                        <template v-if="item.options.type">
                          {{ capitalize(item.options["type"].split("_").join(" ")) }}
                          &nbsp;
                        </template>
                        <template v-if="item.options.time">
                          {{ capitalize(item.options["time"]) }}
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="bot-settings ">
                    <div class="flex gap-2 flex-wrap">
                      <div class="bot-tag-card">
                        TTP: {{ `${bot.take_profit} (${bot.trailing_enabled ? bot.trailing_deviation : ''})` }}
                      </div>
                      <div class="bot-tag-card">
                        TTP: {{ `${bot.take_profit} (${bot.trailing_enabled ? bot.trailing_deviation : ''})` }}
                      </div>
                    </div>
                  </div>
                </template>
                <div class="text-right text-xs">
                  <p
                    class="mb-1 lg:text-lg"
                    :class="{
                      'text-success': parseFloat(bot.finished_deals_profit_usd) > 0,
                      'text-danger': parseFloat(bot.finished_deals_profit_usd) < 0,
                    }"
                  >
                    {{ toDollars(parseFloat(bot.finished_deals_profit_usd).toFixed(2)) }}
                  </p>
                  <span class="text-xs text-gray-400">
                    Active Deals: {{ bot.active_deals_count }}
                  </span>
                </div>
              </div>
              <div v-if="screenOrder <= 2" class="flex items-center gap-2">
                <el-card class="bot-tag-card" :body-style="{ padding: '0.25rem' }">
                  <div class="flex gap-2 items-center">
                    <template v-if="bot.type === 'Bot::MultiBot'">
                      <img :src="iconUrl + bot.pairs[0].split('_')[0]" class="w-4 h-4" />
                      <span class="text-xs text-gray-400">{{ bot.pairs.length }} pairs</span>
                    </template>
                    <template v-else>
                      <img :src="iconUrl + bot.pairs[0].split('_')[1]" class="w-4 h-4" />
                      <span class="text-xs text-gray-400">{{ bot.pairs[0].split('_').reverse().join('/') }}</span>
                    </template>
                  </div>
                </el-card>
                <el-card class="bot-tag-card" :body-style="{ padding: '0.25rem' }">
                  <div class="flex">
                    <span class="text-xs text-gray-400">{{ capitalize(bot.strategy) }}</span>
                  </div>
                </el-card>
                <el-card class="bot-tag-card" :body-style="{ padding: '0.25rem' }">
                  <div class="flex">
                    <span class="text-xs text-gray-400">{{ bot.finished_deals_count }} deals closed</span>
                  </div>
                </el-card>
                <div class="text-right flex-1">
                  <el-switch v-model="bot.is_enabled" class="opacity-100" disabled />
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useQuery } from 'vue-query'
import { priceModifier } from '@/composable/numbers/prices'
import threeCBotsApi from '@/services/api/bots'

export default {
  props: { accountIds: Array },
  setup(props) {
    const store = useStore()
    const { isLoading, isError, data, error } = useQuery('bots', () => fetchBots(), {
      refetchOnMount: true,
      refetchOnReconnect: true
    })

    const screenOrder = computed(() => store.getters['layout/order'])
    const accountDetails = computed(() => store.getters['profile/accountDetails'])
    const blackListedPairs = computed(() => store.getters['settings/blackListedPairs'])
    const { toDollars } = priceModifier()
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

      return await Promise.allSettled(promiseArray)
        .then(response => {
         return response.map(res => res.value)
            .sort((first, second) => Number(first.finished_deals_profit_usd) - Number(second.finished_deals_profit_usd))
        })
    }

    const capitalize = string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const iconUrl = process.env.VUE_APP_THREEC_ICON_URL

    return {
      isLoading, isError, data, error, accountDetails, toDollars, capitalize,
      iconUrl, screenOrder, blackListedPairs
    }
  }
}
</script>

<style lang="scss" scoped>
  .bot-card {
    background-color: #263441a4;
    margin: 0.5rem 0;

    .bot-name {
      font-size: 0.75rem;

      @screen md {
        font-size: 0.85rem;
      }
    }

    .bot-tag-card {
      background-color: #263441a4;
      font-size: 0.55rem !important;

      @screen md {
        font-size: 0.75rem !important;
      }
      @screen lg {
        font-size: 0.65rem !important;
      }
    }
  }

  .card-grid {
    grid-template-columns: minmax(100px, 75%) minmax(50px, 25%);

    @screen lg {
      grid-template-columns: minmax(100px, 30%) minmax(100px, 25%) minmax(100px, 15%)  minmax(100px, 20%) minmax(50px, 10%);
    }
  }
</style>
