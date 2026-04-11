import api from "./api";
export const handleUpload = async (fileList: File[]) => {
  // You can use any AJAX library you like
  const uploaded = [];
  for await (const file of fileList) {
    try {
      const formData = new FormData();
      formData.append("files", file);
      const { data } = await api.post("/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Data", data);
      uploaded.push(data);
    } catch (error: Error | unknown) {
      console.error("Upload File Error", error?.message);
    }
  }

  return uploaded;
};

export default handleUpload;
