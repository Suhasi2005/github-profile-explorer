import { useState } from 'react';
import {
  ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { useSearchHistory } from '../context/SearchHistoryContext';
import { colors, radius, spacing } from '../theme';

export default function SearchScreen({ navigation }) {
  const { history, addSearch, clearHistory } = useSearchHistory();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  async function search(value) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setLoading(true);
    await addSearch(trimmed);
    setLoading(false);
    navigation.navigate('Profile', { username: trimmed });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitHub Profile Explorer</Text>
      <Text style={styles.subtitle}>Search any GitHub username</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="e.g. torvalds"
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={() => search(username)}
          returnKeyType="search"
        />
        <Pressable style={styles.button} onPress={() => search(username)} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Search</Text>}
        </Pressable>
      </View>

      {history.length > 0 && (
        <>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recent</Text>
            <Pressable onPress={clearHistory}>
              <Text style={styles.clearLink}>Clear</Text>
            </Pressable>
          </View>
          <FlatList
            data={history}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable style={styles.historyItem} onPress={() => search(item)}>
                <Text style={styles.historyText}>{item}</Text>
              </Pressable>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, marginTop: spacing.lg },
  subtitle: { color: colors.muted, marginBottom: spacing.lg },
  searchRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  input: {
    flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius,
    padding: spacing.sm, color: colors.text, backgroundColor: colors.surface,
  },
  button: {
    backgroundColor: colors.accentDark, borderRadius: radius,
    paddingHorizontal: spacing.md, justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  historyTitle: { color: colors.muted, fontWeight: '600', fontSize: 12, textTransform: 'uppercase' },
  clearLink: { color: colors.accent, fontSize: 12 },
  historyItem: {
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius, marginBottom: spacing.xs,
    borderWidth: 1, borderColor: colors.border,
  },
  historyText: { color: colors.text },
});
