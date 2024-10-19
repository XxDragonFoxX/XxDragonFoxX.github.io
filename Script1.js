// Your web app's Firebase configuration
	const firebaseConfig = {
	apiKey: "AIzaSyBpMxP5LPFQAP9zL1bl5CcNxevkcZMzaOA",
	authDomain: "dragonshop-94ac0.firebaseapp.com",
	projectId: "dragonshop-94ac0",
	storageBucket: "dragonshop-94ac0.appspot.com",
	messagingSenderId: "217202613105",
	appId: "1:217202613105:web:dd022637b55417cc1534d0",
	measurementId: "G-8FVX04S663"
};

	// Initialize Firebase
	const app = firebase.initializeApp(firebaseConfig);
	const db = firebase.firestore();

	// Функция для загрузки чатов из Firestore
	function loadChats() {
    const chatsDiv = document.getElementById('chats');
    db.collection('chats').onSnapshot((querySnapshot) => {
        chatsDiv.innerHTML = '';  // Очистка предыдущих чатов

        querySnapshot.forEach((doc) => {
            const chatData = doc.data();
            const chatDiv = document.createElement('div');
            chatDiv.className = 'chat';

            const chatHeader = document.createElement('div');
            chatHeader.className = 'chat-header';
            chatHeader.textContent = `Чат с пользователем: ${doc.id}`;
            chatDiv.appendChild(chatHeader);

            chatData.messages.forEach((msg) => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message';
                messageDiv.textContent = `${msg.sender === 'user' ? 'Пользователь' : 'Администратор'}: ${msg.message}`;
                chatDiv.appendChild(messageDiv);
            });

            chatsDiv.appendChild(chatDiv);
        });
    }).catch((error) => {
        console.error("Ошибка при загрузке чатов: ", error);
    });
	}

document.addEventListener('DOMContentLoaded', loadChats);