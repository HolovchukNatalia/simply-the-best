import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
  
document.addEventListener('DOMContentLoaded', function () {

  const form = document.querySelector('.footer-form');
  const emailMessage = document.querySelector('.email-message');
  const emailInput = document.querySelector('.email-input');
  const commentInput = document.querySelector('.comments-input');
  const successModal = document.querySelector('.modal');
  const closeModalBtn = document.querySelector('.close-modal');
  
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const comment = commentInput.value;
    
    const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const isValid = emailPattern.test(emailInput.value);

    if (!isValid) {
      emailMessage.textContent = 'Invalid email, try again';
      emailMessage.classList.add('invalid');
      emailMessage.classList.remove('valid');
      emailInput.classList.add('invalid');
      emailInput.classList.remove('valid');

      return;
    } else {
      emailMessage.textContent = 'Success!';
      emailMessage.classList.add('valid');
      emailMessage.classList.remove('invalid');
      emailInput.classList.add('valid');
      emailInput.classList.remove('invalid');
    }
    
    if (comment === '') {
      iziToast.warning({
        title: 'Warning',
        message: 'The comment field must be filled in.',
        position: 'topRight',
        timeout: 4000,
      });
      return;
    }

    try {
      const response = await axios.post('https://portfolio-js.b.goit.study/api/requests', {
        email,
        comment
      });

      console.log(response);

    if (response.status === 201) {
      successModal.classList.remove('hidden');
      document.body.classList.add('modal-open')
      form.reset();
      
      emailMessage.textContent = '';
      emailMessage.classList.remove('valid', 'invalid');
      emailInput.classList.remove('valid', 'invalid');
    } else {
      throw new Error('Unexpected server response');  
}
    } catch (error) {
      errorMessage.classList.remove('hidden');
      console.error('Помилка при відправці:', error);
      
      iziToast.error({
        title: 'Error',
        message: 'There was an error while submitting your request. Please try again later.',
        position: 'topRight', 
        timeout: 3000, 
      });
    }
  });
    
  const closeModal = () => {
    successModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  closeModalBtn.addEventListener('click', closeModal);

  successModal.addEventListener('click', function (event) {
    if (event.target === successModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

    commentInput.addEventListener('input', function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = window.getComputedStyle(commentInput).font; 
    const inputWidth = commentInput.clientWidth - 10; 
    let text = commentInput.value;
    while (context.measureText(text).width > inputWidth && text.length > 1) {
      text = '...' + text.slice(4); 
    }
    if (context.measureText(text).width > inputWidth) {
      text = '...';
    }
    commentInput.value = text;
  });
});
























