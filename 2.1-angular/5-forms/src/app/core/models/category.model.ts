interface BaseCategory {
  name: string;
  image: string;
}

export interface Category extends BaseCategory {
  id: number;
}

export interface CreatableCategory extends BaseCategory {}

export interface UpdatableCategory extends Partial<BaseCategory> {}
