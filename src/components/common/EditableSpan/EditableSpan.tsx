import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";


export type EditableSpanPropsType = {
    title: string
    onChange: (text: string) => void
}


export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const {title, onChange} = props
    const [editeMode, setEditeMode] = useState<boolean>(false)
    const [text, setText] = useState<string>('')

    const onDoubleClickHandler = () => {
        setEditeMode(!editeMode)
        setText(title)
    }

    const onBlurHandler = () => {
        setEditeMode(!editeMode)
        onChange(text)

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }


    return editeMode
        ? <InputStyle type="text" value={text} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        : <h3 onDoubleClick={onDoubleClickHandler}>{title}</h3>
})


const InputStyle = styled.input`

  font-size: 18px;
  cursor: pointer;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 2px solid cornflowerblue;
  height: 35px;
  margin: 10px 0 10px 0 ;
`

