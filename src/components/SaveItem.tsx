import {
  CalendarOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, List, Popconfirm, Space, Typography } from 'antd';
import { Save } from '../types/history-types';

interface SaveItemProps {
  item: Save;
  selectSave: (id: number | null) => void;
  currentId: number | null;
  handleDelete: (id: number | null) => void;
}

const SaveItem = ({
  item,
  selectSave,
  currentId,
  handleDelete,
}: SaveItemProps) => {

  return (
    <List.Item
      actions={[
        <Space>
          <CalendarOutlined />
          {item.date && new Date(item.date).toLocaleString('ru-RU')}
        </Space>,
      ]}
      extra={[
        <Space key={'Space' + item.id}>
          <Button
            type={currentId === item.id ? 'dashed' : 'default'}
            size='large'
            key={'Btn' + item.id}
            // disabled={currentId === item.id && isChanged ?  }
            onClick={() => selectSave(item.id)}>
            {currentId === item.id ? 'Загружено' : 'Получить данные'}
          </Button>
          <Popconfirm
            key={'Popconfirm' + item.id}
            title='Вы действительно хотите удалить это сохранение?'
            okText='Да'
            cancelText='Отмена'
            placement='left'
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(item.id)}
          >
            <Button
              type='default'
              size='large'
              icon={<DeleteOutlined />}
              danger
            />
          </Popconfirm>
        </Space>,
      ]}>
      <List.Item.Meta
        title={item.name}
        description={<Typography.Text>{item.comment}</Typography.Text>}
      />
    </List.Item>
  );
};

export default SaveItem;
