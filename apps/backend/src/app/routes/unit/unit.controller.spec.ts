import { Test, TestingModule } from '@nestjs/testing';
import { Question } from '../../model/question';
import { Unit } from '../../model/unit';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { questionStub, unitStub } from './__mocks__/unit.stub';

jest.mock('./unit.service')

describe('UnitController', () => {
  let controller: UnitController
  let service: UnitService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitController],
      providers: [UnitService]
    }).compile()

    controller = module.get<UnitController>(UnitController)
    service = module.get<UnitService>(UnitService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getAll', () => {
    describe('when getAll is called', () => {
      let unit: Unit[]

      beforeEach(async () => {
        unit = await controller.getAll()
      })

      test('then it should call unitService', () => {
        expect(service.getAll).toBeCalledWith()
      })

      test('then it should return units array', () => {
        expect(unit).toEqual([unitStub()])
      })
    })
  })

  describe('getAllUser', () => {
    describe('when getAllUser is called', () => {
      let unit: Unit[]

      beforeEach(async () => {
        unit = await controller.getAllUser({ user: unitStub().id })
      })

      test('then it should call unitService', () => {
        expect(service.getAllUser).toBeCalledWith(unitStub().id)
      })

      test('then it should return units array', () => {
        expect(unit).toEqual([unitStub()])
      })
    })
  })

  describe('getEvaluation', () => {
    describe('when getEvaluation is called', () => {
      let question: Question[]

      beforeEach(async () => {
        question = await controller.getEvaluation({ id: unitStub().id })
      })

      test('then it should call unitService', () => {
        expect(service.getEvaluation).toBeCalledWith(unitStub().id)
      })

      test('then it should return questions array', () => {
        expect(question).toEqual([questionStub()])
      })
    })
  })
})
