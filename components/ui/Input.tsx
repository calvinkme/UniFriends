import { useState } from "react";
import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { Colors } from "@/constants";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: TextInput["props"]["keyboardType"];
  autoCapitalize?: TextInput["props"]["autoCapitalize"];
  maxLength?: number;
  error?: string;
  onBlur?: () => void;
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.onSurface.variant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    color: Colors.onSurface.DEFAULT,
  },
  inputFocused: {
    backgroundColor: Colors.surface.containerLowest,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary.DEFAULT,
  },
  inputUnfocused: {
    backgroundColor: Colors.surface.containerHigh,
  },
  inputError: {
    backgroundColor: Colors.surface.containerLowest,
    borderBottomWidth: 2,
    borderBottomColor: "#C4474B",
  },
  errorText: {
    fontSize: 12,
    color: "#C4474B",
    marginTop: 6,
  },
});

export function Input({
  value,
  onChangeText,
  placeholder,
  label,
  multiline = false,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize,
  maxLength,
  error,
  onBlur: onBlurProp,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ position: "relative" }}>
        <TextInput
          value={value || ""}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.outline.DEFAULT}
          multiline={multiline}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => { setIsFocused(false); onBlurProp?.(); }}
          style={[
            styles.input,
            error
              ? styles.inputError
              : isFocused
                ? styles.inputFocused
                : styles.inputUnfocused,
            { fontFamily: "WorkSans_400Regular" },
            secureTextEntry ? { paddingRight: 52 } : undefined,
          ]}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            hitSlop={8}
            style={{
              position: "absolute",
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              width: 32,
            }}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={Colors.onSurface.variant} />
            ) : (
              <Eye size={20} color={Colors.onSurface.variant} />
            )}
          </Pressable>
        )}
      </View>
      {error ? (
        <Text style={[styles.errorText, { fontFamily: "WorkSans_400Regular" }]}>{error}</Text>
      ) : null}
    </View>
  );
}
