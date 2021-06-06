let reservedProcessIds = [];

let chartDiv = document.querySelector("#chart_div");

let memorySizeShowDiv = document.querySelector("#memory-size-show-div");

let memorySizeErrorSpan = document.querySelector("#memory-size-error");
let makeNewMemoryButton = document.querySelector("#make-new-memory");
let memorySizeTextbox = document.querySelector("#memory-size");

let holesCountDiv = document.querySelector("#holes-count-div");
let holesCountTextbox = document.querySelector("#holes-count-textbox");
let holesCountErrorSpan = document.querySelector("#holes-count-error-span");

let holesDiv = document.querySelector("#holes-div");
let holesTable = document.querySelector("#holes-table");
let holesStartTextboxes = Array.from(document.querySelectorAll(".hole-start"));
let holesSizeTextboxes = Array.from(document.querySelectorAll(".hole-size"));
let submitHolesButton = document.querySelector("#holes-submit-button");
let holesTextboxesErrorSpan = document.querySelector(
  "#holes-textboxes-error-span"
);

let allocateOrDeallocateDiv = document.querySelector(
  "#allocate-or-deallocate-div"
);
let allocateRadio = document.querySelector("#allocate-radio");
let deallocateRadio = document.querySelector("#deallocate-radio");

let allocationMethodDiv = document.querySelector("#allocation-method-div");
let firstFitRadio = document.querySelector("#first-fit-radio");
let bestFitRadio = document.querySelector("#best-fit-radio");
let worstFitRadio = document.querySelector("#worst-fit-radio");
let allocationMethodErrorSpan = document.querySelector(
  "#allocation-method-error-span"
);

let processIdDiv = document.querySelector("#process-id-div");
let processIdTextbox = document.querySelector("#process-id-textbox");
let processIdErrorSpan = document.querySelector("#process-id-error-span");

let segmentsCountDiv = document.querySelector("#segments-count-div");
let segmentsCountTextbox = document.querySelector("#segments-count-textbox");
let segmentsCountErrorSpan = document.querySelector(
  "#segment-count-error-span"
);

let segmentsDiv = document.querySelector("#segments-div");
let segmentsTable = document.querySelector("#segments-table");
let segmentsNameTextboxes = Array.from(
  document.querySelectorAll(".segment-name")
);
let segmentsSizeTextboxes = Array.from(
  document.querySelectorAll(".segment-size")
);
let submitSegmentsButton = document.querySelector("#submit-segments-button");
let segmentsTextboxesErrorSpan = document.querySelector(
  "#segments-textboxes-error-span"
);

let deallocateDiv = document.querySelector("#deallocate-div");
let deallocateSelect = document.querySelector("#deallocate-select");
let submitDeallocateButton = document.querySelector(
  "#submit-deallocate-button"
);

let resultErrorDiv = document.querySelector("#result-error-div");

function checkInvalidInputs(textbox, errorSpan, refuseZeros = false) {
  let value = textbox.value;
  if (
    value === "" ||
    isNaN(value) ||
    value < 0 ||
    (refuseZeros && Number(value) === 0)
  ) {
    errorSpan.textContent = "invalid input";
    return true;
  }
  return false;
}

function checkEmpty(textbox, errorSpan) {
  let value = textbox.value;
  if (value === "") {
    errorSpan.textContent = "invalid input";
    return true;
  }
  return false;
}

