import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface SkeletonCardProps {
  height?: number;
  borderRadius?: number;
  marginBottom?: number;
}

export const SkeletonCard = ({ height = 80, borderRadius = 12, marginBottom = 10 }: SkeletonCardProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          height,
          borderRadius,
          marginBottom,
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E5E7EB',
    width: '100%',
  },
});

export default SkeletonCard;
