import Card from '@/components/card/card';
import CustomButton from '@/components/customButton/CustomButton';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cross from "../../../../assets/icons/cross.svg";
import Filter from "../../../../assets/icons/filter.svg";
import coffeeProducts, { Categories } from '../../data/dummyData';
import { styles } from "./category.styles";

const category = () => {
    const { categoryId } = useLocalSearchParams();
    const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
    const category = Categories.find(c => c.id === selectedCategoryId);
    const filteredItems = coffeeProducts.filter(item => item.categoryId === selectedCategoryId);
    const bottomSheet = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["30%", "60%", "90%"], [])
    const [tempSelectedCategoryId, setTempSelectedCategoryId] = useState(categoryId);
    const openSheet = () => bottomSheet.current?.expand();
    const closeSheet = () => {
        bottomSheet.current?.close();
        setTempSelectedCategoryId(selectedCategoryId)
    }

    useEffect(() => {
        setTempSelectedCategoryId(selectedCategoryId);
    }, [selectedCategoryId]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Items in {category?.name}</Text>
                <Filter style={{ marginRight: 20 }} onPress={openSheet} />

            </View>
            <FlatList
                scrollEnabled={false}
                data={filteredItems}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 8, paddingHorizontal: 5, marginTop: 10 }}
                columnWrapperStyle={{
                    justifyContent: 'space-evenly',
                    marginBottom: 8,
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/src/screens/CoffeeInfo/${item.id}`)}
                    >
                        <Card
                            {...item}
                            showHeartIcon={true}
                        />
                    </TouchableOpacity>
                )}
            />
            <BottomSheet
                ref={bottomSheet}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose
                backgroundStyle={{
                    backgroundColor: "#F2F3F2",
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    elevation: 4
                }}

            >
                <BottomSheetView style={{ borderTopLeftRadius: "10", borderTopRightRadius: "10", }}>
                    <View>
                        <View style={styles.subheader}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12, marginLeft: 10 }}>Select Category</Text>
                            <Cross onPress={closeSheet} />
                        </View>


                        {Categories.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => setTempSelectedCategoryId(item.id)}
                                style={styles.category}
                            >
                                <Checkbox
                                    color='#53B175'

                                    status={tempSelectedCategoryId === item.id ? 'checked' : 'unchecked'}
                                />
                                <Text>{item.name}</Text>

                            </TouchableOpacity>
                        ))}
                    </View>

                    <CustomButton
                        title='Apply Filters'
                        onPress={() => {
                            setSelectedCategoryId(tempSelectedCategoryId);
                            closeSheet();
                        }} />
                </BottomSheetView>

            </BottomSheet>
        </SafeAreaView>

    )
}

export default category

