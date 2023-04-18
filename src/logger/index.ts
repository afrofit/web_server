export const logger = async (string, data?) => {
  if (process.env.ISLOG === "true") {
    if (string && data) {
      console.log("\n", string, data);
    }
    console.log("\n", string);
  }
};
