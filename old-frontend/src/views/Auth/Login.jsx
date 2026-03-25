import React from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Button, Input } from '@mui/joy'

import { AuthLayout } from '../../components/layouts'
import * as actions from '../../redux/actions'
import { app } from '../../configs'

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const handleLogin = (data) => {
    dispatch(actions.meLogin(data))
      .then(() => {
        navigate('/')
        window.location.reload()
      })
      .catch((err) => {
        window.alert(err?.message)
      })
  }

  return (
    <AuthLayout title="">
      <div>
        <div className="flex justify-center">
          <div className="w-full lg:w-1/3 md:w-1/2 m-2 p-2">
            <h1 className="text-2xl font-semibold my-2 text-center font-display">{app.appNameTH}</h1>
            <div className="text-center font-display">ลงชื่อเข้าใช้ระบบ</div>
            <hr className="my-2" />
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="my-2">
                <div className="my-1">Username</div>
                <Input label="Username" name="username" {...register('username')} placeholder="username" />
              </div>
              <div className="my-2">
                <div className="my-1">Password</div>
                <Input
                  label="Password"
                  name="password"
                  placeholder="password"
                  {...register('password')}
                  type="password"
                />
              </div>
              <div className="w-full my-4">
                <Button fullWidth type="submit">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
