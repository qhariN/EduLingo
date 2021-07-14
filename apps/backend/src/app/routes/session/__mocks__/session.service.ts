import { sessionStub } from "./session.stub";

export const SessionService = jest.fn().mockReturnValue({
    getPractice: jest.fn().mockResolvedValue(sessionStub())
})