import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../../../styles/theme';
import { cups } from '../../../utils/cups';
import { styles } from './styles';

type Props = {
  ml: number;
  percent: number;
  setLimitedMl: (value: number) => void;
}

export function Header({ ml, percent, setLimitedMl }: Props) {

  const formatterMoney = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.ml}>
          {ml.toFixed(2)} L
        </Text>

        <Text style={styles.label}>
          Valor economizado {formatterMoney.format((((ml/1000))*1.71))}
        </Text>
      </View>

      <View style={styles.cups}>
        <Text style={styles.label}>
          Quantidade de Litros:
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style={styles.input} inputMode='numeric' defaultValue='0' onChangeText={(text) => setLimitedMl(parseFloat(text))} />
          <Text style={[styles.ml, {fontSize: 19, marginLeft: 10}]}>
            L
          </Text>
        </View>
        {/* {
          cups.map(value => (
            <MaterialCommunityIcons
              key={String(value)}
              name="cup"
              size={32}
              color={percent > value ? theme.colors.blue90 : theme.colors.gray80}
            />
          ))
        } */}
      </View>

      {/* <Text style={styles.percentage}>
        {percent}%
      </Text> */}
    </View>
  );
}