import { StyleProp, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { TextInput,TextInputProps, } from 'react-native-paper'


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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev:any) => !prev);
  };
  return (
    <View style={{
        width:300,
        height:50,
    }}>
      <TextInput
       mode='flat'
       secureTextEntry={!isPasswordVisible && hidePassword}
       underlineColor="grey"
        activeUnderlineColor="grey"
        right={
          hidePassword ? (
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          ) : null
        }
        style={{
            backgroundColor: 'transparent',
          }}
        {...props}

      />
    </View>
  )
}

export default CustomInput

