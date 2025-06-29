import { useLocalSearchParams, useRouter } from "expo-router";
import {
    doc,
    getDoc,
    getFirestore,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import appFirebase from "../firebaseConfig";

const db = getFirestore(appFirebase);

export default function EditarProducto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [estado, setEstado] = useState({
    idProduct: "",
    expirationDate: "",
    nameProduct: "",
    amount: "",
  });

  useEffect(() => {
    const cargar = async () => {
      const snap = await getDoc(doc(db, "productos", id));
      if (snap.exists()) {
        const data = snap.data();
        setEstado({
          idProduct: data.idProduct,
          expirationDate:
            data.expirationDate instanceof Timestamp
              ? data.expirationDate.toDate().toISOString().slice(0, 10)
              : data.expirationDate,
          nameProduct: data.nameProduct,
          amount: data.amount.toString(),
        });
      }
    };
    cargar();
  }, [id]);

  const handleChangeText = (value, field) => {
    setEstado((prev) => ({ ...prev, [field]: value }));
  };

  const guardarCambios = async () => {
    try {
      await updateDoc(doc(db, "productos", id), {
        idProduct: estado.idProduct,
        expirationDate: Timestamp.fromDate(new Date(estado.expirationDate)),
        nameProduct: estado.nameProduct,
        amount: Number(estado.amount),
      });
      Alert.alert("¡Listo!", "Producto actualizado correctamente.");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar el producto");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Código de producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de producto"
        value={estado.idProduct}
        onChangeText={(v) => handleChangeText(v, "idProduct")}
      />

      <Text style={styles.label}>Fecha de caducidad</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha de caducidad (AAAA-MM-DD)"
        value={estado.expirationDate}
        onChangeText={(v) => handleChangeText(v, "expirationDate")}
      />

      <Text style={styles.label}>Nombre del producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={estado.nameProduct}
        onChangeText={(v) => handleChangeText(v, "nameProduct")}
      />

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={estado.amount}
        onChangeText={(v) => handleChangeText(v, "amount")}
      />

      <TouchableOpacity style={styles.btn} onPress={guardarCambios}>
        <Text style={styles.btnText}>Guardar cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  btn: {
    width: "100%",
    backgroundColor: "#8B0000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
