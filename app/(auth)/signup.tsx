import { Link, router } from "expo-router";
import React, { useState } from "react";
import {Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, ScrollView, View, TextInput } from "react-native";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = () => {
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });

    let isValid = true;

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      isValid = false;
    }

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      isValid = false;
    }

    if (!confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please confirm your password",
      }));
      isValid = false;
    } else if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      isValid = false;
    }

    if (isValid) {
      console.log("SignUp Successful");
      router.push(`/home?username=${name}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Image style={styles.logo}
              source={require("../../assets/images/logo.png")}
            />

            <Text style={styles.textMain}>
              SIGN UP
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <View style={{marginHorizontal: 50}}>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center', marginTop: 5}}>
            <Text style={styles.textBottom}>
              Already Have an Account?{" "}
              <Link href={"/signin"}>
                <Text style={styles.textBottomClick}>
                  Login
                </Text>
              </Link>
            </Text>
          </View>
          </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5F5DC",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 20,
  },
  scrollContent: {
    padding: 16,
  },
  inputContainer: {
    width: "100%", 
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 45,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "100%",
    marginTop: 30,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#FF6F00",
    paddingHorizontal: 30,
    borderRadius: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    height: 100,
    width: 100,
    margin:20,
    borderRadius: 20,
  },
  textMain:{
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textSec:{
    fontSize: 20,
  },
  textBottom:{
    fontSize: 14,
    margin: 5,
  },
  textBottomClick:{
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Signup;
