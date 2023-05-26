const { createWriteStream } = require('fs');

let outputStream;

function getFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

function startRecording(connection, voiceChannel) {
  const receiver = connection.receiver;
  const audioStream = receiver.createStream(voiceChannel, { mode: 'pcm' });

  const filename = `${getFormattedDate()}.pcm`;
  outputStream = createWriteStream(filename);

  audioStream.on('data', (chunk) => {
    outputStream.write(chunk);
  });


  audioStream.on('end', () => {
    outputStream.end();
    console.log('Recording saved.');
  });
}


function stopRecording() {
  if (outputStream) {
    outputStream.end();
    outputStream = null;
  }
}

console.log(getFormattedDate())

module.exports = {
  startRecording,
  stopRecording
};



