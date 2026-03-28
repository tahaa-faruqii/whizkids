import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import CustomText from '../../Components/CustomText'
import ReusableFlatList from '../../Components/FlatlistComponent'
import stories from '../../Assets/story/Index'
import Icon from 'react-native-vector-icons/AntDesign';
import Reusable_Header from '../../Components/ReusableHeder'
import { useSelector, useDispatch } from 'react-redux';
import { switchMode, } from '../../redux/Action';
import colors from '../../Assets/colors';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Category from '../Category';
const Home = ({ props, navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [data, setData] = useState(stories);
    const [mode, setMode] = useState();
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await firestore().collection('category').get();
                const fetchedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error here (e.g., show an error message)
            }
        };

        fetchData(); // Fetch data when the component mounts
    }, []);
    // console.log(theme)
    const handleThemeChange = () => {
        // Toggle the theme mode and dispatch the action.
        const newMode = theme.mode === 'light' ? 'dark' : 'light';
        dispatch(switchMode(newMode));
        setMode(newMode)
        setIsEnabled(previouseState => !previouseState)

    };

    const filterData = (data) => {
        const uniqueItems = new Set();
        const filteredData = [];

        for (const item of data) {
            if (!uniqueItems.has(item.category)) {
                uniqueItems.add(item.category);
                filteredData.push(item);
            }
        }
        return filteredData;
    };

    // Assuming 'data' is an array of objects representing stories

    // Filter the data to get unique items based on category
    const filteredData = filterData(data);

    // Access Firestore collection reference
    const collectionRef = firestore().collection('category');

    // Loop through each filtered item and add it to Firestore
    filteredData.forEach((item) => {
        // Provide a specific document ID or use a generated one
        const documentId = item.category; // Assuming 'id' represents a unique identifier for each story

        // Use the document ID to set the entire item as the document data
        collectionRef.doc(documentId).set(item)
            .then(() => {
                console.log(`Data for '${item.title}' stored successfully in Firestore.`);
            })
            .catch((error) => {
                console.error('Error storing data:', error);
            });
    });
    // const storydata = firestore.collection('category').get()
    // setData(storydata)
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Category', { id: item.category })}>

                <View style={{ flex: 1 }}>
                    <View style={styles.itemContainer1}>
                        {/* <Image source={item.image} style={styles.image} /> */}
                        <Image source={item.imagesource} style={styles.image} />
                        {/* <Text style={textStyle}>{item.category}</Text> */}
                        <CustomText children={item.category} variant={'simple'} color={textStyle} />

                    </View>

                </View>
            </TouchableOpacity>

        );
    };
    const containerStyle = theme.mode === 'light' ? colors.container_light : colors.container_dark;
    const textStyle = theme.mode === 'light' ? colors.light.white : colors.dark.white;

    return (
        <View style={containerStyle}>
            <View style={{}}>
                <Reusable_Header
                    backgroundColor={containerStyle}
                    color={textStyle}
                    iconcolor={textStyle}
                    onLeftPress={() => navigation.goBack()}
                    title={'Category'}
                    // trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#17b2ce' : 'red'}
                    value={isEnabled}
                    onValueChange={() => handleThemeChange()}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, }}>


                    <ReusableFlatList
                        data={filteredData}
                        renderItem={renderItem}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: '50%' }}
                        // scrollEnabled={true}
                        keyExtractor={(item) => item.id}
                    />

                </View>
            </View>
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        // color: 'white',
        // marginBottom: 5,
        textAlign: 'center',
        color: '#000',
        padding: 5,
        borderRadius: 5,
    },
    image: {
        width: 150,
        height: 120,
        borderRadius: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderColor: '#17b2ce',


    },
    itemContainer1: {
        // backgroundColor: 'gray',
        // flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        // marginTop: 10
    },


});
