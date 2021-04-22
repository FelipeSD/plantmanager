import React, { useState } from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput, 
    View, 
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserIdentification(){
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const handleSubmit = async function(){
        if(!name){
            return Alert.alert("Me diz como chamar você ");
        }
        try{
            await AsyncStorage.setItem("@plantmanager:user", name); // padrão @nomeapp:variavel
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        }catch(e){
            Alert.alert("Não foi possível salvar o seu nome. :/");
        }
    }

    const handleInputBlur = function(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    const handleInputFocus = function(){
        setIsFocused(true);
    }
    const handleInputChange = function(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '😄' : '😃'}
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {"\n"}
                                    chamar você?
                                </Text>
                            </View>

                            <TextInput 
                                placeholder={"Digite o nome"}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {borderColor: colors.green}
                                ]} />

                            <View style={styles.footer}>
                                <Button  
                                    title="Confirmar"
                                    onPress={handleSubmit} 
                                />
                            </View>
                        </View>
                    </View>
                    
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: "100%",
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 54,
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: "center"
    },
    title: {
        fontSize: 32,
        lineHeight: 32,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    header: {
        alignItems: 'center',
    },
    footer: {
        width: "100%",
        marginTop: 40,
        paddingHorizontal: 20,
    }
})