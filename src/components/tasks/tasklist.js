import React, { Component } from 'react';
import axios from 'axios';
import TaskItem from './taskitem';

export default class TaskList extends Component {
  state = {
    url:'http://localhost:5000/users/5ae84698b9c8df48345b33e7/tasks/',
    items:[]
   }

   onItemClick(e){
     e.preventDefault();
     console.log(e.target)
    // console.log('clicked');
   }

   componentDidMount(){
     axios.get(this.state.url)
     .then(res => res.data)
     .then(data => {
       if(data.success){
         console.log(data.tasks)
         this.setState({
           items: data.tasks
         })
       }
     })
     .catch(err => console.log(err.message));
   }

  render() {
    return (
      <div id="taskList">
        <TaskItem items={this.state.items} onItemClick={this.onItemClick.bind(this)}/>
      </div>
    );
  }
}