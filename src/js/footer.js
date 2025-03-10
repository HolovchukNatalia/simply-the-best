import axios from 'axios';

  const form = document.querySelector('.footer-form');
  const emailMessage = document.querySelector('.email-message');
  const emailInput = document.querySelector('.email-input');
  const commentInput = document.querySelector('.comments-input');
  const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
  
document.addEventListener('DOMContentLoaded', function () {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const comments = commentInput.value;
    
    const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const isValid = emailPattern.test(emailInput.value);

    if (isValid) {
      emailMessage.textContent = 'Success!';
      emailMessage.classList.add('valid');
      emailMessage.classList.remove('invalid');
      emailInput.classList.add('valid');
      emailInput.classList.remove('invalid');
    } else {
      emailMessage.textContent = 'Invalid email, try again';
      emailMessage.classList.add('invalid');
      emailMessage.classList.remove('valid');
      emailInput.classList.add('invalid');
      emailInput.classList.remove('valid');
      return;
    }

    try {
      const response = await axios.post('https://portfolio-js.b.goit.study/api/requests', {
        email,
        comments
      });

      if (response.status === 200) {
        successMessage.classList.remove('hidden');
        form.reset(); 
      }
    } catch (error) {
      errorMessage.classList.remove('hidden');
      console.error('Помилка при відправці:', error);
    }
  });
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





















