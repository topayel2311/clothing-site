const STORAGE_KEY = "topayelData";
const fields = document.querySelectorAll(".field");
const pngInput = document.getElementById("pngInput");
const preview = document.getElementById("preview");
const status = document.getElementById("status");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    fields.forEach((field) => {
      if (data[field.dataset.key]) field.value = data[field.dataset.key];
    });
    if (data.image) preview.src = data.image;
  } catch (error) {
    status.textContent = "Could not read saved data.";
  }
}

function collect() {
  const data = { image: preview.src || "" };
  fields.forEach((field) => {
    data[field.dataset.key] = field.value.trim();
  });
  return data;
}

fields.forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.toggle("filled", field.value.trim() !== "");
  });
});

pngInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.type !== "image/png") {
    status.textContent = "Only PNG files are allowed.";
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    status.textContent = file.name + " loaded";
  };
  reader.onerror = () => {
    status.textContent = "Could not read the file.";
  };
  reader.readAsDataURL(file);
});

saveBtn.addEventListener("click", () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collect()));
    status.textContent = "Saved.";
  } catch (error) {
    status.textContent = "Save failed. Image may be too large.";
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  fields.forEach((field) => {
    field.value = "";
    field.classList.remove("filled");
  });
  preview.removeAttribute("src");
  pngInput.value = "";
  status.textContent = "Cleared.";
});

const bannerBtn = document.getElementById("bannerBtn");

bannerBtn.addEventListener("click", () => {
  document.querySelector(".container").scrollIntoView({ behavior: "smooth" });
});

const menuBtn = document.getElementById("menuBtn");
const headerNav = document.querySelector(".site-header nav");
const menuPanel = document.getElementById("menuPanel");

function closeMenu() {
  headerNav.classList.remove("open");
  menuPanel.classList.remove("open");
  menuBtn.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {
  const open = !menuPanel.classList.contains("open");
  menuPanel.classList.toggle("open", open);
  headerNav.classList.toggle("open", open);
  menuBtn.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", String(open));
});

const contactLink = document.getElementById("contactLink");
const contactInfo = document.getElementById("contactInfo");

const itemButtons = document.querySelectorAll(".item-btn");
const itemView = document.getElementById("itemView");

const pictures = {
  shirt: `<svg class="menu-pic" viewBox="0 0 100 100" aria-label="Shirt">
      <path d="M36 20 L22 26 L16 42 L29 48 L29 90 L71 90 L71 48 L84 42 L78 26 L64 20 L50 34 Z" fill="#27ae60" />
      <path d="M50 34 L50 90" stroke="#1e8449" stroke-width="3" />
    </svg>`,
  tshirt: `<svg class="menu-pic" viewBox="0 0 100 100" aria-label="T-Shirt">
      <path d="M35 22 L20 30 L14 45 L28 52 L28 88 L72 88 L72 52 L86 45 L80 30 L65 22 Q50 32 35 22 Z" fill="#2e86de" />
    </svg>`,
  polo: `<svg class="menu-pic" viewBox="0 0 100 100" aria-label="Polo Shirt">
      <path d="M35 20 L20 28 L15 44 L28 50 L28 90 L72 90 L72 50 L85 44 L80 28 L65 20 L50 32 Z" fill="#8e44ad" />
      <path d="M40 20 L50 34 L60 20 Z" fill="#6c3483" />
    </svg>`,
  pant: `<svg class="menu-pic" viewBox="0 0 100 100" aria-label="Pant">
      <path d="M32 14 L68 14 L70 46 L66 90 L54 90 L50 56 L46 90 L34 90 L30 46 Z" fill="#34495e" />
    </svg>`,
};

itemButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.querySelector(".item-name").textContent;
    itemView.innerHTML = pictures[button.dataset.item] + "<p>" + name + "</p>";
    itemButtons.forEach((other) => other.classList.remove("active"));
    button.classList.add("active");
  });
});

contactLink.addEventListener("click", (event) => {
  event.preventDefault();
  contactInfo.classList.toggle("show");
  closeMenu();
});

load();
fields.forEach((field) => {
  field.classList.toggle("filled", field.value.trim() !== "");
});
