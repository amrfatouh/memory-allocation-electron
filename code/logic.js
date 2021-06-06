function makeNewMemory(req) {
  let funcOutput = { status: false, message: "", memory: memory };

  req.holes.sort((a, b) => a.start - b.start);

  //check that the starting address and (the starting address + size) of each hole are within the memory size
  for (var hole of req.holes) {
    if (hole.start < req.size && hole.start + hole.size <= req.size) {
      funcOutput.status = true;
    } else {
      funcOutput.status = false;
      funcOutput.message =
        "The holes size or starting addresses are not in the memory size";
      return funcOutput;
    }
  }

  if (req.holes.length != 1) {
    //check that holes are not overlapped
    if (funcOutput.status == true) {
      for (
        let i = 0;
        i < req.holes.length - 1 && funcOutput.status == true;
        i++
      ) {
        for (let j = i + 1; j < req.holes.length; j++) {
          if (req.holes[i].start + req.holes[i].size > req.holes[j].start) {
            funcOutput.message = "Holes are overlapped";
            funcOutput.status = false;
            return funcOutput;
          }
        }
      }
    }
    //check that holes aren't adjacent
    if (funcOutput.status == true) {
      for (
        let i = 0;
        i < req.holes.length - 1 && funcOutput.status == true;
        i++
      ) {
        for (let j = i + 1; j < req.holes.length; j++) {
          if (req.holes[i].start + req.holes[i].size == req.holes[j].start) {
            funcOutput.message = "Holes are adjacent";
            funcOutput.status = false;
            return funcOutput;
          }
        }
      }
    }
  }

  //overwrite the memorySize to the new size
  memorySize = req.size;

  //sort holes according to start address
  req.holes.sort((a, b) => a.start - b.start);

  //overwrite the global variable "memory" to just the new holes
  memory.length = 0;
  for (let i = 0; i < req.holes.length; i++) {
    memory.push({
      name: "hole " + i,
      type: "hole",
      id: i,
      processId: null,
      start: req.holes[i].start,
      size: req.holes[i].size,
    });
  }

  //adding old processes to global var

  //check if there is an old process at address 0
  let isThereStartOldProcess = false;
  if (req.holes[0].start != 0) {
    memory.push({
      name: "old process 0",
      type: "old process",
      id: 0,
      processId: null,
      start: 0,
      size: req.holes[0].start,
    });
    isThereStartOldProcess = true;
  }
  //check if there is an old process at the end of the memory
  let isThereEndOldProcess = false;
  if (req.holes.slice(-1)[0].start + req.holes.slice(-1)[0].size != req.size) {
    let oldProcessNum = isThereStartOldProcess
      ? req.holes.length
      : req.holes.length - 1;
    let startAdd = req.holes.slice(-1)[0].start + req.holes.slice(-1)[0].size;
    memory.push({
      name: "old process " + oldProcessNum,
      type: "old process",
      id: oldProcessNum,
      processId: null,
      start: startAdd,
      size: req.size - startAdd,
    });
    isThereEndOldProcess = true;
  }

  //adding inbetween old processes
  if (isThereStartOldProcess) {
    for (let i = 0; i < req.holes.length - 1; i++) {
      let oldProcessStartingAdd = req.holes[i].start + req.holes[i].size;
      let oldProcessSize = req.holes[i + 1].start - oldProcessStartingAdd;
      memory.push({
        name: "old process " + (i + 1),
        type: "old process",
        id: i + 1,
        processId: null,
        start: oldProcessStartingAdd,
        size: oldProcessSize,
      });
    }
  } else {
    for (let i = 0; i < req.holes.length - 1; i++) {
      let oldProcessStartingAdd = req.holes[i].start + req.holes[i].size;
      let oldProcessSize = req.holes[i + 1].start - oldProcessStartingAdd;
      memory.push({
        name: "old process " + i,
        type: "old process",
        id: i,
        processId: null,
        start: oldProcessStartingAdd,
        size: oldProcessSize,
      });
    }
  }
  //sort memory according to starting address
  memory.sort((a, b) => a.start - b.start);
  //the function should return the memory to the front end to be drawn
  funcOutput.memory = memory;
  funcOutput.status = true;
  return funcOutput;
}

