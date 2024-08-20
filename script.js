const ratingsContainersDom = document.querySelectorAll(".ratings-container");
const submitButtonDom = document.querySelector(".submit_button");
const myFormDom = document.querySelector(".my_form");
const tosDom = document.querySelectorAll(".tos_privacy");

const STEPS = 5;
let currentStep = 1;
const noOfQuestions = [2, 2, 2, 2, 3];
const from = noOfQuestions.slice(0, currentStep - 1).reduce((a, b) => a + b, 0);
const to = noOfQuestions[currentStep - 1] + from;

function getTextContent(currentStep) {
  return currentStep < 4
    ? "Next Step"
    : currentStep === 4
    ? "Last Step"
    : "Get Free Consult";
}

function createRatingStars(rating) {
  const wholePart = Math.floor(rating);
  const decimalPart = rating % 1 > 0 ? 1 : 0;
  const emptyStars = 5 - (wholePart + decimalPart);

  const fullStars = [...Array(wholePart)].map((_) => fullStar);
  const halfStars = decimalPart > 0 ? [halfStar] : [];
  const emptyStarsArray = [...Array(emptyStars)].map((_) => emptyStar);

  return [...fullStars, ...halfStars, ...emptyStarsArray];
}

ratingsContainersDom.forEach((ratingContainer) => {
  ratingContainer.innerHTML = createRatingStars(RATING).join("");
});

function createElement(tag, attributes = {}, textContent = "") {
  const el = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) =>
    el.setAttribute(key, value)
  );
  el.textContent = textContent;
  return el;
}

function createButtonElement() {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-autocomplete", "none");
  button.dir = "ltr";
  button.className =
    "select_button flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300 w-full";
  button.addEventListener("click", handleSelectClick);
  return button;
}

function createSpanELement() {
  const span = document.createElement("span");
  return span;
}

function createLabelElement(number, text) {
  const label = document.createElement("label");
  label.className = "flex gap-2";
  const numberSpan = createSpanELement();
  const textSpan = createSpanELement();
  numberSpan.textContent = number;
  textSpan.textContent = text;
  label.appendChild(numberSpan);
  label.appendChild(textSpan);
  return label;
}

function createSelectElement(options, name) {
  const select = document.createElement("select");
  select.setAttribute("tabindex", "-1");
  select.required = true;
  select.style.position = "absolute";
  select.style.border = "0px";
  select.style.width = "1px";
  select.style.height = "1px";
  select.style.padding = "0px";
  select.style.margin = "-1px";
  select.style.overflow = "hidden";
  select.style.opacity = "0";
  select.style.whiteSpace = "nowrap";
  select.style.overflowWrap = "normal";
  select.name = name;

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "";
  select.appendChild(emptyOption);

  options.forEach((text) => {
    const option = document.createElement("option");
    option.value = text;
    option.textContent = text;
    select.appendChild(option);
  });

  return select;
}

function createDropDownElement(options) {
  const div = document.createElement("div");
  div.className =
    "hidden top_under absolute z-50 open_dropdown w-full p-2 bg-blend-multiply bg-white border border-[#E1E1E1] shadow-lg rounded";
  const ul = document.createElement("ul");
  options.forEach((option) => {
    const li = document.createElement("li");
    li.className =
      "select_option flex items-center justify-between py-2 px-4 text-sm cursor-pointer hover_el";
    const span = createSpanELement();
    span.textContent = option;
    li.appendChild(span);
    li.addEventListener("click", handleSelect);
    ul.appendChild(li);
  });

  div.appendChild(ul);
  return div;
}

function createRadioSelect(input) {
  const { name, options } = input;
  const wrapper = document.createElement("div");
  wrapper.className = "grid grid-cols-2 gap-6";
  options.forEach((option) => {
    const label = document.createElement("label");
    label.className =
      "flex items-center gap-4 py-3 px-6 border border-[#E1E1E1] rounded cursor-pointer";
    label.for = `${name}-${option}`;
    const divParent = document.createElement("div");
    divParent.className =
      "w-4 h-4 rounded-full border border-[#333333] flex items-center justify-center";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = name;
    radio.value = option;
    radio.id = `${name}-${option}`;
    radio.hidden = true;
    radio.required = true;
    radio.className = "peer";
    radio.addEventListener("change", clearErrors);
    const divChild = document.createElement("div");
    divChild.className = "peer-checked:bg-blue w-2 h-2 rounded-full";
    divParent.appendChild(radio);
    divParent.appendChild(divChild);

    const span = createSpanELement();
    span.textContent = option;

    label.appendChild(divParent);
    label.appendChild(span);
    wrapper.appendChild(label);
  });
  return wrapper;
}

function createCustomSelect(input) {
  const options = input.options;
  const button = createButtonElement();
  const span = createSpanELement();
  span.textContent = input.placeholder;

  button.appendChild(span);

  const select = createSelectElement(options, input.name);
  const dropdown = createDropDownElement(options);

  return [button, select, dropdown];
}

function createFieldSet(index, question) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "relative flex flex-col gap-4";
  const label = createLabelElement(`${index + 1}.`, question);
  fieldset.appendChild(label);
  return fieldset;
}

