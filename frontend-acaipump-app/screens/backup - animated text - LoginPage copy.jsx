import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { BackBtn, Button } from "../components";
import styles from "../constants/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS, SIZES } from "../constants";









const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Seu password precisa conter pelo menoe 8 caracteres")
    .required("Required"),
  email: Yup.string().email("Email inválido").required("Required"),
});






const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState(null);
  const [ obsecureText, setObsecureText ] = useState(false);

   {/* ....................... */}
   {/*                         */}
   {/* Animated Label Function */}
   {/*                         */}
   {/* ....................... */}

  const [animationValue] = useState(new Animated.Value(0));

const animateLabel = (toValue) => {
  Animated.timing(animationValue, {
    toValue,
    duration: 300,
    useNativeDriver: false,
  }).start()
}

const animatedStyle = {
  opacity: animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1], // Adjust the opacity values as needed
  }),
  transform: [
    {
      translateY: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -SIZES.large], // Adjust the translateY values as needed
      }),
    }, 
  ],
  backgroundColor: animationValue.interpolate({
    inputRange: [0,1],
    outputRange: [COLORS.lightWhite, COLORS.lightWhite]
  }),
  paddingHorizontal: SIZES.small,
  color: animationValue.interpolate({
    inputRange: [0,1],
    outputRange: [COLORS.black, COLORS.primary]
  })
};

   {/* ....................... */}
   {/*                         */}
   {/* End Anim Label Function */}
   {/*                         */}
   {/* ....................... */}

  const invalidForm = () => {
    Alert.alert(
      "Invalid Form",
      "Please provide all required fields",
      [ 
      {
        text: "Ok", onPress: () => {}

      },
      {defaultIndex : 1}
      ]
    )
  }
  

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.loginPageCover}
          />
          <Text style={styles.loginPageTitle}>
            Unlimited Luxuurous Furniture
          </Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>


                {/* Email Input */}


                <View style={styles.lpFormWrapper}>
                  <TextInput style={styles.lpFormLabel}>Email</TextInput>
                  <View style={styles.lpInputWrapper(touched.email ? COLORS.primary : COLORS.gray2)}>
                    <MaterialCommunityIcons
                      name='email-outline'
                      size={SIZES.small}
                      style={styles.lpIconStyle} 
                      />
                      <TextInput
                        placeholder="Enter email"
                        onFocus={() => setFieldTouched ('email')} 
                        onBlur={() => {setFieldTouched ('email', '')}}
                        value={values.email}
                        onChangeText={handleChange ('email')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                        />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.lpErrorMessage}>{errors.email}</Text>
                  )}
                </View>



                {/* Password Input */}
                

                <View style={styles.lpFormWrapper}>
                  {/* Backup Password Touch
                <Text style={(touched.password ? styles.lpFormLabelTouched : styles.lpFormLabel)}>Password</Text>
                  Input */}
                <Animated.Text style={[styles.lpFormLabel, animatedStyle]}>Password</Animated.Text>
                  <View style={styles.lpInputWrapper(touched.password ? COLORS.primary : COLORS.gray2)}>
                    <MaterialCommunityIcons
                      name='lock-outline'
                      size={SIZES.small}
                      style={styles.lpIconStyle} 
                      />
                      <TextInput
                        secureTextEntry={obsecureText}
                        placeholder=""
                        onFocus={() => { animateLabel(1); setFieldTouched ('password'); }} 
                        onBlur={() => { animateLabel(0); setFieldTouched ('password', '')}}
                        value={values.password}
                        onChangeText={handleChange ('password')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{flex: 1}}
                        />
                        <TouchableOpacity onPress={() => {setObsecureText(!obsecureText)}}>
                            <MaterialCommunityIcons 
                            name={obsecureText ? "eye-off-outline" : "eye-off-outline"} 
                            size={SIZES.small}
                            />
                        </TouchableOpacity>
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.lpErrorMessage}>{errors.email}</Text>
                  )}
                </View>


                <Button title={"Fazer login"} onPress={isValid ? handleSubmit : () => invalidForm()} isValid={isValid} />

                <Text onPress={() => navigation.navigate('SignUp')} style={styles.lpRegistration}> Register</Text>

              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
