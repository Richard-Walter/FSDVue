import { ref } from 'vue'

const getFlaskData = (route) => {

  const flask_data = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      let json_data = await fetch(`http://localhost:5000/${route}`)
      if(!json_data.ok) {
        throw Error('no available data')
      }
      flask_data.value = await json_data.json()
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { flask_data, error, load }
}

export default getFlaskData