makeNewMemoryButton.onclick = () => {
  //restoring state before setting memory
  memorySizeErrorSpan.textContent = "";
  holesCountDiv.style.display = "none";
  holesDiv.style.display = "none";
  allocateOrDeallocateDiv.style.display = "none";
  deallocateRadio.disabled = false;
  allocationMethodDiv.style.display = "none";
  processIdDiv.style.display = "none";
  segmentsCountDiv.style.display = "none";
  segmentsDiv.style.display = "none";
  deallocateDiv.style.display = "none";
  //error checking
  let memorySizeInput = memorySizeTextbox.value;
  if (
    memorySizeInput === "" ||
    isNaN(memorySizeInput) ||
    memorySizeInput <= 0
  ) {
    memorySizeErrorSpan.textContent = "invalid input";
    return;
  }
  // hiding char_div
  chartDiv.style.visibility = "hidden";
  //displaying holes count div
  //setting value of memorySize
  // empty reserved processes ids
  holesCountDiv.style.display = "block";
  memorySize = Number(memorySizeInput);
  memorySizeShowDiv.textContent = `Memory Size: ${memorySize}`;
  reservedProcessIds.length = 0;
  // clear all input textboxes, radios and error spans
  Array.from(document.querySelectorAll('input[type="radio"]')).forEach((e) => {
    e.checked = false;
  });
  Array.from(document.querySelectorAll('input[type="text"]')).forEach((e) => {
    e.value = "";
  });
  Array.from(document.querySelectorAll("span.error")).forEach((e) => {
    e.textContent = "";
  });
};

holesCountTextbox.onkeyup = () => {
  //restoring state before setting memory
  holesCountErrorSpan.textContent = "";
  holesDiv.style.display = "none";
  //error checking
  let holesNumbers = holesCountTextbox.value;
  if (holesNumbers === "" || isNaN(holesNumbers) || holesNumbers <= 0) {
    holesCountErrorSpan.textContent = "invalid input";
    return;
  }
  //displaying the holes div
  // filling holes table
  holesDiv.style.display = "block";
  holesTable.innerHTML = `          
    <tr>
      <td>hole</td>
      <td>start</td>
      <td>size</td>
    </tr>`;
  for (let i = 0; i < holesNumbers; i++) {
    holesTable.innerHTML += `
    <tr>
      <td>${i}</td>
      <td><input type="text" class="hole-start"></td>
      <td><input type="text" class="hole-size"></td>
    </tr>
    `;
  }
  // updating the start & size textboxes array
  holesStartTextboxes = Array.from(document.querySelectorAll(".hole-start"));
  holesSizeTextboxes = Array.from(document.querySelectorAll(".hole-size"));
};

submitHolesButton.onclick = () => {
  //restoring state before setting memory
  holesTextboxesErrorSpan.textContent = "";
  //error checking
  let isError = false;
  holesStartTextboxes.forEach((t) => {
    if (checkInvalidInputs(t, holesTextboxesErrorSpan)) {
      isError = true;
      return;
    }
  });
  if (isError) return;
  holesSizeTextboxes.forEach((t) => {
    if (checkInvalidInputs(t, holesTextboxesErrorSpan, true)) {
      isError = true;
      return;
    }
  });
  if (isError) return;

  let holesArray = [];
  // make newMemory object
  for (let i = 0; i < holesStartTextboxes.length; i++) {
    let start = Number(holesStartTextboxes[i].value);
    let size = Number(holesSizeTextboxes[i].value);
    holesArray.push({ start, size });
  }
  let newMemory = { size: memorySize, holes: holesArray };
  let returedAllocatedObject = makeNewMemory(newMemory);
  let doContinue = handleResult(returedAllocatedObject);
  if (!doContinue) return;

  // showing chart_div
  chartDiv.style.visibility = "visible";
  // hiding holes count div & holes div
  holesCountDiv.style.display = "none";
  holesDiv.style.display = "none";
  allocateOrDeallocateDiv.style.display = "block";
  if (!memory.find((e) => e.type === "process" || e.type === "old process"))
    deallocateRadio.disabled = true;
  // clear holes count textbox
  holesCountTextbox.value = "";
};

allocateRadio.onchange = () => {
  //restoring state before choosing allocate radio button
  segmentsCountErrorSpan.textContent = "";
  segmentsDiv.style.display = "none";
  deallocateDiv.style.display = "none";
  //showing allocation method div & process id div & segments count div
  allocationMethodDiv.style.display = "block";
  processIdDiv.style.display = "block";
  segmentsCountDiv.style.display = "block";
};

