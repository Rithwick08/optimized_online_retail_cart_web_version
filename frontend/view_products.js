document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('products-container');
  
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const products = await response.json();
  
      if (products.length === 0) {
        container.innerHTML = '<p>No products available.</p>';
      } else {
        products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product-card';
          productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
          `;
          container.appendChild(productDiv);
        });
      }
    } catch (error) {
      container.innerHTML = '<p>Error fetching products. Please try again later.</p>';
      console.error(error);
    }
  });