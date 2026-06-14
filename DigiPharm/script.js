const medicalDatabase = {
    "paracetamol": {
        desc: "A widely used medication to relieve mild to moderate pain and reduce fever.",
        usage: "Take 1-2 tablets every 4-6 hours for fever or pain. Max 8 tablets per day.",
        warning: "Caution for patients with liver impairment. Do not combine with other paracetamol products."
    },
    "ibuprofen": {
        desc: "A nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.",
        usage: "Take 1 tablet every 6-8 hours. Must be taken with food or milk to prevent stomach upset.",
        warning: "May cause stomach bleeding. Not recommended for patients with a history of stomach ulcers."
    },
    "mefenamic acid": {
        desc: "An NSAID used short-term to treat mild to moderate pain, including menstrual pain.",
        usage: "Take 1 tablet every 8 hours with food or milk.",
        warning: "Do not use for more than 7 days without consulting a doctor. Avoid if you have kidney issues."
    },
    "cetirizine": {
        desc: "An antihistamine used to relieve allergy symptoms such as runny nose, sneezing, and hives.",
        usage: "Take 1 tablet once daily, preferably in the evening.",
        warning: "May cause drowsiness. Avoid driving or operating heavy machinery after taking."
    },
    "guaifenesin": {
        desc: "An expectorant that helps loosen congestion in your chest and throat.",
        usage: "Take 1-2 tablets every 4 hours. Drink plenty of water to help loosen phlegm.",
        warning: "Ask a doctor before use if you have a chronic cough due to smoking, asthma, or emphysema."
    },
    "dextromethorphan hbr": {
        desc: "A cough suppressant used to temporarily relieve dry, hacking coughs.",
        usage: "Take 1 tablet every 4 to 6 hours. Do not exceed 4 doses in 24 hours.",
        warning: "Do not use if you are currently taking an MAOI prescription drug."
    },
    "amoxicillin": {
        desc: "A penicillin antibiotic used to treat various types of bacterial infections.",
        usage: "Take 1 tablet every 8 hours. You MUST complete the entire prescribed course.",
        warning: "Do not take if allergic to penicillin. May decrease the effectiveness of birth control pills."
    },
    "vitamin c": {
        desc: "An essential vitamin and antioxidant used to support the immune system.",
        usage: "Take 1 tablet daily as a dietary supplement, preferably with a meal.",
        warning: "Generally safe. Very high doses may cause upset stomach. Consult doctor if you have kidney stones."
    },
    "loratadine": {
        desc: "A non-drowsy antihistamine that reduces the effects of natural chemical histamine.",
        usage: "Take 1 tablet once daily.",
        warning: "Although considered 'non-drowsy', a small percentage of people may still feel slight fatigue."
    },
    "omeprazole": {
        desc: "A proton pump inhibitor (PPI) that decreases stomach acid, used for GERD and acid reflux.",
        usage: "Take 1 tablet daily before a meal (preferably in the morning). Swallow whole.",
        warning: "Do not crush or chew the tablet. Long-term use may require doctor supervision."
    },
    "promag": {
        desc: "An antacid medication used to neutralize stomach acid and relieve heartburn or indigestion.",
        usage: "Chew 1-2 tablets thoroughly before swallowing. Take between meals or at bedtime.",
        warning: "Do not take within 2 hours of taking other prescription medications."
    },
    "panadol extra": {
        desc: "A combination of Paracetamol and Caffeine to treat tough pain like migraines or tension headaches.",
        usage: "Take 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.",
        warning: "Contains caffeine. Limit intake of coffee or tea while taking this medication."
    }
};

function searchMedications() {
    let input = document.getElementById('search-input');
    if(!input) return; 
    let filter = input.value.toLowerCase();
    let cards = document.getElementsByClassName('product-card');

    for (let i = 0; i < cards.length; i++) {
        let medName = cards[i].querySelector('h3').innerText.toLowerCase();
        if (medName.includes(filter)) { cards[i].style.display = ""; } 
        else { cards[i].style.display = "none"; }
    }
}

let cart = JSON.parse(localStorage.getItem('digipharm_cart')) || [];

function updateNavBadge() {
    let totalItems = 0;
    cart.forEach(item => totalItems += item.qty);
    const badge = document.getElementById('cart-badge');
    if (badge) badge.innerText = totalItems;
}

function addToCart(itemName, price) {
    let existingItem = cart.find(item => item.name === itemName);
    if (existingItem) { 
        existingItem.qty += 1; 
    } else { 
        cart.push({ name: itemName, price: price, qty: 1 }); 
    }
    localStorage.setItem('digipharm_cart', JSON.stringify(cart));
    updateNavBadge();
    alert(itemName + ' has been added to your cart!');
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('digipharm_cart', JSON.stringify(cart));
    renderCart(); 
    updateNavBadge();
}

function getCartTotal() {
    let total = 0;
    cart.forEach(item => total += (item.price * item.qty));
    return total;
}

