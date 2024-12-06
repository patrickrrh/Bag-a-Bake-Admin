import { View, Text } from 'react-native'
import React from 'react'

const TableHeader = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>Nama</Text>
      <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>No Telepon</Text>
      <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>Status</Text>
      <View style={{ flex: 0.5 }} />
    </View>
  )
}

export default TableHeader