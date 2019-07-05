import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './task';

const Container = styled.div`
  width: 100%;
  border: 1px solid grey;
`;
const Title = styled.h3`
  padding: 8px;
  box-sizing: border-box;
`;
const TaskList = styled.div`
  box-sizing: border-box;
  padding: 8px;
`;


export default class Column extends Component {

  createNewField = () => {
    console.log(this.props.column.id);
    console.log(this.props);

    const newName = 'task-' + this.props.tasks.length + 1;
    const newTask = { id: newName, content: 'new Field' };

    return (
      this.props.addNewField(this.props.column.id, newTask)
    )
  }

  handleDeleteField = (taskId) => {
    return this.props.deleteField(this.props.column.id, taskId)
  }

  handleEditField = (task) => {
    return this.props.editField(this.props.column.id, task)
  }


  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} handleDeleteField={this.handleDeleteField} handleEditField={this.handleEditField}/>)}
              {provided.placeholder}
              <button onClick={this.createNewField}>Add new Field</button>
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
