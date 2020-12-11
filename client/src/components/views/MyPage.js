import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function MyPage(props) {
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
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(MyPage);
