import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  TrophyOutlined,
  UserOutlined,
  LoginOutlined,
} from '@ant-design/icons';

function NavBar() {
  const [current, setCurrent] = useState('home');

  const onClickHandler = (event) => {
    setCurrent(event.key);
  };

  return (
    <nav>
      <Menu onClick={onClickHandler} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">HOME</Link>
        </Menu.Item>
        <Menu.Item key="ranking" icon={<TrophyOutlined />}>
          <Link to="/ranking">RANKING</Link>
        </Menu.Item>
        <Menu.Item key="my" icon={<UserOutlined />}>
          <Link to="/my">MY</Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<LoginOutlined />}>
          <Link to="/login">LOGIN</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default NavBar;
