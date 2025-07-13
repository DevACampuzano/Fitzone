/* eslint-disable react-hooks/exhaustive-deps */
import { useQueries } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { categoryActions, classActions } from '../../../actions';
import { ToastContext } from '../../../common/store';
import { useErrorsToken } from '../../../common/helpers';

export const useClass = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { showToast } = useContext(ToastContext);
  const { validateError } = useErrorsToken();
  const categories = [
    {
      id: 0,
      name: 'Todas',
    },
  ];
  const [
    {
      error: errorCategories,
      data: dataCategories,
      isLoading: isLoadingCategories,
    },
    { data: dataClasses, error: errorClasses, isLoading: isLoadingClasses },
  ] = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: ({ signal }) => categoryActions.getAllCategories(signal),
        initialData: categories,
      },
      {
        queryKey: ['classes'],
        queryFn: ({ signal }) =>
          classActions.getClasses(undefined, undefined, signal),
      },
    ],
  });

  const listCategories = dataCategories?.data ?? [];

  if (!isLoadingCategories && listCategories.length > 0) {
    categories.push(...listCategories);
  }

  useEffect(() => {
    if (errorCategories) {
      const msg = validateError(errorCategories.message);
      showToast(msg, 'warning-sharp');
    }
    if (errorClasses) {
      const msg = validateError(errorClasses.message);
      showToast(msg, 'warning-sharp');
    }
  }, [errorCategories, errorClasses]);

  let filteredClasses = [];
  if (
    !isLoadingClasses &&
    dataClasses &&
    Array.isArray(dataClasses.data) &&
    dataClasses.data.length > 0
  ) {
    filteredClasses = dataClasses.data.filter((item: IClass) => {
      const matchesCategory =
        selectedCategory === 0 || item.category.id === selectedCategory;
      const matchesSearchText =
        searchText === '' ||
        item.name.toLowerCase().includes(searchText.toLowerCase());
      return matchesCategory && matchesSearchText;
    });
  }

  return {
    filteredClasses,
    selectedCategory,
    setSelectedCategory,
    searchText,
    setSearchText,
    categories,
  };
};
