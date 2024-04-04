/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function ViewArticle() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  const image = useSelector((state) => state.image);
  const params = useParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(actions.getOneArticle(params.id)).then(() => {
      dispatch(
        actions.getAllImage({
          page: 1,
          size: 15,
          article: params.id,
        })
      );
      setIsReady(true);
    });

    return () => {};
  }, [params]);

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title={article?.name || ""}
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "รายการ"]}
      >
        <p className='p-2'>{article?.description}</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {_.map(image?.rows, (eachImage, index) => (
            <img src={eachImage?.url} key={index} className='h-48 p-2' />
          ))}
        </div>
      </MainLayout>
    </div>
  );
}
