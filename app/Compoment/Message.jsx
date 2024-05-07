import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const Message = ({ text, visible }) => {
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible); // Cập nhật modalVisible khi prop visible thay đổi
  }, [visible]);

  const closeModal = () => {
    setModalVisible(false); 
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{text}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,  
    borderColor: 'blue',  
    alignItems: 'center',
  },
  closeButton: {
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Message;
