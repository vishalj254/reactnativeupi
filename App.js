/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';

import Payment from './compnents/Payment';
import {NativeModules} from 'react-native';

function App() {
  const forbidFunction = async () => {
    try {
      const result = await NativeModules.PreventScreenshotModule.forbid();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    forbidFunction();
  }, []);
  console.disableYellowBox = true;
  return (
    <>
      <Payment />
    </>
  );
}

export default App;
