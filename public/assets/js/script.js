const srtBtn = $('#get-started')
const noteArea = $('#note-area')
const addNote = $('#add-note')
const menuBarDiv = $('#menuBar-div')


srtBtn.on('click', () => {
   if (noteArea.children().length == 0) {
        menuBar = $('<div>', {
            class: 'mainbg border-top border-white',
            id: 'menuBar-div'
        });
        $(noteArea).append(menuBar)
        createNote = $('<button>', {
            class: 'btn btn-link text-left addnote',
            text: '+ Add note',
            id: 'add-note'
        });
        $(menuBar).append(createNote)
        ulNote = $('<ul>',{
          id: 'ul-note'
        })
        $(menuBar).append(ulNote)
    } 
    
        getNotes()
})






const getNotes = () => {
    return $.ajax({
      url: "/api/notes",
      method: "GET",
      success: function(response) {
        for (let i = 0; i < response.length; i++) {
            noteLi = $('<li>', {id: response[i].id})
            $(menuBar).append(noteLi)
            titleInp = $('<input>',{
              class: 'title-class',
              value: response[i].title,
              disabled: true
            })
            textInp = $('<textarea>',{
              class: 'text-class',
              text: response[i].text,
              disabled: true
            })
            $(noteLi).append(titleInp)
            $(noteLi).append(textInp)
        }



      }
    })
    


  };

addNote.on('click', () => {
  getNotes();


})