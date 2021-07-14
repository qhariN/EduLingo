import { logStub } from "./progress.stub";

export const ProgressService = jest.fn().mockReturnValue({
    setProgress: jest.fn().mockResolvedValue(logStub())
})