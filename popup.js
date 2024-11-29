document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const increaseButton = document.getElementById("increase");
    const decreaseButton = document.getElementById("decrease");
    const resetButton = document.getElementById("reset");

    const defaultSize = 16; // Default font size

    // Function to set font size on all elements
    const setFontSize = (size) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (size) => {
                    const allElements = document.querySelectorAll("*");
                    allElements.forEach((element) => {
                        element.style.fontSize = `${size}px`;
                    });
                },
                args: [size],
            });
        });
    };

    // Handle slider changes
    slider.addEventListener("input", () => setFontSize(slider.value));

    // Increase font size
    increaseButton.addEventListener("click", () => {
        let size = Math.min(parseInt(slider.value) + 1, 50);
        slider.value = size;
        setFontSize(size);
    });

    // Decrease font size
    decreaseButton.addEventListener("click", () => {
        let size = Math.max(parseInt(slider.value) - 1, 10);
        slider.value = size;
        setFontSize(size);
    });

    // Reset font size
    resetButton.addEventListener("click", () => {
        slider.value = defaultSize;
        setFontSize(defaultSize);
    });
});
