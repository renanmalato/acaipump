import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    TextInput,
    Alert,
    Animated
  } from "react-native";
  import React, { useState } from "react";
  import { BackBtn, Button } from "../components/";
  import styles from "../constants/styles";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
  import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { useAnimatedLabel } from "../constants/animations";

  
  
  
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Seu password precisa conter pelo menoe 8 caracteres")
      .required("Required"),
    email: Yup.string().email("Email inválido").required("Required"),
    location: Yup.string().min(3, "Local inválido").required("Required"),
    username: Yup.string().min(3, "Digite um username válido").required("Required"),

  });






const SignUp = ({navigation}) => {

    const [loader, setLoader] = useState(false);
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
      )
    }

     const registerUser = async(values) => {
        setLoader(true);

        try {
          const endpoint = 'http://localhost:3000/api/register';
          const data = values;

          const response = await axios.post(endpoint, data);

          if(response.status === 201) {
            navigation.replace('LoginPage')
          }
          
        } catch (error) {
          console.log(error)
        }

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
          initialValues={{ email: "", password: "", location: "", username: "", }}
          validationSchema={validationSchema}
          onSubmit={(values) => registerUser(values)}
        >
          {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
            <View>



              {/* Username Input */}


              <View style={styles.lpFormWrapper}>
                {/* <TextInput style={styles.lpFormLabel}>Username</TextInput> */}
                <View style={styles.lpInputWrapper(touched.username ? COLORS.primary: COLORS.gray2, touched.username ? 2 : 1)}>
                  <MaterialCommunityIcons
                    name='account-outline'
                    size={SIZES.small}
                    style={styles.lpIconStyle} 
                    />
                    <TextInput
                      onFocus={() => {
                        setFieldTouched ('username');
                        animatedLabelLogic("username", 1, values.username)
                      }}
                      onBlur={() => {
                        setFieldTouched ('username', '')
                        animatedLabelLogic('username', 0, values.username)
                      }}
                      value={values.username}
                      onChangeText={handleChange ('username')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                      />
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.lpErrorMessage}>{errors.username}</Text>
                )}
                <Animated.Text style={[styles.lpFormLabel, animatedLabelStyle("username")]}>Username</Animated.Text>


              </View>


              {/* Email Input */}


              <View style={styles.lpFormWrapper}>
                {/* <TextInput style={styles.lpFormLabel}>Email</TextInput> */}
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
                      style={{flex: 1}}
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


              {/* Location Input */}


              <View style={styles.lpFormWrapper}>
                {/* <TextInput style={styles.lpFormLabel}>Location</TextInput> */}
                <View style={styles.lpInputWrapper(touched.location ? COLORS.primary : COLORS.gray2, touched.location ? 2 : 1)}>
                  <Ionicons
                    name='location-outline'
                    size={SIZES.small}
                    style={styles.lpIconStyle} 
                    />
                    <TextInput
                      onFocus={() => {
                        setFieldTouched ('location');
                        animatedLabelLogic("location", 1, values.location);
                      }}
                      onBlur={() => {
                        setFieldTouched ('location', '');
                        animatedLabelLogic("location", 0, values.location);
                      }}
                      value={values.location}
                      onChangeText={handleChange ('location')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                      />
                </View>
                {touched.location && errors.location && (
                  <Text style={styles.lpErrorMessage}>{errors.location}</Text>
                )}
                <Animated.Text style={[styles.lpFormLabel, animatedLabelStyle("location")]}>Location</Animated.Text>
              </View>



              {/* Password Input */}
              

              <View style={styles.lpFormWrapper}>
                {/* <TextInput style={styles.lpFormLabel}>Password</TextInput> */}
                <View style={styles.lpInputWrapper(touched.email ? COLORS.primary : COLORS.gray2, touched.location ? 2 : 1)}>
                  <MaterialCommunityIcons
                    name='lock-outline'
                    size={SIZES.small}
                    style={styles.lpIconStyle} 
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      onFocus={() => { 
                        setFieldTouched ('password');
                        animatedLabelLogic("password", 1, values.password);

                      }}
                      onBlur={() => {
                        setFieldTouched ('password', '');
                        animatedLabelLogic('password', 0, values.password);
                      }}
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
                {touched.password && errors.password && (
                  <Text style={styles.lpErrorMessage}>{errors.password}</Text>
                )}
                <Animated.Text style={[styles.lpFormLabel, animatedLabelStyle("password")]}>Password</Animated.Text>
              </View>


              <Button 
              title={"Criar conta"} 
              onPress={isValid ? handleSubmit :inValidForm} 
              loader={loader}
              isValid={isValid} 
              />

              <Text onPress={() => navigation.navigate('SignUp')} style={styles.lpRegistration}> {" "} Register {" "}</Text>

            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  </ScrollView>
  )
}

export default SignUp