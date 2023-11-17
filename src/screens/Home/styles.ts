import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.gray100
  },
  glass: {
    width: '100%',
    height: 500,
    backgroundColor: theme.colors.blue90
  },
  button: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 50,
    top: 43
  },
  footer: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: 35,
  },
  relatorioContainer: {
    /* width: 120,
    height: 120, */
    //backgroundColor: 'red',
    position: 'absolute',
    top: 65,
    right: 30
  },
  configContainer: {
    /* width: 120,
    height: 120, */
    //backgroundColor: 'red',
    position: 'absolute',
    top: 65,
    left: 30
  },
});