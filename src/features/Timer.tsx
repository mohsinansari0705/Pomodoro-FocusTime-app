import React, { useState } from 'react';
import { View, Text, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/countdown';
import { RoundedButton } from '../components/RoundedButton';
import { colors } from '../utils/colors';
import { space, font } from '../utils/sizes';
import { PATTERN } from '../utils/patterns';
import { Timing } from './Timing';


type TimerProps = {
  focusSubject: string;
  clearSubject: () => void;
  onTimerEnd: (subject: string) => void;
};


export const Timer = ({ focusSubject, clearSubject, onTimerEnd }: TimerProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);
  
  useKeepAwake();

  const onEnd = (reset: () => void) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.45, justifyContent: 'center', alignItems: 'center' }}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />

        <View style={{ paddingTop: space.xl }}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.textMuted,
              fontSize: font.md * 1.25,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
            Focusing on:
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: colors.white,
              fontSize: font.lg,
              fontWeight: 'bold',
              marginTop: space.sm / 2
            }}>
            {focusSubject}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: space.sm }}>
        <ProgressBar
          style={{ height: space.sm, borderRadius: space.sm / 2 }}
          progress={progress}
          color={colors.progressBar}
        />
      </View>

      <View style={{ flex: 0.15, alignItems: 'center', paddingTop: space.lg }}>
        <Text
          style={{
            color: colors.textMuted,
            fontSize: font.md * 0.85,
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: space.sm,
            marginTop: space.sm * 2
          }}>
          Set Duration (min)
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Timing onChangeTime={setMinutes} />
        </View>
      </View>

      <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
        {!isStarted ? (
          <RoundedButton
            title="Start"
            onPress={() => setIsStarted(!isStarted)}
            style={{ borderColor: colors.accentGreen }}
            textStyle={{ color: colors.accentGreen }}
          />
        ) : (
          <RoundedButton
            title="Pause"
            onPress={() => setIsStarted(!isStarted)}
            style={{ borderColor: colors.accentYellow }}
            textStyle={{ color: colors.accentYellow }}
          />
        )}
      </View>

      <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', paddingBottom: space.md }}>
        <RoundedButton
          size={75}
          title="✖"
          onPress={clearSubject}
          style={{ borderColor: colors.accent }}
          textStyle={{ color: colors.accent }}
        />
      </View>
    </View>
  );
};
