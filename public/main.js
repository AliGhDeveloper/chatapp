

Pusher.logToConsole = true;

var pusher = new Pusher('56777936e68f167c767b', {
    cluster: 'ap1'
});

var channel = pusher.subscribe('chat-app');
channel.bind('socket', function() {
    
});


async function pushData(data) {
    const res = await fetch('/api/channels-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error('failed to push data');
    }
}

pushData('salam')