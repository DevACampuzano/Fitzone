interface CardClassProps {
  onPress: (id: string | number) => void;
  id: string | number;
  image: string;
  name: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  time: string;
  duration: number;
  spots: number;
  price: number;
  maxSpots: number;
}
