import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  changeTodo,
  editingTodo,
  deleteTodo,
  toggleTodo,
} from '../../redux/actions';

const StyledItem = styled.div`
  margin-bottom: 20px;
  color: #555;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const Checkbox = styled.input`
  padding: 10px;
  appearance: none;
  background-color: #fff;
  border: 1px solid #cacaca;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  margin-right: 15px;
  margin-bottom: -2px;
  letter-spacing: 1.5px;

  &:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px 1px 3px rgba(0, 0, 0, 0.1);
    border: solid 1px #cacaca;
  }

  &:checked {
    background-color: #fefefe;
    border: 1px solid #cacaca;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #555;

    &:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px 1px 3px rgba(0, 0, 0, 0.1);
      border: solid 1px #cacaca;
    }

    &:after {
      content: "\u2714";
      font-size: 20px;
      position: absolute;
      top: -5px;
      left: 3px;
      color: #555;
    }
  }

  &:focus {
    outline: none;
  }
`;

const Btn = styled.div`
  color: #888;
  font-size: 14px;
  cursor: default;
  margin-left: 10px;
  font-family: '微軟正黑體';

  &:hover {
    color: #333;
  }
`;

const Btns = styled.div`
  display: flex;
`;

const TodoContent = styled.div`
  width: 280px;
  overflow-wrap: break-word;
  & input {
    border: solid 1px #cacece;
    height: 20px;
    color: #555;

    &:focus {
      outline: none;
    }
  }
`;

export default function Template({ todo }) {
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState('');

  const viewTemplate = (
    <StyledItem>
      <TodoContent>
        <Checkbox
          type="checkbox"
          id={todo.id}
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
        {todo.name}
      </TodoContent>
      <Btns>
        <Btn onClick={() => dispatch(editingTodo(todo.id))}>Edit</Btn>
        <Btn onClick={() => dispatch(deleteTodo(todo.id))}>Delete</Btn>
      </Btns>
    </StyledItem>
  );

  const editingTemplate = (
    <StyledItem>
      <TodoContent>
        <input
          id={todo.id}
          onChange={e => setNewContent(e.target.value)}
          placeholder={todo.name}
        />
      </TodoContent>
      <Btns>
        <Btn
          onClick={() => {
            if (!newContent) {
              dispatch(editingTodo(todo.id));
            } else {
              dispatch(changeTodo(todo.id, newContent));
            }
          }}
        >
          save
        </Btn>
        <Btn onClick={() => dispatch(editingTodo(todo.id))}>cancel</Btn>
      </Btns>
    </StyledItem>
  );
  return todo.editing ? editingTemplate : viewTemplate;
}
