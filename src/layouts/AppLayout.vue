<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import Default from './Default'
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { resizeHandler } from '@/composable/layouts/resizeHandler'

export default {
  name: 'AppLayout',
  setup() {
    const layout = shallowRef(Default)
    const route = useRoute()
    const { resizer } = resizeHandler()

    watch(
      () => route.meta,
      async meta => {
        try {
          const component = await require(`@/layouts/${meta.layout}.vue`)
          layout.value = component?.default || Default
        } catch (e) {
          layout.value = Default
        }
      }
    )
    return { layout, resizer }
  }
}
</script>
