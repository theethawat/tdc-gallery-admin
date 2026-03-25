/* eslint-disable no-alert */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, LinearProgress } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function EditPlace() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const place = useSelector((state) => state.place);
  const params = useParams();
  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(actions.getOnePlace(params.id)).then(() => {
      setIsReady(true);
    });

    return () => {};
  }, [params]);

  const handleCreate = (data) => {
    dispatch(actions.updateOnePlace(params.id, data))
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        window.alert(`ไม่สามารถแก้ไขได้ ${err?.message}`);
      });
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title='แก้ไขสถานที่จัดแสดง'
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "การตั้งค่า", "จัดการสถานที่จัดแสดง"]}
      >
        <form onSubmit={handleSubmit(handleCreate)}>
          <div className='flex flex-wrap'>
            <div className='my-2 w-full'>
              <Controller
                control={control}
                name={`type_code`}
                defaultValue={place?.type_code}
                render={({ field }) => (
                  <Input {...field} placeholder='รหัสสถานที่จัดแสดง' required />
                )}
              />
            </div>
            <div className='my-2 w-full'>
              <Controller
                control={control}
                defaultValue={place?.name}
                name={`name`}
                render={({ field }) => (
                  <Input {...field} placeholder='ชื่อสถานที่จัดแสดง' required />
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
