const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.next));
});

const memories = [
  {
    image: "photos/photo1.jpg",
    title: "Where It All Started",
    caption: "Somehow, this ordinary moment became one of the memories I never want to forget. ❤️"
  },
  {
    image: "photos/photo2.jpg",
    title: "Just Us",
    caption: "Different places, silly pictures, and you making every moment better."
  },
  {
    image: "photos/photo3.jpg",
    title: "Your Hand in Mine",
    caption: "Maybe it's just a picture of our hands, but it holds a feeling I could never explain."
  },
  {
    image: "photos/photo4.jpg",
    title: "Our Kind of Crazy",
    caption: "Because apparently, being normal was never really our thing. 😂❤️"
  },
  {
    image: "photos/photo5.jpg",
    title: "Just You & Me",
    caption: "The best part of every little journey is having you beside me."
  }
];

let current = 0;
const image = document.getElementById("memoryImage");
const title = document.getElementById("memoryTitle");
const caption = document.getElementById("memoryCaption");
const number = document.getElementById("memoryNumber");
const dots = document.getElementById("dots");

memories.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.setAttribute("aria-label", `Go to memory ${i + 1}`);
  dot.addEventListener("click", () => setMemory(i));
  dots.appendChild(dot);
});

function setMemory(index) {
  current = (index + memories.length) % memories.length;
  const m = memories[current];

  image.src = m.image;
  title.textContent = m.title;
  caption.textContent = m.caption;
  number.textContent = `${String(current + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;

  [...dots.children].forEach((d, i) => d.classList.toggle("active", i === current));
}

document.getElementById("prevBtn").addEventListener("click", () => setMemory(current - 1));
document.getElementById("nextBtn").addEventListener("click", () => setMemory(current + 1));
document.getElementById("continueBtn").addEventListener("click", () => showScreen("letterIntro"));
setMemory(0);

// Four-digit PIN. Kept only in JS; never rendered into the page.
const correctPin = "0204";
const pinInputs = [...document.querySelectorAll("#pinBoxes input")];
const pinError = document.getElementById("pinError");

pinInputs.forEach((input, i) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && i < pinInputs.length - 1) pinInputs[i + 1].focus();
    pinError.textContent = "";
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Backspace" && !input.value && i > 0) {
      pinInputs[i - 1].focus();
    }
    if (e.key === "Enter") unlock();
  });

  input.addEventListener("paste", e => {
    e.preventDefault();
    const digits = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4);
    digits.split("").forEach((d, j) => { if (pinInputs[j]) pinInputs[j].value = d; });
    if (digits.length) pinInputs[Math.min(digits.length, 4) - 1].focus();
  });
});

function unlock() {
  const entered = pinInputs.map(i => i.value).join("");
  if (entered.length !== 4) {
    pinError.textContent = "Please enter all four digits ❤️";
    return;
  }
  if (entered === correctPin) {
    pinError.textContent = "";
    createHearts(28);
    showScreen("letter");
  } else {
    pinError.textContent = "Not quite... think again, my love ❤️";
    pinInputs.forEach(i => i.value = "");
    pinInputs[0].focus();
  }
}

document.getElementById("unlockBtn").addEventListener("click", unlock);

function createHearts(count) {
  const holder = document.getElementById("hearts");
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = Math.random() > .25 ? "♥" : "♡";
    h.style.left = `${Math.random() * 100}%`;
    h.style.fontSize = `${12 + Math.random() * 20}px`;
    h.style.animationDuration = `${3 + Math.random() * 4}s`;
    h.style.animationDelay = `${Math.random() * 1.4}s`;
    holder.appendChild(h);
    setTimeout(() => h.remove(), 8500);
  }
}
