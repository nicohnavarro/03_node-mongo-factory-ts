import request from "supertest";
import { application, Shutdown } from "../../src/server";

const HEADER = "access-control-allow-methods";
const METHODS = "PUT, POST, PATCH, DELETE, GET";

describe("Our Application", () => {
  afterAll((done) => {
    Shutdown(done);
  });

  it("Start and has the proper test enviroment", async () => {
    expect(process.env.NODE_ENV).toBe("test");
    expect(application).toBeDefined();
  }, 10000);

  it("Returns all options allowed to be called by customers (http methods)", async () => {
    const response = await request(application).options("/");
    expect(response.status).toBe(204);
    expect(response.headers[HEADER]).toBe(METHODS);
  }, 10000);
});
