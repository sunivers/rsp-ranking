import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import {
  HomeOutlined,
  TrophyOutlined,
  UserOutlined,
  LoginOutlined,
} from '@ant-design/icons';

function NavBar() {
  const [current, setCurrent] = useState('home');
  const { isAuth } = useSelector(state => state.user.userData || {}, []);

  const onClickHandler = (event) => {
    setCurrent(event.key);
  };

  let authComponent;
  if (isAuth) {
    authComponent = (
      <Menu.Item key="my" icon={<UserOutlined />}>
        <Link to="/my">MY</Link>
      </Menu.Item>
    );
  } else {
    authComponent = (
      <Menu.Item key="login" icon={<LoginOutlined />}>
        <Link to="/login">LOGIN</Link>
      </Menu.Item>
    );
  }

  return (
    <nav>
      <Menu onClick={onClickHandler} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">HOME</Link>
        </Menu.Item>
        <Menu.Item key="ranking" icon={<TrophyOutlined />}>
          <Link to="/ranking">RANKING</Link>
        </Menu.Item>
        {authComponent}
      </Menu>
    </nav>
  );
}

export default NavBar;
