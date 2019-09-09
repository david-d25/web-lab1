(function() {

  const MIN_Y = -3;
  const MAX_Y = 5;

  const ACCEPTED_XS = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  const ACCEPTED_RS = [1, 2, 3, 4, 5];

  let errMsgPanel = document.getElementById('err-msg');
  let submitButton = document.getElementById('submit-btn');
  let rCheckBoxes = document.querySelectorAll('input[name="r"]');
  let xRadioButtons = document.querySelectorAll('input[name="x"]');
  let yText = document.getElementById("y");

  submitButton.addEventListener("click", onSubmit);

  function setErrorMsg(msg) {
    errMsgPanel.innerText = msg;
    if (msg != null)
      errMsgPanel.classList.remove("hidden");
    else
      errMsgPanel.classList.add("hidden");
  }

  function onSubmit(event) {
    if (!(checkX() && checkY() && checkR()))
      event.preventDefault();
  }

  window.cx = checkX;
  function checkX() {
    for (let i = 0; i < xRadioButtons.length; i++) {
      if (xRadioButtons[i].checked) {
        if (ACCEPTED_XS.indexOf(+xRadioButtons[i].value) === -1)   {
          setErrorMsg("HACKING ATTEMPT");
          return false;
        }
        return true;
      }
    }
    setErrorMsg("Следует выбрать X");
    return false;
  }

  function checkY() {
    yText.value = yText.value.trim();

    if (yText.value.length === 0) {
      setErrorMsg("Поле Y обязательно");
      return false;
    }

    if (isNaN(yText.value.replace(',', '.'))) {
      setErrorMsg("В поле Y следует ввести число");
      return false;
    }
    let val = +yText.value;
    if (val <= MIN_Y || val >= MAX_Y) {
      setErrorMsg(`Y должен лежать в (${MIN_Y} ; ${MAX_Y})`);
      return false;
    }
    return true;
  }

  function checkR() {
    let selected = null;
    for (let i = 0; i < rCheckBoxes.length; i++) {
      if (rCheckBoxes[i].checked) {
        if (selected) {
          setErrorMsg("Следует выбрать один R");
          return false;
        }

        if (ACCEPTED_RS.indexOf(+rCheckBoxes[i].value) === -1)   {
          setErrorMsg("HACKING ATTEMPT");
          return false;
        }

        selected = rCheckBoxes[i].value;
      }
    }
    if (!selected) {
      setErrorMsg("Следует выбрать R");
      return false;
    }
    return true;
  }
})();