import { useCustomContext } from '@/contexts/Context';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface CardProps {
  item: any;
}

const Card: React.FC<CardProps> = ({ item }) => {

  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;  

  
  const {increment} = useCustomContext();

  return (
    <View style={styles.card}>
      {item.poster_path ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      ) : (
        null
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        {item.overview ? item.overview : 'No description available.'}
      </Text>
      <Text style={styles.status}>Release Date: {item.release_date}</Text>

      <TouchableOpacity 
        style={{
          flexDirection: 'row', 
          alignItems: 'center', 
          marginTop: 10, 
          backgroundColor: '#FF6F00', 
          padding: 10, borderRadius: 10,}}  
        onPress={increment}
      >
        <FontAwesome name="plus" size={15} color={"white"}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5DC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center', // Centering the image and text
  },
  image: {
    width: 300,
    height: 450,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#757575',
    marginVertical: 8,
    textAlign: 'center',
  },
  status: {
    fontSize: 12,
    color: '#757575',
  },
});

export default Card;
