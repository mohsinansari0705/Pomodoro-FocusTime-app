import React from 'react';
import {
  useRef,
  useState,
  useEffect,
  useCallback
} from 'react';
import { View, Text } from 'react-native';
import { colors } from '../utils/colors';
import { font, space } from '../utils/sizes';


type CountdownProps = {
  minutes: number,
  isPaused: boolean,
  onProgress: (progress: number) => void;
  onEnd: (reset: () => void) => void;
}

const minutesToMillis = (min: number) => min * 1000 * 60;
const formatTime = (time: number): string => (time < 10 ? `0${time}` : `${time}`);


export const Countdown = ({
  minutes = 0.1,
  isPaused,
  onProgress,
  onEnd
}: CountdownProps) => {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [millis, setMillis] = useState<number>(minutesToMillis(minutes));

  const reset = useCallback(() => {
    setMillis(minutesToMillis(minutes));
}, [minutes]);

  const countDown = useCallback(() => {
    setMillis((time) => {
      if (time === 0) {
        if (interval.current) clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      return time - 1000;
    });
  }, [onEnd, reset]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis, minutes, onProgress]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [isPaused, countDown]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View
      style={{
        backgroundColor: 'rgba(94, 132, 226, 0.15)',
        borderRadius: space.lg,
        borderWidth: 1,
        borderColor: 'rgba(94, 132, 226, 0.3)',
        paddingVertical: space.lg,
        paddingHorizontal: space.xxl
      }}>
      <Text
        style={{
          fontSize: font.xxxl,
          fontWeight: 'bold',
          color: colors.white,
          textAlign: 'center',
          letterSpacing: 4
        }}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};
