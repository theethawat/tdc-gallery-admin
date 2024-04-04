import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import version from "../../version.json";
function Footer() {
  return (
    <div className='bottom-0'>
      <div className=' w-full font-display '>
        <div className='px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-center'>
          <div className='text-sm text-center text-gray-500 dark:text-gray-300 sm:text-center'>
            Create with <FontAwesomeIcon icon={faHeart} /> in 2024 From{" "}
            <a href='https://theduckcreator.in.th/'>The Duck Creator</a>,
            Version {version.version}
            <br />
            MIT Licences, Server Running on Openlanscape, Data Keep on Azure Hot
            Storage.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
