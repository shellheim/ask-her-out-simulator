const buttonAsk = document.getElementsByTagName("button")[0];
const buttonTryAgain = document.getElementsByClassName("try")[0];
const modal = document.getElementsByClassName("modal")[0];
const responseBox = document.getElementsByClassName("response-box")[0];

const url = "https://ask-her-out-simulator.vercel.app/api/proxy";

const fetchResponse = async () => {
  try {
    const request = await fetch(url, { method: "GET" });
    if (!request.ok) return null;
    const response = await request.json();
    return response.reason;
  } catch (err) {
    console.log(`Got error in fetching response : ${err}`);
  }
};

// fetch in background as soon as site loads
let pending = fetchResponse();

const showResponse = async () => {
  const reason = await pending;
  pending = fetchResponse();
  responseBox.innerHTML = "";
  responseBox.innerText = reason ?? "Error fetching response, try again";
  buttonTryAgain.classList.toggle("invisible");
};

buttonAsk.addEventListener("click", () => {
  modal.classList.toggle("invisible");
  showResponse();
});
buttonTryAgain.addEventListener("click", () => window.location.reload());
