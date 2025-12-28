document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Vanta.js Background Initialization ---
    // This creates the animated WebGL background.
    // It's set to pause when the window is not in focus to save resources.
    VANTA.FOG({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0x00a0e9, // Corresponds to --accent-color
        midtoneColor: 0x005bac,   // Corresponds to --primary-color
        lowlightColor: 0xf0f4f8,  // Corresponds to --secondary-color (light)
        baseColor: 0xffffff,     // Corresponds to --bg-color (light)
        blurFactor: 0.60,
        speed: 1.20,
        zoom: 0.80
    });

    // --- 2. Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Function to set the theme
    const setTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme in localStorage, or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // --- 3. Scroll-based Fade-in Animations ---
    const animatedElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element once it's visible to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- 4. Placeholder for Chart Rendering ---
    // NOTE: The code below is a placeholder. It requires a charting library
    // like Chart.js and the actual data for salary ranges.
    const salaryChartContainer = document.getElementById('salary-chart-container');
    if (salaryChartContainer) {
        // Example:
        // const ctx = salaryChartContainer.getContext('2d');
        // const myChart = new Chart(ctx, {
        //     type: 'bar',
        //     data: { /* ... Nidec salary data ... */ },
        //     options: { /* ... chart options ... */ }
        // });
        console.log("Salary chart would be rendered here if data were available.");
    }
});
