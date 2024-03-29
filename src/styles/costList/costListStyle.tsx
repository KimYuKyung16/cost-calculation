import styled from "styled-components"; 

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
/* height: 90%; */
background-color: #e4e4e4;
padding: 0 3% 1% 3%;
overflow: auto;
position: relative;

@media screen and (max-width: 768px) {
  padding: 0; 
  padding-bottom: 3%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
`

interface IModalState {
  state: boolean;
}

/* 정산 상세 내용 모달창 */
export const Modal = styled.div`
display: ${(props:IModalState) => props.state ? 'flex' : 'none'};
flex-direction: column;
justify-content: center;
align-items: center;
width: 700px;
height: 80%;
background-color: #322c58;
border: 1px solid #9c9c9c;
position: fixed;
top: 50%;
left: 50%;
z-index: 2;
transform: translate(-50%, -50%);
filter: drop-shadow(10px 10px 11px rgba(0, 0, 0, 0.15));

& > img { // 닫기 아이콘
  position: absolute;
  right: 10px;
  top: 10px;
}

& > h1 {
  color: #ffffff;
  font-size: 2rem;
  padding: 20px 0;
}

& > textarea { // 정산 상세 내용
  width: 90%;
  height: 90%;
  background-color: #322c58;
  color: #efefef;
  font-size: 1.5rem;
  line-height: 30px;
  padding-bottom: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

& > button { // 정산 내용 수정 버튼
  position: absolute;
  top: 15px;
  left: 20px;
  background-color: #322c58;
  color: #bac7fb;
  border: 2px solid #bac7fb;
  border-radius: 5px;
  padding: 3px 10px;
  font-size: 1.3rem;
}

@media screen and (max-width: 768px) { 
  width: 90%;

  & > h1 {
    font-size: 1.7rem;
  }

  & > textarea { // 정산 상세 내용
    line-height: 25px;
    font-size: 1.2rem;
  }
} 
`

/* 지출 내역이 없을 경우 */
export const Container__List_none = styled.div`
width: 100%;
height: calc(100vh - 100px);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 60px;
font-size: 1.4rem;
gap: 10px;

@media screen and (max-width: 768px) { 
  font-size: 1.2rem;
  gap: 8px;
  padding-bottom: 80px;
} 
`

/* 지출 내역이 있을 경우 */
interface IDeleteState {
  state: boolean;
}

export const Container__List_Date = styled.tr`
  color: #322c58;
  width: 100% !important;
  text-align: center;
  font-weight: bold !important;


  & > td { // 정산 이름
    border-radius: 0 !important;
    background-color: #e4e4e4 !important;
    border: none !important;
    border-bottom: 4px solid #322c58 !important;
    font-size: 1.5rem;
    text-align: center !important;
  }
`

export const Container__List = styled.table`
table-layout: fixed;
border-collapse: separate;
border-spacing: 5px;
width: 100%;
font-size: 1.3em;

& > colgroup {
  & > col:nth-child(1) {
    width: 50%;
  }
  & > col:nth-child(2) {
    width: 10%;
  }
  & > col:nth-child(3) {
    width: 20%;
  }
  & > col:nth-child(4) {
    width: 20%;
  }
}

& > tbody > tr {
  width: 100%;
  font-size: 1.3rem;

  & > td {
    padding: 10px;
    vertical-align: middle;
  }

  & > td:nth-child(1) { // 정산 이름
    width: 60%;
    background-color: #ffffff;
    border: 2px solid #b4b8d1;
    border-radius: 5px;
    overflow: hidden;  
    white-space: nowrap;
    text-overflow: ellipsis; // 말줄임
  }

  & > td:nth-child(2) { // 시간
    text-align: center;
    width: 100px;
    background-color: #9cb0ff;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    white-space: nowrap;
  }

  & > td:nth-child(3) { // 정산자
    text-align: center;
    width: 100px;
    background-color: #c2c2c2;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    white-space: nowrap;
  }

  & > td:nth-child(4) { // 정산 가격
    text-align: right;
    width: 100px;
    background-color: #322c58;
    border-radius: 5px;
    color: #fffc60;
    font-weight: bold;
    white-space: nowrap;
  }

  & > td:nth-child(5) { // 삭제 버튼
    width: 10px;
    color: #ba8174;
    font-size: 1.5rem;
    text-align: right;
    display: ${(props:IDeleteState) => props.state ? 'none' : ''};
  }
}

@media screen and (max-width: 768px) { 
  & > colgroup {
    & > col:nth-child(1) {
      width: 50%;
    }
    & > col:nth-child(2) {
      width: 10%;
    }
    & > col:nth-child(3) {
      width: 20%;
    }
    & > col:nth-child(4) {
      width: 20%;
    }
    & > col:nth-child(5) {
      width: 10px;
    }
  }

  & > tbody > tr {
  width: 100%;
  font-size: 1.1rem;

  & > td {
    padding: 5px;
  }

  & > td:nth-child(1) { // 정산 이름
    width: 60%;
    border: 1px solid #b4b8d1;
  }

  & > td:nth-child(2) { // 정산자
    width: 80px;
  }

  & > td:nth-child(3) { // 정산 가격
    width: 80px;
  }
  & > td:nth-child(4) { // 삭제 버튼
    font-size: 1.2rem;
    width: 20px;
  }
}
} 
`
interface Loading_Props {
  visible: boolean | undefined | null;
}

/* 로딩 영역 */
export const Loading = styled.div`
display: ${(props: Loading_Props) => props.visible ? 'block' : 'none' };
width: 100%;
height: 100%;
text-align: center;

& > img {
  width: 100px;
  height: 100px;
}
`
