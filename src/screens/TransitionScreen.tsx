import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'

const TransitionScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  )
}

export default TransitionScreen

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
})