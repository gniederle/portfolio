import { InitialScreen } from '../components/shared/InitialScreen';
import { initialScreenMessages } from '../i18n/messages';

export function App() {
  return <InitialScreen copy={initialScreenMessages.pt} />;
}
