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
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link
            to='/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img src={logoVan} className='h-8' alt='App Logo' />
            <span className='self-center text-lg font-semibold  whitespace-nowrap dark:text-white font-display'>
              {app.appNameTH}
            </span>
          </Link>
          <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
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
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-sticky'
          >
            {/* <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul> */}
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
