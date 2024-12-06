import { View, Text } from 'react-native'
import React from 'react'
import TextTitle5Bold from './TextTitle5Bold'
import TextTitle5 from './TextTitle5'

interface Props {
    title: string
    value: string
}

const TextInformation: React.FC<Props> = ({ title, value }) => {
    return (
        <View className='flex-row mt-2'>
            <View className='mr-1'>
                <TextTitle5Bold label={`${title}:`} />
            </View>
            <TextTitle5
                label={value}
                containerStyle={{ flexShrink: 1 }}
            />
        </View>
    )
}


export default TextInformation