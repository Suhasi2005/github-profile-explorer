import { useEffect, useState } from 'react';
import {
  ActivityIndicator, FlatList, Image, Linking, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { getUser, getUserRepos } from '../api';
import { colors, radius, spacing } from '../theme';

export default function ProfileScreen({ route, navigation }) {
  const { username } = route.params;
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: username });
    setLoading(true);
    setError(null);
    Promise.all([getUser(username), getUserRepos(username)])
      .then(([userData, repoData]) => {
        setUser(userData);
        setRepos(repoData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <ActivityIndicator style={styles.status} color={colors.accent} />;
  if (error) return <Text style={[styles.status, styles.error]}>{error}</Text>;
  if (!user) return null;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ padding: spacing.md }}
      data={repos}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={
        <View style={styles.profile}>
          <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          <Text style={styles.name}>{user.name || user.login}</Text>
          <Text style={styles.login}>@{user.login}</Text>
          {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.public_repos}</Text>
              <Text style={styles.statLabel}>Repos</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <Pressable onPress={() => Linking.openURL(user.html_url)}>
            <Text style={styles.link}>View on GitHub ↗</Text>
          </Pressable>

          <Text style={styles.sectionTitle}>Repositories (by stars)</Text>
        </View>
      }
      ListEmptyComponent={<Text style={styles.status}>No public repositories.</Text>}
      renderItem={({ item }) => (
        <Pressable style={styles.repoCard} onPress={() => navigation.navigate('RepoDetail', { repo: item })}>
          <Text style={styles.repoName} numberOfLines={1}>{item.name}</Text>
          {item.description && (
            <Text style={styles.repoDescription} numberOfLines={2}>{item.description}</Text>
          )}
          <View style={styles.repoMeta}>
            {item.language && <Text style={styles.repoLanguage}>{item.language}</Text>}
            <Text style={styles.repoStars}>★ {item.stargazers_count}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  status: { textAlign: 'center', color: colors.muted, marginTop: spacing.xl },
  error: { color: colors.danger },
  profile: { alignItems: 'center', marginBottom: spacing.lg },
  avatar: { width: 88, height: 88, borderRadius: 44, marginBottom: spacing.sm, borderWidth: 2, borderColor: colors.border },
  name: { color: colors.text, fontSize: 20, fontWeight: '700' },
  login: { color: colors.muted, marginBottom: spacing.xs },
  bio: { color: colors.text, textAlign: 'center', marginBottom: spacing.sm, paddingHorizontal: spacing.lg },
  statsRow: { flexDirection: 'row', gap: spacing.lg, marginVertical: spacing.sm },
  stat: { alignItems: 'center' },
  statValue: { color: colors.text, fontWeight: '700', fontSize: 16 },
  statLabel: { color: colors.muted, fontSize: 12 },
  link: { color: colors.accent, marginTop: spacing.xs, marginBottom: spacing.md },
  sectionTitle: {
    alignSelf: 'flex-start', color: colors.muted, fontSize: 12, textTransform: 'uppercase',
    marginTop: spacing.md, marginBottom: spacing.xs,
  },
  repoCard: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius, padding: spacing.md, marginBottom: spacing.sm,
  },
  repoName: { color: colors.accent, fontWeight: '700', marginBottom: 2 },
  repoDescription: { color: colors.text, fontSize: 13, marginBottom: spacing.xs },
  repoMeta: { flexDirection: 'row', gap: spacing.md },
  repoLanguage: { color: colors.muted, fontSize: 12 },
  repoStars: { color: colors.muted, fontSize: 12 },
});
