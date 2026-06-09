import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full ${className}`}>
      {label && (
        <Text className="text-sm font-medium text-zinc-700 mb-1.5 ml-1">
          {label}
        </Text>
      )}
      
      <View
        className={`flex-row items-center bg-white border rounded-2xl px-4 py-3 ${
          error
            ? 'border-red-500 bg-red-50/30'
            : isFocused
            ? 'border-woohl-orange shadow-sm shadow-woohl-orange/10'
            : 'border-zinc-200'
        }`}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        
        <TextInput
          className="flex-1 text-base text-zinc-900"
          placeholderTextColor="#a1a1aa" // zinc-400
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          {...props}
        />
        
        {rightIcon && <View className="ml-3">{rightIcon}</View>}
      </View>

      {error && (
        <Text className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
}
