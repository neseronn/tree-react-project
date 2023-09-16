import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Space } from 'antd';
import { ChangedCommonInputData, CommonInputData } from '../types/index-types';
import { changeCommonData, setCommonData } from '../store/inputSlice';
import { useTypedSelector } from '../store/hooks';
import { Typography } from 'antd';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
const { Title } = Typography;

const techSystem = [
  'В+Т+С+П',
  'В+С+Т+П',
  'В+С+Т+П',
  'В+Т+С+П',
  'В+Т+С',
  'В+Т+П',
  'ВСР+Т+П',
  'В+Т',
  'ВСР+Т',
  'ВТ+СР+П',
  'ВТ+СР',
  'ВТ+П',
];

const CommonForm: React.FC<any> = ({ setIsVisible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { DataCalculated } = useTypedSelector((store) => store.inputData.data);

  const [form] = Form.useForm<CommonInputData>();
  const values = Form.useWatch([], form);
  // const countMonth = Form.useWatch(['CountMonth'], form);
  const [submittable, setSubmittable] = useState(true);

  // Обработчик изменения значений в форме
  const handleFormValuesChange = (
    changedValues: ChangedCommonInputData,
    allValues: CommonInputData
  ) => {
    dispatch(changeCommonData(changedValues));
    console.log('handleFormValuesChange: сохранены в redux');
  };

  // Для обновления количества месяцев при добавлении/удалении карточки месяца
  useEffect(() => {
    form.setFieldValue('CountMonth', DataCalculated.CountMonth);
  }, [DataCalculated.CountMonth]);

  // Валидация, сохранение данных и открытие второй формы
  useEffect(() => {
    console.log(values);
    // dispatch(setCommonData(values));
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
        // ставить таблицу !disabled
        console.log('Всё введено, можно подтверждать');

        // console.log('Данные сохранены в redux');
      },
      () => {
        setSubmittable(false);
        // ставить таблицу disabled
      }
    );
  }, [values]);

  useEffect(() => {
    console.log('Данные при первом рендере:');
    console.log(values);
  }, []);

  // useEffect(() => {
  //   if (DataCalculated?.CountMonth)
  //     form.setFieldValue('CountMonth', DataCalculated.CountMonth);
  // }, [DataCalculated?.CountMonth]);

  const onFinish = (values: CommonInputData) => {
    // console.log(values);
    // dispatch(addTechSystem(values));
    // form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={DataCalculated}
      onValuesChange={handleFormValuesChange}
      // autoComplete='off'
      layout='vertical'
      style={{
        width: 350,
        minWidth: 350,
        padding: 20,
        backgroundColor: 'white',
        margin: '0 auto',
        borderRadius: 6,
      }}>
      <Title level={4} style={{ textAlign: 'center' }}>
        Введите общие данные
      </Title>

      <Form.Item
        label='Количество месяцев'
        name='CountMonth'
        rules={[
          {
            required: true,
            message: 'Введите количество месяцев!',
          },
        ]}>
        <InputNumber
          min={1}
          max={12}
          value={DataCalculated?.CountMonth}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Первый месяц'
        name='FirstMonth'
        rules={[
          {
            required: true,
            message: 'Введите первый месяц!',
          },
        ]}>
        <InputNumber
          min={1}
          max={12}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Марка'
        name='markCar'
        rules={[
          {
            required: true,
            message: 'Введите марку машины!',
          },
        ]}>
        <Input
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Общий запас на лесосеке'
        name='TotalStock'
        rules={[
          {
            required: true,
            message: 'Введите общий запас на лесосеке!',
          },
        ]}>
        <InputNumber
          addonAfter='кбм'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Средний запас на лесосеке'
        name='AvgStock'
        rules={[
          {
            required: true,
            message: 'Введите средний запас на лесосеке!',
          },
        ]}>
        <InputNumber
          addonAfter='кбм/га'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Длина зоны вырубки'
        name='ZoneLength'
        rules={[
          {
            required: true,
            message: 'Введите длину зоны вырубки!',
          },
        ]}
        style={{ width: '100%' }}>
        <InputNumber
          addonAfter='м'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Число смен в один день на вывозке'
        name='ShiftsNumber'
        rules={[
          {
            required: true,
            message: 'Введите число смен!',
          },
        ]}
        style={{ width: '100%' }}>
        <InputNumber
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Сменная производительность машин на вывозке'
        name='replaceableMachinePerfomance'
        rules={[
          {
            required: true,
            message: 'Введите сменную производительность!',
          },
        ]}
        style={{ width: '100%' }}>
        <InputNumber
          addonAfter='кбм в смену'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Технологическая система'
        name='N'
        rules={[
          {
            required: true,
            message: 'Выберите технологическую систему!',
          },
        ]}
        style={{ width: '100%' }}>
        <Radio.Group>
          <Space direction='vertical'>
            {techSystem.slice(0, 4).map((val, i) => (
              <Radio key={i} value={i}>
                {val}
              </Radio>
            ))}
          </Space>
          <Space direction='vertical'>
            {techSystem.slice(4, 8).map((val) => (
              <Radio
                key={techSystem.indexOf(val)}
                value={techSystem.indexOf(val)}>
                {val}
              </Radio>
            ))}
          </Space>
          <Space direction='vertical'>
            {techSystem.slice(8, 12).map((val, i) => (
              <Radio
                key={techSystem.indexOf(val)}
                value={techSystem.indexOf(val)}>
                {val}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Button
            type='primary'
            disabled={!submittable}
            htmlType='submit'
            onClick={(e) => {
              submittable && dispatch(setIsVisible(true));
              window.scrollTo({
                top: 0,
                behavior: 'smooth', // Добавляем плавную анимацию скролла
              });
              // console.log(values);
            }}>
            Подтвердить
          </Button>
          <Button htmlType='reset'>Очистить</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CommonForm;
