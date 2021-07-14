import { Test, TestingModule } from '@nestjs/testing';
import { Session } from '../../model/session';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { sessionStub } from './__mocks__/session.stub';

jest.mock('./session.service')

describe('SessionController', () => {
  let controller: SessionController
  let service: SessionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [SessionService]
    }).compile()

    controller = module.get<SessionController>(SessionController)
    service = module.get<SessionService>(SessionService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getPractice', () => {
    describe('when getPractice is called', () => {
      let session: Session

      beforeEach(async () => {
        session = await controller.getPractice({ id: sessionStub().id })
      })

      test('then it should call sessionService', () => {
        expect(service.getPractice).toBeCalledWith(sessionStub().id)
      })

      test('then it should return a practice', () => {
        expect(session).toEqual(sessionStub())
      })
    })
  })
})
