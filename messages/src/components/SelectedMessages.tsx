import { IonButton, IonCol, IonContent, IonFooter, IonInput, IonPage, IonRow } from '@ionic/react';
import './SelectedMessages.css';
import { useState, useEffect, useRef } from 'react';
import { Keyboard } from '@capacitor/keyboard';

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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  // const [setConfMessage, setConfMessage] = useState("test")

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const setupKeyboardListeners = async () => {
      const showListener = await Keyboard.addListener('keyboardWillShow', (info) => {
        // setConfMessage("testingc")
        setKeyboardHeight(info.keyboardHeight);
      });

      const hideListener = await Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardHeight(0);
      });

      return () => {
        showListener.remove();
        hideListener.remove();
      };
    };

    const cleanup = setupKeyboardListeners();

    return () => {
      cleanup.then(fn => fn());
    };
  }, []);

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
      <IonContent style={{ marginBottom: keyboardHeight }}>
        <div className="message-container">
          {returningMessages()}
          <div ref={messagesEndRef} />
        </div>
      </IonContent>
      <IonFooter className="ion-no-border" style={{ marginBottom: keyboardHeight }}>
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
