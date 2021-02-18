import React, { useState } from 'react'
import { View } from '@tarojs/components'

const FormCreate = Cop => props => {

  const [hookState, setHookState] = useState({});

  const onInputHandler = (e, filed) => {
    const { value } = e.detail;
    setHookState({
      ...hookState,
      [filed]: value
    })
  }
  
  const getFieldDecorator = (filed, options) => {
    return InputCop => {
      return React.cloneElement(InputCop, {
        name: filed,
        value: hookState[filed] || '',
        onInput: (e) => onInputHandler(e, filed)
      })
    }
  }

  const getFieldValues = () => {
    const state = {...hookState};
    return state;
  }

  return (
    <View style={{border: '1px solid red;'}}>
      <Cop getFieldDecorator={getFieldDecorator} getFieldValues={getFieldValues} />
    </View>
  )
}

export default FormCreate;