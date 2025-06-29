import { db } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { addDoc, collection, Timestamp } from "firebase/firestore"; // ← import Timestamp
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    nameProduct: "",
    idProduct: "",
    amount: "",
    expirationDate: "",  // espera "AAAA-MM-DD"
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // convierte amount a número y expirationDate a Timestamp
      await addDoc(collection(db, "productos"), {
        nameProduct: form.nameProduct,
        idProduct: form.idProduct,
        amount: Number(form.amount),
        expirationDate: Timestamp.fromDate(new Date(form.expirationDate)),
      });

      alert("Producto guardado");
      // opcional: vuelve atrás
      router.back();

      setForm({
        nameProduct: "",
        idProduct: "",
        amount: "",
        expirationDate: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar el producto");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/background.png")}
        style={styles.headerImage}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Nuevo Producto</Text>

        <TextInput
          placeholder="Nombre del producto"
          style={styles.input}
          value={form.nameProduct}
          onChangeText={(t) => handleChange("nameProduct", t)}
        />

        <TextInput
          placeholder="Código del producto"
          style={styles.input}
          value={form.idProduct}
          onChangeText={(t) => handleChange("idProduct", t)}
        />

        <TextInput
          placeholder="Cantidad"
          style={styles.input}
          keyboardType="numeric"
          value={form.amount}
          onChangeText={(t) => handleChange("amount", t)}
        />

        <TextInput
          placeholder="Fecha caducidad (AAAA-MM-DD)"
          style={styles.input}
          value={form.expirationDate}
          onChangeText={(t) => handleChange("expirationDate", t)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: 200,
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
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
