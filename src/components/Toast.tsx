import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Text } from 'react-native';

type ToastHandle = { show: (text: string, visibleTime?: number) => void };

export const toastRef = React.createRef<ToastHandle>();

export function showToast(text: string, visibleTime = 1500) {
  toastRef.current?.show(text, visibleTime);
}

const Toast = forwardRef<ToastHandle>((_, ref) => {
  const [toastText, setToastText] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const autoHideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useImperativeHandle(ref, () => ({
    show: (text, visibleTime = 1500) => {
      if (autoHideTimeout.current) clearTimeout(autoHideTimeout.current);

      setToastText(text);

      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();

      autoHideTimeout.current = setTimeout(() => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true })
          .start(() => setToastText(null));
      }, visibleTime);
    },
  }));

  if (!toastText) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={{ opacity: fadeAnim }}
      className="absolute bottom-20 self-center bg-black/85 px-4 py-2.5 rounded-lg z-50"
    >
      <Text className="text-white text-sm">{toastText}</Text>
    </Animated.View>
  );
});

export default Toast;