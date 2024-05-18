import { IonCol, IonContent, IonFooter, IonInput, IonPage, IonRow } from '@ionic/react';
import './SelectedMessages.css';
import { useState, useEffect, useRef } from 'react';

interface ContainerProps {
  messages: MessageContent[]
}

interface MessageContent {
  username: string,
  message: string,
  color: string
}

let currentUser = 'currentUser';

const SelectedMessages: React.FC<ContainerProps> = ({ messages }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function returningMessages() {
    if (messages) {
      return messages.map((msg, index) => {
        if (msg.username === currentUser) {
          return (
            <IonRow key={index}>
              <IonCol size='2'></IonCol>
              <IonCol size='10'>
                <div
                  className='messageFromLoggedInUser'
                  style={{ backgroundColor: msg.color }}>
                  {msg.message}
                </div>
                <div className='messageBottemLoggedInUser' style={{ backgroundColor: msg.color }} />
              </IonCol>
            </IonRow>
          )
        } else {
          return (
            <IonRow key={index}>
              <IonCol size='10'>
                <div
                  className='messageFromUser'
                  style={{ backgroundColor: msg.color }}>
                  {msg.message}
                </div>
                <div className='messageBottemUser' style={{ backgroundColor: msg.color }} />
              </IonCol>
              <IonCol size='2'></IonCol>
            </IonRow>
          )
        }
      })
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div id="container">
          {returningMessages()}
          <div ref={messagesEndRef}></div>
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <div className="input-container">
          <IonInput
            value={messageText}
            placeholder="Type a message"
            onIonChange={e => setMessageText(e.detail.value!)}
            clearInput
          />
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default SelectedMessages;