import { Test, TestingModule } from '@nestjs/testing';
import { Question } from '../../model/question';
import { Unit } from '../../model/unit';
import { UnitService } from './unit.service';
import { questionStub, unitStub } from './__mocks__/unit.stub';

jest.mock('./unit.service')

describe('UnitService', () => {
  let service: UnitService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitService]
    }).compile()

    service = module.get<UnitService>(UnitService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAll', () => {
    describe('when getAll is called', () => {
      let unit: Unit[]

      beforeEach(async () => {
        unit = await service.getAll()
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
        unit = await service.getAllUser(unitStub().id)
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
        question = await service.getEvaluation(unitStub().id)
      })

      test('then it should return questions array', () => {
        expect(question).toEqual([questionStub()])
      })
    })
  })
})
