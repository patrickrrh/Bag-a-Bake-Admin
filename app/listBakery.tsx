import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextTitle3 from '@/components/texts/TextTitle3'
import TextTitle1 from '@/components/texts/TextTitle1'
import { Ionicons } from '@expo/vector-icons'
import TextLink from '@/components/texts/TextLink'
import TableHeader from '@/components/TableHeader'
import TableRow from '@/components/TableRow'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { BakeryType } from '@/types/types'
import bakeryApi from '@/api/bakeryApi'
import BackButton from '@/components/BackButton'

const ListBakery = () => {

    const { listStatus } = useLocalSearchParams();

    const [listBakery, setListBakery] = useState<BakeryType[]>([]);

    const handleGetListBakeryApi = async () => {
        if (parseInt(listStatus as string) === 1) {
            const res = await bakeryApi().getListBakery({
                isActive: 0
            });

            if (res.status === 200) {
                setListBakery(res.data ? res.data : []);
            }
        } else {
            const res = await bakeryApi().getListBakery();

            if (res.status === 200) {
                setListBakery(res.data ? res.data : []);
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            handleGetListBakeryApi();
        }, [])
    )

    const handleEditPendingBakery = async (bakeryItem: BakeryType) => {
        router.push({
            pathname: '/actionBakery',
            params: { bakeryData: JSON.stringify(bakeryItem) }
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <View className="mb-5">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 0 }}>
                        <BackButton />
                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextTitle3 label="Daftar Bakeri" />
                    </View>

                    <View style={{ position: 'absolute', right: 0 }}>
                        <Ionicons
                            name="refresh"
                            size={24}
                            color="#B0795A"
                            onPress={() => handleGetListBakeryApi()}
                        />
                    </View>
                </View>
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
        </SafeAreaView>
    )
}

export default ListBakery