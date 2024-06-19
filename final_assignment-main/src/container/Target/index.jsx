import {
  TargetBody,
  TargetBodyHeader,
  TargetContainer,
  TargetHeader,
  TargetLayout,
} from './styled';
import { Table, Button, Modal, Space, Select, Input, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import * as selectors from './targetSlice';

const Target = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.selectIsLoading);
  const listTarget = useSelector(selectors.selectListTarget);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [optionsDayOfWeek, setOptionsDayOfWeek] = useState([
    { value: 0, label: 'Thứ 2' },
    { value: 1, label: 'Thứ 3' },
    { value: 2, label: 'Thứ 4' },
    { value: 3, label: 'Thứ 5' },
    { value: 4, label: 'Thứ 6' },
    { value: 5, label: 'Thứ 7' },
    { value: 6, label: 'Chủ nhật' },
  ]);
  const [optionsStudyTime, setOptionsStudyTime] = useState([
    { value: 0, label: '15 phút' },
    { value: 1, label: '30 phút' },
    { value: 2, label: '1 giờ' },
    { value: 3, label: '1 giờ 30 phút' },
    { value: 4, label: '2 giờ' },
    { value: 5, label: '2 giờ 30 phút' },
    { value: 6, label: '3 giờ' },
  ]);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [studyTime, setStudyTime] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const getCookie = (name) => {
    let nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  };
  const userId = +getCookie('id');

  const columns = [
    {
      title: 'Thứ trong tuần',
      key: 'dayOfWeek',
      render: (_, record) => (
        <span>
          {
            optionsDayOfWeek.find((item) => item.value === record.dayOfWeek)
              .label
          }
        </span>
      ),
    },
    {
      title: 'Thời gian học',
      key: 'studyTime',
      render: (_, record) => (
        <span>
          {
            optionsStudyTime.find((item) => item.value === record.studyTime)
              .label
          }
        </span>
      ),
    },
    {
      title: 'Số lượng bài học',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => handleEdit(record)}>
              Sửa
            </Button>
            <Button type="primary" onClick={() => handleDelete(record.id)}>
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleResetModal = () => {
    setAmount('');
    setDayOfWeek(null);
    setStudyTime(null);
    setTargetId(null);
    setIsEdit(false);
  };

  const handleOk = () => {
    if (amount && dayOfWeek !== null && studyTime !== null) {
      handleResetModal();
      setIsOpenModal(false);
      if (!isEdit) {
        dispatch(
          actions.createTarget({
            userId: userId,
            amount: +amount,
            dayOfWeek,
            studyTime,
          })
        );
      } else {
        dispatch(
          actions.editTarget({
            targetId,
            amount: +amount,
            dayOfWeek,
            studyTime,
          })
        );
      }
    } else {
      alert('Nhập đủ thông tin');
    }
  };

  const handleCancel = () => {
    handleResetModal();
    setIsOpenModal(false);
  };

  const handleDelete = (targetId) => {
    const result = confirm('Xác nhận xoá mục tiêu');
    if (result) {
      dispatch(actions.deleteTarget(targetId));
    }
  };

  const handleEdit = (record) => {
    setAmount(record.amount);
    setIsEdit(true);
    setTargetId(record.id);
    setDayOfWeek(record.dayOfWeek);
    setStudyTime(record.studyTime);
    setIsOpenModal(true);
  };

  useEffect(() => {
    dispatch(actions.getListTarget(userId));
  }, []);

  useEffect(() => {
    const listValueDayOfWeekApi = listTarget.map((item) => item.dayOfWeek);
    setOptionsDayOfWeek((prev) => {
      return prev.map((item) => {
        if (listValueDayOfWeekApi.includes(item.value)) {
          return { ...item, disabled: true };
        }
        return { ...item, disabled: false };
      });
    });
  }, [listTarget]);

  return (
    <TargetContainer>
      <TargetLayout>
        <TargetHeader>
          Hãy thiết lập mục tiêu để có kết quả học tốt hơn
        </TargetHeader>
        <TargetBody>
          <TargetBodyHeader>
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              Tổng số mục tiêu: {listTarget.length}
            </div>
            <Button type="primary" onClick={() => setIsOpenModal(true)}>
              Thêm mới
            </Button>
          </TargetBodyHeader>
          <Table
            columns={columns}
            dataSource={listTarget}
            loading={isLoading}
          />
        </TargetBody>
      </TargetLayout>
      <Modal
        title={isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Space wrap direction="vertical">
          <div>
            <h4>Chọn thứ trong ngày</h4>
            <Select
              value={dayOfWeek}
              onChange={(e) => {
                setDayOfWeek(e);
              }}
              placeholder="Chọn thứ"
              style={{ width: 200 }}
              options={optionsDayOfWeek}
            />
          </div>
          <div>
            <h4>Chọn thời gian học</h4>
            <Select
              placeholder="Chọn thời gian học"
              style={{ width: 200 }}
              options={optionsStudyTime}
              value={studyTime}
              onChange={(value) => {
                setStudyTime(value);
              }}
            />
          </div>
          <div>
            <h4>Nhập số lượng bài học</h4>
            <Tooltip
              trigger={['focus']}
              title={'Nhập số'}
              placement="topLeft"
              overlayClassName="numeric-input"
            >
              <Input
                value={amount}
                onChange={(e) => {
                  const { value: inputValue } = e.target;
                  console.log(inputValue);
                  const reg = /^-?\d*(\.\d*)?$/;
                  if (
                    reg.test(inputValue) ||
                    inputValue === '' ||
                    inputValue === '-'
                  ) {
                    setAmount(inputValue);
                  }
                }}
                placeholder="Nhập số lượng bài học hoàn thành"
                maxLength={2}
              />
            </Tooltip>
          </div>
        </Space>
      </Modal>
    </TargetContainer>
  );
};

export default Target;
