/* eslint-disable react-hooks/exhaustive-deps */
import { useQueries } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { categoryActions, classActions } from '../../../actions';
import { ToastContext } from '../../../common/store';
import { useErrorsToken } from '../../../common/helpers';
const categories = [
  {
    id: 0,
    name: 'Todas',
  },
];
export const useClass = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { showToast } = useContext(ToastContext);
  const { validateError } = useErrorsToken();

  const [
    { error: errorCategories, data: dataCategories },
    {
      data: dataClasses,
      error: errorClasses,
      isLoading: isLoadingClasses,
      refetch: refetchClasses,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: ({ signal }) => categoryActions.getAllCategories(signal),
        // staleTime: 1000 * 60 * 60,
        select: (data: any) => data.data,
        initialData: {
          status: true,
          data: categories,
        },
      },
      {
        queryKey: ['classes'],
        queryFn: ({ signal }) =>
          classActions.getClasses(undefined, undefined, signal),
        // staleTime: 1000 * 60 * 60,
        select: (data: any) => data.data,
        initialData: {
          status: true,
          data: [],
        },
      },
    ],
  });

  const allCategories = [
    ...categories,
    ...dataCategories.filter(
      (cat: any) => !categories.some(existing => existing.id === cat.id),
    ),
  ];

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
    Array.isArray(dataClasses) &&
    dataClasses.length > 0
  ) {
    filteredClasses = dataClasses.filter((item: IClass) => {
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
    categories: allCategories,
    refetchClasses,
    isLoadingClasses,
  };
};
