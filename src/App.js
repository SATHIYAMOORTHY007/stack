import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useEffect } from 'react'
function App() {
  const [userList, setUserList] = useState([])

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
    },
    validate: (values) => {
      let error = {}
      if (values.name === '') {
        error.name = 'please enter name'
      }

      return error
    },
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:3100/user', values)
        alert('user inserted')
      } catch (error) {
        console.log(error)
      }
    },
  })

  useEffect(() => {
    getUsers()
  })

  const getUsers = async () => {
    try {
      const users = await axios.get('http://localhost:3100/user')
      setUserList(users.data)
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <label>Name</label>
                <input
                  type={'text'}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  name="name"
                />
              </div>
              <div className="col-lg-6">
                <label>age</label>
                <input
                  type={'text'}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.age}
                  name="age"
                />
              </div>
              <div className="col-lg-12">
                <input type={'submit'} className="btn btn-primary mt-3" />
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => {
                return (
                  <tr>
                    <th scope="row">1</th>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
