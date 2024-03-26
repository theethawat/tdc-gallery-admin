import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload as UploadButton } from "antd";
import PropTypes from "prop-types";

const Upload = ({ fileList = [], setFileList = () => {} }) => {
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <UploadButton {...props} multiple maxCount={15}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </UploadButton>
    </>
  );
};
export default Upload;

Upload.propTypes = {
  fileList: PropTypes.arrayOf(PropTypes.object),
  setFileList: PropTypes.func,
};
