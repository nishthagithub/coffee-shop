import CustomButton from '@/components/customButton/CustomButton';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';

import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ImageGalleryProps {
  onImageSelected: (uri: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

const ImageGallery = ({ onImageSelected, isVisible, onClose }: ImageGalleryProps) => {
  const [showOptions, setShowOptions] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>We need your permission to show the camera</Text>
        <CustomButton onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  

  const takePicture = async () => {
    try {
      if (ref.current) {
        const photo = await ref.current.takePictureAsync();
        onImageSelected(photo.uri);
        setShowCamera(false);
        onClose();
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const uploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
      });
      
      if (!result.canceled) {
        onImageSelected(result.assets[0].uri);
        onClose();
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onClose}
      
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.option}
            onPress={() => {
              setShowCamera(true);
              setShowOptions(false);
            }}
          >
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.option}
            onPress={uploadImage}
          >
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>
         
        </View>

        {showCamera && (
          <Modal
            visible={showCamera}
          >
            <View style={styles.cameraContainer}>
              <CameraView 
                ref={ref}
                facing={facing}
                style={styles.camera}
              >
                <View style={styles.cameraControls}>
                  <TouchableOpacity 
                    onPress={() => setShowCamera(false)}
                    style={styles.cameraButton}
                  >
                    <Text style={styles.cameraButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={toggleCameraFacing}
                    style={styles.cameraButton}
                  >
                    <Text style={styles.cameraButtonText}>Flip Camera</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cameraBottom}>
                  <Button 
                    title="Take Photo" 
                    onPress={takePicture}
                
                  />
                </View>
              </CameraView>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cameraButton: {
    padding: 10,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cameraBottom: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  
});