import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../theme/colors';

interface ScrollPickerProps {
    items: (string | number)[];
    selectedValue: string | number;
    onValueChange: (value: string | number) => void;
    height?: number;
    itemHeight?: number;
}

export default function ScrollPicker({
    items,
    selectedValue,
    onValueChange,
    height = 150,
    itemHeight = 50,
}: ScrollPickerProps) {
    const flatListRef = useRef<FlatList>(null);

    // Calculate padding to center the first and last items
    const paddingVertical = (height - itemHeight) / 2;

    // Scroll to initial value on mount
    useEffect(() => {
        const index = items.indexOf(selectedValue);
        if (index !== -1 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    index,
                    animated: false,
                    viewPosition: 0.5
                });
            }, 100);
        }
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / itemHeight);

        if (index >= 0 && index < items.length) {
            // Optional: Update value while scrolling (can differ from snap)
            // onValueChange(items[index]);
        }
    };

    const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / itemHeight);
        if (index >= 0 && index < items.length) {
            onValueChange(items[index]);
        }
    };

    return (
        <View style={[styles.container, { height }]}>
            <View style={[styles.selectionOverlay, { height: itemHeight, top: paddingVertical }]} />
            <FlatList
                ref={flatListRef}
                data={items}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => {
                    const isSelected = item === selectedValue;
                    return (
                        <View style={[styles.item, { height: itemHeight }]}>
                            <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                                {item}
                            </Text>
                        </View>
                    );
                }}
                getItemLayout={(_, index) => ({
                    length: itemHeight,
                    offset: itemHeight * index,
                    index,
                })}
                snapToInterval={itemHeight}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: paddingVertical,
                }}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                initialNumToRender={20}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.dark.surface,
        borderRadius: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    selectionOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: Colors.dark.surfaceHighlight,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.dark.primary,
        zIndex: -1,
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: Colors.dark.textDim,
        fontSize: 16,
        fontFamily: 'Courier',
    },
    itemTextSelected: {
        color: Colors.dark.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
});
