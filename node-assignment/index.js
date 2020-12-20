const convertCallbackToPromise = () => {
  return new Promise((resolve, reject) => {
    resolve(setTimeout(() => {
      console.log('I waited here for 5 seconds');
    }, 5000));
    reject("Error happens");
  });
};

convertCallbackToPromise();

const convertCallbackToAsynAwait = async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log('I waited here for 5 seconds');
}

convertCallbackToAsynAwait();




