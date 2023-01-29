import { useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { costActions } from '../redux/modules/reducer/costReducer'
import { friendVisibleActions } from '../redux/modules/reducer/barReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

import Layout_Header from './header';
import FriendList from './friendList';
import AddFriend from './addFriend';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

const Header = styled.header`
height: 40px;
border-bottom: 1px solid white;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  z-index: 1;
}
`

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 41px);
  height: 100%;
  padding: 0;
  position: relative;
  overflow: none;
`

interface AddFriend_Props {
  visible: string | undefined;
}

const Main__AddFriend = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 90%;
  padding: 0;
  position: absolute;
  bottom: 0px;
  background-color: #9a9a9a;
  /* z-index: 2; */
  border: 1px solid black;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  /* display:  */
  position: absolute;
  /* top: 0; */
  transform: ${(props: AddFriend_Props) => props.visible === 'block' ? 'translateY(-0%)' : 'translateY(100%)' };
  transition: ${(props: AddFriend_Props) => props.visible === 'block' ? 'transform 0.5s ease-out' : 'transform 0.5s ease-in'};
  z-index: 2;
}
`

const Main__FriendList = styled.div`
  width: 100%;
  height: calc(100vh - 41px);
  padding: 0;
  z-index: 0;
`

const BlackContainer = styled.div`
`

const Black = styled.div`
width: 100%;
height: 100%;
background-color: black;
position: absolute;
opacity: 50%;
display: none;

@media screen and (max-width: 1023px) { 
display: block;
/* transform: translateX(-150%); */
z-index: 1;
opacity: ${(props: AddFriend_Props) => props.visible === 'block' ? '80%' : '0%' };
transition: ${(props: AddFriend_Props) => props.visible === 'block' ? 'opacity 0.5s ease-out' : 'opacity 0.5s ease-in'};
}
`


function Friend() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const dispatch = useAppDispatch();

  const friendVisibleState = useAppSelector(state => state.friendVisible);

  const otherRef:any = useRef(); 

  useEffect(() => {
    function handleOutsideClick(e: any) {
      if (otherRef.current && otherRef.current.contains(e.target)) {
        dispatch(friendVisibleActions.setVisible('none'));
      }
    }

    // Component rendering 후 이벤트 등록
    document.addEventListener('click', handleOutsideClick, true);
    // Component 제거 시 이벤트 제거
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [otherRef]);

  return(
    <Container>

      <BlackContainer ref={otherRef}>
        <Black visible={friendVisibleState.visible}></Black>
      </BlackContainer>

      <Header>
        <Layout_Header></Layout_Header>
      </Header>

      <Main>
        <Main__AddFriend visible={friendVisibleState.visible}>
          <AddFriend></AddFriend>
        </Main__AddFriend>
        <Main__FriendList>
          <FriendList></FriendList>
        </Main__FriendList>
      </Main>

    </Container>
  )
}

export default Friend;