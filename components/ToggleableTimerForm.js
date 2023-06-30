import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import TimerForm from './TimerForm';
import TimerButton from './TimerButton';
import Timer from './Timer';

/**
 * 
 * @param {*} param0 
 * @returns 
 * we are setting one props in this component which is isOpen prop which determine without to render
 * TimerForm or TimerButton component base on the condition if isOpen is true or false the consumer of this
 * component will determine wiithout true or false when isOpen is set in consumer then we switch components base on the
 * condition
 * 
 */

export default class ToggleableTimerForm extends React.Component{



    state = {
        isOpen:false,
    };

    handleFormOpen = () => {
        this.setState({isOpen:true});
    };

    handleFormClose = () => {
        this.setState({isOpen: false});
    }

    handleFormSubmit = (timer) => {
        const {onFormSubmit} = this.props;

        onFormSubmit(timer);
        this.setState({isOpen: false})
    }


    render() {
        const {isOpen} = this.state;

        return (
            <View 
            style={[styles.container, !isOpen && styles.buttonPadding]}
            >
                {isOpen ? (
                        <TimerForm 
                          onFormSubmit={this.handleFormSubmit}
                          onFormClose={this.handleFormClose}
                        
                        />
                    ):(
                        <TimerButton 
                          title="Add New Timer"
                          color="black"
                          onPress={this.handleFormOpen}
                        />
                    )}

            </View>
        );
    }

}


const styles = StyleSheet.create({
    container:{
        paddingVertical:10,
    },
    buttonPadding:{
        paddingHorizontal:15,
    },
});
