interface ClassDetail {
  id: number;
  name: string;
  description: string;
  time: string;
  date: string;
  duration: number;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  spots: number;
  maxSpots: number;
  price: number;
  image: string;
  location: string;
  equipment: string[];
  benefits: string[];
  requirements: string[];
}
