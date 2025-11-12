import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { getToken } from '../lib/auth';

/**
 * AnalysisList: consulta `/my/analyses/summary` y muestra filename + fecha.
 * Al pulsar navega a /Individual?filename=... 
 */
export default function AnalysisList({ apiUrl }: { apiUrl?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Array<{ processed_at: string | null, filename: string }>>([]);

  useEffect(() => {
    let mounted = true;
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const base = apiUrl || process.env.EXPO_PUBLIC_URL_BACK;
        if (!base) throw new Error('EXPO_PUBLIC_URL_BACK no configurada');
        const url = `${base}/my/analyses/summary?skip=0&limit=100`;
        const options: any = { method: 'GET' };

        // try token for mobile, otherwise rely on cookies (web)
        const token = await getToken().catch(() => null);
        if (token) options.headers = { Authorization: `Bearer ${token}` };
        else options.credentials = 'include';

        const res = await fetch(url, options);
        if (!res.ok) throw new Error('Error fetching summary');
        const data = await res.json();
        if (mounted) setItems(data || []);
      } catch (err) {
        console.warn('AnalysisList fetch error', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchSummary();
    return () => { mounted = false; };
  }, [apiUrl]);

  if (loading) return <ActivityIndicator color={Colors.primary} style={{ margin: 12 }} />;

  if (!items.length) return <Text style={{ color: Colors.darkGray, padding: 12 }}>No hay análisis recientes.</Text>;

  return (
    <FlatList
      data={items}
      // Use a stable unique key. The summary endpoint may return duplicate filenames
      // so include the index as a fallback to guarantee uniqueness.
      keyExtractor={(_item, index) => `${_item.filename ?? 'item'}-${_item.processed_at ?? 'null'}-${index}`}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={localStyles.row}
          onPress={() => router.push(`/Individual?filename=${encodeURIComponent(item.filename)}`)}
        >
          <View>
            <Text style={localStyles.filename}>{item.filename}</Text>
            <Text style={localStyles.date}>{item.processed_at ? new Date(item.processed_at).toLocaleString() : 'Pendiente'}</Text>
          </View>
          <Text style={localStyles.open}>Ver</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const localStyles = StyleSheet.create({
  row: {
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 6,
    marginHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  filename: { fontWeight: '700', color: '#222' },
  date: { fontSize: 12, color: Colors.darkGray },
  open: { color: Colors.primary, fontWeight: '700' },
});