function renderCart() {
    let container = document.getElementById('cart-items-container');
    if (!container) return; 
    
    let emptyMsg = document.getElementById('empty-cart-msg');
    let summaryItems = document.getElementById('summary-items');
    let summaryTotal = document.getElementById('summary-total');
    let checkoutBtn = document.getElementById('btn-checkout');

    if (cart.length === 0) {
        container.innerHTML = '';
        if(emptyMsg) emptyMsg.style.display = 'block';
        if(summaryItems) summaryItems.innerText = '0';
        if(summaryTotal) summaryTotal.innerText = 'IDR 0';
        if(checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if(emptyMsg) emptyMsg.style.display = 'none';
        container.innerHTML = ''; 
        let totalItems = 0;
        
        cart.forEach(item => {
            totalItems += item.qty;
            container.innerHTML += `
                <div class="cart-item-card">
                    <div>
                        <h3 style="margin-bottom:5px;">${item.name}</h3>
                        <p class="price">IDR ${item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div style="display:flex; align-items:center; gap: 15px;">
                        <span style="font-weight:bold; background: white; padding: 5px 15px; border-radius:4px;">Qty: ${item.qty}</span>
                        <button onclick="removeFromCart('${item.name}')" style="background:none; color:red; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `;
        });
        if(summaryItems) summaryItems.innerText = totalItems;
        if(summaryTotal) summaryTotal.innerText = 'IDR ' + getCartTotal().toLocaleString('id-ID');
        if(checkoutBtn) checkoutBtn.disabled = false;
    }
}

function renderCheckout() {
    let container = document.getElementById('checkout-items');
    if (!container) return; 
    
    let totalAmount = getCartTotal();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        window.location.href = "cart.html";
        return;
    }

    container.innerHTML = '';
    cart.forEach(item => {
        container.innerHTML += `<div class="summary-row" style="margin-bottom: 5px;"><span>${item.qty}x ${item.name}</span> <span>IDR ${(item.price * item.qty).toLocaleString('id-ID')}</span></div>`;
    });

    document.getElementById('checkout-total-price').innerText = 'IDR ' + totalAmount.toLocaleString('id-ID');
    document.getElementById('btn-total-price').innerText = 'IDR ' + totalAmount.toLocaleString('id-ID');
}

function selectDelivery(element, type) {
    document.querySelectorAll('.option-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    let label = document.getElementById('delivery-label');
    let input = document.getElementById('delivery-input');

    if (type === 'pickup') {
        label.innerText = 'Name and phone number';
        input.placeholder = 'Enter your name and phone number here...';
    } else if (type === 'home') {
        label.innerText = 'Name, phone number, and delivery address';
        input.placeholder = 'Enter your name, phone number, and complete address here...';
    }
}

function placeOrder() {
    let totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    
    let orderData = {
        id: 'ORD-' + Math.floor(Math.random() * 1000000000),
        date: new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
        total: getCartTotal(),
        itemsCount: totalItems
    };
    
    localStorage.setItem('digipharm_active_order', JSON.stringify(orderData));
    
    cart = [];
    localStorage.removeItem('digipharm_cart');
    
    alert("Order Placed Successfully!");
    window.location.href = "tracking.html"; 
}

function renderTracking() {
    let activeOrderSection = document.getElementById('active-order');
    let noOrderMsg = document.getElementById('no-orders-msg');
    if(!activeOrderSection) return; 

    let orderData = JSON.parse(localStorage.getItem('digipharm_active_order'));

    if (orderData) {
        noOrderMsg.style.display = 'none';
        activeOrderSection.style.display = 'block';
        document.getElementById('tracking-id').innerText = orderData.id;
        document.getElementById('tracking-date').innerText = orderData.date;
        document.getElementById('tracking-total').innerText = 'IDR ' + orderData.total.toLocaleString('id-ID');
        document.getElementById('tracking-items').innerText = orderData.itemsCount + ' items';
    } else {
        noOrderMsg.style.display = 'block';
        activeOrderSection.style.display = 'none';
    }
}

function viewDetail(name, price, dosage, imgSrc) {
    const detailData = { name, price, dosage, imgSrc };
    localStorage.setItem('digipharm_active_detail', JSON.stringify(detailData));
    window.location.href = 'detail.html';
}

function renderDetail() {
    let container = document.getElementById('detail-container');
    if (!container) return; 

    let data = JSON.parse(localStorage.getItem('digipharm_active_detail'));
    
    if (!data) {
        container.innerHTML = '<div style="text-align:center; padding: 100px;"><h2>No medication selected.</h2><br><a href="catalog.html" class="btn-primary">Back to Catalog</a></div>';
        return;
    }

    let medKey = data.name.toLowerCase();
    let detailInfo = medicalDatabase[medKey] || {
        desc: "Order medications online with ease. Fast delivery, quality products, and professional pharmaceutical service.",
        usage: "Follow the instructions on the packaging or consult your healthcare provider.",
        warning: "If symptoms persist, please consult a doctor."
    };

    container.innerHTML = `
        <div class="detail-container">
            <div class="detail-image">
                <img src="${data.imgSrc}" alt="${data.name}">
            </div>
            <div class="detail-info">
                <h1>${data.name}</h1>
                <div class="detail-price">IDR ${data.price.toLocaleString('id-ID')}</div>
                <p>${detailInfo.desc}</p>
                
                <div class="info-list">
                    <div class="info-item">
                        <i class="fa-solid fa-circle-info" style="font-size: 1.8rem; color: #1a1a1a; margin-top: 3px;"></i>
                        <div>
                            <h4 style="margin-bottom: 2px; font-weight: 600;">Dosage</h4>
                            <p>${data.dosage}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fa-solid fa-circle-info" style="font-size: 1.8rem; color: #1a1a1a; margin-top: 3px;"></i>
                        <div>
                            <h4 style="margin-bottom: 2px; font-weight: 600;">Usage Instructions</h4>
                            <p>${detailInfo.usage}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.8rem; color: #1a1a1a; margin-top: 3px;"></i>
                        <div>
                            <h4 style="margin-bottom: 2px; font-weight: 600;">Important Warnings</h4>
                            <p>${detailInfo.warning}</p>
                        </div>
                    </div>
                </div>
                
                <button class="btn-add-large" onclick="addToCart('${data.name}', ${data.price})">add to cart</button>
            </div>
        </div>
    `;
}

window.onload = () => {
    updateNavBadge();
    renderCart();
    renderCheckout();
    renderTracking();
    renderDetail();
};