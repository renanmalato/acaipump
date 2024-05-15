import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import styles from "../constants/styles";
import React, { useState } from "react";
import { SIZES, COLORS } from "../constants/index";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import SearchTile from "../components/products/SearchTile";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/search/${searchKey}`
      );

      setSearchResults(response.data);

      console.log("======================");
      console.log(response.data);
      console.log("======================");
    } catch (error) {
      console.log("Failed to get products", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather
            name="search"
            size={SIZES.medium + 5}
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What you are looking for?"
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.searchRightBtn}
            onPress={() => handleSearch()}
          >
            <Ionicons
              name="search"
              color={COLORS.secondary3}
              size={SIZES.medium + 8}
            />
          </TouchableOpacity>
        </View>
      </View>

      {searchResults.length === 0 ? (
        <View style={{flex: 1}}>
          <Image 
          source={require('../assets/images/Pose23.png')}
          style={styles.searchImage} 
          />
        </View>
      ) : (
     
        <FlatList 

          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (<SearchTile item = {item} />)}
          style={{marginHorizontal: SIZES.small}}
        /> 
      
      )}

    </SafeAreaView>
  );
};

export default Search;
