import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, Text, View } from "react-native";
import { Button, ScrollView, TextInput, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalVisible,setIsModalVisible]= useState(false);

function startAddGoalHandler(){
  setIsModalVisible(true)
}

function endGoalHandler()
{
  setIsModalVisible(false)
}
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText,id:Math.random().toString() + Date.now()},
    ]);
   console.log("input the goal",enteredGoalText)
    endGoalHandler()
  }
function onDeleteHandler(id){
 setCourseGoals(currentCourseGoals=>{
  // console.log("delete id", $id)
  return currentCourseGoals.filter(goal=>goal.id !==id)
 })
}
  return (
    <>
    <StatusBar style="light"> </StatusBar>
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color={"purple"} onPress={startAddGoalHandler}
      
      ></Button>
   < GoalInput visible={isModalVisible} onAddGoal={addGoalHandler} onCancel={endGoalHandler}/>
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem  text={itemData.item.text}
              id={itemData.item.id}
              onDeleteItem ={onDeleteHandler}/>
            );
          }}
          keyExtractor={(item,index)=>{
            return item.id
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
   
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 4,
  },
 
});
