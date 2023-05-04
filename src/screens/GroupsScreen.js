import React, { useState, useEffect } from 'react';
import { View, Modal, Button } from 'react-native';
import GroupList from '../components/GroupList';
import GroupForm from '../components/GroupForm';
import { getAllGroups, updateGroup, deleteGroup, createGroup } from '../api';

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
    <View>
      <GroupList groups={groups} onEdit={handleEditGroup} onDelete={handleDeleteGroup} />
      <Button title="Create New Group" onPress={handleCreateGroup} />
      <Modal visible={modalVisible} onRequestClose={closeModal}>
        {editedGroup && (
          <GroupForm
            group={editedGroup}
            onSubmit={handleUpdateGroup}
          />
        )}
        <Button title="Cancel" onPress={closeModal} />
      </Modal>
    </View>
  );
};

export default GroupsScreen;

