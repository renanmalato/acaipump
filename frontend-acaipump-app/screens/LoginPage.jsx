import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { BackBtn, Button } from "../components/";
import styles from "../constants/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS, SIZES } from "../constants";
import { useAnimatedLabel } from '../constants/animations'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';









const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("Campo requerido"),
  email: Yup.string().email("Email inválido").required("Campo requerido"),
});






const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [ obsecureText, setObsecureText ] = useState(false);


  // Animation Declarations

      const { animatedLabelLogic, animatedLabelStyle, animatedInputStyle } = useAnimatedLabel();
      


  const inValidForm = () => {
    Alert.alert(
      "Invalid Form",
      "Please provide all required fields",
      [ 
      {
        text: "Ok", onPress: () => {}

      },
      {defaultIndex : 1}
      ]
    );
  }
  
    {/* ---------------------------- */}
    {/*   Login Backend Function     */}
    {/* ---------------------------- */}

    const login = async (values) => {
      setLoader(true)

      try {
        const endpoint = "http://localhost:3000/api/login"
        const data = values;

        const response = await axios.post(endpoint, data)

        if(response.status === 200) {
          setLoader(false);

          setResponseData(response.data)
              console.log(`user${responseData._id}`)

          await AsyncStorage.setItem('id', JSON.stringify(responseData._id));
          await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData));
          await AsyncStorage.setItem("token", JSON.stringify(responseData.token));

          navigation.replace('Bottom Navigation')



        } 
      } catch (error) {
        Alert.alert(
          "Error",
          "Oops, Error logging in try again",
          [ 
          {
            text: "Ok", onPress: () => {}
    
          },
          {defaultIndex : 1}
          ]
        );
        console.log(error)
      } finally {
        setLoader(false);
      }};


  return (
    <ScrollView style={styles.loginPageContainer}>
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
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>

                {/* ----------- */}
                {/* Email Input */}
                {/* ----------- */}

                <View style={styles.lpFormWrapper}>
                  {/* <TextInput style={styles.lpFormLabel}>Email2</TextInput> */}
                  <View style={styles.lpInputWrapper(touched.email ? COLORS.primary: COLORS.gray2, touched.email ? 2 : 1)}>
                    <MaterialCommunityIcons
                      name='email-outline'
                      size={SIZES.small}
                      style={styles.lpIconStyle} 
                      />
                      <TextInput
                        onFocus={() => { 
                          setFieldTouched ('email'); 
                          animatedLabelLogic("email", 1, values.email); 
                        }} 
                        onBlur={() => {
                          setFieldTouched ('email', ''); 
                          animatedLabelLogic("email", 0, values.email);
                        }}
                        value={values.email}
                        onChangeText={handleChange ('email')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.lpTextInputValue}
                        />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.lpErrorMessage}>{errors.email}</Text>
                  )}

                    {/* --------------- */}
                    {/* Animated Label  */}
                    {/* --------------- */}
                    <Animated.Text style={[styles.lpFormLabel, animatedLabelStyle("email")]}>Email</Animated.Text>

                </View>



                {/* -------------- */}
                {/* Password Input */}
                {/* -------------- */}
                

                <View style={styles.lpFormWrapper}>
                  {/* Backup Password Touch
                <Text style={(touched.password ? styles.lpFormLabelTouched : styles.lpFormLabel)}>Password</Text>
                  Input */}
                
                  <View style={[styles.lpInputWrapper(touched.password ? COLORS.primary : COLORS.gray2, touched.password ? 2 : 1)]}>
                    <MaterialCommunityIcons
                      name='lock-outline'
                      size={SIZES.small}
                      style={styles.lpIconStyle} 
                      />
                      <TextInput
                        secureTextEntry={obsecureText}
                        placeholder=""
                        onFocus={() => { 
                          setFieldTouched ('password'); 
                          animatedLabelLogic("password", 1, values.password);
                        }} 
                        onBlur={() => { 
                          setFieldTouched ('password', ''); 
                          animatedLabelLogic("password", 0, values.password);
                        }}
                        value={values.password}
                        onChangeText={handleChange ('password')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.lpTextInputValue}
                        />
                        <TouchableOpacity onPress={() => {setObsecureText(!obsecureText)}}>
                            <MaterialCommunityIcons 
                            name={obsecureText ? "eye-off-outline" : "eye-outline"} 
                            size={SIZES.small}
                            />
                        </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.lpErrorMessage}>{errors.password}</Text>
                  )}

                    {/* --------------- */}
                    {/* Animated Label  */}
                    {/* --------------- */}
                     <Animated.Text style={[styles.lpFormLabel, animatedLabelStyle("password")]}>Password</Animated.Text>

                </View>


                <Button 
                      title={"Fazer login"} 
                      loader={loader}
                      onPress={isValid ? handleSubmit : inValidForm} isValid={isValid} />

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
