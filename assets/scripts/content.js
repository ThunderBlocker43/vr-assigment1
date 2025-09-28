const ROCKET_INFO = "#rocket-info";
const XML = new URL("../rocket-info.xml", import.meta.url).href;

function el(tag, attr = {}, ...children) {
    const node = document.createElement(tag);
    for(const [key, value] of Object.entries(attr)) {
        if (value == null) continue;
        if (key === "class") node.className = value;
        else if (key === "dataset") Object.assign(node.dataset, value);
        else if (key in node) node[key] = value;
        else node.setAttribute(key, value);
    }
    for(const child of children) {
        if (child == null) continue;
        node.append(child.nodeType ? child : document.createTextNode(child));
    }
    return node;
}

async function loadXML(url){
    const response = await fetch(url, {cache: "no-cache"});
    if (!response.ok) throw new Error(`Failed to fetch XML: ${response.status} ${response.statusText}`);
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "application/xml");
    const parserError = doc.querySelector("parsererror");
    if (parserError) throw new Error("XML parse error");
    return doc;
}

function renderInformation(xmlDoc) {
    const container = document.querySelector(ROCKET_INFO);
    if (!container) return;
    container.innerHTML = "";

    const items = Array.from(xmlDoc.querySelectorAll("information > item"));
    if (items.length === 0) {
        container.append(el("p", {}, "No entries yet."));
        return;
    }

    for (const item of items) {
        const type = item.getAttribute("type") || "photo";
        const src = item.getAttribute("src");
        const poster = item.getAttribute("poster") || "";
        const title = item.querySelector("title")?.textContent?.trim() || "Untitled";
        const text = item.querySelector("text")?.textContent?.trim() || "";

        const media =
            type === "video"
            ? el("video", {
                src,
                poster,
                controls: true,
                preload: "metadata",
                })
            : el("img", {
                src,
                alt: title,
                loading: "lazy",
                decoding: "async"
            });

        const card = el(
            "article",
            { class: "rocket-card" },
            media,
            el("h2", { class: "rocket-title" }, title),
            el("p", { class: "rocket-text" }, text)
        );

        container.append(card);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const xml = await loadXML(XML);
        renderInformation(xml);
    } catch (error) {
        console.error(error);
        const container = document.querySelector(ROCKET_INFO);
        if (container) container.textContent = "Failed to load information.";
    }
})