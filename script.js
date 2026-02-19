gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

document.addEventListener("DOMContentLoaded", () => {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.3,
    effects: true
  });

  gsap.set(".topHeader, #LucasHero, .cardAbout, .cardHow, .cardProject, .name", { 
    willChange: "transform, opacity" 
  });

const mm = gsap.matchMedia();

mm.add("(min-width: 1025px)", () => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "header",
      start: "top top",
      end: "+=800",
      scrub: 1.3,
      pin: true,
      anticipatePin: 1
    }
  });

  tl.from(".topHeader", { y: -100, opacity: 0, duration: 1 })
    .from("#LucasHero", { scale: 1.4, y: 100, opacity: 0, duration: 2, ease: "power3.out" }, 0)
    .from(".textHero h1", { x: 400, opacity: 0, duration: 2 }, 0.2)
    .from(".textHero h2", { x: -400, opacity: 0, duration: 2 }, 0.2)
    .from(".enter1", { x: -300, opacity: 0, duration: 2 }, 0.4)
    .from(".enter2", { x: 300, opacity: 0, duration: 2 }, 0.4)
    .to("#LucasHero", { scale: 1, duration: 4 }, 1)
    .to(".textHero", { y: -500, duration: 4 }, 1)
    .to(".enter1", { y: -300, duration: 4 }, 1)
    .to(".enter2", { y: -350, duration: 4 }, 1);

});

mm.add("(max-width: 1024px)", () => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "header",
      start: "top top",
      end: "+=800",
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  tl.from(".topHeader", { y: -100, opacity: 0, duration: 1 })
    .from("#LucasHero", { scale: 1.2, y: 80, opacity: 0, duration: 1.5 }, 0)
    .from(".textHero h1", { x: 200, opacity: 0, duration: 1.5 }, 0.2)
    .from(".textHero h2", { x: -200, opacity: 0, duration: 1.5 }, 0.2)
    .from(".enter1", { x: -150, opacity: 0, duration: 1.5 }, 0.4)
    .from(".enter2", { x: 150, opacity: 0, duration: 1.5 }, 0.4);

});

  ScrollTrigger.create({
    start: "top -50",
    onUpdate: (self) => {
      const indicator = document.querySelector(".scrollIndicator");
      if(indicator) {
        self.direction === 1 ? indicator.classList.add("hide") : indicator.classList.remove("hide");
      }
    }
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".aboutMe",
      start: "top 60%",
      toggleActions: "play none none reverse"
    }
  })
  .from(".titleAbout", { y: -50, opacity: 0, duration: 0.8 })
  .from(".cardAbout", { y: 100, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.4");

  gsap.timeline({
    scrollTrigger: {
      trigger: ".how",
      start: "top top",
      end: "+=1000",
      pin: true,
      scrub: 1.3,
    }
  })
  .from(".cardHow", {
    x: (i, target) => target.classList.contains("left") ? 500 : -500,
    opacity: 0,
    duration: 1,
    stagger: 0.5
  });

  const tlProject = gsap.timeline({
    scrollTrigger: {
      trigger: ".project",
      start: "top 60%",
      toggleActions: "play none none reverse"
    }
  });

  tlProject.from(".first", { y: -100, opacity: 0, duration: 1 })
    .from(".cardProject:not(.first)", {
      x: (i) => i === 0 ? -150 : 150,
      opacity: 0,
      duration: 0.8,
    }, "-=0.5")
    .from("#arrow, #arrow2", { scale: 0, opacity: 0, stagger: 0.2, ease: "elastic.out(1, 0.5)" }, "-=0.2");

  const arrowLeft = document.getElementById("arrow");
  const arrowRight = document.getElementById("arrow2");
  const projectContainer = document.querySelector(".project");
  let isAnimating = false;

  function updateCarousel(direction) {
    if (isAnimating || !projectContainer) return;
    isAnimating = true;

    const cards = document.querySelectorAll(".cardProject");
    
    gsap.to(cards, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (direction === "next") {
          projectContainer.insertBefore(cards[0], arrowRight);
        } else {
          projectContainer.insertBefore(cards[cards.length - 1], cards[0]);
        }

        const newCards = document.querySelectorAll(".cardProject");
        newCards.forEach(c => c.classList.remove("first"));
        const mid = Math.floor(newCards.length / 2);
        newCards[mid].classList.add("first");

        gsap.fromTo(newCards, 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.4, clearProps: "all", onComplete: () => isAnimating = false }
        );
        gsap.to(newCards[mid], { y: -100, duration: 0.6, ease: "back.out(1.7)" });
      }
    });
  }

  if(arrowRight) arrowRight.addEventListener("click", () => updateCarousel("next"));
  if(arrowLeft) arrowLeft.addEventListener("click", () => updateCarousel("prev"));

  const track = document.querySelector(".carrosel-track");
  if(track) {
    track.innerHTML += track.innerHTML;
    const loop = gsap.to(track, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });
    
    const container = document.querySelector(".carrosel-container");
    container?.addEventListener("mouseenter", () => loop.pause());
    container?.addEventListener("mouseleave", () => loop.play());
  }

  const tlFoot = gsap.timeline({
    scrollTrigger: {
      trigger: ".foot",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  tlFoot.from(".double h2:first-child", { x: -100, opacity: 0, scale: 0.5, duration: 1 })
        .from(".contact img", { x: 50, opacity: 0, stagger: 0.1 }, "<")
        .from(".dog", { y: 50, scale: 0, opacity: 0, ease: "elastic.out(1, 0.5)" }, "-=0.5");

  gsap.fromTo(".name", 
    { x: -400, opacity: 0 },
    { 
      x: 0, opacity: 1, 
      scrollTrigger: {
        trigger: ".foot",
        start: "top 95%",
        end: "bottom bottom",
        scrub: 1
      }
    }
  );
});