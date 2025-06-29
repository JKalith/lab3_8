import { Image } from "expo-image";
import { db } from "../firebaseConfig";

import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const inicioEstado = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterUser() {
  const [estado, setEstado] = useState(inicioEstado);

  const HandleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const RegisterUser = async () => {
    if (estado.password !== estado.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      await addDoc(collection(db, "usuarios"), {
        fullName: estado.fullName,
        email: estado.email,
        password: estado.password,
      });

      Alert.alert("Éxito", "El usuario se registró con éxito");

      setEstado(inicioEstado);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al registrar el usuario.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/background.png")}
        style={styles.headerImage}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Crear cuenta nueva</Text>

        <TextInput
          placeholder="Nombre completo"
          placeholderTextColor="#333"
          style={styles.input}
          value={estado.fullName}
          onChangeText={(value) => HandleChangeText(value, "fullName")}
        />

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#333"
          style={styles.input}
          value={estado.email}
          onChangeText={(value) => HandleChangeText(value, "email")}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#333"
          secureTextEntry
          style={styles.input}
          value={estado.password}
          onChangeText={(value) => HandleChangeText(value, "password")}
        />

        <TextInput
          placeholder="Comprobar contraseña"
          placeholderTextColor="#333"
          secureTextEntry
          style={styles.input}
          value={estado.confirmPassword}
          onChangeText={(value) => HandleChangeText(value, "confirmPassword")}
        />

        <TouchableOpacity style={styles.button} onPress={RegisterUser}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  headerImage: {
    width: "100%",
    height: 210,
    resizeMode: "cover",
    marginBottom: 20,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  card: {
    backgroundColor: "#ddd",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#8B0000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
