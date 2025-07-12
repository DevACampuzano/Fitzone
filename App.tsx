import { NavigationContainer } from '@react-navigation/native';
import { AppRouter } from './src/routers';
import type { PropsWithChildren } from 'react';
import {
  TansStackProvider,
  ToastProvider,
  useUserStore,
} from './src/common/store/';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const AppState: React.FC<PropsWithChildren> = ({ children }) => (
  <TansStackProvider>
    <NavigationContainer>
      <SafeAreaProvider>
        <ToastProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#F8F3FA" />
          {children}
        </ToastProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  </TansStackProvider>
);

function App() {
  useUserStore.persist.rehydrate();
  return (
    <AppState>
      <AppRouter />
    </AppState>
  );
}

export default App;
