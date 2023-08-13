import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { getProductById } from '../service/productService'

const ProductScreen = ({ route, navigation }) => {


    const { productId } = route.params;
    const [product, setProduct] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            const data = await getProductById(productId)
            setProduct(data)
        }
        fetchData();

    }, []);

    return (
        <View style={{ backgroundColor: '#dfe6ec', flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
            <AntDesign name="tags" size={32} color="#797979" style={{ alignSelf: 'center', marginBottom: 16 }} />
            <Animated.View entering={FadeInDown.delay(500).duration(1000)} style={{ flex: 1 }}>
                {product &&
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, backgroundColor: '#FFF', marginVertical: 8, borderRadius: 10, padding: 30 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#797979', textAlign: 'center' }}>{product.title}</Text>
                            <Text style={{ fontSize: 12, fontWeight: '300', marginTop: 8, color: '#797979', textAlign: 'center' }}>{product.category.toUpperCase()}</Text>

                            <Image
                                style={{ width: '100%', height: 250, resizeMode: 'contain', }}
                                source={{ uri: product.image }}
                            />

                            <Text style={{ flex: 1, fontSize: 14, fontWeight: '400', marginTop: 16, color: '#797979', textAlign: 'center' }}>{product.description}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 24 }}>
                                <AntDesign name="star" size={20} color="#71acf5" />
                                <Text style={{ fontSize: 12, fontWeight: '600', color: '#797979', marginLeft: 4 }}>{product.rating.rate}</Text>
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#71acf5', textAlign: 'center', marginTop: 8, }}>{'$' + product.price}</Text>
                        </View>
                        <TouchableOpacity style={{ padding: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#71acf5', borderWidth: 2, borderColor: '#FFF', marginTop: 4, borderRadius: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFF' }}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                }
            </Animated.View>

        </View>
    )
}

export default ProductScreen;