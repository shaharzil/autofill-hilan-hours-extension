chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    changeInfo.status === "complete" &&
    tab.url.includes("Attendance/calendarpage.aspx?isOnSelf=true")
  ) {
    chrome.storage.local.get(
      ["fillRequested", "startTime", "endTime"],
      (items) => {
        if (items.fillRequested) {
          chrome.tabs.sendMessage(tabId, {
            action: "fillHours",
            startTime: items.startTime,
            endTime: items.endTime,
          });
        }
        chrome.storage.local.remove(
          ["fillRequested", "startTime", "endTime"],
          () => {}
        );
      }
    );
  }
});
