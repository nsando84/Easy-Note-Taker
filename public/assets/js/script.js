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
        createNote = $(`<button type="button" class="btn btn-link text-left addnote" id="myBtn">+ Add note</button>`)
        $(menuBar).append(createNote)
        ulNote = $('<ul>',{
          id: 'ul-note'
        })
        $(menuBar).append(ulNote)
        getNotes()
    } 
})



$(document).on('click', '#delete-btn', () => {
  buttonTarget = $(this).parent().parent().attr('id')
  deleteNote(buttonTarget)
})

const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
    success: () => {
      ulNote.empty()
      getNotes()
    }
  });
};

$(document).on('click', '#edit-btn', function(e) {
  let optLet = $(this).parent()
  $(this).parent().siblings().prop('disabled', false).css('background-color', 'white')
  $('#save-btn').toggle()
  let saveBtn = $(`<span class='save-btn'id="save-btn">Save</span>`)
  if (optLet.children().length < 3) { $(optLet).prepend(saveBtn) }
})

$(document).on('click', '#save-btn', function(e) {
  $(this).toggle()
  $(this).parent().siblings().prop('disabled', false).css('background-color', 'rgb(247, 242, 202)')
  buttonTarget = $(this).parent().parent().attr('id')
  titleTarget = $(this).parent().siblings('input').val()
  textTarget = $(this).parent().siblings('textarea').val()
  saveMe(buttonTarget, titleTarget, textTarget)
})

const saveMe = (id, title, text) => {
  data =  {
    'title': title,
    'text': text
  }
  return $.ajax({
    url: "api/notes/" + id,
    method: "PUT",
    data: data,
    success: () => {
      console.log('success')
    }
  });
};



const getNotes = () => {
    return $.ajax({
      url: "/api/notes",
      method: "GET",
      success: function(response) {
        for (let i = 0; i < response.length; i++) {
            noteLi = $('<li>', {id: response[i].id })
            $(ulNote).append(noteLi)
            optionDiv = $('<div>', {id: 'option-div' })
            $(noteLi).append(optionDiv)
            spanOpt = $(`<span class='option-btn' id="edit-btn">Edit</span>
            <span class='option-btn' id='delete-btn'>Delete</span>`)
            $(optionDiv).append(spanOpt)
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
