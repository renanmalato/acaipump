import { StyleSheet, View, Dimensions, FlatList, Image, Animated, TouchableOpacity } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { COLORS, SIZES } from '../../constants/index';
import { useNavigation } from '@react-navigation/native';



const { width } = Dimensions.get('window');

const Carroussel = () => {
    
  const navigation = useNavigation();
  const images = [
    {
      id: '1A',
      _id: '6632fde5d94c144de7f76424',
      source: require('../../assets/images/slideshow1.jpg'),
    },
    {
      id: '2B',
      _id: '6632fdf9d94c144de7f76426',
      source: require('../../assets/images/slideshow2.jpg'),
    },
    { 
      id: '3C',
      _id: '6632fd8dd94c144de7f76422',
      source: require('../../assets/images/slideshow3.jpg'),
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= images.length) {
          nextIndex = 0;
        }
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleImagePress = (itemId) => {
    navigation.navigate('ProductDetails', { itemId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item._id)}>
      <Image
        style={{
          width: width,
          height: '100%',
          resizeMode: 'cover'
        }}
        source={item.source}
      />
    </TouchableOpacity>
  );

  return (    
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <FlatList 
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ref={flatListRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX }}}],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={({ viewableItems }) => {
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
  );
}

const styles = StyleSheet.create({
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
});

export default Carroussel;