function createInput(input) {
  const { type, id, name, placeholder } = input;
  const inputEl = document.createElement("input");
  inputEl.className =
    "border-2 border-[#E1E1E1] rounded px-4 py-3 focus:border-black outline-none";
  inputEl.type = type;
  inputEl.name = name;
  inputEl.id = id;
  inputEl.placeholder = placeholder ?? "";
  inputEl.required = true;
  inputEl.addEventListener("focus", clearErrors);
  return inputEl;
}

function createTextarea(input) {
  const textarea = document.createElement("textarea");
  const { type, id, name } = input;
  textarea.className =
    "h-36 resize-none border-2 border-[#E1E1E1] rounded px-4 py-3 focus:border-black outline-none";
  textarea.type = type;
  textarea.name = name;
  textarea.id = id;
  textarea.required = true;
  textarea.addEventListener("focus", clearErrors);
  return textarea;
}

function generateInputElement(inputs) {
  const inputTypes = {
    select: createCustomSelect,
    text: createInput,
    tel: createInput,
    email: createInput,
    textarea: createTextarea,
    radio: createRadioSelect,
  };

  const div = document.createElement("div");
  div.className = "grid grid-cols-2 gap-6";

  const inputEls = inputs.flatMap((input) => {
    return inputTypes[input.type](input);
  });

  if (inputs.length > 1) {
    inputEls.forEach((input) => {
      div.appendChild(input);
    });
    return [div];
  }

  return inputEls;
}

function appendDisclaimer(currentStep) {
  const disclaimers = {
    4: tos,
    5: disclaimer,
  };
  tosDom.forEach((el) => {
    el.innerHTML = disclaimers[currentStep];
  });
  console.log(currentStep);
}

function updateForm(from, to) {
  const formSlice = form.slice(from, to);
  const fields = formSlice.map((slice, index) => {
    const fieldset = createFieldSet(from + index, slice.question);
    const inputs = generateInputElement(slice.inputs);
    const error = document.createElement("p");
    error.className = "error hidden text-red-500 italic text-sm";
    slice.inputs.forEach((input) => {
      error.textContent = input.error;
    });
    fieldset.appendChild(error);

    inputs.forEach((input) => {
      fieldset.appendChild(input);
    });
    fieldset.appendChild(error);

    return fieldset;
  });

  if (currentStep > 3) {
    appendDisclaimer(currentStep);
  }

  currentStep++;

  myFormDom.prepend(...fields);
}

function validateInput(input) {
  if (input.type === "radio") {
    return input.checkValidity() || input.checked;
  }
  return input.checkValidity() && input.value;
}

function validateInputs() {
  const errors = document.querySelectorAll(".error");
  const form = document.querySelector(".my_form");
  const formData = new FormData(form);
  const inputs = form.querySelectorAll("input, select, textarea");

  const validInputs = [...inputs].map((input) => {
    const isValid = validateInput(input);

    if (!isValid) {
      const fieldset = input.closest("fieldset");

      if (fieldset) {
        const errorElement = fieldset.querySelector("p.error");
        errorElement.classList.remove("hidden");
      }
    }
    return isValid;
  });

  console.log(Object.fromEntries(formData));
  return validInputs.every((input) => input);
}

function handleSubmit(e) {
  e.preventDefault();
  const valid = validateInputs(e.currentTarget);
  if (!valid) {
    return;
  }
  if (currentStep <= STEPS) {
    const from = noOfQuestions
      .slice(0, currentStep - 1)
      .reduce((a, b) => a + b, 0);
    const to = noOfQuestions[currentStep - 1] + from;
    submitButtonDom.textContent = getTextContent(currentStep);
    // hide all current fields
    const fildsets = document.querySelectorAll("fieldset");
    fildsets.forEach((fieldset) => {
      fieldset.classList.add("hidden");
    });

    updateForm(from, to);
    return;
  }
  const toast = document.querySelector(".toast");
  toast.classList.remove("hidden");
}

function clearErrors() {
  const error = document.querySelectorAll(".error");
  error.forEach((err) => {
    err.classList.add("hidden");
  });
}

function handleSelect(e) {
  const dropDown = document.querySelector(".open_dropdown");
  const selectOptions = document.querySelectorAll(".select_option");
  const selectButton = document.querySelector(".select_button");
  const span = selectButton.querySelector("span");
  const select = document.querySelector("select");
  select.value = e.currentTarget.textContent;
  span.textContent = e.currentTarget.textContent;

  dropDown.classList.add("hidden");

  selectOptions.forEach(
    (opt) => (opt.innerHTML = opt.innerHTML.replace(checkIcon, ""))
  );

  e.currentTarget.innerHTML += checkIcon;

  e.currentTarget.classList.add("active");
}

function handleSelectClick(e) {
  const dropDown = e.currentTarget.parentNode.querySelector(".open_dropdown");
  dropDown.classList.toggle("hidden");
  clearErrors();
}

submitButtonDom.addEventListener("click", handleSubmit);
submitButtonDom.textContent = getTextContent(currentStep);

updateForm(from, to);
