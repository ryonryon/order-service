import request from "supertest";
import app from "../../src/index";

function createInventryText() {
  describe("Create inventory item", () => {
    test("#1", async () => {
      expect.assertions(2);
      const res = await request(app)
        .post("/inventories")
        .send({
          name: "inventory 999",
          description: "inventory 999 desc",
          price: 999,
          quantity_available: 12
        });

      expect(res.status).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });
}

export default createInventryText;
