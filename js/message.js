const appId = 't1JQsYcAlG6UnFnDQu7HG4OA-gzGzoHsz';
const appKey = 'zhSYVp2EEIq870asMGHvc9n4';
AV.init({ appId, appKey });

const MessageObject = AV.Object.extend('message');
const ul = $('#message-ul');


const saveMessageToDBo = async(name, content) => {
    const messageObject = new MessageObject();
    return messageObject.save({
        name: name,
        content: content,
    });
}

const alertError = () => {
    alert('Error, something wrong!')
}

const insertMessage = (name, content) => {
    const message = $(`<li>${name}: ${content}</li>`)
    ul.append(message);
}

const initMessage = () => {
    var query = new AV.Query('message');
    query.find().then((messages) => {
        const array = messages.map((item) => item.attributes)
        array.forEach((item) => {
            insertMessage(item.name, item.content);
        })
    })
}

const form = $('#message');
form.on('submit', function(event) {
    event.preventDefault();
    const name = form.find('input[name="name"]').val() || 'annoymous';
    const content = form.find('input[name="content"]').val() || 'nothing';
    form.find('input[name="content"]').val('');
    saveMessageToDBo(name, content).then(()=>{
        insertMessage(name, content)
    }, alertError);
});

initMessage();
