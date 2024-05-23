import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { LogoSymbol, Oops } from "../../assets/images/SVG/SvgIndex";
import styles from "../../constants/styles";
import { SIZES, COLORS } from "../../constants/index";

const ClosedMessage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = currentDate.getHours();

    // Check if it's Monday or outside the working hours
    if (currentDay === 1 || currentHour < 9 || currentHour >= 17) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, []);

  return (
    <>
      {showMessage && (
        <View style={styles.cartEmptyStateView}>
          <View style={{ alignSelf: "flex-start", marginLeft: SIZES.xSmall * 0.1 }}>
            <Oops />
          </View>

          <View style={styles.cartEmptyStateTextImageRow}>
            <View style={styles.cartEmptyStateTextView}>
              <Text style={styles.cartEmptyStateText}>
                Nossa entrega funciona de terça a domingo, das 10:00 às 17:00.{" "}
                <Text
                  style={[
                    styles.cartEmptyStateText,
                    { color: COLORS.primary3, fontFamily: "semibold" },
                  ]}
                >
                  Que tal agendar para a próxima hora disponível?
                </Text>
              </Text>
            </View>

            <Image
              style={styles.cartEmptyStateImage}
              source={require("../../assets/images/oops-foradehora.jpg")}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default ClosedMessage;
