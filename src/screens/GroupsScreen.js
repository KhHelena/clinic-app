import React, { useState, useEffect } from 'react';
import { View, Modal, Button, StyleSheet, SafeAreaView } from 'react-native';
import GroupHeader from '../components/GroupHeader'; 
import GroupList from '../components/GroupList';
import GroupForm from '../components/GroupForm';
import { getAllGroups, updateGroup, deleteGroup, createGroup } from '../api';
import Constants from 'expo-constants';

const GroupsScreen = () => {
  const [groups, setGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedGroup, setEditedGroup] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const groupsData = await getAllGroups();
    setGroups(groupsData);
  };

  const handleEditGroup = (group) => {
    setEditedGroup(group);
    setModalVisible(true);
  };

  const handleUpdateGroup = async (updatedGroup) => {
    await updateGroup(updatedGroup);
    setModalVisible(false);
    fetchData();
  };

  const handleDeleteGroup = async (id) => {
    await deleteGroup(id);
    fetchData();
  };

  const handleCreateGroup = async () => {
    await createGroup();
    fetchData();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GroupHeader totalGroups={groups.length} onAdd={() => setModalVisible(true)} />
      <GroupList groups={groups} onEdit={handleEditGroup} onDelete={handleDeleteGroup} />
      <Modal visible={modalVisible} onRequestClose={closeModal}>
        {editedGroup && (
          <GroupForm
            group={editedGroup}
            onSubmit={handleUpdateGroup}
          />
        )}
        <Button title="Cancel" onPress={closeModal} />
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  }
});
export default GroupsScreen;
