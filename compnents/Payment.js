import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNUpiPayment from 'react-native-upi-payment';

export default function Payment(props) {
  const [upiid, setupiid] = useState('vishaljain2504@okhdfcbank');
  const [name, setname] = useState('');
  const [amount, setamount] = useState(0);
  const [status, setstatus] = useState(null);
  const [txnId, settxnId] = useState(null);
  const [note, setnote] = useState('');

  function floo() {
    if (upiid !== '' && name !== '' && amount !== '') {
      RNUpiPayment.initializePayment(
        {
          vpa: upiid, // or can be john@ybl or mobileNo@upi
          payeeName: name,
          amount: amount,
          transactionRef: new Date().toString(),
          transactionNote: note,
        },
        successCallback,
        failureCallback,
      );
    } else {
      Alert.alert('Please Fill all required fields...');
    }
  }

  function failureCallback(data) {
    if (data.Status === 'SUCCESS') {
      setstatus('SUCCESS');
      settxnId(data.txnId);
    } else {
      setstatus('FAILURE');
      setTimeout(() => {
        setstatus('');
      }, 3000);
    }
  }
  function successCallback(data) {
    //nothing happened here using Google Pay
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Text style={styles.logo}>UPI Payment</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="UPI ID"
            value={upiid}
            placeholderTextColor="#003f5c"
            onChangeText={text => setupiid(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={text => setname(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Amount"
            keyboardType="numeric"
            placeholderTextColor="#003f5c"
            onChangeText={text => setamount(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Note"
            placeholderTextColor="#003f5c"
            onChangeText={text => setnote(text)}
          />
        </View>
        <TouchableOpacity onPress={floo} style={styles.loginBtn}>
          <Text style={styles.loginText}>Pay</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>{status}</Text>
        <Text style={styles.loginText}>{txnId}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 20,
    color: 'white',
  },
});
