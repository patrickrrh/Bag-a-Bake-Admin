import { View, Text, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import ModalActionButton from "@/components/ModalActionButton";
import { router } from "expo-router";
import TextAreaField from "./TextAreaField";
import ErrorMessage from "./texts/ErrorMessage";

interface ModalActionProps {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  title: string;
  reason: string;
  reasonError: string;
  onChangeText: (text: string) => void;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

const ModalAction: React.FC<ModalActionProps> = ({
  setModalVisible,
  modalVisible,
  title,
  reason,
  reasonError,
  onChangeText,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryAction,
  onSecondaryAction,
}) => {

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              paddingTop: 30,
              paddingBottom: 30,
              paddingInline: 10,
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "poppinsSemiBold",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              {title}
            </Text>
            <View className="mx-4 mb-5">
            <TextAreaField
              label="Alasan"
              value={reason}
              placeholder="Masukkan alasan"
              onChangeText={onChangeText}
            />
            {reasonError && ( <ErrorMessage label={reasonError} /> )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <ModalActionButton
                label={secondaryButtonLabel}
                handlePress={() => {
                  onSecondaryAction();
                }}
                variant="outline"
                isLoading={false}
              />
              <ModalActionButton
                label={primaryButtonLabel}
                handlePress={() => {
                  onPrimaryAction();
                }}
                variant="solid"
                isLoading={false}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalAction;
