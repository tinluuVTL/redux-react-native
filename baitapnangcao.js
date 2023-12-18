import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Action creators
const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

// Reducer
const initialState = {
  products: [
    { id: 1, name: 'Iphone 15 promax', price: 35000000, quantity: 0 },
    { id: 2, name: 'Iphone 14 promax', price: 28000000, quantity: 0 },
    { id: 3, name: 'Iphone 13 promax', price: 20000000, quantity: 0 },
  ],
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }
    case REMOVE_FROM_CART: {
      const productId = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== productId),
      };
    }
    default:
      return state;
  }
};

// Redux store
const store = createStore(reducer, applyMiddleware(thunk));

// Product component
const Product = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text>{product.name}</Text>
      <Text>Price: ${product.price}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

// Connect Product component to Redux store
const ConnectedProduct = connect(null, { addToCart })(Product);

// CartItem component
const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text>{item.name}</Text>
      <Text>Gía: ${item.price}</Text>
      <Text>Số lượng: {item.quantity}</Text>
      <Button title="+" onPress={handleIncrement} />
      <Button title="-" onPress={handleDecrement} />
    </View>
  );
};

// Connect CartItem component to Redux store
const ConnectedCartItem = connect(null, { updateQuantity, removeFromCart })(
  CartItem
);

// Cart component
const Cart = ({ cart }) => {
  const renderCartItem = ({ item }) => <ConnectedCartItem item={item} />;

  const total = cart.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  return (
    <View style={{ marginTop: 20 }}>
      <Text>Cart:</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

// Connect Cart component to Redux store
const ConnectedCart = connect((state) => ({
  cart: state.cart,
}))(Cart);

// App component
const BaiNangCao = () => {
  return (
  <Provider store={store}>
    <FlatList
      style={{ flex: 1, padding: 60 }}
      data={initialState.products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ConnectedProduct product={item} />}
      ListHeaderComponent={<Text style={styles.welcomeText}>Các sản phẩm:</Text>}
      ListFooterComponent={<ConnectedCart />}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    />
  </Provider>
);
};
const styles = StyleSheet.create({
  
    welcomeText: {

    fontSize: 20,
    marginBottom: 10,
    color: "red",
    fontWeight: "bold",
  },
})
export default BaiNangCao;