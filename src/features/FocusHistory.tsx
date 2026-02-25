import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { font, space } from '../utils/sizes';


type focusHistoryProps = {
  history: string[];
}

export const FocusHistory = ({ history }: focusHistoryProps) => {
  if (!history || !history.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: font.xxxl, marginBottom: space.md }}>🧘</Text>
        <Text style={{ fontSize: font.lg, fontWeight: 'bold', color: colors.white }}>Nothing focused on yet.</Text>
        <Text style={{ fontSize: font.md, color: colors.textMuted, marginTop: space.sm }}>Add a subject above to get started!</Text>
      </View>
  );
}

  const renderItem = ({ item }: { item: string }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.mediumBlue,
        borderRadius: space.sm,
        padding: space.md,
        marginBottom: space.sm,
      }}>
      <Text
        style={{
          color: colors.accentGreen,
          fontSize: font.md,
          fontWeight: 'bold',
          marginRight: space.md,
          width: space.lg,
          textAlign: 'center'
        }}>
        •
      </Text>
      <Text style={{ flex: 1, fontSize: font.md, color: colors.white }}>{item}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: space.md }}>
      <Text
        style={{
          fontSize: font.md + 2,
          fontWeight: 'bold',
          color: colors.white,
          paddingBottom: space.md
        }}>
        ✅ Completed Focus Sessions :
      </Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item} + ${index}`}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
