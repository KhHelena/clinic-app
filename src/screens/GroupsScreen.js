import React, { useState, useEffect } from 'react'
import { View, Modal, Button, StyleSheet, SafeAreaView } from 'react-native'
import GroupHeader from '../components/groupsComponents/GroupHeader'
import GroupList from '../components/groupsComponents/GroupList'
import GroupForm from '../components/groupsComponents/GroupForm'
import GroupAppForm from '../components/groupsComponents/GroupAppForm'
import { getAllGroups, updateGroup, deleteGroup, createGroup } from '../api/index'
import Constants from 'expo-constants'

const GroupsScreen = () => {
  const [groups, setGroups] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [editedGroup, setEditedGroup] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const groupsData = await getAllGroups()
    setGroups(groupsData)
  }

  const handleEditGroup = (group) => {
    setEditedGroup(group)
    setModalVisible(true)
  }

  const handleUpdateGroup = async (updatedGroup) => {
    await updateGroup(updatedGroup.NGroup, updatedGroup);
    fetchData();
    setModalVisible(false);
  };

  const handleDeleteGroup = async (id) => {
    await deleteGroup(id)
    fetchData()
  }

  const handleCreateGroup = async (name) => {
    await createGroup(name)
    fetchData()
    setAddModalVisible(false);
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const closeAddModal = () => {
    setAddModalVisible(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <GroupHeader
        totalGroups={groups.length}
        onAdd={() => setAddModalVisible(true)}
      />
      <GroupList
        groups={groups}
        onEdit={handleEditGroup}
        onDelete={handleDeleteGroup}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          {editedGroup && (
            <GroupForm
              group={editedGroup}
              onSubmit={handleUpdateGroup}
              onCancel={closeModal} 
            />
          )}
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={closeAddModal}>
        <View style={styles.modalContainer}>
          
            <GroupAppForm
              onSubmit={handleCreateGroup}
              onCancel={closeAddModal} 
            />
        
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default GroupsScreen
