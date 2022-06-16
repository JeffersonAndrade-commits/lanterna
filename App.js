import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';
import imageOn from './assets/icons/eco-light.png';
import imageOff from './assets/icons/eco-light-off.png';
import logoDio from './assets/icons/logo-dio.png';
import logoDioW from './assets/icons/logo-dio-white.png';

const App = () => {
  const [toggle, setToggle] = useState(false)

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    /**
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    /* Essa func vai ser chamada quando o componets
    for ser desmontado */
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container} >
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? imageOn
              : imageOff
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? logoDio
              : logoDioW
          }
        />
      </TouchableOpacity>
    </View>
  );
};
export default App

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },

});