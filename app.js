class FixedSizeQueue {
    constructor() {
        this.maxSize = 15
        this.items = [];
        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const savedQueue = localStorage.getItem('myQueue');
        this.items = savedQueue ? JSON.parse(savedQueue) : [];
    }

    enqueue(item) {
        const currentSize = this.size();
        if (currentSize < this.maxSize && this.items[currentSize - 1] !== item) {
            this.items.push(item);
            this.saveToLocalStorage();
        } else if (currentSize === this.maxSize && this.items[currentSize - 1] !== item) {
            this.dequeue();
            this.items.push(item);
            this.saveToLocalStorage();
        }
    }
    
    saveToLocalStorage() {
        localStorage.setItem('myQueue', JSON.stringify(this.items));
    }
    
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.shift();
    }
  
    showSelectedIndex(i) {
      if (this.isEmpty()) {
        return null;
      }
      return this.items[i];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    size() {
      return this.items.length;
    }
  }
const myQueue = new FixedSizeQueue();
populateSidebar()


// Call the function to populate the sidebar


const editor = ace.edit("editor", {
    mode: "ace/mode/json",
    selectionStyle: "text",
    showPrintMargin: !1,
    theme: "ace/theme/chrome",
    highlightActiveLine: false,
    cursorStyle: 'slim',
    highlightGutterLine: false,
    fontSize: 14
}),
    formatText = (e = 0) => {
        try {
            var t;
            returnOriginalValue(), "" !== editor.getValue() ? (t = JSON.parse(editor.getValue()), (myQueue.enqueue(JSON.stringify(t,null, e))),populateSidebar(), editor.setValue(JSON.stringify(t,null, e)), editor.focus(), editor.selectAll(), 0 !== e && validState()) : alert("I think you are not clear about your goals.")
        } catch (e) {
            error()
        }
    };
editor.focus();
editor.on("paste", e => {
    try {
        returnOriginalValue(), e.text = JSON.stringify(JSON.parse(e.text), null, 4), validState()
    } catch (e) {
        error()
    }
});
const clearText = () => {
    try {
        returnOriginalValue(), editor.setValue(null), editor.focus()
    } catch (e) { }
},
    validState = () => {
        document.getElementById("valid-state").style.display = "block"
    },
    error = () => {
        document.getElementById("error").style.display = "block"
    },
    changeThemeToDark = () => {
        document.documentElement.setAttribute("data-theme", "dark")
        editor.setOptions({
            theme: 'ace/theme/tomorrow_night'
        })
    },
    returnOriginalValue = () => {
        document.getElementById("error").style.display = "none", document.getElementById("valid-state").style.display = "none"
    };
document.getElementById("minify").addEventListener("click", () => formatText()),
document.getElementById("beautify").addEventListener("click", () => formatText(4)),
document.getElementById("clear").addEventListener("click", () => clearText());
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage;                            //Webkit, Safari, Chrome
});

function populateSidebar() {
    var historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    const savedQueue = localStorage.getItem('myQueue');
    const queueToShow = savedQueue ? JSON.parse(savedQueue) : [];
    for (let i = 0; i < queueToShow.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = queueToShow[i];
        listItem.classList.add("history-item");
        listItem.addEventListener("click", function () {
            handleClick(queueToShow[i]);
        });
        historyList.appendChild(listItem);
    }
}

function handleClick(item) {
    editor.setValue(JSON.stringify(JSON.parse(item)))
    closeHistoryPanel()
}

function openHistoryPanel() {
    var historyPanel = document.getElementById("historyPanel");
    historyPanel.style.width = "350px";
    historyPanel.classList.add("show");
    document.getElementById("closeBtn").style.display = 'block';
}

function closeHistoryPanel() {
    var historyPanel = document.getElementById("historyPanel");
    historyPanel.style.width = "0";
    historyPanel.classList.remove("show");
    document.getElementById("closeBtn").style.display = 'none';
}

function toggleHistoryPanel(event) {
    var historyPanel = document.getElementById("historyPanel");
    
    if (historyPanel.classList.contains("show")) {
        closeHistoryPanel();
    } else {
        openHistoryPanel();
    }

    // Prevent the click event from propagating further (e.g., to the document click listener)
    event.stopPropagation();
}

var historyButton = document.getElementById("history");
historyButton.addEventListener("click", toggleHistoryPanel);

var closeButton = document.getElementById("closeBtn");
closeButton.addEventListener("click",closeHistoryPanel)

document.addEventListener("click", function (event) {
    var historyPanel = document.getElementById("historyPanel");

    if (!historyPanel.contains(event.target) && historyPanel.classList.contains("show")) {
        // Clicked outside the history panel, close it
        closeHistoryPanel();
    }
});


window.onbeforeunload = function (e) {
    var message = "Are you sure ?";
    var firefox = /Firefox[\/\s](\d+)/.test(navigator.userAgent);
    if (firefox) {
        //Add custom dialog
        //Firefox does not accept window.showModalDialog(), window.alert(), window.confirm(), and window.prompt() furthermore
        var dialog = document.createElement("div");
        document.body.appendChild(dialog);
        dialog.id = "dialog";
        dialog.style.visibility = "hidden";
        dialog.innerHTML = message;
        var left = document.body.clientWidth / 2 - dialog.clientWidth / 2;
        dialog.style.left = left + "px";
        dialog.style.visibility = "visible";
        var shadow = document.createElement("div");
        document.body.appendChild(shadow);
        shadow.id = "shadow";
        //tip with setTimeout
        setTimeout(function () {
            document.body.removeChild(document.getElementById("dialog"));
            document.body.removeChild(document.getElementById("shadow"));
        }, 0);
    }
    return message;
};
