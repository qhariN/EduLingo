import { Test, TestingModule } from '@nestjs/testing';
import { Session } from '../../model/session';
import { SessionService } from './session.service';
import { sessionStub } from './__mocks__/session.stub';

jest.mock('./session.service')

describe('SessionService', () => {
  let service: SessionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionService]
    }).compile()

    service = module.get<SessionService>(SessionService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getPractice', () => {
    describe('when getPractice is called', () => {
      let session: Session

      beforeEach(async () => {
        session = await service.getPractice(sessionStub().id)
      })

      test('then it should return a practice', () => {
        expect(session).toEqual(sessionStub())
      })
    })
  })
})
