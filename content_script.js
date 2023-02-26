function setMaxWidthForInlineImages() {
  const images = document.querySelectorAll("img[src*='disp=emb']");
  images.forEach(image => {
    console.log('Setting max width for image: ' + image.src);
    console.log('Image style before: ' + image.style.cssText);
    image.style.maxWidth = "100%";
    console.log('Image style after: ' + image.style.cssText);
  });
}

const observer = new MutationObserver(function(mutationsList) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const addedNodes = mutation.addedNodes;
      addedNodes.forEach(node => {
        if (node instanceof HTMLElement && node.querySelector("img[src*='disp=emb']")) {
          console.log('Found div with image: ' + node.outerHTML);
          setMaxWidthForInlineImages();
        }
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

setMaxWidthForInlineImages();