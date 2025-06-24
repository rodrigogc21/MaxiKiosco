import axios from 'axios'

const res = await axios.post('/auth/login', {
  email: '',
  contraseña: ''
})

localStorage.setItem('token', res.data.token)