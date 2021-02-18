import React, { Component } from 'react'
import { View, Input, Button } from '@tarojs/components'
import FormCreate from './formCreate'

const Index = ({getFieldDecorator, getFieldValues}) => {

  const onConfirmHandler = () => {
    const values = getFieldValues();
    console.log(values, '--')
  }
  
  return (
    <View style={{padding: '10px;'}}>
      {
        getFieldDecorator('name', {})(
          <Input placeholder="place input ur name" />
        )
      }
      
      <Button onClick={onConfirmHandler}>confirm</Button>
    </View>
  )
}

export default FormCreate(Index);