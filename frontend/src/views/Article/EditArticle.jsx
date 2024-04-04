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
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import { MainLayout } from "../../components/layouts";
import Upload from "../../components/Upload";
import * as actions from "../../redux/actions";
import { handleUpload } from "../../util";

export default function EditArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.category);
  const article = useSelector((state) => state.article);
  const image = useSelector((state) => state.image);
  const params = useParams();
  const { control, handleSubmit } = useForm({
    defaultValues: article,
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
    );
    dispatch(actions.getOneArticle(params.id)).then(() => {
      setIsReady(true);
      dispatch(
        actions.getAllImage({
          page: 1,
          size: 15,
          article: params.id,
        })
      );
    });

    return () => {};
  }, [params]);

  const handleUpdate = async (data) => {
    if (!_.isEmpty(images)) {
      handleUpload(images).then((uploadedImages) => {
        console.log("Upload Success");
        const payload = { ...data, images: uploadedImages };
        console.log("Payload", payload);
        dispatch(actions.updateOneArticle(params.id, payload))
          .then(() => {
            navigate(-1);
          })
          .catch((err) => {
            window.alert(`ไม่สามารถแก้ไขได้ ${err?.message}`);
          });
      });
    } else {
      dispatch(actions.updateOneArticle(params.id, { ...data }))
        .then(() => {
          navigate(-1);
        })
        .catch((err) => {
          window.alert(`ไม่สามารถแก้ไขได้ ${err?.message}`);
        });
    }
  };

  const handleDeleteImage = (id) => {
    const confirm = window.confirm("ยืนยันการลบ");
    if (confirm) {
      dispatch(actions.deleteOneImage(id)).then(() => {
        dispatch(
          actions.getAllImage({
            page: 1,
            size: 15,
            article: params.id,
          })
        );
      });
    }
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title='แก้ไขรายการ'
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "รายการ"]}
      >
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className='flex flex-wrap'>
            <div className='my-2 w-full'>
              <Controller
                control={control}
                name={`name`}
                defaultValue={article?.name}
                render={({ field }) => (
                  <Input {...field} placeholder='ชื่อรายการ' required />
                )}
              />
            </div>
            <div className='my-2 w-full'>
              <Controller
                control={control}
                name={`category`}
                defaultValue={article?.category}
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
                defaultValue={article?.description}
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

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {_.map(image?.rows, (eachImage, index) => (
              <div key={index} className='p-2 border rounded-md'>
                <img src={eachImage?.url} className='h-32' />
                <div className='flex justify-center my-2'>
                  <Button
                    color='danger'
                    type='button'
                    onClick={() => handleDeleteImage(eachImage?._id)}
                  >
                    ลบ
                  </Button>
                </div>
              </div>
            ))}
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
