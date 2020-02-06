import app from "./index";

app.set("port", 3000);
app.listen(app.get("port"), () => console.log("I'm listening on port: 3000"));
