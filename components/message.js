export default function Message({ data, auth, index, lastmessage, length }) {
    return (
        <div ref={index === length - 5 ? lastmessage : null} className={`message-box ${auth.user.username !== data.sender ? 'align-self-end' : ''}`}>
            <span className="header">
                {
                    data.sender === auth.user.username
                    ? 'You':
                    data.sender
                }
            </span>
            <p className="content mb-0">{data.content}</p>
            <span className="time">{new Date(data.time).toLocaleTimeString(navigator.language,{
                hour: '2-digit',
                minute:'2-digit',
                hour12 : false
            })}</span>
        </div>
    )
}