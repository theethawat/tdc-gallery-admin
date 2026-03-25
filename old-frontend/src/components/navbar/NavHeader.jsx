import React from "react";

import { Link } from "react-router-dom";
import { Button } from "@mui/joy";
import PropTypes from "prop-types";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { app } from "../../configs";
import * as actions from "../../redux/actions";
/* This example requires Tailwind CSS v2.0+ */
import logoVan from "../../logovan.png";

export default function NavHeader({ userData, currentPage }) {
  const dispatch = useDispatch();
  return (
    <div>
      <nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
        <div className='flex flex-wrap items-center justify-between p-4 '>
          <Link
            to='/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img src={logoVan} className='h-8' alt='App Logo' />
            <span className='self-center text-lg font-semibold  whitespace-nowrap dark:text-white font-display'>
              {app.appNameTH}
            </span>
          </Link>
          <div className=''>
            <Button
              variant='outlined'
              color='neutral'
              onClick={() => dispatch(actions.meLogOut())}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className='mr-2'
              />
              ลงชื่อออก
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

NavHeader.propTypes = {
  userData: PropTypes.shape({
    isReady: PropTypes.bool,
    name: PropTypes.string,
    role: PropTypes.string,
    username: PropTypes.string,
  }),
  currentPage: PropTypes.string,
};

NavHeader.defaultProps = {
  userData: {
    isReady: true,
    name: "",
    role: "",
    username: "",
  },
  currentPage: "",
};
