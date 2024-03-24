import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Sidebar({ menuList = [] }) {
  return (
    <div>
      <div
        id='default-sidebar'
        className='relative left-0  top-20 w-64  z-10 bottom-36 transition-transform -translate-x-full sm:translate-x-0'
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto font-display  z-20 dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            {_.map(menuList, (each, index) => (
              <li key={index}>
                <Link
                  to={each?.link}
                  className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                >
                  <FontAwesomeIcon icon={each?.icon} />
                  <span className='ms-3'>{each?.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  menuList: PropTypes.arrayOf(PropTypes.object),
};

Sidebar.defaultProps = {
  menuList: [],
};
