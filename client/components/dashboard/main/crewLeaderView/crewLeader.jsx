// crewLeaderView is the container for the following subcomponents: crewSummary, memberRequests, add/edit tasks
import React, { Component } from 'react';
import CrewSummary from './crewSummary.jsx';
import {Panel, PanelGroup} from 'react-bootstrap';
import MemberRequests from './memberRequests.jsx';
import ManageTasks from './manageTasks.jsx';
import ManageRewards from './manageRewards.jsx';
import { GetCrewMembers } from '../../../utils/requests.jsx';
// debug flag for dev error tracking
const debug = false;

export default class CrewLeaderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crewMembers: []
    };

    this.getCrewMembers = (crew_id) => {
      GetCrewMembers(crew_id, (err, res) => {
        if (err) {
          if (debug) {
            console.log('Error:', err);
          }
        } else {
          this.setState({
            crewMembers: res
          });
        }
      });
    };
  }

  render() {
    return (
      <div className="cover-background">
        <PanelGroup>
          <Panel collapsible defaultExpanded={true} header="Manage Crew" eventKey="1">
            <CrewSummary
              history={this.props.history}
              userId={this.props.user.id}
              user={this.props.user}
              currentCrew={this.props.currentCrew}
              getCrewMembers={this.getCrewMembers}
              crewMembers={this.state.crewMembers}
              getCurrentCrews={this.props.getCurrentCrews}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Member Requests" eventKey="2">
            <MemberRequests
              currentTasksToConfirm={this.props.currentTasksToConfirm}
              handleMemberRequestVerification={this.props.handleMemberRequestVerification}
              currentCrew={this.props.currentCrew}
              setCurrentCrewLeader={this.props.setCurrentCrewLeader}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Tasks" eventKey="3">
            <ManageTasks
              userId={this.props.user.id}
              currentCrewTasks={this.props.currentCrewTasks}
              currentCrew={this.props.currentCrew}
              getCrewTasks={this.props.getCrewTasks}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Rewards" eventKey="4">
            <ManageRewards
              userId={this.props.user.id}
              currentCrewRewards={this.props.currentCrewRewards}
              getCurrentRewards={this.props.getCurrentRewards}
              currentCrew={this.props.currentCrew}
            />
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}