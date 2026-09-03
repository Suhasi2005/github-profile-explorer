import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SearchHistoryProvider } from './src/context/SearchHistoryContext';
import ProfileScreen from './src/screens/ProfileScreen';
import RepoDetailScreen from './src/screens/RepoDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.accent,
  },
};

export default function App() {
  return (
    <SearchHistoryProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'GitHub Explorer' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="RepoDetail" component={RepoDetailScreen} options={{ title: 'Repository' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SearchHistoryProvider>
  );
}
