/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Sheet,
  Table,
  LinearProgress,
  Input,
  ButtonGroup,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function ManagementCategory() {
  const [isReady, setIsReady] = useState(false);
  const category = useSelector((state) => state.category);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const getAllData = () => {
    dispatch(actions.getAllCategory({ page, size, name }))
      .then(() => {
        setIsReady(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getAllData();

    return () => {};
  }, [name, page, size]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setName(searchTerm);
      setPage(1);
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = (id) => {
    const confirm = window.confirm("ยืนยันการลบ");
    if (confirm) {
      dispatch(actions.deleteOneCategory(id))
        .then(() => {
          getAllData();
        })
        .catch((err) => {
          alert(`ลบไม่สำเร็จ ${err?.message}`);
        });
    }
  };

  const rightButton = (
    <div>
      <Link to='/management/category/create'>
        <Button>เพิ่ม</Button>
      </Link>
    </div>
  );

  if (!isReady) {
    return (
      <div className='w-full p-12'>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div>
      <MainLayout
        title='จัดการหมวดหมู่'
        currentPage='Store'
        rightContainer={rightButton}
        hirachyList={["หน้าหลัก", "การตั้งค่า"]}
      >
        <div className='my-4 lg:w-1/2'>
          <Input
            placeholder='ค้นหา'
            startDecorator={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Sheet>
          <Table size='lg' stripe='odd'>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>ลำดับที่</th>
                <th>ชื่อหมวดหมู่</th>
                <th>ชื่อสถานที่</th>
                <th>ดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {_.map(category?.rows, (each, index) => (
                <tr key={index}>
                  <td>{size * (page - 1) + index + 1}</td>
                  <td>{each?.name}</td>
                  <td>{each?.place?.name}</td>
                  <td className='flex gap-2'>
                    <Link to={`/management/category/edit/${each?._id}`}>
                      <Button size='sm' color='warning'>
                        แก้ไข
                      </Button>
                    </Link>
                    <Button
                      size='sm'
                      color='danger'
                      onClick={() => handleDelete(each?._id)}
                    >
                      ลบ
                    </Button>
                  </td>
                </tr>
              ))}
              {_.isEmpty(category?.rows) && (
                <tr>
                  <td colSpan={4}>ยังไม่มีรายการ</td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className='flex justify-end my-2'>
            <ButtonGroup variant='outlined' size='sm'>
              <Button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <Button disabled>
                หน้า {page} จาก {category?.totalPage}{" "}
              </Button>
              <Button
                disabled={!(category?.totalPage > page)}
                onClick={() => setPage(page + 1)}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </ButtonGroup>
          </div>
        </Sheet>
      </MainLayout>
    </div>
  );
}
