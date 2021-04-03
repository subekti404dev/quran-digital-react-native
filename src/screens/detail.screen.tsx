import React from 'react';
import { SafeAreaView, Text } from 'react-native';

interface DetailScreenProps {
    navigation: any
}

const DetailScreen = (props: DetailScreenProps) => {
    return (
        <SafeAreaView>
            <Text>DetailScreen</Text>
        </SafeAreaView>
    )
}

export default DetailScreen