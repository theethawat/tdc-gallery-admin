/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Sheet, Table, LinearProgress, Input, ButtonGroup } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { MainLayout } from '../../components/layouts'
import * as actions from '../../redux/actions'

function AmountAdding({ appendFunction, selectedData, disabled = false }) {
  const [amount, setAmount] = useState(1)
  return (
    <td className="flex gap-2">
      <Input
        defaultValue={1}
        placeholder="จำนวน"
        size="sm"
        onChange={(e) => setAmount(e.target.value)}
        disabled={disabled}
      />
      <Button
        size="sm"
        onClick={() => {
          appendFunction({
            ...selectedData,
            amount,
          })
        }}
        disabled={disabled}
      >
        เพิ่ม
      </Button>
    </td>
  )
}

export default function CreateShoppingList() {
  const [isReady, setIsReady] = useState(false)
  const product = useSelector((state) => state.product)
  const shoppingList = useSelector((state) => state.shoppingList)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(25)
  const [name, setName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'products',
  })

  const getAllData = () => {
    dispatch(actions.getAllProduct({ page, size, name }))
      .then(() => {
        setIsReady(true)
      })
      .catch((err) => {
        alert(err)
      })
  }
  useEffect(() => {
    getAllData()

    return () => {}
  }, [name, page, size])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setName(searchTerm)
      setPage(1)
    }, 700)
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const handleCreateShoppingList = (payload) => {
    const preparedPayload = _.map(payload?.products, (eachProd) => ({
      product: eachProd?._id,
      amount: eachProd?.amount,
    }))
    console.log('Prepared payload', preparedPayload)
    dispatch(actions.createOneShoppingList({ products: preparedPayload }))
      .then(() => {})
      .catch((err) => {
        window.alert(`ไม่สามารถสร้างรายการสั่งซื้อได้ ${err?.message}`)
      })
  }

  useEffect(() => {
    if (shoppingList?.isCreate) {
      navigate(`/shopping-list/detail/${shoppingList?._id}`)
    }

    return () => {}
  }, [shoppingList])

  const rightButton = (
    <div>
      <Button color="success" onClick={handleSubmit(handleCreateShoppingList)}>
        บันทึกรายการ
      </Button>
    </div>
  )

  const checkIsSelect = (productId) => {
    const productIds = _.map(fields, (each) => each?._id)
    return _.includes(productIds, productId)
  }

  return (
    <div>
      <MainLayout title="เพิ่มรายการสั่งซื้อของ" currentPage="Store" rightContainer={rightButton}>
        <div className="my-4">
          <h3 className="text-lg font-semibold font-display my-2">รายการที่เตรียมบันทึก</h3>
          <Sheet>
            <Table stripe="odd">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>รหัสสินค้า</th>
                  <th>ชื่อสินค้า</th>
                  <th>ดำเนินการ</th>
                </tr>
              </thead>
              {_.map(fields, (each, index) => (
                <tr key={each.index}>
                  <td>{each?.type_code}</td>
                  <td>{each?.name}</td>
                  <td className="flex gap-2">
                    <Controller
                      control={control}
                      name={`products[${index}].amount`}
                      defaultValue={each?.amount}
                      render={({ field }) => <Input {...field} placeholder="จำนวน" size="sm" />}
                    />{' '}
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      ลบ
                    </Button>
                  </td>
                </tr>
              ))}
              {_.isEmpty(fields) && (
                <tr>
                  <td colSpan={3}>ยังไม่มีสินค้าในรายการ</td>
                </tr>
              )}
            </Table>
          </Sheet>
        </div>
        <div className="my-4 mt-8 lg:w-1/2">
          <Input
            placeholder="ค้นหา"
            startDecorator={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Sheet>
          <Table stripe="odd">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>รหัสสินค้า</th>
                <th>ชื่อสินค้า</th>
                <th>ดำเนินการ</th>
              </tr>
            </thead>
            {isReady ? (
              <tbody>
                {_.map(product?.rows, (each, index) => (
                  <tr key={index}>
                    <td>{each?.type_code}</td>
                    <td>{each?.name}</td>
                    <AmountAdding appendFunction={append} selectedData={each} disabled={checkIsSelect(each?._id)} />
                  </tr>
                ))}
                {_.isEmpty(product?.rows) && (
                  <tr>
                    <td colSpan={3}>ยังไม่มีสินค้า</td>
                  </tr>
                )}
              </tbody>
            ) : (
              <LinearProgress />
            )}
          </Table>
          <div className="flex justify-end my-2">
            <ButtonGroup variant="outlined" size="sm">
              <Button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1)
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <Button disabled>
                หน้า {page} จาก {product?.totalPage}{' '}
              </Button>
              <Button disabled={!(product?.totalPage > page)} onClick={() => setPage(page + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </ButtonGroup>
          </div>
        </Sheet>
      </MainLayout>
    </div>
  )
}

AmountAdding.propTypes = {
  appendFunction: PropTypes.func,
  selectedData: PropTypes.any,
  disabled: PropTypes.bool,
}

AmountAdding.defaultProps = {
  appendFunction: () => {},
  selectedData: {},
  disabled: false,
}
