import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,KeyboardAvoidingView } from 'react-native';
import React from 'react';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import TimerForm from './components/TimerForm';
import {newTimer} from './utils/TimerUtils'

// import uuidv4 from 'uuid/v4';
const uuid = require('uuid-random');

/**
 * 
 * @returns 
 *This component declares two child components. it sets one prop, which is the isOpen boolean that is passed down
 to ToggleableTimerForm
 * 
 */



export default class App extends React.Component {

  state = {
    timers:[
      {
        title:'Solid State',
        project:'Ghana Politics',
        id:1,
        elapsed: 5456099,
        isRunning: false,
      },
      {
        title:'Chores Kitchen',
        project:'Nigeria Politics',
        id:2,
        elapsed: 5456099,
        isRunning: false,
      },
      {
        title:'the lawn',
        project:'Afgan War',
        id:3,
        elapsed: 5456099,
        isRunning: false,
      },
      {
        title:'Congo',
        project:'Lawra Politics',
        id:4,
        elapsed: 5456099,
        isRunning: false,
      },
      {
        title:'Spanish',
        project:'Korea Drama',
        id:5,
        elapsed: 5456099,
        isRunning: false,
      },
      {
        title:'Italian',
        project:'Japanise Movie',
        id:6,
        elapsed: 5456099,
        isRunning: false,
      },



    ],
   };

   handleFormSubmit = (attrs) => {
    const {timers} = this.state;

    this.setState({
      timers:timers.map(timer => {
        if (timer.id === attrs.id){
          const {title, project} = attrs;
          return {
            ...timer,
            title,
            project,
          }
        }
        return timer;
      }),
    });
   };

   handleCreateFormSubmit = timer => {
     const {timers} = this.state;

     
   this.setState({
    timers:[newTimer(timer), ...timers],
     });
   };

   handleRemovePress = (timerId) => {
    this.setState({
      timers:this.state.timers.filter(t =>  t.id !== timerId),
    });
   }


   toggleTimer = (timerId) => {
    this.setState(prevState => {
      const {timers} =  prevState;

      return {
        timers: timers.map(timer => {
          const {id, isRunning} = timer;

          if (id === timerId) {
            return {
              ...timer, isRunning: !isRunning,
            };
          }
          return timer;
        }),
      };
    });
   }

  componentDidMount() {
    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval(() => {
        const {timers} = this.state;

        this.setState({
           timers: timers.map(timer => {
              const {elapsed, isRunning} = timer;


              return {
                ...timer,
                elapsed: isRunning ? elapsed + TIME_INTERVAL: elapsed,
              };
           }),
        });
    }, TIME_INTERVAL)
  }


   componentWillUnmount() {
    clearInterval(this.intervalId);
   }



  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
  
        <View style={styles.titleContainer}>
        <Text>Chores Timer Application</Text>
        </View>

        <KeyboardAvoidingView behavior='padding' style={styles.timerListContainer}>

        <ScrollView style={styles.timerList}>
         
          <ToggleableTimerForm isOpen={false} onFormSubmit={this.handleCreateFormSubmit} />

              {
                timers.map(
                  ({title,project,id,elapsed,isRunning}) => (
                    <EditableTimer 
                       key={id}
                       id={id}
                       title={title}
                       project={project}
                       elapsed={elapsed}
                       isRunning={isRunning}
                       onFormSubmit={this.handleFormSubmit}
                       onRemovePress={this.handleRemovePress}
                       onStartPress={this.toggleTimer}
                       onStopPress={this.toggleTimer}
                    />
                  )
                )
              }

        </ScrollView>
        </KeyboardAvoidingView>
  
        <StatusBar style="auto" />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  timerListContainer:{
    flex:1,
  },

  appContainer: {
    flex: 1,


  },
  titleContainer:{
    paddingTop:35,
    paddingBottom:15,
    borderBottomWidth:15,
    borderBottomColor:'#D6D7DA'
  },
  title:{
    fontSize:18,
    fontWeight: 'bold',
    textAlign:'center',
  },
  timerList:{
    
    paddingBottom:15,

 
  },

});
