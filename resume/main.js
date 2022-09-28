const show = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
}

const fullyInView = new IntersectionObserver(show, { threshold: 1 });
const shortElements = document.querySelectorAll('.showFullyInView');
shortElements.forEach((el) => {
    fullyInView.observe(el);
});

const partiallyInView = new IntersectionObserver(show, { threshold: 0 });
const tallElements = document.querySelectorAll('.showPartiallyInView');
tallElements.forEach((el) => {
    partiallyInView.observe(el);
});

const halfInView = new IntersectionObserver(show, { threshold: 0.5 });
const medumElements = document.querySelectorAll('.showHalfInView');
medumElements.forEach((el) => {
    halfInView.observe(el);
});
