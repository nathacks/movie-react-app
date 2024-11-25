import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { App } from './src/App';
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";

configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
});

AppRegistry.registerComponent(appName, () => App);