//make a function called allocateProcess() that receives a process(array of memoryObjects) and allocation method
function allocateProcess(funcInput, allocationMethod) {
  let funcOutput = { status: false, message: "", memory: memory };
  //make a loop on the process, for each memoryObject:
  for (let i = 0; i < funcInput.memoryObjects?.length; i++) {
    //search the memory for a hole with size >= the size of the memoryObject
    if (
      memory.findIndex(
        (element) =>
          element.type == "hole" &&
          element.size >= funcInput.memoryObjects[i].size
      ) != -1
    ) {
      //if found and the method is first fit
      if (allocationMethod == "first fit") {
        //sort according to start
        memory.sort((a, b) => a.start - b.start);
        // filter memory to get first of holes of size more than size of memoryObject
        var firstFitHole = memory.find(
          (element) =>
            element.type == "hole" &&
            element.size >= funcInput.memoryObjects[i].size
        );

        //allocate that memoryObject into that hole using allocateSegmentIntoHole() auxillary function
        allocateSegmentIntoHole(funcInput.memoryObjects[i], firstFitHole);
      }
      //if found and the method is best fit
      else if (allocationMethod == "best fit") {
        //sort according to size
        memory.sort((a, b) => a.size - b.size);
        var bestFitHole = memory.find(
          (element) =>
            element.type == "hole" &&
            element.size >= funcInput.memoryObjects[i].size
        );
        //allocate that memoryObject into that hole using allocateSegmentIntoHole() auxillary function
        allocateSegmentIntoHole(funcInput.memoryObjects[i], bestFitHole);
      }
      //if found and the method is worst fit
      else if (allocationMethod == "worst fit") {
        //sort according to size DESC
        memory.sort((b, a) => a.size - b.size);
        var worstFitHole = memory.find(
          (element) =>
            element.type == "hole" &&
            element.size >= funcInput.memoryObjects[i].size
        );
        //allocate that memoryObject into that hole using allocateSegmentIntoHole() auxillary function
        allocateSegmentIntoHole(funcInput.memoryObjects[i], worstFitHole);
      }
    }
    //if not found, return an error message to front end saying process doesn't fit into the memory.
    else {
      //sort according to start
      memory.sort((a, b) => a.start - b.start);
      //Also remove any memoryObject in the memory having processId equal to the id of current process (sent to this function) using Deallocate
      let removal = { processId: funcInput.id, type: "process", id: null };
      funcOutput = deallocate(removal);
      funcOutput.message = "The process doesn't fit into the memory.";
      funcOutput.status = false;
      return funcOutput;
    }
  }

  funcOutput.memory = memory;
  funcOutput.status = true;
  return funcOutput;
}

//AUXILARY FUNCTION #1
//the function receives a memoryObject object (from a process) and a hole object (from the memory)
function allocateSegmentIntoHole(segment, hole) {
  //it sets the start of the memoryObject to the start of the hole and push it into the memory
  segment.start = hole.start;
  memory.push(segment);
  //it also modifies the start of the hole to be old start + memoryObject size
  hole.start += segment.size;
  //and its size to be old size - memoryObject size
  hole.size -= segment.size;
  //if the size of the hole became 0, it removes the hole from the memory
  if (hole.size == 0) {
    memory.splice(
      memory.findIndex((e) => e.size === 0),
      1
    );
  }
  //sort according to start
  memory.sort((a, b) => a.start - b.start);
}

