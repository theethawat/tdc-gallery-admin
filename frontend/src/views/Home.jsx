import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faSliders,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { Button } from "@mui/joy";

import { MainLayout } from "../components/layouts";

function Home() {
  return (
    <MainLayout title='หน้าแรก' currentPage='Home'>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3  w-full gap-2 my-4'>
          <div className=''>
            <Link to='/shopping-list/create'>
              <Button size='lg' fullWidth>
                <div className='py-8'>
                  <div className='text-center text-2xl'>
                    <FontAwesomeIcon icon={faList} />
                  </div>
                  <div className='font-display'>จัดการของในแกลอรี่</div>
                </div>
              </Button>
            </Link>
          </div>
          <div className=''>
            <Link to='/product'>
              <Button size='lg' color='neutral' fullWidth>
                <div className='py-8'>
                  <div className='text-center text-2xl'>
                    <FontAwesomeIcon icon={faSliders} />
                  </div>
                  <div className='font-display'>จัดการหมวดหมู่</div>
                </div>
              </Button>
            </Link>
          </div>
          <div className=''>
            <Link to='/shopping-list/'>
              <Button size='lg' color='success' fullWidth>
                <div className='py-8'>
                  <div className='text-center text-2xl'>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                  </div>
                  <div className='font-display'>ประวัติการสั่งซื้อ</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
