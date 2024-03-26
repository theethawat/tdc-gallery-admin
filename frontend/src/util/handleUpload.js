import api from "../configs/api";
export const handleUpload = async (fileList) => {
  // You can use any AJAX library you like
  const uploaded = [];
  for await (const file of fileList) {
    try {
      const formData = new FormData();
      formData.append("files", file);
      const { data } = await api.post(
        `${import.meta.env.VITE_API_URL}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Data", data);
      uploaded.push(data);
    } catch (error) {
      console.error("Upload File Error", error?.message);
    }
  }

  return uploaded;
};

export default handleUpload;
