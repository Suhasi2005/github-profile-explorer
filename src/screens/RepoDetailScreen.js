import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

export default function RepoDetailScreen({ route }) {
  const { repo } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={styles.name}>{repo.name}</Text>
      {repo.description && <Text style={styles.description}>{repo.description}</Text>}

      <View style={styles.statsRow}>
        <Stat label="Stars" value={repo.stargazers_count} />
        <Stat label="Forks" value={repo.forks_count} />
        <Stat label="Open Issues" value={repo.open_issues_count} />
      </View>

      {repo.language && (
        <View style={styles.row}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>{repo.language}</Text>
        </View>
      )}
      {repo.license?.name && (
        <View style={styles.row}>
          <Text style={styles.label}>License</Text>
          <Text style={styles.value}>{repo.license.name}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.label}>Default branch</Text>
        <Text style={styles.value}>{repo.default_branch}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Last updated</Text>
        <Text style={styles.value}>{new Date(repo.updated_at).toLocaleDateString()}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => Linking.openURL(repo.html_url)}>
        <Text style={styles.buttonText}>Open on GitHub ↗</Text>
      </Pressable>
    </ScrollView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  name: { color: colors.text, fontSize: 22, fontWeight: '700' },
  description: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.md },
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius, paddingVertical: spacing.md, marginBottom: spacing.md,
  },
  stat: { alignItems: 'center' },
  statValue: { color: colors.text, fontWeight: '700', fontSize: 18 },
  statLabel: { color: colors.muted, fontSize: 12 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  label: { color: colors.muted },
  value: { color: colors.text, fontWeight: '600' },
  button: {
    backgroundColor: colors.accentDark, borderRadius: radius,
    paddingVertical: spacing.sm, alignItems: 'center', marginTop: spacing.lg,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
