import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 1,
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  ml: {
    color: theme.colors.blue90,
    fontSize: 48,
    fontFamily: theme.fonts.extraBold,
    textAlign: 'center'
  },
  label: {
    color: theme.colors.blue90,
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    textAlign: 'center'
  },
  percentage: {
    fontSize: 112,
    color: theme.colors.blue100,
    marginTop: 50,
    fontFamily: theme.fonts.extraBold
  },
  cups: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: theme.colors.gray80,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15
  },
  input: {
    borderColor: theme.colors.gray100,
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#fff",
    height: 40,
    fontSize: 17,
    width: 197
  }
});