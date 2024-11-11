async function getHighProteinFood() {
    const resultElement = document.getElementById('result');
    resultElement.textContent = "Searching for high-protein food...";

    const highProteinQueries = ["chicken", "eggs", "tofu", "salmon", "lentils", "beef"];
    const randomQuery = highProteinQueries[Math.floor(Math.random() * highProteinQueries.length)];

    try {
        const apiKey = 'htuolvzS1nrPStYFSg1RQg==xU496tJxbGDGq1Ww';
        const apiUrl = `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(randomQuery)}`;

        const response = await fetch(apiUrl, {
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            resultElement.textContent = "No high-protein food found.";
            return;
        }

        // Display the first recipe
        const recipe = data[0];
        const ingredients = Array.isArray(recipe.ingredients) 
            ? recipe.ingredients.join(', ') 
            : recipe.ingredients || "Ingredients not listed";

        resultElement.innerHTML = `
            <h2>${recipe.title}</h2>
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
    } catch (error) {
        resultElement.textContent = "Error fetching data. Please try again later.";
        console.error("Error:", error);
    }
}
window.onload = () => {
    // Animate the button (existing code)
    gsap.from("button", {
        duration: 1,
        scale: 0.8,
        ease: "elastic.out(1, 0.3)"
    });

    const button = document.querySelector("button");
    button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.05, duration: 0.2 });
    });

    button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.2 });
    });

    // New typewriter and color fade-in animation for "High Protein Food Finder"
    const titleText = document.querySelector("h1");
    const text = titleText.innerText;
    titleText.innerText = ""; // Clear text for typewriter effect
    
    gsap.to(titleText, {
        text: text,
        duration: 2,
        ease: "power2.inOut",
        delay: 0.5,
    });
    
    gsap.fromTo(titleText, 
        { color: "#ff65a3" }, // Start color
        { color: "#333", duration: 2, delay: 0.5, ease: "power2.inOut" } // End color
    );
};


