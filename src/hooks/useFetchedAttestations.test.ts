import { renderHook, waitFor } from "@testing-library/react";
import useFetchedAttestations from "./useFetchedAttestations";

describe("useFetchedAttestations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the initial values for `data`, error and loading", async () => {
    const { result } = renderHook(() => useFetchedAttestations("0xFf04D614aea951223c0d3e4b5b1812531cE4941d"));
    const { data, error, loading } = result.current;

    // this being not wrapped in a waitFor causes the act errors in the console.
    expect(data).toBe(undefined);
    expect(error).toBe(undefined);
    expect(loading).toBe(true);
  });

  describe("when data is fetched successfully", () => {
    let mockedData: Object;

    beforeEach(() => {
      mockedData = [
        {
          body: "mocked body",
          id: 1,
          title: "mock title",
          userId: 1,
        },
      ];

    });

    describe("the loading property", () => {
      it("should initially return true and then false", async () => {
        const { result } = renderHook(() => useFetchedAttestations("0xFf04D614aea951223c0d3e4b5b1812531cE4941d"));
        const { loading } = result.current;
        expect(loading).toBe(true);
        await waitFor(() => {
          const { error, loading }= result.current;

          expect(error).toBe(undefined);
          expect(loading).toBe(false);
        },
        {timeout: 30000});
      });
    });
  });

});