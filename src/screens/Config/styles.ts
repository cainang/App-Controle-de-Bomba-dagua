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
  input: {
    borderColor: theme.colors.gray80,
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#fff",
    height: 40,
    fontSize: 17,
    width: 197
  },
  salvar: {
    backgroundColor: theme.colors.blue100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  salvarText: {
    color: "#fff",
    fontSize: 15,
    textAlign: 'center'
  }
});