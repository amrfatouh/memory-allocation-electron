console.log("ALLOCATION TESTING");

let process, allocationMethod, returneAllocatedObject;

function testProcessAllocation(testNum, proc, allocMethod, correctReturned) {
  let myReturned = allocateProcess(proc, allocMethod);
  correctReturned.body.sort((a, b) => a.start - b.start);
  myReturned.memory.sort((a, b) => a.start - b.start);
  if (
    JSON.stringify(myReturned.memory) === JSON.stringify(correctReturned.body)
  ) {
    console.log(`TEST ${testNum} SUCCEEDED`, myReturned.memory);
  } else {
    console.log(`TEST ${testNum} FAILED`);
    console.log("retured memory", myReturned.memory);
    console.log("correct memory", correctReturned.body);
  }
}

// TEST CASE (1)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 20,
    size: 20,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 50,
    size: 20,
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
    start: 40,
    size: 10,
  },
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 70,
    size: 30,
  },
];

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 30,
    },
  ],
};

returneAllocatedObject = {
  status: false,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 20,
      size: 20,
    },
    {
      name: "hole 1",
      type: "hole",
      id: 1,
      processId: null,
      start: 50,
      size: 20,
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
      start: 40,
      size: 10,
    },
    {
      name: "old process 2",
      type: "old process",
      id: 2,
      processId: null,
      start: 70,
      size: 30,
    },
  ],
  message: "error message",
};

testProcessAllocation(1, process, allocationMethod, returneAllocatedObject);

// TEST CASE (2)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 30,
    size: 20,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 30,
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

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: -1,
      size: 30,
    },
  ],
};

returneAllocatedObject = {
  status: false,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 30,
      size: 20,
    },
    {
      name: "old process 0",
      type: "old process",
      id: 0,
      processId: null,
      start: 0,
      size: 30,
    },
    {
      name: "old process 1",
      type: "old process",
      id: 1,
      processId: null,
      start: 50,
      size: 50,
    },
  ],
  message: "error message",
};

testProcessAllocation(2, process, allocationMethod, returneAllocatedObject);

// TEST CASE (3)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 30,
    size: 40,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 30,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 70,
    size: 30,
  },
];

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 20,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: -1,
      size: 30,
    },
  ],
};

returneAllocatedObject = {
  status: false,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 30,
      size: 40,
    },
    {
      name: "old process 0",
      type: "old process",
      id: 0,
      processId: null,
      start: 0,
      size: 30,
    },
    {
      name: "old process 1",
      type: "old process",
      id: 1,
      processId: null,
      start: 70,
      size: 30,
    },
  ],
  message: "error message",
};

testProcessAllocation(3, process, allocationMethod, returneAllocatedObject);

// TEST CASE (4)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 30,
    size: 40,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 30,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 70,
    size: 30,
  },
];

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 20,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 50,
      size: 20,
    },
    {
      name: "old process 0",
      type: "old process",
      id: 0,
      processId: null,
      start: 0,
      size: 30,
    },
    {
      name: "old process 1",
      type: "old process",
      id: 1,
      processId: null,
      start: 70,
      size: 30,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 30,
      size: 20,
    },
  ],
  message: "",
};

testProcessAllocation(4, process, allocationMethod, returneAllocatedObject);

// TEST CASE (5)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 30,
    size: 40,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 30,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 70,
    size: 30,
  },
];

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 40,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "old process 0",
      type: "old process",
      id: 0,
      processId: null,
      start: 0,
      size: 30,
    },
    {
      name: "old process 1",
      type: "old process",
      id: 1,
      processId: null,
      start: 70,
      size: 30,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 30,
      size: 40,
    },
  ],
  message: "",
};

testProcessAllocation(5, process, allocationMethod, returneAllocatedObject);

// TEST CASE (6)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 10,
    size: 20,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 40,
    size: 20,
  },
  {
    name: "hole 2",
    type: "hole",
    id: 2,
    processId: null,
    start: 70,
    size: 20,
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
    start: 30,
    size: 10,
  },
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 60,
    size: 10,
  },
  {
    name: "old process 3",
    type: "old process",
    id: 3,
    processId: null,
    start: 90,
    size: 10,
  },
];

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 15,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: -1,
      size: 15,
    },
    {
      name: "bla bla",
      type: "process",
      id: 2,
      processId: 0,
      start: -1,
      size: 15,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 25,
      size: 5,
    },
    {
      name: "hole 1",
      type: "hole",
      id: 1,
      processId: null,
      start: 55,
      size: 5,
    },
    {
      name: "hole 2",
      type: "hole",
      id: 2,
      processId: null,
      start: 85,
      size: 5,
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
      start: 30,
      size: 10,
    },
    {
      name: "old process 2",
      type: "old process",
      id: 2,
      processId: null,
      start: 60,
      size: 10,
    },
    {
      name: "old process 3",
      type: "old process",
      id: 3,
      processId: null,
      start: 90,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 10,
      size: 15,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: 40,
      size: 15,
    },
    {
      name: "bla bla",
      type: "process",
      id: 2,
      processId: 0,
      start: 70,
      size: 15,
    },
  ],
  message: "",
};

testProcessAllocation(6, process, allocationMethod, returneAllocatedObject);

// TEST CASE (7)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 30,
    size: 40,
  },
  {
    name: "old process 0",
    type: "old process",
    id: 0,
    processId: null,
    start: 0,
    size: 30,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 1,
    processId: null,
    start: 70,
    size: 30,
  },
];

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 20,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 60,
      size: 10,
    },
    {
      name: "old process 0",
      type: "old process",
      id: 0,
      processId: null,
      start: 0,
      size: 30,
    },
    {
      name: "old process 1",
      type: "old process",
      id: 1,
      processId: null,
      start: 70,
      size: 30,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 30,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 40,
      size: 20,
    },
  ],
  message: "",
};

