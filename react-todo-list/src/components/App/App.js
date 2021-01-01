import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectTodos, selectFilters, rateOfDone, selectCompleteTodos, selectActiveTodos } from '../../redux/selectors';
import AddTodo from './AddTodo';
import Template from './Template';
import {
  completeAll,
  clearCompleted,
  changeStatus,
} from '../../redux/actions';

const Container = styled.div`
  width: 400px;
  min-height: 120px;
  background-color: #fff;
  margin: 50px auto;
  border-radius: 16px;
  padding: 40px 40px 5px 40px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h4`
  font-family: 'Mukta', sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #333;
  margin-bottom: 30px;
  letter-spacing: 1.5px;
  text-align: left;
`;

const Itemslist = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const RateOfDone = styled.div`
  margin: 30px 0 10px 0;
  color: #888;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-bottom: 5px;
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const FilterBtns = styled.div`
  display: flex;
`;

const Button = styled.div`
  padding: 5px;
  color: #888;
  cursor: default;
  font-size: 14px;

  &:hover {
    color: #333;
  }
`;

const DoneTodosCounter = () => {
  const rateOfDoneTodos = useSelector(rateOfDone);
  return <span>{rateOfDoneTodos}</span>;
};

function App() {
  // useSelector(store => store.todos.todos)
  const todos = useSelector(selectTodos);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const ActiveTodos = () => {
    const activeTodos = useSelector(selectActiveTodos);
    return activeTodos.map(todo => <Template todo={todo} />);
  };

  const CompletedTodos = () => {
    const completedTodos = useSelector(selectCompleteTodos);
    return completedTodos.map(todo => <Template todo={todo} />);
  };

  return (
    <Container>
      <Title>Todo List</Title>
      <AddTodo />
      <Itemslist>
        {filters.status === 'all' && todos.map(todo => <Template todo={todo} />)}
        {filters.status === 'completed' && <CompletedTodos />}
        {filters.status === 'active' && <ActiveTodos />}
      </Itemslist>
      {todos.length > 0 && (
        <RateOfDone>
          Achievement : 
          <DoneTodosCounter /> 
          %
        </RateOfDone>
      )}
      <Line />
      <Btns>
        <Button onClick={() => dispatch(completeAll())}>Complete All</Button>
        <Button onClick={() => dispatch(clearCompleted())}>
          Clear Completed
        </Button>
        <FilterBtns>
          <Button onClick={() => dispatch(changeStatus('all'))}>All</Button>
          <Button onClick={() => dispatch(changeStatus('active'))}>
            Active
          </Button>
          <Button onClick={() => dispatch(changeStatus('completed'))}>
            Completed
          </Button>
        </FilterBtns>
      </Btns>
    </Container>
  );
}

export default App;
