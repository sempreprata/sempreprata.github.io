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

document.addEventListener('DOMContentLoaded', function () {
    // Função para enviar o pedido para o WhatsApp com base na opção selecionada
    function sendWhatsAppMessage() {
        const selectedContact = document.getElementById('contact-list').value; // Obtém o número de telefone selecionado
        const customerName = document.getElementById('customer-name').value;
        const customerStreet = document.getElementById('customer-street').value;
        const customerNumber = document.getElementById('customer-number').value;
        const customerNeighborhood = document.getElementById('customer-neighborhood').value;
        const customerCep = document.getElementById('customer-cep').value;

        // Gere a mensagem com os detalhes do pedido, excluindo o número de telefone
        let whatsappMessage = `Pedido de ${customerName}:\n`;
        whatsappMessage += `Rua: ${customerStreet}\n`;
        whatsappMessage += `Número: ${customerNumber}\n`;
        whatsappMessage += `Bairro: ${customerNeighborhood}\n`;
        whatsappMessage += `CEP: ${customerCep}\n`;

        // Selecione todos os produtos com a classe "product"
        const products = document.querySelectorAll('.product');

        // Inicialize o valor total como 0
        let total = 0;

        products.forEach(function (product, index) {
            const productName = product.querySelector('h3').textContent;
            const productDescription = product.querySelector('p[data-description]').getAttribute('data-description');
            const quantityInput = product.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);
            const price = parseFloat(quantityInput.getAttribute('data-price'));

            // Verifique se a quantidade é maior que zero antes de adicionar ao total
            if (quantity > 0) {
                total += price * quantity;
                whatsappMessage += `${productName} (${productDescription}): ${quantity} unidades\n`;
            }
        });

        whatsappMessage += `Total: R$${total.toFixed(2)}`;

        // Redirecione para o WhatsApp
        const whatsappURL = `https://api.whatsapp.com/send?phone=${selectedContact}&text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, '_blank'); // Abra o link em uma nova aba/janela
    }

    // Adicione um ouvinte de evento para o envio do formulário
    document.getElementById('order-form').addEventListener('submit', function (e) {
        e.preventDefault();
        sendWhatsAppMessage(); // Chame a função para enviar a mensagem do WhatsApp
    });
});
