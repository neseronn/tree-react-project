import React, { useState, useEffect } from 'react';
import CommonForm from '../components/CommonForm';
import { useTypedSelector } from '../store/hooks';
import MonthsFormList from '../components/MonthsFormList';
import { setIsVisible } from '../store/inputSlice';
import { useNavigate } from 'react-router-dom';
import { AllMonthInputData } from '../types/index-types';
import { message } from 'antd';
import { calculateData } from '../store/asyncActions.ts/inputData';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setSuccess } from '../store/resultSlice';

const DataEntry: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useTypedSelector((store) => store.inputData);
  const { isVisible } = useTypedSelector((store) => store.inputData);
  const { isLoading, error, isSuccess, isCalculated } = useTypedSelector(
    (store) => store.resultData
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState<boolean>(false);

  const key = 'updatable';

  const navigate = useNavigate();

  // const loadButton = () => {
  //   if (isLoading) {
  //     setLoad(true);
  //   }
  // };

  useEffect(() => {
    if (isLoading) {
      setLoad(true);
      messageApi.open({
        key,
        type: 'loading',
        content: 'Загрузка...',
        duration: 0,
      });
    }

    isSuccess &&
      messageApi
        .open({
          key,
          type: 'success',
          content: 'Расчеты выполнены!',
          duration: 1,
        })
        .then(() => {
          navigate('/results');
          setLoad(false);
          dispatch(setSuccess(false));
        });

    error &&
      messageApi
        .open({
          key,
          type: 'error',
          content:
            error === 'Request failed with status code 400'
              ? 'Данные по машинам введены некорректно!'
              : error,
          duration: 2,
        })
        .then(() => {
          setLoad(false);
        });
  }, [isLoading]);

  const onFinish = (values: AllMonthInputData) => {
    console.log('FINISH');
    console.log(data);
    if (isCalculated) {
      navigate('/results');
    } else {
      dispatch(calculateData({ ...data }));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
    messageApi.open({
      type: 'warning',
      content: 'Не все данные по машинам заполнены!',
    });
  };

  return (
    <>
      {contextHolder}
      <CommonForm setIsVisible={setIsVisible} />

      {isVisible && (
        <MonthsFormList onFinish={onFinish} onFinishFailed={onFinishFailed} loadBtn={load}/>
      )}
    </>
  );
};

export default DataEntry;
