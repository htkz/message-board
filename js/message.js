const appId = 'd9mAl0CxoTTHnMBt3MlGwc5g-gzGzoHsz';
const appKey = 'oE0EF93E1qEAfrlUNYbPlnlP';
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
    const message = $('<li></li>').text(`${name}: ${content}`);
    // const message = $(`<li>${name}: ${content}</li>`) //这个代码会有安全问题，可以xss注入
    ul.append(message);
}

const initMessage = () => {
    var query = new AV.Query('message');
    console.log(query.find());
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
