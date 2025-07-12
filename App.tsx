import { NavigationContainer } from '@react-navigation/native';
import { AppRouter } from './src/routers';
import type { PropsWithChildren } from 'react';
import { TansStackProvider } from './src/common/store/TansStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppState: React.FC<PropsWithChildren> = ({ children }) => (
  <TansStackProvider>
    <NavigationContainer>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </NavigationContainer>
  </TansStackProvider>
);

function App() {
  return (
    <AppState>
      <AppRouter />
    </AppState>
  );
}

export default App;
