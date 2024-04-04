/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, LinearProgress, Autocomplete } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function EditCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const place = useSelector((state) => state.place);
  const category = useSelector((state) => state.category);
  const params = useParams();

  const { control, handleSubmit } = useForm({
    defaultValues: category,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(actions.getOneCategory(params.id)).then(() => {
      dispatch(
        actions.getAllPlace({
          name: "",
          page: 1,
          size: 1000,
        })
      ).then(() => {
        setIsReady(true);
      });
    });

    return () => {};
  }, [params]);

  const handleCreate = (data) => {
    console.log("Data", data);
    dispatch(actions.updateOneArticle(params.id, data))
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        window.alert(`ไม่สามารถสร้างได้ ${err?.message}`);
      });
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title='แก้ไขหมวดหมู่'
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "การตั้งค่า", "หมวดหมู่"]}
      >
        <form onSubmit={handleSubmit(handleCreate)}>
          <div className='flex flex-wrap'>
            <div className='my-2 w-full'>
              <Controller
                control={control}
                defaultValue={category?.place}
                name={`place`}
                render={({ field }) => (
                  <Autocomplete
                    placeholder='เลือกสถานที่จัดแสดง'
                    {...field}
                    options={place?.rows}
                    getOptionLabel={(option) => option.name}
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
                name={`name`}
                defaultValue={category?.name}
                render={({ field }) => (
                  <Input {...field} placeholder='ชื่อหมวดหมู่' required />
                )}
              />
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
