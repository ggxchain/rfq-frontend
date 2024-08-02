import fetchedAttestations from "./fetchedAttestations";

describe("fetchedAttestations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when data is fetched successfully", () => {
    let mockedData: Object;

    beforeEach(() => {
      mockedData = {
        attestations: [
          {
            __typename: 'Attestation',
            attester: '0x357458739F90461b99789350868CD7CF330Dd7EE',
            expirationTime: 0,
            revocationTime: 0
          }
        ]
      };

    });

    describe("the loading property", () => {
      it("should initially return true and then false", async () => {
        const result = await fetchedAttestations("0xFf04D614aea951223c0d3e4b5b1812531cE4941d");
        expect(result.data).toEqual(mockedData);
      });
    });
  });

});