import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { login, logout } from './actions';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogin = () => {
    // Thực hiện đăng nhập và cập nhật Redux store
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleLogout = () => {
    // Thực hiện đăng xuất và cập nhật Redux store
    this.props.logout();
  };

  render() {
    const { isAuthenticated, user } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isAuthenticated ? (
          <View>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Xin chào, {user.username}!</Text>
            <Button title="Đăng xuất" onPress={this.handleLogout} />
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Tên người dùng"
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry
            />
            <Button title="Đăng nhập" onPress={this.handleLogin} />
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  input: {
    width: 200,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = {
  login,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);