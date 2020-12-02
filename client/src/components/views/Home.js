import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Home.css';
import { Button } from 'antd';

function Home(props) {
  const [rsp, setRsp] = useState(-1);

  const hour = new Date().getHours() + 1;
  const rspText = ['가위', '바위', '보'];
  const onSubmitHandler = () => {
    if (rsp === -1) return alert('가위, 바위, 보 중 하나를 선택해주세요.');

    if (!window.confirm(`${rspText[rsp]}로 참여하시겠습니까?`)) return;

    const data = {
      // userId: Email,
      rsp,
      hour,
    };
    axios.post('/api/rsp/apply', data).then((res) => {
      if (res.data.success) {
        alert('참여해주셔서 감사합니다! 결과를 기다려주세요.');
      } else {
        alert('참여에 실패했습니다.');
      }
    });
  };

  return (
    <div className="home">
      <div className="home__header">
        <h1>가위바위보에 이겨서 랭킹 1위에 도전하세요!</h1>
        <h2>다음 내기는 {hour}시 입니다.</h2>
      </div>
      <div className="home__rsp">
        <div>
          <input
            type="radio"
            name="rsp"
            id="scissors"
            value={0}
            checked={rsp === 0}
            onChange={() => setRsp(0)}
          />
          <label htmlFor="scissors">
            <img
              className="home__img"
              src="/images/scissors.png"
              alt="scissors"
            />
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="rsp"
            id="rock"
            value={1}
            checked={rsp === 1}
            onChange={() => setRsp(1)}
          />
          <label htmlFor="rock">
            <img className="home__img" src="/images/rock.png" alt="rock" />
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="rsp"
            id="paper"
            value={2}
            checked={rsp === 2}
            onChange={() => setRsp(2)}
          />
          <label htmlFor="paper">
            <img className="home__img" src="/images/paper.png" alt="paper" />
          </label>
        </div>
      </div>
      <div>
        <Button onClick={onSubmitHandler} type="primary" size="large">
          참여하기
        </Button>
      </div>
    </div>
  );
}

export default withRouter(Home);