// Synchronous Callback
const hello = (data) => {
  return `Hello ${data}`;
};

const display = (cb) => {
  const name = process.argv[2];
  return cb(name);
};

// console.log(display(hello));
