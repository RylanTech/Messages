import { IonButton, IonCol, IonContent, IonFooter, IonInput, IonPage, IonRow } from '@ionic/react';
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

  function returningMessages() {
    if (messages) {
      return messages.map((msg, index) => {
        if (msg.username === currentUser) {
          return (
            <IonRow key={index}>
              <IonCol size='2' />
              <IonCol size='10'>
                <div
                  className='messageFromLoggedInUser message'
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
                  className='messageFromUser message'
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
          <div className="message-container">
            {returningMessages()}
          </div>
        </IonContent>
        <IonFooter className="ion-no-border">
          <IonRow>
            <IonCol size='10'>
              <div className="input-container">
                <IonInput
                  value={messageText}
                  placeholder="Type a message"
                  onIonChange={e => setMessageText(e.detail.value!)}
                  clearInput
                />
              </div>
            </IonCol>
            <IonCol size='2'>
              <IonButton className='sendButton'>
                Send
              </IonButton>
            </IonCol>
          </IonRow>
        </IonFooter>
    </IonPage>
  );
};

export default SelectedMessages;