let tl = gsap.timeline({ delay: 0.2 });

tl.from("#hero > p", {
  duration: 0.3,
  opacity: 0,
  x: -200,
  ease: "power4.in",
  stagger: 0.1,
});
tl.from("#hero > h1", {
  duration: 0.3,
  opacity: 0,
  x: -200,
  ease: "power4.in",
});
tl.from("#layerBlob", {
  duration: 0.8,
  scale: 0,
  transformOrigin: "center",
});
tl.from(
  "#layerPc",
  {
    duration: 0.5,
    y: -150,
    opacity: 0,
    scale: 0.5,
    transformOrigin: "center",
    ease: "expo.out",
  },
  "-=0.3"
);
tl.from("#layerPerson", { duration: 0.3, opacity: 0, y: 100 });
tl.from("#layerObjects", { duration: 0.3, opacity: 0, y: -100 });
tl.from("#layerPopups > *", {
  duration: 0.3,
  scale: 0,
  opacity: 0,
  stagger: 0.1,
});
tl.from("#cta", {
  duration: 0.6,
  opacity: 0,
  x: -200,
  ease: "bounce",
  delay: 0.2,
});
tl.to("#layerPopups > *", {
  duration: 0.4,
  scale: gsap.utils.random(1.2, 1.3, 0.1, true),
  stagger: {
    each: 1.5,
    from: "random",
    repeat: 1,
    yoyo: true,
  },
  ease: "elastic.out(1, 0.5)",
  rotate: gsap.utils.random(-45, 45, 5, true),
  transformOrigin: "center",
  repeat: -1,
});
