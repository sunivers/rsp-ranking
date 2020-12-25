import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { BookOutlined, PoweroffOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const rootSubmenuKeys = ['history', 'logout'];

function MyPage(props) {
  const [openKeys, setOpenKeys] = React.useState(['']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
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

  return (
    <div>
      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ border: 'none' }}>
        <SubMenu key="history" icon={<BookOutlined />} title="내 참여 기록">
          {/* <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item> */}
        </SubMenu>
        <Menu.Item key="logout" icon={<PoweroffOutlined />} onClick={onClickHandler}>
          로그아웃
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default withRouter(MyPage);
