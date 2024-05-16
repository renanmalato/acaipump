import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../constants/styles';
import { SIZES, COLORS } from '../constants';

const OrdersTile = ({ item }) => {
    return (
        <TouchableOpacity style={styles.ctContainer(COLORS.secondary)}>
            <View style={styles.ctImageContainer}>
                <Image source={{ uri: item.product.imageUrl }} style={styles.ctImage} />
            </View>
            <View style={styles.ctTextContainer}>
                <Text numberOfLines={1} style={styles.ctTitle}>
                    {item.product.title}
                </Text>
                <Text numberOfLines={1} style={styles.ctSubtitle}>
                    {item.product.subtitle}
                </Text>
                <Text numberOfLines={1} style={styles.ctUnity}>
                    {item.product.unity} unidades
                </Text>
                <Text numberOfLines={1} style={styles.ctPrice}>
                    $ {item.product.price} * {item.quantity}
                </Text>
            </View>
            <TouchableOpacity style={{ paddingBottom: SIZES.large, paddingLeft: SIZES.large }} onPress={() => {}}>
                <View>
                    <Text>{item.payment_status}</Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default OrdersTile;
