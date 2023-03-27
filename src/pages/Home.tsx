import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);  

  function handleAddTask(newTaskTitle: string) {  
    const taskAlreadyExists = tasks.find(task => task.title === newTaskTitle);
    
    if (taskAlreadyExists) {
      // mostrar alerta
      //console.log("Task já existe: " + newTaskTitle);
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome. Task: " + newTaskTitle);
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks(state => [...state, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {   
    const tasksAltered = tasks.map((task) => {
      if(task.id === id) {
        return {
          ...task,
          done: !task.done,
        }
      }
      else {
        return task;
      }
    });

    setTasks(tasksAltered);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover Task', 'Deseja remover a task?', [
      { 
        text:"Sim",
        onPress: (() => {
          const tasksWithoutTheDeletedOne = tasks.filter(task => task.id !== id);
          setTasks(tasksWithoutTheDeletedOne);
        })
      },
      { 
        text:"Não"        
      }
    ]); 
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const tasksAltered = tasks.map((task) => {
      if(task.id === id) {
        return {
          ...task,
          title: taskNewTitle,
        }
      }
      else {
        return task;
      }
    });

    setTasks(tasksAltered);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask = {handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})