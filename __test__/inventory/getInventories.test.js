import request from "supertest";
import app from "../../src/index";

function getInventoriesTest() {
  describe("Get all inventory items", () => {
    test("response's status is 200 & content type of header is application/json", async () => {
      expect.assertions(2);
      const res = await request(app).get("/inventories");

      expect(res.status).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });
}

export default getInventoriesTest;
