import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthInput from '../../components/AuthInput';
import GradientButton from '../../components/GradientButton';
import { colors, spacing } from '../../theme/colors';
import { AuthStackParamList } from '../../types/navigation';
import { signupUser } from '../../services/authService';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [storeName, setStoreName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleCreateAccount() {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please re-enter your password.');
      return;
    }
    if (!agreedToTerms) {
      Alert.alert('Terms required', 'Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);
    const result = await signupUser({ storeName, fullName, email, phone, password });
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', result.message);
      // TODO: navigate to main app / dashboard once real auth is wired in
    } else {
      Alert.alert('Signup failed', result.message);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.illustrationPlaceholder}>
        <Icon name="monitor" size={64} color={colors.gradientStart} />
      </View>

      <View style={styles.headingBlock}>
        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>Start managing your store in a smarter way</Text>
      </View>

      <View style={styles.form}>
        <AuthInput icon="shopping-bag" placeholder="Store / Business Name" value={storeName} onChangeText={setStoreName} />
        <AuthInput icon="user" placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <AuthInput icon="mail" placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AuthInput icon="phone" placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <AuthInput icon="lock" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <AuthInput icon="lock" placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

        <TouchableOpacity style={styles.termsRow} onPress={() => setAgreedToTerms(!agreedToTerms)}>
          <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
            {agreedToTerms && <Icon name="check" size={14} color={colors.white} />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <GradientButton label="Create Account" onPress={handleCreateAccount} loading={loading} />

        <View style={styles.signinRow}>
          <Text style={styles.subheading}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Sign in</Text>
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  backButton: {
    marginTop: 50,
    marginBottom: spacing.md,
  },
  illustrationPlaceholder: {
    height: 160,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  headingBlock: {
    marginBottom: spacing.lg,
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
  },
  form: {},
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.gradientStart,
    borderColor: colors.gradientStart,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  linkText: {
    color: colors.link,
    fontWeight: '600',
  },
  signinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});