function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function update() {
    // actions = document.querySelectorAll(".actions button")
    choices = document.querySelectorAll(".lrn-assess-item[style*='visibility'] .lrn-input")
}

let actions, choices = null;

waitForElm(".nav-container").then((_actions) => {
    actions = _actions.querySelectorAll("button");
    const slides = document.querySelector(".slides-control")
    const observer = new MutationObserver(mutations => {
        update();
    })
    observer.observe(slides, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
})

waitForElm(".lrn-assess-item[style*='visibility']").then((_choices) => {
    update()
})

function back() {
    actions[0].click();
}

function forward() {
    actions[1].click();
}

function select(choice) {
    choices[choice].click();
}

const shortcuts = {
    "ArrowLeft": back,
    "ArrowRight": forward,
    "Digit1": () => select(0),
    "Digit2": () => select(1),
    "Digit3": () => select(2),
    "Digit4": () => select(3),
    "Digit5": () => select(4)
}

document.addEventListener('keydown', (event) => {
    // var name = event.key;
    var code = event.code;

    if (!(code in shortcuts)) return;
    // if (actions == null || choices == null)

    shortcuts[code]();

    // alert(`Key pressed ${name} \r\n Key code: ${code}`);
})