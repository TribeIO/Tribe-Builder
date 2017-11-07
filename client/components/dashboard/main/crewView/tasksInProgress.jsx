// This component renders all the tasks a user has claimed for their crew
import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem, Button, Label } from 'react-bootstrap';
import { UpdateTask } from '../../../utils/requests.jsx';

import moment from 'moment';
import 'moment/locale/en-ca';

export default class TasksInProgress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focusTask: props.userTasks,
      focusUserTask: props.userTasks,
      showModal: false,
      focusTaskExpiry: props.userTasks
    };

    this.openModal = (taskTarget) => {
      let expiry = moment(this.state.focusTask.expiry).format("MM/DD/YYYY");
      this.setState({ focusTask: taskTarget });
      this.setState({ focusTaskExpiry: expiry });
      this.setState({ focusUserTask: taskTarget.User_Tasks });
      this.setState({ showModal: true });
    };

    this.closeModal = () => {
      this.setState({ showModal: false });
    };

    this.confirmTask = (e) => {
      e.preventDefault();
      let task_id = this.state.focusUserTask.task_id;
      let user_id = this.state.focusUserTask.user_id;
      UpdateTask(user_id, task_id, (data) => {
        this.props.getUserTasks(this.props.userId, this.state.focusTask.crew_id);
      });
      this.closeModal();
    };



  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.props.userTasks.map((task, i) => {
            return (
              <ListGroupItem onClick={() => this.openModal(task)} key={i}>{task.task_name}
                {(task.User_Tasks.completed === true && task.User_Tasks.verified === false) ? <Label bsStyle="warning" className="task-status-labels">Waiting approval...</Label> : ''}
                {(task.User_Tasks.completed === true && task.User_Tasks.verified === true) ? <Label bsStyle="success" className="task-status-labels">Task Completed</Label> : ''}
              </ListGroupItem>);
          })}
        </ListGroup>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.focusTask.task_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Points: {this.state.focusTask.points}</h4>
            <div>
              <div>
                <h4>Expires: {this.state.focusTaskExpiry}</h4>
              </div>
              <h4>Completed? {(this.state.focusUserTask.completed === true) ? <span>Yes</span> :
                <span>No <Button onClick={(e) => this.confirmTask(e)} >Click to request completion</Button></span>
              }
              </h4>
            </div>
            <h4>Description</h4>
            <p>{this.state.focusTask.task_description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}