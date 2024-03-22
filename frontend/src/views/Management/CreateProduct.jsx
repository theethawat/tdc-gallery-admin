/* eslint-disable no-alert */
import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Button, Sheet, Table, Input } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

import { MainLayout } from '../../components/layouts'
import * as actions from '../../redux/actions'

export default function CreateProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      products: [
        {
          type_code: '',
          name: '',
        },
      ],
    },
  })

  const { append, fields, remove } = useFieldArray({
    name: 'products',
    control,
  })

  const handleCreate = (data) => {
    dispatch(
      actions.createOneProduct({
        arr: data?.products,
        many: true,
      }),
    )
      .then(() => {
        navigate(-1)
      })
      .catch((err) => {
        window.alert(`ไม่สามารถสร้างได้ ${err?.message}`)
      })
  }

  return (
    <div>
      <MainLayout title="เพิ่มสินค้า" currentPage="Store" useBackButton>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Sheet>
            <Table size="lg">
              <thead>
                <tr>
                  <th>รหัสสินค้า</th>
                  <th>ชื่อสินค้า</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {_.map(fields, (eachField, index) => (
                  <tr key={eachField.id}>
                    <td>
                      <Controller
                        control={control}
                        name={`products[${index}].type_code`}
                        render={({ field }) => <Input {...field} placeholder="รหัสสินค้า" />}
                      />
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name={`products[${index}].name`}
                        render={({ field }) => <Input {...field} placeholder="ชื่อสินค้า" />}
                      />
                    </td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => {
                          remove(index)
                        }}
                      >
                        ลบ
                      </Button>
                    </td>
                  </tr>
                ))}{' '}
                <tr>
                  <td colSpan={3}>
                    <Button type="button" onClick={() => append({})}>
                      เพิ่ม
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Sheet>

          <div className="flex my-2">
            <Button fullWidth color="primary" type="submit">
              บันทึก
            </Button>
          </div>
        </form>
      </MainLayout>
    </div>
  )
}
