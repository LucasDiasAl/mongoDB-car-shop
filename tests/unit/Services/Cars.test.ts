/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import chai from 'chai';
import Sinon from 'sinon';

import { Model } from 'mongoose';

import {
  arrayOfCars,
  carTemplateToAdd,
  carFoundTemplate,
  carTemplateToUpdate,
} from './Mocks/CarMocks';

import CarService from '../../../src/Services/CarsService';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CustomError from '../../../src/Utils/Error';
import IError from '../../../src/Interfaces/IError';

const { expect } = chai;

const MOCK_ID_CAR = '643f27dfc5dcaf19007461d3';
const ERRO_MESSAGE_NOT_FOUND = 'Car not found';
const MOCK_INVALID_ID_CAR = '643f27ddFCCCCCC9007461';

describe('Testes da camada Service para o dominio Cars', function () {
  beforeEach(function () {
    Sinon.restore();
  });
  const carService = new CarService();

  it(
    'Deve retornar um array com todos os carros cadastrados no documentos do BD',
    async function () {
      Sinon.stub(Model, 'find').resolves(arrayOfCars);

      const serviceResult = await carService.findAllCars();
      const formatedCars = arrayOfCars.map((car: ICar): Car => new Car(car));
      expect(serviceResult).to.be.deep.equal(formatedCars);
    },
  );

  it(
    'Deve retornar um mensagem de erro ao procurar por todos os carros caso o Db esteja vazio',
    async function () {
      Sinon.stub(Model, 'find').resolves(undefined);
      try {
        await carService.findAllCars();
      } catch (error: unknown) {
        const customError = error as IError;
        expect(error).to.be.instanceOf(CustomError);
        expect(customError.status).to.equal(404);
        expect(customError.message).to.equal(ERRO_MESSAGE_NOT_FOUND);
        return;
      }
      expect.fail();
    },
  );

  it('Deve ser possivel cadastrar um novo carro caso os dados estejam corretos', async function () {
    Sinon.stub(Model, 'create').resolves({ id: MOCK_ID_CAR, ...carTemplateToAdd });

    const serviceResult = await carService.registerCar(carTemplateToAdd);
    const formatedCar = new Car({ id: MOCK_ID_CAR, ...carTemplateToAdd });

    expect(serviceResult).to.be.deep.equal(formatedCar);
  });

  it('Testa achar um carro pelo seu Id', async function () {
    Sinon.stub(Model, 'findById').resolves(carFoundTemplate);

    const serviceResult = await carService.findCarById(MOCK_ID_CAR);
    const formatedCar = new Car(carFoundTemplate);

    expect(serviceResult).to.be.deep.equal(formatedCar);
  });

  it(
    'Deve retornar um erro ao procurar por um carro que o id seja valido mas nao exista',
    async function () {
      Sinon.stub(Model, 'findById').resolves(undefined);
      try {
        await carService.findCarById(MOCK_INVALID_ID_CAR);
      } catch (error: unknown) {
        const customError = error as IError;
        expect(error).to.be.instanceOf(CustomError);
        expect(customError.status).to.equal(404);
        expect(customError.message).to.equal(ERRO_MESSAGE_NOT_FOUND);
        return;
      }
      expect.fail();
    },
  );

  it('Testa se é possivel atualizar os dados de um carro atravez do id', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves({ id: MOCK_ID_CAR, ...carTemplateToUpdate });

    const serviceResult = await carService.updateById(MOCK_ID_CAR, carTemplateToUpdate);
    const formatedCar = new Car({ id: MOCK_ID_CAR, ...carTemplateToUpdate });

    expect(serviceResult).to.be.deep.equal(formatedCar);
  });

  it(
    'Deve retornar um erro ao tentar atualizar um carro que nao exista',
    async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(undefined);
      try {
        await carService.updateById(MOCK_INVALID_ID_CAR, carTemplateToUpdate);
      } catch (error: unknown) {
        const customError = error as IError;
        expect(error).to.be.instanceOf(CustomError);
        expect(customError.status).to.equal(404);
        expect(customError.message).to.equal(ERRO_MESSAGE_NOT_FOUND);
        return;
      }
      expect.fail();
    },
  );
});
