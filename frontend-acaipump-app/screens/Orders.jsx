import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OrdersTile from '../components/OrdersTile';
import fetchOrders from '../hook/fetchOrders';
import styles from '../constants/styles';
import { SIZES, COLORS } from '../constants'



const Orders = ({ navigation }) => {
    const { data, loading, error, refetch } = fetchOrders();

    return (
      <SafeAreaView style={styles.ordersContainer}>
            <View style={styles.ordersTitleRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
               name="chevron-back-circle"
               size={SIZES.large}
               color={COLORS.primary}
             />
                </TouchableOpacity>
               <Text style={styles.ordersTitleText}>Orders</Text>
            </View>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <OrdersTile item={item} />}
                />
            )}
        </SafeAreaView>
    );
};

export default Orders;




// import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
// import React from 'react'
// import styles from '../constants/styles'
// import { Ionicons } from '@expo/vector-icons'
// import { SIZES, COLORS } from '../constants'
// import OrdersTile from '../components/OrdersTile'
// import fetchOrders from '../hook/fetchOrders'

// const Orders = ({ navigation }) => {

//   const { data, loading, error, refetch } = fetchOrders();

//   console.log(data)

//   return (

//     <SafeAreaView style={styles.ordersContainer}>
//     <View style={styles.ordersTitleRow}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Ionicons
//           name="chevron-back-circle"
//           size={SIZES.large}
//           color={COLORS.primary}
//         />
//       </TouchableOpacity>
//       <Text style={styles.ordersTitleText}>Orders</Text>
//     </View>



//     {loading 
//       ? <ActivityIndicator /> 
//       : (
//         <FlatList
//         data={data}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <OrdersTile
//             item={item}
//           />
//         )}
//       />
//         )}



//       </SafeAreaView>
//   )
// }

// export default Orders