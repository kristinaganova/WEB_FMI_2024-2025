document.getElementById('registration-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const familyName = document.getElementById('family-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
  
    clearErrors();
  
    if (!validateForm(username, name, familyName, email, password, postalCode)) {
      return;
    }
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
  
      const userExists = users.some(user => user.username === username);
  
      if (userExists) {
        document.getElementById('username-error').textContent = 'Потребител с това потребителско име вече съществува.';
        return;
      }
  
      const newUser = {
        username,
        name: `${name} ${familyName}`,
        email,
        password, 
        street,
        city,
        postalCode
      };
  
      const postResponse = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
  
      if (postResponse.ok) {
        document.getElementById('success').textContent = 'Успешна регистрация!';
      } else {
        document.getElementById('success').textContent = 'Възникна грешка при регистрацията.';
      }
    } catch (error) {
      console.error('Грешка:', error);
      document.getElementById('success').textContent = 'Неуспешна връзка с сървъра.';
    }
  });
  
  function validateForm(username, name, familyName, email, password, postalCode) {
    let isValid = true;
  
    if (username.length < 3 || username.length > 10) {
      document.getElementById('username-error').textContent = 'Потребителското име трябва да е между 3 и 10 символа.';
      isValid = false;
    }
  
    if (name.length === 0 || familyName.length === 0) {
      document.getElementById('name-error').textContent = 'Името е задължително.';
      document.getElementById('family-name-error').textContent = 'Фамилията е задължителна.';
      isValid = false;
    }
  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      document.getElementById('email-error').textContent = 'Невалиден имейл адрес.';
      isValid = false;
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;
    if (!passwordRegex.test(password)) {
      document.getElementById('password-error').textContent = 'Паролата трябва да съдържа главни и малки букви и цифри, между 6 и 10 символа.';
      isValid = false;
    }
  
    const postalCodeRegex = /^(\d{4}|\d{5}-\d{4})$/;
    if (postalCode && !postalCodeRegex.test(postalCode)) {
      document.getElementById('postal-code-error').textContent = 'Невалиден пощенски код.';
      isValid = false;
    }
  
    return isValid;
  }
  
  function clearErrors() {
    document.getElementById('username-error').textContent = '';
    document.getElementById('name-error').textContent = '';
    document.getElementById('family-name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('postal-code-error').textContent = '';
    document.getElementById('success').textContent = '';
  }