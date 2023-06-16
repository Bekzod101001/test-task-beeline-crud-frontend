import { reactive, ref } from "vue";
import { uuidv4 } from "@/utils/helper";

interface IToast {
  id: string,
  text: string,
  type: string
}

const DURATION = ref(4000)
const items: IToast[] = reactive([])

export default function() {
  const toast = {
    success: (text: string, duration: number = 0) => {
      init(text, duration, 'success')
    },
    error: (text: string, duration: number = 0) => {
      init(text, duration, 'error')
    }
  }

  function init (text: string, duration: number, type: string) {
    const id = uuidv4()

    items.push({
      id,
      text: text,
      type
    })

    deleteFunction(id)

    if(duration) DURATION.value = duration
  }

  function deleteFunction (id: string) {
    setTimeout(() => {
      const index = items.findIndex(item => item.id === id)
      items.splice(index, 1)
    }, DURATION.value)
  }

  return {
    toast, items
  }
}