import { useState } from 'react';

const data: IClass[] = [
  {
    id: '1',
    name: 'CrossFit Matutino',
    time: '07:00 AM',
    duration: 60,
    difficulty: 'Intermedio',
    spots: 5,
    maxSpots: 15,
    price: 25000,
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    category: 'CrossFit',
  },
  {
    id: '2',
    name: 'Yoga Relajante',
    time: '06:30 PM',
    duration: 75,
    difficulty: 'Principiante',
    spots: 8,
    maxSpots: 12,
    price: 20000,
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    category: 'Yoga',
  },
  {
    id: '3',
    name: 'Spinning Intensivo',
    time: '05:30 PM',
    duration: 45,
    difficulty: 'Avanzado',
    spots: 2,
    maxSpots: 20,
    price: 22000,
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    category: 'Spinning',
  },
];

export const useClass = () => {
  const [classes, _] = useState<IClass[]>(data);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || classItem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    filteredClasses,
    selectedCategory,
    setSelectedCategory,
    searchText,
    setSearchText,
  };
};
