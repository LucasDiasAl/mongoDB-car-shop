/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import chai from 'chai';
import Sinon from 'sinon';

import { Model } from 'mongoose';

import {
  motorcycleData,
  motorcycleArray,
} from './Mocks/MotorcycleMocks';

import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import IError from '../../../src/Interfaces/IError';
import CustomError from '../../../src/Utils/Error';

const { expect } = chai;

const MOCK_ID_VALID_BIKE = '643f27dfc5dcaf19007461d3';
// const MOCK_ID_VALID_BIKE2 = '876f27dfc5dDAf1900746sl3';

const ERRO_MESSAGE_NOT_FOUND = 'Motorcycle not found';
// const MOCK_INVALID_ID_CAR = '643f27ddFCCCCCC9007461';

describe('Testes da camada Service para o dominio Cars', function () {
  beforeEach(function () {
    Sinon.restore();
  });
  const motorcycleService = new MotorcycleService();

  it(
    'Deve retornar um array com todos as motos cadastrados no documentos do BD',
    async function () {
      Sinon.stub(Model, 'find').resolves(motorcycleArray);

      const serviceResult = await motorcycleService.findAllMotorcycles();
      const formatedMotorcycle = motorcycleArray
        .map((bike: unknown): Motorcycle => new Motorcycle(bike as IMotorcycle));
      expect(serviceResult).to.be.deep.equal(formatedMotorcycle);
    },
  );
  it(
    'Deve retornar um mensagem de erro ao procurar por todos as motos caso o Db esteja vazio',
    async function () {
      Sinon.stub(Model, 'find').resolves(undefined);
      try {
        await motorcycleService.findAllMotorcycles();
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

  it('Deve ser possivel cadastrar uma nova moto caso os dados estejam corretos', async function () {
    Sinon.stub(Model, 'create').resolves({ id: MOCK_ID_VALID_BIKE, ...motorcycleData });

    const serviceResult = await motorcycleService.registerMotorcycle(motorcycleData as IMotorcycle);
    const formatedMotorcycle = new Motorcycle(
      { id: MOCK_ID_VALID_BIKE, ...motorcycleData } as IMotorcycle,
    );

    expect(serviceResult).to.be.deep.equal(formatedMotorcycle);
  });

  // it('Testa achar um carro pelo seu Id', async function () {
  //   Sinon.stub(Model, 'findById').resolves(carFoundTemplate);

  //   const serviceResult = await carService.findCarById(MOCK_ID_CAR);
  //   const formatedCar = new Car(carFoundTemplate);

  //   expect(serviceResult).to.be.deep.equal(formatedCar);
  // });

  // it(
  //   'Deve retornar um erro ao procurar por um carro que o id seja valido mas nao exista',
  //   async function () {
  //     Sinon.stub(Model, 'findById').resolves(undefined);
  //     try {
  //       await carService.findCarById(MOCK_INVALID_ID_CAR);
  //     } catch (error: unknown) {
  //       const customError = error as IError;
  //       expect(error).to.be.instanceOf(CustomError);
  //       expect(customError.status).to.equal(404);
  //       expect(customError.message).to.equal(ERRO_MESSAGE_NOT_FOUND);
  //       return;
  //     }
  //     expect.fail();
  //   },
  // );

  // it('Testa se é possivel atualizar os dados de um carro atravez do id', async function () {
  //   Sinon.stub(Model, 'findByIdAndUpdate').resolves({ id: MOCK_ID_CAR, ...carTemplateToUpdate });

  //   const serviceResult = await carService.updateById(MOCK_ID_CAR, carTemplateToUpdate);
  //   const formatedCar = new Car({ id: MOCK_ID_CAR, ...carTemplateToUpdate });

  //   expect(serviceResult).to.be.deep.equal(formatedCar);
  // });

  // it(
  //   'Deve retornar um erro ao tentar atualizar um carro que nao exista',
  //   async function () {
  //     Sinon.stub(Model, 'findByIdAndUpdate').resolves(undefined);
  //     try {
  //       await carService.updateById(MOCK_INVALID_ID_CAR, carTemplateToUpdate);
  //     } catch (error: unknown) {
  //       const customError = error as IError;
  //       expect(error).to.be.instanceOf(CustomError);
  //       expect(customError.status).to.equal(404);
  //       expect(customError.message).to.equal(ERRO_MESSAGE_NOT_FOUND);
  //       return;
  //     }
  //     expect.fail();
  //   },
  // );
});
