import { useState } from 'react';
import { showToast } from '@/components/General/Toast';
import { updateUserProfile } from '@/services/updateUser';
import { ProfileData } from '@/types/types.userState';

type FieldErrors = {
  name?: string;
  address?: string;
  phoneno?: string;
};

const PHONE_LENGTH = 10;

export const useEditProfile = (
  u_id: string | null | undefined,
  current: ProfileData,
  onSaved: (update: ProfileData) => void
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const open = () => {
    setName(current.name ?? '');
    setAddress(current.address ?? '');
    setPhoneno(current.phoneno ?? '');
    setErrors({});
    setIsVisible(true);
  };

  const close = () => {
    if (isSubmitting) return;
    setIsVisible(false);
  };

  const setPhonenoDigitsOnly = (value: string) => {
    setPhoneno(value.replace(/[^0-9]/g, ''));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!address.trim()) next.address = 'Address is required';
    if (!phoneno.trim()) next.phoneno = 'Phone number is required';
    else if (phoneno.length !== PHONE_LENGTH) next.phoneno = `Phone number must be ${PHONE_LENGTH} digits`;
    return next;
  };

  const submit = async () => {
    if (!u_id) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await updateUserProfile(u_id, name.trim(), address.trim(), phoneno);
      onSaved({ name: name.trim(), address: address.trim(), phoneno });
      setIsVisible(false);
    } catch (error) {
      console.error('[useEditProfile] error updating profile', error);
      const message = error instanceof Error ? error.message : 'Failed to update profile. Please try again.';
      showToast(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isVisible,
    open,
    close,
    name,
    setName,
    address,
    setAddress,
    phoneno,
    setPhoneno: setPhonenoDigitsOnly,
    errors,
    isSubmitting,
    submit,
  };
};