import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addTodo } from '../../redux/actions';

const AddItem = styled.div`
  margin: 16px 0;
  vertical-align: sub;
`;

const AddInput = styled.input`
  border: solid 1px #cacece;
  border-radius: 5px;
  width: 70%;
  height: 30px;
  font-size: 16px;
  padding: 10px;
  display: inline-block;

  &:focus {
    outline: #aaa auto 1px;
  }
`;

const AddButton = styled.div`
  box-sizing: border-box;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  padding: 6px;
  font-size: 18px;
  color: #555;
  text-align: center;
  cursor: default;
  display: inline-block;

  &:hover {
    background-color: #ddd;
    border-radius: 50%;
  }
`;

// 用 dispatch 就知道 redux 的存在了
export default function AddTodo() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!value) return;
      dispatch(addTodo(value));
      setValue('');
    }
  };

  const handleAddButtonClick = () => {
    if (!value) return;
    dispatch(addTodo(value));
    setValue('');
  };

  return (
    <>
      <AddItem>
        <AddInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <AddButton onClick={handleAddButtonClick}>+</AddButton>
      </AddItem>
    </>
  );
}
