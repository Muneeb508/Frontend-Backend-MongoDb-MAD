import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TodoForm, TodoItem } from '../components';
import { CreateTodoData, Todo, todoApi, UpdateTodoData } from '../services/api';


export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const loadTodos = useCallback(async () => {
    try {
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
      Alert.alert(
        'Error',
        'Failed to load todos. Please make sure the backend server is running.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadTodos();
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
      Alert.alert('Error', 'Failed to update todo.');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      Alert.alert('Error', 'Failed to delete todo.');
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleCreateTodo = () => {
    setEditingTodo(null);
    setFormMode('create');
    setShowForm(true);
  };

  const handleFormSubmit = async (data: CreateTodoData | UpdateTodoData) => {
    try {
      if (formMode === 'create') {
        const newTodo = await todoApi.createTodo(data as CreateTodoData);
        setTodos((prev) => [newTodo, ...prev]);
      } else if (editingTodo) {
        const updatedTodo = await todoApi.updateTodo(
          editingTodo._id,
          data as UpdateTodoData
        );
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === editingTodo._id ? updatedTodo : todo
          )
        );
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error saving todo:', error);
      Alert.alert('Error', 'Failed to save todo.');
    }
  };

  const completedTodos = todos.filter((t) => t.completed);
  const pendingTodos = todos.filter((t) => !t.completed);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading todos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Todos</Text>
        <TouchableOpacity onPress={handleCreateTodo} style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pendingTodos.length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedTodos.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{todos.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-circle-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No todos yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the + button to add your first todo
          </Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TodoForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        editingTodo={editingTodo}
        mode={formMode}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 16, fontSize: 16, color: '#666' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
  listContainer: { paddingVertical: 8 },
});
