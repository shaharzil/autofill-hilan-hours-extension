document.getElementById("fillHoursBtn").addEventListener("click", () => {
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  chrome.storage.local.set(
    { startTime: startTime, endTime: endTime, fillRequested: true },
    () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (
          tabs[0].url.includes("Attendance/calendarpage.aspx?isOnSelf=true")
        ) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "fillHours",
            startTime,
            endTime,
          });
          chrome.storage.local.remove(
            ["fillRequested", "startTime", "endTime"],
            () => {}
          );
        } else {
          chrome.scripting.executeScript(
            {
              target: { tabId: tabs[0].id },
              func: clickNavigationButton,
            },
            () => {}
          );
        }
      });
    }
  );
});

function clickNavigationButton() {
  const reportAndUpdateButton = document.querySelector(".fh-report-1");
  if (reportAndUpdateButton) {
    reportAndUpdateButton.click();
  }
}
