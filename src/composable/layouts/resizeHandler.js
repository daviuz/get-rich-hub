import { onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export const resizeHandler = () => {
  const { body } = document
  const store = useStore()
  const breakPoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  }

  onBeforeMount(() => {
    window.addEventListener('resize', resizer)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizer)
  })

  onMounted(() => {
    resizer()
  })

  const resizer = () => {
    store.dispatch('layout/setDevice', screenSize())
  }

  let screenSize = () => {
    let screen = 'xs'
    let rect = body.getBoundingClientRect()
    Object.entries(breakPoints).forEach(entry => {
      let [key, value] = entry
      screen = rect.width >= value ? key : screen
    })
    return screen
  }

  return {
    body,
    breakPoints,
    resizer,
    screenSize
  }
}
