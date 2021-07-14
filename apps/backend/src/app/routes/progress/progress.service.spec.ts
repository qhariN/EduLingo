import { Test, TestingModule } from '@nestjs/testing';
import { ProgressService } from './progress.service';
import { logStub, progressStub } from './__mocks__/progress.stub';

jest.mock('./progress.service')

describe('ProgressService', () => {
  let service: ProgressService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressService]
    }).compile()

    service = module.get<ProgressService>(ProgressService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('setProgress', () => {
    describe('when setProgress is called', () => {
      let save: any

      beforeEach(async () => {
        save = await service.setProgress(progressStub(), progressStub().id)
      })

      test('then it should return a log', () => {
        expect(save).toEqual(logStub())
      })
    })
  })
})
