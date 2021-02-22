gsap.registerPlugin(ScrollTrigger);

/* HERO SECTION ANIMATION */
//popups infinite animation | scrollbased pause/resume at bottom
let popupsTL = gsap.timeline({
  delay: 0.2,
  paused: true,
});
popupsTL.to("#layerPopups > *", {
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
//onLoad animation
let heroTL = gsap.timeline({ delay: 0.2, onComplete: () => popupsTL.play() });
heroTL.from("#hero p", {
  duration: 0.3,
  opacity: 0,
  x: -200,
  ease: "power4.in",
  stagger: 0.1,
});
heroTL.from("#hero h1", {
  duration: 0.3,
  opacity: 0,
  x: -200,
  ease: "power4.in",
});
heroTL.from("#layerBlob", {
  duration: 0.8,
  scale: 0,
  transformOrigin: "center",
});
heroTL.from(
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
heroTL.from("#layerPerson", { duration: 0.3, opacity: 0, y: 100 });
heroTL.from("#layerObjects", { duration: 0.3, opacity: 0, y: -100 });
heroTL.from("#layerPopups > *", {
  duration: 0.3,
  scale: 0,
  opacity: 0,
  stagger: 0.1,
});
heroTL.from("#cta", {
  duration: 0.6,
  opacity: 0,
  x: -200,
  ease: "bounce",
  delay: 0.2,
});

/*================= SCROLL ANIMATIONS =================*/
ScrollTrigger.defaults({
  toggleActions: "restart none reverse none",
});

ScrollTrigger.matchMedia({
  /***************** DESKTOP SCROLL ANIMATIONS *****************/
  "(min-width: 768px)": function () {
    /* PORTFOLIO SECTION ANIMATION */
    gsap.from("#proyect1 .left-col", {
      scrollTrigger: {
        trigger: "#proyect1",
        start: "top 75%",
        end: "top 75%",
      },
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power2",
    });
    gsap.from("#proyect1 .right-col", {
      scrollTrigger: {
        trigger: "#proyect1",
        start: "top 75%",
        end: "top 75%",
      },
      x: "80%",
      opacity: 0,
      duration: 0.5,
      ease: "power2",
    });
    /* PORTFOLIO SECTION ANIMATION */
    gsap.from("#proyect2 .left-col", {
      scrollTrigger: {
        trigger: "#proyect2",
        start: "top 75%",
        end: "top 75%",
      },
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power2",
    });
    gsap.from("#proyect2 .right-col", {
      scrollTrigger: {
        trigger: "#proyect2",
        start: "top 75%",
        end: "top 75%",
      },
      x: "80%",
      opacity: 0,
      duration: 0.5,
      ease: "power2",
    });

    /* ABOUT SECTION ANIMATION */
    gsap.from("#about .left-col", {
      scrollTrigger: {
        trigger: "#about h2",
        start: "bottom 75%",
        end: "bottom 75%",
      },
      x: "-80%",
      opacity: 0,
      duration: 0.5,
      ease: "power2",
    });
    gsap.from("#about .right-col", {
      scrollTrigger: {
        trigger: "#about h2",
        start: "bottom 75%",
        end: "bottom 75%",
      },
      x: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power2",
    });
  },
  /***************** MOBILE SCROLL ANIMATIONS *****************/
  "(max-width: 767px)": function () {
    /* PORTFOLIO SECTION ANIMATION */
    gsap.from("#proyect1 .right-col img", {
      scrollTrigger: {
        trigger: "#proyect1 .right-col",
        start: "top 75%",
        end: "top 75%",
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2",
    });
    // gsap.from("#proyect1 .left-col", {
    //   scrollTrigger: {
    //     trigger: "#proyect1 h2",
    //     start: "top 70%",
    //     end: "top 70%",
    //   },
    //   y: 100,
    //   opacity: 0,
    //   duration: 0.5,
    //   ease: "power2",
    // });

    /* ABOUT SECTION ANIMATION */
    gsap.from("#about .left-col img", {
      scrollTrigger: {
        trigger: "#about .left-col",
        start: "top 75%",
        end: "top 75%",
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2",
    });
    // gsap.from("#about .right-col", {
    //   scrollTrigger: {
    //     trigger: "#about h3",
    //     start: "top 70%",
    //     end: "top 70%",
    //   },
    //   y: 100,
    //   opacity: 0,
    //   duration: 0.5,
    //   ease: "power2",
    // });
  },

  /***************** GENERAL SCROLL ANIMATIONS *****************/
  all: function () {
    /* SKILLS SECTION ANIMATION */
    const cards = gsap.utils.toArray("#skills .card");
    cards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 80%",
        },
        scaleX: 0.5,
        opacity: 0,
        transformOrigin: "center",
        duration: 0.4,
        ease: "power2",
      });
      //animate their inner badges too
      let img_badges = card.querySelectorAll("img");
      gsap.from(img_badges, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2",
      });
    });
    /* ABOUT SECTION ANIMATION */
    gsap.from("#about .right-col a", {
      scrollTrigger: {
        trigger: "#about .right-col a",
        start: "bottom 95%",
        end: "bottom 95%",
      },
      scale: 0,
      opacity: 0,
      transformOrigin: "center",
      duration: 0.3,
      ease: "power2",
    });
    /* PORTFOLIO SECTION ANIMATION */
    gsap.from("#proyect1 .left-col a", {
      scrollTrigger: {
        trigger: "#proyect1 .left-col a",
        start: "bottom 95%",
        end: "bottom 95%",
      },
      scale: 0,
      opacity: 0,
      transformOrigin: "center",
      duration: 0.3,
      ease: "power2",
    });
    /* CONTACT SECTION ANIMATION */
    gsap.from("#contact form > *", {
      scrollTrigger: {
        trigger: "#contact h2",
        start: "top center",
        end: "top center",
      },
      scale: 0.5,
      opacity: 0,
      stagger: 0.15,
      transformOrigin: "center",
      duration: 0.2,
      ease: "power2",
    });
    //pause/resume popups infinite animation
    gsap.from("#hero-svg", {
      scrollTrigger: {
        trigger: "#hero-svg",
        start: "top center", //not used
        end: "bottom top",
        onLeave: () => popupsTL.pause(),
        onEnterBack: () => popupsTL.play(),
      },
      duration: 0.1,
    });
  },
});
