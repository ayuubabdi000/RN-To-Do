import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [newtask, setNewtask] = useState('')
  const [tasklist, setTasklist] = useState([{ taskname: 'ayuub', completed: false },
  { taskname: 'go for walk', completed: false },
  { taskname: 'go to university', completed: false }])
  const createtask = () => {
    if (newtask.trim() !== '') {
      setTasklist([
        ...tasklist,
        {
          taskname: newtask.trim(),
          completed: false,
        },
      ]);

      setNewtask('');
    }
  };
  const deletetask = (index) => {
    const upsatedtask = tasklist.filter((_, i) => i !== index);
    setTasklist(upsatedtask);
  }
  const toggleTask = (index) => {
    setTasklist(
      tasklist.map((task, i) =>
        i === index
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <Text style={styles.subtitle}>Stay organized and get things done.</Text>

      <View style={styles.taskList}>
        {tasklist.map((task, index) => (
          <View style={styles.card} key={index}>

            <Pressable
              style={[
                styles.checkbox,
                task.completed && styles.checkboxCompleted,
              ]}
              onPress={() => toggleTask(index)}
            >

              <MaterialIcons
                name={task.completed ? 'check-box' : 'check-box-outline-blank'}
                size={26}
                color={task.completed ? 'green' : '#999'}
              />
            </Pressable>

            <Text
              style={[
                styles.taskText,
                task.completed && styles.completedText,
              ]}
            >
              {task.taskname}
            </Text>

          </View>
        ))}
      </View>

      <View style={styles.bottomArea}>
        <TextInput
          style={styles.input}
          value={newtask}
          onChangeText={(text) => setNewtask(text)}
          placeholder="What needs to be done?"
          placeholderTextColor="#999"
        />

        <Button title="Add" onPress={createtask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 24,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#777',
    marginBottom: 30,
  },

  taskList: {
    gap: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },



  // checkboxCompleted: {
  //   backgroundColor: 'blue',
  // },

  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  taskText: {
    fontSize: 16,
    color: '#222',
    flex: 1,
  },

  bottomArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    elevation: 2,
  },
});