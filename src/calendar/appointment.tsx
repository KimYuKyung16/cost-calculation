import { useEffect, useRef } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { memberListActions } from '../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios'; 
import styled from "styled-components"; // styled in js


const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 70%;
`

function Appointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let params = useParams();
  console.log(params.num); // 리스트 번호

  const memberList = useAppSelector(state => state.memberList);


  function member_list() {
    axios.get('http://localhost:6001/test', {
      params: {
        num: params.num
      }
    })
    .then(function (response) { 
      console.log(response.data);
      dispatch(memberListActions.setInitialMemberList(response.data));
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  useEffect(()=> {member_list()}, []);

  return(
    <>
      <div>
        <tbody>
          {
            memberList.map((x, index) => {
              return(
                <tr key={index}>
                  <td><Profile src={x.profile}/>{x.nickname}</td>
                </tr>
              )
            })
          }
        </tbody>
      </div>

      <div>
        <input onClick={()=>{navigate('cost')}} type="button" value="비용 등록"/>
      </div>
    </>
  )
}

export default Appointment;