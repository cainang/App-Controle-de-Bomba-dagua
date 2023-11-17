import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View, Text, TextInput, Alert } from "react-native";

import { Fontisto } from "@expo/vector-icons";

import { styles } from "./styles";
import { theme } from "../../styles/theme";
import { Header } from "../components/Header";
import Svg, { Circle, Path } from "react-native-svg";
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import api from "../../services/api";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

import { MaskedTextInput } from "react-native-mask-text";
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = StackScreenProps<RootStackParamList, 'Config', 'MyStack'>;

export function Config({ route, navigation }: Props) {
  const [mascaraAtiva, setMascaraAtiva] = useState("999.9.9.9");
  const [mascaraSR, setMascaraSR] = useState("255.0.0.0");
  const [ip, setIP] = useState("192.0.2.2");

  const mascaraSubrede = ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"];
  const mascara = ["999.9.9.9", "999.999.9.9", "999.999.999.9", "999.999.999.999"];

  useEffect(() => {
    (async () => {
      let dataCacheCF = await AsyncStorage.getItem('@App-IOT-CF');

      if (dataCacheCF) {
        let jsonData = JSON.parse(dataCacheCF);
        
        let searchMask = mascaraSubrede.indexOf(jsonData.mascara);
        if(searchMask != -1){
          setMascaraAtiva(mascara[searchMask])
        }

        setIP(jsonData.ip);
        setMascaraSR(jsonData.mascara);
      }
    })()
  }, [])

  async function onSubmit() {
    try {
      let dataCacheCF = await AsyncStorage.getItem('@App-IOT-CF');

      if (dataCacheCF) {
        let data = {
          ip: ip,
          mascara: mascaraSR
        }
      
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@App-IOT-CF', jsonValue);
        Alert.alert("Ip salvo com sucesso!");
      } else {
        let data = {
          ip: "10.0.2.2",
          mascara: "255.0.0.0"
        }
      
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@App-IOT-CF', jsonValue);
      }
    } catch (error) {
      Alert.alert("Erro ao salvar ip", JSON.stringify(error))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.goBackContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Fontisto
            name="arrow-left"
            size={22}
            color={theme.colors.blue90}
            style={{}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.relatorioH1}>
          Configurar Ip
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={{color: "#fff", marginBottom: 10, marginTop: 20}}>Mascara de Sub-rede</Text>
        <SelectDropdown
          data={mascaraSubrede}
          searchPlaceHolder="Selecione a Mascara de Sub-Rede"
          defaultValue={mascaraSR}
          
          buttonStyle={{backgroundColor: theme.colors.gray80, marginBottom: 20, borderRadius: 10}}
          buttonTextStyle={{color: "#fff"}}
          onSelect={(selectedItem, index) => {
            setMascaraAtiva(mascara[index]);
            setMascaraSR(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        
        <Text style={{color: "#fff", marginBottom: 10}}>IP</Text>
        <MaskedTextInput 
          mask={mascaraAtiva}
          onChangeText={(text, rawText) => {
            setIP(text);
          }}
          keyboardType="numeric"
          value={ip}
          style={styles.input} />
        <TouchableOpacity onPress={onSubmit} style={styles.salvar}>
          <Text style={styles.salvarText}>Salvar Ip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
