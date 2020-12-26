import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Menu, Table } from 'antd';
import { BookOutlined, PoweroffOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const rootSubmenuKeys = ['history', 'logout'];

function MyPage(props) {
  const [openKeys, setOpenKeys] = useState(['']);
  const [history, setHistory] = useState([]);

  async function fetchData() {
    const res = await axios.get('/api/users/history');
    setHistory(res.data.history);
  }

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      if (latestOpenKey === 'history' && !history.length) {
        fetchData();
      }
    }
  };

  const onClickHandler = () => {
    axios.get('/api/users/logout').then((res) => {
      if (res.data.success) {
        props.history.push('/login');
      } else {
        alert('로그아웃에 실패했습니다.');
      }
    });
  };

  const columns = [
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '시간',
      dataIndex: 'hour',
      key: 'hour',
    },
    {
      title: '참여 종류',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '승/패',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '증감 포인트',
      dataIndex: 'point',
      key: 'point',
    },
  ];
  
  const rsp = ['가위', '바위', '보'];
  const data = history.map(h => ({...h, type: rsp[h.rsp]}));

  return (
    <div>
      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ border: 'none' }}>
        <SubMenu key="history" icon={<BookOutlined />} title="내 참여 기록">
          <Table columns={columns} dataSource={data} />
        </SubMenu>
        <Menu.Item key="logout" icon={<PoweroffOutlined />} onClick={onClickHandler}>
          로그아웃
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default withRouter(MyPage);
