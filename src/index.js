import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: auto;
`;

class App extends Component {
  state = initialData;

  onDragEnd = (result) => {
    const {destination, source, draggableId} = result;
    // if destination return null do nothing
    if( !destination ) { return };

    // check if the element is dropped on the same place
    if(
      destination.droppableId === source.droppableId && destination.index === source.index
    ) {
      // do nothin if true
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    // removes 1 item from the index
    newTaskIds.splice(source.index, 1);
    // add the task id into the destination object
    newTaskIds.splice(destination.index, 0, draggableId);
    // creates the new column information with the new taskOrder
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  }

  addNewField = (inColumn, newTask) => {
    const column = this.state.columns[inColumn];
    const newTaskIds = Array.from(this.state.columns[inColumn].taskIds);

    newTaskIds.splice(newTaskIds.length, 0, newTask.id);

    const newTasks = {
      ...this.state.tasks,
      [newTask.id]: { id: newTask.id, content: newTask.content }
    }

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }

    const newState = {
      ...this.state,
      tasks: newTasks,
      columns: {
        ...this.state.columns,
        [inColumn]: newColumn,
      }
    }
    this.setState(newState);
  }

  deleteField = (inColumn, field) => {
    const newTasks = this.state.tasks;
    delete newTasks[field];

    const newTaskIds = this.state.columns[inColumn].taskIds;
    const fieldPos = newTaskIds.indexOf(field);
    newTaskIds.splice(fieldPos, 1);

    const newState = {
      ...this.state,
      tasks: newTasks,
      columns: {
        ...this.state.columns,
        [inColumn]: {
          ...this.state.columns[inColumn],
          taskIds: newTaskIds,
        },
      },
    };
    this.setState(newState);
  }

  editField = (inColumn, field) => {
    console.log(inColumn, field);

    const newTasks = {
      ...this.state.tasks,
      [field.id]: field,
    }

    const newState = {
      ...this.state,
      tasks: newTasks,
    };

    this.setState(newState);
  }

  render() {
    return (
      <Container id="edit">
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} addNewField={this.addNewField} deleteField={this.deleteField} editField={this.editField}/>
          })}
        </DragDropContext>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
