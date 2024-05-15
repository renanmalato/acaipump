import { StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions, FlatList, Image, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS, SIZES } from '../../constants/index'

const { width } = Dimensions.get('window');

const Carroussel = () => {
    
    const images = [
      {
        id: '1A',
        source: require('../../assets/images/fn1.jpg'),
      },
      {
        id: '1B',
        source: require('../../assets/images/fn2.jpg'),
      },
      { 
        id: '1C',
        source: require('../../assets/images/fn3.jpg'),
      }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;


    const renderItem = ({ item }) => (
      
        <Image style={{
          width: width, 
          height: '100%', 
          resizeMode: 'cover'}} 
          source={item.source} 
          />
    );

    const paginate = (index) => {
      setCurrentIndex(index);
    }

    return (    
    <View style={styles.outerContainer}>

    <View style={styles.innerContainer}>
      
      <FlatList 
      data={images} 
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.id}

      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX }}}],
        { useNativeDriver: false }
      )}

      onViewableItemsChanged={({viewableItems}) => {
        setCurrentIndex(viewableItems[0]?.index || 0);
      }}

      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}


      style={styles.carousel}

      contentContainerStyle={{ flexGrow: 1 }}
      /> 

    <View style={styles.pagination}>
        {images.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot, 
              { 
                 backgroundColor: index === currentIndex ? '#333' : '#ddd',
              },
            ]}
          />
        ))}
      </View>

    </View>
    </View>
  )
}

const styles = StyleSheet.create ({

  outerContainer: {
    flex: 1,
    paddingHorizontal: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    borderRadius: SIZES.medium,
    overflow: 'hidden',
    position: 'relative',
  },
  carousel: {
    width: width,
    height: 200,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: SIZES.small,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  }

})

export default Carroussel