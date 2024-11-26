import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PropsWithChildren } from 'react'

export function Provider({ children }: PropsWithChildren) {
    return (
        <SafeAreaProvider>
            {children}
        </SafeAreaProvider>
    )
}
