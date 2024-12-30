import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import Card from '../../components/Card'; // Import the Card component
import { useRoute } from '@react-navigation/native';
import { useCustomContext } from '@/contexts/Context';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  type RouteParams = {
    username?: string;
  };

  const route = useRoute();
  const { username } = route.params as RouteParams;

  
  const {count} = useCustomContext();

  const TMDB_API_KEY = 'fd6dd3786b92e1b39c75fa3f83d9037c';  
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        setData(json.results); 
        setLoading(false);  
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);  
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />

        <View style={{}}>
          <Text style={styles.textMain}>Hi, {username} 👋</Text>
          <Text style={styles.textSec}>Welcome to CineClap</Text>
          <Text style={styles.textSec1}>Select your Favourites</Text>
        </View>
        
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Card item={item} />} // Use the Card component
        keyExtractor={(item, index) => index.toString()}
      />
      <View 
        style={{ 
          position: 'absolute', 
          bottom: 10, right: 10, 
          backgroundColor: '#000000', 
          padding: 5, borderRadius: 10, 
          paddingHorizontal: 20}}
      >
        <Text style={styles.floating}>
          {count}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 16,
  },  
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    margin:20,
    borderRadius: 10,
  },  textMain:{
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textSec:{
    fontSize: 20,
    color:"#FF6F00"
  },
  textSec1:{
    fontSize: 15,
    marginTop: 5,
  
  },
  floating:{
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "bold",
    color: '#ffffff',
  },
});

export default HomePage;
