import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { Button } from "@mui/joy";

import { NoSidebarLayout } from "../components/layouts";

function Home() {
  return (
    <NoSidebarLayout title='หน้าแรก' currentPage='Home'>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3  w-full gap-2 my-4'>
          <div className=''>
            <Link to='/article'>
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
            <Link to='/management/place'>
              <Button size='lg' color='neutral' fullWidth>
                <div className='py-8'>
                  <div className='text-center text-2xl'>
                    <FontAwesomeIcon icon={faSliders} />
                  </div>
                  <div className='font-display'>จัดการหมวดหมู่และสถานที่</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </NoSidebarLayout>
  );
}

export default Home;
