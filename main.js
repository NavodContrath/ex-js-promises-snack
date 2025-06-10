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


/* 🏆 Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi,
genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato.
Se il numero esce due volte di fila, stampa "Incredibile!". */

function lanciaDado() {
    const promessa = new Promise((resolve, reject) => {
        console.log("lancio il dado...")
        setTimeout(() => {
            const probabilità = Math.random()
            if (probabilità <= 0.2) {
                reject("il dado si è incastrato")
            } else {
                const lancio = Math.round(Math.random() * 6 + 1)
                resolve(`Hai tirato un ${lancio}`)
            }
        }, 3000)
    })
    return promessa

}

lanciaDado()
    .then(messaggio => console.log(messaggio))
    .catch(errore => console.error(errore))