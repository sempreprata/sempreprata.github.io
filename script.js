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

        // Construa a mensagem com os detalhes do pedido, excluindo o número de telefone
        let whatsappMessage = `Pedido de ${customerName}:\n`;
        whatsappMessage += `Rua: ${customerStreet}\n`;
        whatsappMessage += `Número: ${customerNumber}\n`;
        whatsappMessage += `Bairro: ${customerNeighborhood}\n`;
        whatsappMessage += `CEP: ${customerCep}\n`;

        // ... Restante do código para calcular o total e adicionar produtos

        //whatsappMessage += `Contato: ${selectedContact}\n`; // Adicione o número de telefone no final, se desejar

        // Redirecione para o WhatsApp
        const whatsappURL = `https://api.whatsapp.com/send?phone=${selectedContact}&text=${encodeURIComponent(whatsappMessage)}`;
        window.location.href = whatsappURL;
    }

    // Adicione um ouvinte de evento para o envio do formulário
    document.getElementById('order-form').addEventListener('submit', function (e) {
        e.preventDefault();
        sendWhatsAppMessage(); // Chame a função para enviar a mensagem do WhatsApp
    });
});
