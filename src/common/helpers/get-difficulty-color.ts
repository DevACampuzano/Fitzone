export const getDifficultyColor = (
  diff: 'Principiante' | 'Intermedio' | 'Avanzado',
) => {
  switch (diff) {
    case 'Principiante':
      return '#96CEB4';
    case 'Intermedio':
      return '#FECA57';
    case 'Avanzado':
      return '#FF6B6B';
    default:
      return '#999';
  }
};
