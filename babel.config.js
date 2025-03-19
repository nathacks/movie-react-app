module.exports = {
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
    plugins: [
        [
            'module:react-native-dotenv',
            {
                moduleName: "react-native-dotenv",
                path: '.env',
            },
        ],
    ],
};
