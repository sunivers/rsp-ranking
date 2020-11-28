import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

/**
 *
 * @param {Component} SpecificComponent
 * @param {null || true || false} option
 * @description null => 아무나 출입 가능한 페이지
 * @description true => 로그인한 유저만 출입 가능한 페이지
 * @description false => 로그인한 유저는 출입 불가능한 페이지
 * @param {*} adminRoute
 */
export default function (SpecificComponent, option) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);

        if (!res.payload.isAuth) {
          // 로그인 하지 않은 상태
          if (option) {
            props.history.push('/login');
          }
        } else {
          // 로그인 한 상태
          if (option === false) {
            props.history.push('/');
          }
        }
      });
    });
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