processIdTextbox.onkeyup = () => {
  //restoring state before selecting typing
  allocationMethodErrorSpan.textContent = "";
  processIdErrorSpan.textContent = "";
  segmentsCountErrorSpan.textContent = "";
  // error checking
  if (checkInvalidInputs(segmentsCountTextbox, segmentsCountErrorSpan, true))
    return;
  if (checkInvalidInputs(processIdTextbox, processIdErrorSpan)) return;
  if (
    !firstFitRadio.checked &&
    !bestFitRadio.checked &&
    !worstFitRadio.checked
  ) {
    allocationMethodErrorSpan.textContent = "choose a method";
    return;
  }
  if (reservedProcessIds.includes(Number(processIdTextbox.value))) {
    allocationMethodErrorSpan.textContent = "process id already taken";
    return;
  }
  // showing & preparing segments div
  segmentsDiv.style.display = "block";
  prepareSegmentsDiv();
};

firstFitRadio.onchange =
  bestFitRadio.onchange =
  worstFitRadio.onchange =
    () => {
      //restoring state before selecting allocation method
      allocationMethodErrorSpan.textContent = "";
      processIdErrorSpan.textContent = "";
      segmentsCountErrorSpan.textContent = "";
      // error checking
      if (
        checkInvalidInputs(segmentsCountTextbox, segmentsCountErrorSpan, true)
      )
        return;
      if (checkInvalidInputs(processIdTextbox, processIdErrorSpan)) return;
      if (
        !firstFitRadio.checked &&
        !bestFitRadio.checked &&
        !worstFitRadio.checked
      ) {
        allocationMethodErrorSpan.textContent = "choose a method";
        return;
      }
      if (reservedProcessIds.includes(Number(processIdTextbox.value))) {
        allocationMethodErrorSpan.textContent = "process id already taken";
        return;
      }
      // showing & preparing segments div
      segmentsDiv.style.display = "block";
      prepareSegmentsDiv();
    };

segmentsCountTextbox.onkeyup = () => {
  //restoring state before typing
  allocationMethodErrorSpan.textContent = "";
  processIdErrorSpan.textContent = "";
  segmentsCountErrorSpan.textContent = "";
  segmentsDiv.style.display = "none";
  // error checking
  if (checkInvalidInputs(segmentsCountTextbox, segmentsCountErrorSpan, true))
    return;
  if (checkInvalidInputs(processIdTextbox, processIdErrorSpan)) return;
  if (
    !firstFitRadio.checked &&
    !bestFitRadio.checked &&
    !worstFitRadio.checked
  ) {
    allocationMethodErrorSpan.textContent = "choose a method";
    return;
  }
  if (reservedProcessIds.includes(Number(processIdTextbox.value))) {
    allocationMethodErrorSpan.textContent = "process id already taken";
    return;
  }
  // showing & preparing segments div
  segmentsDiv.style.display = "block";
  prepareSegmentsDiv();
};

function prepareSegmentsDiv() {
  segmentsTable.innerHTML = `
    <tr>
      <td>segment</td>
      <td>name</td>
      <td>size</td>
    </tr>
  `;
  let segmentsCount = Number(segmentsCountTextbox.value);
  for (let i = 0; i < segmentsCount; i++) {
    segmentsTable.innerHTML += `
    <tr>
      <td>${i}</td>
      <td><input type="text" class="segment-name"></td>
      <td><input type="text" class="segment-size"></td>
    </tr>
    `;
  }
  // updating the segments name & size textboxes array
  segmentsNameTextboxes = Array.from(
    document.querySelectorAll(".segment-name")
  );
  segmentsSizeTextboxes = Array.from(
    document.querySelectorAll(".segment-size")
  );
}

