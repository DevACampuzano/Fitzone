interface CardClassProps {
  onPress: (id: number) => void;
  id: number;
  image: string;
  name: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  time: string;
  duration: number;
  spots: number;
  price: number;
  maxSpots: number;
}
