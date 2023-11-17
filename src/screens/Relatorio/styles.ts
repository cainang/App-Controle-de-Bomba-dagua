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
  relatorioH1: {
    color: theme.colors.blue90,
    fontSize: 30,
    fontFamily: theme.fonts.extraBold,
    textAlign: 'center'
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  body: {
    flex: 1,
    paddingTop: 150
  },
  relatorioTotal: {
    marginTop: 25
  },
  label: {
    color: theme.colors.blue90,
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    textAlign: 'center'
  },
  ml: {
    color: theme.colors.blue90,
    fontSize: 27,
    fontFamily: theme.fonts.medium,
    textAlign: 'center'
  },
  goBackContainer: {
    /* width: 120,
    height: 120, */
    //backgroundColor: 'red',
    position: 'absolute',
    top: 65,
    left: 30
  },
});