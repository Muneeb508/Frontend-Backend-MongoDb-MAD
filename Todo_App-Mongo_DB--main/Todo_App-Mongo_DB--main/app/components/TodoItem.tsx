import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(todo._id) },
      ]
    );
  };

  const priorityColors = {
    low: '#4CAF50',
    medium: '#FF9800',
    high: '#F44336',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onToggle(todo._id)}
        style={styles.checkbox}
      >
        <Ionicons
          name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={todo.completed ? '#4CAF50' : '#ccc'}
        />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.title,
            todo.completed && styles.completedTitle,
          ]}
        >
          {todo.title}
        </Text>
        {todo.description && (
          <Text
            style={[
              styles.description,
              todo.completed && styles.completedDescription,
            ]}
          >
            {todo.description}
          </Text>
        )}
        {todo.priority && (
          <View style={styles.priorityContainer}>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: priorityColors[todo.priority] },
              ]}
            >
              <Text style={styles.priorityText}>
                {todo.priority.toUpperCase()}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => onEdit(todo)}
          style={styles.actionButton}
        >
          <Ionicons name="create-outline" size={20} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.actionButton}
        >
          <Ionicons name="trash-outline" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    padding: 4,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
  priorityContainer: {
    marginTop: 8,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});

