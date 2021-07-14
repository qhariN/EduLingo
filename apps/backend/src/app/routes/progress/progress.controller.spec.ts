import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { logStub, progressStub } from './__mocks__/progress.stub';

jest.mock('./progress.service')

describe('ProgressController', () => {
  let controller: ProgressController
  let service: ProgressService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
      providers: [ProgressService]
    }).compile()

    controller = module.get<ProgressController>(ProgressController)
    service = module.get<ProgressService>(ProgressService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('setProgress', () => {
    describe('when setProgress is called', () => {
      let save: any

      beforeEach(async () => {
        save = await controller.setProgress(progressStub(), { user: progressStub().id })
      })

      test('then it should call progressService', () => {
        expect(service.setProgress).toBeCalledWith(progressStub(), progressStub().id)
      })

      test('then it should return a log', () => {
        expect(save).toEqual(logStub())
      })
    })
  })
})
