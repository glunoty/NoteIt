    document.addEventListener('DOMContentLoaded', function () {
        const externalNotesContainerHorizontal = document.getElementById('external-notes-container-horizontal');
        const externalNotesContainerVertical = document.getElementById('external-notes-container-vertical');

        // Ganti URL dengan URL yang sesuai dengan lokasi data.json
        const dataUrl = 'data.json';

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