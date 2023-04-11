/** 
 * 일정 상세 페이지
 * 
 * */  
import axios from "axios"; 
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { getCalculateTitle, getCalculateComplete } from "../apis/api/calculate";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { barActions } from "../redux/modules/reducer/barReducer";
import { calculateActions } from "../redux/modules/reducer/calculateReducer";

import Appointment_Header from "../components/calculateDetail/header";
import MemberList from "../components/calculateDetail/membrList";
import CostList from "../pages/costList";


function Appointment() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const num: string | undefined = params.num; // 일정 번호

  const blackRef: any = useRef(null); 

  const barState = useAppSelector(state => state.barState); // 멤버리스트 visible

  /* 정산 이름 가져오기 */
  const getTitle = async () => { 
    try {
      let title = await getCalculateTitle(num);
      dispatch(calculateActions.setCaculateListNum(num)); // 일정 번호 설정
      dispatch(calculateActions.setCalculateName(title.data.title)); // 일정 이름 설정
    } catch(e) {
      console.log(e);
    }
  }

  /* 정산 상태와 관련된 내용 가져오기 */
  const getComplete = async () => {
    try {
      let completeState = await getCalculateComplete(num);
      dispatch(calculateActions.setInitialComplete(completeState.data)); // 정산 상태 설정
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(()=> { getTitle(); getComplete(); }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (blackRef.current && blackRef.current.contains(e.target)) {
        dispatch(barActions.setVisible('none'))
      }
    }
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true); 
    };
  }, [blackRef]);


  return(
    <Container>

      <Black visable={barState.visible} ref={blackRef}></Black>

      <Header>
        <Appointment_Header num={num}></Appointment_Header>
      </Header>

      <Main>
        <Main__MemberList visable={barState.visible}>
          <MemberList num={num}></MemberList> 
        </Main__MemberList>
        <Main__CostList>
          <CostList num={num}></CostList>
        </Main__CostList>
      </Main>  

    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%; 
height: 100%;
`

/* 멤버리스트 열렸을 때 검은 바탕 화면 */
const Black = styled.div` 
display: none;
width: 100%;
height: 100%;
background-color: black;
opacity: 50%;
position: absolute;

@media screen and (max-width: 768px) { 
  display: ${(props: MemberList_Props) => props.visable}; // block으로 하면 점진적인 검은색 화면 애니메이션 가능 but 스크롤 불가능
  opacity: ${(props: MemberList_Props) => props.visable === 'block' ? '80%' : '0%' };
  transition: ${(props: MemberList_Props) => props.visable === 'block' ? 'opacity 0.5s ease-out' : 'opacity 0.5s ease-in'};
  z-index: 2;
}
`

const Header = styled.div`
height: 40px;
border-bottom: 1px solid white;

@media screen and (max-width: 768px) { 
  z-index: 2;
}
`

const Main = styled.main`
display: flex;
flex-direction: row;
position: relative;
height: 100%;
width: 100%;
`

interface MemberList_Props {
  visable: string | undefined;
}

const Main__MemberList = styled.section`
width: 40%;
height: calc(100vh - 40px);

@media screen and (max-width: 768px) { 
  width: 90%;
  position: absolute;
  top: 0;
  z-index: 2;
  transform: ${(props: MemberList_Props) => props.visable === 'block' ? 'translateX(-0%)' : 'translateX(-100%)' };
  transition: ${(props: MemberList_Props) => props.visable === 'block' ? 'transform 0.5s ease-out' : 'transform 0.5s ease-in'};
}
`

const Main__CostList = styled.section`
width: 60%;
height: calc(100vh - 40px);

@media screen and (max-width: 768px) { 
  width: 100%
} 
`

export default Appointment;