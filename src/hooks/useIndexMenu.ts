import { useEffect, useState } from 'react';
import { fetchCategories, fetchMenu, Category, MenuItem } from '@/services/indexMenu';
import { ToastAndroid } from 'react-native';

export const useIndexMenu = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [filterOptions, setFilterOptions] = useState<Category[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then(setFilterOptions)
      .catch(() => ToastAndroid.show('Failed to load categories', ToastAndroid.SHORT));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchMenu(selectedId)
      .then(setFilteredMenu)
      .catch(() => ToastAndroid.show('Failed to load menu', ToastAndroid.SHORT))
      .finally(() => setLoading(false));
  }, [selectedId]);

  return { selectedId, setSelectedId, filterOptions, filteredMenu, loading };
};