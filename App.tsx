import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory';
import { space, font } from './src/utils/sizes'


export default function App() {
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [focusHistory, setFocusHistory] = useState<string[]>([]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' backgroundColor={colors.darkBlue} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.darkBlue,
          paddingHorizontal: space.lg
        }}>
        {!currentSubject ? (
          <>
            <Focus addSubject={setCurrentSubject} />
            <FocusHistory history={focusHistory} />
          </>
        ) : (
          <Timer
            focusSubject={currentSubject}
            onTimerEnd={(subject: string) => {
              setFocusHistory([...focusHistory, subject]);
            }}
            clearSubject={() => setCurrentSubject(null)}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
