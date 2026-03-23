// 📦 Sample Workspace Inventory Data Array (For searching)
const productsData = [
    { id: 1, name: "Smart Audio Spatial Headset", sku: "HD-420-SPA", price: "$129.99" },
    { id: 2, name: "Ergonomic Mechanical Keyboard", sku: "MECH-V2", price: "$189.99" },
    { id: 3, name: "Ergonomic Precision Mouse", sku: "ERG-M1", price: "$45.00" },
    { id: 4, name: "Curved Desktop Display 34\"", sku: "MON-34X", price: "$499.99" }
];

// 🎨 1. Change Main Product View Gallery Image
function changeImage(imageSrc, thumbnailElement) {
    document.getElementById('mainImage').src = imageSrc;
    
    // Shift layout visual focus (border active state)
    document.querySelectorAll('.thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnailElement.classList.add('active');
}

// 🛒 2. Update Buying Item Count State Logic
function updateQty(amount) {
    const qtyInput = document.getElementById('quantityInput');
    let currentValue = parseInt(qtyInput.value);
    
    currentValue += amount;
    
    if (currentValue < 1) currentValue = 1; // Block negative quantities
    
    qtyInput.value = currentValue;
}

// 🔔 3. State update for Cart trigger counter
let cartStateCount = 0;
function addToCartTrigger() {
    const qtySelected = parseInt(document.getElementById('quantityInput').value);
    const selectedSize = document.getElementById('sizeDropdown').value;

    if (!selectedSize) {
        alert("Please map a UI framework size variant constraint before adding to cart.");
        return;
    }

    cartStateCount += qtySelected;
    document.getElementById('cartCount').textContent = cartStateCount;
    
    alert(`Added ${qtySelected} item(s) to the cart successfully!`);
}

// 🔍 4. Client-side Search Engine Intercept
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = ''; // Fresh DOM reset
        
        if (query.length === 0) {
            searchResults.classList.add('hidden');
            return;
        }

        const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));

        if (filtered.length > 0) {
            searchResults.classList.remove('hidden');
            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'search-item';
                div.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        <span style="font-size: 12px; color: #667085;">${item.price} - SKU: ${item.sku}</span>
                    </div>
                `;
                div.onclick = () => {
                    alert(`Routing viewport constraint state to item ID: ${item.id}`);
                    searchResults.classList.add('hidden');
                    searchInput.value = item.name;
                };
                searchResults.appendChild(div);
            });
        } else {
            searchResults.classList.remove('hidden');
            searchResults.innerHTML = `<div class="search-item">No results found for "${query}"</div>`;
        }
    });

    // Hide overlay when clicking away outside the search domain
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
}