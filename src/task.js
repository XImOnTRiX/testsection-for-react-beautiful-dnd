import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid grey;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 8px;
  background-color: white;
  height: 60px;
`;

const DeleteButton = styled.button`
  border: 2px solid red;
  margin: 2px;
  background: orangered;
  display: inline-block;
  height: 100%;
  width: 50px;
`;
const EditButton = styled.button`
  border: 2px solid green;
  margin: 2px;
  background: grey;
  display: inline-block;
  height: 100%;
  width: 50px;
`;

const Paragraph = styled.p`
  width: 100%;
  height: 100%;
`;


export default class Task extends Component {
  state = {
    isEditOpen: false,
  }

  handleClick = () => {
    return this.props.handleDeleteField(this.props.task.id);
  }

  handleClickEdit = (task) => {
    console.log(task);
    return this.props.handleEditField(task);
  }

  handleEdit = () => {
    if(this.state.isEditOpen) {
      return ReactDOM.createPortal(
        <EditView open={this.closeEdit} task={this.props.task} setNewValue={this.handleClickEdit}/>,
        document.getElementById('edit')
      );
    }
  }

  closeEdit = () => {
    this.setState({isEditOpen: false});
  }

  openEdit = () => {
    this.setState({isEditOpen: true});
  }

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.handleEdit()}
            <Paragraph>{this.props.task.content}</Paragraph>
            <DeleteButton onClick={this.handleClick}/>
            <EditButton onClick={this.openEdit}/>
          </Container>
        )}
      </Draggable>
    );
  }
}

const Overlay = styled.div`
  display: block;
  position: fixed;
  background: rgba(0,0,0,0.8);
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const EditBox = styled.div`
  display: block;
  box-shadow: 2px 2px 20px 0px rgba(0,0,0,0.4);
  width: 100%;
  max-width: 970px;
  height: 90vh;
  background: white;
  margin: auto;
  margin-top: calc(50vh - 45vh);
  z-index: 99999999999;
`;

class EditView extends Component {
  state = this.props.task;

  onChange = (e) => {
    this.setState({
      ...this.state,
      content: e.target.value,
      }
    )
  }

  saveChanges = () => {
    this.props.open()
    return this.props.setNewValue(this.state);
  }

  render() {
    console.log(this.props.task);
    return (
      <Overlay>
        <div onClick={this.props.open}>CLOSE</div>
        <EditBox>
          <input value={this.state.content} onChange={this.onChange}/>
          <button onClick={this.saveChanges}>
            SAVE CHANGES
          </button>
        </EditBox>
      </Overlay>
    )
  }
}
