import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory';
import { space } from './src/utils/sizes'

const HISTORY_KEY = '@focusHistory';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [focusHistory, setFocusHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem(HISTORY_KEY);
        if (stored) {
          setFocusHistory(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to load history', e);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(focusHistory));
      } catch (e) {
        console.warn('Failed to save history', e);
      }
    };
    saveHistory();
  }, [focusHistory]);

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
