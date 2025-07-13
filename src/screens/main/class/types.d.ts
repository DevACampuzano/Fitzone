interface IClass {
  id: string;
  name: string;
  time: string;
  duration: number;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  spots: number;
  maxSpots: number;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
}
