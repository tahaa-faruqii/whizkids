// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Category = ({ route }) => {
//     const { id, title, Category, content } = route.params
//     console.log(id)
//     return (
//         <View>
//             <Text style={{ backgroundColor: "#0000" }}>{Category}</Text>
//             <Text>{title}</Text>
//             <Text>{content}</Text>
//             <Text>{id}</Text>
//         </View>
//     )
// }

// export default Category

// const styles = StyleSheet.create({})



import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appearance } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/AntDesign';




const Category = ({ navigation, route }) => {
    const colorScheme = Appearance.getColorScheme();
    const { category } = route.params;
    const [count, setCount] = useState(0);
    const [data, setdata] = useState([]);
    const [inputdata, setinputdata] = useState('');
    const [storyfav, setStoryFav] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
    useEffect(() => {
        displayStory();
    }, []);
    const displayStory = async () => {
        const { id } = route.params;
        try {
            const storyRef = firestore().collection('category').doc(id).collection('stories');
            const querySnapshot = await storyRef.get();

            const storyData = [];
            querySnapshot.forEach((doc) => {
                const { content } = doc.data();
                storyData.push({ id: doc.id, content });
            });

            setdata(storyData);
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    };
    const addStory = async () => {
        const { id } = route.params; // Assuming 'id' is the parameter received from the previous screen

        if (inputdata && id) {
            try {
                const storyData = {
                    content: inputdata,
                };

                // Use the received 'id' as the document ID
                await firestore().collection('category').doc(id).collection('stories').add(storyData);

                setinputdata('');
                Alert.alert('Story added successfully.');
            } catch (error) {
                console.error('Error adding story:', error);
            }
        } else {
            Alert.alert('Write something about your story or provide a valid ID');
        }
    };

    const copyToClipboard = (content) => {
        Clipboard.setString(content);
        console.log('Copying to clipboard:', content);
    };
    const addToFavorite = (id) => {
        const data = data.find((item) => item.key === id);
        setStoryFav([...storyfav, data]);
    };

    const deleteFromFavorite = (id) => {
        const updatedFavorites = storyfav.filter((item) => item.key !== id);
        setStoryFav(updatedFavorites);
    };

    const addNewBook = (data) => {
        setBooks([data, ...books]);
    };


    return (
        <ScrollView style={[styles.main, { backgroundColor: isDarkMode ? 'black' : 'lightblue' }]}>
            <Text style={[styles.headerText, { color: isDarkMode ? 'darkblue' : 'black' }]}>{category}</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder="Enter content"
                    value={inputdata}
                    onChangeText={(text) => setinputdata(text)}
                    multiline
                    numberOfLines={20}
                    style={[styles.storyInput, { color: isDarkMode ? 'darkblue' : 'black' }]}
                />
            </View>

            <TouchableOpacity onPress={addStory} style={styles.addBtn}>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: isDarkMode ? 'darkblue' : 'black' }}>Add Story</Text>
            </TouchableOpacity>

            <FlatList
                data={data}
                horizontal={true}
                renderItem={({ item }) => (
                    <View style={styles.flaty}>
                        <Text style={{ color: isDarkMode ? 'darkblue' : 'black' }}>{Array.isArray(item.content) ? item.content.join(', ') : item.content}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(item.content)} style={styles.copyBtn}>
                            <Text>Copy</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                extraData={data}
            />
            <View style={{ justifyContent: 'center', alignItems: "center", marginTop: '50%', bottom: '5%' }}>

                {/* <TouchableOpacity onPress={addToFavorite}>
                    <Icon name='hearto' size={22} color={'black'} />
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    storyInput: {
        height: 150,
        width: 330,
        margin: 20,
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#EAFFDC',
        padding: 10,
    },
    main: {
        flex: 1,
    },
    addBtn: {

        // width: 100,
        height: 'auto',
        marginHorizontal: 120,
        backgroundColor: 'yellowgreen',
        borderRadius: 10,
        padding: 20,
        elevation: 20,
        color: 'white'
    },
    flaty: {
        backgroundColor: '#EAFFDC',
        width: 320,
        height: 'auto',
        margin: 20,
        borderColor: 'black',

        borderRadius: 10,
        padding: 10,
    },
    copyBtn: {
        alignSelf: 'flex-end', // Align the "Copy" button to the end of the view
    },
});

export default Category;