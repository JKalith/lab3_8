import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
    source={require('../assets/images/background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>fruit<span style={{ color: '#3cb371' }}>.nl</span></Text>

          <View style={styles.inputGroup}>
            <Ionicons name="mail" size={20} color="#333" style={styles.icon} />
            <TextInput
              placeholder="correo electrónico"
              placeholderTextColor="#333"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed" size={20} color="#333" style={styles.icon} />
            <TextInput
              placeholder="contraseña"
              placeholderTextColor="#333"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={() => alert("Ingresando...")}>
            <Text style={styles.loginText}>Ingresar</Text>
          </TouchableOpacity>

          <Text style={styles.links}>
            Crear cuenta nueva{" "}
            <Text
              style={styles.linkBold}
              onPress={() => router.push("/registerUser")}
            >
              Regístrate
            </Text>
          </Text>

          <Text
            style={styles.linkLight}
            onPress={() => alert("Recuperación aún no implementada")}
          >
            ¿Olvidó contraseña?
          </Text>


         <TouchableOpacity
            style={styles.extraButton}
            onPress={() => router.push("/list")}
          >
            <Text style={styles.extraButtonText}>lista</Text>
          </TouchableOpacity>


        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // sombra oscura encima
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#F5F5F5",
    padding: 25,
    borderRadius: 20,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
    height: 50,
    elevation: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 12,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  links: {
    marginTop: 10,
    fontSize: 14,
    color: "#000",
  },
  linkBold: {
    color: "#8B0000",
    fontWeight: "bold",
  },
  linkLight: {
    color: "#00a896",
    fontSize: 14,
    marginTop: 6,
    textDecorationLine: "underline",
  },
  extraButton: {
    marginTop: 10,
    backgroundColor: "#00A896",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  extraButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