submitSegmentsButton.onclick = () => {
  //restoring state before submitting segments
  segmentsTextboxesErrorSpan.textContent = "";
  //error checking
  let isError = false;
  segmentsNameTextboxes.forEach((t) => {
    if (checkEmpty(t, segmentsTextboxesErrorSpan)) {
      isError = true;
      return;
    }
  });
  if (isError) return;
  segmentsSizeTextboxes.forEach((t) => {
    if (checkInvalidInputs(t, segmentsTextboxesErrorSpan, true)) {
      isError = true;
      return;
    }
  });
  if (isError) return;

  // making process object
  let processId = Number(processIdTextbox.value);
  let allocationMethod = firstFitRadio.checked
    ? "first fit"
    : bestFitRadio.checked
    ? "best fit"
    : "worst fit";
  let memoryObjects = [];
  for (let i = 0; i < segmentsNameTextboxes.length; i++) {
    let name = segmentsNameTextboxes[i].value;
    let size = Number(segmentsSizeTextboxes[i].value);
    let start = null;
    let type = "process";
    let id = i;
    memoryObjects.push({ name, type, id, processId, start, size });
  }
  let process = { id: processId, memoryObjects };
  let returedAllocatedObject = allocateProcess(process, allocationMethod);
  let doContinue = handleResult(returedAllocatedObject);
  if (!doContinue) return;
  // pushing the process id into the reserved processes ids
  reservedProcessIds.push(processId);
  // hiding allocation method & segments count div & segments div & process id div
  // clearing allocate & deallocate radio buttons
  // enabling deallocate radio if there is a process or an old process in memory
  allocationMethodDiv.style.display = "none";
  segmentsCountDiv.style.display = "none";
  segmentsDiv.style.display = "none";
  processIdDiv.style.display = "none";
  allocateRadio.checked = deallocateRadio.checked = false;
  if (memory.find((e) => e.type === "process" || e.type === "old process"))
    deallocateRadio.disabled = false;
  // clear process id & segments count textboxes & allocation methods radios
  processIdTextbox.value = "";
  segmentsCountTextbox.value = "";
  firstFitRadio.checked = false;
  bestFitRadio.checked = false;
  worstFitRadio.checked = false;
};

deallocateRadio.onchange = () => {
  // hide all allocation stuff
  allocationMethodDiv.style.display = "none";
  processIdDiv.style.display = "none";
  segmentsCountDiv.style.display = "none";
  segmentsDiv.style.display = "none";
  // show deallocate div & put valid options in memory
  deallocateDiv.style.display = "block";
  // putting old processes into deallocating select
  deallocateSelect.innerHTML = "";
  memory
    .filter((x) => x.type === "old process")
    .forEach((x) => {
      let id = x.id;
      let name = x.name;
      deallocateSelect.innerHTML += `
    <option data-type="old process" data-id="${id}" data-process-id="" >${name}</option>
    `;
    });
  // putting processes into deallocating select
  let processesToDeallocate = memory
    .filter((x) => x.type === "process")
    .map((x) => x.processId);
  processesToDeallocate = [...new Set(processesToDeallocate)];
  processesToDeallocate.forEach((x) => {
    deallocateSelect.innerHTML += `
    <option data-type="process" data-id="" data-process-id="${x}" >P${x}</option>
    `;
  });
};

submitDeallocateButton.onclick = () => {
  let option = Array.from(deallocateSelect.children).find(
    (o) => o.selected === true
  );
  let type = option.dataset.type;
  let deallocatedObject;
  if (type === "old process") {
    deallocatedObject = {
      processId: null,
      type,
      id: Number(option.dataset.id),
    };
  } else {
    let processId = Number(option.dataset.processId);
    reservedProcessIds.splice(
      reservedProcessIds.findIndex((e) => e === processId),
      1
    );
    deallocatedObject = {
      processId,
      type,
      id: null,
    };
  }
  let returedAllocatedObject = deallocate(deallocatedObject);
  let doContinue = handleResult(returedAllocatedObject);
  if (!doContinue) return;
  // hide deallocate div
  // clear allocate & deallocate radios
  // disable deallocate radio if no processes or old processes
  deallocateDiv.style.display = "none";
  allocateRadio.checked = deallocateRadio.checked = false;
  if (!memory.find((e) => e.type === "process" || e.type === "old process"))
    deallocateRadio.disabled = true;
};

function handleResult(result) {
  if (result.status === false) {
    Swal.fire({
      title: "Error!",
      text: result.message,
      icon: "error",
      confirmButtonText: "ok",
    });
    return false;
  }
  drawChart(result.memory);
  return true;
}
