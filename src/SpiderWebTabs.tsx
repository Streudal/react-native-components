import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-paper';
import { VectorIcon } from '../../components/VectorIcon';

const Tabs = createBottomTabNavigator();

function AddButton() {
  const mode = useRef(new Animated.Value(0)).current;
  const buttonSize = useRef(new Animated.Value(1)).current;
  const value = useRef(0);
  mode.addListener((modeObj) => (value.current = modeObj.value));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(mode, {
        toValue: value.current === 0 ? 1 : 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const thermometerX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -100],
  });

  const thermometerY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });

  const timeX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -24],
  });

  const timeY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -150],
  });

  const pulseX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 50],
  });

  const pulseY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const sizeStyle = {
    transform: [{ scale: buttonSize }],
  };

  return (
    <View style={{ position: 'absolute', alignItems: 'center' }}>
      <Animated.View
        style={{ position: 'absolute', left: thermometerX, top: thermometerY }}
      >
        <View style={styles.secondaryButton}>
          <VectorIcon category='feather' name='activity' />
        </View>
      </Animated.View>
      <Animated.View style={{ position: 'absolute', left: timeX, top: timeY }}>
        <View style={styles.secondaryButton}>
          <VectorIcon category='feather' name='activity' />
        </View>
      </Animated.View>
      <Animated.View
        style={{ position: 'absolute', left: pulseX, top: pulseY }}
      >
        <View style={styles.secondaryButton}>
          <VectorIcon category='feather' name='activity' />
        </View>
      </Animated.View>
      <Animated.View style={[styles.button, sizeStyle]}>
        <TouchableHighlight onPress={handlePress} underlayColor='#7F58FF'>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <VectorIcon category='feather' name='activity' />
          </Animated.View>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#7F58FF',
    position: 'absolute',
    marginTop: -60,
    shadowColor: '#7F58FF',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  secondaryButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7F58FF',
  },
});

function TestScreen() {
  return (
    <View>
      <Text>HI</Text>
    </View>
  );
}

function Blank() {
  return null;
}

export function Routes() {
  return (
    <Tabs.Navigator
      initialRouteName='A'
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tabs.Screen name='A' component={TestScreen} />
      <Tabs.Screen name='B' component={TestScreen} />
      <Tabs.Screen
        name='C'
        component={Blank}
        options={{ tabBarIcon: () => <AddButton /> }}
      />
      <Tabs.Screen name='D' component={TestScreen} />
      <Tabs.Screen name='E' component={TestScreen} />
    </Tabs.Navigator>
  );
}
