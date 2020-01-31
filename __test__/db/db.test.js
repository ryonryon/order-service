import inventoryQueriesTest from "./inventoryQueries.test";
import utilsTest from "./utils.test";

function dbTest() {
  inventoryQueriesTest();
  utilsTest();
}

export default dbTest;
