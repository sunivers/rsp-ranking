import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Input, Button } from 'antd';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!Email || !Name || !Password) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    let data = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(data)).then((response) => {
      if (response.payload.success) {
        alert('성공적으로 회원가입 되었습니다.');
        props.history.push('/login');
      } else {
        alert('회원가입에 실패했습니다.');
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
        <Input type="email" value={Email} onChange={onEmailHandler} placeholder="이메일" size="large" />
        <br />
        <Input type="text" value={Name} onChange={onNameHandler} placeholder="이름" size="large" />
        <br />
        <Input type="password" value={Password} onChange={onPasswordHandler} placeholder="비밀번호" size="large" />
        <br />
        <Input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="비밀번호 확인" size="large" />
        <br />
        <Button onClick={onSubmitHandler} type="primary" size="large">
          회원가입
        </Button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
