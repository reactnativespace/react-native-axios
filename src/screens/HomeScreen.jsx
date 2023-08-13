import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeInLeft } from 'react-native-reanimated';

import { getProducts } from '../service/productService'

const HomeScreen = ({ route, navigation }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const data = await getProducts()
            setProducts(data)

        }
        fetchData();

    }, []);

    const navigateToProduct = (id) => {
        navigation.navigate('Product', { productId: id })
    }

    return (
        <View style={{ backgroundColor: '#dfe6ec', flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>

            <AntDesign name="tags" size={32} color="#797979" style={{ alignSelf: 'center', marginBottom: 16 }} />

            <FlatList
                data={products}
                renderItem={({ item }) =>

                    <Animated.View entering={FadeInLeft.delay(500).duration(1000)} style={{ flex: 1 }}>
                        <TouchableOpacity key={item.id} style={{ backgroundColor: '#FFF', marginBottom: 32, padding: 12, borderRadius: 10 }}
                            onPress={() => navigateToProduct(item.id)}>
                            <AntDesign name="hearto" size={24} color="#71acf5" />
                            <Image
                                style={{ width: '100%', height: 250, resizeMode: 'contain', marginBottom: 12 }}
                                source={{ uri: item.image }}
                            />

                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#797979' }}>{item.title}</Text>
                            <Text style={{ fontSize: 12, fontWeight: '300', marginTop: 8, color: '#797979' }}>{item.category.toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name="star" size={20} color="#71acf5" />
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#797979', marginLeft: 4 }}>{item.rating.rate}</Text>
                                </View>

                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#71acf5' }}>{'$' + item.price}</Text>
                            </View>

                            <TouchableOpacity style={{ padding: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#71acf5', marginTop: 12, borderRadius: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: '#71acf5' }}>Add To Cart</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Animated.View>
                }
                keyExtractor={item => item.id}
            />

        </View>
    )
}

export default HomeScreen;