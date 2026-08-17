import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import GoogleLogo from '../../components/GoogleLogo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthInput from '../../components/AuthInput';
import GradientButton from '../../components/GradientButton';
import { colors, spacing } from '../../theme/colors';
import { AuthStackParamList } from '../../types/navigation';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSignIn() {
    setLoading(true);
    const result = await loginUser({ emailOrPhone, password });
    setLoading(false);

    if (result.success) {
      login();
    } else {
      Alert.alert('Login failed', result.message);
    }
  }

  async function handleGoogleSignIn() {
    Alert.alert('Google Sign-In', 'Coming soon — setup pending.');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
          locations={[0, 0.6, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
        <View style={styles.logoCircle}>
          <Icon name="shopping-bag" size={40} color={colors.white} />
        </View>
        <Text style={styles.appName}>SHOPFX</Text>
        <Text style={styles.tagline}>Smarter Retail. Smarter Business.</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.heading}>Welcome back! 👋</Text>
        <Text style={styles.subheading}>Sign in to continue to your account</Text>

        <AuthInput
          icon="mail"
          placeholder="Email or Phone"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="email-address"
        />
        <AuthInput
          icon="lock"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotLink}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>

        <GradientButton label="Sign In" onPress={handleSignIn} loading={loading} />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn} activeOpacity={0.8}>
        <GoogleLogo size={18} />          
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.xs,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subheading: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
googleButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 52,
  borderRadius: 26,
  borderWidth: 1,
  borderColor: colors.inputBorder,
  backgroundColor: colors.white,
  gap: spacing.sm,
},
googleButtonText: {
  fontSize: 15,
  fontWeight: '600',
  color: colors.textPrimary,
},
  signupText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  linkText: {
    color: colors.link,
    fontWeight: '600',
    fontSize: 14,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.inputBorder,
  },
  dividerText: {
    marginHorizontal: spacing.sm,
    fontSize: 11,
    color: colors.textSecondary,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});