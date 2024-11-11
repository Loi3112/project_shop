import { Tabs } from 'expo-router';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: 'white' }, // Màu nền của tab
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="home"
                            size={24}
                            color={focused ? 'blue' : 'black'} // Đổi màu khi tab được chọn
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="category"
                options={{
                    title: 'Category',
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="appstore-o"
                            size={24}
                            color={focused ? 'blue' : 'black'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="listorder"
                options={{
                    title: 'List Order',
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="bars"  // Sử dụng biểu tượng tìm kiếm khác nhau
                            size={24}
                            color={focused ? 'blue' : 'black'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'Setting',
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="setting"
                            size={24}
                            color={focused ? 'blue' : 'black'}
                        />
                    ),
                }}
            />


        </Tabs>
    );
}
