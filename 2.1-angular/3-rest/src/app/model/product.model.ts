export interface Category {
  id: number;
  name: string;
}

interface BaseProduct {
  title: string;
  price: number;
  images: string[];
  description: string;
}

export interface Product extends BaseProduct {
  id: string;
  category: Category;
}

export interface CreatableProduct extends BaseProduct {
  categoryId: number;
}

export interface UpdatableProduct extends Partial<BaseProduct> {
  categoryId?: number;
}
