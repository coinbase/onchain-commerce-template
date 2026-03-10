import type { Product } from 'src/types';
import airpodsImage from '../images/airpods.png';
import bottleImage from '../images/bottle.png';
import jacketImage from '../images/jacket.png';
import mugImage from '../images/mug.png';

export const products: Product[] = [
  {
    id: 'product1',
    name: `'BUILDER' JACKET`,
    price: 0.04,
    image: jacketImage,
  },
  {
    id: 'product2',
    name: `'DND, I'M BUILDING' AIRPODS`,
    price: 0.01,
    image: airpodsImage,
  },
  {
    id: 'product3',
    name: `'CAFFEINATED TO BUILD' MUG`,
    price: 0.02,
    image: mugImage,
  },
  {
    id: 'product4',
    name: `'HYDRATED TO BUILD' BOTTLE`,
    price: 0.01,
    image: bottleImage,
  },
];
