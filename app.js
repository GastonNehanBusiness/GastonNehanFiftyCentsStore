// Load products from products.json and render grouped by category
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    // Group products by category
    const grouped = {};
    products.forEach(product => {
      if (!grouped[product.category]) grouped[product.category] = [];
      grouped[product.category].push(product);
    });

    const catalog = document.getElementById('product-catalog');
    catalog.innerHTML = '';

    Object.keys(grouped).forEach(category => {
      // Category section
      const section = document.createElement('div');
      section.className = 'category-section';

      const title = document.createElement('div');
      title.className = 'category-title';
      title.textContent = category;
      section.appendChild(title);

      const list = document.createElement('div');
      list.className = 'product-list';

      grouped[category].forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imgSrc = product.image ? `images/${product.image}` : 'images/placeholder.png';
        const img = document.createElement('img');
        img.className = 'product-image';
        img.src = imgSrc;
        img.alt = product.name;
        card.appendChild(img);

        const name = document.createElement('div');
        name.className = 'product-name';
        name.textContent = product.name;
        card.appendChild(name);

        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `$${product.price.toFixed(2)} each`;
        card.appendChild(price);

        const type = document.createElement('div');
        type.className = 'product-type';
        type.textContent = product.type;
        card.appendChild(type);

        const desc = document.createElement('div');
        desc.className = 'product-description';
        desc.textContent = product.description;
        card.appendChild(desc);

        list.appendChild(card);
      });

      section.appendChild(list);
      catalog.appendChild(section);
    });
  })
  .catch(error => {
    document.getElementById('product-catalog').innerHTML = '<p>Could not load products.</p>';
    console.error(error);
  });
