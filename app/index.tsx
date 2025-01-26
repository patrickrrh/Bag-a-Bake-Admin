import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import TextTitle5Bold from "@/components/texts/TextTitle5Bold";
import TextTitle2 from "@/components/texts/TextTitle2";
import TextTitle3 from "@/components/texts/TextTitle3";
import TextTitle4 from "@/components/texts/TextTitle4";
import TextTitle5 from "@/components/texts/TextTitle5";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import bakeryApi from "@/api/bakeryApi";
import TextLink from "@/components/texts/TextLink";
import { Ionicons } from "@expo/vector-icons";
import TextHeader from "@/components/texts/TextHeader";
import TextHeadline from "@/components/texts/TextHeadline";
import TextTitle1 from "@/components/texts/TextTitle1";
import TableHeader from "@/components/TableHeader";
import TableRow from "@/components/TableRow";
import { BakeryType } from "@/types/types";

export default function Index() {
  const [fontsLoaded] = useFonts({
    dk: require("../assets/fonts/DK-Woolwich.otf"),
    poppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    poppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    poppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    poppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const [listPending, setListPending] = useState<BakeryType[]>([]);
  const [listBakery, setListBakery] = useState<BakeryType[]>([]);

  const handleGetListPendingBakeryApi = async () => {
    const res = await bakeryApi().getListBakery({
      isActive: 0
    });

    if (res.status === 200) {
      setListPending(res.data ? res.data : []);
    }
  }

  const handleGetListBakeryApi = async () => {
    const res = await bakeryApi().getListBakery();

    if (res.status === 200) {
      setListBakery(res.data ? res.data : []);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleGetListPendingBakeryApi();
      handleGetListBakeryApi();
    }, [])
  );

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const handleEditPendingBakery = async (bakeryItem: BakeryType) => {
    router.push({
      pathname: '/actionBakery',
      params: { bakeryData: JSON.stringify(bakeryItem) }
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-background p-5">

      <View className="flex-row items-center justify-between mb-10">
        <View style={{ flex: 1 }} />

        <TextTitle1
          label="Bag a Bake - Admin"
          containerStyle={{ position: "absolute", left: 0, right: 0, alignItems: "center" }}
        />

        <Ionicons
          name="refresh"
          size={24}
          color="#B0795A"
          onPress={() => {
            handleGetListPendingBakeryApi();
            handleGetListBakeryApi();
          }}
        />
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between mb-2">
          <TextTitle3 label="Menunggu Persetujuan" />
          <TextLink label="Lihat Semua" onPress={() => {
            router.push({
              pathname: '/listBakery',
              params: { listStatus: 1 }
            })
          }}
            isUnderline={true} />
        </View>

        <View className="flex-1">
          <TableHeader />
          <FlatList
            data={listPending}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => <TableRow item={item} onEdit={() => handleEditPendingBakery(item)} />}
            keyExtractor={(item) => item.bakeryId.toString()}
          />
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: "#e0e0e0", marginVertical: 8 }} />

      <View className="flex-1">
        <View className="flex-row justify-between mb-2">
          <TextTitle3 label="Daftar Bakery" />
          <TextLink label="Lihat Semua" onPress={() => router.push({
            pathname: '/listBakery',
            params: { listStatus: 2 }
          })}
            isUnderline={true} />
        </View>

        <View className="flex-1">
          <TableHeader />
          <FlatList
            data={listBakery}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => <TableRow item={item} onEdit={() => handleEditPendingBakery(item)} />}
            keyExtractor={(item) => item.bakeryId.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}