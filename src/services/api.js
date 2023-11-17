import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getApi() {
  let baseUrl = 'http://192.168.100.117';
  let dataCacheCF = await AsyncStorage.getItem('@App-IOT-CF');

  if (dataCacheCF) {
    let jsonData = JSON.parse(dataCacheCF);
    //baseUrl = `http://${jsonData.ip}`;
  }

  const api = axios.create({
    baseURL: `${baseUrl}/`,
  });

  return api;
}

export default getApi;