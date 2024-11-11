import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Button, Alert } from 'react-native';
import * as UserService from '../../services/UserService';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'native-base';

const ProfileScreen = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const [city, setCity] = useState('');

    const getTokenAndID = async () => {
        const token = await AsyncStorage.getItem('access_token');
        const id = await AsyncStorage.getItem('userId');
        setAccessToken(token);
        setUserId(id);
    };

    const fetchUserDetails = async () => {
        if (userId && accessToken) {
            const res = await UserService.getDetailUser(userId, accessToken);
            setEmail(res.data.email);
            setName(res.data.name);
            setPhone(res.data.phone); // Kiểm tra giá trị của phone
            setAddress(res.data.address);
            setAvatar(res.data.avatar);
            setCity(res.data.city);

        }
    };

    useEffect(() => {
        getTokenAndID();
    }, []);

    useEffect(() => {
        fetchUserDetails();
    }, [userId, accessToken]);

    const handleUpdate = async () => {
        await UserService.updateUser(userId, {
            name,
            phone,
            address,
            avatar,
            city,
        }, accessToken);
        Toast.show({ type: 'success', text1: 'Cập nhật thành công!' });

    };

    const handleOnChangeAvatar = () => {
        Alert.alert(
            "Thay Đổi Ảnh",
            "Chọn cách thay đổi ảnh của bạn:",
            [
                {
                    text: "Thêm Ảnh từ Thư Viện",
                    onPress: handleLaunchImageLibrary
                },
                {
                    text: "Chụp Ảnh",
                    onPress: handleLaunchCamera
                },
                {
                    text: "Hủy",
                    style: "cancel"
                }
            ]
        );
    };

    const handleLaunchCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Xin vui lòng cấp quyền truy cập camera!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setAvatar(result.assets[0].uri);
        }
    };

    const handleLaunchImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Xin vui lòng cấp quyền truy cập thư viện ảnh!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <ScrollView className="flex-1 p-4 bg-gray-100">
            <View className="items-center mb-4">
                {avatar ? (
                    <Image source={{ uri: avatar }} className="w-20 h-20 rounded-full mb-2" />
                ) : (
                    <View className="w-24 h-24 rounded-full bg-gray-300 mb-2" />
                )}
                <Button title="Thay Đổi" onPress={handleOnChangeAvatar} />
            </View>

            <Text className="text-lg font-semibold mb-2">Name:</Text>
            <TextInput className="border border-gray-300 p-2 rounded mb-4" value={name} onChangeText={setName} />

            <Text className="text-lg font-semibold mb-2">Email:</Text>
            <TextInput
                className="border border-gray-300 p-2 rounded mb-4 bg-gray-200 text-gray-600"
                value={email}
                editable={false}
            />
            <Text className="text-lg font-semibold mb-2">Phone:</Text>
            <TextInput
                className="border border-gray-300 p-2 rounded mb-4"
                value={phone}
                onChangeText={setPhone}
            />

            <Text className="text-lg font-semibold mb-2">Address:</Text>
            <TextInput className="border border-gray-300 p-2 rounded mb-4" value={address} onChangeText={setAddress} />

            <Text className="text-lg font-semibold mb-2">City:</Text>
            <TextInput className="border border-gray-300 p-2 rounded mb-4" value={city} onChangeText={setCity} />

            <TouchableOpacity className="bg-red-500 p-3 rounded items-center mb-5" onPress={handleUpdate}>
                <Text className="text-white text-lg font-semibold">Update Profile</Text>
            </TouchableOpacity>
            <Toast />
        </ScrollView>
    );
};

export default ProfileScreen;
