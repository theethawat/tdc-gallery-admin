/* eslint-disable no-alert */
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@mui/joy";
import { useNavigate } from "react-router-dom";

import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function CreatePlace() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      products: [
        {
          type_code: "",
          name: "",
        },
      ],
    },
  });

  const handleCreate = (data) => {
    dispatch(actions.createOnePlace(data))
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        window.alert(`ไม่สามารถสร้างได้ ${err?.message}`);
      });
  };

  return (
    <div>
      <MainLayout
        title='เพิ่มสถานที่จัดแสดง'
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
                render={({ field }) => (
                  <Input {...field} placeholder='รหัสสถานที่จัดแสดง' required />
                )}
              />
            </div>
            <div className='my-2 w-full'>
              <Controller
                control={control}
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
