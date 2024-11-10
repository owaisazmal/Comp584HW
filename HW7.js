async function checkHalalStatus() {
    const productInput = document.getElementById('productInput').value.trim();
    const resultElement = document.getElementById('result');

    if (!productInput) {
        resultElement.textContent = "Please enter a product name.";
        resultElement.style.color = 'red';
        return;
    }

    // Direct keyword check for non-halal items in the product name
    const nonHalalKeywords = /pork|bacon|ham|alcohol|wine|whiskey|beer|rum|brandy|vodka|gin|sausage|mead|schnapps|bourbon|cocktail|liquor|amaretto|kahlua|tequila|cognac/i;
    if (nonHalalKeywords.test(productInput)) {
        resultElement.textContent = `${productInput} is not Halal due to its name containing a non-halal term.`;
        resultElement.style.color = 'red';
        return;
    }

    try {
        const apiKey = 'htuolvzS1nrPStYFSg1RQg==xU496tJxbGDGq1Ww'; // Replace with your actual API key
        const apiUrl = `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(productInput)}`;
        
        const response = await fetch(apiUrl, {
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            resultElement.textContent = `No information found for "${productInput}".`;
            resultElement.style.color = 'orange';
            return;
        }

        const recipe = data[0];
        const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : null;

        if (!ingredients) {
            resultElement.textContent = `Ingredients information for "${productInput}" is not available.`;
            resultElement.style.color = 'orange';
            return;
        }

        // Expanded non-halal ingredient check
        const isHalal = !nonHalalKeywords.test(ingredients);

        if (isHalal) {
            resultElement.textContent = `${productInput} is likely Halal. Ingredients: ${ingredients}`;
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = `${productInput} is not Halal. Ingredients: ${ingredients}`;
            resultElement.style.color = 'red';
        }
    } catch (error) {
        resultElement.textContent = "Error fetching data. Please try again later.";
        resultElement.style.color = 'red';
        console.error("Error:", error);
    }
}
