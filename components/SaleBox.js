import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import ModalOptions from "./ModalOptions"
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { SimpleLineIcons } from '@expo/vector-icons'
import { deleteSaleAction } from "../actions/salesActions"
import { useDispatch } from "react-redux"
import * as colors from "./Colors"


const SaleBox = (prop) => {


    const dispatch = useDispatch()
    const { id, customerId, customerName, productsArr, year, day, month, navigation } = prop
    const date = new Date(year, month, day).toLocaleDateString()
    const [modalVisible, setModalVisible] = useState(false)

    return <GroupItem onPress={() => navigation.navigate('Details', { id: customerId })}>
        {/* <LinearGradient
                colors={['#9484DE', '#49036C']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    flex: 1,

                }}  > */}
        <ModalOptions
            visible={modalVisible}
            visibilityToggler={() => setModalVisible(!modalVisible)}
            onPressEdit={() => {
                navigation.navigate("Add", { id: id })
                setModalVisible(false)
            }}
            onPressDelete={() => {
                dispatch(deleteSaleAction(id))
                setModalVisible(!modalVisible)
            }}
            onPressCall={false}
            onPressMessage={false}
        />
        <DataRowDiv>

            <View style={{ flex: 1 }}>
                <FullName>{customerName}</FullName>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                <DateText>reg : {date}</DateText>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <SimpleLineIcons name="options-vertical" size={20} color="black" />
                </TouchableOpacity>
            </View>

        </DataRowDiv>


        <View style={{ flex: 1 }}>

            {productsArr.map(item => {
                return <RowDiv key={item.name}>
                    <RowLeftView>
                        <BoldText>{item.name}</BoldText>
                    </RowLeftView>
                    <RowRightView>
                        <BoldText>{item.quantity}</BoldText>
                    </RowRightView>
                </RowDiv>
            })}
        </View>

        {/* </LinearGradient> */}
    </GroupItem >

}

export default SaleBox

//styles ____________________________________________________________
const RowLeftView = styled.View`
flex:1
${'' /* border-left-width:2px */}
border-color: gray
${'' /* width: 150px */}
padding: 0px 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowRightView = styled.View`
flex:1
${'' /* border-right-width:2px */}
border-left-width:2px
border-color: black
${'' /* width: 150px */}
padding: 0px 5px
flex-direction: row
justify-content: flex-start
align-items: center
`

const DataRowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: space-between
align-items: center

`

const BoldText = styled.Text`
font-size : 14px
color: ${colors.secondaryTextColor}
font-weight: bold,
margin-left : 3px
margin-right: 15px
`

const RowDiv = styled.View`
width: 100%
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
${'' /* border-width:2px
border-color: black */}

`

const DateText = styled.Text`
font-size : 16px
line-height : 30px
marginRight: 15px
color: ${colors.mainTextColor}
`



const ProductText = styled.Text`
 background: #49036C
 color :  #fff
 border-radius: 25px
 font-weight: 600
 font-size : 18px
 text-align: center
 line-height : 30px
 shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const FullName = styled.Text`
font-weight: bold
font-size : 24px
color : ${colors.mainTextColor}
`


const GroupItem = styled.TouchableOpacity`
margin: 5px 10px
 padding: 3px 10px
border-radius: 25px
margin-bottom: 4px
border-bottom-width: 2px
border-color: black
   align-items: flex-start

  `

const UserImg = styled.Image`
margin-right: 20px
margin-left: 10px
  border-radius: 50px
  height: 40px
  width: 40px
 `

