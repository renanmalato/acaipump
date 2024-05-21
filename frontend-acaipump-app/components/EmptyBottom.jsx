import { View, Text } from 'react-native'
import React from 'react'
import styles from '../constants/styles'
import { EmptyBottomSVG } from '../assets/images/SVG/SvgIndex'

const EmptyBottom = () => {
  return (
    
    <>
    <View style={styles.emptyBottomView}>
    <EmptyBottomSVG style={styles.emptyBottom}/>
    <Text style={styles.emptyBottomText}>Potência natural.</Text>
    </View>
    </>
  )
}

export default EmptyBottom