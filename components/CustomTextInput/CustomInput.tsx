import React, { useState } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TextInput, TextInputProps, } from 'react-native-paper'


interface customInputProps extends TextInputProps{
    hidePassword?:boolean,
    customStyle?:StyleProp<ViewStyle>,
    errorMessage?: string
}

const CustomInput:
React.FC<customInputProps> = ({
    label,
    onChangeText,
    hidePassword=false,
    value,
    customStyle,
    errorMessage,
    ...props
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused,setIsFocused] =useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev:any) => !prev);
  };
  return (
    <View style={customStyle}>
      <TextInput
       mode='flat'
       secureTextEntry={hidePassword && !isPasswordVisible }
       underlineColor="#E2E2E2"
       
        activeUnderlineColor={isFocused?"#80A896":"#E2E2E2"}
        dense={true}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={onChangeText}
        value={value}
        label={label}
        error={!!errorMessage}
        right={
          hidePassword ? (
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          ) : null
        }
          style={[props.style]}
        {...props}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  )
}

export default CustomInput
const styles = StyleSheet.create({
 error:{
  color: "red", fontSize: 12, marginTop: 4
 }
});

