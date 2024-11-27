import { Main } from './screen/Main.tsx';
import { Provider } from './providers/Provider.tsx';

export function App() {
    return (
        <Provider>
            {/*<Header />*/}
            <Main />
        </Provider>
    )
}
