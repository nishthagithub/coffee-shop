import React, { useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { TextInput, TextInputProps, } from 'react-native-paper'


interface customInputProps extends TextInputProps{
    hidePassword?:boolean,
    customStyle?:StyleProp<ViewStyle>
}

const CustomInput:
React.FC<customInputProps> = ({
    label,
    onChangeText,
    hidePassword=false,
    value,
    customStyle,
    ...props

}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!hidePassword);
    const [isFocused,setIsFocused] =useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev:any) => !prev);
  };
  return (
    <View style={customStyle}>
      <TextInput
       mode='flat'
       secureTextEntry={!isPasswordVisible && hidePassword}
       underlineColor={isFocused?"transparent":"grey"}
        activeUnderlineColor={isFocused?"#80A896":"grey"}
        dense={true}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        right={
          hidePassword ? (
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          ) : null
        }
          style={[styles.input, props.style]}
        {...props}

      />
    </View>
  )
}

export default CustomInput
const styles = StyleSheet.create({
  input: {
    // textAlign: 'left',
    // paddingHorizontal: 0, 
  },
});