//function called deallocate() that receives an object to be deallocated
function deallocate(funcInput) {
  let funcOutput = { status: false, message: "", memory: memory };

  //if the object is of type "old process"
  if (funcInput.type == "old process") {
    let index;
    //find the memory object with the same type & id and pass it to the aux function deallocateSegment()
    index = memory.findIndex(
      (element) => element.type == "old process" && element.id == funcInput.id
    );
    deallocateSegment(memory[index]);
  }
  //if the deallocatedObject is of type "process"
  else if (funcInput.type == "process") {
    //search the memory for all segments with processId equals processId of the deallocatedObject
    //iterate over these segments & pass them to deallocateSegment() aux function
    for (let i = 0; i < memory.length; i++) {
      //need a check for that condition
      if (
        memory[i].processId == funcInput.processId &&
        memory[i].type == "process"
      ) {
        deallocateSegment(memory[i]);
        i = 0;
      }
    }
  }

  funcOutput.memory = memory;
  funcOutput.status = true;
  return funcOutput;
}

//AUXILARY FUNCTION #3
//the function receives a memoryObject object in the memory to be replaced with a hole
function deallocateSegment(funcInput) {
  //find maximum id+1 in the holes in the memory
  let newId;
  if (memory.find((e) => e.type === "hole"))
    newId =
      Math.max(...memory.filter((e) => e.type === "hole").map((e) => e.id)) + 1;
  else newId = 0;

  //change the type of the object to "hole"
  funcInput.type = "hole";

  //change the id of that hole into maxId + 1
  funcInput.id = newId;

  //change the processId of the hole into null
  funcInput.processId = null;

  //change the name to hole + new id
  funcInput.name = "hole " + newId;

  //if there is a hole before that hole
  let beforeHoleEndAddressCheck = funcInput.start;
  if (
    memory.findIndex(
      (element) =>
        element.type == "hole" &&
        element.start + element.size == beforeHoleEndAddressCheck
    ) != -1
  ) {
    //before hole index
    let beforeHoleInd = memory.findIndex(
      (element) =>
        element.type == "hole" &&
        element.start + element.size == beforeHoleEndAddressCheck
    );
    //combine them using combineHoles() aux function
    combineHoles(memory[beforeHoleInd], funcInput);
    //this for before and after holes merge case
    funcInput = memory[beforeHoleInd];
  }

  //if there is also a hole after that hole
  let afterHoleAddressCheck = funcInput.start + funcInput.size;
  if (
    memory.findIndex(
      (element) =>
        element.type == "hole" && element.start == afterHoleAddressCheck
    ) != -1
  ) {
    //after hole index
    let afterHoleInd = memory.findIndex(
      (element) =>
        element.type == "hole" && element.start == afterHoleAddressCheck
    );
    //combine them using combineHoles() aux function
    combineHoles(funcInput, memory[afterHoleInd]);
  }
}

//AUXILARY FUNCTION #4
//the function receives 2 adjacent holes to combine them
function combineHoles(hole1, hole2) {
  //determine which hole comes first in the memory (by start)
  if (hole1.start < hole2.start) {
    let hole2Index = memory.findIndex(
      (element) => element.start == hole2.start
    );
    //set the id of 1st hole as the minimum of the 2 ids of the 2 holes
    if (hole1.id > hole2.id) {
      hole1.id = hole2.id;
      //set the name of the 1st hole to "hole + " the minimum id
      hole1.name = hole2.name;
    }
    //add the size of the second hole to the first hole
    hole1.size += hole2.size;
    //remove the second hole from the memory
    memory.splice(hole2Index, 1);
  } else {
    let hole1Index = memory.findIndex(
      (element) => element.start == hole1.start
    );
    //set the id of 2nd hole as the minimum of the 2 ids of the 2 holes
    if (hole1.id < hole2.id) {
      hole2.id = hole1.id;
      //set the name of the 2nd hole to "hole + " the minimum id
      hole2.name = hole1.name;
    }
    //add the size of the first hole to the second hole
    hole2.size += hole1.size;
    //remove the first hole from the memory
    memory.splice(hole1Index, 1);
  }
}
