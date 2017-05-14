import {Course} from './course';
export class Product{
	id: number;
  name: string;
  description: string;
  image: string;
  amount: number;
  rate: number;
  price: number;
  enrolledCourse:Course[];
}
