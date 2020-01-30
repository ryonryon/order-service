function readInventoriesTest() {
  describe("Read all inventory items", () => {
    test("#1", async () => {
      expect.assertions(2);
      const res = await request(app).get("/inventories");
      expect(res.status).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });
}

export default readInventoriesTest;
