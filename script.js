function openFullscreenView(imageSrc) {
    const fullscreenView = document.getElementById('fullscreen-view');
    const fullscreenImage = document.getElementById('fullscreen-image');

    fullscreenImage.src = imageSrc;
    fullscreenView.style.display = 'block';
}

function closeFullscreenView() {
    const fullscreenView = document.getElementById('fullscreen-view');
    fullscreenView.style.display = 'none';
}

const productImages = document.querySelectorAll('.product img');
productImages.forEach(function (img) {
    img.addEventListener('click', function () {
        const imageSrc = img.src;
        openFullscreenView(imageSrc);
    });
});

document.getElementById('order-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Inicialize o valor total como 0
    let total = 0;

    // Selecione todos os inputs de quantidade com a classe "quantity-input"
    const quantityInputs = document.querySelectorAll('.quantity-input');

    // Obtenha o nome e as novas informações do cliente
    const customerName = document.getElementById('customer-name').value;
    const customerStreet = document.getElementById('customer-street').value;
    const customerNumber = document.getElementById('customer-number').value;
    const customerNeighborhood = document.getElementById('customer-neighborhood').value;
    const customerCep = document.getElementById('customer-cep').value;



    // Gere a mensagem com os detalhes do pedido, incluindo as novas informações
    let whatsappMessage = `Pedido de ${customerName}:\n`;
    whatsappMessage += `Rua: ${customerStreet}\n`;
    whatsappMessage += `Número: ${customerNumber}\n`;
    whatsappMessage += `Bairro: ${customerNeighborhood}\n`;
    whatsappMessage += `CEP: ${customerCep}\n`;

    quantityInputs.forEach(function (input, index) {
        const quantity = parseInt(input.value);
        const price = parseFloat(input.getAttribute('data-price'));

        // Verifique se a quantidade é maior que zero antes de adicionar ao total
        if (quantity > 0) {
            total += price * quantity;
            const productName = input.closest('.product').querySelector('h3').textContent;
            whatsappMessage += `${productName}: ${quantity} unidades\n`;
        }
    });

    whatsappMessage += `Total: R$${total.toFixed(2)}`;

    // Substitua SEU_NUMERO_DE_TELEFONE pelo seu número de WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://api.whatsapp.com/send?phone=5551995315138&text=${encodedMessage}`;

    // Redirecione para o WhatsApp
    window.location.href = whatsappURL;
});
