import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import styles from '../ProfileComponents/style';





interface ProfileComponentsProps {
    avatar: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    onUpdate: () => void;
    setName: (value: string) => void;
    setPhone: (value: string) => void;
    setAddress: (value: string) => void;
    setCity: (value: string) => void;
}


const ProfileComponents: React.FC<ProfileComponentsProps> = ({
    avatar,
    name,
    email,
    phone,
    address,
    city,
    onUpdate,
    setName,
    setPhone,
    setAddress,
    setCity,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.placeholderAvatar} />
                )}
                <Button title="Thay Đổi Ảnh" onPress={onUpdate} />
            </View>

            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={[styles.input, { backgroundColor: '#f0f0f0', color: '#888' }]}
                value={email}
                editable={false}
            />

            <Text style={styles.label}>Phone:</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
            />

            <Text style={styles.label}>Address:</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />

            <Text style={styles.label}>City:</Text>
            <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
            />
            <View style={styles.updateButton}>

                <Button title="Cập Nhật" onPress={onUpdate} />
            </View>
        </View>
    );
};
export default ProfileComponents