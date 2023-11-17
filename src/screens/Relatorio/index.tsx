import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View, Text } from "react-native";

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
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("screen");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type Props = StackScreenProps<RootStackParamList, 'Relatorio', 'MyStack'>;

export function Relatorio({ route, navigation }: Props) {
  const heighAnimated = useSharedValue(100);
  const waveAnimated = useSharedValue(5);
  const buttonStrokeAnimated = useSharedValue(0);

  const [percentage, setPercentage] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [intervalo, setIntervalo] = useState<NodeJS.Timer | null>(null)
  const [data, setData] = useState({
    labels: ["Domingo","Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(50,186,250, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Gasto P/ Dia"] // optional
  })
  const [ml, setML] = useState(0)

  useEffect(() => {
    (async () => {
      let dataCacheRS = await AsyncStorage.getItem('@App-IOT-RS');

      if (dataCacheRS) {
        let jsonData = JSON.parse(dataCacheRS);
        
        setData({...data, datasets: [
          {
            data: jsonData.dataset,
            color: (opacity = 1) => `rgba(50,186,250, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ]});
      }

      let dataCacheRT = await AsyncStorage.getItem('@App-IOT-RT');

      if (dataCacheRT) {
        let jsonData = JSON.parse(dataCacheRT);
        setML(jsonData.ml)
      }
    })()
  }, [])

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: theme.colors.gray100,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: theme.colors.gray100,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(50,186,250, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'unit',
    unit: 'liter',
  });

  const formatterMoney = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

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
          Relatório Semanal
        </Text>
      </View>
      <View style={styles.body}>
        <LineChart
          data={data}
          width={screenWidth}
          height={256}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        />
        <View style={styles.relatorioTotal}>
          <Text style={styles.relatorioH1}>
            Gasto Total
          </Text>
          <Text style={[styles.ml, {marginTop: 20}]}>
            {formatter.format(ml)}
          </Text>
          <Text style={[styles.label, {marginTop: 5}]}>
            {formatterMoney.format((((ml/1000))*1.71))}
          </Text>
        </View>
      </View>
    </View>
  );
}
