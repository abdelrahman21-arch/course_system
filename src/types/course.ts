export interface Course {
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  capacity: number;
  duration: number;
  cost: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
