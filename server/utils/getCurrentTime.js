const getCurrentTime = (req) => {
  if (process.env.TEST_MODE === "1") {
    const fakeTime = req.headers["x-test-now-ms"];
    if (fakeTime) {
      return new Date(Number(fakeTime));
    }
  }
  return new Date();
};

export default getCurrentTime;
