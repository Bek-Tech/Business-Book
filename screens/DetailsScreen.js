import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Text, View, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Ionicons, Foundation } from '@expo/vector-icons'
import CustomerInfo from "../components/CustomerInfo"
import AddContainer from "../components/AddContainer"
import { ScrollView } from 'react-native-gesture-handler';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


const DetailsScreen = ({ navigation, salesHistory, customers }) => {


    const customerId = navigation.getParam('id')
    const purchaseData = salesHistory.filter(item => item.customerId === customerId)
    const customer = customers.filter(item => item.id === customerId)



    return (

        <AddContainer
            BackButton={() => navigation.goBack()}
            title="Customer Details"
            fullCover={true}
        >



            <CustomerInfo style={{ height: 300 }} navigation={navigation} {...customer[0]} detailsScreen={true} />
            <HistoryDiv>
                <Text>Purchase History</Text>
                <RowDiv>
                    <RowLeftView>
                        <Foundation name="clipboard-notes" size={24} color="#000" />
                        <LabelText>Product Name </LabelText>
                    </RowLeftView>
                    <RowRightView>
                        <Ionicons name="ios-calculator" size={24} color="#000" />
                        <LabelText>Quantity </LabelText>
                    </RowRightView>
                </RowDiv>
                <FlatList
                    data={purchaseData}
                    style={{ flex: 1 }}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => {
                        return <DataView>
                            <Text>{new Date(item.year, item.month, item.day).toDateString()}</Text>

                            {item.productsArr.length === 0 ?
                                <Text>no purchases</Text> :
                                item.productsArr.map(item => {
                                    return <RowDiv key={item.name}>
                                        <RowLeftView>
                                            <BoldText>{item.name}</BoldText>
                                        </RowLeftView>
                                        <RowRightView>
                                            <BoldText> {item.quantity}</BoldText>
                                        </RowRightView>
                                    </RowDiv>

                                })}
                        </DataView>
                    }}
                />


            </HistoryDiv>

        </AddContainer>

    )
}

const mapCustomersSalesHistoryToProps = state => {
    return {
        salesHistory: state.salesHistory.sales,
        customers: state.customers
    }
}
export default connect(mapCustomersSalesHistoryToProps)(DetailsScreen)


// styles ___________________________________

const DataView = styled.View`
    justify-content: center
     align-items: center
  
`

const HistoryDiv = styled.View`
flex:1
align-Items: flex-start
padding: 25px 
margin: 5px 0px
background : white
border-radius : 25px
shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const LabelText = styled.Text`
font-size: 16px
margin-left: 10px
`
const BoldText = styled.Text`
font-size : 16px
font-weight: bold,
margin-left : 3px
`

const RowLeftView = styled.View`

${'' /* border-left-width:2px */}
border-color: gray
flex: 1
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowRightView = styled.View`
${'' /* border-right-width:2px */}
border-left-width:2px
border-color: gray
flex: 1
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowDiv = styled.View`
width : 100%
${'' /* border-width : 2px
border-color: black */}
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-evenly
align-items: center

`



const GrayText = styled.Text`
 color : #8b979f
 margin-bottom: 5px
`