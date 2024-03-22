/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Sheet, Table, LinearProgress, Input, ButtonGroup } from '@mui/joy'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import dayjs from 'dayjs'
import 'dayjs/locale/th'

import { MainLayout } from '../../components/layouts'
import * as actions from '../../redux/actions'

export default function ShoppingListManagement() {
  const [isReady, setIsReady] = useState(false)
  const shoppingList = useSelector((state) => state.shoppingList)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  // const [name, setName] = useState('')
  // const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const getAllData = () => {
    dispatch(actions.getAllShoppingList({ page, size }))
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
  }, [page, size])

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     setName(searchTerm)
  //     setPage(1)
  //   }, 700)
  //   return () => clearTimeout(delayDebounceFn)
  // }, [searchTerm])

  const handleDelete = (id) => {
    const confirm = window.confirm('ยืนยันการลบ')
    if (confirm) {
      dispatch(actions.deleteOneShoppingList(id))
        .then(() => {
          getAllData()
        })
        .catch((err) => {
          alert(`ลบไม่สำเร็จ ${err?.message}`)
        })
    }
  }

  const rightButton = (
    <div className="mr-2">
      <Link to="/shopping-list/create">
        <Button>เพิ่ม</Button>
      </Link>
    </div>
  )

  if (!isReady) {
    return (
      <div className="w-full p-12">
        <LinearProgress />
      </div>
    )
  }

  return (
    <div>
      <MainLayout title="ประวัติรายการสั่งซื้อ" currentPage="Store" rightContainer={rightButton} useBackButton>
        {/* <div className="my-4 lg:w-1/2">
          <Input
            placeholder="ค้นหา"
            startDecorator={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
        <Sheet>
          <Table size="lg" stripe="odd">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>วันที่</th>
                <th>รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {_.map(shoppingList?.rows, (each, index) => (
                <tr key={index}>
                  <td>{dayjs(each?.createdAt).locale('th').format('dddd D MMM HH:mm')}</td>
                  <td className="flex gap-2">
                    <Link to={`/shopping-list/detail/${each?._id}`}>
                      <Button size="sm">รายละเอียด</Button>
                    </Link>
                    <Link to={`/shopping-list/edit/${each?._id}`}>
                      <Button size="sm" color="warning">
                        แก้ไข
                      </Button>
                    </Link>
                    <Button size="sm" color="danger" onClick={() => handleDelete(each?._id)}>
                      ลบ
                    </Button>
                  </td>
                </tr>
              ))}
              {_.isEmpty(shoppingList?.rows) && (
                <tr>
                  <td colSpan={3}>ยังไม่มีสินค้า</td>
                </tr>
              )}
            </tbody>
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
                หน้า {page} จาก {shoppingList?.totalPage}{' '}
              </Button>
              <Button disabled={!(shoppingList?.totalPage > page)} onClick={() => setPage(page + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </ButtonGroup>
          </div>
        </Sheet>
      </MainLayout>
    </div>
  )
}
