function applyFont(font) {
  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css?family=${font.replace(
    " ",
    "+"
  )}`;
  link.rel = "stylesheet";
  link.setAttribute("data-font-link", "true"); // Mark the link element
  document.head.appendChild(link);

  const style = document.createElement("style");
  style.setAttribute("data-font-style", "true");
  style.textContent = `
    body, body * {
      font-family: '${font}', sans-serif !important;
    }
  `;
  document.head.appendChild(style);

  // Force re-render
  document.body.style.display = "none";
  document.body.offsetHeight; // Trigger reflow
  document.body.style.display = "";

  // Save selected font in storage
  const domain = window.location.hostname;
  chrome.storage.sync.set({ [`selectedFont_${domain}`]: font });
}

function resetFont() {
  // Remove added stylesheet and style elements
  document
    .querySelectorAll("link[data-font-link], style[data-font-style]")
    .forEach((el) => el.remove());

  // Reset selected font in storage
  const domain = window.location.hostname;
  chrome.storage.sync.remove(`selectedFont_${domain}`);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeFont") {
    applyFont(request.font);
  } else if (request.action === "resetFont") {
    resetFont();
  }
});

// Apply saved font on page load
chrome.storage.sync.get(null, function (data) {
  const domain = window.location.hostname;
  const selectedFont = data[`selectedFont_${domain}`];

  if (selectedFont) {
    applyFont(selectedFont);
  }
});
