import React, {MouseEvent, MouseEventHandler, useEffect} from 'react';
import styled from "styled-components";


type Modal = {
    active: boolean
    setActive: (active: boolean) => void
    children: React.ReactNode
    title:string

}


export const Modal = ({active, setActive,children,title}: Modal) => {




    const transformStyle = active ? 'scale(1)' : 'scale(0)'

    return (
        <ModalWrapper transform={transformStyle} onClick={()=>setActive(false)}>
            <ModalContent onClick={(e:any)=>e.stopPropagation()}>
                <ModalTitle>{title}</ModalTitle>
                {children}
            </ModalContent>
        </ModalWrapper>
    );
};





type ModalStyleProps = {
    transform:string
}



const ModalWrapper = styled.div<ModalStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.4);
  position: fixed;
  top:0;
  left:0;
  z-index: 999;
  transform:${props=>props.transform} ;
  overflow: auto;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 300px ;
  width: 450px;
  margin-top: 480px;
  margin-bottom: 20px;
  padding: 30px;
  border-radius: 12px;
  background: white;
`

const ModalTitle = styled.h2`
    margin-bottom: 40px;
  
 
`