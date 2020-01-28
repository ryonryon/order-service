import request from "supertest";

import { server } from "../../src/index";

function inventoryTest() {
  describe("Read all inventory items", () => {
    test("#1", () => {
      request(server)
        .get("/inventories")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
}

export default inventoryTest;
