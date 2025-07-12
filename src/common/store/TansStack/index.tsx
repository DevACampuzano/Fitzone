import Clipboard from '@react-native-clipboard/clipboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { DevToolsBubble } from 'react-native-react-query-devtools';

const queryClient = new QueryClient();
export const TansStackProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const onCopy = async (text: string) => {
    try {
      await Clipboard.setString(text);
      return true;
    } catch {
      return false;
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {__DEV__ && <DevToolsBubble onCopy={onCopy} queryClient={queryClient} />}
    </QueryClientProvider>
  );
};
