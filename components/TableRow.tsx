import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import TextTitle5 from './texts/TextTitle5'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    item: any
    onEdit: () => void
}

const TableRow: React.FC<Props> = ({ item, onEdit }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
            }}
        >
            <View className="flex-1 items-center">
                <TextTitle5 label={item.bakeryName} />
            </View>
            <View className="flex-1 items-center">
                <TextTitle5 label={item.bakeryPhoneNumber} />
            </View>
            <View className="flex-1 items-center">
                <TextTitle5
                    label={item.isActive === 0 ? "Pending" : item.isActive === 1 ? "Aktif" : "Tidak Aktif"}
                    color={item.isActive === 0 ? "#FA6F33" : item.isActive === 1 ? "green" : "red"} />
            </View>
            <View style={{ flex: 0.5, alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => onEdit()}
                    style={{
                        backgroundColor: "#B0795A",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                    }}
                >
                    <Ionicons name="pencil" size={12} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TableRow