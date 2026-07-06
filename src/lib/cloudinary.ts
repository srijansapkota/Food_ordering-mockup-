const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUD_NAME) {
  throw new Error(
    'Missing EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME. Set it in your .env file and restart the dev server (npx expo start -c).'
  );
}


export const getMenuImageUrl = (publicId: string): string => {
  if (!publicId) {
    throw new Error('getMenuImageUrl called with an empty publicId');
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
};