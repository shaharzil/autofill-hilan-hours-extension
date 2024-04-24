chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "fillHours" && document.readyState === "complete") {
    fillHours(request.startTime, request.endTime);
  }
});

function fillHours(startTime, endTime) {
  const RefreshErrorsDays = document.getElementById(
    "ctl00_mp_RefreshErrorsDays"
  );
  if (RefreshErrorsDays) {
    RefreshErrorsDays.click();
  }
  setTimeout(() => {
    const manualEntryInputs = document.querySelectorAll(
      "input[id*='ManualEntry']"
    );
    const manualExitInputs = document.querySelectorAll(
      "input[id*='ManualExit']"
    );
    if (manualEntryInputs.length && manualExitInputs.length) {
      manualEntryInputs.forEach((input) => {
        input.dispatchEvent(new Event('focus'));
        input.value = startTime;
        input.dispatchEvent(new Event('blur'));
      });
      manualExitInputs.forEach((input) => {
        input.dispatchEvent(new Event('focus'));
        input.value = endTime;
        input.dispatchEvent(new Event('blur'));
      });
    }
  }, 3000);
}
