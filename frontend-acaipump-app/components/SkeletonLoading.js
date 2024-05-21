import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";
import styles from "../constants/styles";

const SkeletonLoading = () => {
  return (
    <View style={styles.container}>
      <ContentLoader
        speed={2}
        width="100%"
        height={300}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
        <Rect x="0" y="30" rx="5" ry="5" width="100%" height="20" />
        <Rect x="0" y="60" rx="5" ry="5" width="100%" height="20" />
        <Rect x="0" y="90" rx="5" ry="5" width="100%" height="20" />
      </ContentLoader>
    </View>
  );
};

export default SkeletonLoading;
