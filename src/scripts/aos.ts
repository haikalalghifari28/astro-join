export async function initAOS() {
  const AOS = (await import("aos")).default;

  AOS.init({
    duration: 800,
    once: true,
    easing: "ease-out-cubic",
    offset: 80,
  });
}
