import { useRouter } from 'expo-router';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    Timestamp
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import appFirebase from '../firebaseConfig';

const db = getFirestore(appFirebase);

export default function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const router = useRouter();

  const cargarProductos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'productos'));
      const lista = [];
      snapshot.forEach(docSnap => lista.push({ id: docSnap.id, ...docSnap.data() }));
      setProductos(lista);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id));
      Alert.alert('¡Listo!', 'Producto eliminado correctamente.');
      cargarProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const renderItem = ({ item }) => {
    const fechaCad = item.expirationDate instanceof Timestamp
      ? item.expirationDate.toDate().toLocaleDateString()
      : item.expirationDate;

    return (
      <View style={styles.card}>
        <Text style={styles.productId}>ID: {item.id}</Text>
        <Text style={styles.title}>{item.nameProduct}</Text>
        <Text style={styles.subtitle}>Código: {item.idProduct}</Text>
        <Text style={styles.text}>Caducidad: {fechaCad}</Text>
        <Text style={styles.text}>Cantidad: {item.amount}</Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.button, styles.actionButton]}
            onPress={() => router.push({ pathname: '/editarProducto', params: { id: item.id } })}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.actionButton]}
            onPress={() => eliminarProducto(item.id)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Productos</Text>
      <TouchableOpacity
        onPress={() => router.push('/registerProduct')}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+ Nuevo Producto</Text>
      </TouchableOpacity>

      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#00A896",
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
  productId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButton: {
    backgroundColor: '#8B0000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
