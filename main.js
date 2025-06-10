/* 🏆 Snack 1
Ottieni il titolo di un post con una Promise.
Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise 
che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. 
Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, 
recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.
 */


const getPostTitle = (id) => {
    const promessa = new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(response => response.json())
            .then(data => resolve(data.title))
            .catch(reject)
    })
    return promessa
}

getPostTitle(1)
    .then(data => console.log(data))
    .catch(error => console.error(error))

const getPost = (id) => {
    const promessa = new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(response => response.json())
            .then(post => {
                fetch(`https://dummyjson.com/users/${post.userId}`)
                    .then(response => response.json())
                    .then(data => {
                        post.author = data
                        resolve(post)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })
    return promessa
}

getPost(1)
    .then(data => console.log(data))
    .catch(error => console.error(error))
