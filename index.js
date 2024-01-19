const app = require("./app");
const env = require("./configs/env");
const { authentication } = require("./databases/");

app.listen(env.SERVER.PORT, async () => {
  try {
    await authentication();
    console.log("SERVER RUN AT: ", env.SERVER.PORT);
  } catch (error) {
    console.log(error);
  }
});
