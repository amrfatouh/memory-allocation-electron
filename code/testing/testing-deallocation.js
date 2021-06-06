console.log("DEALLOCATION TESTING");

// memoryAfter has already been declared
let memoryBefore, deallocatedObject;

function test(testNum, memBef, deallObj, memAft) {
  memory = memBef;
  let returnedObj = deallocate(deallObj);
  returnedObj.memory.sort((a, b) => a.start - b.start);
  memAft.sort((a, b) => a.start - b.start);
  if (JSON.stringify(returnedObj.memory) === JSON.stringify(memAft)) {
    console.log(`TEST ${testNum} SUCCEEDED`, returnedObj.memory);
  } else {
    console.log(`TEST ${testNum} FAILED`);
    console.log("retured memory", returnedObj.memory);
    console.log("correct memory", memAft);
  }
}

// TEST CASE (1)

memorySize = 100;

memoryBefore = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 10,
    size: 40,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 60,
    size: 40,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 10,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 50,
    size: 10,
  },
];

deallocatedObject = {
  processId: null,
  type: "old process",
  id: 0,
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 50,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 60,
    size: 40,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 50,
    size: 10,
  },
];

test(1, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (2)

memorySize = 100;

memoryBefore = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 50,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 60,
    size: 30,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 90,
    size: 10,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 50,
    size: 10,
  },
];

deallocatedObject = {
  processId: null,
  type: "old process",
  id: 0,
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 50,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 60,
    size: 40,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 50,
    size: 10,
  },
];

test(2, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (3)

memorySize = 100;

memoryBefore = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 30,
    size: 20,
  },
  {
    name: "hole 2",
    type: "hole",
    id: 2,
    processId: null,
    start: 60,
    size: 40,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 20,
    size: 10,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 50,
    size: 10,
  },
];

deallocatedObject = {
  processId: null,
  type: "old process",
  id: 0,
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 50,
  },
  {
    name: "hole 2",
    type: "hole",
    id: 2,
    processId: null,
    start: 60,
    size: 40,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 50,
    size: 10,
  },
];

test(3, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (4)

memorySize = 100;

memoryBefore = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 30,
    size: 70,
  },
  {
    name: "bla bla",
    type: "process",
    id: 0,
    processId: 0,
    start: 20,
    size: 10,
  },
];

deallocatedObject = {
  processId: 0,
  type: "process",
  id: null,
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 100,
  },
];

test(4, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (5)

memorySize = 100;

memoryBefore = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 30,
    size: 70,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "bla bla",
    type: "process",
    id: 0,
    processId: 0,
    start: 20,
    size: 10,
  },
];

deallocatedObject = {
  processId: 0,
  type: "process",
  id: null,
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 20,
    size: 80,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
];

test(5, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (6)

memorySize = 100;

memoryBefore = [
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 30,
    size: 70,
  },
  {
    name: "bla bla",
    type: "process",
    id: 0,
    processId: 0,
    start: 20,
    size: 10,
  },
];

deallocatedObject = {
  processId: 0,
  type: "process",
  id: null,
};

memoryAfter = [
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 30,
    size: 70,
  },
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 20,
    size: 10,
  },
];

test(6, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (7)

memorySize = 100;

memoryBefore = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 30,
    size: 20,
  },
  {
    name: "hole 2",
    type: "hole",
    id: 2,
    processId: null,
    start: 60,
    size: 40,
  },
  {
    name: "bla bla",
    type: "process",
    id: 0,
    processId: 0,
    start: 20,
    size: 10,
  },
  {
    name: "bla bla",
    type: "process",
    id: 1,
    processId: 0,
    start: 50,
    size: 10,
  },
];

deallocatedObject = {
  processId: 0,
  type: "process",
  id: null,
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 100,
  },
];

test(7, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (8)

memorySize = 100;

memoryBefore = [
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 30,
    size: 20,
  },
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 60,
    size: 40,
  },
  {
    name: "bla bla",
    type: "process",
    id: 0,
    processId: 0,
    start: 20,
    size: 10,
  },
  {
    name: "bla bla",
    type: "process",
    id: 1,
    processId: 0,
    start: 50,
    size: 10,
  },
];

deallocatedObject = {
  processId: 0,
  type: "process",
  id: null,
};

memoryAfter = [
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 30,
    size: 20,
  },
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 60,
    size: 40,
  },
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 20,
    size: 10,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 50,
    size: 10,
  },
];

test(8, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (9)

memorySize = 100;

memoryBefore = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 40,
    size: 60,
  },
  {
    name: "bla bla",
    type: "process",
    id: 0,
    processId: 0,
    start: 20,
    size: 10,
  },
  {
    name: "bla bla",
    type: "process",
    id: 1,
    processId: 0,
    start: 30,
    size: 10,
  },
];

deallocatedObject = {
  processId: 0,
  type: "process",
  id: null,
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 100,
  },
];

test(9, memoryBefore, deallocatedObject, memoryAfter);

// TEST CASE (10)

memorySize = 100;

memoryBefore = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 20,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 50,
    size: 50,
  },
  {
    name: "bla bla",
    type: "process",
    id: 0,
    processId: 0,
    start: 20,
    size: 10,
  },
  {
    name: "bla bla",
    type: "process",
    id: 1,
    processId: 0,
    start: 30,
    size: 10,
  },
  {
    name: "bla bla",
    type: "process",
    id: 2,
    processId: 0,
    start: 40,
    size: 10,
  },
];

deallocatedObject = {
  processId: 0,
  type: "process",
  id: null,
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 100,
  },
];

test(10, memoryBefore, deallocatedObject, memoryAfter);
