import { questionStub, unitStub } from "./unit.stub";

export const UnitService = jest.fn().mockReturnValue({
    getAll: jest.fn().mockResolvedValue([unitStub()]),
    getAllUser: jest.fn().mockResolvedValue([unitStub()]),
    getEvaluation: jest.fn().mockResolvedValue([questionStub()])
})