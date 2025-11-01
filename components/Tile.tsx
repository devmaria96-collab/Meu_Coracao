import { Link } from 'expo-router';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  href: string;
  label: string;
  icon?: ReactNode;
};

export default function Tile({ href, label, icon }: Props) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        style={{
          backgroundColor: '#1f1a20',
          borderRadius: 16,
          paddingVertical: 18,
          paddingHorizontal: 16,
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 10,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 3,
          marginBottom: 12,
        }}
      >
        <View style={{
          width: 40, height: 40, borderRadius: 10, backgroundColor: '#ff4b6e33',
          alignItems: 'center', justifyContent: 'center'
        }}>
          {icon}
        </View>
        <Text style={{ color: '#f6f6f6', fontSize: 16, fontWeight: '600' }}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}
