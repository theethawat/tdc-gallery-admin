import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { LinearProgress, Input, Button } from '@mui/joy'
import { Controller, useForm } from 'react-hook-form'

import { MainLayout } from '../../components/layouts'
import * as actions from '../../redux/actions'

export default function EditProduct() {
  const product = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const [isReady, setIsReady] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()

  useEffect(() => {
    dispatch(actions.getOneProduct(params.id))
      .then(() => {
        setIsReady(true)
      })
      .catch((err) => {
        window.alert(err?.message)
      })

    return () => {}
  }, [])

  const handleEdit = (payload) => {
    dispatch(actions.updateOneProduct(params.id, payload))
      .then(() => {
        navigate(-1)
      })
      .catch((err) => {
        window.alert(alert)
      })
  }

  if (!isReady) {
    return <LinearProgress />
  }

  return (
    <div>
      <MainLayout title="แก้ไขสินค้า" currentPage="Product" useBackButton>
        <form onSubmit={handleSubmit(handleEdit)}>
          <div className="my-2">
            <div>รหัสสินค้า</div>
            <Controller
              control={control}
              name="type_code"
              defaultValue={product?.type_code}
              render={({ field }) => <Input {...field} />}
            />
          </div>
          <div className="my-2">
            <div>ชื่อสินค้า</div>
            <Controller
              control={control}
              name="name"
              defaultValue={product?.name}
              render={({ field }) => <Input {...field} />}
            />
          </div>
          <div className="my-2">
            <Button fullWidth type="submit">
              บันทึก
            </Button>
          </div>
        </form>
      </MainLayout>
    </div>
  )
}
