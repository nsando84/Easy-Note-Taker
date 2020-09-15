const srtBtn = $('#get-started')
const noteArea = $('#note-area')
const addNote = $('#add-note')
const menuBarDiv = $('#menuBar-div')
const textValue = $('#new-text')
const titleValue = $('#new-title')
const submitNote = $('#submit-note')

srtBtn.on('click', () => {
   if (noteArea.children().length == 0) {
        menuBar = $('<div>', {
            class: 'mainbg border-top border-white',
            id: 'menuBar-div'
        });
        $(noteArea).append(menuBar)
        createNote = $(`<a type="button" class="btn btn-link text-left addnote" id="myBtn"data-toggle="modal" data-target="#exampleModal">+ Add note</a>`)
        $(menuBar).append(createNote)
        ulNote = $('<ul>',{
          id: 'ul-note'
        })
        $(menuBar).append(ulNote)
        getNotes()
    } 
})


$(document).on('click', '#delete-btn', function(e) {
    $(this).parent().parent().fadeOut(500,function(){
      $(this).remove()
    })
  buttonTarget = $(this).parent().parent().attr('id')
  deleteNote(buttonTarget)
})

const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
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
      // console.log('success')
    }
  });
};


$(submitNote).on('click', function(e) {
  if (titleValue.val().length == 0 || 
  textValue.val().length == 0) {
    console.log("enter values")
  } else {
    data = {
      'title': titleValue.val(),
      'text': textValue.val()
    }
    return $.ajax({
      url: "api/notes/",
      method: "POST",
      data: data,
      success: () => {
        console.log('post success')
        $('#form-reset').trigger('reset')
        getNotes()
        }
    })
  }
})



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
