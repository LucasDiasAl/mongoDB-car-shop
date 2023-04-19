const CARRO_MAIS_RAPIDO = 'Uno com escada';

export const arrayOfCars = [
  {
    id: '643f27d2c5dcaf19007461d1',
    model: 'savero',
    year: 2005,
    color: 'Yellow',
    buyValue: 45.000,
    doorsQty: 2,
    seatsQty: 3,
    status: true,
  },
  {
    id: '643f27dfc5dcaf19007461d3',
    model: CARRO_MAIS_RAPIDO,
    year: 2005,
    color: 'white',
    buyValue: 30.000,
    doorsQty: 4,
    seatsQty: 5,
    status: true,
  },
];

export const carTemplateToAdd = {
  model: CARRO_MAIS_RAPIDO,
  year: 2007,
  color: 'Yellow',
  buyValue: 30.000,
  doorsQty: 4,
  seatsQty: 5,
  status: true,
};

export const carFoundTemplate = {
  id: '643f27dfc5dcaf19007461d3',
  model: CARRO_MAIS_RAPIDO,
  year: 2017,
  color: 'black',
  buyValue: 100.000,
  doorsQty: 4,
  seatsQty: 5,
  status: false,
};

export const carTemplateToUpdate = {
  model: 'savero',
  year: 2023,
  color: 'Brown',
  buyValue: 48.999,
  doorsQty: 4,
  seatsQty: 5,
  status: true,
};
