export const logger = async (data) => {
  if (process.env.ISLOG === "true") {
    console.log(`\n${data}`);
  }
};
