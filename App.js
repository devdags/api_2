import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import axios from 'axios';

export default function App() {
  const [joke, setJoke] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    fetchData(); // Chamada inicial para buscar a primeira piada
    const interval = setInterval(() => {
      fetchData(); // Busca uma nova piada a cada 10 segundos
      setShowModal(true);
      setCountdown(10); // Reseta a contagem regressiva
    }, 10000);

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    if (countdown > 0 && showModal) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1); // Atualiza a contagem regressiva
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, showModal]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      setJoke(response.data.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Piadas Engraçadas Sobre o Chuck Norris</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{joke}</Text>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownLabel}>Piada atualizada em:</Text>
              <Text style={styles.countdown}>{countdown}</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: "orange",
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: -400, // Valor ajustado para subir o título
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
  countdownContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 4,
  },
  countdown: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
