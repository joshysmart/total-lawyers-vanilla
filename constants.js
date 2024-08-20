const RATING = 4.5;

const fullStar = `
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <g fill="none">
    <path d="M0 0h24v24H0V0z"></path>
    <path d="M0 0h24v24H0V0z"></path>
  </g>
  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
</svg>`;

const halfStar = `
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" d="M0 0h24v24H0z"></path>
  <path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
</svg>`;

const emptyStar = `
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" d="M0 0h24v24H0z"></path>
  <path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
</svg>`;

const checkIcon = `
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" d="M0 0h24v24H0z"></path>
  <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
</svg>`;

const caretDown = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true">
  <path d="m6 9 6 6 6-6"></path>
</svg>`;

const tos = `
<p style="font-size: 12px; color: #8F8F8F; line-height: 1rem;">
  By submitting this form I agree to the&nbsp;<a href="#" style="text-decoration: underline; color: #2376FF;">Terms of Use</a>
  and&nbsp;<a style="text-decoration:underline; color: #2376FF" href="#">Privacy Policy</a>&nbsp;and consent to be contacted by Martindale-Nolo
  and its affiliates, and up to three attorneys regarding this request and to receiving relevant marketing messages by automated means,
  text and/or prerecorded messages at the number provided. Consent is not required as a condition of service,&nbsp;<a style="text-decoration: underline; color: #2376FF;" href="#">Click Here</a>
  &nbsp;to agree without providing consent to be contacted by automated means, text and/or prerecorded messages. Rates may apply.
</p>`;

const disclaimer = `
<p class="text-xs text-[#8F8F8F]">
  You should not send any sensitive or confidential information through this site. Any information sent through this site does not create
  an attorney-client relationship and may not be treated as privileged or confidential. The lawyer or law firm you are contacting is not
  required to, and may choose not to, accept you as a client. The Internet is not necessarily secure and emails sent through this site
  could be intercepted or read by third parties.
</p>`;

const form = [
  {
    question: "How old are you?",
    inputs: [
      {
        name: "age",
        id: "age",

        type: "select",
        placeholder: "Select an answer",
        error: "Please select your age",
        options: [
          "18-24",
          "25-34",
          "35-44",
          "45-54",
          "55-64",
          "65+",
          "Prefer not to say",
        ],
      },
    ],
  },
  {
    question:
      "Do you expect to be out of work for at least a year due to your health?",
    inputs: [
      {
        name: "health",
        error: "Health check is required",
        id: "health",
        type: "radio",
        options: ["yes", "no"],
      },
    ],
  },
  {
    question:
      "Have you been treated by a doctor, hospital, or clinic in the last year?",
    inputs: [
      {
        error: "Health check is required",
        name: "treatment",
        id: "treatment",
        type: "radio",
        options: ["yes", "no"],
      },
    ],
  },
  {
    question: "Have you had a full time job within the past 5 years?",
    inputs: [
      {
        error: "Job history is required",
        name: "job",
        id: "job",
        type: "radio",
        options: ["yes", "no"],
      },
    ],
  },
  {
    question: "Do you already receive Social Security benefits?",
    inputs: [
      {
        name: "socialsBenefits",
        error: "Social security benefits history is required",
        type: "radio",
        options: ["yes", "no"],
      },
    ],
  },
  {
    question: "Have you hired an advocate or attorney to help get benefits?",
    inputs: [
      {
        name: "benefitsAttourney",
        error: "Benefits attorney is required",
        type: "radio",
        options: ["yes", "no"],
      },
    ],
  },
  {
    question: "What’s your zip code?",
    inputs: [
      {
        name: "zipCode",
        error: "Zip code is required",
        type: "text",
        id: "zipCode",
      },
    ],
  },
  {
    question:
      "Please briefly list the health conditions that prevent you from working.",
    inputs: [
      {
        name: "healthConditions",
        error: "Health conditions are required",
        type: "textarea",
        id: "healthConditions",
      },
    ],
  },
  {
    question: "What is your full name",
    inputs: [
      {
        name: "firstName",
        error: "Full name is required",
        id: "firstName",
        type: "text",
        placeholder: "First Name",
      },
      {
        name: "lastName",
        error: "Full name is required",
        id: "lastName",
        type: "text",
        placeholder: "Last Name",
      },
    ],
  },
  {
    question: "What’s your telephone number?",
    inputs: [
      {
        name: "phoneNumber",
        error: "Phone number is required",
        id: "phoneNumber",
        type: "tel",
      },
    ],
  },
  {
    question: "What’s your email address?",
    inputs: [
      {
        name: "email",
        id: "email",
        error: "Email is required",
        type: "email",
      },
    ],
  },
];
