import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!Email || !Password) {
      alert('이메일과 패스워드를 모두 입력해주세요.');
      return;
    }

    let data = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(data)).then((response) => {
      if (response.payload.success) {
        props.history.push('/');
      } else {
        alert(response.payload.message || 'Error');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px'
        }}
      >
        <Input type="email" value={Email} onChange={onEmailHandler} placeholder="이메일" size="large" prefix={<UserOutlined />} />
        <br />
        <Input type="password" value={Password} onChange={onPasswordHandler} placeholder="비밀번호" size="large" prefix={<LockOutlined />} />
        <br />
        <Button onClick={onSubmitHandler} type="primary" size="large">
          로그인
        </Button>
        <br />
        <Button type="link">
          <Link to="/register">아직 회원이 아니신가요?</Link>
        </Button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
