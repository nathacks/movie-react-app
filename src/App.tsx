import { Main } from './screen/Main.tsx';
import { Provider } from './providers/Provider.tsx';
import { Header } from './screen/components/Header.tsx';
import { forceLightTheme } from './hooks/force-light-theme.hook.ts';

export function App() {
    forceLightTheme()

    return (
        <Provider>
            <Header />
            <Main />
        </Provider>
    )
}