testProcessAllocation(7, process, allocationMethod, returneAllocatedObject);

// TEST CASE (8)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 10,
    size: 30,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 50,
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
    start: 40,
    size: 10,
  },
  {
    name: "old process 1",
    type: "old process",
    id: 2,
    processId: null,
    start: 90,
    size: 10,
  },
];

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: -1,
      size: 20,
    },
    {
      name: "bla bla",
      type: "process",
      id: 2,
      processId: 0,
      start: -1,
      size: 40,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
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
      start: 40,
      size: 10,
    },
    {
      name: "old process 1",
      type: "old process",
      id: 2,
      processId: null,
      start: 90,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 10,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: 20,
      size: 20,
    },
    {
      name: "bla bla",
      type: "process",
      id: 2,
      processId: 0,
      start: 50,
      size: 40,
    },
  ],
  message: "",
};

testProcessAllocation(8, process, allocationMethod, returneAllocatedObject);

// TEST CASE (9)

memorySize = 100;

memory = [
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
    size: 30,
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
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 90,
    size: 10,
  },
];

allocationMethod = "first fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 20,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 30,
      size: 20,
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
    {
      name: "old process 2",
      type: "old process",
      id: 2,
      processId: null,
      start: 90,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 10,
      size: 20,
    },
  ],
  message: "",
};

testProcessAllocation(9, process, allocationMethod, returneAllocatedObject);

// TEST CASE (10)

memorySize = 100;

memory = [
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
    size: 30,
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
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 90,
    size: 10,
  },
];

allocationMethod = "best fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 20,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
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
      start: 80,
      size: 10,
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
    {
      name: "old process 2",
      type: "old process",
      id: 2,
      processId: null,
      start: 90,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 60,
      size: 20,
    },
  ],
  message: "",
};

testProcessAllocation(10, process, allocationMethod, returneAllocatedObject);

// TEST CASE (11)

memorySize = 100;

memory = [
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
    size: 30,
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
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 90,
    size: 10,
  },
];

allocationMethod = "best fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 30,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 10,
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
    {
      name: "old process 2",
      type: "old process",
      id: 2,
      processId: null,
      start: 90,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 60,
      size: 30,
    },
  ],
  message: "",
};

testProcessAllocation(11, process, allocationMethod, returneAllocatedObject);

// TEST CASE (12)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 10,
    size: 30,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 50,
    size: 20,
  },
  {
    name: "hole 2",
    type: "hole",
    id: 2,
    processId: null,
    start: 80,
    size: 10,
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
    start: 40,
    size: 10,
  },
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 70,
    size: 10,
  },
  {
    name: "old process 3",
    type: "old process",
    id: 3,
    processId: null,
    start: 90,
    size: 10,
  },
];

allocationMethod = "best fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 20,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: -1,
      size: 20,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 30,
      size: 10,
    },
    {
      name: "hole 2",
      type: "hole",
      id: 2,
      processId: null,
      start: 80,
      size: 10,
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
      start: 40,
      size: 10,
    },
    {
      name: "old process 2",
      type: "old process",
      id: 2,
      processId: null,
      start: 70,
      size: 10,
    },
    {
      name: "old process 3",
      type: "old process",
      id: 3,
      processId: null,
      start: 90,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 50,
      size: 20,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: 10,
      size: 20,
    },
  ],
  message: "",
};

testProcessAllocation(12, process, allocationMethod, returneAllocatedObject);

// TEST CASE (13)

memorySize = 100;

memory = [
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
    size: 30,
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
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 90,
    size: 10,
  },
];

allocationMethod = "best fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: -1,
      size: 20,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 10,
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
    {
      name: "old process 2",
      type: "old process",
      id: 2,
      processId: null,
      start: 90,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 60,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: 70,
      size: 20,
    },
  ],
  message: "",
};

testProcessAllocation(13, process, allocationMethod, returneAllocatedObject);

// TEST CASE (14)

memorySize = 100;

memory = [
  {
    name: "hole 0",
    type: "hole",
    id: 0,
    processId: null,
    start: 10,
    size: 30,
  },
  {
    name: "hole 1",
    type: "hole",
    id: 1,
    processId: null,
    start: 50,
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
    start: 40,
    size: 10,
  },
  {
    name: "old process 2",
    type: "old process",
    id: 2,
    processId: null,
    start: 90,
    size: 10,
  },
];

allocationMethod = "worst fit";

process = {
  id: 0,
  memoryObjects: [
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: -1,
      size: 20,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: -1,
      size: 20,
    },
  ],
};

returneAllocatedObject = {
  status: true,
  body: [
    {
      name: "hole 0",
      type: "hole",
      id: 0,
      processId: null,
      start: 30,
      size: 10,
    },
    {
      name: "hole 1",
      type: "hole",
      id: 1,
      processId: null,
      start: 70,
      size: 20,
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
      start: 40,
      size: 10,
    },
    {
      name: "old process 2",
      type: "old process",
      id: 2,
      processId: null,
      start: 90,
      size: 10,
    },
    {
      name: "bla bla",
      type: "process",
      id: 0,
      processId: 0,
      start: 50,
      size: 20,
    },
    {
      name: "bla bla",
      type: "process",
      id: 1,
      processId: 0,
      start: 10,
      size: 20,
    },
  ],
  message: "",
};

testProcessAllocation(14, process, allocationMethod, returneAllocatedObject);
