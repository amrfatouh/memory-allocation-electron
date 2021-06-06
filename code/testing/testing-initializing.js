console.log("INITIALIZATION TESTING");

let newMemory, memoryAfter;

function testInitializing(testNum, newMem, memAft) {
  let myReturned = makeNewMemory(newMem);
  memAft.sort((a, b) => a.start - b.start);
  myReturned.memory.sort((a, b) => a.start - b.start);
  if (JSON.stringify(myReturned.memory) === JSON.stringify(memAft)) {
    console.log(`TEST ${testNum} SUCCEEDED`, myReturned.memory);
  } else {
    console.log(`TEST ${testNum} FAILED`);
    console.log("retured memory", myReturned.memory);
    console.log("correct memory", memAft);
  }
}

// TEST CASE (1)
memory = [];
newMemory = {
  size: 100,
  holes: [{ start: 0, size: 10 }],
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 0,
    size: 10,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 10,
    size: 90,
  },
];

testInitializing(1, newMemory, memoryAfter);

// TEST CASE (2)
memory = [];
newMemory = {
  size: 100,
  holes: [{ start: 90, size: 10 }],
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 90,
    size: 10,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 90,
  },
];

testInitializing(2, newMemory, memoryAfter);

// TEST CASE (3)
memory = [];
newMemory = {
  size: 100,
  holes: [{ start: 40, size: 10 }],
};

memoryAfter = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 40,
    size: 10,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 40,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 50,
    size: 50,
  },
];

testInitializing(3, newMemory, memoryAfter);

// TEST CASE (4)
memory = [];
newMemory = {
  size: 100,
  holes: [
    { start: 20, size: 10 },
    { start: 50, size: 10 },
  ],
};

memoryAfter = [
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
];

testInitializing(4, newMemory, memoryAfter);
