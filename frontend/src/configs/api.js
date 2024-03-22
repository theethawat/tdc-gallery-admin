import axios from 'axios'

axios.interceptors.request.use((config) => {
  try {
    const token = window.localStorage.getItem('TDC_TOKEN' || '')
    config.headers.Authorization = `Bearer ${token}`

    return config
  } catch (error) {
    throw new Error('Error On Fetch Value', error)
  }
})

export default axios
