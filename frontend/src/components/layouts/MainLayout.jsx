/* This example requires Tailwind CSS v2.0+ */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button, Breadcrumbs, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NavHeader, Footer, Sidebar } from "../navbar";
import menuList from "../../configs/menuList";

// eslint-disable-next-line max-len
export default function MainLayout({
  title,
  currentPage,
  rightContainer,
  useBackButton,
  hirachyList = ["หน้าหลัก"],
  children,
}) {
  const me = useSelector((state) => state.me);
  const navigate = useNavigate();
  return (
    <div>
      <div className='min-h-screen'>
        <NavHeader userData={me} currentPage={currentPage} />
        <div className='flex flex-wrap'>
          <div className='lg:w-1/5 hidden lg:block'>
            <Sidebar menuList={menuList} />
          </div>
          <div className='lg:w-3/4'>
            <div className='w-full py-6 md:mx-12  container px-4 lg:px-8  '>
              <div className='flex justify-between mt-20 w-full '>
                <div className='w-3/5 '>
                  <Breadcrumbs aria-label='breadcrumbs' size='sm'>
                    {hirachyList.map((item) => (
                      <Link key={item} color='neutral' href='#basics'>
                        {item}
                      </Link>
                    ))}
                    <Typography>{title}</Typography>
                  </Breadcrumbs>
                  <h1 className='text-2xl  ml-2 font-display font-bold text-gray-900'>
                    {title}
                  </h1>
                </div>
                <div className='w-2/5 flex justify-end'>
                  {rightContainer}
                  {useBackButton && (
                    <Button
                      color='neutral'
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className='mr-2' />
                      กลับ
                    </Button>
                  )}
                </div>
              </div>
              <div className='my-2 '>{children}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  currentPage: PropTypes.string,
  rightContainer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  useBackButton: PropTypes.bool,
  hirachyList: PropTypes.arrayOf(PropTypes.string),
};

MainLayout.defaultProps = {
  title: "",
  currentPage: "",
  rightContainer: <div />,
  useBackButton: false,
  hirachyList: ["หน้าหลัก"],
};
