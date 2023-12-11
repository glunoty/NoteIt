 document.addEventListener('DOMContentLoaded', function () {
        const externalNotesContainerHorizontal = document.getElementById('external-notes-container-horizontal');
        const externalNotesContainerVertical = document.getElementById('external-notes-container-vertical');

        // Ganti URL dengan URL yang sesuai dengan lokasi data.json
        const dataUrl = './notes-data/index.json';

        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                // Loop melalui setiap catatan dan tambahkan ke dalam container horizontal
                data.forEach(note => {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('note1');
                    noteElement.style.backgroundColor = note.color;

                    const titleElement = document.createElement('h3');
                    titleElement.textContent = note.title;

                    const contentElement = document.createElement('p');
                    contentElement.innerHTML = note.notes
                    .replace(/\n/g, '<br>')
                    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');                  

                    const dateElement = document.createElement('h4');
                    dateElement.textContent = note.date;

                    noteElement.appendChild(titleElement);
                    noteElement.appendChild(contentElement);
                    noteElement.appendChild(dateElement);

                    externalNotesContainerHorizontal.appendChild(noteElement);
                });

                // Loop melalui setiap catatan dan tambahkan ke dalam container vertical
                // Reverse the order of the notes
                data.reverse();
                data.forEach(note => {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('note');
                    noteElement.style.backgroundColor = note.color;
                    
                    const titleElement = document.createElement('h3');
                    titleElement.textContent = note.title;

                    const contentElement = document.createElement('p');
                    contentElement.innerHTML = note.notes
                    .replace(/\n/g, '<br>')
                    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');

                    const dateElement = document.createElement('h4');
                    dateElement.textContent = note.date;

                    noteElement.appendChild(titleElement);
                    noteElement.appendChild(contentElement);
                    noteElement.appendChild(dateElement);

                    externalNotesContainerVertical.appendChild(noteElement);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    document.addEventListener('DOMContentLoaded', function () {
        const externalNotesContainerVertical = document.getElementById('favourite-notes');
    
        // Ganti URL dengan URL yang sesuai dengan lokasi favourite.json
        const favouriteUrl = './notes-data/favourite.json';
    
        fetch(favouriteUrl)
            .then(response => response.json())
            .then(data => {
                // Loop melalui setiap catatan dan tambahkan ke dalam container vertical
                // Reverse the order of the notes
                data.reverse();
                data.forEach(note => {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('note');
                    noteElement.style.backgroundColor = note.color;
    
                    const titleElement = document.createElement('h3');
                    titleElement.textContent = note.title;
    
                    const contentElement = document.createElement('p');
                    contentElement.innerHTML = note.notes
                        .replace(/\n/g, '<br>')
                        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    
                    const dateElement = document.createElement('h4');
                    dateElement.textContent = note.date;
    
                    noteElement.appendChild(titleElement);
                    noteElement.appendChild(contentElement);
                    noteElement.appendChild(dateElement);
    
                    externalNotesContainerVertical.appendChild(noteElement);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    });
    
    document.addEventListener('DOMContentLoaded', function () {
        const noteForm = document.getElementById('noteForm');
    
        noteForm.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
    
            // Mendapatkan SHA terbaru dari cabang 'main'
            fetch('https://api.github.com/repos/glunoty/NoteIt/git/refs/heads/main', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer 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',
                },
            })
            .then(response => response.json())
            .then(data => {
                const latestSha = data.object.sha;
    
                // Selanjutnya, gunakan `latestSha` dalam permintaan PUT
                return fetch('https://api.github.com/repos/glunoty/NoteIt/contents/notes-data/index.json', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer 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',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Add new note',
                        content: btoa(JSON.stringify({
                            title: title,
                            content: content,
                        }, null, 2)),
                        sha: latestSha, // Menggunakan SHA terbaru
                    }),
                });
            })
            .then(response => response.json())
            .then(data => {
                console.log('Note added successfully:', data);
                // Handle feedback atau redirect ke halaman lain jika perlu
            })
            .catch(error => console.error('Error:', error));
        });
    });
    