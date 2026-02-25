import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { space, font } from '../utils/sizes';
import { colors } from '../utils/colors';


type FocusProps = {
  addSubject: (subject: string) => void;
};

export const Focus = ({ addSubject }: FocusProps ) => {
  const [subject, setSubject] = useState<string>('');

  const handleAdd = () => {
    if (subject.trim().length > 0) {
      addSubject(subject.trim());
      setSubject('');
    }
  };

  return (
    <View style={{ paddingTop: space.xxl, paddingBottom: space.xxxl }}>
      <Text
        style={{
          color: colors.white,
          fontSize: font.lg,
          fontWeight: 'bold',
          marginBottom: space.lg
        }}>
        🎯 What would you like to focus on?
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, marginRight: space.md, fontSize: font.md }}
          value={subject}
          onChangeText={setSubject}
          // label="What would you like to focus on?"
          // placeholder='e.g. Learn Python'
          placeholder='What would you like to focus on?'
          placeholderTextColor={colors.textMuted}
          mode='outlined'
          outlineColor={colors.lightBlue}
          activeOutlineColor={colors.progressBar}
          textColor={colors.white}
          theme={{
            colors: {
              background: colors.mediumBlue,
            },
          }}
        />
        
        <View style={{ justifyContent: 'center' }}>
          <RoundedButton
          title="✚"
          size={50}
          onPress={handleAdd}
          style={{ borderColor: colors.accentGreen }}
          textStyle={{ color: colors.accentGreen }}
        />
        </View>
      </View>
    </View>
  );
};
