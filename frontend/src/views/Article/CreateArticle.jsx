/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Input,
  LinearProgress,
  Autocomplete,
  Textarea,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { MainLayout } from "../../components/layouts";
import Upload from "../../components/Upload";
import * as actions from "../../redux/actions";
import { handleUpload } from "../../util";

export default function CreateArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.category);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [isReady, setIsReady] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(
      actions.getAllCategory({
        name: "",
        page: 1,
        size: 1000,
      })
    ).then(() => {
      setIsReady(true);
    });

    return () => {};
  }, []);

  const handleCreate = async (data) => {
    if (!_.isEmpty(images)) {
      handleUpload(images).then((uploadedImages) => {
        console.log("Upload Success");
        const payload = { ...data, images: uploadedImages };
        console.log("Payload", payload);
        dispatch(actions.createOneArticle(payload))
          .then(() => {
            navigate(-1);
          })
          .catch((err) => {
            window.alert(`ไม่สามารถสร้างได้ ${err?.message}`);
          });
      });
    } else {
      dispatch(actions.createOneArticle({ ...data }))
        .then(() => {
          navigate(-1);
        })
        .catch((err) => {
          window.alert(`ไม่สามารถสร้างได้ ${err?.message}`);
        });
    }
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title='เพิ่มรายการ'
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "รายการ"]}
      >
        <form onSubmit={handleSubmit(handleCreate)}>
          <div className='flex flex-wrap'>
            <div className='my-2 w-full'>
              <Controller
                control={control}
                name={`name`}
                render={({ field }) => (
                  <Input {...field} placeholder='ชื่อรายการ' required />
                )}
              />
            </div>
            <div className='my-2 w-full'>
              <Controller
                control={control}
                name={`category`}
                render={({ field }) => (
                  <Autocomplete
                    placeholder='เลือกหมวดหมู่'
                    {...field}
                    options={category?.rows}
                    getOptionLabel={(option) =>
                      `${option.name} (${option?.place?.name})`
                    }
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
            </div>
            <div className='my-2 w-full'>
              <Controller
                control={control}
                name={`description`}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    minRows={5}
                    placeholder='คำอธิบายประกอบ'
                  />
                )}
              />
            </div>
            <div className='my-2 w-full'>
              <Upload fileList={images} setFileList={setImages} />
            </div>
          </div>

          <div className='flex my-2'>
            <Button fullWidth color='primary' type='submit'>
              บันทึก
            </Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
