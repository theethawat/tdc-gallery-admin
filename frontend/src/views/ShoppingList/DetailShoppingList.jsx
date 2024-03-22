/* eslint-disable max-len */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Sheet, Table, LinearProgress, Input, ButtonGroup } from '@mui/joy'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareShareNodes, faCopy } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

import { MainLayout } from '../../components/layouts'
import * as actions from '../../redux/actions'

export default function DetailShoppingList() {
  const [isReady, setIsReady] = useState(false)
  const shoppingList = useSelector((state) => state.shoppingList)
  const params = useParams()
  // const [name, setName] = useState('')
  const dispatch = useDispatch()

  const getAllData = () => {
    dispatch(actions.getOneShoppingList(params.id))
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
  }, [params])

  const rightButton = (
    <div className="mr-2">
      <Link to={`/shopping-list/edit/${params.id}`}>
        <Button color="warning">แก้ไข</Button>
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

  const textShoppingList = _.map(
    shoppingList?.products,
    (each, index) => `${index + 1} ${each?.product?.type_code || ''} - ${each?.product?.name} จำนวน ${each?.amount} \n`,
  )

  return (
    <div>
      <MainLayout title="รายการสั่งซื้อสินค้า" currentPage="Store" rightContainer={rightButton} useBackButton>
        {/* <div className="my-4 lg:w-1/2">
          <Input
            placeholder="ค้นหา"
            startDecorator={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onChange={(e) => setName(e.target.value)}
          />
        </div> */}
        <Sheet>
          <Table size="lg" stripe="odd">
            <thead>
              <tr>
                <th>No</th>
                <th style={{ width: '30%' }}>รหัสสินค้า</th>
                <th>สินค้า</th>
                <th>จำนวน</th>
              </tr>
            </thead>
            <tbody>
              {_.map(shoppingList?.products, (each, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{each?.product?.type_code}</td>
                  <td>{each?.product?.name}</td>
                  <td>{each?.amount}</td>
                </tr>
              ))}
              {_.isEmpty(shoppingList?.products) && (
                <tr>
                  <td colSpan={4}>ยังไม่มีสินค้า</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Sheet>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              navigator.share({ title: 'รายการสั่งซื้อสินค้า', text: textShoppingList })
            }}
          >
            <FontAwesomeIcon icon={faSquareShareNodes} className="mr-2" />
            แชร์
          </Button>
          <Button
            color="success"
            onClick={() => {
              navigator.clipboard.writeText(textShoppingList)
              alert('คัดลอกลงในคลิปบอร์ดสำเร็จ สามารถเปิดแอพพลิเคชั่นอื่นเพื่อวางได้เลย')
            }}
          >
            <FontAwesomeIcon icon={faCopy} className="mr-2" />
            คัดลอก
          </Button>
        </div>
      </MainLayout>
    </div>
  )
}
