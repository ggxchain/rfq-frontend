import { createRequest } from "./ceramic";

describe("createRequest", () => {

  describe("the loading property", () => {
    it("should initially return true and then false", async () => {
      const result = await createRequest(1, 
        "0x31111111aaafB3972B05630fCceE866eC69CdADd9baC2771",
        "0xaaafB3972B05630fCceE866eC69CdADd9baC2771",
        2,
        3,
        "xxxx",
      );
      //expect(result).toBeDefined();
    });
  });

});