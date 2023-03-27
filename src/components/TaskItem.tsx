import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

import { Task } from "./TasksList";

interface TaskItemProps {
    item: Task;
    index: number;
    removeTask: (id:number) => void;
    editTask: (id:number, taskNewTitle: string) => void;
    toggleTaskDone: (id:number) => void;
}

export function TaskItem({item, index, removeTask, editTask, toggleTaskDone}: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEdit(){
        setIsEditing(true);
    }

    function handleCancelEdit() {
        setIsEditing(false);
        setEditingValue(item.title);
    }

    function handleSubmitEditing() {        
        editTask(item.id, editingValue);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
          }
    }, [isEditing]);

    return (
        <>
        <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                //TODO - use onPress (toggle task) prop
                onPress={() =>toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  //TODO - use style prop 
                  style={[item.done ? styles.taskMarkerDone : styles.taskMarker]}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                  //TODO - use style prop
                  ref={textInputRef}
                  editable={isEditing}
                  style={[item.done? styles.taskTextDone : styles.taskText]}
                  value={editingValue}
                  onChangeText={setEditingValue}
                  onSubmitEditing={handleSubmitEditing}
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.iconsContainer}>
            {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEdit}
          >
            <Icon 
              name="x"
              size={24}
              color="#b2b2b2"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEdit}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

            <View style={styles.divider}/>

            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              //TODO - use onPress (remove task) prop
              onPress={() => removeTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24
    },
    divider: {
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        width: 1,
        height: 24,
        marginHorizontal:8
      }
  })