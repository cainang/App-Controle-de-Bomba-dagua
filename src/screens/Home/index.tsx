import React, { useState } from "react";
import { Alert, Dimensions, TouchableOpacity, View } from "react-native";

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
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApi from "../../services/api";

const { width } = Dimensions.get("screen");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type Props = StackScreenProps<RootStackParamList, 'Home', 'MyStack'>;

export function Home({ route, navigation }: Props) {
  const heighAnimated = useSharedValue(100);
  const waveAnimated = useSharedValue(5);
  const buttonStrokeAnimated = useSharedValue(0);

  const [percentage, setPercentage] = useState(0);
  const [mlWaterBox, setMlWaterBox] = useState(0);
  const [limitedMl, setLimitedMl] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [intervalo, setIntervalo] = useState<NodeJS.Timeout | null>(null);
  
  const buttonProps = useAnimatedProps(() => {
    return {
      cx: 60,
      cy: 60,
      r: 40,
      fill: theme.colors.blue100,
      strokeWidth: interpolate(
        buttonStrokeAnimated.value,
        [0, 0.5, 1],
        [17, 40, 17]
      ),
      stroke: theme.colors.blue90,
      strokeOpacity: 0.5,
    };
  });

  const firstWaveProps = useAnimatedProps(() => {
    return {
      d: `
        M 0 0
        Q 35 ${waveAnimated.value} 70 0
        T 140 0
        T 210 0
        T 280 0
        T 350 0
        T 420 0
        V ${heighAnimated.value}
        H 0
        Z
    `,
    };
  });

  const secondWaveProps = useAnimatedProps(() => {
    return {
      d: `
        M 0 0
        Q 45 ${waveAnimated.value + 5} 90 0
        T 180 0
        T 270 0
        T 360 0
        T 900 0
        T 540 0
        V ${heighAnimated.value}
        H 0
        Z
    `,
    };
  });

  const SVGProps = useAnimatedProps(() => {
    return {
      height: heighAnimated.value,
      viewBox: `0 0 ${width} ${heighAnimated.value}`,
    };
  });

  const storeData = async (value: {ml: number}) => {
    try {
      let dataCacheRS = await AsyncStorage.getItem('@App-IOT-RS');

      if (dataCacheRS) {
        let date = new Date();
        let dia = date.getDay();
        let jsonData = JSON.parse(dataCacheRS);

        if(dia == 0 && jsonData.dataset[dia] != 0){
          let data = {
            dataset: [0, 0, 0, 0, 0, 0, 0],
          }
    
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('@App-IOT-RS', jsonValue);
        } else {
          jsonData.dataset[dia] = jsonData.dataset[dia] + value.ml;

          let data = {
            dataset: jsonData.dataset
          }

          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('@App-IOT-RS', jsonValue);
        }
      } else {
        let data = {
          dataset: [0, 0, 0, 0, 0, 0, 0],
        }
  
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@App-IOT-RS', jsonValue);
      }

      let dataCacheRT = await AsyncStorage.getItem('@App-IOT-RT');

      if (dataCacheRT) {
        let jsonData = JSON.parse(dataCacheRT);
        let newMl = Number(jsonData.ml) + value.ml;

        let data = {
          ml: newMl
        }

        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@App-IOT-RT', jsonValue);
      } else {
        let data = {
          ml: 0,
        }
  
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@App-IOT-RT', jsonValue);
      }
    } catch (e) {
      Alert.alert("Erro no armazenamento", JSON.stringify(e))
    }
  };

  let localMl = mlWaterBox;

  async function handleDrink(isActive: boolean) {
    let newValue = !isActive;
    const api = await getApi();

    try {
      if (newValue) {
        // FAZ A CHAMADA PARA API DO ARDUINO
        let res = await api.get('/desligar')
        
        if (res.status == 200) {
          let intervaloParaEnchemento = setInterval(async () => {
            if (limitedMl != 0 && (localMl + 1.05) > limitedMl) {
              // FAZ A CHAMADA PARA API DO ARDUINO
              let res = await api.get('/ligar')
        
              if (res.status == 200) {
                if (intervaloParaEnchemento) {
                  clearInterval(intervaloParaEnchemento);
                }
                setIsActive(!newValue);
              }
              return;
            }
            localMl = localMl + 1.05;
            buttonStrokeAnimated.value = 0;
            waveAnimated.value = 5;
      
            buttonStrokeAnimated.value = withTiming(1, {
              duration: 0,
              easing: Easing.ease,
            });
            waveAnimated.value = withRepeat(
              withTiming(17, {
                duration: 0,
                easing: Easing.ease,
              }),
              2,
              true
            );
      
            heighAnimated.value = withTiming((localMl + 100), {
              duration: 0,
              easing: Easing.ease,
            });
      
            setPercentage(Math.trunc(localMl * 0.1))
            let mlToSave = localMl;
            // SALVA INFORMAÇÕES PARA O RELATORIO
            await storeData({ml: mlToSave});
            setMlWaterBox(localMl);
          }, 1000);
    
          setIntervalo(intervaloParaEnchemento);
          setIsActive(newValue);
        }
      } else {
        // FAZ A CHAMADA PARA API DO ARDUINO
        let res = await api.get('/ligar')
  
        if (res.status == 200) {
          if (intervalo) {
            clearInterval(intervalo);
          }
          setIsActive(newValue);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDrinkReset = () => {
    setIsActive(false);
    if (intervalo) {
      clearInterval(intervalo);
    }
    heighAnimated.value = 100
    buttonStrokeAnimated.value = 0;
    waveAnimated.value = 5;
    setMlWaterBox(0);
    setPercentage(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.relatorioContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.push("Relatorio")}
          activeOpacity={0.7}
        >
          <Fontisto
            name="bar-chart"
            size={22}
            color={theme.colors.blue90}
            style={{}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.configContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.push("Config")}
          activeOpacity={0.7}
        >
          <Fontisto
            name="player-settings"
            size={22}
            color={theme.colors.blue90}
            style={{}}
          />
        </TouchableOpacity>
      </View>
      <Header ml={mlWaterBox} percent={percentage} setLimitedMl={setLimitedMl} />

      <AnimatedSvg width={width} animatedProps={SVGProps}>
        <AnimatedPath
          animatedProps={firstWaveProps}
          fill={theme.colors.blue100}
          transform="translate(0,10)"
        />

        <AnimatedPath
          animatedProps={secondWaveProps}
          fill={theme.colors.blue70}
          transform="translate(0,15)"
        />
      </AnimatedSvg>

      <View style={styles.footer}>
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDrink(isActive)}
            activeOpacity={0.7}
          >
            <Svg width="120" height="120">
              <AnimatedCircle animatedProps={buttonProps} />
            </Svg>
            {isActive ? (
              <Fontisto
                name="pause"
                size={32}
                color={theme.colors.blue90}
                style={styles.icon}
              />
            ) : (
              <Fontisto
                name="blood-drop"
                size={32}
                color={theme.colors.blue90}
                style={styles.icon}
              />)}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, {marginLeft: 20, borderColor: '#fff', borderWidth: 2, borderRadius: 5}]}
            onPress={() => handleDrinkReset()}
            activeOpacity={0.7}
          >
            <Fontisto
              name="stop"
              size={22}
              color={"#000"}
              style={{}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
