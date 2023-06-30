import React from 'react';
import { View,Text } from 'react-native';


import TimerForm from './TimerForm';
import Timer from './Timer';

/**
 * This uses the prop editFormOpenand also accepts all the attributes of  timer.
 * @param {*} param0 
 * @returns 
 * 
 *  on EditableTimer we are using conditional rendering to either render TimerForm or render Timer 
 * if editFormOpen is true we render TimerForm we using the EditablTimer in App.js
 * 
 * so if editFormOpen is false in the consumer component we render Timer component
 */


export default class EditableTimer extends React.Component{

 static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        project: PropTypes.string.isRequired,
        elapsed: PropTypes.number.isRequired,
        isRunning: PropTypes.bool.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        onRemovePress: PropTypes.func.isRequired,
        onStartPress: PropTypes.func.isRequired,
        onStopPress: PropTypes.func.isRequired,
    };





    state = {
        editFormOpen: false,
    };


    handleEditPress = () => {
        this.openForm();
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleSubmit = (timer) => {
        const {onFormSubmit} = this.props;

        onFormSubmit(timer)
        this.closeForm();
    };

    closeForm = () => {
        this.setState({editFormOpen: false});
    };
   
     openForm = () => {
        this.setState({editFormOpen: true });
     };

    render() {
        const {id,title,project,elapsed,isRunning, onRemovePress,onStartPress,onStopPress} = this.props;
        const {editFormOpen} = this.state;
    


    if(editFormOpen){
        return (
        <TimerForm id={id} 
        title={title} 
        project={project}
        onFormSubmit={this.handleSubmit}
        onFormClose={this.handleFormClose}
        />
        );
    }

    return (
        <Timer 
          id={id}
          title={title}
          project={project}
          elapsed={elapsed}
          isRunning={isRunning}
          onEditPress={this.handleEditPress}
          onRemovePress={onRemovePress}
          onStartPress={onStartPress}
          onStopPress={onStopPress}
        />
    )

    }

}
