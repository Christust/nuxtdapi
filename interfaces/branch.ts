export interface Branch {
  id: number;
  country: Country;
  state: State;
  city: City;
  name: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface State {
  id: number;
  country: string;
  name: string;
}

export interface City {
  id: number;
  state: string;
  name: string;
}
