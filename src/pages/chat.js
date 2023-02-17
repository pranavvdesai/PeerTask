import React from 'react';
import { Chat, ITheme } from '@pushprotocol/uiweb';

export default function MyChat() {
    const theme = {
        bgColorPrimary: 'gray',
        bgColorSecondary: 'purple',
        textColorPrimary: 'white',
        textColorSecondary: 'green',
        btnColorPrimary: 'red',
        btnColorSecondary: 'purple',
        border: '1px solid black',
        borderRadius: '40px',
        moduleColor: 'pink',
    };
    return (
        <Chat
            account='0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d'
            supportAddress="0xcd3B766CCDd6AE721141F452C550Ca635964ce71"
            apiKey="tAWEnggQ9Z.UaDBNjrvlJZx3giBTIQDcT8bKQo1O1518uF1Tea7rPwfzXv2ouV5rX9ViwgJUrXm"
            env='staging'
            theme={theme}
        />
    );
};