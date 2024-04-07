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
  Chip,
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

export default function ManagementArticle() {
  const [isReady, setIsReady] = useState(false);
  const article = useSelector((state) => state.article);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const getAllData = () => {
    dispatch(actions.getAllArticle({ page, size, name }))
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
      dispatch(actions.deleteOneArticle(id))
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
      <Link to='/article/create'>
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
        title='จัดการรายการ'
        currentPage='Store'
        rightContainer={rightButton}
        hirachyList={["หน้าหลัก"]}
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
                <th>ชื่อรายการ</th>
                <th>หมวดหมู่</th>
                <th>ดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {_.map(article?.rows, (each, index) => (
                <tr key={index}>
                  <td>{size * (page - 1) + index + 1}</td>
                  <td>{each?.name}</td>
                  <td>
                    {_.map(each?.categories, (eachCat, catIndex) => (
                      <Chip key={catIndex}>{eachCat?.name}</Chip>
                    ))}
                  </td>
                  <td className='flex gap-2'>
                    <Link to={`/article/view/${each?._id}`}>
                      <Button size='sm' color='primary'>
                        ดู
                      </Button>
                    </Link>
                    <Link to={`/article/edit/${each?._id}`}>
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
              {_.isEmpty(article?.rows) && (
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
                หน้า {page} จาก {article?.totalPage}{" "}
              </Button>
              <Button
                disabled={!(article?.totalPage > page)}
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
