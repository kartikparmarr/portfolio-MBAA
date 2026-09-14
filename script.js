const links = document.querySelectorAll("nav a");
const sections = [...links].map((link) => {
  const id = link.getAttribute("href").slice(1);
  return document.getElementById(id);
});

const setActive = () => {
  const y = window.scrollY + 90;
  let current = sections[0];
  for (const section of sections) {
    if (section && section.offsetTop <= y) current = section;
  }
  links.forEach((link) => {
    const on = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("active", Boolean(on));
  });
};

window.addEventListener("scroll", setActive, { passive: true });
setActive();

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduce || typeof anime === "undefined") {
  document.documentElement.classList.remove("anime-on");
  document.querySelectorAll(".bar span").forEach((bar) => {
    bar.style.width = `${bar.dataset.width}%`;
  });
} else {

  const fadeUp = (targets, options = {}) =>
    anime({
      targets,
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 780,
      easing: "easeOutCubic",
      delay: anime.stagger(90),
      ...options,
    });

  anime
    .timeline({ easing: "easeOutCubic" })
    .add({
      targets: ".topbar",
      opacity: [0, 1],
      translateY: [-18, 0],
      duration: 620,
    })
    .add(
      {
        targets: ".eyebrow",
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 520,
      },
      "-=180"
    )
    .add(
      {
        targets: ".hero h1 span",
        opacity: [0, 1],
        translateX: [-48, 0],
        duration: 920,
        delay: anime.stagger(140),
      },
      "-=220"
    )
    .add(
      {
        targets: ".lede, .hero-note, .hero .pun",
        opacity: [0, 1],
        translateY: [22, 0],
        duration: 700,
        delay: anime.stagger(110),
      },
      "-=480"
    );

  const playSection = (section) => {
    const head = section.querySelectorAll(".section-head");
    const puns = section.querySelectorAll(":scope > .pun");
    const value = section.querySelectorAll(".value");
    const intro = section.querySelectorAll(".intro");
    const split = section.querySelectorAll(".split > *");
    const future = section.querySelectorAll(".future");
    const rules = section.querySelectorAll(".rule");
    const channels = section.querySelectorAll(".channels > div");
    const gauges = section.querySelectorAll(".gauge-list article");
    const bars = section.querySelectorAll(".bar span");
    const wellbeing = section.querySelectorAll(".wellbeing > div");
    const takes = section.querySelectorAll(".takes article");
    const briefcase = section.querySelectorAll(".briefcase");
    const proof = section.querySelectorAll(".proof article");

    if (head.length) fadeUp(head);
    if (value.length) fadeUp(value, { delay: 120 });
    if (puns.length) fadeUp(puns, { delay: 180 });
    if (intro.length) fadeUp(intro, { delay: 80 });
    if (split.length) fadeUp(split, { delay: anime.stagger(120, { start: 140 }) });
    if (future.length) fadeUp(future, { delay: 220 });
    if (rules.length) fadeUp(rules, { delay: anime.stagger(90, { start: 160 }) });
    if (channels.length) fadeUp(channels, { delay: anime.stagger(110, { start: 180 }) });
    if (gauges.length) fadeUp(gauges, { delay: anime.stagger(100, { start: 80 }) });
    if (wellbeing.length) fadeUp(wellbeing, { delay: anime.stagger(110, { start: 200 }) });
    if (takes.length) fadeUp(takes, { delay: anime.stagger(120) });
    if (briefcase.length) fadeUp(briefcase, { delay: 160 });
    if (proof.length) fadeUp(proof, { delay: anime.stagger(140) });

    if (bars.length) {
      anime({
        targets: bars,
        width: (el) => `${el.dataset.width}%`,
        duration: 1100,
        delay: anime.stagger(120, { start: 280 }),
        easing: "easeOutExpo",
      });
    }
  };

  const seen = new Set();
  const watch = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        playSection(entry.target);
        watch.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll("main > section:not(.hero)").forEach((section) => {
    watch.observe(section);
  });

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      anime({
        targets: link,
        color: "#f0c36a",
        duration: 220,
        easing: "easeOutQuad",
      });
    });
    link.addEventListener("mouseleave", () => {
      if (link.classList.contains("active")) return;
      anime({
        targets: link,
        color: "#b7aa96",
        duration: 220,
        easing: "easeOutQuad",
      });
    });
  });
}
