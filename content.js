function onClick(e, issueId) {
    e.stopPropagation();
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    let url = window.location.origin + "/rest/api/2/issue/" + issueId + "/transitions";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        transition: {
            id: 41,
        }
    }));
    window.location.reload();
    return false;
}

function addResolveButtons() {
    if (!document.querySelector('[data-test-id^="global-pages.home.ui.tab-container.contents"]')) {
        return
    }

    let elements = document.querySelectorAll('[data-test-id^="global-pages.home.ui.tab-container.tab.item-list.item-link#issue" i]');
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element.querySelector('#resolve-button')) {
            continue;
        }
        let tokens = element.href.split('/');
        let issueId = tokens[tokens.length - 1];
        let button = document.createElement("BUTTON");
        button.id = "resolve-button";
        button.innerText = "✓";
        button.onclick = (e) => onClick(e, issueId);
        button.onmouseover=()=>{
            button.style.backgroundColor='#4CAF50';
            button.style.color='white';
        };
        button.onmouseout=()=>{
            button.style.backgroundColor='white';
            button.style.color='#303030';
        };
        button.style = "background-color: white; border-radius: 8px; color: #303030; cursor: pointer; border: 2px solid rgb(32, 32, 32); margin-right: 10px"
        element.insertBefore(button, element.firstChild);
    }
}

function addResolveButtonsBacklog() {
    let elements = document.getElementsByClassName("ghx-issue-content");
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element.querySelector('#resolve-button')) {
            continue;
        }
        let issueId = element.parentElement.getAttribute('data-issue-key')
        let button = document.createElement("BUTTON");
        button.id = "resolve-button";
        button.innerText = "✓";
        button.onclick = (e) => onClick(e, issueId);
        button.onmouseover=()=>{
            button.style.backgroundColor='#4CAF50';
            button.style.color='white';
        };
        button.onmouseout=()=>{
            button.style.backgroundColor='white';
            button.style.color='#303030';
        };
        button.style = "background-color: white; border-radius: 8px; color: #303030; cursor: pointer; border: 2px solid rgb(32, 32, 32); margin-left: 8px; margin-right: -5px;"
        element.insertBefore(button, element.firstChild);
        let nameElement = element.querySelector('[class="ghx-row ghx-plan-main-fields"]');
        nameElement.style.display = "inline-block";
    }
}

// initial run
addResolveButtons();

let targetNode = document.querySelector('[data-testid="Content"]');
const observerOptions = {
    childList: true,
    subtree: true,
};
const observer = new MutationObserver(addResolveButtons);
if (targetNode) {
    observer.observe(targetNode, observerOptions);
}


let targetNodeBacklog = document.querySelector('#ghx-content-main');
const observerOptionsBacklog = {
    childList: true,
    subtree: true,
};
const observerBacklog = new MutationObserver(addResolveButtonsBacklog);
if (targetNodeBacklog) {
    observerBacklog.observe(targetNodeBacklog, observerOptionsBacklog);
}
