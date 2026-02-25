import React from 'react';
import { View } from 'react-native';
import { RoundedButton } from '../components/RoundedButton';
import { colors } from '../utils/colors';
import { space } from '../utils/sizes';


type timingProps = {
  onChangeTime: ( Time: number ) => void
}

export const Timing = ({ onChangeTime }: timingProps ) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', marginHorizontal: space.sm / 2, marginTop: space.sm * 1.5 }}>
        <RoundedButton
          size={65}
          title='10'
          onPress={() => onChangeTime(10)}
          style={{ borderColor: colors.progressBar }}
          textStyle={{ color: colors.progressBar }}
          />
      </View>
      <View style={{ flex: 1, alignItems: 'center', marginHorizontal: space.sm / 2, marginTop: space.sm * 1.5 }}>
        <RoundedButton
          size={65}
          title='15'
          onPress={() => onChangeTime(15)}
          style={{ borderColor: colors.progressBar }}
          textStyle={{ color: colors.progressBar }}
          />
      </View>
      <View style={{ flex: 1, alignItems: 'center', marginHorizontal: space.sm / 2, marginTop: space.sm * 1.5 }}>
        <RoundedButton
          size={65}
          title='20'
          onPress={() => onChangeTime(20)}
          style={{ borderColor: colors.progressBar }}
          textStyle={{ color: colors.progressBar }}
        />
      </View>
    </>
  );
};